# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (Public-Facing Footer & About Redesign: tái thiết kế Footer và trang `/about` theo chuẩn website giáo dục công chúng; loại bỏ các nội dung tiến độ phát triển/báo cáo quản trị khỏi giới thiệu thương hiệu trên Homepage `#about`, `/about` và Footer; đồng bộ thông điệp thương hiệu giữa Homepage, `/about`, `/connect` và Footer; bảo toàn Hero V4, mascot, Four Garden Windows, logic game, thông báo giới hạn tại trang sản phẩm, router và cấu hình GitHub Pages; trạng thái `IN_REVIEW`, `NOT COMMITTED`.)
- **Phase:** R0 Integrated MVP (`IN_REVIEW` chờ Product Owner duyệt thiết kế Footer & About công khai, báo cáo audit & Codex QA/PR); `BR-T005` vẫn `BLOCKED` (chờ đội nội dung duyệt thẻ mẫu công khai + nguồn tham khảo & chốt luật chính thức `Brainroot - Truth or Dare`); `BR-T002` vẫn `BLOCKED` cho phát hành thương mại; `OQ-01..OQ-13` vẫn `OPEN`.
- **Current release:** R0 Integrated Candidate (`BR-T003` `DONE`, `BR-T020` `DONE` PR #2, `BR-T021` `DONE`, `BR-T022`/`BR-T004`/`BR-T006`/`BR-T007`/`BR-T011`/`BR-T024` + Public-Facing Footer & About Redesign ở trạng thái `IN_REVIEW`).
- **Current active Task ID:** Public-Facing Footer & About Redesign (`IN_REVIEW` — Google AI Studio → Product Owner & Codex review).
- **Last verified build:** 2026-11-20: `npm run typecheck` **PASS (0 lỗi toàn repo)**, `npx --yes tsx --test tests/*.test.ts` **PASS (29/29, gồm test #29 kiểm tra Footer/About công khai không chứa nội dung tiến độ dự án)**, `npm run build` (`vite build`) **PASS**, Playwright Chromium headless trên `http://localhost:3000/brainroot-2.0/` **PASS** trên `1440×900` và `390×844` (Footer Desktop `277px` / Mobile `494px → 457px`, 0 tràn ngang, 0 lỗi console, 3/3 CTA trên `/about` điều hướng đúng `/games`, `/quest`, `/learn`, 0 chuỗi cấm). `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
- **Repository branch / base:** Workspace AI Studio không có `.git` (`NOT COMMITTED`). Giữ nguyên cấu hình GitHub Pages `BR-T024` (`base: '/brainroot-2.0/'`, `publicUrl()`). Lưu ý chồng lấn PR #5 (`src/features/oanquan/`) vẫn cần Codex đối chiếu khi sync. Chưa có deploy.
- **Deployment URL:** Mục tiêu [GitHub Pages](https://quanggaming418-debug.github.io/brainroot-2.0/). BR-T024 IN_REVIEW, cấu hình trên nhánh riêng. Chưa deploy ở thời điểm kiểm tra, URL trả HTTP 404; chờ merge, Actions và smoke test trực tiếp.
- **Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/`, `public/assets/green-play/` & `public/assets/home/garden/`.

- **BR-T022 garden integration:** 4 WebP 1120×747 tại `public/assets/home/garden/` (`green-play.webp`, `green-quest.webp`, `green-learn.webp`, `green-connect.webp`) đã được tích hợp và tinh chỉnh hoàn thiện trên trang chủ H03 (`EcosystemSection`) qua `publicUrl()`. Ảnh chụp trước/sau Desktop (`1440px`) và Mobile (`390px`) đã sẵn sàng chờ Product Owner duyệt; chờ Codex review diff & mở PR.

- **BR-T025:** Intake Truth or Dare V1 `IN_REVIEW`; 19 SVG trang trí trong `public/assets/truth-or-dare/v1/experience/`, QA file và URL base PASS. Xem handoff ở `design/truth-or-dare-v1/README.md`; tích hợp UI và duyệt nội dung là bước riêng.

## Established context
- Rebuild website from zero; do **not** reuse old web code as project base.
- Established frontend stack: **React 19 + TypeScript + Vite 7 + React Router (`react-router-dom`) + Three.js (`three`) + modular standard CSS** (không cài Tailwind CSS).
- Brainroot mission/slogan fixed; signature colors `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#263B31`, `#63894C` with Be Vietnam Pro typography; original Brainie/Rootie/Fact–Act cutouts in `public/assets/hero-v4/` và VIS-006/VIS-008 trong `public/assets/green-play/` hiện dùng cho phát triển/prototype nội bộ (`BR-T002` / D1 vẫn mở cho phát hành thương mại).
- Unified 10-route R0 experience: `/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `*` (plus preserved `/?preview=oanquan3d`).
- Users include general public + school/college + teacher/CLB, first pilot ULIS/Hà Nội; 100% public guest exploration without mandatory login.
- Strict educational truthfulness: `APPROVED_PUBLIC_CARDS = []` pending `BR-T005`; internal demo fixtures (`Fact–Act`) and draft reference cards (`Green Learn`) are explicitly labeled and separated; zero fabricated citations, URLs, stats, emails, or official Ô ăn quan rules (`OQ-08` remains `OPEN`).

## Decisions still proposed, awaiting owner approval
- Full long-term PRD & official R0 game choice (`BR-T001` / `OQ-01`).
- Commercial licensing and final publication rights for Brainie/Rootie, Fact–Act deck, VIS-006/VIS-008 (`BR-T002` remains `BLOCKED` for commercial release).
- Content approval (`BR-T005`): >=5 verified Fact–Act public sample cards + verified sources for Green Learn 5 topics + official Ô ăn quan xanh digital rules (`OQ-08`) + official contact channels for `/connect` & `/about`.

## Do NOT claim
- No team-approved public Fact–Act sample cards (`BR-T005` vẫn `BLOCKED`), no official Ô ăn quan xanh rules (`OQ-08` vẫn `OPEN`), and no public pilot or production deploy yet.
- No completed paid auth, realtime multiplayer rooms, AQI feed, chatbot, e-commerce, or full WCAG 2.2 AA certification.

## Immediate next action
1. Codex rà soát diff toàn bộ bản Master Integrated Build trên nhánh Git, đối chiếu và hòa giải chồng lấn với **PR #5** (`src/features/oanquan/prototypeOnlyModel.ts`, `src/features/oanquan/OAnQuan3DPrototype.tsx`), chạy kiểm thử độc lập (`typecheck`, `build`, unit 24/24, axe/Playwright) và mở PR review.
2. Đội nội dung thực hiện **`BR-T005`** để thay `INTERNAL_DEMO_FIXTURES` bằng `APPROVED_PUBLIC_CARDS` có nguồn xác minh, chốt `OQ-08` cho luật Ô ăn quan xanh, và cung cấp kênh liên hệ chính thức cho `/connect` & `/about`.
3. Product Owner review PR BR-T024 và quyền phát hành (`BR-T002`). Sau merge kiểm tra job `github-pages` và URL thật. Cấu hình fallback Pages đã chuẩn bị.
