# PROJECT_STATE — Read before every agent run

**Updated:** 2026-11-20 (BR-T003 Hero V4 & App Shell implemented by Google AI Studio; pending Codex review)  
**Phase:** BR-T003 implemented (Design System, Application Shell, Hero V4 & 4-area Ecosystem intro) — `IN_REVIEW`.  
**Current release:** R0 proposed (scope BR-T003 approved; remaining R0 tasks pending).  
**Current active Task ID:** `BR-T003` (`IN_REVIEW` — ready for Codex review & GitHub sync). Next queued: `BR-T004` (after review/approval).  
**Last verified build:** PASS — `npx --yes tsx --test tests/br-t003.test.ts` (5/5 pass), `npm run typecheck`, `npm run build`, and headless Chromium Playwright check across 1440×900, 390×844, 320×740 + reduced-motion (0 console errors). `npm run lint` NOT RUN (no lint script configured in `package.json`).  
**Repository commit SHA:** NOT COMMITTED (no `.git` directory in AI Studio workspace; sync via supported GitHub workflow).  
**Deployment URL:** NOT CREATED for Brainroot 2.0.
**Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/`.  

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
Sync BR-T003 changes to GitHub and have Codex review code, accessibility, and build before marking `BR-T003` `DONE` and proceeding to `BR-T004` (Game Catalog).
