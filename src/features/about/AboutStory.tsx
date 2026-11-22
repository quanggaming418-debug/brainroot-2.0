import { useLayoutEffect, useRef, useState } from 'react';
import { ABOUT_ASSETS, ABOUT_STORY } from '../../data/about';
import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';
import {
  FRAGMENTS,
  STEP_ANCHORS,
  clamp,
  computeStoryFrame,
  quantizeProgress,
  storyGeometry,
  type StoryGeometry,
  type StoryStep,
} from './storyTimeline';

const GEOMETRY_VARS = ['pw', 'ph', 'm', 'iw', 'ih', 'fw'] as const satisfies readonly (keyof StoryGeometry)[];

function trackProgress(track: HTMLElement): number {
  const rect = track.getBoundingClientRect();
  const span = rect.height - window.innerHeight;
  return span > 0 ? clamp(-rect.top / span) : 0;
}

function isPinned(track: HTMLElement): boolean {
  const rect = track.getBoundingClientRect();
  return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
}

/**
 * "Lướt qua → Giữ lại → Khám phá sâu": a sticky stage whose frame is computed from scroll progress.
 * No scroll-jacking: the page scrolls normally; the step buttons only scroll to fixed anchors.
 */
export function AboutStory({ locale }: { readonly locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const fragRefs = useRef<(HTMLImageElement | null)[]>([]);
  const keepRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const tapeLeftRef = useRef<HTMLImageElement>(null);
  const tapeRightRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [step, setStep] = useState<StoryStep>(1);

  // Layout effect so the first frame is painted in place (no flash of unpositioned layers).
  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let geometry = storyGeometry(stage.clientWidth, stage.clientHeight);
    let raf = 0;

    const writeGeometry = () => {
      for (const key of GEOMETRY_VARS) stage.style.setProperty(`--av-${key}`, `${geometry[key].toFixed(1)}px`);
    };

    const render = () => {
      raf = 0;
      const raw = trackProgress(track);
      const p = reduce.matches ? quantizeProgress(raw) : raw;
      const frame = computeStoryFrame(p, geometry);
      frame.fragments.forEach((f, i) => {
        const el = fragRefs.current[i];
        if (!el) return;
        el.style.transform = f.transform;
        el.style.opacity = f.opacity;
      });
      const set = (el: HTMLElement | null, styles: Partial<Record<'transform' | 'opacity' | 'clipPath', string>>) => {
        if (el) Object.assign(el.style, styles);
      };
      set(keepRef.current, { transform: frame.keep });
      set(paperRef.current, { transform: frame.frame, opacity: frame.frameOpacity });
      set(revealRef.current, { clipPath: frame.revealClip });
      set(outlineRef.current, { clipPath: frame.outlineClip, opacity: frame.outlineOpacity });
      set(leafRef.current, { transform: frame.leaf, opacity: frame.leafOpacity });
      set(tapeLeftRef.current, { transform: frame.tapeLeft, opacity: frame.tapeOpacity });
      set(tapeRightRef.current, { transform: frame.tapeRight, opacity: frame.tapeOpacity });
      set(captionRef.current, { clipPath: frame.captionClip });
      set(glowRef.current, { opacity: frame.glowOpacity });
      stepsRef.current?.style.setProperty('--av-progress', raw.toFixed(3));
      setStep(frame.step); // React skips the update when the step is unchanged
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(render);
    };
    const remeasure = () => {
      geometry = storyGeometry(stage.clientWidth, stage.clientHeight);
      writeGeometry();
      schedule();
    };

    writeGeometry();
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', remeasure);
    reduce.addEventListener('change', schedule);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(remeasure);
    observer?.observe(stage);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', remeasure);
      reduce.removeEventListener('change', schedule);
      observer?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const goToStep = (n: StoryStep, smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * STEP_ANCHORS[n], behavior: smooth && !reduce ? 'smooth' : 'instant' });
  };

  const steps = ABOUT_STORY.steps;
  const feed = publicUrl(ABOUT_ASSETS.feed);

  return (
    <section className="av-story" aria-labelledby="about-story-heading">
      <div className="av-story__track av-band" ref={trackRef}>
        <div className="av-inner av-story__sticky">
          <div className="av-story__copy">
            <p className="av-eyebrow av-story__eyebrow">{ABOUT_STORY.eyebrow[locale]}</p>
            <h2 className="av-story__heading" id="about-story-heading">
              {ABOUT_STORY.heading[locale]}
            </h2>
          </div>

          <ol className="av-steps" ref={stepsRef} aria-label={ABOUT_STORY.stepsLabel[locale]}>
            {steps.map((s, i) => {
              const n = (i + 1) as StoryStep;
              return (
                <li key={s.label.vi}>
                  <button
                    type="button"
                    className="av-step"
                    aria-current={step === n ? 'step' : undefined}
                    onClick={() => {
                      const track = trackRef.current;
                      goToStep(n, track ? isPinned(track) : false);
                    }}
                    onFocus={() => {
                      const track = trackRef.current;
                      if (track && !isPinned(track)) goToStep(n, false);
                    }}
                  >
                    <span className="av-step__num">0{n}</span>{' '}
                    <span className="av-step__label">
                      <span className="av-step__full">{s.label[locale]}</span>
                      <span className="av-step__short" aria-hidden="true">
                        {s.short[locale]}
                      </span>
                    </span>{' '}
                    <span className="av-step__text">{s.text[locale]}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="av-story__caption" aria-live="polite">
            {steps[step - 1].text[locale]}
          </p>

          <div className="av-stage" ref={stageRef} role="img" aria-label={steps[step - 1].alt[locale]}>
            <div className="av-glow" ref={glowRef} />
            {FRAGMENTS.map((f, i) => (
              <img
                key={f.crop}
                className={`av-frag av-frag--z${f.z}`}
                ref={(el) => {
                  fragRefs.current[i] = el;
                }}
                src={feed}
                alt=""
                style={{ objectPosition: f.crop }}
                decoding="async"
                draggable={false}
              />
            ))}
            <div className="av-keep" ref={keepRef}>
              <div className="av-leaf" ref={leafRef}>
                <figure className="av-snap">
                  <img className="av-snap__img" src={feed} alt="" decoding="async" draggable={false} />
                  <img className="av-snap__tape" src={publicUrl(ABOUT_ASSETS.tapeSage)} alt="" draggable={false} />
                </figure>
                <p className="av-hand av-leaf__note">{ABOUT_STORY.keptNote[locale]}</p>
              </div>
              <div className="av-paper" ref={paperRef} />
              <div className="av-imgbox">
                <img className="av-imgbox__feed" src={feed} alt="" decoding="async" draggable={false} />
                <img
                  className="av-imgbox__reveal"
                  ref={revealRef}
                  src={publicUrl(ABOUT_ASSETS.reveal)}
                  alt=""
                  decoding="async"
                  draggable={false}
                />
                <span className="av-outline" ref={outlineRef} aria-hidden="true" />
              </div>
              <img className="av-tape av-tape--l" ref={tapeLeftRef} src={publicUrl(ABOUT_ASSETS.tapePeach)} alt="" draggable={false} />
              <img className="av-tape av-tape--r" ref={tapeRightRef} src={publicUrl(ABOUT_ASSETS.tapeSage)} alt="" draggable={false} />
              <p className="av-hand av-cap" ref={captionRef}>
                {ABOUT_STORY.pageNote[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
