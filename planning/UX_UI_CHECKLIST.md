# BRAINROOT 2.0 — PERSISTENT UX/UI CHECKLIST & QUALITY CONTROL (Rev 1.1)

**Cập nhật gần nhất:** 2026-11-20 (`BR-T004` `IN_REVIEW` — hoàn tất triển khai cục bộ Green Play UI/UX + React Router + Playwright 1440/1280/390/320 & zoom 200%, chờ Codex QA/PR & chốt D1/BR-T002)  
**Trạng thái quy chuẩn:** `NOT_STARTED` | `DESIGNING` | `AWAITING_ASSETS` | `READY_FOR_BUILD` | `IN_PROGRESS` | `IN_REVIEW` | `PASS` | `BLOCKED`

### Kết quả kiểm chứng BR-T004 — 20/11/2026

- `UX-006`, `UX-007`, `UX-008`, `UX-009` chuyển sang `IN_REVIEW`: đã cài `react-router-dom`, dựng `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*`, bảo toàn `/` (Hero V4) và `/?preview=oanquan3d`. Kiểm thử Playwright Chromium (1440/1280/390/320 + zoom 200% + reduced motion + hard reload + Back/Forward + Escape) và 17/17 unit test đều PASS (0 lỗi console).
- Giới hạn còn mở: chưa đánh `PASS` cuối cùng vì cần Codex review độc lập + axe-core trên nhánh Git, chưa có SPA hosting deploy thực tế, `VIS-006`/`VIS-008` vẫn chờ xác nhận D1 cuối & bản quyền thương mại (`BR-T002`), và `npm run typecheck` còn 1 lỗi `TS6133` có sẵn ở `src/features/oanquan/prototypeOnlyModel.ts:24` (thuộc sandbox PR #5, không ghi đè).

## Quy tắc nghiệm thu bắt buộc (8 Chiều đánh giá độc lập)
Một hạng mục **KHÔNG BAO GIỜ được đánh `PASS`** chỉ vì mã nguồn React đã tồn tại hoặc một agent tự tuyên bố xong. Trạng thái tổng thể chỉ chuyển `PASS` khi **toàn bộ các chiều áp dụng** dưới đây đều đạt kèm bằng chứng kiểm chứng:
1. **`UX`** — Hoàn chỉnh luồng, trạng thái trung thực, không link chết, không tường đăng nhập cho khách.
2. **`UI`** — Thẩm mỹ nhất quán Hero V4, thứ bậc chữ, màu thương hiệu, không thẻ phẳng lệch tông.
3. **`Asset Avail`** — Tài sản cần thiết đã có mặt, vượt qua **cả 2 cổng phê duyệt tài sản tách biệt** (**GATE D1: Chất lượng Mỹ thuật** & **GATE D2: Sẵn sàng Tích hợp Kỹ thuật**) và ghi rõ trạng thái bản quyền (`BR-T002`).
4. **`Asset Integ`** — Tài sản thật đã gắn vào UI và giải mã hợp lệ (`naturalWidth > 0`, 0 placeholder tạm).
5. **`Interact`** — Hoạt động tương tác thực tế (click, routing, back/forward, Escape, focus, trạng thái lỗi).
6. **`A11y`** — Bàn phím, landmarks, tương phản chữ AA, `prefers-reduced-motion`, ghi nhận rõ giới hạn đã biết.
7. **`Resp`** — Kiểm chứng đa màn hình `1440 / 1280 / 768 / 390 / 360 / 320` + **zoom 200%** (0 tràn ngang).
8. **`Browser QA`** — Bằng chứng chạy thật trên trình duyệt (Playwright/console 0 lỗi/ảnh chụp/Codex QA log + đo LCP/CLS khi áp dụng).

> **Điều kiện cổng bổ sung:**
> - **2 cổng duyệt tài sản tách biệt:** `GATE D1` (Artistic Quality Approval) & `GATE D2` (Technical Integration Readiness) — bắt buộc hoàn tất trước khi tích hợp bất kỳ tài sản mới nào (`BR-T022`).
> - **Điều kiện trước `BR-T004`:** Cấu trúc giải phẫu & trạng thái chi tiết của các thành phần (component anatomy/states) phải được xác minh đầy đủ trước khi triển khai mã nguồn `BR-T004`.

*(Ký hiệu viết tắt trong ma trận 8 chiều: `P` = PASS · `R` = IN_REVIEW · `W` = IN_PROGRESS/DESIGNING · `A` = AWAITING_ASSETS · `N` = NOT_STARTED · `B` = BLOCKED · `—` = Không áp dụng.)*

---

## 1. Ma trận Kiểm soát UX/UI 8 Chiều (Master Checklist)

| ID | Danh mục | Yêu cầu | Ưu tiên | Owner | Tổng thể | UX | UI | Asset Avail | Asset Integ | Interact | A11y | Resp | Browser QA | Phụ thuộc | Bằng chứng & Giới hạn đã biết | Ngày rà soát | Hành động tiếp theo |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `UX-001` | Hero (H01) | Hero V4 React/TS, 3 lớp parallax, 1 CTA chính, Brainie/Rootie gốc, Be Vietnam Pro | P0 | Codex / AI Studio | `PASS` | P | P | P*(nội bộ)* | P | P | P*(xem hạn chế)* | P | P | `BR-T003` | `logs/CODEX_LOG.md` (1440/390/320, zoom 200%, 40 mẫu tương phản, 0 lỗi console, axe 0 vi phạm tự động). *Hạn chế:* `BR-T002` bản quyền thương mại chưa đóng; screen reader thật & thiết bị thật `NOT RUN`. | 2026-11-20 | Bảo toàn, không hồi quy |
| `UX-002` | Motion (H01) | Chuyển động nền Hero lặp lệch pha, tạm dừng khi ẩn tab, tắt khi reduced motion | P1 | Codex | `PASS` | P | P | P | P | P | P*(WCAG 2.2.2 limit)* | P | P | `BR-T020` | `DONE` (PR #2 đã merge vào `main` theo xác nhận Product Owner; kiểm thử 30s/180s, `visibilitychange`, reduced-motion PASS tại `logs/CODEX_LOG.md`). *Hạn chế đã ghi:* giới hạn WCAG 2.2.2 tại `docs/ACCESSIBILITY.md`; không tuyên bố đạt trọn WCAG 2.2 AA. | 2026-11-20 | Bảo toàn, không hồi quy |
| `UX-003` | Blueprint (M0) | IA, React Router spec, 6 hành trình, Storyboard H01–H06 (chuyển cảnh 3 trạng thái), Design System & Roadmap tái cân bằng | P0 | AI Studio | `PASS` | P | P | — | — | — | P | P | — | `BR-T021` | Product Owner duyệt **GATE A** (IA) & **GATE B** (Storyboard Rev 1.1) ngày `2026-11-20` theo commit `0a735d189885` (`docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`). *Giới hạn:* Chỉ phê duyệt đặc tả thiết kế, chưa duyệt artwork hay mã triển khai; anatomy/states chi tiết phải xác minh trước `BR-T004`. | 2026-11-20 | Chuyển sang `BR-T022` (Wave 1A) |
| `UX-004` | Asset Spec (M0) | Sổ đăng ký `EX-001..009` & `VIS-001..010`, phân loại 6 nhóm animation-ready, Wave 1A/1B, Briefs & 2 cổng GATE D1/D2 | P0 | AI Studio | `PASS` | — | P | P*(spec)* | — | — | — | P | — | `BR-T021` | Product Owner duyệt **GATE C** (Visual Asset Register Rev 1.1) ngày `2026-11-20` theo commit `0a735d189885` (`planning/VISUAL_ASSET_REGISTER.md`). *Giới hạn:* Phê duyệt đặc tả & brief, **không** thay thế duyệt artwork cuối cùng (`GATE D1` & `GATE D2`). | 2026-11-20 | Khởi động `BR-T022` (Wave 1A) |
| `UX-005` | Licensing | Xác minh bản quyền thương mại cho Brainie, Rootie, Fact–Act deck & thành phần Canva gốc | P0 | Product Owner | `BLOCKED` | — | — | B | — | — | — | — | — | `BR-T002`, `OQ-02` | `docs/ASSET_AUDIT.md` (mới cấp phép phát triển nội bộ/prototype). | 2026-11-20 | Đội ngũ xác minh quyền xuất bản trước khi public release |
| `UX-006` | Routing (`BR-T004`) | Cài & xác minh React Router (`/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*`), Back/Forward, Scroll & Focus restoration, SPA hosting fallback | P0 | AI Studio / Codex | `IN_REVIEW` | P | P | — | — | P | P | P | R | `BR-T004` + Codex QA + SPA hosting config khi deploy | Đã cài `react-router-dom` & dựng `RouteScrollAndFocus` (`scrollTo instant` + focus `#main-content` khi PUSH, giữ `POP`, focus `#hash` xuyên route, cập nhật `document.title`). Unit 7/7 + Playwright hard reload/Back-Forward PASS (`logs/AI_STUDIO_LOG.md`). *Hạn chế:* Chưa có SPA hosting rewrite thực tế trên môi trường deploy; chờ Codex review. | 2026-11-20 | Codex review diff & chạy QA độc lập |
| `UX-007` | Game Library (`/games`) | Trang Green Play Pavilion với `VIS-006`, 2 showcase bất đối xứng (`VIS-007`, `VIS-008`), trạng thái trung thực & lối về `/` | P0 | AI Studio | `IN_REVIEW` | P | P | R*(D2 PASS; D1/BR-T002 mở)* | P | P | P | P | R | `BR-T022` (D1 cuối) + `BR-T002` + Codex QA | Đã dựng `GameLibraryPage` tích hợp `GreenPlayPavilionBanner` (`VIS-006`), 2 `GameProductShowcase` bất đối xứng (`fact-act-deck.webp` & `VIS-008`), dải Phygital minh bạch và lối về `/`. Playwright 1440/1280/390/320 + zoom 200% PASS (0 tràn ngang, 0 lỗi console, touch >=44px). *Hạn chế:* Chờ D1 cuối, quyền thương mại `BR-T002` & Codex QA. | 2026-11-20 | Codex review + Owner chốt D1 `VIS-006`/`VIS-008` |
| `UX-008` | Detail Fact–Act | Trang `/games/fact-act` giữ `fact-act-deck.webp`, cơ chế Fact→Act, minh bạch Phygital, không lộ bài trả phí | P0 | AI Studio | `IN_REVIEW` | P | P | P*(nội bộ)* | P | P | P | P | R | `BR-T002` (thương mại) + Codex QA | Đã dựng `FactActDetailPage`: ảnh bộ thẻ gốc, vòng lặp 3 bước `Fact → Act → Phản tư`, so sánh bộ thẻ vật lý vs bản chơi thử tương lai, `EmptyUnavailableState` trung thực (0 nút chơi giả, 0 lộ thẻ trả phí). Playwright 1440/390 PASS. *Hạn chế:* Chờ Codex QA & `BR-T002`. | 2026-11-20 | Codex review; nối chơi thử ở `BR-T006` sau `BR-T005` |
| `UX-009` | Detail Ô ăn quan xanh | Trang `/games/o-an-quan-xanh` nêu 5 chủ đề, 3 cấp độ, nhãn minh họa khái niệm `VIS-008`, không bịa luật số | P0 | AI Studio | `IN_REVIEW` | P | P | R*(D2 PASS; D1/BR-T002 mở)* | P | P | P | P | R | `BR-T022` (D1 `VIS-008`) + `OQ-08` + Codex QA | Đã dựng `OAnQuanXanhDetailPage`: `VIS-008` kèm nhãn nguyên văn *"Minh họa khái niệm — luật bản số đang chuẩn hóa."*, đủ 5 chủ đề & 3 cấp độ theo `GAME_SPEC.md`, tách rõ định hướng vs hiện trạng, liên kết riêng `/?preview=oanquan3d` gắn nhãn sandbox kỹ thuật nội bộ. Playwright 1440/390 PASS. *Hạn chế:* Chờ D1 `VIS-008`, `OQ-08` & Codex QA. | 2026-11-20 | Codex review + chốt D1 `VIS-008` & `OQ-08` |
| `UX-010` | Trial Content (`BR-T005`) | Duyệt >=5 mục Fact–Act (hoặc câu hỏi mẫu) kèm nguồn khoa học & phương án tiếp cận thay thế | P0 | Team Content Reviewer | `BLOCKED` | — | — | B | — | — | — | — | — | `BR-T005`, `OQ-01`, `OQ-03` | Chưa có file dữ liệu đã duyệt trong repo. **Chạy song song độc lập với UI.** | 2026-11-20 | Đội nội dung duyệt >=5 mục mẫu song song với `BR-T022`/M2 |
| `UX-011` | Playable Trial (`BR-T006`) | 1 vòng chơi thử Fact–Act không cần login: hướng dẫn → chơi → phản hồi+nguồn → phản tư → kết quả + guest E2E | P0 | Codex / AI Studio | `BLOCKED` | P*(spec)* | P*(spec)* | B | N | N | N | N | N | `BR-T004`, `BR-T005` (`UX-010`) | Đặc tả mục 4.3 Blueprint; chưa mở code engine. | 2026-11-20 | Khởi động ở M3 ngay khi `BR-T004` & `BR-T005` DONE |
| `UX-012` | Transition (`H01→H02→H03`) | Chuyển cảnh 3 trạng thái bảo toàn phối cảnh, lối đá trục 50%, ánh sáng, chuyển sắc & cutout lá phủ mép `VIS-009` | P1 | AI Studio | `AWAITING_ASSETS` | P*(spec)* | P*(spec)* | A | N | N | N | N | N | `BR-T022` (`VIS-009` GATE D1+D2) | Đặc tả 3 trạng thái tại `UX_UI_STORYBOARD.md` (GATE B approved). Hiện có hard cut ở `landing.css`. | 2026-11-20 | Sản xuất & duyệt `VIS-009` trong `BR-T022` → dựng ở M1B |
| `UX-013` | Four Worlds (`H03`) | Nâng cấp 4 vùng sang hệ minh họa đồng bộ (Wave 1A: `VIS-002` + `VIS-003A..005A`, 0 icon Unicode phẳng; Wave 1B: `VIS-003B..005B`) | P1 | AI Studio | `AWAITING_ASSETS` | P*(spec)* | P*(spec)* | A | N | N | N | N | N | `BR-T022` (`VIS-001`, `VIS-002`, `VIS-003A..005A` GATE D1+D2) | Hiện có 4 thẻ phẳng dùng ký tự Unicode (đạt chức năng nền `BR-T003` nhưng chưa đạt đồng bộ minh họa). | 2026-11-20 | Sản xuất Wave 1A trong `BR-T022` → dựng M1B, sau đó nâng Wave 1B |
| `UX-014` | Featured Play (`H04`) | Góc giới thiệu `Fact–Act` (`VIS-007`) & `Ô ăn quan xanh` (`VIS-008`) với 1 CTA duy nhất dẫn vào `/games` | P1 | AI Studio | `AWAITING_ASSETS` | P*(spec)* | P*(spec)* | A | N | N | N | N | N | `BR-T022` (`VIS-008` GATE D1+D2) + `UX-006` | `VIS-007` đã có sẵn; chờ `VIS-008` & route `/games`. | 2026-11-20 | Triển khai trong M1B/M2 |
| `UX-015` | Story & Footer (`H05`, `H06`) | Kể chuyện 5 nhịp *Hạt giống → Kết nối* (`VIS-010`) + Footer viền thực vật (`VIS-009`), 0 số liệu bịa | P1 | AI Studio | `AWAITING_ASSETS` | P*(spec)* | P*(spec)* | A | N | N | N | N | N | `VIS-010` (Wave 1B), `VIS-009` (`BR-T022`) | Hiện có `#about` chữ thuần & footer 1 dòng tối giản. | 2026-11-20 | Triển khai trong M1B (không chặn `BR-T004`/`BR-T006`) |
| `UX-016` | About Page (`/about`) | Trang thông tin dự án, nguồn & liên hệ chính thức được nhóm xác nhận | P0 | AI Studio | `NOT_STARTED` | N | N | — | — | N | N | N | N | `BR-T007` + thông tin liên hệ chính thức | Hiện dùng neo `#about` trên `/`. | 2026-11-20 | Triển khai ở M4 (`BR-T007`) |
| `UX-017` | R0 Release QA (`BR-T008`) | `typecheck`, `build`, unit, Playwright 1440/390/320 + zoom 200%, đo LCP/CLS thực tế, axe-core, guest E2E | P0 | Codex | `IN_PROGRESS` | — | — | — | — | W | W | W | W | M2, M3, M1B | Đã PASS cho `BR-T003` & `BR-T020` (PR #2); `lint`, screen reader thật & thiết bị thật `NOT RUN`. | 2026-11-20 | Chạy GATE F cho từng milestone M2, M3, M1B, M4 |

### Thống kê trung thực từ bảng trên (17 mục hợp lệ — giữ nguyên đủ 17 mục)
- `PASS`: **4 / 17** (`UX-001`, `UX-002`, `UX-003`, `UX-004` — riêng `UX-003` & `UX-004` là `PASS` ở mức đặc tả thiết kế GATE A/B/C)
- `IN_REVIEW`: **4 / 17** (`UX-006`, `UX-007`, `UX-008`, `UX-009` — đã triển khai và kiểm thử Playwright/unit cục bộ cho `BR-T004`, chờ Codex review độc lập & chốt D1/`BR-T002`)
- `IN_PROGRESS`: **1 / 17** (`UX-017`)
- `AWAITING_ASSETS`: **4 / 17** (`UX-012`, `UX-013`, `UX-014`, `UX-015`)
- `NOT_STARTED`: **1 / 17** (`UX-016`)
- `BLOCKED`: **3 / 17** (`UX-005`, `UX-010`, `UX-011`)

---

## 2. BRAINROOT UX/UI CHECKPOINT (Hiện hành — BR-T004 Green Play UI/UX)

- **Date:** 2026-11-20
- **Git branch and commit:** Workspace Google AI Studio không có `.git` (`NOT COMMITTED`). Mã nguồn xây trên nền sau khi PR #3 và PR #4 đã merge; bảo toàn nguyên vẹn vùng 3D sandbox `src/features/oanquan/` (PR #5).
- **Current Task ID:** `BR-T004` → **`IN_REVIEW`** (Green Play UI/UX + React Router); `BR-T022` & `BR-T023` giữ `IN_PROGRESS`.
- **Current milestone:** M2 (`BR-T004`) hoàn tất triển khai cục bộ và kiểm thử trình duyệt, chờ Codex QA & mở PR.
- **Completed and verified:** `UX-001` (`BR-T003`), `UX-002` (`BR-T020`, PR #2), `UX-003` & `UX-004` (`BR-T021`), và kiểm thử cục bộ AI Studio cho `UX-006..009` (`BR-T004`: 17/17 unit test, `vite build`, Playwright 1440/1280/390/320 + zoom 200% + reduced motion + hard reload + Back/Forward + Escape).
- **Implemented, awaiting independent Codex review:** `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*` (404), `RouteScrollAndFocus`, `SiteHeader` (overlay-hero / solid-ivory), `Breadcrumbs`, `GameProductShowcase`, `ProductStatusLabel`, `EmptyUnavailableState`, liên kết thật từ thẻ Green Play trên `/` sang `/games`.
- **Missing / pending approval assets:** `VIS-006` & `VIS-008` đã qua D2 file QA nhưng vẫn chờ xác nhận D1 cuối cùng và quyền phát hành (`BR-T002`). Các asset trang chủ `VIS-001`, `VIS-002`, `VIS-003A..005A`, `VIS-009` (Wave 1A) và `VIS-003B..005B`, `VIS-010` (Wave 1B) vẫn đang chờ theo `BR-T022`.
- **Functional blockers:** `npm run typecheck` còn 1 lỗi `TS6133` có sẵn ở `src/features/oanquan/prototypeOnlyModel.ts:24` (PR #5 xử lý, không ghi đè trong `BR-T004`); `BR-T002` (bản quyền thương mại); `BR-T005`/`OQ-01` (nội dung mẫu Fact–Act); `OQ-08` (luật bản số Ô ăn quan xanh); chưa cấu hình `lint` script.
- **Accessibility/performance issues:** Đã kiểm chứng bàn phím, Escape trả focus mobile drawer, skip-link, focus `#main-content` khi đổi route, touch target >=44px trên mobile, `prefers-reduced-motion`, 0 lỗi console và 0 tràn ngang từ 320px đến 1440px + zoom 200%. Screen reader thật (VoiceOver/NVDA), axe-core trên các route mới và đo LCP/CLS thực tế vẫn chờ Codex QA (`UX-017`).
- **Top three priorities:**
  1. Codex review & kiểm chứng độc lập `BR-T004` (kèm đồng bộ sau PR #5 để `tsc --noEmit` xanh toàn repo) rồi mở PR cho `BR-T004`.
  2. Đội nội dung triển khai `BR-T005` (duyệt >=5 thẻ mẫu Fact–Act kèm nguồn) và Owner chốt D1/quyền phát hành (`BR-T002`) + `OQ-01`/`OQ-08`.
  3. Sau khi `BR-T004` và `BR-T005` hoàn tất → mở `BR-T006` (1 vòng chơi thử Fact–Act hoàn chỉnh không yêu cầu đăng nhập).
- **Recommended next task:** Codex QA & PR review cho **`BR-T004`**, song song với **`BR-T005`** và chốt D1/`BR-T002`.
- **Approval required:** Review mã & PR cho `BR-T004`; duyệt D1 cuối & bản quyền xuất bản (`BR-T002`) trước khi phát hành công khai.
