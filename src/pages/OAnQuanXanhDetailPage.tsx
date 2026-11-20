import { publicUrl } from '../utils/publicUrl';
import { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyUnavailableState } from '../components/common/EmptyUnavailableState';
import { ProductStatusLabel } from '../components/common/ProductStatusLabel';
import { O_AN_QUAN_DETAIL } from '../data/games';
import { OAnQuanTabletopExperience } from '../features/oanquan/OAnQuanTabletopExperience';

export function OAnQuanXanhDetailPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    O_AN_QUAN_DETAIL.topics[0].id,
  );
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);

  const activeTopic =
    O_AN_QUAN_DETAIL.topics.find((t) => t.id === selectedTopicId) ??
    O_AN_QUAN_DETAIL.topics[0];
  const activeLevel =
    O_AN_QUAN_DETAIL.levels[selectedLevelIdx] ?? O_AN_QUAN_DETAIL.levels[0];

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
        className="gp-detail-hero oq-hero"
        aria-labelledby="o-an-quan-page-title"
      >
        <div className="gp-container">
          <div className="oq-hero__header">
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
            <p className="gp-detail-hero__overview oq-hero__overview">
              {O_AN_QUAN_DETAIL.overview}
            </p>
          </div>

          <div className="oq-hero__workspace">
            <div className="oq-hero__board-col">
              <OAnQuanTabletopExperience mode="embedded" />
            </div>

            <aside
              className="oq-explorer"
              aria-labelledby="oq-explorer-heading"
            >
              <p className="gp-eyebrow">KHÁM PHÁ NỘI DUNG GIÁO DỤC</p>
              <h2 className="oq-explorer__heading" id="oq-explorer-heading">
                5 chủ đề × 3 cấp độ học tập
              </h2>
              <p className="oq-explorer__note">
                Chạm chọn chủ đề và cấp độ để xem định hướng tình huống học tập.
                Các ô trên bàn 3D chưa gán cố định theo chủ đề vì luật chơi chính thức
                đang được chuẩn hóa.
              </p>

              <div
                className="oq-explorer__topic-tabs"
                role="tablist"
                aria-label="Chọn chủ đề môi trường"
              >
                {O_AN_QUAN_DETAIL.topics.map((topic) => {
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
                aria-label="Chọn cấp độ năng lực"
              >
                {O_AN_QUAN_DETAIL.levels.map((level, idx) => {
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
                  <strong>Trọng tâm chủ đề:</strong> {activeTopic.exampleFocus}
                </p>
                <p className="oq-explorer__panel-prompt">
                  <strong>Mục tiêu cấp độ:</strong> {activeLevel.focus}{' '}
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
        aria-labelledby="o-an-quan-concept-ref-heading"
      >
        <div className="gp-container oq-concept-ref">
          <div className="oq-concept-ref__copy">
            <p className="gp-eyebrow">ĐỊNH HƯỚNG NGHỆ THUẬT</p>
            <h2
              className="gp-section-heading"
              id="o-an-quan-concept-ref-heading"
            >
              Đối chiếu bản minh họa ý tưởng ban đầu và bản gỗ 3D hiện tại
            </h2>
            <p className="gp-section-summary">
              Hình minh họa bên cạnh là bản định hướng thị giác ban đầu giúp nhóm
              xác định tông gỗ ấm, các viên sỏi tròn và ánh sáng khu vườn cho bàn
              3D ở phía trên — không phải ảnh chụp của bản chơi chính thức.
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
                  srcSet={publicUrl('/assets/green-play/vis-008-o-an-quan-concept-sm.webp')}
                />
                <img
                  className="game-showcase__concept-image"
                  src={publicUrl('/assets/green-play/vis-008-o-an-quan-concept.webp')}
                  width={1080}
                  height={720}
                  alt="Minh họa khái niệm bàn chơi Brainroot - Ô ăn quan xanh với mặt bàn gỗ ấm và các viên sỏi sinh thái"
                  loading="lazy"
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
        className="gp-section"
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
            statusTag="TRẠNG THÁI LUẬT BẢN SỐ"
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
