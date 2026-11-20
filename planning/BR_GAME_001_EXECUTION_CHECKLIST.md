# BR-GAME-001 — Implementation Checklist (Proposal)

**Date:** 2026-11-20
**Repository baseline:** GitHub main `99eb20b24793` khi soạn kế hoạch
**Trạng thái:** Đặc tả đề xuất. Chưa có prototype 3D hoặc backend multiplayer.
**Scope:** Chỉ dự kiến một slice mới trong Green Play; **không** đánh dấu `BR-T004`, `BR-T006`, `BR-T022` DONE.

**Task ID:** `BR-T023 — Ô ăn quan xanh 3D tabletop visual prototype` (`TODO`). Sau khi Product Owner duyệt phạm vi S0, giao AI Studio dựng S1A và Codex xác minh S1B.

## Sprint-by-slice

| Step | Task / Owner | Status | Deliverable | Exit criteria |
|---|---|---|---|---|
| 0 | Spec review / Owner | PROPOSED | `docs/BR_GAME_001_MVP_SPEC.md` | Xác nhận đây là prototype không thay game R0 |
| 1 | `S1A` 3D UX prototype / AI Studio | TODO | 3D board, fixed camera, pits, pieces, HTML HUD | Desktop QA + keyboard alt, no official scoring |
| 2 | `S1B` frontend QA / Codex | TODO | verify 3D render, performance, a11y | typecheck/build/tests/browser evidence |
| 3 | `S2A` OQ-08 rule decision / Team | BLOCKED | signed 1-page rules + 3 sample games | ADR approved |
| 4 | `S2B` pure engine + local mode / Codex | BLOCKED | deterministic game rules and tests | rule fixtures all pass |
| 5 | `S3A` privacy/backend decision / Owner | BLOCKED | OQ-06, OQ-12 choices | cost/security/consent approved |
| 6 | `S3B` private online room / Codex | BLOCKED | create/join/ready/move/reconnect | two-browser E2E + security tests |
| 7 | `S4` approved green content / Team | BLOCKED | facts/action/source map | BR-T005 approved content, QA |
| 8 | `S5` integration/polish / AI Studio + Codex sequentially | TODO | stable Green Play route | owner approval and regression tests |

## UX/UI checkpoint after each task
- [ ] Actual Git commit and changed files inspected.
- [ ] No regression in original Hero V4, Green Play and 4-world navigation.
- [ ] `VIS-008` marketing concept clearly distinguished from 3D board model.
- [ ] Prototype vs playable status wording accurate.
- [ ] No AI-created copies of official mascots or deck cards.
- [ ] Desktop scene hierarchy works, mobile minimum controls usable.
- [ ] 3D interaction has DOM alternate control, reduced motion, no keyboard trap.
- [ ] Offline/local/game backend state not invented as complete.
- [ ] Latest test evidence written (not just agent claim).
- [ ] Track OQ-08, OQ-01, OQ-06, OQ-12, BR-T002, BR-T005.

## Immediate next task
1. Xác minh branch và commit repo thật. Xin phê duyệt phạm vi S0 cho BR-T023, một sandbox tách riêng khỏi thư viện và demo R0.
2. Giao AI Studio đọc phần Slice A và Acceptance gate S1 của [đặc tả](../docs/BR_GAME_001_MVP_SPEC.md). Dùng handoff S1 trong kit nếu cần. Dựng mesh riêng cho bàn, hốc và quân, camera cố định, chọn ô qua canvas và DOM, reset, fallback WebGL và reduced motion. VIS-008 chỉ tham chiếu mỹ thuật.
3. Bàn giao diff cùng bằng chứng desktop/mobile, thao tác bàn phím, fallback, hiệu năng, typecheck và build cho Codex S1B. Luật/điểm chờ OQ-08. Multiplayer chờ engine đã kiểm chứng và duyệt backend.
