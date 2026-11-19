# PRD — Brainroot 2.0

**Version:** v0.1 (draft)  
**Date:** 20/11/2026  
**Owner:** Brainroot Team / Product Owner (chưa điền danh tính)  
**Status:** PROPOSED — cần duyệt với leader trước khi đóng scope

## 1. Product framing
- **Tên:** Brainroot 2.0 — Interactive Green Learning Ecosystem.
- **Mission gốc:** DỰ ÁN NÂNG CAO NHẬN THỨC VÀ KẾT NỐI GIỚI TRẺ VỀ KỸ NĂNG XANH THÔNG QUA SẢN PHẨM GIÁO DỤC TƯƠNG TÁC.
- **Slogan:** From Brainrot to Brainroot.
- **One-line value proposition:** Từ kiến thức môi trường gần gũi tới trò chơi, quyết định, thử thách và phản tư — theo một hành trình học tập thú vị, có thể dùng tại nhà/lớp học/CLB.
- **Công khai cho mọi người**, ưu tiên nghiên cứu và pilot người học tại ULIS/Hà Nội. ULIS Hackathon là một milestone thử nghiệm, không phải đối tượng sử dụng duy nhất.
- **Vấn đề:** Người trẻ có thể biết/quan tâm đến vấn đề môi trường nhưng tài liệu khô khan và thiếu cơ chế biến hiểu biết thành kỹ năng, hành động và kết nối. Đây là giả thuyết được hỗ trợ sơ bộ bởi báo cáo khảo sát nhóm; chưa coi là sự thật đại diện dân số.

## 2. Evidence vs aspiration
**Có dữ liệu nền từ nhóm:** hồ sơ 16 slide; bản thiết kế Fact–Act VN/EN; tài liệu Ô ăn quan xanh với 5 chủ đề và 3 cấp độ; ảnh prototype/trải nghiệm; báo cáo Design Thinking đề cập 200 mẫu khảo sát.  
**Chưa xác minh độc lập:** dữ liệu khảo sát gốc; số liệu chuyển đổi 100%; hiệu quả hành vi dài hạn; tất cả chức năng website cũ; quyền khai thác thương mại của ảnh và nội dung.  
**Đề xuất mới (chưa có):** Green Arena, Green Quest digital, Green Pulse, trợ lý AI, mã kích hoạt trả phí, hồ sơ học tập, learning analytics.

## 3. Personas / Jobs to be done
| ID | Persona | Job-to-be-done | Hành vi đặc thù |
|---|---|---|---|
| P-01 | Khách mới, mọi lứa tuổi phù hợp | Thấy Brainroot là gì và chơi thử nhanh | Không muốn đăng ký trước khi hiểu giá trị |
| P-02 | Học sinh/sinh viên | Học qua chơi, khám phá kỹ năng xanh, chia sẻ hoạt động | Mobile-first; nhu cầu nội dung dễ hiểu; có thể dưới 18 tuổi |
| P-03 | Người mua bộ bài | Mở khóa nội dung số bổ trợ đã mua | Mã kích hoạt, quyền truy cập, hỗ trợ mất mã |
| P-04 | Giáo viên/leader CLB | Tổ chức phiên chơi để truyền đạt và đánh giá bài học | Tạo phiên, mã phòng, kết quả tập thể |
| P-05 | Content editor/admin | Xuất bản kiến thức đúng và quản lý game | Duyệt nguồn, quyền, câu hỏi và tài liệu |
| P-06 | Người có nhu cầu tiếp cận | Hoàn thành trải nghiệm mà không bị chặn vì phương thức nhập/xuất | Keyboard, screen reader, chữ đủ tương phản, không bắt buộc đồng hồ đếm |

## 4. Product principles
1. **Learning first, fun always:** Trò chơi phải có mục tiêu học tập, giải thích và liên hệ hành động.
2. **Public discovery, protected paid value:** Nội dung công khai/chơi thử không yêu cầu login; nội dung thương mại kiểm soát server-side.
3. **Phygital:** Website và bộ thẻ vật lý bổ trợ nhau, không buộc sản phẩm số thay thế hoàn toàn bộ bài.
4. **Truthful evidence:** Dữ liệu thực/dự báo/giả lập được phân biệt; kết quả khảo sát có nguồn/phương pháp.
5. **Inclusive by design:** Keyboard support, alternative input, no mandatory time pressure, reduced motion.
6. **Simple to maintain:** Nội dung game tách khỏi UI, lưu dưới schema nhất quán.

## 5. Scope theo release (KHÔNG đánh đồng MVP với hoàn chỉnh)
### R0 — Sơ tuyển (đề xuất chốt 21/11; phụ thuộc thực trạng build)
- Landing page hiệu quả: mission, mascot, branding, mini demo, mobile.
- Game Library có 2 dòng sản phẩm (Fact–Act; Ô ăn quan xanh) và trạng thái rõ: playable / coming soon / physical.
- **Một** game playable end-to-end, kho câu hỏi mẫu từ tài liệu nhóm đã được kiểm tra nội dung.
- 1 flow học/nhận phản hồi sau chơi; About/Contact/nguồn dự án.
- Kết quả kiểm thử ngắn, link demo và ảnh ghi trạng thái.
- Không giới thiệu các nút trống như tính năng đã hoàn thành.
### R1 — Trước chung kết (28/11–10/12)
- Content schema, tài khoản nếu cần; access model có thể triển khai từng bước.
- Green Quest Lite hoặc classroom dry-run; pilot ULIS có sự đồng ý.
- Security/privacy, analytics tối thiểu, accessibility smoke testing.
- Green Pulse chỉ triển khai nếu xác minh nguồn API/quyền/độ trễ/chuẩn AQI.
- Lưu baseline sản phẩm theo yêu cầu Bảng B.
### R2 — 24 giờ 19–20/12 (DỰ KIẾN, **không build sẵn phần thi**) 
- Chọn 1 feature slice mới có thể demo, ví dụ **Green Arena Lite**: teacher creates room → students join with code → play 3–5 approved questions → live aggregate outcomes → debrief.
- Viết tiêu chí nghiệm thu trước mốc thi; commit/tag/ảnh/video trạng thái trước, nhật ký trong và sau 24h.
### R3 — Sau Hackathon
- Paid activation code, Educator Studio nâng cao, Word/Geo discovery games, Brainroot Buddy RAG, thông tin môi trường mở rộng, kho nội dung nhiều chủ đề.

## 6. Functional requirements (IDs để agent tham chiếu)
| ID | Priority | Requirement | Acceptance criteria (có thể kiểm thử) |
|---|---|---|---|
| BR-FR-001 | P0 | Public landing: mission/slogan/CTA | Không cần login; trên desktop/mobile đọc rõ và CTA điều hướng đúng |
| BR-FR-002 | P0 | Game catalog: Fact–Act & Ô ăn quan xanh | Card hiển thị tên, loại, quyền, trạng thái; không gắn link chết |
| BR-FR-003 | P0 | One playable educational loop | Start → question/action → answer/reflect → feedback → finish; không crash; ≥1 dữ liệu thật đã duyệt |
| BR-FR-004 | P0 | Explain evidence | Mỗi câu có lời giải và nguồn hoặc ghi rõ nội dung phản tư không có đáp án đơn nhất |
| BR-FR-005 | P0 | About, team, contact | Nội dung từ nhóm được xác nhận; không tự bịa team/impact hoặc partner |
| BR-FR-006 | P0 | Responsive accessible shell | Keyboard nav, visible focus, color contrast, reduced motion path |
| BR-FR-007 | P1 | Auth and member progress | Không chặn guest; đăng nhập không gây mất tiến độ ở phiên hỗ trợ |
| BR-FR-008 | P1 | Green Quest Lite | Bắt đầu challenge, tự báo cáo/feedback, trạng thái không phóng đại tác động |
| BR-FR-009 | P1/P3 | Paid entitlement | Ẩn API content paid server-side; mã chỉ được kích hoạt hợp lệ, xử lý abuse |
| BR-FR-010 | R2-candidate | Classroom room (Green Arena Lite) | Host tạo phòng, join bằng code, play 3–5 câu, xem summary, xử lý rớt mạng |
| BR-FR-011 | P2/P3 | Green Pulse | Nêu nguồn/time/standard; location opt-in; no-data fallback; API license verified |
| BR-FR-012 | P3 | Brainroot Buddy | Nội dung câu trả lời trong whitelist, link nguồn; không có câu trả lời tự tin khi thiếu căn cứ |
| BR-FR-013 | P3 | Admin editorial workflow | Draft→review→published; audit ngày cập nhật nguồn; role authorization |

*P0/P1/P2/P3 là mức ưu tiên; R0/R1/R2/R3 là mốc phát hành. Phân công R2 cho Hackathon phải được leader/BTC xác nhận.*

## 7. Non-functional requirements (định hướng; chưa phải chứng nhận đạt)
- Mobile-first, tối thiểu thử Chrome Android, Safari iOS, desktop Chromium.
- Mục tiêu **WCAG 2.2 AA** cho màn hình cốt lõi; automated axe + kiểm tra bàn phím/manual. Không tuyên bố đạt chuẩn trước kiểm toán.
- Performance budget proposed: LCP mobile mục tiêu ≤2,5s, CLS ≤0,1 trong điều kiện đo được ghi rõ; hero animation defer/lazy load, ảnh có dimensions.
- Bảo mật: server authorization, rate limiting, không lộ secret, dữ liệu học sinh bảo vệ riêng; no public leaderboards có danh tính trẻ vị thành niên theo mặc định.
- Fault tolerance: external AQI/API/LLM fail phải hiện dữ liệu không có hoặc hướng dẫn offline, không để vỡ các game chính.
- Observability: log lỗi và event cần thiết, không thu PII vượt nhu cầu.

## 8. Success metrics (mục tiêu ĐỀ XUẤT, chưa phải kết quả)
- Tỷ lệ người thử bắt đầu và hoàn thành game, trung vị thời gian hoàn thành.
- Số câu hiểu đúng trước/sau, kết quả tự đánh giá, tỷ lệ thử thách tự báo cáo; không tự động gọi là hành vi bền vững.
- Số lỗi cản trở nhiệm vụ theo role, khả năng hoàn thành bằng bàn phím, feedback từ 5–10 lượt kiểm thử đầu tiên nếu tổ chức được.
- Nguồn dữ liệu: pilot có đồng ý tham gia, dữ liệu ẩn danh; ghi phương pháp, mẫu và hạn chế.

## 9. Exclusions / explicitly not in R0
- Không chatbot AI tổng quát, không đa người chơi realtime sản xuất, không paywall hoàn chỉnh, không mạng xã hội mở, không hệ thống AQI realtime không có nguồn.
- Không full 3D game world hoặc dựng toàn bộ website từ hiệu ứng liên tục; không sao chép giao diện video 1:1.
- Không hứa hỗ trợ tất cả dạng khuyết tật chỉ nhờ thêm 1–2 nút.
- Không xây web cũ lại theo source code cũ.

## 10. Risks & decision gates
| Risk | Mitigation | Gate |
|---|---|---|
| Scope phình to sát sơ tuyển | R0 giữ đúng 1 end-to-end game | Leader duyệt R0 |
| Nội dung môi trường chưa kiểm chứng | `CONTENT_GUIDELINES.md`, nguồn + reviewer | Không publish nếu status != approved |
| Mâu thuẫn giữa game free và bán bộ bài | Role & access matrix | Chốt bundle/entitlement trước paid feature |
| UI trông AI-generated, load chậm | Design tokens, mascot gốc, motion budget | Review mobile + reduced motion |
| Thể lệ về baseline 24h | Tag/screenshot/commit/khai báo | Mỗi R2 task có evidence trước-sau |
| Người dùng trẻ & định vị | Dữ liệu tối thiểu, opt-in, không public PII | Privacy review |

## 11. Open approvals
Xem `planning/OPEN_QUESTIONS.md` trước khi triển khai auth, paywall, classroom realtime, Green Pulse, content production và dữ liệu học sinh.
