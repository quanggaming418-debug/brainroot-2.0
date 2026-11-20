import '../../styles/green-play-pavilion.css';

/** VIS-006: Scene backdrop only. Product images and mascots belong in separate layers. */
export function GreenPlayPavilionBanner() {
  return (
    <header className="green-play-pavilion" aria-labelledby="green-play-pavilion-title">
      <picture className="green-play-pavilion__visual" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/assets/green-play/vis-006-pavilion-mobile.webp" />
        <img
          src="/assets/green-play/vis-006-pavilion-desktop.webp"
          width={1600}
          height={560}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt=""
        />
      </picture>
      <div className="green-play-pavilion__copy">
        <p className="green-play-pavilion__eyebrow">KHÁM PHÁ THƯ VIỆN</p>
        <h1 id="green-play-pavilion-title">Green Play</h1>
        <p className="green-play-pavilion__subtitle">Học điều xanh, chơi điều hay</p>
      </div>
    </header>
  );
}
