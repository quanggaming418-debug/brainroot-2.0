# Ready-to-paste prompt — Pre-release quality gate

Perform a **read-only first** audit against `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/QUALITY_AND_TESTING.md`, `docs/ACCESSIBILITY.md`, `docs/HACKATHON_COMPLIANCE.md` and `planning/TASKS.md`.

Report all findings sorted P0/P1/P2 and mapped to `BR-FR-*`, with file path, repro steps, security/UX impact, suggested fix. Check:
- broken public guest/trial flow, incomplete/unresponsive CTAs
- auth/entitlement payload leaks and missing server checks
- source attribution and incorrect environmental claims
- user consent and student privacy
- keyboard/reduced-motion, contrast and screen-reader usability
- mobile performance, build and E2E truthfulness
- audit trail of initial version vs intended 24h improvement

Do not silently fix the whole repo in the audit phase. Ask for approval on critical architecture changes. After approved fixes run exact tests and append your own agent log; mark items as resolved only with proof.
