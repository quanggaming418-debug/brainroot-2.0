import { publicUrl } from '../utils/publicUrl';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyUnavailableState } from '../components/common/EmptyUnavailableState';
import { ProductStatusLabel } from '../components/common/ProductStatusLabel';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy, getFactActDetailCopy } from '../i18n/siteCopy';

export function FactActDetailPage() {
  const { locale } = useI18n();
  const copy = getFactActDetailCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  return (
    <div className="gp-page gp-detail-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Play', to: '/games' },
            { label: copy.title },
          ]}
        />
      </div>

      <section
        className="gp-detail-hero"
        aria-labelledby="fact-act-page-title"
      >
        <div className="gp-container gp-detail-hero__grid">
          <figure className="gp-detail-hero__stage">
            <div className="gp-detail-hero__cutout-box">
              <img
                className="game-showcase__cutout-leaf game-showcase__cutout-leaf--sage"
                src={publicUrl('/assets/hero-v4/floating-leaf-sage.svg')}
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
              />
              <img
                className="game-showcase__cutout-leaf game-showcase__cutout-leaf--peach"
                src={publicUrl('/assets/hero-v4/floating-leaf-peach.svg')}
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
              />
              <img
                className="gp-detail-hero__cutout-img"
                src={publicUrl('/assets/hero-v4/fact-act-deck.webp')}
                width={1024}
                height={1024}
                alt={copy.deckImgAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="gp-detail-hero__caption">
              {copy.deckCaption}
            </figcaption>
          </figure>

          <div className="gp-detail-hero__content">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="fact-act-page-title">
              {copy.title}
            </h1>
            <ProductStatusLabel label={copy.statusLabel} tone="peach" />
            <p className="gp-detail-hero__tagline">{copy.tagline}</p>
            <p className="gp-detail-hero__overview">{copy.overview}</p>

            <div className="gp-detail-hero__cta-row">
              <Link
                className="gp-button gp-button--primary"
                to={copy.trialCtaTo}
              >
                <span>{copy.trialCtaLabel}</span>
                <span className="gp-button__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="gp-button gp-button--secondary" to="/games">
                {copy.backToLibrary}
              </Link>
            </div>

            <dl className="game-specs">
              {copy.specs.map((spec) => (
                <div className="game-specs__row" key={spec.label}>
                  <dt className="game-specs__label">{spec.label}</dt>
                  <dd className="game-specs__value">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-section--tinted"
        aria-labelledby="fact-act-loop-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.loopEyebrow}</p>
            <h2 className="gp-section-heading" id="fact-act-loop-heading">
              {copy.learningLoopHeading}
            </h2>
            <p className="gp-section-summary">{copy.learningLoopSummary}</p>
          </div>

          <ol className="gp-steps-grid">
            {copy.learningSteps.map((step) => (
              <li className="gp-step-card" key={step.code}>
                <div className="gp-step-card__meta">
                  <span className="gp-step-card__number">
                    {step.stepNumber}
                  </span>
                  <span className="gp-step-card__code">{step.code}</span>
                </div>
                <h3 className="gp-step-card__title">{step.title}</h3>
                <p className="gp-step-card__summary">{step.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="gp-section"
        aria-labelledby="fact-act-comparison-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header gp-section-header--left">
            <p className="gp-eyebrow">{copy.compareEyebrow}</p>
            <h2
              className="gp-section-heading"
              id="fact-act-comparison-heading"
            >
              {copy.comparisonHeading}
            </h2>
            <p className="gp-section-summary">{copy.comparisonSummary}</p>
          </div>

          <div className="gp-compare-grid">
            {copy.comparisonColumns.map((column) => (
              <article className="gp-compare-card" key={column.heading}>
                <p className="gp-compare-card__tag">{column.badge}</p>
                <h3 className="gp-compare-card__title">{column.heading}</h3>
                <ul className="gp-check-list">
                  {column.points.map((point) => (
                    <li className="gp-check-list__item" key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gp-section gp-section--compact">
        <div className="gp-container">
          <EmptyUnavailableState
            statusTag={copy.noticeTag}
            heading={copy.unavailableNotice.heading}
            description={copy.unavailableNotice.description}
            primaryActionLabel={copy.unavailableNotice.primaryActionLabel}
            primaryActionTo={copy.unavailableNotice.primaryActionTo}
            secondaryActionLabel={copy.unavailableNotice.secondaryActionLabel}
            secondaryActionTo={copy.unavailableNotice.secondaryActionTo}
          />
        </div>
      </section>
    </div>
  );
}
