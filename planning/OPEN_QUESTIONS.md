# Open Questions — require product owner / team decision

| ID | Question | Default safe assumption | Owner | Status |
|---|---|---|---|---|
| OQ-01 | P0 chơi **Fact–Act sample** hay **Ô ăn quan xanh quiz**? | Chỉ 1 game full loop, catalog cho cả hai | Leader/team | OPEN |
| OQ-02 | File mascot/logo/vector và quyền sử dụng? | Dùng placeholder developer only, không công bố giả là official | Design owner | OPEN |
| OQ-03 | Bộ thẻ vật lý nào có thể đưa một phần lên web free? | Chỉ 5–10 nội dung trial đã duyệt | Product owner | OPEN |
| OQ-04 | Giá trị kỹ thuật khi mua bộ bài được mở khóa cụ thể là gì? | Không xây paid paywall trước khi pricing/rights approved | Business owner | OPEN |
| OQ-05 | Đăng nhập bắt buộc ở flow nào? | Guest view/trial, member save, buyer content | Product owner | OPEN |
| OQ-06 | Chính sách tài khoản trẻ vị thành niên + consent/retention? | Không lưu thông tin cá nhân cho guest | Team/legal reviewer | OPEN |
| OQ-07 | Realtime Green Arena phát triển trong 24h hay trước? | Giữ là R2 candidate, không triển khai trước mốc thi nếu là hạng mục tính tiến bộ | Leader | OPEN |
| OQ-08 | Cơ chế Ô ăn quan xanh: luật bàn cờ, tiêu chí điểm, thời gian và ánh xạ chủ đề? Chi tiết từng câu hỏi: `docs/oanquan-v2/BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md` (nhóm A 20 mục chặn G1) và phụ lục `docs/oanquan-v2/RULES_MATRIX_V1.3_ADDENDUM_C01-C03.md`. | Không giả định luật, dùng content quiz demo trước; bản thiết kế G0.5 chỉ dùng giá trị tạm có nhãn | Game designer / nhóm Brainroot | OPEN |
| OQ-09 | Dữ liệu khảo sát thô + quyền công bố ảnh thử nghiệm? | Không dùng làm claim đã kiểm chứng | Research owner | OPEN |
| OQ-10 | AQI provider được phép thương mại? | Không dùng số liệu live khi chưa kiểm tra license | Tech owner | OPEN |
| OQ-11 | AI Buddy có truy xuất content paid được không? | Không, chỉ approved public KB trừ khi entitlement được kiểm tra | Product owner | OPEN |
| OQ-12 | Nền tảng hosting/cost ceiling và ai sở hữu tài khoản kỹ thuật? | Không tự lập resource cloud có phí | Technical lead | OPEN |
| OQ-13 | Nhóm đã xác nhận lại hồ sơ thành viên UET theo quy chế BTC chưa? | Chỉ ghi thực trạng khi BTC xác nhận | Leader | OPEN |
| OQ-14 | **(C-01, Ô ăn quan V2)** Quân Quan là linh vật hay vật phẩm riêng? **RESOLVED 2026-11-24 (Product Owner):** hai quân Quan = bệ gỗ kết hợp Brainie và Rootie nguyên mẫu (Biến đổi khí hậu ↔ Brainie, Đa dạng sinh học ↔ Rootie); không quay lại thiết kế vật phẩm riêng. Hai file master `brainie.webp`/`rootie.webp` giữ nguyên, không chỉnh. | Đã triển khai ở BR-T037 | Product Owner | RESOLVED |
| OQ-15 | **(C-02, Ô ăn quan V2, chặn G1)** Kho bảo tồn là một kho chung hay 5 lọ theo chủ đề (ô bị thu hoạch hoặc loại hạt)? Thu hoạch Ô Quan vào lọ nào? Liên quan R10, R17, R24, R26. Xem phụ lục Matrix C-02. | Không viết engine cho tới khi có đáp án | Nhóm Brainroot | OPEN |
| OQ-16 | **(C-03, Ô ăn quan V2, chặn G1)** Khi rải đi qua Ô Quan có thả hạt vào Ô Quan không? Hạt cuối rơi vào Ô Quan thì sao? Liên quan R0, R5, R10, R11, R15, R16. Xem phụ lục Matrix C-03. | Không viết engine cho tới khi có đáp án | Nhóm Brainroot | OPEN |

**Protocol:** không giải quyết một open question bằng “AI suy ra”. Khi có quyết định, thêm record vào `docs/decisions/`, cập nhật PRD/TASKS và chuyển status `RESOLVED`.
