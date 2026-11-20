import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteFooter } from './components/landing/SiteFooter';
import { SiteHeader } from './components/landing/SiteHeader';
import { RouteScrollAndFocus } from './components/routing/RouteScrollAndFocus';
import { HERO_CONTENT } from './data/landing';
import { FactActDetailPage } from './pages/FactActDetailPage';
import { GameLibraryPage } from './pages/GameLibraryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OAnQuanXanhDetailPage } from './pages/OAnQuanXanhDetailPage';
import { isHomeRoute } from './utils/routeNavigation';

const OAnQuan3DPrototype = lazy(
  () => import('./features/oanquan/OAnQuan3DPrototype'),
);

function AppLayout() {
  const location = useLocation();
  const headerVariant = isHomeRoute(location.pathname)
    ? 'overlay-hero'
    : 'solid-ivory';

  return (
    <div className="app-shell" id="top">
      <RouteScrollAndFocus />

      <a className="skip-link" href={HERO_CONTENT.skipLinkHref}>
        {HERO_CONTENT.skipLinkLabel}
      </a>

      <SiteHeader variant={headerVariant} />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameLibraryPage />} />
          <Route path="/games/fact-act" element={<FactActDetailPage />} />
          <Route
            path="/games/o-an-quan-xanh"
            element={<OAnQuanXanhDetailPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}

export function App() {
  const isOAnQuanPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'oanquan3d';

  if (isOAnQuanPreview) {
    return (
      <Suspense fallback={<div className="oq3d-loading">Đang khởi tạo bản thử nghiệm 3D...</div>}>
        <OAnQuan3DPrototype />
      </Suspense>
    );
  }

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
