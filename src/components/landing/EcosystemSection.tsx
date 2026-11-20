import { Link } from 'react-router-dom';
import {
  ECOSYSTEM_AREAS,
  ECOSYSTEM_SECTION,
  type EcosystemArea,
} from '../../data/landing';

interface EcosystemSectionProps {
  readonly areas?: readonly EcosystemArea[];
}

export function EcosystemSection({
  areas = ECOSYSTEM_AREAS,
}: EcosystemSectionProps) {
  return (
    <section
      className="worlds"
      id={ECOSYSTEM_SECTION.id}
      tabIndex={-1}
      aria-labelledby="worlds-heading"
    >
      <p className="section-overline">{ECOSYSTEM_SECTION.overline}</p>
      <h2 className="section-heading" id="worlds-heading">
        {ECOSYSTEM_SECTION.heading}
      </h2>
      <p className="section-summary">{ECOSYSTEM_SECTION.summary}</p>

      <div className="world-grid">
        {areas.map((area) => (
          <article
            key={area.id}
            id={area.id}
            tabIndex={-1}
            aria-labelledby={`${area.id}-heading`}
            className={`world-card world-card--${area.variant}`}
          >
            <div>
              <div className="world-card__header">
                <div className="world-card__icon" aria-hidden="true">
                  {area.icon}
                </div>
                <span className="world-card__status">{area.statusLabel}</span>
              </div>
              <h3 className="world-card__title" id={`${area.id}-heading`}>
                {area.title}
              </h3>
              <p className="world-card__subtitle">{area.subtitle}</p>
              <p className="world-card__description">{area.description}</p>
            </div>
            {area.ctaTo && area.ctaLabel ? (
              <div className="world-card__footer">
                <p className="world-card__note">{area.note}</p>
                <Link className="world-card__cta" to={area.ctaTo}>
                  <span>{area.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              <p className="world-card__note">{area.note}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
