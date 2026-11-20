import { HERO_CONTENT } from '../../data/landing';
import { HeroBackground } from './HeroBackground';
import { MascotLayer } from './MascotLayer';
import { PrimaryCTA } from './PrimaryCTA';

export function HeroSection() {
  return (
    <section
      className="hero"
      aria-label={HERO_CONTENT.heroAriaLabel}
    >
      <HeroBackground />

      <div className="hero__copy">
        <p className="eyebrow">
          <span className="eyebrow__seed" aria-hidden="true" />
          {HERO_CONTENT.slogan}
        </p>

        <h1 className="hero__title">
          {HERO_CONTENT.heading}
          <span className="h1-sprout" aria-hidden="true">
            <svg viewBox="0 0 60 65" fill="none">
              <path
                d="M28 61V20"
                stroke="#63894C"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M28 28C7 32 5 13 8 4c17-3 28 6 20 24Z"
                fill="#A6C6B6"
                stroke="#63894C"
                strokeWidth="3"
              />
              <path
                d="M29 38c22 0 28-16 27-30-23-3-36 11-27 30Z"
                fill="#87AB62"
                stroke="#63894C"
                strokeWidth="3"
              />
            </svg>
          </span>
        </h1>

        <p className="hero__statement">
          {HERO_CONTENT.statementLine1}
          <br className="desktop-break" /> {HERO_CONTENT.statementLine2}
        </p>

        <PrimaryCTA
          label={HERO_CONTENT.primaryCtaLabel}
          href={HERO_CONTENT.primaryCtaHref}
        />
      </div>

      <MascotLayer />

      <a className="scroll-hint" href={HERO_CONTENT.primaryCtaHref}>
        <span className="scroll-hint__icon" aria-hidden="true">
          ↓
        </span>
        <span>{HERO_CONTENT.scrollHintLabel}</span>
      </a>
    </section>
  );
}
