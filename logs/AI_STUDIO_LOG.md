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
