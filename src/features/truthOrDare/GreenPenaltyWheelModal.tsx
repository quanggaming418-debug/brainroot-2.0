import { useEffect, useRef } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import {
  ACTION_LABELS,
  TOD_ASSETS,
  getTruthOrDareUiCopy,
} from './truthOrDareData';
import {
  getRevealedPenaltySlot,
  type TruthOrDareState,
} from './truthOrDareEngine';
import { useModalFocus } from './useModalFocus';

interface GreenPenaltyWheelModalProps {
  readonly state: TruthOrDareState;
  readonly locale: Locale;
  readonly reducedMotion: boolean;
  readonly onSpin: () => void;
  readonly onNextAfterWheel: () => void;
  readonly onStopSession: () => void;
}

export function GreenPenaltyWheelModal({
  state,
  locale,
  reducedMotion,
  onSpin,
  onNextAfterWheel,
  onStopSession,
}: GreenPenaltyWheelModalProps) {
  const isOpen =
    state.phase === 'wheel_ready' ||
    state.phase === 'wheel_spinning' ||
    state.phase === 'wheel_result';

  const labels = ACTION_LABELS[locale];
  const copy = getTruthOrDareUiCopy(locale);
  const revealedSlot = getRevealedPenaltySlot(state);
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  useModalFocus(isOpen, dialogRef);

  // Escape only dismisses once the result has been revealed, so a penalty is
  // never skipped silently before the wheel was spun.
  useEffect(() => {
    if (state.phase !== 'wheel_result') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onNextAfterWheel();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state.phase, onNextAfterWheel]);

  useEffect(() => {
    if (state.phase === 'wheel_ready') {
      spinBtnRef.current?.focus({ preventScroll: true });
    } else if (state.phase === 'wheel_result') {
      nextBtnRef.current?.focus({ preventScroll: true });
    }
  }, [state.phase]);

  if (!isOpen) return null;

  const isSpinning = state.phase === 'wheel_spinning';
  const isResult = state.phase === 'wheel_result' && revealedSlot !== null;

  return (
    <div
      className="tod-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tod-wheel-title"
      data-testid="tod-wheel-modal"
    >
      <div className="tod-wheel-dialog" ref={dialogRef} tabIndex={-1}>
        <div className="tod-wheel-dialog__inner">
          <header className="tod-wheel-dialog__header">
            <h2 className="tod-wheel-dialog__title" id="tod-wheel-title">
              {copy.wheelModalTitle}
            </h2>
            <p className="tod-wheel-dialog__sub">{copy.wheelModalSub}</p>
          </header>

          <div className="tod-wheel-frame-box">
            <img
              className="tod-wheel-dialog__frame"
              src={TOD_ASSETS.modalFrame}
              alt=""
              aria-hidden="true"
            />
            <div className="tod-wheel-stage">
              <img
                className="tod-wheel-pointer"
                src={TOD_ASSETS.wheelPointer}
                alt=""
                aria-hidden="true"
              />
              <div
                className={`tod-wheel-rotor${isSpinning ? ' is-spinning' : ''}${
                  reducedMotion ? ' is-reduced' : ''
                }`}
                style={{ transform: `rotate(${state.wheelRotationDeg}deg)` }}
                data-testid="tod-wheel-rotor"
              >
                <img
                  className="tod-wheel-svg"
                  src={TOD_ASSETS.mysteryWheel}
                  alt="15-sector mystery wheel with question marks"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {isSpinning ? (
            <p className="tod-wheel-status" role="status" aria-live="polite">
              {copy.wheelSpinningNote}
            </p>
          ) : null}

          {isResult && revealedSlot ? (
            <div
              className="tod-wheel-result"
              data-testid="tod-wheel-result"
              role="status"
              aria-live="polite"
            >
              <img
                className="tod-wheel-result__sparkle"
                src={TOD_ASSETS.sparkles}
                alt=""
                aria-hidden="true"
              />
              <p className="tod-wheel-result__heading">
                {copy.wheelResultHeading(revealedSlot.slotNumber)}
              </p>
              <p className="tod-wheel-result__body">
                {revealedSlot.text
                  ? revealedSlot.text[locale]
                  : copy.wheelResultSlotBody}
              </p>
            </div>
          ) : null}

          <div className="tod-wheel-actions">
            {state.phase === 'wheel_ready' ? (
              <button
                ref={spinBtnRef}
                type="button"
                className="tod-btn tod-btn--primary"
                data-testid="tod-btn-spin"
                onClick={onSpin}
              >
                {labels.spin}
              </button>
            ) : null}

            {isResult ? (
              <button
                ref={nextBtnRef}
                type="button"
                className="tod-btn tod-btn--primary"
                data-testid="tod-btn-wheel-next"
                onClick={onNextAfterWheel}
              >
                {labels.next}
              </button>
            ) : null}

            {/* Accessible non-punitive exit always available */}
            <button
              type="button"
              className="tod-btn tod-btn--ghost"
              data-testid="tod-btn-wheel-exit"
              disabled={isSpinning}
              onClick={onStopSession}
            >
              {labels.stop} ({copy.wheelSafeExitLabel})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
