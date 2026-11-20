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
            <p className="world-card__note">{area.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
