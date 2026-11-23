/**
 * Điểm vào CHỈ DÙNG KHI DEV cho bản chơi thử Ô ăn quan xanh V2.
 * Được nạp bởi dev/oanquan-v2.html; index.html (bản production) không import file này,
 * nên mã, thẻ DEMO và CSS của V2 không có trong `dist/` (ADR-0006, điều kiện 3).
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../styles/tokens.css';
import './oanquan-v2.css';
import { OAnQuanV2App } from './OAnQuanV2App';

const root = document.getElementById('oqv2-root');
if (!import.meta.env.DEV) {
  if (root) root.textContent = 'Bản xem trước này chỉ chạy ở môi trường phát triển.';
} else if (root) {
  createRoot(root).render(
    <StrictMode>
      <OAnQuanV2App />
    </StrictMode>,
  );
}
