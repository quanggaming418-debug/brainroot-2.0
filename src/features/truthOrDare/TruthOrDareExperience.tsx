import { useCallback, useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useI18n } from '../../i18n/I18nContext';
import { BrainieFaqPopover } from './BrainieFaqPopover';
import { GreenPenaltyWheelModal } from './GreenPenaltyWheelModal';
import { HardcoverRulebookModal } from './HardcoverRulebookModal';
import { TruthOrDareCardStage } from './TruthOrDareCardStage';
import {
  ACTION_LABELS,
  TOD_ASSETS,
  getTruthOrDareUiCopy,
  type CardSide,
} from './truthOrDareData';
import {
  advanceAfterWheel,
  chooseSideBeforeDraw,
  completeCurrentTurn,
  createInitialTruthOrDareState,
  finishPenaltyWheelSpin,
  finishPullCard,
  finishShuffle,
  flipSelectedCard,
  reshuffleRemainingDeck,
  skipToPenaltyWheel,
  spinPenaltyWheel,
  startAndShuffleSession,
  startPullCard,
  stopTruthOrDareSession,
  type TruthOrDareState,
} from './truthOrDareEngine';

export default function TruthOrDareExperience() {
  const { locale } = useI18n();
  const labels = ACTION_LABELS[locale];
  const copy = getTruthOrDareUiCopy(locale);

  const [state, setState] = useState<TruthOrDareState>(() =>
    createInitialTruthOrDareState(),
  );
  const [rulebookOpen, setRulebookOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const timerRef = useRef<number | null>(null);

  const clearPendingTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    return () => clearPendingTimer();
  }, [clearPendingTimer]);

  /* Auto-complete timed transitions cleanly (respecting reduced-motion) */
  useEffect(() => {
    clearPendingTimer();

    if (state.phase === 'shuffling') {
      timerRef.current = window.setTimeout(
        () => setState((prev) => finishShuffle(prev)),
        reducedMotion ? 160 : 1250,
      );
    } else if (state.phase === 'pulling') {
      timerRef.current = window.setTimeout(
        () => setState((prev) => finishPullCard(prev)),
        reducedMotion ? 80 : 520,
      );
    } else if (state.phase === 'ready_to_flip') {
      // Draw + flip are one gesture: the card flips itself right after it lands.
      timerRef.current = window.setTimeout(
        () => setState((prev) => flipSelectedCard(prev)),
        reducedMotion ? 0 : 180,
      );
    } else if (state.phase === 'wheel_spinning') {
      timerRef.current = window.setTimeout(
        () => setState((prev) => finishPenaltyWheelSpin(prev)),
        reducedMotion ? 260 : 3500,
      );
    }

    return () => clearPendingTimer();
  }, [state.phase, state.shuffleCount, reducedMotion, clearPendingTimer]);

  const handlePlay = useCallback(() => {
    setState((prev) => startAndShuffleSession(prev));
  }, []);

  const handleReshuffle = useCallback(() => {
    setState((prev) => reshuffleRemainingDeck(prev));
  }, []);

  const handleChooseSide = useCallback((side: CardSide) => {
    setState((prev) => chooseSideBeforeDraw(prev, side));
  }, []);

  const handlePull = useCallback(() => {
    setState((prev) => startPullCard(prev));
  }, []);

  const handleDone = useCallback(() => {
    setState((prev) => completeCurrentTurn(prev));
  }, []);

  const handleSkip = useCallback(() => {
    setState((prev) => skipToPenaltyWheel(prev));
  }, []);

  const handleSpinWheel = useCallback(() => {
    setState((prev) => spinPenaltyWheel(prev));
  }, []);

  const handleNextAfterWheel = useCallback(() => {
    setState((prev) => advanceAfterWheel(prev));
  }, []);

  const handleStop = useCallback(() => {
    clearPendingTimer();
    setState((prev) => stopTruthOrDareSession(prev));
  }, [clearPendingTimer]);

  const isInSession = state.phase !== 'arrival';

  return (
    <div className="tod-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: copy.breadcrumbHome, to: '/' },
            { label: 'Green Play', to: '/games' },
            { label: 'Brainroot - Truth or Dare', to: '/games/fact-act' },
            { label: labels.play },
          ]}
        />
      </div>

      <section
        className="tod-tabletop"
        aria-label={copy.experienceAria}
        data-phase={state.phase}
      >
        {/* Layered Storybook 2.5D Meadow Backdrop */}
        <picture className="tod-tabletop__bg" aria-hidden="true">
          <source media="(max-width: 720px)" srcSet={TOD_ASSETS.tabletopMobile} />
          <img src={TOD_ASSETS.tabletopDesktop} alt="" decoding="async" />
        </picture>

        <img
          className="tod-tabletop__vine"
          src={TOD_ASSETS.upperVine}
          alt=""
          aria-hidden="true"
        />
        <img
          className="tod-tabletop__grass"
          src={TOD_ASSETS.bottomGrass}
          alt=""
          aria-hidden="true"
        />

        {/* Minimal Tabletop HUD Bar */}
        <header className="tod-hud">
          <div className="tod-hud__left">
            {isInSession ? (
              <>
                <span className="tod-hud__counter" data-testid="tod-deck-counter">
                  {copy.remainingCardsLabel(
                    state.remainingIds.length,
                    state.deck.length,
                  )}
                </span>
                <button
                  type="button"
                  className="tod-hud__pill"
                  data-testid="tod-hud-shuffle"
                  disabled={
                    state.phase === 'shuffling' ||
                    state.phase === 'pulling' ||
                    state.phase === 'wheel_spinning'
                  }
                  onClick={handleReshuffle}
                >
                  {labels.shuffle}
                </button>
                <button
                  type="button"
                  className="tod-hud__pill tod-hud__pill--quiet"
                  data-testid="tod-hud-stop"
                  onClick={handleStop}
                >
                  {labels.stop}
                </button>
              </>
            ) : (
              <span className="tod-hud__brand-pill">
                Brainroot · Truth or Dare
              </span>
            )}
          </div>

          <div className="tod-hud__right">
            {/* Hardcover Rulebook Trigger Icon */}
            <button
              type="button"
              className="tod-round-icon-btn"
              data-testid="tod-btn-rules"
              aria-label={copy.rulesIconTitle}
              title={copy.rulesIconTitle}
              onClick={() => setRulebookOpen(true)}
            >
              <img
                className="tod-round-icon-btn__bg"
                src={TOD_ASSETS.roundIconBg}
                alt=""
                aria-hidden="true"
              />
              <span className="tod-round-icon-btn__content">
                <svg
                  className="tod-book-svg-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 5.5C4 4.4 4.9 3.5 6 3.5H19V18.5H6C4.9 18.5 4 19.4 4 20.5V5.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 18.5C4 17.4 4.9 16.5 6 16.5H19"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8.5 8H15M8.5 11.5H13.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="tod-round-icon-btn__label">{labels.rules}</span>
              </span>
            </button>
          </div>
        </header>

        {/* Central Interactive Card Tabletop */}
        <div className="tod-stage-shell">
          <TruthOrDareCardStage
            state={state}
            locale={locale}
            reducedMotion={reducedMotion}
            onPlay={handlePlay}
            onChooseSide={handleChooseSide}
            onPull={handlePull}
            onDone={handleDone}
            onSkip={handleSkip}
            onReshuffle={handleReshuffle}
            onStop={handleStop}
          />
        </div>

        {/* Floating Official Brainie Offline Rules FAQ */}
        <BrainieFaqPopover locale={locale} reducedMotion={reducedMotion} />
      </section>

      {/* 15-? Mystery Green Penalty Wheel Modal */}
      <GreenPenaltyWheelModal
        state={state}
        locale={locale}
        reducedMotion={reducedMotion}
        onSpin={handleSpinWheel}
        onNextAfterWheel={handleNextAfterWheel}
        onStopSession={handleStop}
      />

      {/* Hardcover Storybook Rulebook Modal */}
      <HardcoverRulebookModal
        open={rulebookOpen}
        locale={locale}
        reducedMotion={reducedMotion}
        onClose={() => setRulebookOpen(false)}
      />
    </div>
  );
}
