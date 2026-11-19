# ADR-0001 — Public discovery with protected paid content

- **Date:** 2026-11-20
- **Status:** PROPOSED
- **Context:** Nhóm muốn bảo vệ doanh số thẻ vật lý bằng đăng nhập. Nhưng đăng nhập không đủ bảo vệ tài nguyên; website phục vụ người dùng công khai và giáo viên.
- **Decision proposal:** Public view + trial; member accounts optionally save progress; buyer activates entitlement via server; student can join teacher room using room code; protect content payload server-side.
- **Alternatives:** (A) hard login wall; (B) fully free digital deck; (C) mixed tier. Chọn (C) sau khi leader xác nhận.
- **Consequences:** giảm cản trở trải nghiệm; tăng nhu cầu backend và bảo mật ở giai đoạn thương mại. Digital bonus phải bổ trợ bộ vật lý.
- **Validation:** guest e2e works; negative authorization tests prove unauthorized API cannot fetch paid content.
