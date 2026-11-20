# BRAINROOT 2.0 — VISUAL ASSET REGISTER & PRODUCTION BRIEFS (Rev 1.1)

**Task ID:** `BR-T021`  
**Trạng thái:** `IN_REVIEW` (Rev 1.1 sau Design Review) — Chờ đồng bộ GitHub và duyệt **GATE C** trước khi sản xuất bất kỳ tài sản mới nào.

## 1. Phân loại Kiến trúc Tài sản (6 Nhóm bắt buộc — Không đánh đồng ảnh phẳng với cảnh có thể animate)

Mỗi tài sản trong hệ thống bắt buộc thuộc đúng một nhóm kiến trúc sau:
1. **`Flattened background illustration`**: Tranh nền/cảnh 1 lớp phẳng (hoặc mặt nạ mềm đã gộp). **Không** có khả năng di chuyển độc lập từng chi tiết bên trong; chỉ hiển thị tĩnh hoặc parallax biên độ rất nhỏ (`< 12px` ở Hero).
2. **`Transparent foreground cutout`**: Ảnh cắt nền trong suốt (WebP/PNG có kênh alpha sạch) đặt ở lớp `L3` để phủ mép chuyển cảnh hoặc tạo chiều sâu khung viền.
3. **`Independent animated object`**: Vật thể/nhân vật có nền trong suốt hoặc cấu trúc tách lớp độc lập, **được phép dịch chuyển/xoay/chuyển pha độc lập** bằng CSS transform (`translate`/`rotate`/`opacity`).
4. **`Reusable SVG decoration`**: Vector nhẹ có thể tái sử dụng nhiều nơi (đường mòn bản đồ, viền thực vật, chuỗi minh họa nét vẽ tay đồng bộ).
5. **`Actual product artwork`**: Ảnh/render sản phẩm thật do đội ngũ Brainroot cung cấp. **Tuyệt đối không vẽ lại, sinh lại hoặc gửi lên dịch vụ tạo ảnh ngoài** khi chưa duyệt bản quyền (`BR-T002`).
6. **`HTML/UI layer`**: Văn bản, nút bấm, nhãn trạng thái, điều hướng bằng DOM ngữ nghĩa thật — **không bao giờ nướng (bake) vào ảnh**.

### Danh sách đối tượng được phép chuyển động độc lập (Movable Objects)
- **[VERIFIED — Hiện hữu]:** `EX-005` (`brainie.webp` — chuyển động toàn khối), `EX-006` (`rootie.webp` — chuyển động toàn khối), `EX-007` & `EX-008` (2 lá SVG Hero).
- **[PROPOSED — Tương lai]:** `VIS-007` (`fact-act-deck.webp` — nghiêng nhẹ khi hover/focus), `VIS-009` (cutout lá tiền cảnh H02 lộ dần 1 lần), `VIS-010` (5 trạng thái sinh trưởng SVG trong H05).
- **Không chuyển động nội bộ (Static / Whole-frame hover only):** `EX-001..004`, `VIS-002`, `VIS-003B..005B`, `VIS-006`, `VIS-008` (là ảnh phẳng `Flattened background/scene`, tuyệt đối không hứa hẹn animate từng vật thể bên trong tranh).

---

## 2. Kiểm kê tài sản hiện có trong `public/assets/hero-v4/` — [VERIFIED]

| Asset ID | Tên file | Scene / Vị trí | Nhóm kiến trúc tài sản | Dung lượng thực | Nguồn & Quyền sở hữu | Bản quyền (`BR-T002`) | Trạng thái |
|---|---|---|---|---:|---|---|---|
| `EX-001` | `depth-01-sky.webp` | `/` H01 (L0) | `Flattened background illustration` | 175 KB | Gói Hero V4 (soft horizontal mask) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-002` | `depth-02-hills.webp` | `/` H01 (L1) | `Flattened background illustration` | 156 KB | Gói Hero V4 (soft horizontal mask) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-003` | `depth-03-foreground.webp` | `/` H01 (L1) | `Flattened background illustration` | 57 KB | Gói Hero V4 (soft horizontal mask) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-004` | `hero-garden-v4.webp` | `/` H01 (Fallback) | `Flattened background illustration` | 284 KB | Gói Hero V4 (1672×941 flat plate) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-005` | `brainie.webp` | `/` H01 (L2) | `Independent animated object` *(original artwork)* | 56 KB | Artwork gốc của nhóm (Canva export) | Internal dev approved; thương mại `BLOCKED` | Đã tích hợp (`PASS`) |
| `EX-006` | `rootie.webp` | `/` H01 (L2) | `Independent animated object` *(original artwork)* | 42 KB | Artwork gốc của nhóm (Canva export) | Internal dev approved; thương mại `BLOCKED` | Đã tích hợp (`PASS`) |
| `EX-007` | `floating-leaf-sage.svg` | `/` H01 (L3) | `Independent animated object` *(UI vector)* | 0.5 KB | Gói Hero V4 | Vector nội bộ | Đã tích hợp (`PASS`) |
| `EX-008` | `floating-leaf-peach.svg` | `/` H01 (L3) | `Independent animated object` *(UI vector)* | 0.5 KB | Gói Hero V4 | Vector nội bộ | Đã tích hợp (`PASS`) |
| `EX-009` | `fact-act-deck.webp` | Chưa dùng → H04, `/games`, `/games/fact-act` | `Actual product artwork` *(cutout trong suốt)* | 92 KB | Artwork bộ thẻ thật của nhóm | Internal dev approved; thương mại `BLOCKED` | Sẵn sàng → ánh xạ `VIS-007` |

---

## 3. Sổ đăng ký Tài sản Đề xuất (Visual Asset Register — Wave 1A & Wave 1B)

> **Ngân sách dung lượng:** Không áp trần cứng KB chung cho mọi ảnh; áp dụng **Fidelity-Aware Tiers (Tier A/B/C/D)** theo mục 5.3 của `docs/UX_UI_MASTER_BLUEPRINT.md` và đo thực tế LCP/CLS ở GATE F.

| Asset ID | Tên tài sản | Đích | Mục đích UX | Mô tả thị giác | Hiện có / Mới | Nhóm kiến trúc | Nguồn & Sở hữu | Định dạng & Tier | Kích thước / AR | Nền trong suốt | Phân lớp | Biến thể Desktop/Mobile | Vùng an toàn chữ | Chuyển động dự kiến | Đợt & Ưu tiên | Duyệt | Phụ thuộc bản quyền | Sản xuất | Tích hợp |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `VIS-007` | Fact–Act Product Showcase | H04, `/games`, `/games/fact-act` | Trưng bày sản phẩm bộ thẻ thật | Quạt thẻ `fact-act-deck.webp` gốc của nhóm | **HIỆN CÓ (`EX-009`)** | `Actual product artwork` | Nhóm Brainroot | WebP (sẵn, Tier B) | Đã có (`92 KB`) | Có (alpha) | L2 | Desktop `<= 440px`, Mobile `<= 280px` | Tách hẳn khỏi `L4` | Hover/focus xoay `1.5deg` | **Wave 1A (P0)** | `APPROVED` (nội bộ) | Thương mại `BLOCKED` (`BR-T002`) | **DONE** | `NOT_STARTED` |
| `VIS-006` | Green Play Pavilion Backdrop | `/games` Banner | Không khí gian nhà kính nối tiếp Hero V4 | Khung nhà kính & dây leo thoáng ở 2 rìa, 60% giữa là trời kem-đào trống | Mới | `Flattened background illustration` | Tạo theo brief + WebP | WebP q82–88 (Tier A) | Desktop `1600×560` (~2.8:1); Mobile crop/variant `828×460` | Không | L0/L1 | Có biến thể crop mobile giữ giữa trống | **60% giữa sạch** cho `L4` (`<h1>`, breadcrumb) | Tĩnh | **Wave 1A (P0)** | `PROPOSED` | Quyền ảnh minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-008` | Ô ăn quan xanh Conceptual Board | H04, `/games`, `/games/o-an-quan-xanh` | Minh họa khái niệm bàn cờ xanh 5 chủ đề | Bàn ô ăn quan gỗ/gốm sage-đào + 5 vật biểu trưng thiên nhiên (không chữ luật) | Mới | `Flattened background illustration` *(concept object)* | Tạo theo brief + WebP | WebP q82–86 (Tier B) | `1080×720` (3:2) | Không (hoặc alpha tùy chọn) | L2 | Chung 3:2 + `sizes` | Chữ nằm ngoài khung + chú thích khái niệm | Hover cả khung `-3px` | **Wave 1A (P0)** | `PROPOSED` | Cần chốt khái niệm (`OQ-08`) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-002` | Green Play Destination Illustration | `/` H03 (Trạm 1) | Điểm nhấn thị giác chính cho trụ cột R0 | Góc bàn chơi gỗ ngoài trời trong khu vườn nắng ấm, hộp thẻ kraft & quân gỗ | Mới | `Flattened background illustration` | Tạo theo brief + WebP | WebP q82–86 (Tier B) | `1080×675` (16:10) | Không | L2 | Chung 16:10, trọng tâm giữa cho mobile | Chữ đặt ngoài trong nền `#F4D0BA` | Hover cả khung `-4px` | **Wave 1A (P0)** | `PROPOSED` | Quyền ảnh minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-003A` | Green Quest Botanical Vignette *(Wave 1A)* | `/` H03 (Trạm 2) | Bảo đảm đồng bộ minh họa cả 4 vùng ngay từ Wave 1A (thay icon Unicode) | Minh họa vẽ tay vòm thực vật: bình nước sage, túi vải, mầm cây & la bàn gỗ trên nền chuyển sắc dịu | Mới | `Reusable SVG decoration` *(illustrated vignette)* | Thiết kế SVG nội bộ | Minified SVG (Tier D) | `480×300` viewBox (16:10) | Có | L2 | Chung 16:10, sắc nét ở zoom 200% | Chữ đặt ngoài trong nền `#DBE9DD` | Hover `-3px` | **Wave 1A (P0)** | `PROPOSED` | Tự vẽ nội bộ (0 rủi ro) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-004A` | Green Learn Botanical Vignette *(Wave 1A)* | `/` H03 (Trạm 3) | Bảo đảm đồng bộ minh họa cả 4 vùng ngay từ Wave 1A (thay icon Unicode) | Minh họa vẽ tay vòm thực vật: sổ tay mở có hình lá, kính lúp gỗ & nhánh dương xỉ | Mới | `Reusable SVG decoration` *(illustrated vignette)* | Thiết kế SVG nội bộ | Minified SVG (Tier D) | `480×300` viewBox (16:10) | Có | L2 | Chung 16:10 | Chữ đặt ngoài trong nền `#FFF7E9` | Hover `-3px` | **Wave 1A (P0)** | `PROPOSED` | Tự vẽ nội bộ (0 rủi ro) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-005A` | Green Connect Botanical Vignette *(Wave 1A)* | `/` H03 (Trạm 4) | Bảo đảm đồng bộ minh họa cả 4 vùng ngay từ Wave 1A (thay icon Unicode) | Minh họa vẽ tay vòm thực vật: vòng ghế gỗ, dây cờ lá đào-xanh & chậu cây non | Mới | `Reusable SVG decoration` *(illustrated vignette)* | Thiết kế SVG nội bộ | Minified SVG (Tier D) | `480×300` viewBox (16:10) | Có | L2 | Chung 16:10 | Chữ đặt ngoài trong nền `#E8ECDB` | Hover `-3px` | **Wave 1A (P0)** | `PROPOSED` | Tự vẽ nội bộ (0 rủi ro) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-001` | Ecosystem Wayfinding Trail Backdrop | `/` H03 | Kết nối 4 điểm đến thành 1 bản đồ vườn | Đường mòn vẽ tay mảnh rẽ nhánh từ trục giữa H02 nối 4 trạm + sắc đồi rất mờ | Mới | `Reusable SVG decoration` | Thiết kế SVG nội bộ | Minified SVG + CSS (Tier D) | Full-width responsive | Có | L0/L1 | Desktop: nhánh 2 hàng; Mobile: nét dẫn dọc gọn | 90% thoáng độ tương phản thấp | Tĩnh | **Wave 1A (P1)** | `PROPOSED` | Tự vẽ nội bộ | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-009` | Garden Transition Cutouts & Botanical Framing | `/` H02, H04, H06 & `/games` | Khâu liền mạch H01→H02→H03 (trục đá + cụm lá phủ mép) & viền footer | Gồm 2 phần tách rõ: **(a)** 2 cụm lá tiền cảnh nền trong suốt phủ mép trái/phải H02 (`Transparent foreground cutout`); **(b)** đá bước chân tiếp nối + viền lá mảnh Footer (`Reusable SVG decoration`) | Mới | `Transparent foreground cutout` + `Reusable SVG decoration` | Cutout WebP/SVG đồng sắc Hero V4 | WebP alpha (Tier C) + SVG (Tier D) | Cutouts `~600×320` alpha; SVG responsive | **Bắt buộc có** | L2 (đá) & L3 (lá tiền cảnh) | Mobile ẩn/thu gọn cutout rìa phải để tránh `.scroll-hint` | Đặt rìa ngoài, không chạm chữ `L4` | Reveal 1 lần (không lặp vô hạn) | **Wave 1A (P0)** | `PROPOSED` | Tự vẽ / hậu kỳ đồng bộ H01 | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-010` | Brainroot 5-Stage Growth Story | `/` H05 (`#about`) | Kể chuyện 5 nhịp *Hạt giống → Kết nối* | 5 trạng thái sinh trưởng SVG trong khung vòm kem | Mới | `Independent animated object` *(SVG 5 pha)* | Thiết kế SVG nội bộ | Minified SVG (Tier D) | `420×420` viewBox | Có | L2 | Desktop sticky 5 pha; Mobile hình tổng hợp | Cột riêng biệt với chữ `L4` | Chuyển opacity/scale `300ms` theo bước | **Wave 1B (P1)** | `PROPOSED` | Tự vẽ nội bộ | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-003B` | Green Quest Full Scenic Illustration *(Wave 1B)* | `/` H03 (Trạm 2 — nâng cấp thay `VIS-003A`) | Nâng cấp đầy đủ chiều sâu cảnh quan đồng cấp `VIS-002` | Tranh cảnh lối đá đầy nắng có bình nước sage, túi vải, chậu cây & la bàn gỗ | Mới | `Flattened background illustration` | Tạo theo brief + WebP | WebP q80–85 (Tier C) | `960×600` (16:10) | Không | L2 | Thay trực tiếp vào slot 16:10 của `VIS-003A` | Chữ nằm ngoài khung | Hover cả khung `-3px` | **Wave 1B (P2)** | `PROPOSED` | Quyền ảnh minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-004B` | Green Learn Full Scenic Illustration *(Wave 1B)* | `/` H03 (Trạm 3 — nâng cấp thay `VIS-004A`) | Nâng cấp đầy đủ chiều sâu cảnh quan đồng cấp `VIS-002` | Góc đọc sách dưới mái nhà kính: sổ thực vật mở, kính lúp gỗ, dương xỉ, trà gốm | Mới | `Flattened background illustration` | Tạo theo brief + WebP | WebP q80–85 (Tier C) | `960×600` (16:10) | Không | L2 | Thay trực tiếp vào slot 16:10 của `VIS-004A` | Chữ nằm ngoài khung | Hover cả khung `-3px` | **Wave 1B (P2)** | `PROPOSED` | Quyền ảnh minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-005B` | Green Connect Full Scenic Illustration *(Wave 1B)* | `/` H03 (Trạm 4 — nâng cấp thay `VIS-005A`) | Nâng cấp đầy đủ chiều sâu cảnh quan đồng cấp `VIS-002` | Sân tròn giữa vườn với vòng ghế gỗ, dây cờ lá màu đào-xanh, giỏ cây non | Mới | `Flattened background illustration` | Tạo theo brief + WebP | WebP q80–85 (Tier C) | `960×600` (16:10) | Không | L2 | Thay trực tiếp vào slot 16:10 của `VIS-005A` | Chữ nằm ngoài khung | Hover cả khung `-3px` | **Wave 1B (P2)** | `PROPOSED` | Quyền ảnh minh họa | `NOT_STARTED` | `NOT_STARTED` |

---

## 4. Chiến lược Đợt Sản xuất Tài sản (Wave 1A vs Wave 1B — Ưu tiên R0 MVP)

### Wave 1A — Bộ tài sản tối thiểu đồng bộ (Mở khóa ngay `BR-T004` + đồng bộ cả 4 vùng)
1. **Dùng ngay (sẵn có):** `VIS-007` (`fact-act-deck.webp` gốc).
2. **3 tranh raster trọng tâm cần tạo & duyệt trước:**
   - `VIS-006` (Green Play Pavilion Backdrop — mở khóa `/games`).
   - `VIS-008` (Ô ăn quan xanh Conceptual Board — mở khóa H04, `/games`, `/games/o-an-quan-xanh`).
   - `VIS-002` (Green Play Destination Illustration — điểm nhấn R0 cho H03).
3. **Bộ minh họa & chuyển cảnh nhẹ đồng bộ (tạo nội bộ, không chặn `BR-T004`):**
   - `VIS-003A`, `VIS-004A`, `VIS-005A` (3 vignette thực vật vẽ tay đồng bộ cho Quest/Learn/Connect — bảo đảm **tuyệt đối không để thẻ Unicode phẳng** khi ra mắt H03).
   - `VIS-009` (2 cutout lá tiền cảnh phủ mép H01→H02 + đá bước chân + viền Footer) và `VIS-001` (đường mòn nối 4 trạm).

### Wave 1B — Nâng cấp chiều sâu cảnh quan (Sau khi `BR-T004` / `BR-T006` chạy ổn định)
- Thay trực tiếp `VIS-003A/004A/005A` bằng 3 tranh cảnh đầy đủ `VIS-003B`, `VIS-004B`, `VIS-005B` trên cùng khung slot 16:10 (0 thay đổi kiến trúc code), kết hợp hoàn thiện `VIS-010` (chuỗi sinh trưởng 5 pha H05).

---

## 5. Production Briefs cho các tranh minh họa cần tạo hình (Chưa sinh ảnh trong BR-T021)

> **Chuẩn mỹ thuật chung:** Minh họa 2D vẽ tay ấm áp đồng bộ Hero V4 (`hero-garden-v4.webp`), ánh nắng chiều dịu chiếu xiên ~35° từ trên-trái, đường nét hữu cơ mềm, bảng màu `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#63894C`, `#263B31`. **Ràng buộc cấm tuyệt đối:** Không chữ/UI trong tranh; không tự vẽ Brainie/Rootie; không gửi artwork gốc của nhóm lên công cụ tạo ảnh bên thứ ba khi chưa có xác nhận bản quyền `BR-T002`; không dùng phong cách 3D bóng nhựa.

- **Brief `VIS-006` (Pavilion Backdrop — Wave 1A, Tier A):**
  - *Subject & Composition:* Khung nhà kính vòm mở rộng từ kiến trúc góc phải Hero V4 ở 20% rìa trái & 20% rìa phải với dây leo lá sage & hoa đào; **60% chính giữa hoàn toàn trống dịu** (`#F8F3E9` pha `#FCE6D5`, đồi xa rất mờ thấp ở 25% đáy).
  - *Camera & Lighting:* Chính diện nhẹ, ánh nắng đều dịu, không có mảng tối ở vùng trung tâm.
  - *Asset separation:* `Flattened background illustration` (`L0/L1`), không chứa UI `L4`.
  - *Export:* WebP q82–88, Desktop `1600×560` + biến thể crop mobile `828×460`.
- **Brief `VIS-008` (Ô ăn quan xanh Conceptual Board — Wave 1A, Tier B):**
  - *Subject & Composition:* Bàn ô ăn quan thủ công bằng gỗ sáng/gốm đặt nghiêng 12° trên mặt bàn gỗ ấm, sỏi gốm tròn màu sage `#A6C6B6` & cam đất nung `#E79A7C`, xung quanh đặt nhẹ 5 vật biểu trưng thiên nhiên (lá xanh, giọt nước, hoa hướng dương nhỏ, mầm cây tái sinh, nhành cây) đại diện 5 chủ đề; viền thoáng đều 12%.
  - *Camera & Lighting:* Góc nhìn 3/4 từ trên xuống (~40°), nắng ấm từ trên-trái đổ bóng mềm.
  - *Asset separation:* `Flattened background illustration` (concept object `L2`); không chữ/số/nút chơi giả; luôn đi kèm chú thích minh họa khái niệm bằng HTML.
  - *Export:* WebP q82–86, `1080×720` (3:2).
- **Brief `VIS-002` (Green Play Destination — Wave 1A, Tier B):**
  - *Subject & Composition:* Góc bàn gỗ ngoài trời giữa vườn cỏ nắng ấm, hộp thẻ giấy kraft buộc dây, vài thẻ úp mặt màu sage & đào (không chữ), quân gỗ nhỏ và chậu cây mầm; tán lá ôm nhẹ góc trên, 25% phía trên thoáng sáng.
  - *Camera & Lighting:* Góc 3/4 hơi cao (~30°), nắng vàng đào từ trên-trái, bóng xanh lục dịu.
  - *Asset separation:* `Flattened background illustration` (`L2`), chữ nằm ngoài tranh.
  - *Export:* WebP q82–86, `1080×675` (16:10).
- **Brief `VIS-009` (Cutouts tiền cảnh H02 — Wave 1A, Tier C):**
  - *Subject & Composition:* 2 cụm lá cỏ/dương xỉ & hoa trắng-đào nhỏ vẽ tay ôm chéo góc trái và góc phải, dùng chính xác tông xanh nắng `#8AB053` / `#63894C` của `depth-03-foreground.webp` để khâu mượt đường nối H01→H02.
  - *Asset separation:* `Transparent foreground cutout` (`L3`) có nền trong suốt alpha sạch, tách độc lập khỏi nền H02.
  - *Export:* WebP alpha q84 (`~600×320` mỗi cụm) kết hợp SVG cho đá bước chân & viền Footer.
- **Brief `VIS-003B`, `VIS-004B`, `VIS-005B` (3 Trạm cảnh quan đầy đủ — Wave 1B, Tier C):**
  - *`VIS-003B` (Green Quest):* Khúc đường đá vườn có bình nước giữ nhiệt sage, túi vải canvas kem, la bàn gỗ & chậu cây mầm (3/4 tầm thấp, nắng ấm trên-trái, 1/3 trên thoáng).
  - *`VIS-004B` (Green Learn):* Góc đọc dưới mái vòm nhà kính: sổ tay thực vật mở (chỉ hình lá mờ, không chữ), kính lúp gỗ, lá dương xỉ, tách trà gốm (3/4 nhìn xuống ~35°, sáng kem ấm).
  - *`VIS-005B` (Green Connect):* Sân tròn ngoài trời giữa vườn với vòng ghế gỗ, dây cờ giấy màu đào & sage căng giữa hai tán cây, giỏ cây non (không vẽ mặt người thật/đám đông rối, không chữ trên dây cờ).
  - *Export chung Wave 1B:* `Flattened background illustration` (`L2`), WebP q80–85, `960×600` (16:10), thay trực tiếp vào slot của `VIS-003A..005A`.
