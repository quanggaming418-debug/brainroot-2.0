# PROJECT_STATE — Read before every agent run

**Updated:** 2026-11-20 (initial documentation creation)  
**Phase:** Repository-ready React/Vite bootstrap + docs/assets. Hero React conversion NOT STARTED (BR-T003).  
**Current release:** R0 proposed.  
**Current active Task ID:** None (first recommended: BR-T001).  
**Last verified build:** NOT RUN — initial Vite scaffold; run `npm install` and `npm run build` after importing/cloning.  
**Repository commit SHA:** NOT AVAILABLE / NOT COMMITTED.  
**Deployment URL:** NOT CREATED for Brainroot 2.0.
**Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/`.  

## Established context
- Rebuild website from zero; do **not** reuse old web code as project base.
- Brainroot mission/slogan fixed; two signature colors; Brainie/Rootie mascot; initial games Fact–Act and Ô ăn quan xanh; commercial physical cards matter.
- Users include general public + school/college + teacher/CLB, first pilot ULIS/Hà Nội.
- Need public access + guest trial; only protect paid features at server level.
- Accessibility and environmental source provenance are core requirements.
- Workflow revised to Google AI Studio Build Mode (UI) + Codex (QA and implementation); GitHub repository is canonical source of truth; see `docs/AI_STUDIO_CODEX_WORKFLOW.md`.
- Six Canva-export SVGs from `brainroot.zip` inspected, with three mascot/pose assets and two card showcase assets. See `docs/ASSET_AUDIT.md`.

## Decisions still proposed, awaiting owner approval
- Exact P0 playable game (choose one).
- Brand mascot artwork from `brainroot.zip` is available as 3 Canva SVG wrappers embedding PNGs; copyright/source and usable transparent exports remain to confirm. Font/wordmark still to confirm.
- Auth provider/DB, paid activation product packages, release scope, how many members and time budget.
- R2 improvement candidate: Green Arena Lite — NOT a claim of completed future work.

## Do NOT claim
- No Brainroot 2.0 running implementation, no public pilot in this rebuild.
- No completed paid auth, realtime rooms, AQI feed, chatbot, e-commerce or verified accessible conformity.
- Existing Brainroot survey totals and old website functional descriptions are not independently verified from raw data.

## Immediate next action
Read `planning/TASKS.md` and resolve `BR-T001` with leader; once approved, assign BR-T003 UI task to Google AI Studio Build Mode after brand asset approval. Sync via GitHub and have Codex run checks. Set evidence rules before code work.
