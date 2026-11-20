import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { getFeaturedGreenPlayCopy } from '../../i18n/siteCopy';
import { BotanicalDivider } from '../garden/GardenPrimitives';

export function FeaturedGreenPlaySection() {
  const { locale } = useI18n();
  const copy = getFeaturedGreenPlayCopy(locale);

  return (
    <section
      className="featured-play"
      id={copy.id}
      tabIndex={-1}
      aria-labelledby="featured-play-heading"
    >
      <BotanicalDivider
        topFill="#F8F3E9"
        accentFill="#E5DEC9"
        bottomFill="#F1EBDC"
        withLeaves
      />

      <div className="featured-play__band">
        <div className="featured-play__inner">
          <header className="featured-play__header">
            <div>
              <p className="section-overline section-overline--botanical">
                <span className="section-overline__seed" aria-hidden="true" />
                <span>{copy.overline}</span>
              </p>
              <h2 className="section-heading" id="featured-play-heading">
                {copy.heading}
              </h2>
              <p className="featured-play__summary">{copy.summary}</p>
            </div>
            <Link
              className="gp-button gp-button--forest featured-play__all-btn"
              to={copy.primaryCtaTo}
            >
              <span>{copy.primaryCtaLabel}</span>
              <span className="gp-button__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </header>

          <div className="featured-play__grid">
            {copy.items.map((item) => {
              const isExternalPreview = item.secondaryActionTo.includes('?preview=');
              return (
                <article
                  key={item.id}
                  className={`featured-game-card featured-game-card--${item.id}`}
                >
                  <div className="featured-game-card__media-shell">
                    <div className="featured-game-card__media">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        loading="eager"
                        decoding="sync"
                        className={
                          item.id === 'fact-act'
                            ? 'featured-game-card__img--cutout'
                            : 'featured-game-card__img--scene'
                        }
                      />
                      {'disclosure' in item && item.disclosure ? (
                        <p className="featured-game-card__disclosure">
                          {item.disclosure}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="featured-game-card__body">
                    <p
                      className={`featured-game-card__status featured-game-card__status--${item.id}`}
                    >
                      <span
                        className="featured-game-card__status-seed"
                        aria-hidden="true"
                      />
                      <span>{item.badge}</span>
                    </p>
                    <h3 className="featured-game-card__title">{item.title}</h3>
                    <p className="featured-game-card__subtitle">
                      {item.subtitle}
                    </p>
                    <p className="featured-game-card__description">
                      {item.description}
                    </p>

                    <div className="featured-game-card__actions">
                      <Link
                        className={
                          item.id === 'fact-act'
                            ? 'gp-button gp-button--primary'
                            : 'gp-button gp-button--forest'
                        }
                        to={item.primaryActionTo}
                      >
                        <span>{item.primaryActionLabel}</span>
                        <span className="gp-button__arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                      {isExternalPreview ? (
                        <a
                          className="gp-text-link"
                          href={item.secondaryActionTo}
                        >
                          {item.secondaryActionLabel} ↗
                        </a>
                      ) : (
                        <Link
                          className="gp-text-link"
                          to={item.secondaryActionTo}
                        >
                          {item.secondaryActionLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <BotanicalDivider
        topFill="#F1EBDC"
        accentFill="#DEE8D8"
        bottomFill="#F8F3E9"
        withLeaves
      />
    </section>
  );
}
