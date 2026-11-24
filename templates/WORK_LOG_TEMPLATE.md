## Session — YYYY-MM-DD HH:MM±HH:MM — AGENT — BR-Txxx

- **Agent và model** — Ghi tên và model nếu biết.
- **Task, mục tiêu và trạng thái** — Task ID, trước → sau.
- **Git baseline** — Repo/worktree, branch, HEAD baseline, remote và trạng thái ban đầu.
- **Context đã đọc** — Quy tắc, state, quyết định, session liên quan.
- **Phạm vi và dependency** — Phần được giao, phạm vi tệp và điều kiện cần.
- **Thay đổi và lý do** — Tệp tạo/sửa/xóa theo đường dẫn repo tương đối.
- **Quyết định kỹ thuật và trade-off** —
- **Lỗi, nguyên nhân và bản sửa** — Ghi khi có.
- **Hành vi người dùng hoặc giao diện** —
- **Kiểm thử thực tế** — Lệnh, môi trường, `PASS/FAIL/NOT RUN`, bằng chứng hoặc lý do.
- **Acceptance criteria** — Kết quả từng tiêu chí.
- **Rủi ro và giới hạn** —
- **Trạng thái Git** — Working tree, commit SHA hoặc `NOT COMMITTED`, push, PR, merge và phần việc chỉ có local.
- **Triển khai** — Trạng thái, host, mode, artifact, deployment ID và rollback nếu có.
- **Còn lại và bàn giao** — Blocker, bước chính xác tiếp theo và quyền còn cần.

Ghi số lượng, checksum và tham chiếu kiểm thử. Giữ secrets, PII và nội dung bộ thẻ ngoài log. Khi chưa có SHA, ghi `NOT COMMITTED` hoặc bổ sung SHA trong lần bàn giao kế tiếp.
