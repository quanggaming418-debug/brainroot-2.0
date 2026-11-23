import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  PLAYTEST_V0, applyAction, computeScores, createGame, getLegalPits, isQuanPit, other, pitLabel,
  previewSow, winner, type Direction, type EngineEvent, type GameState, type PendingCapture,
  type PlayerId, type RingIndex, type StepResult,
} from '../engine';
import { DemoDeck, type DemoCard } from '../content/demoCards';
import { THEMES, themeOfRing } from '../content/themes';
import { publicUrl } from '../../../utils/publicUrl';
import { Board, type BoardLayout } from './Board';
import { ChallengeCard, LevelPill, RefereePanel, type TimerMode, type Verdict } from './Challenge';
import { ThemeIcon } from './Icons';

// ------------------------------------------------------------------ tiện ích

interface Setup {
  readonly names: Record<PlayerId, string>;
  readonly first: PlayerId | 'random';
  readonly timer: TimerMode;
}

function useLayout(): BoardLayout {
  const get = (): BoardLayout => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return w < 700 || (h > w * 1.05 && w < 1000) ? 'portrait' : 'landscape';
  };
  const [layout, setLayout] = useState<BoardLayout>(get);
  useEffect(() => {
    const on = () => setLayout(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return layout;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

function pitName(ring: RingIndex): string {
  if (isQuanPit(ring)) return `Ô Quan ${THEMES[themeOfRing(ring)].name}`;
  return `Ô ${THEMES[themeOfRing(ring)].name} (${pitLabel(ring)})`;
}

function findEvent<T extends EngineEvent['type']>(events: readonly EngineEvent[], type: T) {
  return events.find((e) => e.type === type) as Extract<EngineEvent, { type: T }> | undefined;
}

function describeEvents(events: readonly EngineEvent[], names: Record<PlayerId, string>): string[] {
  const out: string[] = [];
  for (const e of events) {
    switch (e.type) {
      case 'sowed':
        out.push(`${names[e.player]} rải ${e.picked} hạt từ ${pitLabel(e.origin)} ${e.direction === 'cw' ? '↻' : '↺'}, hạt cuối ở ${pitLabel(e.drops[e.drops.length - 1])}.`);
        break;
      case 'captureOpportunity':
        out.push(`Cơ hội ăn ${pitName(e.capture.target)} · thẻ Cấp ${e.capture.level}.`);
        break;
      case 'noCapture':
        out.push(e.reason === 'gapHasSeeds' ? 'Ô sau hạt cuối có hạt: hết lượt.' : e.reason === 'gapIsQuan' ? 'Ô sau hạt cuối là Ô Quan: không có cơ hội ăn.' : 'Không có ô để ăn: hết lượt.');
        break;
      case 'refereeCommitted':
        out.push(e.verdict === 'pass'
          ? `Trọng tài chốt Đạt: ${names[e.mover]} thu hoạch ${e.harvestedDan} hạt${e.harvestedQuan ? ' và 1 quân Quan' : ''} ở ${pitLabel(e.target)}.`
          : `Trọng tài chốt Chưa đạt: hạt giữ nguyên ở ${pitLabel(e.target)}.`);
        break;
      case 'restocked':
        out.push(`Hàng của ${names[e.player]} trống: đặt lại 5 hạt (${e.fromOwnStore} từ kho mình${e.borrowed ? `, mượn ${e.borrowed} của đối thủ` : ''}).`);
        break;
      case 'turnChanged':
        out.push(`Lượt ${e.turn}: ${names[e.to]}.`);
        break;
      case 'gameOver':
        out.push(e.reason === 'allQuanHarvested' ? 'Cả hai quân Quan đã được thu hoạch: ván kết thúc.' : 'Không đủ 5 hạt để đặt lại hàng trống: ván kết thúc sớm.');
        break;
    }
  }
  return out;
}

const NO_CAPTURE_TEXT: Record<string, string> = {
  gapHasSeeds: 'Ô ngay sau hạt cuối có hạt, nên không có cơ hội ăn. Hết lượt.',
  gapIsQuan: 'Ô ngay sau hạt cuối là Ô Quan, nên không có cơ hội ăn. Hết lượt.',
  targetEmpty: 'Sau ô trống không còn hạt để ăn. Hết lượt.',
};

// ------------------------------------------------------------------ khung trang

function StatusChips() {
  return (
    <span className="oq2-chips">
      <span className="oq2-status oq2-status--rules">Luật bản thử · PLAYTEST V0</span>
      <span className="oq2-status">Thẻ DEMO</span>
    </span>
  );
}

function RulesDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, []);
  return (
    <div className="oq2-modal" role="dialog" aria-modal="true" aria-labelledby="oq2-rules-title">
      <div className="oq2-modal__box">
        <h2 id="oq2-rules-title" tabIndex={-1} ref={ref}>Luật bản thử (PLAYTEST V0)</h2>
        <p className="oq2-note">Cấu hình thử nghiệm do Product Owner duyệt để chơi thử. Chưa phải luật chính thức của dự án.</p>
        <ul className="oq2-rules">
          <li>Mỗi Ô Dân có 5 hạt; hai Ô Quan mỗi ô có 1 quân Quan (10 điểm).</li>
          <li>Đến lượt: chọn một Ô Dân có hạt ở hàng của mình, chọn chiều rải.</li>
          <li>Bốc hết hạt, rải mỗi Ô Dân một hạt, <strong>bỏ qua hai Ô Quan</strong>. Mỗi lượt chỉ rải một lần.</li>
          <li>Ô ngay sau hạt cuối là <strong>Ô Dân trống</strong> và ô kế tiếp có hạt hoặc quân Quan: có <strong>cơ hội ăn</strong> (tối đa một lần mỗi lượt).</li>
          <li>Thẻ: Ô Dân 1–3 hạt Cấp 1; từ 4 hạt Cấp 2; Ô Quan Cấp 3. Người vừa rải trả lời, đối thủ làm Trọng tài.</li>
          <li>Trọng tài chốt <strong>Đạt</strong>: người rải thu hoạch cả ô. <strong>Chưa đạt</strong>: ô giữ nguyên. Sau đó đổi lượt.</li>
          <li>Hàng mình trống: lấy 5 hạt từ kho mình (thiếu thì mượn đối thủ, ghi nợ). Cả hai kho không đủ 5 hạt: ván kết thúc.</li>
          <li>Ván kết thúc khi hai quân Quan đã được thu hoạch. Hạt còn trên hàng ai thì về người đó; Quan chưa ăn không tính cho ai.</li>
          <li>Điểm = số hạt + 10 điểm mỗi quân Quan, trừ hạt đã mượn. Bằng điểm là hòa.</li>
        </ul>
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ S1, S2

function StartScreen({ onPlay, onRules }: { onPlay: () => void; onRules: () => void }) {
  const h = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h.current?.focus(); }, []);
  return (
    <main className="oq2-start" id="main-content">
      <div className="oq2-start__copy">
        <p className="oq2-eyebrow">BRAINROOT · GREEN PLAY · BẢN CHƠI THỬ NỘI BỘ</p>
        <h1 tabIndex={-1} ref={h}>Ô ăn quan <span>xanh</span></h1>
        <p className="oq2-lead">Rải quân, ăn quân, và chứng minh bạn biết cách giữ gìn tài nguyên.</p>
        <StatusChips />
        <div className="oq2-start__actions">
          <button type="button" className="oq2-btn oq2-btn--primary oq2-btn--lg" onClick={onPlay}>Chơi 2 người</button>
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onRules}>Xem luật tóm tắt</button>
        </div>
        <ul className="oq2-start__themes" aria-label="5 chủ đề">
          {(['green', 'energy', 'waste', 'water', 'consume'] as const).map((t) => (
            <li key={t} className={`oq2-theme--${t}`}><ThemeIcon theme={t} size={16} /> {THEMES[t].name}</li>
          ))}
        </ul>
      </div>
      <div className="oq2-start__art" aria-hidden="true">
        <img src={publicUrl('/assets/hero-v4/brainie.webp')} alt="" className="oq2-mascot oq2-mascot--a" />
        <img src={publicUrl('/assets/hero-v4/rootie.webp')} alt="" className="oq2-mascot oq2-mascot--b" />
      </div>
    </main>
  );
}

function SetupScreen({ initial, onStart, onBack }: { initial: Setup; onStart: (s: Setup) => void; onBack: () => void }) {
  const [p1, setP1] = useState(initial.names.P1);
  const [p2, setP2] = useState(initial.names.P2);
  const [first, setFirst] = useState<Setup['first']>(initial.first);
  const [timer, setTimer] = useState<TimerMode>(initial.timer);
  const h = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h.current?.focus(); }, []);
  const option = <T extends string>(name: string, value: T, current: T, set: (v: T) => void, label: string, hint?: string) => (
    <label className={`oq2-option${current === value ? ' is-on' : ''}`}>
      <input type="radio" name={name} value={value} checked={current === value} onChange={() => set(value)} />
      <span><strong>{label}</strong>{hint ? <small>{hint}</small> : null}</span>
    </label>
  );
  return (
    <main className="oq2-setup" id="main-content">
      <form
        className="oq2-setup__form"
        onSubmit={(e) => {
          e.preventDefault();
          onStart({ names: { P1: p1.trim() || 'Người chơi 1', P2: p2.trim() || 'Người chơi 2' }, first, timer });
        }}
      >
        <div className="oq2-setup__scroll">
          <h1 tabIndex={-1} ref={h}>Thiết lập ván</h1>
          <StatusChips />
          <fieldset>
            <legend>Người chơi</legend>
            <label className="oq2-field">Người chơi 1 · hàng dưới (D1–D5)
              <input value={p1} maxLength={20} onChange={(e) => setP1(e.target.value)} placeholder="Người chơi 1" />
            </label>
            <label className="oq2-field">Người chơi 2 · hàng trên (T1–T5)
              <input value={p2} maxLength={20} onChange={(e) => setP2(e.target.value)} placeholder="Người chơi 2" />
            </label>
            <p className="oq2-note">Tên chỉ dùng trên máy này, không lưu lên máy chủ.</p>
          </fieldset>
          <fieldset>
            <legend>Ai đi trước</legend>
            <div className="oq2-options">
              {option('first', 'P1', first, setFirst, 'Người chơi 1')}
              {option('first', 'P2', first, setFirst, 'Người chơi 2')}
              {option('first', 'random', first, setFirst, 'Ngẫu nhiên')}
            </div>
          </fieldset>
          <fieldset>
            <legend>Thời gian trả lời</legend>
            <div className="oq2-options">
              {option('timer', 'standard', timer, setTimer, 'Chuẩn', 'Theo thời gian ghi trên thẻ')}
              {option('timer', 'extended', timer, setTimer, '+50%', 'Thêm một nửa thời gian')}
              {option('timer', 'untimed', timer, setTimer, 'Không bấm giờ', 'Trả lời xong thì bấm Xong')}
            </div>
          </fieldset>
          <p className="oq2-note">Trọng tài: đối thủ chấm trên cùng máy (luật bản thử). Thẻ trong bản này là thẻ DEMO tự viết, không phải bộ thẻ chính thức.</p>
        </div>
        <div className="oq2-setup__bar">
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onBack}>Quay lại</button>
          <button type="submit" className="oq2-btn oq2-btn--primary">Bắt đầu ván</button>
        </div>
      </form>
    </main>
  );
}

// ------------------------------------------------------------------ S3–S8

type Stage =
  | { kind: 'select' }
  | { kind: 'direction'; pit: RingIndex; dir: Direction | null }
  | { kind: 'sowing'; prev: GameState; result: StepResult; prevPits: readonly number[]; origin: RingIndex; drops: readonly RingIndex[]; k: number }
  | { kind: 'sowResult'; prev: GameState; result: StepResult; afterPits: readonly number[] }
  | { kind: 'card'; capture: PendingCapture; card: DemoCard; afterPits: readonly number[] }
  | { kind: 'referee'; capture: PendingCapture; card: DemoCard; afterPits: readonly number[]; timedOut: boolean; committed: StepResult | null }
  | { kind: 'result'; capture: PendingCapture; card: DemoCard; result: StepResult; verdict: Verdict; afterPits: readonly number[]; afterQuan: readonly [boolean, boolean] };

function PlayerPlate({ id, game, names, active }: { id: PlayerId; game: GameState; names: Record<PlayerId, string>; active: boolean }) {
  const s = computeScores(game)[id];
  return (
    <div className={`oq2-plate${active ? ' is-active' : ''}`} aria-label={`${names[id]}: ${s.total} điểm${active ? ', đang đi' : ''}`}>
      <span className={`oq2-avatar oq2-avatar--${id}`} aria-hidden="true">{names[id].trim().charAt(0).toUpperCase()}</span>
      <span className="oq2-plate__who">
        <strong>{names[id]}</strong>
        <small>{id === 'P1' ? 'Hàng dưới' : 'Hàng trên'}{active ? <em className="oq2-plate__turn"> · ĐANG ĐI</em> : null}</small>
      </span>
      <span className="oq2-plate__store" aria-hidden="true">
        <span title="Hạt trong kho">{s.danInStore} hạt</span>
        {s.quanCount ? <span title="Quân Quan">+ {s.quanCount} Quan</span> : null}
        {s.debtOwed ? <span className="oq2-debt" title="Hạt đã mượn">nợ {s.debtOwed}</span> : null}
      </span>
      <span className="oq2-plate__score" aria-hidden="true"><b>{s.total}</b><small>điểm</small></span>
    </div>
  );
}

function GameScreen({ setup, onEnd, onQuit }: { setup: Setup; onEnd: (g: GameState, lessons: string[]) => void; onQuit: () => void }) {
  const layout = useLayout();
  const reduced = useReducedMotion();
  const names = setup.names;
  const [game, setGame] = useState<GameState>(() => createGame({
    rules: PLAYTEST_V0,
    initialPlayer: setup.first === 'random' ? (Math.random() < 0.5 ? 'P1' : 'P2') : setup.first,
  }));
  const [stage, setStage] = useState<Stage>({ kind: 'select' });
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [lessons, setLessons] = useState<string[]>([]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const deck = useMemo(() => new DemoDeck(Math.random), []);
  const actionRef = useRef<HTMLButtonElement>(null);

  const mover = game.current;
  const legal = useMemo(() => new Set<number>(getLegalPits(game)), [game]);

  useEffect(() => {
    if (stage.kind === 'select') {
      setMessage((m) => m || `Lượt của ${names[game.current]}: chọn một Ô Dân có hạt ở hàng của mình.`);
    }
  }, [stage.kind, game, names]);

  // Hoạt ảnh rải từng hạt
  useEffect(() => {
    if (stage.kind !== 'sowing') return;
    if (stage.k >= stage.drops.length) {
      const afterPits = stage.prevPits.map((v, i) => (i === stage.origin ? 0 : v));
      stage.drops.forEach((r) => { afterPits[r] += 1; });
      setStage({ kind: 'sowResult', prev: stage.prev, result: stage.result, afterPits });
      const last = stage.drops[stage.drops.length - 1];
      setMessage(last !== undefined ? `Rải xong, hạt cuối ở ${pitLabel(last)}.` : '');
      return;
    }
    const t = window.setTimeout(() => setStage({ ...stage, k: stage.k + 1 }), reduced ? 0 : 230);
    return () => window.clearTimeout(t);
  }, [stage, reduced]);

  useEffect(() => {
    if (stage.kind === 'direction' || stage.kind === 'sowResult' || stage.kind === 'sowing') actionRef.current?.focus();
  }, [stage.kind]);

  const appendLog = (events: readonly EngineEvent[]) => setLog((l) => [...l, ...describeEvents(events, names)]);

  // ---- hiển thị bàn theo giai đoạn
  let pits: readonly number[] = game.pits;
  let quan: readonly [boolean, boolean] = game.quanOnBoard;
  let plates: GameState = game;
  let selected: number | null = null;
  let path: readonly number[] = [];
  let activeDrop: number | null = null;
  let target: number | null = null;
  let targetChip: string | null = null;
  let harvested: number | null = null;
  let shake: number | null = null;

  if (stage.kind === 'direction') {
    selected = stage.pit;
    path = stage.dir ? previewSow(game, stage.pit, stage.dir) : [];
  } else if (stage.kind === 'sowing') {
    const shown = stage.prevPits.map((v, i) => (i === stage.origin ? 0 : v));
    stage.drops.slice(0, stage.k).forEach((r) => { shown[r] += 1; });
    pits = shown;
    quan = game.quanOnBoard;
    plates = stage.prev;
    selected = stage.origin;
    activeDrop = stage.k > 0 ? stage.drops[stage.k - 1] : null;
  } else if (stage.kind === 'sowResult' || stage.kind === 'card' || stage.kind === 'referee') {
    pits = stage.afterPits;
    const cap = stage.kind === 'sowResult' ? findEvent(stage.result.events, 'captureOpportunity')?.capture : stage.capture;
    if (cap) {
      target = cap.target;
      targetChip = `Ăn ${cap.danSeeds}${cap.hasQuan ? ' + Quan' : ' hạt'} · Cấp ${cap.level}`;
    }
    if (stage.kind === 'sowResult') plates = stage.prev;
  } else if (stage.kind === 'result') {
    pits = stage.afterPits;
    quan = stage.afterQuan;
    if (stage.verdict === 'pass') harvested = stage.capture.target;
    else shake = reduced ? null : stage.capture.target;
  }

  // ---- hành động
  const onSelectPit = (ring: RingIndex) => {
    setStage({ kind: 'direction', pit: ring, dir: null });
    setMessage(`Đã chọn ${pitLabel(ring)} (${game.pits[ring]} hạt). Chọn chiều rải.`);
  };
  const onRejected = (ring: RingIndex) => {
    if (isQuanPit(ring)) setMessage('Không được bốc Ô Quan để rải.');
    else if (game.pits[ring] === 0) setMessage(`Ô ${pitLabel(ring)} không có hạt.`);
    else setMessage(`Ô ${pitLabel(ring)} là ô của đối thủ.`);
  };
  const sow = () => {
    if (stage.kind !== 'direction' || !stage.dir) return;
    const prevPits = game.pits;
    const result = applyAction(game, { type: 'sow', pit: stage.pit, direction: stage.dir });
    const sowed = findEvent(result.events, 'sowed');
    setGame(result.state);
    appendLog(result.events);
    setStage({ kind: 'sowing', prev: game, result, prevPits, origin: stage.pit, drops: sowed ? sowed.drops : [], k: reduced ? (sowed?.drops.length ?? 0) : 0 });
    setMessage(`${names[mover]} đang rải ${sowed?.picked ?? 0} hạt…`);
  };
  const afterSowContinue = () => {
    if (stage.kind !== 'sowResult') return;
    const cap = findEvent(stage.result.events, 'captureOpportunity');
    if (cap) {
      const card = deck.draw(themeOfRing(cap.capture.target), cap.capture.level);
      setStage({ kind: 'card', capture: cap.capture, card, afterPits: stage.afterPits });
      return;
    }
    goNext(stage.result);
  };
  const goNext = (result: StepResult) => {
    if (result.state.phase === 'gameOver') {
      onEnd(result.state, lessons);
      return;
    }
    const rs = findEvent(result.events, 'restocked');
    setMessage(rs
      ? `Hàng của ${names[rs.player]} trống: đã đặt lại mỗi ô 1 hạt (${rs.fromOwnStore} từ kho mình${rs.borrowed ? `, mượn ${rs.borrowed} hạt của đối thủ` : ''}). Lượt của ${names[result.state.current]}.`
      : `Lượt của ${names[result.state.current]}: chọn một Ô Dân có hạt ở hàng của mình.`);
    setStage({ kind: 'select' });
  };
  const commitVerdict = (v: Verdict) => {
    if (stage.kind !== 'referee') return;
    const result = applyAction(game, { type: 'commitRefereeResult', verdict: v });
    setGame(result.state);
    appendLog(result.events);
    setStage({ ...stage, committed: result });
    setLessons((l) => (l.includes(stage.card.remember) ? l : [...l, stage.card.remember]));
  };
  const refereeContinue = () => {
    if (stage.kind !== 'referee' || !stage.committed) return;
    const ev = findEvent(stage.committed.events, 'refereeCommitted');
    const verdict: Verdict = ev?.verdict ?? 'fail';
    const afterPits = [...stage.afterPits];
    const afterQuan: [boolean, boolean] = [game.quanOnBoard[0], game.quanOnBoard[1]];
    if (verdict === 'pass') {
      afterPits[stage.capture.target] = 0;
      if (stage.capture.hasQuan) afterQuan[stage.capture.target === 0 ? 0 : 1] = false;
    }
    setStage({
      kind: 'result', capture: stage.capture, card: stage.card, result: stage.committed, verdict,
      afterPits, afterQuan,
    });
    setMessage(verdict === 'pass'
      ? `Đạt: ${names[stage.capture.mover]} thu hoạch ${stage.capture.danSeeds} hạt${stage.capture.hasQuan ? ' và quân Quan' : ''}.`
      : 'Chưa đạt: hạt giữ nguyên ở ô này.');
  };

  const overlay = stage.kind === 'card' || stage.kind === 'referee' || rulesOpen;
  const resultMobile = stage.kind === 'result' && layout === 'portrait';
  const stepIdx = stage.kind === 'select' ? 0 : stage.kind === 'direction' ? 1 : stage.kind === 'sowing' || stage.kind === 'sowResult' ? 2 : 3;
  const referee = names[other(mover)];

  return (
    <div className={`oq2-game oq2-game--${layout}`} data-stage={stage.kind}>
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
        <PlayerPlate id="P2" game={plates} names={names} active={plates.current === 'P2' && plates.phase !== 'gameOver'} />
        <PlayerPlate id="P1" game={plates} names={names} active={plates.current === 'P1' && plates.phase !== 'gameOver'} />
      </div>

      <div className="oq2-stage" inert={overlay} hidden={resultMobile}>
        <Board
          layout={layout}
          pits={pits}
          quanOnBoard={quan}
          playerNames={names}
          interactive={stage.kind === 'select' || stage.kind === 'direction'}
          legal={legal}
          selected={selected}
          path={path}
          activeDrop={activeDrop}
          target={target}
          targetChip={targetChip}
          harvested={harvested}
          shake={shake}
          onSelect={onSelectPit}
          onRejected={onRejected}
        />
      </div>

      {stage.kind === 'result' ? (
        <ResultPanel stage={stage} names={names} game={game} layout={layout} onContinue={() => goNext(stage.result)} />
      ) : null}

      <footer className="oq2-dock" inert={overlay} hidden={stage.kind === 'result'}>
        <ol className="oq2-stepper" aria-label="Các bước của lượt">
          {['Chọn ô', 'Chọn chiều', 'Rải', 'Thẻ'].map((s, i) => (
            <li key={s} className={i === stepIdx ? 'is-current' : i < stepIdx ? 'is-done' : ''} aria-current={i === stepIdx ? 'step' : undefined}>
              <span>{i + 1}</span><em>{s}</em>
            </li>
          ))}
        </ol>
        <p className="oq2-message" aria-live="polite">{message}</p>
        <div className="oq2-dock__actions">
          {stage.kind === 'select' ? <span className="oq2-hint">Mũi tên: chuyển ô · Enter: chọn</span> : null}
          {stage.kind === 'direction' ? (
            <>
              <div className="oq2-dirs" role="group" aria-label="Chiều rải">
                <button type="button" ref={actionRef} className={`oq2-btn oq2-dir${stage.dir === 'cw' ? ' is-on' : ''}`} aria-pressed={stage.dir === 'cw'} onClick={() => setStage({ ...stage, dir: 'cw' })}>
                  <span aria-hidden="true">↻</span> Chiều kim đồng hồ
                </button>
                <button type="button" className={`oq2-btn oq2-dir${stage.dir === 'ccw' ? ' is-on' : ''}`} aria-pressed={stage.dir === 'ccw'} onClick={() => setStage({ ...stage, dir: 'ccw' })}>
                  <span aria-hidden="true">↺</span> Ngược chiều
                </button>
              </div>
              <button type="button" className="oq2-btn oq2-btn--ghost" onClick={() => { setStage({ kind: 'select' }); setMessage(`Lượt của ${names[mover]}: chọn một Ô Dân có hạt ở hàng của mình.`); }}>Đổi ô</button>
              <button type="button" className="oq2-btn oq2-btn--primary" disabled={!stage.dir} onClick={sow}>Rải {game.pits[stage.pit]} hạt</button>
            </>
          ) : null}
          {stage.kind === 'sowing' ? (
            <>
              <span className="oq2-hint">Còn {stage.drops.length - stage.k} hạt trong tay</span>
              <button type="button" ref={actionRef} className="oq2-btn oq2-btn--ghost" onClick={() => setStage({ ...stage, k: stage.drops.length })}>Bỏ qua hoạt ảnh</button>
            </>
          ) : null}
          {stage.kind === 'sowResult' ? (
            <SowResultActions stage={stage} names={names} actionRef={actionRef} onContinue={afterSowContinue} />
          ) : null}
        </div>
      </footer>

      {logOpen ? (
        <aside className="oq2-log" aria-label="Nhật ký ván">
          <h2>Nhật ký ván</h2>
          {log.length ? <ol>{log.map((l, i) => <li key={i}>{l}</li>)}</ol> : <p>Chưa có nước đi.</p>}
          <button type="button" className="oq2-btn oq2-btn--small" onClick={() => setLogOpen(false)}>Đóng</button>
        </aside>
      ) : null}

      {stage.kind === 'card' ? (
        <ChallengeCard
          key={stage.card.id + game.turn}
          card={stage.card}
          answerer={names[stage.capture.mover]}
          referee={names[other(stage.capture.mover)]}
          timerMode={setup.timer}
          onDone={(timedOut) => setStage({ kind: 'referee', capture: stage.capture, card: stage.card, afterPits: stage.afterPits, timedOut, committed: null })}
        />
      ) : null}
      {stage.kind === 'referee' ? (
        <RefereePanel
          card={stage.card}
          answerer={names[stage.capture.mover]}
          referee={referee}
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

function SowResultActions({ stage, names, actionRef, onContinue }: {
  stage: Extract<Stage, { kind: 'sowResult' }>;
  names: Record<PlayerId, string>;
  actionRef: RefObject<HTMLButtonElement | null>;
  onContinue: () => void;
}) {
  const cap = findEvent(stage.result.events, 'captureOpportunity');
  const none = findEvent(stage.result.events, 'noCapture');
  const over = stage.result.state.phase === 'gameOver';
  return (
    <div className={`oq2-banner${cap ? ' oq2-banner--capture' : ''}`}>
      {cap ? (
        <p>
          <strong>Cơ hội ăn {pitName(cap.capture.target)}!</strong> <LevelPill level={cap.capture.level} />{' '}
          <span className="oq2-tag">theo luật bản thử</span>
          <br />{names[other(cap.capture.mover)]} rút thẻ, {names[cap.capture.mover]} trả lời.
        </p>
      ) : (
        <p>{none ? NO_CAPTURE_TEXT[none.reason] : ''}{over ? ' Ván đã kết thúc.' : ''}</p>
      )}
      <button type="button" ref={actionRef} className="oq2-btn oq2-btn--primary" onClick={onContinue}>
        {cap ? 'Rút thẻ' : over ? 'Xem kết quả ván' : `Lượt tiếp: ${names[stage.result.state.current]}`}
      </button>
    </div>
  );
}

function ResultPanel({ stage, names, game, layout, onContinue }: {
  stage: Extract<Stage, { kind: 'result' }>;
  names: Record<PlayerId, string>;
  game: GameState;
  layout: BoardLayout;
  onContinue: () => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const cap = stage.capture;
  const ev = findEvent(stage.result.events, 'refereeCommitted');
  const pass = stage.verdict === 'pass';
  const theme = themeOfRing(cap.target);
  const moverName = names[cap.mover];
  const gained = (ev?.harvestedDan ?? 0) + (ev?.harvestedQuan ?? 0) * game.rules.scoring.quanPieceValue;
  const over = stage.result.state.phase === 'gameOver';
  return (
    <section className={`oq2-result oq2-result--${layout}${pass ? ' is-pass' : ' is-fail'}`} aria-labelledby="oq2-result-title">
      <div className="oq2-result__scroll">
        <div className="oq2-result__head">
          <span className="oq2-result__icon" aria-hidden="true">{pass ? '✓' : '↺'}</span>
          <div>
            <h2 id="oq2-result-title" tabIndex={-1} ref={ref}>
              {pass ? `Đạt! ${moverName} thu hoạch ${pitName(cap.target)}` : 'Chưa đạt. Hạt vẫn ở ô này.'}
            </h2>
            <p>{stage.card.title} · Cấp {cap.level} · <span className="oq2-demo-tag">THẺ DEMO</span></p>
          </div>
        </div>
        <div className="oq2-result__col">
        <p className="oq2-result__label">Ô LIÊN QUAN</p>
        <div className="oq2-result__pit">
          <span className={`oq2-theme-chip oq2-theme--${theme}`} aria-hidden="true"><ThemeIcon theme={theme} size={18} /></span>
          <span><strong>{pitName(cap.target)}</strong><br />
            {pass ? `Đã thu hoạch · còn 0` : `Giữ nguyên · ${cap.danSeeds} hạt${cap.hasQuan ? ' + Quan' : ''}`}</span>
          {pass ? <b className="oq2-result__gain">+{gained}<small>điểm</small></b> : null}
        </div>
        <p className="oq2-result__store">
          {pass
            ? `Kho của ${moverName}: +${ev?.harvestedDan ?? 0} hạt${ev?.harvestedQuan ? ' và 1 quân Quan (10 điểm)' : ''}.`
            : 'Không có hạt nào vào kho ở lượt này.'}
        </p>
        </div>
        <div className="oq2-result__col">
        <p className="oq2-chip oq2-chip--referee">Trọng tài {names[other(cap.mover)]} chốt: {pass ? 'Đạt' : 'Chưa đạt'}</p>
        <p className="oq2-note">Kết quả do trọng tài quyết định; checklist chỉ ghi lại các ý đã nghe.</p>
        <div className="oq2-remember">
          <p className="oq2-result__label">ĐIỀU NÊN NHỚ <span className="oq2-tag">bản tóm tắt · DEMO</span></p>
          <p>{stage.card.remember}</p>
        </div>
        </div>
      </div>
      <div className="oq2-result__bar">
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={onContinue}>{over ? 'Xem kết quả ván' : 'Tiếp tục'}</button>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ S9

function EndScreen({ game, names, lessons, onReplay, onNew }: {
  game: GameState; names: Record<PlayerId, string>; lessons: string[]; onReplay: () => void; onNew: () => void;
}) {
  const h = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h.current?.focus(); }, []);
  const scores = computeScores(game);
  const w = winner(game);
  const rows: [string, (p: PlayerId) => string][] = [
    ['Hạt trong kho (gồm hạt còn trên hàng)', (p) => String(scores[p].danInStore)],
    ['Quân Quan thu hoạch', (p) => `${scores[p].quanCount} × ${game.rules.scoring.quanPieceValue}`],
    ['Hạt đã mượn (trừ)', (p) => (scores[p].debtOwed ? `−${scores[p].debtOwed}` : '0')],
    ['Hạt cho mượn (cộng)', (p) => (scores[p].debtLent ? `+${scores[p].debtLent}` : '0')],
  ];
  return (
    <main className="oq2-end" id="main-content">
      <div className="oq2-end__box">
        <StatusChips />
        <h1 tabIndex={-1} ref={h}>{w === 'draw' ? 'Hòa — cả hai là Đại sứ Môi trường' : `Đại sứ Môi trường: ${names[w as PlayerId]}`}</h1>
        <p className="oq2-lead">
          {game.endReason === 'allQuanHarvested' ? 'Cả hai quân Quan đã được thu hoạch.' : 'Không còn đủ hạt để đặt lại hàng trống, ván kết thúc sớm.'}
          {' '}Cảm ơn hai bạn đã cùng thu hoạch.
        </p>
        <table className="oq2-score">
          <caption className="oq2-sr">Bảng điểm cuối ván</caption>
          <thead><tr><th scope="col">Mục</th><th scope="col">{names.P1}</th><th scope="col">{names.P2}</th></tr></thead>
          <tbody>
            {rows.map(([label, f]) => <tr key={label}><th scope="row">{label}</th><td>{f('P1')}</td><td>{f('P2')}</td></tr>)}
            <tr className="oq2-score__total"><th scope="row">Tổng điểm</th><td>{scores.P1.total}</td><td>{scores.P2.total}</td></tr>
          </tbody>
        </table>
        {lessons.length ? (
          <section aria-labelledby="oq2-lessons">
            <h2 id="oq2-lessons">Bài học đáng nhớ <span className="oq2-tag">thẻ DEMO</span></h2>
            <ul>{lessons.slice(-3).map((l) => <li key={l}>{l}</li>)}</ul>
          </section>
        ) : null}
        <div className="oq2-end__actions">
          <button type="button" className="oq2-btn oq2-btn--primary" onClick={onReplay}>Chơi lại</button>
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onNew}>Thiết lập ván mới</button>
        </div>
      </div>
    </main>
  );
}

// ------------------------------------------------------------------ gốc

type Screen =
  | { kind: 'start' }
  | { kind: 'setup' }
  | { kind: 'game'; id: number }
  | { kind: 'end'; game: GameState; lessons: string[] };

export function OAnQuanV2App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'start' });
  const [setup, setSetup] = useState<Setup>({ names: { P1: 'Người chơi 1', P2: 'Người chơi 2' }, first: 'P1', timer: 'standard' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [gameId, setGameId] = useState(1);

  return (
    <div className="oqv2">
      <a className="oq2-skip" href="#main-content">Bỏ qua tới nội dung chính</a>
      <div className="oq2-devbar" role="note">
        <span className="oq2-devbar__long">BẢN XEM TRƯỚC CHỈ CHẠY Ở MÔI TRƯỜNG DEV · luật bản thử PLAYTEST V0 · thẻ DEMO · không phải bản phát hành</span>
        <span className="oq2-devbar__short">DEV · PLAYTEST V0 · thẻ DEMO · chưa phát hành</span>
      </div>
      {screen.kind === 'start' ? <StartScreen onPlay={() => setScreen({ kind: 'setup' })} onRules={() => setRulesOpen(true)} /> : null}
      {screen.kind === 'setup' ? (
        <SetupScreen
          initial={setup}
          onBack={() => setScreen({ kind: 'start' })}
          onStart={(s) => { setSetup(s); setGameId((n) => n + 1); setScreen({ kind: 'game', id: gameId + 1 }); }}
        />
      ) : null}
      {screen.kind === 'game' ? (
        <GameScreen
          key={screen.id}
          setup={setup}
          onEnd={(game, lessons) => setScreen({ kind: 'end', game, lessons })}
          onQuit={() => setScreen({ kind: 'start' })}
        />
      ) : null}
      {screen.kind === 'end' ? (
        <EndScreen
          game={screen.game}
          names={setup.names}
          lessons={screen.lessons}
          onReplay={() => { setGameId((n) => n + 1); setScreen({ kind: 'game', id: gameId + 1 }); }}
          onNew={() => setScreen({ kind: 'setup' })}
        />
      ) : null}
      {rulesOpen ? <RulesDialog onClose={() => setRulesOpen(false)} /> : null}
    </div>
  );
}
