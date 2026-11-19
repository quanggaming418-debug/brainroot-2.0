# Quality Assurance / Definition of Done

## The minimum DoD for every Task ID
- Implementation maps to specific `BR-FR-*` and acceptance criteria.
- All changed files reviewed; no unauthorized scope or secrets.
- Unit tests for logic/game rules; integration tests for API/auth; E2E for important flow where relevant.
- `lint`, `typecheck`, `test`, `build` run where scripts exist; log full command and status, no fake PASS.
- Manual desktop and mobile smoke; keyboard and reduced-motion check for UI tasks.
- Error/empty/loading/retry states accounted for.
- `TASKS`, `PROJECT_STATE`, agent log and `HANDOFF` updated only after tests.

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
- Check loading budget on mid-tier mobile for hero and game; don't let decorative 3D block core content.

## Evidence format
For each test record command, timestamp, environment, commit SHA or `NOT COMMITTED`, output result (PASS/FAIL/NOT RUN), screenshot/trace path and limitations.
