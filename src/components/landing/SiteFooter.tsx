import { publicUrl } from '../../utils/publicUrl';
import { Link } from 'react-router-dom';
import { FOOTER_CONTENT } from '../../data/landing';
import { BotanicalDivider } from '../garden/GardenPrimitives';

export function SiteFooter() {
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
                alt="Brainroot Logo"
                className="brand__mascot-img"
              />
              <span>
                brainroot<span className="brand__period">.</span>
              </span>
            </Link>
            <p className="site-footer__brand">{FOOTER_CONTENT.brandText}</p>
            <p className="site-footer__mission">{FOOTER_CONTENT.missionShort}</p>
          </div>

          <nav
            className="site-footer__col site-footer__nav-group"
            aria-label="Điều hướng hệ sinh thái Brainroot"
          >
            <h2 className="site-footer__heading">Hệ sinh thái</h2>
            <ul className="site-footer__list">
              <li>
                <Link className="site-footer__link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/games">
                  Green Play — Thư viện trò chơi
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/games/fact-act/play">
                  Chơi thử Fact–Act (mẫu nội bộ)
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/games/o-an-quan-xanh">
                  Ô ăn quan xanh & bàn gỗ 3D
                </Link>
              </li>
            </ul>
          </nav>

          <nav
            className="site-footer__col site-footer__nav-group"
            aria-label="Khám phá thêm"
          >
            <h2 className="site-footer__heading">Học & Kết nối</h2>
            <ul className="site-footer__list">
              <li>
                <Link className="site-footer__link" to="/quest">
                  Green Quest — Thử thách khởi đầu
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/learn">
                  Green Learn — 5 chủ đề kỹ năng xanh
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/connect">
                  Green Connect — Tham gia cộng đồng
                </Link>
              </li>
              <li>
                <Link className="site-footer__link" to="/about">
                  Về Brainroot & minh bạch dự án
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__pilot">{FOOTER_CONTENT.pilotNote}</p>
          <p className="site-footer__transparency">
            {FOOTER_CONTENT.transparencyNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
