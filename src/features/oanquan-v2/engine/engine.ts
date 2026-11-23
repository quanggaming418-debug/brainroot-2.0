import { validateRules, type RulesConfig } from './rules';
import {
  isQuanPit, other, ownerOf, quanSlot, rowOf, step,
  type Direction, type PlayerId, type RingIndex, RING_SIZE,
} from './ring';

export interface StoreState {
  readonly dan: number;
  readonly quan: number;
}

export type ChallengeLevel = 1 | 2 | 3;

export interface PendingCapture {
  readonly mover: PlayerId;
  readonly target: RingIndex;
  readonly danSeeds: number;
  readonly hasQuan: boolean;
  readonly level: ChallengeLevel;
}

export type Phase = 'awaitingSow' | 'awaitingVerdict' | 'gameOver';
export type EndReason = 'allQuanHarvested' | 'insufficientSeedsToRestock';

export interface GameState {
  readonly rules: RulesConfig;
  /** Số hạt Dân theo ringIndex 0..11 (kể cả Ô Quan). */
  readonly pits: readonly number[];
  /** Quân Quan còn trên bàn: [ring 0, ring 6]. */
  readonly quanOnBoard: readonly [boolean, boolean];
  readonly stores: Readonly<Record<PlayerId, StoreState>>;
  /** Số hạt người này đã mượn từ kho đối thủ (nợ). */
  readonly debt: Readonly<Record<PlayerId, number>>;
  readonly initialPlayer: PlayerId;
  readonly current: PlayerId;
  readonly phase: Phase;
  readonly pending: PendingCapture | null;
  /** Lượt hiện tại, bắt đầu từ 1. */
  readonly turn: number;
  readonly endReason: EndReason | null;
  /** Tổng hạt Dân của ván (bất biến). */
  readonly totalDan: number;
}

export type Action =
  | { readonly type: 'sow'; readonly pit: RingIndex; readonly direction: Direction }
  | { readonly type: 'commitRefereeResult'; readonly verdict: 'pass' | 'fail' };

export type NoCaptureReason = 'gapIsQuan' | 'gapHasSeeds' | 'targetEmpty';

export type EngineEvent =
  | { readonly type: 'sowed'; readonly player: PlayerId; readonly origin: RingIndex; readonly direction: Direction; readonly picked: number; readonly drops: readonly RingIndex[] }
  | { readonly type: 'captureOpportunity'; readonly capture: PendingCapture }
  | { readonly type: 'noCapture'; readonly reason: NoCaptureReason }
  | { readonly type: 'refereeCommitted'; readonly verdict: 'pass' | 'fail'; readonly mover: PlayerId; readonly target: RingIndex; readonly harvestedDan: number; readonly harvestedQuan: number }
  | { readonly type: 'restocked'; readonly player: PlayerId; readonly fromOwnStore: number; readonly borrowed: number }
  | { readonly type: 'turnChanged'; readonly from: PlayerId; readonly to: PlayerId; readonly turn: number }
  | { readonly type: 'gameOver'; readonly reason: EndReason; readonly sweptToOwner: Readonly<Record<PlayerId, number>>; readonly scores: Readonly<Record<PlayerId, ScoreBreakdown>> };

export interface StepResult {
  readonly state: GameState;
  readonly events: readonly EngineEvent[];
}

export interface ScoreBreakdown {
  readonly danInStore: number;
  readonly quanCount: number;
  readonly quanPoints: number;
  /** Hạt đã mượn của đối thủ (trừ). */
  readonly debtOwed: number;
  /** Hạt đối thủ đã mượn của mình (cộng). */
  readonly debtLent: number;
  readonly total: number;
}

export class EngineError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'EngineError';
  }
}

export interface CreateGameOptions {
  readonly rules: RulesConfig;
  /** Bắt buộc (R23): engine không chọn người đi trước. */
  readonly initialPlayer: PlayerId;
}

// ---------------------------------------------------------------- tạo ván

export function createGame(options: CreateGameOptions): GameState {
  if (!options) throw new EngineError('MISSING_OPTIONS', 'Thiếu tùy chọn tạo ván.');
  const { rules, initialPlayer } = options;
  validateRules(rules);
  if (initialPlayer !== 'P1' && initialPlayer !== 'P2') {
    throw new EngineError('MISSING_INITIAL_PLAYER', 'initialPlayer là bắt buộc (P1 hoặc P2).');
  }
  const pits = Array.from({ length: RING_SIZE }, (_, i) =>
    isQuanPit(i) ? rules.setup.danSeedsPerQuanPit : rules.setup.danSeedsPerDanPit,
  );
  const totalDan = pits.reduce((a, b) => a + b, 0);
  const state: GameState = {
    rules,
    pits,
    quanOnBoard: [true, true],
    stores: { P1: { dan: 0, quan: 0 }, P2: { dan: 0, quan: 0 } },
    debt: { P1: 0, P2: 0 },
    initialPlayer,
    current: initialPlayer,
    phase: 'awaitingSow',
    pending: null,
    turn: 1,
    endReason: null,
    totalDan,
  };
  assertInvariants(state);
  return state;
}

// ---------------------------------------------------------------- truy vấn

export function canSelectPit(state: GameState, pit: number): boolean {
  return state.phase === 'awaitingSow' &&
    rowOf(state.current).includes(pit as RingIndex) &&
    state.pits[pit] > 0;
}

export function getLegalPits(state: GameState): RingIndex[] {
  if (state.phase !== 'awaitingSow') return [];
  return rowOf(state.current).filter((r) => state.pits[r] > 0);
}

/** Đường đi của hạt khi rải (để xem trước). Không tiết lộ kết quả ăn. */
export function previewSow(state: GameState, pit: RingIndex, direction: Direction): RingIndex[] {
  if (!canSelectPit(state, pit)) return [];
  return sowPath(pit, direction, state.pits[pit]);
}

function sowPath(origin: RingIndex, direction: Direction, seeds: number): RingIndex[] {
  const drops: RingIndex[] = [];
  let pos: RingIndex = origin;
  while (drops.length < seeds) {
    pos = step(pos, direction);
    if (isQuanPit(pos)) continue; // bỏ qua Ô Quan khi rải
    drops.push(pos); // ô xuất phát cũng nhận hạt nếu đi đủ vòng
  }
  return drops;
}

export function challengeLevelFor(rules: RulesConfig, target: RingIndex, danSeeds: number): ChallengeLevel {
  if (isQuanPit(target)) return rules.challenge.quanLevel;
  return danSeeds <= rules.challenge.danLevel1MaxSeeds ? 1 : rules.challenge.danLevelAbove;
}

// ---------------------------------------------------------------- hành động

export function applyAction(state: GameState, action: Action): StepResult {
  if (state.phase === 'gameOver') throw new EngineError('GAME_OVER', 'Ván đã kết thúc.');
  switch (action.type) {
    case 'sow':
      return applySow(state, action.pit, action.direction);
    case 'commitRefereeResult':
      return applyVerdict(state, action.verdict);
    default:
      throw new EngineError('UNKNOWN_ACTION', 'Hành động không hợp lệ.');
  }
}

function applySow(state: GameState, pit: RingIndex, direction: Direction): StepResult {
  if (state.phase !== 'awaitingSow') throw new EngineError('NOT_SOW_PHASE', 'Đang chờ Trọng tài chốt kết quả.');
  if (direction !== 'cw' && direction !== 'ccw') throw new EngineError('BAD_DIRECTION', 'Chiều rải không hợp lệ.');
  if (!Number.isInteger(pit) || pit < 0 || pit >= RING_SIZE) throw new EngineError('BAD_PIT', 'Ô không tồn tại.');
  if (isQuanPit(pit)) throw new EngineError('QUAN_NOT_SELECTABLE', 'Không được bốc Ô Quan để rải.');
  if (ownerOf(pit) !== state.current) throw new EngineError('NOT_OWN_ROW', 'Chỉ được chọn ô ở hàng của mình.');
  if (state.pits[pit] <= 0) throw new EngineError('EMPTY_PIT', 'Ô này không có hạt.');

  const pits = [...state.pits];
  const picked = pits[pit];
  pits[pit] = 0;
  const drops = sowPath(pit, direction, picked);
  for (const r of drops) pits[r] += 1;
  const last = drops[drops.length - 1];

  const events: EngineEvent[] = [{ type: 'sowed', player: state.current, origin: pit, direction, picked, drops }];
  let next: GameState = { ...state, pits };

  const gap = step(last, direction);
  let reason: NoCaptureReason | null = null;
  let capture: PendingCapture | null = null;
  if (isQuanPit(gap)) {
    reason = 'gapIsQuan';
  } else if (pits[gap] > 0) {
    reason = 'gapHasSeeds';
  } else {
    const target = step(gap, direction);
    const danSeeds = pits[target];
    const hasQuan = isQuanPit(target) ? next.quanOnBoard[quanSlot(target)] : false;
    if (danSeeds === 0 && !hasQuan) {
      reason = 'targetEmpty';
    } else {
      capture = {
        mover: state.current,
        target,
        danSeeds,
        hasQuan,
        level: challengeLevelFor(state.rules, target, danSeeds),
      };
    }
  }

  if (capture) {
    next = { ...next, phase: 'awaitingVerdict', pending: capture };
    events.push({ type: 'captureOpportunity', capture });
    assertInvariants(next);
    return { state: next, events };
  }
  events.push({ type: 'noCapture', reason: reason as NoCaptureReason });
  return finishTurn(next, events);
}

function applyVerdict(state: GameState, verdict: 'pass' | 'fail'): StepResult {
  if (state.phase !== 'awaitingVerdict' || !state.pending) {
    throw new EngineError('NO_PENDING_CAPTURE', 'Không có cơ hội ăn nào đang chờ chấm.');
  }
  if (verdict !== 'pass' && verdict !== 'fail') throw new EngineError('BAD_VERDICT', 'Kết quả phải là Đạt hoặc Chưa đạt.');
  const p = state.pending;
  let next: GameState = { ...state, phase: 'awaitingSow', pending: null };
  let harvestedDan = 0;
  let harvestedQuan = 0;
  if (verdict === 'pass') {
    const pits = [...state.pits];
    harvestedDan = pits[p.target];
    pits[p.target] = 0;
    const quanOnBoard: [boolean, boolean] = [state.quanOnBoard[0], state.quanOnBoard[1]];
    if (isQuanPit(p.target) && quanOnBoard[quanSlot(p.target)]) {
      quanOnBoard[quanSlot(p.target)] = false;
      harvestedQuan = 1;
    }
    const s = state.stores[p.mover];
    next = {
      ...next,
      pits,
      quanOnBoard,
      stores: { ...state.stores, [p.mover]: { dan: s.dan + harvestedDan, quan: s.quan + harvestedQuan } },
    };
  }
  const events: EngineEvent[] = [{
    type: 'refereeCommitted', verdict, mover: p.mover, target: p.target, harvestedDan, harvestedQuan,
  }];
  return finishTurn(next, events);
}

function finishTurn(state: GameState, events: EngineEvent[]): StepResult {
  const rules = state.rules;
  if (!state.quanOnBoard[0] && !state.quanOnBoard[1] && rules.endGame.whenAllQuanHarvested) {
    return endGame(state, 'allQuanHarvested', events);
  }
  const from = state.current;
  const to = other(from);
  let next: GameState = { ...state, current: to, turn: state.turn + 1, phase: 'awaitingSow', pending: null };
  events.push({ type: 'turnChanged', from, to, turn: next.turn });

  const row = rowOf(to);
  if (row.every((r) => next.pits[r] === 0)) {
    const need = row.length * rules.emptyRow.restockSeedsPerPit;
    const own = next.stores[to].dan;
    const opp = next.stores[from].dan;
    const fromOwnStore = Math.min(own, need);
    const borrowed = need - fromOwnStore;
    if (borrowed > opp) {
      return endGame(next, 'insufficientSeedsToRestock', events);
    }
    const pits = [...next.pits];
    for (const r of row) pits[r] += rules.emptyRow.restockSeedsPerPit;
    next = {
      ...next,
      pits,
      stores: {
        ...next.stores,
        [to]: { ...next.stores[to], dan: own - fromOwnStore },
        [from]: { ...next.stores[from], dan: opp - borrowed },
      } as Record<PlayerId, StoreState>,
      debt: { ...next.debt, [to]: next.debt[to] + borrowed } as Record<PlayerId, number>,
    };
    events.push({ type: 'restocked', player: to, fromOwnStore, borrowed });
  }
  assertInvariants(next);
  return { state: next, events };
}

function endGame(state: GameState, reason: EndReason, events: EngineEvent[]): StepResult {
  const pits = [...state.pits];
  const swept: Record<PlayerId, number> = { P1: 0, P2: 0 };
  for (const player of ['P1', 'P2'] as const) {
    for (const r of rowOf(player)) {
      swept[player] += pits[r];
      pits[r] = 0;
    }
  }
  const next: GameState = {
    ...state,
    pits,
    stores: {
      P1: { ...state.stores.P1, dan: state.stores.P1.dan + swept.P1 },
      P2: { ...state.stores.P2, dan: state.stores.P2.dan + swept.P2 },
    },
    phase: 'gameOver',
    pending: null,
    endReason: reason,
  };
  assertInvariants(next);
  events.push({ type: 'gameOver', reason, sweptToOwner: swept, scores: computeScores(next) });
  return { state: next, events };
}

// ---------------------------------------------------------------- điểm

/**
 * Điểm theo kho hiện tại. Khi ván kết thúc, hạt còn trên hàng đã được cộng vào kho;
 * giữa ván đây là điểm tạm tính (chưa có hạt trên bàn).
 */
export function computeScores(state: GameState): Record<PlayerId, ScoreBreakdown> {
  const { danSeedValue, quanPieceValue } = state.rules.scoring;
  const make = (p: PlayerId): ScoreBreakdown => {
    const s = state.stores[p];
    const debtOwed = state.debt[p];
    const debtLent = state.debt[other(p)];
    const quanPoints = s.quan * quanPieceValue;
    return {
      danInStore: s.dan,
      quanCount: s.quan,
      quanPoints,
      debtOwed,
      debtLent,
      total: (s.dan - debtOwed + debtLent) * danSeedValue + quanPoints,
    };
  };
  return { P1: make('P1'), P2: make('P2') };
}

export function winner(state: GameState): PlayerId | 'draw' | null {
  if (state.phase !== 'gameOver') return null;
  const s = computeScores(state);
  if (s.P1.total === s.P2.total) return 'draw';
  return s.P1.total > s.P2.total ? 'P1' : 'P2';
}

// ---------------------------------------------------------------- bất biến

export function assertInvariants(state: GameState): void {
  const fail = (m: string): never => {
    throw new EngineError('INVARIANT', `Vi phạm bất biến: ${m}`);
  };
  if (state.pits.length !== RING_SIZE) fail('bàn phải có 12 ô');
  if (state.pits.some((n) => !Number.isInteger(n) || n < 0)) fail('số hạt âm hoặc không nguyên');
  for (const p of ['P1', 'P2'] as const) {
    const s = state.stores[p];
    if (s.dan < 0 || s.quan < 0 || state.debt[p] < 0) fail(`kho/nợ âm (${p})`);
  }
  const dan = state.pits.reduce((a, b) => a + b, 0) + state.stores.P1.dan + state.stores.P2.dan;
  if (dan !== state.totalDan) fail(`tổng hạt Dân ${dan} ≠ ${state.totalDan}`);
  const quan = (state.quanOnBoard[0] ? 1 : 0) + (state.quanOnBoard[1] ? 1 : 0) + state.stores.P1.quan + state.stores.P2.quan;
  if (quan !== 2) fail(`tổng quân Quan ${quan} ≠ 2`);
  if ((state.phase === 'awaitingVerdict') !== (state.pending !== null)) fail('pending không khớp phase');
  if (state.phase === 'gameOver' && state.endReason === null) fail('thiếu lý do kết thúc');
}
