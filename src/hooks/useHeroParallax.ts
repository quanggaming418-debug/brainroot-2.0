import { useEffect, type RefObject } from 'react';
import { getLayerTransform, shouldEnableParallax } from '../utils/parallax';
import { layoutViewportWidth } from '../utils/layoutViewport';

/**
 * Applies subtle 3-layer scroll parallax on desktop viewports using rAF.
 * Automatically resets transforms on mobile (<= 720px) or prefers-reduced-motion.
 */
export function useHeroParallax(containerRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = Array.from(
      container.querySelectorAll<HTMLElement>('[data-strength]'),
    );
    if (layers.length === 0) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const enabled = shouldEnableParallax({
        viewportWidth: layoutViewportWidth(window.innerWidth),
        prefersReducedMotion: mediaQuery.matches,
      });

      if (!enabled) {
        layers.forEach((layer) => {
          layer.style.transform = '';
        });
        return;
      }

      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const strength = Number(layer.dataset.strength ?? 0);
        layer.style.transform = getLayerTransform(scrollY, strength);
      });
    };

    const scheduleUpdate = () => {
      if (!document.hidden && rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const cancelUpdate = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const syncVisibility = () => {
      if (document.hidden) {
        cancelUpdate();
      } else {
        scheduleUpdate();
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    mediaQuery.addEventListener?.('change', scheduleUpdate);
    document.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();

    return () => {
      cancelUpdate();
      document.removeEventListener('visibilitychange', syncVisibility);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      mediaQuery.removeEventListener?.('change', scheduleUpdate);
    };
  }, [containerRef]);
}
