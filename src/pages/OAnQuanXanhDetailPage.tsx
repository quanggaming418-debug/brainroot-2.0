import { mobileMedia } from '../utils/layoutViewport';
import { publicUrl } from '../utils/publicUrl';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OQV2_ENABLED } from '../utils/featureFlags';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyUnavailableState } from '../components/common/EmptyUnavailableState';
import { ProductStatusLabel } from '../components/common/ProductStatusLabel';
import { OAnQuanTabletopExperience } from '../features/oanquan/OAnQuanTabletopExperience';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy, getOAnQuanDetailCopy, getOAnQuanFullCopy } from '../i18n/siteCopy';

export function OAnQuanXanhDetailPage() {
  const { locale } = useI18n();
  const copy = getOAnQuanDetailCopy(locale);
  const full = getOAnQuanFullCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    copy.topics[0].id,
  );
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);

  const activeTopic =
    copy.topics.find((t) => t.id === selectedTopicId) ?? copy.topics[0];
  const activeLevel = copy.levels[selectedLevelIdx] ?? copy.levels[0];

  return (
    <div className="gp-page gp-detail-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Play', to: '/games' },
            { label: copy.title },
          ]}
        />
      </div>

      <section
        className="gp-detail-hero oq-hero"
        aria-labelledby="o-an-quan-page-title"
      >
        <div className="gp-container">
          <div className="oq-hero__header">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="o-an-quan-page-title">
              {copy.title}
            </h1>
            <ProductStatusLabel label={full?.statusLabel ?? copy.statusLabel} tone="sage" />
            <p className="gp-detail-hero__tagline">{copy.tagline}</p>
            {OQV2_ENABLED ? (
              <p>
                <Link className="gp-button gp-button--primary oq-play-cta" to={full?.playTo ?? '/games/o-an-quan-xanh/play'}>
                  {full?.playLabel ?? (locale === 'en' ? 'Play Green Ô Ăn Quan (playtest)' : 'Chơi Ô ăn quan xanh (bản chơi thử)')}
                </Link>
              </p>
            ) : null}
            <p className="gp-detail-hero__overview oq-hero__overview">
              {full?.description ?? copy.overview}
            </p>
          </div>

          <div className={full ? 'oq-hero__workspace oq-hero__workspace--full' : 'oq-hero__workspace'}>
            {!full && (
              <div className="oq-hero__board-col">
                <OAnQuanTabletopExperience mode="embedded" />
              </div>
            )}

            <aside
              className="oq-explorer"
              aria-labelledby="oq-explorer-heading"
            >
              <p className="gp-eyebrow">{copy.explorerEyebrow}</p>
              <h2 className="oq-explorer__heading" id="oq-explorer-heading">
                {copy.explorerHeading}
              </h2>
              <p className="oq-explorer__note">{full?.explorerNote ?? copy.explorerNote}</p>

              <div
                className="oq-explorer__topic-tabs"
                role="tablist"
                aria-label={copy.topicTabsAria}
              >
                {copy.topics.map((topic) => {
                  const isActive = topic.id === activeTopic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`oq-pill-tab${isActive ? ' is-active' : ''}`}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      {topic.title}
                    </button>
                  );
                })}
              </div>

              <div
                className="oq-explorer__level-tabs"
                role="tablist"
                aria-label={copy.levelTabsAria}
              >
                {copy.levels.map((level, idx) => {
                  const isActive = idx === selectedLevelIdx;
                  return (
                    <button
                      key={level.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`oq-level-tab${isActive ? ' is-active' : ''}`}
                      onClick={() => setSelectedLevelIdx(idx)}
                    >
                      <span>{level.levelNumber}</span>
                      <strong>{level.title}</strong>
                    </button>
                  );
                })}
              </div>

              <div className="oq-explorer__panel" role="tabpanel" aria-live="polite">
                <p className="oq-explorer__panel-tag">
                  {activeTopic.title} · {activeLevel.levelNumber}: {activeLevel.title}
                </p>
                <p className="oq-explorer__panel-desc">{activeTopic.description}</p>
                <p className="oq-explorer__panel-focus">
                  <strong>{copy.topicFocusLabel}</strong> {activeTopic.exampleFocus}
                </p>
                <p className="oq-explorer__panel-prompt">
                  <strong>{copy.levelGoalLabel}</strong> {activeLevel.focus}{' '}
                  {activeLevel.classroomPrompt}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="o-an-quan-topics-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.topicsEyebrow}</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-topics-heading"
            >
              {copy.topicsHeading}
            </h2>
            <p className="gp-section-summary">{copy.topicsSummary}</p>
          </div>

          <ol className="gp-topics-grid">
            {copy.topics.map((topic, index) => (
              <li className="gp-topic-card" key={topic.id}>
                <span className="gp-topic-card__index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="gp-topic-card__title">{topic.title}</h3>
                <p className="gp-topic-card__description">
                  {topic.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="gp-section"
        aria-labelledby="o-an-quan-levels-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.levelsEyebrow}</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-levels-heading"
            >
              {copy.levelsHeading}
            </h2>
            <p className="gp-section-summary">{copy.levelsSummary}</p>
          </div>

          <ol className="gp-steps-grid">
            {copy.levels.map((level, index) => (
              <li className="gp-step-card" key={level.title}>
                <div className="gp-step-card__meta">
                  <span className="gp-step-card__number">0{index + 1}</span>
                  <span className="gp-step-card__code">
                    {level.levelNumber}
                  </span>
                </div>
                <h3 className="gp-step-card__title">{level.title}</h3>
                <p className="gp-step-card__summary">{level.focus}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {!full && (
        <>
          <section
            className="gp-section gp-section--tinted"
            aria-labelledby="o-an-quan-concept-ref-heading"
          >
            <div className="gp-container oq-concept-ref">
              <div className="oq-concept-ref__copy">
                <p className="gp-eyebrow">{copy.artEyebrow}</p>
                <h2
                  className="gp-section-heading"
                  id="o-an-quan-concept-ref-heading"
                >
                  {copy.artHeading}
                </h2>
                <p className="gp-section-summary">{copy.artSummary}</p>
                <dl className="game-specs">
                  {copy.specs.map((spec) => (
                    <div className="game-specs__row" key={spec.label}>
                      <dt className="game-specs__label">{spec.label}</dt>
                      <dd className="game-specs__value">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className="gp-detail-hero__stage gp-detail-hero__stage--concept">
                <div className="gp-detail-hero__concept-frame">
                  <picture className="game-showcase__picture">
                    <source
                      media={mobileMedia('(max-width: 767px)')}
                      srcSet={publicUrl('/assets/green-play/vis-008-o-an-quan-concept-sm.webp')}
                    />
                    <img
                      className="game-showcase__concept-image"
                      src={publicUrl('/assets/green-play/vis-008-o-an-quan-concept.webp')}
                      width={1080}
                      height={720}
                      alt={copy.artAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <figcaption className="gp-detail-hero__caption gp-detail-hero__caption--disclosure">
                  {copy.disclosure}
                </figcaption>
              </figure>
            </div>
          </section>

          <section
            className="gp-section"
            aria-labelledby="o-an-quan-roadmap-heading"
          >
            <div className="gp-container">
              <div className="gp-section-header gp-section-header--left">
                <p className="gp-eyebrow">{copy.roadmapEyebrow}</p>
                <h2
                  className="gp-section-heading"
                  id="o-an-quan-roadmap-heading"
                >
                  {copy.roadmapHeading}
                </h2>
                <p className="gp-section-summary">{copy.roadmapSummary}</p>
              </div>

              <div className="gp-compare-grid">
                {copy.roadmapColumns.map((column) => (
                  <article className="gp-compare-card" key={column.heading}>
                    <p className="gp-compare-card__tag">{column.badge}</p>
                    <h3 className="gp-compare-card__title">{column.heading}</h3>
                    <ul className="gp-check-list">
                      {column.points.map((point) => (
                        <li className="gp-check-list__item" key={point}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="gp-section gp-section--compact">
            <div className="gp-container gp-stack-gap">
              <EmptyUnavailableState
                statusTag={copy.noticeTag}
                heading={copy.unavailableNotice.heading}
                description={copy.unavailableNotice.description}
                primaryActionLabel={copy.unavailableNotice.primaryActionLabel}
                primaryActionTo={copy.unavailableNotice.primaryActionTo}
                secondaryActionLabel={copy.unavailableNotice.secondaryActionLabel}
                secondaryActionTo={copy.unavailableNotice.secondaryActionTo}
              />

              <aside
                className="gp-sandbox-note"
                aria-labelledby="o-an-quan-sandbox-heading"
              >
                <div className="gp-sandbox-note__copy">
                  <p className="gp-eyebrow">{copy.sandboxNotice.eyebrow}</p>
                  <h2
                    className="gp-sandbox-note__heading"
                    id="o-an-quan-sandbox-heading"
                  >
                    {copy.sandboxNotice.heading}
                  </h2>
                  <p className="gp-sandbox-note__description">
                    {copy.sandboxNotice.description}
                  </p>
                </div>
                <a
                  className="gp-button gp-button--quiet"
                  href={copy.sandboxNotice.href}
                >
                  <span>{copy.sandboxNotice.linkLabel}</span>
                  <span className="gp-button__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </aside>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
