import type { CSSProperties } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ABOUT_ASSETS } from '../data/about';
import { AboutAudience } from '../features/about/AboutAudience';
import { AboutHero } from '../features/about/AboutHero';
import { AboutLearning } from '../features/about/AboutLearning';
import { AboutStory } from '../features/about/AboutStory';
import { useI18n } from '../i18n/I18nContext';
import { getAboutPageCopy, getBreadcrumbsUiCopy } from '../i18n/siteCopy';
import { publicUrl } from '../utils/publicUrl';

/**
 * /about V4.3 (BR-T031) — four chapters of one field journal:
 * warm desk (hero) → forest story (scroll-driven) → journal spread (activities + deck) → quiet ending (audience).
 * Shared Header/Footer, routing and the VI/EN switch come from the app shell and are unchanged.
 */
export function AboutPage() {
  const { locale } = useI18n();
  const copy = getAboutPageCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  return (
    <div
      className="gp-page world-page world-page--about about-v43"
      style={{ '--av-grain': `url("${publicUrl(ABOUT_ASSETS.grain)}")` } as CSSProperties}
    >
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: locale === 'en' ? 'About Brainroot' : 'Về Brainroot' },
          ]}
        />
      </div>

      <AboutHero locale={locale} eyebrow={copy.eyebrow} />
      <div className="av-handoff" aria-hidden="true" />
      <AboutStory locale={locale} />
      <AboutLearning locale={locale} />
      <AboutAudience locale={locale} />
    </div>
  );
}
