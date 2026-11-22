import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ABOUT_ASSETS,
  ABOUT_AUDIENCE,
  ABOUT_CONTRAST,
  ABOUT_FOOTNOTE,
  ABOUT_HERO,
  ABOUT_INVITE,
  ABOUT_JOURNEY,
} from '../data/about';
import { useHeroParallax } from '../hooks/useHeroParallax';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useI18n } from '../i18n/I18nContext';
import { getAboutPageCopy, getBreadcrumbsUiCopy } from '../i18n/siteCopy';
import { publicUrl } from '../utils/publicUrl';

/** Soft rolling-hill transition between blocks (decorative path, no hard colour band). */
function Wave({ flip = false }: { readonly flip?: boolean }) {
  return (
    <svg
      className={`about-wave${flip ? ' about-wave--flip' : ''}`}
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 72V40C180 8 330 0 520 22S880 70 1090 52 1340 6 1440 24V72Z" />
    </svg>
  );
}

export function AboutPage() {
  const { locale } = useI18n();
  const copy = getAboutPageCopy(locale);
  const crumbs = getBreadcrumbsUiCopy(locale);

  const pageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  useHeroParallax(sceneRef);
  useRevealOnScroll(pageRef);

  return (
    <div className="gp-page world-page world-page--about about-v3" ref={pageRef}>
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: locale === 'en' ? 'About Brainroot' : 'Về Brainroot' },
          ]}
        />
      </div>

      {/* Block 1 — Hero */}
      <section className="about-hero" aria-labelledby="about-page-title">
        <div className="about-container about-hero__grid">
          <div className="about-hero__copy">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="about-hero__title" id="about-page-title">
              {ABOUT_HERO.title[locale]}
            </h1>
            <p className="about-hero__slogan">{ABOUT_HERO.slogan}</p>
            <p className="about-hero__desc">{ABOUT_HERO.description[locale]}</p>
          </div>

          <div className="about-scene" ref={sceneRef} role="img" aria-label={ABOUT_HERO.sceneAlt[locale]}>
            <img
              className="about-scene__base"
              src={publicUrl(ABOUT_ASSETS.garden)}
              alt=""
              width={1672}
              height={941}
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
            {[
              { src: ABOUT_ASSETS.sky, strength: 0.12 },
              { src: ABOUT_ASSETS.hills, strength: 0.3 },
              { src: ABOUT_ASSETS.foreground, strength: 0.55 },
            ].map((layer) => (
              <div className="scene__layer about-scene__layer" data-strength={layer.strength} key={layer.src}>
                <img
                  src={publicUrl(layer.src)}
                  alt=""
                  width={1672}
                  height={941}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
            <img
              className="about-mascot about-mascot--brainie"
              src={publicUrl(ABOUT_ASSETS.brainie)}
              alt=""
              width={627}
              height={650}
              decoding="async"
              draggable={false}
            />
            <img
              className="about-mascot about-mascot--rootie"
              src={publicUrl(ABOUT_ASSETS.rootie)}
              alt=""
              width={602}
              height={650}
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Block 2 — From Brainrot to Brainroot */}
      <section className="about-block about-block--tinted about-contrast" aria-labelledby="about-contrast-heading">
        <Wave />
        <div className="about-container about-contrast__grid">
          <div className="about-reveal">
            <h2 className="about-h2" id="about-contrast-heading">
              {ABOUT_CONTRAST.headingLead[locale]} <span className="about-brain">Brain</span>
              <span className="about-rot">rot</span> {ABOUT_CONTRAST.headingTo[locale]}{' '}
              <span className="about-brain">Brain</span>
              <span className="about-root">root</span>
            </h2>
            <p className="about-lead">{ABOUT_CONTRAST.body[locale]}</p>
            <p className="about-nameline">{ABOUT_CONTRAST.nameLine[locale]}</p>
          </div>

          <div className="about-compare about-reveal">
            <figure className="about-compare__frame about-compare__frame--before">
              <img
                src={publicUrl(ABOUT_ASSETS.sky)}
                alt={ABOUT_CONTRAST.figureAlt.before[locale]}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{ABOUT_CONTRAST.before[locale]}</figcaption>
            </figure>
            <span className="about-compare__arrow" aria-hidden="true">
              →
            </span>
            <figure className="about-compare__frame about-compare__frame--after">
              <img
                src={publicUrl(ABOUT_ASSETS.garden)}
                alt={ABOUT_CONTRAST.figureAlt.after[locale]}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{ABOUT_CONTRAST.after[locale]}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Block 3 — Learning by experience (3 steps along a trail) */}
      <section className="about-block about-journey" aria-labelledby="about-journey-heading">
        <div className="about-container">
          <h2 className="about-h2 about-reveal" id="about-journey-heading">
            {ABOUT_JOURNEY.heading[locale]}
          </h2>

          <div className="about-trail about-reveal">
            <svg
              className="about-trail__line"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className="about-trail__path"
                pathLength={1}
                d="M0 120C150 20 260 20 400 110S650 200 800 100 1050 20 1200 90"
              />
            </svg>

            <ol className="about-trail__scenes">
              {ABOUT_JOURNEY.scenes.map((scene, index) => (
                <li className={`about-scene-step about-scene-step--${scene.id}`} key={scene.id}>
                  <img
                    className="about-scene-step__img"
                    src={publicUrl(scene.image)}
                    alt={scene.alt[locale]}
                    width={1120}
                    height={747}
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="about-scene-step__num" aria-hidden="true">
                    0{index + 1}
                  </p>
                  <h3 className="about-scene-step__title">{scene.title[locale]}</h3>
                  <p className="about-scene-step__text">{scene.sentence[locale]}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="about-mascot-line about-reveal">
            <img
              src={publicUrl(ABOUT_ASSETS.brainie)}
              alt="Brainie"
              width={627}
              height={650}
              loading="lazy"
              decoding="async"
            />
            <img
              src={publicUrl(ABOUT_ASSETS.rootie)}
              alt="Rootie"
              width={602}
              height={650}
              loading="lazy"
              decoding="async"
            />
            <p>{ABOUT_JOURNEY.mascotLine[locale]}</p>
          </div>
        </div>
      </section>

      {/* Block 4 — Who is it for */}
      <section className="about-block about-block--tinted about-audience" aria-labelledby="about-audience-heading">
        <Wave />
        <div className="about-container">
          <h2 className="about-h2 about-reveal" id="about-audience-heading">
            {ABOUT_AUDIENCE.heading[locale]}
          </h2>
          <ul className="about-audience__grid" data-testid="about-audience">
            {ABOUT_AUDIENCE.groups.map((group) => (
              <li className="about-audience__item about-reveal" key={group.id}>
                <img
                  className="about-audience__img"
                  src={publicUrl(group.image)}
                  alt={group.alt[locale]}
                  width={1120}
                  height={747}
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="about-audience__title">{group.title[locale]}</h3>
                <p>{group.sentence[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Block 5 — Invitation */}
      <section className="about-block about-invite" aria-labelledby="about-invite-heading">
        <Wave flip />
        <div className="about-container about-invite__grid">
          <div className="about-reveal">
            <h2 className="about-h2" id="about-invite-heading">
              {ABOUT_INVITE.heading[locale]}
            </h2>
            <p className="about-lead">{ABOUT_INVITE.description[locale]}</p>
            <div className="about-invite__actions">
              <Link className="gp-button gp-button--primary" to={ABOUT_INVITE.primary.to}>
                <span>{ABOUT_INVITE.primary.label[locale]}</span>
                <span className="gp-button__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="gp-text-link" to={ABOUT_INVITE.secondary.to}>
                {ABOUT_INVITE.secondary.label[locale]}
              </Link>
            </div>
          </div>

          <div className="about-invite__scene about-reveal" role="img" aria-label={ABOUT_INVITE.sceneAlt[locale]}>
            <img
              className="about-invite__ground"
              src={publicUrl(ABOUT_ASSETS.garden)}
              alt=""
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <img
              className="about-mascot about-mascot--brainie"
              src={publicUrl(ABOUT_ASSETS.brainie)}
              alt=""
              width={627}
              height={650}
              loading="lazy"
              decoding="async"
            />
            <img
              className="about-mascot about-mascot--rootie"
              src={publicUrl(ABOUT_ASSETS.rootie)}
              alt=""
              width={602}
              height={650}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <p className="about-footnote">{ABOUT_FOOTNOTE[locale]}</p>
    </div>
  );
}
