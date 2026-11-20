import { lazy, Suspense } from 'react';
import { AboutSection } from './components/landing/AboutSection';
import { EcosystemSection } from './components/landing/EcosystemSection';
import { HeroSection } from './components/landing/HeroSection';
import { SiteFooter } from './components/landing/SiteFooter';
import { SiteHeader } from './components/landing/SiteHeader';
import { HERO_CONTENT } from './data/landing';

const OAnQuan3DPrototype = lazy(() => import('./features/oanquan/OAnQuan3DPrototype'));

export default function App() {
  // Internal prototype preview only; public Game Library routes belong to BR-T004.
  if (new URLSearchParams(window.location.search).get('preview') === 'oanquan3d') {
    return <Suspense fallback={<main style={{ padding: '2rem' }}>Đang tải bản thử nghiệm 3D…</main>}>
      <OAnQuan3DPrototype />
    </Suspense>;
  }
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
