# Release Playbook — Brainroot website (BR-T041)

Cloudflare Pages là host chính; GitHub Pages là host dự phòng. **Không push/PR/merge/deploy cho tới khi Product Owner ra lệnh trực tiếp.**

## 1. Cấu hình theo host
| | Cloudflare Pages (chính) | GitHub Pages (dự phòng) |
|---|---|---|
| Build | `npm ci && npm run build`, output `dist` | workflow `.github/workflows/deploy.yml` (typecheck + build) |
| Base URL | `/` — tự đặt khi `CF_PAGES=1` (Cloudflare đặt sẵn), hoặc `VITE_BASE_PATH=/` | `/brainroot-2.0/` (mặc định) |
| SPA / deep-link | Cloudflare tự fallback về `index.html` **khi không có `404.html`**; lệnh build của dashboard Cloudflare xóa `dist/404.html` (`rm -f dist/404.html` trong build command; repo không tự xóa); `npm run build:full` (host cloudflare) tự xóa | `public/404.html` đưa trình duyệt về entry rồi `main.tsx` khôi phục route/query/hash |
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
3. `BR-T002` — quyền thương mại art V3/Brainie/Rootie (công bố trong phạm vi RC1/Hackathon đã được Product Owner xác nhận ở `OQ-20`, 24/11/2026; không phải quyền thương mại, không phải giấy phép cho bên thứ ba). Art V3 là nội dung do AI (ChatGPT) tạo: khai báo AI nếu BTC yêu cầu.
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

### 6.0 Hiện trạng Cloudflare (Product Owner xác minh qua Cloudflare API, 24/11/2026)
- Pages project **`brainroot`** (Git, `brainroot-55i.pages.dev`), production branch **`main`**, output `dist`, root `/`; production automatic deployment **bật**; preview deployment **mọi nhánh** (preview `https://<nhánh>.brainroot-55i.pages.dev`).
- Môi trường build: **Node 22.23.4, npm 10.9.9, Bun 1.4.4**. Build command hiện tại: `npm ci && sed -i "s#base: '/brainroot-2.0/'#base: '/'#" vite.config.ts && npm run build && rm -f dist/404.html`.
- **Bước cài đặt dependency do Cloudflare tự chọn trình quản lý gói theo lockfile**: có `bun.lock` thì chạy `bun install --frozen-lockfile` TRƯỚC build command. Đó là nguyên nhân Pages đỏ ở PR #16 (`bun.lock` cũ lệch `package.json`: thiếu `@axe-core/playwright`). Đã xử lý bằng cách **xóa `bun.lock`** (repo không dùng Bun: không script, workflow hay tài liệu nào nhắc tới) và ghi `bun.lock`/`bun.lockb` vào `.gitignore`; **npm + `package-lock.json` là nguồn dependency duy nhất**. Không thêm `bun.lock` trở lại.
- Hệ quả cho cấu hình repo: `sed` trong build command tìm đúng chuỗi `base: '/brainroot-2.0/'` — chuỗi này không còn trong `vite.config.ts` (base nay lấy từ `CF_PAGES`/`VITE_BASE_PATH`), nên `sed` là no-op vô hại; base `/` vẫn đúng nhờ `CF_PAGES=1`. `rm -f dist/404.html` an toàn dù tệp đã tồn tại hay chưa. Có thể rút gọn build command thành `npm ci && npm run build && rm -f dist/404.html` khi Product Owner muốn (không bắt buộc, chưa thay đổi).
- Workers Builds `brainroot-2-0` (dịch vụ Workers riêng nối cùng repo) đỏ trên mọi nhánh không phải `main` trong lịch sử; được xử lý riêng ở cấp cấu hình Cloudflare, không liên quan mã nguồn.
- Repo GitHub **công khai**: mọi thứ push lên là công khai.

### 6.1 Bản OFF / DEMO (qua Git, không cần dữ liệu nội bộ)
- Cloudflare build bằng cloud từ Git (`npm run build`, output `dist`), `CF_PAGES=1` do Cloudflare tự đặt (base `/`). Không đặt biến V2 → **OFF**; hoặc `VITE_OQV2_MODE=demo` → DEMO.
- **Không** đặt `VITE_OQV2_MODE=full` hay `OQV2_PUBLICATION_APPROVAL` trong Cloudflare: cloud build không có bộ thẻ nên sẽ thất bại (đúng thiết kế), và không bao giờ đưa dữ liệu lên Git.
- Khi mở PR/đẩy nhánh, Pages tự tạo preview của nhánh ở chế độ OFF (không có V2, không có thẻ) nếu chưa đặt biến V2; kể cả có đặt `VITE_ENABLE_OQV2=true` thì chỉ ra DEMO.

### 6.2 Bản FULL: giữ project `brainroot` và URL hiện tại, deploy thủ công bằng Wrangler
Theo tài liệu Cloudflare (Pages → Configuration → Git integration → *Disable automatic deployments*): project đang nối Git **không thể** chuyển sang Direct Upload, nhưng có thể **tắt automatic deployments trên mọi nhánh**, rồi dùng Wrangler deploy trực tiếp lên chính project đó. Không tạo project mới, không xóa project cũ.

Hệ quả cần Product Owner chấp nhận trước khi tắt: sau khi tắt, **mọi** deploy (cả OFF/DEMO) phải làm thủ công; PR không còn tự có preview; check "Cloudflare Pages" trên GitHub sẽ không chạy.

Quy trình (chỉ khi có văn bản cho phép công bố 100 thẻ, `OQ-19`; **chưa thực hiện, chưa đổi cấu hình Cloudflare**):
1. (Product Owner, dashboard) Workers & Pages → `brainroot` → Settings → Build → Branch control → *Automatic deployments: Disabled* (production và preview).
2. Trên máy có `internal-data/cards.internal.json` (không commit):

```powershell
$env:OQV2_PUBLICATION_APPROVAL = "<mã/tham chiếu văn bản cho phép>"
npm ci
npm run build:full          # Cloudflare: base "/", đã xóa 404.html  →  dist-full/  (đã tự chạy --full isolation)
npx wrangler login          # lần đầu; tương tác, do Product Owner thực hiện
# Thử trước trên URL preview (KHÔNG phải production):
npx wrangler pages deploy dist-full --project-name brainroot --branch rc1-full
# Sau khi nghiệm thu, đẩy lên production (dùng đúng tên production branch đã kiểm tra trong dashboard):
npx wrangler pages deploy dist-full --project-name brainroot --branch <production-branch>
```
3. Preview `https://rc1-full.brainroot-55i.pages.dev` là **URL công khai** (nếu chưa bật Cloudflare Access): chỉ deploy FULL lên đó khi đã có quyền công bố, hoặc bật Access cho preview trước (chưa kiểm tra tính năng này trên tài khoản).
4. Smoke test: `/`, `/games/o-an-quan-xanh/play` (chip "Bộ 100 thẻ"), refresh deep-link, một ván trọn vẹn, "Về trang chủ".
5. Rollback: dashboard → Deployments → Rollback về bản trước, hoặc `wrangler pages deploy` lại bản OFF/DEMO.
6. Sau khi dùng: xóa `dist-full/` khỏi máy dùng chung (đã gitignore, không commit).

Phương án thay thế nếu không muốn tắt deploy tự động: giữ Git deploy cho OFF/DEMO và chỉ dùng chế độ FULL ở nơi khác (ví dụ GitHub Pages dự phòng bằng `npm run build:full -- --host=github`) — nhưng GitHub Pages triển khai từ CI nên cũng không có bộ thẻ; vì vậy FULL luôn là thao tác thủ công từ máy có dữ liệu.

## 7. Trước khi push (rà soát PR đơn nhất)
Xem `planning/PROJECT_STATE.md` và nội dung PR dự thảo do BR-T042 chuẩn bị. Quyền công bố art V3 trên repo công khai và website cho Hackathon đã được Product Owner xác nhận (24/11/2026, `OQ-20`), nguồn gốc ghi ở `docs/oanquan-v2/ASSET_AUDIT_DRAFT.md` §5; không bao gồm quyền thương mại hay cấp phép lại. Còn lại: khai báo AI nếu BTC yêu cầu (`docs/HACKATHON_COMPLIANCE.md`).
