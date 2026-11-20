# BRAINROOT 2.0 — HOMEPAGE ILLUSTRATED STORYBOARD (Rev 1.1: H01–H06)

**Task ID:** `BR-T021`  
**Trạng thái:** `IN_REVIEW` (Rev 1.1 sau Design Review) — Chờ đồng bộ GitHub và duyệt **GATE B**.  
**Mô hình phân lớp chuẩn:** `L0` Nền & khí quyển (Flattened background) · `L1` Cảnh quan môi trường · `L2` Nhân vật / Vật thể độc lập / Tranh điểm đến · `L3` Cutout lá & thực vật tiền cảnh (Transparent foreground cutout / SVG) · `L4` Giao diện HTML ngữ nghĩa.

---

## SCENE H01 — Living Garden Hero (Baseline hiện hữu)

- **Trạng thái:** **[VERIFIED / APPROVED]** (`BR-T003` + `BR-T020`). **KHÔNG thiết kế lại, không làm hồi quy.**
- **Mục tiêu UX:** Giới thiệu tức thì *Brainroot — From Brainrot to Brainroot*, câu dẫn *"Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi."* và 1 CTA duy nhất dẫn xuống `#worlds`.
- **Cấu trúc lớp & Tài sản [VERIFIED]:**
  - `L0/L1` (Flattened background layers): `depth-01-sky.webp`, `depth-02-hills.webp`, `depth-03-foreground.webp`, fallback `hero-garden-v4.webp` + `.hero__mist`.
  - `L2` (Independent animated cutouts — whole character): `brainie.webp` (trái), `rootie.webp` (phải).
  - `L3` (Independent animated SVG): `floating-leaf-sage.svg`, `floating-leaf-peach.svg`.
  - `L4` (HTML/UI layer): `SiteHeader`, `.hero__copy` (`<h1>Brainroot</h1>` + mầm SVG, 1 CTA `#E79A7C`), `.scroll-hint`.
- **Tiếp cận & Chuyển động:** Giữ nguyên parallax `< 12px` trên desktop, `BR-T020` ambient motion tạm dừng khi ẩn tab, tắt khi `prefers-reduced-motion`, skip-link tới `#main-content`, ghi nhận giới hạn WCAG 2.2.2 trong `docs/ACCESSIBILITY.md`.

---

## CHUYỂN CẢNH LIỀN MẠCH H01 → H02 → H03 (3 Trạng thái thị giác chi tiết)

> **Nguyên tắc hiệu đính:** Không giả định đặt một dải sóng SVG trang trí đơn lẻ sẽ tạo được cảm giác liền mạch. Chuyển cảnh từ Hero xuống Hệ sinh thái được thiết kế theo **3 trạng thái liên tục** giữ chặt 5 yếu tố: **Phối cảnh (Perspective), Thảm thực vật (Foliage), Ánh sáng (Lighting), Trục lối đi (Path alignment) và Chuyển sắc (Color continuity)**.

### Trạng thái 1 — Trước khi rời Hero (`scrollY = 0`, nhìn toàn khung H01)
- **Hiện trạng thị giác neo chốt:** Đáy `depth-03-foreground.webp` có **lối đá bước chân màu cát đào ấm nằm đúng trục 50% ngang**, hai bên là thảm cỏ xanh nắng sáng (`#9AB95B` → `#7BA349`), góc dưới trái có cụm đá + hoa trắng và góc dưới phải có mỏm đá sáng nằm dưới `.scroll-hint`. Ánh nắng ấm chiếu xiên từ **trên-trái (~35°)**.
- **Vai trò dẫn mắt:** Brainie và Rootie đứng hai bên lối đá, hướng ánh nhìn về khu vực đường đá đi xuống mép dưới — tạo cảm giác còn không gian tiếp nối ngay bên dưới màn hình đầu tiên.

### Trạng thái 2 — Trong vùng Chuyển cảnh Khu vườn (`SCENE H02 — Garden Transition`)
- **Mục tiêu UX:** Xóa hoàn toàn đường cắt ngang cứng ở mép dưới `.hero`, dẫn mắt người dùng đi dọc lối đá từ bãi cỏ nắng sang khoảng đất mở màu kem ấm `#F8F3E9` của khu vườn khám phá.
- **Bảo toàn 5 yếu tố liên tục:**
  1. **Trục lối đi (Path alignment):** Trục trung tâm `50%` của H02 đặt **2–3 viên đá bước chân vẽ tay** (một phần của gói `VIS-009` cutout/SVG) bắt đúng vị trí kết thúc của viên đá đáy trong `depth-03-foreground.webp`, lệch nhẹ tự nhiên `±12px` rồi thu nhỏ dần sắc độ khi hòa vào nền kem.
  2. **Phối cảnh (Perspective):** Viên đá đầu tiên gần mép H01 có hình elip dẹt (góc nhìn 3/4 nối tiếp H01), viên thứ 2–3 mở rộng nhẹ theo góc nhìn hơi cao hơn (~35°–45°) để chuyển mượt sang bố cục wayfinding của H03.
  3. **Chuyển sắc (Color continuity):** Sử dụng lớp chuyển sắc 2 tầng (`L0` gradient khí quyển: `transparent → rgba(212, 224, 190, 0.55) → #F8F3E9` kết hợp `L1` lớp đồi cỏ mềm 2 nhịp sắc `#8FB061` / `#CFE0C4`) phủ chồng nhẹ lên `32px–48px` đáy của H01 (`z-index: 4`, **nằm dưới** Brainie/Rootie `z-index: 8` và `.scroll-hint` `z-index: 10` để không bao giờ che mascot hay nút cuộn).
  4. **Thảm thực vật (Foliage):** Hai cụm lá/cỏ tiền cảnh có nền trong suốt (`VIS-009` — Transparent foreground cutouts ở rìa trái & rìa phải) ôm chéo qua đường nối giữa đáy H01 và đỉnh H02, dùng đúng bảng sắc xanh lá-vàng nắng và hoa đào nhỏ của Hero V4 để "khâu" hai vùng ảnh lại tự nhiên.
  5. **Ánh sáng (Lighting):** Một dải nắng mờ nhẹ (`radial-gradient` vàng đào `rgba(255, 238, 212, 0.42)`) nghiêng từ góc trên-trái H02 xuống trung tâm tiêu đề H03, giữ đúng hướng sáng ~35° của H01.
- **Bố cục Desktop (1440 / 1280):** Vùng chồng mép đáy Hero `40px` + thân chuyển cảnh `128px` (tổng dải mượt `~168px`); 3 viên đá trục giữa, 2 cụm lá tiền cảnh trái/phải rộng `clamp(160px, 18vw, 280px)` nằm ngoài vùng `.scroll-hint`.
- **Bố cục Mobile (390 / 360 / 320):** Vùng chồng mép đáy Hero `20px` + thân chuyển cảnh `78px`; giữ 2 viên đá bước chân gọn ở trục giữa, thu nhỏ hoặc ẩn bớt lá rìa phải để `.scroll-hint` thoáng 100% và không gây tràn ngang (`overflow: hidden`).
- **Tương tác, Chuyển động & A11y:** Thuần trang trí (`aria-hidden="true"`, `pointer-events: none`), không có animation lặp vô hạn (tối đa hiệu ứng lộ dần 1 lần khi vào viewport, tắt ở `prefers-reduced-motion`).
- **Tiêu chí nghiệm thu H02:** Kiểm tra trực quan bằng chụp toàn trang (full-page capture) ở 1440px và 390px: không thấy đường kẻ ngang đứt gãy giữa H01 và H03; lối đá nối thẳng trục; `.scroll-hint` và mascot không bị che khuất.

### Trạng thái 3 — Khi bước vào Khu vực Khám phá 4 Vùng (`SCENE H03 — Four Worlds Discovery`)
- **Điểm tiếp nhận mạch cảnh:** Viên đá cuối cùng của H02 dừng ngay phía trên cụm tiêu đề `HỆ SINH THÁI BRAINROOT` đặt trên khoảng trống nắng dịu `#F8F3E9`. Từ bên dưới đoạn dẫn, **đường mòn vẽ tay mảnh (`VIS-001`)** tiếp nối từ đúng trục giữa, rẽ nhánh mềm mại kết nối cả **4 điểm đến minh họa đồng bộ** trong cùng một khu vườn.

---

## SCENE H03 — Four Worlds Discovery (Living Garden Wayfinding — Đồng bộ cả 4 vùng)

- **Trạng thái:** **[PROPOSED]** (Wave 1A trong M1B / nâng cấp toàn cảnh ở Wave 1B).
- **Mục tiêu UX:** Trình bày cả 4 trụ cột của Brainroot như **4 điểm đến minh họa thống nhất trong cùng khu vườn sống**, trong đó **Green Play** có độ nhấn mạnh lớn nhất vì là ưu tiên R0, còn 3 vùng còn lại (**Green Quest**, **Green Learn**, **Green Connect**) **vẫn có hệ minh họa đồng bộ** (tuyệt đối không để dạng thẻ ký tự Unicode phẳng `✦ ❀ ☘ ❂`).
- **Chiến lược nhất quán thị giác Wave 1A → Wave 1B:**
  - **Wave 1A (Đồng bộ ngay từ bản dựng đầu tiên):**
    - `Green Play` (`#games`): Tranh điểm đến đầy đủ `VIS-002` (khung ngang nổi bật ~58% hàng trên desktop) + nhấn trạng thái ưu tiên R0 + hành động dẫn xuống H04 / `/games`.
    - `Green Quest` (`#quest`), `Green Learn` (`#learn`), `Green Connect` (`#connect`): Sử dụng **3 cụm minh họa thực vật-vật thể vẽ tay đồng bộ** (`VIS-003A`, `VIS-004A`, `VIS-005A`) đặt trong khung vòm hữu cơ mềm cùng ngôn ngữ ánh sáng/màu sắc với `VIS-002` (bình nước & la bàn gỗ cho Quest; sổ thực vật & kính lúp cho Learn; ghế gỗ & dây cờ lá cho Connect) — **xóa bỏ hoàn toàn icon Unicode phẳng**.
  - **Wave 1B (Nâng cấp toàn cảnh không đổi cấu trúc DOM):**
    - Thay thế/nâng cấp `VIS-003A..005A` bằng 3 tranh cảnh 16:10 đầy đủ (`VIS-003B`, `VIS-004B`, `VIS-005B`) vào đúng slot `<figure className="destination__media">` của `DestinationLandmark` mà không phải viết lại layout hay logic điều hướng.
- **Thứ bậc nội dung (`L4` — HTML/UI layer):**
  - Phần đầu: Overline `HỆ SINH THÁI BRAINROOT` → `<h2>Một thế giới xanh, nhiều cách khám phá.</h2>` → Đoạn dẫn `<= 65ch`.
  - 4 `<article>` có `id` (`games`, `quest`, `learn`, `connect`), `tabIndex={-1}`, `aria-labelledby`: mỗi trạm gồm khung minh họa (`L2`), nhãn trạng thái trung thực (`Ưu tiên R0` vs `Đang phát triển — Lộ trình`), tiêu đề `<h3>`, phụ đề ngắn, mô tả 2 dòng và dòng ghi chú/link (chỉ gắn link thật cho `Green Play`).
- **Bố cục Desktop (1440 / 1280):**
  - Nền `L0/L1` `#F8F3E9` + đường mòn vẽ tay mảnh `VIS-001` uốn lượn kết nối 4 trạm.
  - Hàng 1 (bất đối xứng 58% / 42%): `Green Play` (bố cục ngang: tranh `VIS-002` lớn + khối chữ `#F4D0BA` + CTA) cạnh `Green Quest` (khung minh họa `VIS-003A/B` phía trên + khối chữ `#DBE9DD`).
  - Hàng 2 (bất đối xứng 48% / 52%): `Green Learn` (`VIS-004A/B` + khối chữ `#FFF7E9`) cạnh `Green Connect` (`VIS-005A/B` + khối chữ `#E8ECDB`).
- **Bố cục Mobile (390 / 360 / 320):**
  - Hành trình khám phá dọc 1 cột (khoảng cách `20px`), ẩn nhánh đường mòn ngang phức tạp (thay bằng nét dẫn dọc tinh tế ở lề trái hoặc bỏ gọn trên 320px).
  - Mỗi điểm đến đặt khung minh họa 16:10 phía trên, khối chữ tách biệt phía dưới (0 chữ chồng lên tranh, 0 hotspot nhỏ).
- **Vùng an toàn chữ:** 100% văn bản nằm trong bề mặt màu đặc có tương phản >= 4.5:1.
- **Tương tác & Chuyển động:** Reveal tuần tự 1 lần qua `IntersectionObserver` (`<= 600ms`); hover/focus nhấc nhẹ khung minh họa `translateY(-4px)` (`220ms`); không có animation lặp vô hạn; tắt hoàn toàn ở `prefers-reduced-motion`.
- **Tiếp cận & Hiệu năng:** Ảnh `loading="lazy"`, `width`/`height` tường minh; 3 trạm chưa mở không giả làm nút bấm; tương phản đo đạt AA ở mọi biến thể bề mặt.
- **Tiêu chí nghiệm thu H03:** Cả 4 điểm đến đều mang cùng ngôn ngữ minh họa khu vườn (0 icon Unicode phẳng), Green Play nổi bật nhất, 3 vùng kia ghi rõ chưa mở, không tràn ngang ở 320px và zoom 200%.

---

## SCENE H04 — Featured Green Play (Góc giới thiệu Trò chơi R0)

- **Trạng thái:** **[PROPOSED]** (M1B / kết nối trực tiếp vào `/games` ở M2).
- **Mục tiêu UX:** Giới thiệu nhanh 2 trò chơi R0 bằng ảnh thật của dự án và dẫn người dùng vào `/games` bằng **1 CTA duy nhất**, không nhân bản toàn bộ nội dung Game Library.
- **Nội dung & Tài sản:**
  - `Fact–Act`: dùng ảnh sản phẩm gốc `/assets/hero-v4/fact-act-deck.webp` (`VIS-007` — Actual product artwork, transparent cutout) + 1 câu mô tả + nhãn `Bộ thẻ vật lý · Chuẩn bị bản chơi thử`.
  - `Ô ăn quan xanh`: dùng `VIS-008` (Flattened conceptual illustration) + chú thích rõ *"Minh họa khái niệm"* + 1 câu nêu 5 chủ đề & 3 cấp độ + nhãn `Đang chuẩn hóa luật bản số`.
  - **1 CTA chính duy nhất:** `"Khám phá thư viện Green Play ↗"` (trỏ `/games` từ M2).
- **Bố cục Desktop / Mobile:** Khối pavilion bo hữu cơ `#EDF3E8` (max-width `1180px`): 2 cột cân bằng ở `>= 768px`, 1 cột dọc gọn ở `< 768px`; điểm lá góc từ `VIS-009` (`L3`, ẩn bớt ở mobile nhỏ).
- **Chuyển động & Tiếp cận:** Hover/focus nghiêng nhẹ bộ thẻ Fact–Act `1.5deg` (`220ms`, tắt khi reduced motion); `alt` mô tả trung thực không đánh tráo bản khái niệm thành sản phẩm hoàn chỉnh.
- **Tiêu chí nghiệm thu H04:** Hiển thị đúng `fact-act-deck.webp`, chỉ 1 CTA chính, không lặp nội dung chi tiết của `/games`.

---

## SCENE H05 — Brainroot Story ("From Brainrot to Brainroot")

- **Trạng thái:** **[PROPOSED]** (M1B — nâng cấp `#about` hiện có).
- **Mục tiêu UX:** Diễn giải trực quan triết lý **From Brainrot to Brainroot** theo 5 nhịp **Hạt giống → Nảy mầm → Hiểu biết → Hành động → Kết nối** để truyền đạt sứ mệnh giáo dục (không bịa số liệu tác động, đối tác hay ảnh đội ngũ).
- **Bố cục Desktop (`>= 960px`):** 2 cột biên tập — Trái (42%, sticky nhẹ) là khung vòm chứa chuỗi **5 trạng thái SVG minh họa sinh trưởng (`VIS-010`)**; Phải (58%) là danh sách `<ol>` HTML gồm 5 bước ngắn gọn + câu sứ mệnh nguyên văn + bối cảnh thử nghiệm ULIS/Hà Nội.
- **Bố cục Mobile (`< 960px`):** Xếp dọc 1 cột (1 hình tổng thể phía trên + danh sách 5 bước có biểu tượng SVG nhỏ bên cạnh), **không dùng sticky** gây che nội dung.
- **Tương tác, Chuyển động & A11y:** Cập nhật pha sinh trưởng theo bước đang cuộn (`IntersectionObserver`) **hoặc** khi người dùng bấm/focus vào nút tiêu đề bước bằng bàn phím. Ở `prefers-reduced-motion`, hiển thị trạng thái cây trưởng thành hoàn chỉnh ngay lập tức. Toàn bộ chữ luôn đọc được dưới dạng HTML tĩnh.
- **Tiêu chí nghiệm thu H05:** Đủ 5 nhịp, giữ nguyên văn sứ mệnh, 0 số liệu/tác động bịa đặt, hoạt động trọn vẹn bằng bàn phím.

---

## SCENE H06 — Botanical Footer

- **Trạng thái:** **[PROPOSED]** (M1B).
- **Mục tiêu UX:** Kết thúc nhẹ nhàng, đồng bộ bản sắc khu vườn, chỉ chứa các liên kết thực sự hoạt động.
- **Bố cục Desktop / Mobile:** Dải viền lá thực vật SVG mảnh từ `VIS-009` đặt trên đỉnh nền `#EFE9DC`; Desktop 3 cột (`Brand & sứ mệnh` · `Điều hướng hợp lệ` · `Minh bạch dự án & bối cảnh ULIS/Hà Nội`), Mobile 1 cột vùng chạm link `>= 44px`.
- **Chuyển động & A11y:** Tĩnh (chỉ hover/focus link), landmark `contentinfo`, tương phản > 6:1.
- **Tiêu chí nghiệm thu H06:** 0 link chết, đồng nhất bảng màu thương hiệu, đọc rõ ở 320px và zoom 200%.
