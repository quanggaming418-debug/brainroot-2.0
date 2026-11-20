# BRAINROOT 2.0 — HOMEPAGE ILLUSTRATED STORYBOARD (H01–H06)

**Task ID:** `BR-T021`  
**Trạng thái:** `PROPOSED` — Chờ Product Owner phê duyệt tại **GATE B**.  
**Nguyên tắc xuyên suốt:** Biến trang chủ `/` thành **ONE LIVING WORLD** — một hành trình cuộn liền mạch từ khu vườn chào mừng (Hero V4) xuống 4 điểm đến của hệ sinh thái, góc trải nghiệm trò chơi giáo dục, câu chuyện nảy mầm và phần kết thực vật tinh gọn.  
**Mô hình phân lớp chuẩn:** `L0` Nền & khí quyển · `L1` Cảnh quan môi trường · `L2` Nhân vật / vật thể độc lập · `L3` Chi tiết lá/thực vật tiền cảnh · `L4` Giao diện HTML ngữ nghĩa.

---

## SCENE H01 — Living Garden Hero

- **Trạng thái:** **[VERIFIED / APPROVED]** — Baseline hiện hữu (`BR-T003` + `BR-T020`). **KHÔNG thiết kế lại.**
- **Mục tiêu UX:** Tạo ấn tượng thương hiệu tức thì trong 3–5 giây đầu, truyền đạt slogan *From Brainrot to Brainroot*, thông điệp học-chơi-hành động và dẫn người dùng xuống `#worlds` bằng 1 CTA duy nhất.
- **Thứ bậc nội dung:** Eyebrow (`FROM BRAINROT TO BRAINROOT`) → `<h1>Brainroot</h1>` + mầm SVG → Câu dẫn (`Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi.`) → 1 CTA chính (`Khám phá thế giới Brainroot ↗`) + gợi ý cuộn (`↓ Cuộn xuống khám phá`).
- **Bố cục Desktop (1440 / 1280):** Full-bleed `min(100svh, 1050px)`, header nổi phía trên, khối chữ căn giữa trên vùng trời ấm, Brainie bên trái dưới, Rootie bên phải dưới, lối đá dẫn mắt xuống cạnh đáy.
- **Bố cục Mobile (390 / 360 / 320):** Header gọn có nút toggle menu, khối chữ căn giữa trên bầu trời đào, Brainie & Rootie thu gọn đối xứng hai bên đường đá, không tràn ngang ở 320px.
- **Yêu cầu tài sản:** Giữ nguyên 100% 7 ảnh hiện hữu trong `public/assets/hero-v4/` (`depth-01..03.webp`, `hero-garden-v4.webp`, `brainie.webp`, `rootie.webp`, `floating-leaf-*.svg`).
- **Cấu trúc lớp:** `L0` `depth-01-sky` + `.hero__mist` → `L1` `depth-02-hills`, `depth-03-foreground` → `L2` Brainie & Rootie → `L3` 2 lá bay → `L4` `SiteHeader`, `.hero__copy`, `.scroll-hint`.
- **Vùng an toàn chữ (Text-safe area):** Vùng trung tâm 15%–62% chiều cao (nền trời cam đào dịu + lớp sương sáng).
- **Tương tác:** CTA và scroll-hint dùng anchor thật tới `#worlds` kèm `focusAnchorTarget`.
- **Chuyển động:** Parallax 3 lớp nhẹ `< 12px` trên desktop (`> 720px`); Brainie/Rootie/lá lặp lệch pha (`BR-T020`), tạm dừng khi tab ẩn, tắt ở `prefers-reduced-motion`.
- **Responsive:** Đã kiểm chứng ở 1440×900, 390×844, 320×740 và zoom 200%.
- **Tiếp cận:** 1 `<h1>`, `--color-headline-on-hero: #53743E`, skip-link tới `#main-content`; ghi nhận giới hạn WCAG 2.2.2 trong `docs/ACCESSIBILITY.md`.
- **Hiệu năng:** `depth-01-sky` `fetchPriority="high"`, preload `hero-garden-v4.webp`.
- **Phân tích nối tiếp sang H02:** Chân ảnh `depth-03-foreground.webp` hiện có **lối đá tròn màu cát ấm đi thẳng ra mép đáy ở chính giữa**, hai bên là thảm cỏ xanh sáng và bụi hoa nhỏ. Scene H02 phải **bắt đúng mạch lối đá và đường cỏ này** bằng lớp chuyển tiếp hữu cơ phủ chồng mép đáy `24px–48px` (negative margin hoặc SVG/PNG mask mềm) để xóa hoàn toàn đường cắt ngang cứng.
- **Tiêu chí nghiệm thu:** Không làm hồi quy bất kỳ kiểm thử nào của `BR-T003` và `BR-T020`.

---

## SCENE H02 — Garden Transition (Chuyển cảnh Khu vườn)

- **Trạng thái:** **[PROPOSED]** (M1).
- **Mục tiêu UX:** Tạo cảm giác người dùng bước theo lối đá từ khu vườn Hero vào vùng khám phá Hệ sinh thái, xóa bỏ "cắt phẳng" sang nền kem `#F8F3E9`.
- **Thứ bậc nội dung:** Không chứa nội dung chữ bắt buộc (thuần vai trò dẫn thị giác và nhịp thở khoảng trắng), có thể đặt câu dẫn chuyển chương ngắn (`HỆ SINH THÁI BRAINROOT`) mở đầu cho H03 ngay khi lối đá hòa vào nền kem.
- **Bố cục Desktop:** Dải chuyển tiếp cao `110px–150px` nối trực tiếp chân H01 với đỉnh H03: dải cỏ/đồi uốn lượn mềm bằng SVG nhiều lớp (`#87AB62` → `#C6DACB` → `#F8F3E9`), 2–3 viên đá bước chân tiếp nối trục giữa hơi nhỏ dần rồi tan vào nền kem ấm `#F8F3E9`, hai mép trái/phải điểm cụm lá tiền cảnh `VIS-009` mềm mại.
- **Bố cục Mobile:** Chiều cao thu gọn `64px–88px`, giữ đường uốn lượn SVG mượt và tối đa 2 viên đá bước chân, ẩn lá rìa để tránh chiếm diện tích dọc.
- **Yêu cầu tài sản:** Ưu tiên **SVG vector thuần + CSS** (nhẹ < 6 KB, sắc nét ở mọi độ phân giải, không bị vỡ đường ghép với `#F8F3E9`) kết hợp cụm lá tiền cảnh tái sử dụng `VIS-009`. Không cần tạo thêm ảnh nền raster riêng cho H02.
- **Cấu trúc lớp:** `L1` Đường viền đồi/cỏ SVG chuyển sắc mềm về `#F8F3E9` → `L2` 2–3 viên đá bước chân tiếp nối trục giữa → `L3` Cụm lá rìa trái/phải (`VIS-009`, `aria-hidden="true"`).
- **Vùng an toàn chữ:** Toàn bộ vùng giữa bên dưới dải cỏ trở về nền `#F8F3E9` sạch hoàn toàn cho tiêu đề H03.
- **Tương tác:** Không có phần tử tương tác (hoàn toàn trang trí `aria-hidden="true"`).
- **Chuyển động:** Tĩnh mặc định hoặc dịch rất nhẹ (`<= 6px` một lần khi vào viewport). Không lặp vô hạn. Tắt hoàn toàn ở `prefers-reduced-motion`.
- **Responsive:** `width: 100%; overflow: hidden;`, SVG `preserveAspectRatio="none"` cho dải sóng cỏ và giữ tỉ lệ cho viên đá.
- **Tiếp cận:** `aria-hidden="true"`, `pointer-events: none`, không chặn focus hay cản vùng chạm `.scroll-hint` của H01.
- **Hiệu năng:** Inline SVG hoặc asset `< 6 KB`, zero layout shift (chiều cao định rõ).
- **Tiêu chí nghiệm thu:** Nhìn trực quan từ H01 xuống H03 không còn đường cắt thẳng đột ngột; `.scroll-hint` trên H01 không bị che ở 1440/390/320.

---

## SCENE H03 — Four Worlds Discovery (Living Garden Wayfinding)

- **Trạng thái:** **[PROPOSED]** (M1) — Nâng cấp phần `#worlds` hiện tại, giữ đủ 4 khu vực đã được phê duyệt.
- **Mục tiêu UX:** Thay thế 4 thẻ chữ nhật phẳng bằng **4 điểm đến minh họa sống động trong cùng khu vườn** (*Living Garden Wayfinding*), giúp người dùng hiểu ngay hệ sinh thái có 4 trụ cột và nhận biết **Green Play** là điểm ưu tiên trải nghiệm hiện tại.
- **Thứ bậc nội dung:**
  - Phần đầu: Overline `HỆ SINH THÁI BRAINROOT` → `<h2>Một thế giới xanh, nhiều cách khám phá.</h2>` → Đoạn tóm tắt ngắn (`<= 65ch`).
  - 4 điểm đến có minh họa riêng (`VIS-002..005`):
    1. **Green Play (`#games`) — Điểm nhấn chính (Ưu tiên R0):** *Trò chơi giáo dục tương tác.* Mô tả `Fact–Act` & `Ô ăn quan xanh`, trạng thái `"Ưu tiên R0 · Sắp mở thư viện"`, có nút dẫn xuống H04 (`#featured-play`) ở M1 và sang `/games` ở M2.
    2. **Green Quest (`#quest`):** *Thử thách và hành động xanh.* Trạng thái `"Lộ trình R1 · Chưa mở"`, mô tả trải nghiệm thử thách nhỏ hằng ngày.
    3. **Green Learn (`#learn`):** *Khám phá kiến thức và kỹ năng xanh.* Trạng thái `"Lộ trình R1–R3 · Chưa mở"`, mô tả kho kiến thức có trích dẫn nguồn.
    4. **Green Connect (`#connect`):** *Kết nối cộng đồng và hoạt động giáo dục.* Trạng thái `"Lộ trình R1–R2 · Chưa mở"`, mô tả không gian học sinh/sinh viên, giáo viên & CLB.
- **Bố cục Desktop (1440 / 1280):**
  - Lớp nền khí quyển bản đồ vườn rất dịu `VIS-001` (nét đường mòn vẽ tay mảnh + đồi xa mờ màu kem-xanh) nối 4 điểm đến như 4 trạm dừng trong khu vườn.
  - **Bố cục bất đối xứng hữu cơ (tránh 4 ô giống hệt nhau):**
    - Hàng trên nổi bật (**Feature Row**): **Green Play** chiếm khối rộng (`~58%`) dạng khung ngang (minh họa gian chơi `VIS-002` bên phải/trái + nội dung & CTA rõ) đặt cạnh **Green Quest** (`~42%`, khung dọc mềm với minh họa `VIS-003`).
    - Hàng dưới (**Discovery Row**): **Green Learn** (`~48%`, minh họa góc đọc sách vườn cây `VIS-004`) lệch nhịp nhẹ với **Green Connect** (`~52%`, minh họa sân sinh hoạt CLB `VIS-005`), nối với nhau bằng đường mòn nét chấm hữu cơ SVG.
- **Bố cục Mobile (390 / 360 / 320):**
  - Hành trình khám phá dọc 1 cột (Vertical Discovery Path): đường dẫn nhỏ bên trái hoặc phân nhịp thoáng `20px` giữa 4 trạm.
  - Mỗi trạm gồm: Khung minh họa tỉ lệ `16:10` phía trên (bo góc trên tự nhiên, không chữ chồng lên tranh) + khối chữ nền ấm phía dưới (dễ đọc, 0 hotspot nhỏ khó chạm).
- **Yêu cầu tài sản:** `VIS-001` (nền đường mòn/khí quyển rất nhẹ — có thể kết hợp SVG đường mòn + nền wash mềm), `VIS-002`, `VIS-003`, `VIS-004`, `VIS-005` (4 cụm minh họa điểm đến cùng phong cách Hero V4).
- **Cấu trúc lớp:** `L0` Nền `#F8F3E9` + ánh sáng ấm nhẹ → `L1` Đường mòn kết nối SVG / `VIS-001` → `L2` 4 minh họa điểm đến độc lập (`VIS-002..005`) → `L4` Khối nội dung HTML ngữ nghĩa `<article>` và nút/link thật.
- **Vùng an toàn chữ:** Chữ **tuyệt đối không đặt đè lên chi tiết minh họa bận rộn**; chữ nằm trong khối bề mặt riêng có nền đặc (`#F4D0BA`, `#DBE9DD`, `#FFF7E9`, `#E8ECDB`) bảo đảm tương phản >= 4.5:1.
- **Tương tác:** Điểm đến khả dụng (`Green Play`) có link/nút thật kích hoạt hành động rõ; 3 điểm đến chưa mở không giả làm nút bấm (không có con trỏ giả, không nhảy sang trang rỗng), chỉ phản hồi nhẹ khi di chuột để tạo cảm giác sinh động vừa phải.
- **Chuyển động:** Khi cuộn vào viewport (`IntersectionObserver`), 4 điểm đến hiện lên tuần tự nhẹ (`translateY(12px) → 0`, lệch `70ms`, chạy **1 lần duy nhất**). Hover/focus lên điểm đến làm ảnh `L2` nhấc nhẹ `translateY(-4px)`. Không có chuyển động tự chạy lặp vô hạn.
- **Responsive:** 1440/1280 bố cục bất đối xứng 2 hàng; 768px chuyển 2×2 gọn; `<= 720px` chuyển 1 cột dọc; 320px không tràn ngang.
- **Tiếp cận:** Giữ `id="worlds"`, `id="games"`, `id="quest"`, `id="learn"`, `id="connect"` với `tabIndex={-1}` và `aria-labelledby`; ảnh minh họa trang trí dùng `alt=""` nếu mô tả đã nằm đầy đủ trong text bên cạnh, hoặc `alt` ngắn gọn mô tả bối cảnh.
- **Hiệu năng:** `loading="lazy"`, `decoding="async"`, khai báo sẵn `width`/`height` tránh CLS; mỗi ảnh điểm đến `<= 70 KB` WebP.
- **Tiêu chí nghiệm thu:** Nhìn vào thấy ngay 4 khu vực thuộc cùng khu vườn với Hero V4, Green Play nổi bật nhất, 3 khu vực kia thể hiện trung thực chưa mở, đọc rõ ở zoom 200% và 320px.

---

## SCENE H04 — Featured Green Play (Góc giới thiệu Trò chơi R0)

- **Trạng thái:** **[PROPOSED]** (M1 — liên kết vào `/games` khi M2 hoàn thành).
- **Mục tiêu UX:** Giới thiệu trực quan 2 sản phẩm giáo dục đầu tiên (`Fact–Act` và `Ô ăn quan xanh`) bằng tài sản thật của dự án và mời người dùng vào `/games`, **không nhân bản toàn bộ nội dung chi tiết** của Game Library.
- **Thứ bậc nội dung:**
  - Overline `GREEN PLAY · SẢN PHẨM ĐẦU TIÊN` → `<h2>Học kỹ năng xanh qua hai trò chơi tương tác.</h2>` → 1 câu dẫn ngắn.
  - 2 cụm trưng bày gọn:
    1. **Fact–Act:** Ảnh bộ thẻ thật `fact-act-deck.webp` (`VIS-007`), 1 dòng mô tả (`Bộ thẻ khám phá sự thật môi trường & hành động thực tế`), nhãn `Sản phẩm vật lý · Chuẩn bị bản chơi thử`.
    2. **Ô ăn quan xanh:** Minh họa khái niệm `VIS-008`, 1 dòng mô tả (`5 chủ đề môi trường · 3 cấp độ tư duy xanh`), nhãn `Đang chuẩn hóa luật bản số`.
  - **Duy nhất 1 hành động điều hướng chính:** Nút `"Khám phá thư viện Green Play ↗"` (ở M2 dẫn tới `/games`; trước M2 giữ trạng thái thông báo lộ trình minh bạch, không tạo link chết).
- **Bố cục Desktop:** Khối sân khấu rộng `max-width: 1180px` nằm trên tấm nền bo hữu cơ màu xanh lá nhạt-kem (`#EDF3E8`) viền mảnh; 2 cụm sản phẩm đặt song song với tỷ lệ thoáng (Fact–Act trái, Ô ăn quan xanh phải), ở giữa phía dưới là 1 CTA chính nổi bật.
- **Bố cục Mobile:** Xếp dọc từng sản phẩm (ảnh gọn `max-width: 260px` căn giữa trên chữ), nút CTA rộng dễ chạm phía dưới cùng.
- **Yêu cầu tài sản:** Tái sử dụng trực tiếp `/assets/hero-v4/fact-act-deck.webp` (**[VERIFIED]** có sẵn, 92 KB) và `VIS-008` (minh họa khái niệm Ô ăn quan xanh).
- **Cấu trúc lớp:** `L0` Tấm nền pavilion dịu → `L2` `fact-act-deck.webp` (cutout trong suốt) & `VIS-008` → `L3` 1–2 chi tiết lá góc (`VIS-009`) → `L4` Tiêu đề, mô tả ngắn, nhãn trạng thái, 1 CTA chính.
- **Vùng an toàn chữ:** Phần văn bản nằm tách biệt hoàn toàn bên dưới/bên cạnh vật thể sản phẩm trên nền đồng màu sạch.
- **Tương tác:** Di chuột/focus vào ảnh bộ thẻ Fact–Act làm bộ thẻ xoay nhẹ `1.5deg` và nâng bóng mềm (`220ms`); bấm CTA đi tới `/games`.
- **Chuyển động:** Chỉ phản hồi khi tương tác + fade-in 1 lần khi vào viewport. Tắt khi `prefers-reduced-motion`.
- **Responsive:** 2 cột ở `>= 768px`, 1 cột ở `< 768px`.
- **Tiếp cận:** `alt` mô tả trung thực (`"Bộ thẻ giáo dục vật lý Brainroot Fact–Act xếp hình cánh quạt"` và `"Minh họa khái niệm trò chơi Ô ăn quan xanh"` — không gọi nhầm bản khái niệm là bàn cờ chính thức).
- **Hiệu năng:** `loading="lazy"`, tổng dung lượng 2 ảnh `< 170 KB`.
- **Tiêu chí nghiệm thu:** Sử dụng đúng ảnh `fact-act-deck.webp` gốc; chỉ có 1 CTA chính; không lặp nội dung dài của trang `/games`.

---

## SCENE H05 — Brainroot Story ("From Brainrot to Brainroot")

- **Trạng thái:** **[PROPOSED]** (M1 — nâng cấp `#about` hiện có thành trải nghiệm kể chuyện minh họa).
- **Mục tiêu UX:** Truyền tải triết lý **From Brainrot to Brainroot** qua ẩn dụ sinh trưởng tự nhiên **Hạt giống → Nảy mầm → Hiểu biết → Hành động → Kết nối** để làm rõ sứ mệnh giáo dục (không bịa số liệu tác động hay ảnh đội ngũ).
- **Thứ bậc nội dung:**
  - Overline `CÂU CHUYỆN BRAINROOT` → `<h2>From Brainrot to Brainroot</h2>` → Câu sứ mệnh nguyên văn.
  - Chuỗi 5 nhịp ngắn gọn (mỗi nhịp 1 tiêu đề 2–3 từ + 1 câu ngắn `<= 18 từ`):
    1. `Hạt giống` — Khơi gợi sự tò mò về môi trường theo cách gần gũi.
    2. `Nảy mầm` — Biến thời gian lướt thụ động thành trải nghiệm học chủ động.
    3. `Hiểu biết` — Tiếp cận kiến thức xanh có chọn lọc và nguồn tham khảo rõ ràng.
    4. `Hành động` — Gợi mở những lựa chọn thực tế và phản tư trong đời sống hằng ngày.
    5. `Kết nối` — Lan tỏa kỹ năng xanh cùng học sinh, sinh viên, giáo viên và câu lạc bộ.
  - Ghi chú ngữ cảnh thực tế: thử nghiệm ban đầu cùng cộng đồng học tập tại ULIS & Hà Nội, mở công khai cho mọi người; đường dẫn tới `/about` (khi `BR-T007` hoàn thành).
- **Bố cục Desktop:** Bố cục 2 cột biên tập (Editorial Split):
  - **Cột trái (42%, sticky nhẹ khi cuộn):** Khung minh họa hình vòm hữu cơ hiển thị chuỗi minh họa nảy mầm `VIS-010` (hạt giống màu đào → chồi non → tán cây xanh nở hoa nhỏ) chuyển đổi trạng thái mềm theo 5 nhịp cuộn (hoặc nút chọn từng nhịp bằng bàn phím).
  - **Cột phải (58%):** Danh sách 5 bước kể chuyện HTML rõ ràng, mỗi bước có đường dẫn thẳng đứng nối các mốc sinh trưởng.
- **Bố cục Mobile:** Chuyển sang bố cục dọc gọn: hiển thị 1 khung minh họa tổng thể cây non hoặc 5 biểu tượng SVG nhỏ theo từng bước, tuyệt đối không dùng sticky gây che nội dung trên màn hình nhỏ.
- **Yêu cầu tài sản:** `VIS-010` — Khuyến nghị triển khai bằng **bộ SVG minh họa vẽ tay tinh gọn 5 trạng thái** (tổng `< 25 KB`, chuyển pha mượt, không bị nhảy ảnh, sắc nét ở mọi mức zoom) thay vì 5 file ảnh raster lớn.
- **Cấu trúc lớp:** `L0` Nền kem ấm `#F8F3E9` → `L2` Khung minh họa sinh trưởng `VIS-010` → `L4` Danh sách `<ol>` ngữ nghĩa 5 nhịp và đoạn sứ mệnh.
- **Vùng an toàn chữ:** Chữ nằm hoàn toàn ở cột văn bản riêng trên nền `#F8F3E9`, tương phản > 7:1.
- **Tương tác:** Khi cuộn qua từng bước (qua `IntersectionObserver`) **hoặc** khi người dùng bấm/focus vào tiêu đề bước, hình minh họa bên trái cập nhật trạng thái tương ứng.
- **Chuyển động:** Chuyển opacity/scale nhẹ (`300ms`) giữa các trạng thái sinh trưởng; khi `prefers-reduced-motion: reduce`, hiển thị ngay hình tổng thể hoàn chỉnh mà không chuyển động theo cuộn.
- **Responsive:** 2 cột sticky ở `>= 960px`; 1 cột tuần tự ở `< 960px`.
- **Tiếp cận:** Dùng `<ol>` có thứ tự rõ; không ẩn chữ quan trọng phụ thuộc vào vị trí cuộn; mọi văn bản luôn đọc được kể cả khi JS chưa chạy.
- **Hiệu năng:** SVG nhẹ `< 25 KB`, `IntersectionObserver` không gây reflow.
- **Tiêu chí nghiệm thu:** Truyền tải trọn vẹn ẩn dụ 5 bước, giữ nguyên văn sứ mệnh, không bịa bất kỳ số liệu khảo sát hay đối tác nào.

---

## SCENE H06 — Botanical Footer

- **Trạng thái:** **[PROPOSED]** (M1).
- **Mục tiêu UX:** Khép lại hành trình trang chủ một cách ấm áp, dễ nhận diện thương hiệu và cung cấp điều hướng rõ ràng mà không nặng nề.
- **Thứ bậc nội dung:**
  - Đường viền phân tách hữu cơ (dải lá/cỏ nét mảnh SVG nằm sát đỉnh footer).
  - Cột 1: Wordmark `brainroot.` + Slogan `From Brainrot to Brainroot` + 1 câu mô tả ngắn về tính mở công khai.
  - Cột 2: Liên kết điều hướng hiện có (`Khám phá`, `Trò chơi`, `Về Brainroot` — chỉ liệt kê route/neo thực sự hoạt động).
  - Cột 3: Ghi chú minh bạch phiên bản & bối cảnh thử nghiệm ULIS/Hà Nội (bổ sung liên hệ chính thức ở `BR-T007`).
  - Dòng đáy: `Brainroot 2.0 · From Brainrot to Brainroot`.
- **Bố cục Desktop:** Lưới 3 cột cân đối (`1.4fr 1fr 1.2fr`) trong container `1180px`, nền `#EFE9DC` (ấm hơn `#F8F3E9` một bậc nhẹ) tạo điểm kết vững chắc.
- **Bố cục Mobile:** Xếp 1 cột khoảng cách `24px`, liên kết có vùng chạm `>= 44px`.
- **Yêu cầu tài sản:** Đường viền thực vật mảnh bằng SVG từ gói `VIS-009` (`< 4 KB`), không cần ảnh raster.
- **Cấu trúc lớp:** `L0` Nền `#EFE9DC` → `L3` Viền lá SVG tinh tế (`aria-hidden="true"`) → `L4` Landmark `<footer>` với cột chữ và danh sách link.
- **Vùng an toàn chữ:** 100% nền đồng màu sạch, chữ `#263B31` và `#405442` đạt tương phản > 6:1.
- **Tương tác & Chuyển động:** Chỉ hover/focus đổi màu & gạch chân link; không dùng chuyển động trang trí.
- **Tiếp cận:** Landmark `contentinfo`, liên kết phân nhóm có tiêu đề rõ.
- **Hiệu năng:** Thuần HTML/CSS + inline SVG nhỏ.
- **Tiêu chí nghiệm thu:** Khớp màu thương hiệu, 0 link chết, đọc rõ trên 320px và zoom 200%.
