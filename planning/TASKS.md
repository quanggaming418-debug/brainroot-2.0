# TASKS — Task Board (single source of truth)

**Status legend:** `TODO` → `IN_PROGRESS` → `IN_REVIEW` → `DONE`; `BLOCKED` khi thiếu input. Chỉ một agent owner/task trong cùng thời điểm.  
**Evidence:** Không đánh `DONE` khi chưa có acceptance test/ảnh/log/commit hoặc owner xác nhận. Ban đầu mọi task đều chưa thực hiện.

| Task ID | Priority | Status | Owner | Dependency | Acceptance / evidence |
|---|---|---|---|---|---|
| BR-T001 | P0 | TODO | unassigned | — | Owner duyệt PRD và 3 quyết định sản phẩm chính; ghi DECISION |
| BR-T002 | P0 | BLOCKED | unassigned | Brand assets from team | Lấy file mascot/logo/fonts và quyền sử dụng; không dùng icon giả làm official |
| BR-T003 | P0 | DONE | Codex (remediation & QA) | T001 (scope BR-T003 approved), T002 (internal dev assets approved) | Hero V4 React/TS, 4 khu vực, tương phản chữ AA trong các trạng thái đã đo, bàn phím/focus, reduced motion và Playwright 1440/390/320 PASS. Typecheck, build, unit 5/5 và npm audit PASS. Bản sửa đã xác minh cục bộ, NOT COMMITTED. Xem `logs/CODEX_LOG.md`. |
| BR-T004 | P0 | TODO | AI Studio candidate | T001 | Game catalog có Fact–Act và Ô ăn quan xanh; states và routes hoạt động |
| BR-T005 | P0 | BLOCKED | Team content reviewer | Source review | Chọn/duyệt ít nhất 5 prompt+answer/source từ kho; tránh claim chưa kiểm chứng |
| BR-T006 | P0 | TODO | Codex candidate | T004,T005 | 1 game demo full loop start→play→feedback→finish, tested |
| BR-T007 | P0 | TODO | AI Studio candidate | T003 | About + contact + source/ownership clear, không bịa team/results |
| BR-T008 | P0 | TODO | Codex candidate | T003,T006,T007 | lint/typecheck/build/test & manual guest E2E; log evidence |
| BR-T009 | P0 | TODO | Team | T008 | Sơ tuyển: demo URL, screenshot, ngắn gọn test report, trạng thái phiên bản; 6 slides |
| BR-T010 | P1 | TODO | unassigned | R0 | Content schema & controlled import; content review workflow |
| BR-T011 | P1 | TODO | unassigned | R0 | Green Quest Lite - one challenge and reflection, consent handling |
| BR-T012 | P1 | BLOCKED | Product owner | privacy/access decision | Auth + basic member progress with server policies |
| BR-T013 | P1 | BLOCKED | Product owner | licensed source | Green Pulse feasibility + provenance UX; do not claim real-time |
| BR-T014 | P1 | TODO | Team | Pilot participants consent | Small UX/content pilot with documented method/results |
| BR-T015 | P1 | TODO | Team | R1 | Baseline snapshot before 24h per BTC rules |
| BR-T016 | R2 candidate | BLOCKED | Team approval + BTC admission | T015 | NEW Green Arena Lite in allowed window; before/after diff and room e2e |
| BR-T017 | P3 | TODO | unassigned | access model approval | Activation code/entitlement + security tests |
| BR-T018 | P3 | TODO | unassigned | knowledgebase approved | Brainroot Buddy bounded FAQ/RAG + source + refusal |
| BR-T019 | P3 | TODO | unassigned | content maturity | Eco Discovery/Word Quest game design + rights review |
| BR-T020 | P1 | IN_REVIEW | Codex | BR-T003 | Hero Ambient Motion Restoration (BR-FR-001, BR-FR-006). Mascot/lá lặp lệch pha, tab ẩn tạm dừng, reduced motion tắt hiệu ứng, giữ layout và focus. Xem kiểm thử 30 giây/3 phút, responsive, runtime, typecheck và build tại `logs/CODEX_LOG.md`. Giới hạn WCAG 2.2.2 ghi tại `docs/ACCESSIBILITY.md`. |
| BR-T021 | P0 | IN_REVIEW | Google AI Studio | BR-T003, BR-T020 | Rev 1.1 sau Design Review (`docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`, `planning/VISUAL_ASSET_REGISTER.md`, `planning/UX_UI_CHECKLIST.md`): đồng bộ minh họa 4 vùng Wave 1A/1B, chuyển cảnh 3 trạng thái H01→H02→H03, phân loại tài sản 6 nhóm animation-ready, tái cân bằng roadmap MVP-first (`BR-T004`→`BR-T006` không bị chặn bởi Wave 1B, `BR-T005` song song), đề xuất React Router cho `BR-T004`, ngân sách ảnh theo Tier A–D và ma trận kiểm soát 8 chiều. NOT COMMITTED; chờ sync GitHub & Owner/Reviewer duyệt trước khi đóng GATE A/B/C. |

## Working rules
- Khi bắt đầu, chuyển `TODO` → `IN_PROGRESS` kèm agent; ghi trong log. Không tự giao thêm nhiều task cùng lúc.
- `BLOCKED` không được tự chuyển `DONE` vì đã viết mockup. Phải có dependency thật.
- Nếu task mới, thêm ID duy nhất và nêu liên hệ `BR-FR-*` từ PRD.
- Mỗi agent phiên làm việc: cập nhật status + kiểm thử + log + handoff.

## Current recommended first task
**BR-T001** trước: xác nhận R0, chọn game playable (Fact–Act sample vs Ô ăn quan xanh quiz), asset logo/mascot có sẵn chưa, người duyệt nội dung. Sau đó BR-T003/004 giao AI Studio (chỉ sau khi chuyển và duyệt mascot asset), BR-T006 giao Codex.
