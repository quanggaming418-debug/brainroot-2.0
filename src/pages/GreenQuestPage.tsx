import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DestinationIllustration } from '../components/garden/GardenPrimitives';
import {
  completeGreenQuest,
  loadQuestProgressFromStorage,
  resetGreenQuest,
  saveQuestProgressToStorage,
  skipGreenQuest,
  startGreenQuest,
  type GreenQuestProgress,
} from '../features/quest/greenQuestModel';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy, getGreenQuestCopy } from '../i18n/siteCopy';

export function GreenQuestPage() {
  const { locale } = useI18n();
  const copy = getGreenQuestCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  const [progress, setProgress] = useState<GreenQuestProgress>(() =>
    loadQuestProgressFromStorage(
      typeof window !== 'undefined' ? window.localStorage : undefined,
    ),
  );
  const [reflectionInput, setReflectionInput] = useState<string>(
    () => progress.reflectionNote,
  );
  const [statusMessageKey, setStatusMessageKey] = useState<
    'started' | 'completed' | 'skipped' | 'reset' | null
  >(null);

  useEffect(() => {
    saveQuestProgressToStorage(
      progress,
      typeof window !== 'undefined' ? window.localStorage : undefined,
    );
  }, [progress]);

  const handleStart = () => {
    const next = startGreenQuest(progress, new Date().toISOString());
    setProgress(next);
    setStatusMessageKey('started');
  };

  const handleComplete = () => {
    const next = completeGreenQuest(
      progress,
      reflectionInput,
      new Date().toISOString(),
    );
    setProgress(next);
    setStatusMessageKey('completed');
  };

  const handleSkip = () => {
    const next = skipGreenQuest(progress, new Date().toISOString());
    setProgress(next);
    setStatusMessageKey('skipped');
  };

  const handleReset = () => {
    const next = resetGreenQuest();
    setProgress(next);
    setReflectionInput('');
    setStatusMessageKey('reset');
  };

  const statusBadgeText = copy.statusBadges[progress.status];
  const statusMessage = statusMessageKey ? copy.messages[statusMessageKey] : '';

  return (
    <div className="gp-page world-page world-page--quest">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Quest' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="quest-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="quest-page-title">
              {copy.challenge.title}
            </h1>
            <p className="gp-detail-hero__tagline">{copy.challenge.subtitle}</p>
            <p className="gp-detail-hero__overview">{copy.challenge.summary}</p>
          </div>
          <div className="world-hero__vignette">
            <DestinationIllustration variant="quest" />
          </div>
        </div>
      </section>

      <section className="gp-section gp-section--tinted" aria-labelledby="quest-card-heading">
        <div className="gp-container quest-container">
          <article className="quest-card">
            <div className="quest-card__top">
              <span className="trial-topic-pill">{copy.challenge.topic}</span>
              <span
                className={`quest-status-badge quest-status-badge--${progress.status}`}
              >
                {statusBadgeText}
              </span>
            </div>

            <h2 className="quest-card__heading" id="quest-card-heading">
              {copy.stepsHeading}
            </h2>

            <ol className="quest-steps">
              {copy.challenge.steps.map((step, index) => (
                <li key={step} className="quest-step">
                  <span className="quest-step__num" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="quest-step__text">{step}</span>
                </li>
              ))}
            </ol>

            <div className="quest-reflection-block">
              <label className="trial-textarea-label" htmlFor="quest-reflection-input">
                {copy.challenge.reflectionPrompt} {copy.optionalSuffix}
              </label>
              <textarea
                id="quest-reflection-input"
                className="trial-textarea"
                rows={3}
                value={reflectionInput}
                placeholder={copy.reflectionPlaceholder}
                onChange={(e) => setReflectionInput(e.target.value)}
              />
            </div>

            <div className="quest-actions">
              {progress.status === 'not_started' || progress.status === 'skipped' ? (
                <button
                  type="button"
                  className="gp-button gp-button--primary"
                  onClick={handleStart}
                >
                  {copy.startBtn}
                </button>
              ) : null}

              {progress.status !== 'completed' ? (
                <button
                  type="button"
                  className="gp-button gp-button--forest"
                  onClick={handleComplete}
                >
                  {copy.completeBtn}
                </button>
              ) : null}

              {progress.status !== 'skipped' && progress.status !== 'completed' ? (
                <button
                  type="button"
                  className="gp-button gp-button--secondary"
                  onClick={handleSkip}
                >
                  {copy.skipBtn}
                </button>
              ) : null}

              {progress.status !== 'not_started' ? (
                <button
                  type="button"
                  className="gp-button gp-button--secondary"
                  onClick={handleReset}
                >
                  {copy.resetBtn}
                </button>
              ) : null}
            </div>

            {statusMessage ? (
              <p className="quest-live-msg" role="status" aria-live="polite">
                {statusMessage}
              </p>
            ) : null}

            {progress.status === 'completed' ? (
              <div className="quest-completed-note">
                <h3>{copy.completedBoxTitle}</h3>
                <p>
                  {copy.completedBoxLead}
                  {progress.reflectionNote
                    ? ` ${copy.completedSavedPrefix} “${progress.reflectionNote}”`
                    : ` ${copy.completedEmptyHint}`}
                </p>
              </div>
            ) : null}

            <aside className="quest-honesty-note" aria-label={copy.honestyAria}>
              <strong>{copy.honestyLabel}</strong> {copy.challenge.honestyNote}
            </aside>
          </article>

          <div className="world-next-strip">
            <p>{copy.nextPrompt}</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--secondary" to="/games/fact-act/play">
                {copy.nextPlayLink}
              </Link>
              <Link className="gp-text-link" to="/learn">
                {copy.nextLearnLink}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
