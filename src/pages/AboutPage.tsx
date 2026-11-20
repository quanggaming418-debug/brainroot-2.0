import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GrowthJourneyGraphic } from '../components/garden/GardenPrimitives';
import { ABOUT_PAGE_CONTENT } from '../data/connectAbout';
import { LEARNING_JOURNEY_STAGES } from '../data/landing';

export function AboutPage() {
  const [stageIndex, setStageIndex] = useState(4);

  return (
    <div className="gp-page world-page world-page--about">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Về Brainroot' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="about-page-title">
        <div className="gp-container about-page-hero">
          <div>
            <p className="gp-eyebrow">{ABOUT_PAGE_CONTENT.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="about-page-title">
              {ABOUT_PAGE_CONTENT.heading}
            </h1>
            <div className="about-mission-box">
              <p className="about-mission-box__label">
                {ABOUT_PAGE_CONTENT.missionLabel}
              </p>
              <p className="about-mission-box__text">
                “{ABOUT_PAGE_CONTENT.missionText}”
              </p>
            </div>
            <p className="gp-detail-hero__overview">
              {ABOUT_PAGE_CONTENT.introBody}
            </p>
          </div>

          <GrowthJourneyGraphic
            stages={LEARNING_JOURNEY_STAGES}
            activeIndex={stageIndex}
            onSelectStage={setStageIndex}
          />
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="about-pilot-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">BỐI CẢNH & CÁCH TIẾP CẬN</p>
            <h2 className="gp-section-heading" id="about-pilot-heading">
              {ABOUT_PAGE_CONTENT.pilotHeading}
            </h2>
          </div>

          <div className="gp-phygital__grid">
            {ABOUT_PAGE_CONTENT.pilotCards.map((card, index) => (
              <article className="gp-pillar" key={card.title}>
                <span className="gp-pillar__index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="gp-pillar__title">{card.title}</h3>
                <p className="gp-pillar__description">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="gp-section"
        aria-labelledby="about-transparency-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">TRUNG THỰC TRONG PHÁT TRIỂN</p>
            <h2 className="gp-section-heading" id="about-transparency-heading">
              {ABOUT_PAGE_CONTENT.transparencyHeading}
            </h2>
          </div>

          <dl className="transparency-list">
            {ABOUT_PAGE_CONTENT.transparencyItems.map((item) => (
              <div className="transparency-row" key={item.label}>
                <dt className="transparency-row__label">
                  <strong>{item.label}</strong>
                  <span className="transparency-row__status">{item.status}</span>
                </dt>
                <dd className="transparency-row__detail">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="world-next-strip">
            <p>Khám phá trực tiếp các khu vực đang hoạt động trên Brainroot 2.0:</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--primary" to="/games">
                Vào thư viện Green Play →
              </Link>
              <Link className="gp-button gp-button--secondary" to="/quest">
                Mở Green Quest
              </Link>
              <Link className="gp-text-link" to="/connect">
                Xem Green Connect
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
