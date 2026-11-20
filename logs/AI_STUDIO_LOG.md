# AI_STUDIO_LOG — Append-only

- **Started:** 2026-11-20
- **Status:** NO GOOGLE AI STUDIO IMPLEMENTATION ENTRIES YET
- **Policy:** Sau mỗi phiên Build, ghi task, file đã thay đổi, GitHub commit nếu có, điều đã kiểm thử thật, lỗi còn lại và trạng thái đồng bộ. Nếu AI Studio không ghi được file, Codex cập nhật **sau khi xác minh** diff từ GitHub; không coi mô tả của agent là bằng chứng kiểm thử.

---

<!-- Append NEW sessions below. Do not edit or delete old sessions. -->

## Session: 2026-11-20 03:45+07:00 — Google AI Studio — BR-T003

- **Task & goal:** Triển khai `BR-T003` — Design System tokens, Application Shell, Hero V4 React/TypeScript (giữ nguyên artwork gốc Brainie/Rootie & 3 lớp cảnh), điều hướng neo trong trang và phần giới thiệu Hệ sinh thái gồm đủ 4 khu vực (`Green Play`, `Green Quest`, `Green Learn`, `Green Connect`).
- **Status before → after:** `TODO` → `IN_REVIEW` (chờ Codex review và đồng bộ GitHub; không tự đóng `DONE`).
- **Read context:** `AGENTS.md`, `README.md`, `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/USER_FLOWS.md`, `docs/ACCESSIBILITY.md`, `docs/ASSET_AUDIT.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/HANDOFF.md`, `reference/hero-v4/*`.
- **Files changed:**
  - `index.html` — Đồng bộ title, meta description, OpenGraph, Be Vietnam Pro weights 400–900, preload `hero-garden-v4.webp`.
  - `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/landing.css`, `src/styles.css` — Hệ thống design tokens theo bảng màu Brainroot, tăng nhẹ tương phản chữ phụ cho WCAG AA, layout Hero V4 responsive (1440/390/320), reduced-motion.
  - `src/data/landing.ts` — Tách dữ liệu điều hướng, Hero copy/assets, 4 khu vực Hệ sinh thái (`Green Play`, `Green Quest`, `Green Learn`, `Green Connect`), About và Footer.
  - `src/utils/parallax.ts`, `src/hooks/useHeroParallax.ts` — Logic parallax 3 lớp biên độ bảo thủ (`< 12px`), tắt trên mobile (`<= 720px`) và `prefers-reduced-motion`.
  - `src/components/landing/SiteHeader.tsx`, `HeroBackground.tsx`, `MascotLayer.tsx`, `PrimaryCTA.tsx`, `HeroSection.tsx`, `EcosystemSection.tsx`, `AboutSection.tsx`, `SiteFooter.tsx` — Các component React/TS độc lập, semantic landmarks (`banner`, `navigation`, `main`, `contentinfo`), menu mobile hỗ trợ phím `Escape` và click ngoài.
  - `src/App.tsx` — Lắp ráp shell hoàn chỉnh với skip-link tới `#worlds`.
  - `tests/br-t003.test.ts` — 5 unit tests kiểm tra logic parallax và toàn vẹn dữ liệu nội dung/anchor/asset.
  - `docs/TECHNICAL_ARCHITECTURE.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật trạng thái và bàn giao.
- **User-visible behavior changed:** Thay thế màn hình bootstrap bằng trang đích Brainroot Hero V4 hoàn chỉnh bằng React/TypeScript với 1 CTA chính cuộn mượt tới `#worlds`, 4 thẻ giới thiệu Hệ sinh thái, mục Về Brainroot và menu di động điều khiển được bằng bàn phím.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/br-t003.test.ts`: PASS (5/5 tests pass).
  - `npm run typecheck`: PASS (`tsc --noEmit` exit 0).
  - `npm run build`: PASS (`vite build` exit 0, 40 modules transformed).
  - `npm run lint`: NOT RUN (`package.json` chưa có script `lint` / ESLint).
  - Playwright headless Chromium trên `http://localhost:3000`: PASS — Desktop 1440×900 (`scrollWidth 1440/1440`, Be Vietnam Pro loaded, 7/7 ảnh tải, 4 thẻ hệ sinh thái hiển thị trọn vẹn sau khi bấm CTA, Tab đầu vào `skip-link`), Mobile 390×844 (`scrollWidth 390/390`, mở/đóng menu mobile, nhấn `Escape` đóng menu và trả focus về `.nav-toggle`, chọn link đóng menu và cuộn đúng), Small mobile 320×740 (`scrollWidth 320/320`, `heroHeight 740`, `scrollHintBottom 728`, lá không đè tiêu đề), Reduced motion (`animationName: none`, `layerTransform: none`), 0 lỗi console và 0 cảnh báo.
- **Acceptance criteria:** AC-1 Brand tokens & Be Vietnam Pro PASS; AC-2 Hero V4 modular React & single CTA PASS; AC-3 Official Brainie/Rootie & depth layers preserved PASS; AC-4 4 Ecosystem introductory areas PASS; AC-5 Responsive 1440/390/320 zero overflow PASS; AC-6 Mobile menu & Escape & keyboard focus PASS; AC-7 Reduced motion & 0 console errors PASS; AC-8 ESLint script NOT RUN (chưa cấu hình).
- **Bugs / tradeoffs / risk:**
  - Bản quyền thương mại của mascot/asset Canva (`BR-T002`) vẫn cần nhóm xác minh riêng trước khi phát hành chính thức.
  - Font Be Vietnam Pro tải từ Google Fonts CDN (chưa có font cục bộ dự phòng khi offline hoàn toàn).
  - `package.json` chưa có script `lint` và test runner tự động; chưa kiểm thử screen reader thật (VoiceOver/NVDA) hoặc axe-core đầy đủ.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không chứa thư mục `.git`; cần đồng bộ qua luồng GitHub sync và để Codex kiểm tra diff).
- **What remains / next task:** Codex review PR/diff cho `BR-T003`, bổ sung cấu hình lint/a11y check nếu cần, xác nhận `DONE` trước khi chuyển sang `BR-T004` (Game Catalog).
- **Owner approval required:** Không cho bước review hiện tại; cần duyệt phạm vi trước khi khởi động `BR-T004`.

## Session: 2026-11-20 09:30+07:00 — Google AI Studio — BR-T021

- **Task & goal:** Lập đặc tả thiết kế & kiểm soát phát triển toàn diện (`BR-T021` — UX/UI Master Blueprint, Homepage Storyboard H01–H06, Visual Asset Register & Briefs, Persistent UX/UI Checklist) để trình duyệt **GATE A, GATE B và GATE C**. Không chỉnh sửa mã nguồn ứng dụng, không sinh ảnh, không bắt đầu `BR-T004`.
- **Status before → after:** `NEW` → `IN_REVIEW` (dừng tại cổng phê duyệt GATE A/B/C của Product Owner).
- **Read context:** `AGENTS.md`, `README.md`, `docs/PRD.md`, `docs/USER_FLOWS.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/ACCESSIBILITY.md`, `docs/ASSET_AUDIT.md`, `docs/GAME_SPEC.md`, `docs/AI_STUDIO_CODEX_WORKFLOW.md`, `docs/CONTENT_GUIDELINES.md`, `docs/ACCESS_CONTROL.md`, `docs/DATA_MODEL.md`, `docs/QUALITY_AND_TESTING.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `planning/OPEN_QUESTIONS.md`, `logs/HANDOFF.md`, `logs/CODEX_LOG.md`, mã nguồn `src/` & ảnh `public/assets/hero-v4/fact-act-deck.webp`.
- **Files changed:**
  - `docs/UX_UI_MASTER_BLUEPRINT.md` (mới) — Kiểm toán hiện trạng, IA (R0 vs tương lai), 6 hành trình người dùng, đặc tả `/games` & `/games/*` (`BR-T004`/`BR-T006`), Global Design System (15 components, responsive + zoom 200%), Motion spec & WCAG 2.2.2 boundary, Roadmap M0–M4, phản biện 10 tiêu chí & 6 rủi ro.
  - `docs/UX_UI_STORYBOARD.md` (mới) — Kịch bản trực quan H01–H06 cho trang chủ theo định hướng ONE LIVING WORLD.
  - `planning/VISUAL_ASSET_REGISTER.md` (mới) — Kiểm kê `EX-001..009`, sổ đăng ký `VIS-001..010` đủ 19 trường, đề xuất Wave 1A tối giản và Production Briefs đầy đủ 13 mục cho các tranh mới.
  - `planning/UX_UI_CHECKLIST.md` (mới) — 18 mục kiểm soát liên tục (`UX-001..018`), quy trình checkpoint và báo cáo `BRAINROOT UX/UI CHECKPOINT` hiện hành.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ tác vụ `BR-T021` và báo cáo sai lệch tài liệu `BR-T020`.
- **User-visible behavior changed:** Không có (chỉ tạo/cập nhật tài liệu thiết kế và quản trị; mã nguồn ứng dụng giữ nguyên 100%).
- **Tests actually executed:**
  - `git status --short`, `git branch -a`, `git log -n 5 --oneline`: Không khả dụng (`fatal: not a git repository` — container không chứa `.git`).
  - `ls -la public/assets/hero-v4/` & kiểm tra trực quan `fact-act-deck.webp`: PASS (xác nhận đủ 10 file trong `public/assets/hero-v4/`, gồm `fact-act-deck.webp` 91.986 bytes).
  - `npm run typecheck`, `npm run build`, `npm run lint`, unit/Playwright: `NOT RUN` (không thay đổi mã nguồn ứng dụng trong phiên `BR-T021`).
- **Acceptance criteria:** GATE A (IA & 6 journeys) sẵn sàng duyệt; GATE B (Storyboard H01–H06) sẵn sàng duyệt; GATE C (Asset Register + Briefs + Wave 1A) sẵn sàng duyệt; 4 file kiểm soát đã được tạo đầy đủ; không chạm mã ứng dụng hay sinh ảnh.
- **Bugs / tradeoffs / risk:**
  - Sai lệch giữa xác nhận của Owner (`BR-T020` đã merge vào `main`) và văn bản cũ trong `TASKS.md`/`HANDOFF.md` (`IN_REVIEW`), chưa tự kiểm chứng được qua Git CLI do thiếu `.git`.
  - Chi phí & tính đồng bộ phong cách của các tranh minh họa mới là rủi ro chính → đã giảm thiểu bằng đề xuất Wave 1A tối giản (chỉ 3 tranh raster mới + 3 bộ SVG nội bộ + tái sử dụng `fact-act-deck.webp`).
- **Git commit SHA:** `NOT COMMITTED` (workspace không có `.git`).
- **What remains / next task:** Owner duyệt GATE A/B/C → chuyển sang sản xuất & kiểm duyệt tài sản Wave 1A (**GATE D**), sau đó mới triển khai M1 hoặc `BR-T004`.
- **Owner approval required:** Có — Phê duyệt GATE A, GATE B, GATE C và chiến lược router trước khi mở triển khai tiếp theo.

## Session: 2026-11-20 11:15+07:00 — Google AI Studio — BR-T021 (Rev 1.1 Design Review Refinement)

- **Task & goal:** Tiếp thu 7 quyết định Design Review của Product Owner cho `BR-T021` và cập nhật đồng bộ 4 tài liệu thiết kế lõi (`UX_UI_MASTER_BLUEPRINT.md`, `UX_UI_STORYBOARD.md`, `VISUAL_ASSET_REGISTER.md`, `UX_UI_CHECKLIST.md`) lên Rev 1.1, chuẩn bị sạch để đồng bộ lên GitHub trước khi Owner/Reviewer đóng **GATE A, GATE B, GATE C**. Tuyệt đối không sửa mã nguồn ứng dụng, không cài dependency, không sinh ảnh, không khởi chạy `BR-T004`.
- **Status before → after:** `IN_REVIEW` (Rev 1.0) → `IN_REVIEW` (Rev 1.1; GATE A/B/C vẫn mở, chờ sync GitHub và kiểm tra Markdown).
- **Read context:** 4 tài liệu lõi `BR-T021` (Rev 1.0), `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md`, phản hồi Design Review của Product Owner.
- **Files changed:**
  - `docs/UX_UI_MASTER_BLUEPRINT.md` — Cập nhật Rev 1.1: đồng bộ hệ minh họa 4 vùng (Wave 1A nhẹ đồng bộ thay thẻ Unicode phẳng → Wave 1B toàn cảnh); đề xuất **React Router** cho `BR-T004` kèm route map, Back/Forward, khôi phục cuộn & focus, fallback `*`, yêu cầu SPA hosting fallback và điều hướng neo trang chủ/trang con (chưa cài dependency); phân tầng ngân sách ảnh Tier A–D theo kích thước/vai trò/biến thể desktop–mobile/lazy-load/đo LCP–CLS thay cho giới hạn cứng 70–120 KB; tái cân bằng roadmap MVP-first (`Wave 1A` → `M2 BR-T004` → `M3 BR-T006` với `BR-T005` song song, không để Wave 1B chặn MVP).
  - `docs/UX_UI_STORYBOARD.md` — Cập nhật Rev 1.1: bổ sung đặc tả chuyển cảnh 3 trạng thái `H01 → H02 → H03` (trước khi rời Hero / trong đoạn chuyển vườn / khi vào 4 vùng khám phá) giải thích rõ phối cảnh, tầng tán lá cutout, ánh sáng 35° trái-trên, căn trục lối đá 50%, liên tục màu sắc cho cả desktop và mobile; đồng bộ lộ trình hình ảnh 4 vùng Wave 1A (`VIS-002` + `VIS-003A..005A`) → Wave 1B (`VIS-003B..005B`).
  - `planning/VISUAL_ASSET_REGISTER.md` — Cập nhật Rev 1.1: phân loại tường minh 6 nhóm kiến trúc tài sản sẵn sàng cho chuyển động (`Flattened background illustration`, `Transparent foreground cutout`, `Independent animated object`, `Reusable SVG decoration`, `Actual product artwork`, `HTML/UI layer`); tách rõ danh sách đối tượng chuyển động độc lập vs lớp tĩnh; bảo toàn Brainie/Rootie gốc; bổ sung `VIS-003A..005A` (Wave 1A đồng bộ), `VIS-003B..005B` (Wave 1B) và phân tầng ngân sách Tier A–D.
  - `planning/UX_UI_CHECKLIST.md` — Cập nhật Rev 1.1: nâng cấp ma trận nghiệm thu 8 chiều độc lập (`UX`, `UI`, `Asset Avail`, `Asset Integ`, `Interact`, `A11y`, `Resp`, `Browser QA`) cho 17 hạng mục (`UX-001..017`: `PASS` 2/17, `IN_REVIEW` 2/17, `IN_PROGRESS` 1/17, `AWAITING_ASSETS` 6/17, `NOT_STARTED` 3/17, `BLOCKED` 3/17), đính kèm bằng chứng & giới hạn đã biết, và cập nhật `BRAINROOT UX/UI CHECKPOINT`.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Ghi nhận bản Rev 1.1 chờ sync GitHub & duyệt GATE A/B/C.
- **User-visible behavior changed:** Không có (phiên chỉ sửa tài liệu thiết kế & quản trị; mã nguồn ứng dụng, `package.json`, `public/` giữ nguyên 100%).
- **Tests actually executed:**
  - `npm run typecheck`, `npm run build`, `npm run lint`, unit tests, Playwright: `NOT RUN` (không có thay đổi mã nguồn ứng dụng trong phiên này).
  - Git CLI (`git status` / `git commit`): không khả dụng do workspace AI Studio không có `.git`.
- **Acceptance criteria:** Đáp ứng đầy đủ 7 yêu cầu Design Review trong 4 tài liệu lõi; giữ trạng thái trung thực (GATE A/B/C chưa đóng, không đánh `PASS` khi chưa có bằng chứng kiểm thử); giữ nguyên mã ứng dụng & không cài dependency.
- **Bugs / tradeoffs / risk:**
  - Cần đồng bộ thủ công/qua GitHub sync để Owner & Reviewer xem trực tiếp diff Markdown trước khi chốt GATE A/B/C.
  - Rủi ro trùng lặp trạng thái `BR-T020` (`IN_REVIEW` trong file quản trị cũ vs xác nhận đã merge `main`) vẫn cần đối chiếu khi đồng bộ GitHub.
  - Wave 1A bổ sung 3 minh họa nhẹ đồng bộ (`VIS-003A..005A`) giúp xóa bỏ chênh lệch thẩm mỹ với `VIS-002` mà không làm chậm `BR-T004`/`BR-T006`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có thư mục `.git`; sẵn sàng đồng bộ lên GitHub).
- **What remains / next task:** Sau khi đồng bộ GitHub và Owner/Reviewer đóng GATE A/B/C → khởi động **Wave 1A Asset Production & Verification (GATE D)** (song song để đội nội dung chạy `BR-T005`), nhằm mở khóa trực tiếp **`BR-T004` (Game Library)** và nối tiếp sang **`BR-T006` (Playable Loop)**.
- **Owner approval required:** Có — Kiểm tra Markdown sau sync GitHub để đóng chính thức **GATE A, GATE B, GATE C** và duyệt phương án **React Router** cho `BR-T004`.

## Session: 2026-11-20 12:10+07:00 — Google AI Studio — BR-T021 (Design Approval & Closeout)

- **Task & goal:** Ghi nhận phê duyệt GATE A (IA), GATE B (Storyboard Rev 1.1), GATE C (Visual Asset Register Rev 1.1) của Product Owner theo commit `0a735d189885` (chỉ áp dụng cho đặc tả thiết kế, chưa phải artwork cuối); đóng `BR-T021` → `DONE`, hiệu chỉnh `BR-T020` → `DONE` (PR #2 đã merge), thêm `BR-T022` (Wave 1A Visual Asset Production & Verification), tách 2 cổng duyệt tài sản (GATE D1 Artistic Quality & GATE D2 Technical Integration Readiness), ghi yêu cầu xác minh chi tiết component anatomy/states trước `BR-T004`, và xóa file Master Prompt dư chưa dùng trong `public/assets/aistudio/`. Không tạo artwork, không sửa React code, không mở `BR-T004`.
- **Status before → after:** `BR-T021`: `IN_REVIEW` → `DONE`; `BR-T020`: `IN_REVIEW` → `DONE` (PR #2); `BR-T022`: `NEW` → `TODO`.
- **Read context:** `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `planning/UX_UI_CHECKLIST.md`, `planning/VISUAL_ASSET_REGISTER.md`, `docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`, `logs/CODEX_LOG.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md`, `public/assets/aistudio/Paste_November_20__2026_-_9_24AM_7af48852`.
- **Files changed:**
  - `public/assets/aistudio/Paste_November_20__2026_-_9_24AM_7af48852` & thư mục rỗng `public/assets/aistudio/` (xóa) — Đã `grep` toàn dự án xác nhận 0 tham chiếu trước khi xóa.
  - `docs/UX_UI_MASTER_BLUEPRINT.md` — Ghi nhận GATE A/B/C `APPROVED` (2026-11-20, commit `0a735d189885`), tách GATE D1 (Artistic Quality) & GATE D2 (Technical Integration Readiness), ghi bắt buộc xác minh chi tiết component anatomy/states trước `BR-T004`, cập nhật roadmap với `BR-T022`.
  - `docs/UX_UI_STORYBOARD.md` — Cập nhật tiêu đề sang `APPROVED` (GATE B, 2026-11-20, commit `0a735d189885`; chỉ duyệt đặc tả).
  - `planning/VISUAL_ASSET_REGISTER.md` — Cập nhật tiêu đề sang `APPROVED` (GATE C, 2026-11-20, commit `0a735d189885`) và bổ sung mục 4.1 định nghĩa 2 cổng duyệt tài sản tách biệt `GATE D1` & `GATE D2` cho `BR-T022`.
  - `planning/UX_UI_CHECKLIST.md` — Giữ nguyên đủ 17 mục (`UX-001..017`) và tiêu chí bằng chứng 8 chiều; cập nhật `UX-002` (PR #2), `UX-003`/`UX-004` (`PASS` ở mức đặc tả thiết kế GATE A/B/C), bổ sung yêu cầu GATE D1/D2 & kiểm tra anatomy/states trước `BR-T004`, cập nhật Checkpoint.
  - `planning/TASKS.md` — Đóng `BR-T021` `DONE`, hiệu chỉnh `BR-T020` `DONE` (PR #2), thêm `BR-T022` (`TODO`), ghi điều kiện `BR-T022 (GATE D1+D2)` & xác minh anatomy/states ở cột phụ thuộc `BR-T004`.
  - `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật trạng thái closeout và bàn giao bước Git/PR cho Codex.
- **User-visible behavior changed:** Không có (không thay đổi mã nguồn React/CSS/HTML hay tài sản runtime của ứng dụng; chỉ xóa tệp prompt dư không có tham chiếu và cập nhật tài liệu quản trị).
- **Tests actually executed:**
  - `git status --short` & `git log -n 5 --oneline`: **Không khả dụng** (`fatal: not a git repository` — container AI Studio không có `.git`).
  - `grep -rn "aistudio" src index.html docs planning logs tests public/assets/hero-v4` & `grep -rn "Paste_November" .`: **PASS** (0 tham chiếu tới `public/assets/aistudio/` hay `Paste_November_20__2026_-_9_24AM_7af48852`).
  - `npm run typecheck`, `npm run build`, `npm run lint`, unit tests, Playwright: **`NOT RUN`** (không thay đổi mã nguồn ứng dụng).
- **Acceptance criteria:** Đã hoàn tất toàn bộ phần cập nhật tệp và dọn file prompt dư trong phạm vi workspace AI Studio. Các bước cần Git CLI (`verify main commit 0a735d189885`, cập nhật `logs/CODEX_LOG.md` đúng quy tắc tách log theo `AGENTS.md`, tạo nhánh riêng, commit, push, mở PR nhắm vào `main`) **chưa thể thực hiện trong container không có `.git`** và được bàn giao rõ sang Codex.
- **Bugs / tradeoffs / risk:**
  - Không ghi giả vào `logs/CODEX_LOG.md` vì theo `AGENTS.md`, AI Studio chỉ ghi `logs/AI_STUDIO_LOG.md`, còn `logs/CODEX_LOG.md` do Codex tự ghi sau khi kiểm tra diff và thực thi Git/PR thật.
  - Chưa xác minh được bằng Git CLI rằng `main` đang ở `0a735d189885` và PR #2 đã merge — Codex cần kiểm tra ngay ở bước tiếp theo.
- **Git commit SHA:** **`NOT COMMITTED`** (workspace AI Studio không có `.git`; branch/push/PR: `NOT RUN / NOT CREATED`).
- **What remains / next task:** (1) Codex xác minh `main` commit `0a735d189885` & PR #2, rà soát diff, append `logs/CODEX_LOG.md`, commit & push lên nhánh riêng và mở PR closeout `BR-T021` nhắm vào `main` (không tự merge); (2) Khởi động **`BR-T022` — Wave 1A Visual Asset Production & Verification** (vượt qua GATE D1 & GATE D2) và xác minh component anatomy/states trước khi mở `BR-T004`.
- **Owner approval required:** Có — Duyệt PR closeout `BR-T021` trên GitHub; sau đó duyệt riêng biệt GATE D1 và GATE D2 khi thực hiện `BR-T022`.

## Session: 2026-11-20 15:30+07:00 — Google AI Studio — BR-T004

- **Task & goal:** Triển khai thực tế `BR-T004` — Green Play UI/UX (Game Library `/games`, Product Detail `/games/fact-act`, Product Detail `/games/o-an-quan-xanh`, NotFound `*`) và điều hướng React Router cho Brainroot 2.0, sau khi xác minh đầy đủ giải phẫu & ma trận trạng thái của 7 nhóm component (`SiteHeader`/`MobileNavDrawer`, `Breadcrumbs`, `GameProductShowcase`, `ProductStatusLabel`, `EmptyUnavailableState`, `RouteScrollAndFocus`, `NotFoundPage`). Bảo toàn tuyệt đối Hero V4, hoạt ảnh mascot và nhánh sandbox 3D nội bộ `/?preview=oanquan3d` (không chỉnh sửa bất kỳ tệp nào trong `src/features/oanquan/`, `src/styles/oanquan3d-prototype.css`, `tests/br-t023.test.ts`).
- **Status before → after:** `BR-T004`: `TODO` → `IN_REVIEW` (chờ Codex review độc lập & mở PR; không tự đánh `DONE`).
- **Read context:** `AGENTS.md`, `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `docs/GAME_SPEC.md`, `docs/DESIGN_SYSTEM.md`, `docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`, `docs/BR_GAME_001_MVP_SPEC.md`, `planning/PROJECT_STATE.md`, `planning/TASKS.md`, `planning/UX_UI_CHECKLIST.md`, `planning/VISUAL_ASSET_REGISTER.md`, `logs/HANDOFF.md`, `src/App.tsx`, `src/styles/*`, `src/data/landing.ts`, `src/components/landing/*`, `src/components/games/GreenPlayPavilionBanner.tsx`, `src/utils/focusAnchorTarget.ts`, `tests/br-t003.test.ts`.
- **Files changed:**
  - `package.json`, `package-lock.json` — Cài đặt `react-router-dom` tương thích React 19 + Vite 7.
  - `src/utils/routeNavigation.ts` (mới) — Hàm thuần chuẩn hóa pathname, ánh xạ `document.title`, nhận diện nav active và quyết định khôi phục cuộn/focus (`PUSH`/`REPLACE`/`POP`/`#hash`).
  - `src/data/games.ts` (mới) — Dữ liệu trung thực cho Green Play Pavilion, Fact–Act (`Fact → Act → Phản tư`, so sánh vật lý vs bản chơi thử số tương lai, thông báo chưa mở chơi thử) và Ô ăn quan xanh (đủ 5 chủ đề, 3 cấp độ theo `docs/GAME_SPEC.md`, nhãn minh họa nguyên văn *"Minh họa khái niệm — luật bản số đang chuẩn hóa."*, tách rõ định hướng vs hiện trạng và liên kết nội bộ `/?preview=oanquan3d`).
  - `src/data/landing.ts` — Cập nhật mục `Trò chơi` trên thanh điều hướng sang `/games` và thêm liên kết thật tới `/games` trên thẻ `Green Play` ở `#worlds`.
  - `src/components/routing/RouteScrollAndFocus.tsx` (mới) — Đồng bộ `document.title`, cuộn `instant` lên đầu trang + chuyển focus vào `<main id="main-content" tabIndex={-1}>` khi đổi tuyến mới, hỗ trợ `#hash` xuyên trang (tôn trọng `prefers-reduced-motion`) và giữ nguyên hành vi Back/Forward (`POP`).
  - `src/components/common/Breadcrumbs.tsx`, `ProductStatusLabel.tsx`, `EmptyUnavailableState.tsx` (mới) — Bộ thành phần điều hướng phân cấp, nhãn trạng thái ưu tiên văn bản (không lạm dụng pill) và khung thông báo trung thực không có nút chơi giả.
  - `src/components/games/GameProductShowcase.tsx` (mới) — Khối trình bày sản phẩm bất đối xứng cho Fact–Act (khung cutout + lá trang trí nhẹ) và Ô ăn quan xanh (`<picture>` VIS-008 + `<figcaption>` minh họa bắt buộc).
  - `src/pages/HomePage.tsx`, `GameLibraryPage.tsx`, `FactActDetailPage.tsx`, `OAnQuanXanhDetailPage.tsx`, `NotFoundPage.tsx` (mới) — 5 trang route hoàn chỉnh.
  - `src/components/landing/SiteHeader.tsx`, `EcosystemSection.tsx`, `SiteFooter.tsx`, `src/App.tsx` — Tích hợp `<BrowserRouter>` & `<Routes>`, biến thể header `overlay-hero` cho `/` và `solid-ivory` cho trang con, `aria-current="page"`, bảo toàn `/?preview=oanquan3d`.
  - `src/styles/green-play.css` (mới), `src/styles/green-play-pavilion.css`, `src/styles.css` — Kiểu dáng modular chuẩn CSS (không dùng Tailwind), tối ưu căn giữa tiêu đề VIS-006 trong vùng trời sáng, cân đối lưới 3+2 cho 5 chủ đề, responsive `1440/1280/390/320` + zoom 200% + reduced motion.
  - `tests/br-t004.test.ts` (mới), `tests/br-t003.test.ts` — Bổ sung 7 unit test cho `BR-T004` và cập nhật bài kiểm tra điều hướng `BR-T003` cho tuyến `/games`.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `planning/UX_UI_CHECKLIST.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ quản trị.
- **User-visible behavior changed:** Mục `Trò chơi` trên header và thẻ `Green Play` trên trang chủ mở thẳng thư viện `/games` với banner `VIS-006`, hai khối giới thiệu bất đối xứng cho Fact–Act và Ô ăn quan xanh, hai trang chi tiết sản phẩm đầy đủ thông tin giáo dục minh bạch và trang 404 thân thiện; chuyển trang cập nhật `document.title`, cuộn đầu trang tức thì và đưa focus vào `#main-content`.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/br-t003.test.ts tests/br-t004.test.ts tests/br-t023.test.ts`: **PASS** (17/17 tests pass: `br-t003` 5/5, `br-t004` 7/7, `br-t023` 5/5).
  - `npx vite build`: **PASS** (72 modules transformed, build thành công trong 3.10s).
  - `npm run typecheck`: **FAIL trên tệp sandbox có sẵn ngoài phạm vi** (`src/features/oanquan/prototypeOnlyModel.ts(24,19): error TS6133: 'x' is declared but its value is never read` — thuộc PR #4/#5, không chỉnh sửa để tránh ghi đè PR #5); **0 lỗi TypeScript** trên toàn bộ mã `BR-T004` và mã landing hiện hữu.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless trên `http://localhost:3000`: **PASS** — Đã kiểm chứng 3 vòng (vòng 1 phát hiện và sửa 4 lỗi giao diện: ảnh lazy trống trên mobile full-page, lá đè caption Fact–Act, chữ `y` trong banner chạm khung nhà kính ở 1280px, lưới 5 chủ đề lệch hàng; vòng 2 phát hiện và sửa lỗi `scrollTo behavior: 'auto'` bị chậm do `html { scroll-behavior: smooth }` sang `behavior: 'instant'`; vòng 3 xác nhận `scrollBeforeClick: 904 → scrollAfterClick: 0`, `activeElementId: 'main-content'`). Xác nhận 0 tràn ngang tại `1440×900`, `1280×800`, `390×844`, `320×740` và zoom 200% (`720×450`) + `prefers-reduced-motion`; 0 lỗi console / 0 pageerror; ảnh WebP giải mã 100% (`vis-006-pavilion-desktop/mobile.webp`, `fact-act-deck.webp`, `vis-008-o-an-quan-concept/sm.webp`); hard reload trực tiếp `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `/khong-ton-tai` PASS; Back/Forward và `#about` xuyên trang PASS; `Escape` đóng mobile drawer và trả focus về `.nav-toggle` PASS; `minTouchHeight: 44px`; `/?preview=oanquan3d` bảo toàn PASS.
- **Acceptance criteria:** AC Pre-build anatomy/states PASS; AC React Router (`/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*`) + hard reload + Back/Forward + focus/scroll PASS; AC `/games` Pavilion + VIS-006 + 2 asymmetric showcases + Phygital band PASS; AC `/games/fact-act` original deck + Fact→Act→Reflection + no fake Play PASS; AC `/games/o-an-quan-xanh` 5 topics + 3 levels + verbatim VIS-008 disclosure + clearly labeled 3D sandbox link PASS; AC Hero V4 & PR #5 3D sandbox preservation PASS; AC global `npm run typecheck` bị chặn bởi lỗi có sẵn tại `prototypeOnlyModel.ts:24` (PR #5); AC `lint` NOT RUN.
- **Bugs / tradeoffs / risk:**
  - `npm run typecheck` toàn repo sẽ xanh hoàn toàn sau khi PR #5 sửa `src/features/oanquan/prototypeOnlyModel.ts:24`.
  - `VIS-006` & `VIS-008` mới qua D2 file QA; phê duyệt D1 artwork cuối cùng và quyền phát hành thương mại (`BR-T002`) vẫn đang mở — chỉ dùng cho phát triển/prototype nội bộ.
  - Khi deploy production static hosting (Vercel/Netlify/Cloudflare Pages) cần bổ sung cấu hình SPA fallback rewrite về `/index.html`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có thư mục `.git`).
- **What remains / next task:** Codex rà soát diff `BR-T004`, kiểm chứng lại trên nhánh Git sau PR #5 (gồm `typecheck`, `build`, unit 17/17, axe-core/Playwright), rồi mở PR review. Song song tiếp tục `BR-T005` và chốt D1/`BR-T002`.
- **Owner approval required:** Duyệt PR `BR-T004`; chốt D1 cuối cùng cho `VIS-006`/`VIS-008` và quyền phát hành thương mại (`BR-T002`) trước khi public release.



## Session: 2026-11-20 18:45+07:00 — Google AI Studio — Master Integrated Website Build (R0 Unification & Functional Delivery)

- **Task & goal:** Tái cấu trúc và thống nhất toàn diện Brainroot 2.0 thành **một thế giới liền mạch duy nhất** (neo theo bảng màu và ánh sáng Hero V4) kèm trải nghiệm giáo dục R0 chạy thật trên đủ 10 tuyến (`/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `*` + bảo toàn `/?preview=oanquan3d`), nâng cấp mặt bàn 3D Ô ăn quan xanh bằng Three.js và giữ trung thực tuyệt đối với các câu hỏi mở (`BR-T002`, `BR-T005`, `OQ-01..OQ-13`).
- **Status before → after:** `BR-T004` (`IN_REVIEW`) + `BR-T006`/`BR-T007`/`BR-T011` (`TODO` → `IN_REVIEW` chờ Codex QA/PR và nội dung duyệt `BR-T005`); `BR-T005` giữ `BLOCKED`; `BR-T002` giữ `BLOCKED` cho phát hành thương mại.
- **Files changed:**
  - `package.json`, `package-lock.json` — Cài đặt `three` và `@types/three` cho bàn gỗ 3D Ô ăn quan xanh (giữ chuẩn React 19 + TypeScript + Vite 7 + CSS modular, không cài Tailwind).
  - `src/features/oanquan/prototypeOnlyModel.ts` — Sửa lỗi `TS6133` có sẵn tại dòng 24 (`(x, i)` → `(_x, i)`) giúp `npm run typecheck` xanh toàn repo, đồng thời bổ sung giao diện `OAnQuanRuleset` & `SANDBOX_RULESET` sẵn sàng cho luật chính thức sau khi chốt `OQ-08` (lưu ý chồng lấn PR #5 để Codex đối chiếu).
  - `src/features/oanquan/threeBoardRenderer.ts` (mới), `OAnQuanTabletopExperience.tsx` (mới), `OAnQuan3DPrototype.tsx`, `oanquan-standalone.css` (mới) — Nâng cấp mặt bàn WebGL2 sơ khai sang bàn gỗ sồi mật ong Three.js có 12 hốc khoét 3D thật (2 ô Quan lớn + 10 ô Dân) trên lòng gỗ óc chó sẫm, viền khảm xanh sage, sỏi sông tròn đa sắc, bóng tiếp xúc mềm, ánh sáng ấm trái-trên + `RoomEnvironment`, render theo nhu cầu (`requestRender()`, không vòng lặp rảnh), bảo vệ phần mềm WebGL (`isSoftwareGl`), hiệu ứng hạt nhảy 320ms tôn trọng `prefers-reduced-motion`, tự căn khoảng cách camera cho màn hình di động hẹp, kéo xoay nhẹ, lưới 12 ô điều khiển mũi tên bàn phím và dự phòng WebGL mất ngữ cảnh.
  - `src/features/factAct/factActModel.ts` (mới) & `src/pages/FactActTrialPage.tsx` (mới) — Dựng máy trạng thái hữu hạn hoàn chỉnh (`idle → fact → action → feedback → reflection → complete` + chơi lại) tại `/games/fact-act/play`, tách biệt hoàn toàn `APPROVED_PUBLIC_CARDS = []` với 3 tình huống `INTERNAL_DEMO_FIXTURES` (`reviewStatus: 'internal_demo_fixture'`, `publicTrialAllowed: false`), gắn nhãn minh bạch chờ `BR-T005`, không lộ thẻ vật lý trả phí, không bịa trích dẫn/URL/số liệu.
  - `src/features/quest/greenQuestModel.ts` (mới) & `src/pages/GreenQuestPage.tsx` (mới) — Dựng Green Quest Lite tại `/quest` (1 thử thách giảm ly nhựa dùng một lần trong 1 ngày, bắt đầu/hoàn thành/bỏ qua/phản tư tùy chọn/đặt lại, lưu cục bộ trình duyệt, ghi rõ tự ghi nhận, không đăng nhập/GPS/camera).
  - `src/data/learn.ts` (mới) & `src/pages/GreenLearnPage.tsx` (mới) — Dựng Green Learn Lite tại `/learn` cho 5 chủ đề kỹ năng xanh (mục tiêu học tập, bối cảnh học đường, thói quen nhỏ, câu hỏi phản tư, điều hướng trước/sau, gắn nhãn bản thảo khung `draft_unapproved` chờ `BR-T005`).
  - `src/data/connectAbout.ts` (mới), `src/pages/GreenConnectPage.tsx` (mới), `src/pages/AboutPage.tsx` (mới) — Dựng `/connect` và `/about` trung thực theo sứ mệnh, bối cảnh thử nghiệm ULIS/Hà Nội và bảng minh bạch trạng thái R0; ghi rõ kênh liên hệ chính thức chưa công bố (0 email/MXH/đối tác bịa).
  - `src/components/garden/GardenPrimitives.tsx` (mới), `src/components/landing/EcosystemSection.tsx`, `FeaturedGreenPlaySection.tsx` (mới), `AboutSection.tsx`, `SiteFooter.tsx`, `src/pages/HomePage.tsx` — Thống nhất trang chủ H01–H06: bảo toàn Hero V4, thêm chuyển cảnh vườn đá bước chân `H02`, minh họa đồng bộ cả 4 khu vực ở `H03` (loại bỏ hoàn toàn thẻ icon Unicode phẳng), khối nổi bật Green Play `H04`, hành trình 5 bước sinh trưởng tương tác `H05` (`VIS-010`) và chân trang sinh thái `H06`.
  - `src/pages/FactActDetailPage.tsx`, `src/pages/OAnQuanXanhDetailPage.tsx`, `src/components/games/GameProductShowcase.tsx`, `src/data/games.ts`, `src/data/landing.ts`, `src/utils/routeNavigation.ts`, `src/App.tsx`, `src/styles/unified-world.css` (mới), `src/styles.css` — Nối 10 tuyến thật không liên kết chết, tích hợp bàn gỗ 3D + bảng khám phá 5 chủ đề × 3 cấp độ ngay trên `/games/o-an-quan-xanh` và tách riêng `VIS-008` làm tài liệu đối chiếu định hướng nghệ thuật.
  - `tests/r0-integration.test.ts` (mới), `tests/br-t003.test.ts`, `tests/br-t004.test.ts` — Mở rộng bộ kiểm thử đơn vị lên 24 test.
- **Tests actually executed:**
  - `npm run typecheck`: **PASS** (`tsc --noEmit` 0 lỗi toàn repo).
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (24/24)** (`br-t003` 5/5, `br-t004` 7/7, `br-t023` 5/5, `r0-integration` 7/7).
  - `npm run build` (`vite build`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000`): **PASS** sau 2 vòng chụp ảnh & sửa lỗi — Vòng 1 phát hiện và sửa 4 lỗi thật: (1) tràn ngang 108px trên `/games/o-an-quan-xanh` ở 390px do CSS Grid `1fr` thiếu `minmax(0, 1fr)`/`min-width: 0`, (2) mặt bàn 3D ban đầu bị thừa sáng + mặt gỗ đặc che hốc + vết nối texture gỗ dọc → nâng cấp khoét lỗ 3D thật trên nền gỗ óc chó + texture không vết nối + ánh sáng ấm cân bằng, (3) ảnh dưới nếp gấp H04/`/games` giải mã chậm khi chụp full-page → chuyển `decoding="sync"`, (4) bổ sung co giãn khoảng cách camera 3D trên màn hình di động hẹp. Vòng 2 xác nhận 0 lỗi console/pageerror, 0 ảnh vỡ, 0 tràn ngang trên `1440×900`, `1280×800`, `768×1024`, `390×844`, `320×740`, zoom 200% (`720×450`), `prefers-reduced-motion`, hard reload sâu, E2E Fact–Act đủ 3 thẻ + replay, E2E bàn 3D + mũi tên + 5×3 explorer, E2E Green Quest + Green Learn.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có thư mục `.git`).
- **What remains / next task:** Codex rà soát diff & hòa giải chồng lấn PR #5 (`src/features/oanquan/`), chạy QA độc lập/axe-core và mở PR review; đội nội dung thực hiện `BR-T005` để duyệt thẻ mẫu công khai, nguồn Green Learn, luật `OQ-08` và kênh liên hệ chính thức.


## Session: 2026-11-20 22:50+07:00 — Google AI Studio — GitHub Pages Deployment Prep

- **Task & goal:** Chuẩn bị triển khai website lên GitHub Pages tại `https://quanggaming418-debug.github.io/brainroot-2.0/`.
- **Status before → after:** `IN_REVIEW` → `IN_REVIEW` (Sẵn sàng deploy qua GitHub Actions).
- **Read context:** `AGENTS.md`, `vite.config.ts`, `src/App.tsx`, `src/utils/assetUrl.ts`, `planning/PROJECT_STATE.md`, `planning/TASKS.md`.
- **Files changed:**
  - `vite.config.ts` — Thêm `base: '/brainroot-2.0/'`.
  - `src/App.tsx` — Thêm `basename="/brainroot-2.0"` vào `<BrowserRouter>`.
  - `src/utils/assetUrl.ts` (mới) — Tiện ích xử lý URL tài sản tĩnh thích ứng với `BASE_URL`.
  - `src/data/landing.ts`, `src/data/games.ts` — Sử dụng `getAssetUrl` cho các đường dẫn ảnh tĩnh.
  - `.github/workflows/deploy.yml` (mới) — Tạo GitHub Actions workflow tự động build & deploy lên GitHub Pages khi push lên `main`.
- **Tests actually executed:**
  - `npm run typecheck`: **PASS** (`tsc --noEmit` 0 lỗi toàn repo).
  - `npm run build` (`vite build`): **PASS**.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không chứa thư mục `.git`).
- **What remains / next task:** Commit & push mã nguồn lên nhánh `main` của kho chứa GitHub, sau đó bật GitHub Pages với Source = GitHub Actions trong cài đặt repository trên GitHub.

## Session: 2026-11-20 23:45+07:00 — Google AI Studio — BR-T022 (Homepage Visual Redesign V2 — Four Garden Windows)

- **Task & goal:** Thiết kế lại phần trang chủ từ sau Hero V4 theo concept **Four Garden Windows** đã duyệt, tích hợp đúng 4 ảnh WebP đã chuẩn bị tại `public/assets/home/garden/` (`green-play.webp`, `green-quest.webp`, `green-learn.webp`, `green-connect.webp`) qua `publicUrl()`, làm mượt chuyển cảnh Hero V4 → Four Worlds, đồng bộ H04–H06 theo phong cách Storybook 2.5D tiết chế, bảo toàn Hero V4 và cấu hình GitHub Pages (`BR-T024`), không mở rộng phạm vi tính năng mới.
- **Status before → after:** `BR-T022` `IN_PROGRESS` (intake 4 WebP xong) → `IN_REVIEW` (tích hợp UI trang chủ V2 hoàn chỉnh, chờ Product Owner duyệt ảnh chụp Desktop/Mobile và Codex review PR).
- **Read context:** `AGENTS.md`, `.agents/rules/brainroot-ui.md`, `planning/PROJECT_STATE.md`, `planning/TASKS.md`, `logs/HANDOFF.md`, `vite.config.ts`, `src/utils/publicUrl.ts`, `src/data/landing.ts`, `src/components/garden/GardenPrimitives.tsx`, `src/components/landing/{HeroSection,EcosystemSection,FeaturedGreenPlaySection,AboutSection,SiteFooter}.tsx`, `src/styles/{tokens,landing,green-play,unified-world}.css`, `tests/{br-t003,pages,r0-integration}.test.ts` và kiểm tra trực quan cả 4 ảnh WebP cùng `hero-garden-v4.webp`.
- **Files changed:**
  - `src/data/landing.ts` — Bổ sung `imageSrc` (qua `publicUrl('/assets/home/garden/*.webp')`) và `imageAlt` tiếng Việt mô tả chi tiết cho cả 4 khu vực trong `ECOSYSTEM_AREAS`; bọc `FEATURED_GREEN_PLAY.items[1].secondaryActionTo` bằng `publicUrl('/?preview=oanquan3d')` để tương thích subpath GitHub Pages.
  - `src/components/landing/EcosystemSection.tsx` — Tái thiết kế H03 thành hệ thẻ ngang **Four Garden Windows** 2×2 (khung minh họa Storybook 2.5D bên trái với nền chuyển sắc ấm theo từng khu vực + lá SVG chìm + ảnh WebP 1120×747 gốc; cột nội dung bên phải gồm nhãn trạng thái kiểu hạt giống tối giản không pill dày, tiêu đề, mô tả, ghi chú minh bạch và CTA rõ phân cấp).
  - `src/components/garden/GardenPrimitives.tsx` — Nâng cấp dải chuyển cảnh H02 (`GardenTransitionBand`) hòa màu từ đồng cỏ nắng Hero V4 sang Warm Ivory `#F8F3E9`, tạo các phiến đá bước chân vẽ mềm không viền cứng, hạ thấp đường lượn góc phải để không che nút `Cuộn xuống khám phá` của Hero V4; bổ sung tùy chọn lá SVG nhẹ (`withLeaves`) cho `BotanicalDivider`.
  - `src/components/landing/FeaturedGreenPlaySection.tsx`, `AboutSection.tsx`, `SiteFooter.tsx` — Đồng bộ tiêu đề nhỏ dạng hạt giống, khung cửa sổ bo mềm cho media H04, đưa nhãn ghi chú định hướng nghệ thuật Ô ăn quan xanh gọn vào mép dưới khung ảnh giúp hai thẻ H04 thẳng hàng tuyệt đối ở đường tiêu đề, đồng bộ trạng thái văn bản không pill dày và thêm điểm nhấn lá ở dải phân tách.
  - `src/styles/unified-world.css` — Viết lại hệ kiểu dáng H02–H06 theo ngôn ngữ Storybook 2.5D tiết chế (`Be Vietnam Pro`, `#F8F3E9`/`#A6C6B6`/`#E79A7C`/`#63894C`/`#263B31`, bo góc `26px`, bóng đổ ấm nhẹ), lưới 2×2 card ngang trên desktop, chuyển dọc mượt trên mobile (`<= 720px`), cân đối lại nhóm 5 tab H05 trên mobile (`3 + 2` căn giữa, hết nút lẻ hàng 3), và hỗ trợ đầy đủ `prefers-reduced-motion`.
  - `tests/br-t003.test.ts` — Thêm 1 unit test xác minh đủ 4 đường dẫn `/assets/home/garden/*.webp` qua `publicUrl()` và `imageAlt` tiếng Việt.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ quản trị và bàn giao.
- **User-visible behavior changed:** Toàn bộ trang chủ dưới Hero V4 nay liền mạch theo một ngôn ngữ minh họa Storybook 2.5D thống nhất: chuyển cảnh đồng cỏ mượt không đè nút cuộn Hero, 4 cửa sổ khu vực dùng đúng 4 minh họa WebP dạng card ngang 2×2 trên desktop và xếp dọc gọn trên mobile, các khối H04–H06 cân đối khoảng cách, typography và CTA; giữ nguyên toàn bộ tuyến điều hướng, nội dung và thông điệp minh bạch.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (27/27)**.
  - `npm run typecheck`: **PASS (`tsc --noEmit` 0 lỗi)**.
  - `npm run build` (`compile_applet` / `vite build`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000/brainroot-2.0/`): **PASS** sau 2 vòng kiểm chứng trực quan:
    - Vòng 1 phát hiện và sửa 4 điểm: (1) dải H02 phủ nhẹ lên nút `Cuộn xuống khám phá` ở góc dưới phải Hero V4 & viền đá bước chân hơi cứng → giảm chồng lấn, uốn thấp góc phải và chuyển đá sang sắc độ vẽ mềm; (2) tỷ lệ khung ảnh H03 hơi hẹp ngang khiến minh họa 3:2 còn khoảng trống dọc → mở rộng cột ảnh lên `46%` và tinh chỉnh tỷ lệ; (3) nút `Mở toàn bộ thư viện Green Play` ở H04 xuống dòng sớm và hai tiêu đề thẻ H04 lệch chiều cao do dòng disclosure → căn phải nút header và đặt disclosure gọn trong khung ảnh giúp lệch đường cơ sở = `0px`; (4) 5 tab hành trình H05 trên mobile `390px` bị lẻ 1 nút ở hàng 3 → chuyển sang flex căn giữa `3 + 2`.
    - Vòng 2 xác nhận trên Desktop (`1440×900`) & Mobile (`390×844`) + `prefers-reduced-motion`: 0 lỗi console/cảnh báo, 0 ảnh vỡ, 4/4 ảnh WebP tải đúng `1120×747` dưới `/brainroot-2.0/assets/home/garden/`, 0 tràn ngang (`1440/1440` & `390/390`), `featTitleTopDelta: 0`, `featBtnRightAligned: true`, chuyển trang `/games` & bấm tab H05 hoạt động. Ảnh chụp toàn trang lưu tại `.aistudio/artifacts/computer_use/homepage-v2-desktop-1440.png` và `.aistudio/artifacts/computer_use/homepage-v2-mobile-390.png`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
- **What remains / next task:** Product Owner xem ảnh chụp Desktop & Mobile để duyệt thẩm mỹ Homepage V2; Codex rà soát diff, chạy QA độc lập trên Git và mở PR review.

## Session: 2026-11-21 01:47+07:00 — Google AI Studio — BR-T022 (Homepage V2 — Final Visual Polish)

- **Task & goal:** Tinh chỉnh chất lượng thẩm mỹ cuối cho Four Garden Windows và chuyển cảnh Hero → H03 mà không thay đổi bố cục tổng thể đã duyệt, Hero V4, 4 asset WebP, router, game hay các trang con.
- **Status before → after:** `BR-T022` `IN_REVIEW` → `IN_REVIEW` (chờ Product Owner đối chiếu ảnh trước/sau và Codex QA/PR).
- **Read context:** `AGENTS.md`, `planning/PROJECT_STATE.md`, `planning/TASKS.md`, `logs/HANDOFF.md`, `src/data/landing.ts`, `src/components/landing/{EcosystemSection,FeaturedGreenPlaySection,AboutSection,SiteFooter}.tsx`, `src/components/garden/GardenPrimitives.tsx`, `src/styles/{landing,tokens,unified-world}.css`, `tests/{br-t003,br-t004,r0-integration}.test.ts` và kiểm tra trực quan 4 ảnh WebP cùng ảnh chụp trước/sau.
- **Files changed:**
  - `src/data/landing.ts` — Rút gọn `subtitle`, `description`, `note`, `ctaLabel` của 4 thẻ `ECOSYSTEM_AREAS` để giảm chiều cao/xuống dòng và tăng khoảng thở; thay thuật ngữ nội bộ `R0` và `BR-T005` trên trang chủ (kể cả `FOOTER_CONTENT.transparencyNote`) bằng diễn đạt tự nhiên, trung thực về trạng thái thử nghiệm / đang kiểm duyệt.
  - `src/components/landing/EcosystemSection.tsx` — Loại bỏ lớp `<svg className="garden-window-card__backdrop-leaf">` chứa hình tròn/lá mờ phía sau tranh minh họa; chuyển 4 ảnh dưới Hero sang `loading="lazy"` và `decoding="async"`.
  - `src/components/garden/GardenPrimitives.tsx` — Tinh chỉnh đường cong & độ đục của `gt-meadow-mist` trong `GardenTransitionBand` nằm gọn giữa đáy `scroll-hint` và đường cắt đáy `.hero`, đồng thời kéo dài mép đáy path + `shapeRendering="geometricPrecision"` cho `BotanicalDivider` và `GardenTransitionBand` để khử hoàn toàn đường kẻ ngang subpixel ở trình duyệt thật.
  - `src/styles/unified-world.css` — Chuyển nền `.worlds--garden-windows` sang `#f8f3e9` đồng nhất với divider phía dưới, tinh chỉnh `margin` nối mép `-1px/-2px`, bỏ CSS `.garden-window-card__backdrop-leaf`, bổ sung ánh sáng nền chạm đất dịu nhẹ dưới vật thể, cân tỷ lệ chủ thể `scale(1.07)` trên desktop và `aspect-ratio: 16/10` + `scale(1.06)` trên mobile (`<= 720px`), giảm chiều cao đồng đều cả 4 thẻ desktop xuống `295px`.
  - `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ và ảnh chụp trước/sau.
- **User-visible behavior changed:** Bốn thẻ Four Garden Windows gọn gàng và thoáng hơn rõ rệt (`295px` đồng đều trên desktop), minh họa cân đối không còn hình tròn/lá mờ nền, ngôn ngữ thân thiện không lộ mã nội bộ (`R0`, `BR-T005`), chuyển tiếp Hero → H02 → H03 liền mạch không hở mép cắt ngang Hero và không còn vết nối subpixel giữa các section; ảnh dưới Hero tải lazy/async mà không ảnh hưởng hiển thị.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (27/27)**.
  - `npm run typecheck`: **PASS (`tsc --noEmit` 0 lỗi)**.
  - `npm run build` (`compile_applet` / `vite build`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000/brainroot-2.0/`): **PASS** sau 2 vòng kiểm chứng trực quan trên `1440×900` và `390×844` + `prefers-reduced-motion`: 0 lỗi console/pageerror, 0 tràn ngang (`overflowX: 0`), 4/4 ảnh WebP có `loading="lazy"` & `decoding="async"` và giải mã đủ `1120×747`, 4 thẻ desktop cao đều `295px`, chuyển tab H05 (`Khơi gợi sự tò mò xanh`) và bấm CTA `/brainroot-2.0/games` hoạt động. Ảnh chụp lưu tại `.aistudio/artifacts/computer_use/homepage-v2-before-{desktop-1440,mobile-390}.png` và `homepage-v2-after-{desktop-1440,mobile-390}.png` (cùng bản chính `homepage-v2-{desktop-1440,mobile-390}.png`).
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
- **What remains / next task:** Product Owner đối chiếu ảnh trước/sau; Codex review diff với `BR-T024`/PR #5 và mở PR vào `main`.

## Session: 2026-11-20 17:30+07:00 — Google AI Studio — Website Branding, Typography, Content & Footer Audit

- **Task & goal:** Rà soát toàn bộ website Brainroot (10 tuyến SPA + `/?preview=oanquan3d`), lập báo cáo audit phân loại P0/P1/P2 và thực hiện chuẩn hóa thương hiệu công khai (**Brainroot**), hai tên sản phẩm chính thức (**Brainroot - Truth or Dare**, **Brainroot - Ô ăn quan xanh**), làm sạch toàn bộ mã nội bộ/thuật ngữ kỹ thuật khỏi UI công khai, tinh chỉnh typography tiếng Việt ngoài Hero V4 và tối ưu chiều cao Footer giảm 30–40% không dùng CSS `transform`/`scale`.
- **Status before → after:** `IN_REVIEW` → `IN_REVIEW` (báo cáo đầy đủ lưu tại `docs/WEBSITE_BRANDING_TYPOGRAPHY_CONTENT_AUDIT.md`, chờ Product Owner duyệt nội dung mở và Codex review diff/PR).
- **Read context:** `AGENTS.md`, `docs/DESIGN_SYSTEM.md`, `docs/PRD.md`, `docs/CONTENT_GUIDELINES.md`, `docs/UX_UI_MASTER_BLUEPRINT.md`, `planning/PROJECT_STATE.md`, `logs/HANDOFF.md`, toàn bộ `src/data/*`, `src/pages/*`, `src/components/*`, `src/features/*`, `src/styles/*`, `src/utils/routeNavigation.ts`.
- **Files changed:**
  - `docs/WEBSITE_BRANDING_TYPOGRAPHY_CONTENT_AUDIT.md` (mới) — Báo cáo kiểm toán đầy đủ (Executive Summary, bảng P0/P1/P2 BEFORE→AFTER, Typography Audit, Footer BEFORE/AFTER, danh sách hạng mục chờ PO xác nhận).
  - `src/data/landing.ts`, `src/data/games.ts`, `src/data/learn.ts`, `src/data/connectAbout.ts`, `src/utils/routeNavigation.ts` — Chuẩn hóa `Brainroot`, `Brainroot - Truth or Dare`, `Brainroot - Ô ăn quan xanh`; xóa toàn bộ `Brainroot 2.0`, `BR-T005`, `OQ-08`, `BR-T002`, `VIS-008`, `R0/R1`, `Lite`, `sandbox`, `mẫu nội bộ`, `Fact–Act` khỏi copy công khai; giữ trung lập mô tả Truth or Dare không bịa luật; bọc `sandboxNotice.href` qua `publicUrl()`.
  - `src/features/factAct/factActModel.ts`, `src/features/oanquan/prototypeOnlyModel.ts`, `src/features/oanquan/OAnQuan3DPrototype.tsx`, `src/features/oanquan/OAnQuanTabletopExperience.tsx` — Làm sạch chuỗi hiển thị công khai và tiêu đề/ARIA 3D; giữ nguyên 100% logic FSM, `APPROVED_PUBLIC_CARDS = []`, cơ chế Three.js và `localStorage`.
  - `src/components/landing/SiteHeader.tsx`, `src/components/landing/SiteFooter.tsx` — Đổi ALT logo sang `"Biểu trưng Brainroot"`; tái cấu trúc Footer thành 2 cột điều hướng cân đối 4×4 (`Hệ sinh thái` và `Sản phẩm & Dự án`).
  - `src/pages/FactActDetailPage.tsx`, `FactActTrialPage.tsx`, `OAnQuanXanhDetailPage.tsx`, `GreenQuestPage.tsx`, `GreenLearnPage.tsx`, `AboutPage.tsx`, `ScreenshotsGalleryPage.tsx` — Đồng bộ tên sản phẩm, tiêu đề, breadcrumb và xóa chuỗi nội bộ khỏi UI.
  - `src/styles/base.css`, `src/styles/green-play.css`, `src/styles/unified-world.css` — Thêm `body { line-height: 1.6 }`, nới tracking (`-0.024em`..`-0.026em`) & hạ `h1` trang con về `weight: 800` + `text-wrap: balance` ngoài Hero V4; rút gọn chiều cao Footer tự nhiên (không dùng `transform`/`scale`).
  - `tests/br-t004.test.ts`, `tests/r0-integration.test.ts` — Cập nhật assertion tên sản phẩm chính thức và bổ sung test #28 kiểm tra 0 rò rỉ chuỗi cấm trên toàn bộ public copy exports.
  - `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ quản trị và bàn giao.
- **User-visible behavior changed:** Toàn bộ website nhất quán dùng tên thương hiệu **Brainroot** và 2 tên sản phẩm **Brainroot - Truth or Dare**, **Brainroot - Ô ăn quan xanh**; không còn bất kỳ mã tác vụ nội bộ hay thuật ngữ kỹ thuật nào trên giao diện công khai; tiêu đề tiếng Việt thoáng hơn; Footer gọn hơn `36.5%` trên Desktop (`436px → 277px`) và `39.5%` trên Mobile (`817px → 494px`).
- **Tests actually executed:**
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (28/28)**.
  - `npm run typecheck`: **PASS (`tsc --noEmit` 0 lỗi)**.
  - `npm run build` (`vite build`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000/brainroot-2.0/`): **PASS** trên tất cả 11 tuyến (`1440×900` & `390×844`) — 0 lỗi console, 0 ảnh vỡ, 0 tràn ngang, 0 chuỗi cấm trên DOM & `<title>`, Footer Desktop `277px` (`-36.5%`) / Mobile `494px` (`-39.5%`), khởi chạy luồng chơi thử `/games/fact-act/play` hoạt động.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
- **What remains / next task:** Product Owner duyệt báo cáo `docs/WEBSITE_BRANDING_TYPOGRAPHY_CONTENT_AUDIT.md`, chốt luật chính thức **Brainroot - Truth or Dare**, hoàn tất `BR-T005`/`OQ-08`/kênh liên hệ chính thức; Codex review diff & mở PR.

## Session: 2026-11-20 18:10+07:00 — Google AI Studio — Public-Facing Footer & About Redesign

- **Task & goal:** Hoàn thiện Footer và trang Về Brainroot (`/about`), đồng thời đồng bộ phần giới thiệu thương hiệu trên Homepage theo tiêu chuẩn website giáo dục công chúng (loại bỏ ngôn ngữ báo cáo tiến độ/quản trị dự án khỏi khu vực thương hiệu chung, giữ nguyên các thông báo giới hạn thật tại trang sản phẩm và tài liệu quản trị nội bộ).
- **Status before → after:** `IN_REVIEW` → `IN_REVIEW` (chờ Product Owner nghiệm thu và Codex review diff/PR).
- **Read context:** `AGENTS.md`, `src/data/landing.ts`, `src/data/connectAbout.ts`, `src/components/landing/{SiteFooter,AboutSection}.tsx`, `src/pages/{AboutPage,GreenConnectPage}.tsx`, `src/styles/unified-world.css`, `tests/{br-t003,r0-integration}.test.ts`.
- **Files changed:**
  - `src/data/landing.ts` — Cập nhật `FOOTER_CONTENT` (`From Brainrot to Brainroot`, mô tả công khai, `© 2026 Brainroot`, `Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi.`), đồng bộ `ABOUT_CONTENT` và `LEARNING_JOURNEY_STAGES[4]` cho nhất quán thương hiệu công chúng, bỏ nhắc ULIS/kênh liên hệ/trạng thái kiểm duyệt ở phần giới thiệu thương hiệu chung.
  - `src/components/landing/SiteFooter.tsx` — Cập nhật hàng đáy Footer dùng `copyrightText` và `bottomSlogan`, giữ nguyên logo, hai cột điều hướng và bố cục gọn.
  - `src/data/connectAbout.ts` & `src/pages/AboutPage.tsx` — Thiết kế lại đầy đủ 3 phần trang `/about`: Section A (`CÂU CHUYỆN BRAINROOT` / `From Brainrot to Brainroot` / `SỨ MỆNH CỦA CHÚNG TÔI` + giới thiệu + giữ nguyên `GrowthJourneyGraphic` 5 giai đoạn), Section B (`Brainroot dành cho ai?` với 3 thẻ: *Người yêu khám phá*, *Lớp học cùng học, cùng chơi*, *Cộng đồng cùng lan tỏa*), Section C (`Bắt đầu hành trình xanh cùng Brainroot` với 3 CTA thật tới `/games`, `/quest`, `/learn`); loại bỏ hoàn toàn mục `"Bối cảnh triển khai và đối tượng phục vụ"` và bảng `"Minh bạch trạng thái hoàn thiện"`.
  - `src/pages/GreenConnectPage.tsx` — Đồng bộ nhãn CTA liên kết sang `/about` thành `"Khám phá câu chuyện Brainroot →"`.
  - `src/styles/unified-world.css` — Cập nhật selector hàng đáy Footer (`.site-footer__copyright`, `.site-footer__slogan-bottom`), tinh chỉnh viền nhẹ `.about-mission-box`, bổ sung `.about-start-panel` cho Section C và giữ lại `.world-next-strip` cho `GreenLearnPage`/`GreenQuestPage`.
  - `tests/r0-integration.test.ts` — Bổ sung test #29 kiểm tra Footer & About theo đúng nội dung công khai và không chứa cụm từ tiến độ dự án.
  - `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md` — Cập nhật hồ sơ và bàn giao.
- **User-visible behavior changed:** Footer và trang Về Brainroot trình bày rõ câu chuyện, sứ mệnh, đối tượng phục vụ và lối bắt đầu hành trình xanh dành cho công chúng; Footer giữ nguyên `277px` trên Desktop (`1440×900`) và thu gọn thêm từ `494px → 457px` trên Mobile (`390×844`).
- **Tests actually executed:**
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (29/29)**.
  - `npm run typecheck`: **PASS (`tsc --noEmit` 0 lỗi)**.
  - `npm run build` (`vite build` / `compile_applet`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000/brainroot-2.0/`): **PASS** tại `1440×900` & `390×844` — `0` tràn ngang, `0` lỗi console, Footer Desktop `277px` (`surface 246px`), Mobile `457px` (`surface 436px`), kiểm tra 3 CTA trên `/about` trỏ đúng `/games`, `/quest`, `/learn`, và `foundBanned: []`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
- **What remains / next task:** Product Owner duyệt giao diện Footer & About công khai; Codex rà soát diff và mở PR.

## Session: 2026-11-20 19:30+07:00 — Google AI Studio — BR-T025 (Brainroot - Truth or Dare V1 Production UI & Global VI/EN i18n)

- **Task & goal:** Xây dựng trọn vẹn giao diện tương tác **Brainroot - Truth or Dare V1** theo phong cách Storybook 2.5D tiết chế dùng đủ 19 SVG đã xác minh của `BR-T025` + mascot gốc `brainie.webp`/`rootie.webp`, tích hợp sách luật bìa cứng (2 trang desktop / 1 trang mobile), vòng quay Hình phạt Xanh 15 ô `?` (chỉ mở kết quả sau khi quay + nút Dừng không phạt), hộp thoại `FAQ Ngoại tuyến` gắn mascot Brainie (0 API key ở frontend), và chuyển đổi ngôn ngữ toàn website `VI / EN` đồng bộ + lưu `localStorage`; bảo toàn nguyên vẹn Hero V4, Four Garden Windows, Ô ăn quan 3D Three.js, React Router, cấu hình GitHub Pages (`base: '/brainroot-2.0/'`) và bản chơi thử cũ ở `?mode=legacy`.
- **Status before → after:** `BR-T025` UI integration: `TODO` → `IN_REVIEW` (chờ Product Owner duyệt thẩm mỹ, duyệt nạp nội dung PDF VI/EN 16 thẻ + pp.66–67 + 15 Hình phạt Xanh, và Codex QA/PR).
- **Files changed:**
  - `src/i18n/I18nContext.tsx`, `src/i18n/siteCopy.ts` (mới) — Hệ thống `VI / EN` toàn trang có lưu `localStorage` (`brainroot.locale.v1`), đồng bộ `<html lang>`, `document.title`, `<meta name="description">`, `og:description` mà không reset tuyến hay phiên chơi.
  - `src/utils/routeNavigation.ts`, `src/components/routing/RouteScrollAndFocus.tsx`, `src/App.tsx`, `src/components/landing/{SiteHeader,SiteFooter,HeroSection,EcosystemSection,FeaturedGreenPlaySection,AboutSection}.tsx`, `src/components/common/Breadcrumbs.tsx`, `src/components/garden/GardenPrimitives.tsx`, `src/components/games/GreenPlayPavilionBanner.tsx`, `src/pages/{GameLibraryPage,FactActDetailPage,OAnQuanXanhDetailPage,GreenQuestPage,GreenLearnPage,GreenConnectPage,AboutPage,NotFoundPage}.tsx`, `src/features/oanquan/{OAnQuanTabletopExperience,OAnQuan3DPrototype}.tsx`, `src/styles/landing.css` — Tích hợp công tắc `VI / EN` trên header desktop/mobile và bản dịch đầy đủ toàn site (giữ nguyên toàn bộ export tiếng Việt cũ trong `src/data/*`).
  - `src/features/truthOrDare/{truthOrDareData,truthOrDareEngine,TruthOrDareCardStage,GreenPenaltyWheelModal,HardcoverRulebookModal,BrainieFaqPopover,TruthOrDareExperience}.tsx/.ts` (mới) — Máy trạng thái thuần bất biến (Arrival → Trộn ngay → Chọn Brainie Truth / Rootie Dare trước khi rút với khóa không chọn Truth 2 lượt liên tiếp → Rút → Lật 2 mặt chỉ mở đúng mặt đã chọn → Xong / Bỏ qua → Vòng quay 15 ô `?` + Dừng an toàn), sách luật bìa cứng (lật trang bằng nút + `ArrowLeft`/`ArrowRight`/`Escape`, giảm chuyển động), Brainie `FAQ Ngoại tuyến` (khớp theo ngôn ngữ + ranh giới từ, từ chối trung thực ngoài phạm vi, tài liệu hóa kiến trúc proxy `gemini-3.5-flash` phía server).
  - `src/styles/truth-or-dare-v1.css` (mới), `src/styles.css`, `src/pages/FactActTrialPage.tsx` — Kiểu dáng Storybook 2.5D tiết chế dùng CSS chuẩn; nạp lười `TruthOrDareExperience` mặc định tại `/games/fact-act/play` và giữ nguyên `LegacyFactActTrialView` tại `?mode=legacy`.
  - `tests/truth-or-dare-v1.test.ts` (mới) — 10 unit test bao phủ FSM, cấm Truth liên tiếp, non-repeating 16 thẻ, góc quay vòng 15 ô, kiểm kê đủ 21 asset trong `public/`, Offline FAQ, 0 API key và i18n VI/EN.
- **Tests actually executed:**
  - `npx --yes tsx --test tests/*.test.ts`: **PASS (39/39)** (bắt và sửa thành công lỗi khớp chuỗi con chéo ngôn ngữ `'the'` trong `answerBrainieFaq` trước khi vào trình duyệt).
  - `npm run typecheck`: **PASS (`tsc --noEmit` 0 lỗi toàn repo)**.
  - `npm run build` (`compile_applet` / `vite build`): **PASS**.
  - `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
  - Playwright Chromium headless (`http://localhost:3000/brainroot-2.0/`): **PASS** qua 2 vòng kiểm chứng trực quan (`1440×900`, `390×844`, `320×568`, `prefers-reduced-motion`):
    - Vòng 1 phát hiện và sửa 4 lỗi thật: (1) `modal_frame.svg` cắt ngang phụ đề hộp thoại vòng quay và `backdrop-filter: blur(4px)` làm kẹt chụp ảnh trên Chromium không GPU khi vòng quay xoay 1800° → đưa `modal_frame.svg` bọc gọn khung vòng quay và thay nền mờ bằng scrim ấm; (2) mã thẻ `TD-xx` hơi sát viền phải trong lá bài lật → tăng padding ngang `30px`; (3) tiêu đề `"Brainroot - Truth or Dare"` ở Arrival bị rơi từ `"Dare"` xuống dòng → cân lại cột mascot và cỡ chữ; (4) thanh tiêu đề mobile ở `320px` hơi khít giữa `brainroot.` và công tắc `VI/EN` → thêm `@media (max-width: 380px)`.
    - Vòng 2 xác nhận 0 lỗi console, 0 ảnh vỡ, 0 tràn ngang (`1440/1440`, `390/390`, `320/320`), 18 ảnh chụp toàn luồng lưu tại `.aistudio/artifacts/computer_use/truth-or-dare-v1/`, xác nhận giữ nguyên phiên chơi khi đổi `VI → EN`, xác nhận lưu `localStorage` qua reload và xác nhận rollback `?mode=legacy`.
- **Git commit SHA:** `NOT COMMITTED` (workspace AI Studio không có `.git`).
- **What remains / next task:** Product Owner duyệt bộ ảnh chụp 18 màn hình & cấp quyền nạp nguyên văn 16 cặp thẻ VI/EN, trang luật PDF pp.66–67 và 15 Hình phạt Xanh vào các slot sẵn có trong `truthOrDareData.ts`; Codex review diff trên Git & mở PR.
