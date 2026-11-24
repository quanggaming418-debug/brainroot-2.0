# Release Playbook — Brainroot website (BR-T041)

Cloudflare Pages là host chính; GitHub Pages là host dự phòng. **Không push/PR/merge/deploy cho tới khi Product Owner ra lệnh trực tiếp.**

## 1. Cấu hình theo host
| | Cloudflare Pages (chính) | GitHub Pages (dự phòng) |
|---|---|---|
| Build | `npm ci && npm run build`, output `dist` | workflow `.github/workflows/deploy.yml` (typecheck + build) |
| Base URL | `/` — tự đặt khi `CF_PAGES=1` (Cloudflare đặt sẵn), hoặc `VITE_BASE_PATH=/` | `/brainroot-2.0/` (mặc định) |
| SPA / deep-link | Cloudflare tự fallback về `index.html` **khi không có `404.html`**; build bỏ `dist/404.html` khi base là `/` | `public/404.html` đưa trình duyệt về entry rồi `main.tsx` khôi phục route/query/hash |
| Cờ V2 | biến môi trường Pages: `VITE_ENABLE_OQV2` | đặt trong workflow (`env:`) nếu muốn bật; mặc định tắt |

Đã kiểm thử bằng máy chủ mô phỏng hai host trên 4 bản build (gh/cf × cờ tắt/bật): deep-link `/games/fact-act`, `/learn`, `/about`, `/games/o-an-quan-xanh`, `/games/o-an-quan-xanh/play?x=1#h` và 404 đều đúng. **Chưa** kiểm tra trên host thật.

## 2. Ba bản phát hành
| Bản | Cấu hình build | Nội dung V2 | Kiểm tra bắt buộc |
|---|---|---|---|
| **A — mặc định** | không đặt `VITE_ENABLE_OQV2` | không có (mã, asset, thẻ đều bị loại; `/games/o-an-quan-xanh/play` → 404 của app) | `node scripts/check-oqv2-isolation.mjs dist` phải OK |
| **B — V2 + thẻ DEMO** | `VITE_ENABLE_OQV2=true` | trò chơi đầy đủ, thẻ DEMO tự viết (có nhãn "THẺ DEMO") | `node scripts/check-oqv2-isolation.mjs dist --leak-only` phải OK |
| **C — V2 + 100 thẻ thật** | **CHƯA ĐƯỢC TẠO** | — | Chỉ làm khi có văn bản cho phép công bố (`OQ-19`). Hiện mã không cho phép: thẻ nội bộ chỉ nạp khi `import.meta.env.DEV` (`content/activeDeck.ts`). Bật C cần thay đổi mã có chủ đích + review, không chỉ đổi biến môi trường |

Hai kiểm tra tách biệt: *loại trừ khi cờ tắt* (không có bất kỳ dấu vết V2) và *chống rò rỉ khi cờ bật* (V2 có mặt nhưng không có `internal-data`, thẻ thật hay đáp án).

## 3. Cờ tắt không có nghĩa là repo được bảo mật
Repository vẫn chứa: mã V2, art ArtPack V3 (`src/features/oanquan-v2/assets/`), tài liệu `docs/oanquan-v2/`, thẻ DEMO. Nếu repo công khai, những thứ này hiển thị. Đã quét toàn bộ lịch sử git và cây làm việc: **không** có 100 thẻ thật/đáp án/PDF/`internal-data` (`internal-data/` gitignore; không PDF nào được theo dõi). Chỉ một tiêu đề thẻ mẫu ("Ma Trận Rửa Bát") đã có sẵn trong tài liệu G0.5 từ BR-T033.

## 4. Điều kiện còn thiếu trước khi công bố
1. Lệnh trực tiếp của Product Owner cho push/PR/merge/deploy.
2. `OQ-19` — quyền công bố 100 thẻ gốc (hiện chỉ nội bộ).
3. `OQ-20` / `BR-T002` — quyền công bố art V3, Brainie/Rootie, âm thanh.
4. `BR-T005` — thẻ công khai Fact–Act đã duyệt; thông tin liên hệ chính thức cho `/connect`, `/about`.
5. Kiểm tra trên thiết bị thật (iOS Safari, Android Chrome, âm thanh, cảm ứng) và smoke test URL thật sau deploy.
6. Giao diện V2 chưa có bản tiếng Anh.

## 5. Các bước dự kiến (chỉ chạy khi có lệnh)
1. Product Owner nghiệm thu BR-T041 → commit BR-T041 cục bộ.
2. `git push -u origin codex/br-t041-release-readiness` (chuỗi 9 commit tuyến tính trên `759c65e`).
3. Mở PR vào `main`; CI GitHub chạy typecheck + build (bản A). Review diff.
4. Merge PR. GitHub Pages deploy tự động (bản A, V2 tắt).
5. Cloudflare Pages: build `npm run build`, output `dist`; biến môi trường theo bản A, hoặc `VITE_ENABLE_OQV2=true` cho bản B.
6. Smoke test: trang chủ, `/games`, `/games/fact-act/play`, `/learn`, `/quest`, `/connect`, `/about`; refresh các deep-link; bản B: chơi một ván và bấm "Về trang chủ".
7. Rollback: tắt biến `VITE_ENABLE_OQV2` và build lại (bản A), hoặc redeploy bản trước.
