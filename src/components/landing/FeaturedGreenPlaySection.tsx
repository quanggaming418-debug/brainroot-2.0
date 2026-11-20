import { Link } from 'react-router-dom';
import { FEATURED_GREEN_PLAY } from '../../data/landing';
import { BotanicalDivider } from '../garden/GardenPrimitives';

export function FeaturedGreenPlaySection() {
  return (
    <section
      className="featured-play"
      id={FEATURED_GREEN_PLAY.id}
      tabIndex={-1}
      aria-labelledby="featured-play-heading"
    >
      <BotanicalDivider
        topFill="#F8F3E9"
        accentFill="#E7DFCD"
        bottomFill="#EFE8D9"
      />

      <div className="featured-play__band">
        <div className="featured-play__inner">
          <header className="featured-play__header">
            <div>
              <p className="section-overline">{FEATURED_GREEN_PLAY.overline}</p>
              <h2 className="section-heading" id="featured-play-heading">
                {FEATURED_GREEN_PLAY.heading}
              </h2>
              <p className="featured-play__summary">
                {FEATURED_GREEN_PLAY.summary}
              </p>
            </div>
            <Link
              className="gp-button gp-button--forest featured-play__all-btn"
              to={FEATURED_GREEN_PLAY.primaryCtaTo}
            >
              <span>{FEATURED_GREEN_PLAY.primaryCtaLabel}</span>
              <span className="gp-button__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </header>

          <div className="featured-play__grid">
            {FEATURED_GREEN_PLAY.items.map((item) => {
              const isExternalPreview = item.secondaryActionTo.startsWith('/?preview=');
              return (
                <article
                  key={item.id}
                  className={`featured-game-card featured-game-card--${item.id}`}
                >
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

                  <div className="featured-game-card__body">
                    <span className="featured-game-card__badge">
                      {item.badge}
                    </span>
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
        topFill="#EFE8D9"
        accentFill="#DCE6D7"
        bottomFill="#F8F3E9"
      />
    </section>
  );
}
