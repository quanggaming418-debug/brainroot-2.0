import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteFooter } from './components/landing/SiteFooter';
import { SiteHeader } from './components/landing/SiteHeader';
import { RouteScrollAndFocus } from './components/routing/RouteScrollAndFocus';
import { HERO_CONTENT } from './data/landing';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { getHeaderCopy, getOAnQuanTabletopCopy } from './i18n/siteCopy';
import { AboutPage } from './pages/AboutPage';
import { FactActDetailPage } from './pages/FactActDetailPage';
import { FactActTrialPage } from './pages/FactActTrialPage';
import { GameLibraryPage } from './pages/GameLibraryPage';
import { GreenConnectPage } from './pages/GreenConnectPage';
import { GreenLearnPage } from './pages/GreenLearnPage';
import { GreenQuestPage } from './pages/GreenQuestPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OAnQuanXanhDetailPage } from './pages/OAnQuanXanhDetailPage';
import { ScreenshotsGalleryPage } from './pages/ScreenshotsGalleryPage';
import { OQV2_ENABLED } from './utils/featureFlags';
import { isHomeRoute } from './utils/routeNavigation';

const OAnQuanV2Page = OQV2_ENABLED
  ? lazy(() => import('./features/oanquan-v2/ui/OAnQuanV2Page'))
  : null;

const OAnQuan3DPrototype = lazy(
  () => import('./features/oanquan/OAnQuan3DPrototype'),
);

function AppLayout() {
  const location = useLocation();
  const { locale } = useI18n();
  const headerCopy = getHeaderCopy(locale);
  const headerVariant = isHomeRoute(location.pathname)
    ? 'overlay-hero'
    : 'solid-ivory';

  return (
    <div className="app-shell" id="top">
      <RouteScrollAndFocus />

      <a className="skip-link" href={HERO_CONTENT.skipLinkHref}>
        {headerCopy.skipToMain}
      </a>

      <SiteHeader variant={headerVariant} />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameLibraryPage />} />
          <Route path="/games/fact-act" element={<FactActDetailPage />} />
          <Route path="/games/fact-act/play" element={<FactActTrialPage />} />
          <Route
            path="/games/o-an-quan-xanh"
            element={<OAnQuanXanhDetailPage />}
          />
          {OAnQuanV2Page ? (
            <Route
              path="/games/o-an-quan-xanh/play"
              element={
                <Suspense fallback={<div className="oq3d-loading">Đang tải trò chơi…</div>}>
                  <OAnQuanV2Page />
                </Suspense>
              }
            />
          ) : null}
          <Route path="/quest" element={<GreenQuestPage />} />
          <Route path="/learn" element={<GreenLearnPage />} />
          <Route path="/connect" element={<GreenConnectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/screenshots" element={<ScreenshotsGalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {OAnQuanV2Page && location.pathname.startsWith('/games/o-an-quan-xanh/play') ? null : <SiteFooter />}
    </div>
  );
}

function StandalonePreviewShell() {
  const { locale } = useI18n();
  const copy = getOAnQuanTabletopCopy(locale);
  return (
    <Suspense fallback={<div className="oq3d-loading">{copy.standaloneLoading}</div>}>
      <OAnQuan3DPrototype />
    </Suspense>
  );
}

export function App() {
  const isOAnQuanPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'oanquan3d';

  if (isOAnQuanPreview) {
    return (
      <I18nProvider>
        <StandalonePreviewShell />
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppLayout />
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
