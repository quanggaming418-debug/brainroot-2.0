import { Link } from 'react-router-dom';
import {
  ECOSYSTEM_AREAS,
  ECOSYSTEM_SECTION,
  type EcosystemArea,
} from '../../data/landing';
import { DestinationIllustration } from '../garden/GardenPrimitives';

interface EcosystemSectionProps {
  readonly areas?: readonly EcosystemArea[];
}

export function EcosystemSection({
  areas = ECOSYSTEM_AREAS,
}: EcosystemSectionProps) {
  return (
    <section
      className="worlds worlds--unified"
      id={ECOSYSTEM_SECTION.id}
      tabIndex={-1}
      aria-labelledby="worlds-heading"
    >
      <div className="worlds__inner">
        <header className="worlds__intro">
          <p className="section-overline">{ECOSYSTEM_SECTION.overline}</p>
          <h2 className="section-heading" id="worlds-heading">
            {ECOSYSTEM_SECTION.heading}
          </h2>
          <p className="section-summary">{ECOSYSTEM_SECTION.summary}</p>
        </header>

        <div className="world-grid world-grid--garden">
          {areas.map((area) => (
            <article
              key={area.id}
              id={area.id}
              tabIndex={-1}
              aria-labelledby={`${area.id}-heading`}
              className={`world-card world-card--${area.variant}${
                area.emphasis === 'featured' ? ' world-card--featured' : ''
              }`}
            >
              <div className="world-card__visual-wrap">
                <DestinationIllustration variant={area.variant} />
                <span className="world-card__status">{area.statusLabel}</span>
              </div>

              <div className="world-card__content">
                <h3 className="world-card__title" id={`${area.id}-heading`}>
                  {area.title}
                </h3>
                <p className="world-card__subtitle">{area.subtitle}</p>
                <p className="world-card__description">{area.description}</p>
              </div>

              <div className="world-card__footer">
                <p className="world-card__note">{area.note}</p>
                <Link
                  className={`world-card__cta${
                    area.emphasis === 'featured' ? ' world-card__cta--primary' : ''
                  }`}
                  to={area.ctaTo}
                >
                  <span>{area.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
