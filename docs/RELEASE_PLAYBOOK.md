# Release Playbook — Brainroot website (BR-T041)

Cloudflare Pages là host chính; GitHub Pages là host dự phòng. **Không push/PR/merge/deploy cho tới khi Product Owner ra lệnh trực tiếp.**

## 1. Cấu hình theo host
| | Cloudflare Pages (chính) | GitHub Pages (dự phòng) |
|---|---|---|
| Build | `npm ci && npm run build`, output `dist` | workflow `.github/workflows/deploy.yml` (typecheck + build) |
| Base URL | `/` — tự đặt khi `CF_PAGES=1` (Cloudflare đặt sẵn), hoặc `VITE_BASE_PATH=/` | `/brainroot-2.0/` (mặc định) |
| SPA / deep-link | Cloudflare tự fallback về `index.html` **khi không có `404.html`**; build bỏ `dist/404.html` khi base là `/` | `public/404.html` đưa trình duyệt về entry rồi `main.tsx` khôi phục route/query/hash |
| Chế độ V2 | biến môi trường Pages: `VITE_OQV2_MODE` | đặt trong workflow (`env:`) nếu muốn bật; mặc định OFF |

Đã kiểm thử bằng máy chủ mô phỏng hai host trên 4 bản build (gh/cf × cờ tắt/bật): deep-link `/games/fact-act`, `/learn`, `/about`, `/games/o-an-quan-xanh`, `/games/o-an-quan-xanh/play?x=1#h` và 404 đều đúng. **Chưa** kiểm tra trên host thật.

## 2. Ba chế độ phát hành (BR-T042)
Chọn bằng biến build `VITE_OQV2_MODE`. **Mặc định OFF.** (`VITE_ENABLE_OQV2=true` cũ chỉ còn nghĩa là DEMO, không bao giờ là FULL.)

| Chế độ | Cấu hình build | Nội dung V2 | Kiểm tra bắt buộc |
|---|---|---|---|
| **OFF** (mặc định) | không đặt gì (hoặc `VITE_OQV2_MODE=off`) | không có: mã, asset, thẻ đều bị loại; `/games/o-an-quan-xanh/play` → 404 của app | `node scripts/check-oqv2-isolation.mjs dist` |
| **DEMO** | `VITE_OQV2_MODE=demo` | trò chơi đầy đủ, thẻ DEMO tự viết (nhãn "THẺ DEMO") | `node scripts/check-oqv2-isolation.mjs dist --leak-only` |
| **FULL** | `VITE_OQV2_MODE=full` + `OQV2_PUBLICATION_APPROVAL=<mã văn bản cho phép>` + `OQV2_DECK_FILE=<đường dẫn bộ thẻ>` | trò chơi đầy đủ với 100 thẻ gốc + đáp án + tiêu chí | `node scripts/check-oqv2-isolation.mjs dist --full` (OQV2_DECK_FILE trỏ cùng tệp) |

Quy tắc của FULL (thực thi trong `scripts/oqv2-release.ts`, có unit test):
- Thiếu `OQV2_PUBLICATION_APPROVAL` → **build thất bại** với thông báo rõ ràng. Thiếu/hỏng tệp bộ thẻ hoặc không đủ 100 thẻ phân bố 7/7/6 → **build thất bại**. Không bao giờ âm thầm chuyển sang DEMO.
- `npm run dev` (chế độ `dev`) vẫn dùng `internal-data/cards.internal.json` nếu có, để phát triển/kiểm thử cục bộ.
- Siêu dữ liệu nguồn (tên PDF, số trang) bị bỏ khỏi bundle FULL.
- Đặt `OQV2_PUBLICATION_APPROVAL` là tuyên bố rằng quyền công bố đã được cấp **bằng văn bản**; không đặt nó "cho chạy thử" trên pipeline thật.

**Cảnh báo bảo mật:** mọi dữ liệu đưa vào bundle (kể cả FULL) được gửi tới trình duyệt và người dùng có thể xem/tải (DevTools, tải tệp JS). Cờ tính năng, minify, đặt tên chunk **không** phải biện pháp bảo mật. Nếu cần giữ đáp án bí mật phải kiểm tra phía máy chủ, hiện chưa có.

Ba kiểm tra tách biệt: *loại trừ khi OFF*, *chống rò rỉ khi DEMO*, *đủ 100 thẻ và không lộ siêu dữ liệu khi FULL*. Với cả ba, đã thử 6 biến thể (chế độ × host) trong thư mục tạm; bản FULL thử dùng mã tham chiếu thử, không commit, không triển khai.

## 2b. Ngôn ngữ
Giao diện V2 có VI/EN theo ngôn ngữ chung của website (`useI18n`); đổi ngôn ngữ giữa ván không mất tiến độ. Nội dung thẻ giữ tiếng Việt gốc (không dịch; `OQ-21`). Tên người chơi mặc định được đặt theo ngôn ngữ lúc bắt đầu ván.

## 3. Cờ tắt không có nghĩa là repo được bảo mật
Repository vẫn chứa: mã V2, art ArtPack V3 (`src/features/oanquan-v2/assets/`), tài liệu `docs/oanquan-v2/`, thẻ DEMO. Nếu repo công khai, những thứ này hiển thị. Đã quét toàn bộ lịch sử git và cây làm việc: **không** có 100 thẻ thật/đáp án/PDF/`internal-data` (`internal-data/` gitignore; không PDF nào được theo dõi). Chỉ một tiêu đề thẻ mẫu ("Ma Trận Rửa Bát") đã có sẵn trong tài liệu G0.5 từ BR-T033.

## 4. Điều kiện còn thiếu trước khi công bố
1. Lệnh trực tiếp của Product Owner cho push/PR/merge/deploy.
2. `OQ-19` — quyền công bố 100 thẻ gốc bằng văn bản (mở khóa chế độ FULL); hiện chỉ nội bộ.
3. `OQ-20` / `BR-T002` — quyền công bố art V3, Brainie/Rootie, âm thanh.
4. `BR-T005` — thẻ công khai Fact–Act đã duyệt; thông tin liên hệ chính thức cho `/connect`, `/about`.
5. Kiểm tra trên thiết bị thật (iOS Safari, Android Chrome, âm thanh, cảm ứng) và smoke test URL thật sau deploy.
6. Nghe thử âm thanh bởi người; dịch thẻ sang tiếng Anh nếu cần (`OQ-21`).

## 5. Các bước dự kiến (chỉ chạy khi có lệnh)
1. Product Owner nghiệm thu BR-T041 → commit BR-T041 cục bộ.
2. `git push -u origin codex/br-t041-release-readiness` (chuỗi commit tuyến tính trên `759c65e`).
3. Mở PR vào `main`; CI GitHub chạy typecheck + build (bản A). Review diff.
4. Merge PR. GitHub Pages deploy tự động (bản A, V2 tắt).
5. Cloudflare Pages: build `npm run build`, output `dist`; biến môi trường theo chế độ OFF, hoặc `VITE_OQV2_MODE=demo` cho DEMO.
6. Smoke test: trang chủ, `/games`, `/games/fact-act/play`, `/learn`, `/quest`, `/connect`, `/about`; refresh các deep-link; bản B: chơi một ván và bấm "Về trang chủ".
7. Rollback: đặt `VITE_OQV2_MODE=off` (hoặc bỏ biến) và build lại, hoặc redeploy bản trước.

## 6. Build FULL và triển khai Cloudflare Pages (RC1)

**Hiện trạng cấu hình:** Cloudflare Pages (host chính, `brainroot-55i.pages.dev`) build bằng cloud từ Git (`npm run build`, thư mục `dist`). Cloud build **không có** `internal-data/` (gitignore) nên **không thể** tạo FULL bằng build trên Git, và cũng không nên (không đưa PDF/dữ liệu lên Git). Chưa kiểm tra tài khoản Cloudflare thật; mục dưới là kế hoạch.

### 6.1 Bản OFF / DEMO (qua Git, không cần dữ liệu nội bộ)
- Cloudflare → Settings → Variables and Secrets → Production: không đặt gì (OFF), hoặc `VITE_OQV2_MODE=demo`. Build command `npm run build`, output `dist`. Biến `CF_PAGES=1` do Cloudflare tự đặt (base `/`, bỏ `404.html` → SPA fallback). Nên đặt `NODE_VERSION=24` cho khớp CI.
- **Không** đặt `VITE_OQV2_MODE=full` hay `OQV2_PUBLICATION_APPROVAL` trong Cloudflare: build sẽ thất bại vì không có bộ thẻ (đúng thiết kế).

### 6.2 Bản FULL (build cục bộ, tải lên trực tiếp)
Chỉ thực hiện khi Product Owner đã cho phép công bố 100 thẻ **bằng văn bản** (`OQ-19`).

```powershell
# 1. Trên máy có internal-data/cards.internal.json (không commit, không đẩy lên Git)
$env:OQV2_PUBLICATION_APPROVAL = "<mã/tham chiếu văn bản cho phép>"
npm ci
npm run build:full            # Cloudflare: base "/", không có 404.html  →  dist-full/
# (GitHub Pages dự phòng: npm run build:full -- --host=github)
# Script đã chạy: tsc, vite build ở chế độ FULL, check-oqv2-isolation --full (đủ 100 thẻ, không lộ tên PDF)

# 2. Tải lên Cloudflare Pages bằng Direct Upload (cần đăng nhập wrangler; không làm ở lượt này)
npx wrangler pages deploy dist-full --project-name <ten-project-direct-upload> --branch main
```
- Một project Pages đang nối Git **không thể** chuyển sang Direct Upload. Dùng **project Direct Upload riêng** (URL riêng) cho FULL, hoặc chuyển project hiện có sang Direct Upload (mất build tự động từ Git). Quyết định thuộc Product Owner khi tới lúc triển khai.
- Sau khi tải lên: smoke test `/`, `/games/o-an-quan-xanh/play` (chip "Bộ 100 thẻ"), refresh deep-link, chơi một ván, "Về trang chủ".
- Rollback: Cloudflare → Deployments → Rollback về bản trước, hoặc tải lên lại bản OFF/DEMO.
- Sau khi dùng: xóa `dist-full/` khỏi máy dùng chung; không commit nó (đã gitignore).
