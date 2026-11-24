import { mobileMedia } from '../../utils/layoutViewport';
import { useEffect, useRef, type RefObject } from 'react';
import { ABOUT_ASSETS, ABOUT_HERO } from '../../data/about';
import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';

/** Gentle pointer parallax on [data-depth] layers: mouse only, off for reduced motion, cleaned up on unmount. */
function usePointerParallax(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      for (const layer of layers) {
        const depth = Number(layer.dataset.depth ?? 0);
        layer.style.transform = `translate(${(x * depth).toFixed(1)}px, ${(y * depth).toFixed(1)}px)`;
      }
    };
    const onMove = (event: PointerEvent) => {
      if (reduce.matches || event.pointerType !== 'mouse') return;
      const rect = root.getBoundingClientRect();
      x = (event.clientX - rect.left) / rect.width - 0.5;
      y = (event.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      for (const layer of layers) layer.style.transform = '';
    };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export function AboutHero({ locale, eyebrow }: { readonly locale: Locale; readonly eyebrow: string }) {
  const heroRef = useRef<HTMLElement>(null);
  usePointerParallax(heroRef);
  const [line1, line2] = ABOUT_HERO.titleLines[locale];

  return (
    <section className="av-hero" ref={heroRef} aria-labelledby="about-page-title">
      <div className="av-hero__art">
        <picture>
          <source media={mobileMedia('(max-width: 900px)')} srcSet={publicUrl(ABOUT_ASSETS.heroMobile)} width={960} height={795} />
          <img
            className="av-hero__img"
            src={publicUrl(ABOUT_ASSETS.heroDesktop)}
            alt={ABOUT_HERO.sceneAlt[locale]}
            width={1672}
            height={941}
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
        </picture>
        <div className="av-hero__layer av-hero__ground" aria-hidden="true" />
        <div className="av-hero__layer av-hero__deck" data-depth="6">
          <img src={publicUrl(ABOUT_ASSETS.deck)} alt="" width={650} height={613} decoding="async" draggable={false} />
        </div>
        <div className="av-hero__layer av-hero__brainie" data-depth="10">
          <img src={publicUrl(ABOUT_ASSETS.brainie)} alt="" width={627} height={650} decoding="async" draggable={false} />
        </div>
      </div>

      <div className="av-hero__copy" data-depth="-3">
        <p className="av-hand av-hero__note">{ABOUT_HERO.journalNote[locale]}</p>
        <p className="av-eyebrow av-hero__eyebrow">{eyebrow}</p>
        <h1 className="av-hero__title" id="about-page-title">
          {line1}
          <br />
          {line2}
        </h1>
        <p className="av-hero__slogan">{ABOUT_HERO.slogan}</p>
        <p className="av-hero__lede">{ABOUT_HERO.description[locale]}</p>
      </div>
    </section>
  );
}
