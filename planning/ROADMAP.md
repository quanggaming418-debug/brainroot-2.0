# ROADMAP — Brainroot 2.0

**Status:** PROPOSED, not approved. Dates are competition checkpoints from ULIS sources, not guaranteed engineering commitments.  
**Current milestone:** R0 sơ tuyển. Site mới chưa có mã nguồn trong bộ tài liệu này.

## 0. Definition of priorities
- `Must / P0`: không có thì không thể chứng minh một trải nghiệm giáo dục hoàn chỉnh.
- `Should / P1`: cần sau khi R0 ổn định; phục vụ người dùng lâu dài.
- `Candidate / R2`: chỉ chọn **một** hạng mục 24h, nếu đội vào chung kết và khai báo baseline.
- `Later / P3`: roadmap dài hạn, không đẩy vào scope hiện tại.

## Milestone table
| Release | Target window | Entry criteria | Deliverables | Exit gate |
|---|---|---|---|---|
| R0 – sơ tuyển | tới 21/11/2026 nếu kịp | Chốt 1 game playable + nội dung đã được duyệt | Landing, catalog, demo end-to-end, About, quick test, 6-slide pack | Demo mobile/desktop thực sự chạy, không fake functionality |
| R1 – prepare | 28/11–10/12/2026 | Nếu vượt sơ tuyển | Polish, lesson/quest, UX testing, data model, baseline | Nội dung & bảo mật được review, hồ sơ đầu vào R2 |
| R2 – Hackathon | 19/12 14:00 → 20/12 14:00 | Được vào chung kết, BTC xác nhận | Một cải tiến mới (candidate Green Arena Lite) + evidence | Diff + video before/after + testing; submit đúng BTC |
| R3 – public product | Sau thi | Feedback & nguồn lực | Account, paid entitlement, content CMS, chatbot, Green Pulse, game mới | Kiểm thử bảo mật, privacy, vận hành thực tế |

## Release 0 — MVP hard scope
- P0: thống nhất mục tiêu/brand, làm component shell, responsive, 2 game cards, **1 game full loop**, feedback có nguồn, about.
- Non-goal: chatbot AI, realtime lớp học, dashboard lớn, payment, geolocation precise, bản đồ 3D toàn website.
- Một luồng end-to-end hoạt động tốt hơn 10 chức năng click không ra kết quả.

## Proposed future sequence
- R1a: quest/challenge + content schema + pilot ULIS.
- R1b: auth/RLS only when storing data; một nhóm dùng thật.
- R2 candidate: giáo viên tổ chức phòng Green Arena Lite (chỉ xây mới trong 24h nếu chọn đăng ký theo kế hoạch).
- R3a: activation codes/paywall with clear pricing/legal terms.
- R3b: Green Pulse sourced data, scoped AI buddy, Eco Discovery/Green Word Quest.

## Capacity guardrails
- Người làm/giờ chưa được xác nhận; không ước tính sprint hay deadline cam kết khi thiếu năng lực team.
- Nếu trễ R0: giảm animation hoặc số màn hình, KHÔNG bỏ end-to-end game và evidence.
- Sau mỗi milestone, xem TASKS, actual test evidence, user feedback, decision log rồi mới tăng scope.

## Truth or Dare — P2 (chưa làm; để dành chứng minh tiến bộ trong 24h chung kết 19–20/12)
- Cây chung của nhóm (tiến độ chơi cùng nhau).
- Thẻ cam kết chia sẻ tỉ lệ 9:16.
- Khảo sát 2 câu sau ván (chỉ làm khi có phương pháp thu thập rõ; không bịa số liệu).
- Tuỳ chọn P1 còn lại: chọn người chơi tiếp theo (vòng quay tên/quay chai) — chưa làm trong BR-T028.
- Chế độ "Bạn bè 16+" cho các thẻ không công khai: cần ADR mới và rà soát nội dung riêng.
