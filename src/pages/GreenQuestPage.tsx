import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DestinationIllustration } from '../components/garden/GardenPrimitives';
import {
  GREEN_QUEST_LITE_CHALLENGE,
  completeGreenQuest,
  loadQuestProgressFromStorage,
  resetGreenQuest,
  saveQuestProgressToStorage,
  skipGreenQuest,
  startGreenQuest,
  type GreenQuestProgress,
} from '../features/quest/greenQuestModel';

export function GreenQuestPage() {
  const [progress, setProgress] = useState<GreenQuestProgress>(() =>
    loadQuestProgressFromStorage(
      typeof window !== 'undefined' ? window.localStorage : undefined,
    ),
  );
  const [reflectionInput, setReflectionInput] = useState<string>(
    () => progress.reflectionNote,
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    saveQuestProgressToStorage(
      progress,
      typeof window !== 'undefined' ? window.localStorage : undefined,
    );
  }, [progress]);

  const handleStart = () => {
    const next = startGreenQuest(progress, new Date().toISOString());
    setProgress(next);
    setStatusMessage('Bạn đã nhận thử thách xanh khởi đầu. Chúc bạn một ngày học tập xanh nhẹ nhàng!');
  };

  const handleComplete = () => {
    const next = completeGreenQuest(
      progress,
      reflectionInput,
      new Date().toISOString(),
    );
    setProgress(next);
    setStatusMessage('Đã ghi nhận hoàn thành thử thách trên trình duyệt này.');
  };

  const handleSkip = () => {
    const next = skipGreenQuest(progress, new Date().toISOString());
    setProgress(next);
    setStatusMessage('Đã đánh dấu tạm bỏ qua thử thách — bạn có thể quay lại thực hiện bất kỳ lúc nào.');
  };

  const handleReset = () => {
    const next = resetGreenQuest();
    setProgress(next);
    setReflectionInput('');
    setStatusMessage('Đã đặt lại trạng thái thử thách trên trình duyệt này.');
  };

  const statusBadgeText =
    progress.status === 'completed'
      ? 'Đã tự ghi nhận hoàn thành'
      : progress.status === 'in_progress'
        ? 'Đang thực hiện hôm nay'
        : progress.status === 'skipped'
          ? 'Đã tạm bỏ qua'
          : 'Chưa bắt đầu';

  return (
    <div className="gp-page world-page world-page--quest">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Green Quest' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="quest-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">GREEN QUEST · HÀNH ĐỘNG XANH KHỞI ĐẦU</p>
            <h1 className="gp-detail-hero__title" id="quest-page-title">
              {GREEN_QUEST_LITE_CHALLENGE.title}
            </h1>
            <p className="gp-detail-hero__tagline">
              {GREEN_QUEST_LITE_CHALLENGE.subtitle}
            </p>
            <p className="gp-detail-hero__overview">
              {GREEN_QUEST_LITE_CHALLENGE.summary}
            </p>
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
              <span className="trial-topic-pill">{GREEN_QUEST_LITE_CHALLENGE.topic}</span>
              <span
                className={`quest-status-badge quest-status-badge--${progress.status}`}
              >
                {statusBadgeText}
              </span>
            </div>

            <h2 className="quest-card__heading" id="quest-card-heading">
              Gợi ý 4 bước thực hành ({GREEN_QUEST_LITE_CHALLENGE.durationLabel})
            </h2>

            <ol className="quest-steps">
              {GREEN_QUEST_LITE_CHALLENGE.steps.map((step, index) => (
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
                {GREEN_QUEST_LITE_CHALLENGE.reflectionPrompt} (tùy chọn)
              </label>
              <textarea
                id="quest-reflection-input"
                className="trial-textarea"
                rows={3}
                value={reflectionInput}
                placeholder="Ví dụ: Mang sẵn bình nước giúp mình không mua ly nhựa giờ nghỉ trưa..."
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
                  Bắt đầu thử thách hôm nay
                </button>
              ) : null}

              {progress.status !== 'completed' ? (
                <button
                  type="button"
                  className="gp-button gp-button--forest"
                  onClick={handleComplete}
                >
                  Đánh dấu đã hoàn thành
                </button>
              ) : null}

              {progress.status !== 'skipped' && progress.status !== 'completed' ? (
                <button
                  type="button"
                  className="gp-button gp-button--secondary"
                  onClick={handleSkip}
                >
                  Tạm bỏ qua
                </button>
              ) : null}

              {progress.status !== 'not_started' ? (
                <button
                  type="button"
                  className="gp-button gp-button--secondary"
                  onClick={handleReset}
                >
                  Đặt lại thử thách
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
                <h3>Ghi nhận hoàn thành cục bộ</h3>
                <p>
                  Cảm ơn bạn đã thực hiện một lựa chọn xanh thiết thực.
                  {progress.reflectionNote
                    ? ` Phản tư đã lưu: “${progress.reflectionNote}”`
                    : ' Bạn có thể bổ sung ghi chú phản tư bất kỳ lúc nào.'}
                </p>
              </div>
            ) : null}

            <aside className="quest-honesty-note" aria-label="Lưu ý về lưu trữ cục bộ">
              <strong>Minh bạch:</strong> {GREEN_QUEST_LITE_CHALLENGE.honestyNote}
            </aside>
          </article>

          <div className="world-next-strip">
            <p>Muốn kết hợp hành động với trò chơi hoặc đọc sâu hơn?</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--secondary" to="/games/fact-act/play">
                Trải nghiệm thử Brainroot - Truth or Dare →
              </Link>
              <Link className="gp-text-link" to="/learn">
                Đọc 5 chủ đề trong Green Learn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
