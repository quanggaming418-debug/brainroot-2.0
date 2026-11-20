# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (Master Integrated Website Build — thống nhất thị giác H01–H06, đủ 10 tuyến R0, vòng chơi thử mẫu nội bộ Fact–Act `/games/fact-act/play`, bàn gỗ 3D Three.js Ô ăn quan xanh tích hợp tại `/games/o-an-quan-xanh` & `/?preview=oanquan3d`, Green Quest Lite `/quest`, Green Learn Lite `/learn`, Green Connect `/connect`, About `/about`; trạng thái `IN_REVIEW`, `NOT COMMITTED`.)
- **Phase:** R0 Integrated MVP (`IN_REVIEW` chờ Codex QA/PR và đồng bộ PR #5); `BR-T005` vẫn `BLOCKED` (chờ đội nội dung duyệt thẻ mẫu công khai + nguồn tham khảo); `BR-T002` vẫn `BLOCKED` cho phát hành thương mại; `OQ-01..OQ-13` vẫn `OPEN`.
- **Current release:** R0 Integrated Candidate (`BR-T003` `DONE`, `BR-T020` `DONE` PR #2, `BR-T021` `DONE`, `BR-T004`/`BR-T006`/`BR-T007`/`BR-T011` ở trạng thái `IN_REVIEW` chờ Codex review & duyệt nội dung `BR-T005`).
- **Current active Task ID:** Master Integrated Website Build (`BR-T004` + `BR-T006` + `BR-T007` + `BR-T011` + nâng cấp 3D `BR-T023`) → `IN_REVIEW` (Google AI Studio → Codex review & đối chiếu PR #5).
- **Last verified build:** 2026-11-20: `npm run typecheck` **PASS (0 lỗi toàn repo)**, `npx --yes tsx --test tests/*.test.ts` **PASS (24/24)**, `npm run build` (`vite build`) **PASS**, Playwright Chromium headless **PASS** trên `1440×900`, `1280×800`, `768×1024`, `390×844`, `320×740`, zoom 200% (`720×450`), `prefers-reduced-motion`, hard reload sâu, E2E Fact–Act đủ 3 thẻ + replay, E2E bàn gỗ 3D Three.js + phím mũi tên + 5×3 explorer, E2E Green Quest + Green Learn (0 lỗi console/pageerror, 0 ảnh vỡ, 0 tràn ngang). `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
- **Repository branch / base:** Workspace AI Studio không có `.git` (`NOT COMMITTED`). Lưu ý **chồng lấn cần Codex đối chiếu với PR #5 (`codex/br-t023-slice-b-qa`)** trên các tệp `src/features/oanquan/prototypeOnlyModel.ts` (đã sửa lỗi `TS6133` biến `x` → `_x` và thêm interface `OAnQuanRuleset`) và `src/features/oanquan/OAnQuan3DPrototype.tsx`. Chưa có deploy.
- **Deployment URL:** NOT CREATED for Brainroot 2.0.
- **Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/` & `public/assets/green-play/`.

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
3. Product Owner xác minh quyền phát hành thương mại (`BR-T002`) và cấu hình SPA fallback rewrite về `/index.html` trước khi deploy công khai.
