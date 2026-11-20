import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GameProductShowcase } from '../components/games/GameProductShowcase';
import { GreenPlayPavilionBanner } from '../components/games/GreenPlayPavilionBanner';
import { useI18n } from '../i18n/I18nContext';
import {
  getBreadcrumbsUiCopy,
  getGreenPlayLibraryCopy,
} from '../i18n/siteCopy';

export function GameLibraryPage() {
  const { locale } = useI18n();
  const copy = getGreenPlayLibraryCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  return (
    <div className="gp-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Play' },
          ]}
        />
      </div>

      <GreenPlayPavilionBanner />

      <section
        className="gp-section gp-library"
        aria-labelledby="green-play-library-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header">
            <p className="gp-eyebrow">{copy.intro.eyebrow}</p>
            <h2
              className="gp-section-heading"
              id="green-play-library-heading"
            >
              {copy.intro.heading}
            </h2>
            <p className="gp-section-summary">{copy.intro.summary}</p>
          </div>

          <div className="game-showcase-list">
            {copy.products.map((product) => (
              <GameProductShowcase key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-phygital"
        aria-labelledby="phygital-heading"
      >
        <div className="gp-container">
          <div className="gp-phygital__panel">
            <div className="gp-phygital__intro">
              <p className="gp-eyebrow">{copy.phygital.eyebrow}</p>
              <h2 className="gp-section-heading" id="phygital-heading">
                {copy.phygital.heading}
              </h2>
              <p className="gp-section-summary">{copy.phygital.summary}</p>
            </div>

            <div className="gp-phygital__grid">
              {copy.phygital.pillars.map((pillar, index) => (
                <article className="gp-pillar" key={pillar.title}>
                  <span className="gp-pillar__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="gp-pillar__title">{pillar.title}</h3>
                  <p className="gp-pillar__description">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gp-return-band" aria-label={copy.returnNavAria}>
        <div className="gp-container gp-return-band__inner">
          <p className="gp-return-band__text">{copy.returnPrompt}</p>
          <div className="gp-return-band__actions">
            <Link className="gp-button gp-button--secondary" to="/">
              {copy.returnHomeBtn}
            </Link>
            <Link className="gp-text-link" to="/#about">
              {copy.returnAboutLink}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
