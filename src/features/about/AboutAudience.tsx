import { ABOUT_ASSETS, ABOUT_AUDIENCE, type AudienceGroup } from '../../data/about';
import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';

/** Blank notes pinned on the community board (positions as % of the scene box). */
const NOTES = [
  { left: 13, bottom: 56, tone: 'ivory', rot: -6 },
  { left: 21, bottom: 59, tone: 'sage', rot: 4 },
  { left: 34, bottom: 57, tone: 'peach', rot: -3 },
  { left: 16, bottom: 43, tone: 'peach', rot: 5 },
  { left: 38, bottom: 44, tone: 'ivory', rot: -7 },
] as const;

function Scene({ group, locale }: { readonly group: AudienceGroup; readonly locale: Locale }) {
  const label = group.sceneAlt[locale];
  if (group.id === 'solo')
    return (
      <div className="av-ctx av-ctx--solo" role="img" aria-label={label}>
        <img className="av-edge av-ctx__books" src={publicUrl(ABOUT_ASSETS.booksGlobe)} alt="" width={276} height={172} decoding="async" />
        <img className="av-ctx__held" src={publicUrl(ABOUT_ASSETS.cardFace)} alt="" width={248} height={448} decoding="async" />
      </div>
    );
  if (group.id === 'group')
    return (
      <div className="av-ctx av-ctx--group" role="img" aria-label={label}>
        <img className="av-edge av-ctx__table" src={publicUrl(ABOUT_ASSETS.learningTable)} alt="" width={295} height={155} decoding="async" />
        {[1, 2, 3, 4].map((n) => (
          <img key={n} className={`av-ctx__seat av-ctx__seat--${n}`} src={publicUrl(ABOUT_ASSETS.cardBack)} alt="" width={248} height={448} decoding="async" />
        ))}
      </div>
    );
  return (
    <div className="av-ctx av-ctx--comm" role="img" aria-label={label}>
      <img className="av-ctx__tent" src={publicUrl(ABOUT_ASSETS.communityGathering)} alt="" width={239} height={170} decoding="async" />
      <img className="av-edge av-ctx__board" src={publicUrl(ABOUT_ASSETS.communityBoard)} alt="" width={213} height={166} decoding="async" />
      {NOTES.map((n) => (
        <span
          key={`${n.left}-${n.bottom}`}
          className={`av-ctx__note av-ctx__note--${n.tone}`}
          style={{ left: `${n.left}%`, bottom: `${n.bottom}%`, transform: `rotate(${n.rot}deg)` }}
        />
      ))}
    </div>
  );
}

/** One person → a study group → a community: the scenes grow with the circle. */
export function AboutAudience({ locale }: { readonly locale: Locale }) {
  return (
    <section className="av-who av-band" aria-labelledby="about-audience-heading">
      <div className="av-inner">
        <h2 className="av-h2" id="about-audience-heading">
          {ABOUT_AUDIENCE.heading[locale]}
        </h2>
        <ul className="av-who__grid" data-testid="about-audience">
          {ABOUT_AUDIENCE.groups.map((group) => (
            <li className={`av-who__item av-who__item--${group.id}`} key={group.id}>
              <div className="av-who__scene">
                <Scene group={group} locale={locale} />
              </div>
              <p className="av-eyebrow av-who__kind">{group.kind[locale]}</p>
              <h3 className="av-who__title">{group.title[locale]}</h3>
              <p className="av-who__text">{group.sentence[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
