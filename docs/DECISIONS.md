# Decision Register

Mỗi quyết định lớn viết một bản ADR độc lập, *proposed/accepted/superseded*, nêu bối cảnh, lựa chọn, hậu quả. Ghi bản thay thế, **không xóa lịch sử**.

| ADR | Decision | Status |
|---|---|---|
| [0001](decisions/0001-public-trial-and-paid-entitlements.md) | Public discovery + server-side paid entitlement | PROPOSED |
| [0002](decisions/0002-release-first-game-loop.md) | MVP = one functional educational game loop | PROPOSED |
| [0003](decisions/0003-shared-agent-rule-and-log-system.md) | One root AGENTS.md, per-agent logs, shared tasks | PROPOSED |
| [0005](decisions/0005-public-20-card-truth-or-dare.md) | Công khai 20/63 thẻ Truth or Dare trên bản chơi thử web | ACCEPTED |
| [0006](decisions/0006-oanquan-v2-2-5d-architecture.md) | Ô ăn quan xanh: chuyển 3D (Three.js) sang 2.5D SVG/CSS, tách Engine – Content – UI | ACCEPTED |

Use short format adapted from [MADR](https://github.com/adr/madr); no external wording copied.

## ADR-0004 (Proposed): Google AI Studio + Codex
- Replace Antigravity IDE in proposed workflow with Google AI Studio Build Mode for UI prototyping and Codex for implementation/review.
- Repository/GitHub remains canonical; sync snapshots must be diff-verified.
- AI Studio log is `logs/AI_STUDIO_LOG.md`; Codex log is `logs/CODEX_LOG.md`; task/handoff protocols unchanged.
- Full rationale in `docs/AI_STUDIO_CODEX_WORKFLOW.md`; requires owner approval.
