import { mobileMedia } from '../../utils/layoutViewport';
import { useI18n } from '../../i18n/I18nContext';
import { getGreenPlayLibraryCopy } from '../../i18n/siteCopy';
import { publicUrl } from '../../utils/publicUrl';
import '../../styles/green-play-pavilion.css';

/** VIS-006: Scene backdrop only. Product images and mascots belong in separate layers. */
export function GreenPlayPavilionBanner() {
  const { locale } = useI18n();
  const copy = getGreenPlayLibraryCopy(locale);

  return (
    <header className="green-play-pavilion" aria-labelledby="green-play-pavilion-title">
      <picture className="green-play-pavilion__visual" aria-hidden="true">
        <source media={mobileMedia('(max-width: 767px)')} srcSet={publicUrl('/assets/green-play/vis-006-pavilion-mobile.webp')} />
        <img
          src={publicUrl('/assets/green-play/vis-006-pavilion-desktop.webp')}
          width={1600}
          height={560}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt=""
        />
      </picture>
      <div className="green-play-pavilion__copy">
        <p className="green-play-pavilion__eyebrow">{copy.pavilionEyebrow}</p>
        <h1 id="green-play-pavilion-title">Green Play</h1>
        <p className="green-play-pavilion__subtitle">{copy.pavilionSubtitle}</p>
      </div>
    </header>
  );
}
