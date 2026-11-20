# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (Intake kỹ thuật VIS-006/VIS-008, kiểm kê mascot nội bộ và đồng bộ BR-GAME-001.)
- **Phase:** M1A — BR-T022 `IN_PROGRESS`. D2 file PASS cho VIS-006/VIS-008; chưa gắn vào app. Chờ duyệt D1 và các asset Wave 1A còn lại.
- **Current release:** R0 proposed (`BR-T003`, `BR-T020` PR #2, `BR-T021` `DONE`; lộ trình ưu tiên MVP giáo dục: `BR-T022 Wave 1A (GATE D1+D2)` → xác minh component anatomy/states → `M2 BR-T004` → `M3 BR-T006`, với `BR-T005` chạy song song).
- **Current active Task ID:** BR-T022 `IN_PROGRESS`. BR-T023 là đề xuất prototype (`TODO`), BR-T004/006 giữ phạm vi.
- **Last verified build:** PASS — typecheck, build, unit 5/5; chi tiết browser và QA asset trong `logs/CODEX_LOG.md`.
- **Repository branch / base:** `codex/br-t022-asset-docs-intake` từ bản `origin/main` cục bộ `99eb20b24793b4d3e6386bfab1ef668c1833992e`.
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

1. Owner review intake, xác nhận D1 VIS-006/VIS-008 và quyền phát hành. Tiếp tục các asset Wave 1A còn lại và anatomy/states trước BR-T004.
2. Sau khi duyệt S0, giao AI Studio `BR-T023` Slice A theo `planning/BR_GAME_001_EXECUTION_CHECKLIST.md`. OQ-08 còn mở. Prototype 3D và backend chưa được xây dựng.
3. Giữ R0 ưu tiên một game giáo dục end-to-end. Tiếp tục BR-T005 và chốt OQ-01 theo lộ trình hiện hành.
