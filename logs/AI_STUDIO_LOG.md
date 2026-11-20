# AI_STUDIO_LOG — Append-only

- **Started:** 2026-11-20
- **Status:** NO GOOGLE AI STUDIO IMPLEMENTATION ENTRIES YET
- **Policy:** Sau mỗi phiên Build, ghi task, file đã thay đổi, GitHub commit nếu có, điều đã kiểm thử thật, lỗi còn lại và trạng thái đồng bộ. Nếu AI Studio không ghi được file, Codex cập nhật **sau khi xác minh** diff từ GitHub; không coi mô tả của agent là bằng chứng kiểm thử.

---

<!-- Append NEW sessions below. Do not edit or delete old sessions. -->

## Session: 2026-11-20 03:45+07:00 — Google AI Studio — BR-T003

- **Task & goal:** Triển khai `BR-T003` — Design System tokens, Application Shell, Hero V4 React/TypeScript (giữ nguyên artwork gốc Brainie/Rootie & 3 lớp cảnh), điều hướng neo trong trang và phần giới thiệu Hệ sinh thái gồm đủ 4 khu vực (`Green Play`, `Green Quest`, `Green Learn`, `Green Connect`).
- **Status before → after:** `TODO` → `IN_REVIEW` (chờ Codex review và đồng bộ GitHub; không tự đóng `DONE`).
- **Read context:** `AGENTS.md`, `README.md`, `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/USER_FLOWS.md`, `docs/ACCESSIBILITY.md`, `docs/ASSET_AUDIT.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/HANDOFF.md`, `reference/hero-v4/*`.
- **Files changed:**
  - `index.html` — Đồng bộ title, meta description, OpenGraph, Be Vietnam Pro weights 400–900, preload `hero-garden-v4.webp`.
  - `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/landing.css`, `src/styles.css` — Hệ thống design tokens theo bảng màu Brainroot, tăng nhẹ tương phản chữ phụ cho WCAG AA, layout Hero V4 responsive (1440/390/320), reduced-motion.
  - `src/data/landing.ts` — Tách dữ liệu điều hướng, Hero copy/assets, 4 khu vực Hệ sinh thái (`Green Play`, `Green Quest`, `Green Learn`, `Green Connect`), About và Footer.
  - `src/utils/parallax.ts`, `src/hooks/useHeroParallax.ts` — Logic parallax 3 lớp biên độ bảo thủ (`< 12px`), tắt trên mobile (`<= 720px`) và `prefers-reduced-motion`.
  - `src/components/landing/SiteHeader.tsx`, `HeroBackground.tsx`, `MascotLayer.tsx`, `PrimaryCTA.tsx`, `HeroSection.tsx`, `EcosystemSection.tsx`, `AboutSection.tsx`, `SiteFooter.tsx` — Các component React/TS độc lập, semantic landmarks (`banner`, `navigation`, `main`, `contentinfo`), menu mobile hỗ trợ phím `Escape` và click ngoài.
  - `src/App.tsx` — Lắp ráp shell hoàn chỉnh với skip-link tới `#worlds`.
  - `tests/br-t003.test.ts` — 5 unit tests kiểm tra logic parallax và toàn vẹn dữ liệu nội dung/anchor/asset.
  - `docs/TECHNICAL_ARCHITECTURE.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật trạng thái và bàn giao.
- **User-visible behavior changed:** Thay thế màn hình bootstrap bằng trang đích Brainroot Hero V4 hoàn chỉnh bằng React/TypeScript với 1 CTA chính cuộn mượt tới `#worlds`, 4 thẻ giới thiệu Hệ sinh thái, mục Về Brainroot và menu di động điều khiển được bằng bàn phím.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/br-t003.test.ts`: PASS (5/5 tests pass).
  - `npm run typecheck`: PASS (`tsc --noEmit` exit 0).
  - `npm run build`: PASS (`vite build` exit 0, 40 modules transformed).
  - `npm run lint`: NOT RUN (`package.json` chưa có script `lint` / ESLint).
  - Playwright headless Chromium trên `http://localhost:3000`: PASS — Desktop 1440×900 (`scrollWidth 1440/1440`, Be Vietnam Pro loaded, 7/7 ảnh tải, 4 thẻ hệ sinh thái hiển thị trọn vẹn sau khi bấm CTA, Tab đầu vào `skip-link`), Mobile 390×844 (`scrollWidth 390/390`, mở/đóng menu mobile, nhấn `Escape` đóng menu và trả focus về `.nav-toggle`, chọn link đóng menu và cuộn đúng), Small mobile 320×740 (`scrollWidth 320/320`, `heroHeight 740`, `scrollHintBottom 728`, lá không đè tiêu đề), Reduced motion (`animationName: none`, `layerTransform: none`), 0 lỗi console và 0 cảnh báo.
- **Acceptance criteria:** AC-1 Brand tokens & Be Vietnam Pro PASS; AC-2 Hero V4 modular React & single CTA PASS; AC-3 Official Brainie/Rootie & depth layers preserved PASS; AC-4 4 Ecosystem introductory areas PASS; AC-5 Responsive 1440/390/320 zero overflow PASS; AC-6 Mobile menu & Escape & keyboard focus PASS; AC-7 Reduced motion & 0 console errors PASS; AC-8 ESLint script NOT RUN (chưa cấu hình).
- **Bugs / tradeoffs / risk:**
  - Bản quyền thương mại của mascot/asset Canva (`BR-T002`) vẫn cần nhóm xác minh riêng trước khi phát hành chính thức.
  - Font Be Vietnam Pro tải từ Google Fonts CDN (chưa có font cục bộ dự phòng khi offline hoàn toàn).
  - `package.json` chưa có script `lint` và test runner tự động; chưa kiểm thử screen reader thật (VoiceOver/NVDA) hoặc axe-core đầy đủ.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không chứa thư mục `.git`; cần đồng bộ qua luồng GitHub sync và để Codex kiểm tra diff).
- **What remains / next task:** Codex review PR/diff cho `BR-T003`, bổ sung cấu hình lint/a11y check nếu cần, xác nhận `DONE` trước khi chuyển sang `BR-T004` (Game Catalog).
- **Owner approval required:** Không cho bước review hiện tại; cần duyệt phạm vi trước khi khởi động `BR-T004`.

## Session: 2026-11-20 09:30+07:00 — Google AI Studio — BR-T021

- **Task & goal:** Lập đặc tả thiết kế & kiểm soát phát triển toàn diện (`BR-T021` — UX/UI Master Blueprint, Homepage Storyboard H01–H06, Visual Asset Register & Briefs, Persistent UX/UI Checklist) để trình duyệt **GATE A, GATE B và GATE C**. Không chỉnh sửa mã nguồn ứng dụng, không sinh ảnh, không bắt đầu `BR-T004`.
- **Status before → after:** `NEW` → `IN_REVIEW` (dừng tại cổng phê duyệt GATE A/B/C của Product Owner).
- **Read context:** `AGENTS.md`, `README.md`, `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/ACCESSIBILITY.md`, `docs/ASSET_AUDIT.md`, `docs/GAME_SPEC.md`, `docs/AI_STUDIO_CODEX_WORKFLOW.md`, `docs/CONTENT_GUIDELINES.md`, `docs/ACCESS_CONTROL.md`, `docs/DATA_MODEL.md`, `docs/QUALITY_AND_TESTING.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `planning/OPEN_QUESTIONS.md`, `logs/HANDOFF.md`, `logs/CODEX_LOG.md`, mã nguồn `src/` & ảnh `public/assets/hero-v4/fact-act-deck.webp`.
- **Files changed:**
  - `docs/UX_UI_MASTER_BLUEPRINT.md` (mới) — Kiểm toán hiện trạng, IA (R0 vs tương lai), 6 hành trình người dùng, đặc tả `/games` & `/games/*` (`BR-T004`/`BR-T006`), Global Design System (15 components, responsive + zoom 200%), Motion spec & WCAG 2.2.2 boundary, Roadmap M0–M4, phản biện 10 tiêu chí & 6 rủi ro.
  - `docs/UX_UI_STORYBOARD.md` (mới) — Kịch bản trực quan H01–H06 cho trang chủ theo định hướng ONE LIVING WORLD.
  - `planning/VISUAL_ASSET_REGISTER.md` (mới) — Kiểm kê `EX-001..009`, sổ đăng ký `VIS-001..010` đủ 19 trường, đề xuất Wave 1A tối giản và Production Briefs đầy đủ 13 mục cho các tranh mới.
  - `planning/UX_UI_CHECKLIST.md` (mới) — 18 mục kiểm soát liên tục (`UX-001..018`), quy trình checkpoint và báo cáo `BRAINROOT UX/UI CHECKPOINT` hiện hành.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ tác vụ `BR-T021` và báo cáo sai lệch tài liệu `BR-T020`.
- **User-visible behavior changed:** Không có (chỉ tạo/cập nhật tài liệu thiết kế và quản trị; mã nguồn ứng dụng giữ nguyên 100%).
- **Tests actually executed:**
  - `git status --short`, `git branch -a`, `git log -n 5 --oneline`: Không khả dụng (`fatal: not a git repository` — container không chứa `.git`).
  - `ls -la public/assets/hero-v4/` & kiểm tra trực quan `fact-act-deck.webp`: PASS (xác nhận đủ 10 file trong `public/assets/hero-v4/`, gồm `fact-act-deck.webp` 91.986 bytes).
  - `npm run typecheck`, `npm run build`, `npm run lint`, unit/Playwright: `NOT RUN` (không thay đổi mã nguồn ứng dụng trong phiên `BR-T021`).
- **Acceptance criteria:** GATE A (IA & 6 journeys) sẵn sàng duyệt; GATE B (Storyboard H01–H06) sẵn sàng duyệt; GATE C (Asset Register + Briefs + Wave 1A) sẵn sàng duyệt; 4 file kiểm soát đã được tạo đầy đủ; không chạm mã ứng dụng hay sinh ảnh.
- **Bugs / tradeoffs / risk:**
  - Sai lệch giữa xác nhận của Owner (`BR-T020` đã merge vào `main`) và văn bản cũ trong `TASKS.md`/`HANDOFF.md` (`IN_REVIEW`), chưa tự kiểm chứng được qua Git CLI do thiếu `.git`.
  - Chi phí & tính đồng bộ phong cách của các tranh minh họa mới là rủi ro chính → đã giảm thiểu bằng đề xuất Wave 1A tối giản (chỉ 3 tranh raster mới + 3 bộ SVG nội bộ + tái sử dụng `fact-act-deck.webp`).
- **Git commit SHA:** `NOT COMMITTED` (workspace không có `.git`).
- **What remains / next task:** Owner duyệt GATE A/B/C → chuyển sang sản xuất & kiểm duyệt tài sản Wave 1A (**GATE D**), sau đó mới triển khai M1 hoặc `BR-T004`.
- **Owner approval required:** Có — Phê duyệt GATE A, GATE B, GATE C và chiến lược router trước khi mở triển khai tiếp theo.

## Session: 2026-11-20 11:15+07:00 — Google AI Studio — BR-T021 (Rev 1.1 Design Review Refinement)

- **Task & goal:** Tiếp thu 7 quyết định Design Review của Product Owner cho `BR-T021` và cập nhật đồng bộ 4 tài liệu thiết kế lõi (`UX_UI_MASTER_BLUEPRINT.md`, `UX_UI_STORYBOARD.md`, `VISUAL_ASSET_REGISTER.md`, `UX_UI_CHECKLIST.md`) lên Rev 1.1, chuẩn bị sạch để đồng bộ lên GitHub trước khi Owner/Reviewer đóng **GATE A, GATE B, GATE C**. Tuyệt đối không sửa mã nguồn ứng dụng, không cài dependency, không sinh ảnh, không khởi chạy `BR-T004`.
- **Status before → after:** `IN_REVIEW` (Rev 1.0) → `IN_REVIEW` (Rev 1.1; GATE A/B/C vẫn mở, chờ sync GitHub và kiểm tra Markdown).
- **Read context:** 4 tài liệu lõi `BR-T021` (Rev 1.0), `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md`, phản hồi Design Review của Product Owner.
- **Files changed:**
  - `docs/UX_UI_MASTER_BLUEPRINT.md` — Cập nhật Rev 1.1: đồng bộ hệ minh họa 4 vùng (Wave 1A nhẹ đồng bộ thay thẻ Unicode phẳng → Wave 1B toàn cảnh); đề xuất **React Router** cho `BR-T004` kèm route map, Back/Forward, khôi phục cuộn & focus, fallback `*`, yêu cầu SPA hosting fallback và điều hướng neo trang chủ/trang con (chưa cài dependency); phân tầng ngân sách ảnh Tier A–D theo kích thước/vai trò/biến thể desktop–mobile/lazy-load/đo LCP–CLS thay cho giới hạn cứng 70–120 KB; tái cân bằng roadmap MVP-first (`Wave 1A` → `M2 BR-T004` → `M3 BR-T006` với `BR-T005` song song, không để Wave 1B chặn MVP).
  - `docs/UX_UI_STORYBOARD.md` — Cập nhật Rev 1.1: bổ sung đặc tả chuyển cảnh 3 trạng thái `H01 → H02 → H03` (trước khi rời Hero / trong đoạn chuyển vườn / khi vào 4 vùng khám phá) giải thích rõ phối cảnh, tầng tán lá cutout, ánh sáng 35° trái-trên, căn trục lối đá 50%, liên tục màu sắc cho cả desktop và mobile; đồng bộ lộ trình hình ảnh 4 vùng Wave 1A (`VIS-002` + `VIS-003A..005A`) → Wave 1B (`VIS-003B..005B`).
  - `planning/VISUAL_ASSET_REGISTER.md` — Cập nhật Rev 1.1: phân loại tường minh 6 nhóm kiến trúc tài sản sẵn sàng cho chuyển động (`Flattened background illustration`, `Transparent foreground cutout`, `Independent animated object`, `Reusable SVG decoration`, `Actual product artwork`, `HTML/UI layer`); tách rõ danh sách đối tượng chuyển động độc lập vs lớp tĩnh; bảo toàn Brainie/Rootie gốc; bổ sung `VIS-003A..005A` (Wave 1A đồng bộ), `VIS-003B..005B` (Wave 1B) và phân tầng ngân sách Tier A–D.
  - `planning/UX_UI_CHECKLIST.md` — Cập nhật Rev 1.1: nâng cấp ma trận nghiệm thu 8 chiều độc lập (`UX`, `UI`, `Asset Avail`, `Asset Integ`, `Interact`, `A11y`, `Resp`, `Browser QA`) cho 17 hạng mục (`UX-001..017`: `PASS` 2/17, `IN_REVIEW` 2/17, `IN_PROGRESS` 1/17, `AWAITING_ASSETS` 6/17, `NOT_STARTED` 3/17, `BLOCKED` 3/17), đính kèm bằng chứng & giới hạn đã biết, và cập nhật `BRAINROOT UX/UI CHECKPOINT`.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Ghi nhận bản Rev 1.1 chờ sync GitHub & duyệt GATE A/B/C.
- **User-visible behavior changed:** Không có (phiên chỉ sửa tài liệu thiết kế & quản trị; mã nguồn ứng dụng, `package.json`, `public/` giữ nguyên 100%).
- **Tests actually executed:**
  - `npm run typecheck`, `npm run build`, `npm run lint`, unit tests, Playwright: `NOT RUN` (không có thay đổi mã nguồn ứng dụng trong phiên này).
  - Git CLI (`git status` / `git commit`): không khả dụng do workspace AI Studio không có `.git`.
- **Acceptance criteria:** Đáp ứng đầy đủ 7 yêu cầu Design Review trong 4 tài liệu lõi; giữ trạng thái trung thực (GATE A/B/C chưa đóng, không đánh `PASS` khi chưa có bằng chứng kiểm thử); giữ nguyên mã ứng dụng & không cài dependency.
- **Bugs / tradeoffs / risk:**
  - Cần đồng bộ thủ công/qua GitHub sync để Owner & Reviewer xem trực tiếp diff Markdown trước khi chốt GATE A/B/C.
  - Rủi ro trùng lặp trạng thái `BR-T020` (`IN_REVIEW` trong file quản trị cũ vs xác nhận đã merge `main`) vẫn cần đối chiếu khi đồng bộ GitHub.
  - Wave 1A bổ sung 3 minh họa nhẹ đồng bộ (`VIS-003A..005A`) giúp xóa bỏ chênh lệch thẩm mỹ với `VIS-002` mà không làm chậm `BR-T004`/`BR-T006`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có thư mục `.git`; sẵn sàng đồng bộ lên GitHub).
- **What remains / next task:** Sau khi đồng bộ GitHub và Owner/Reviewer đóng GATE A/B/C → khởi động **Wave 1A Asset Production & Verification (GATE D)** (song song để đội nội dung chạy `BR-T005`), nhằm mở khóa trực tiếp **`BR-T004` (Game Library)** và nối tiếp sang **`BR-T006` (Playable Loop)**.
- **Owner approval required:** Có — Kiểm tra Markdown sau sync GitHub để đóng chính thức **GATE A, GATE B, GATE C** và duyệt phương án **React Router** cho `BR-T004`.

