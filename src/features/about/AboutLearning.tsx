import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ABOUT_ASSETS, ABOUT_DECK, ABOUT_LEARNING } from '../../data/about';
import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';

/** Fan angles of the five cards (deg). */
const FAN_ANGLES = [-28, -14, 0, 14, 28] as const;
const ARROWS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export function AboutLearning({ locale }: { readonly locale: Locale }) {
  const [active, setActive] = useState(0);
  /** Bumped on every selection so the chosen scene replays its short entrance. */
  const [playKey, setPlayKey] = useState(0);
  const [fanned, setFanned] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [cardFocus, setCardFocus] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scenes = ABOUT_LEARNING.scenes;

  // Deal the fan out each time "Trải nghiệm" opens (two frames so the stacked start state is painted first).
  useEffect(() => {
    setFanned(false);
    if (scenes[active].id !== 'experience') return;
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setFanned(true));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      if (inner) window.cancelAnimationFrame(inner);
    };
  }, [active, playKey, scenes]);

  const select = (i: number, focus = false) => {
    setActive(i);
    setPlayKey((k) => k + 1);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ARROWS[event.key];
    if (step) {
      event.preventDefault();
      select((i + step + scenes.length) % scenes.length, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(scenes.length - 1, true);
    }
  };

  const onCardKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ARROWS[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (i + step + ABOUT_DECK.count) % ABOUT_DECK.count;
    setCardFocus(next);
    cardRefs.current[next]?.focus();
  };

  const scene = scenes[active];

  return (
    <section className="av-learn av-band" aria-labelledby="about-learn-heading">
      <div className="av-inner">
        <h2 className="av-h2" id="about-learn-heading">
          {ABOUT_LEARNING.heading[locale]}
        </h2>
        <div className="av-spread">
          {/* Panel first in the DOM so Tab goes tabs → open scene; CSS grid places it on the right on desktop. */}
          <div className="av-panel">
            <p className="av-hand av-panel__num">
              0{active + 1} / 0{scenes.length}
            </p>
            <h3 className="av-panel__title">{scene.title[locale]}</h3>
            <p className="av-panel__text">{scene.sentence[locale]}</p>
            <div className="av-tabs" role="tablist" aria-label={ABOUT_LEARNING.tablistLabel[locale]}>
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  className="av-tab"
                  id={`about-tab-${s.id}`}
                  aria-controls={`about-scene-${s.id}`}
                  aria-selected={active === i}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <img
                    src={publicUrl(
                      s.id === 'explore' ? ABOUT_ASSETS.magnifier : s.id === 'experience' ? ABOUT_ASSETS.cardBack : ABOUT_ASSETS.bottle,
                    )}
                    alt=""
                    decoding="async"
                  />
                  <span>{s.title[locale]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="av-scenes">
            {scenes.map((s, i) => {
              const on = active === i;
              const common = {
                id: `about-scene-${s.id}`,
                role: 'tabpanel',
                'aria-labelledby': `about-tab-${s.id}`,
                hidden: !on,
              } as const;
              if (s.id === 'explore')
                return (
                  <div key={`${s.id}-${on ? playKey : 'idle'}`} className="av-scene av-scene--explore" tabIndex={0} {...common}>
                    <div className="av-scene__ground" />
                    <img className="av-s-journal" src={publicUrl(ABOUT_ASSETS.journal)} alt={ABOUT_LEARNING.alts.journal[locale]} width={410} height={191} decoding="async" />
                    <img className="av-s-mag" src={publicUrl(ABOUT_ASSETS.magnifier)} alt={ABOUT_LEARNING.alts.magnifier[locale]} width={137} height={174} decoding="async" />
                  </div>
                );
              if (s.id === 'act')
                return (
                  <div key={`${s.id}-${on ? playKey : 'idle'}`} className="av-scene av-scene--act" tabIndex={0} {...common}>
                    <div className="av-scene__ground" />
                    <img className="av-s-bottle" src={publicUrl(ABOUT_ASSETS.bottle)} alt={ABOUT_LEARNING.alts.bottle[locale]} width={130} height={174} decoding="async" />
                    <img className="av-s-tote" src={publicUrl(ABOUT_ASSETS.tote)} alt={ABOUT_LEARNING.alts.tote[locale]} width={113} height={178} decoding="async" />
                  </div>
                );
              return (
                <div key={s.id} className="av-scene av-scene--experience" {...common}>
                  <div className="av-scene__ground" />
                  <div className={`av-fan${fanned ? ' is-fanned' : ''}`} role="group" aria-label={ABOUT_DECK.groupLabel[locale]}>
                    {FAN_ANGLES.map((angle, c) => (
                      <button
                        key={angle}
                        ref={(el) => {
                          cardRefs.current[c] = el;
                        }}
                        type="button"
                        className="av-card"
                        style={{ '--av-a': `${angle}deg`, '--av-i': c } as CSSProperties}
                        aria-pressed={picked === c}
                        aria-label={`${ABOUT_DECK.cardLabel[locale]} ${c + 1}`}
                        tabIndex={cardFocus === c ? 0 : -1}
                        onClick={() => {
                          setCardFocus(c);
                          setPicked((p) => (p === c ? null : c));
                        }}
                        onKeyDown={(e) => onCardKey(e, c)}
                      >
                        <span className="av-card__3d">
                          <img className="av-card__back" src={publicUrl(ABOUT_ASSETS.cardBack)} alt="" decoding="async" draggable={false} />
                          <img className="av-card__face" src={publicUrl(ABOUT_ASSETS.cardFace)} alt="" decoding="async" draggable={false} />
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="av-hand av-fan__hint" hidden={picked !== null}>
                    {ABOUT_DECK.hint[locale]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
