# BRAINROOT 2.0 — PERSISTENT UX/UI CHECKLIST & QUALITY CONTROL (Rev 1.1)

**Cập nhật gần nhất:** 2026-11-20 (`BR-T021` Rev 1.1 sau Design Review)  
**Trạng thái quy chuẩn:** `NOT_STARTED` | `DESIGNING` | `AWAITING_ASSETS` | `READY_FOR_BUILD` | `IN_PROGRESS` | `IN_REVIEW` | `PASS` | `BLOCKED`

## Quy tắc nghiệm thu bắt buộc (8 Chiều đánh giá độc lập)
Một hạng mục **KHÔNG BAO GIỜ được đánh `PASS`** chỉ vì mã nguồn React đã tồn tại hoặc một agent tự tuyên bố xong. Trạng thái tổng thể chỉ chuyển `PASS` khi **toàn bộ các chiều áp dụng** dưới đây đều đạt kèm bằng chứng kiểm chứng:
1. **`UX`** — Hoàn chỉnh luồng, trạng thái trung thực, không link chết, không tường đăng nhập cho khách.
2. **`UI`** — Thẩm mỹ nhất quán Hero V4, thứ bậc chữ, màu thương hiệu, không thẻ phẳng lệch tông.
3. **`Asset Avail`** — Tài sản cần thiết đã có mặt, qua GATE D và ghi rõ trạng thái bản quyền (`BR-T002`).
4. **`Asset Integ`** — Tài sản thật đã gắn vào UI và giải mã hợp lệ (`naturalWidth > 0`, 0 placeholder tạm).
5. **`Interact`** — Hoạt động tương tác thực tế (click, routing, back/forward, Escape, focus, trạng thái lỗi).
6. **`A11y`** — Bàn phím, landmarks, tương phản chữ AA, `prefers-reduced-motion`, ghi nhận rõ giới hạn đã biết.
7. **`Resp`** — Kiểm chứng đa màn hình `1440 / 1280 / 768 / 390 / 360 / 320` + **zoom 200%** (0 tràn ngang).
8. **`Browser QA`** — Bằng chứng chạy thật trên trình duyệt (Playwright/console 0 lỗi/ảnh chụp/Codex QA log + đo LCP/CLS khi áp dụng).

*(Ký hiệu viết tắt trong ma trận 8 chiều: `P` = PASS · `R` = IN_REVIEW · `W` = IN_PROGRESS/DESIGNING · `A` = AWAITING_ASSETS · `N` = NOT_STARTED · `B` = BLOCKED · `—` = Không áp dụng.)*

---

## 1. Ma trận Kiểm soát UX/UI 8 Chiều (Master Checklist)

| ID | Danh mục | Yêu cầu | Ưu tiên | Owner | Tổng thể | UX | UI | Asset Avail | Asset Integ | Interact | A11y | Resp | Browser QA | Phụ thuộc | Bằng chứng & Giới hạn đã biết | Ngày rà soát | Hành động tiếp theo |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `UX-001` | Hero (H01) | Hero V4 React/TS, 3 lớp parallax, 1 CTA chính, Brainie/Rootie gốc, Be Vietnam Pro | P0 | Codex / AI Studio | `PASS` | P | P | P*(nội bộ)* | P | P | P*(xem hạn chế)* | P | P | `BR-T003` | `logs/CODEX_LOG.md` (1440/390/320, zoom 200%, 40 mẫu tương phản, 0 lỗi console, axe 0 vi phạm tự động). *Hạn chế:* `BR-T002` bản quyền thương mại chưa đóng; screen reader thật & thiết bị thật `NOT RUN`. | 2026-11-20 | Bảo toàn, không hồi quy |
| `UX-002` | Motion (H01) | Chuyển động nền Hero lặp lệch pha, tạm dừng khi ẩn tab, tắt khi reduced motion | P1 | Codex | `PASS` | P | P | P | P | P | P*(WCAG 2.2.2 limit)* | P | P | `BR-T020` | `logs/CODEX_LOG.md` (30s/180s, `visibilitychange`, reduced-motion PASS). *Hạn chế đã ghi:* giới hạn WCAG 2.2.2 tại `docs/ACCESSIBILITY.md`; không tuyên bố đạt trọn WCAG 2.2 AA. | 2026-11-20 | Đồng bộ trạng thái merge `BR-T020` khi sync GitHub |
| `UX-003` | Blueprint (M0) | IA, React Router spec, 6 hành trình, Storyboard H01–H06 (chuyển cảnh 3 trạng thái), Design System & Roadmap tái cân bằng | P0 | AI Studio | `IN_REVIEW` | R | R | — | — | — | R | R | — | `BR-T021` | `docs/UX_UI_MASTER_BLUEPRINT.md` (Rev 1.1), `docs/UX_UI_STORYBOARD.md` (Rev 1.1). *Hạn chế:* Chờ sync GitHub & Owner/Reviewer kiểm tra Markdown. | 2026-11-20 | Sync GitHub → Duyệt **GATE A & GATE B** |
| `UX-004` | Asset Spec (M0) | Sổ đăng ký `EX-001..009` & `VIS-001..010`, phân loại 6 nhóm animation-ready, Wave 1A/1B & Briefs | P0 | AI Studio | `IN_REVIEW` | — | R | R | — | — | — | R | — | `BR-T021` | `planning/VISUAL_ASSET_REGISTER.md` (Rev 1.1). *Hạn chế:* Chưa sinh ảnh; chờ duyệt GATE C. | 2026-11-20 | Sync GitHub → Duyệt **GATE C** & Wave 1A |
| `UX-005` | Licensing | Xác minh bản quyền thương mại cho Brainie, Rootie, Fact–Act deck & thành phần Canva gốc | P0 | Product Owner | `BLOCKED` | — | — | B | — | — | — | — | — | `BR-T002`, `OQ-02` | `docs/ASSET_AUDIT.md` (mới cấp phép phát triển nội bộ/prototype). | 2026-11-20 | Đội ngũ xác minh quyền xuất bản trước khi public release |
| `UX-006` | Routing (`BR-T004`) | Cài & xác minh React Router (`/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*`), Back/Forward, Scroll & Focus restoration, SPA hosting fallback | P0 | AI Studio / Codex | `NOT_STARTED` | R | — | — | — | N | N | N | N | GATE A + duyệt cài `react-router-dom` | Đặc tả tại `UX_UI_MASTER_BLUEPRINT.md` mục 2.3. Chưa cài dependency. | 2026-11-20 | Triển khai đầu tiên khi mở `BR-T004` (M2) |
| `UX-007` | Game Library (`/games`) | Trang Green Play Pavilion với `VIS-006`, 2 showcase bất đối xứng (`VIS-007`, `VIS-008`), trạng thái trung thực & lối về `/` | P0 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | GATE A/C/D + `UX-006` + `VIS-006/007/008/009` | `VIS-007` có sẵn (92 KB); đang chờ `VIS-006`, `VIS-008`, `VIS-009`. | 2026-11-20 | Sản xuất Wave 1A (GATE D) → xây `BR-T004` |
| `UX-008` | Detail Fact–Act | Trang `/games/fact-act` giữ `fact-act-deck.webp`, cơ chế Fact→Act, minh bạch Phygital, không lộ bài trả phí | P0 | AI Studio | `NOT_STARTED` | R | R | P*(nội bộ)* | N | N | N | N | N | `UX-006`, `UX-007` | Đặc tả mục 4.2 Blueprint; `fact-act-deck.webp` đã có sẵn. | 2026-11-20 | Triển khai trong `BR-T004` (M2) |
| `UX-009` | Detail Ô ăn quan xanh | Trang `/games/o-an-quan-xanh` nêu 5 chủ đề, 3 cấp độ, nhãn minh họa khái niệm `VIS-008`, không bịa luật số | P0 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | `UX-006`, `VIS-008`, `OQ-08` | Đặc tả mục 4.3 Blueprint; chờ `VIS-008`. | 2026-11-20 | Duyệt `VIS-008` → triển khai trong `BR-T004` |
| `UX-010` | Trial Content (`BR-T005`) | Duyệt >=5 mục Fact–Act (hoặc câu hỏi mẫu) kèm nguồn khoa học & phương án tiếp cận thay thế | P0 | Team Content Reviewer | `BLOCKED` | — | — | B | — | — | — | — | — | `BR-T005`, `OQ-01`, `OQ-03` | Chưa có file dữ liệu đã duyệt trong repo. **Chạy song song độc lập với UI.** | 2026-11-20 | Đội nội dung duyệt >=5 mục mẫu song song với M1A/M2 |
| `UX-011` | Playable Trial (`BR-T006`) | 1 vòng chơi thử Fact–Act không cần login: hướng dẫn → chơi → phản hồi+nguồn → phản tư → kết quả + guest E2E | P0 | Codex / AI Studio | `BLOCKED` | R | R | B | N | N | N | N | N | `BR-T004`, `BR-T005` (`UX-010`) | Đặc tả mục 4.4 Blueprint; chưa mở code engine. | 2026-11-20 | Khởi động ở M3 ngay khi `BR-T004` & `BR-T005` DONE |
| `UX-012` | Transition (`H01→H02→H03`) | Chuyển cảnh 3 trạng thái bảo toàn phối cảnh, lối đá trục 50%, ánh sáng, chuyển sắc & cutout lá phủ mép `VIS-009` | P1 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | GATE B/C/D + `VIS-009` | Đặc tả 3 trạng thái tại `UX_UI_STORYBOARD.md`. Hiện có hard cut ở `landing.css`. | 2026-11-20 | Sản xuất `VIS-009` trong Wave 1A → dựng ở M1B |
| `UX-013` | Four Worlds (`H03`) | Nâng cấp 4 vùng sang hệ minh họa đồng bộ (Wave 1A: `VIS-002` + `VIS-003A..005A`, 0 icon Unicode phẳng; Wave 1B: `VIS-003B..005B`) | P1 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | GATE B/C/D + `VIS-001`, `VIS-002`, `VIS-003A..005A` | Hiện có 4 thẻ phẳng dùng ký tự Unicode (đạt chức năng nền BR-T003 nhưng chưa đạt đồng bộ minh họa). | 2026-11-20 | Dựng Wave 1A đồng bộ trong M1B, sau đó nâng Wave 1B |
| `UX-014` | Featured Play (`H04`) | Góc giới thiệu `Fact–Act` (`VIS-007`) & `Ô ăn quan xanh` (`VIS-008`) với 1 CTA duy nhất dẫn vào `/games` | P1 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | GATE B/C/D + `VIS-008` + `UX-006` | `VIS-007` đã có sẵn; chờ `VIS-008` & route `/games`. | 2026-11-20 | Triển khai trong M1B/M2 |
| `UX-015` | Story & Footer (`H05`, `H06`) | Kể chuyện 5 nhịp *Hạt giống → Kết nối* (`VIS-010`) + Footer viền thực vật (`VIS-009`), 0 số liệu bịa | P1 | AI Studio | `AWAITING_ASSETS` | R | R | A | N | N | N | N | N | GATE B/C + `VIS-010`, `VIS-009` | Hiện có `#about` chữ thuần & footer 1 dòng tối giản. | 2026-11-20 | Triển khai trong M1B (không chặn `BR-T004`/`BR-T006`) |
| `UX-016` | About Page (`/about`) | Trang thông tin dự án, nguồn & liên hệ chính thức được nhóm xác nhận | P0 | AI Studio | `NOT_STARTED` | N | N | — | — | N | N | N | N | `BR-T007` + thông tin liên hệ chính thức | Hiện dùng neo `#about` trên `/`. | 2026-11-20 | Triển khai ở M4 (`BR-T007`) |
| `UX-017` | R0 Release QA (`BR-T008`) | `typecheck`, `build`, unit, Playwright 1440/390/320 + zoom 200%, đo LCP/CLS thực tế, axe-core, guest E2E | P0 | Codex | `IN_PROGRESS` | — | — | — | — | W | W | W | W | M2, M3, M1B | Đã PASS cho `BR-T003`/`BR-T020`; `lint`, screen reader thật & thiết bị thật `NOT RUN`. | 2026-11-20 | Chạy GATE F cho từng milestone M2, M3, M1B, M4 |

### Thống kê trung thực từ bảng trên (17 mục hợp lệ)
- `PASS`: **2 / 17** (`UX-001`, `UX-002`)
- `IN_REVIEW`: **2 / 17** (`UX-003`, `UX-004`)
- `IN_PROGRESS`: **1 / 17** (`UX-017`)
- `AWAITING_ASSETS`: **6 / 17** (`UX-007`, `UX-009`, `UX-012`, `UX-013`, `UX-014`, `UX-015`)
- `NOT_STARTED`: **3 / 17** (`UX-006`, `UX-008`, `UX-016`)
- `BLOCKED`: **3 / 17** (`UX-005`, `UX-010`, `UX-011`)

---

## 2. BRAINROOT UX/UI CHECKPOINT (Hiện hành — BR-T021 Rev 1.1)

- **Date:** 2026-11-20
- **Git branch and commit:** Workspace AI Studio không chứa `.git` (`NOT COMMITTED`). Cần đồng bộ 4 file Markdown lên GitHub để Owner & Reviewer đọc trực tiếp trước khi đóng GATE A/B/C. Sai lệch cũ về `BR-T020` (`IN_REVIEW` trong docs vs đã merge `main`) cần được đối chiếu khi sync.
- **Current Task ID:** `BR-T021` (Rev 1.1 — Design Review Refinement)
- **Current milestone:** M0 — Master Design Blueprint (chưa đóng GATE A/B/C)
- **Completed and verified:** `UX-001` (`BR-T003`), `UX-002` (`BR-T020`).
- **Implemented but not verified:** Không có thay đổi mã nguồn ứng dụng; 4 tài liệu thiết kế đã được cập nhật Rev 1.1.
- **Missing assets:** Wave 1A cần 3 tranh raster mới (`VIS-006`, `VIS-008`, `VIS-002`) + 3 bộ minh họa/trang trí đồng bộ nội bộ (`VIS-003A..005A`, `VIS-009` cutouts/SVG, `VIS-001`); Wave 1B cần `VIS-003B..005B` & `VIS-010`. `VIS-007` (`fact-act-deck.webp`) đã sẵn có.
- **UX/UI inconsistencies:** Hiện vẫn còn hard cut H01→`#worlds` và 4 thẻ Ecosystem Unicode phẳng (sẽ xử lý đồng bộ bằng Wave 1A trong M1B, không giữ thẻ phẳng cho 3 vùng còn lại).
- **Functional blockers:** `BR-T002` (bản quyền thương mại), `BR-T005`/`OQ-01` (nội dung mẫu duyệt chạy song song), `OQ-08` (luật số hóa Ô ăn quan xanh), chưa cài `react-router-dom` & `lint`.
- **Accessibility/performance issues:** Hero V4 có giới hạn WCAG 2.2.2 đã ghi nhận; các phân khu mới không mở rộng ngoại lệ này; hiệu năng ảnh sẽ đo thực tế (LCP/CLS) ở GATE F theo phân tầng Tier A–D.
- **Documents requiring updates:** 4 tài liệu lõi đã cập nhật Rev 1.1; `TASKS.md`, `PROJECT_STATE.md`, `AI_STUDIO_LOG.md`, `WORK_LOG.md`, `HANDOFF.md` cập nhật kèm.
- **Top three priorities:**
  1. Đồng bộ 4 file Markdown của `BR-T021` lên GitHub để Owner + Reviewer rà soát và đóng **GATE A, B, C**.
  2. Khởi chạy song song `BR-T005` (duyệt >=5 mục nội dung Fact–Act) cùng đội nội dung.
  3. Sau khi đóng GATE A/B/C → thực hiện **Wave 1A Asset Production (GATE D)** để mở khóa ngay **`BR-T004` (Game Library)**.
- **Recommended next task:** **Wave 1A Asset Production & Verification (GATE D)** ngay sau khi GATE A/B/C được đóng chính thức trên GitHub, nhằm ưu tiên mở khóa trực tiếp **`BR-T004` (Game Library)** và nối sang **`BR-T006` (Playable Loop)**.
- **Approval required:** **CÓ** — Kiểm tra Markdown sau sync GitHub để đóng GATE A, GATE B, GATE C (bao gồm phê duyệt React Router cho `BR-T004`).
