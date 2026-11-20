import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyUnavailableState } from '../components/common/EmptyUnavailableState';
import { ProductStatusLabel } from '../components/common/ProductStatusLabel';
import { O_AN_QUAN_DETAIL } from '../data/games';

export function OAnQuanXanhDetailPage() {
  return (
    <div className="gp-page gp-detail-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Green Play', to: '/games' },
            { label: O_AN_QUAN_DETAIL.title },
          ]}
        />
      </div>

      <section
        className="gp-detail-hero"
        aria-labelledby="o-an-quan-page-title"
      >
        <div className="gp-container gp-detail-hero__grid gp-detail-hero__grid--media-right">
          <div className="gp-detail-hero__content">
            <p className="gp-eyebrow">{O_AN_QUAN_DETAIL.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="o-an-quan-page-title">
              {O_AN_QUAN_DETAIL.title}
            </h1>
            <ProductStatusLabel
              label={O_AN_QUAN_DETAIL.statusLabel}
              tone="sage"
            />
            <p className="gp-detail-hero__tagline">
              {O_AN_QUAN_DETAIL.tagline}
            </p>
            <p className="gp-detail-hero__overview">
              {O_AN_QUAN_DETAIL.overview}
            </p>

            <dl className="game-specs">
              {O_AN_QUAN_DETAIL.specs.map((spec) => (
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
                  media="(max-width: 767px)"
                  srcSet="/assets/green-play/vis-008-o-an-quan-concept-sm.webp"
                />
                <img
                  className="game-showcase__concept-image"
                  src="/assets/green-play/vis-008-o-an-quan-concept.webp"
                  width={1080}
                  height={720}
                  alt="Minh họa khái niệm bàn chơi Ô ăn quan xanh với mặt bàn gỗ ấm và các viên sỏi sinh thái"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="gp-detail-hero__caption gp-detail-hero__caption--disclosure">
              {O_AN_QUAN_DETAIL.disclosure}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="o-an-quan-topics-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">NỘI DUNG GIÁO DỤC</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-topics-heading"
            >
              {O_AN_QUAN_DETAIL.topicsHeading}
            </h2>
            <p className="gp-section-summary">
              {O_AN_QUAN_DETAIL.topicsSummary}
            </p>
          </div>

          <ol className="gp-topics-grid">
            {O_AN_QUAN_DETAIL.topics.map((topic, index) => (
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
            <p className="gp-eyebrow">TIẾN TRÌNH KỸ NĂNG XANH</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-levels-heading"
            >
              {O_AN_QUAN_DETAIL.levelsHeading}
            </h2>
            <p className="gp-section-summary">
              {O_AN_QUAN_DETAIL.levelsSummary}
            </p>
          </div>

          <ol className="gp-steps-grid">
            {O_AN_QUAN_DETAIL.levels.map((level, index) => (
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

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="o-an-quan-roadmap-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">MINH BẠCH LỘ TRÌNH</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-roadmap-heading"
            >
              {O_AN_QUAN_DETAIL.roadmapHeading}
            </h2>
            <p className="gp-section-summary">
              {O_AN_QUAN_DETAIL.roadmapSummary}
            </p>
          </div>

          <div className="gp-compare-grid">
            {O_AN_QUAN_DETAIL.roadmapColumns.map((column) => (
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
            statusTag="TRẠNG THÁI BẢN SỐ"
            heading={O_AN_QUAN_DETAIL.unavailableNotice.heading}
            description={O_AN_QUAN_DETAIL.unavailableNotice.description}
            primaryActionLabel={
              O_AN_QUAN_DETAIL.unavailableNotice.primaryActionLabel
            }
            primaryActionTo={O_AN_QUAN_DETAIL.unavailableNotice.primaryActionTo}
            secondaryActionLabel={
              O_AN_QUAN_DETAIL.unavailableNotice.secondaryActionLabel
            }
            secondaryActionTo={
              O_AN_QUAN_DETAIL.unavailableNotice.secondaryActionTo
            }
          />

          <aside
            className="gp-sandbox-note"
            aria-labelledby="o-an-quan-sandbox-heading"
          >
            <div className="gp-sandbox-note__copy">
              <p className="gp-eyebrow">{O_AN_QUAN_DETAIL.sandboxNotice.eyebrow}</p>
              <h2
                className="gp-sandbox-note__heading"
                id="o-an-quan-sandbox-heading"
              >
                {O_AN_QUAN_DETAIL.sandboxNotice.heading}
              </h2>
              <p className="gp-sandbox-note__description">
                {O_AN_QUAN_DETAIL.sandboxNotice.description}
              </p>
            </div>
            <a
              className="gp-button gp-button--quiet"
              href={O_AN_QUAN_DETAIL.sandboxNotice.href}
            >
              <span>{O_AN_QUAN_DETAIL.sandboxNotice.linkLabel}</span>
              <span className="gp-button__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
