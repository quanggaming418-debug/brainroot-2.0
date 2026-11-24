# Design System — Brainroot 2.0

**Status:** PROPOSED, cần nhóm duyệt mascot source và font licenses. **Direction:** illustrated, warm, crafted, playful, editorial storytelling — không dùng generic AI dashboard.

## Brand tokens
| Token | Hex | Use |
|---|---|---|
| `--color-peach` | `#E79A7C` | Primary accent, illustrated shapes, button background (dark text) |
| `--color-sage` | `#A6C6B6` | Secondary accent, learning sections |
| `--color-ivory` | `#F8F3E9` | Warm background, proposed |
| `--color-ink` | `#263B31` | Body and heading text, proposed |
| `--color-paper` | `#FFFFFF` | Cards & form backgrounds |
| `--color-danger` | `#A82A35` | Error only, ensure contrast |

**Contrast guidance:** dark ink on peach/sage; avoid small white text on either base color. Test every final adjacent pair for AA. Do not use color alone to indicate correct/wrong.

## Typography
- Heading: chọn 01 font có hỗ trợ tiếng Việt tốt, có license và phong cách thương hiệu; không tự động dùng font tròn/bubble ở mọi nơi.
- Body: 01 font readable, Vietnamese glyphs verified; minimum 16px ở vùng đọc dài. Responsive heading clamp with tested line breaks.
- Content editorial: đoạn ngắn, dễ đọc; không overdecorative uppercases ở mô tả/luật chơi.

## Layout & component language
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px; content max-width tùy mục (văn bản 65–75 ký tự/hàng).
- Cards: 2–3 kiểu rõ ràng (game card, editorial card, status card), không bo góc tất cả giống nhau.
- Giao diện desktop tối thiểu 1280 CSS px theo [AGENTS.md](../AGENTS.md). Màn hình nhỏ dùng cùng bố cục và zoom/cuộn.
- Components: Header, Hero, MascotLayer, GameCard, QuizCard, SourceCitation, Stepper, EmptyState, ErrorState, ConsentModal, Dialog, Toast, Footer.

## Brainie / Rootie
- Logo chính: **Brainroot wordmark**; Brainie và Rootie là mascot, không biến thành hai logo cạnh tranh.
- Brainie: giải thích, suy nghĩ, dẫn vào fact; Rootie: hành động, thử thách, phát triển.
- Asset phải lấy từ nhóm, kiểm tra quyền; build sprite/animation từ file source đã phê duyệt, không trộn ngẫu nhiên style AI.

## Motion system
- Hero: 1 chủ điểm visual, staggered reveal, parallax nhẹ; không ép phải 3D.
- **Hero V4 — quyết định sản phẩm 20/11/2026 (BR-T020):** Brainie, Rootie và lá trang trí tự chuyển động nhẹ, lệch pha và lặp liên tục khi tab hiển thị. Tab ẩn tạm dừng chuyển động và tác vụ parallax; quay lại tab thì tiếp tục. Chế độ `prefers-reduced-motion: reduce` tắt chuyển động không thiết yếu. Quyết định không bổ sung điều khiển motion trên giao diện; xem giới hạn tại [ACCESSIBILITY.md](ACCESSIBILITY.md).
- Game: motion có ý nghĩa trạng thái (flip/reveal/choice/result); game vẫn dùng được khi tắt animation.
- Cấm: auto-scrolling liên tục, chớp/nhấp nháy, hover-only functionality, scroll-jacking, video nền không thể tạm dừng.
- Tôn trọng `prefers-reduced-motion`; chỉ thêm Three.js/R3F cho scene có giá trị trải nghiệm rõ, lazy load và static fallback.
- Kiểm thử ngân sách motion trên desktop; dùng transform/opacity thay vì animate layout quá nặng.

## Visual reference interpretation
- Video 1: lấy editorial hierarchy/typography, không sao chép layout/copy cụ thể.
- Video 2: tham khảo depth/immersive stage có chọn lọc, tránh đưa 3D nặng lên toàn site.
- Video 3: tham khảo environmental storytelling theo scroll.
- Video 4: tham khảo playful illustrated microinteractions và interactive game cards.
- Reference assets thuộc chủ sở hữu tương ứng; **không copy code, artwork, trademark**.

## Design review gates
- Home, game/trial, result, about, error screen có mockup desktop và trạng thái focus/hover/disabled.
- Kiểm thử artwork linh vật, độ tương phản, reduced motion, bàn phím và các viewport desktop theo [QUALITY_AND_TESTING.md](QUALITY_AND_TESTING.md).
- Không fake working interactions: CTA phải dẫn tới route hay thông báo rõ trạng thái sắp ra mắt.
