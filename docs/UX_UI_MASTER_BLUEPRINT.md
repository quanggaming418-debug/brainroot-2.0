# BRAINROOT 2.0 — UX/UI MASTER BLUEPRINT

**Task ID:** `BR-T021`  
**Ngày lập:** 2026-11-20  
**Trạng thái:** `PROPOSED` — Chờ Product Owner phê duyệt tại **GATE A (IA)**, **GATE B (Storyboard)** và **GATE C (Visual Asset Register)**.  
**Phạm vi:** Đặc tả thiết kế & kiến trúc trải nghiệm toàn hệ sinh thái Brainroot 2.0 theo định hướng **ONE LIVING WORLD** (không chỉnh sửa mã nguồn ứng dụng trong tác vụ này).

## Quy ước phân loại bằng chứng
- **[VERIFIED]**: Đã kiểm chứng trực tiếp trong mã nguồn, tài sản `public/assets/hero-v4/` hoặc tài liệu hiện hành của repo.
- **[APPROVED]**: Quyết định sản phẩm/thương hiệu đã được Product Owner xác nhận rõ ràng.
- **[PROPOSED]**: Đề xuất thiết kế/kiến trúc UX/UI từ bản đặc tả này, cần duyệt trước khi triển khai.
- **[BLOCKED]**: Bị chặn bởi thiếu tài sản gốc, nội dung khoa học đã duyệt, bản quyền thương mại (`BR-T002`) hoặc quyết định nghiệp vụ (`planning/OPEN_QUESTIONS.md`).

---

## 1. Kiểm toán hiện trạng website & đồng bộ kho mã (Audit)

### 1.1 Sai lệch trạng thái Git & tài liệu cần ghi nhận
- **[VERIFIED — Hạn chế môi trường]:** Workspace Google AI Studio hiện **không chứa thư mục `.git`** (`git status`/`git log` trả về `fatal: not a git repository`). Không thể tự xác minh commit SHA hay lịch sử merge bằng Git CLI trong container này.
- **[VERIFIED — Sai lệch giữa mã nguồn và tài liệu quản trị]:**
  - Mã nguồn đồng bộ trong `src/` (`HeroSection.tsx`, `useHeroParallax.ts`, `landing.css`, `tokens.css`, `focusAnchorTarget.ts`, `SiteHeader.tsx`, `EcosystemSection.tsx`, `AboutSection.tsx`, `App.tsx`) **đã chứa đầy đủ** cả phần khắc phục của `BR-T003` và phần khôi phục chuyển động nền của `BR-T020` (`visibilitychange` pause/resume, `infinite` ambient motion, giới hạn WCAG 2.2.2 trong `docs/ACCESSIBILITY.md` & `docs/DESIGN_SYSTEM.md`).
  - Tuy nhiên, `planning/TASKS.md`, `planning/PROJECT_STATE.md` và `logs/HANDOFF.md` trước phiên này vẫn ghi `BR-T020` ở trạng thái `IN_REVIEW` trên nhánh `codex/hero-ambient-motion`, chưa cập nhật việc đã merge vào `main` như xác nhận từ Product Owner. Cần Codex/Owner đối chiếu commit trên GitHub để đồng bộ bảng trạng thái.

### 1.2 Kiểm toán trải nghiệm hiện có (`src/` & `public/assets/hero-v4/`)
| Hạng mục | Hiện trạng [VERIFIED] | Đánh giá UX/UI |
|---|---|---|
| **Nền tảng kỹ thuật** | React 19 + TypeScript + Vite 7 + CSS chuẩn module hóa (`tokens.css`, `base.css`, `landing.css`); chưa cài router (chỉ có điều hướng anchor nội trang `#top`, `#worlds`, `#games`, `#quest`, `#connect`, `#about`). | Nhẹ, sạch, sẵn sàng mở rộng router tối giản ở `BR-T004`. |
| **Scene H01 (Hero V4)** | 3 lớp parallax (`depth-01..03.webp`), nền dự phòng `hero-garden-v4.webp`, Brainie & Rootie gốc, 2 lá SVG, 1 CTA chính `#E79A7C`, `Be Vietnam Pro`, `--color-headline-on-hero: #53743e`, `BR-T020` ambient motion tạm dừng khi ẩn tab, `focusAnchorTarget` + skip-link `#main-content`. | **[APPROVED]** Chuẩn thị giác gốc. Đã qua QA độc lập của Codex (1440/390/320, zoom 200%, 0 vi phạm axe tự động). |
| **Chuyển tiếp Hero → Ecosystem** | Cắt thẳng (hard cut) từ chân ảnh minh họa cỏ xanh của `.hero` sang nền màu kem trơn `#F8F3E9` của `.worlds`. | **Điểm yếu thị giác chính:** Đứt mạch kể chuyện "One Living World". Cần **Scene H02 (Garden Transition)**. |
| **Ecosystem (`#worlds`)** | Lưới 2×2 gồm 4 thẻ hình chữ nhật bo góc (`Green Play`, `Green Quest`, `Green Learn`, `Green Connect`) với icon ký tự Unicode (`✦`, `❀`, `☘`, `❂`) và nhãn `"Đang phát triển"`. | Trình bày trung thực về trạng thái nhưng còn thiên về kiểu card thông tin phẳng, chưa tạo cảm giác 4 điểm đến minh họa trong cùng khu vườn sống. |
| **Featured Green Play** | Chưa tách phân khu nổi bật giới thiệu `Fact–Act` (đã có `fact-act-deck.webp` 92 KB trong `public/assets/hero-v4/` nhưng chưa dùng ở UI) và `Ô ăn quan xanh`. | Bỏ phí tài sản ảnh thật `fact-act-deck.webp` đã có sẵn; thiếu cầu nối trực quan dẫn tới `/games`. |
| **About (`#about`) & Footer** | Khối văn bản căn giữa ngắn gọn trên nền `#F8F3E9`; footer 1 dòng chữ tối giản. | Sạch, trung thực, không bịa số liệu; nhưng thiếu yếu tố kể chuyện thị giác "From Brainrot to Brainroot" (Hạt giống → Nảy mầm → Học → Hành động → Kết nối). |

---

## 2. Kiến trúc thông tin UX (Information Architecture)

### 2.1 Tuyến R0 cốt lõi (Initial Product System — [PROPOSED] cho GATE A)
> Nguyên tắc **[APPROVED]**: Không buộc đăng nhập để xem nội dung công khai hoặc chơi thử; không gắn link chết hay giả vờ tính năng chưa làm là đã chạy.

| Tuyến (Route) | Tên màn hình | Mục tiêu UX | Trạng thái / Task | Điều kiện hiển thị điều hướng |
|---|---|---|---|---|
| `/` | Trang chủ (Living World) | Hiểu sứ mệnh trong 10–20s, khám phá 4 vùng hệ sinh thái, dẫn vào Green Play | Đã có nền `BR-T003` + `BR-T020`; nâng cấp ở **M1** | Luôn hiện |
| `/games` | Thư viện trò chơi (Green Play Pavilion) | Giới thiệu `Fact–Act` và `Ô ăn quan xanh` với trạng thái khả dụng rõ ràng | `BR-T004` (**M2**) | Chỉ kích hoạt link khi `BR-T004` hoàn thiện |
| `/games/fact-act` | Chi tiết sản phẩm Fact–Act | Trình bày giá trị giáo dục, cơ chế học & phản tư, cầu nối bộ thẻ vật lý ↔ bản số, lối vào bản chơi thử | `BR-T004` (**M2**) | Trong `/games` và nút nổi bật ở Homepage |
| `/games/o-an-quan-xanh` | Chi tiết sản phẩm Ô ăn quan xanh | Giới thiệu 5 chủ đề & 3 cấp độ giáo dục; nêu rõ luật số hóa đang chuẩn hóa (chỉ mô tả sản phẩm) | `BR-T004` (**M2**) | Trong `/games` |
| `/games/fact-act/play` *(hoặc `/games/[slug]/play`)* | Chơi thử miễn phí Fact–Act | Vòng lặp giáo dục hoàn chỉnh: hướng dẫn → rút thẻ/chọn → phản hồi + nguồn → phản tư → kết quả | `BR-T006` (**M3**) — **[BLOCKED]** bởi `BR-T005` (duyệt >=5 mục nội dung) | Chỉ mở CTA "Chơi thử" khi `BR-T005` + `BR-T006` PASS |
| `/games/fact-act/result` *(hoặc trạng thái kết quả trong luồng)* | Tổng kết & phản tư học tập | Tóm tắt bài học, nguồn trích dẫn, gợi ý hành động nhỏ và nút chơi lại / về `/games` | `BR-T006` (**M3**) | Sau khi hoàn thành phiên thử |
| `/about` | Về Brainroot & nguồn dự án | Giới thiệu dự án, sứ mệnh, bối cảnh thử nghiệm ULIS/Hà Nội, liên hệ & minh bạch nguồn | `BR-T007` (cuối R0) | Trước `BR-T007`: dùng neo `#about` trên `/` |

### 2.2 Hệ sinh thái tương lai (Conceptual Architecture — KHÔNG triển khai ở R0)
| Khu vực / Tính năng | Route dự kiến | Mốc phát hành | Phụ thuộc bắt buộc ([BLOCKED]) |
|---|---|---|---|
| **Green Quest** | `/challenges`, `/challenges/[slug]` | R1 (`BR-T011`) | Duyệt bộ thử thách tự báo cáo + chính sách đồng thuận |
| **Green Learn** | `/discover`, `/discover/[slug]` | R1–R3 (`BR-T010`) | Quy trình biên tập & kiểm duyệt nguồn khoa học (`CONTENT_GUIDELINES.md`) |
| **Green Connect** | `/connect`, `/educators` | R1–R2 | Tài liệu hướng dẫn cho giáo viên/CLB, chính sách ẩn danh lớp học |
| **Green Arena Lite** | `/host/rooms`, `/join`, `/join/[code]` | R2 candidate (`BR-T016`) | Chỉ xây trong 24h chung kết nếu chọn làm hạng mục thi + baseline `BR-T015` |
| **Green Pulse** | `/discover/air-quality` | R1/R3 (`BR-T013`) | Xác minh nguồn dữ liệu AQI, license thương mại, fallback offline |
| **Tài khoản & Tiến độ** | `/account` | R1 (`BR-T012`) | Quyết định Auth/DB + chính sách bảo vệ người dùng dưới 18 tuổi (`OQ-05`, `OQ-06`) |
| **Kích hoạt bộ bài trả phí** | `/activate` | R3 (`BR-T017`) | Chốt mô hình quyền lợi & kiểm soát entitlement server-side (`OQ-04`) |
| **Brainroot Buddy** | Widget/route riêng có giới hạn | R3 (`BR-T018`) | Kho tri thức công khai đã duyệt whitelist + cơ chế từ chối ngoài phạm vi |

### 2.3 Chiến lược điều hướng chuyển tiếp (Anchor → Multi-page) [PROPOSED]
- **Hiện tại (`BR-T003` / M1):** Giữ điều hướng neo trong trang (`Khám phá` `#worlds`, `Trò chơi` `#games`, `Thử thách` `#quest`, `Cộng đồng` `#connect`, `Về Brainroot` `#about`) để bảo đảm 100% liên kết có đích thực.
- **Khi triển khai `BR-T004` (M2):** Cài router gọn nhẹ (hoặc `react-router-dom` sau khi duyệt dependency) cho `/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`; mục `Trò chơi` trên header trỏ thẳng `/games`; các khu vực chưa mở (`Thử thách`, `Kiến thức`, `Cộng đồng`) vẫn dẫn tới phần giới thiệu tương ứng trên `/#worlds` kèm trạng thái rõ ràng, tuyệt đối không tạo trang rỗng 404 hoặc trang giả.

---

## 3. Hành trình người dùng chi tiết (User Journeys — [PROPOSED])

### J-01: Khách công khai lần đầu ghé thăm (First-time Public Visitor)
- **Điểm vào:** `/` (từ chia sẻ mạng xã hội, QR tại sự kiện ULIS hoặc tìm kiếm).
- **Mục tiêu:** Hiểu Brainroot là gì trong 10–20 giây, cảm nhận bản sắc giáo dục xanh và biết có thể khám phá gì ngay không cần đăng nhập.
- **Quyết định chính:** Có nên cuộn khám phá tiếp? Khu vực nào phù hợp với mình ngay bây giờ?
- **Chuyển màn hình:** `/` (H01 Hero) → cuộn/bấm CTA → H02/H03 (4 vùng hệ sinh thái) → H04 (Featured Green Play) → `/games`.
- **Hành động chính / phụ:** Chính: `"Khám phá thế giới Brainroot"` (H01) → `"Vào thư viện trò chơi"` (H04). Phụ: Menu neo tới các mục giới thiệu hoặc `#about`.
- **Trạng thái thành công:** Người dùng nhận diện rõ sứ mệnh *From Brainrot to Brainroot*, phân biệt được sản phẩm đã sẵn sàng với định hướng tương lai, và mở được `/games` không gặp tường đăng nhập.
- **Lỗi / Không khả dụng:** Ảnh nền chậm tải → hiển thị nền màu ấm `#F8D6BB` / `#F8F3E9` và chữ HTML đọc được ngay; route lạ → màn hình 404 thân thiện có nút về `/`.
- **Tiếp cận:** Thứ tự đọc DOM khớp thứ tự thị giác; chữ 100% HTML; tương phản AA.
- **Phụ thuộc:** Hoàn thiện M1 (Homepage upgrade) và M2 (`BR-T004`).

### J-02: Học sinh / Sinh viên khám phá trò chơi (Student Exploring a Game)
- **Điểm vào:** `/#worlds` (vùng Green Play) hoặc trực tiếp `/games`.
- **Mục tiêu:** So sánh nhanh `Fact–Act` và `Ô ăn quan xanh`, xem chủ đề, đối tượng, bản vật lý vs bản số.
- **Quyết định chính:** Chọn xem chi tiết `Fact–Act` hay `Ô ăn quan xanh`? Trò nào đã chơi thử được?
- **Chuyển màn hình:** `/games` → `/games/fact-act` hoặc `/games/o-an-quan-xanh` → quay lại `/games` qua breadcrumb.
- **Hành động chính / phụ:** Chính: `"Xem chi tiết Fact–Act"`, `"Tìm hiểu Ô ăn quan xanh"`. Phụ: quay lại Trang chủ `/`.
- **Trạng thái thành công:** Nắm rõ cách học của từng sản phẩm; hiểu ngay trò nào có bản thử trực tuyến, trò nào đang chuẩn hóa luật số.
- **Lỗi / Không khả dụng:** Khi `BR-T006` chưa phát hành → nút chơi thử không bị vô hiệu hóa mập mờ mà hiển thị panel trạng thái `"Bản chơi thử đang hoàn thiện nội dung kiểm duyệt"` + gợi ý xem trước mục tiêu học tập.
- **Tiếp cận:** Thẻ sản phẩm có heading rõ, trạng thái không chỉ mã hóa bằng màu sắc, hỗ trợ bàn phím đầy đủ.
- **Phụ thuộc:** `BR-T004`, `fact-act-deck.webp` (đã có), `VIS-008` (minh họa khái niệm Ô ăn quan xanh).

### J-03: Khách chơi thử giáo dục miễn phí (Guest Starting a Free Trial — M3 / BR-T006)
- **Điểm vào:** `/games/fact-act` → bấm `"Chơi thử miễn phí (không cần đăng nhập)"`.
- **Mục tiêu:** Trải nghiệm trọn vẹn 1 phiên học ngắn (3–5 thẻ mẫu đã duyệt), nhận giải thích có nguồn và gợi ý hành động thực tế.
- **Quyết định chính:** Đọc hướng dẫn hay bắt đầu ngay? Trả lời câu hỏi/chọn phương án thực hành hoặc chọn phương án thay thế tiếp cận (skip/alternative)?
- **Chuyển màn hình:** `/games/fact-act` → màn hình hướng dẫn → phiên chơi từng thẻ → phản hồi + trích dẫn nguồn → phản tư ngắn → màn hình tổng kết → về `/games` hoặc chơi lại.
- **Hành động chính / phụ:** Chính: `"Bắt đầu chơi thử"`, `"Kiểm tra / Xem giải thích"`, `"Thẻ tiếp theo"`, `"Hoàn thành"`. Phụ: `"Chọn hành động thay thế"`, `"Thoát về thư viện"`.
- **Trạng thái thành công:** Hoàn tất không cần tài khoản, thấy rõ kiến thức rút ra và nguồn kiểm chứng, không mất trạng thái bất ngờ.
- **Lỗi / Không khả dụng:** Mất kết nối/tải lỗi dữ liệu thẻ → hiện `ErrorState` có nút thử lại và lối về `/games`; tải lại trang giữa chừng → thông báo khôi phục phiên cục bộ (`sessionStorage`) hoặc bắt đầu lại (không hứa lưu server).
- **Tiếp cận:** Không ép đồng hồ đếm ngược mặc định; không bắt buộc kéo-thả, âm thanh hay ghi hình; phản hồi công bố qua `aria-live="polite"`.
- **Phụ thuộc:** **[BLOCKED]** `BR-T005` (duyệt >=5 thẻ + nguồn từ đội nội dung) và `BR-T006` (engine chơi thử).

### J-04: Người dùng bàn phím & công nghệ hỗ trợ (Keyboard / Assistive Tech User)
- **Điểm vào:** Bất kỳ route nào (`/`, `/games`, `/games/*`).
- **Mục tiêu:** Điều hướng toàn bộ nội dung, mở/đóng menu, di chuyển giữa các trang và hoàn thành chơi thử chỉ bằng bàn phím hoặc trình đọc màn hình.
- **Quyết định chính:** Bỏ qua header bằng skip-link? Chuyển vùng bằng landmarks/headings? Tắt hiệu ứng chuyển động qua cài đặt hệ điều hành?
- **Chuyển màn hình:** `Tab` đầu tiên → `skip-link` (`#main-content`) → landmarks (`banner`, `navigation`, `main`, `contentinfo`) → chuyển route tự động đưa focus lên `<main>` hoặc `<h1>` trang mới và cập nhật `document.title`.
- **Hành động chính / phụ:** `Tab` / `Shift+Tab`, `Enter` / `Space`, `Escape` đóng menu/dialog và trả focus về nút kích hoạt.
- **Trạng thái thành công:** Không bẫy focus (keyboard trap), mọi control có tên tiếp cận (accessible name) rõ ràng, ảnh trang trí gắn `aria-hidden="true"`.
- **Lỗi / Không khả dụng:** Thông báo lỗi gắn `role="alert"` hoặc liên kết `aria-describedby`; không biến `<div>` thành nút bấm.
- **Tiếp cận:** Ghi nhận trung thực giới hạn WCAG 2.2.2 trên Hero V4 (`BR-T020`); các scene mới H02–H06 và trang `/games` không tự động mở rộng ngoại lệ motion liên tục > 5 giây.
- **Phụ thuộc:** Giữ chuẩn `focusAnchorTarget.ts`, kiểm thử axe-core + bàn phím ở mọi PR Codex.

### J-05: Giáo viên / Trưởng CLB đánh giá tổ chức hoạt động (Educator / Club Organizer)
- **Điểm vào:** `/` hoặc `/games` (từ giới thiệu tại ULIS/trường học).
- **Mục tiêu:** Đánh giá nhanh mục tiêu học tập, thời lượng, độ tin cậy khoa học, khả năng kết hợp bộ thẻ vật lý và hoạt động nhóm.
- **Quyết định chính:** Brainroot có phù hợp lứa tuổi học sinh/sinh viên của mình? Cần bộ thẻ vật lý hay có bản chơi thử? Làm sao liên hệ nhóm?
- **Chuyển màn hình:** `/` → H03 (`Green Play` & `Green Connect`) → `/games` → `/games/fact-act` & `/games/o-an-quan-xanh` → `#about` / `/about` (thông tin liên hệ chính thức).
- **Hành động chính / phụ:** Chính: Xem chi tiết cấu trúc bài học (mục tiêu, chủ đề, cấp độ, hình thức chơi nhóm). Phụ: Xem mục Liên hệ dự án.
- **Trạng thái thành công:** Nắm rõ cấu trúc giáo dục của cả hai sản phẩm, thấy nguồn kiểm chứng minh bạch, biết lộ trình `Green Arena` (R2) chưa ra mắt thay vì bị hiểu nhầm.
- **Lỗi / Không khả dụng:** Nếu thông tin liên hệ chính thức chưa chốt (`BR-T007`) → hiển thị trạng thái chờ cập nhật kênh liên hệ chính thức, không bịa email/SĐT.
- **Tiếp cận:** Bảng thông số sản phẩm (thời lượng, quy mô nhóm, chủ đề) trình bày bằng danh sách ngữ nghĩa `<dl>`, dễ quét nhanh ở zoom 200%.
- **Phụ thuộc:** `BR-T004`, `BR-T007` (xác nhận thông tin đội ngũ & liên hệ chính thức).

### J-06: Người mua bộ bài vật lý tìm nội dung số bổ trợ (Physical Deck Buyer — Future R1/R3)
- **Điểm vào:** QR/đường dẫn in trên hộp bài vật lý hoặc mục `"Sở hữu bộ thẻ vật lý?"` trên `/games/fact-act`.
- **Mục tiêu:** Biết cách kích hoạt nội dung số mở rộng đi kèm bộ bài đã mua.
- **Quyết định chính:** Hiện tại đã mở cổng kích hoạt mã chưa? Nếu chưa, mình có thể xem gì ngay?
- **Chuyển màn hình:**
  - *Ở R0:* `/games/fact-act` → Khối thông tin `"Kết nối bộ thẻ vật lý & số hóa"` nêu rõ tính năng nhập mã kích hoạt đang nằm trong lộ trình sau R0, kèm gợi ý trải nghiệm bản công khai.
  - *Ở R3 (`BR-T017`):* `/activate` → Đăng nhập/Đăng ký → Nhập mã → Xác thực server-side → Mở gói quyền lợi (`entitlement`).
- **Hành động chính / phụ:** R0: Đọc hướng dẫn kết hợp phygital / chơi bản thử công khai. R3: Nhập mã kích hoạt.
- **Trạng thái thành công:** Không bị đánh lừa bởi nút nhập mã giả ở R0; ở R3 không bao giờ lộ danh sách mã hay gói bài trả phí ở frontend bundle.
- **Lỗi / Không khả dụng:** Mã sai/hết hạn/quá lượt (R3) trả về thông báo lỗi chung + hỗ trợ, có rate-limit chống dò mã.
- **Tiếp cận:** QR vật lý đi kèm mã chữ dễ đọc và đường dẫn ngắn cho người dùng không quét được camera.
- **Phụ thuộc:** **[BLOCKED]** `OQ-04` (chốt gói quyền lợi trả phí), `BR-T012` (Auth), `BR-T017` (Activation server-side).

---

## 4. Hệ thống UX/UI Thư viện Trò chơi — Green Play (Đặc tả cho BR-T004 & BR-T006)

> **Lưu ý phạm vi:** Phần này là đặc tả thiết kế cho **M2 (`BR-T004`)** và chuẩn bị cho **M3 (`BR-T006`)**. Chưa triển khai mã nguồn trong `BR-T021`.

### 4.1 `/games` — Green Play Pavilion (Thư viện trò chơi) [PROPOSED]
- **Không khí thị giác:** Một *nhà kính / gian học ngoài trời (Garden Pavilion)* nằm tiếp nối trong khu vườn Brainroot — sáng ấm, thoáng, lấy cảm hứng bảng gỗ/nhà kính và ánh nắng xiên từ Hero V4, không phải trang lưới thẻ game tối màu hay danh mục e-commerce phẳng.
- **Cấu trúc màn hình (Desktop & Mobile):**
  1. **Breadcrumb + Pavilion Intro Banner:** Thanh đường dẫn `Trang chủ / Green Play`, nền minh họa nhẹ `VIS-006` (vùng trống rộng ở giữa/trái cho chữ HTML), `<h1>Green Play</h1>`, mô tả ngắn mục tiêu học kỹ năng xanh qua tương tác và **nhãn phân loại trải nghiệm** (Sản phẩm vật lý · Bản giới thiệu số · Bản thử miễn phí sắp mở).
  2. **Editorial Product Showcase — 2 bố cục bất đối xứng (tránh card lặp giống nhau):**
     - **Showcase 1 — Fact–Act (Vị trí ưu tiên trên, bố cục ngang 55% ảnh / 45% nội dung trên desktop):**
       - Khung sân khấu trưng bày `fact-act-deck.webp` (`VIS-007`) nổi trên nền hình hữu cơ màu đào nhạt `#F4D0BA` + chi tiết lá vector nhẹ (`VIS-009`).
       - Bên phải: Badge loại (`Bộ thẻ vật lý · Bản chơi thử R0`), tiêu đề `Fact–Act`, 1 câu giá trị học tập, 3 thẻ thông tin gọn (`Hình thức: Cá nhân / Nhóm`, `Cơ chế: Khám phá Fact → Hành động Act`, `Trạng thái: Đang hoàn thiện bản chơi thử`), CTA chính `"Khám phá Fact–Act"` → `/games/fact-act`.
     - **Showcase 2 — Ô ăn quan xanh (Bố cục đảo chiều 45% nội dung / 55% khung minh họa trên desktop):**
       - Khung trưng bày minh họa khái niệm `VIS-008` trên nền xanh sage dịu `#DBE9DD`, gắn nhãn minh bạch `"Minh họa khái niệm — Luật số đang chuẩn hóa"`.
       - Bên trái: Badge loại (`Trò chơi dân gian xanh · Đang chuẩn hóa luật`), tiêu đề `Ô ăn quan xanh`, tóm tắt **5 chủ đề** (`Tiêu dùng bền vững`, `Nước`, `Năng lượng`, `Rác thải`, `Không gian xanh`) và **3 cấp độ** (`Nhận biết`, `Ra quyết định`, `Giải quyết vấn đề`), CTA `"Tìm hiểu Ô ăn quan xanh"` → `/games/o-an-quan-xanh`.
  3. **Khối minh bạch Phygital & Lối quay về:** Giải thích ngắn mối quan hệ giữa sản phẩm vật lý và trải nghiệm số miễn phí (không ép đăng nhập), kèm liên kết rõ quay về `/` (`Trang chủ`).

### 4.2 `/games/fact-act` — Trang chi tiết Fact–Act [PROPOSED]
- **Hero sản phẩm 2 cột:** Trái là thông tin ngữ nghĩa (Breadcrumb `Trang chủ / Green Play / Fact–Act`, `<h1>Fact–Act</h1>`, trạng thái khả dụng rõ, mô tả mục tiêu học tập, 1 CTA chính theo trạng thái thực: khi chưa có `BR-T006` thì dẫn tới khối `#how-it-works` kèm nhãn `"Bản chơi thử đang kiểm duyệt nội dung"`, khi `BR-T006` xong thì dẫn tới `/games/fact-act/play`). Phải là sân khấu hiển thị `fact-act-deck.webp` gốc.
- **Cấu trúc nội dung:**
  1. *Fact–Act là gì & học được gì?* — Nhấn mạnh 2 nhịp: **Fact** (khám phá sự thật môi trường gần gũi) và **Act** (chuyển hóa thành lựa chọn/hành động có thể thực hiện và phản tư).
  2. *Cơ chế trải nghiệm 3 bước* — Dạng Stepper minh họa bằng icon vector nhỏ: `1. Rút thẻ & đọc ngữ cảnh` → `2. Suy nghĩ / Chọn hành động` → `3. Đối chiếu nguồn & phản tư`.
  3. *Sản phẩm vật lý & Trải nghiệm số (Phygital)* — Bảng đối chiếu trung thực 2 cột: **Bản chơi thử công khai trên web** (một số thẻ mẫu đã duyệt, không cần đăng nhập) vs **Bộ thẻ vật lý Fact–Act** (bộ thẻ đầy đủ dùng cho nhóm/lớp học; không công khai toàn bộ nội dung bộ bài trả phí lên web).
  4. *Lưu ý tiếp cận & an toàn* — Cam kết các thử thách hành động luôn có phương án thay thế phù hợp với mọi người học.
- **Ràng buộc cấm:** Không tạo ảnh mặt thẻ giả, không bịa sự thật khoa học chưa duyệt, không công khai danh sách thẻ trả phí.

### 4.3 `/games/o-an-quan-xanh` — Trang chi tiết Ô ăn quan xanh [PROPOSED]
- **Hero sản phẩm:** Breadcrumb `Trang chủ / Green Play / Ô ăn quan xanh`, `<h1>Ô ăn quan xanh</h1>`, nhãn trạng thái nổi bật `"Trang giới thiệu sản phẩm — Luật bản số đang chuẩn hóa"`, khung minh họa khái niệm `VIS-008` kèm chú thích rõ *"Hình minh họa định hướng trải nghiệm, không phải bàn cờ hoàn chỉnh chính thức"*.
- **Cấu trúc nội dung (dựa hoàn toàn vào dữ liệu [VERIFIED] trong `docs/GAME_SPEC.md`):**
  1. *5 chủ đề môi trường:* Hiển thị dạng 5 thẻ nhỏ có biểu tượng vector riêng và tên chủ đề: `Tiêu dùng bền vững`, `Nước`, `Năng lượng`, `Rác thải`, `Không gian xanh`.
  2. *3 cấp độ tư duy xanh:* Bậc thang trực quan 3 mức `Mức 1: Nhận biết` → `Mức 2: Ra quyết định` → `Mức 3: Giải quyết vấn đề`.
  3. *Trạng thái phát triển minh bạch:* Nêu rõ kho câu hỏi đang được đội nội dung rà soát khoa học (`BR-T005`) và luật bàn cờ số hóa đang chờ chuẩn hóa (`OQ-08`), tránh tự suy diễn luật chơi truyền thống thành luật chính thức.
  4. *Điều hướng tiếp theo:* Nút quay về `/games` hoặc xem sang `/games/fact-act`.

### 4.4 Đặc tả khung giao diện chơi thử tương lai (Cho BR-T006 — [PROPOSED] / [BLOCKED] bởi BR-T005)
- **Các trạng thái bắt buộc theo `GAME_SPEC.md`:** `ready | in_progress | completed | locked | unavailable`.
- **Luồng màn hình tối giản, tập trung học tập (max-width `760px`, nền `#F8F3E9`, mặt thẻ `#FFFFFF` viền mềm):**
  1. **Màn hình hướng dẫn (`InstructionPanel`):** Mục tiêu học tập, số thẻ mẫu, thời lượng ước tính, chế độ không giới hạn thời gian mặc định, nút `"Bắt đầu chơi thử"` và `"Quay lại chi tiết"`.
  2. **Thanh tiến độ & thoát an toàn:** `ProgressIndicator` (`Thẻ 2 / 5`) + nút `"Thoát phiên"` mở `Dialog` xác nhận nếu đang chơi dở.
  3. **Hiển thị thẻ giáo dục (`EducationalContentCard`):** Phân biệt rõ thẻ `Fact` (màu nhấn sage `#A6C6B6`) và thẻ `Act` (màu nhấn peach `#E79A7C`), kèm nhãn chữ (không dùng màu đơn lẻ).
  4. **Khu vực tương tác:** Nút lựa chọn kích thước lớn (`min-height: 48px`), chọn bằng chuột/chạm hoặc bàn phím (`Tab`/`Enter`/`Space`, không phụ thuộc kéo-thả hay âm thanh). Với thẻ hành động ngoài đời thực, luôn có nút phụ `"Chọn phương án phản tư thay thế"` (không trừ điểm).
  5. **Phản hồi & Trích dẫn (`FeedbackPanel` + `SourceCitation`):** Công bố qua `aria-live="polite"`; hiển thị giải thích có điều kiện, nguồn kiểm chứng (tên nguồn, tổ chức, ngày rà soát) hoặc ghi rõ *"Câu hỏi phản tư mở — không có một đáp án duy nhất"*.
  6. **Màn hình hoàn thành (`CompletionView`):** Tóm tắt chủ đề đã đi qua, ghi nhận phản tư cá nhân (không phóng đại tác động thực tế), 2 nút: `"Chơi lại bản thử"` và `"Về Thư viện trò chơi"`.
  7. **Trạng thái lỗi / khóa (`UnavailableState`):** Hiển thị lý do trung thực + nút thử lại / quay về `/games`; tuyệt đối không gửi dữ liệu thẻ trả phí xuống client.

---

## 5. Hệ thống Thiết kế Toàn cục (Global Design System — [PROPOSED] mở rộng từ `tokens.css`)

### 5.1 Nền tảng (Foundations)
- **Màu sắc (kế thừa 100% `src/styles/tokens.css` [VERIFIED] + bổ sung token ngữ nghĩa cho `/games`):**
  - Chính **[APPROVED]**: `--color-peach: #E79A7C`, `--color-sage: #A6C6B6`, `--color-ivory: #F8F3E9`, `--color-ink: #263B31`, `--color-headline: #63894C`.
  - Mở rộng hiện có **[VERIFIED]**: `--color-headline-on-hero: #53743E`, `--color-forest: #2D563F`, `--color-forest-deep: #244A35`, `--color-ink-secondary: #3F5542`, `--color-ink-muted: #465D49`, `--color-paper: #FFFFFF`, `--color-danger: #A82A35`, `--color-focus-ring: #174E42`.
  - Bề mặt khu vực **[VERIFIED / PROPOSED]**: `--surface-play: #F4D0BA`, `--surface-quest: #DBE9DD`, `--surface-learn: #FFF7E9`, `--surface-connect: #E8ECDB`, `--surface-elevated: rgba(255, 252, 245, 0.92)` (cho khung nội dung nằm trên nền minh họa, bảo đảm tương phản >= 4.5:1).
- **Typography (`Be Vietnam Pro` [APPROVED]):**
  - `Display Hero (h1 Hero)`: `clamp(54px, 7vw, 120px)` / `900` / `line-height: 1.13`.
  - `Page H1 (Subpages)`: `clamp(32px, 4.2vw, 56px)` / `800` / `line-height: 1.16` / `letter-spacing: -0.04em`.
  - `Section H2`: `clamp(27px, 3.2vw, 44px)` / `800` / `line-height: 1.24`.
  - `Card / Feature H3`: `clamp(20px, 2vw, 26px)` / `800` / `line-height: 1.3`.
  - `Body Editorial`: `16px` (`min 15px` trên mobile) / `400–500` / `line-height: 1.75` / `max-width: 65ch`.
  - `Overline / Meta`: `12px` / `700–800` / `letter-spacing: 0.12em–0.15em`.
- **Spacing, Containers & Grids:**
  - Thang đo 4px: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 88px`.
  - Containers: Header `1450px`, World/Library `1200px`, Reading/Gameplay `760px`.
  - Grids: Hero full-bleed; Four Worlds bất đối xứng 12-cột trên desktop (Green Play chiếm vùng nhấn nổi bật 7 cột hoặc hàng đầu riêng, 3 vùng còn lại phân nhịp hữu cơ) → 1 cột trên mobile; Game Showcase 2 cột 55/45 đảo chiều → 1 cột trên mobile.
- **Bo góc, Đổ bóng & Xử lý bề mặt minh họa:**
  - Không bo giống nhau mọi thứ: nút chính `999px` (pill), thẻ sản phẩm lớn `28px`, khung nội dung học `20px`, nhãn trạng thái `10px`, trường nhập liệu `12px`.
  - Bề mặt nằm trên nền minh họa dùng lớp lót kem ấm độ mờ cao (`rgba(255, 251, 242, 0.92)`) + viền mảnh `1px solid rgba(38, 59, 49, 0.1)`, tránh glassmorphism mờ đục gây giảm độ đọc.
- **Hệ thống phân cấp nút (Button Hierarchy):**
  - `Primary`: Nền `#E79A7C`, chữ `#263B31` (`800`), tối đa 1 nút trên mỗi màn hình chính.
  - `Secondary`: Nền `#DBE9DD` hoặc `#FFFFFF` viền `1.5px solid rgba(38, 59, 49, 0.22)`, chữ `#244A35`.
  - `Tertiary / Text Link`: Chữ `#244A35` gạch chân mảnh khi hover/focus, mũi tên chỉ hướng.
  - `Disabled / Upcoming`: Không dùng nút giả có màu như nút bấm; thay bằng `StatusLabel` không tương tác hoặc nút thông tin dẫn đến mục giải thích lộ trình.
- **Breakpoints:** `>= 1440px` (Wide), `1280px` (Desktop), `<= 1050px` (Tablet ngang), `<= 768px` (Tablet dọc), `<= 720px` (Mobile nav switch), `390px` (Mobile chuẩn), `360px` (Mobile gọn), `320px` (Small mobile).

### 5.2 Thư viện thành phần (15 Component Specifications — [PROPOSED])

| # | Component | Mục đích | Cấu trúc (Anatomy) | Biến thể (Variants) | Trạng thái tương tác | Bàn phím & A11y | Mobile & Phụ thuộc tài sản |
|---|---|---|---|---|---|---|---|
| 1 | `SiteHeader` | Điều hướng toàn cục | Brand wordmark + Nav pill + Mobile toggle | `overlay-hero` (trên `/`), `solid-ivory` (trên `/games`, `/about`) | Hover, focus-visible, `aria-current="page"` | Landmark `banner` + `navigation`; `Escape` đóng & trả focus | Chuyển drawer ở `<= 720px`; không phụ thuộc ảnh raster |
| 2 | `MobileNavDrawer` | Menu điều hướng màn nhỏ | Panel thả xuống + danh sách link + nút đóng X | Mặc định | Open/closed, active item | `aria-expanded`, `aria-controls`, `Escape` + click ngoài đóng | Rộng `min(240px, calc(100vw - 32px))`, vùng chạm `>= 44px` |
| 3 | `ActionButton` (`PrimaryCTA` / Secondary) | Hành động điều hướng/tác vụ | Label + icon hướng `aria-hidden` | `primary` (`#E79A7C`), `secondary`, `ghost` | Hover lift `-2px`, active, focus ring `3px` | Dùng `<a>` cho điều hướng, `<button>` cho hành động | `min-height: 48px`; không phụ thuộc ảnh |
| 4 | `DestinationLandmark` | Điểm đến trong Scene H03 (4 vùng) | Minh họa (`L2`) + khung chữ (`L4`: Overline/Status, H3, mô tả, hành động hoặc ghi chú) | `featured` (Green Play), `roadmap` (Quest/Learn/Connect) | Hover/focus nhấc nhẹ minh họa (`<= 4px`), viền nhấn | `<article aria-labelledby>` + link thật chỉ khi route tồn tại | Xếp dọc 1 cột, ảnh nằm trên/cạnh gọn, tỉ lệ 16:10; cần `VIS-002..005` |
| 5 | `GameProductShowcase` | Trưng bày sản phẩm trên `/games` | Sân khấu ảnh/minh họa + khối nội dung + metadata `<dl>` + CTA | `image-left` (Fact–Act), `image-right` (Ô ăn quan xanh) | Hover nhẹ khung ảnh, focus rõ trên CTA | `<article>`, `alt` mô tả sản phẩm có nghĩa | Xếp dọc ảnh trên, chữ dưới; cần `VIS-007`, `VIS-008` |
| 6 | `ProductStatusLabel` | Báo trạng thái trung thực | Chấm/icon ngữ nghĩa + chữ ngắn | `playable`, `in-progress`, `concept`, `physical`, `coming-soon` | Tĩnh (không click được) | Luôn có chữ mô tả rõ, không dùng màu đơn lẻ | Tự co gọn không vỡ dòng; chỉ dùng CSS/SVG |
| 7 | `Breadcrumbs` | Định vị phân cấp ở trang con | `<nav aria-label="Đường dẫn">` + `<ol>` + dấu phân tách `/` | Chuẩn 2–3 cấp | Hover/focus link cha; mục cuối `aria-current="page"` | Danh sách `<ol>` chuẩn WAI-ARIA | Cho phép wrap mềm ở 320px; không cần ảnh |
| 8 | `EducationalContentCard` | Hiển thị thẻ Fact / Act trong M3 | Nhãn loại thẻ + tiêu đề/câu hỏi + nội dung ngữ cảnh | `fact` (sage), `act` (peach), `decision` | Trạng thái reveal nhẹ khi mở thẻ | Heading đúng cấp, đọc tuần tự từ nhãn → đề bài | Padding `20px`, chữ >= `16px`; tùy chọn icon SVG |
| 9 | `GameInstructionPanel` | Hướng dẫn trước khi chơi (M3) | Tiêu đề + 3 gạch đầu dòng ngắn + thông số không giới hạn thời gian + CTA bắt đầu | Chuẩn | Focus tự động khi vào phiên nếu phù hợp | Không ép đọc nhanh; nút quay lại rõ | Full-width `max-width: 680px` |
| 10 | `ProgressIndicator` | Tiến độ phiên chơi (M3) | Nhãn chữ `Thẻ X / Y` + thanh tiến độ trực quan | Stepped / Linear | Cập nhật mượt theo bước | `role="progressbar"` với `aria-valuenow/min/max` + văn bản | Chiều cao gọn `36px`; thuần CSS |
| 11 | `FeedbackPanel` | Phản hồi sau trả lời/chọn (M3) | Trạng thái + lời giải có điều kiện + gợi ý hành động | `correct-info`, `reflective`, `hint` | Xuất hiện mượt (fade/slide nhẹ) | `aria-live="polite"`, không chỉ dựa màu xanh/đỏ | Đủ khoảng cách trên nút `"Tiếp theo"` |
| 12 | `SourceCitation` | Trích dẫn nguồn khoa học | Tên nguồn, tổ chức, ngày rà soát, link ngoài (nếu có) | `inline-card`, `footer-list` | Hover link nguồn rõ ràng | Ghi chú mở tab/nguồn ngoài rõ, contrast >= 4.5:1 | Chữ `13px–14px`, tự ngắt dòng URL dài |
| 13 | `ModalDialog` | Xác nhận thoát game / xem ảnh lớn | Backdrop + `<dialog>` + tiêu đề + nội dung + 2 nút | `confirm`, `info` | Open/close | Native `<dialog>` hoặc focus trap chuẩn, `Escape` đóng & trả focus | Rộng `calc(100vw - 32px)`, max `480px` |
| 14 | `EmptyUnavailableState` | Trạng thái lỗi / chưa mở / thiếu mạng | Minh họa nhỏ hoặc icon lá + giải thích trung thực + hành động hồi phục | `unavailable`, `error`, `not-found` | Nút thử lại / về Trang chủ | `role="status"` hoặc `role="alert"` | Căn giữa, padding thoáng; dùng SVG nhẹ |
| 15 | `SiteFooter` | Kết thúc hành trình Living World | Dải họa tiết thực vật mảnh + Brand + Sứ mệnh + 2 nhóm link hợp lệ + dòng bản quyền/trạng thái | Chuẩn toàn site | Hover/focus link | Landmark `contentinfo`, cấu trúc cột rõ | Xếp 1 cột căn trái/giữa ở `<= 720px`; dùng `VIS-009` SVG |

### 5.3 Chiến lược Responsive & Zoom 200% [PROPOSED]
| Viewport | Chiến lược bố cục | Xử lý minh họa (Art Direction) |
|---|---|---|
| **1440×900** | Khung rộng đầy đủ: Hero 100svh, H03 bản đồ 4 điểm đến bất đối xứng 2 hàng, H04 showcase 2 cột, `/games` pavilion rộng. | Hiển thị đủ 3 lớp parallax Hero và khung nền ngang 16:9 / 21:9. |
| **1280px** | Giữ cấu trúc 2 cột nhưng giảm padding ngang (`clamp(22px, 4vw, 56px)`), co tỉ lệ minh họa `L2` theo `clamp()`. | Giữ nguyên crop ngang, đảm bảo text-safe zone không bị viền lá che. |
| **768px (Tablet)** | H03 chuyển thành lưới 2×2 cân bằng hoặc 1 thẻ nổi bật trên + 3 thẻ dưới; `/games` showcase chuyển sang bố cục xếp dọc gọn. | Ẩn hoặc thu nhỏ lá trang trí rìa màn hình (`VIS-009`) để tránh chật chữ. |
| **390×844 (Mobile chuẩn)** | Điều hướng drawer; H03 chuyển thành hành trình dọc 1 cột (mỗi điểm đến có khung minh họa 16:10 phía trên, khối chữ kem phía dưới); tắt scroll parallax. | Dùng vùng crop trung tâm (`object-position: center`) hoặc biến thể nền dọc gọn cho H02/H03, tuyệt đối không thu nhỏ bản đồ ngang desktop thành hotspot tí hon. |
| **360px & 320px (Small mobile)** | Giảm padding container xuống `16px`, `h1` co bằng `clamp()`, nút bấm full-width khi cần (`min-height: 48px`), tiêu đề thẻ `20px`. | Kiểm tra bắt buộc `scrollWidth === clientWidth` (0 tràn ngang), không để lá trang trí chạm chữ. |
| **Zoom 200% (Desktop 1280px → 640px CSS)** | Tự động kích hoạt breakpoint mobile/tablet (`<= 720px`), menu chuyển sang nút toggle, mọi lưới về 1 cột, chữ giữ dễ đọc không cắt xén. | Giữ `min-height` linh hoạt (tránh khóa cứng `height` nhỏ gây tràn chữ ra khỏi hộp). |

---

## 6. Hệ thống Chuyển động & Tương tác Thống nhất (Motion & Interaction System)

### 6.1 Phân tầng chuyển động [APPROVED + PROPOSED]
1. **Ambient Motion (Chuyển động nền môi trường):**
   - **Scene H01 (Hero V4) — [APPROVED] (`BR-T020`):** Giữ nguyên Brainie, Rootie và 2 lá bay lặp liên tục lệch pha khi tab hiển thị, tạm dừng khi tab ẩn (`data-motion-paused` / `document.hidden`), tắt hoàn toàn khi `prefers-reduced-motion: reduce`.
   - **Các scene mới (H02–H06 & `/games`) — [PROPOSED]:** **Không** lặp vô hạn đồng loạt ở mọi khu vực. Chỉ dùng hiệu ứng xuất hiện một lần khi cuộn vào khung nhìn (`IntersectionObserver`, thời lượng `<= 650ms`) hoặc chuyển động phản hồi theo tương tác người dùng. Điều này giữ Hero làm "trái tim sống động" nhất, tiết kiệm pin mobile và **không nhân rộng giới hạn WCAG 2.2.2 ra toàn website**.
2. **User-triggered Motion (Chuyển động gắn hành động — [PROPOSED]):**
   - Hover / Focus vào điểm đến (H03) hoặc thẻ trò chơi (`/games`): dịch nhẹ ảnh minh họa `translateY(-4px)` (`220ms cubic-bezier(0.22, 1, 0.36, 1)`), làm nổi viền mềm.
   - Chuyển trang / mở tiết mục: fade-in nhẹ nội dung (`180ms`), không gây chóng mặt.
   - Tương lai (`BR-T006`): lật/rút thẻ Fact–Act bằng CSS transform `rotateY`/`translateY` (`280ms`), có phương án đổi trạng thái tức thời khi bật reduced motion.
   - **Cấm tuyệt đối:** Chức năng chỉ hoạt động khi hover (hover-only), scroll-jacking, nhấp nháy > 3 lần/giây, WebGL/Three.js không cần thiết.

### 6.2 Kỹ thuật triển khai & Hồ sơ Quyết định Tiếp cận (WCAG 2.2.2)
- **Kỹ thuật:** Ưu tiên CSS transitions/keyframes + `IntersectionObserver` + React state; chỉ dùng `requestAnimationFrame` cho parallax Hero hiện có (`useHeroParallax.ts`). Không cài thư viện animation nặng (GSAP/Framer/Three.js) khi CSS thuần đã giải quyết tốt.
- **Hồ sơ A11y [VERIFIED]:** Giữ nguyên ghi nhận giới hạn WCAG 2.2.2 của Hero V4 trong `docs/ACCESSIBILITY.md`; không tuyên bố toàn trang đạt WCAG 2.2 AA. Mọi scene mới H02–H06, `/games` và `/games/*` thiết kế để **đạt WCAG 2.2.2** (không có animation tự động lặp > 5 giây).

---

## 7. Nội dung UX & Quy tắc Trung thực Sản phẩm

- Phân biệt rạch ròi bằng ngôn từ và nhãn trạng thái 5 khái niệm:
  1. **Sản phẩm giáo dục vật lý** (Bộ bài Fact–Act, bộ thẻ Ô ăn quan xanh).
  2. **Trang giới thiệu sản phẩm** (`/games/fact-act`, `/games/o-an-quan-xanh` ở M2).
  3. **Bản chơi thử số miễn phí** (giới hạn số thẻ đã kiểm duyệt ở M3, không cần đăng nhập).
  4. **Tính năng đang phát triển theo lộ trình** (Green Quest, Green Learn, Green Connect, Green Arena).
  5. **Nội dung mở rộng dành cho người sở hữu bộ bài** (R3, bảo vệ server-side).
- Không tự bịa số liệu khảo sát 200 mẫu như kết quả kiểm chứng độc lập, không bịa ảnh đội ngũ/đối tác, không bịa giá bán hay trích dẫn khoa học.

---

## 8. Lộ trình triển khai theo Milestone (Dependency-Aware Roadmap)

| Milestone | Phạm vi chính | Phụ thuộc | Sản phẩm đầu ra | Tài sản cần | Phụ trách chính | Cổng duyệt |
|---|---|---|---|---|---|---|
| **M0 — Master Blueprint** (`BR-T021`) | Audit, IA, Storyboard H01–H06, Asset Register, Checklist | Đã hoàn thành `BR-T003` + `BR-T020` | 4 tài liệu chuẩn trong `docs/` & `planning/` | Kiểm kê tài sản hiện có | Google AI Studio (thiết kế) → Owner duyệt | **GATE A, B, C** |
| **M1 — Homepage Visual Upgrade** | Nâng cấp H02 (Garden Transition), H03 (Four Worlds Living Wayfinding), H04 (Featured Green Play), H05 (Story), H06 (Footer) — giữ nguyên H01 | GATE A/B/C/D PASS + tài sản đợt 1 | Homepage liền mạch 1 thế giới sống + unit/browser QA | `VIS-001` (hoặc SVG/WebP gọn), `VIS-002..005`, `VIS-007` (sẵn), `VIS-009`, `VIS-010` | AI Studio (UI) → Codex (review & QA) | **GATE E, F, G** |
| **M2 — `BR-T004` Game Library** | Router + `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, trạng thái trung thực, breadcrumb | GATE A/B/C/D + chốt cài router tối giản | Thư viện & 2 trang chi tiết sản phẩm hoạt động đầy đủ | `VIS-006`, `VIS-007` (sẵn), `VIS-008`, `VIS-009` | AI Studio (UI) → Codex (review & QA) | **GATE E, F, G** |
| **M3 — `BR-T005` & `BR-T006`** | Duyệt >=5 mục nội dung có nguồn (`BR-T005`), dựng 1 vòng chơi thử end-to-end (`BR-T006`) | `BR-T004` DONE + `BR-T005` DONE + chốt `OQ-01` | 1 game chơi thử hoàn chỉnh cho khách + phản hồi có nguồn + guest E2E | `VIS-011` (icon/UI thẻ mẫu nếu cần) | Team Content (`BR-T005`) → Codex + AI Studio (`BR-T006`) | **GATE F, G** |
| **M4 — R0 Quality Gate** (`BR-T007`, `BR-T008`, `BR-T009`) | Trang `/about`, kiểm toán tổng thể A11y/Hiệu năng/E2E, đóng gói demo & hồ sơ sơ tuyển | M1–M3 DONE + chốt liên hệ/thông tin đội ngũ | Bản R0 sẵn sàng demo trên desktop/mobile + báo cáo QA | Kiểm tra lại quyền sử dụng `BR-T002` | Codex + Team + Owner | **GATE G** |
| **Future (R1–R3)** | Green Quest Lite, Auth/Progress, Green Arena (R2 24h), Paid Activation, Green Pulse, Buddy | Quyết định `OQ-04..OQ-12` | Mở rộng theo giai đoạn | Theo đợt sau | Theo phân công mới | Phê duyệt riêng |

> **Ưu tiên chiến lược R0:** Nếu quỹ thời gian hạn chế trước mốc sơ tuyển, có thể chạy **M2 (`BR-T004` Game Library) song song hoặc ngay trước một phần tranh minh họa phức tạp của M1** bằng gói tài sản tối giản (Wave 1A), bảo đảm ưu tiên **trải nghiệm giáo dục R0 hoạt động thật** thay vì kéo dài phần trang trí.

---

## 9. Phản biện thiết kế & Cổng phê duyệt (Design Critique & Quality Gates)

### 9.1 Đánh giá thẳng thắn trên 10 tiêu chí
1. **Nhất quán với Hero V4:** Cao nếu giữ chặt bảng màu ấm, ánh nắng xiên, nét vẽ 2D mềm và không pha trộn ảnh 3D hay flat corporate vector.
2. **Tính độc đáo của thế giới minh họa:** Tốt với ý tưởng *Garden Transition → Living Wayfinding → Garden Pavilion*, tránh được cảm giác SaaS/template thẻ lặp.
3. **Độ rõ UX cho người mới:** Mạnh nhờ phân biệt rạch ròi 1 CTA chính ở Hero, nhấn mạnh `Green Play` ở R0 và gắn nhãn trạng thái trung thực.
4. **Cân bằng minh họa & nội dung chức năng:** Có nguy cơ chữ bị lấn át nếu vẽ nền quá nhiều chi tiết; cần kỷ luật nghiêm ngặt vùng trống `text-safe zone` và lớp lót kem mờ nhẹ.
5. **Khả năng dùng trên mobile:** Tốt vì chủ động tách bố cục mobile thành hành trình dọc thay vì co nhỏ bản đồ ngang desktop.
6. **Tiếp cận (Accessibility):** Vẫn tồn tại giới hạn WCAG 2.2.2 đã chấp nhận trên Hero V4; các phân khu mới giải quyết triệt để bằng cách không dùng animation lặp vô hạn.
7. **Hiệu năng & khả thi kỹ thuật:** Khả thi cao trên Vite + React + CSS thuần, nhưng tổng dung lượng WebP sẽ phình to nếu xuất quá nhiều tranh full-bleed độ phân giải cao.
8. **Chi phí sản xuất tài sản:** **Đây là rủi ro lớn nhất.** Nếu tạo 10 tranh minh họa raster hoàn chỉnh ngay từ đầu sẽ tốn nhiều vòng chỉnh phong cách và làm chậm `BR-T004`/`BR-T006`.
9. **Tính bền vững của Design System:** Tốt nhờ tái sử dụng toàn bộ biến CSS trong `src/styles/tokens.css` và cấu trúc component module hóa.
10. **Phù hợp lộ trình R0:** Cần kiểm soát chặt để M1 không chặn đường tới `BR-T004` và `BR-T006` (trải nghiệm chơi thử thật).

### 9.2 6 Rủi ro / Điểm yếu cụ thể & Hướng khắc phục đề xuất
1. **Rủi ro lệch phong cách nét vẽ (Art-style drift)** giữa Hero V4 và các tranh mới (`VIS-001..008`) → *Khắc phục:* Giảm số lượng tranh raster sinh mới xuống mức tối thiểu (Wave 1A chỉ gồm 5 tài sản trọng tâm), dùng chung bảng màu hex, góc sáng từ trên-trái và brief chuẩn hóa trong `VISUAL_ASSET_REGISTER.md`; dùng SVG/CSS cho dải chuyển tiếp H02, lá tiền cảnh `VIS-009` và chuỗi nảy mầm H05.
2. **Rủi ro ngân sách tải trang mobile (LCP > 2,5s)** nếu thêm nhiều ảnh WebP lớn → *Khắc phục:* Giới hạn mỗi ảnh cảnh `<= 160 KB`, mỗi minh họa điểm đến `<= 70 KB`, bắt buộc `loading="lazy"` và `width`/`height` cho mọi ảnh từ H02 trở xuống, giữ `fetchPriority="high"` chỉ cho Hero.
3. **Rủi ro nghẽn tiến độ R0 do chờ đủ bộ 10 tài sản** → *Khắc phục:* Chia sản xuất thành **Đợt 1A (tối giản cho M1 + M2)** và **Đợt 1B (nâng cấp sâu)**; tái sử dụng ngay `fact-act-deck.webp` đã có sẵn.
4. **Rủi ro chưa có Router trong `package.json`** khi sang `BR-T004` → *Khắc phục:* Phê duyệt rõ trước khi mở `BR-T004` việc dùng router nhẹ (`react-router-dom` hoặc History API hook) và cấu hình fallback route khi build/preview SPA.
5. **Rủi ro pháp lý tài sản gốc (`BR-T002`)** với `brainie.webp`, `rootie.webp`, `fact-act-deck.webp` → *Khắc phục:* Giữ trạng thái `BLOCKED` cho phát hành thương mại công khai đến khi đội ngũ xác minh xong nguồn Canva/bản quyền; tuyệt đối không tải tài sản gốc lên công cụ sinh ảnh bên thứ ba khi chưa được phép.
6. **Rủi ro hiểu nhầm về `Ô ăn quan xanh`** nếu minh họa khái niệm `VIS-008` trông quá giống bàn cờ chính thức → *Khắc phục:* Luôn kèm chú thích rõ *"Minh họa khái niệm — luật bản số đang chuẩn hóa"* và không vẽ nút chơi giả lên ảnh.

### 9.3 Cổng phê duyệt (Approval Gates)
- **GATE A** — Phê duyệt Kiến trúc thông tin (IA) & Hành trình người dùng *(Đang trình duyệt)*
- **GATE B** — Phê duyệt Kịch bản phân cảnh Homepage (`docs/UX_UI_STORYBOARD.md`) *(Đang trình duyệt)*
- **GATE C** — Phê duyệt Sổ đăng ký tài sản & Đợt sản xuất đầu tiên (`planning/VISUAL_ASSET_REGISTER.md`) *(Đang trình duyệt)*
- **GATE D** — Tài sản Đợt 1 được cung cấp, kiểm tra chất lượng & bản quyền nội bộ
- **GATE E** — Hoàn thành triển khai giao diện theo milestone (Google AI Studio)
- **GATE F** — Hoàn thành review mã nguồn, kiểm thử tự động & A11y (Codex)
- **GATE G** — Product Owner nghiệm thu milestone
