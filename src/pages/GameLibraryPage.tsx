import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GameProductShowcase } from '../components/games/GameProductShowcase';
import { GreenPlayPavilionBanner } from '../components/games/GreenPlayPavilionBanner';
import {
  GREEN_PLAY_LIBRARY_INTRO,
  GREEN_PLAY_PRODUCTS,
  PHYGITAL_TRANSPARENCY,
} from '../data/games';

export function GameLibraryPage() {
  return (
    <div className="gp-page">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Green Play' },
          ]}
        />
      </div>

      <GreenPlayPavilionBanner />

      <section
        className="gp-section gp-library"
        aria-labelledby="green-play-library-heading"
      >
        <div className="gp-container">
          <div className="gp-section-header">
            <p className="gp-eyebrow">{GREEN_PLAY_LIBRARY_INTRO.eyebrow}</p>
            <h2
              className="gp-section-heading"
              id="green-play-library-heading"
            >
              {GREEN_PLAY_LIBRARY_INTRO.heading}
            </h2>
            <p className="gp-section-summary">
              {GREEN_PLAY_LIBRARY_INTRO.summary}
            </p>
          </div>

          <div className="game-showcase-list">
            {GREEN_PLAY_PRODUCTS.map((product) => (
              <GameProductShowcase key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="gp-section gp-phygital"
        aria-labelledby="phygital-heading"
      >
        <div className="gp-container">
          <div className="gp-phygital__panel">
            <div className="gp-phygital__intro">
              <p className="gp-eyebrow">{PHYGITAL_TRANSPARENCY.eyebrow}</p>
              <h2 className="gp-section-heading" id="phygital-heading">
                {PHYGITAL_TRANSPARENCY.heading}
              </h2>
              <p className="gp-section-summary">
                {PHYGITAL_TRANSPARENCY.summary}
              </p>
            </div>

            <div className="gp-phygital__grid">
              {PHYGITAL_TRANSPARENCY.pillars.map((pillar, index) => (
                <article className="gp-pillar" key={pillar.title}>
                  <span className="gp-pillar__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="gp-pillar__title">{pillar.title}</h3>
                  <p className="gp-pillar__description">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gp-return-band" aria-label="Điều hướng quay lại">
        <div className="gp-container gp-return-band__inner">
          <p className="gp-return-band__text">
            Muốn xem toàn cảnh bốn khu vực của hệ sinh thái Brainroot?
          </p>
          <div className="gp-return-band__actions">
            <Link className="gp-button gp-button--secondary" to="/">
              ← Quay về trang chủ
            </Link>
            <Link className="gp-text-link" to="/#about">
              Tìm hiểu thêm về dự án Brainroot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
