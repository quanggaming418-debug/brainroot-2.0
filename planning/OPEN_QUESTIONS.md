# Open Questions — require product owner / team decision

| ID | Question | Default safe assumption | Owner | Status |
|---|---|---|---|---|
| OQ-01 | P0 chơi **Fact–Act sample** hay **Ô ăn quan xanh quiz**? **RESOLVED 24/11 (Product Owner, BR-T041):** Ô ăn quan xanh V2 là phiên bản chơi chính của website; Truth or Dare giữ nguyên trên `/games/fact-act/play`. | Chỉ 1 game full loop, catalog cho cả hai | Product Owner | RESOLVED |
| OQ-02 | File mascot/logo/vector và quyền sử dụng? | Dùng placeholder developer only, không công bố giả là official | Design owner | OPEN |
| OQ-03 | Bộ thẻ vật lý nào có thể đưa một phần lên web free? | Chỉ 5–10 nội dung trial đã duyệt | Product owner | OPEN |
| OQ-04 | Giá trị kỹ thuật khi mua bộ bài được mở khóa cụ thể là gì? | Không xây paid paywall trước khi pricing/rights approved | Business owner | OPEN |
| OQ-05 | Đăng nhập bắt buộc ở flow nào? | Guest view/trial, member save, buyer content | Product owner | OPEN |
| OQ-06 | Chính sách tài khoản trẻ vị thành niên + consent/retention? | Không lưu thông tin cá nhân cho guest | Team/legal reviewer | OPEN |
| OQ-07 | Realtime Green Arena phát triển trong 24h hay trước? | Giữ là R2 candidate, không triển khai trước mốc thi nếu là hạng mục tính tiến bộ | Leader | OPEN |
| OQ-08 | Cơ chế Ô ăn quan xanh: luật bàn cờ, tiêu chí điểm, thời gian và ánh xạ chủ đề? Chi tiết từng câu hỏi: `docs/oanquan-v2/BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md` (nhóm A 20 mục chặn G1) và phụ lục `docs/oanquan-v2/RULES_MATRIX_V1.3_ADDENDUM_C01-C03.md`. **GAMEPLAY RESOLVED 24/11 (Product Owner):** dùng `PLAYTEST_V1` (`src/features/oanquan-v2/engine/rules.ts`) cho bản trình diễn Hackathon. Việc luật có phải **luật chính thức** của Brainroot hay không là câu hỏi riêng, không chặn Hackathon. | Dùng `PLAYTEST_V1`; không gọi là luật chính thức khi chưa có xác nhận của nhóm | Product Owner / nhóm Brainroot | RESOLVED (gameplay) |
| OQ-09 | Dữ liệu khảo sát thô + quyền công bố ảnh thử nghiệm? | Không dùng làm claim đã kiểm chứng | Research owner | OPEN |
| OQ-10 | AQI provider được phép thương mại? | Không dùng số liệu live khi chưa kiểm tra license | Tech owner | OPEN |
| OQ-11 | AI Buddy có truy xuất content paid được không? | Không, chỉ approved public KB trừ khi entitlement được kiểm tra | Product owner | OPEN |
| OQ-12 | Nền tảng hosting/cost ceiling và ai sở hữu tài khoản kỹ thuật? | Không tự lập resource cloud có phí | Technical lead | OPEN |
| OQ-13 | Nhóm đã xác nhận lại hồ sơ thành viên UET theo quy chế BTC chưa? | Chỉ ghi thực trạng khi BTC xác nhận | Leader | OPEN |
| OQ-14 | **(C-01, Ô ăn quan V2)** Quân Quan là linh vật hay vật phẩm riêng? **RESOLVED 2026-11-24 (Product Owner):** hai quân Quan = bệ gỗ kết hợp Brainie và Rootie nguyên mẫu (Biến đổi khí hậu ↔ Brainie, Đa dạng sinh học ↔ Rootie); không quay lại thiết kế vật phẩm riêng. Hai file master `brainie.webp`/`rootie.webp` giữ nguyên, không chỉnh. | Đã triển khai ở BR-T037 | Product Owner | RESOLVED |
| OQ-15 | **(C-02, kho bảo tồn)** Một kho chung hay 5 lọ theo chủ đề? **RESOLVED cho bản chơi thử:** `PLAYTEST_V1` dùng một kho chung mỗi người chơi (hiển thị là giỏ hạt trên thanh người chơi). Không phải xác nhận luật chính thức. | Theo `PLAYTEST_V1` | Product Owner | RESOLVED (PLAYTEST_V1) |
| OQ-16 | **(C-03, rải qua Ô Quan)** Rải qua / dừng ở Ô Quan thì sao? **RESOLVED cho bản chơi thử:** `PLAYTEST_V1` cho Ô Quan nhận hạt khi rải qua (`sowing.quanPits: receiveSeeds`, không bốc Ô Quan để rải) (xem `engine/rules.ts` và `tests/oanquan-v2-engine.test.ts`). Không phải xác nhận luật chính thức. | Theo `PLAYTEST_V1` | Product Owner | RESOLVED (PLAYTEST_V1) |
| OQ-17 | **(BR-T038)** Bộ thẻ cho hai Ô Quan. **RESOLVED 24/11 (Product Owner):** giữ ánh xạ thẻ Cấp 3 (Biến đổi khí hậu ← Năng lượng + Tiêu dùng; Đa dạng sinh học ← Không gian xanh + Nước + Rác thải) ở bản chơi thử và Hackathon. | Giữ ánh xạ | Product Owner | RESOLVED |
| OQ-18 | **(BR-T038, gameplay)** Cách chấm thẻ. **RESOLVED 24/11 (Product Owner):** 6 thẻ tự chấm, 94 thẻ đối phương đánh giá. Đây là quyết định **gameplay**, tách khỏi quyền công bố nội dung (OQ-19). | Giữ như đã chốt | Product Owner | RESOLVED |
| OQ-19 | **(BR-T041, quyền công bố nội dung)** Có được phép đưa 100 thẻ gốc, đáp án và tiêu chí đánh giá lên website công khai không? | **KHÔNG.** Giới hạn nội bộ: `internal-data/` gitignore, chỉ nạp ở `npm run dev`; production (kể cả bật cờ V2) chỉ có thẻ DEMO. Mở khóa cần văn bản cho phép rõ ràng của Product Owner/chủ nội dung | Product Owner | OPEN |
| OQ-20 | **(BR-T041, tài sản)** Quyền công bố ArtPack V3, hình Brainie/Rootie và âm thanh tổng hợp cho phát hành công khai (nối với `BR-T002`/OQ-02). | Chỉ dùng trong repo và bản trình diễn; không coi là đã được cấp quyền thương mại | Product Owner / Design owner | OPEN |
| OQ-21 | **(BR-T042, dịch thẻ)** Dịch 100 thẻ sang tiếng Anh. **BACKLOG SAU HACKATHON (Product Owner, 24/11):** không triển khai ở RC. | KHÔNG dịch. Giao diện V2 có VI/EN; thẻ hiển thị tiếng Việt gốc. Khi làm: lưu tệp riêng, không ghi đè dữ liệu gốc, gắn nhãn "chưa duyệt" cho tới khi chủ nội dung xác nhận | Product Owner / chủ nội dung | BACKLOG |

**Protocol:** không giải quyết một open question bằng “AI suy ra”. Khi có quyết định, thêm record vào `docs/decisions/`, cập nhật PRD/TASKS và chuyển status `RESOLVED`.
