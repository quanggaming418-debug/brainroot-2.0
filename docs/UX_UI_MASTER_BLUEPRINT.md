# BRAINROOT 2.0 — UX/UI MASTER BLUEPRINT (Rev 1.1)

**Task ID:** `BR-T021` (`DONE` — 2026-11-20)  
**Ngày cập nhật:** 2026-11-20 (Đóng gói phê duyệt thiết kế — Rev 1.1)  
**Trạng thái:** **`APPROVED` (Đặc tả thiết kế)** — Product Owner đã phê duyệt **GATE A** (Information Architecture), **GATE B** (Storyboard Rev 1.1) và **GATE C** (Visual Asset Register Rev 1.1) theo commit `0a735d189885` ngày `2026-11-20`. Phê duyệt này chỉ áp dụng cho đặc tả thiết kế, **không** thay thế phê duyệt artwork hoàn chỉnh cuối cùng.  
**Phạm vi:** Đặc tả kiến trúc trải nghiệm, định hướng mỹ thuật **ONE LIVING WORLD**, hệ thống thiết kế, routing đề xuất và lộ trình triển khai R0 (không sửa mã nguồn ứng dụng, không cài dependency, không sinh ảnh trong tác vụ này).

## Quy ước phân loại bằng chứng
- **[VERIFIED]**: Đã kiểm chứng trực tiếp trong mã nguồn `src/`, thư mục `public/assets/hero-v4/` hoặc tài liệu hiện hành của repo.
- **[APPROVED]**: Quyết định sản phẩm/thương hiệu đã được Product Owner xác nhận rõ ràng.
- **[PROPOSED]**: Đề xuất thiết kế/kiến trúc từ bản đặc tả này, cần phê duyệt trước khi triển khai.
- **[BLOCKED]**: Bị chặn bởi thiếu tài sản, nội dung khoa học đã duyệt, bản quyền thương mại (`BR-T002`) hoặc quyết định nghiệp vụ (`planning/OPEN_QUESTIONS.md`).

---

## 1. Kiểm toán hiện trạng website & đồng bộ kho mã (Audit)

### 1.1 Sai lệch trạng thái Git & tài liệu cần ghi nhận
- **[VERIFIED — Hạn chế môi trường]:** Workspace Google AI Studio hiện **không chứa thư mục `.git`** (`git status`/`git log` trả về `fatal: not a git repository`). Mọi thay đổi tài liệu trong phiên này đều ở trạng thái **NOT COMMITTED** và cần đồng bộ lên GitHub qua luồng sync được hỗ trợ để Product Owner và Reviewer kiểm tra trực tiếp trên Markdown.
- **[VERIFIED — Sai lệch mã nguồn vs tài liệu đồng bộ]:**
  - Mã nguồn `src/` (`HeroSection.tsx`, `useHeroParallax.ts`, `landing.css`, `tokens.css`, `focusAnchorTarget.ts`, `SiteHeader.tsx`, `EcosystemSection.tsx`, `AboutSection.tsx`, `App.tsx`) **đã chứa đầy đủ** cả `BR-T003` remediation và `BR-T020` Hero Ambient Motion Restoration.
  - Tuy nhiên, `planning/TASKS.md`, `planning/PROJECT_STATE.md` và `logs/HANDOFF.md` trước phiên `BR-T021` vẫn ghi `BR-T020` ở trạng thái `IN_REVIEW` trên nhánh `codex/hero-ambient-motion`, trong khi Product Owner xác nhận `BR-T003` và `BR-T020` đã merge vào `main`. Cần đối chiếu commit trên GitHub để chốt đồng bộ bảng trạng thái.

### 1.2 Kiểm toán UX/UI hiện tại (`src/` & `public/assets/hero-v4/`)
| Hạng mục | Hiện trạng [VERIFIED] | Đánh giá UX/UI |
|---|---|---|
| **Nền tảng kỹ thuật** | React 19 + TypeScript + Vite 7 + CSS chuẩn module hóa (`tokens.css`, `base.css`, `landing.css`); chưa cài router (chỉ có neo nội trang `#top`, `#worlds`, `#games`, `#quest`, `#connect`, `#about`). | Nhẹ, sạch; đề xuất dùng **React Router** ở `BR-T004` (chưa cài đặt). |
| **Scene H01 (Hero V4)** | 3 lớp parallax (`depth-01..03.webp`), nền dự phòng `hero-garden-v4.webp`, Brainie & Rootie gốc, 2 lá SVG, 1 CTA chính `#E79A7C`, `Be Vietnam Pro`, `--color-headline-on-hero: #53743e`, `BR-T020` ambient motion tạm dừng khi ẩn tab, `focusAnchorTarget` + skip-link `#main-content`. | **[APPROVED]** Chuẩn thị giác gốc. Đã qua QA độc lập của Codex (1440/390/320, zoom 200%, 0 lỗi console, axe 0 vi phạm tự động). |
| **Chuyển cảnh H01 → H03** | Cắt ngang cứng (hard cut) từ chân cỏ xanh của `.hero` sang nền kem phẳng `#F8F3E9` của `.worlds`. | Đứt mạch kể chuyện *One Living World*. Cần chuyển cảnh đa trạng thái `H01 → H02 → H03` (xem `docs/UX_UI_STORYBOARD.md`). |
| **Ecosystem (`#worlds`)** | Lưới 2×2 gồm 4 thẻ hình chữ nhật phẳng dùng ký tự Unicode (`✦`, `❀`, `☘`, `❂`) và nhãn `"Đang phát triển"`. | Trung thực về trạng thái nhưng cần hệ thống minh họa đồng bộ cho **cả 4 điểm đến** (không để 3 vùng còn lại ở dạng thẻ Unicode phẳng khi `Green Play` có tranh chất lượng cao). |
| **Featured Green Play** | `fact-act-deck.webp` (92 KB, nền trong suốt) đã có sẵn trong `public/assets/hero-v4/` nhưng chưa gắn lên UI; chưa có khu giới thiệu `Ô ăn quan xanh`. | Cần sớm đưa `fact-act-deck.webp` vào H04 và `/games`. |
| **About (`#about`) & Footer** | Đoạn chữ ngắn gọn, trung thực; footer 1 dòng tối giản. | Cần nâng cấp nhẹ thành câu chuyện nảy mầm 5 bước ở giai đoạn nâng cấp trang chủ (không chặn R0 core). |

---

## 2. Kiến trúc thông tin UX & Kiến trúc Routing (GATE A — [PROPOSED])

### 2.1 Tuyến R0 cốt lõi (Initial Product System)
> Nguyên tắc **[APPROVED]**: Công khai cho mọi người; khách xem thông tin và chơi thử không cần đăng nhập; không tạo link chết hay giả vờ tính năng chưa làm là đã hoạt động.

| Tuyến (Route) | Tên màn hình | Mục tiêu UX | Task / Milestone | Quy tắc hiển thị |
|---|---|---|---|---|
| `/` | Trang chủ (Living World) | Hiểu sứ mệnh trong 10–20s, khám phá 4 vùng hệ sinh thái, dẫn vào Green Play | Đã có nền `BR-T003` + `BR-T020`; nâng cấp ở **M1B** | Luôn hiện |
| `/games` | Thư viện trò chơi (Green Play Pavilion) | Trưng bày `Fact–Act` & `Ô ăn quan xanh` với trạng thái khả dụng trung thực | `BR-T004` (**M2**) | Chỉ kích hoạt route khi `BR-T004` hoàn tất |
| `/games/fact-act` | Chi tiết sản phẩm Fact–Act | Giá trị học tập, cơ chế Fact→Act→Phản tư, cầu nối vật lý ↔ số, lối vào bản chơi thử | `BR-T004` (**M2**) | Trong `/games` & nút từ H04 |
| `/games/o-an-quan-xanh` | Chi tiết sản phẩm Ô ăn quan xanh | Trình bày 5 chủ đề & 3 cấp độ giáo dục; nêu rõ minh họa khái niệm & luật số đang chuẩn hóa | `BR-T004` (**M2**) | Trong `/games` |
| `/games/fact-act/play` | Chơi thử miễn phí Fact–Act | 1 vòng lặp giáo dục hoàn chỉnh: hướng dẫn → rút/chọn → phản hồi + nguồn → phản tư → kết quả | `BR-T006` (**M3**) — **[BLOCKED]** bởi `BR-T005` | Chỉ mở khi `BR-T005` + `BR-T006` PASS |
| `/about` | Về Brainroot & liên hệ chính thức | Sứ mệnh, bối cảnh thử nghiệm ULIS/Hà Nội, nguồn dự án, kênh liên hệ xác nhận | `BR-T007` (**M4**) | Trước `BR-T007`: dùng neo `/#about` |
| `*` | Fallback 404 thân thiện | Hồi phục an toàn khi nhập sai đường dẫn, có nút về `/` và `/games` | `BR-T004` (**M2**) | Tự động cho mọi route không khớp |

### 2.2 Hệ sinh thái tương lai (Conceptual Architecture — KHÔNG triển khai ở R0)
- `Green Quest` (`/challenges`, R1 `BR-T011`), `Green Learn` (`/discover`, R1–R3 `BR-T010`), `Green Connect` / Educators (`/connect`, `/educators`, R1–R2), `Green Arena Lite` (`/host/rooms`, `/join`, R2 candidate `BR-T016`), `Green Pulse` (`/discover/air-quality`, R1/R3 `BR-T013`), `Account` (`/account`, R1 `BR-T012`), `Paid Activation` (`/activate`, R3 `BR-T017`), `Brainroot Buddy` (R3 `BR-T018`). Mọi tuyến này đều **[BLOCKED]** theo `planning/OPEN_QUESTIONS.md` và không mở link giả ở R0.

### 2.3 Kiến trúc Routing đề xuất cho `BR-T004` — React Router ([PROPOSED], chưa cài đặt)
- **Thư viện đề xuất:** **React Router** (`react-router-dom`, chế độ SPA `BrowserRouter`) — *không cài đặt trong `BR-T021`; chỉ cài và xác minh ở bước mở `BR-T004` sau khi được phê duyệt*.
- **Cấu trúc tuyến khai báo trong `App.tsx` (từ M2):**
  - `/` → `HomePage`
  - `/games` → `GameLibraryPage`
  - `/games/fact-act` → `FactActDetailPage`
  - `/games/o-an-quan-xanh` → `OAnQuanXanhDetailPage`
  - `/games/fact-act/play` → bổ sung ở M3 (`BR-T006`)
  - `/about` → bổ sung ở M4 (`BR-T007`)
  - `*` → `NotFoundPage`
- **Điều hướng Tiến / Lùi (Back / Forward):** Sử dụng History API chuẩn của `BrowserRouter`, bảo toàn lịch sử trình duyệt giữa `/` ↔ `/games` ↔ `/games/*` và giữa các anchor `/#worlds`, `/#about`.
- **Khôi phục cuộn & tiêu điểm bàn phím (Scroll & Focus Restoration):**
  - Xây dựng thành phần quản lý `RouteScrollAndFocus` dùng `useLocation()` và `useNavigationType()`:
    1. **Cập nhật `<title>` động** theo từng trang (VD: `"Green Play — Thư viện trò chơi | Brainroot"`, `"Fact–Act | Brainroot"`).
    2. **Khi điều hướng có `#hash`** (ví dụ từ `/games` bấm `"Về Brainroot"` → `/#about`, hoặc trên `/` bấm `#worlds`): đợi render xong, tìm phần tử theo `id`, cuộn tới đích (`behavior: prefersReducedMotion ? 'auto' : 'smooth'`) và gọi `.focus({ preventScroll: true })` (tái sử dụng triết lý của `src/utils/focusAnchorTarget.ts`).
    3. **Khi điều hướng sang pathname mới (`PUSH`/`REPLACE`) không có `#hash`:** cuộn tức thì lên đầu trang `(0, 0)` và chuyển focus vào `<main id="main-content" tabIndex={-1}>` để người dùng bàn phím/screen reader bắt đầu đọc trang mới ngay.
    4. **Khi bấm Back / Forward (`POP`):** tôn trọng cơ chế khôi phục vị trí cuộn của trình duyệt (hoặc lưu vị trí cuộn theo `location.key`) để quay về đúng điểm đang xem trên `/` hoặc `/games`.
- **Fallback cho đường dẫn không tồn tại (`*`):** Trang `NotFoundPage` dùng chung `SiteHeader` (biến thể `solid-ivory`) và `SiteFooter`, có `<h1>Không tìm thấy trang này</h1>`, giải thích ngắn bằng tiếng Việt, CTA chính `"Về trang chủ"` (`/`) và link phụ `"Xem Thư viện trò chơi"` (`/games`).
- **Yêu cầu cấu hình SPA Hosting Fallback:**
  - Môi trường dev/preview của Vite xử lý SPA fallback mặc định cho đường dẫn không phải file tĩnh; tuy nhiên khi triển khai lên static hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages hoặc Nginx), **bắt buộc cấu hình rewrite fallback** trỏ mọi route ứng dụng (`/*`, loại trừ `/assets/*`) về `/index.html` để người dùng tải lại trực tiếp `/games/fact-act` không bị lỗi HTTP 404 từ máy chủ.
  - Ở `BR-T004` QA, bắt buộc kiểm thử tải trực tiếp (hard reload) tại `/games`, `/games/fact-act`, `/games/o-an-quan-xanh` và một route lạ `/khong-ton-tai`.
- **Điều hướng neo từ Trang chủ và từ Trang con:**
  - Trên `/`: các mục `Khám phá` (`/#worlds`), `Thử thách` (`/#quest`), `Cộng đồng` (`/#connect`), `Về Brainroot` (`/#about`) cuộn mượt và focus đúng mục đích; mục `Trò chơi` đi thẳng tới `/games`.
  - Khi đang ở `/games` hoặc `/games/*`: bấm các mục neo (`/#worlds`, `/#quest`, `/#connect`, `/#about`) sẽ chuyển về `/` kèm `#hash` và cuộn tới đúng phân khu nhờ `RouteScrollAndFocus`.

---

## 3. Hành trình người dùng chi tiết (6 Personas — [PROPOSED])

| Hành trình | Điểm vào & Mục tiêu | Luồng màn hình & Hành động chính/phụ | Trạng thái thành công & Lỗi/Không khả dụng | Tiếp cận & Phụ thuộc |
|---|---|---|---|---|
| **J-01: Khách lần đầu** | `/` — Hiểu Brainroot trong 10–20s không cần đăng nhập. | `/` (H01) → CTA chính `"Khám phá thế giới Brainroot"` → H02/H03 (4 vùng) → H04 → `/games`. Phụ: menu neo `#about`. | Hiểu sứ mệnh & phân biệt rõ sản phẩm có sẵn vs lộ trình. Ảnh chậm vẫn đọc được chữ HTML; sai URL ra trang 404 có lối về `/`. | DOM khớp thị giác, tương phản AA. Phụ thuộc M1B/M2. |
| **J-02: HS/SV khám phá game** | `/#worlds` hoặc `/games` — So sánh `Fact–Act` & `Ô ăn quan xanh`. | `/games` → `/games/fact-act` hoặc `/games/o-an-quan-xanh` → quay lại `/games` qua breadcrumb. Chính: xem chi tiết sản phẩm. | Hiểu rõ mục tiêu học, chủ đề & trạng thái bản số. Khi chưa có `BR-T006` hiển thị panel trạng thái trung thực thay vì nút giả. | Trạng thái có chữ rõ (không chỉ màu), hỗ trợ bàn phím. Phụ thuộc `BR-T004`, Wave 1A. |
| **J-03: Khách chơi thử miễn phí** | `/games/fact-act` → `"Chơi thử miễn phí"` — Hoàn tất 1 vòng học không cần login. | Hướng dẫn → từng thẻ Fact/Act → phản hồi + nguồn → phản tư → tổng kết → chơi lại / về `/games`. Phụ: chọn phương án thay thế tiếp cận. | Hoàn tất không cần tài khoản, thấy nguồn rõ ràng. Lỗi tải dữ liệu → `ErrorState` có nút thử lại; F5 giữa ván → hỏi khôi phục `sessionStorage` hoặc chơi lại. | Không giới hạn thời gian mặc định, không phụ thuộc kéo-thả/âm thanh, `aria-live="polite"`. **[BLOCKED]** bởi `BR-T005`, `BR-T006`. |
| **J-04: Bàn phím & công nghệ hỗ trợ** | Mọi route — Hoàn thành khám phá & chơi thử không cần chuột. | `Tab` đầu → `skip-link` (`#main-content`) → landmarks (`banner`, `navigation`, `main`, `contentinfo`) → `Escape` đóng menu/dialog & trả focus. | Không bẫy focus, đổi route tự focus `<main>` & cập nhật title. Lỗi công bố qua `role="alert"`. | Ghi nhận giới hạn WCAG 2.2.2 của H01; H02–H06 & `/games` không mở rộng ngoại lệ motion > 5s. |
| **J-05: Giáo viên / Trưởng CLB** | `/` hoặc `/games` — Đánh giá sự phù hợp cho lớp/CLB. | `/` → H03 (`Green Play`, `Green Connect`) → `/games/*` (xem mục tiêu, 5 chủ đề, 3 cấp độ) → `#about`/`/about`. | Thấy rõ cấu trúc giáo dục, tính minh bạch khoa học và biết `Green Arena` là định hướng R2. Chưa chốt liên hệ → hiện trạng thái chờ cập nhật, không bịa email. | Thông số dùng `<dl>` rõ ràng ở zoom 200%. Phụ thuộc `BR-T004`, `BR-T007`. |
| **J-06: Người mua bộ bài vật lý** | QR/link trên hộp bài hoặc mục Phygital trên `/games/fact-act`. | R0: đọc mục `"Kết nối bộ thẻ vật lý & số hóa"` (ghi rõ cổng nhập mã mở ở giai đoạn sau) + chơi bản thử công khai. R3: `/activate` → đăng nhập → xác thực server-side. | Không có form nhập mã giả ở R0; ở R3 tuyệt đối không đưa danh sách mã hay gói bài trả phí vào client bundle. | QR vật lý kèm mã chữ & URL ngắn. **[BLOCKED]** bởi `OQ-04`, `BR-T012`, `BR-T017`. |

---

## 4. Hệ thống UX/UI Thư viện Trò chơi (`BR-T004` & `BR-T006` — [PROPOSED])

### 4.1 `/games` — Green Play Pavilion
- **Bầu không khí:** Gian học nhà kính ngoài trời nối tiếp khu vườn Hero V4.
- **Cấu trúc:**
  1. `Breadcrumbs` (`Trang chủ / Green Play`) + Pavilion Banner với nền `VIS-006` (60% trung tâm trống sạch cho `<h1>Green Play</h1>` và mô tả ngắn).
  2. **2 Product Showcases bất đối xứng đảo chiều (không lặp template thẻ phẳng):**
     - **Fact–Act (ưu tiên trên, ảnh trái 55% / chữ phải 45% trên desktop):** Sân khấu trưng bày ảnh gốc `fact-act-deck.webp` (`VIS-007`) trên nền hữu cơ `#F4D0BA` + điểm lá SVG `VIS-009`; bên phải gồm `ProductStatusLabel`, mô tả mục tiêu học, `<dl>` thông số gọn và CTA `"Khám phá Fact–Act"` → `/games/fact-act`.
     - **Ô ăn quan xanh (chữ trái 45% / minh họa phải 55% trên desktop):** Khung trưng bày minh họa khái niệm `VIS-008` trên nền `#DBE9DD` kèm chú thích *"Minh họa khái niệm — Luật bản số đang chuẩn hóa"*; bên trái tóm tắt **5 chủ đề** & **3 cấp độ** cùng CTA `"Tìm hiểu Ô ăn quan xanh"` → `/games/o-an-quan-xanh`.
  3. **Khối minh bạch Phygital & lối về `/`:** Giải thích mối quan hệ giữa sản phẩm vật lý và trải nghiệm web miễn phí.

### 4.2 `/games/fact-act` & `/games/o-an-quan-xanh`
- **`/games/fact-act`:** Hero 2 cột giữ `fact-act-deck.webp` gốc; giải thích 2 nhịp **Fact → Act** và cơ chế 3 bước (`Rút thẻ → Suy nghĩ/Hành động → Đối chiếu nguồn & Phản tư`); bảng đối chiếu trung thực **Bản chơi thử web** vs **Bộ thẻ vật lý**; cam kết có phương án thay thế tiếp cận. Trước khi `BR-T006` hoàn thành, khu vực chơi thử hiển thị trạng thái trung thực `"Bản chơi thử đang kiểm duyệt nội dung"` (không tạo nút chơi giả, không vẽ mặt thẻ giả, không lộ bộ thẻ trả phí).
- **`/games/o-an-quan-xanh`:** Trang giới thiệu sản phẩm thuần túy; hiển thị `VIS-008` kèm nhãn minh họa khái niệm; liệt kê chính xác **5 chủ đề** (`Tiêu dùng bền vững`, `Nước`, `Năng lượng`, `Rác thải`, `Không gian xanh`) và **3 cấp độ** (`Nhận biết`, `Ra quyết định`, `Giải quyết vấn đề`) từ `docs/GAME_SPEC.md`; nêu rõ luật bàn cờ số đang chờ chuẩn hóa (`OQ-08`) và nội dung đang rà soát khoa học (`BR-T005`).

### 4.3 Khung giao diện chơi thử tương lai (`BR-T006` — [BLOCKED] bởi `BR-T005`)
- Hỗ trợ đủ trạng thái `ready | in_progress | completed | locked | unavailable`.
- Layout tập trung `max-width: 760px`: `GameInstructionPanel` (không ép đồng hồ mặc định) → `ProgressIndicator` + nút thoát có `ModalDialog` xác nhận → `EducationalContentCard` (nhãn chữ + màu phân biệt Fact/Act) → nút chọn `min-height: 48px` dùng tốt bằng bàn phím/chạm + nút phụ `"Chọn phương án phản tư thay thế"` → `FeedbackPanel` (`aria-live="polite"`) + `SourceCitation` → `CompletionView` → `EmptyUnavailableState` cho lỗi/khóa (tuyệt đối không gửi payload trả phí tới browser).

---

## 5. Hệ thống Thiết kế Toàn cục (Global Design System — [PROPOSED])

### 5.1 Nền tảng (Foundations — Kế thừa `src/styles/tokens.css`)
- **Màu sắc:** Giữ nguyên `--color-peach: #E79A7C`, `--color-sage: #A6C6B6`, `--color-ivory: #F8F3E9`, `--color-ink: #263B31`, `--color-headline: #63894C`, `--color-headline-on-hero: #53743E`, `--color-forest: #2D563F`, `--color-forest-deep: #244A35`, `--color-ink-secondary: #3F5542`, `--color-ink-muted: #465D49`, `--color-paper: #FFFFFF`, `--color-danger: #A82A35`, `--color-focus-ring: #174E42`. Bổ sung bề mặt `--surface-elevated: rgba(255, 252, 245, 0.94)` và `--surface-pavilion: #EDF3E8`.
- **Typography (`Be Vietnam Pro`):** Display Hero `clamp(54px, 7vw, 120px)` (`900`), Page H1 `clamp(32px, 4.2vw, 56px)` (`800`), Section H2 `clamp(27px, 3.2vw, 44px)` (`800`), H3 `clamp(20px, 2vw, 26px)` (`800`), Body `16px` (`line-height: 1.75`, `max-width: 65ch`), Overline `12px` (`800`, `0.12em–0.15em`).
- **Spacing, Radii & Buttons:** Thang 4px (`4/8/12/16/24/32/48/64/88`); bo góc theo vai trò (CTA chính `999px`, showcase `28px`, thẻ nội dung `20px`, nhãn trạng thái `10px`, dialog/input `12–16px`); phân cấp 1 nút `Primary` (`#E79A7C` / `#263B31`) trên mỗi màn hình chính, `Secondary` viền rừng, `Tertiary` link gạch chân.
- **Breakpoints:** `1440px`, `1280px`, `768px`, `720px` (mobile nav), `390px`, `360px`, `320px` + hỗ trợ **zoom 200%** không tràn ngang và không khóa cứng chiều cao khối chữ.

### 5.2 Thư viện 15 thành phần chuẩn
Giữ nguyên đặc tả đầy đủ 15 thành phần: `SiteHeader` (`overlay-hero` & `solid-ivory`), `MobileNavDrawer`, `ActionButton` (`PrimaryCTA`/Secondary), `DestinationLandmark` (tích hợp đồng bộ cả Wave 1A vignette và Wave 1B scenic slot cho cả 4 vùng), `GameProductShowcase`, `ProductStatusLabel`, `Breadcrumbs`, `EducationalContentCard`, `GameInstructionPanel`, `ProgressIndicator`, `FeedbackPanel`, `SourceCitation`, `ModalDialog`, `EmptyUnavailableState`, `SiteFooter`.

> **Điều kiện bắt buộc trước khi triển khai `BR-T004`:** Cấu trúc giải phẫu chi tiết (component anatomy), danh sách trạng thái đầy đủ (`default / hover / focus-visible / active / disabled / loading / empty / error`), kích thước vùng chạm, ngữ nghĩa ARIA và đặc tả responsive cho các thành phần phục vụ `/games` & `/games/*` (`SiteHeader` biến thể `solid-ivory`, `Breadcrumbs`, `GameProductShowcase`, `ProductStatusLabel`, `EmptyUnavailableState`, `RouteScrollAndFocus`, `NotFoundPage`) **phải được xác minh chi tiết trước khi bắt đầu code `BR-T004`**.

### 5.3 Ngân sách hiệu năng hình ảnh theo cấp độ trung thực (Fidelity-Aware Performance Budgets — [PROPOSED])
> **Nguyên tắc hiệu đính:** Không áp đặt trần cứng `70–120 KB` cho mọi ảnh raster gây suy giảm chất lượng minh họa. Thay vào đó, định ngân sách theo **kích thước hiển thị thực, tầm quan trọng thị giác, biến thể desktop/mobile, chất lượng nén, chiến lược lazy-loading và đo hiệu năng thực tế** (`LCP`, `CLS`, thời gian giải mã trên trình duyệt ở GATE F).

| Tầng ưu tiên (Image Tier) | Áp dụng cho | Chiến lược định dạng & chất lượng | Biến thể Desktop / Mobile & Kích thước | Chiến lược tải | Tiêu chí đo thực tế (GATE F) |
|---|---|---|---|---|---|
| **Tier A — Hero & Banner trên màn hình đầu** | Hero `H01` (`EX-001..004`), `/games` Pavilion Banner (`VIS-006`) | WebP chất lượng cao `q82–88`, ưu tiên giữ mượt chuyển sắc & ánh sáng ấm không bị banding | Desktop `1600–1920px` wide; cung cấp biến thể mobile (`<= 828px` wide qua `<picture>`/`srcset`) nếu crop dọc khác nhiều để không tải dư pixel | `loading="eager"`, `fetchPriority="high"` chỉ cho lớp nền chính; khai báo `width`/`height` | Mục tiêu LCP mobile `<= 2,5s` (trên kết nối đo ghi rõ), `CLS <= 0,1`, không vỡ nét trên Retina |
| **Tier B — Sản phẩm gốc & Điểm đến chủ đạo** | `VIS-007` (`fact-act-deck.webp`), `VIS-002` (Green Play), `VIS-008` (Ô ăn quan xanh concept) | WebP `q82–86`, giữ nguyên độ sắc nét chi tiết & alpha sạch (không viền răng cưa) | Xuất kích thước `~1.5x–2x` kích thước hiển thị (VD `960–1200px` cho khung hiển thị `500–620px`), kèm `sizes`/`srcset` khi mobile nhỏ hơn > 1.8 lần | `loading="lazy"`, `decoding="async"`, `width`/`height` tường minh | Giải mã mượt không giật cuộn, 0 vỡ hình ở 1440px và 390px |
| **Tier C — Cảnh điểm đến bổ sung & Cutout tiền cảnh** | `VIS-003B..005B` (Wave 1B), cutout lá chuyển tiếp `VIS-009` (nếu dùng raster alpha) | WebP `q80–85`, nén vừa phải đủ bảo toàn nét vẽ tay mềm của Living Garden | Kích thước khớp khung hiển thị (`~800–1000px` cho 16:10, cutout khớp chiều cao thực) | `loading="lazy"`, `decoding="async"` | Kiểm tra tổng dung lượng trang thực tế ở Network panel & Lighthouse/Playwright |
| **Tier D — Minh họa Vector & Họa tiết tái sử dụng** | `VIS-001` (đường mòn/nền nhẹ), `VIS-003A..005A` (Wave 1A botanical vignettes), `VIS-009` (SVG), `VIS-010` (chuỗi 5 bước) | SVG tối ưu đường path (SVGO), sắc nét tuyệt đối ở zoom 200% | Responsive vector, không cần nhiều phiên bản độ phân giải | Inline hoặc `<img loading="lazy">` | Không gây nặng DOM (> 150 node/SVG cần tách gọn) |

---

## 6. Hệ thống Chuyển động & Quyết định Tiếp cận (Motion & WCAG 2.2.2)

- **Hero `H01` [APPROVED — `BR-T020`]:** Giữ nguyên chuyển động nền lặp lệch pha, tạm dừng khi ẩn tab (`document.hidden`), tắt hoàn toàn ở `prefers-reduced-motion: reduce`, và giữ nguyên ghi nhận giới hạn **WCAG 2.2.2** tại `docs/ACCESSIBILITY.md`. Không tuyên bố đạt trọn vẹn WCAG 2.2 AA.
- **Mọi phân khu mới (`H02`–`H06`, `/games`, `/games/*`, `BR-T006`) [PROPOSED]:**
  - **Không** chạy animation trang trí lặp vô hạn quá 5 giây → tự đáp ứng WCAG 2.2.2 mà không mở rộng ngoại lệ của Hero ra toàn site.
  - Ưu tiên chuyển động phản hồi tương tác (hover/focus nhấc nhẹ vật thể độc lập `<= 4px`, mở/lật thẻ ở M3) và xuất hiện **1 lần duy nhất** bằng `IntersectionObserver` (`<= 650ms`).
  - Không có hành vi chỉ dùng được bằng hover; mọi chuyển động tắt sạch khi `prefers-reduced-motion: reduce`.

---

## 7. Lộ trình triển khai tái cân bằng — Ưu tiên MVP Giáo dục R0 (Rebalanced Roadmap)

> **Nguyên tắc hiệu đính:** Không bắt buộc hoàn tất toàn bộ tranh minh họa trang chủ (`Wave 1B`) mới được triển khai `BR-T004` (Thư viện trò chơi) và `BR-T006` (Bản chơi thử). **Luồng nội dung `BR-T005` chạy song song, độc lập ngay từ bây giờ.**

| Giai đoạn / Luồng | Phạm vi chính | Phụ thuộc | Tài sản cần | Phụ trách | Cổng duyệt |
|---|---|---|---|---|---|
| **Track Nội dung (Song song) — `BR-T005`** | Đội nội dung chốt `OQ-01` (chọn Fact–Act làm game thử R0) & duyệt >=5 mục câu hỏi/thẻ + nguồn khoa học | Độc lập với UI — **chạy ngay song song** | Không chờ tài sản UI | Team Content Reviewer + Owner | Duyệt nội dung R0 |
| **M0 — `BR-T021` (`DONE` — 2026-11-20)** | Master Blueprint, Storyboard H01–H06, Visual Asset Register & Persistent Checklist (commit `0a735d189885`) | `BR-T003` + `BR-T020` (`DONE`, PR #2) | Kiểm kê `EX-001..009` | AI Studio → Owner (`APPROVED`) | **GATE A, B, C (`APPROVED`)** |
| **M1A — `BR-T022`: Wave 1A Minimum Coherent Assets** | Sản xuất & kiểm duyệt bộ tài sản tối thiểu đồng bộ cả 4 vùng + mở khóa `/games`: `VIS-007` (sẵn), `VIS-006`, `VIS-008`, `VIS-002`, `VIS-003A/004A/005A`, `VIS-001` & `VIS-009` | GATE A, B, C APPROVED | Wave 1A | Design / Approved Asset Workflow → Owner + Codex | **GATE D1 (Mỹ thuật) & GATE D2 (Kỹ thuật)** |
| **M2 — `BR-T004` Functional Game Library *(Ưu tiên R0)*** | Xác minh chi tiết anatomy/states thành phần trước code; cài & xác minh React Router, trang `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, fallback 404, khôi phục scroll/focus, trạng thái trung thực | `BR-T022` (GATE D1 + D2 cho `VIS-006/008/009`) + **Xác minh anatomy/states thành phần** | `VIS-006`, `VIS-007`, `VIS-008`, `VIS-009` | AI Studio (UI) → Codex (QA & review) | **Pre-BR-T004 Anatomy Check, GATE E, F, G** |
| **M3 — `BR-T006` Playable Educational Loop *(Ưu tiên R0)*** | Dựng 1 vòng lặp chơi thử Fact–Act hoàn chỉnh cho khách không cần login + phản hồi có nguồn + phản tư + guest E2E | `BR-T004` DONE + `BR-T005` DONE | Dùng hệ UI thẻ + `VIS-007` (không chặn bởi Wave 1B) | Codex + AI Studio | **GATE E, F, G** |
| **M1B — Homepage Visual Upgrade & Wave 1B Polish** | Triển khai chuyển cảnh 3 trạng thái `H01→H02→H03`, 4 điểm đến minh họa (gắn ngay Wave 1A và nâng lên tranh cảnh đầy đủ `VIS-003B/004B/005B` khi sẵn sàng), `H04` Featured Green Play dẫn vào `/games`, `H05` Story (`VIS-010`), `H06` Footer | Wave 1A (GATE D1+D2) / Wave 1B (GATE D1+D2) | `VIS-001`, `VIS-002`, `VIS-003A..005A` → `VIS-003B..005B`, `VIS-009`, `VIS-010` | AI Studio (UI) → Codex (QA & review) | **GATE D1 & D2 (1B), E, F, G** |
| **M4 — R0 Quality Gate (`BR-T007`, `BR-T008`, `BR-T009`)** | Trang `/about`, kiểm toán hiệu năng thực tế (LCP/CLS), A11y, E2E khách công khai, hồ sơ sơ tuyển | M2, M3, M1B hoàn tất + xác nhận thông tin liên hệ | Rà soát `BR-T002` trước phát hành công khai | Codex + Team + Owner | **GATE G** |

---

## 8. Phản biện thiết kế & Cổng phê duyệt (Design Critique & Gates)

### 8.1 6 Rủi ro trọng yếu & Biện pháp kiểm soát
1. **Lệch chất lượng giữa 4 vùng Hệ sinh thái nếu triển khai nửa vời** → *Kiểm soát:* Bắt buộc triển khai đồng bộ bộ minh họa Wave 1A cho cả 4 vùng (`VIS-002` + `VIS-003A/004A/005A`, loại bỏ hoàn toàn thẻ Unicode phẳng) rồi nâng cấp trơn tru lên Wave 1B (`VIS-003B/004B/005B`) trên cùng slot DOM.
2. **Đường ghép H01→H02 bị giả hoặc lộ viền cắt nếu chỉ đặt 1 SVG sóng** → *Kiểm soát:* Thiết kế chuyển cảnh 3 trạng thái kết hợp dải khí quyển chuyển màu + đá bước chân thẳng trục 50% + cutout lá tiền cảnh phủ mép dưới H01.
3. **Nhầm lẫn ảnh nền phẳng với cảnh có thể animate từng phần** → *Kiểm soát:* Phân loại rõ 6 nhóm kiến trúc tài sản trong `VISUAL_ASSET_REGISTER.md`; chỉ animate độc lập các đối tượng có cutout/vector riêng.
4. **Nghẽn MVP giáo dục R0 do chờ đủ tranh trang trí trang chủ** → *Kiểm soát:* Tái cân bằng lộ trình ưu tiên `Wave 1A (BR-T022) → BR-T004 → BR-T006` (chạy song song `BR-T005`), đưa Wave 1B sang `M1B` không chặn luồng chơi thử.
5. **Lỗi điều hướng SPA khi tải lại trang con (`/games/fact-act`) hoặc mất focus bàn phím** → *Kiểm soát:* Chuẩn hóa React Router + `RouteScrollAndFocus` + cấu hình rewrite fallback hosting + xác minh anatomy/states thành phần trước code + test hard reload ở `BR-T004`.
6. **Bản quyền thương mại `BR-T002` chưa chốt** → *Kiểm soát:* Chỉ sử dụng tài sản gốc Brainie/Rootie/Fact–Act cho phát triển nội bộ/prototype; không đưa tài sản gốc lên dịch vụ sinh ảnh bên thứ ba.

### 8.2 Cổng phê duyệt
- **GATE A** (Information Architecture) · **GATE B** (UX/UI Storyboard Rev 1.1) · **GATE C** (Visual Asset Register Rev 1.1) → **`APPROVED` ngày 2026-11-20** (theo commit `0a735d189885`; chỉ áp dụng cho đặc tả thiết kế, không thay thế duyệt artwork hoàn chỉnh).
- **GATE D1 — Artistic Quality Approval (Phê duyệt Chất lượng Mỹ thuật):** Product Owner / Art Direction xác nhận phong cách đồng bộ Hero V4, ánh sáng 35° trái-trên, màu thương hiệu, không chữ/UI nướng trong tranh, không tự vẽ lại Brainie/Rootie, không vi phạm `BR-T002`, đạt vùng an toàn chữ.
- **GATE D2 — Technical Integration Readiness (Sẵn sàng Tích hợp Kỹ thuật):** Xác minh độc lập định dạng WebP/SVG, kênh alpha sạch (nếu là cutout), đúng kích thước/tỉ lệ khung & biến thể desktop/mobile theo Tier A–D, đường dẫn file & manifest hợp lệ, không vỡ nét/nhiễu nén và giải mã tốt trên trình duyệt. **Chỉ khi đạt cả GATE D1 và GATE D2, tài sản mới được phép chuyển sang tích hợp.**
- **Pre-`BR-T004` Component Anatomy & States Verification:** Xác minh đầy đủ cấu trúc giải phẫu và ma trận trạng thái thành phần trước khi mở code `BR-T004`.
- **GATE E** (Triển khai UI) → **GATE F** (Codex QA & đo hiệu năng/A11y thực tế) → **GATE G** (Nghiệm thu milestone).
