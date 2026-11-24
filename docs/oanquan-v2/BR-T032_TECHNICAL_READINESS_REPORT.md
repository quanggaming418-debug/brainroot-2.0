# Ô ĂN QUAN XANH V2 — Technical Readiness Report (trước G1)

**Ngày:** 23/11/2026 · **Người lập:** Claude Code · **Task ID:** `BR-T032`
**Phiên bản:** 1.1 (bản 1.0 được Product Owner duyệt **APPROVED WITH CORRECTIONS** ngày 23/11/2026; các chỉnh sửa áp dụng trong `BR-T033`, xem "Thay đổi so với 1.0" cuối tài liệu).
**Phạm vi:** chỉ audit và lập kế hoạch. Không viết engine, không sửa mã nguồn, không commit/push/merge/deploy, không xóa prototype cũ, không chọn luật thay nhóm. **NOT COMMITTED.**

---

## 0. Kết luận nhanh

| Câu hỏi | Kết luận |
|---|---|
| Sẵn sàng bắt đầu **G1 (engine)**? | **CHƯA.** Chặn bởi 20 mục nhóm A của Rules Matrix V1.3 và 2 câu hỏi mới phát hiện khi đối chiếu tài liệu gốc: **C-02** (kho 5 lọ theo chủ đề) và **C-03** (hạt có được rải qua Ô Quan). **C-01** (Quan có phải linh vật) là vấn đề thiết kế/nội dung, **không chặn thuật toán G1** (§2.2). |
| Kiến trúc repo có đỡ được V2 không? | **Có.** React 19 + TS + Vite 7 + CSS thường; có sẵn i18n, focus trap, `ProductStatusLabel`, test runner `node:test`. Không cần thư viện mới cho G1. |
| Rủi ro tích hợp lớn nhất | (1) Asset/thẻ đặt trong `src/` **vẫn bị công khai** khi build + deploy; cần cờ build chỉ bật ở dev. (2) Trang `/games/o-an-quan-xanh` import tĩnh Three.js → bundle chính 1,03 MB; V2 phải lazy và không import `three`. (3) Mockup thu nhỏ bàn bằng `scale` làm chữ < 13px; code phải tính hình học, không `transform: scale` cả bàn. |
| R23 (`initialPlayer`) | **Để làm tham số cấu hình của engine được, không cần nhóm quyết trước G1** (§2.4). |
| Tablet / điện thoại ngang | Chưa có thiết kế. Đề xuất 3 chế độ bố cục theo kích thước vùng chơi (§4.5), cần Product Owner duyệt. |

---

## Xác nhận tiếp nhận tài nguyên

### A. Đã tìm thấy và đọc được

Hai ZIP được giải nén vào thư mục tạm riêng của phiên (ngoài repo), **không chép vào repo**.

| Gói | Kiểm tra | Kết quả |
|---|---|---|
| `Brainroot_OAnQuan_Code_Starter_Pack.zip` (40,5 MB) | `sha256sum -c MANIFEST_SHA256.txt` | **129/129 OK** |
| `Brainroot_OAnQuan_Original_Source_Pack.zip` (70,7 MB) | `sha256sum -c MANIFEST_SHA256.txt` | **10/10 OK** |
| `00_START_HERE_FOR_CLAUDE_CODE.md` | so với file trong Downloads | Giống hệt |

**Tài liệu handoff (đã đọc toàn bộ):** `BRAINROOT_OANQUAN_G05_HANDOFF.md`, `BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md` (bản 2.0), `BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md`, `BRAINROOT_OANQUAN_G05_VISUAL_QA_REPORT.md`, `oanquan-tokens.css`.

**Mockup:** 48 ảnh render trong `handoff/review_images/` (1280×800, 390×844, 360×740, bảng trạng thái mobile 390×960). Đã xem trực tiếp: `01_Main` (S3 desktop), `05_S3_mobile`, `24_Ring_diagram`, `43_S7b_desktop`, `21_S8_mobile`. Đã đối chiếu số hạt trên S3 desktop/mobile với dữ liệu mẫu `[0,3,5,0,4,2,0,6,1,5,2,7]`: khớp ringIndex ở cả hai bố cục. Các ảnh còn lại mới kiểm tra kích thước, chưa xem từng ảnh.

**Mã sinh mockup:** `mockup_reference_source/*.py` (11 file). Chỉ dùng tra số đo, không port.

**Artwork:**
- Asset Kit V2: 25 file production (6 nền WebP, 12 SVG thành phần, 6 SVG lớp cảnh, 1 PNG texture) + 18 ảnh review + `ASSET_MANIFEST.json`, `README_CLAUDE.md`, `ASSET_SELECTION_REVIEW.md`.
- Token Replacement V2 (**PLACEHOLDER**): 10 PNG production (`dan_seed`, `quan_climate`, `quan_biodiversity`, mỗi loại bản gốc/512/256 + `selected_token_sheet.png`) + 6 ảnh review.

### B. Luật Word gốc và 5 PDF thẻ

| File | Truy cập | Ghi chú |
|---|---|---|
| `Brainroot - Ô ăn quan xanh .docx` | **Đọc được toàn văn** (trích `word/document.xml`) | 4 mục luật + mục ý tưởng thiết kế; 2 ảnh nhúng chưa xem |
| `Ô ăn quan xanh - {Không gian xanh_, Năng lượng, Nước, Rác thải, Tiêu dùng}.pdf` | **Mở được, trích được cấu trúc**; **không trích được nguyên văn tiếng Việt** | Mỗi PDF 41 trang = 20 mặt trước + 20 mặt "Dành cho Trọng tài". Lớp chữ dùng bảng mã font riêng nên mất dấu (ví dụ "NHN BIT"). Chưa render ảnh trang vì máy thiếu `pdftoppm`/PyMuPDF. |
| `Brainroot - Design thinking_.docx`, `Demo website dự án.docx` | Đọc được | Bối cảnh khảo sát, link web cũ; không chứa luật |

**Số liệu trích từ PDF (đếm tự động, đủ tin cậy về cấu trúc):**

| Chủ đề | Cấp 1 · 15s | Cấp 2 · 20s | Cấp 3 · 30s | Cấp 3 · 45s | Tổng |
|---|---:|---:|---:|---:|---:|
| Không gian xanh | 7 | 7 | 4 | 2 | 20 |
| Năng lượng | 7 | 7 | 6 | 0 | 20 |
| Nước | 7 | 7 | 5 | 1 | 20 |
| Rác thải | 7 | 7 | 5 | 1 | 20 |
| Tiêu dùng | 7 | 7 | 6 | 0 | 20 |
| **Tổng** | **35** | **35** | **26** | **4** | **100** |

Khớp Matrix: 100 thẻ, thời gian 15/20/30 giây, 4 thẻ 45 giây. Nhãn cấp trên PDF: "Nhận biết", "Ra quyết định", "Giải quyết vấn đề" (khớp `O_AN_QUAN_DETAIL.levels` trong repo). Mục tiêu tối thiểu C1 (3 thẻ × 5 chủ đề × 3 cấp = 45 thẻ) **khả thi về số lượng**.

### C. Repository

- Repo local: `<thư mục repo trên máy Product Owner>`, remote `origin` = `github.com/quanggaming418-debug/brainroot-2.0` ✔.
- **Trạng thái GitHub (cập nhật 1.1, sau `git fetch origin` ngày 23/11/2026):**
  - `origin/main` = **`759c65e`** ("Merge pull request #14 … br-t030-quest-about-news"). Lịch sử: `c29ae77` (BR-T029) → `773fed7` (BR-T030) → `ca4d0d5` (BR-T031) → `2d8522e` (merge **PR #15** BR-T031 vào nhánh BR-T030, kiểu stacked PR) → `759c65e` (merge **PR #14** BR-T030 vào `main`). Product Owner đã xác nhận PR #14 và #15 merge trên GitHub.
  - Nhánh local `codex/br-t030-quest-about-news` (`773fed7`) thiếu 3 commit so với `origin/main`: 1 commit nội dung (`ca4d0d5`) + 2 commit merge. Nhánh local `main` (`c29ae77`) chậm 4 commit và **chưa được cập nhật** (không dùng làm gốc).
  - Lúc audit bản 1.0, nhánh làm việc là `codex/br-t030-quest-about-news` và GitHub chưa được kiểm tra; các mô tả "BR-T030 chưa merge" trong bản 1.0 đã lỗi thời.
- **Nhánh BR-T033:** `codex/br-t033-oanquan-docs`, tạo bằng `git switch --no-track -c codex/br-t033-oanquan-docs origin/main` (gốc `759c65e`). Worktree `C:/Users/Windows/brainroot-worktrees/br-t031-about-v43` và hai thư mục chưa track `brainroot-assets/`, `brainroot-assets-v1/` giữ nguyên.
- Đã đọc theo `AGENTS.md`: `README.md`, `planning/{PROJECT_STATE,ROADMAP,TASKS,OPEN_QUESTIONS}.md`, `logs/HANDOFF.md`, `docs/{GAME_SPEC,DECISIONS,TECHNICAL_ARCHITECTURE,QUALITY_AND_TESTING,ASSET_AUDIT}.md`, `.agents/rules/*`. Đọc lướt `planning/VISUAL_ASSET_REGISTER.md`.
- Chưa kiểm tra trên GitHub: Actions của `759c65e`, branch protection, PR đang mở khác.

### D. Còn thiếu hoặc chưa truy cập được

| Thiếu | Ảnh hưởng | Cần ai |
|---|---|---|
| Canvas mockup G0.5 (artifact riêng tư `8N16ESsT2M7frej2hTnREg`) | Chỉ có ảnh render; không đo trực tiếp | Không cần cho G1; có thể mở để đối chiếu ở G2 |
| Nguyên văn tiếng Việt 100 thẻ | Không nạp được nội dung thẻ ở G2 nếu không có nguồn chữ sạch | Nhóm cung cấp file gốc (Canva/Word) **hoặc** OCR + người soát |
| Ánh xạ ID canvas (`a6a49db9…`, `37a2fb6a…`, `3753b2a1…`, `0010cd6b…`) → file trong repo | Không xác minh được mockup dùng đúng file Brainie/Rootie/lá nào | ID không phải SHA-256/MD5 của file nào trong repo; cần người dựng mockup xác nhận |
| Lá trang trí góc bàn dạng WebP | Không có trong `public/` | Chỉ có trong thư mục chưa track `brainroot-assets-v1/decor/leaf-0[1-6].webp`; cần duyệt |
| Quyết định nhóm A (20 mục) + C-02, C-03 (C-01 trước G2/G3) | Chặn G1 | Nhóm Brainroot |
| Quyền dùng hình minh họa thẻ, AI asset (`ASSET_AUDIT`) | Chặn công khai | Nhóm / Product Owner |
| Token Art V3 | Art cuối | Làm độc lập |
| Cấu hình Cloudflare Pages (base `/`) | Không thấy trong repo (`vite.config.ts` cố định `/brainroot-2.0/`) | Kiểm tra dashboard trước G2 |

---

## 1. Repository Audit

### 1.1 Stack và lệnh

| Hạng mục | Thực tế |
|---|---|
| Runtime | React 19.2, React Router 7 (`BrowserRouter basename=BASE_URL`), Three.js 0.187 |
| Build | Vite 7, `base: '/brainroot-2.0/'`, `tsc --noEmit && vite build` |
| CSS | CSS thường, `src/styles.css` import 7 file; token ở `src/styles/tokens.css` (`--color-*`, `--space-*`, `--radius-*`) |
| Font | Be Vietnam Pro 400–900 từ Google Fonts trong `index.html` |
| Test | `node:test` qua `npx tsx --test tests/*.test.ts` (8 file, 51 test). Không có jsdom/RTL. `playwright`, `puppeteer` có trong devDependencies nhưng chỉ `scripts/capture.ts` dùng; **không có bộ E2E/axe trong repo** |
| Lint | **Không có script `lint`** |
| CI | `.github/workflows/deploy.yml`: `npm ci` → `typecheck` → `build` → deploy Pages từ `main`. **CI không chạy unit test** |

### 1.2 Baseline đã chạy thật (nhánh `codex/br-t030-quest-about-news`, `773fed7`, chưa sửa file nào)

| Lệnh | Kết quả |
|---|---|
| `npm run typecheck` | **PASS** (exit 0) |
| `npx --yes tsx --test tests/*.test.ts` | **PASS 51/51** |
| `npm run build` | **PASS**, cảnh báo chunk: `index-*.js` **1.033,69 kB** (gzip 286,65 kB) |
| `npm run lint` | **NOT RUN** (không có script) |
| Playwright / axe | **NOT RUN** (không có bộ test) |

`git status --short` trước và sau audit: chỉ hai thư mục chưa track có sẵn; `dist/` bị `.gitignore`.

**Chạy lại trên nhánh BR-T033** (`codex/br-t033-oanquan-docs`, gốc `origin/main` `759c65e`, chỉ thay đổi tài liệu, 23/11/2026 12:12 +07:00):

| Lệnh | Kết quả |
|---|---|
| `npm run typecheck` | **PASS** (exit 0) |
| `npx --yes tsx --test tests/*.test.ts` | **PASS 62/62** (thêm test BR-T031; chạy từng file cũng ra 62) |
| `npm run build` | **PASS**, chunk `index-*.js` **1.042,08 kB** (gzip 290,19 kB), cảnh báo >500 kB như cũ |
| `grep` `dist/` tìm `oanquan-v2`, tên file token, tên thẻ mẫu | 0 kết quả |

### 1.3 Routing

`src/App.tsx`: 11 route trong `AppLayout` (`/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `/screenshots`, `*`) + nhánh đặc biệt `?preview=oanquan3d` render **ngoài** `BrowserRouter` (`StandalonePreviewShell`, lazy). Ghi chú: `PROJECT_STATE` nói 10 route, thực tế có thêm `/screenshots`.

### 1.4 Prototype Ô ăn quan hiện có (`src/features/oanquan/`)

| File | Dòng | Trạng thái thực tế |
|---|---:|---|
| `prototypeOnlyModel.ts` | 99 | `PITS` 12 ô. **Thứ tự mảng trùng ringIndex chuẩn**: 0 = `quan-left`, 1–5 hàng trên trái→phải, 6 = `quan-right`, 7–11 hàng dưới phải→trái. Hạt ban đầu 4/ô, Quan 1. Có interface `OAnQuanRuleset` |
| `OAnQuanTabletopExperience.tsx` | 307 | Three.js + lưới nút ô bàn phím, `aria-live`, theo dõi reduced motion |
| `threeBoardRenderer.ts` | 859 | Renderer Three.js đang dùng |
| `boardRenderer.ts` | 207 | **Không được import ở đâu** (mã chết) |
| `OAnQuan3DPrototype.tsx`, `oanquan-standalone.css` | 55, 45 | Shell `?preview=oanquan3d` |
| `src/styles/oanquan3d-prototype.css` | — | **Không được import ở đâu** (CSS chết) |

Trang `src/pages/OAnQuanXanhDetailPage.tsx` (321 dòng) **nhúng trực tiếp** `OAnQuanTabletopExperience` → `three` bị import tĩnh vào bundle chính (nguyên nhân chính của chunk 1,03 MB). Class `.oq-tabletop`, `.oq-pit-btn`, `.oq-hero`, `.oq-explorer`… định nghĩa trong `src/styles/unified-world.css` (CSS toàn cục).

Test tham chiếu prototype: `tests/br-t023.test.ts` (PITS, sandbox), `tests/br-t004.test.ts` (route, `sandboxNotice.href`), `tests/r0-integration.test.ts` (`SANDBOX_RULESET`), `tests/pages.test.ts` (`?preview=oanquan3d`). Giữ nguyên.

### 1.5 Quy ước quản lý dự án liên quan

- Task cao nhất trước audit: `BR-T030`, `BR-T031` (cả hai đã merge vào `main` qua PR #14/#15; hàng trong `TASKS.md` trên `main` vẫn ghi `IN_REVIEW`, `NOT COMMITTED`, cần cập nhật ở task riêng). Audit này là `BR-T032`, chuẩn bị tài liệu là `BR-T033`.
- `OQ-08` (luật Ô ăn quan) vẫn `OPEN`; `BR-T023` (prototype 3D) vẫn `IN_PROGRESS`; `BR-T002` (quyền artwork thương mại) `BLOCKED`.
- ADR cao nhất: `0005`. ADR tiếp theo: `0006`.
- `docs/GAME_SPEC.md`: "Không tự suy diễn từ luật Ô ăn quan truyền thống thành luật được nhóm duyệt" — trùng tinh thần Matrix.

---

## 2. Handoff Compatibility Check

### 2.1 Khớp

| Yêu cầu handoff | Bằng chứng trong repo |
|---|---|
| Stack React/TS/CSS, không WebGL cho V2 | Vite + CSS thường; V2 không cần `three` |
| Token Brainroot (ivory, ink, peach, sage, forest, focus `#174E42`, Be Vietnam Pro, thang 4–64) | Có đủ trong `tokens.css` (tên biến khác, xem X-05) |
| `ringIndex` 0–11 | `PITS` của prototype đã theo đúng thứ tự này; có thể dùng làm đối chứng khi viết test hình học |
| `EmptyUnavailableState`, `ProductStatusLabel`, `Breadcrumbs` | Có trong `src/components/common/` (xem lưu ý X-08) |
| Focus trap cho lớp phủ | `src/features/truthOrDare/useModalFocus.ts` (trap Tab + trả focus) |
| i18n vi/en | `I18nContext` + `siteCopy.ts` (hàm `getXxxCopy(locale)`) |
| `inert` cho bàn sau lớp phủ | React 19 hỗ trợ prop `inert` dạng boolean |
| `publicUrl()` cho base path | `src/utils/publicUrl.ts` (signature `publicUrl(path: \`/${string}\`)`) |

### 2.2 Mâu thuẫn và rủi ro tích hợp

Mức: **A** = chặn G1 · **B** = phải xử lý trước/during G2 · **C** = nhỏ/ghi chú.

| ID | Mức | Phát hiện | Nguồn đối chiếu | Đề xuất |
|---|---|---|---|---|
| **C-01** | **B** (thiết kế/nội dung, **không chặn thuật toán G1**) | Word mục 2 viết Quân Quan là **"Mô hình hai linh vật của dự án"**; Brief §3 và Handoff §4.3 quy định token Quan **không phải linh vật**. Matrix V1.3 **không có câu hỏi này**. | Word vs Brief §3, Handoff §4.3, A.1 | Engine chỉ cần biết ô Quan có quân Quan hay không và giá trị của nó (R2), không phụ thuộc hình dạng. Nhóm quyết khi chốt art (V3), `aria-label` và lời giới thiệu; phải có trước G2/G3. Ghi tại `OQ-14` và Phụ lục Matrix. |
| **C-02** | **A** (chặn G1) | Mockup S8 ("Kho Nước của Minh: 3 → 7") và thanh người chơi có **5 lọ theo chủ đề** → engine phải ghi hạt thu hoạch **theo chủ đề ô**. Tài liệu nhóm chỉ nói "kho bảo tồn". Chưa có câu hỏi: hạt ăn từ ô Quan vào lọ nào? Hạt rải lẫn qua nhiều ô có giữ "chủ đề" không? | Brief §5 S3/S8, Handoff §4.5, §4.12 vs Word mục 4 | Liên quan R17, R24, R26. Nhóm quyết: kho chỉ là **một tổng** hay **5 lọ theo chủ đề ô bị ăn**. Đổi kiểu dữ liệu engine nên phải trước G1. Ghi tại `OQ-15`. |
| **C-03** | **A** (chặn G1) | Ví dụ S5b (rải 9 → 10, 11, **0**, 1, 2) giả định **hạt được rải vào/qua Ô Quan**. Đây là luật rải, không phải hiển thị. Matrix chỉ chạm gián tiếp (R0, R15 "ô kế tiếp là Ô Quan"). Đáp án đổi trực tiếp hàm rải, việc đếm "hạt cuối", điều kiện "cách 1 ô trống" (R16) và số hạt trong ô Quan khi kết thúc (R10, R11). | Handoff §5.3, Word mục 4 | Nhóm phải xác nhận rõ: khi rải đi qua Ô Quan thì **thả hạt vào Ô Quan**, **bỏ qua Ô Quan**, hay theo nguồn chọn ở R0. Ghi tại `OQ-16`. |
| X-01 | B | **Thứ tự G2 mâu thuẫn**: Handoff §0 cho phép dựng UI G2 "dùng dữ liệu giả cho tới khi có engine"; Brief §11.1 ghi G2 "Sau G1 PASS". Handoff tự quy định Brief thắng. | Handoff §0 vs Brief §11.1 | Mặc định theo Brief (G2 sau G1). Product Owner quyết có mở track "UI shell + fixture" song song hay không (§5). |
| X-02 | B | Brief §11.2 đề xuất **dùng lại `OAnQuanXanhDetailPage` làm S1**, nhưng trang này nhúng bàn 3D và đang là route production cần giữ nguyên. | Brief §11.2 vs Handoff §1.7, START_HERE | S1 V2 là component mới trong `oanquan-v2/`; trang cũ không đổi đến khi nghiệm thu thay thế. |
| X-03 | B | Handoff §8 yêu cầu asset ở `src/features/oanquan-v2/assets/` "không đặt vào `public/`". Nhưng **file import từ `src/` vẫn được Vite chép vào `dist/assets/` và deploy công khai**. Tương tự dữ liệu thẻ trong `.ts`. | Handoff §8, README repo, `.agents/rules/brainroot-content.md` | Biện pháp thật: route V2 chỉ đăng ký khi `import.meta.env.DEV` hoặc `VITE_ENABLE_OQV2=true` (Vite loại bỏ khi build production), **và** không merge asset chưa duyệt vào `main` (`main` tự deploy). |
| X-04 | B | Asset Kit README bảo chép vào `public/assets/oanquan-v2/` và cho phép gộp `×N`; Handoff cấm cả hai. | Kit README §3.1, §3.6 vs Handoff §4.2, §8 | Theo Handoff. |
| X-05 | B | `oanquan-tokens.css` dùng `--br-*` (ví dụ `--br-focus`) **không tồn tại** trong repo (repo dùng `--color-focus-ring`, `--color-ink`…). Thang khoảng cách đặt tên khác (`--oq-space-5: 24px` vs `--space-6: 24px`). | tokens handoff vs `src/styles/tokens.css` | Không thêm `--br-*`; ánh xạ sang biến repo; chỉ thêm biến `--oq-*` (hiện chưa có biến `--oq-*` nào → không trùng). |
| X-06 | B | **Trùng tiền tố class `.oq-`**: prototype dùng `.oq-pit-btn`, `.oq-hero`, `.oq-tabletop` trong CSS toàn cục. Handoff đặt tên thành phần gần giống (`DanPit`, `QuanPit`). | `unified-world.css` | Bọc toàn bộ CSS V2 dưới gốc `.oqv2` và tiền tố class `oq2-`. |
| X-07 | B | Mockup thu nhỏ bàn bằng hệ số 0.94 / 0.87 / 0.80 → huy hiệu 13px × 0.80 ≈ 10,4px, **dưới mức ≥13px** của Brief §3. | Handoff §3, §6 vs Brief §3 | Dựng bằng hình học (tọa độ theo ringIndex và kích thước khung), chữ giữ ≥13px; ghi nhận khác biệt khi so ảnh (Handoff tiêu chí 12). |
| X-08 | B | `EmptyUnavailableState` dùng `<Link>` của React Router và id cố định `unavailable-panel-heading`; chỉ chạy được trong `BrowserRouter`, và dùng hai lần trên cùng trang sẽ trùng id. | `src/components/common/EmptyUnavailableState.tsx` | V2 chạy trong router (không dùng mẫu `?preview=` ngoài router), hoặc bọc component riêng. |
| X-09 | B | Handoff §8 ghi token V2 là "WebP 201×256 (+ bản 128)". Thực tế là **PNG**, không có bản 128; `quan_*_512.png` ~380 KB, bản gốc ~840 KB. | `artwork/PLACEHOLDER_tokenV2/production/` | Task asset ở G2: chuyển WebP, tạo 128px, kiểm hash. Không coi là art cuối. |
| X-10 | B | Thẻ có đáp án sẽ nằm trong bundle JS phía client (chơi offline, hot-seat). `.agents/rules/brainroot-content.md`: tránh nhúng đáp án ẩn vào bundle tĩnh (áp dụng cho nội dung trả phí). | Rule nội dung, Matrix C3/C7 | Chỉ nạp thẻ **đã duyệt cho công khai** (C1, C3). Thẻ còn lại không vào repo. |
| X-11 | B | Lớp chữ PDF hỏng dấu tiếng Việt → không trích "nguyên văn" bằng máy. | Trích xuất `pdftotext` | Lấy file gốc từ nhóm hoặc OCR + 2 người soát; mỗi thẻ có `reviewStatus`. |
| X-12 | C | Matrix R7 nói "Word ví dụ Cấp 2 ghi 15 giây, lệch với PDF (20 giây)". Trong Word, "15 giây" xuất hiện **bên trong nội dung câu hỏi ví dụ** của ô Rác thải ("Bạn có 15 giây để phân loại 4 món đồ…"). Đó là thời gian của **riêng thử thách ví dụ đó**, không nhất thiết là quy định chung cho mọi thẻ Cấp 2. PDF ghi 20 giây cho cả 35 thẻ Cấp 2. Chưa thể kết luận có "lệch" hay không. | Word mục 3, 5 PDF | Không tự chọn. Khi nhóm trả lời R7, hỏi thêm: thời gian trên từng thẻ PDF có phải nguồn chuẩn không, và "15 giây" trong ví dụ Word có phải quy định chung không. Ghi ở Phụ lục Matrix. |
| X-13 | C | Matrix gọi file luật là `Brainroot - Ô ăn quan .docx`; tên thật `Brainroot - Ô ăn quan xanh .docx`. QA report tham chiếu canvas `1795392022-b6a4`, Handoff `1795393191-5099`. | — | Sửa tên khi đưa tài liệu vào `docs/`. |
| X-14 | C | Bundle chính 1,03 MB do `three` import tĩnh qua trang chi tiết. Không thuộc V2 nhưng V2 sẽ sống cùng bundle. | Build log | Task riêng (cần duyệt vì đụng route production): lazy-load bàn 3D trên trang chi tiết. |
| X-15 | C | CI không chạy unit test; không có Playwright/axe trong repo, trong khi Handoff §10 yêu cầu. | `deploy.yml`, `package.json` | G1 dùng `node:test` sẵn có (không cần dependency). G2 cần duyệt thêm `@axe-core/playwright` và script e2e. |
| X-16 | C | `ROADMAP`: R1 28/11–10/12, chung kết 19–20/12 (24h, chỉ một hạng mục "mới"). | `planning/ROADMAP.md`, `BR-T015` | Xác nhận V2 **không** phải hạng mục 24h; nếu xây trước, ghi vào baseline. |

### 2.3 Các điểm luật đã đối chiếu thêm với tài liệu gốc (không chọn luật)

- Word mục 4: "Nếu trả lời sai, hạt tài nguyên giữ nguyên tại ô và nhường lượt chơi tiếp theo" → khớp luồng S8b ("Giữ nguyên, đổi lượt"); có liên quan R8.
- Word mục 4 nói "đối thủ rút thẻ", mục 3 nói "họ … phải bốc thẻ" → mâu thuẫn đã có trong R6.
- Word mục 1 liệt kê thứ tự chủ đề Ô 1–5: Không gian xanh, Năng lượng, Rác thải, Nước, Tiêu dùng → khớp thứ tự trong `oanquan-tokens.css`. Trang chi tiết hiện tại liệt kê theo thứ tự khác (Tiêu dùng → Không gian xanh); chỉ là nội dung giới thiệu, không phải R1.

### 2.4 R23 — `initialPlayer` có thể là tham số cấu hình?

**Kết luận: Có. Không cần nhóm quyết định R23 trước G1.** Product Owner xác nhận ngày 23/11/2026 (duyệt BR-T032): `initialPlayer` là **tham số bắt buộc, không có giá trị mặc định**.

Lý do:
1. Cả ba phương án R23 — (a) ngẫu nhiên, (b) chọn khi thiết lập, (c) khác — đều **quy về một giá trị cụ thể (`P1` hoặc `P2`) trước nước đi đầu tiên**. Engine chỉ cần nhận giá trị đó; cách chọn nằm ở màn S2.
2. Theo Brief §2, hàng ô gắn với **chỗ ngồi** (1–5 = Người chơi 2, 7–11 = Người chơi 1), không gắn với "người đi trước". Các luật nhóm A tham chiếu "người đang đi" (R25, R26 giá trị tạm; R6), không tham chiếu "người đi đầu ván". Vì vậy `initialPlayer` không đổi cách tính luật nào đã biết.
3. Ngẫu nhiên không đặt trong engine: engine nhận `initialPlayer` đã xác định; nếu S2 chọn "Ngẫu nhiên", lớp thiết lập dùng RNG tiêm vào (có seed) để test lặp lại được.

**Ràng buộc khi cài đặt:**
- Không có giá trị mặc định ngầm trong engine (`initialPlayer` là trường bắt buộc), để code không ngầm chọn luật.
- Test engine chạy với cả `P1` và `P2`.
- Màn S2 giữ 3 lựa chọn và nhãn "Luật bản thử" như mockup.

**Ngoại lệ phải quay lại hỏi nhóm:** nếu nhóm trả lời R23 bằng một luật **khác về cơ chế** (ví dụ "người đi sau được thêm lượt", "người đi trước không được ăn ở lượt đầu") hoặc nếu R12 chọn giới hạn lượt và nhóm muốn hai bên có số lượt bằng nhau. Khi đó R23 trở thành luật engine. Đề xuất ghi câu này vào Matrix khi gửi nhóm.

---

## 3. Reusable Components & Asset Mapping

### 3.1 Mã có thể tái sử dụng

| Thành phần | Đường dẫn | Cách dùng cho V2 |
|---|---|---|
| Focus trap lớp phủ | `src/features/truthOrDare/useModalFocus.ts` | Import trực tiếp cho S6, S7, hộp thoại |
| i18n | `src/i18n/I18nContext.tsx`, `siteCopy.ts` | Dùng `useI18n()`; copy V2 để trong `oanquan-v2/i18n/` (không làm `siteCopy.ts` phình thêm) |
| `ProductStatusLabel` | `src/components/common/ProductStatusLabel.tsx` | Nhãn "Luật bản thử" / "Bộ thẻ chơi thử" (Brief §10) |
| `Breadcrumbs` | `src/components/common/Breadcrumbs.tsx` | S1 trong site |
| `EmptyUnavailableState` | `src/components/common/EmptyUnavailableState.tsx` | Màn lỗi/không khả dụng; lưu ý X-08 |
| `publicUrl()` | `src/utils/publicUrl.ts` | Chỉ cho file trong `public/` (Brainie/Rootie) |
| Mẫu reduced-motion, `aria-live`, lưới nút ô bàn phím | `OAnQuanTabletopExperience.tsx` (dòng 58–66, 191–211) | Tham khảo mẫu, **không import** (file kéo theo `three`) |
| `PITS` thứ tự ringIndex | `prototypeOnlyModel.ts` | Chỉ để đối chứng; không dùng lại tọa độ 3D hay số hạt |
| Token màu/khoảng cách | `src/styles/tokens.css` | Dùng biến repo, thêm `--oq-*` |
| Dữ liệu 5 chủ đề, 3 cấp | `O_AN_QUAN_DETAIL` trong `src/data/games.ts` | Tham khảo nhãn; dữ liệu chủ đề V2 nên có module riêng (`content/themes.ts`) |

Không có hook `useReducedMotion` dùng chung (mỗi feature tự viết `matchMedia`). Đề xuất viết hook trong `oanquan-v2/ui/hooks/`, không sửa file cũ.

### 3.2 Asset mapping (đường dẫn đã xác minh)

| Vai trò (Handoff §8) | File thực tế đã xác minh | Định dạng / kích thước | Trạng thái quyền | Ghi chú |
|---|---|---|---|---|
| Brainie | `public/assets/hero-v4/brainie.webp` (SHA-256 `1a0fca92…`; bản trùng `public/assets/aistudio/brainie_1a0fca92.webp`) | WebP, 56 KB | Internal dev approved; thương mại `BLOCKED` (`BR-T002`, EX-005) | Không xác minh được đây là file mockup dùng (ID canvas không khớp hash) |
| Rootie | `public/assets/hero-v4/rootie.webp` (SHA-256 `dd0c2f7b…`) | WebP, 42 KB | Như trên (EX-006) | Như trên |
| Brainie/Rootie "original" khác | `brainroot-assets/…/09_original_reference/{brainie,rootie}-original.webp` | WebP | **Chưa track**, hash khác bản `hero-v4` | Không dùng khi chưa duyệt |
| Lá trang trí góc bàn | **Không có WebP trong `public/`**. Ứng viên: `public/assets/hero-v4/floating-leaf-{peach,sage}.svg` (EX-007/008, đã duyệt nội bộ) hoặc `brainroot-assets-v1/decor/leaf-0[1-6].webp` (chưa track) | SVG / WebP | SVG: vector nội bộ | **Cần Product Owner chỉ định file** |
| Hạt Dân | Token V2 `dan_seed_256.png` | **PNG** 201×256, 57 KB | **PLACEHOLDER**, AI, chưa khai `ASSET_AUDIT` | Cần chuyển WebP + bản 128 (X-09) |
| Quan Khí hậu / Đa dạng sinh học | Token V2 `quan_{climate,biodiversity}_{256,512}.png` | PNG 256×240 / 512×481, 100–380 KB | **PLACEHOLDER** | Như trên |
| Nền lobby/gameplay/challenge × desktop/mobile | Kit V2 `production/backgrounds/*.webp` | WebP 1600×900 / 1080×1920, 77–186 KB | AI, chưa khai `ASSET_AUDIT` | Hash có trong `ASSET_MANIFEST.json` |
| Khung bàn desktop | Kit V2 `components/board_frame.svg` | SVG viewBox 1200×420, 1,3 KB | SVG viết tay cho gói | Mobile dựng CSS |
| 5 lọ kho | Kit V2 `components/jar_*.svg` | SVG 0,8 KB mỗi file | như trên | Phụ thuộc C-02 |
| Trang trí thẻ | Kit V2 `card_ornaments.svg`, `textures/paper_texture.png` | SVG, PNG 512² | như trên | |
| Hình minh họa 100 thẻ | PDF nhóm | — | **Chưa công khai** | Dùng ô giữ chỗ |
| **Không dùng** | Kit V2 `seed.svg`, `quan_*.svg`, `quan_pair.svg`; Token V1 | — | Đã loại | |

Không asset nào ở trên đã được chép vào repo trong lượt này.

---

## 4. Proposed Architecture

### 4.1 Nguyên tắc

1. **Engine → Content → UI** tách module; engine là TypeScript thuần, không import React/DOM/asset/content.
2. Mọi luật nhóm A đi qua một đối tượng `RulesConfig` có **nguồn quyết định** cho từng trường (ID quyết định, ngày). Không có giá trị mặc định ngầm.
3. Engine xác định (deterministic): cùng state + action → cùng kết quả; ngẫu nhiên (xáo thẻ, chọn người đi trước) qua RNG tiêm vào có seed.
4. Trạng thái ván chỉ đổi qua action engine; trạng thái Trọng tài (a)–(c) là state UI cục bộ; chỉ (d) phát `commitRefereeResult`.
5. V2 lazy-load, không import `three`, CSS bọc dưới `.oqv2`.

### 4.2 Cây thư mục đề xuất

```text
src/features/oanquan-v2/
  index.ts                     # export lazy root
  engine/                      # G1 — thuần TS, không React
    ring.ts                    # hằng số ringIndex, next(i, dir), isQuan, rowOwner
    types.ts                   # GameState, PitState, Action, EngineEvent, PlayerId
    rulesConfig.ts             # kiểu RulesConfig + bản cấu hình đã duyệt (kèm decisionRef)
    engine.ts                  # reduce(state, action) → { state, events }
    sow.ts, capture.ts, scoring.ts, endgame.ts
    rng.ts                     # RNG có seed (dùng chung cho deck, first player)
  content/                     # track nội dung
    cardSchema.ts              # Card: id, theme, level, timeSec, title, context, challenge,
                               #       answer, keyPoints?, gradingMode, reviewStatus, source
    themes.ts                  # 5 chủ đề Dân + 2 chủ đề Quan, nhãn vi/en, icon, màu
    trialDeck.ts               # CHỈ thẻ đã duyệt công khai (rỗng tới khi có C1/C3)
    deck.ts                    # rút/xáo theo R19 (cấu hình)
  ui/
    OAnQuanV2Root.tsx          # điều phối màn, nối engine qua useReducer
    screens/                   # S1Start, S2Setup, GameScreen(S3–S5b), EndScreen(S9), Support
    board/                     # Board, DanPit, QuanPit, SeedTokens, PathPreview,
                               # geometry.ts (ringIndex → hình học), useBoardLayout.ts
    hud/                       # PlayerPlate, TurnDock, Stepper, DirectionButtons, Timer, LevelPill
    challenge/                 # ChallengeCard, AnswerCard
    referee/                   # refereeMachine.ts (FSM a–d, thuần) + RefereePanel.tsx
    result/                    # ResultPanel (desktop), ResultSummary (mobile/compact)
    hooks/                     # useReducedMotion, useInertBackground, useLiveAnnouncer
  i18n/                        # copy.vi.ts, copy.en.ts
  styles/
    oanquan-v2-tokens.css      # chỉ --oq-*; tham chiếu biến repo thay cho --br-*
    oanquan-v2.css             # mọi selector dưới .oqv2, class tiền tố oq2-
  assets/                      # chỉ sau khi khai ASSET_AUDIT; import qua Vite
tests/
  oanquan-v2-ring.test.ts      # hình học + bất biến xoay
  oanquan-v2-engine.test.ts    # G1
  oanquan-v2-referee.test.ts   # FSM a–d, commit đúng 1 lần
  oanquan-v2-seeds-display.test.ts  # min(n,5) + chip +k, không "×"
```

### 4.3 Hợp đồng engine (phác thảo để thống nhất, chưa viết code)

```ts
// Minh họa ranh giới; tên và trường chốt ở G1 sau khi nhóm A có đáp án.
type RingIndex = 0|1|2|3|4|5|6|7|8|9|10|11;
type PlayerId = 'P1' | 'P2';

interface GameConfig {
  readonly rules: RulesConfig;          // mỗi trường có decisionRef (R0…R26)
  readonly initialPlayer: PlayerId;     // R23: bắt buộc, không mặc định
  readonly refereeMode: 'opponent' | 'third-party';   // R20 (UI/flow)
  readonly timerMode: 'standard' | 'extended' | 'untimed';
}

type Action =
  | { type: 'selectPit'; ring: RingIndex }
  | { type: 'chooseDirection'; dir: 'cw' | 'ccw' }
  | { type: 'sow' }
  | { type: 'drawCard' }
  | { type: 'commitRefereeResult'; verdict: 'pass' | 'notYet' }   // chỉ từ trạng thái (d)
  | { type: 'endTurn' };
```

Engine trả về `events` (seedDropped, captureOpportunity, harvested, turnChanged, gameEnded) để UI dựng hoạt ảnh; UI không tự tính luật.

### 4.4 Route và cờ tính năng

| Phương án | Ưu | Nhược |
|---|---|---|
| **A (đề xuất).** Route lazy `/games/o-an-quan-xanh/v2` chỉ đăng ký khi `import.meta.env.DEV` hoặc `VITE_ENABLE_OQV2 === 'true'` | Production build không chứa mã/asset V2 → không công khai art/thẻ chưa duyệt; chạy trong `BrowserRouter` nên dùng được `Link`, `EmptyUnavailableState` | Muốn cho người ngoài xem thử phải bật biến môi trường ở môi trường preview riêng |
| B. `?preview=oanquan-v2` giống prototype 3D | Theo mẫu có sẵn | Nằm ngoài router (X-08); chunk vẫn có trong production build |

Không đổi `/games/o-an-quan-xanh`, `?preview=oanquan3d` và test cũ cho tới khi Product Owner nghiệm thu theo 5 điều kiện Brief §11.2.

### 4.5 Responsive: tablet và điện thoại ngang

**Nguyên tắc:** chọn bố cục theo **kích thước vùng chơi** (ResizeObserver/container query), không theo user-agent; **không `transform: scale` cả bàn** (X-07). `geometry.ts` trả hình chữ nhật cho từng ringIndex theo chế độ và kích thước; token/ô co theo hệ số `s`, chữ giữ sàn ≥13px, vùng chạm ≥44px.

| Chế độ | Điều kiện (vùng chơi W×H) | Bàn | Khung UI | Hệ số `s` |
|---|---|---|---|---|
| **P – dọc** | W/H < 1 | Xoay 90° như mockup mobile (gốc 366×548) | Như mockup 390/360; tablet dọc dùng cùng bố cục, rộng hơn | `min((W−32)/366, (H−chrome_P)/548, 1.4)` |
| **L – ngang rộng** | W/H ≥ 1 và H ≥ 600 | Ngang như desktop (gốc 1060×335) | Header, 2 thanh người chơi, dock như desktop | `min((W−2·gutter)/1060, (H−chrome_L)/335, 1)` |
| **C – ngang thấp (điện thoại xoay ngang)** | W/H ≥ 1 và H < 600 | Ngang, chiếm hết chiều rộng an toàn | Header + 2 thanh người chơi gộp thành 1 dải 44px (tên, điểm, chấm 5 chủ đề); dock thành thanh đáy 56px; S6/S7 thành 2 cột (thẻ cuộn trái, khung chấm ghim phải); S8/S8b dùng `ResultSummary` 2 cột, không bàn | `min((W−safeL−safeR−16)/1060, (H−44−56−safeB−8)/335)` |

Ước tính (chưa chạy trên thiết bị):

| Khung | Chế độ | `s` | Ô Dân | Đạt ≥44px |
|---|---|---:|---:|---|
| 1024×768 (tablet ngang) | L | ≈0,93 | ≈115px | ✔ |
| 768×1024 (tablet dọc) | P | ≈1,39 | ≈145×89 | ✔ |
| 844×390 (iPhone ngang, safe 47/47/21) | C | ≈0,69 | ≈86px | ✔ |
| 667×375 | C | ≈0,61 | ≈76px | ✔ |
| 568×320 | C | ≈0,52 | ≈65px | ✔ |

Khi đổi hướng giữa ván: chỉ tính lại hình học, không đụng state; focus giữ theo ringIndex. Không tự xoay bàn theo lượt (hot-seat). Không chặn người dùng bằng màn "hãy xoay máy"; nếu `s` làm ô < 44px thì cho cuộn và hiện gợi ý không chặn.

**Cần Product Owner:** duyệt chế độ C (chưa có mockup) và quyết định có cần một vòng mockup ngắn cho tablet/ngang trước G2 hay không. Bộ khung kiểm thử đề xuất: 1440×900, 1280×800, 1024×768, 768×1024, 820×1180, 390×844, 360×740, 932×430, 844×390, 667×375, 568×320, có giả lập safe-area.

---

## 5. Implementation Task Breakdown

ID là **đề xuất**, chỉ ghi vào `planning/TASKS.md` khi Product Owner duyệt. Mỗi task một agent, một nhánh từ `main`.

### Trước G1 (không phải code game)

| ID | Nội dung | Điều kiện | Tiêu chí nghiệm thu |
|---|---|---|---|
| BR-T032 | Technical Readiness Audit (tài liệu này) | — | Product Owner nghiệm thu (bản 1.0: APPROVED WITH CORRECTIONS; bản 1.1 chờ xác nhận) |
| BR-T033 | Đưa handoff vào repo: `docs/oanquan-v2/` (4 MD + tokens, **không** ảnh review, **không** mã Python); ADR-0006 chuyển 3D → 2.5D (PROPOSED, Product Owner chuyển ACCEPTED 23/11); Phụ lục Matrix cho C-01…C-03; cập nhật `OPEN_QUESTIONS` (OQ-14…OQ-16), `TASKS`, `PROJECT_STATE`, `HANDOFF`; bản nháp Asset Audit | Duyệt BR-T032 | Chỉ tài liệu; typecheck/test/build vẫn PASS |
| Nhóm | Trả lời nhóm A (20 mục) + **C-02, C-03** (chặn G1); C-01 trước G2/G3 | — | Có biên bản/ADR ghi từng đáp án |

### G1 — Engine (chỉ sau khi nhóm A chốt)

| ID | Nội dung | Tiêu chí nghiệm thu |
|---|---|---|
| BR-T034 | `engine/` + `RulesConfig` theo đáp án nhóm; ring, rải, cơ hội ăn, thu hoạch qua `commitRefereeResult`, đổi lượt, kết thúc, tính điểm; RNG có seed | Unit test: bảo toàn tổng hạt; xoay bố cục không đổi kết quả; tiến 1 bước = ringIndex+1 mod 12; không đổi state trước commit; commit đúng 1 lần; `initialPlayer` P1/P2; mỗi trường `RulesConfig` có `decisionRef`; typecheck/test/build PASS |
| BR-T035 | Bộ mô phỏng nhiều ván (dữ liệu tham khảo cho R12), chạy bằng `node:test`/script | Báo cáo số liệu, ghi rõ "chỉ tham khảo, không thay nhóm quyết" |
| BR-T036 (song song, track nội dung) | `content/cardSchema.ts` + validator; quy trình nhập thẻ (file gốc hoặc OCR + soát) ngoài repo; chỉ đưa vào repo thẻ đã duyệt | Validator bắt thiếu trường; 0 thẻ chưa duyệt trong repo |

### G2 — Tích hợp UI (sau G1 PASS, trừ khi Product Owner mở track UI song song)

| ID | Nội dung | Tiêu chí nghiệm thu chính (Handoff §10) |
|---|---|---|
| BR-T037 | Route + cờ (§4.4), lazy root, CSS `.oqv2`, token, `geometry.ts`, Board/DanPit/QuanPit, S3–S5b nối engine | Tiêu chí 1, 2, 5, 6, 7; không import `three`; bundle chính không tăng ở build production |
| BR-T038 | S6 thẻ, S7 Trọng tài 4 trạng thái, S8/S8b (desktop panel, mobile summary) | Tiêu chí 3, 4, 9; `inert` + focus trap |
| BR-T039 | S1, S2, S9, hộp thoại hỗ trợ, nhãn luật động, i18n | Brief §10; không ngôn ngữ thua/phạt |
| BR-T040 | Responsive P/L/C + bộ Playwright + axe (cần duyệt thêm devDependency) | Tiêu chí 8, 10, 11 trên bộ khung §4.5 |
| BR-T041 | Asset: chuyển Token V2 sang WebP (+128px), khai `ASSET_AUDIT`, chọn file lá | Hash + kích thước ghi lại; không asset chưa duyệt trong build production |

### G3 — Hoàn thiện

| ID | Nội dung |
|---|---|
| BR-T042 | Hoạt ảnh rải/lật/thu hoạch theo `events`, "Bỏ qua hoạt ảnh", reduced motion, tập sự 60 giây |
| BR-T043 | Thay Token V2 → V3 khi được duyệt (chỉ thay file theo vai trò) |
| BR-T044 | Kế hoạch gỡ prototype 3D theo 5 điều kiện Brief §11.2, cập nhật test cũ có phê duyệt; lazy-load `three` (X-14) |

---

## 6. Risks & Blockers

| # | Rủi ro / chặn | Mức | Khả năng | Giảm thiểu |
|---|---|---|---|---|
| 1 | Nhóm A (20 mục) chưa chốt | Chặn G1 | Cao | Gửi Matrix V1.3 + Phụ lục C-01…C-03; ưu tiên R0 (giải quyết luôn R8, R9, R11, R15, R16 và có thể cả C-03) |
| 2 | Mô hình kho 5 lọ (C-02) và rải qua Ô Quan (C-03) chưa có trong Matrix | Chặn G1 | Cao | Hỏi cùng R17/R24/R26 (C-02) và R0/R15 (C-03) |
| 2b | Quân Quan có phải linh vật (C-01) | Chặn art cuối/nội dung, không chặn G1 | Trung bình | Quyết trước khi chốt Token V3 và trước G2 |
| 3 | Asset/thẻ chưa duyệt bị deploy vì `main` tự deploy | Cao | Trung bình | Cờ build §4.4; không merge asset chưa duyệt; kiểm `dist/` trong CI |
| 4 | Không có nguyên văn thẻ sạch | Chặn nội dung G2 | Cao | Xin file gốc; nếu OCR thì 2 người soát |
| 5 | Lịch R1/R2 (28/11–20/12) ngắn | Cao | Trung bình | G1 nhỏ, test trước; tách track nội dung |
| 6 | Bàn dưới 13px/44px khi thu nhỏ | Trung bình | Cao nếu theo mockup | Hình học + sàn cỡ chữ (§4.5) |
| 7 | Trùng CSS với prototype | Trung bình | Trung bình | `.oqv2` + `oq2-` |
| 8 | Bundle chính đã 1,03 MB | Trung bình | Đã xảy ra | V2 lazy; task X-14 riêng |
| 9 | Nhánh local cũ (`main` local chậm 4 commit, worktree BR-T031 còn tồn tại) dễ bị dùng nhầm làm gốc | Thấp | Trung bình | BR-T030/T031 đã merge (PR #14/#15). Luôn tách nhánh từ `origin/main` sau `git fetch` |
| 10 | CI không chạy unit test → test engine có thể bị bỏ qua | Trung bình | Trung bình | Đề xuất thêm bước test vào `deploy.yml` (task riêng, cần duyệt) |
| 11 | Quyền Brainie/Rootie thương mại `BLOCKED` | Chặn phát hành | — | Chỉ trang trí, nội bộ |
| 12 | Token V2 trùng nghĩa icon chủ đề (QA §5.2) | Thấp | — | Chờ V3 |

---

## 7. Readiness Checklist trước G1

| # | Mục | Trạng thái |
|---|---|---|
| 1 | Hai gói handoff đọc được, checksum khớp | ✅ |
| 2 | Word luật gốc đọc được toàn văn | ✅ |
| 3 | 5 PDF thẻ mở được, xác nhận 100 thẻ / cấp / thời gian | ✅ (cấu trúc) · ⚠️ nguyên văn chưa trích được |
| 4 | Repo đúng remote, tài liệu quản lý đã đọc, baseline typecheck/test/build PASS | ✅ |
| 5 | Nhóm A (R0–R16, R17, R24–R26) có đáp án ghi thành quyết định | ❌ |
| 6 | **C-02** (kho 5 lọ) và **C-03** (rải qua Ô Quan) có đáp án | ❌ |
| 7 | Product Owner duyệt kiến trúc §4 và phương án route/cờ §4.4 | ✅ ADR-0006 ACCEPTED (23/11), kèm điều kiện: cờ phải loại module/asset/dữ liệu khỏi production bundle, kiểm `dist/` ở G2 |
| 8 | Product Owner quyết G2 sau G1 hay mở track UI song song (X-01) | ✅ G2 sau G1 PASS; prototype UI độc lập chỉ khi có task và phê duyệt riêng (ADR-0006) |
| 9 | Task ID G1 ghi trong `planning/TASKS.md`, một agent phụ trách, nhánh tách từ `origin/main` | ❌ |
| 10 | BR-T030/BR-T031 đã xử lý trước khi mở nhánh V2 | ✅ Đã merge (PR #14, #15; `origin/main` = `759c65e`) |
| 11 | R23 | ✅ Không chặn: `initialPlayer` là tham số bắt buộc, không mặc định (§2.4) |
| 12 | C-01 (Quan có phải linh vật) | Không chặn G1; phải có trước G2/G3 (art V3, `aria-label`, lời giới thiệu) |
| 13 | Nhóm B (R13, R18–R22), C (R23), tablet/ngang, `ASSET_AUDIT`, V3 | Không chặn G1; chặn G2/G3 |

**Điểm bắt đầu G1:** khi mục 5, 6 và 9 đều ✅ (mục 7, 8 đã ✅ ngày 23/11).

---

## Phụ lục — Bằng chứng

| Lệnh / thao tác | Kết quả |
|---|---|
| `git status --short` (đầu và cuối) | `?? brainroot-assets-v1/`, `?? brainroot-assets/` (không đổi) |
| `sha256sum -c MANIFEST_SHA256.txt` (2 gói) | 129/129, 10/10 OK |
| `unzip -p *.docx word/document.xml` | Đọc được 3 DOCX |
| `pdftotext -layout` (5 PDF) | 41 trang/PDF, 20 mặt trước + 20 mặt đáp án; mất dấu tiếng Việt |
| `npm run typecheck` | PASS |
| `npx --yes tsx --test tests/*.test.ts` | PASS 51/51 |
| `npm run build` | PASS, cảnh báo chunk 1.033,69 kB |
| `npm run lint`, Playwright, axe, render ảnh PDF, kiểm tra GitHub trực tuyến | NOT RUN |

Commit: **NOT COMMITTED.** Bản 1.0 không cập nhật `planning/` hay `logs/`; việc này làm trong BR-T033 trên nhánh `codex/br-t033-oanquan-docs`.

## Thay đổi so với 1.0 (BR-T033, 23/11/2026)

| Mục | Thay đổi |
|---|---|
| Đầu tài liệu, §C, §1.5 | Cập nhật trạng thái GitHub thật: PR #14 (BR-T030) và PR #15 (BR-T031, stacked) đã merge, `origin/main` = `759c65e`; nhánh BR-T033 tách từ `origin/main`. |
| §0, §2.2 C-01 | Hạ từ "chặn G1" xuống **vấn đề thiết kế/nội dung**, không chặn thuật toán G1; phải quyết trước G2/G3. |
| §2.2 C-02 | Giữ là quyết định **chặn G1**. |
| §2.2 C-03 | Ghi rõ là quyết định **chặn G1**: nhóm phải xác nhận hạt có được rải vào/qua Ô Quan hay không. |
| §2.4 R23 | Ghi xác nhận của Product Owner: `initialPlayer` bắt buộc, không mặc định. |
| §2.2 X-12 | Làm rõ "15 giây" trong ví dụ Word là thời gian của thử thách ví dụ, không nhất thiết là quy định chung cho thẻ Cấp 2. |
| §5, §6, §7 | Đồng bộ theo các thay đổi trên; mục 10 checklist chuyển ✅; thêm mục C-01 riêng. |
| §2.2 | Thêm mã câu hỏi mở `OQ-14` (C-01), `OQ-15` (C-02), `OQ-16` (C-03). |
| §7 mục 7, 8 | Sau nghiệm thu BR-T033 (APPROVED WITH MINOR CORRECTIONS): ADR-0006 ACCEPTED; G2 sau G1 PASS. |
