# Information Architecture / Routes

## Top-level navigation proposed
| Nav | Route | Audience | MVP? |
|---|---|---|---|
| Trang chủ | `/` | Mọi người | R0 |
| Trò chơi | `/games` | Mọi người | R0 |
| Thử thách | `/challenges` | Mọi người / member | R1 (R0 teaser không link chết) |
| Khám phá | `/discover` | Mọi người | R0 bài viết tối thiểu |
| Dành cho giáo dục | `/educators` | Giáo viên / CLB | R1/R2 |
| Về chúng tôi | `/about` | Mọi người | R0 |
| Tài khoản | `/account` | Member | R1 |

## Nested proposed routes
- `/games/fact-act`, `/games/o-an-quan-xanh` (mỗi page thể hiện rõ trạng thái; ít nhất 1 playable demo R0)
- `/games/[slug]/play` và `/games/[slug]/result`; không đưa paid content trong static bundle.
- `/discover/[slug]`, `/discover/air-quality`, `/challenges/[slug]`.
- `/join` hoặc `/join/[code]` cho lớp học, không buộc account ở participant.
- `/host/rooms`, `/host/rooms/[id]` cho host; `/admin/content` cho editor/admin.
- `/activate` cho mã đi kèm bộ bài.

## Navigation invariants
- Một trang có H1 duy nhất; breadcrumb khi cần; back/exit game rõ.
- Primary CTA khác secondary CTA; tránh mỗi màn có 5 nút cùng mức nhấn.
- Header desktop/mobile nhất quán, footer có nguồn, chính sách nội dung, liên hệ.
- Trò chơi/nhãn `Coming soon` không giả vờ playable.
- Không đưa AQI thành một tab chính độc lập nếu chỉ có một widget; bắt đầu từ widget trang chủ + discover detail.
