# Ready-to-paste prompt — Codex (implementation/review task)

Repository = **Brainroot 2.0**; read `AGENTS.md` and current `planning/PROJECT_STATE.md`, `planning/TASKS.md`, `planning/ROADMAP.md`, `logs/HANDOFF.md` before editing. Read `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/GAME_SPEC.md`, `docs/CONTENT_GUIDELINES.md`, `docs/ACCESS_CONTROL.md` and any relevant `.agents/rules` (these are supplementary documents, not automatically enforced).

First do a **read-only discovery**: `git status`, inspect scripts/dependencies, check accepted requirements, identify the exact Task ID and scope. Do not rewrite AI Studio's UI or duplicate another agent's active task. If source/asset/approved rules missing, report BLOCKED and record it rather than fabricating content.

Implement **only the assigned Task ID** (example `BR-T006` one educational game loop) with typed domain data, accessible states, correct source attribution and safe boundaries. Write appropriate tests and execute actual available check commands (`lint`, `typecheck`, `test`, `build`); report PASS/FAIL/NOT RUN honestly.

Before ending: update task and project state; append `logs/CODEX_LOG.md` + index `logs/WORK_LOG.md`; refresh `logs/HANDOFF.md`; list changed files, evidence, risks, exact next task. No commit/push/deployment without explicit permission.
