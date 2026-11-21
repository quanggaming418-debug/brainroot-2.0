# ADR-0005: Công khai 20 thẻ thật trên bản chơi thử web

- **Status:** ACCEPTED (chủ dự án quyết định ngày 2026-11-21)
- **Thay thế một phần:** quyết định cũ "không lộ nội dung thẻ gốc" (xem `AGENTS.md`, `BR-T005`).

## Bối cảnh
Bản chơi thử `/games/fact-act/play` chỉ có 16 thẻ giữ chỗ nên không đủ để chứng minh sản phẩm trong hồ sơ sơ tuyển (Bảng B – Sản phẩm ứng dụng).

## Quyết định
- Công khai đúng **20 thẻ** (`TD-01…TD-20`), nguyên văn VI/EN từ bộ thẻ gốc của nhóm, dữ liệu ở `src/features/truthOrDare/truthOrDareCards.ts`.
- **~43 thẻ còn lại (bộ gốc 63 thẻ hai mặt) không công khai**: dành cho bộ thẻ vật lý/bản đầy đủ. Không thêm các thẻ này vào repo công khai khi chưa có quyết định mới.
- Luật 5 bước và 5 gợi ý Green Penalty do chủ dự án cung cấp được dùng nguyên ý (sách luật, FAQ, vòng quay).
- Chủ đề (`theme`) của từng thẻ là đề xuất, chờ nhóm xác nhận. Thẻ có `proof` chỉ khuyến khích ảnh/đăng bài, không bắt buộc.

## Hậu quả
- `APPROVED_PUBLIC_CARDS` không còn rỗng; AI helper vẫn chỉ trả lời theo luật đã duyệt, không lộ 43 thẻ còn lại.
- Nếu nhóm muốn mở thêm thẻ (ví dụ chế độ "Bạn bè 16+"), cần ADR mới.
