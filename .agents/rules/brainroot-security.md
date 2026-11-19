---
trigger: model_decision
description: "Use whenever implementing authentication, payments, activation codes, room sessions, secrets, database or external APIs."
---
# Security & privacy rules
- Read `docs/ACCESS_CONTROL.md`, `docs/DATA_MODEL.md`, `docs/TECHNICAL_ARCHITECTURE.md`.
- Enforce access **server-side** on each restricted data request; frontend hiding is not security.
- Never print/write real API keys, paid activation codes, participant PII or exact location to logs.
- No unapproved cloud resource, migrations, data upload, permissions change or deployment.
- Honor privacy for minors, anonymous room join and least-privilege roles.
- Test negative authorization paths and external-data fallbacks.
