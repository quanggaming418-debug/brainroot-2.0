import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_CONTENT, LEARNING_JOURNEY_STAGES } from '../../data/landing';
import { GrowthJourneyGraphic } from '../garden/GardenPrimitives';

export function AboutSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(4);

  return (
    <section
      className="about about--journey"
      id={ABOUT_CONTENT.id}
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <div className="about__grid">
        <div className="about__story">
          <p className="section-overline section-overline--botanical">
            <span className="section-overline__seed" aria-hidden="true" />
            <span>{ABOUT_CONTENT.overline}</span>
          </p>
          <h2 className="section-heading" id="about-heading">
            {ABOUT_CONTENT.heading}
          </h2>
          <p className="about__mission">{ABOUT_CONTENT.mission}</p>
          <p className="about__body">{ABOUT_CONTENT.body}</p>
          <div className="about__actions">
            <Link className="gp-button gp-button--secondary" to={ABOUT_CONTENT.ctaTo}>
              <span>{ABOUT_CONTENT.ctaLabel}</span>
              <span className="gp-button__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="gp-text-link" to="/connect">
              Xem cách lớp học & câu lạc bộ tham gia
            </Link>
          </div>
        </div>

        <div className="about__visual">
          <GrowthJourneyGraphic
            stages={LEARNING_JOURNEY_STAGES}
            activeIndex={activeStageIndex}
            onSelectStage={setActiveStageIndex}
          />
        </div>
      </div>
    </section>
  );
}
