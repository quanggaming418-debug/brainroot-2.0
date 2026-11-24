import { createContext, useContext, useEffect, useRef, useState, type ComponentProps } from 'react';
import { computeScores, winner, type GameState, type PlayerId } from '../engine';
import { useTr, type Lazy } from './i18n';
import { publicUrl } from '../../../utils/publicUrl';
import type { TimerMode } from './Challenge';
import { GameScreen } from './GameScreen';
import { Mascot, ThemeIcon } from './Icons';
import { BASKET, FX } from './assets';
import { RulesDialog, SoundToggle, StatusChips, deckText, type Setup } from './shared';
import { GARDEN_DESKTOP, GARDEN_MOBILE } from './assets';

// ------------------------------------------------------------------ S1, S2

/** Khi nhúng vào website chính: dùng <section> thay <main> (trang đã có main#main-content) và có lối về trang chủ. */
export interface EmbedOptions { readonly onHome: () => void }
const EmbedCtx = createContext<EmbedOptions | null>(null);
function Main(props: ComponentProps<'main'>) {
  const embed = useContext(EmbedCtx);
  if (embed) { const { id: _id, ...rest } = props; void _id; return <section {...rest} />; }
  return <main {...props} />;
}
function HomeLink({ className = '' }: { className?: string }) {
  const t = useTr();
  const embed = useContext(EmbedCtx);
  if (!embed) return null;
  return <button type="button" className={`oq2-btn oq2-btn--ghost ${className}`.trim()} onClick={embed.onHome}>{t('common.homeLink')}</button>;
}


function StartScreen({ onPlay, onRules }: { onPlay: () => void; onRules: () => void }) {
  const t = useTr();
  const h = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h.current?.focus(); }, []);
  return (
    <Main className="oq2-start" id="main-content" style={{ '--oq2-garden': `url(${GARDEN_DESKTOP})`, '--oq2-garden-m': `url(${GARDEN_MOBILE})` } as React.CSSProperties}>
      <SoundToggle className="oq2-start__snd" />
      <div className="oq2-start__copy">
        <p className="oq2-eyebrow">{t('start.eyebrow')}</p>
        <h1 tabIndex={-1} ref={h}>{t('start.titleA')} <span>{t('start.titleB')}</span></h1>
        <p className="oq2-lead">{t('start.lead')}</p>
        <StatusChips />
        <div className="oq2-start__actions">
          <button type="button" className="oq2-btn oq2-btn--primary oq2-btn--lg" onClick={onPlay}>{t('start.play')}</button>
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onRules}>{t('start.rules')}</button>
          <HomeLink />
        </div>
        <ol className="oq2-start__steps" aria-label={t('start.steps')}>
          <li><b>1</b><span>{t('start.step1')}</span></li>
          <li><b>2</b><span>{t('start.step2')}</span></li>
          <li><b>3</b><span>{t('start.step3')}</span></li>
        </ol>
        <ul className="oq2-start__themes" aria-label={t('start.themes')}>
          {(['green', 'energy', 'waste', 'water', 'consume'] as const).map((th) => (
            <li key={th} className={`oq2-theme--${th}`}><ThemeIcon theme={th} size={16} /> {t.theme(th)}</li>
          ))}
        </ul>
      </div>
      <div className="oq2-start__art" aria-hidden="true">
        <img src={publicUrl('/assets/hero-v4/brainie.webp')} alt="" className="oq2-mascot oq2-mascot--a" />
        <img src={publicUrl('/assets/hero-v4/rootie.webp')} alt="" className="oq2-mascot oq2-mascot--b" />
      </div>
    </Main>
  );
}

function SetupScreen({ initial, onStart, onBack }: { initial: Setup; onStart: (s: Setup) => void; onBack: () => void }) {
  const t = useTr();
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
    <Main className="oq2-setup" id="main-content">
      <form
        className="oq2-setup__form"
        onSubmit={(e) => {
          e.preventDefault();
          onStart({ names: { P1: p1.trim() || t('common.player1'), P2: p2.trim() || t('common.player2') }, first, timer });
        }}
      >
        <div className="oq2-setup__scroll">
          <h1 tabIndex={-1} ref={h}>{t('setup.title')}</h1>
          <StatusChips />
          <fieldset>
            <legend>{t('setup.players')}</legend>
            <label className="oq2-field">{t('setup.p1')}
              <input value={p1} maxLength={20} onChange={(e) => setP1(e.target.value)} placeholder={t('common.player1')} />
            </label>
            <label className="oq2-field">{t('setup.p2')}
              <input value={p2} maxLength={20} onChange={(e) => setP2(e.target.value)} placeholder={t('common.player2')} />
            </label>
            <p className="oq2-note">{t('setup.nameNote')}</p>
          </fieldset>
          <fieldset>
            <legend>{t('setup.first')}</legend>
            <div className="oq2-options">
              {option('first', 'P1', first, setFirst, t('common.player1'))}
              {option('first', 'P2', first, setFirst, t('common.player2'))}
              {option('first', 'random', first, setFirst, t('setup.random'))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t('setup.timer')}</legend>
            <div className="oq2-options">
              {option('timer', 'standard', timer, setTimer, t('setup.timerStd'), t('setup.timerStdHint'))}
              {option('timer', 'extended', timer, setTimer, t('setup.timerExt'), t('setup.timerExtHint'))}
              {option('timer', 'untimed', timer, setTimer, t('setup.timerOff'), t('setup.timerOffHint'))}
            </div>
          </fieldset>
          <p className="oq2-note">{t('setup.note')} {deckText(t).note}{t.locale === 'en' ? ` ${t('deck.cardsViNote')}` : ''}</p>
        </div>
        <div className="oq2-setup__bar">
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onBack}>{t('common.back')}</button>
          <button type="submit" className="oq2-btn oq2-btn--primary">{t('setup.start')}</button>
        </div>
      </form>
    </Main>
  );
}

// ------------------------------------------------------------------ S9

function EndScreen({ game, names, lessons, log, onReplay, onNew }: {
  game: GameState; names: Record<PlayerId, string>; lessons: string[]; log: Lazy[]; onReplay: () => void; onNew: () => void;
}) {
  const t = useTr();
  const h = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h.current?.focus(); }, []);
  const scores = computeScores(game);
  const w = winner(game);
  const rows: [string, (p: PlayerId) => string][] = [
    [t('end.rowStore'), (p) => String(scores[p].danInStore)],
    [t('end.rowQuan'), (p) => `${scores[p].quanCount} × ${game.rules.scoring.quanPieceValue}`],
    [t('end.rowDebt'), (p) => (scores[p].debtOwed ? `−${scores[p].debtOwed}` : '0')],
    [t('end.rowLent'), (p) => (scores[p].debtLent ? `+${scores[p].debtLent}` : '0')],
  ];
  return (
    <Main className="oq2-end" id="main-content" style={{ '--oq2-garden-end': `url(${GARDEN_DESKTOP})` } as React.CSSProperties}>
      <div className="oq2-end__box">
        <StatusChips />
        <div className="oq2-victory" aria-hidden="true">
          <img className="oq2-victory__wreath" src={FX.victoryWreath} alt="" />
          <span className="oq2-victory__mascots">
            <Mascot who="brainie" pose={w === 'P1' || w === 'draw' ? 'win' : 'happy'} size={86} />
            <Mascot who="rootie" pose={w === 'P2' || w === 'draw' ? 'win' : 'happy'} size={86} />
          </span>
        </div>
        <h1 tabIndex={-1} ref={h}>{w === 'draw' ? t('end.titleDraw') : t('end.titleWin', { name: names[w as PlayerId] })}</h1>
        <p className="oq2-lead">
          {game.endReason === 'allQuanHarvested' ? t('end.overQuan') : t('end.overSeeds')}{game.pits[0] + game.pits[6] ? t('end.leftover', { n: game.pits[0] + game.pits[6] }) : ''}
          {' '}{t('end.thanks')}
        </p>
        <div className="oq2-endcards">
          {(['P1', 'P2'] as PlayerId[]).map((p) => (
            <div key={p} className={`oq2-endcard${w === p ? ' is-winner' : ''}`}>
              {w === p ? <span className="oq2-endcard__crown">{t('end.ambassador')}</span> : null}
              <span className={`oq2-avatar oq2-avatar--${p}`} aria-hidden="true">{names[p].trim().charAt(0).toUpperCase()}</span>
              <strong>{names[p]}</strong>
              <b className="oq2-endcard__score">{scores[p].total}</b>
              <small>{t('common.points')}</small>
              <span className="oq2-endcard__jar"><img src={BASKET} alt="" />{t('end.jar', { n: scores[p].danInStore })}{scores[p].quanCount ? t('end.jarQuan', { n: scores[p].quanCount }) : ''}</span>
            </div>
          ))}
        </div>
        <details className="oq2-end__detail">
          <summary>{t('end.detail')}</summary>
        <table className="oq2-score">
          <caption className="oq2-sr">{t('end.caption')}</caption>
          <thead><tr><th scope="col">{t('end.item')}</th><th scope="col">{names.P1}</th><th scope="col">{names.P2}</th></tr></thead>
          <tbody>
            {rows.map(([label, f]) => <tr key={label}><th scope="row">{label}</th><td>{f('P1')}</td><td>{f('P2')}</td></tr>)}
            <tr className="oq2-score__total"><th scope="row">{t('end.total')}</th><td>{scores.P1.total}</td><td>{scores.P2.total}</td></tr>
          </tbody>
        </table>
        </details>
        {lessons.length ? (
          <section aria-labelledby="oq2-lessons">
            <h2 id="oq2-lessons">{t('end.lessons')} <span className="oq2-tag">{deckText(t).lower}</span></h2>
            <ul>{lessons.slice(-3).map((l) => <li key={l}>{l}</li>)}</ul>
          </section>
        ) : null}
        {log.length ? (
          <details className="oq2-end__log">
            <summary>{t('end.logSummary', { n: log.length })}</summary>
            <ol tabIndex={0} aria-label={t('game.logTitle')}>{log.map((l, i) => <li key={i}>{l(t)}</li>)}</ol>
          </details>
        ) : null}
        <div className="oq2-end__actions">
          <button type="button" className="oq2-btn oq2-btn--primary" onClick={onReplay}>{t('end.replay')}</button>
          <button type="button" className="oq2-btn oq2-btn--ghost" onClick={onNew}>{t('end.newGame')}</button>
          <HomeLink />
        </div>
      </div>
    </Main>
  );
}

// ------------------------------------------------------------------ gốc

type Screen =
  | { kind: 'start' }
  | { kind: 'setup' }
  | { kind: 'game'; id: number }
  | { kind: 'end'; game: GameState; lessons: string[]; log: Lazy[] };

export function OAnQuanV2App({ embed = null }: { embed?: EmbedOptions | null } = {}) {
  const t = useTr();
  const [screen, setScreen] = useState<Screen>({ kind: 'start' });
  const [setup, setSetup] = useState<Setup>({ names: { P1: '', P2: '' }, first: 'P1', timer: 'standard' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [gameId, setGameId] = useState(1);

  return (
    <EmbedCtx.Provider value={embed}>
    <div className={`oqv2${embed ? ' oqv2--embedded' : ''}`}>
      {embed ? null : (
        <>
          <a className="oq2-skip" href="#main-content">{t('skip')}</a>
          <div className="oq2-devbar" role="note">
            <span className="oq2-devbar__long">{t('devbar.long', { deck: deckText(t).lower })}</span>
            <span className="oq2-devbar__short">{t('devbar.short', { deck: deckText(t).lower })}</span>
          </div>
        </>
      )}
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
    </EmbedCtx.Provider>
  );
}
