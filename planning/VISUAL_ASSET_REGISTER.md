# BRAINROOT 2.0 — VISUAL ASSET REGISTER & PRODUCTION BRIEFS

**Task ID:** `BR-T021`  
**Trạng thái:** `PROPOSED` — Chờ Product Owner phê duyệt tại **GATE C** trước khi sản xuất bất kỳ ảnh mới nào.  
**Nguyên tắc bảo vệ tài sản gốc ([APPROVED]):**
- Giữ nguyên artwork gốc `brainie.webp`, `rootie.webp`, `fact-act-deck.webp` trong `public/assets/hero-v4/`.
- **Không** vẽ lại, sinh lại hay diễn giải lại Brainie, Rootie hoặc mặt thẻ vật lý chính thức.
- **Không** tải tài sản độc quyền của nhóm lên công cụ sinh ảnh bên thứ ba khi chưa có xác nhận bản quyền (`BR-T002`).
- Ưu tiên **SVG/CSS** cho họa tiết thực vật, đường nối, dải chuyển tiếp để giảm chi phí sản xuất và giữ hiệu năng mobile tốt.

---

## 1. Kiểm kê tài sản hiện có trong repo (`public/assets/hero-v4/`) — [VERIFIED]

| Asset ID | Tên tài sản | Vị trí sử dụng | Phân loại | Dung lượng thực | Nguồn & Quyền sở hữu | Trạng thái bản quyền (`BR-T002`) | Trạng thái triển khai |
|---|---|---|---|---:|---|---|---|
| `EX-001` | `depth-01-sky.webp` | `/` Scene H01 (L0) | Illustrated scene layer | 175 KB | Gói Hero V4 (AI-generated plate) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-002` | `depth-02-hills.webp` | `/` Scene H01 (L1) | Illustrated scene layer | 156 KB | Gói Hero V4 (soft horizontal mask) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-003` | `depth-03-foreground.webp` | `/` Scene H01 (L1) | Illustrated scene layer | 57 KB | Gói Hero V4 (soft horizontal mask) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-004` | `hero-garden-v4.webp` | `/` Scene H01 (Fallback) | Static illustration | 284 KB | Gói Hero V4 (1672×941 flat plate) | Internal dev approved; thương mại `TO CONFIRM` | Đã tích hợp (`PASS`) |
| `EX-005` | `brainie.webp` | `/` Scene H01 (L2) | Animation-ready cutout (whole) | 56 KB | Artwork gốc của nhóm (Canva SVG export) | Internal dev approved; thương mại `BLOCKED` (`BR-T002`) | Đã tích hợp (`PASS`) |
| `EX-006` | `rootie.webp` | `/` Scene H01 (L2) | Animation-ready cutout (whole) | 42 KB | Artwork gốc của nhóm (Canva SVG export) | Internal dev approved; thương mại `BLOCKED` (`BR-T002`) | Đã tích hợp (`PASS`) |
| `EX-007` | `floating-leaf-sage.svg` | `/` Scene H01 (L3) | UI vector | 0.5 KB | Gói Hero V4 | Vector trang trí nội bộ | Đã tích hợp (`PASS`) |
| `EX-008` | `floating-leaf-peach.svg` | `/` Scene H01 (L3) | UI vector | 0.5 KB | Gói Hero V4 | Vector trang trí nội bộ | Đã tích hợp (`PASS`) |
| `EX-009` | `fact-act-deck.webp` | Chưa gắn UI → Dùng cho H04, `/games`, `/games/fact-act` | Product photo/render (cutout) | 92 KB | Artwork bộ thẻ thật của nhóm (Canva export) | Internal dev approved; thương mại `BLOCKED` (`BR-T002`) | **Chưa tích hợp** → ánh xạ sang `VIS-007` |

---

## 2. Sổ đăng ký Tài sản Đề xuất (Visual Asset Register — Wave 1)

| Asset ID | Tên tài sản | Trang / Scene đích | Mục đích UX | Mô tả thị giác | Hiện có / Mới | Nguồn & Sở hữu đề xuất | Định dạng | Kích thước / Tỉ lệ | Nền trong suốt | Phân lớp | Biến thể Desktop/Mobile | Vùng an toàn chữ (Text-safe) | Chuyển động dự kiến | Ưu tiên | Duyệt | Phụ thuộc bản quyền | Sản xuất | Tích hợp |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `VIS-001` | Ecosystem Environmental Backdrop | `/` H03 | Kết nối 4 điểm đến thành 1 bản đồ khu vườn liền mạch | Đường mòn vẽ tay mảnh + dải đồi mờ màu kem-xanh rất dịu nối 4 trạm | Mới (**Ưu tiên SVG + CSS wash**) | Nội bộ (SVG code) | SVG + CSS | Full-width × linh hoạt (`1440×900` ref) | Có | L0/L1 | Desktop: đường mòn 2 hàng; Mobile: nét dọc mảnh | 90% diện tích thoáng độ tương phản thấp | Tĩnh | P1 (Đợt 1A) | `PROPOSED` | Tự vẽ nội bộ (không rủi ro) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-002` | Green Play Destination Illustration | `/` H03 (Trạm 1) | Tạo điểm nhấn thị giác cho trụ cột R0 (học qua trò chơi) | Góc bàn gỗ ngoài trời trong khu vườn nắng ấm có hộp thẻ/quân cờ gỗ xanh-đào, cây lá vây quanh (không chữ, không mascot giả) | Mới (Illustrated scene) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `960×600` (16:10), `<= 70 KB` | Không (crop bo góc) hoặc cắt viền mềm | L2 | Chung 16:10, crop trọng tâm giữa cho mobile | Chữ đặt ngoài tranh trong khối nền `#F4D0BA` | Hover/focus nhấc nhẹ `-4px` | **P0 (Đợt 1A)** | `PROPOSED` | Quyền sử dụng ảnh sinh/minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-003` | Green Quest Destination Illustration | `/` H03 (Trạm 2) | Truyền tải ý niệm thử thách & hành động xanh hằng ngày | Lối nhỏ có bình nước tái sử dụng, túi vải, chậu cây nhỏ & la bàn gỗ đặt trên bậc đá đầy nắng | Mới (Illustrated scene) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `800×500` (16:10), `<= 60 KB` | Không | L2 | Chung 16:10 | Chữ đặt ngoài tranh trong khối `#DBE9DD` | Hover nhẹ `-3px` | P1 (Đợt 1B) | `PROPOSED` | Quyền sử dụng ảnh sinh/minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-004` | Green Learn Destination Illustration | `/` H03 (Trạm 3) | Truyền tải không gian khám phá kiến thức môi trường đáng tin cậy | Góc đọc sách ấm áp dưới tán cây/nhà kính: sổ tay thực vật mở trang (không chữ đọc được), kính lúp, lá dương xỉ | Mới (Illustrated scene) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `800×500` (16:10), `<= 60 KB` | Không | L2 | Chung 16:10 | Chữ đặt ngoài tranh trong khối `#FFF7E9` | Hover nhẹ `-3px` | P1 (Đợt 1B) | `PROPOSED` | Quyền sử dụng ảnh sinh/minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-005` | Green Connect Destination Illustration | `/` H03 (Trạm 4) | Truyền tải tinh thần kết nối giới trẻ, lớp học & CLB | Khoảng sân tròn đầy nắng giữa vườn với ghế gỗ quây tròn, dây cờ lá giấy màu đào-xanh, giỏ cây nhỏ | Mới (Illustrated scene) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `800×500` (16:10), `<= 60 KB` | Không | L2 | Chung 16:10 | Chữ đặt ngoài tranh trong khối `#E8ECDB` | Hover nhẹ `-3px` | P1 (Đợt 1B) | `PROPOSED` | Quyền sử dụng ảnh sinh/minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-006` | Green Play Pavilion Backdrop | `/games` Header Banner | Tạo không khí gian học ngoài trời nối tiếp Hero V4 | Khung nhà kính & giàn dây leo thoáng đãng ở hai rìa, bầu trời kem-đào sáng rộng hoàn toàn trống ở vùng giữa | Mới (Illustrated scene) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `1600×560` (~2.8:1), `<= 120 KB` | Không | L0/L1 | Mobile dùng crop giữa + gradient kem phủ mềm | 65% trung tâm hoàn toàn trống cho `<h1>` & mô tả | Tĩnh (0 parallax nặng) | **P0 (Đợt 1A)** | `PROPOSED` | Quyền sử dụng ảnh sinh/minh họa | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-007` | Fact–Act Product Showcase | `/` H04, `/games`, `/games/fact-act` | Trưng bày bộ thẻ vật lý chính thức của nhóm | Ảnh quạt thẻ `fact-act-deck.webp` thật có sẵn trong `public/assets/hero-v4/` (cutout nền trong suốt) | **HIỆN CÓ (`EX-009`)** | Artwork gốc của nhóm | WebP (có sẵn) | Đã có (`92 KB`) | Có (đã có alpha) | L2 (Product cutout) | Desktop max `420px`, Mobile max `280px` | Tách hẳn khỏi khối chữ | Hover xoay nhẹ `1.5deg` | **P0 (Sẵn sàng)** | `APPROVED` (nội bộ) | Thương mại `BLOCKED` (`BR-T002`) | **DONE (có sẵn)** | `NOT_STARTED` |
| `VIS-008` | Ô ăn quan xanh Conceptual Board Artwork | `/` H04, `/games`, `/games/o-an-quan-xanh` | Minh họa định hướng bàn cờ giáo dục 5 chủ đề xanh (không giả làm luật chính thức) | Góc nhìn 3/4 trên bàn gỗ ấm: bàn ô ăn quan thủ công bằng gỗ/gốm màu sage & đất nung, 5 cụm biểu tượng thiên nhiên (lá, giọt nước, mặt trời, mầm tái chế, tán cây) và viên sỏi tròn | Mới (Conceptual illustration) | Sinh ảnh theo brief + hậu kỳ WebP | WebP | `960×640` (3:2), `<= 80 KB` | Tùy chọn (nền trong suốt hoặc bo khung mềm) | L2 (Concept object) | Chung 3:2, gắn chú thích "Minh họa khái niệm" | Chữ đặt ngoài tranh | Hover nhấc nhẹ `-3px` | **P0 (Đợt 1A)** | `PROPOSED` | Cần duyệt khái niệm với Game Designer (`OQ-08`) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-009` | Reusable Botanical Foreground & Dividers | `/` H02, H04, H06 & `/games` | Xóa cắt cứng giữa các section và giữ nhịp thực vật đồng nhất | Bộ 4–5 SVG vector nhẹ: dải cỏ chuyển tiếp H02, cụm lá góc đào-xanh, viền lá mảnh đỉnh Footer | Mới (**SVG vector thuần**) | Nội bộ (SVG code) | SVG | Vector responsive (`< 8 KB` cả bộ) | Có | L3 (UI vector) | Ẩn bớt chi tiết rìa ở `<= 720px` | Luôn đặt ở rìa/viền, không chạm vùng chữ | Tĩnh hoặc xuất hiện 1 lần | **P0 (Đợt 1A)** | `PROPOSED` | Tự vẽ nội bộ (không rủi ro) | `NOT_STARTED` | `NOT_STARTED` |
| `VIS-010` | Brainroot Growth-Story Sequence | `/` H05 (`#about`) | Minh họa trực quan 5 nhịp *Hạt giống → Nảy mầm → Hiểu biết → Hành động → Kết nối* | Chuỗi 5 trạng thái vẽ tay tối giản bằng SVG trong khung vòm kem: hạt giống cam đào → mầm 2 lá → cây non có sổ mở → cành vươn lá → tán cây nối vòng lá | Mới (**SVG vector thuần**) | Nội bộ (SVG code) | SVG | `420×420` viewBox (`< 25 KB` cả 5 bước) | Có | L2 (UI vector) | Desktop sticky 5 pha; Mobile hiện 1 hình tổng hợp hoặc icon nhỏ | Cột riêng biệt với chữ | Chuyển opacity/scale `300ms` theo bước | P1 (Đợt 1A) | `PROPOSED` | Tự vẽ nội bộ (không rủi ro) | `NOT_STARTED` | `NOT_STARTED` |

---

## 3. Đề xuất Đợt Sản xuất Tài sản Đầu tiên (Wave 1A — Tối giản, Tác động cao nhất)

Thay vì tạo toàn bộ 10 tài sản ngay lập tức gây rủi ro tốn chi phí và nghẽn `BR-T004`, đề xuất **Đợt 1A chỉ gồm 3 tranh raster mới + 3 gói SVG nội bộ + 1 tài sản sẵn có**:
1. **Dùng ngay (0 chi phí tạo mới):** `VIS-007` (`public/assets/hero-v4/fact-act-deck.webp`).
2. **Tạo bằng SVG nội bộ (nhanh, nhẹ, 0 rủi ro bản quyền):** `VIS-009` (chuyển cảnh H02 + lá trang trí + viền Footer), `VIS-001` (nền đường mòn bản đồ H03), `VIS-010` (chuỗi sinh trưởng 5 bước H05).
3. **3 tranh minh họa raster cần duyệt sinh/vẽ trước (đủ mở khóa cả H04 và toàn bộ `BR-T004`):**
   - `VIS-006` (Green Play Pavilion Backdrop — mở khóa `/games`).
   - `VIS-008` (Ô ăn quan xanh Conceptual Board — mở khóa H04, `/games` và `/games/o-an-quan-xanh`).
   - `VIS-002` (Green Play Destination Illustration — tạo điểm nhấn chủ đạo cho H03).
4. **Đợt 1B (nối tiếp ngay sau khi Đợt 1A chốt phong cách):** `VIS-003`, `VIS-004`, `VIS-005` (3 trạm minh họa còn lại của H03) để hoàn tất trọn vẹn 4 trạm minh họa trên trang chủ.

---

## 4. Production Briefs cho các tài sản cần tạo hình (Chưa sinh ảnh trong BR-T021)

> Tất cả brief dưới đây dùng chung chuẩn thẩm mỹ của Hero V4 (`public/assets/hero-v4/hero-garden-v4.webp`): **minh họa 2D vẽ tay phong cách Ghibli-nhẹ/sách thiếu nhi hiện đại, ánh nắng chiều ấm từ trên-trái, đường nét mềm mại, không bóng nhựa 3D, không chữ/UI trong tranh, không tự vẽ Brainie/Rootie**.

### Brief `VIS-002` — Green Play Destination Illustration
- **Art direction:** Minh họa 2D vẽ tay ấm áp, nét mềm hữu cơ, đồng bộ hoàn toàn bảng màu & ánh sáng của Brainroot Living Garden Hero V4.
- **Subject:** Một góc chơi giáo dục ngoài trời bằng gỗ sáng đặt giữa thảm cỏ vườn xanh: một hộp bộ bài bằng giấy kraft buộc dây, vài thẻ giấy úp mặt màu xanh sage và cam đào (không có chữ đọc được), vài viên sỏi gỗ và chậu cây nhỏ.
- **Composition:** Bố cục cân bằng hơi lệch trọng tâm về giữa-dưới, cành lá nhẹ khung ở góc trên trái và phải.
- **Camera perspective:** Góc nhìn 3/4 hơi cao (eye-level to elevated 30°), tạo cảm giác thân thiện mời gọi bước vào.
- **Lighting:** Ánh nắng vàng đào ấm chiếu xiên từ trên-trái, bóng đổ xanh lục dịu.
- **Brand color references:** Peach `#E79A7C`, Sage `#A6C6B6`, Warm Ivory `#F8F3E9`, Forest Green `#63894C`, Deep Ink shadow `#263B31`.
- **Scene depth:** Tiền cảnh lá mờ nhẹ → Trung cảnh bàn chơi gỗ → Hậu cảnh đồi cỏ & nắng mềm.
- **Required empty areas:** 25% phía trên thoáng sáng dịu để ảnh không bị rối khi bo góc trong khung thẻ.
- **Asset separation:** Tranh cảnh hoàn chỉnh cho khung minh họa `L2` (chữ UI nằm hoàn toàn ngoài khung tranh).
- **Negative constraints:** Không có chữ/số đọc được; không vẽ Brainie/Rootie hay bất kỳ nhân vật mắt-miệng nào; không logo; không giao diện máy tính/điện thoại; không phong cách 3D render bóng loáng.
- **Export format & Size:** WebP chất lượng 82–85, `960×600` (16:10), `<= 70 KB`.
- **Intended use:** Điểm đến `Green Play` trong Scene H03 trên `/`.

### Brief `VIS-003` — Green Quest Destination Illustration
- **Art direction:** Đồng bộ 100% nét vẽ tay mềm và ánh nắng ấm với `VIS-002` và Hero V4.
- **Subject:** Một khúc đường đá lát vườn dẫn tới điểm dừng thử thách xanh: bình nước giữ nhiệt màu sage, túi vải canvas màu kem, một chiếc la bàn gỗ nhỏ và chậu cây mầm đặt trên bậc đá phẳng.
- **Composition:** Lối đá dẫn mắt chéo nhẹ từ góc dưới-trái vào giữa khung hình, tán hoa nhỏ màu đào ở rìa phải.
- **Camera perspective:** Góc nhìn 3/4 tầm thấp ấm áp.
- **Lighting:** Nắng sớm/chiều vàng đào dịu, không gắt.
- **Brand color references:** `#A6C6B6`, `#E79A7C`, `#F8F3E9`, `#63894C`.
- **Scene depth:** Viền cỏ gần → Bậc đá + vật dụng xanh → Đồi vườn mờ nhẹ.
- **Required empty areas:** Khoảng sáng thoáng ở 1/3 trên để giữ nhịp thở thị giác.
- **Asset separation:** Tranh cảnh `L2` tách biệt hoàn toàn với khối chữ HTML.
- **Negative constraints:** Không chữ, không icon UI/dấu tick, không nhân vật, không phong cách vector phẳng khô cứng.
- **Export format & Size:** WebP, `800×500` (16:10), `<= 60 KB`.
- **Intended use:** Điểm đến `Green Quest` trong Scene H03 trên `/`.

### Brief `VIS-004` — Green Learn Destination Illustration
- **Art direction:** Đồng bộ nét vẽ minh họa 2D sách thiên nhiên ấm áp với Hero V4.
- **Subject:** Một góc đọc và quan sát thiên nhiên dưới mái vòm nhà kính tràn nắng: quyển sổ tay thực vật bằng giấy kem mở rộng (chỉ có hình vẽ lá mờ tượng trưng, không chữ), một kính lúp tay cầm gỗ, cành dương xỉ và tách trà gốm nhỏ trên bàn gỗ.
- **Composition:** Bàn gỗ chiếm 1/2 dưới khung hình, khung kính vòm đón nắng phía sau.
- **Camera perspective:** Góc 3/4 nhìn xuống mặt bàn ~35°.
- **Lighting:** Ánh sáng ấm xuyên qua mái nhà kính, ánh xanh sage nhẹ phản chiếu từ cây lá.
- **Brand color references:** `#F8F3E9`, `#A6C6B6`, `#63894C`, điểm nhấn `#E79A7C`.
- **Scene depth:** Lá tiền cảnh góc → Sổ tay & kính lúp → Mái vòm kính và cây xanh mờ.
- **Required empty areas:** Phần trên thoáng sáng màu kem ấm.
- **Asset separation:** Tranh cảnh `L2` không chứa văn bản UI.
- **Negative constraints:** Không chữ đọc được trong sách, không laptop/màn hình, không nhân vật, không đồ thị SaaS.
- **Export format & Size:** WebP, `800×500` (16:10), `<= 60 KB`.
- **Intended use:** Điểm đến `Green Learn` trong Scene H03 trên `/`.

### Brief `VIS-005` — Green Connect Destination Illustration
- **Art direction:** Đồng bộ phong cách minh họa Living Garden Hero V4.
- **Subject:** Một khoảng sân sinh hoạt ngoài trời thân thiện giữa khu vườn: vòng ghế gỗ uốn cong quanh thảm cỏ nhỏ, dây cờ tam giác bằng giấy màu đào và xanh sage căng giữa hai tán cây, vài giỏ cây non và chiếc bàn gỗ nhỏ ở giữa.
- **Composition:** Bố cục mở hình vòng cung hướng vào giữa sân, tạo cảm giác chào đón cộng đồng.
- **Camera perspective:** Góc rộng tầm mắt hơi nâng cao.
- **Lighting:** Nắng chiều ấm lan đều, tạo cảm giác gắn kết.
- **Brand color references:** `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#63894C`.
- **Scene depth:** Cành hoa góc gần → Vòng ghế & dây cờ → Đồi cây xa.
- **Required empty areas:** Bầu trời đào-kem sáng thoáng 35% phía trên.
- **Asset separation:** Tranh cảnh `L2` đặt trên khối chữ HTML.
- **Negative constraints:** Không vẽ khuôn mặt người thật/đám đông rối rắm, không chữ trên dây cờ, không mascot giả.
- **Export format & Size:** WebP, `800×500` (16:10), `<= 60 KB`.
- **Intended use:** Điểm đến `Green Connect` trong Scene H03 trên `/`.

### Brief `VIS-006` — Green Play Pavilion Backdrop
- **Art direction:** Mở rộng trực tiếp không gian nhà kính vòm bên phải của Hero V4 thành phông nền toàn chiều ngang nhẹ nhàng, nhiều khoảng thở.
- **Subject:** Khung vòm nhà kính thực vật tinh tế ở rìa trái và rìa phải với dây leo lá xanh sage, hoa nhỏ màu đào, ánh nắng ấm nhẹ; phần trung tâm là bầu trời kem đào rất dịu và đồi xa mờ nhẹ.
- **Composition:** Khung chữ U mở rộng ở hai rìa (20% trái + 20% phải có chi tiết kiến trúc/lá), **60% chính giữa cực kỳ thoáng, ít chi tiết và đồng màu kem-đào sáng**.
- **Camera perspective:** Chính diện nhẹ, horizon thấp (ở 25% từ đáy).
- **Lighting:** Ánh sáng ban ngày mềm, đều, không có mảng tương phản mạnh ở vùng giữa.
- **Brand color references:** Nền trung tâm pha `#F8F3E9` → `#FCE6D5`, rìa lá `#A6C6B6`, `#63894C`, điểm hoa `#E79A7C`.
- **Scene depth:** Rìa dây leo gần → Khung nhà kính nhẹ → Nền trời kem phẳng dịu.
- **Required empty areas:** **Bắt buộc 60% trung tâm sạch hoàn toàn** để đặt `Breadcrumbs`, `<h1>Green Play</h1>` và mô tả bằng HTML đạt tương phản >= 7:1.
- **Asset separation:** Lớp nền `L0/L1` tách hoàn toàn khỏi UI `L4`.
- **Negative constraints:** Không chữ, không biển hiệu, không nút bấm, không vật thể tối màu ở chính giữa.
- **Export format & Size:** WebP, `1600×560` (~2.8:1), `<= 120 KB`.
- **Intended use:** Banner mở đầu của trang `/games` (Green Play Pavilion).

### Brief `VIS-008` — Ô ăn quan xanh Conceptual Board Artwork
- **Art direction:** Minh họa thủ công 2D ấm áp, mang tinh thần trò chơi dân gian Việt Nam kết hợp giáo dục môi trường hiện đại, cùng nét vẽ với Hero V4.
- **Subject:** Một bàn cờ Ô ăn quan bằng gỗ sáng đặt trên khăn/bàn gỗ ấm: hai đầu ô bán nguyệt và các ô nhỏ chạm khắc mềm mại, bên trong đặt các viên sỏi gốm tròn màu xanh sage, kem và cam đất nung; xung quanh bàn đặt nhẹ 5 vật biểu trưng thiên nhiên (chiếc lá xanh, giọt nước pha lê, hoa hướng dương nhỏ, mầm cây trong chậu nhỏ, nhành cây xanh) tượng trưng cho 5 chủ đề môi trường.
- **Composition:** Bàn cờ đặt hơi nghiêng 12° tạo chiều sâu tự nhiên, toàn bộ vật thể nằm gọn trong khung với lề thở đều 12%.
- **Camera perspective:** Góc nhìn 3/4 từ trên xuống (~40°).
- **Lighting:** Ánh sáng tự nhiên ấm từ trên-trái, đổ bóng mềm xuống mặt gỗ kem.
- **Brand color references:** Gỗ kem `#F8F3E9`, sỏi sage `#A6C6B6` & peach `#E79A7C`, lá `#63894C`, nét nâu/rừng `#263B31`.
- **Scene depth:** Tập trung rõ nét vào vật thể bàn cờ trung tâm, nền xung quanh tối giản màu kem-xanh dịu.
- **Required empty areas:** Viền ngoài thoáng đều để dễ hiển thị trên cả khung desktop và mobile.
- **Asset separation:** Vật thể minh họa khái niệm `L2`; không kèm bảng điểm hay chữ luật chơi.
- **Negative constraints:** Không chữ/số/nhãn chủ đề trong ảnh; không giao diện nút bấm; không đóng khung như sản phẩm thương mại đã chốt luật; không vẽ mascot Brainie/Rootie.
- **Export format & Size:** WebP, `960×640` (3:2), `<= 80 KB`.
- **Intended use:** Minh họa khái niệm cho `Ô ăn quan xanh` tại `/` H04, `/games` và `/games/o-an-quan-xanh` (luôn đi kèm chú thích minh họa khái niệm).
