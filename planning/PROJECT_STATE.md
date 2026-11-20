# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (Codex hoàn tất sửa và xác minh độc lập BR-T003.)
- **Phase:** BR-T003 — `DONE` theo tiêu chí nghiệm thu cục bộ. Bản sửa chưa commit.
- **Current release:** R0 proposed (scope BR-T003 approved; remaining R0 tasks pending).
- **Current active Task ID:** Không có. `BR-T004` đang chờ giao riêng.
- **Last verified build:** PASS — `npm run typecheck`, `npm run build`, `npx --yes tsx --test tests/br-t003.test.ts` (5/5), `npm audit` (0 lỗ hổng). Playwright Chromium trên bản build PASS ở 1440×900, 390×844, 320×740, có kiểm tra focus, motion, tương phản chữ và 0 lỗi console. Xem `logs/CODEX_LOG.md`.
- **Repository branch / HEAD:** `codex/br-t003-remediation` / `275f5ed4d64811c079540135ef42abc4d447b634`. Bản sửa nằm trong working tree, **NOT COMMITTED**.
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
Owner xem diff bản sửa BR-T003 và quyết định commit. BR-T004 cần được giao riêng. Giải quyết quyền xuất bản artwork theo BR-T002 trước khi đưa artwork lên bản công khai.
