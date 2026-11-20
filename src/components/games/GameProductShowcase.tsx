import { publicUrl } from '../../utils/publicUrl';
import { Link } from 'react-router-dom';
import type { GameProductSummary } from '../../data/games';
import { ProductStatusLabel } from '../common/ProductStatusLabel';

interface GameProductShowcaseProps {
  readonly product: GameProductSummary;
}

export function GameProductShowcase({ product }: GameProductShowcaseProps) {
  const isMediaRight = product.mediaLayout === 'media-right';
  const headingId = `game-showcase-${product.id}`;
  const primaryTo =
    product.id === 'fact-act' ? '/games/fact-act/play' : product.slug;

  return (
    <article
      className={`game-showcase${isMediaRight ? ' game-showcase--reversed' : ''}`}
      aria-labelledby={headingId}
    >
      <figure
        className={`game-showcase__media game-showcase__media--${product.media.variant}`}
      >
        {product.media.variant === 'product-cutout' ? (
          <div className="game-showcase__cutout-stage">
            <img
              className="game-showcase__cutout-leaf game-showcase__cutout-leaf--sage"
              src={publicUrl('/assets/hero-v4/floating-leaf-sage.svg')}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              loading="lazy"
            />
            <img
              className="game-showcase__cutout-leaf game-showcase__cutout-leaf--peach"
              src={publicUrl('/assets/hero-v4/floating-leaf-peach.svg')}
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              loading="lazy"
            />
            <img
              className="game-showcase__cutout-image"
              src={product.media.desktopSrc}
              width={product.media.width}
              height={product.media.height}
              alt={product.media.alt}
              loading="eager"
              decoding="sync"
            />
          </div>
        ) : (
          <div className="game-showcase__concept-frame">
            <picture className="game-showcase__picture">
              {product.media.mobileSrc ? (
                <source
                  media="(max-width: 767px)"
                  srcSet={product.media.mobileSrc}
                />
              ) : null}
              <img
                className="game-showcase__concept-image"
                src={product.media.desktopSrc}
                width={product.media.width}
                height={product.media.height}
                alt={product.media.alt}
                loading="eager"
                decoding="sync"
              />
            </picture>
          </div>
        )}

        {product.media.disclosureCaption ? (
          <figcaption className="game-showcase__caption">
            {product.media.disclosureCaption}
          </figcaption>
        ) : null}
      </figure>

      <div className="game-showcase__body">
        <ProductStatusLabel
          label={product.statusLabel}
          tone={product.statusTone}
        />

        <h3 className="game-showcase__title" id={headingId}>
          {product.title}
        </h3>

        <p className="game-showcase__subtitle">{product.subtitle}</p>
        <p className="game-showcase__description">{product.description}</p>

        <dl className="game-specs">
          {product.specs.map((spec) => (
            <div className="game-specs__row" key={spec.label}>
              <dt className="game-specs__label">{spec.label}</dt>
              <dd className="game-specs__value">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="game-showcase__actions">
          <Link
            className={`gp-button ${
              product.id === 'fact-act'
                ? 'gp-button--primary'
                : 'gp-button--forest'
            }`}
            to={primaryTo}
          >
            <span>{product.ctaLabel}</span>
            <span className="gp-button__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          {product.secondaryCtaLabel && product.secondaryCtaTo ? (
            <Link className="gp-text-link" to={product.secondaryCtaTo}>
              {product.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
