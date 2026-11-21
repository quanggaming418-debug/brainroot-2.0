import { useEffect, useRef } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import {
  ACTION_LABELS,
  TOD_ASSETS,
  getTruthOrDareUiCopy,
  type CardSide,
} from './truthOrDareData';
import {
  canChooseTruth,
  getActiveCard,
  type TruthOrDareState,
} from './truthOrDareEngine';

interface TruthOrDareCardStageProps {
  readonly state: TruthOrDareState;
  readonly locale: Locale;
  readonly reducedMotion: boolean;
  readonly onPlay: () => void;
  readonly onChooseSide: (side: CardSide) => void;
  readonly onPull: () => void;
  readonly onFlip: () => void;
  readonly onDone: () => void;
  readonly onSkip: () => void;
  readonly onReshuffle: () => void;
  readonly onStop: () => void;
}

export function TruthOrDareCardStage({
  state,
  locale,
  reducedMotion,
  onPlay,
  onChooseSide,
  onPull,
  onFlip,
  onDone,
  onSkip,
  onReshuffle,
  onStop,
}: TruthOrDareCardStageProps) {
  const labels = ACTION_LABELS[locale];
  const copy = getTruthOrDareUiCopy(locale);
  const activeCard = getActiveCard(state);
  const truthAllowed = canChooseTruth(state);
  const primaryActionRef = useRef<HTMLButtonElement>(null);

  // Move focus gently onto key interactive controls on major phase arrival
  useEffect(() => {
    if (
      state.phase === 'ready_to_pull' ||
      state.phase === 'ready_to_flip' ||
      state.phase === 'flipped' ||
      state.phase === 'session_done'
    ) {
      primaryActionRef.current?.focus({ preventScroll: true });
    }
  }, [state.phase]);

  /* ── Scene A: Arrival ────────────────────────────────────────────────── */
  if (state.phase === 'arrival') {
    return (
      <div className="tod-arrival" data-testid="tod-scene-arrival">
        <div className="tod-arrival__hero">
          <div className="tod-arrival__mascot tod-arrival__mascot--brainie">
            <img
              src={TOD_ASSETS.brainieMascot}
              alt="Brainie"
              width={240}
              height={240}
              draggable={false}
            />
            <span className="tod-mascot-tag tod-mascot-tag--truth">
              {copy.truthLabel}
            </span>
          </div>

          <div className="tod-arrival__center">
            <p className="tod-kicker">{copy.brandSubtitle}</p>
            <h1 className="tod-title">{copy.arrivalHeading}</h1>
            <p className="tod-subtitle">{copy.arrivalNote}</p>

            <div className="tod-deck-preview" aria-hidden="true">
              <img
                className="tod-deck-shadow"
                src={TOD_ASSETS.deckShadow}
                alt=""
              />
              <div className="tod-deck-stack tod-deck-stack--idle">
                <div className="tod-mini-card tod-mini-card--back3" />
                <div className="tod-mini-card tod-mini-card--back2" />
                <div className="tod-mini-card tod-mini-card--top">
                  <img
                    className="tod-mini-card__edge"
                    src={TOD_ASSETS.cardEdge}
                    alt=""
                  />
                  <span className="tod-mini-card__brand">
                    {copy.deckBackTitle}
                  </span>
                  <span className="tod-mini-card__sub">
                    {copy.deckBackTag}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="tod-btn tod-btn--play"
              data-testid="tod-btn-play"
              onClick={onPlay}
            >
              <span>{labels.play}</span>
              <span className="tod-btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          <div className="tod-arrival__mascot tod-arrival__mascot--rootie">
            <img
              src={TOD_ASSETS.rootieMascot}
              alt="Rootie"
              width={240}
              height={240}
              draggable={false}
            />
            <span className="tod-mascot-tag tod-mascot-tag--dare">
              {copy.dareLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Scene B: Immediate Multilayer Shuffle ───────────────────────────── */
  if (state.phase === 'shuffling') {
    return (
      <div
        className={`tod-stage-center tod-shuffle${reducedMotion ? ' is-reduced' : ''}`}
        data-testid="tod-scene-shuffle"
        role="status"
        aria-live="polite"
      >
        <div className="tod-shuffle__field" aria-hidden="true">
          <img
            className="tod-shuffle__leaf tod-shuffle__leaf--left"
            src={TOD_ASSETS.leafSprig}
            alt=""
          />
          <img
            className="tod-shuffle__leaf tod-shuffle__leaf--right"
            src={TOD_ASSETS.leafSprig}
            alt=""
          />
          <img
            className="tod-deck-shadow tod-shuffle__shadow"
            src={TOD_ASSETS.deckShadow}
            alt=""
          />
          <div className="tod-shuffle__stack">
            {[0, 1, 2, 3, 4].map((layer) => (
              <div
                key={layer}
                className={`tod-shuffle__card tod-shuffle__card--${layer}`}
              >
                <img
                  className="tod-shuffle__edge"
                  src={TOD_ASSETS.cardEdge}
                  alt=""
                />
                {layer === 4 ? (
                  <div className="tod-card-back-emblem">
                    <span>{copy.deckBackTitle}</span>
                    <small>{copy.deckBackTag}</small>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <p className="tod-stage-caption">{copy.shufflingStatus}</p>
      </div>
    );
  }

  /* ── Scene C: Choose Truth vs Dare (BEFORE Draw) ─────────────────────── */
  if (state.phase === 'choosing') {
    return (
      <div className="tod-stage-center tod-choose" data-testid="tod-scene-choose">
        <div className="tod-choose__deck-pill" aria-hidden="true">
          <div className="tod-deck-stack tod-deck-stack--compact">
            <div className="tod-mini-card tod-mini-card--back2" />
            <div className="tod-mini-card tod-mini-card--top">
              <img
                className="tod-mini-card__edge"
                src={TOD_ASSETS.cardEdge}
                alt=""
              />
              <span className="tod-mini-card__brand">{copy.deckBackTitle}</span>
            </div>
          </div>
        </div>

        <h2 className="tod-stage-heading">{copy.chooseHeading}</h2>

        <div className="tod-choice-grid">
          <button
            type="button"
            className={`tod-choice-card tod-choice-card--truth${
              !truthAllowed ? ' is-locked' : ''
            }`}
            data-testid="tod-choose-truth"
            disabled={!truthAllowed}
            aria-disabled={!truthAllowed}
            onClick={() => onChooseSide('truth')}
          >
            <div className="tod-choice-card__art">
              <img
                src={TOD_ASSETS.brainieMascot}
                alt="Brainie — Truth"
                width={156}
                height={156}
                draggable={false}
              />
            </div>
            <div className="tod-choice-card__meta">
              <span className="tod-choice-card__mascot">
                {copy.truthMascotName}
              </span>
              <strong className="tod-choice-card__label">
                {copy.truthLabel}
              </strong>
            </div>
          </button>

          <button
            type="button"
            className="tod-choice-card tod-choice-card--dare"
            data-testid="tod-choose-dare"
            onClick={() => onChooseSide('dare')}
          >
            <div className="tod-choice-card__art">
              <img
                src={TOD_ASSETS.rootieMascot}
                alt="Rootie — Dare"
                width={156}
                height={156}
                draggable={false}
              />
            </div>
            <div className="tod-choice-card__meta">
              <span className="tod-choice-card__mascot">
                {copy.dareMascotName}
              </span>
              <strong className="tod-choice-card__label">
                {copy.dareLabel}
              </strong>
            </div>
          </button>
        </div>

        {!truthAllowed ? (
          <p
            className="tod-rule-lock-note"
            data-testid="tod-truth-locked-note"
            role="status"
          >
            {copy.truthLockedHint}
          </p>
        ) : null}
      </div>
    );
  }

  /* ── Scene D & E: Pull + Digital 2-Face Flip ─────────────────────────── */
  if (
    (state.phase === 'ready_to_pull' ||
      state.phase === 'pulling' ||
      state.phase === 'ready_to_flip' ||
      state.phase === 'flipped') &&
    activeCard &&
    state.selectedSide
  ) {
    const side = state.selectedSide;
    const isFlipped = state.phase === 'flipped';
    const isPulling = state.phase === 'pulling';
    const isReadyToPull = state.phase === 'ready_to_pull';
    const isReadyToFlip = state.phase === 'ready_to_flip';

    const approvedText =
      side === 'truth'
        ? activeCard.truthText?.[locale] ?? null
        : activeCard.dareText?.[locale] ?? null;

    const faceBaseSrc =
      side === 'truth' ? TOD_ASSETS.truthFaceBase : TOD_ASSETS.dareFaceBase;
    const mascotSrc =
      side === 'truth' ? TOD_ASSETS.brainieMascot : TOD_ASSETS.rootieMascot;
    const mascotAlt =
      side === 'truth' ? copy.truthMascotName : copy.dareMascotName;

    return (
      <div
        className={`tod-stage-center tod-card-play tod-card-play--${state.phase}`}
        data-testid={`tod-scene-${state.phase}`}
      >
        {/* Grounded rest deck behind pulled card */}
        <div className="tod-card-arena">
          {isReadyToPull || isPulling ? (
            <div className="tod-back-deck-anchor" aria-hidden="true">
              <img
                className="tod-deck-shadow"
                src={TOD_ASSETS.deckShadow}
                alt=""
              />
              <div className="tod-back-deck-stack">
                <div className="tod-back-deck-sheet tod-back-deck-sheet--2" />
                <div className="tod-back-deck-sheet tod-back-deck-sheet--1" />
              </div>
            </div>
          ) : null}

          <div
            className={`tod-flip-perspective${
              isReadyToPull ? ' is-deck-top' : ''
            }${isPulling ? ' is-pulling' : ''}${
              isReadyToFlip ? ' is-centered' : ''
            }${isFlipped ? ' is-flipped' : ''}`}
          >
            <div
              className={`tod-card-3d tod-card-3d--${side}${
                isFlipped ? ' is-flipped' : ''
              }`}
              onClick={() => {
                if (isReadyToPull) onPull();
                else if (isReadyToFlip) onFlip();
              }}
            >
              {/* Card Back (always sealed until Flip) */}
              <div
                className="tod-card-face tod-card-face--back"
                aria-hidden={isFlipped}
              >
                <img
                  className="tod-card-face__bg"
                  src={TOD_ASSETS.cardEdge}
                  alt=""
                  aria-hidden="true"
                />
                <div className="tod-card-back__inner">
                  <img
                    className="tod-card-back__leaf"
                    src={TOD_ASSETS.leafSprig}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="tod-card-back__crest">
                    <img
                      src={mascotSrc}
                      alt={mascotAlt}
                      width={96}
                      height={96}
                      draggable={false}
                    />
                  </div>
                  <p className="tod-card-back__brand">{copy.deckBackTitle}</p>
                  <p className="tod-card-back__side-badge">
                    {copy.cardFaceHeading(side)}
                  </p>
                  <span className="tod-card-back__pair">{activeCard.pairId}</span>
                </div>
              </div>

              {/* Card Front — ONLY renders the selected face (never mounts unchosen side) */}
              <div
                className={`tod-card-face tod-card-face--front tod-card-face--${side}`}
                data-testid={isFlipped ? `tod-revealed-${side}` : undefined}
                aria-hidden={!isFlipped}
              >
                {isFlipped ? (
                  <>
                    <img
                      className="tod-card-face__bg"
                      src={faceBaseSrc}
                      alt=""
                      aria-hidden="true"
                    />
                    <div className="tod-card-front__content">
                      <div className="tod-card-front__top">
                        <span className="tod-card-front__badge">
                          {copy.cardFaceHeading(side)}
                        </span>
                        <span className="tod-card-front__id">
                          {activeCard.pairId}
                        </span>
                      </div>

                      <div className="tod-card-front__mascot">
                        <img
                          src={mascotSrc}
                          alt={mascotAlt}
                          width={104}
                          height={104}
                          draggable={false}
                        />
                      </div>

                      <div className="tod-card-front__prompt-box">
                        {approvedText ? (
                          <p className="tod-card-front__prompt">{approvedText}</p>
                        ) : (
                          <>
                            <p className="tod-card-front__slot-title">
                              {copy.cardSlotTitle(activeCard.pairId)}
                            </p>
                            <p className="tod-card-front__slot-body">
                              {copy.cardSlotBody(side)}
                            </p>
                          </>
                        )}
                      </div>

                      <p className="tod-card-front__sealed">
                        {copy.cardHiddenFaceNote}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Action Row per phase */}
        <div className="tod-stage-actions">
          {isReadyToPull ? (
            <>
              <p className="tod-stage-hint">{copy.readyToPullHint}</p>
              <button
                ref={primaryActionRef}
                type="button"
                className="tod-btn tod-btn--primary"
                data-testid="tod-btn-draw"
                onClick={onPull}
              >
                {labels.draw}
              </button>
            </>
          ) : null}

          {isPulling ? (
            <p className="tod-stage-hint" role="status" aria-live="polite">
              {copy.pullingStatus}
            </p>
          ) : null}

          {isReadyToFlip ? (
            <>
              <p className="tod-stage-hint">{copy.readyToFlipHint}</p>
              <button
                ref={primaryActionRef}
                type="button"
                className="tod-btn tod-btn--primary"
                data-testid="tod-btn-flip"
                onClick={onFlip}
              >
                {labels.flip}
              </button>
            </>
          ) : null}

          {isFlipped ? (
            <div className="tod-tiny-actions" data-testid="tod-flipped-actions">
              <button
                ref={primaryActionRef}
                type="button"
                className="tod-btn tod-btn--done"
                data-testid="tod-btn-done"
                onClick={onDone}
              >
                {labels.done}
              </button>
              <button
                type="button"
                className="tod-btn tod-btn--skip"
                data-testid="tod-btn-skip"
                onClick={onSkip}
              >
                {labels.skip}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  /* While the penalty wheel dialog is open the stage stays empty; it must not show the end-of-session message. */
  if (
    state.phase === 'wheel_ready' ||
    state.phase === 'wheel_spinning' ||
    state.phase === 'wheel_result'
  ) {
    return <div className="tod-stage-center" aria-hidden="true" />;
  }

  /* ── Scene G: Session Complete (all cards drawn without repeats) ─────── */
  return (
    <div className="tod-stage-center tod-done-box" data-testid="tod-scene-done">
      <img
        className="tod-done-box__sparkles"
        src={TOD_ASSETS.sparkles}
        alt=""
        aria-hidden="true"
      />
      <h2 className="tod-stage-heading">{copy.sessionDoneTitle}</h2>
      <p className="tod-subtitle">{copy.sessionDoneBody}</p>
      <div className="tod-tiny-actions">
        <button
          ref={primaryActionRef}
          type="button"
          className="tod-btn tod-btn--primary"
          data-testid="tod-btn-reshuffle-done"
          onClick={onReshuffle}
        >
          {labels.shuffle}
        </button>
        <button
          type="button"
          className="tod-btn tod-btn--ghost"
          onClick={onStop}
        >
          {labels.stop}
        </button>
      </div>
    </div>
  );
}
