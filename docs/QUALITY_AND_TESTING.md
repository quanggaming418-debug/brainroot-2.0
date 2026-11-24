# Quality Assurance / Definition of Done

## The minimum DoD for every Task ID
- Implementation maps to specific `BR-FR-*` and acceptance criteria.
- All changed files reviewed; no unauthorized scope or secrets.
- Unit tests for logic/game rules; integration tests for API/auth; E2E for important flow where relevant.
- `lint`, `typecheck`, `test`, `build` run where scripts exist; log full command and status, no fake PASS.
- Desktop checks and one small-screen access smoke. Check keyboard, zoom and reduced motion on UI tasks.
- Error/empty/loading/retry states accounted for.
- `TASKS`, `PROJECT_STATE`, agent log and `HANDOFF` updated only after tests.

## Current viewport coverage

The sitewide Desktop-only decision in [AGENTS.md](../AGENTS.md) supersedes mobile layout test gates in older specs and handoffs. Run visual and interaction checks at **1280×720, 1366×768, 1440×900, and 1920×1080**. Use one small-screen smoke to confirm the desktop layout opens and public routes still work. Keep browser zoom available. Treat horizontal scrolling at smaller sizes as expected for the 1280 CSS px layout.

For an explicitly authorized responsive recovery, set `VITE_LAYOUT_MODE=responsive` before starting Vite or building. Restart or rebuild after changing it. The default restores Desktop-only for all hosts and dev entry points. Check the published FULL mode separately from the layout setting.

## Priority E2E scenarios
1. Guest opens landing → catalog → playable sample → feedback (no login).
2. Negative entitlement: member without pack cannot fetch paid question payload through direct API.
3. Positive entitlement: valid purchaser gets only purchased pack.
4. Host creates room → guest joins → receives correct prompt → submits once → host gets aggregate.
5. Missing network / malformed content / unsupported API gracefully degrade.
6. Keyboard-only complete guest flow, focus visible, axe scan, reduced-motion fallback.
7. AQI unavailable/stale data displays clear status and provenance rather than invented value.

## Proposed baseline tests
- Vitest/Jest or built-in test runner (choose after stack decision) for game logic and parsers.
- Playwright for E2E on selected browsers.
- Axe-core for automated accessibility heuristics; **manual testing still required**.
- Check the desktop loading budget for the hero and games. Keep core content available while decorative 3D loads.

## Evidence format
For each test record command, timestamp, environment, commit SHA or `NOT COMMITTED`, output result (PASS/FAIL/NOT RUN), screenshot/trace path and limitations.
