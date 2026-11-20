import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  DestinationIllustration,
  LearningProgress,
} from '../components/garden/GardenPrimitives';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy, getGreenLearnCopy } from '../i18n/siteCopy';

export function GreenLearnPage() {
  const { locale } = useI18n();
  const copy = getGreenLearnCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentTopic = copy.topics[activeIndex] ?? copy.topics[0];
  const totalTopics = copy.topics.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalTopics) % totalTopics);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalTopics);
  };

  return (
    <div className="gp-page world-page world-page--learn">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Learn' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="learn-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">{copy.intro.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="learn-page-title">
              {copy.intro.heading}
            </h1>
            <p className="gp-detail-hero__overview">{copy.intro.summary}</p>
          </div>
          <div className="world-hero__vignette">
            <DestinationIllustration variant="learn" />
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="learn-explorer-heading"
      >
        <div className="gp-container learn-container">
          <aside className="trial-disclosure" role="note">
            <span className="trial-disclosure__badge">
              {copy.intro.provenanceBannerTitle}
            </span>
            <p className="trial-disclosure__text">
              {copy.intro.provenanceBannerBody}
            </p>
          </aside>

          <div className="learn-controls-top">
            <LearningProgress
              current={activeIndex + 1}
              total={totalTopics}
              label={`${copy.viewingPrefix} ${currentTopic.shortTag}: ${currentTopic.topicTitle}`}
            />

            <div
              className="learn-topic-tabs"
              role="tablist"
              aria-label={copy.tabsAria}
            >
              {copy.topics.map((topic, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`oq-pill-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    0{index + 1}. {topic.topicTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className="learn-card"
            role="tabpanel"
            aria-labelledby="learn-explorer-heading"
          >
            <div className="learn-card__top">
              <span className="trial-topic-pill">{currentTopic.shortTag}</span>
              <span className="learn-card__status">{copy.draftPill}</span>
            </div>

            <h2 className="learn-card__title" id="learn-explorer-heading">
              {currentTopic.topicTitle}
            </h2>

            <div className="learn-card__objective">
              <p className="learn-card__label">{copy.objectiveLabel}</p>
              <p className="learn-card__objective-text">
                {currentTopic.learningObjective}
              </p>
            </div>

            <div className="learn-card__grid">
              <div className="learn-card__block">
                <h3>{copy.keyConceptHeading}</h3>
                <p>{currentTopic.keyConcept}</p>
              </div>
              <div className="learn-card__block">
                <h3>{copy.campusContextHeading}</h3>
                <p>{currentTopic.campusContext}</p>
              </div>
              <div className="learn-card__block learn-card__block--accent">
                <h3>{copy.starterHabitHeading}</h3>
                <p>{currentTopic.starterHabit}</p>
              </div>
              <div className="learn-card__block">
                <h3>{copy.reflectionHeading}</h3>
                <p>{currentTopic.reflectionQuestion}</p>
              </div>
            </div>

            <p className="trial-source-note">
              <strong>{copy.editorialLabel}</strong> {currentTopic.provenanceNote}
            </p>

            <div className="learn-card__nav">
              <button
                type="button"
                className="gp-button gp-button--secondary"
                onClick={handlePrev}
              >
                {copy.prevBtn}
              </button>
              <button
                type="button"
                className="gp-button gp-button--forest"
                onClick={handleNext}
              >
                {copy.nextBtn}
              </button>
            </div>
          </article>

          <div className="world-next-strip">
            <p>{copy.nextStripPrompt}</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--primary" to="/games/fact-act/play">
                {copy.nextPlayBtn}
              </Link>
              <Link className="gp-text-link" to="/games/o-an-quan-xanh">
                {copy.nextOAnQuanLink}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
