import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DestinationIllustration } from '../components/garden/GardenPrimitives';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy, getGreenConnectCopy } from '../i18n/siteCopy';

export function GreenConnectPage() {
  const { locale } = useI18n();
  const copy = getGreenConnectCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  return (
    <div className="gp-page world-page world-page--connect">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Connect' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="connect-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="connect-page-title">
              {copy.heading}
            </h1>
            <p className="gp-detail-hero__overview">{copy.summary}</p>
          </div>
          <div className="world-hero__vignette">
            <DestinationIllustration variant="connect" />
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="connect-pathways-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.pathwaysEyebrow}</p>
            <h2 className="gp-section-heading" id="connect-pathways-heading">
              {copy.pathwaysHeading}
            </h2>
          </div>

          <div className="connect-grid">
            {copy.pathways.map((pathway) => (
              <article key={pathway.id} className="connect-card">
                <span className="trial-topic-pill">{pathway.audience}</span>
                <h3 className="connect-card__title">{pathway.title}</h3>
                <p className="connect-card__desc">{pathway.description}</p>
                <ul className="gp-check-list">
                  {pathway.howToStart.map((step) => (
                    <li key={step} className="gp-check-list__item">
                      {step}
                    </li>
                  ))}
                </ul>
                <div className="connect-card__action">
                  <Link
                    className="gp-button gp-button--secondary"
                    to={pathway.suggestedRouteTo}
                  >
                    <span>{pathway.suggestedRouteLabel}</span>
                    <span className="gp-button__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gp-section gp-section--compact">
        <div className="gp-container">
          <aside className="connect-transparency" aria-labelledby="connect-contact-heading">
            <p className="gp-eyebrow">{copy.contactTransparency.eyebrow}</p>
            <h2 className="connect-transparency__title" id="connect-contact-heading">
              {copy.contactTransparency.heading}
            </h2>
            <p className="connect-transparency__body">
              {copy.contactTransparency.description}
            </p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--forest" to="/about">
                {copy.aboutBtn}
              </Link>
              <Link className="gp-text-link" to="/games">
                {copy.gamesLink}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
