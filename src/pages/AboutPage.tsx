import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GrowthJourneyGraphic } from '../components/garden/GardenPrimitives';
import { useI18n } from '../i18n/I18nContext';
import {
  getAboutPageCopy,
  getBreadcrumbsUiCopy,
  getLearningJourneyStages,
} from '../i18n/siteCopy';

export function AboutPage() {
  const { locale } = useI18n();
  const copy = getAboutPageCopy(locale);
  const stages = getLearningJourneyStages(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);
  const [stageIndex, setStageIndex] = useState(4);

  return (
    <div className="gp-page world-page world-page--about">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: locale === 'en' ? 'About Brainroot' : 'Về Brainroot' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="about-page-title">
        <div className="gp-container about-page-hero">
          <div>
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="about-page-title">
              {copy.heading}
            </h1>
            <div className="about-mission-box">
              <p className="about-mission-box__label">{copy.missionLabel}</p>
              <p className="about-mission-box__text">{copy.missionText}</p>
            </div>
            <p className="gp-detail-hero__overview">{copy.introBody}</p>
          </div>

          <GrowthJourneyGraphic
            stages={stages}
            activeIndex={stageIndex}
            onSelectStage={setStageIndex}
          />
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="about-audience-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.audienceEyebrow}</p>
            <h2 className="gp-section-heading" id="about-audience-heading">
              {copy.audienceHeading}
            </h2>
          </div>

          <div className="gp-phygital__grid">
            {copy.audienceCards.map((card, index) => (
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
        aria-labelledby="about-start-heading"
      >
        <div className="gp-container">
          <div className="about-start-panel">
            <div className="about-start-panel__copy">
              <p className="gp-eyebrow">{copy.startEyebrow}</p>
              <h2 className="gp-section-heading" id="about-start-heading">
                {copy.startHeading}
              </h2>
              <p className="about-start-panel__desc">{copy.startDescription}</p>
            </div>

            <div className="about-start-panel__actions">
              {copy.startActions.map((action) => (
                <Link
                  key={action.to}
                  className={
                    action.variant === 'primary'
                      ? 'gp-button gp-button--primary'
                      : 'gp-button gp-button--secondary'
                  }
                  to={action.to}
                >
                  <span>{action.label}</span>
                  {action.variant === 'primary' ? (
                    <span className="gp-button__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
