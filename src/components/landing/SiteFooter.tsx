import { publicUrl } from '../../utils/publicUrl';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { getFooterCopy } from '../../i18n/siteCopy';
import { BotanicalDivider } from '../garden/GardenPrimitives';

export function SiteFooter() {
  const { locale } = useI18n();
  const copy = getFooterCopy(locale);

  return (
    <footer className="site-footer site-footer--organic">
      <BotanicalDivider
        topFill="transparent"
        accentFill="#DFDFCF"
        bottomFill="#EAE3D3"
        withLeaves
      />

      <div className="site-footer__surface">
        <div className="site-footer__grid">
          <div className="site-footer__col site-footer__col--brand">
            <Link className="site-footer__logo" to="/">
              <img
                src={publicUrl('/assets/aistudio/brainie_1a0fca92.webp')}
                alt={copy.logoAlt}
                className="brand__mascot-img"
              />
              <span>
                brainroot<span className="brand__period">.</span>
              </span>
            </Link>
            <p className="site-footer__brand">{copy.brandText}</p>
            <p className="site-footer__mission">{copy.missionShort}</p>
          </div>

          <nav
            className="site-footer__col site-footer__nav-group"
            aria-label={copy.ecosystemNavAria}
          >
            <h2 className="site-footer__heading">{copy.ecosystemHeading}</h2>
            <ul className="site-footer__list">
              <li>
                <Link className="site-footer__link" to="/">
                  {copy.homeLink}
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/games">
                  Green Play
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/quest">
                  Green Quest
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/learn">
                  Green Learn
                </Link>
              </li>
            </ul>
          </nav>

          <nav
            className="site-footer__col site-footer__nav-group"
            aria-label={copy.productsNavAria}
          >
            <h2 className="site-footer__heading">{copy.productsHeading}</h2>
            <ul className="site-footer__list">
              <li>
                <Link className="site-footer__link" to="/games/fact-act">
                  Brainroot - Truth or Dare
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/games/o-an-quan-xanh">
                  Brainroot - Ô ăn quan xanh
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/connect">
                  Green Connect
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/about">
                  {copy.aboutLink}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">{copy.copyrightText}</p>
          <p className="site-footer__slogan-bottom">{copy.bottomSlogan}</p>
        </div>
      </div>
    </footer>
  );
}
