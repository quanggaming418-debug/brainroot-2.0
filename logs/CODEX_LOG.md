# CODEX_LOG — Append-only

- **Started:** 2026-11-20
- **Status:** NO AGENT IMPLEMENTATION ENTRIES YET
- **Policy:** Mỗi task/session append một block theo `templates/WORK_LOG_TEMPLATE.md`. Ghi những file đã sửa, lệnh kiểm thử và kết quả thực; không ghi ý định như đã hoàn thành.

---

<!-- Append NEW sessions below. Do not edit or delete old sessions. -->

## Session: 2026-11-20 08:37+07:00 — Codex — BR-T003

- **Task & goal:** Sửa các phát hiện từ review độc lập trong phạm vi owner đã duyệt, ứng với BR-FR-001 và BR-FR-006.
- **Status before → after:** `IN_REVIEW` → `DONE` theo tiêu chí nghiệm thu cục bộ. Bản sửa chờ duyệt commit riêng.
- **Read context:** `AGENTS.md`, README, PROJECT_STATE, ROADMAP, TASKS, HANDOFF, AI Studio log, PRD, DESIGN_SYSTEM, ACCESSIBILITY, USER_FLOWS, quy tắc UI và mã Hero V4.
- **Files changed:** `src/App.tsx`; `AboutSection.tsx`, `EcosystemSection.tsx`, `PrimaryCTA.tsx`, `SiteHeader.tsx` trong `src/components/landing/`; `src/utils/focusAnchorTarget.ts`; `src/data/landing.ts`; `src/styles/landing.css`, `src/styles/tokens.css`; `package-lock.json`; README, TASKS, PROJECT_STATE, CODEX_LOG và HANDOFF.
- **User-visible behavior changed:** Mascot/lá chạy một lượt tối đa 4,8 giây. Tùy chọn giảm chuyển động vẫn tắt animation, parallax và cuộn mượt. CTA/menu chuyển focus đến nội dung đích, Escape trả về nút menu và skip link dẫn tới main. Dùng màu riêng cho chữ tiêu đề để đạt tương phản trên nền Hero. Copy công khai nêu rõ các trải nghiệm chưa mở.
- **Tests actually executed:**
  - `npm install`: PASS, tạo lockfile cho dependency hiện có. `npm ci`: PASS, hash lockfile giữ nguyên sau khi dừng Vite và chạy lại (lần đầu Windows khóa `esbuild.exe`).
  - `npm run typecheck`: PASS, exit 0. `npm run build`: PASS, exit 0, Vite 7.3.8, 41 modules.
  - `npx --yes tsx --test tests/br-t003.test.ts`: PASS, 5/5. `npm audit`: PASS, 0 lỗ hổng được báo cáo.
  - `npm run preview -- --host 127.0.0.1 --port 4174 --strictPort` và `node verify-final.cjs` (script tạm, có `BRAINROOT_QA_URL=http://127.0.0.1:4174/`): PASS, Chromium 153.0.8010.12 ở 1440×900, 390×844, 320×740. Desktop và hai mobile không tràn ngang. Mỗi viewport tải 8/8 ảnh (tính cả ảnh nền dự phòng) và Chromium dùng Be Vietnam Pro cho chữ tiếng Việt. 0 lỗi console, 0 request thất bại.
  - Trên cả ba viewport: PASS cho Tab → skip → main → CTA → `#worlds`, focus đích, cuộn và Back; 4 phần tử chuyển động đều dừng; reduced motion cho 0 animation, 3 transform `none` và cuộn tức thời. Trên hai mobile: PASS cho 5/5 đích menu, Escape và focus. Parallax desktop ba lớp lệch dưới 12 px: PASS.
  - `node visual.cjs` và `node zoom.cjs` (script tạm): PASS, đối chiếu ảnh sau giải mã và cây accessibility, xác nhận vùng đích có tên và được focus; zoom Chromium 200% không tràn ngang, CTA dùng được bằng bàn phím.
  - Tương phản chữ: PASS sau sửa, 40 mẫu mỗi viewport gồm CTA hover và menu mở trên mobile. Giá trị tối thiểu 4,69:1 cho chữ thường và 3,59:1 cho chữ lớn (ghi xuống 2 chữ số thập phân). Đo màu chữ CSS trên mẫu pixel nền thực tại vị trí nét chữ. Axe: 0 vi phạm tự động, yêu cầu đối chiếu thủ công phần nền ảnh đã được đo riêng.
  - `npm run lint`: NOT RUN (không có script). Screen reader thật, Safari iOS và Chrome Android trên thiết bị thật: NOT RUN.
  - Dữ liệu trình duyệt của phiên: thư mục tạm `%TEMP%/brainroot-qa-68dc4280-fb9b-45c3-88f7-c981fd1b6561` có `browser-results.jsonl`, `contrast-*.json` và ảnh Hero. Playwright Core điều khiển Chromium có sẵn, axe-core quét accessibility, pngjs đọc pixel ảnh. Các công cụ chỉ cài trong thư mục tạm.
- **Acceptance criteria:** PASS cho React/TS và shell modular, brand + Be Vietnam Pro, một CTA chính, artwork Brainie/Rootie và ba lớp cảnh, bốn khu vực Ecosystem, responsive, bàn phím và focus, reduced motion, tương phản chữ đã đo, typecheck/build/unit. Kiểm tra tự động và cây accessibility chỉ là bằng chứng trong phạm vi phiên kiểm thử.
- **Bugs / tradeoffs / risk:** Không còn P0/P1 trong phạm vi BR-T003 đã xác minh. Kiểm tra thêm thiết bị thật và screen reader là P2. Quyền xuất bản artwork xử lý theo BR-T002.
- **Git commit SHA:** Nhánh `codex/br-t003-remediation`, HEAD nền `275f5ed4d64811c079540135ef42abc4d447b634`. Bản sửa **NOT COMMITTED**.
- **What remains / next task:** Owner xem diff và duyệt commit khi sẵn sàng. BR-T004 chờ giao riêng.
- **Owner approval required:** Có cho commit, push, merge hoặc deploy theo phạm vi được cấp.

## Session: 2026-11-20 08:57+07:00 — Codex — BR-T020

- **Task & goal:** Hero Ambient Motion Restoration theo quyết định sản phẩm đã duyệt (BR-FR-001, BR-FR-006).
- **Status before → after:** `TODO` → `IN_REVIEW`.
- **Read context:** AGENTS, README, ROADMAP, TASKS, PROJECT_STATE, HANDOFF, PRD, DESIGN_SYSTEM, ACCESSIBILITY và quy tắc UI.
- **Files changed:** `HeroSection.tsx`, `useHeroParallax.ts`, `landing.css`, DESIGN_SYSTEM, ACCESSIBILITY, TASKS, PROJECT_STATE, CODEX_LOG và HANDOFF.
- **User-visible behavior changed:** Mascot và lá chuyển động lặp liền mạch, lệch pha. Khi tab ẩn, CSS dừng tại pha hiện tại và parallax hủy khung đã lên lịch. Reduced motion giữ chế độ tĩnh. Artwork, typography, bố cục, màu sắc và hành vi focus của BR-T003 được giữ.
- **Tests actually executed:**
  - `npm run typecheck`, `npm run build`: PASS. `npx --yes tsx --test tests/br-t003.test.ts`: PASS, 5/5. Lint: NOT RUN (không có script).
  - `npm run preview -- --host 127.0.0.1 --port 4174 --strictPort` và `node ambient.cjs` (Playwright Chromium headless 153, script tạm): PASS ở 1440×900, 390×844 và 320×740. Không tràn ngang, ảnh giải mã, 0 lỗi console, CTA đích có focus. Bốn phần tử vẫn đổi transform sau 30 giây và 180 giây thời gian thực ở 1440×900 và 390×844.
  - Mô phỏng `visibilitychange`: PASS ở ba viewport (pha giữ nguyên, 0 yêu cầu rAF parallax khi ẩn, tiếp tục khi hiện). Reduced motion: PASS, 0 animation và 3 transform parallax `none`. `node ambient-menu.cjs`: PASS cho keyboard, Escape và focus đích trên 390×844.
  - Runtime smoke, 120 khoảng rAF ở mỗi viewport: 53,3 FPS / p95 33,3 ms ở 1440×900, 60 FPS / p95 16,7 ms ở 390×844, 60 FPS / p95 16,8 ms ở 320×740. 0 long task trong mỗi cửa sổ đo. Đây là số đo headless cục bộ, không đại diện cho thiết bị thật. Bằng chứng tạm ở `%TEMP%/brainroot-qa-68dc4280-fb9b-45c3-88f7-c981fd1b6561/ambient-results.txt`.
- **Acceptance criteria:** PASS cho chuyển động sau 30 giây/3 phút, pha lệch, pause/resume theo visibility, reduced motion, responsive, focus, runtime smoke, typecheck và build. Giới hạn WCAG 2.2.2 đã ghi theo quyết định sản phẩm.
- **Bugs / tradeoffs / risk:** Chuyển động tự chạy quá năm giây khi tab đang hiển thị và không có cơ chế điều khiển trong trang. Không tuyên bố đạt WCAG 2.2 AA.
- **Git:** Nhánh `codex/hero-ambient-motion`, commit nền `a2db00a8d4672304beb7c35d59726e36b1e4a2c6`. Commit thay đổi là commit chứa mục log này.
- **What remains / next task:** Review PR BR-T020. BR-T004 chờ giao riêng.
- **Owner approval required:** Merge cần phê duyệt riêng.

## Session: 2026-11-20 11:41+07:00 — Codex — BR-T022

- **Task & goal:** Intake VIS-006/VIS-008, kiểm kê chín pose nội bộ và đồng bộ tài liệu BR-GAME-001; liên quan BR-FR-001/002/003/006.
- **Status before → after:** BR-T022 TODO → IN_PROGRESS; BR-T023 đăng ký TODO. BR-T004/006 giữ phạm vi.
- **Read context:** AGENTS, README, TASKS, PROJECT_STATE, VISUAL_ASSET_REGISTER, UX_UI_CHECKLIST, HANDOFF, GAME_SPEC, PRD, OPEN_QUESTIONS, ROADMAP và bốn kit.
- **Files changed:** Bốn WebP + hai manifest trong public/assets/green-play; GreenPlayPavilionBanner.tsx và CSS riêng; đặc tả và checklist BR-GAME-001; VISUAL_ASSET_REGISTER, UX_UI_CHECKLIST, TASKS, PROJECT_STATE, CODEX_LOG, HANDOFF.
- **User-visible behavior changed:** Trang chủ tiếp tục là ứng dụng hiện hành. Banner chỉ có mã nguồn để chuẩn bị BR-T004. VIS-008 lưu để review khái niệm.
- **Tests actually executed:**
  - QA file bằng Pillow 12.1.1: PASS 4/4 WebP (định dạng, kích thước, byte, SHA-256, alpha, decode) và 2/2 bản sao preview byte-identical. PASS 9/9 cặp PNG/WebP và 1 contact sheet; tên/nhãn khớp manifest và README. Alpha PNG/WebP giống từng pixel (0–254). Contact sheet đủ biểu cảm, không thấy lỗi lớn ở kích thước xem. Kiểm tra viền trên nền UI thật: NOT RUN.
  - `npm run typecheck`: PASS. `npm run build`: PASS (Vite 7.3.8, 41 modules). `npx --yes tsx --test tests/br-t003.test.ts`: PASS 5/5. Lint và script test/E2E package: NOT RUN, không có script.
  - Playwright Chromium với script tạm `browser-vite.cjs`: PASS ở 1440×900/390×844/320×740 cho hai HTML preview độc lập (decode, overflow), banner React + CSS trong harness Vite riêng (import, source responsive, selector không áp lên H1 bên ngoài), và trang chủ production build (overflow, asset decode, keyboard CTA/focus, 0 lỗi console). Bốn URL WebP trên build giải mã được; màn hình Game Library đã tích hợp asset: NOT RUN vì chưa có.
  - Git diff: PASS, không thay đổi Hero V4/route/dependency; 4 WebP mới, không lặp Fact–Act hoặc pavilion preview; không thêm PNG nguồn, mascot, ZIP hoặc kết quả preview vào Git. Build không có pose mới.
- **Acceptance criteria:** PASS cho intake file, kiểm kê local, tài liệu và xác minh kỹ thuật nêu trên; Product Owner chưa xác nhận D1 artwork cuối VIS-006/VIS-008; production screen chưa kiểm thử.
- **Bugs / tradeoffs / risk:** BR-T002 và D1 còn mở, Wave 1A chưa đủ. OQ-08 chưa duyệt; chưa có prototype hoặc multiplayer.
- **Remote audit:** Fetch lại sau xác thực đã xác nhận origin/main đúng 99eb20b. Không phát hiện tên hoặc blob trùng 19 ảnh mascot kit tại các đầu nhánh origin đã fetch. Kiểm tra này không bao quát các nhánh đã xóa hoặc lịch sử ngoài các đầu nhánh đó.
- **Git:** Nhánh codex/br-t022-asset-docs-intake, nền 99eb20b24793b4d3e6386bfab1ef668c1833992e. Commit intake chứa mục log này.
- **What remains / next task:** Owner review intake và D1 riêng; duyệt S0 trước khi giao AI Studio BR-T023 Slice A.
- **Owner approval required:** D1, quyền phát hành, phạm vi S0 và merge.

## Session: 2026-11-20 — Codex — BR-T024

- **Task & goal:** Chuẩn bị triển khai R0 lên GitHub Pages tại /brainroot-2.0/ (BR-FR-001/002/006).
- **Status before → after:** Cấu hình chưa có → IN_REVIEW. Deploy công khai chờ merge và kiểm tra live.
- **Read context:** AGENTS, ba rule .agents, README, PROJECT_STATE, ROADMAP, TASKS, HANDOFF và ACCESS_CONTROL. So sánh workspace sạch và các refs với origin/main db8b354. Cấu hình deploy được mô tả chưa có trong các refs kiểm tra; giữ bản R0 mới nhất và không gộp PR #5.
- **Files changed:** Vite base, BrowserRouter, helper URL và các ảnh/gallery/capture, fallback HTML và phục hồi location, workflow, npm lockfile, regression tests và hồ sơ task.
- **User-visible behavior changed:** Build dùng subpath, giữ route/hash và sandbox preview. Tải trực tiếp route con qua 404.html, khôi phục path/query/hash trước khi React mount.
- **Tests actually executed:** `npm ci` PASS với PUPPETEER_SKIP_DOWNLOAD=true; `npm run typecheck` PASS; `npm run build` PASS (90 modules, cảnh báo chunk chính ~980 KB); `npx --yes tsx --test tests/*.test.ts` PASS 26/26; lint NOT RUN, không có script.
- **Browser:** PASS Chromium 1440×900/390×844/320×740 trên server tĩnh mô phỏng Pages (HTTP 404 thật → 200, không dùng Vite rewrite), 12 URL gồm route 404 và 3D preview. Deep-link reload giữ query/hash/focus. Navigation, Back/Forward desktop, CTA hash và link về từ sandbox PASS. Tất cả ảnh hiển thị giải mã, CSS/JS đúng base, không có lỗi JS hay request asset lỗi.
- **Artifact review:** Kiểm kê dist, duyệt gallery và ảnh dư AI Studio, đối chiếu nguồn Fact–Act và tìm mẫu API key/private key/service role. Không phát hiện payload thẻ trả phí, key hoặc dữ liệu cá nhân trong phạm vi rà soát. Ba fixture minh họa đã gắn nhãn vẫn hiện diện; không phải thẻ BR-T005 đã duyệt. BR-T002/quyền phát hành vẫn cần owner xác nhận.
- **Acceptance criteria:** Build và static browser QA PASS. Bản deploy thực NOT RUN tại thời điểm commit, chờ merge. API Pages đã cấu hình source workflow; trước PR có 0 workflow/run và URL thật trả 404.
- **Git:** codex/github-pages-r0, base db8b354. Commit chứa mục log này. Không merge trực tiếp.
- **What remains / next task:** Sau khi owner review và merge, xác nhận run cho SHA main, trạng thái environment github-pages và tải URL thật.
- **Owner approval required:** Review/merge và quyền công bố artwork.

## Session: 2026-11-20 — Codex — BR-T022 · Garden asset intake

- **Task & goal:** Nhập bốn WebP từ assets/ của brainroot_garden_assets_v1.zip phục vụ thiết kế homepage sau.
- **Status before → after:** IN_PROGRESS → IN_PROGRESS; intake chờ review PR.
- **Read context:** AGENTS, .agents/rules, TASKS, PROJECT_STATE, README, ROADMAP, HANDOFF và danh sách tệp/manifest ZIP.
- **Files changed:** Bốn WebP trong public/assets/home/garden và ghi chú TASKS, PROJECT_STATE, CODEX_LOG, HANDOFF.
- **Tests actually executed:** Python ZipFile + Pillow PASS 4/4 WebP 1120×747, alpha 0–255, góc trong suốt và byte giữ nguyên. npm run build PASS (gồm typecheck); bốn bản dist khớp SHA-256. Unit tests PASS 26/26. Browser UI NOT RUN, asset chưa được gắn vào UI.
- **Acceptance criteria:** PASS intake đúng bốn file, không nhập master/preview/handoff code. Giữ nguyên UI, Hero, game, router và animation.
- **Git / next task:** Nhánh codex/garden-webp-intake từ main f61c844. Bản commit này chờ review; giao AI Studio tích hợp sau.
