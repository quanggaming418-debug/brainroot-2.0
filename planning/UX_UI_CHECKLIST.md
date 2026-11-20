# BRAINROOT 2.0 — PERSISTENT UX/UI CHECKLIST & PROGRESS CONTROL

**Cập nhật gần nhất:** 2026-11-20 (`BR-T021`)  
**Trạng thái quy chuẩn:** `NOT_STARTED` | `DESIGNING` | `AWAITING_ASSETS` | `READY_FOR_BUILD` | `IN_PROGRESS` | `IN_REVIEW` | `PASS` | `BLOCKED`  
**Quy tắc nghiệm thu:** Không đánh `PASS` khi chỉ có mã nguồn hoặc lời khẳng định; phải có bằng chứng thực thi (build/test/browser/asset hiển thị đúng). Không bịa tỷ lệ phần trăm hoàn thành.

---

## 1. Bảng kiểm tra UX/UI liên tục (Master Checklist)

| ID | Danh mục | Yêu cầu | Ưu tiên | Owner | Trạng thái | Phụ thuộc | Bằng chứng | Ngày rà soát | Hành động tiếp theo |
|---|---|---|---|---|---|---|---|---|---|
| `UX-001` | Hero (H01) | Hero V4 React/TS, 3 lớp parallax bảo thủ, 1 CTA chính, Brainie/Rootie gốc, Be Vietnam Pro | P0 | Codex / AI Studio | `PASS` | `BR-T003` | `logs/CODEX_LOG.md` (1440/390/320, zoom 200%, 0 lỗi console, axe 0 vi phạm tự động) | 2026-11-20 | Bảo toàn, không hồi quy |
| `UX-002` | Motion (H01) | Chuyển động nền Hero lặp lệch pha, tạm dừng khi ẩn tab, tắt khi `prefers-reduced-motion`, ghi nhận giới hạn WCAG 2.2.2 | P1 | Codex | `PASS` | `BR-T020` | `logs/CODEX_LOG.md` (30s/180s, `visibilitychange`, reduced-motion PASS) + `docs/ACCESSIBILITY.md` | 2026-11-20 | Đồng bộ trạng thái merge `BR-T020` trong `TASKS.md` |
| `UX-003` | Blueprint (M0) | Hoàn thiện IA, 6 hành trình người dùng, Storyboard H01–H06, Global Design System & Motion spec | P0 | Google AI Studio | `IN_REVIEW` | `BR-T021` | `docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md` | 2026-11-20 | Owner duyệt **GATE A** & **GATE B** |
| `UX-004` | Assets (M0) | Lập Sổ đăng ký tài sản đầy đủ + Production Briefs cho Wave 1 (`VIS-001..010`) | P0 | Google AI Studio | `IN_REVIEW` | `BR-T021` | `planning/VISUAL_ASSET_REGISTER.md` | 2026-11-20 | Owner duyệt **GATE C** & Wave 1A |
| `UX-005` | Licensing | Xác minh bản quyền thương mại cho Brainie, Rootie, Fact–Act deck & thành phần Canva gốc | P0 | Product Owner / Design | `BLOCKED` | `BR-T002`, `OQ-02` | `docs/ASSET_AUDIT.md` (chỉ mới được phép dùng nội bộ/prototype) | 2026-11-20 | Đội ngũ xác nhận quyền xuất bản trước khi public release |
| `UX-006` | Homepage (H02) | Dải chuyển cảnh khu vườn nối mượt H01 xuống H03 (không cắt phẳng sang nền kem) | P1 | AI Studio | `AWAITING_ASSETS` | GATE B/C + `VIS-009` SVG | Chưa triển khai (hiện đang cắt thẳng ở `landing.css`) | 2026-11-20 | Chờ duyệt GATE B/C rồi dựng trong M1 |
| `UX-007` | Homepage (H03) | Nâng cấp 4 vùng Hệ sinh thái sang bố cục minh họa Living Garden Wayfinding (nhấn mạnh Green Play) | P1 | AI Studio | `AWAITING_ASSETS` | GATE B/C + `VIS-001..005` | Hiện có 4 thẻ phẳng chữ nhật đạt chức năng nền | 2026-11-20 | Sản xuất Wave 1A (`VIS-001`, `VIS-002`) và Wave 1B (`VIS-003..005`) |
| `UX-008` | Homepage (H04) | Phân khu Featured Green Play giới thiệu `Fact–Act` (`VIS-007`) & `Ô ăn quan xanh` (`VIS-008`) với 1 CTA tới `/games` | P0 | AI Studio | `AWAITING_ASSETS` | GATE B/C + `VIS-008` (`VIS-007` đã có) | `fact-act-deck.webp` có sẵn 92 KB nhưng chưa đưa lên UI | 2026-11-20 | Duyệt `VIS-008` và tích hợp ở M1/M2 |
| `UX-009` | Homepage (H05) | Kể chuyện minh họa 5 bước *Hạt giống → Nảy mầm → Hiểu biết → Hành động → Kết nối* cho `#about` | P1 | AI Studio | `AWAITING_ASSETS` | GATE B/C + `VIS-010` SVG | Hiện có đoạn văn bản thuần ở `AboutSection.tsx` | 2026-11-20 | Dựng bộ SVG 5 bước `VIS-010` ở M1 |
| `UX-010` | Homepage (H06) | Footer có viền thực vật tinh gọn, thông tin minh bạch, 0 link chết | P1 | AI Studio | `DESIGNING` | GATE B + `VIS-009` SVG | Hiện có footer 1 dòng tối giản ở `SiteFooter.tsx` | 2026-11-20 | Nâng cấp ở M1 |
| `UX-011` | Routing | Thiết lập routing SPA cho `/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh` (không tạo link chết) | P0 | AI Studio / Codex | `NOT_STARTED` | GATE A + duyệt giải pháp router | Chưa cài router trong `package.json` | 2026-11-20 | Chốt giải pháp router và triển khai trong `BR-T004` (M2) |
| `UX-012` | Game Library (`/games`) | Trang Green Play Pavilion với nền `VIS-006`, showcase 2 sản phẩm và trạng thái trung thực | P0 | AI Studio | `AWAITING_ASSETS` | GATE A/C/D + `VIS-006`, `VIS-007`, `VIS-008` | Đặc tả đã có trong `UX_UI_MASTER_BLUEPRINT.md` mục 4.1 | 2026-11-20 | Duyệt tài sản Wave 1A rồi giao `BR-T004` |
| `UX-013` | Detail Fact–Act | Trang `/games/fact-act` dùng `fact-act-deck.webp` gốc, phân biệt bản thử vs bộ thẻ vật lý | P0 | AI Studio | `NOT_STARTED` | `UX-011`, `UX-012` | Đặc tả mục 4.2 trong Blueprint | 2026-11-20 | Triển khai trong `BR-T004` |
| `UX-014` | Detail Ô ăn quan xanh | Trang `/games/o-an-quan-xanh` nêu 5 chủ đề, 3 cấp độ, ghi rõ minh họa khái niệm & luật đang chuẩn hóa | P0 | AI Studio | `AWAITING_ASSETS` | `UX-011`, `VIS-008` | Đặc tả mục 4.3 trong Blueprint | 2026-11-20 | Duyệt `VIS-008`, triển khai trong `BR-T004` |
| `UX-015` | Trial Content | Duyệt tối thiểu 5 thẻ/câu hỏi + lời giải có nguồn khoa học từ kho nhóm | P0 | Team Content Reviewer | `BLOCKED` | `BR-T005`, `OQ-01`, `OQ-03` | Chưa có file dữ liệu nội dung đã duyệt trong repo | 2026-11-20 | Chủ dự án & đội nội dung chốt 5 mục mẫu |
| `UX-016` | Playable Trial UI | Vòng chơi thử Fact–Act không cần login: hướng dẫn → chơi → phản hồi/nguồn → phản tư → kết quả | P0 | Codex / AI Studio | `BLOCKED` | `BR-T004`, `BR-T005` (`UX-015`) | Đặc tả mục 4.4 trong Blueprint | 2026-11-20 | Mở sau khi `BR-T004` & `BR-T005` DONE (`BR-T006`) |
| `UX-017` | About Page (`/about`) | Trang giới thiệu & thông tin liên hệ chính thức được nhóm xác nhận | P0 | AI Studio | `NOT_STARTED` | `BR-T007` + xác nhận thông tin nhóm/liên hệ | Hiện dùng section `#about` ngắn trên `/` | 2026-11-20 | Triển khai sau M2/M3 (`BR-T007`) |
| `UX-018` | Quality & A11y Gate | `typecheck`, `build`, unit, Playwright 1440/390/320 + zoom 200%, axe-core, kiểm tra screen reader thật | P0 | Codex | `IN_PROGRESS` | Mỗi milestone | Đã PASS cho `BR-T003`/`BR-T020`; `lint` & screen reader thật `NOT RUN` | 2026-11-20 | Lặp lại ở GATE F của từng milestone M1–M4 |

### Thống kê trung thực từ bảng trên (18 mục hợp lệ)
- `PASS`: **2 / 18** (`UX-001`, `UX-002`)
- `IN_REVIEW`: **2 / 18** (`UX-003`, `UX-004`)
- `IN_PROGRESS`: **1 / 18** (`UX-018`)
- `DESIGNING`: **1 / 18** (`UX-010`)
- `AWAITING_ASSETS`: **6 / 18** (`UX-006`, `UX-007`, `UX-008`, `UX-009`, `UX-012`, `UX-014`)
- `NOT_STARTED`: **3 / 18** (`UX-011`, `UX-013`, `UX-017`)
- `BLOCKED`: **3 / 18** (`UX-005`, `UX-015`, `UX-016`)

---

## 2. Quy trình Checkpoint bắt buộc (Đầu & Cuối mỗi task tương lai)

1. Kiểm tra trạng thái thực tế của repo (`git status`, file trong `src/`, `public/assets/`).
2. Đọc `logs/HANDOFF.md` gần nhất.
3. Đối chiếu phần đã làm với `docs/UX_UI_MASTER_BLUEPRINT.md` và `docs/UX_UI_STORYBOARD.md`.
4. Kiểm tra hồi quy (đặc biệt Hero V4, tương phản chữ, focus bàn phím, 320px).
5. Cập nhật trạng thái từng dòng bị ảnh hưởng trong bảng mục 1 ở trên.
6. Ghi nhận tài sản còn thiếu, luồng chưa hoàn thiện, route lỗi và vấn đề A11y/hiệu năng.
7. Đề xuất **duy nhất 1 task hợp lý tiếp theo** kèm báo cáo theo mẫu mục 3.

---

## 3. BRAINROOT UX/UI CHECKPOINT (Hiện hành — BR-T021)

- **Date:** 2026-11-20
- **Git branch and commit:** Không đọc được qua CLI (workspace AI Studio không có `.git`). Theo thông báo Product Owner: `BR-T003` và `BR-T020` đã merge vào `main`; tuy nhiên tài liệu đồng bộ trước phiên vẫn ghi `BR-T020` ở `IN_REVIEW` trên nhánh `codex/hero-ambient-motion` (cần đối chiếu khi sync GitHub).
- **Current Task ID:** `BR-T021` (UX/UI Master Blueprint & Visual Asset Planning)
- **Current milestone:** **M0 — Master Design Blueprint** (`GATE A`, `GATE B`, đề xuất `GATE C` đã hoàn tất để trình duyệt)
- **Completed and verified:** `UX-001` (Hero V4 + shell React/TS, `BR-T003`), `UX-002` (Hero ambient motion + visibility pause + WCAG 2.2.2 disclosure, `BR-T020`).
- **Implemented but not verified:** Chưa có mã nguồn mới ở phiên này (chỉ soạn 4 tài liệu đặc tả `BR-T021` theo đúng giới hạn phạm vi).
- **Missing assets:** Đợt 1A cần 3 tranh mới (`VIS-002`, `VIS-006`, `VIS-008`) + 3 gói SVG nội bộ (`VIS-001`, `VIS-009`, `VIS-010`); Đợt 1B cần 3 tranh (`VIS-003`, `VIS-004`, `VIS-005`). `VIS-007` (`fact-act-deck.webp`) đã có sẵn nhưng chưa gắn lên UI.
- **UX/UI inconsistencies:** Hiện có đường cắt cứng giữa chân Hero H01 và nền `#F8F3E9` của `#worlds`; 4 khu vực Ecosystem vẫn là 4 thẻ chữ nhật phẳng dùng ký tự Unicode thay vì minh họa khu vườn; `fact-act-deck.webp` chưa được sử dụng.
- **Functional blockers:** `BR-T002` (bản quyền thương mại tài sản gốc Canva), `BR-T005` / `OQ-01` (chưa chốt 5 câu/thẻ đã kiểm duyệt để mở `BR-T006`), `OQ-08` (chưa chốt luật số hóa Ô ăn quan xanh), chưa cấu hình router và `npm run lint`.
- **Accessibility/performance issues:** Hero V4 có giới hạn WCAG 2.2.2 đã ghi nhận (`docs/ACCESSIBILITY.md`); screen reader thật (NVDA/VoiceOver) và thiết bị iOS/Android thật chưa chạy; cần giữ ngân sách ảnh WebP `<= 70–120 KB`/ảnh khi triển khai M1/M2.
- **Documents requiring updates:** Đã tạo 4 tài liệu lõi của `BR-T021`; cần Codex/Owner đồng bộ lại trạng thái merge thực tế của `BR-T020` trên `main` trong `planning/TASKS.md` khi sync GitHub.
- **Top three priorities:**
  1. Product Owner rà soát & phê duyệt **GATE A, GATE B, GATE C** của `BR-T021`.
  2. Sản xuất & duyệt gói tài sản tối giản **Wave 1A** (`VIS-006`, `VIS-008`, `VIS-002` + SVG `VIS-001/009/010`) để vượt **GATE D**.
  3. Chốt chọn game R0 & duyệt >=5 mục nội dung (`BR-T005`) song song với triển khai UI **M1/M2 (`BR-T004`)**.
- **Recommended next task:** Sau khi Owner duyệt GATE A/B/C → thực hiện **sản xuất & xác minh tài sản Wave 1A (GATE D)** làm đầu vào trực tiếp cho M1 (nâng cấp Homepage) và `BR-T004` (Game Library).
- **Approval required:** **CÓ** — Phê duyệt GATE A (IA), GATE B (Storyboard H01–H06), GATE C (Visual Asset Register & Wave 1A), và xác nhận chiến lược router trước khi bắt đầu `BR-T004`.
