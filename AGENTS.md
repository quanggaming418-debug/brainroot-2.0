# AGENTS.md — Brainroot 2.0

Hướng dẫn bắt buộc cho coding agents làm việc trong repo mới. Root file dùng chung cho Google AI Studio Build Mode và Codex; **không nhân bản nguyên tắc sang nhiều nguồn dễ mâu thuẫn**.

## Mission & restrictions
- Sứ mệnh: nâng cao nhận thức và kết nối giới trẻ về **kỹ năng xanh thông qua sản phẩm giáo dục tương tác**; không xây một game portal giải trí thuần túy.
- Giữ slogan **From Brainrot to Brainroot**, nhận diện **#E79A7C** và **#A6C6B6**, artwork Brainie/Rootie hợp pháp của nhóm; không tự bịa logo/brand asset.
- Pilot ưu tiên ULIS/Hà Nội, nhưng website công khai phục vụ mọi người; phát triển Desktop-only, bảo đảm tiếp cận, không ép đăng nhập mới xem/được chơi thử.
- **Website cũ chỉ là tài liệu tham chiếu**, không sao chép repository cũ vào repo mới nếu không được chủ dự án duyệt.

## Chế độ phát triển Desktop-only — quyết định Product Owner 24/11/2026
- Áp dụng toàn website và các trò chơi. Ưu tiên desktop UI/UX, art direction, animation, gameplay, trải nghiệm giáo dục và hiệu năng desktop. Tạm dừng phát triển, sửa lỗi bố cục riêng và tối ưu Mobile/Tablet đến khi Product Owner yêu cầu khôi phục.
- Dùng bố cục desktop tối thiểu 1280 CSS px; màn hình nhỏ vẫn truy cập được bằng zoom hoặc cuộn. Giữ mã responsive và asset mobile, giữ chức năng zoom. Tránh chặn truy cập hoặc hiện thông báo về chế độ này.
- Chỉ đổi cấu hình Responsive theo yêu cầu của Product Owner. `VITE_LAYOUT_MODE=responsive` khôi phục viewport và breakpoint gốc, xem [QUALITY_AND_TESTING.md](docs/QUALITY_AND_TESTING.md).
- Test desktop ở 1280×720, 1366×768, 1440×900, 1920×1080. Màn hình nhỏ chỉ smoke test truy cập và lỗi chạy, không dùng làm tiêu chí tối ưu giao diện.

## Start-of-task protocol — ALWAYS
1. Nếu có terminal/Git: `git status --short`; đọc `README.md`, `planning/PROJECT_STATE.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `logs/HANDOFF.md`.
2. Đọc tài liệu chuyên môn có liên quan từ `docs/` (PRD/flows/design/game/data/accessibility/security) và rule `.agents/rules/` nếu phù hợp.
3. Xác định một `TASK-ID`, acceptance criteria, file dự định sửa, rủi ro và kiểm thử. Không tự ý mở rộng scope.
4. Nếu requirement mơ hồ/mâu thuẫn, cập nhật `planning/OPEN_QUESTIONS.md`, dùng giải pháp an toàn tối thiểu hoặc báo để owner quyết định. Không tự biến giả định thành yêu cầu chính thức.

## Implement safely
- **Không** tạo dữ liệu khảo sát giả như dữ liệu thực; số đo AQI phải có nguồn, loại dữ liệu, timestamp và fallbacks.
- **Không** đưa token/API secret/service role key ở frontend, markdown nhật ký, ảnh chụp hoặc commit; dùng `.env.example` với placeholder.
- **Không** dùng ẩn nút frontend như biện pháp bảo vệ thẻ trả phí; quyền đọc và giải mã phải được kiểm tra **trên server**, nguyên tắc tối thiểu quyền.
- Tránh sao chép thương hiệu, giao diện, bộ câu hỏi, media có bản quyền của Kahoot/Wordle/Worldle hay source không rõ license.
- Không đòi đăng nhập cho khách xem nội dung công khai, dùng chơi thử, hoặc người tham gia phòng bằng mã ở phiên demo phù hợp.
- AI helper chỉ được trả lời theo content đã duyệt, phải từ chối trả lời ngoài phạm vi/không biết; không lộ thẻ paid.
- Giữ keyboard access, reduced motion và khả năng thu phóng; không coi canvas/3D là cách duy nhất để hoàn thành flow.

## End-of-task protocol — ALWAYS
1. Chạy các kiểm tra có sẵn liên quan (`typecheck`, `lint`, `unit`, `e2e`, `build` nếu dự án có); **không ghi PASS nếu không chạy thật**.
2. Đối chiếu mọi acceptance criteria của Task ID; ghi `PASS/FAIL/NOT RUN` kèm lệnh và kết quả.
3. Cập nhật **chỉ một** Task ID trong `planning/TASKS.md`, sau đó `planning/PROJECT_STATE.md`.
4. Append vào log riêng: AI Studio → `logs/AI_STUDIO_LOG.md`; Codex → `logs/CODEX_LOG.md`, theo `templates/WORK_LOG_TEMPLATE.md`. Có thể thêm một dòng vào `logs/WORK_LOG.md` làm index.
5. Nếu chuyển ca/agent, cập nhật `logs/HANDOFF.md`: task tiếp, file liên quan, trạng thái kiểm thử, blockers. Không xóa lịch sử.
6. Không tự `commit`, `push`, tạo service/cloud, migrate dữ liệu production, deploy, mua dịch vụ hay đổi secret khi chưa có yêu cầu/cho phép rõ ràng. Ghi rõ trạng thái commit `NOT COMMITTED` nếu chưa được cho phép.
7. Nếu `git status` có thay đổi từ người khác, không overwrite; báo xung đột và dừng file tranh chấp.

## Collaboration: Google AI Studio + Codex
- Một Task ID chỉ có **một agent đang sửa**; dùng branch hoặc working tree riêng và người phụ trách duyệt merge.
- AI Studio Build Mode ưu tiên dựng giao diện, visual prototypes, motion; Codex ưu tiên review và chuẩn hóa frontend, schema, security, logic, tests. Phân công theo Task ID và có review.
- **GitHub/repository là nguồn sự thật**, không tin bản snapshot AI Studio đang đồng bộ nếu chưa kiểm tra commit/changes. Không push trực tiếp chồng lên nhánh người khác.
- AI Studio không mặc nhiên thực hiện được `git status` hoặc toàn bộ test local. Ghi `NOT RUN` và nhờ Codex xác minh sau sync; không giả vờ đã test.
- Nếu AI Studio không truy cập/cập nhật được `AGENTS.md`, `TASKS.md` hoặc log trong phiên hiện tại, phải đưa nội dung liên quan trực tiếp vào prompt, xuất code và yêu cầu Codex cập nhật TASKS/HANDOFF/AI_STUDIO_LOG sau khi xác minh changes.
- `.agents/rules/` chỉ là tài liệu hướng dẫn chuyên biệt; đừng mặc định AI Studio tự động phát hiện các rule theo chuẩn Antigravity IDE.
- Log là **biên bản công việc**, không phải kho lý luận riêng của model. Không ghi secrets, PII, mô tả nội bộ nhạy cảm.
- `AGENTS.md` là quy tắc; `ROADMAP` là kế hoạch; `TASKS` là công việc; `HANDOFF` là ca tiếp theo. Không sao chép trùng nội dung dài.

## Reference docs
`docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/GAME_SPEC.md`, `docs/CONTENT_GUIDELINES.md`, `docs/ACCESS_CONTROL.md`, `docs/ACCESSIBILITY.md`, `docs/HACKATHON_COMPLIANCE.md`.
