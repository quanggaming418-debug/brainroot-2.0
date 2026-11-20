import { publicUrl } from '../utils/publicUrl';
import React from 'react';
import { Link } from 'react-router-dom';

const SCREENSHOTS = [
  { name: '01. Trang chủ Brainroot', filename: '01-home-16-9.png', route: '/' },
  { name: '02. Thư viện Green Play', filename: '02-green-play-catalog-16-9.png', route: '/games' },
  { name: '03. Giới thiệu Brainroot - Truth or Dare', filename: '03-fact-act-detail-16-9.png', route: '/games/fact-act' },
  { name: '04. Trải nghiệm thử Brainroot - Truth or Dare', filename: '04-fact-act-trial-16-9.png', route: '/games/fact-act/play' },
  { name: '05. Brainroot - Ô ăn quan xanh 3D & 5 chủ đề × 3 cấp độ', filename: '05-o-an-quan-detail-16-9.png', route: '/games/o-an-quan-xanh' },
  { name: '06. Bàn gỗ 3D toàn màn hình Brainroot - Ô ăn quan xanh', filename: '06-o-an-quan-3d-sandbox-16-9.png', route: '/?preview=oanquan3d' },
  { name: '07. Thử thách Green Quest', filename: '07-green-quest-16-9.png', route: '/quest' },
  { name: '08. Học tập Green Learn', filename: '08-green-learn-16-9.png', route: '/learn' },
  { name: '09. Kết nối Green Connect', filename: '09-green-connect-16-9.png', route: '/connect' },
  { name: '10. Về dự án Brainroot', filename: '10-about-brainroot-16-9.png', route: '/about' }
];

export const ScreenshotsGalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F3E9] text-[#263B31] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#A6C6B6]/40 pb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#A6C6B6]/30 text-[#263B31] text-xs font-semibold uppercase tracking-wider mb-2">
              Brainroot • Thư viện ảnh giao diện 16:9
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#263B31]">
              Bộ Sưu Tập Ảnh Chụp Giao Diện (1920×1080)
            </h1>
            <p className="mt-2 text-sm text-[#263B31]/80 max-w-2xl">
              Toàn bộ các tuyến đường và giao diện chính của Brainroot đã được chụp ở tỷ lệ chuẩn 16:9. Bạn có thể xem trước hoặc tải xuống từng ảnh trực tiếp.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63894C] text-white font-medium shadow-sm hover:bg-[#52733f] transition-all"
          >
            ← Về Trang Chủ
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SCREENSHOTS.map((item, index) => {
            const imgUrl = publicUrl(`/screenshots-16-9/${item.filename}`);
            return (
              <div
                key={item.filename}
                className="bg-white rounded-2xl shadow-md border border-[#A6C6B6]/40 overflow-hidden flex flex-col transition-all hover:shadow-lg"
              >
                <div className="aspect-video bg-[#263B31]/5 relative overflow-hidden group">
                  <img
                    src={imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <a
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white text-[#263B31] font-semibold text-sm shadow hover:bg-[#F8F3E9] transition-all"
                    >
                      Xem Ảnh Gốc
                    </a>
                    <a
                      href={imgUrl}
                      download={item.filename}
                      className="px-4 py-2 rounded-xl bg-[#E79A7C] text-white font-semibold text-sm shadow hover:bg-[#d58869] transition-all"
                    >
                      Tải Xuống (.png)
                    </a>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#63894C] uppercase tracking-wider">
                        0{index + 1} / 10
                      </span>
                      <Link
                        to={item.route}
                        className="text-xs text-[#E79A7C] hover:underline font-medium"
                      >
                        Truy cập route →
                      </Link>
                    </div>
                    <h3 className="text-lg font-bold text-[#263B31]">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{imgUrl}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Tỷ lệ 16:9 • 1920×1080</span>
                    <a
                      href={imgUrl}
                      download={item.filename}
                      className="text-xs font-semibold text-[#63894C] hover:text-[#52733f] flex items-center gap-1"
                    >
                      ↓ Tải xuống nhanh
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-[#A6C6B6]/20 border border-[#A6C6B6]/40 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-[#263B31] mb-2">Đường dẫn thư mục lưu trữ trên máy chủ</h2>
          <p className="text-sm text-[#263B31]/80 mb-4">
            Tất cả 10 ảnh chụp màn hình 16:9 đã được lưu sẵn trong thư mục dự án tại <code className="bg-white px-2 py-1 rounded text-xs font-mono">/public/screenshots-16-9/</code>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SCREENSHOTS.map(s => (
              <a
                key={s.filename}
                href={publicUrl(`/screenshots-16-9/${s.filename}`)}
                download={s.filename}
                className="px-3 py-1.5 bg-white border border-[#A6C6B6] rounded-lg text-xs font-medium text-[#263B31] hover:bg-[#F8F3E9]"
              >
                {s.filename}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScreenshotsGalleryPage;
