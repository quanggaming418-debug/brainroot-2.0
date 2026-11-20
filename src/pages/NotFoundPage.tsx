import { publicUrl } from '../utils/publicUrl';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <div className="not-found__card">
        <div className="not-found__leaves" aria-hidden="true">
          <img
            src={publicUrl('/assets/hero-v4/floating-leaf-sage.svg')}
            alt=""
            width={40}
            height={40}
          />
          <img
            src={publicUrl('/assets/hero-v4/floating-leaf-peach.svg')}
            alt=""
            width={34}
            height={34}
          />
        </div>
        <p className="gp-eyebrow">LỖI 404 · KHÔNG TÌM THẤY TRANG</p>
        <h1 className="not-found__heading" id="not-found-heading">
          Lối đi này chưa có trong khu vườn Brainroot
        </h1>
        <p className="not-found__body">
          Đường dẫn bạn truy cập có thể đã thay đổi hoặc chưa được mở. Bạn có
          thể quay lại trang chủ hoặc khám phá thư viện trò chơi giáo dục Green
          Play.
        </p>
        <div className="not-found__actions">
          <Link className="gp-button gp-button--primary" to="/">
            Về trang chủ Brainroot
          </Link>
          <Link className="gp-button gp-button--secondary" to="/games">
            Khám phá Green Play
          </Link>
        </div>
      </div>
    </section>
  );
}
