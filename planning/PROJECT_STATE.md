# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (BR-T021 hoàn tất gói đặc tả UX/UI Master Blueprint, Storyboard H01–H06, Visual Asset Register & Checklist; chờ Owner duyệt GATE A/B/C.)
- **Phase:** M0 — Master Design Blueprint (`BR-T021` `IN_REVIEW`). Mã nguồn `src/` giữ nguyên nền `BR-T003` + `BR-T020` (không chỉnh code trong `BR-T021`).
- **Current release:** R0 proposed (scope BR-T003 & BR-T020 đã triển khai; M1/M2 chờ duyệt GATE A/B/C).
- **Current active Task ID:** `BR-T021` (`IN_REVIEW`). `BR-T004` chưa bắt đầu (chờ duyệt GATE A/B/C/D).
- **Last verified build:** Xem phiên Codex gần nhất (`BR-T020` PASS: `typecheck`, `build`, unit 5/5, Playwright Chromium 1440/390/320). Phiên `BR-T021` chỉ tạo/cập nhật tài liệu Markdown, không thay đổi mã nguồn ứng dụng (build/test: NOT RUN trong phiên này).
- **Repository branch / base:** Không xác minh được bằng Git CLI (workspace AI Studio không có `.git`). **Lưu ý sai lệch:** Product Owner xác nhận `BR-T003` và `BR-T020` đã merge vào `main`, nhưng `planning/TASKS.md` và `logs/HANDOFF.md` đồng bộ trước phiên vẫn ghi `BR-T020` ở `IN_REVIEW` trên nhánh `codex/hero-ambient-motion`; cần đối chiếu khi sync GitHub. Thay đổi `BR-T021` đang ở trạng thái **NOT COMMITTED**.
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
1. Product Owner duyệt **GATE A** (IA), **GATE B** (Storyboard H01–H06) và **GATE C** (Visual Asset Register & Wave 1A) từ `BR-T021`.
2. Đồng bộ trạng thái merge thực tế của `BR-T020` trên `main` khi sync GitHub.
3. Sau khi duyệt GATE A/B/C, triển khai sản xuất & kiểm duyệt tài sản Wave 1A (**GATE D**) trước khi vào M1 hoặc `BR-T004`. Giải quyết quyền xuất bản artwork theo `BR-T002` trước khi đưa artwork lên bản công khai.
