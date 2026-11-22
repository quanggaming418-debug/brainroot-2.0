import { useEffect, type RefObject } from 'react';

/**
 * Adds `is-visible` to every `.about-reveal` inside the container once it enters the viewport.
 * With prefers-reduced-motion, without IntersectionObserver, or on error, everything is shown at once,
 * so the content is never hidden from anyone.
 */
export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>('.about-reveal'));
    const showAll = () => targets.forEach((el) => el.classList.add('is-visible'));

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}
