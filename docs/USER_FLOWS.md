# User Flows — Brainroot 2.0

**v0.1 proposed** · Paths minh họa, chỉ trở thành route thực tế khi source code được tạo.

## Navigation principles
- Không yêu cầu login để khám phá, đọc thông tin và chơi thử.
- Đăng nhập chỉ khi cần lưu trạng thái hoặc mở quyền paid/host/admin.
- Mỗi trò chơi phải có trạng thái rõ và khả năng thoát/về library.
- Từ nguồn nội dung (fact, AQI) có đường nối sang game/thử thách phù hợp, không ép sử dụng.

## UF-01 — Public discovery → trial → signup (R0)
```mermaid
flowchart TD
 A[Visit /] --> B[Hero + mission + games]
 B --> C[Open /games]
 C --> D[Choose free trial]
 D --> E[Instructions]
 E --> F[Complete 1 sample game]
 F --> G[Feedback and source]
 G --> H{Save progress?}
 H -->|No| I[Finish as guest]
 H -->|Yes| J[Sign up or login]
 J --> K[Save permitted progress]
```
**Error/edge:** nội dung unavailable → thông báo + gợi ý game khác; refresh giữa ván → hỏi bắt đầu lại/khôi phục local session (không hứa server save khi chưa có).
**AC:** guest hoàn thành mà không lộ dữ liệu paid; có hướng dẫn dễ hiểu, keyboard navigation.

## UF-02 — Returning member → choose game → progress (R1)
```mermaid
flowchart TD
 A[Login] --> B[Dashboard]
 B --> C[Select topic or game]
 C --> D[Play authorized content]
 D --> E[Feedback + self reflection]
 E --> F[Progress update]
 F --> G{Continue?}
 G -->|Yes| C
 G -->|No| H[Exit]
```
**Error:** expired session → re-auth then return safe point; no entitlement → upsell information without exposing restricted question payload.

## UF-03 — Physical buyer → activate content (R1/R3)
```mermaid
flowchart TD
 A[Buyer opens activation] --> B[Login or sign up]
 B --> C[Enter code]
 C --> D{Valid + within use limits?}
 D -->|Yes| E[Server grants entitlement]
 E --> F[Access bonus digital content]
 D -->|No| G[Generic error + support]
```
**Security:** không gửi toàn bộ danh sách mã sang client; chỉ hash/record server; rate limit và chống dò mã.

## UF-04 — Teacher/CLB host → participant join without accounts (R2 candidate)
```mermaid
flowchart TD
 A[Approved host login] --> B[Create learning room]
 B --> C[Select approved pack]
 C --> D[Room code shown]
 D --> E[Participant enters /join code]
 E --> F{Room open?}
 F -->|No| G[Join error / expired room]
 F -->|Yes| H[Choose nickname or anonymous label]
 H --> I[Question + team discussion]
 I --> J[Submit answer]
 J --> K[Aggregated results]
 K --> L[Host debrief + close]
```
**Privacy:** không bắt buộc danh tính học sinh, không công khai câu trả lời gắn PII; nickname lọc ký tự có hại; người tổ chức có quyền kết thúc phiên.
**Degraded flow:** mất mạng → trạng thái reconnect, no double submit, hết thời gian trả lời chỉ khi host chọn.

## UF-05 — Green Pulse environmental context (P1/P3, only if data/license validated)
```mermaid
flowchart TD
 A[Home Green Pulse] --> B[Default Hanoi]
 B --> C{Choose location?}
 C -->|Manual| D[City selection]
 C -->|Use my location| E[Explicit permission]
 E -->|Denied| D
 E -->|Allowed| F[Find nearby supported station/region]
 D --> G[Fetch source with cache]
 F --> G
 G --> H{Fresh verifiable data?}
 H -->|Yes| I[Show value, station, standard, timestamp]
 H -->|No| J[Unavailable/last verified snapshot]
 I --> K[Related learning module]
 J --> K
```
**No GPS persistence by default.** Không gọi dự báo như đo tại trạm. Không hiển thị số liệu giả trong production.

## UF-06 — Editor → review → publish
```mermaid
flowchart TD
 A[Editor login] --> B[Draft game/lesson/article]
 B --> C[Attach source and date]
 C --> D[Submit for review]
 D --> E{Approved by reviewer?}
 E -->|No| F[Revision required]
 F --> B
 E -->|Yes| G[Published]
```
**AC:** unpublished data không tới client public; quyền editor không mặc định được quyền quản trị mã mua hàng.

## Critical cross-cutting states
- Mobile with low bandwidth, expired auth, offline mode where possible, no JS/API failure fallback.
- Keyboard only / reduced motion / screen reader; no game requires drag-only or sound-only interactions.
- Invalid/expired code, already redeemed, rate limited, closed room, deleted content, unsaved progress, service unavailable.
- Parent/guardian and minor privacy considerations where relevant; no public collection of student photos or precise GPS.

## First-time user success definition
Người lần đầu vào website có thể hiểu Brainroot làm gì trong 10–20 giây (mục tiêu UX cần thử nghiệm), tìm và bắt đầu một trò chơi thử, kết thúc, hiểu kiến thức/nguồn liên quan, và tự chọn có đăng nhập hay không.
