import { AboutSection } from './components/landing/AboutSection';
import { EcosystemSection } from './components/landing/EcosystemSection';
import { HeroSection } from './components/landing/HeroSection';
import { SiteFooter } from './components/landing/SiteFooter';
import { SiteHeader } from './components/landing/SiteHeader';
import { HERO_CONTENT } from './data/landing';

export default function App() {
  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href={HERO_CONTENT.skipLinkHref}>
        {HERO_CONTENT.skipLinkLabel}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <EcosystemSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
