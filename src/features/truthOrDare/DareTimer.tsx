import { useCallback, useEffect, useState } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import { getTruthOrDareUiCopy } from './truthOrDareData';

interface DareTimerProps {
  readonly seconds: number;
  readonly locale: Locale;
}

function formatClock(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Countdown for timed Dare cards. Fully optional: the player starts, pauses and
 * resets it manually; reaching zero only announces "time's up", it never blocks Done/Skip.
 */
export function DareTimer({ seconds, locale }: DareTimerProps) {
  const copy = getTruthOrDareUiCopy(locale);
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(seconds);
  }, [seconds]);

  const finished = remaining === 0;

  return (
    <div
      className={`tod-timer${finished ? ' is-finished' : ''}`}
      role="group"
      aria-label={`${copy.timerRegion} · ${copy.timerLabel(seconds)}`}
      data-testid="tod-timer"
    >
      <span className="tod-timer__clock" data-testid="tod-timer-clock">
        {formatClock(remaining)}
      </span>
      <span className="tod-timer__announce" role="status" aria-live="polite">
        {finished ? copy.timerDone : ''}
      </span>
      <div className="tod-timer__buttons">
        {!finished ? (
          <button
            type="button"
            className="tod-btn tod-btn--ghost tod-timer__btn"
            data-testid="tod-timer-toggle"
            onClick={() => setRunning((prev) => !prev)}
          >
            {running ? copy.timerPause : copy.timerStart}
          </button>
        ) : null}
        {remaining !== seconds ? (
          <button
            type="button"
            className="tod-btn tod-btn--ghost tod-timer__btn"
            data-testid="tod-timer-reset"
            onClick={reset}
          >
            {copy.timerReset}
          </button>
        ) : null}
      </div>
    </div>
  );
}
