import { publicUrl } from '../utils/publicUrl';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { LearningProgress } from '../components/garden/GardenPrimitives';
import {
  FACT_ACT_TRIAL_DISCLOSURE,
  advanceFactToAction,
  advanceFeedbackToReflection,
  createInitialFactActState,
  getCurrentFactActCard,
  getSelectedFactActChoice,
  restartFactActTrial,
  selectFactActChoice,
  skipFactActReflection,
  startFactActTrial,
  submitFactActReflection,
  updateReflectionDraft,
} from '../features/factAct/factActModel';

export function FactActTrialPage() {
  const [trialState, setTrialState] = useState(() => createInitialFactActState());
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);

  const currentCard = getCurrentFactActCard(trialState);
  const selectedChoice = getSelectedFactActChoice(trialState);

  const focusStageHeading = () => {
    window.requestAnimationFrame(() => {
      stageHeadingRef.current?.focus();
    });
  };

  const handleStart = () => {
    setTrialState((prev) => startFactActTrial(prev));
    focusStageHeading();
  };

  const handleToAction = () => {
    setTrialState((prev) => advanceFactToAction(prev));
    focusStageHeading();
  };

  const handleSelectChoice = (choiceId: string) => {
    setTrialState((prev) => selectFactActChoice(prev, choiceId));
    focusStageHeading();
  };

  const handleToReflection = () => {
    setTrialState((prev) => advanceFeedbackToReflection(prev));
    focusStageHeading();
  };

  const handleSubmitReflection = () => {
    setTrialState((prev) => submitFactActReflection(prev));
    focusStageHeading();
  };

  const handleSkipReflection = () => {
    setTrialState((prev) => skipFactActReflection(prev));
    focusStageHeading();
  };

  const handleRestart = () => {
    setTrialState((prev) => restartFactActTrial(prev));
    focusStageHeading();
  };

  const completedCount = trialState.completedRecords.length;
  const totalCards = trialState.cards.length;
  const recommendedCount = trialState.completedRecords.filter(
    (record) => record.isRecommended,
  ).length;

  return (
    <div className="gp-page trial-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Green Play', to: '/games' },
            { label: 'Brainroot - Truth or Dare', to: '/games/fact-act' },
            { label: 'Trải nghiệm thử' },
          ]}
        />
      </div>

      <section className="trial-shell" aria-labelledby="fact-act-trial-heading">
        <div className="gp-container trial-container">
          <aside className="trial-disclosure" role="note" aria-label="Thông báo về bản trải nghiệm thử">
            <span className="trial-disclosure__badge">
              {FACT_ACT_TRIAL_DISCLOSURE.badge}
            </span>
            <p className="trial-disclosure__text">
              {FACT_ACT_TRIAL_DISCLOSURE.summary}
            </p>
            <p className="trial-disclosure__sub">
              {FACT_ACT_TRIAL_DISCLOSURE.noPaidContentNote}
            </p>
          </aside>

          {trialState.step !== 'idle' && trialState.step !== 'complete' ? (
            <div className="trial-progress-wrap">
              <LearningProgress
                current={trialState.currentIndex + 1}
                total={totalCards}
                label={`Tình huống ${trialState.currentIndex + 1} / ${totalCards}`}
              />
              <ol className="trial-phase-steps" aria-label="Các bước trong lượt trải nghiệm">
                <li className={trialState.step === 'fact' ? 'is-current' : 'is-done'}>
                  1. Tình huống
                </li>
                <li
                  className={
                    trialState.step === 'action'
                      ? 'is-current'
                      : trialState.step === 'feedback' ||
                          trialState.step === 'reflection'
                        ? 'is-done'
                        : ''
                  }
                >
                  2. Hành động
                </li>
                <li
                  className={
                    trialState.step === 'feedback'
                      ? 'is-current'
                      : trialState.step === 'reflection'
                        ? 'is-done'
                        : ''
                  }
                >
                  3. Góc nhìn gợi mở
                </li>
                <li className={trialState.step === 'reflection' ? 'is-current' : ''}>
                  4. Phản tư
                </li>
              </ol>
            </div>
          ) : null}

          <div className="trial-stage-card">
            {trialState.step === 'idle' ? (
              <div className="trial-intro-grid">
                <div className="trial-intro-copy">
                  <p className="gp-eyebrow">GREEN PLAY · TRẢI NGHIỆM THỬ TƯƠNG TÁC</p>
                  <h1 className="trial-heading" id="fact-act-trial-heading">
                    {FACT_ACT_TRIAL_DISCLOSURE.heading}
                  </h1>
                  <p className="trial-lead">
                    Đi qua {totalCards} tình huống học đường ngắn theo 3 bước{' '}
                    <strong>Tình huống → Hành động → Phản tư</strong> để làm quen với chủ đề
                    kỹ năng xanh. Không cần đăng nhập, không tính điểm thắng thua áp lực.
                  </p>

                  <ul className="trial-checklist">
                    <li>Mỗi tình huống mất khoảng 1 phút đọc, chọn phương án và phản tư.</li>
                    <li>Có thể bỏ qua phần ghi chú phản tư hoặc trải nghiệm lại bất cứ lúc nào.</li>
                    <li>
                      Sử dụng tình huống minh họa riêng cho bản web — không hiển thị nội dung bộ thẻ vật lý.
                    </li>
                  </ul>

                  <div className="trial-actions">
                    <button
                      type="button"
                      className="gp-button gp-button--primary"
                      onClick={handleStart}
                    >
                      <span>Bắt đầu trải nghiệm thử ({totalCards} tình huống)</span>
                      <span className="gp-button__arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                    <Link className="gp-button gp-button--secondary" to="/games/fact-act">
                      ← Về trang Brainroot - Truth or Dare
                    </Link>
                  </div>
                </div>

                <div className="trial-intro-visual" aria-hidden="true">
                  <img
                    src={publicUrl('/assets/hero-v4/fact-act-deck.webp')}
                    alt=""
                    width={420}
                    height={420}
                    className="trial-deck-img"
                  />
                </div>
              </div>
            ) : null}

            {trialState.step === 'fact' && currentCard ? (
              <div className="trial-step-panel">
                <div className="trial-card-meta">
                  <span className="trial-topic-pill">{currentCard.topic}</span>
                  <span className="trial-phase-tag">BƯỚC 1 · TÌNH HUỐNG</span>
                </div>

                <h1
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="trial-card-title"
                  id="fact-act-trial-heading"
                >
                  {currentCard.factHeading}
                </h1>

                <p className="trial-card-prompt">{currentCard.prompt}</p>

                <p className="trial-source-note">
                  <strong>Trạng thái biên tập:</strong> {currentCard.sourceNote}
                </p>

                <div className="trial-actions">
                  <button
                    type="button"
                    className="gp-button gp-button--primary"
                    onClick={handleToAction}
                  >
                    <span>Tiếp tục chọn hành động</span>
                    <span className="gp-button__arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {trialState.step === 'action' && currentCard ? (
              <div className="trial-step-panel">
                <div className="trial-card-meta">
                  <span className="trial-topic-pill">{currentCard.topic}</span>
                  <span className="trial-phase-tag">BƯỚC 2 · LỰA CHỌN HÀNH ĐỘNG</span>
                </div>

                <h1
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="trial-card-title"
                  id="fact-act-trial-heading"
                >
                  {currentCard.actionPrompt}
                </h1>

                <div
                  className="trial-choices"
                  role="group"
                  aria-label="Các lựa chọn hành động"
                >
                  {currentCard.choices.map((choice, index) => (
                    <button
                      key={choice.id}
                      type="button"
                      className="trial-choice-btn"
                      onClick={() => handleSelectChoice(choice.id)}
                    >
                      <span className="trial-choice-btn__letter" aria-hidden="true">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="trial-choice-btn__label">{choice.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {trialState.step === 'feedback' && currentCard && selectedChoice ? (
              <div className="trial-step-panel">
                <div className="trial-card-meta">
                  <span className="trial-topic-pill">{currentCard.topic}</span>
                  <span className="trial-phase-tag">BƯỚC 3 · GÓC NHÌN GỢI MỞ</span>
                </div>

                <h1
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="trial-card-title"
                  id="fact-act-trial-heading"
                >
                  {selectedChoice.outcomeTitle}
                </h1>

                <div
                  className={`trial-feedback-box${
                    selectedChoice.isRecommended
                      ? ' trial-feedback-box--positive'
                      : ' trial-feedback-box--consider'
                  }`}
                >
                  <p className="trial-feedback-box__choice">
                    <strong>Lựa chọn của bạn:</strong> {selectedChoice.label}
                  </p>
                  <p className="trial-feedback-box__body">
                    {selectedChoice.feedback}
                  </p>
                </div>

                <div className="trial-actions">
                  <button
                    type="button"
                    className="gp-button gp-button--forest"
                    onClick={handleToReflection}
                  >
                    <span>Chuyển sang bước Phản tư</span>
                    <span className="gp-button__arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {trialState.step === 'reflection' && currentCard ? (
              <div className="trial-step-panel">
                <div className="trial-card-meta">
                  <span className="trial-topic-pill">{currentCard.topic}</span>
                  <span className="trial-phase-tag">BƯỚC 4 · PHẢN TƯ (TÙY CHỌN)</span>
                </div>

                <h1
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="trial-card-title"
                  id="fact-act-trial-heading"
                >
                  {currentCard.reflectionPrompt}
                </h1>

                <div className="trial-suggestions">
                  <span className="trial-suggestions__label">Gợi ý nhanh:</span>
                  <div className="trial-suggestions__chips">
                    {currentCard.reflectionSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="trial-suggestion-chip"
                        onClick={() =>
                          setTrialState((prev) =>
                            updateReflectionDraft(prev, suggestion),
                          )
                        }
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="trial-textarea-label" htmlFor="fact-act-reflection-input">
                  Ghi chú phản tư của bạn (chỉ hiển thị trong phiên này, không gửi lên máy chủ):
                </label>
                <textarea
                  id="fact-act-reflection-input"
                  className="trial-textarea"
                  rows={3}
                  value={trialState.reflectionDraft}
                  placeholder="Viết ngắn một ý tưởng hoặc thói quen nhỏ bạn thấy phù hợp..."
                  onChange={(event) =>
                    setTrialState((prev) =>
                      updateReflectionDraft(prev, event.target.value),
                    )
                  }
                />

                <div className="trial-actions">
                  <button
                    type="button"
                    className="gp-button gp-button--primary"
                    onClick={handleSubmitReflection}
                  >
                    <span>
                      {trialState.currentIndex + 1 < totalCards
                        ? 'Lưu phản tư & sang tình huống tiếp theo'
                        : 'Lưu phản tư & hoàn thành vòng thử'}
                    </span>
                    <span className="gp-button__arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <button
                    type="button"
                    className="gp-button gp-button--secondary"
                    onClick={handleSkipReflection}
                  >
                    Bỏ qua phản tư
                  </button>
                </div>
              </div>
            ) : null}

            {trialState.step === 'complete' ? (
              <div className="trial-step-panel trial-complete">
                <p className="gp-eyebrow">HOÀN THÀNH TRẢI NGHIỆM THỬ</p>
                <h1
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="trial-heading"
                  id="fact-act-trial-heading"
                >
                  Bạn đã hoàn tất {completedCount}/{totalCards} tình huống trải nghiệm!
                </h1>
                <p className="trial-lead">
                  Bạn đã chọn {recommendedCount}/{totalCards} hướng ưu tiên giảm tác động ngay từ
                  nguồn. Quan trọng hơn, mỗi câu hỏi phản tư là bước đầu để đưa kỹ năng xanh vào
                  lớp học và sinh hoạt hằng ngày.
                </p>

                <ol className="trial-summary-list">
                  {trialState.completedRecords.map((record, idx) => (
                    <li key={record.cardId} className="trial-summary-item">
                      <div className="trial-summary-item__top">
                        <span className="trial-topic-pill">
                          0{idx + 1} · {record.topic}
                        </span>
                        <span className="trial-summary-item__tag">
                          {record.isRecommended
                            ? 'Hướng ưu tiên xanh'
                            : 'Góc nhìn cần cân nhắc thêm'}
                        </span>
                      </div>
                      <p className="trial-summary-item__choice">
                        <strong>Hành động đã chọn:</strong> {record.selectedChoiceLabel}
                      </p>
                      <p className="trial-summary-item__reflection">
                        <strong>Phản tư:</strong>{' '}
                        {record.reflectionSkipped
                          ? 'Đã bỏ qua bước ghi chú.'
                          : record.reflectionNote}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="trial-actions">
                  <button
                    type="button"
                    className="gp-button gp-button--primary"
                    onClick={handleRestart}
                  >
                    Trải nghiệm lại từ đầu
                  </button>
                  <Link className="gp-button gp-button--forest" to="/quest">
                    Thử 1 hành động thực tế ở Green Quest →
                  </Link>
                  <Link className="gp-button gp-button--secondary" to="/games">
                    Quay về thư viện Green Play
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
