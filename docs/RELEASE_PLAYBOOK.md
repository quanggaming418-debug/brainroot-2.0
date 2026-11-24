# Release Playbook — Brainroot website (BR-T041)

Cloudflare Pages là host chính; GitHub Pages là host dự phòng. **Không push/PR/merge/deploy cho tới khi Product Owner ra lệnh trực tiếp.**

## 1. Cấu hình theo host
| | Cloudflare Pages (chính) | GitHub Pages (dự phòng) |
|---|---|---|
| Build | Production FULL: `npm run build:full`, upload `dist-full/` qua Wrangler. Preview Git: `npm ci && npm run build`, output `dist` | workflow `.github/workflows/deploy.yml` (typecheck + build) |
| Base URL | `/` — tự đặt khi `CF_PAGES=1` (Cloudflare đặt sẵn), hoặc `VITE_BASE_PATH=/` | `/brainroot-2.0/` (mặc định) |
| SPA / deep-link | Cloudflare tự fallback về `index.html` **khi không có `404.html`**; lệnh build của dashboard Cloudflare xóa `dist/404.html` (`rm -f dist/404.html` trong build command; repo không tự xóa); `npm run build:full` (host cloudflare) tự xóa | `public/404.html` đưa trình duyệt về entry rồi `main.tsx` khôi phục route/query/hash |
| Chế độ V2 | biến môi trường Pages: `VITE_OQV2_MODE` | đặt trong workflow (`env:`) nếu muốn bật; mặc định OFF |

Đã kiểm thử bằng máy chủ mô phỏng hai host trên 4 bản build (gh/cf × cờ tắt/bật): deep-link `/games/fact-act`, `/learn`, `/about`, `/games/o-an-quan-xanh`, `/games/o-an-quan-xanh/play?x=1#h` và 404 đều đúng. Xem trạng thái production và bằng chứng release mới nhất trong `planning/PROJECT_STATE.md`.

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

## 4. Phạm vi duyệt RC1

- Product Owner đã duyệt công bố 100 thẻ gốc, đáp án và tiêu chí đánh giá cho Hackathon, tham chiếu `BR-RC1-PUBLICATION-20261124` (OQ-19). Quyết định bao gồm deploy Cloudflare production thủ công và tắt automatic production deployments.
- Quyền ArtPack V3 cho RC1/Hackathon đã được duyệt theo OQ-20. Quyền thương mại theo BR-T002, nội dung Fact–Act theo BR-T005 và dịch bộ thẻ theo OQ-21 theo dõi ở các mục riêng.
- Dùng QA thiết bị thật cho iOS Safari, Android Chrome, cảm ứng và âm thanh khi có thiết bị.

## 5. Preview Git và GitHub Pages

Cloudflare Preview vẫn build từ các nhánh ngoài `main`, mặc định OFF. GitHub Pages là host dự phòng, mặc định OFF. Deploy FULL từ artifact cục bộ để Git không cần chứa bộ dữ liệu nguồn.

## 6. Build FULL và triển khai Cloudflare Pages (RC1)

### 6.0 Cấu hình đã xác minh ngày 24/11/2026

- Pages project `brainroot` giữ Git integration và URL [brainroot-55i.pages.dev](https://brainroot-55i.pages.dev/). Production branch `main`, automatic production deployments **tắt**, automatic preview deployments **mọi nhánh ngoài production**. Pages vẫn báo check cho các preview PR.
- Build command của preview giữ nguyên, output `dist`. `CF_PAGES=1` đặt base `/`; build command xử lý `dist/404.html`. npm và `package-lock.json` là nguồn dependency, không thêm lại `bun.lock`.
- Bản production FULL hiện hành là deployment `73b053ec-6147-45e0-97f0-f1ae25a85a3b` từ commit `5d8e24c853a1fd324858fbb4b7172b757869ff5b`. Rollback OFF đã ghi nhận là `2c9ff6e9-911c-4df0-a933-3d99cc7a44e5` từ `d65b0f9`.
- Worker phụ `brainroot-2-0` chỉ phục vụ bản tĩnh trên hostname Worker riêng. Đã ngắt kết nối Git ở chính Worker để dừng build dư thừa, giữ Worker và deployment đã có.

### 6.1 Quy trình phát hành FULL

1. Xác minh scope công bố đã được Product Owner phê duyệt. Lưu ID deployment production hiện tại và cấu hình Branch control để rollback. Kiểm tra `main` là production branch và automatic production deployments đang tắt.
2. Trên máy có bộ thẻ, chạy các lệnh bên dưới. Wrangler cần quyền Pages write. Nếu phiên hết hạn, chạy `npx wrangler login` và để Product Owner hoàn thành xác thực trình duyệt. Giữ tệp bộ thẻ và output FULL ngoài Git. Cloudflare Git build dùng OFF/DEMO, vì không có dữ liệu nguồn.

```powershell
$env:OQV2_PUBLICATION_APPROVAL = "<tham chiếu phê duyệt>"
npm ci
npm run build:full
node scripts/check-oqv2-isolation.mjs dist-full --full
npx wrangler pages deploy dist-full --project-name brainroot --branch main
```

3. Xác nhận deployment thành công và là production hiện hành của project. Kiểm tra URL chính, CTA ở trang chủ, thư viện và trang chi tiết, nhãn bộ 100 thẻ, đổi VI/EN, tải lại deep-link, hoàn thành một ván và quay về trang chủ. Dùng `/?preview=oanquan3d` để mở prototype rollback.
4. Nếu cần rollback, chọn deployment trước đó trong Pages → Deployments → Rollback. Giữ automatic production deployments tắt khi rollback thủ công để Git không tự ghi đè production.
5. Preview Git tiếp tục theo Branch control của project. Chỉ upload FULL lên các URL thuộc phạm vi được duyệt.

## 7. Trước khi push (rà soát PR đơn nhất)
Xem `planning/PROJECT_STATE.md` và nội dung PR dự thảo do BR-T042 chuẩn bị. Quyền công bố art V3 trên repo công khai và website cho Hackathon đã được Product Owner xác nhận (24/11/2026, `OQ-20`), nguồn gốc ghi ở `docs/oanquan-v2/ASSET_AUDIT_DRAFT.md` §5; không bao gồm quyền thương mại hay cấp phép lại. Còn lại: khai báo AI nếu BTC yêu cầu (`docs/HACKATHON_COMPLIANCE.md`).
