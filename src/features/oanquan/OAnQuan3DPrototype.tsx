import { publicUrl } from '../../utils/publicUrl';
import '../oanquan/oanquan-standalone.css';
import { OAnQuanTabletopExperience } from './OAnQuanTabletopExperience';

/**
 * Standalone full-page 3D tabletop route (`/?preview=oanquan3d`),
 * upgraded from the primitive WebGL2 slab to the unified Three.js wooden tabletop.
 */
export default function OAnQuan3DPrototype() {
  return (
    <div className="oq-standalone-shell">
      <header className="oq-standalone-header">
        <div>
          <p className="oq-standalone-eyebrow">
            BRAINROOT 2.0 · SANDBOX 3D TOÀN MÀN HÌNH
          </p>
          <h1 className="oq-standalone-title">
            Ô ăn quan xanh — Mặt bàn gỗ 3D thử nghiệm
          </h1>
        </div>
        <div className="oq-standalone-actions">
          <a className="gp-button gp-button--secondary" href={publicUrl('/games/o-an-quan-xanh')}>
            ← Về trang Ô ăn quan xanh
          </a>
          <a className="gp-text-link" href={publicUrl('/games')}>
            Thư viện Green Play
          </a>
        </div>
      </header>

      <main className="oq-standalone-main" id="main-content" tabIndex={-1}>
        <OAnQuanTabletopExperience mode="standalone" />
      </main>
    </div>
  );
}
