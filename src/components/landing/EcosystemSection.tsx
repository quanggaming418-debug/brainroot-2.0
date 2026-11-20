import { Link } from 'react-router-dom';
import type { EcosystemArea } from '../../data/landing';
import { useI18n } from '../../i18n/I18nContext';
import {
  getEcosystemAreas,
  getEcosystemSectionCopy,
} from '../../i18n/siteCopy';

interface EcosystemSectionProps {
  readonly areas?: readonly EcosystemArea[];
}

export function EcosystemSection({ areas }: EcosystemSectionProps) {
  const { locale } = useI18n();
  const sectionCopy = getEcosystemSectionCopy(locale);
  const resolvedAreas = areas ?? getEcosystemAreas(locale);

  return (
    <section
      className="worlds worlds--garden-windows"
      id={sectionCopy.id}
      tabIndex={-1}
      aria-labelledby="worlds-heading"
    >
      <div className="worlds__inner">
        <header className="worlds__intro">
          <p className="section-overline section-overline--botanical">
            <span className="section-overline__seed" aria-hidden="true" />
            <span>{sectionCopy.overline}</span>
          </p>
          <h2 className="section-heading" id="worlds-heading">
            {sectionCopy.heading}
          </h2>
          <p className="section-summary">{sectionCopy.summary}</p>
        </header>

        <div className="garden-windows-grid">
          {resolvedAreas.map((area) => {
            const isFeatured = area.emphasis === 'featured';
            return (
              <article
                key={area.id}
                id={area.id}
                tabIndex={-1}
                aria-labelledby={`${area.id}-heading`}
                className={`garden-window-card garden-window-card--${area.variant}${
                  isFeatured ? ' garden-window-card--featured' : ''
                }`}
              >
                <div className="garden-window-card__media">
                  <div className="garden-window-card__frame">
                    <img
                      className="garden-window-card__art"
                      src={area.imageSrc}
                      alt={area.imageAlt}
                      width={1120}
                      height={747}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="garden-window-card__body">
                  <div className="garden-window-card__header">
                    <p
                      className={`garden-window-card__status garden-window-card__status--${area.variant}`}
                    >
                      <span
                        className="garden-window-card__status-seed"
                        aria-hidden="true"
                      />
                      <span>{area.statusLabel}</span>
                    </p>
                    <h3
                      className="garden-window-card__title"
                      id={`${area.id}-heading`}
                    >
                      {area.title}
                    </h3>
                    <p className="garden-window-card__subtitle">{area.subtitle}</p>
                    <p className="garden-window-card__description">
                      {area.description}
                    </p>
                  </div>

                  <div className="garden-window-card__footer">
                    <p className="garden-window-card__note">{area.note}</p>
                    <Link
                      className={`garden-window-card__cta${
                        isFeatured ? ' garden-window-card__cta--primary' : ''
                      }`}
                      to={area.ctaTo}
                    >
                      <span>{area.ctaLabel}</span>
                      <span className="garden-window-card__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
