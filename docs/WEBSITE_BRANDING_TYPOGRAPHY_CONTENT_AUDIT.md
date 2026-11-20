# Báo cáo Rà soát Thương hiệu, Typography, Nội dung & Footer — Website Brainroot

- **Ngày kiểm toán:** 2026-11-20
- **Phạm vi kiểm tra:** Toàn bộ 10 tuyến giao diện công khai (`/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `*`) và chế độ xem 3D toàn màn hình (`/?preview=oanquan3d`), bao gồm Header, Footer, Breadcrumbs, Document Title, ALT ảnh, thông báo trạng thái và CTA.
- **Nguyên tắc bảo toàn:** Giữ nguyên Hero V4, artwork gốc Brainie/Rootie, 4 ảnh minh họa Four Garden Windows WebP, kỹ thuật 3D Three.js của Ô ăn quan xanh, logic FSM/localStorage, đường dẫn React Router và cấu hình GitHub Pages (`base: '/brainroot-2.0/'`).

---

## 1. Tóm tắt điều hành (Executive Summary)

Qua rà soát toàn diện mã nguồn và hiển thị thực tế trên trình duyệt Chromium (Desktop `1440×900` và Mobile `390×844`), website trước đợt chuẩn hóa tồn tại 4 nhóm vấn đề lớn ảnh hưởng tới tính chuyên nghiệp khi giới thiệu công khai:

1. **Tên thương hiệu và tên sản phẩm chưa nhất quán (P0):** Chuỗi nội bộ `Brainroot 2.0` xuất hiện ở Footer, trang Về Brainroot và thanh điều khiển 3D; tên sản phẩm thẻ bài vẫn hiển thị `Fact–Act` thay vì tên chính thức **`Brainroot - Truth or Dare`**; tên trò chơi dân gian hiển thị rời rạc `Ô ăn quan xanh` thay vì **`Brainroot - Ô ăn quan xanh`**.
2. **Lọt mã tác vụ nội bộ và thuật ngữ kỹ thuật ra giao diện người dùng (P0):** Các ký hiệu quản trị như `BR-T005`, `OQ-08`, `BR-T002`, `VIS-008`, `R0`, `R1`, `Lite`, `sandbox`, `mẫu nội bộ` xuất hiện trên tiêu đề trang, banner minh bạch, mô tả sản phẩm và trang Green Quest / Green Learn / Green Connect / About.
3. **Typography tiếng Việt trên tiêu đề phụ hơi nặng và nén (P1):** Phông chữ `Be Vietnam Pro` tải đúng và phù hợp thương hiệu, nhưng tiêu đề phụ (`h1` trang con, `h2` các section ngoài Hero) đặt `font-weight: 900` và `letter-spacing: -0.045em` đến `-0.036em` khiến dấu tiếng Việt dễ sát nhau; `body` chưa khai báo `line-height` tường minh.
4. **Footer chiếm chiều cao lớn trên Desktop và Mobile (P1):** Tổng chiều cao `footer.site-footer` là **`436px`** trên Desktop `1440×900` (`368px` phần nội dung + `69px` dải sóng) và **`817px`** trên Mobile `390×844` do bố cục 2 cột điều hướng lệch mật độ, padding rộng và đường cắt lớn.

Toàn bộ các mục P0 và P1 đã được xử lý triệt để, kiểm chứng bằng 28 bài kiểm thử đơn vị (`28/28 PASS`), TypeScript (`0` lỗi), `vite build` và Playwright Chromium thực tế trên tất cả 11 tuyến. Các nội dung chưa có xác nhận chính thức (đặc biệt là luật chơi chính thức và bộ thẻ 2 mặt **Brainroot - Truth or Dare**, thẻ mẫu `BR-T005`, luật số `OQ-08`, kênh liên hệ chính thức) được giữ trung thực tuyệt đối và ghi rõ trong Mục 5.

---

## 2. Bảng rà soát chi tiết theo mức độ ưu tiên (P0 / P1 / P2)

| Ưu tiên | Trang | Vị trí | Nội dung hiện tại (BEFORE) | Vấn đề | Thay thế (AFTER / Đề xuất) | Trạng thái |
|---|---|---|---|---|---|---|
| **P0** | Toàn site | Footer, `/about`, `/?preview=oanquan3d`, header 3D | `Brainroot 2.0 · Cộng đồng rộng mở…`, `BRAINROOT 2.0 · SANDBOX 3D`, `Trạng thái hiện tại của Brainroot 2.0 (R0)` | Lộ tên phiên bản nội bộ `Brainroot 2.0`, `R0`, `SANDBOX` thay vì tên thương hiệu công khai **Brainroot**. | Đổi đồng nhất sang **`Brainroot`** (`Brainroot · Cộng đồng rộng mở…`, `BRAINROOT · TRẢI NGHIỆM 3D THỬ NGHIỆM`, `Trạng thái hiện tại của Brainroot`). | **Đã sửa** |
| **P0** | Toàn site | Homepage H03/H04, `/games`, `/games/fact-act`, `/games/fact-act/play`, Footer, `document.title`, ALT ảnh | `Fact–Act`, `Fact–Act (thẻ bài xanh)`, `Trải nghiệm thử Fact–Act` | Chưa dùng tên sản phẩm chính thức **`Brainroot - Truth or Dare`**. | Chuẩn hóa đồng nhất thành **`Brainroot - Truth or Dare`** trên toàn bộ UI công khai, breadcrumb, title, CTA và ALT (giữ nguyên route `/games/fact-act` để tránh vỡ liên kết). | **Đã sửa** |
| **P0** | Toàn site | Homepage H03/H04, `/games`, `/games/o-an-quan-xanh`, `/?preview=oanquan3d`, Footer, `document.title`, ALT ảnh | `Ô ăn quan xanh` đứng độc lập ở tên sản phẩm | Thiếu tiền tố thương hiệu trong tên sản phẩm chính thức **`Brainroot - Ô ăn quan xanh`**. | Chuẩn hóa thành **`Brainroot - Ô ăn quan xanh`** ở toàn bộ vị trí tên sản phẩm, tiêu đề, breadcrumb, thẻ sản phẩm và Footer. | **Đã sửa** |
| **P0** | `/games/fact-act` & `/games/fact-act/play` | Mô tả sản phẩm & định hướng bản thử nghiệm | Mô tả cũ xoay quanh tên `Fact–Act` và cấu trúc 3 bước cố định | Cần phản ánh đúng tên **`Brainroot - Truth or Dare`** nhưng **tuyệt đối không bịa luật Truth or Dare**, không gán `Truth = Fact` hay `Dare = Act`, và không đổi logic máy trạng thái hiện có. | Viết lại giới thiệu trung lập, trung thực: nêu rõ bộ thẻ vật lý khơi gợi đối thoại và hành động xanh; bản chơi thử hiện tại trên web là phiên bản tình huống sớm gồm 3 bước *Tình huống → Hành động → Phản tư* trong khi thể lệ chính thức và bộ thẻ số hai mặt **Brainroot - Truth or Dare** đang được hoàn thiện. | **Đã sửa** (chờ PO chốt luật chính thức) |
| **P0** | `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/learn`, `/connect`, `/about` | Banner minh bạch, chú thích thẻ, ghi chú luật chơi | `BR-T005`, `OQ-08`, `BR-T002`, `VIS-008`, `mẫu nội bộ`, `sandbox` | Lọt mã tác vụ quản trị nội bộ và thuật ngữ kỹ thuật ra giao diện người dùng cuối. | Chuyển sang diễn đạt tiếng Việt tự nhiên, minh bạch: *"đang được đội ngũ kiểm duyệt"*, *"luật bản số đang chuẩn hóa"*, *"tình huống minh họa thử nghiệm"*, *"bản đồ họa 3D thử nghiệm"*. Bảo toàn nguyên văn chú thích `Minh họa khái niệm — luật bản số đang chuẩn hóa.`. | **Đã sửa** |
| **P0** | `/quest`, `/learn`, `/about`, `document.title` | Tiêu đề trang, breadcrumb, badge | `Green Quest Lite`, `Green Learn Lite`, `R0`, `R1`, `Bản R0` | Dùng nhãn nội bộ phát hành (`Lite`, `R0`, `R1`) gây khó hiểu cho học sinh, giáo viên và khách truy cập. | Đổi thành **`Green Quest`**, **`Green Learn`**, *"giai đoạn khởi đầu"*, *"giai đoạn tiếp theo"*; vẫn giữ trung thực phạm vi hiện có (1 thử thách khởi đầu, 5 chủ đề bản thảo khung). | **Đã sửa** |
| **P1** | Toàn site (ngoài Hero V4) | `body`, `.gp-detail-hero__title`, `.gp-detail-section__title`, `.gp-pavilion__title`, `.worlds--garden-windows .section-heading`, `#featured-play-heading`, `#about-heading` | `body` `line-height: normal`; `h1` trang con `weight: 900`, `letter-spacing: -0.045em`; `h2` `letter-spacing: -0.036em` | Khoảng cách chữ quá âm trên tiêu đề tiếng Việt nhiều dấu khiến chữ bị nén và khó quét; văn bản thân bài thiếu `line-height` tiêu chuẩn. | Giữ nguyên `Be Vietnam Pro` và Hero V4; đặt `body { line-height: 1.6 }`, hạ `h1` trang con về `weight: 800`, nới `letter-spacing` tiêu đề ngoài Hero về `-0.024em` đến `-0.026em`, thêm `text-wrap: balance`, tăng chữ tóm tắt lên `15.5px–16px`. | **Đã sửa** |
| **P1** | Toàn site | Footer (`SiteFooter.tsx` & `unified-world.css`) | Desktop `436px` (`368px` surface + `69px` divider); Mobile `817px`; 2 cột điều hướng lệch số liên kết (6 vs 4) | Footer quá cao, gây nặng chân trang và loãng thông tin. | Tối ưu tự nhiên (không dùng `transform`/`scale`): rút gọn dải sóng (`22–32px`), cân đối 2 cột `Hệ sinh thái` (4 mục) & `Sản phẩm & Dự án` (4 mục), thu gọn padding và gom dòng pháp lý/minh bạch thành 1 hàng trên Desktop, chia 2 cột song song trên Mobile. Giảm xuống **`277px`** Desktop (**`-36.5%`**) và **`494px`** Mobile (**`-39.5%`**). | **Đã sửa** |
| **P1** | `SiteHeader.tsx`, `SiteFooter.tsx` | `alt` biểu trưng thương hiệu | `"Logo Brainroot"` | Dùng từ vay mượn thiếu đồng bộ với giọng văn tiếng Việt của dự án. | Đổi thành `"Biểu trưng Brainroot"`. | **Đã sửa** |
| **P2** | `/games/fact-act/play` | Nhãn bước trên màn chơi thử | `FACT` / `ACT` / `PHẢN TƯ` (trong định hướng thẻ) | Tránh gây hiểu nhầm đối xứng với cơ chế Truth/Dare chưa công bố. | Đổi nhãn hiển thị thành **`TÌNH HUỐNG`** / **`HÀNH ĐỘNG`** / **`PHẢN TƯ`** (giữ nguyên mã FSM nội bộ `fact`/`action`/`reflection`). | **Đã sửa** |
| **P2** | `/games/o-an-quan-xanh` | Liên kết mở 3D toàn màn hình (`sandboxNotice.href`) | `'/?preview=oanquan3d'` (hardcoded) | Có thể sai đường dẫn khi chạy dưới subpath `/brainroot-2.0/` trên GitHub Pages. | Bọc qua `publicUrl('/?preview=oanquan3d')` đồng bộ với trang chủ. | **Đã sửa** |
| **P2** | `/games/fact-act/play`, `/learn`, `/games/o-an-quan-xanh`, `/connect` | Nội dung chính thức & kênh liên hệ | Thẻ mẫu thử nghiệm, 5 chủ đề bản thảo khung, chưa có luật số chính thức, chưa công bố email/MXH | Chưa có quyết định chính thức từ Product Owner & Đội nội dung. | Giữ nguyên trạng thái minh bạch, **không bịa dữ liệu**; chuyển danh sách sang Mục 5 chờ phê duyệt. | **Chờ PO duyệt** |

---

## 3. Kiểm toán Typography (Typography Audit)

### 3.1. Xác minh phông chữ hiện tại & tài liệu dự án
- **Phông chữ đang tải trên trình duyệt:** `Be Vietnam Pro` (Google Fonts, 13 font faces cho các trọng lượng `400, 600, 700, 800, 900`).
- **Bằng chứng trong tài liệu dự án:** `Be Vietnam Pro` là phông chữ đã được thiết lập nhất quán trong `docs/UX_UI_MASTER_BLUEPRINT.md`, `reference/hero-v4/docs/`, `planning/PROJECT_STATE.md` và `index.html`. Trong `docs/DESIGN_SYSTEM.md`, mục typography vẫn đánh dấu trạng thái `PROPOSED` chờ chốt bản quyền thương mại tổng thể (`BR-T002`).
- **Kết luận:** **Không thay phông chữ** (giữ nguyên `Be Vietnam Pro` vì hỗ trợ dấu tiếng Việt xuất sắc, đúng nhận diện ấm áp–hiện đại của Brainroot và tránh thay đổi ngoài phê duyệt).

### 3.2. Đo đạc thực tế BEFORE vs AFTER (Desktop `1440×900`)

| Thành phần | BEFORE | AFTER | Ghi chú |
|---|---|---|---|
| `body` | `Be Vietnam Pro`, `16px`, `w400`, `lh: normal` | `Be Vietnam Pro`, `16px`, `w400`, `lh: 25.6px (1.6)` | Tăng độ thoáng cho đoạn văn tiếng Việt. |
| Hero V4 `h1` (`.hero h1`) | `100.8px`, `w900`, `ls: -8.77px`, `lh: 113.9px` | **Giữ nguyên 100%** | Bảo toàn tuyệt đối Hero V4 theo yêu cầu. |
| Trang chủ `h2` (`#worlds`) | `40px`, `w800`, `ls: -1px (-0.025em)` | `40px`, `w800`, `ls: -1px (-0.025em)`, `text-wrap: balance` | Ngắt dòng cân đối hơn. |
| Trang chủ `h2` (H04 & H05) | `38px`, `w800`, `ls: -1.368px (-0.036em)` | `38px`, `w800`, `ls: -0.912px (-0.024em)`, `text-wrap: balance` | Giảm độ nén dấu tiếng Việt ở tiêu đề dài. |
| Trang con `h1` (`.gp-detail-hero__title`) | `50px`, `w900`, `ls: -2.25px (-0.045em)` | `50px`, `w800`, `ls: -1.3px (-0.026em)`, `lh: 57.5px`, `text-wrap: balance` | Nhẹ mắt hơn, dấu mũ/nặng không chạm chữ kế bên. |

---

## 4. Kiểm toán & Tối ưu Footer (Footer Audit)

Thực hiện tối ưu thuần bằng cấu trúc bố cục, padding, kích thước dải sóng và rút gọn câu chữ — **tuyệt đối không dùng CSS `transform` hay `scale`**.

| Viewport | Thành phần | BEFORE | AFTER | Mức giảm |
|---|---|---:|---:|---:|
| **Desktop `1440×900`** | Toàn bộ `footer.site-footer` | **`436px`** | **`277px`** | **`-36.5%` (`-159px`)** |
| **Desktop `1440×900`** | Phần nội dung `.site-footer__surface` | `368px` | `246px` | `-33.2%` (`-122px`) |
| **Desktop `1440×900`** | Dải sóng `.botanical-divider` | `69px` | `32px` | `-53.6%` (`-37px`) |
| **Mobile `390×844`** | Toàn bộ `footer.site-footer` | **`817px`** | **`494px`** | **`-39.5%` (`-323px`)** |
| **Mobile `390×844`** | Phần nội dung `.site-footer__surface` | `778px` | `473px` | `-39.2%` (`-305px`) |

- **Cải thiện cấu trúc:** Cân đối 2 cột điều hướng 4×4 (`Hệ sinh thái`: Trang chủ, Green Play, Green Quest, Green Learn · `Sản phẩm & Dự án`: Brainroot - Truth or Dare, Brainroot - Ô ăn quan xanh, Green Connect, Về Brainroot), hiển thị 2 cột song song gọn trên Mobile với vùng chạm tối thiểu `36px–40px`, gom 2 dòng chú thích dưới đáy thành 1 hàng gọn gàng trên Desktop, 0 tràn ngang.

---

## 5. Danh mục hạng mục cần Product Owner / Đội nội dung xác nhận

Các nội dung dưới đây **chưa được tự ý bịa đặt** và cần quyết định chính thức trước khi công bố rộng rãi:

1. **Thể lệ chính thức & thiết kế thẻ 2 mặt của `Brainroot - Truth or Dare`:** Xác nhận luật chơi số chính thức, cấu trúc mặt Truth / mặt Dare và phê duyệt thời điểm thay thế luồng tình huống sớm 3 bước hiện tại tại `/games/fact-act/play`.
2. **Duyệt bộ thẻ mẫu công khai và nguồn tham khảo (`BR-T005`):** Cung cấp tối thiểu 5 thẻ mẫu công khai đã duyệt cho **Brainroot - Truth or Dare** (thay cho 3 tình huống thử nghiệm hiện tại) và nguồn tài liệu kiểm chứng cho 5 chủ đề **Green Learn**.
3. **Chốt luật bản số cho `Brainroot - Ô ăn quan xanh` (`OQ-08`):** Xác nhận cách gắn 5 chủ đề và 3 cấp độ vào các ô bàn chơi, quy tắc tính điểm/nhiệm vụ để thay thế chế độ thử nghiệm chuyển 1 sỏi hiện tại.
4. **Kênh liên hệ, mạng xã hội & lịch thí điểm chính thức:** Cung cấp email, fanpage/kênh chính thức và lịch hoạt động ULIS/Hà Nội để điền vào `/connect` và `/about`.
5. **Xác nhận quyền phát hành thương mại (`BR-T002`):** Xác nhận bản quyền sử dụng công khai cho artwork Brainie/Rootie, bộ thẻ, tranh minh họa và phông chữ `Be Vietnam Pro`.

---

## 6. Kết quả kiểm thử & Danh sách tệp đã cập nhật

- **Unit tests (`npx --yes tsx --test tests/*.test.ts`):** **PASS (28/28)** — gồm bài test mới #28 kiểm tra tự động 0 rò rỉ chuỗi cấm (`Brainroot 2.0`, `BR-T*`, `OQ-*`, `VIS-*`, `R0/R1`, `Lite`, `sandbox`, `mẫu nội bộ`, `Fact–Act`) trên toàn bộ dữ liệu hiển thị công khai.
- **TypeScript (`npm run typecheck`):** **PASS** (`0` lỗi).
- **Build (`npm run build` / `vite build`):** **PASS**.
- **Playwright Chromium thực tế (`1440×900` & `390×844` trên toàn bộ 11 tuyến):** **PASS** — `0` lỗi console/pageerror, `0` ảnh vỡ, `0` tràn ngang, `0` chuỗi cấm trên DOM & `<title>`, nút khởi chạy bản thử nghiệm `/games/fact-act/play` hoạt động đúng.
- **ESLint (`npm run lint`):** `NOT RUN` (`package.json` chưa có script `lint`).
- **Git status:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
