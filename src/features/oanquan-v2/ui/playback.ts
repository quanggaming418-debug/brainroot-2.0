/**
 * Chuyển chuỗi sự kiện engine thành các khung hình hoạt ảnh có thời lượng.
 * Thuần TypeScript (không React/DOM): UI chỉ phát lại, không tự tính luật.
 */
import { rowOf, type EngineEvent, type GameState, type PendingCapture, type PlayerId, type RingIndex, type SowStopReason, type ChainStopReason, type EndReason } from '../engine';

export interface Snapshot {
  readonly pits: readonly number[];
  readonly quan: readonly [boolean, boolean];
  readonly stores: Readonly<Record<PlayerId, { readonly dan: number; readonly quan: number }>>;
  readonly debt: Readonly<Record<PlayerId, number>>;
  readonly current: PlayerId;
}

export function snapshotOf(s: GameState): Snapshot {
  return { pits: s.pits, quan: s.quanOnBoard, stores: s.stores, debt: s.debt, current: s.current };
}

export type Frame =
  | { readonly kind: 'pickup'; readonly ring: RingIndex; readonly count: number; readonly relay: boolean; readonly player: PlayerId }
  | { readonly kind: 'move'; readonly ring: RingIndex; readonly hand: number }
  | { readonly kind: 'drop'; readonly ring: RingIndex; readonly handLeft: number; readonly intoQuanPit: boolean }
  | { readonly kind: 'sowEnd'; readonly last: RingIndex; readonly next: RingIndex; readonly reason: SowStopReason; readonly relays: number }
  | { readonly kind: 'capture'; readonly capture: PendingCapture }
  | { readonly kind: 'harvest'; readonly target: RingIndex; readonly mover: PlayerId; readonly dan: number; readonly quan: number }
  | { readonly kind: 'keep'; readonly target: RingIndex }
  | { readonly kind: 'result'; readonly verdict: 'pass' | 'fail'; readonly target: RingIndex; readonly mover: PlayerId; readonly dan: number; readonly quan: number }
  | { readonly kind: 'chainEnd'; readonly reason: ChainStopReason; readonly at: RingIndex }
  | { readonly kind: 'restock'; readonly player: PlayerId; readonly fromOwnStore: number; readonly borrowed: number }
  | { readonly kind: 'turn'; readonly to: PlayerId }
  | { readonly kind: 'gameOver'; readonly reason: EndReason; readonly swept: Readonly<Record<PlayerId, number>> };

/** Thời lượng gốc (ms) ở tốc độ 1×. */
const BASE: Record<Frame['kind'], number> = {
  pickup: 560,
  move: 260,
  drop: 190,
  sowEnd: 900,
  capture: 1100,
  harvest: 950,
  keep: 850,
  result: 3200,
  chainEnd: 500,
  restock: 1000,
  turn: 1100,
  gameOver: 1300,
};

/** Khung "chờ người đọc" không rút ngắn quá nhiều khi tăng tốc. */
const READING: ReadonlySet<Frame['kind']> = new Set(['sowEnd', 'capture', 'result', 'turn', 'gameOver', 'restock']);

export function frameDuration(f: Frame, speed: number, reduced: boolean): number {
  const base = BASE[f.kind];
  if (READING.has(f.kind)) return Math.round(base / Math.min(speed, 2) * (reduced ? 0.8 : 1));
  if (reduced) return f.kind === 'move' ? 0 : Math.round(Math.min(base, 160) / speed);
  return Math.round(base / speed);
}

export function buildFrames(events: readonly EngineEvent[]): Frame[] {
  const frames: Frame[] = [];
  let hand = 0;
  for (const e of events) {
    switch (e.type) {
      case 'pickup':
        hand = e.count;
        frames.push({ kind: 'pickup', ring: e.ring, count: e.count, relay: e.relay, player: e.player });
        break;
      case 'drop':
        frames.push({ kind: 'move', ring: e.ring, hand });
        frames.push({ kind: 'drop', ring: e.ring, handLeft: e.handLeft, intoQuanPit: e.intoQuanPit });
        hand = e.handLeft;
        break;
      case 'sowEnded':
        frames.push({ kind: 'sowEnd', last: e.last, next: e.next, reason: e.reason, relays: e.relays });
        break;
      case 'captureOpportunity':
        frames.push({ kind: 'capture', capture: e.capture });
        break;
      case 'refereeCommitted':
        frames.push(e.verdict === 'pass'
          ? { kind: 'harvest', target: e.target, mover: e.mover, dan: e.harvestedDan, quan: e.harvestedQuan }
          : { kind: 'keep', target: e.target });
        frames.push({ kind: 'result', verdict: e.verdict, target: e.target, mover: e.mover, dan: e.harvestedDan, quan: e.harvestedQuan });
        break;
      case 'chainEnded':
        if (e.reason !== 'refereeFail') frames.push({ kind: 'chainEnd', reason: e.reason, at: e.at });
        break;
      case 'restocked':
        frames.push({ kind: 'restock', player: e.player, fromOwnStore: e.fromOwnStore, borrowed: e.borrowed });
        break;
      case 'turnChanged':
        frames.push({ kind: 'turn', to: e.to });
        break;
      case 'gameOver':
        frames.push({ kind: 'gameOver', reason: e.reason, swept: e.sweptToOwner });
        break;
    }
  }
  return frames;
}

/** Áp một khung vào ảnh chụp hiển thị (bất biến: trả về bản mới). */
export function applyFrame(s: Snapshot, f: Frame): Snapshot {
  switch (f.kind) {
    case 'pickup': {
      const pits = [...s.pits];
      pits[f.ring] = 0;
      return { ...s, pits };
    }
    case 'drop': {
      const pits = [...s.pits];
      pits[f.ring] += 1;
      return { ...s, pits };
    }
    case 'harvest': {
      const pits = [...s.pits];
      pits[f.target] = 0;
      const quan: [boolean, boolean] = [s.quan[0], s.quan[1]];
      if (f.quan) quan[f.target === 0 ? 0 : 1] = false;
      const st = s.stores[f.mover];
      return { ...s, pits, quan, stores: { ...s.stores, [f.mover]: { dan: st.dan + f.dan, quan: st.quan + f.quan } } };
    }
    case 'restock': {
      const pits = [...s.pits];
      for (const r of rowOf(f.player)) pits[r] += 1;
      const opp: PlayerId = f.player === 'P1' ? 'P2' : 'P1';
      return {
        ...s,
        pits,
        stores: {
          ...s.stores,
          [f.player]: { ...s.stores[f.player], dan: s.stores[f.player].dan - f.fromOwnStore },
          [opp]: { ...s.stores[opp], dan: s.stores[opp].dan - f.borrowed },
        },
        debt: { ...s.debt, [f.player]: s.debt[f.player] + f.borrowed },
      };
    }
    case 'turn':
      return { ...s, current: f.to };
    case 'gameOver': {
      const pits = [...s.pits];
      for (const p of ['P1', 'P2'] as const) for (const r of rowOf(p)) pits[r] = 0;
      return {
        ...s,
        pits,
        stores: {
          P1: { ...s.stores.P1, dan: s.stores.P1.dan + f.swept.P1 },
          P2: { ...s.stores.P2, dan: s.stores.P2.dan + f.swept.P2 },
        },
      };
    }
    default:
      return s;
  }
}
