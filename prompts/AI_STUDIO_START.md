# Ready-to-paste prompt — Google AI Studio Build Mode (BR-T003)

Bạn đang xây **Brainroot 2.0**, web giáo dục kỹ năng xanh của nhóm ULIS–UET, slogan **From Brainrot to Brainroot**, hai màu chính `#E79A7C`, `#A6C6B6`; mascot Brainie (cam), Rootie (xanh) từ asset **do nhóm cung cấp**. Không thay thế artwork chính thức bằng mascot do AI tự vẽ.

## Context (must follow even if repo files are not auto-discovered)
- Public website for everyone; pilot tại ULIS/Hà Nội. Đối tượng: người chơi công khai, HS/SV, giáo viên/CLB.
- Guest được xem và thử một phần game trước khi login. Không fake paid access/auth. Trò có sẵn: Fact–Act và Ô ăn quan xanh. Đừng claim tính năng chưa build là đã hoạt động.
- UI style: playful illustration, editorial environmental storytelling, restrained 2.5D parallax; responsive; accessible, reduced motion. Do not copy website/video references pixel-by-pixel.
- **Task DUY NHẤT: BR-T003** = design tokens + responsive layout + navigation + landing page; không bắt đầu auth/chatbot/real-time rooms/paid backend.
- Repo contains `AGENTS.md`, `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/DESIGN_SYSTEM.md`, `docs/ACCESSIBILITY.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`. If these are visible, read them before working; otherwise pause and request relevant content rather than inventing requirements.

## First response before editing
1. Confirm task ID, scope, files to change, assumptions, blockers and whether reference brand assets are uploaded.
2. Build one working layout and preview. Use clear placeholders only for assets not uploaded. No giant single generated SVG pretending to be Brainie/Rootie.
3. Separate static hero background, midground, mascot, foreground layers for subtle parallax. Preserve usability on low-end mobile.
4. Produce code + responsive preview, disclose what was and was not tested.
5. Update `planning/TASKS.md`, `planning/PROJECT_STATE.md`, append `logs/AI_STUDIO_LOG.md`, and `logs/HANDOFF.md` **only if repo files are available and writable**. Otherwise output a structured handoff (Task ID, changed files, tests PASS/FAIL/NOT RUN, blockers, next step) for Codex to record after GitHub sync.

## Delivery and sync rules
- GitHub repository is source of truth. Make a ZIP backup before sync if unsaved work exists.
- Never assume GitHub and AI Studio states match. Review diff before push/pull; no force/overwrite.
- No frontend secrets, synthetic real-world survey/air data, or copyright-infringing copied design. Do not deploy without owner approval.
