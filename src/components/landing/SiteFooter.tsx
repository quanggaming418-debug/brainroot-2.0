import { Link } from 'react-router-dom';
import { FOOTER_CONTENT } from '../../data/landing';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">{FOOTER_CONTENT.text}</p>
        <nav className="site-footer__nav" aria-label="Điều hướng chân trang">
          <Link className="site-footer__link" to="/">
            Trang chủ
          </Link>
          <Link className="site-footer__link" to="/games">
            Green Play
          </Link>
          <Link className="site-footer__link" to="/games/fact-act">
            Fact–Act
          </Link>
          <Link className="site-footer__link" to="/games/o-an-quan-xanh">
            Ô ăn quan xanh
          </Link>
          <Link className="site-footer__link" to="/#about">
            Về Brainroot
          </Link>
        </nav>
      </div>
    </footer>
  );
}
