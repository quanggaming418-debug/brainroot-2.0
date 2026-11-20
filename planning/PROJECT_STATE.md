# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (`BR-T021` đóng **`DONE`** sau khi Product Owner phê duyệt GATE A/B/C trên commit `0a735d189885`; `BR-T020` hiệu chỉnh thành **`DONE`** theo PR #2 đã merge; tạo tác vụ kế tiếp **`BR-T022`** — Wave 1A Visual Asset Production & Verification; đã xóa file Master Prompt dư chưa sử dụng trong `public/assets/aistudio/`.)
- **Phase:** M0 (`BR-T021`) **`DONE`** → Chuẩn bị vào **M1A (`BR-T022` — `TODO`)**. Phê duyệt GATE A/B/C chỉ áp dụng cho đặc tả thiết kế, không thay thế duyệt artwork hoàn chỉnh (**GATE D1** & **GATE D2**). Mã nguồn `src/`, `package.json` giữ nguyên nền `BR-T003` + `BR-T020` (không sửa React code, chưa cài dependency, chưa sinh ảnh).
- **Current release:** R0 proposed (`BR-T003`, `BR-T020` PR #2, `BR-T021` `DONE`; lộ trình ưu tiên MVP giáo dục: `BR-T022 Wave 1A (GATE D1+D2)` → xác minh component anatomy/states → `M2 BR-T004` → `M3 BR-T006`, với `BR-T005` chạy song song).
- **Current active Task ID:** `BR-T021` (`DONE` — closeout chờ Codex commit/PR) · Tác vụ kế tiếp: **`BR-T022`** (`TODO`). `BR-T004` chưa bắt đầu (chờ `BR-T022` đạt GATE D1+D2 và xác minh chi tiết component anatomy/states).
- **Last verified build:** Xem phiên Codex gần nhất (`BR-T020` PASS: `typecheck`, `build`, unit 5/5, Playwright Chromium 1440/390/320). Phiên closeout `BR-T021` chỉ cập nhật tài liệu quản trị và xóa file prompt dư không có tham chiếu trong `public/assets/aistudio/` (code build/test: `NOT RUN`).
- **Repository branch / base:** Product Owner xác nhận `BR-T020` đã merge qua **PR #2** và duyệt `BR-T021` trên commit `0a735d189885`. Tuy nhiên, workspace Google AI Studio **không có thư mục `.git`** (`git status`/`git log` trả lỗi `not a git repository`), nên chưa thể tự xác minh Git history, chưa thể commit/push/tạo PR từ container này (**`NOT COMMITTED`**). Cần Codex (có Git CLI) xác minh `main` commit `0a735d189885`, cập nhật `logs/CODEX_LOG.md`, commit lên nhánh riêng và mở PR nhắm vào `main`.
- **Deployment URL:** NOT CREATED for Brainroot 2.0.
- **Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/`.

## Established context
- Rebuild website from zero; do **not** reuse old web code as project base.
- Established frontend stack: **React 19 + TypeScript + Vite 7 + modular standard CSS** (supersedes earlier Next.js/Tailwind proposal in `docs/TECHNICAL_ARCHITECTURE.md`).
- Brainroot mission/slogan fixed; signature colors `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#263B31`, `#63894C` with Be Vietnam Pro typography; original Brainie/Rootie cutouts in `public/assets/hero-v4/` authorized for internal development and prototype testing only (commercial rights remain unverified under `BR-T002`).
- Ecosystem comprises **4 introductory areas**: Green Play, Green Quest, Green Learn, Green Connect (conceptual introductions only in BR-T003).
- Users include general public + school/college + teacher/CLB, first pilot ULIS/Hà Nội.
- Need public access + guest trial; only protect paid features at server level.
- Accessibility and environmental source provenance are core requirements.
- Workflow: Google AI Studio Build Mode (UI) + Codex (QA and implementation); GitHub repository is canonical source of truth; see `docs/AI_STUDIO_CODEX_WORKFLOW.md`.
- Six Canva-export SVGs from `brainroot.zip` inspected, with three mascot/pose assets and two card showcase assets. See `docs/ASSET_AUDIT.md`.

## Decisions still proposed, awaiting owner approval
- Exact P0 playable game (choose one) and full long-term PRD signoff (`BR-T001` only approved for BR-T003 scope).
- Commercial licensing and final publication rights for Brainie/Rootie and Canva-origin assets (`BR-T002` remains `BLOCKED` for commercial release).
- Auth provider/DB, paid activation product packages, release scope, how many members and time budget.
- R2 improvement candidate: Green Arena Lite — NOT a claim of completed future work.

## Do NOT claim
- No completed playable game engine (`BR-T006`), game catalog routes (`BR-T004`), or public pilot in this rebuild.
- No completed paid auth, realtime rooms, AQI feed, chatbot, e-commerce or full WCAG 2.2 AA certification.
- Existing Brainroot survey totals and old website functional descriptions are not independently verified from raw data.

## Immediate next action
1. Đồng bộ các tệp closeout `BR-T021` sang môi trường Codex có `.git` để xác minh `main` commit `0a735d189885` & PR #2, bổ sung `logs/CODEX_LOG.md`, rà soát diff, commit & push lên nhánh riêng và mở PR nhắm vào `main` (không tự merge).
2. Khởi chạy song song **`BR-T005`** (đội nội dung duyệt ≥5 mục Fact–Act kèm nguồn) để không chặn `BR-T006`.
3. Sau khi PR closeout được duyệt/merge → triển khai **`BR-T022` — Wave 1A Visual Asset Production & Verification** (vượt qua **cả 2 cổng tách biệt: GATE D1 Artistic Quality & GATE D2 Technical Integration Readiness**) và **xác minh chi tiết component anatomy/states** trước khi mở `BR-T004` (Game Library với React Router). Giải quyết quyền xuất bản thương mại theo `BR-T002` trước public release.
