import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import {
  getRouteDocumentTitle,
  resolveRouteFocusAction,
} from '../../utils/routeNavigation';

export function RouteScrollAndFocus() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { locale } = useI18n();
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    document.title = getRouteDocumentTitle(location.pathname, locale);
  }, [location.pathname, locale]);

  useEffect(() => {
    const action = resolveRouteFocusAction({
      hash: location.hash,
      navigationType,
      isInitialMount: isInitialMountRef.current,
    });

    isInitialMountRef.current = false;

    if (action.type === 'preserve-pop') {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (action.type === 'focus-hash') {
      const frameId = window.requestAnimationFrame(() => {
        const target = document.getElementById(action.targetId);
        if (!target) return;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        if (target instanceof HTMLElement) {
          target.focus({ preventScroll: true });
        }
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const frameId = window.requestAnimationFrame(() => {
      const mainElement = document.getElementById('main-content');
      if (mainElement instanceof HTMLElement) {
        mainElement.focus({ preventScroll: true });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash, navigationType]);

  return null;
}
