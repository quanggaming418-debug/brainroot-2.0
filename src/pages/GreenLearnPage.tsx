import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  DestinationIllustration,
  LearningProgress,
} from '../components/garden/GardenPrimitives';
import { GREEN_LEARN_INTRO, GREEN_LEARN_TOPICS } from '../data/learn';

export function GreenLearnPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTopic = GREEN_LEARN_TOPICS[activeIndex] ?? GREEN_LEARN_TOPICS[0];
  const totalTopics = GREEN_LEARN_TOPICS.length;

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
            { label: 'Trang chủ', to: '/' },
            { label: 'Green Learn' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="learn-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">{GREEN_LEARN_INTRO.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="learn-page-title">
              {GREEN_LEARN_INTRO.heading}
            </h1>
            <p className="gp-detail-hero__overview">
              {GREEN_LEARN_INTRO.summary}
            </p>
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
              {GREEN_LEARN_INTRO.provenanceBannerTitle}
            </span>
            <p className="trial-disclosure__text">
              {GREEN_LEARN_INTRO.provenanceBannerBody}
            </p>
          </aside>

          <div className="learn-controls-top">
            <LearningProgress
              current={activeIndex + 1}
              total={totalTopics}
              label={`Đang xem ${currentTopic.shortTag}: ${currentTopic.topicTitle}`}
            />

            <div
              className="learn-topic-tabs"
              role="tablist"
              aria-label="5 chủ đề kỹ năng xanh"
            >
              {GREEN_LEARN_TOPICS.map((topic, index) => {
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
              <span className="learn-card__status">
                Bản thảo khung · Chờ duyệt nguồn
              </span>
            </div>

            <h2 className="learn-card__title" id="learn-explorer-heading">
              {currentTopic.topicTitle}
            </h2>

            <div className="learn-card__objective">
              <p className="learn-card__label">Mục tiêu học tập</p>
              <p className="learn-card__objective-text">
                {currentTopic.learningObjective}
              </p>
            </div>

            <div className="learn-card__grid">
              <div className="learn-card__block">
                <h3>Ý chính cần hiểu</h3>
                <p>{currentTopic.keyConcept}</p>
              </div>
              <div className="learn-card__block">
                <h3>Gần gũi trong học đường</h3>
                <p>{currentTopic.campusContext}</p>
              </div>
              <div className="learn-card__block learn-card__block--accent">
                <h3>Thói quen nhỏ dễ bắt đầu</h3>
                <p>{currentTopic.starterHabit}</p>
              </div>
              <div className="learn-card__block">
                <h3>Câu hỏi gợi mở phản tư</h3>
                <p>{currentTopic.reflectionQuestion}</p>
              </div>
            </div>

            <p className="trial-source-note">
              <strong>Trạng thái biên tập:</strong> {currentTopic.provenanceNote}
            </p>

            <div className="learn-card__nav">
              <button
                type="button"
                className="gp-button gp-button--secondary"
                onClick={handlePrev}
              >
                ← Chủ đề trước
              </button>
              <button
                type="button"
                className="gp-button gp-button--forest"
                onClick={handleNext}
              >
                Chủ đề tiếp theo →
              </button>
            </div>
          </article>

          <div className="world-next-strip">
            <p>Áp dụng ngay kiến thức vừa đọc vào trò chơi hoặc hành động nhỏ:</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--primary" to="/games/fact-act/play">
                Chơi thử vòng mẫu Fact–Act →
              </Link>
              <Link className="gp-text-link" to="/games/o-an-quan-xanh">
                Xem 5 chủ đề trong Ô ăn quan xanh
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
