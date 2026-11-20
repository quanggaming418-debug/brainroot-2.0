import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { getHeroCopy } from '../../i18n/siteCopy';
import { HeroBackground } from './HeroBackground';
import { MascotLayer } from './MascotLayer';
import { PrimaryCTA } from './PrimaryCTA';

export function HeroSection() {
  const { locale } = useI18n();
  const copy = getHeroCopy(locale);
  const [motionPaused, setMotionPaused] = useState(() => document.hidden);

  useEffect(() => {
    const syncVisibility = () => setMotionPaused(document.hidden);
    document.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);

  return (
    <section
      className="hero"
      data-motion-paused={motionPaused ? '' : undefined}
      aria-label={copy.heroAriaLabel}
    >
      <HeroBackground />

      <div className="hero__copy">
        <p className="eyebrow">
          <span className="eyebrow__seed" aria-hidden="true" />
          {copy.slogan}
        </p>

        <h1 className="hero__title">
          {copy.heading}
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
          {copy.statementLine1}
          <br className="desktop-break" /> {copy.statementLine2}
        </p>

        <PrimaryCTA
          label={copy.primaryCtaLabel}
          href={copy.primaryCtaHref}
        />
      </div>

      <MascotLayer />

      <a className="scroll-hint" href={copy.primaryCtaHref}>
        <span className="scroll-hint__icon" aria-hidden="true">
          ↓
        </span>
        <span>{copy.scrollHintLabel}</span>
      </a>
    </section>
  );
}
