# Brainroot — Google AI Studio Build Mode + Codex Workflow

**Status:** Proposed SOP / 2026-11-20. **GitHub repository is canonical source of truth.**

## Phase A — Before building
1. Read `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/DESIGN_SYSTEM.md`, `docs/ASSET_AUDIT.md`, `planning/TASKS.md`, `planning/OPEN_QUESTIONS.md`.
2. Have product owner approve BR-T001; upload owner-approved mascot/card artwork and rights inventory; choose **one playable MVP**.
3. Initialize repo with docs + actual asset source/exports + code scaffold. Branch per task (avoid two active writers on same files).

## Phase B — Google AI Studio Build Mode
1. Create web app in Build Mode OR import repo via Add files (+) → Import from GitHub.
2. Provide `prompts/AI_STUDIO_START.md` plus screenshots/videos/assets and relevant doc excerpts. Do not rely on automatic discovery of `AGENTS.md` or `.agents/rules`.
3. Ask for BR-T003 only: landing, layout, design system and lightweight visual interactions. Review mobile and desktop preview, missing assets, actual controls.
4. Sync back to GitHub or download ZIP (backup). Confirm changed files and commit ID. **GitHub sync can be stale or conflict**; manually inspect diff, do not force push. No automatic deploy.
5. If AI Studio cannot write repository Markdown logs, copy the structured session handoff into the task/PR and have Codex enter the verified changes.

## Phase C — Codex validation/implementation
1. In working branch, read `AGENTS.md`, current TASKS/PROJECT_STATE/HANDOFF and inspect actual Git diff.
2. Run real `npm install`/`npm run build`/`npm run lint`/`npm run test` as available; verify responsive, keyboard access, asset licensing and no leaked secrets. Mark `NOT RUN` for checks not available.
3. Fix scoped defects, add tests, update TASKS and append `CODEX_LOG.md`, AI_STUDIO_LOG.md (if needed from confirmed diff), HANDOFF.md.
4. Product owner reviews and merges; repeat for next Task ID.

## Asset pipeline for cinematic effect
- Reference art style → artwork on separate layers (back/mid/front/mascots) → optimized WebP/PNG/SVG → CSS transforms/Motion/GSAP → reduced-motion fallback → browser/performance tests.
- Distinguish static bitmap inside SVG from a riggable vector mascot. Use supplied mascots as whole objects initially; create independent eyes/arms/leaves only with approved editable art layers.

## Safety and provenance
- Any LLM API key and paid content entitlements must be enforced server-side, never stored in client code.
- Google AI Studio deployment or public app sharing may expose app source or incur usage costs; review sharing/production limits first.
- No screenshots/data from surveys or pollution monitoring may be mislabeled as verified real-time observations.
