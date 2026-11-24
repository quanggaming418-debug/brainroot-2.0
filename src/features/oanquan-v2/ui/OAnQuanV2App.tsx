import { useEffect, useRef, useState } from 'react';
import { computeScores, winner, type GameState, type PlayerId } from '../engine';
import { THEMES } from '../content/themes';
import { publicUrl } from '../../../utils/publicUrl';
import type { TimerMode } from './Challenge';
import { GameScreen } from './GameScreen';
import { Mascot, ThemeIcon } from './Icons';
import { FX } from './assets';
import { RulesDialog, StatusChips, type Setup } from './shared';

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
          <p className="oq2-note">Hai người chơi chung một máy. Trắc nghiệm tự chấm, câu hỏi mở thì đối thủ chấm nhanh ngay trên thẻ. Thẻ trong bản này là thẻ DEMO tự viết, không phải bộ thẻ chính thức.</p>
        </div>
        <div className="oq2-setup__bar">
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onBack}>Quay lại</button>
          <button type="submit" className="oq2-btn oq2-btn--primary">Bắt đầu ván</button>
        </div>
      </form>
    </main>
  );
}

// ------------------------------------------------------------------ S9

function EndScreen({ game, names, lessons, log, onReplay, onNew }: {
  game: GameState; names: Record<PlayerId, string>; lessons: string[]; log: string[]; onReplay: () => void; onNew: () => void;
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
        <div className="oq2-victory" aria-hidden="true">
          <img className="oq2-victory__wreath" src={FX.victoryWreath} alt="" />
          <span className="oq2-victory__mascots">
            <Mascot who="brainie" pose={w === 'P1' || w === 'draw' ? 'win' : 'happy'} size={86} />
            <Mascot who="rootie" pose={w === 'P2' || w === 'draw' ? 'win' : 'happy'} size={86} />
          </span>
        </div>
        <h1 tabIndex={-1} ref={h}>{w === 'draw' ? 'Hòa — cả hai là Đại sứ Môi trường' : `Đại sứ Môi trường: ${names[w as PlayerId]}`}</h1>
        <p className="oq2-lead">
          {game.endReason === 'allQuanHarvested' ? 'Cả hai quân Quan đã được thu hoạch.' : 'Không còn đủ hạt để đặt lại hàng trống, ván kết thúc sớm.'}{game.pits[0] + game.pits[6] ? ` ${game.pits[0] + game.pits[6]} hạt còn trong Ô Quan không tính cho ai.` : ''}
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
        {log.length ? (
          <details className="oq2-end__log">
            <summary>Xem nhật ký ván ({log.length} dòng)</summary>
            <ol>{log.map((l, i) => <li key={i}>{l}</li>)}</ol>
          </details>
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
  | { kind: 'end'; game: GameState; lessons: string[]; log: string[] };

export function OAnQuanV2App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'start' });
  const [setup, setSetup] = useState<Setup>({ names: { P1: 'Người chơi 1', P2: 'Người chơi 2' }, first: 'P1', timer: 'standard' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [gameId, setGameId] = useState(1);

  return (
    <div className="oqv2">
      <a className="oq2-skip" href="#main-content">Bỏ qua tới nội dung chính</a>
      <div className="oq2-devbar" role="note">
        <span className="oq2-devbar__long">BẢN XEM TRƯỚC CHỈ CHẠY Ở MÔI TRƯỜNG DEV · luật bản thử PLAYTEST V1 · thẻ DEMO · không phải bản phát hành</span>
        <span className="oq2-devbar__short">DEV · PLAYTEST V1 · thẻ DEMO · chưa phát hành</span>
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
          onEnd={(game, lessons, log) => setScreen({ kind: 'end', game, lessons, log })}
          onQuit={() => setScreen({ kind: 'start' })}
        />
      ) : null}
      {screen.kind === 'end' ? (
        <EndScreen
          game={screen.game}
          names={setup.names}
          lessons={screen.lessons}
          log={screen.log}
          onReplay={() => { setGameId((n) => n + 1); setScreen({ kind: 'game', id: gameId + 1 }); }}
          onNew={() => setScreen({ kind: 'setup' })}
        />
      ) : null}
      {rulesOpen ? <RulesDialog onClose={() => setRulesOpen(false)} /> : null}
    </div>
  );
}
