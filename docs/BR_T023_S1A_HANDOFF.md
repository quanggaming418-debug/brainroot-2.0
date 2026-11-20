# BR-T023 — Slice A implementation & Codex QA handoff

**Status:** `IN_PROGRESS / IN_REVIEW` for the first code slice only. **Do not label as a completed game.**  
**Branch:** `codex/br-t023-3d-tabletop-slice-a` (stacked on PR #3, `codex/br-t022-asset-docs-intake`).  
**Prototype preview:** start Vite locally and open `/?preview=oanquan3d`. No public game route is added.

## What has been implemented
- Procedural **real 3D WebGL2** mesh for a tabletop with recessed pits, wooden supports, rings and low-poly seed pieces. A fixed orthographic perspective is used.
- Twelve selectable *proposed* pits: two larger end pits and two rows of five. Coordinates are **visual only**; `OQ-08` remains OPEN.
- DOM controls for all 12 pits, keyboard Arrow navigation, Enter/Space buttons, selected state and status descriptions.
- Demo command `Chuyển thử 1 hạt` **moves just one seed to the next index** as an isolated sandbox effect; it is **not** official Ô ăn quan sowing logic or an approved educational reward.
- Reset to initial sandbox state, readable notice, WebGL-unavailable DOM fallback and reduced-motion compatibility (no continuous animation).
- Lazy-loaded `?preview=oanquan3d` preview branch in `App.tsx`; original landing preserved in the default route.

## Technical tradeoff
The design spec suggests React Three Fiber. This first slice deliberately uses native **WebGL2** with no added packages or lockfile changes, allowing an immediate geometric prototype without putting unresolved dependency installation in the intake PR. Before extending Slice B (rules) or improving materials and 3D animation, Codex should evaluate whether to migrate rendering to **Three.js / React Three Fiber** for maintainability. No game rules depend on the renderer.

## Checks actually performed
- `tsc --strict --noEmit --target ES2022 --lib ES2022,DOM --moduleResolution bundler --module ESNext` on stand-alone `boardRenderer.ts` and `prototypeOnlyModel.ts` copies: **PASS**.
- Node smoke covering 12 pits, 42 initial sandbox seeds, one-seed transfer and invalid-selection stability: **PASS**.
- Full React/Vite typecheck, build, existing unit tests and Chromium integrated view on the GitHub branch: **NOT RUN** (full repository toolchain not available in this session).
- WebGL2 visual smoke attempt in this container: **NOT VERIFIED** — the isolated headless Chromium environment reported WebGL2 unavailable, and navigating to the local test server was blocked by environment policy. This is not an application failure diagnosis.

## Mandatory Codex S1B review
1. Fetch PR #3, then check this stacked PR; verify `git status --short` and branch ancestry.
2. Run `npm ci`, `npm run typecheck`, `npm run build`, existing 5 unit tests and new `tests/br-t023.test.ts` through the established tsx runner.
3. Launch preview and inspect `/?preview=oanquan3d` at 1440×900, 1280×800, 390×844, 320×740 and 200% zoom. Inspect actual shader compile, geometry, pit hit detection, reset, overflow and focus.
4. Check `prefers-reduced-motion`, WebGL-disabled/failure fallback, keyboard selection/arrow traversal, screen-reader labels and contrast. Capture screenshots and console errors.
5. Ensure **no official move validation, turn, winner, score, room, online, payment or login** was added.
6. Fix any defects in the same branch, add evidence to `logs/CODEX_LOG.md`, and update task checklist. Do not merge automatically.

## Known blockers outside Slice A
- `OQ-08` game rules and scoring approval.
- `OQ-06` privacy and `OQ-12` approved backend/hosting for online rooms.
- `BR-T002` commercial artwork rights and D1 final approval for VIS-006/008.
- `BR-T022` remaining Wave 1A asset production, Game Library `BR-T004` and R0 education loop `BR-T006` are separate.
