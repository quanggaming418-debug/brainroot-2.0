# ADR-0003 — Shared root instructions and separate agent work logs

- **Date:** 2026-11-20
- **Status:** PROPOSED
- **Context:** AI Studio và Codex có thể chỉnh cùng repo, đồng bộ qua GitHub; có nguy cơ drift, mất context, ghi đè, tự đánh dấu hoàn thành.
- **Decision proposal:** `AGENTS.md` một nguồn chung; `.agents/rules/` là tài liệu domain tham khảo, không dựa vào cơ chế auto-load của AI Studio; `planning/TASKS.md` status; `logs/AI_STUDIO_LOG.md` và `logs/CODEX_LOG.md` append-only; `logs/HANDOFF.md` trình bày ca tiếp theo; git + test làm bằng chứng.
- **Alternatives:** chỉ prompt chat / hai bộ instructions / hệ task+handoff. Chọn shared rules + logs.
- **Consequences:** thêm chút kỷ luật cập nhật tài liệu; tránh lệch yêu cầu. Quy tắc không thay thế kiểm tra thủ công.
- **Validation:** thử một task UI và một task code, kiểm tra bàn giao đủ Task ID/files/test status.
