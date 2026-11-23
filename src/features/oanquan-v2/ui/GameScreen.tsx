import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  PLAYTEST_V1, applyAction, computeScores, createGame, getLegalPits, isQuanPit, other, pitLabel, previewSow,
  type Direction, type EngineEvent, type GameState, type PendingCapture, type PlayerId, type RingIndex, type StepResult,
} from '../engine';
import { DemoDeck, type DemoCard } from '../content/demoCards';
import { themeOfRing } from '../content/themes';
import { Board, NO_MARKS, type BoardMarks } from './Board';
import { ChallengeCard, LevelPill, RefereePanel, type Verdict } from './Challenge';
import { SeedToken, ThemeIcon } from './Icons';
import { applyFrame, buildFrames, frameDuration, snapshotOf, type Frame, type Snapshot } from './playback';
import { RulesDialog, StatusChips, pitName, useLayout, useReducedMotion, type Setup } from './shared';

// ------------------------------------------------------------------ văn bản

const SOW_END_TEXT: Record<string, string> = {
  occupiedQuan: 'Ô sau hạt cuối là Ô Quan còn quân hoặc còn hạt: dừng, hết lượt.',
  twoEmpty: 'Gặp hai ô trống liên tiếp: hết lượt, không ăn.',
  capture: 'Ô sau hạt cuối trống, ô kế tiếp có quân: có cơ hội ăn!',
  dropLimit: 'Rải quá nhiều vòng: dừng lượt theo chốt an toàn.',
};
const CHAIN_END_TEXT: Record<string, string> = {
  gapNotEmpty: 'Sau ô vừa ăn không phải ô trống: hết chuỗi ăn.',
  twoEmpty: 'Sau ô vừa ăn là hai ô trống: hết chuỗi ăn.',
};

function describeEvents(events: readonly EngineEvent[], names: Record<PlayerId, string>): string[] {
  const out: string[] = [];
  let drops = 0;
  for (const e of events) {
    switch (e.type) {
      case 'pickup':
        out.push(e.relay
          ? `↪ Rải tiếp: bốc ${e.count} hạt ở ${pitLabel(e.ring)}.`
          : `${names[e.player]} bốc ${e.count} hạt ở ${pitLabel(e.ring)}, rải ${e.direction === 'cw' ? '↻ theo chiều kim đồng hồ' : '↺ ngược chiều kim đồng hồ'}.`);
        break;
      case 'drop':
        if (e.intoQuanPit) drops++;
        break;
      case 'sowEnded':
        out.push(`Hạt cuối ở ${pitLabel(e.last)}${e.relays ? ` (${e.relays} lần rải tiếp)` : ''}${drops ? `, ${drops} hạt rơi vào Ô Quan` : ''}. ${SOW_END_TEXT[e.reason]}`);
        break;
      case 'captureOpportunity':
        out.push(`${e.capture.chainIndex ? 'Ăn liên hoàn' : 'Cơ hội ăn'} ${pitName(e.capture.target)} · thẻ Cấp ${e.capture.level}.`);
        break;
      case 'refereeCommitted':
        out.push(e.verdict === 'pass'
          ? `Trọng tài chốt Đạt: ${names[e.mover]} thu hoạch ${e.harvestedDan} hạt${e.harvestedQuan ? ' và 1 quân Quan' : ''} ở ${pitLabel(e.target)}.`
          : `Trọng tài chốt Chưa đạt: hạt giữ nguyên ở ${pitLabel(e.target)}.`);
        break;
      case 'chainEnded':
        if (e.reason !== 'refereeFail') out.push(CHAIN_END_TEXT[e.reason]);
        break;
      case 'restocked':
        out.push(`Hàng của ${names[e.player]} trống: đặt lại 5 hạt (${e.fromOwnStore} từ kho mình${e.borrowed ? `, mượn ${e.borrowed} của đối thủ` : ''}).`);
        break;
      case 'turnChanged':
        out.push(`— Lượt ${e.turn}: ${names[e.to]} —`);
        break;
      case 'gameOver':
        out.push(e.reason === 'allQuanHarvested' ? 'Cả hai quân Quan đã được thu hoạch: ván kết thúc.' : 'Không đủ 5 hạt để đặt lại hàng trống: ván kết thúc sớm.');
        break;
    }
  }
  return out;
}

// ------------------------------------------------------------------ tốc độ

type Speed = 1 | 2 | 4;
const SPEED_KEY = 'oq2.speed';
function readSpeed(): Speed {
  try {
    const v = Number(window.localStorage.getItem(SPEED_KEY));
    return v === 2 || v === 4 ? v : 1;
  } catch {
    return 1;
  }
}
function writeSpeed(v: Speed) {
  try { window.localStorage.setItem(SPEED_KEY, String(v)); } catch { /* bỏ qua */ }
}

// ------------------------------------------------------------------ trạng thái phát lại

interface Visual {
  readonly marks: BoardMarks;
  readonly hand: { readonly ring: RingIndex; readonly count: number } | null;
  readonly message: string;
  readonly dropKey: number;
  readonly dropRing: RingIndex | null;
  readonly flyKey: number;
  readonly fly: { readonly from: RingIndex; readonly to: PlayerId; readonly dan: number; readonly quan: number } | null;
  readonly toast: string | null;
  readonly result: Extract<Frame, { kind: 'result' }> | null;
}

const EMPTY_VISUAL: Visual = {
  marks: NO_MARKS, hand: null, message: '', dropKey: 0, dropRing: null, flyKey: 0, fly: null, toast: null, result: null,
};

type After = 'afterSow' | 'afterVerdict';

interface Anim {
  readonly frames: readonly Frame[];
  readonly i: number;
  readonly view: Snapshot;
  readonly vis: Visual;
  readonly result: StepResult;
  readonly after: After;
  readonly paused: boolean;
  readonly done: boolean;
}

function visualize(f: Frame, prev: Visual, names: Record<PlayerId, string>): Visual {
  const base = { ...prev, toast: null, fly: null, dropRing: null };
  switch (f.kind) {
    case 'pickup':
      return {
        ...base,
        hand: { ring: f.ring, count: f.count },
        marks: { ...NO_MARKS, origin: f.relay ? prev.marks.origin : f.ring, active: f.ring },
        message: f.relay ? `Rải tiếp! Bốc ${f.count} hạt ở ${pitLabel(f.ring)}.` : `${names[f.player]} bốc ${f.count} hạt ở ${pitLabel(f.ring)}.`,
      };
    case 'move':
      return { ...base, hand: { ring: f.ring, count: f.hand }, marks: { ...prev.marks, active: f.ring, quanPulse: null } };
    case 'drop':
      return {
        ...base,
        hand: { ring: f.ring, count: f.handLeft },
        marks: { ...prev.marks, active: f.ring, quanPulse: f.intoQuanPit ? f.ring : null },
        dropKey: prev.dropKey + 1,
        dropRing: f.ring,
        message: f.intoQuanPit
          ? `Thả 1 hạt vào ${pitName(f.ring)} · còn ${f.handLeft} hạt trong tay.`
          : `Thả 1 hạt vào ${pitLabel(f.ring)} · còn ${f.handLeft} hạt trong tay.`,
      };
    case 'sowEnd':
      return { ...base, hand: null, marks: { ...NO_MARKS, origin: prev.marks.origin, active: f.last, stopAt: f.next }, message: SOW_END_TEXT[f.reason] };
    case 'capture':
      return {
        ...base,
        hand: null,
        marks: { ...NO_MARKS, stopAt: null, target: f.capture.target, targetChip: `${f.capture.chainIndex ? 'Ăn tiếp' : 'Ăn'} ${f.capture.danSeeds}${f.capture.hasQuan ? ' + Quan' : ' hạt'} · Cấp ${f.capture.level}` },
        message: `${f.capture.chainIndex ? 'Ăn liên hoàn!' : 'Cơ hội ăn!'} ${pitName(f.capture.target)} · thẻ Cấp ${f.capture.level}. ${names[other(f.capture.mover)]} rút thẻ, ${names[f.capture.mover]} trả lời.`,
      };
    case 'harvest':
      return {
        ...base,
        marks: { ...NO_MARKS, harvested: f.target },
        flyKey: prev.flyKey + 1,
        fly: { from: f.target, to: f.mover, dan: f.dan, quan: f.quan },
        message: `${names[f.mover]} thu hoạch ${f.dan} hạt${f.quan ? ' và quân Quan' : ''}!`,
      };
    case 'keep':
      return { ...base, marks: { ...NO_MARKS, shake: f.target }, message: 'Chưa đạt: hạt vẫn ở ô này.' };
    case 'result':
      return { ...base, marks: prev.marks, result: f, message: prev.message };
    case 'chainEnd':
      return { ...base, result: null, marks: { ...NO_MARKS, stopAt: f.at }, message: CHAIN_END_TEXT[f.reason] };
    case 'restock':
      return { ...base, result: null, marks: NO_MARKS, message: `Hàng của ${names[f.player]} trống: đặt lại mỗi ô 1 hạt (${f.fromOwnStore} từ kho mình${f.borrowed ? `, mượn ${f.borrowed} hạt của đối thủ` : ''}).` };
    case 'turn':
      return { ...base, result: null, hand: null, marks: NO_MARKS, toast: `Đến lượt ${names[f.to]}`, message: `Đến lượt ${names[f.to]}.` };
    case 'gameOver':
      return { ...base, result: null, hand: null, marks: NO_MARKS, toast: 'Ván kết thúc!', message: f.reason === 'allQuanHarvested' ? 'Cả hai quân Quan đã được thu hoạch: ván kết thúc.' : 'Không đủ hạt để đặt lại hàng: ván kết thúc sớm.' };
    default:
      return base;
  }
}

function startAnim(result: StepResult, before: Snapshot, after: After, names: Record<PlayerId, string>): Anim {
  const frames = buildFrames(result.events);
  if (!frames.length) return { frames, i: 0, view: before, vis: EMPTY_VISUAL, result, after, paused: false, done: true };
  return {
    frames, i: 0, result, after, paused: false, done: false,
    view: applyFrame(before, frames[0]),
    vis: visualize(frames[0], EMPTY_VISUAL, names),
  };
}

function advance(a: Anim, names: Record<PlayerId, string>, to?: number): Anim {
  let view = a.view;
  let vis = a.vis;
  let i = a.i;
  const end = to ?? a.i + 1;
  while (i + 1 <= end) {
    i += 1;
    if (i >= a.frames.length) return { ...a, i, view, vis, done: true };
    view = applyFrame(view, a.frames[i]);
    vis = visualize(a.frames[i], vis, names);
  }
  return { ...a, i, view, vis };
}

/** Chỉ số khung "đáng dừng lại" kế tiếp (để Bỏ qua không làm mất kết quả quan trọng). */
function nextStopIndex(a: Anim): number {
  for (let k = a.i + 1; k < a.frames.length; k++) {
    const kind = a.frames[k].kind;
    if (kind === 'capture' || kind === 'result' || kind === 'gameOver' || kind === 'turn') return k;
  }
  return a.frames.length;
}

// ------------------------------------------------------------------ hiệu ứng

function centerOf(el: Element | null): { x: number; y: number } | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function FxLayer({ vis, boardEl, reduced, moveMs, dropMs, flyMs }: {
  vis: Visual; boardEl: HTMLElement | null; reduced: boolean; moveMs: number; dropMs: number; flyMs: number;
}) {
  const pit = (ring: number) => centerOf(boardEl?.querySelector(`[data-ring="${ring}"]`) ?? null);
  const hand = vis.hand ? pit(vis.hand.ring) : null;
  const drop = vis.dropRing !== null ? pit(vis.dropRing) : null;
  const flyFrom = vis.fly ? pit(vis.fly.from) : null;
  const flyTo = vis.fly ? centerOf(document.querySelector(`[data-plate="${vis.fly.to}"]`)) : null;
  const flyCount = vis.fly ? Math.min(8, vis.fly.dan) : 0;
  return (
    <div className="oq2-fx" aria-hidden="true">
      {hand ? (
        <div
          className="oq2-hand"
          style={{ transform: `translate(${hand.x}px, ${hand.y}px)`, transitionDuration: reduced ? '0ms' : `${moveMs}ms` } as CSSProperties}
        >
          <span className="oq2-hand__bowl">
            <svg viewBox="-6 -6 12 12" className="oq2-hand__seed"><SeedToken /></svg>
          </span>
          <b className="oq2-hand__count">{vis.hand?.count}</b>
        </div>
      ) : null}
      {drop && !reduced ? (
        <svg
          key={`d${vis.dropKey}`}
          viewBox="-6 -6 12 12"
          className="oq2-fx-seed"
          style={{ left: drop.x, top: drop.y, animationDuration: `${Math.max(dropMs, 120)}ms` } as CSSProperties}
        >
          <SeedToken />
        </svg>
      ) : null}
      {flyFrom && flyTo && !reduced ? (
        <>
          {Array.from({ length: flyCount }, (_, k) => (
            <svg
              key={`f${vis.flyKey}-${k}`}
              viewBox="-6 -6 12 12"
              className="oq2-fly"
              style={{
                left: flyFrom.x + ((k % 4) - 1.5) * 7,
                top: flyFrom.y + (Math.floor(k / 4) - 0.5) * 7,
                '--dx': `${flyTo.x - flyFrom.x}px`,
                '--dy': `${flyTo.y - flyFrom.y}px`,
                animationDuration: `${flyMs}ms`,
                animationDelay: `${k * 35}ms`,
              } as CSSProperties}
            >
              <SeedToken />
            </svg>
          ))}
          {vis.fly?.quan ? (
            <span
              key={`q${vis.flyKey}`}
              className="oq2-fly oq2-fly--quan"
              style={{ left: flyFrom.x, top: flyFrom.y, '--dx': `${flyTo.x - flyFrom.x}px`, '--dy': `${flyTo.y - flyFrom.y}px`, animationDuration: `${flyMs}ms` } as CSSProperties}
            >Quan</span>
          ) : null}
          <span key={`p${vis.flyKey}`} className="oq2-plus" style={{ left: flyTo.x, top: flyTo.y } as CSSProperties}>
            +{(vis.fly?.dan ?? 0) + (vis.fly?.quan ?? 0) * 10}
          </span>
        </>
      ) : null}
      {vis.marks.quanPulse !== null && drop && !reduced ? (
        <span key={`qp${vis.dropKey}`} className="oq2-plus oq2-plus--quan" style={{ left: drop.x, top: drop.y - 24 } as CSSProperties}>+1</span>
      ) : null}
    </div>
  );
}

// ------------------------------------------------------------------ thanh người chơi

function PlayerPlate({ id, view, rules, names, active }: {
  id: PlayerId; view: Snapshot; rules: GameState['rules']; names: Record<PlayerId, string>; active: boolean;
}) {
  const fake = { rules, stores: view.stores, debt: view.debt } as GameState;
  const s = computeScores(fake)[id];
  return (
    <div className={`oq2-plate${active ? ' is-active' : ''}`} data-plate={id} aria-label={`${names[id]}: ${s.total} điểm${active ? ', đang đi' : ''}`}>
      <span className={`oq2-avatar oq2-avatar--${id}`} aria-hidden="true">{names[id].trim().charAt(0).toUpperCase()}</span>
      <span className="oq2-plate__who">
        <strong>{names[id]}</strong>
        <small>{id === 'P1' ? 'Hàng dưới' : 'Hàng trên'}{active ? <em className="oq2-plate__turn"> · ĐANG ĐI</em> : null}</small>
      </span>
      <span className="oq2-plate__store" aria-hidden="true">
        <span>{s.danInStore} hạt</span>
        {s.quanCount ? <span>+ {s.quanCount} Quan</span> : null}
        {s.debtOwed ? <span className="oq2-debt">nợ {s.debtOwed}</span> : null}
      </span>
      <span className="oq2-plate__score" aria-hidden="true"><b key={s.total}>{s.total}</b><small>điểm</small></span>
    </div>
  );
}

// ------------------------------------------------------------------ màn chơi

type Stage =
  | { kind: 'select' }
  | { kind: 'direction'; pit: RingIndex; hover: Direction | null }
  | { kind: 'playing' }
  | { kind: 'card'; uid: number; capture: PendingCapture; card: DemoCard }
  | { kind: 'referee'; uid: number; capture: PendingCapture; card: DemoCard; timedOut: boolean; before: GameState; committed: StepResult | null };

export function GameScreen({ setup, onEnd, onQuit }: {
  setup: Setup;
  onEnd: (g: GameState, lessons: string[], log: string[]) => void;
  onQuit: () => void;
}) {
  const layout = useLayout();
  const reduced = useReducedMotion();
  const names = setup.names;
  const [game, setGame] = useState<GameState>(() => createGame({
    rules: PLAYTEST_V1,
    initialPlayer: setup.first === 'random' ? (Math.random() < 0.5 ? 'P1' : 'P2') : setup.first,
  }));
  const [stage, setStage] = useState<Stage>({ kind: 'select' });
  const [anim, setAnim] = useState<Anim | null>(null);
  const [speed, setSpeedState] = useState<Speed>(readSpeed);
  const [notice, setNotice] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [lessons, setLessons] = useState<string[]>([]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [, forceRender] = useState(0);
  const deck = useMemo(() => new DemoDeck(Math.random), []);
  const boardWrapRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<DemoCard | null>(null);
  const uidRef = useRef(0);
  const dockRef = useRef<HTMLElement>(null);
  const [dockH, setDockH] = useState(0);
  useEffect(() => {
    const el = dockRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      if (!el.querySelector('.oq2-result')) setDockH(Math.ceil(el.getBoundingClientRect().height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setSpeed = (v: Speed) => { setSpeedState(v); writeSpeed(v); };
  const legal = useMemo(() => new Set<number>(getLegalPits(game)), [game]);
  const appendLog = (events: readonly EngineEvent[]) => setLog((l) => [...l, ...describeEvents(events, names)]);

  // Vẽ lại lớp hiệu ứng khi đổi kích thước (vị trí ô thay đổi)
  useEffect(() => {
    const on = () => forceRender((n) => n + 1);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  // --- bộ phát lại
  const finish = useCallback((a: Anim) => {
    const s = a.result.state;
    setAnim(null);
    if (s.phase === 'gameOver') {
      onEnd(s, lessons, log);
      return;
    }
    if (s.phase === 'awaitingVerdict' && s.pending) {
      const card = deck.draw(themeOfRing(s.pending.target), s.pending.level);
      lastCardRef.current = card;
      uidRef.current += 1;
      setStage({ kind: 'card', uid: uidRef.current, capture: s.pending, card });
      return;
    }
    const last = a.frames[a.frames.length - 1];
    if (last?.kind === 'turn') setToast(`Đến lượt ${names[last.to]}`);
    setNotice(`Lượt của ${names[s.current]}: chọn một Ô Dân có hạt ở hàng của mình.`);
    setStage({ kind: 'select' });
  }, [deck, lessons, log, names, onEnd]);

  useEffect(() => {
    if (!anim) return;
    if (anim.done) { finish(anim); return; }
    if (anim.paused) return;
    const f = anim.frames[anim.i];
    const t = window.setTimeout(() => setAnim((a) => (a ? advance(a, names) : a)), frameDuration(f, speed, reduced));
    return () => window.clearTimeout(t);
  }, [anim, speed, reduced, names, finish]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1400);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Đưa focus về bàn khi tới lượt mới (nếu focus đã mất)
  useEffect(() => {
    if (stage.kind !== 'select') return;
    const a = document.activeElement;
    if (!a || a === document.body || !document.contains(a)) {
      (boardWrapRef.current?.querySelector('.oq2-pit.is-legal') as HTMLElement | null)?.focus({ preventScroll: true });
    }
  }, [stage.kind, game]);

  const play = (result: StepResult, before: GameState, after: After) => {
    appendLog(result.events);
    setStage({ kind: 'playing' });
    setAnim(startAnim(result, snapshotOf(before), after, names));
  };

  const sow = (pit: RingIndex, dir: Direction) => {
    const before = game;
    const result = applyAction(game, { type: 'sow', pit, direction: dir });
    setGame(result.state);
    setNotice('');
    play(result, before, 'afterSow');
  };

  const commitVerdict = (v: Verdict) => {
    if (stage.kind !== 'referee' || stage.committed || game.phase !== 'awaitingVerdict') return;
    const before = game;
    const result = applyAction(game, { type: 'commitRefereeResult', verdict: v });
    setGame(result.state);
    setStage({ ...stage, before, committed: result });
    setLessons((l) => (l.includes(stage.card.remember) ? l : [...l, stage.card.remember]));
  };
  const refereeContinue = () => {
    if (stage.kind !== 'referee' || !stage.committed) return;
    play(stage.committed, stage.before, 'afterVerdict');
  };

  const skip = () => setAnim((a) => (a && !a.done ? { ...advance(a, names, nextStopIndex(a)), paused: false } : a));
  const continueNow = () => setAnim((a) => (a ? { ...advance(a, names), paused: false } : a));
  const togglePause = () => setAnim((a) => (a ? { ...a, paused: !a.paused } : a));

  // --- hiển thị
  const view: Snapshot = anim ? anim.view
    : stage.kind === 'referee' && stage.committed ? snapshotOf(stage.before)
      : snapshotOf(game);
  const vis = anim?.vis ?? EMPTY_VISUAL;
  let marks: BoardMarks = vis.marks;
  if (!anim && stage.kind === 'direction') {
    marks = { ...NO_MARKS, selected: stage.pit, path: stage.hover ? previewSow(game, stage.pit, stage.hover) : [] };
  } else if (!anim && (stage.kind === 'card' || stage.kind === 'referee')) {
    const c = stage.capture;
    marks = { ...NO_MARKS, target: c.target, targetChip: `Ăn ${c.danSeeds}${c.hasQuan ? ' + Quan' : ' hạt'} · Cấp ${c.level}` };
  }
  const interactive = !anim && (stage.kind === 'select' || stage.kind === 'direction');
  const overlay = stage.kind === 'card' || stage.kind === 'referee' || rulesOpen;
  const mover = view.current;
  const message = anim ? vis.message
    : stage.kind === 'direction' ? `Đã chọn ${pitLabel(stage.pit)} (${game.pits[stage.pit]} hạt). Chọn chiều rải: ↻ hoặc ↺.`
      : stage.kind === 'card' || stage.kind === 'referee'
        ? `${stage.capture.chainIndex ? 'Ăn liên hoàn' : 'Cơ hội ăn'} ${pitName(stage.capture.target)}: ${names[stage.capture.mover]} trả lời, ${names[other(stage.capture.mover)]} làm Trọng tài.`
        : notice || `Lượt của ${names[game.current]}: chọn một Ô Dân có hạt ở hàng của mình.`;
  const turnFrame = anim && !anim.done && (anim.frames[anim.i].kind === 'turn' || anim.frames[anim.i].kind === 'restock');
  const stepIdx = stage.kind === 'select' || turnFrame ? 0 : stage.kind === 'direction' ? 1
    : anim && anim.after === 'afterSow' && anim.frames[anim.i]?.kind !== 'capture' ? 2 : 3;
  const curFrame = anim && !anim.done ? anim.frames[anim.i] : null;
  const moveMs = frameDuration({ kind: 'move', ring: 1, hand: 0 }, speed, reduced);
  const dropMs = frameDuration({ kind: 'drop', ring: 1, handLeft: 0, intoQuanPit: false }, speed, reduced);
  const flyMs = frameDuration({ kind: 'harvest', target: 1, mover: 'P1', dan: 0, quan: 0 }, speed, reduced);

  const onSelectPit = (ring: RingIndex) => setStage({ kind: 'direction', pit: ring, hover: null });
  const onRejected = (ring: RingIndex) => {
    if (isQuanPit(ring)) setNotice('Không được bốc Ô Quan để rải.');
    else if (game.pits[ring] === 0) setNotice(`Ô ${pitLabel(ring)} không có hạt.`);
    else setNotice(`Ô ${pitLabel(ring)} là ô của đối thủ.`);
  };

  // Nút chiều rải gắn ngay trên ô đã chọn
  const selectedCenter = stage.kind === 'direction' && !anim
    ? centerOf(boardWrapRef.current?.querySelector(`[data-ring="${stage.pit}"]`) ?? null) : null;
  const dirButton = (dir: Direction, extra = '') => (
    <button
      type="button"
      className={`oq2-btn oq2-dir${extra}`}
      aria-label={dir === 'cw' ? 'Rải theo chiều kim đồng hồ' : 'Rải ngược chiều kim đồng hồ'}
      onMouseEnter={() => stage.kind === 'direction' && setStage({ ...stage, hover: dir })}
      onFocus={() => stage.kind === 'direction' && setStage({ ...stage, hover: dir })}
      onMouseLeave={() => stage.kind === 'direction' && setStage({ ...stage, hover: null })}
      onClick={() => stage.kind === 'direction' && sow(stage.pit, dir)}
    >
      <span aria-hidden="true">{dir === 'cw' ? '↻' : '↺'}</span>
      <em>{dir === 'cw' ? 'Chiều kim đồng hồ' : 'Ngược chiều'}</em>
    </button>
  );

  return (
    <div className={`oq2-game oq2-game--${layout}`} data-stage={anim ? 'playing' : stage.kind} data-frame={curFrame?.kind ?? ''} style={{ '--oq2-dockh': `${dockH}px` } as CSSProperties}>
      <header className="oq2-header" inert={overlay}>
        <span className="oq2-header__brand">Brainroot<span aria-hidden="true">.</span> <em>Ô ăn quan xanh</em></span>
        <StatusChips />
        <span className="oq2-header__actions">
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => setRulesOpen(true)}>Luật</button>
          <button type="button" className="oq2-btn oq2-btn--small" aria-expanded={logOpen} onClick={() => setLogOpen((v) => !v)}>Nhật ký</button>
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => { if (window.confirm('Rời ván? Ván hiện tại sẽ không được lưu.')) onQuit(); }}>Rời ván</button>
        </span>
      </header>

      <div className="oq2-plates" inert={overlay}>
        <PlayerPlate id="P2" view={view} rules={game.rules} names={names} active={mover === 'P2'} />
        <PlayerPlate id="P1" view={view} rules={game.rules} names={names} active={mover === 'P1'} />
      </div>

      <div className="oq2-stage" inert={overlay} ref={boardWrapRef}>
        <Board
          layout={layout}
          pits={view.pits}
          quanOnBoard={view.quan}
          playerNames={names}
          interactive={interactive}
          legal={legal}
          marks={marks}
          onSelect={onSelectPit}
          onRejected={onRejected}
        />
        {vis.toast || toast ? <div className="oq2-toast" role="status">{vis.toast ?? toast}</div> : null}
        {selectedCenter && stage.kind === 'direction' ? (
          <div className="oq2-pitdirs" style={{ left: selectedCenter.x, top: selectedCenter.y } as CSSProperties}>
            {dirButton('ccw', ' oq2-dir--mini oq2-dir--left')}
            {dirButton('cw', ' oq2-dir--mini oq2-dir--right')}
          </div>
        ) : null}
      </div>

      <footer className="oq2-dock" inert={overlay} ref={dockRef}>
        {vis.result ? (
          <ResultBanner
            frame={vis.result}
            card={lastCardRef.current}
            names={names}
            paused={!!anim?.paused}
            holdMs={curFrame ? frameDuration(curFrame, speed, reduced) : 0}
            onContinue={continueNow}
            onTogglePause={togglePause}
          />
        ) : (
          <>
            <ol className="oq2-stepper" aria-label="Các bước của lượt">
              {['Chọn ô', 'Chọn chiều', 'Rải', 'Thẻ'].map((s, i) => (
                <li key={s} className={i === stepIdx ? 'is-current' : i < stepIdx ? 'is-done' : ''} aria-current={i === stepIdx ? 'step' : undefined}>
                  <span>{i + 1}</span><em>{s}</em>
                </li>
              ))}
            </ol>
            <p className="oq2-message" aria-live={anim && curFrame && (curFrame.kind === 'move' || curFrame.kind === 'drop') ? 'off' : 'polite'}>{message}</p>
            <div className="oq2-dock__actions">
              {stage.kind === 'direction' && !anim ? (
                <>
                  <div className="oq2-dirs" role="group" aria-label="Chiều rải">
                    {dirButton('cw')}
                    {dirButton('ccw')}
                  </div>
                  <button type="button" className="oq2-btn oq2-btn--ghost" onClick={() => setStage({ kind: 'select' })}>Đổi ô</button>
                </>
              ) : null}
              {anim && !anim.done ? (
                <button type="button" className="oq2-btn oq2-btn--ghost" onClick={skip}>Bỏ qua ›</button>
              ) : null}
              <div className="oq2-speed" role="group" aria-label="Tốc độ hoạt ảnh">
                {([1, 2, 4] as Speed[]).map((v) => (
                  <button key={v} type="button" className={`oq2-btn oq2-btn--small oq2-speed__btn${speed === v ? ' is-on' : ''}`} aria-pressed={speed === v} onClick={() => setSpeed(v)}>{v}×</button>
                ))}
              </div>
            </div>
          </>
        )}
      </footer>

      <FxLayer vis={vis} boardEl={boardWrapRef.current} reduced={reduced} moveMs={moveMs} dropMs={dropMs} flyMs={flyMs} />

      {logOpen ? (
        <aside className="oq2-log" aria-label="Nhật ký ván">
          <h2>Nhật ký ván</h2>
          {log.length ? <ol>{log.map((l, i) => <li key={i}>{l}</li>)}</ol> : <p>Chưa có nước đi.</p>}
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => setLogOpen(false)}>Đóng</button>
        </aside>
      ) : null}

      {stage.kind === 'card' ? (
        <ChallengeCard
          key={`card${stage.uid}`}
          card={stage.card}
          answerer={names[stage.capture.mover]}
          referee={names[other(stage.capture.mover)]}
          timerMode={setup.timer}
          chainIndex={stage.capture.chainIndex}
          onDone={(timedOut) => setStage({ kind: 'referee', uid: stage.uid, capture: stage.capture, card: stage.card, timedOut, before: game, committed: null })}
        />
      ) : null}
      {stage.kind === 'referee' ? (
        <RefereePanel
          key={`ref${stage.uid}`}
          card={stage.card}
          answerer={names[stage.capture.mover]}
          referee={names[other(stage.capture.mover)]}
          pitName={pitName(stage.capture.target)}
          timedOut={stage.timedOut}
          onCommit={commitVerdict}
          onContinue={refereeContinue}
        />
      ) : null}
      {rulesOpen ? <RulesDialog onClose={() => setRulesOpen(false)} /> : null}
    </div>
  );
}

// ------------------------------------------------------------------ S8 (tự tiếp tục)

function ResultBanner({ frame, card, names, paused, holdMs, onContinue, onTogglePause }: {
  frame: Extract<Frame, { kind: 'result' }>;
  card: DemoCard | null;
  names: Record<PlayerId, string>;
  paused: boolean;
  holdMs: number;
  onContinue: () => void;
  onTogglePause: () => void;
}) {
  const pass = frame.verdict === 'pass';
  const theme = themeOfRing(frame.target);
  const gained = frame.dan + frame.quan * 10;
  return (
    <section className={`oq2-result ${pass ? 'is-pass' : 'is-fail'}`} aria-labelledby="oq2-result-title" role="status">
      <span className="oq2-result__icon" aria-hidden="true">{pass ? '✓' : '↺'}</span>
      <div className="oq2-result__body">
        <h2 id="oq2-result-title">
          {pass ? `Đạt! ${names[frame.mover]} thu hoạch ${pitName(frame.target)}` : `Chưa đạt. Hạt vẫn ở ${pitName(frame.target)}.`}
        </h2>
        <p className="oq2-result__line">
          <span className={`oq2-theme-chip oq2-theme--${theme}`} aria-hidden="true"><ThemeIcon theme={theme} size={14} /></span>
          {pass ? <strong className="oq2-result__gain">+{gained} điểm</strong> : <span>Giữ nguyên ô</span>}
          <span className="oq2-chip oq2-chip--referee">Trọng tài {names[other(frame.mover)]} chốt: {pass ? 'Đạt' : 'Chưa đạt'}</span>
          {card ? <span className="oq2-result__card">{card.title} · <LevelPill level={card.level} /></span> : null}
        </p>
        {card ? <p className="oq2-remember"><b>Điều nên nhớ</b> <span className="oq2-tag">bản tóm tắt · DEMO</span> {card.remember}</p> : null}
      </div>
      <div className="oq2-result__actions">
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={onContinue}>Tiếp tục</button>
        <button type="button" className="oq2-btn oq2-btn--small" aria-pressed={paused} onClick={onTogglePause}>{paused ? 'Tự tiếp tục' : 'Giữ lại'}</button>
      </div>
      <span className="oq2-result__timer" aria-hidden="true">
        <span key={`${frame.target}-${frame.verdict}`} style={{ animationDuration: `${holdMs}ms`, animationPlayState: paused ? 'paused' : 'running' } as CSSProperties} />
      </span>
    </section>
  );
}
