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

## Session: 2026-11-20 — Codex — BR-T025

- **Task & goal:** Intake chỉ tài sản trang trí Truth or Dare V1, chuẩn bị BR-FR-002.
- **Status before → after:** Intake mới → IN_REVIEW; không chuyển trạng thái duyệt nội dung hoặc gameplay.
- **Read context:** AGENTS, .agents/rules, README, TASKS, PROJECT_STATE, ROADMAP, HANDOFF, ACCESS_CONTROL, workflow AI Studio, publicUrl() và manifest ZIP.
- **Files changed:** 19 SVG trong public/assets/truth-or-dare/v1/experience; README bàn giao đã lược bỏ dữ liệu nguồn và hồ sơ task.
- **User-visible behavior changed:** Thêm URL tài nguyên tĩnh cho bước sau; không mount UI.
- **Tests actually executed:** Python ZipFile + ElementTree PASS. Đường dẫn hợp lệ 91/91 tệp kit và 20/20 tệp scaffold; 90/90 hash SHA-256 và byte theo manifest (manifest không tự liệt kê); 19/19 SVG khớp hai ZIP và được kiểm tra XML, không có script, link ngoài, nội dung thẻ hay text ngoài 15 dấu hỏi. npm run typecheck/build PASS; npx --yes tsx --test tests/*.test.ts PASS 29/29. Chromium qua npm run preview: 19/19 HTTP 200, image/svg+xml, giải mã và giữ nguyên byte ở /brainroot-2.0/. Lint NOT RUN vì chưa có script; UI E2E NOT RUN vì chưa tích hợp.
- **Acceptance criteria:** Chỉ nhập 05_experience_assets. Kit đầy đủ, GAME_SPEC, prompt gốc, thẻ nguồn, trang rulebook, ảnh và nội dung chưa duyệt giữ ngoài repo. Diff không sửa mã ứng dụng, CSS, config hay PR cũ.
- **Git commit SHA:** Nhánh codex/truth-or-dare-v1-assets từ main 959c672; commit intake chứa mục log này.
- **What remains / next task:** Product Owner review; AI Studio tiếp tục ở task tích hợp riêng. Chỉ sử dụng tập con nguồn sau khi duyệt quyền.
- **Owner approval required:** Merge và công bố nội dung nguồn.

## Session: 2026-11-21 — Claude Code — BR-T026 (PR 1: gameplay & a11y)

- **Task & goal:** Sửa lỗi gameplay và accessibility P0 của Truth or Dare theo audit đã duyệt; không đổi nội dung thẻ/luật, không đổi giao diện.
- **Files changed:** `truthOrDareEngine.ts` (reshuffle trả lá đang rút về bộ bài), `useModalFocus.ts` (mới), `GreenPenaltyWheelModal.tsx`, `HardcoverRulebookModal.tsx`, `BrainieFaqPopover.tsx`, `tests/truth-or-dare-v1.test.ts` (+1 test).
- **Tests actually executed:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` PASS 40/40 (baseline 39/39) · `npm run build` PASS · Playwright Chromium headless 390×844 (script tạm, đã xóa) PASS: Shuffle giữ lá bài (16→15→16), Tab/Shift+Tab nằm trong modal vòng quay và sách luật, Escape ở wheel_ready không bỏ qua, Escape sau kết quả đóng, focus trả về nút mở, 0 lỗi console, 0 tràn ngang · `npm run lint` NOT RUN (chưa có script) · chạy trên `vite preview` bản build.
- **Chưa làm (PR sau):** Stop xóa phiên, alt tiếng Anh cứng, vô hiệu `?mode=legacy`, rulebook chờ duyệt, deployment `VITE_BASE`, v.v.
- **Git:** nhánh `codex/br-t026-gameplay-a11y`, **NOT COMMITTED**.

## Session: 2026-11-21 (QA) — Claude Code — BR-T026 / PR #10

- **Task & goal:** QA bổ sung 1440/320/reduced-motion/Brainie/bàn phím; chỉ sửa lỗi cần thiết trong phạm vi BR-T026.
- **Bổ sung sửa:** (1) `truth-or-dare-v1.css` — `.tod-modal-backdrop > * { margin:auto }` để dialog cao không bị cắt đầu và vẫn cuộn được ở 320×568; (2) `BrainieFaqPopover.tsx` — Escape trả focus về nút Brainie; (3) `TruthOrDareCardStage.tsx` — pha `wheel_*` không còn hiển thị thông báo "Bạn đã rút hết các thẻ" phía sau modal.
- **Tests actually executed:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` PASS 40/40 · `npm run build` PASS · Playwright Chromium headless (script tạm đã xóa, `vite preview`): 1440×900 / 320×568 / 390×844+reduced-motion — PASS: 0 tràn ngang ở mọi pha, 0 lỗi console/HTTP, thao tác Chơi→Chọn→Rút→Lật→Bỏ qua→Quay→Rút tiếp bằng bàn phím, Shuffle giữ lá, Tab-trap + trả focus ở vòng quay & sách luật, Escape không bỏ qua penalty khi chưa quay/đang quay, Brainie trả lời đúng/từ chối ngoài phạm vi (VI), nút Dừng ở 320px cuộn tới được · ảnh vòng quay 1440 & 320 đã xem bằng mắt: OK.
- **NOT RUN:** `npm run lint` (không có script) · screen reader thật · Safari iOS/Chrome Android thiết bị thật · Brainie trả lời tiếng Anh ở locale EN · reduced-motion ở 1440/320 (chỉ 390).
- **Vấn đề a11y còn tồn đọng (ngoài phạm vi, chưa sửa):** thẻ `.tod-card-3d` có onClick nhưng không role/tabindex (người dùng bàn phím dùng nút Rút/Lật nên không bị chặn); nút HUD Trộn/Dừng cao 38–39px (<44px khuyến nghị); Brainie là popover không-modal, Tab có thể ra ngoài (chấp nhận được); alt tiếng Anh cố định và ID thô `TD-01`; `aria-live` bao cả danh sách chat; Stop xóa toàn bộ phiên; Brainie nói "luật đã xác nhận" trong khi luật chưa được nhóm duyệt (→ PR3).
- **Git:** nhánh `codex/br-t026-gameplay-a11y`, PR #10; không merge.

## Session: 2026-11-21 (review fix) — Claude Code — BR-T026 / PR #10

- **Task & goal:** Xử lý review PR #10: Trộn khi đang cầm lá CUỐI reset cả bộ 16 lá; kiểm tra focus khi đóng vòng quay sang lượt kế.
- **Sửa:** `truthOrDareEngine.ts` — `reshuffleRemainingDeck` chỉ khởi động lại cả bộ khi `remainingIds` rỗng **và** không có lá đang cầm; cầm lá cuối thì chỉ trả đúng lá đó vào bộ. `TruthOrDareCardStage.tsx` — khi vào `choosing` mà focus đã rơi về `<body>` (ví dụ sau khi đóng vòng quay) thì đặt focus vào nút chọn đầu tiên khả dụng; không cướp focus nếu đang ở control khác.
- **Test mới:** `reshuffling while holding the LAST card…` (xác nhận FAIL khi gỡ bản sửa, PASS khi có).
- **Tests actually executed:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` PASS 41/41 · `npm run build` PASS · Playwright Chromium 390×844 / 1440×900 / 320×568+reduced-motion PASS: sau Quay→Rút tiếp, focus ở `tod-choose-truth` (trước sửa: `<body>`), 0 lỗi trang · `npm run lint` NOT RUN.
- **Ghi chú:** sau Trộn, nút Trộn bị vô hiệu trong pha `shuffling` nên focus cũng chuyển vào nút chọn đầu tiên thay vì rơi về `<body>`. Không đổi giao diện, luật hay nội dung thẻ.
- **Git:** PR #10, không merge.

## Session: 2026-11-21 — Claude Code — BR-T027 (PR3: rule & content gate)

- **Task & goal:** Kiểm soát luật/nội dung chưa được nhóm duyệt; Product Owner chọn: giữ cơ chế chạy + gắn nhãn chờ duyệt; giữ sách luật + xóa số trang giả. Không tự viết luật, thẻ, hình phạt.
- **Files changed:** `truthOrDareData.ts` (sách luật: kicker/footnote/tiêu đề spread-4 → nhãn bản thử; FAQ "luật chính thức" → "bản thử, chờ nhóm đối chiếu"; câu từ chối & lời chào Brainie; brandSubtitle; chuỗi model Gemini → `unverified`; thêm `rulebookDraftNotice` VI/EN), `truthOrDareEngine.ts` (chú thích), `HardcoverRulebookModal.tsx` + `truth-or-dare-v1.css` (dòng nhãn "Bản thử"), `siteCopy.ts` (EN: bỏ "official/faithful", "Preview rule…"), `FactActTrialPage.tsx` (`?mode=legacy` chỉ trong DEV), `tests/truth-or-dare-v1.test.ts` (+1 test cổng, sửa test model).
- **Tests actually executed:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` PASS 42/42 · `npm run build` PASS · Playwright Chromium 1440×900 VI / 320×568 VI+reduced-motion / 390×844 EN (vite preview bản build): nhãn bản thử hiển thị đúng, 0 tràn ngang, 0 lỗi console, Brainie chào/đáp theo nội dung mới, `?mode=legacy` trên bản build hiển thị trải nghiệm mới (không lộ fixtures) · ảnh 1440 & 320 đã xem · `npm run lint` NOT RUN.
- **Ghi chú / chưa đổi (cần PO quyết):** nhãn phân trang UI "Trang N" và "Trang 1–2 / 8" vẫn còn vì là điều hướng sách; mô tả cơ chế (khóa Truth, Bỏ qua→quay, không lặp thẻ) giữ nguyên hành vi; nội dung `src/data/games.ts` và các trang Ô ăn quan không thuộc phạm vi; câu "thẻ vật lý" trong `connectAbout.ts`/`games.ts` chưa chỉnh.
- **Git:** nhánh `codex/br-t027-rules-content-gate`, xếp chồng trên `codex/br-t026-gameplay-a11y` (PR #10). Chưa merge.

## Session: 2026-11-21 — Claude Code — đồng bộ tài liệu sau merge

- **Task & goal:** Cập nhật `TASKS.md`, `PROJECT_STATE.md`, `HANDOFF.md` theo trạng thái thật trên `main` (`45fb8d9`) sau PR #10 và #12.
- **Tests actually executed:** chỉ sửa tài liệu; không chạy lại typecheck/test/build. Trạng thái GitHub được đọc qua API công khai (PR #10/#11/#12 merged; check trên `main` đều success).
- **Git:** nhánh `codex/docs-br-t026-t027-done`, không merge.

## Session: 2026-11-21 — Claude Code — BR-T028 (Truth or Dare: 20 thẻ thật)

- **Task & goal:** Thực hiện `BRAINROOT_CODE_HANDOFF.md` (P0 + P1 #4–6) theo ADR-0005. Status `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t028-tod-20-cards` (nền `0379bee`).
- **Files changed:** `src/features/truthOrDare/{truthOrDareCards.ts (mới), DareTimer.tsx (mới), truthOrDareData.ts, truthOrDareEngine.ts, TruthOrDareCardStage.tsx, TruthOrDareExperience.tsx, GreenPenaltyWheelModal.tsx}`, `src/data/{games,landing}.ts`, `src/i18n/siteCopy.ts`, `src/styles/{truth-or-dare-v1,green-play}.css`, `tests/{truth-or-dare-v1,br-t004}.test.ts`, `docs/decisions/0005-…`, `docs/DECISIONS.md`, `planning/{TASKS,PROJECT_STATE,ROADMAP}.md`, `logs/BR-T028_BASELINE_BEFORE.md`.
- **Behavior:** xem mốc "SAU" trong `logs/BR-T028_BASELINE_BEFORE.md`. Rút + lật gộp bằng tự lật sau khi thẻ tới giữa bàn (engine giữ nguyên các phase). Green Penalty dùng vòng quay 15 ô sẵn có thay vì màn hình mới.
- **Tests executed:** `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` PASS 43/43 · `npm run build` PASS · trình duyệt (Vite dev, 375×812, 768×1024, desktop): chơi hết 20 thẻ không lặp, 0 tràn ngang, 0 prompt bị cuộn trong thẻ ở 375px, đồng hồ đếm/đặt lại, vòng quay ra hình phạt thật, EN hiển thị đúng, sách luật mở được. `npm run lint` NOT RUN. Reduced-motion, 320px, bàn phím/trình đọc màn hình, Safari/Android thật: NOT RUN trong phiên này.
- **Chưa làm / rủi ro:** P1 #7 (chọn người chơi tiếp theo) NOT DONE; chủ đề thẻ là đề xuất chờ nhóm xác nhận; `?mode=legacy` và trang trial cũ còn chuỗi "tình huống" nhưng chỉ dùng ở dev; header ở 768px xuống dòng (có sẵn từ trước, ngoài phạm vi).
- **Git commit SHA:** NOT COMMITTED.

## Session: 2026-11-21 — Claude Code — BR-T029 (Green Learn facts + Quiz)

- **Files:** `src/data/{learnFacts,quiz}.ts`, `src/features/learn/{quizEngine.ts,LearnQuiz.tsx}`, `src/pages/GreenLearnPage.tsx`, `src/styles/unified-world.css`, `tests/br-t029-learn-quiz.test.ts`, `docs/ASSET_AUDIT.md`, `planning/TASKS.md`.
- **Tests:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` 47/47 PASS · `npm run build` PASS · trình duyệt: chơi hết 5 câu bằng phím 1, nguồn mở được, 0 tràn ngang ở 375px. Lint, reduced-motion, trình đọc màn hình: NOT RUN.
- **Ghi chú:** năm nguồn để `null` khi file nội dung không nêu (không đoán). Đáp án EN của quiz là bản dịch của tôi từ lựa chọn VI. **NOT COMMITTED**, nhánh `codex/br-t029-learn-quiz`.

## Session: 2026-11-21 — Claude Code — BR-T030 (Quest + Về Brainroot + Tin dự án)

- **Files:** `src/data/{quests,aboutExtra}.ts`, `src/features/quest/questBoard.ts`, `src/pages/{GreenQuestPage,AboutPage}.tsx`, `src/styles/unified-world.css`, `src/utils/routeNavigation.ts`, `tests/br-t030-quest-about-news.test.ts`, `planning/TASKS.md`.
- **Tests:** `npm run typecheck` PASS · `npx tsx --test tests/*.test.ts` 51/51 PASS · `npm run build` PASS · trình duyệt: đánh dấu 3 thử thách nhận huy hiệu và lưu localStorage, About hiển thị đủ khối, 0 tràn ngang ở 375px. Lint, reduced-motion, trình đọc màn hình: NOT RUN.
- **Ghi chú:** số khảo sát chép nguyên văn nhưng nhóm chưa xác nhận lại file gốc/làm tròn. Tên sự kiện tiếng Việt giữ nguyên ở bản EN. Thử thách cũ (`greenQuestModel.ts`) còn trong mã nhưng không còn dùng ở giao diện. **NOT COMMITTED**, nhánh `codex/br-t030-quest-about-news`.

### BR-T030 bổ sung (2026-11-21) — chỉnh About/News theo hướng người dùng
- Chuyển khảo sát/đội ngũ/lộ trình/chi tiết sơ tuyển sang `docs/HACKATHON_DOSSIER.md`; xóa `src/data/aboutExtra.ts`; thêm `src/data/{about,news}.ts`; viết lại `src/pages/AboutPage.tsx`; sửa CSS và `tests/br-t030-quest-about-news.test.ts`.
- Tests: typecheck PASS · unit 51/51 PASS · build PASS · trình duyệt 375px: 0 tràn ngang, không còn chuỗi khảo sát/đội ngũ/lộ trình trên trang. Lint, reduced-motion, bàn phím, alt ảnh (chưa có ảnh nào được đăng): NOT RUN.
- Hạn chế: không đọc được PDF (thiếu poppler/pypdf), nội dung dựa trên file revision. **NOT COMMITTED.**

### BR-T030 bổ sung 2 (2026-11-21) — /about V3
- Files: `src/pages/AboutPage.tsx` (viết lại), `src/data/about.ts` (V3), `src/data/news.ts` (tất cả draft), `src/hooks/useRevealOnScroll.ts` (mới), `src/styles/about-v3.css` (mới, import trong `styles.css`), `src/styles/unified-world.css` (xóa CSS about cũ), `tests/br-t030-quest-about-news.test.ts`, `docs/ASSET_AUDIT.md`, `planning/TASKS.md`.
- Tests: typecheck PASS · unit 51/51 PASS · build PASS · trình duyệt: 375px và ~1024px: 0 tràn ngang, 0 ảnh vỡ, mọi ảnh có alt, 1 h1, không còn chuỗi Tin dự án/Sắp có/NGO/ESG/khảo sát.
- NOT RUN: chụp đúng 1440 và 768 px, reduced-motion trên trình duyệt (đã viết CSS/JS tắt parallax, đường vẽ, lắc mascot), bàn phím, Lighthouse.
- Chưa làm theo mục 5.74 spec: đồng bộ tên "Thử thách"/"Green Quest" ở footer và ghi chú Ô ăn quan xanh trong footer (cần nhóm đồng ý). **NOT COMMITTED.**

## Session: 2026-11-22 22:49+07:00 — Claude Code — BR-T031 (/about V4.3 integration)

- **Task & goal:** đưa About V4.3 đã chốt (prototype Claude Design + asset kit V4) vào `/about` của React, kèm chỉnh sửa cuối cho mobile/desktop; không đổi Header/Footer, routing, cấu hình deploy, hệ VI/EN.
- **Status before → after:** TODO → IN_REVIEW.
- **Read context:** `AGENTS.md`, `.agents/rules/brainroot-{ui,content}.md`, `planning/{PROJECT_STATE,TASKS}.md`, `logs/HANDOFF.md`, `src/App.tsx`, `src/pages/AboutPage.tsx`, `src/data/about.ts`, `src/i18n/*`, `vite.config.ts`, `.github/workflows/deploy.yml`.
- **Isolation:** trạng thái chưa commit của BR-T030 được sao lưu ngoài repo (`C:/Users/Windows/brainroot-backups/br-t030-uncommitted-2026-11-22/`: patch, tar file untracked, base commit). Làm trong git worktree `C:/Users/Windows/brainroot-worktrees/br-t031-about-v43` (nhánh `codex/br-t031-about-v43` từ `c29ae77`), dựng lại đúng trạng thái BR-T030 (so từng byte), stage trạng thái đó trong index của worktree để `git diff` chỉ còn thay đổi BR-T031. Checkout gốc không bị đụng tới.
- **Files changed:**
  - mới: `src/features/about/{storyTimeline.ts,AboutHero.tsx,AboutStory.tsx,AboutLearning.tsx,AboutAudience.tsx}`, `src/styles/about-v43.css`, `tests/br-t031-about-v43.test.ts`, `public/assets/about-v4/` (17 file).
  - sửa: `src/pages/AboutPage.tsx`, `src/data/about.ts` (V4.3, VI/EN), `src/styles.css` (import about-v43 thay about-v3), `index.html` (thêm font Patrick Hand), `tests/br-t030-quest-about-news.test.ts` (bỏ kiểm tra riêng bố cục V3, giữ quy tắc nội dung; NGO/ESG/CSR chỉ bắt nguyên từ vì "ngoài trời" bị bắt nhầm).
  - xóa: `src/styles/about-v3.css`, `src/hooks/useRevealOnScroll.ts` (không còn dùng; bản cũ có trong sao lưu).
- **User-visible behavior changed:** `/about` hiển thị 4 chương V4.3; câu chuyện chạy theo cuộn và chạy ngược đúng khung khi cuộn lên; nút bước cuộn tới mốc cố định; bộ bài xòe/chọn/lật bằng chuột, chạm và bàn phím; reduced-motion = 3 trạng thái tĩnh.
- **Tests actually executed:**
  - `npm run typecheck`: PASS.
  - `npx tsx --test <từng file>` (9 file): 62/62 PASS. Lưu ý: truyền nhiều file một lúc thì `tsx --test` chỉ chạy file đầu.
  - `npm run build`: PASS; `vite build --base=/` (mô phỏng Cloudflare, xóa `404.html`): PASS.
  - Playwright Chromium headless: 94/94 PASS ở 1440/768/390/320 — cuộn xuôi/ngược trùng khung 41/41 điểm, thứ tự bước 01→02→03, sticky top 0, khoảng cuộn sticky, sân khấu nằm trọn màn hình, nhật ký không bị cắt, nút ≥44×44, nhãn không tràn, cảnh Dành cho ai không tràn cột, không tràn ngang, 0 ảnh vỡ, 0 lỗi console (ngoài phản hồi `404.html` mong đợi của GitHub Pages), Tab/Enter/mũi tên/Home/End, focus-visible 3px, reduced-motion, VI⇄EN, mở thẳng `/about` với base `/brainroot-2.0/` và `/`, smoke `/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`.
  - Nhịp khung khi cuộn qua câu chuyện (Chromium headless, không GPU): trước tối ưu 1440px có khung >34ms; sau khi bỏ translateZ/filter trên 8 mẩu nền còn 1/418 khung >20ms; cuộn toàn trang ngang V3.
  - `npm run lint`: NOT RUN (chưa có script). Thiết bị thật, Safari/Firefox, Cloudflare/GitHub Pages thật, trình đọc màn hình: NOT RUN.
- **Acceptance criteria:** giữ headline/slogan/thông điệp PASS; nhãn mobile ngắn + tên truy cập đầy đủ PASS; ba nút bằng nhau ≥44px PASS; không nhảy trạng thái khi cuộn ngược PASS; VI/EN đầy đủ PASS; không đổi Header/Footer/routing/deploy PASS; chỉ chép asset cần dùng PASS.
- **Bugs / tradeoffs / risk:** không có asset hình người nên "Dành cho ai" thể hiện người tham gia qua dấu vết hoạt động; hai lá bài là ảnh tách từ render bộ bài chính thức (nguồn ~125px/lá); bỏ footnote và CTA của V3 theo thiết kế V4.3 đã chốt.
- **Git commit SHA:** `NOT COMMITTED`.
- **What remains / next task:** Product Owner duyệt bản React; commit BR-T030 rồi BR-T031 và mở PR; smoke test trên host thật sau merge.
- **Owner approval required:** có — duyệt giao diện, quyền phát hành 2 ảnh lá bài tách từ render bộ bài (thuộc `BR-T002`), commit/PR/merge/deploy.

## Session: 2026-11-23 12:15+07:00 — Claude Code — BR-T032 + BR-T033 (Ô ăn quan xanh V2, tài liệu trước G1)

- **Task & goal:** BR-T032 audit kỹ thuật chỉ đọc cho Ô ăn quan xanh V2 từ hai gói handoff G0.5; BR-T033 đưa tài liệu cần thiết vào repo và chuẩn bị quyết định luật. Không viết engine/UI, không sửa route.
- **Status before → after:** BR-T032 (mới) → IN_REVIEW (bản 1.0 APPROVED WITH CORRECTIONS, bản 1.1 chờ xác nhận); BR-T033 (mới) → IN_REVIEW.
- **Read context:** `AGENTS.md`, `README.md`, `planning/{PROJECT_STATE,ROADMAP,TASKS,OPEN_QUESTIONS}.md`, `logs/HANDOFF.md`, `docs/{GAME_SPEC,DECISIONS,TECHNICAL_ARCHITECTURE,QUALITY_AND_TESTING,ASSET_AUDIT}.md`, `.agents/rules/*`; `src/App.tsx`, `src/features/oanquan/*`, `src/pages/OAnQuanXanhDetailPage.tsx`, `src/styles/tokens.css`, `vite.config.ts`, `.github/workflows/deploy.yml`; 2 gói handoff (giải nén ngoài repo, checksum 129/129 và 10/10), Word luật gốc, 5 PDF thẻ (chỉ trích được cấu trúc, lớp chữ mất dấu tiếng Việt).
- **Git:** `git fetch origin` → `origin/main` = `759c65e` (PR #14 BR-T030, PR #15 BR-T031 đã merge). Tạo `codex/br-t033-oanquan-docs` bằng `git switch --no-track -c … origin/main`. Không đụng worktree BR-T031, `main` local, hai thư mục `brainroot-assets*/` chưa track.
- **Files changed:**
  - mới: `docs/oanquan-v2/{README.md, BR-T032_TECHNICAL_READINESS_REPORT.md, RULES_MATRIX_V1.3_ADDENDUM_C01-C03.md, ASSET_AUDIT_DRAFT.md}`; bản sao nguyên văn `docs/oanquan-v2/{BRAINROOT_OANQUAN_G05_HANDOFF.md, BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md, BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md, BRAINROOT_OANQUAN_G05_VISUAL_QA_REPORT.md, oanquan-tokens.css}` (SHA-256 khớp manifest gói); `docs/decisions/0006-oanquan-v2-2-5d-architecture.md`.
  - sửa: `docs/DECISIONS.md` (dòng ADR-0006), `docs/ASSET_AUDIT.md` (mục trỏ tới bản nháp), `planning/OPEN_QUESTIONS.md` (OQ-08 trỏ Matrix; thêm OQ-14…OQ-16), `planning/TASKS.md` (BR-T032, BR-T033), `planning/PROJECT_STATE.md`, `logs/HANDOFF.md`, `logs/WORK_LOG.md`, log này.
- **User-visible behavior changed:** không.
- **Tests actually executed (nhánh BR-T033):**
  - `npm run typecheck`: PASS.
  - `npx --yes tsx --test tests/*.test.ts`: 62/62 PASS (chạy từng file cũng 62/62).
  - `npm run build`: PASS; chunk `index-*.js` 1.042,08 kB (cảnh báo >500 kB đã có từ trước, do `three` import tĩnh).
  - `grep` trong `dist/` tìm `oanquan-v2`, tên file token, tên thẻ mẫu: 0 kết quả.
  - `npm run lint`: NOT RUN (không có script). Playwright/axe: NOT RUN (không có thay đổi UI).
- **Acceptance criteria (BR-T033):** đồng bộ GitHub và nhánh từ `origin/main` PASS; sửa báo cáo (GitHub, C-01, C-02, C-03, R23, X-12) PASS; tài liệu G0.5 vào `docs/oanquan-v2/` PASS; ADR-0006 PROPOSED PASS; OQ C-01…C-03 PASS; TASKS BR-T032/T033 PASS; PROJECT_STATE + HANDOFF PASS; nháp Asset Audit PASS; phụ lục Matrix không chọn luật PASS; không thẻ/artwork/ZIP trong repo PASS; baseline PASS.
- **Bugs / tradeoffs / risk:** hàng BR-T030/BR-T031 trong `TASKS.md` vẫn ghi `IN_REVIEW`/`NOT COMMITTED` dù đã merge (không sửa vì mỗi lượt chỉ cập nhật task của mình). Hai tài liệu handoff có nhắc tên một thẻ mẫu và link canvas riêng tư; ghi chú trong `docs/oanquan-v2/README.md`.
- **Git commit SHA:** `NOT COMMITTED`.
- **What remains / next task:** Product Owner nghiệm thu; nhóm trả lời nhóm A + C-02 + C-03; chỉ sau đó đề xuất task G1.
- **Owner approval required:** có — nghiệm thu BR-T032 1.1/BR-T033, ADR-0006, commit/PR, gửi phụ lục cho nhóm.

### BR-T033 nghiệm thu và commit (2026-11-23)
- Product Owner: **APPROVED WITH MINOR CORRECTIONS**; chấp thuận ADR-0006 và cho phép commit cục bộ (không push/PR/merge/deploy).
- Sửa: `docs/decisions/0006-oanquan-v2-2-5d-architecture.md` → ACCEPTED + mục "Điều kiện chấp thuận" (G2 sau G1 PASS; prototype UI độc lập cần task + phê duyệt riêng; feature flag phải loại module/asset/dữ liệu chưa công khai khỏi production bundle, không chỉ ẩn route; G2 phải kiểm bằng production build + file trong `dist/`; không luật gameplay mặc định). Đồng bộ trạng thái trong `docs/DECISIONS.md`, `docs/oanquan-v2/README.md`, báo cáo BR-T032 (checklist mục 7, 8 ✅), `planning/{TASKS,PROJECT_STATE}.md`, `logs/{HANDOFF,WORK_LOG}.md`.
- Kiểm tra trước commit: `git status`, `git diff --check`, phạm vi file, không `src/`/`public/`/route/config, không stage `brainroot-assets*/`, không Word/PDF/ZIP/artwork. Kết quả: `git diff --check` không lỗi; chỉ file trong `docs/`, `planning/`, `logs/`. Kiểm thử 12:19: `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` 62/62 PASS · `npm run build` PASS (chunk chính 1.042,08 kB, cảnh báo cũ) · `dist/` 0 kết quả cho tài liệu/asset/thẻ V2 · lint NOT RUN (không có script).
- Không tạo task G1; G1 vẫn chặn bởi nhóm A + `OQ-15` + `OQ-16`.

## Session: 2026-11-23 18:10+07:00 — Claude Code — BR-T034 (Ô ăn quan xanh V2: G1 engine + G2 dev preview)

- **Task & goal:** theo quyết định mới của Product Owner (bỏ khảo sát nhóm, duyệt luật bản thử PLAYTEST V0), dựng engine G1 và bản chơi thử dev-only. Không sửa route production, không Three.js, không push/deploy.
- **Status before → after:** TODO → IN_REVIEW.
- **Files:** mới `src/features/oanquan-v2/engine/{ring,rules,engine,index}.ts`, `content/{themes,demoCards}.ts`, `ui/{Board,Challenge,Icons,OAnQuanV2App,main}.tsx`, `ui/oanquan-v2.css`, `tests/oanquan-v2-engine.test.ts`, `dev/oanquan-v2.html`, `.claude/launch.json`; sửa `planning/{TASKS,PROJECT_STATE}.md`, `logs/{HANDOFF,WORK_LOG,CODEX_LOG}.md`.
- **Ghi chú luật:** chủ đề từng ô lấy theo giá trị tạm của mockup G0.5 (lớp nội dung, không phải luật engine). Thẻ là 14 thẻ DEMO tự viết, không trích PDF.
- **Tests:** `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` 81/81 PASS (19 test engine, mô phỏng 3.000 ván: 3.000 kết thúc, bất biến luôn giữ) · `npm run build` PASS, hash JS production không đổi, `grep` `dist/` không thấy mã/thẻ V2 · Playwright Chromium tự chơi trọn ván ở 1280×800, 390×844, 360×740, 768×1024, 844×390 (có reduced motion), 0 lỗi console, 0 tràn ngang, nút chính trong màn hình, điểm không đổi trước "Chốt kết quả" · bàn phím 1 lượt PASS. NOT RUN: lint, thiết bị/Safari thật, trình đọc màn hình.
- **Git commit SHA:** `NOT COMMITTED`.

## Session: 2026-11-23 — Claude Code — BR-T035 (Ô ăn quan xanh V2: đại tu gameplay, hoạt ảnh, tự chuyển lượt)

- **Bối cảnh:** Product Owner chơi thử BR-T034 và không đạt: không rải tiếp, bỏ qua Ô Quan, phải bấm "Lượt tiếp", hoạt ảnh khó theo dõi.
- **Khảo sát tham khảo:** đọc luật/hướng dẫn oanquan.online, chơi 6 nước với máy (khách, từ chối analytics): thấy rải qua Ô Quan, rải tiếp, ăn Ô Dân, ăn Ô Quan (+14), ăn liên hoàn, hạt vẫn rơi vào Ô Quan đã mất quân, chuyển lượt tự động, nắm hạt có số đếm, tốc độ x1/x2. Không thấy: bù dân, kết thúc ván. Không sao chép mã, ảnh hay tài nguyên.
- **Nguyên nhân lỗi:** engine V0 cố định `skipQuanPits`/`relaySowing: false`; UI có màn `sowResult` bắt bấm; hoạt ảnh chỉ đổi class ô, số hạt nhảy cục.
- **Sửa:** engine `PLAYTEST_V1` + sự kiện chi tiết (pickup/drop/sowEnded/captureOpportunity/refereeCommitted/chainEnded/...); `playback.ts` (thuần) đổi sự kiện → khung hình; `GameScreen.tsx` phát lại, tự chuyển lượt, S8 tự tiếp tục có Giữ lại; nút ↺/↻ trên ô; tốc độ 1×/2×/4×, Bỏ qua; reduced motion. Sửa lỗi crash khi Chốt (key RefereePanel chứa `game.turn`).
- **Tests:** `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` 81/81 PASS · `npm run build` PASS, `dist/` 0 kết quả cho mã/thẻ V2 · Playwright tự chơi 5 ván: 0 lỗi console, 0 lỗi bố cục. NOT RUN: lint, thiết bị thật.
- **Git commit SHA:** `NOT COMMITTED`.

## Session: 2026-11-23 — Claude Code — BR-T036 (thẻ một bước, bàn tay hoạt họa)

- **Yêu cầu Product Owner:** bỏ Trọng tài nhiều bước (Xong, Mở đáp án modal, Xem lại, Chốt, Tiếp tục); trắc nghiệm tự chấm; câu mở đối phương chấm ngay trên thẻ; bàn tay SVG original 4 pose.
- **Làm:** BR-T035 được commit cục bộ `ba91740` để bảo toàn rồi tách nhánh BR-T036. Thẻ `ChallengeCard` một bước với khóa chống chấm trùng (khóa trong thẻ + uid ở GameScreen), phản hồi 0,5–1 s theo tốc độ/giảm chuyển động; bỏ khung kết quả S8 và khung hình `result`; `Hand.tsx` + hand state (pick/carry/drop/retract) theo sự kiện engine. Engine không đổi.
- **Tests:** `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` 82/82 PASS · `npm run build` PASS, `dist/` sạch V2 · Playwright 5 ván: 1 lần bấm mỗi thẻ, bấm đúp bị chặn, 0 lỗi console/bố cục. NOT RUN: lint, thiết bị thật.
- **Git commit SHA:** `NOT COMMITTED`.

## Session: 2026-11-24 — Claude Code — BR-T037 (ArtPack V3 vào bản chơi thử dev-only)

- **Nguồn:** `Brainroot_OAnQuan_V3_AssetPack_FOR_CLAUDE.zip` (49 file). Đọc README + PROMPT trước khi sửa mã.
- **Kiểm chứng linh vật:** SHA-256 của `mascots/masters/brainie.webp` = `1a0fca92…` và `rootie.webp` = `dd0c2f7b…` trùng khớp với `public/assets/hero-v4/*.webp` đã có trong repo → trạng thái mặc định dùng thẳng file repo; 10 pose còn lại lấy từ `mascots/poses/` (tách từ bảng biểu cảm đã duyệt). Không dùng mascot từ art-kit cũ, không sinh ảnh mới.
- **Đã tích hợp:** nền vườn (desktop/mobile), 5 icon chủ đề, hạt Dân, bệ Quan + linh vật, bàn tay 5 pose (thêm khung `reach` vào `playback.ts`), FX (vòng rơi hạt, lấp lánh thu hoạch, vòng ăn quân, lá góc bàn, vòng nguyệt quế), khung thẻ 3 cấp, giỏ kho, linh vật dẫn chuyện (`MascotCoach`) và trên thẻ.
- **Chưa dùng:** `board_base_no_pits.svg` và `pit_*.svg` (tỉ lệ khác bàn hiện tại, kéo giãn sẽ méo bo góc), `hand_sprite_strip_5x.png` (đã dùng 5 PNG rời).
- **Tests:** typecheck PASS · unit 82/82 PASS · build PASS; `dist/` không chứa tên file V3 nào và không có chuỗi `oq2-`/`oanquan-v2`; Playwright tự chơi 1440×900, 390×844, 360×740 (reduced motion) PASS. NOT RUN: lint, thiết bị thật.
- **Git commit SHA:** `NOT COMMITTED`.

## Session: 2026-11-24 — Claude Code — BR-T038 (nội dung giáo dục gốc, chỉ nội bộ)

- **Nguồn:** ZIP "Ô ăn quan xanh" (1 Word + 5 PDF, mỗi PDF 41 trang: 20 mặt thẻ + 20 mặt đáp án + 1 trang bìa). Trích bằng PyMuPDF (giữ đủ dấu tiếng Việt), ghép mặt thẻ ↔ mặt đáp án theo số thẻ + tiêu đề + cấp; 0 lỗi ghép.
- **Dữ liệu:** `internal-data/cards.internal.json` (gitignore). 100 thẻ, 5 chủ đề × (7 Cấp 1 + 7 Cấp 2 + 6 Cấp 3); thời gian: 35×15s, 35×20s, 26×30s, 4×45s (green-19, green-20, water-20, waste-19). Mỗi thẻ có id, chủ đề, cấp, tiêu đề, bối cảnh, thử thách, thời gian, đáp án "Trọng tài duyệt khi", tham chiếu tệp + trang thẻ/đáp án.
- **Kiểm tra bằng mắt:** dựng ảnh trang PDF cho các thẻ 45s (green-19, water-20), thẻ trắc nghiệm có phương án trong ngoặc/chấm phẩy (waste-12), thẻ mở có A/B (consume-09), thẻ có phương án nằm ở Bối cảnh (energy-08): chữ trong JSON khớp mặt thẻ/đáp án.
- **Mã:** `content/internalDeck.ts` (schema, validate, parseChoice, toGameCard, CardDeck), `content/activeDeck.ts` (nạp dev-only + fallback DEMO), sửa `GameScreen.tsx`, `Challenge.tsx`, `shared.tsx`, `OAnQuanV2App.tsx`, `oanquan-v2.css`, `content/demoCards.ts` (thêm 3 trường tùy chọn). Engine không đổi. Test mới `tests/oanquan-v2-internal-deck.test.ts`.
- **Tests:** typecheck PASS (0 lỗi); unit 88/88 PASS (82 cũ + 6 mới, gồm kiểm tra bộ nội bộ: 100 thẻ, id duy nhất, 7/7/6 mỗi chủ đề, thời gian 15/20/30/45s, ghép đáp án, 6 thẻ trắc nghiệm); build PASS, hash JS production `index-PSpSIzUV.js` KHÔNG đổi, quét `dist/` (33 tệp) 0 chuỗi nội dung thẻ/đáp án, không có `internal-data`/`cards.internal`; Playwright tự chơi 1280×800 (4×), 390×844, 360×740 reduced motion với bộ thật: 0 lỗi console, 1 lần bấm mỗi thẻ, timer = thời gian riêng của thẻ, không lặp thẻ, không mascot che chữ; fallback DEMO khi thiếu tệp nội bộ PASS. lint NOT RUN; thiết bị thật NOT RUN.
- **Git commit SHA:** `NOT COMMITTED`.

## Session: 2026-11-24 — Claude Code — BR-T039 (final product polish & game feel)

- **Đã làm:** bàn desktop rộng 1060→1320px; màn bắt đầu có nền vườn, linh vật nổi nhẹ, 3 bước chơi; màn kết thúc có thẻ điểm hai người + nhãn "Đại sứ Môi trường" cho người thắng, bảng điểm chi tiết gập lại; giỏ kho bảo tồn nảy lên khi nhận hạt; sửa chữ "Trống" chồng lên hạt bay khi thu hoạch; tên người chơi không bị cắt trên mobile; rút ngắn thời gian chờ (sowEnd 900→700, capture 1100→900, turn 1100→800, restock 1000→800, keep 800→700, chainEnd 500→400); âm thanh Web Audio tổng hợp (`ui/audio.ts`, không file ngoài) với nút bật/tắt `aria-pressed`, lưu localStorage; hoạt ảnh trang trí tắt khi reduced motion.
- **Tests:** typecheck PASS; unit 88/88 PASS; build PASS (hash JS production `index-PSpSIzUV.js` không đổi); quét `dist/` (33 tệp): 0 nội dung thẻ, không `internal-data`/`oq2-`/`oanquan-v2`/`AudioContext`; Playwright tự chơi desktop 1440×900 và mobile 390×844 / 360×740 reduced motion với 100 thẻ thật: 0 lỗi console, 1 lần bấm mỗi thẻ. lint NOT RUN; axe NOT RUN; thiết bị thật NOT RUN; âm thanh chưa nghe thử bởi người.
- **Git commit SHA:** `NOT COMMITTED` (BR-T038: `687ca55`).

## Session: 2026-11-24 — Claude Code — BR-T040 (tích hợp website chính)

- **Đã làm:** route `/games/o-an-quan-xanh/play` (lazy, trong AppLayout: SiteHeader + nav "Trò chơi" giữ nguyên, ẩn footer, một `main` duy nhất) và nút "Chơi Ô ăn quan xanh (bản chơi thử)" ở `/games/o-an-quan-xanh`; nút "← Về trang chủ" ở màn bắt đầu và kết thúc; cờ `VITE_ENABLE_OQV2` (`utils/featureFlags.ts`, `.env.example`), plugin `oqv2Gate` trong `vite.config.ts` thay module V2 bằng stub khi cờ tắt để cả asset cũng không vào `dist/`; `scripts/check-oqv2-isolation.mjs`; prototype 3D, `/?preview=oanquan3d`, trang chi tiết giữ nguyên. Thẻ nội bộ chỉ nạp khi `import.meta.env.DEV`, production (kể cả bật cờ) chỉ dùng thẻ DEMO.
- **Tests:** typecheck PASS; unit 88/88 PASS; build mặc định (cờ tắt) PASS + isolation OK (77 tệp, 0 dấu vết V2/thẻ); build cờ bật PASS (chunk OAnQuanV2Page 84 kB, DEMO cards, 0 thẻ nội bộ, 0 tham chiếu internal-data); preview production tắt: 8 route cũ 200, `/play` → 404, không có nút chơi, 0 lỗi console/request (desktop+mobile); preview bật: chơi tới thẻ, nhãn "THẺ DEMO", 0 lỗi; dev local: Playwright home → /games → chi tiết → game → hết ván (100 thẻ thật) → "Về trang chủ", desktop 1440×900 và mobile 390×844: 0 lỗi, 1 lần bấm/thẻ, 1 `main`. lint/axe/thiết bị thật NOT RUN.
- **Điều kiện còn thiếu:** Điều kiện trước khi bật V2 ở production: (1) Product Owner cho phép bật `VITE_ENABLE_OQV2=true`; (2) thẻ chính thức được duyệt công bố (hiện production chỉ có thẻ DEMO tự viết, 100 thẻ gốc chỉ nội bộ — OQ-18); (3) quyết định bộ thẻ riêng cho 2 Ô Quan (OQ-17, đang ánh xạ tạm); (4) luật PLAYTEST_V1 được nhóm chốt (OQ-08, OQ-15, OQ-16 còn mở); (5) quyền sử dụng/bản quyền asset V3 và Brainie/Rootie cho phát hành (BR-T002); (6) QA thiết bị thật + axe/lint; (7) quyết định số phận prototype 3D / `/games/o-an-quan-xanh` theo ADR-0006 (5 điều kiện nghiệm thu thay thế).
- **Git commit SHA:** `NOT COMMITTED` (BR-T039: `d1e3483`).

## Session: 2026-11-24 — Claude Code — BR-T041 (release readiness & closeout)

- **Lỗi đã sửa:** ESLint tối thiểu + `npm run lint`; 8 lỗi axe thật: tương phản `.gp-pillar__index`, `.gp-compare-card__tag`, `.gp-topic-card__index`, nút Play/primary của Truth or Dare, số bước About (desktop + mobile), chữ chủ đề ở màn bắt đầu V2; tên truy cập lệch chữ nhìn thấy (WCAG 2.5.3) ở nút sách luật Truth or Dare (EN) và 12 ô bàn V2 (chữ trong ô vẽ bằng CSS); build Cloudflare không có base `/`/bỏ `404.html` (trước đó không có trong repo).
- **Tests:** typecheck PASS; unit 88/88 PASS; lint PASS (0 lỗi/0 cảnh báo); axe 0 vi phạm (11 trang × VI/EN × desktop/mobile reduced motion + setup/bàn/thẻ V2) sau khi sửa lỗi; 0 lỗi console/HTTP; build gh/cf × tắt/bật PASS; deep-link reload đúng trên mô phỏng GitHub Pages (404.html) và Cloudflare Pages (fallback SPA); script cô lập: cờ tắt OK (gh 77 tệp, cf 76), cờ bật không rò rỉ (gh 96, cf 95); quét toàn bộ lịch sử git: 0 thẻ nội bộ (1 tiêu đề thẻ mẫu "Ma Trận Rửa Bát" đã có sẵn trong tài liệu G0.5 từ BR-T033). NOT RUN: thiết bị thật, deploy thật.
- **Git commit SHA:** `NOT COMMITTED` (BR-T040: `0d66393`).

## Session: 2026-11-24 — Claude Code — BR-T042 (Release Candidate)

- **Đã làm:** chế độ OFF/DEMO/FULL (`VITE_OQV2_MODE`, `scripts/oqv2-release.ts`, module ảo `virtual:oqv2-deck`); FULL cần `OQV2_PUBLICATION_APPROVAL` + `OQV2_DECK_FILE` hợp lệ, thiếu → build thất bại, không fallback DEMO; FULL bỏ siêu dữ liệu nguồn (tên PDF/số trang) khỏi bundle; i18n VI/EN toàn bộ giao diện V2 (`ui/i18n.ts`, dùng `useI18n` chung, thông điệp dạng hàm nên đổi ngôn ngữ không mất ván); nội dung thẻ giữ tiếng Việt gốc (không dịch, ghi chú hiển thị ở bản EN); `check-oqv2-isolation.mjs` thêm `--full`; sửa lỗi thật: vùng cuộn nhật ký không focus được bằng bàn phím (axe).
- **Tests:** typecheck PASS; unit 96/96 PASS (+8: chế độ OFF/DEMO/FULL, FULL từ chối khi thiếu quyền/dữ liệu, i18n VI/EN đủ khóa); lint PASS (0/0); axe 0 vi phạm: 44 trang × VI/EN × desktop/mobile reduced motion + V2 thiết lập/bàn/thẻ + MÀN KẾT THÚC V2 (4 tổ hợp, gồm bảng điểm và nhật ký mở) + Green Learn Quiz mọi bước (5 câu + kết quả, 4 tổ hợp); 0 lỗi console/HTTP; bàn phím: chọn ô + chiều + chấm thẻ chỉ bằng phím, focus vào tiêu đề thẻ; timer đếm lùi (20 → 18 s sau 2,3 s); nút âm thanh bằng bàn phím, lưu lựa chọn sau tải lại, AudioContext tạo sau thao tác; đổi VI↔EN giữa ván và giữa lúc mở thẻ: bàn, điểm, lượt, thẻ đang mở giữ nguyên, nhật ký dịch lại; build 3 chế độ × 2 host (6 biến thể) PASS; cô lập: OFF sạch hoàn toàn, DEMO không rò rỉ, FULL đủ 100 thẻ và không lộ tên tệp nguồn/PDF; deep-link reload đúng ở 6 biến thể trên máy chủ mô phỏng GitHub Pages/Cloudflare Pages. KHÔNG thực hiện/KHÔNG tuyên bố: nghe âm thanh (chỉ kiểm tra tự động không lỗi), thiết bị thật, deploy thật. Các bản FULL chỉ build thử trong thư mục tạm với mã tham chiếu thử, không commit, không triển khai.
- **Git commit SHA:** `NOT COMMITTED` (BR-T041: `d074776`).

## Session: 2026-11-24 — Claude Code — BR-T042 nghiệm thu cuối (RC1)

- **Kiểm tra hết giờ (đồng hồ thật, không giả lập): thẻ TRẮC NGHIỆM — hiện "Hết giờ", tự chấm Chưa đúng, hiện đáp án đúng, khóa các lựa chọn, đóng thẻ sau phản hồi, điểm không đổi, ván tiếp tục; thẻ CÂU MỞ — đồng hồ dừng ở "Hết giờ", thẻ KHÔNG tự đóng, đối thủ vẫn bấm Đạt/Chưa đạt được và thẻ đóng đúng một lần. Không phát hiện bug, không sửa mã.
- **Thêm:** `scripts/build-full.mjs` + `npm run build:full` (thử với mã tham chiếu thử trong thư mục gitignore rồi xóa: Cloudflare base `/`, không `404.html`, 95 tệp; GitHub base `/brainroot-2.0/`, có `404.html`, 96 tệp; cả hai `--full` OK 100 thẻ; thiếu `OQV2_PUBLICATION_APPROVAL` → dừng). Kế hoạch Cloudflare ở playbook §6.
- **Git commit SHA:** xem commit "BR-T042" trên nhánh `codex/br-t042-release-candidate`.

## Session: 2026-11-24 — Claude Code — Asset Audit/OQ-20 theo xác nhận nguồn gốc ArtPack V3

- Ghi nguồn gốc theo xác nhận của PO (ChatGPT cho pose/nền/bàn tay/SVG; hình gốc của PO cho Brainie/Rootie; Web Audio cho âm thanh), phạm vi công bố RC1/Hackathon, và các điều **không** tuyên bố (quyền thương mại, cấp phép lại, sở hữu bản quyền đầu ra AI). Không đổi mã, UI, asset hay nội dung.
- **Git commit SHA:** xem commit tiếp theo trên `codex/br-t042-release-candidate`.

## Session: 2026-11-24 — Claude Code — PR #16: sửa hồi quy Cloudflare Pages

- Cloudflare Pages build đỏ ở `b5a6730` do `vite.config.ts` (BR-T041) tự xóa `dist/404.html` khi `CF_PAGES=1`. Tái hiện: `CF_PAGES=1 npm run build -- --base=/ && rm dist/404.html` → exit 1 trên nhánh, exit 0 trên `main`. Sửa: bỏ việc xóa trong vite config; `scripts/build-full.mjs` (host cloudflare) tự xóa. Kiểm tra: lệnh kiểu dashboard exit 0, build GitHub giữ `404.html`, build:full cô lập OK, 96/96 test, lint, tsc.

## Session: 2026-11-24 — Claude Code — PR #16: xóa bun.lock

- Cloudflare Pages đỏ do `bun install --frozen-lockfile` (bun.lock lệch package.json). Kiểm tra Bun: 0 tham chiếu trong script/workflow/tài liệu; GitHub Actions dùng `npm ci`. Xóa `bun.lock`, ignore bun.lock/bun.lockb. Chuẩn lockfile: `package-lock.json`. Đính chính: giả thuyết `404.html` ở mục trước không phải nguyên nhân.
