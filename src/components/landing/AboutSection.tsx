import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import {
  getAboutSectionCopy,
  getLearningJourneyStages,
} from '../../i18n/siteCopy';
import { GrowthJourneyGraphic } from '../garden/GardenPrimitives';

export function AboutSection() {
  const { locale } = useI18n();
  const copy = getAboutSectionCopy(locale);
  const stages = getLearningJourneyStages(locale);
  const [activeStageIndex, setActiveStageIndex] = useState(4);

  return (
    <section
      className="about about--journey"
      id={copy.id}
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <div className="about__grid">
        <div className="about__story">
          <p className="section-overline section-overline--botanical">
            <span className="section-overline__seed" aria-hidden="true" />
            <span>{copy.overline}</span>
          </p>
          <h2 className="section-heading" id="about-heading">
            {copy.heading}
          </h2>
          <p className="about__mission">{copy.mission}</p>
          <p className="about__body">{copy.body}</p>
          <div className="about__actions">
            <Link className="gp-button gp-button--secondary" to={copy.ctaTo}>
              <span>{copy.ctaLabel}</span>
              <span className="gp-button__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="gp-text-link" to="/connect">
              {copy.connectLinkLabel}
            </Link>
          </div>
        </div>

        <div className="about__visual">
          <GrowthJourneyGraphic
            stages={stages}
            activeIndex={activeStageIndex}
            onSelectStage={setActiveStageIndex}
          />
        </div>
      </div>
    </section>
  );
}
