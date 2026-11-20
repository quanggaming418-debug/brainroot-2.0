import { useI18n } from '../../i18n/I18nContext';
import { getOAnQuanTabletopCopy } from '../../i18n/siteCopy';
import { publicUrl } from '../../utils/publicUrl';
import '../oanquan/oanquan-standalone.css';
import { OAnQuanTabletopExperience } from './OAnQuanTabletopExperience';

/**
 * Standalone full-page 3D tabletop route (`/?preview=oanquan3d`),
 * upgraded from the primitive WebGL2 slab to the unified Three.js wooden tabletop.
 */
export default function OAnQuan3DPrototype() {
  const { locale, setLocale } = useI18n();
  const copy = getOAnQuanTabletopCopy(locale);

  return (
    <div className="oq-standalone-shell">
      <header className="oq-standalone-header">
        <div>
          <p className="oq-standalone-eyebrow">{copy.standaloneEyebrow}</p>
          <h1 className="oq-standalone-title">{copy.standaloneTitle}</h1>
        </div>
        <div className="oq-standalone-actions">
          <div className="lang-switch" role="group" aria-label="VI / EN">
            <button
              type="button"
              className={`lang-switch__btn${locale === 'vi' ? ' is-active' : ''}`}
              aria-pressed={locale === 'vi'}
              onClick={() => setLocale('vi')}
            >
              VI
            </button>
            <button
              type="button"
              className={`lang-switch__btn${locale === 'en' ? ' is-active' : ''}`}
              aria-pressed={locale === 'en'}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
          </div>
          <a className="gp-button gp-button--secondary" href={publicUrl('/games/o-an-quan-xanh')}>
            {copy.standaloneBack}
          </a>
          <a className="gp-text-link" href={publicUrl('/games')}>
            {copy.standaloneLibrary}
          </a>
        </div>
      </header>

      <main className="oq-standalone-main" id="main-content" tabIndex={-1}>
        <OAnQuanTabletopExperience mode="standalone" />
      </main>
    </div>
  );
}
