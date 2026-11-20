# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (`BR-T021` Rev 1.1 hoàn tất điều chỉnh sau Design Review — 4 vùng minh họa đồng bộ Wave 1A/1B, chuyển cảnh 3 trạng thái H01→H02→H03, phân loại 6 nhóm tài sản animation-ready, roadmap MVP-first, đặc tả React Router cho `BR-T004`, ngân sách ảnh theo Tier A–D và checklist 8 chiều; chờ sync GitHub & kiểm tra để đóng GATE A/B/C.)
- **Phase:** M0 — Master Design Blueprint (`BR-T021` Rev 1.1 `IN_REVIEW`; GATE A, GATE B, GATE C vẫn đang MỞ). Mã nguồn `src/`, `package.json`, `public/` giữ nguyên nền `BR-T003` + `BR-T020` (không chỉnh code, chưa cài dependency, chưa sinh ảnh).
- **Current release:** R0 proposed (phạm vi `BR-T003` & `BR-T020` đã triển khai; roadmap tái cân bằng ưu tiên MVP giáo dục: `Wave 1A` → `M2 BR-T004` → `M3 BR-T006` với `BR-T005` chạy song song, không để Wave 1B chặn MVP).
- **Current active Task ID:** `BR-T021` (`IN_REVIEW` — Rev 1.1). `BR-T004` chưa bắt đầu (chờ đóng GATE A/B/C và duyệt cài `react-router-dom`).
- **Last verified build:** Xem phiên Codex gần nhất (`BR-T020` PASS: `typecheck`, `build`, unit 5/5, Playwright Chromium 1440/390/320). Các phiên `BR-T021` (Rev 1.0 & Rev 1.1) chỉ cập nhật tài liệu Markdown, không chạm mã ứng dụng (code build/test: `NOT RUN`).
- **Repository branch / base:** Không xác minh được bằng Git CLI (workspace AI Studio không có `.git`). **Lưu ý sai lệch:** Product Owner xác nhận `BR-T003` và `BR-T020` đã merge vào `main`, nhưng `planning/TASKS.md` và `logs/HANDOFF.md` trước phiên vẫn ghi `BR-T020` ở `IN_REVIEW` trên nhánh `codex/hero-ambient-motion`; cần đối chiếu khi sync GitHub. Toàn bộ thay đổi `BR-T021` Rev 1.1 đang ở trạng thái **NOT COMMITTED**.
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
1. Đồng bộ các tài liệu `BR-T021` (Rev 1.1) lên GitHub để Product Owner & Reviewer kiểm tra trực tiếp Markdown trước khi đóng **GATE A** (IA & React Router spec), **GATE B** (Storyboard 3 trạng thái chuyển cảnh & 4 vùng đồng bộ) và **GATE C** (Visual Asset Register 6 nhóm animation-ready & Wave 1A/1B).
2. Đối chiếu trạng thái merge thực tế của `BR-T020` trên `main` khi sync GitHub và chạy song song **`BR-T005`** (đội nội dung duyệt >=5 mục Fact–Act kèm nguồn).
3. Sau khi đóng GATE A/B/C → thực hiện **Wave 1A Asset Production & Verification (GATE D)** để mở khóa trực tiếp **`BR-T004` (Game Library với React Router)** và nối tiếp sang **`BR-T006` (Playable Loop)**, không để Wave 1B trang chủ chặn MVP giáo dục. Giải quyết quyền xuất bản thương mại theo `BR-T002` trước khi public release.
