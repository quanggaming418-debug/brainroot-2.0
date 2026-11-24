import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  PLAYTEST_V1, applyAction, computeScores, createGame, getLegalPits, isQuanPit, other, pitLabel, previewSow,
  type Direction, type EngineEvent, type GameState, type PendingCapture, type PlayerId, type RingIndex, type StepResult,
} from '../engine';
import type { DemoCard } from '../content/demoCards';
import { CardDeck } from '../content/internalDeck';
import { loadActiveDeck } from '../content/activeDeck';
import { play as sfx, type Sfx } from './audio';
import { themeOfRing } from '../content/themes';
import { Board, NO_MARKS, type BoardLayout, type BoardMarks } from './Board';
import { ChallengeCard, type Verdict } from './Challenge';
import { HandSprite } from './Hand';
import { Mascot, SeedToken } from './Icons';
import { BASKET, FX, GARDEN_DESKTOP, GARDEN_MOBILE, QUAN_MASCOT, type HandPose, type MascotId, type MascotPose } from './assets';
import { applyFrame, buildFrames, frameDuration, snapshotOf, type Frame, type Snapshot } from './playback';
import { RulesDialog, SoundToggle, StatusChips, pitName, useLayout, useReducedMotion, type Setup } from './shared';
import { useTr, type Key, type Lazy, type Tr } from './i18n';

// ------------------------------------------------------------------ văn bản

function chipOf(c: PendingCapture): Lazy {
  return (t) => t(c.chainIndex ? (c.hasQuan ? 'chip.eatNextQuan' : 'chip.eatNext') : (c.hasQuan ? 'chip.eatQuan' : 'chip.eat'), { n: c.danSeeds, level: c.level });
}

function describeEvents(events: readonly EngineEvent[], names: Record<PlayerId, string>): Lazy[] {
  const out: Lazy[] = [];
  let drops = 0;
  for (const e of events) {
    switch (e.type) {
      case 'pickup':
        out.push(e.relay
          ? (t) => t('log.relay', { n: e.count, pit: pitLabel(e.ring) })
          : (t) => t(e.direction === 'cw' ? 'log.pickCw' : 'log.pickCcw', { name: names[e.player], n: e.count, pit: pitLabel(e.ring) }));
        break;
      case 'drop':
        if (e.intoQuanPit) drops++;
        break;
      case 'sowEnded': {
        const d = drops;
        out.push((t) => t('log.sowEnd', {
          pit: pitLabel(e.last),
          relays: e.relays ? t('log.relays', { n: e.relays }) : '',
          drops: d ? t('log.drops', { n: d }) : '',
          why: t(`sowEnd.${e.reason}` as Key),
        }));
        break;
      }
      case 'captureOpportunity':
        out.push((t) => t('log.capture', { lead: t(e.capture.chainIndex ? 'msg.leadChain' : 'msg.leadChance'), pit: pitName(t, e.capture.target), level: e.capture.level }));
        break;
      case 'refereeCommitted':
        out.push(e.verdict === 'pass'
          ? (t) => t(e.harvestedQuan ? 'log.passQuan' : 'log.pass', { name: names[e.mover], n: e.harvestedDan, pit: pitLabel(e.target) })
          : (t) => t('log.fail', { pit: pitLabel(e.target) }));
        break;
      case 'chainEnded':
        if (e.reason !== 'refereeFail') out.push((t) => t(`chainEnd.${e.reason}` as Key));
        break;
      case 'restocked':
        out.push((t) => t(e.borrowed ? 'log.restockBorrow' : 'log.restock', { name: names[e.player], own: e.fromOwnStore, b: e.borrowed }));
        break;
      case 'turnChanged':
        out.push((t) => t('log.turn', { n: e.turn, name: names[e.to] }));
        break;
      case 'gameOver':
        out.push((t) => t(e.reason === 'allQuanHarvested' ? 'log.overQuan' : 'log.overSeeds'));
        break;
    }
  }
  return out;
}

// ------------------------------------------------------------------ hướng trên màn hình

type ScreenDir = 'left' | 'right' | 'up' | 'down';

/** Chiều kim đồng hồ = ringIndex tăng. Đổi sang hướng người chơi thấy trên màn hình theo ô và bố cục. */
function screenDir(ring: number, dir: Direction, layout: 'landscape' | 'portrait'): ScreenDir {
  const cw = dir === 'cw';
  if (layout === 'landscape') {
    const topRow = ring >= 1 && ring <= 5; // hàng trên đi sang phải khi tăng ringIndex
    return topRow === cw ? 'right' : 'left';
  }
  const rightCol = ring >= 1 && ring <= 5; // cột phải đi xuống khi tăng ringIndex
  return rightCol === cw ? 'down' : 'up';
}
const DIR_ARROW: Record<ScreenDir, string> = { left: '←', right: '→', up: '↑', down: '↓' };

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
  readonly hand: { readonly ring: RingIndex; readonly count: number; readonly pose: HandPose } | null;
  readonly message: Lazy;
  readonly dropKey: number;
  readonly dropRing: RingIndex | null;
  readonly flyKey: number;
  readonly fly: { readonly from: RingIndex; readonly to: PlayerId; readonly dan: number; readonly quan: number } | null;
  readonly toast: Lazy | null;
}

const EMPTY_VISUAL: Visual = {
  marks: NO_MARKS, hand: null, message: () => '', dropKey: 0, dropRing: null, flyKey: 0, fly: null, toast: null,
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
    case 'reach':
      return {
        ...base,
        hand: { ring: f.ring, count: prev.hand?.count ?? 0, pose: 'reach' },
        marks: { ...prev.marks, active: f.ring },
      };
    case 'pickup':
      return {
        ...base,
        hand: { ring: f.ring, count: f.count, pose: 'pick' },
        marks: { ...NO_MARKS, origin: f.relay ? prev.marks.origin : f.ring, active: f.ring },
        message: f.relay ? (t) => t('msg.pickRelay', { n: f.count, pit: pitLabel(f.ring) }) : (t) => t('msg.pick', { name: names[f.player], n: f.count, pit: pitLabel(f.ring) }),
      };
    case 'move':
      return { ...base, hand: { ring: f.ring, count: f.hand, pose: 'carry' }, marks: { ...prev.marks, active: f.ring, quanPulse: null } };
    case 'drop':
      return {
        ...base,
        hand: { ring: f.ring, count: f.handLeft, pose: 'drop' },
        marks: { ...prev.marks, active: f.ring, quanPulse: f.intoQuanPit ? f.ring : null },
        dropKey: prev.dropKey + 1,
        dropRing: f.ring,
        message: f.intoQuanPit
          ? (t) => t('msg.dropQuan', { pit: pitName(t, f.ring), n: f.handLeft })
          : (t) => t('msg.drop', { pit: pitLabel(f.ring), n: f.handLeft }),
      };
    case 'sowEnd':
      return { ...base, hand: { ring: f.last, count: 0, pose: 'retract' }, marks: { ...NO_MARKS, origin: prev.marks.origin, active: f.last, stopAt: f.next }, message: (t) => t(`sowEnd.${f.reason}` as Key) };
    case 'capture':
      return {
        ...base,
        hand: null,
        marks: { ...NO_MARKS, stopAt: null, target: f.capture.target, targetChip: chipOf(f.capture) },
        message: (t) => t('msg.capture', { lead: t(f.capture.chainIndex ? 'msg.leadChainBang' : 'msg.leadChanceBang'), pit: pitName(t, f.capture.target), level: f.capture.level, name: names[f.capture.mover] }),
      };
    case 'harvest':
      return {
        ...base,
        marks: { ...NO_MARKS, harvested: f.target },
        flyKey: prev.flyKey + 1,
        fly: { from: f.target, to: f.mover, dan: f.dan, quan: f.quan },
        message: (t) => t(f.quan ? 'msg.harvestQuan' : 'msg.harvest', { name: names[f.mover], n: f.dan }),
      };
    case 'keep':
      return { ...base, marks: { ...NO_MARKS, shake: f.target }, message: (t) => t('msg.keep') };
    case 'chainEnd':
      return { ...base, marks: { ...NO_MARKS, stopAt: f.at }, message: (t) => t(`chainEnd.${f.reason}` as Key) };
    case 'restock':
      return { ...base, marks: NO_MARKS, message: (t) => t(f.borrowed ? 'msg.restockBorrow' : 'msg.restock', { name: names[f.player], own: f.fromOwnStore, b: f.borrowed }) };
    case 'turn':
      return { ...base, hand: null, marks: NO_MARKS, toast: (t) => t('toast.turn', { name: names[f.to] }), message: (t) => t('msg.turn', { name: names[f.to] }) };
    case 'gameOver':
      return { ...base, hand: null, marks: NO_MARKS, toast: (t) => t('toast.over'), message: (t) => t(f.reason === 'allQuanHarvested' ? 'msg.overQuan' : 'msg.overSeeds') };
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
    if (kind === 'capture' || kind === 'gameOver' || kind === 'turn') return k;
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
      {hand && vis.hand ? (
        <div
          key={vis.hand.pose === 'retract' ? `r${vis.dropKey}` : 'h'}
          className={`oq2-hand oq2-hand--${vis.hand.pose}`}
          style={{ transform: `translate(${hand.x}px, ${hand.y}px)`, transitionDuration: reduced ? '0ms' : `${moveMs}ms` } as CSSProperties}
        >
          <div className="oq2-hand__sprite"><HandSprite pose={vis.hand.pose} ms={reduced ? 0 : Math.min(moveMs, 220)} /></div>
          {vis.hand.pose !== 'retract' && vis.hand.pose !== 'reach' ? <b className="oq2-hand__count">{vis.hand.count}</b> : null}
        </div>
      ) : null}
      {drop && !reduced ? (
        <img
          key={`ring${vis.dropKey}`}
          src={FX.dropRing}
          alt=""
          className="oq2-fx-ring"
          style={{ left: drop.x, top: drop.y, animationDuration: `${Math.max(dropMs * 1.6, 260)}ms` } as CSSProperties}
        />
      ) : null}
      {flyFrom && !reduced ? (
        <img
          key={`sp${vis.flyKey}`}
          src={FX.harvestSparkle}
          alt=""
          className="oq2-fx-sparkle"
          style={{ left: flyFrom.x, top: flyFrom.y, animationDuration: `${flyMs}ms` } as CSSProperties}
        />
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
  const t = useTr();
  return (
    <div className={`oq2-plate${active ? ' is-active' : ''}`} data-plate={id} aria-label={t(active ? 'plate.ariaTurn' : 'plate.aria', { name: names[id], points: s.total })}>
      <span className={`oq2-avatar oq2-avatar--${id}`} aria-hidden="true">{names[id].trim().charAt(0).toUpperCase()}</span>
      <span className="oq2-plate__who">
        <strong>{names[id]}</strong>
        <small>{id === 'P1' ? t('plate.bottom') : t('plate.top')}{active ? <em className="oq2-plate__turn">{t('plate.turn')}</em> : null}</small>
      </span>
      <span className="oq2-plate__store" aria-hidden="true">
        <span className="oq2-plate__basket"><img src={BASKET} alt="" /><b key={s.danInStore} className="oq2-plate__jar-n">{s.danInStore}</b> {t('common.seeds')}</span>
        {s.quanCount ? <span>{t('plate.quan', { n: s.quanCount })}</span> : null}
        {s.debtOwed ? <span className="oq2-debt">{t('plate.debt', { n: s.debtOwed })}</span> : null}
      </span>
      <span className="oq2-plate__score" aria-hidden="true"><b key={s.total}>{s.total}</b><small>{t('common.points')}</small></span>
    </div>
  );
}

// ------------------------------------------------------------------ màn chơi

type Stage =
  | { kind: 'select' }
  | { kind: 'direction'; pit: RingIndex; hover: Direction | null }
  | { kind: 'playing' }
  | { kind: 'card'; uid: number; capture: PendingCapture; card: DemoCard };

export function GameScreen({ setup, onEnd, onQuit }: {
  setup: Setup;
  onEnd: (g: GameState, lessons: string[], log: Lazy[]) => void;
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
  const t = useTr();
  const [notice, setNotice] = useState<Lazy | null>(null);
  const [log, setLog] = useState<Lazy[]>([]);
  const [lessons, setLessons] = useState<string[]>([]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [toast, setToast] = useState<Lazy | null>(null);
  const [, forceRender] = useState(0);
  const deck = useMemo(() => new CardDeck(Math.random, loadActiveDeck().cards), []);
  const boardWrapRef = useRef<HTMLDivElement>(null);
  const resolvedUidRef = useRef(0);
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
      uidRef.current += 1;
      setStage({ kind: 'card', uid: uidRef.current, capture: s.pending, card });
      return;
    }
    const last = a.frames[a.frames.length - 1];
    if (last?.kind === 'turn') setToast(() => (tt: Tr) => tt('toast.turn', { name: names[last.to] }));
    setNotice(() => (tt: Tr) => tt('msg.yourTurn', { name: names[s.current] }));
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

  // Âm thanh theo từng khung hoạt ảnh
  const sfxFrames = anim?.frames;
  const sfxIndex = anim?.i;
  useEffect(() => {
    if (!sfxFrames || sfxIndex === undefined) return;
    const f = sfxFrames[sfxIndex];
    if (!f) return;
    const map: Partial<Record<Frame['kind'], Sfx>> = {
      pickup: 'pickup', drop: 'drop', sowEnd: 'sowEnd', capture: 'capture', harvest: 'harvest',
      keep: 'keep', turn: 'turn', restock: 'turn', gameOver: 'win',
    };
    const name = map[f.kind];
    if (name) sfx(name);
  }, [sfxFrames, sfxIndex]);

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
    sfx('ui');
    const result = applyAction(game, { type: 'sow', pit, direction: dir });
    setGame(result.state);
    setNotice(null);
    play(result, before, 'afterSow');
  };

  /** Ghi nhan ket qua the dung mot lan (chan xu ly trung theo uid the) roi phat lai ngay. */
  const resolveCard = (v: Verdict) => {
    if (stage.kind !== 'card' || game.phase !== 'awaitingVerdict') return;
    if (resolvedUidRef.current === stage.uid) return;
    resolvedUidRef.current = stage.uid;
    sfx(v === 'pass' ? 'correct' : 'wrong');
    const before = game;
    const result = applyAction(game, { type: 'commitRefereeResult', verdict: v });
    setGame(result.state);
    setLessons((l) => (!stage.card.remember || l.includes(stage.card.remember) ? l : [...l, stage.card.remember]));
    play(result, before, 'afterVerdict');
  };

  const skip = () => setAnim((a) => (a && !a.done ? { ...advance(a, names, nextStopIndex(a)), paused: false } : a));

  // --- hiển thị
  const view: Snapshot = anim ? anim.view
    : snapshotOf(game);
  const vis = anim?.vis ?? EMPTY_VISUAL;
  let marks: BoardMarks = vis.marks;
  if (!anim && stage.kind === 'direction') {
    marks = { ...NO_MARKS, selected: stage.pit, path: stage.hover ? previewSow(game, stage.pit, stage.hover) : [] };
  } else if (!anim && stage.kind === 'card') {
    const c = stage.capture;
    marks = { ...NO_MARKS, target: c.target, targetChip: chipOf({ ...c, chainIndex: 0 }) };
  }
  const interactive = !anim && (stage.kind === 'select' || stage.kind === 'direction');
  const overlay = stage.kind === 'card' || rulesOpen;
  const mover = view.current;
  const message = anim ? vis.message(t)
    : stage.kind === 'direction' ? t('msg.chosen', { pit: pitLabel(stage.pit), n: game.pits[stage.pit], dirs: t(layout === 'landscape' ? 'msg.dirsH' : 'msg.dirsV') })
      : stage.kind === 'card'
        ? t('msg.answer', { lead: t(stage.capture.chainIndex ? 'msg.leadChain' : 'msg.leadChance'), pit: pitName(t, stage.capture.target), name: names[stage.capture.mover] })
        : notice ? notice(t) : t('msg.yourTurn', { name: names[game.current] });
  const turnFrame = anim && !anim.done && (anim.frames[anim.i].kind === 'turn' || anim.frames[anim.i].kind === 'restock');
  const stepIdx = stage.kind === 'select' || turnFrame ? 0 : stage.kind === 'direction' ? 1
    : anim && anim.after === 'afterSow' && anim.frames[anim.i]?.kind !== 'capture' ? 2 : 3;
  const curFrame = anim && !anim.done ? anim.frames[anim.i] : null;
  const moveMs = frameDuration({ kind: 'move', ring: 1, hand: 0 }, speed, reduced);
  const dropMs = frameDuration({ kind: 'drop', ring: 1, handLeft: 0, intoQuanPit: false }, speed, reduced);
  const flyMs = frameDuration({ kind: 'harvest', target: 1, mover: 'P1', dan: 0, quan: 0 }, speed, reduced);

  const onSelectPit = (ring: RingIndex) => { sfx('select'); setStage({ kind: 'direction', pit: ring, hover: null }); };
  const onRejected = (ring: RingIndex) => {
    if (isQuanPit(ring)) setNotice(() => (tt: Tr) => tt('msg.noQuanPick'));
    else if (game.pits[ring] === 0) setNotice(() => (tt: Tr) => tt('msg.emptyPit', { pit: pitLabel(ring) }));
    else setNotice(() => (tt: Tr) => tt('msg.enemyPit', { pit: pitLabel(ring) }));
  };

  // Nút chiều rải gắn ngay trên ô đã chọn
  const selectedCenter = stage.kind === 'direction' && !anim
    ? centerOf(boardWrapRef.current?.querySelector(`[data-ring="${stage.pit}"]`) ?? null) : null;
  const dirButton = (dir: Direction, extra = '') => {
    const sd = stage.kind === 'direction' ? screenDir(stage.pit, dir, layout) : 'left';
    return (
      <button
        type="button"
        className={`oq2-btn oq2-dir oq2-dir--${sd}${extra}`}
        aria-label={t('dir.label', { dir: t(`dir.${sd}` as Key).toLowerCase() })}
        onMouseEnter={() => stage.kind === 'direction' && setStage({ ...stage, hover: dir })}
        onFocus={() => stage.kind === 'direction' && setStage({ ...stage, hover: dir })}
        onMouseLeave={() => stage.kind === 'direction' && setStage({ ...stage, hover: null })}
        onClick={() => stage.kind === 'direction' && sow(stage.pit, dir)}
      >
        <span aria-hidden="true">{DIR_ARROW[sd]}</span>
        <em>{t(`dir.${sd}` as Key)}</em>
      </button>
    );
  };
  // Thứ tự hiển thị: trái trước phải, trên trước dưới
  const orderedDirs: Direction[] = stage.kind === 'direction'
    ? (['cw', 'ccw'] as Direction[]).sort((x, y) => {
      const rank = (d: Direction) => { const v = screenDir(stage.pit, d, layout); return v === 'left' || v === 'up' ? 0 : 1; };
      return rank(x) - rank(y);
    })
    : ['cw', 'ccw'];

  return (
    <div className={`oq2-game oq2-game--${layout}`} data-stage={anim ? 'playing' : stage.kind} data-frame={curFrame?.kind ?? ''} style={{ '--oq2-dockh': `${dockH}px`, '--oq2-garden': `url(${layout === 'portrait' ? GARDEN_MOBILE : GARDEN_DESKTOP})` } as CSSProperties}>
      <header className="oq2-header" inert={overlay}>
        <span className="oq2-header__brand">Brainroot<span aria-hidden="true">.</span> <em>{t('game.brand')}</em></span>
        <StatusChips />
        <span className="oq2-header__actions">
          <SoundToggle />
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => setRulesOpen(true)}>{t('game.rules')}</button>
          <button type="button" className="oq2-btn oq2-btn--small" aria-expanded={logOpen} onClick={() => setLogOpen((v) => !v)}>{t('game.log')}</button>
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => { if (window.confirm(t('game.quitConfirm'))) onQuit(); }}>{t('game.quit')}</button>
        </span>
      </header>

      <div className="oq2-plates" inert={overlay}>
        <PlayerPlate id="P2" view={view} rules={game.rules} names={names} active={mover === 'P2'} />
        <PlayerPlate id="P1" view={view} rules={game.rules} names={names} active={mover === 'P1'} />
      </div>

      <div className="oq2-stage" inert={overlay} ref={boardWrapRef}>
        <MascotCoach layout={layout} frame={curFrame} stage={stage.kind} names={names} mover={mover} />
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
        {vis.toast || toast ? <div className="oq2-toast" role="status">{(vis.toast ?? toast)?.(t)}</div> : null}
        {selectedCenter && stage.kind === 'direction' ? (
          <div className="oq2-pitdirs" style={{ left: selectedCenter.x, top: selectedCenter.y } as CSSProperties}>
            {orderedDirs.map((d) => <span key={d} style={{ display: 'contents' }}>{dirButton(d, ' oq2-dir--mini')}</span>)}
          </div>
        ) : null}
      </div>

      <footer className="oq2-dock" inert={overlay} ref={dockRef}>
        {(
          <>
            <ol className="oq2-stepper" aria-label={t('game.steps')}>
              {(['game.step.pick', 'game.step.dir', 'game.step.sow', 'game.step.card'] as Key[]).map((k) => t(k)).map((s, i) => (
                <li key={s} className={i === stepIdx ? 'is-current' : i < stepIdx ? 'is-done' : ''} aria-current={i === stepIdx ? 'step' : undefined}>
                  <span>{i + 1}</span><em>{s}</em>
                </li>
              ))}
            </ol>
            <p className="oq2-message" aria-live={anim && curFrame && (curFrame.kind === 'move' || curFrame.kind === 'drop') ? 'off' : 'polite'}>{message}</p>
            <div className="oq2-dock__actions">
              {stage.kind === 'direction' && !anim ? (
                <>
                  <div className="oq2-dirs" role="group" aria-label={t('game.dirGroup')}>
                    {orderedDirs.map((d) => <span key={d} style={{ display: 'contents' }}>{dirButton(d)}</span>)}
                  </div>
                  <button type="button" className="oq2-btn oq2-btn--ghost" onClick={() => setStage({ kind: 'select' })}>{t('game.changePit')}</button>
                </>
              ) : null}
              {anim && !anim.done ? (
                <button type="button" className="oq2-btn oq2-btn--ghost" onClick={skip}>{t('game.skip')}</button>
              ) : null}
              <div className="oq2-speed" role="group" aria-label={t('game.speed')}>
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
        <aside className="oq2-log" aria-label={t('game.logTitle')}>
          <h2>{t('game.logTitle')}</h2>
          {log.length ? <ol tabIndex={0} aria-label={t('game.logTitle')}>{log.map((l, i) => <li key={i}>{l(t)}</li>)}</ol> : <p>{t('game.logEmpty')}</p>}
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => setLogOpen(false)}>{t('common.close')}</button>
        </aside>
      ) : null}

      {stage.kind === 'card' ? (
        <ChallengeCard
          key={`card${stage.uid}`}
          card={stage.card}
          answerer={names[stage.capture.mover]}
          opponent={names[other(stage.capture.mover)]}
          timerMode={setup.timer}
          chainIndex={stage.capture.chainIndex}
          mascot={QUAN_MASCOT[themeOfRing(stage.capture.target) === 'biodiversity' ? 'biodiversity' : 'climate']}
          feedbackMs={reduced ? 500 : Math.round(1000 / Math.min(speed, 2))}
          onResolve={resolveCard}
        />
      ) : null}
      {rulesOpen ? <RulesDialog onClose={() => setRulesOpen(false)} /> : null}
    </div>
  );
}

// ------------------------------------------------------------------ linh vật dẫn chuyện

/** Linh vật đứng cạnh bàn, đổi tư thế theo khoảnh khắc; không che bàn (pointer-events:none). */
function MascotCoach({ layout, frame, stage, names, mover }: {
  layout: BoardLayout;
  frame: Frame | null;
  stage: string;
  names: Record<PlayerId, string>;
  mover: PlayerId;
}) {
  const t = useTr();
  let pose: MascotPose = 'idle';
  let who: MascotId = mover === 'P1' ? 'brainie' : 'rootie';
  let line = '';
  const k = frame?.kind;
  if (k === 'capture') {
    pose = 'guide';
    line = t('coach.chance');
  } else if (k === 'harvest') {
    pose = 'cheer';
    who = (frame as Extract<Frame, { kind: 'harvest' }>).mover === 'P1' ? 'brainie' : 'rootie';
    line = t('coach.harvest');
  } else if (k === 'keep') {
    pose = 'thinking';
    line = t('coach.keep');
  } else if (k === 'gameOver') {
    pose = 'win';
    line = t('coach.over');
  } else if (k === 'restock') {
    pose = 'thinking';
    line = t('coach.restock');
  } else if (stage === 'card') {
    pose = 'thinking';
  } else if (k === 'pickup' || k === 'reach') {
    pose = 'happy';
  }
  const size = layout === 'portrait' ? 62 : 104;
  return (
    <div className={`oq2-coach oq2-coach--${pose}`} aria-hidden="true">
      <Mascot who={who} pose={pose} size={size} />
      {line ? <span className="oq2-coach__line">{line}</span> : null}
      <span className="oq2-sr">{names[mover]}</span>
    </div>
  );
}
