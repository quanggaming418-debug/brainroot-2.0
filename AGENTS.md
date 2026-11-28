# AGENTS.md — Brainroot 2.0

Nguồn quy tắc chung duy nhất tại root cho Claude Code, Codex, Google Antigravity và các phiên Google AI Studio Build Mode còn dùng repository. `CLAUDE.md` và rule Always On của Antigravity dẫn về tệp này. Quyết định rõ ràng mới nhất của Product Owner thay thế chỉ dẫn lịch sử mâu thuẫn.

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
Trước khi sửa bất kỳ tệp nào:

1. Đọc `AGENTS.md`, `planning/PROJECT_STATE.md`, `planning/TASKS.md`, `planning/OPEN_QUESTIONS.md` và phần hiện hành của `logs/HANDOFF.md`. Dùng `logs/WORK_LOG.md` để tìm các phiên log liên quan trực tiếp. Đọc README, roadmap, tài liệu chuyên môn và rule chuyên biệt khi liên quan.
2. Xác minh root workspace, working tree, branch, HEAD và trạng thái remote bằng Git. Khi thiếu công cụ hoặc quyền truy cập, ghi phần chưa xác minh. Đối chiếu snapshot với bằng chứng Git và production mới hơn khi chúng liên quan đến task.
3. Kiểm tra quyết định mới nhất của Product Owner. Xác định Task ID, phạm vi, dependency, acceptance criteria, rủi ro và cách kiểm thử. Ghi câu hỏi thực sự chưa chốt vào `planning/OPEN_QUESTIONS.md`.
4. Khi có thay đổi chưa commit của agent khác, giữ nguyên và báo xung đột ở các tệp tranh chấp.

## Implement safely
- **Không** tạo dữ liệu khảo sát giả như dữ liệu thực; số đo AQI phải có nguồn, loại dữ liệu, timestamp và fallbacks.
- **Không** đưa token/API secret/service role key ở frontend, markdown nhật ký, ảnh chụp hoặc commit; dùng `.env.example` với placeholder.
- **Không** dùng ẩn nút frontend như biện pháp bảo vệ thẻ trả phí; quyền đọc và giải mã phải được kiểm tra **trên server**, nguyên tắc tối thiểu quyền.
- Tránh sao chép thương hiệu, giao diện, bộ câu hỏi, media có bản quyền của Kahoot/Wordle/Worldle hay source không rõ license.
- Không đòi đăng nhập cho khách xem nội dung công khai, dùng chơi thử, hoặc người tham gia phòng bằng mã ở phiên demo phù hợp.
- AI helper chỉ được trả lời theo content đã duyệt, phải từ chối trả lời ngoài phạm vi/không biết; không lộ thẻ paid.
- Giữ keyboard access, reduced motion và khả năng thu phóng; không coi canvas/3D là cách duy nhất để hoàn thành flow.

## End-of-task protocol — ALWAYS
Áp dụng khi kết thúc hoặc bàn giao mỗi phiên, kể cả khi dở dang, gián đoạn, BLOCKED hoặc có kiểm thử thất bại. Sau khi tiếp tục từ một gián đoạn bất ngờ, ghi trạng thái bàn giao trước khi làm tiếp.

1. Chạy kiểm thử liên quan. Đối chiếu từng acceptance criterion và ghi lệnh, bằng chứng, kết quả thực tế `PASS/FAIL/NOT RUN`.
2. Cập nhật đúng một Task ID trong `planning/TASKS.md`, tiếp theo là snapshot trong `planning/PROJECT_STATE.md`. Ghi quyết định sản phẩm mới nếu có theo `planning/OPEN_QUESTIONS.md`.
3. Append một phiên đầy đủ vào log riêng theo `templates/WORK_LOG_TEMPLATE.md`: Claude Code → `logs/CLAUDE_CODE_LOG.md`, Codex → `logs/CODEX_LOG.md`, Antigravity → `logs/ANTIGRAVITY_LOG.md`, AI Studio → `logs/AI_STUDIO_LOG.md`. Append một dòng vào `logs/WORK_LOG.md`.
4. Cập nhật phần bàn giao hiện hành trong `logs/HANDOFF.md` với task, branch, thay đổi local, trạng thái kiểm thử, blockers và bước tiếp theo. Giữ nguyên các mục lịch sử.
5. Rà Git diff và ghi rõ trạng thái commit, push, PR, merge và deploy. Chỉ đánh dấu hoàn thành sau khi đã ghi đủ hồ sơ bắt buộc.
6. Thực hiện dọn dẹp an toàn theo mục **Repository Hygiene** bên dưới ngay sau khi task đã hoàn tất và được merge vào `main`. Nếu task chưa được cấp quyền merge, giữ branch và worktree cần thiết và ghi rõ trạng thái trong `logs/HANDOFF.md`.

## Repository Hygiene — áp dụng chung cho Claude Code, Codex và Antigravity
Quy tắc vệ sinh repository bắt buộc như một phần của **End-of-task protocol**. Product Owner cấp quyền thường trực cho việc dọn dẹp các branch và worktree đã xác minh an toàn sau khi merge; quyền này **không** bao gồm xóa công việc chưa merge, dữ liệu local có giá trị hoặc tài nguyên production.

Sau mỗi task đã hoàn tất và được merge:

1. Xác minh commit của task đã tích hợp đầy đủ vào `main` (`git merge-base --is-ancestor`).
2. Cập nhật đầy đủ hồ sơ bàn giao (`planning/TASKS.md`, `planning/PROJECT_STATE.md`, log riêng của agent, `logs/WORK_LOG.md`, `logs/HANDOFF.md`).
3. Kiểm tra worktree (tracked, untracked và ignored; lưu ý liên kết/junction như `node_modules`) và gỡ worktree dành riêng cho task bằng `git worktree remove` nếu không còn cần thiết và không chứa dữ liệu cần giữ. Không xóa thủ công thư mục worktree trước khi xử lý liên kết Git đúng cách.
4. Xóa local branch đã merge bằng `git branch -d`.
5. Xóa remote branch đã merge (`git push origin --delete <branch>`) khi không còn PR mở, dependency hoặc công việc chưa hoàn tất.
6. Prune các remote-tracking refs và worktree metadata đã lỗi thời (`git fetch origin --prune`, `git worktree prune`).
7. Trở về workspace chính và đồng bộ `main` với `origin/main` (`git merge --ff-only origin/main`).
8. Kiểm tra `git status` để xác nhận working tree sạch thay đổi ngoài phạm vi và các tài nguyên local còn nguyên vẹn.

Ràng buộc an toàn bắt buộc:
- Không dọn branch hoặc worktree của task đang `IN_PROGRESS`, `BLOCKED` hoặc chưa được merge vào `main`.
- Không sử dụng `git branch -D`, `git worktree remove --force`, `git clean -fdx`, `git reset --hard` hoặc force push để dọn dẹp.
- Không coi dữ liệu gitignore hoặc dữ liệu local hợp lệ là rác; tuyệt đối bảo toàn `internal-data/cards.internal.json`, `dist-full/`, `brainroot-assets/`, `brainroot-assets-v1/`, `tools/` và các tài liệu/asset nguồn cục bộ.
- Nếu task chưa được cấp quyền merge, giữ branch và worktree cần thiết và ghi rõ trạng thái trong `logs/HANDOFF.md`.

## Git collaboration
- Mỗi Task ID có một agent sửa tại một thời điểm. Khi làm song song, dùng branch hoặc worktree riêng với phạm vi tệp tách biệt. Không sửa đồng thời trên cùng working tree.
- Không dùng force push, `git reset --hard` hoặc `git clean` tùy tiện. Phân biệt thay đổi chỉ ở local, commit trên nhánh remote và nội dung đã vào `main`.
- Chỉ commit, push, mở PR, merge, deploy, tạo tài nguyên cloud, migrate dữ liệu production, mua dịch vụ, đổi cấu hình cloud hoặc secret khi có quyền rõ ràng trong phạm vi task (ngoại trừ quyền thường trực dọn dẹp an toàn sau merge tại mục **Repository Hygiene**). Khi được commit, đưa hồ sơ cùng thay đổi tương ứng vào commit hoặc PR. Khi chưa được commit, giữ hồ sơ trong workspace và ghi `NOT COMMITTED`. Không tạo commit chỉ để ghi SHA của chính commit chứa log.
- Nếu AI Studio thiếu terminal hoặc quyền ghi repository, cung cấp handoff theo template và đánh dấu các kiểm tra chưa chạy. Agent tiếp nhận xác minh diff rồi bổ sung hồ sơ còn thiếu, giữ tên agent thực hiện trong log.
- Mỗi tệp quản lý có một vai trò: `PROJECT_STATE` cho snapshot hiện hành, `TASKS` cho trạng thái nhiệm vụ, `ROADMAP` cho lộ trình, `OPEN_QUESTIONS` cho quyết định và câu hỏi, `HANDOFF` cho ca tiếp theo, `WORK_LOG` cho index, `docs/RELEASE_PLAYBOOK.md` cho phát hành. Các session lịch sử là append-only, kể cả mục Claude Code đã ghi trong `CODEX_LOG.md`.
- Log chỉ chứa bằng chứng kỹ thuật cần thiết như đường dẫn repo tương đối, số lượng, checksum và tham chiếu kiểm thử. Giữ API key, token, PII, bộ thẻ và đáp án ngoài log. Giữ dữ liệu nội bộ, PDF, ZIP, `dist-full/` và secrets ngoài Git.

## Reference docs
`docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/GAME_SPEC.md`, `docs/CONTENT_GUIDELINES.md`, `docs/ACCESS_CONTROL.md`, `docs/ACCESSIBILITY.md`, `docs/HACKATHON_COMPLIANCE.md`.
