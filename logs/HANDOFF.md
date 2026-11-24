# HANDOFF — Current baton pass

## 2026-11-24 — BR-T040 tích hợp website chính · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t040-main-site-integration` trên BR-T039 `d1e3483`; không push/PR/merge/deploy.
- **Chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/ → Trò chơi → Ô ăn quan xanh → nút chơi (hoặc trực tiếp `/brainroot-2.0/games/o-an-quan-xanh/play`). Local dùng đủ 100 thẻ gốc.
- **Bật/tắt:** production mặc định tắt. `VITE_ENABLE_OQV2=true npm run build` để bật (chỉ thẻ DEMO). `VITE_ENABLE_OQV2=false npm run dev` để thử cấu hình tắt ở dev. Kiểm tra: `node scripts/check-oqv2-isolation.mjs`.
- **Điều kiện trước production:** Điều kiện trước khi bật V2 ở production: (1) Product Owner cho phép bật `VITE_ENABLE_OQV2=true`; (2) thẻ chính thức được duyệt công bố (hiện production chỉ có thẻ DEMO tự viết, 100 thẻ gốc chỉ nội bộ — OQ-18); (3) quyết định bộ thẻ riêng cho 2 Ô Quan (OQ-17, đang ánh xạ tạm); (4) luật PLAYTEST_V1 được nhóm chốt (OQ-08, OQ-15, OQ-16 còn mở); (5) quyền sử dụng/bản quyền asset V3 và Brainie/Rootie cho phát hành (BR-T002); (6) QA thiết bị thật + axe/lint; (7) quyết định số phận prototype 3D / `/games/o-an-quan-xanh` theo ADR-0006 (5 điều kiện nghiệm thu thay thế).
- **Không stage:** `brainroot-assets*/`, `tools/`, `internal-data/`.

## 2026-11-24 — BR-T039 hoàn thiện sản phẩm · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t039-oanquan-polish` trên BR-T038 `687ca55`; không push/PR/merge/deploy.
- **Chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html
- **Thay đổi:** `ui/audio.ts` (mới), `ui/{GameScreen,shared,OAnQuanV2App,Board,playback}.ts(x)`, `ui/oanquan-v2.css`. Engine, thẻ, linh vật không đổi.
- **Còn mở:** axe/lint chưa chạy; âm thanh chưa được người nghe đánh giá; thiết bị thật chưa thử.
- **Không stage:** `brainroot-assets*/`, `tools/`, `internal-data/`.

## 2026-11-24 — BR-T038 100 thẻ gốc vào bản chơi thử (nội bộ) · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t038-oanquan-content` trên BR-T037 `0d5db05`; không push/PR/merge/deploy.
- **Mở chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html (thanh dev hiện "thẻ nội bộ" khi nạp được bộ thật; "thẻ DEMO" khi thiếu).
- **Dữ liệu thật:** chỉ ở `internal-data/cards.internal.json` (gitignore, KHÔNG commit, không vào `dist/`). Máy khác muốn chơi bằng bộ thật phải tự có tệp này; không có thì tự dùng thẻ DEMO.
- **Quy tắc tự chấm:** chỉ thẻ có phương án trong phần Thử thách + đáp án "Chọn X" + không yêu cầu giải thích (6 thẻ). Còn lại đối phương bấm Đạt/Chưa đạt, đáp án mẫu nội tuyến.
- **Quyết định cần có:** `OQ-17` (bộ thẻ riêng cho 2 Ô Quan; hiện ánh xạ TẠM sang thẻ Cấp 3), `OQ-18` (quyền công bố + chốt 6 thẻ trắc nghiệm).
- **Kiểm thử:** typecheck PASS · unit 88/88 PASS · build PASS, quét `dist/` 0 nội dung thẻ · Playwright 3 ván PASS. Lint, thiết bị thật: NOT RUN.
- **Không stage:** `brainroot-assets*/`, `tools/`, `internal-data/`.

## 2026-11-24 — BR-T037 ArtPack V3 vào bản chơi thử · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t037-oanquan-v3-assets` trên BR-T036 `4c6a4eb` (BR-T035 `ba91740`, BR-T036 `4c6a4eb` đã commit cục bộ để bảo toàn; chưa push).
- **Mở chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html
- **Linh vật:** hai master trong gói khớp từng byte với `public/assets/hero-v4/{brainie,rootie}.webp` đã có trong repo → dùng thẳng file repo cho trạng thái mặc định; 10 pose khác lấy từ `mascots/poses/` (tách từ bảng đã duyệt). Không sửa, không sinh mới, không dùng mẫu cũ.
- **Asset:** 38 file trong `src/features/oanquan-v2/assets/` (chỉ dev); `src/features/oanquan-v2/ui/assets.ts` là nơi khai báo đường dẫn.
- **Chưa dùng:** `board/board_base_no_pits.svg`, `board/pit_*.svg` (tỉ lệ khác bàn hiện tại, sẽ méo khi kéo giãn), `hand/hand_sprite_strip_5x.png` (đã dùng 5 PNG rời).
- **Kiểm thử:** typecheck PASS · unit 82/82 PASS · build PASS, `dist/` không có asset V3 · Playwright 3 ván (1440×900, 390×844, 360×740 reduced motion) PASS. Lint, thiết bị thật: NOT RUN.
- **OQ-14 đã chốt (24/11):** quân Quan = bệ gỗ + Brainie/Rootie nguyên mẫu.
- **Tiếp theo:** BR-T038 (100 thẻ gốc) chờ Product Owner cung cấp tài liệu nguồn; không tự soạn câu hỏi.

## 2026-11-23 — BR-T036 thẻ một bước + bàn tay hoạt họa · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t036-oanquan-streamlined-challenge` trên BR-T035 `ba91740` (đã commit cục bộ để bảo toàn; chưa push).
- **Mở chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html
- **Thay đổi:** bỏ Trọng tài/S7; `ui/Challenge.tsx` một thẻ (trắc nghiệm tự chấm, câu mở đối phương chấm); `ui/Hand.tsx` bàn tay 4 pose; `content/demoCards.ts` thêm 5 thẻ trắc nghiệm; `ui/GameScreen.tsx`, `playback.ts`, CSS cập nhật.
- **Kiểm thử:** typecheck PASS · unit 82/82 PASS · build PASS, dist sạch V2 · Playwright 5 ván PASS. Lint, thiết bị thật: NOT RUN.

## 2026-11-23 — BR-T035 Ô ăn quan xanh V2: đại tu gameplay + hoạt ảnh · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t035-oanquan-gameplay-overhaul` xếp trên BR-T034 `7494d29` (chưa push).
- **Mở chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html (chỉ dev).
- **Luật:** `PLAYTEST_V1` trong `src/features/oanquan-v2/engine/rules.ts` (thay V0). Khác website tham khảo: bù hàng bằng mượn (tham khảo: trừ 5 điểm, thiếu thì xử thua); kết thúc khi hết hai quân Quan (tham khảo: khi hai Ô Quan trống hẳn) nên hạt còn trong Ô Quan không tính; mỗi lần ăn phải qua thẻ + Trọng tài.
- **File:** sửa `engine/{engine,rules}.ts`, `ui/{Board,Challenge,OAnQuanV2App}.tsx`, `ui/oanquan-v2.css`, `tests/oanquan-v2-engine.test.ts`; mới `ui/{GameScreen,shared}.tsx`, `ui/playback.ts`.
- **Kiểm thử:** typecheck PASS · unit 81/81 PASS · build PASS, `dist/` sạch V2 · Playwright 5 ván (desktop 1×/2×/4×, mobile 390/360, reduced motion) PASS. Lint, thiết bị thật: NOT RUN.
- **Không stage:** `brainroot-assets*/`, `tools/`.

## 2026-11-23 18:10 — BR-T034 Ô ăn quan xanh V2 bản chơi thử · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED**, nhánh `codex/br-t034-oanquan-v2-playtest` xếp trên commit BR-T033 `40dddfa` (chưa push).
- **Mở chơi thử:** `npm run dev` → http://localhost:5173/brainroot-2.0/dev/oanquan-v2.html (chỉ dev; không có trong `dist/`).
- **File mới:** `src/features/oanquan-v2/{engine,content,ui}/`, `tests/oanquan-v2-engine.test.ts`, `dev/oanquan-v2.html`, `.claude/launch.json` (cấu hình dev server cho Claude Code). Không sửa file production nào.
- **Kiểm thử:** typecheck PASS · unit 81/81 PASS · build PASS, `dist/` sạch V2 · Playwright tự chơi trọn ván ở 5 kích thước PASS · bàn phím 1 lượt PASS. Lint, thiết bị thật, trình đọc màn hình: NOT RUN.
- **Không stage:** `brainroot-assets*/`, `tools/oanquan-rules-form/` (Google Form đã dừng).
- **Việc tiếp:** Product Owner chơi thử; quyết định commit; sau đó mới tính tới đưa ra production (cần thẻ đã duyệt quyền, ASSET_AUDIT, cờ build theo ADR-0006).

## 2026-11-23 12:15 — BR-T032/BR-T033 Ô ăn quan xanh V2 (tài liệu, trước G1) · Claude Code → Product Owner & nhóm Brainroot

- **Trạng thái:** BR-T033 nghiệm thu **APPROVED WITH MINOR CORRECTIONS** (23/11); BR-T032 bản 1.1 nghiệm thu cùng. Chỉ tài liệu. **Commit cục bộ** trên nhánh dưới đây (chưa push/PR/merge/deploy), chờ nghiệm thu commit. **G1 chưa được phép bắt đầu.**
- **Nhánh / gốc / file bẩn:** `codex/br-t033-oanquan-docs` tạo từ `origin/main` `759c65e` sau `git fetch origin` (PR #14 BR-T030 và PR #15 BR-T031 đã merge). File sửa: `docs/ASSET_AUDIT.md`, `docs/DECISIONS.md`, `planning/{OPEN_QUESTIONS,TASKS,PROJECT_STATE}.md`, `logs/{HANDOFF,CODEX_LOG,WORK_LOG}.md`. File mới: `docs/decisions/0006-oanquan-v2-2-5d-architecture.md`, `docs/oanquan-v2/` (9 file). Không đụng worktree `br-t031-about-v43` và hai thư mục chưa track `brainroot-assets*/`.
- **Đã có:** tài liệu G0.5 nguyên văn (SHA-256 khớp gói); báo cáo readiness 1.1; ADR-0006 **ACCEPTED** (5 điều kiện: G2 sau G1 PASS; prototype UI cần task riêng; feature flag loại module/asset/dữ liệu khỏi production bundle; kiểm `dist/` ở G2; không luật mặc định); phụ lục Matrix C-01…C-03; `OQ-14…OQ-16`; nháp Asset Audit.
- **Kiểm thử:** `npm run typecheck` PASS · `npx --yes tsx --test tests/*.test.ts` 62/62 PASS · `npm run build` PASS (chunk chính 1.042 kB, cảnh báo cũ) · `dist/` không chứa tài liệu/asset V2. Lint NOT RUN (không có script).
- **Còn chặn G1:** 20 mục nhóm A (R0–R12, R14–R17, R24–R26) · `OQ-15` C-02 kho 5 lọ · `OQ-16` C-03 rải qua Ô Quan · giao Task ID G1 (chỉ sau khi có quyết định luật chính thức). ADR-0006 và thứ tự G2 sau G1 đã được Product Owner chốt.
- **Không chặn G1 nhưng chặn G2/G3:** `OQ-14` C-01, nhóm B (R13, R18–R22), tablet/ngang, Asset Audit, Token V3, nguyên văn 100 thẻ.
- **Việc đầu tiên cho agent tiếp theo:** không viết engine, không tạo task G1. Chờ Product Owner nghiệm thu commit BR-T033 và quyết định push/PR. Khi nhóm trả lời, ghi đáp án vào ADR/`OPEN_QUESTIONS` rồi mới đề xuất task G1.
- **Đọc trước:** `docs/oanquan-v2/README.md`, `docs/oanquan-v2/BR-T032_TECHNICAL_READINESS_REPORT.md` §2.2, §4, §7.
- **Cần Product Owner duyệt trước:** push/PR/merge, gửi phụ lục cho nhóm, mọi việc G1, mọi prototype UI độc lập (task riêng).

## 2026-11-21 — BR-T028 Truth or Dare 20 thẻ thật · Claude Code → Product Owner & Codex

- **Trạng thái:** `IN_REVIEW`, **NOT COMMITTED** (nhánh `codex/br-t028-tod-20-cards`, nền `0379bee`). Chờ Quang duyệt và cho phép commit/PR.
- **Đã làm:** 20 thẻ thật (ADR-0005), luật 5 bước, Green Penalty thật (5 gợi ý trên 15 ô vòng quay), đồng hồ dare, rút+lật một chạm, nội dung `/games/fact-act` thống nhất, sửa mobile. Chi tiết: `logs/BR-T028_BASELINE_BEFORE.md`, `logs/CODEX_LOG.md`.
- **Kiểm thử:** typecheck PASS, unit 43/43 PASS, build PASS, trình duyệt 375/768/desktop PASS; lint/reduced-motion/320px/thiết bị thật NOT RUN.
- **Việc tiếp:** (1) Quang duyệt chủ đề từng thẻ; (2) P1 #7 chọn người chơi tiếp theo (tuỳ chọn); (3) P2 trong `planning/ROADMAP.md` cho 24h chung kết; (4) Codex QA diff + smoke test sau deploy.

## 2026-11-20 (19:30) — BR-T025 Truth or Dare V1 UI & Global VI/EN i18n · Google AI Studio → Product Owner & Codex

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Bảo toàn nguyên vẹn Hero V4, Four Garden Windows 4 WebP, Ô ăn quan 3D Three.js, React Router, cấu hình GitHub Pages (`base: '/brainroot-2.0/'`) và bản chơi thử cũ tại `/games/fact-act/play?mode=legacy` (rollback không rủi ro).
- **Phạm vi đã triển khai & xác minh:**
  - **Brainroot - Truth or Dare V1 (`/games/fact-act/play`):** Sử dụng đủ 19 SVG từ `public/assets/truth-or-dare/v1/experience/` + `brainie.webp` & `rootie.webp` qua `publicUrl()`. Đầy đủ 7 cảnh A–G: Arrival (`Chơi`/`Play`) → Trộn bài đa lớp tức thì → Chọn Brainie (`Truth`) hoặc Rootie (`Dare`) trước khi rút với **luật cấm chọn Truth 2 lượt liên tiếp** → Kéo lá trên cùng → Lật 2 mặt 3D chỉ mở đúng mặt đã chọn (`truth_face_base.svg` sage / `dare_face_base.svg` peach) → `Xong`/`Bỏ qua` → **Vòng quay Hình phạt Xanh 15 ô `?`** chỉ mở kết quả sau khi dừng + nút `Dừng` không phạt, không lặp thẻ trong phiên.
  - **Sách luật bìa cứng (`HardcoverRulebookModal.tsx`):** Mở bìa cứng → 2 trang trải rộng trên desktop (`>= 768px`) / 1 trang trên mobile (`< 768px`), hỗ trợ phím `ArrowLeft`/`ArrowRight`/`Escape` và `prefers-reduced-motion`.
  - **Brainie `FAQ Ngoại tuyến` (`BrainieFaqPopover.tsx`):** Nút nổi dùng `brainie.webp` gốc + hộp thoại gọn gắn nhãn `FAQ Ngoại tuyến`/`Offline FAQ`, trả lời đúng luật đã xác nhận, từ chối trung thực câu ngoài phạm vi, 0 API key ở frontend, kèm đặc tả proxy server-side `gemini-3.5-flash` trong `FUTURE_GEMINI_PROXY_ARCHITECTURE`.
  - **Chuyển ngôn ngữ toàn site `VI / EN` (`src/i18n/I18nContext.tsx`, `src/i18n/siteCopy.ts`):** Công tắc `VI / EN` ở header desktop/mobile đồng bộ với nút ngôn ngữ trên bàn chơi, lưu `localStorage` (`brainroot.locale.v1`), cập nhật `<html lang>`, `document.title`, `<meta name="description">` mà không làm mất tiến độ ván chơi.
  - **Cổng nội dung trung thực:** 16 cặp thẻ (`TD-01..TD-16`) và 15 ô hình phạt (`GP-01..GP-15`) giữ trường văn bản `null` (không bịa câu hỏi/hành động/hình phạt/trích dẫn PDF pp.66–67), sẵn sàng nạp nguyên văn ngay khi Product Owner phê duyệt.
- **Kiểm thử đã chạy thực tế:** `npx --yes tsx --test tests/*.test.ts` **PASS (39/39)** · `npm run typecheck` **PASS (0 lỗi)** · `npm run build` **PASS** · Playwright Chromium (`1440×900`, `390×844`, `320×568` + `prefers-reduced-motion` + `?mode=legacy`) **PASS (0 lỗi console, 0 ảnh vỡ, 0 tràn ngang)** · 18 ảnh chụp toàn luồng lưu tại `.aistudio/artifacts/computer_use/truth-or-dare-v1/` · `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
- **Bước tiếp theo:** (1) Product Owner duyệt trực quan bộ 18 ảnh chụp & phê duyệt nạp nguyên văn 16 cặp thẻ VI/EN + sách luật pp.66–67 + 15 Hình phạt Xanh; (2) Codex rà soát diff trên Git (đối chiếu PR #5 & `BR-T024`), chạy QA độc lập và mở PR review.

## 2026-11-20 — BR-T025 · Truth or Dare V1

- 19 SVG trang trí chờ review trên `codex/truth-or-dare-v1-assets`; tham khảo `design/truth-or-dare-v1/README.md` khi AI Studio được giao tích hợp. Kit gốc và dữ liệu chưa duyệt giữ ở staging cục bộ ngoài repo.

## 2026-11-20 (18:10) — Public-Facing Footer & About Redesign · Google AI Studio → Product Owner & Codex

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Bảo toàn nguyên vẹn Hero V4, mascot Brainie/Rootie, bộ 4 ảnh Four Garden Windows, logic Truth or Dare & Ô ăn quan 3D, thông báo giới hạn tại các trang sản phẩm/tính năng, React Router và GitHub Pages `base: '/brainroot-2.0/'`.
- **Tóm tắt thay đổi đã hoàn tất:**
  - **Footer (`src/data/landing.ts`, `SiteFooter.tsx`, `unified-world.css`):** Giữ logo, hệ màu, hai nhóm điều hướng 4×4; cập nhật slogan `"From Brainrot to Brainroot"`, mô tả công khai `"Khám phá kỹ năng xanh qua trò chơi, kiến thức và những hành động nhỏ trong cuộc sống hằng ngày."`, hàng đáy `"© 2026 Brainroot"` và `"Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi."`; xóa 2 ghi chú tiến độ/thí điểm cũ. Chiều cao Desktop giữ nguyên `277px` (`1440×900`), Mobile gọn hơn từ `494px → 457px` (`390×844`).
  - **Trang Về Brainroot (`/about` — `src/data/connectAbout.ts`, `AboutPage.tsx`):** Thay toàn bộ nội dung báo cáo tiến độ (`"Bối cảnh triển khai và đối tượng phục vụ"`, `"Minh bạch trạng thái hoàn thiện"`, bảng 4 hàng) bằng 3 phần giới thiệu công chúng: Section A (*CÂU CHUYỆN BRAINROOT*, *From Brainrot to Brainroot*, *SỨ MỆNH CỦA CHÚNG TÔI* + minh họa 5 giai đoạn), Section B (*Brainroot dành cho ai?* — 3 thẻ đối tượng), Section C (*Bắt đầu hành trình xanh cùng Brainroot* — 3 CTA thật tới `/games`, `/quest`, `/learn`).
  - **Đồng bộ thương hiệu chung (`src/data/landing.ts`, `GreenConnectPage.tsx`):** Đồng bộ `ABOUT_CONTENT`, bước 05 của `GrowthJourneyGraphic` và nhãn nút tới `/about` trên `/connect` để nhất quán hoàn toàn giữa Homepage, `/about` và Footer.
- **Kiểm thử đã chạy thực tế:** `npx --yes tsx --test tests/*.test.ts` **PASS (29/29)** · `npm run typecheck` **PASS (0 lỗi)** · `npm run build` **PASS** · Playwright Chromium (`1440×900` & `390×844`) **PASS** (`0` tràn ngang, `0` lỗi console, 3 CTA `/about` điều hướng đúng, `0` cụm từ tiến độ dự án) · `npm run lint`: **`NOT RUN`**.
- **Bước tiếp theo:** Product Owner nghiệm thu giao diện công khai mới; Codex rà soát diff trên Git (đối chiếu PR #5 & `BR-T024`) và mở PR.

## 2026-11-20 (17:30) — Website Branding, Typography, Content & Footer Audit · Google AI Studio → Product Owner & Codex

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Báo cáo kiểm toán đầy đủ lưu tại `docs/WEBSITE_BRANDING_TYPOGRAPHY_CONTENT_AUDIT.md`. Bảo toàn nguyên vẹn Hero V4, artwork mascot, 4 ảnh Four Garden Windows WebP, kỹ thuật 3D Three.js, FSM/localStorage, đường dẫn React Router và cấu hình GitHub Pages (`base: '/brainroot-2.0/'`).
- **Tóm tắt chuẩn hóa đã hoàn tất:**
  - **Thương hiệu & tên sản phẩm:** Đồng bộ 100% sang **Brainroot**, **Brainroot - Truth or Dare** và **Brainroot - Ô ăn quan xanh** trên toàn bộ 11 tuyến, `document.title`, breadcrumb, CTA, Footer và ALT ảnh (giữ nguyên 4 tên khu vực hệ sinh thái & giữ nguyên route `/games/fact-act`). Không tự bịa luật Truth or Dare, giữ mô tả trung lập và rõ ràng về luồng thử nghiệm sớm 3 bước *Tình huống → Hành động → Phản tư*.
  - **Vệ sinh nội dung công khai:** Loại bỏ hoàn toàn `Brainroot 2.0`, `BR-T005`, `OQ-08`, `BR-T002`, `VIS-008`, `R0/R1`, `Lite`, `sandbox`, `mẫu nội bộ`, `Fact–Act` khỏi giao diện công khai; bảo toàn trung thực mọi trạng thái chờ duyệt và câu chú thích `Minh họa khái niệm — luật bản số đang chuẩn hóa.`.
  - **Typography tiếng Việt:** Giữ `Be Vietnam Pro` (đúng định chuẩn dự án) và Hero V4; thêm `body { line-height: 1.6 }`, nới tracking tiêu đề ngoài Hero (`-0.024em`..`-0.026em`), hạ `h1` trang con từ `900 → 800`, bật `text-wrap: balance`.
  - **Tối ưu Footer (không dùng `transform`/`scale`):** Giảm chiều cao Desktop `1440×900` từ `436px → 277px` (**`-36.5%`**) và Mobile `390×844` từ `817px → 494px` (**`-39.5%`**) nhờ tái cấu trúc 2 cột cân đối 4×4, thu gọn dải sóng/padding và gom dòng chân trang.
- **Kiểm thử đã chạy thực tế:** `npx --yes tsx --test tests/*.test.ts` **PASS (28/28, gồm test #28 kiểm tra 0 rò rỉ chuỗi cấm)** · `npm run typecheck` **PASS (0 lỗi)** · `npm run build` **PASS** · Playwright Chromium (`1440×900` & `390×844`, 11 tuyến) **PASS (0 lỗi console, 0 ảnh vỡ, 0 tràn ngang, 0 chuỗi cấm)** · `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
- **Bước tiếp theo:** (1) Product Owner duyệt `docs/WEBSITE_BRANDING_TYPOGRAPHY_CONTENT_AUDIT.md`, chốt thể lệ chính thức & thẻ 2 mặt **Brainroot - Truth or Dare**, hoàn tất `BR-T005` / `OQ-08` / kênh liên hệ chính thức / `BR-T002`; (2) Codex rà soát diff trên Git (đối chiếu PR #5 & `BR-T024`) và mở PR review.

## 2026-11-21 (01:47) — BR-T022 Homepage V2 Final Visual Polish · Google AI Studio → Product Owner & Codex

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Bảo toàn nguyên vẹn Hero V4, 4 asset WebP, bố cục 2×2 desktop / dọc mobile, router, game, các trang con và cấu hình GitHub Pages (`BR-T024`).
- **Tóm tắt tinh chỉnh đã hoàn tất:**
  - **Rút gọn nội dung & loại thuật ngữ nội bộ (`src/data/landing.ts`):** Rút gọn phụ đề (1 dòng), mô tả (2–3 dòng) và ghi chú (1 dòng) của 4 thẻ `ECOSYSTEM_AREAS`, thay `R0` và `BR-T005` trên trang chủ (kể cả chân trang) bằng cách diễn đạt tự nhiên, trung thực về trạng thái thử nghiệm / bản thảo đang kiểm duyệt (không tuyên bố nội dung chưa duyệt là chính thức). Chiều cao 4 thẻ desktop giảm đều còn `295px`.
  - **Tối ưu khung hình minh họa & tải ảnh (`EcosystemSection.tsx`, `unified-world.css`):** Loại bỏ hình tròn/lá SVG mờ phía sau tranh, cân tỷ lệ chủ thể (`scale(1.07)` desktop, `16/10` + `scale(1.06)` mobile) trên nền ánh sáng mặt đất nhẹ, và chuyển 4 ảnh dưới Hero sang `loading="lazy"` + `decoding="async"`.
  - **Khử đường kẻ ngang bất thường (`GardenPrimitives.tsx`, `unified-world.css`):** Tinh chỉnh đường lượn `gt-meadow-mist` để che kín hoàn toàn mép đáy thẳng của `.hero` mà vẫn chừa thoáng nút `Cuộn xuống khám phá`, đồng bộ nền `#f8f3e9` cho `#worlds` và thêm overlap `-1px/-2px` + `shapeRendering="geometricPrecision"` triệt tiêu vết nối SVG subpixel.
- **Kiểm thử đã chạy thực tế:** `npx --yes tsx --test tests/*.test.ts` **PASS (27/27)** · `npm run typecheck` **PASS (0 lỗi)** · `npm run build` **PASS** · Playwright Chromium (`1440×900` & `390×844` + `prefers-reduced-motion`, 2 vòng) **PASS** (0 lỗi console, 0 tràn ngang, 4/4 ảnh WebP tải `loading="lazy"`/`decoding="async"` đủ `1120×747`, tab H05 & điều hướng `/games` hoạt động) · `npm run lint`: **`NOT RUN`**.
- **Ảnh chụp trước/sau sẵn sàng đối chiếu:** `.aistudio/artifacts/computer_use/homepage-v2-before-{desktop-1440,mobile-390}.png` và `.aistudio/artifacts/computer_use/homepage-v2-after-{desktop-1440,mobile-390}.png` (đồng bộ cùng `homepage-v2-{desktop-1440,mobile-390}.png`).

## 2026-11-20 (23:45) — BR-T022 Homepage Visual Redesign V2 (Four Garden Windows) · Google AI Studio → Product Owner & Codex

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Đã bảo toàn nguyên vẹn Hero V4 (`HeroSection.tsx`, `landing.css`) và cấu hình GitHub Pages (`BR-T024`: `vite.config.ts`, `publicUrl()`, `BrowserRouter basename`).
- **Tóm tắt thay đổi đã hoàn tất:**
  - Tích hợp đúng 4 ảnh WebP đã xác minh tại `public/assets/home/garden/` (`green-play.webp`, `green-quest.webp`, `green-learn.webp`, `green-connect.webp`) qua `publicUrl()` vào `src/data/landing.ts` và `src/components/landing/EcosystemSection.tsx`.
  - Thiết kế lại H03 (`#worlds`) theo concept **Four Garden Windows**: card ngang Storybook 2.5D (khung minh họa bên trái, nội dung & CTA bên phải), lưới 2×2 cân đối trên desktop, tự động xếp dọc gọn trên mobile (`<= 720px`) với nút CTA đủ vùng chạm `>= 44px`.
  - Nâng cấp dải chuyển cảnh H02 (`GardenTransitionBand`) nối mượt đồng cỏ Hero V4 xuống nền Warm Ivory `#F8F3E9` mà không che nút `Cuộn xuống khám phá`, đồng bộ typography, spacing, trạng thái văn bản tối giản (không pill dày), đường căn tiêu đề H04 (`FeaturedGreenPlaySection`), cân đối 5 tab H05 trên mobile và chân trang H06 (`SiteFooter`).
  - Sửa đường dẫn `/?preview=oanquan3d` trên H04 đi qua `publicUrl('/?preview=oanquan3d')` để chạy đúng dưới subpath `/brainroot-2.0/` của GitHub Pages.
- **Tệp đã sửa:** `src/data/landing.ts`, `src/components/garden/GardenPrimitives.tsx`, `src/components/landing/EcosystemSection.tsx`, `src/components/landing/FeaturedGreenPlaySection.tsx`, `src/components/landing/AboutSection.tsx`, `src/components/landing/SiteFooter.tsx`, `src/styles/unified-world.css`, `tests/br-t003.test.ts` (và hồ sơ quản trị `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md`, `logs/HANDOFF.md`).
- **Kiểm thử đã chạy thực tế:** `npx --yes tsx --test tests/*.test.ts` **PASS (27/27)** · `npm run typecheck` **PASS (0 lỗi)** · `npm run build` **PASS** · Playwright Chromium headless trên `http://localhost:3000/brainroot-2.0/` **PASS** qua 2 vòng trên `1440×900` & `390×844` + `prefers-reduced-motion` (0 lỗi console, 0 ảnh vỡ, 4/4 ảnh garden WebP `1120×747`, 0 tràn ngang, điều hướng `/games` & tab H05 hoạt động) · `npm run lint`: **`NOT RUN`** (`package.json` chưa có script `lint`).
- **Ảnh chụp toàn trang sẵn sàng duyệt:** `.aistudio/artifacts/computer_use/homepage-v2-desktop-1440.png` (Desktop 1440px) và `.aistudio/artifacts/computer_use/homepage-v2-mobile-390.png` (Mobile 390px).
- **Bước tiếp theo:** (1) Product Owner duyệt trực quan ảnh chụp Desktop & Mobile Homepage V2; (2) Codex đồng bộ diff vào Git, kiểm chứng độc lập trên nhánh PR và đối chiếu với `BR-T024`/PR #5; (3) Tiếp tục `BR-T005` (duyệt nội dung công khai) và `BR-T002` (quyền phát hành thương mại).

## BR-T022 — Garden asset intake · Codex → Google AI Studio

- 4 WebP đã xác minh trong `public/assets/home/garden/` trên nhánh `codex/garden-webp-intake`, chờ review/merge. AI Studio phụ trách thiết kế và tích hợp ở bước sau.

## 2026-11-20 — BR-T024 · GitHub Pages

- Nhánh `codex/github-pages-r0` từ R0 `db8b354`. Pages source đã là GitHub Actions; target trả 404 trước PR.
- Review quyền phát hành artwork và bản R0 trước merge. Sau merge, xác minh job `github-pages` cho commit main, HTTP 200 ở trang chủ và refresh deep link có asset đúng base.
- PR #5 QA Three.js/R0 và nội dung chưa duyệt vẫn theo dõi ở task riêng.

## 2026-11-20 (18:45) — Master Integrated Website Build (R0) · Google AI Studio → Codex & Product Owner

- **Trạng thái:** **`IN_REVIEW`** (`NOT COMMITTED` vì container AI Studio không có `.git`). Bảo toàn lịch sử trước đó; không tự đánh `DONE` cho `BR-T005` (`BLOCKED`), `BR-T002` (`BLOCKED` cho thương mại) hay các `OQ-01..13` (`OPEN`).
- **Tóm tắt phạm vi đã dựng & xác minh thực tế:**
  - **10 tuyến thống nhất không liên kết chết:** `/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `*` (và bảo toàn `/?preview=oanquan3d`).
  - **Trang chủ H01–H06 liền mạch:** Giữ nguyên Hero V4 (`H01`), thêm dải chuyển vườn đá bước chân `H02`, 4 minh họa đồng bộ cho 4 khu vực ở `H03` (xóa hoàn toàn thẻ icon Unicode phẳng), khối nổi bật Green Play `H04`, hành trình 5 bước sinh trưởng `H05`, chân trang sinh thái `H06`.
  - **Fact–Act Trial (`/games/fact-act/play`):** Máy trạng thái hữu hạn đầy đủ (`idle → fact → action → feedback → reflection → complete` + chơi lại), chạy trên 3 tình huống `INTERNAL_DEMO_FIXTURES` tách biệt khỏi `APPROVED_PUBLIC_CARDS = []` với bảng minh bạch `BR-T005`, không lộ thẻ trả phí, không bịa trích dẫn/URL.
  - **Ô ăn quan xanh 3D Three.js (`/games/o-an-quan-xanh` & `/?preview=oanquan3d`):** Bàn gỗ sồi mật ong có 12 hốc khoét 3D thật trên lòng gỗ óc chó, sỏi tròn đa sắc, render theo nhu cầu (`requestRender()`), `isSoftwareGl` guard, hop animation 320ms (tắt khi `prefers-reduced-motion`), điều khiển mũi tên bàn phím, dự phòng WebGL mất ngữ cảnh, gắn cùng bảng khám phá 5 chủ đề × 3 cấp độ (không gán tùy tiện ô vào chủ đề vì `OQ-08` vẫn mở) và tách riêng `VIS-008` làm tài liệu đối chiếu nghệ thuật.
  - **Green Quest Lite (`/quest`), Green Learn Lite (`/learn`), Green Connect (`/connect`), About (`/about`):** Có tương tác thực tế cục bộ/đọc 5 chủ đề và bảng minh bạch trung thực (0 email/MXH/số liệu bịa).
- **Cảnh báo xung đột PR #5 cho Codex:** Phiên này đã sửa `src/features/oanquan/prototypeOnlyModel.ts` (sửa lỗi `TS6133` dòng 24 `x → _x` và bổ sung `OAnQuanRuleset`/`SANDBOX_RULESET` giữ nguyên toàn bộ export cũ cho `tests/br-t023.test.ts`) và thay `OAnQuan3DPrototype.tsx` sang bọc `OAnQuanTabletopExperience`. Khi đồng bộ Git, Codex cần đối chiếu kỹ với nhánh PR #5 (`codex/br-t023-slice-b-qa`) để giữ lại mọi bản sửa QA/fallback của PR #5.
- **Kiểm thử đã chạy thực tế:** `npm run typecheck` **PASS (0 lỗi)** · `npx --yes tsx --test tests/*.test.ts` **PASS (24/24)** · `npm run build` **PASS** · Playwright Chromium (`1440×900`, `1280×800`, `768×1024`, `390×844`, `320×740`, zoom 200%, reduced motion, hard reload, E2E Fact–Act/3D/Quest/Learn) **PASS (0 lỗi console, 0 ảnh vỡ, 0 tràn ngang)** · `npm run lint`: **`NOT RUN`** (chưa có script `lint`).
- **Bước tiếp theo cho Codex & Đội nội dung:** (1) Codex rà soát diff, hòa giải PR #5, chạy kiểm thử độc lập + axe-core và mở PR review; (2) Đội nội dung chạy `BR-T005` để duyệt >=5 thẻ Fact–Act công khai + nguồn 5 chủ đề Green Learn + chốt `OQ-08` & kênh liên hệ chính thức; (3) Owner chốt quyền phát hành thương mại `BR-T002` và cấu hình SPA rewrite trước deploy.

## 2026-11-20 — BR-T004 · Google AI Studio → Codex & Product Owner

- **Trạng thái:** `BR-T004` → **`IN_REVIEW`** (Green Play UI/UX + React Router). Chưa tự đóng `DONE`; chờ Codex kiểm chứng độc lập trên nhánh Git và mở PR review. Workspace AI Studio không có `.git` (`NOT COMMITTED`).
- **Phạm vi đã triển khai:**
  - Cài `react-router-dom` và dựng điều hướng SPA cho `/`, `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*` (404), kèm `RouteScrollAndFocus` (`document.title`, cuộn đầu trang `instant` + focus `#main-content` khi `PUSH`/`REPLACE`, giữ nguyên `POP`, cuộn/focus `#hash` xuyên trang tôn trọng `prefers-reduced-motion`).
  - Bảo toàn nguyên vẹn Hero V4 (`/`), hoạt ảnh mascot và nhánh sandbox 3D `/?preview=oanquan3d` (không chạm bất kỳ tệp nào trong `src/features/oanquan/`, `src/styles/oanquan3d-prototype.css`, `tests/br-t023.test.ts` của PR #5).
  - Dựng `GameLibraryPage` (`/games` với `VIS-006`, 2 `GameProductShowcase` bất đối xứng cho Fact–Act & Ô ăn quan xanh, dải minh bạch Phygital, lối về `/`), `FactActDetailPage` (`/games/fact-act` giữ nguyên `fact-act-deck.webp`, chu trình `Fact → Act → Phản tư`, so sánh vật lý vs số, không nút chơi giả), `OAnQuanXanhDetailPage` (`/games/o-an-quan-xanh` với `VIS-008` + nhãn nguyên văn *"Minh họa khái niệm — luật bản số đang chuẩn hóa."*, đủ 5 chủ đề & 3 cấp độ theo `docs/GAME_SPEC.md`, liên kết tách biệt tới `/?preview=oanquan3d` ghi rõ là sandbox kỹ thuật nội bộ) và `NotFoundPage`.
  - Nối liên kết thật từ mục `Trò chơi` trên `SiteHeader` và thẻ `Green Play` trên `#worlds` sang `/games`; giữ 3 thẻ còn lại (`Green Quest`, `Green Learn`, `Green Connect`) trung thực ở trạng thái `Đang phát triển`.
- **Kiểm thử đã chạy thực tế:**
  - `npx --yes tsx --test tests/br-t003.test.ts tests/br-t004.test.ts tests/br-t023.test.ts`: **PASS (17/17)**.
  - `npx vite build`: **PASS** (72 modules).
  - `npm run typecheck`: **0 lỗi trong toàn bộ mã `BR-T004`**; vẫn trả mã thoát 2 do 1 lỗi có sẵn ở `src/features/oanquan/prototypeOnlyModel.ts:24` (`TS6133` — thuộc PR #5, cố tình không sửa để tránh xung đột).
  - `npm run lint`: **`NOT RUN`** (chưa có script `lint` trong `package.json`).
  - Playwright Chromium headless (`http://localhost:3000`): **PASS** cho 1440×900, 1280×800, 390×844, 320×740, zoom 200% (`720×450`) + `prefers-reduced-motion`, hard reload 4 route con/404, Back/Forward, `#about` xuyên trang, `Escape` đóng mobile drawer trả focus về `.nav-toggle`, `minTouchHeight: 44px`, `scrollAfterClick: 0`, `activeElementId: 'main-content'`, 0 lỗi console/pageerror và 100% ảnh WebP giải mã.
- **Lưu ý bản quyền & cổng duyệt:** `VIS-006` & `VIS-008` mới qua D2 file QA; phê duyệt D1 cuối cùng và bản quyền thương mại cho `fact-act-deck.webp`, Brainie/Rootie, `VIS-006`/`VIS-008` vẫn mở (`BR-T002` / `BR-T022`). Khi deploy static hosting cần bổ sung SPA rewrite về `/index.html`.
- **Bước tiếp theo cho Codex:** Đồng bộ diff `BR-T004` lên nhánh riêng (trên nền đã merge PR #5 để `npm run typecheck` xanh toàn repo), chạy kiểm thử độc lập + axe-core, ghi kết quả vào `logs/CODEX_LOG.md`, mở PR review (không tự merge). Song song đội nội dung chạy `BR-T005` để mở khóa `BR-T006`.

## 2026-11-20 — BR-T022 · Codex → Product Owner / AI Studio

- **Trạng thái:** BR-T022 `IN_PROGRESS`. Nhánh `codex/br-t022-asset-docs-intake` chứa intake VIS-006/VIS-008 và tài liệu BR-GAME-001. Xem kết quả QA ở CODEX_LOG.
- **Cổng kiểm duyệt:** Xác nhận D1 artwork cuối cho VIS-006, duyệt D1 VIS-008, xác minh quyền phát hành. D2 file PASS; banner thử riêng, chưa mount. Màn hình tích hợp chưa có. Hoàn thành các asset Wave 1A còn lại và anatomy/states trước BR-T004.
- **Mascot:** 9 pose chỉ được kiểm kê; nguồn và WebP prototype giữ local/internal chờ BR-T002.
- **Tiếp theo:** BR-T023 `TODO`. Sau khi owner duyệt S0, giao AI Studio dựng Slice A trong preview nội bộ. Dùng đặc tả và checklist BR-GAME-001, bàn giao diff và test cho Codex. OQ-08 vẫn mở; engine chính thức và multiplayer thuộc slice sau.

## 2026-11-20 (Closeout) — BR-T021 → BR-T022 · Google AI Studio → Codex & Product Owner

- **Trạng thái nhiệm vụ sau closeout:**
  - `BR-T021`: **`DONE`** (Product Owner phê duyệt ngày `2026-11-20` theo commit `0a735d189885` cho **GATE A** IA, **GATE B** Storyboard Rev 1.1, **GATE C** Visual Asset Register Rev 1.1 — chỉ phê duyệt đặc tả thiết kế, chưa phải artwork cuối).
  - `BR-T020`: **`DONE`** (hiệu chỉnh theo **PR #2** đã merge vào `main`).
  - `BR-T022`: **`TODO`** (mới thêm — *Wave 1A Visual Asset Production & Verification*, là tác vụ kế tiếp).
  - `BR-T004`: **`TODO`** (chưa bắt đầu; bị ràng buộc bởi `BR-T022` GATE D1+D2 và xác minh chi tiết component anatomy/states trước code).
- **Thay đổi đã thực hiện trong workspace AI Studio (không sửa React code, không tạo artwork):**
  - Đã kiểm tra `grep` (0 tham chiếu) và xóa tệp Master Prompt dư `public/assets/aistudio/Paste_November_20__2026_-_9_24AM_7af48852` cùng thư mục rỗng `public/assets/aistudio/`.
  - Đã cập nhật `docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`, `planning/VISUAL_ASSET_REGISTER.md`, `planning/UX_UI_CHECKLIST.md` (bảo toàn đủ 17 mục & tiêu chí bằng chứng 8 chiều), `planning/TASKS.md`, `planning/PROJECT_STATE.md`, `logs/AI_STUDIO_LOG.md`, `logs/WORK_LOG.md` và `logs/HANDOFF.md`.
  - Đã ghi nhận **2 cổng duyệt tài sản tách biệt** (`GATE D1: Artistic Quality Approval` & `GATE D2: Technical Integration Readiness`) và yêu cầu **xác minh chi tiết component anatomy/states trước khi triển khai `BR-T004`**.
- **Việc còn lại cần Codex thực hiện (vì workspace AI Studio không có `.git`):**
  1. Xác minh repo cục bộ, nhánh `main`, commit `0a735d189885` và lịch sử merge PR #2 bằng Git CLI.
  2. Rà soát toàn bộ diff của đợt closeout này (đặc biệt xác nhận đã xóa sạch `public/assets/aistudio/` và không chạm mã React).
  3. Append mục kiểm chứng vào **`logs/CODEX_LOG.md`** (AI Studio không tự ghi vào `CODEX_LOG.md` theo quy tắc tách log của `AGENTS.md`).
  4. Tạo nhánh riêng (ví dụ `codex/br-t021-closeout`), commit, push và mở **PR nhắm vào `main`** (không tự merge).
- **Trạng thái Git & kiểm thử:** `NOT COMMITTED` · Branch/PR: `NOT CREATED` · `grep` kiểm tra file dư: `PASS` (0 tham chiếu) · `typecheck`/`build`/`lint`/Playwright: `NOT RUN` (không thay đổi mã nguồn ứng dụng).
- **Tác vụ kế tiếp sau khi merge PR closeout:** **`BR-T022` — Wave 1A Visual Asset Production & Verification** (chạy song song `BR-T005` với đội nội dung; chưa mở `BR-T004`).

## 2026-11-20 (Rev 1.1) — BR-T021 · Google AI Studio → Product Owner & Reviewer (GitHub Sync)

- **Trạng thái:** `IN_REVIEW` (M0 — Master Design Blueprint Rev 1.1; **GATE A, GATE B, GATE C vẫn đang MỞ** chờ đồng bộ GitHub và kiểm tra trực tiếp Markdown).
- **7 điểm điều chỉnh Design Review đã tích hợp (chỉ tài liệu, không sửa mã ứng dụng, không cài dependency, không sinh ảnh):**
  1. **Đồng bộ minh họa 4 vùng (`docs/UX_UI_MASTER_BLUEPRINT.md`, `docs/UX_UI_STORYBOARD.md`, `planning/VISUAL_ASSET_REGISTER.md`):** Wave 1A loại bỏ thẻ icon Unicode phẳng ở Quest/Learn/Connect bằng bộ minh họa vector-organic nhẹ đồng bộ (`VIS-003A..005A`) đi cùng `VIS-002`; Wave 1B nâng cấp lên tranh toàn cảnh (`VIS-003B..005B`).
  2. **Chuyển cảnh 3 trạng thái `H01 → H02 → H03` (`docs/UX_UI_STORYBOARD.md`):** Đặc tả rõ 3 trạng thái (*Trước khi rời Hero* / *Trong đoạn chuyển vườn* / *Khi bước vào 4 vùng*) cùng phối cảnh, cutout tán lá `VIS-009`, ánh sáng 35° trái-trên, căn trục lối đá 50%, liên tục màu sắc cho desktop & mobile (không dựa vào 1 đường cắt SVG đơn lẻ).
  3. **Tài sản sẵn sàng cho chuyển động (`planning/VISUAL_ASSET_REGISTER.md`):** Phân loại rõ 6 nhóm (`Flattened background illustration`, `Transparent foreground cutout`, `Independent animated object`, `Reusable SVG decoration`, `Actual product artwork`, `HTML/UI layer`), tách danh sách vật thể chuyển động độc lập và bảo toàn tuyệt đối Brainie/Rootie gốc.
  4. **Tái cân bằng lộ trình ưu tiên MVP giáo dục (`docs/UX_UI_MASTER_BLUEPRINT.md`):** `Wave 1A` → `M2 (BR-T004 Game Library)` → `M3 (BR-T006 Playable Loop)` không bị chặn bởi toàn bộ tranh trang chủ Wave 1B (`M1B`); `BR-T005` chạy song song cùng đội nội dung.
  5. **Đề xuất React Router cho `BR-T004` (`docs/UX_UI_MASTER_BLUEPRINT.md`):** Đặc tả đầy đủ bảng route, Back/Forward, khôi phục cuộn & focus, trang fallback `*`, yêu cầu SPA hosting fallback và điều hướng neo trang chủ/trang con (chưa cài `react-router-dom`).
  6. **Ngân sách hiệu năng ảnh theo tầng (`docs/UX_UI_MASTER_BLUEPRINT.md`, `planning/VISUAL_ASSET_REGISTER.md`):** Bỏ giới hạn cứng 70–120 KB; áp dụng Tier A–D theo kích thước hiển thị, tầm quan trọng, biến thể desktop/mobile, chất lượng nén, lazy-loading và đo thực tế LCP/CLS ở GATE F.
  7. **Checklist nghiệm thu 8 chiều độc lập (`planning/UX_UI_CHECKLIST.md`):** 17 hạng mục (`UX-001..017`) tách riêng 8 chiều (`UX`, `UI`, `Asset Avail`, `Asset Integ`, `Interact`, `A11y`, `Resp`, `Browser QA`) kèm bằng chứng và giới hạn đã biết (`PASS` 2/17, `IN_REVIEW` 2/17, `IN_PROGRESS` 1/17, `AWAITING_ASSETS` 6/17, `NOT_STARTED` 3/17, `BLOCKED` 3/17).
- **Trạng thái Git & kiểm thử:** `NOT COMMITTED` (workspace AI Studio không có `.git`; cần đồng bộ lên GitHub để kiểm tra diff). Mã nguồn `src/` giữ nguyên 100%; `typecheck`/`build`/`lint`/unit/Playwright `NOT RUN` trong phiên tài liệu này. Lưu ý đối chiếu trạng thái merge của `BR-T020` khi sync GitHub.
- **Bước tiếp theo đề xuất sau khi đóng GATE A/B/C:** Khởi động **Wave 1A Asset Production & Verification (GATE D)** (ưu tiên `VIS-006`, `VIS-008`, `VIS-009` + `VIS-002` & `VIS-003A..005A`, tận dụng `VIS-007` sẵn có) song song với **`BR-T005`** (đội nội dung duyệt >=5 mục Fact–Act), để mở khóa trực tiếp **`BR-T004` (Game Library)** rồi tới **`BR-T006` (Playable Loop)**.

## 2026-11-20 — BR-T021 · Google AI Studio → Product Owner & Codex

- **Trạng thái:** `IN_REVIEW` (M0 — Master Design Blueprint; dừng tại cổng phê duyệt **GATE A, GATE B, GATE C**).
- **Phạm vi đã thực hiện (chỉ tài liệu, không sửa mã ứng dụng, không sinh ảnh):**
  - `docs/UX_UI_MASTER_BLUEPRINT.md` — Kiểm toán hiện trạng, IA (R0 & tương lai), 6 hành trình người dùng, đặc tả `/games` & `/games/*`, Global Design System (15 components, responsive & zoom 200%), Motion & WCAG 2.2.2, Roadmap M0–M4, phản biện thiết kế.
  - `docs/UX_UI_STORYBOARD.md` — Kịch bản minh họa trang chủ H01–H06.
  - `planning/VISUAL_ASSET_REGISTER.md` — Kiểm kê `EX-001..009`, sổ đăng ký `VIS-001..010`, đề xuất Wave 1A tối giản & Production Briefs đầy đủ 13 mục.
  - `planning/UX_UI_CHECKLIST.md` — 18 mục kiểm soát (`UX-001..018`) & báo cáo `BRAINROOT UX/UI CHECKPOINT`.
- **Trạng thái Git & sai lệch phát hiện:** Workspace AI Studio không có `.git` (`NOT COMMITTED`). Mã nguồn `src/` đã có đủ `BR-T003` + `BR-T020`, nhưng `planning/TASKS.md` và `HANDOFF.md` trước phiên vẫn ghi `BR-T020` ở `IN_REVIEW` thay vì đã merge vào `main`; nhờ Codex/Owner đối chiếu commit trên GitHub khi sync.
- **Kiểm thử:** Kiểm kê thư mục `public/assets/hero-v4/` và xem ảnh `fact-act-deck.webp` PASS; `typecheck`/`build`/`lint`/Playwright `NOT RUN` do không thay đổi mã nguồn ứng dụng.
- **Bước tiếp theo duy nhất sau phê duyệt:** Owner duyệt GATE A/B/C → thực hiện **Đợt sản xuất & xác minh tài sản Wave 1A (GATE D)** (`VIS-006`, `VIS-008`, `VIS-002` + SVG `VIS-001/009/010` + dùng `VIS-007` sẵn có) trước khi mở M1 hoặc `BR-T004`.

## 2026-11-20 — BR-T020 · Codex → Product owner

- **Trạng thái:** `IN_REVIEW`, nhánh `codex/hero-ambient-motion`. PR nhắm vào `main`, chỉ để review.
- **Phạm vi:** `HeroSection.tsx`, `useHeroParallax.ts`, `landing.css` và tài liệu quyết định motion. Xem kiểm thử trong `CODEX_LOG.md`.
- **Điểm cần lưu ý khi review:** Quyết định dùng motion nền lặp liên tục ở chế độ mặc định có giới hạn WCAG 2.2.2, ghi trong `docs/ACCESSIBILITY.md`.
- **Tiếp theo:** Review BR-T020. BR-T004 chờ giao riêng.

## 2026-11-20 — Codex → Product owner

- **Task:** `BR-T003` — `DONE` theo kiểm thử độc lập cục bộ. `BR-T004` chờ giao riêng.
- **Git:** Nhánh `codex/br-t003-remediation`. HEAD `275f5ed4d64811c079540135ef42abc4d447b634` là bản triển khai của AI Studio. Bản sửa và `package-lock.json` ở working tree, **NOT COMMITTED**.
- **File:** `src/App.tsx`, các component trong `src/components/landing/`, `src/utils/focusAnchorTarget.ts`, `src/data/landing.ts`, `src/styles/{landing,tokens}.css`, `package-lock.json`, README và hồ sơ task.
- **Xác minh:** typecheck, build, unit (5/5), npm audit (0 lỗ hổng), Playwright Chromium 1440×900 / 390×844 / 320×740 và zoom 200% PASS. Axe 0 vi phạm tự động. Đã đo riêng tương phản trên nền Hero. Kiểm thử screen reader thật và lint **NOT RUN**. Chi tiết xem `CODEX_LOG.md`.
- **Tiếp theo:** Owner xem diff và duyệt commit nếu muốn lưu bản sửa. Giải quyết quyền xuất bản artwork theo BR-T002 và giao BR-T004 riêng.

## Bàn giao trước đó — Google AI Studio → Codex

**Last updated:** 2026-11-20 03:45+07:00  
**From agent:** Google AI Studio Build Mode  
**To agent:** Codex (review & verification)  
**Current active task:** `BR-T003` (`IN_REVIEW` — Design System, Application Shell & Hero V4 Integration)  
**Branch/commit:** `NOT COMMITTED` (AI Studio workspace has no `.git` directory; synchronize via supported GitHub workflow and inspect diff before merging).  
**Uncommitted changes:** All `BR-T003` React/TypeScript/CSS implementation, unit tests (`tests/br-t003.test.ts`), and governance updates listed in `logs/AI_STUDIO_LOG.md`.  
**Build/test status:** `npx --yes tsx --test tests/br-t003.test.ts` (5/5 PASS), `npm run typecheck` (PASS), `npm run build` (PASS), headless Chromium Playwright checks at 1440×900 / 390×844 / 320×740 & reduced motion (PASS, 0 console errors). `npm run lint`: `NOT RUN` (no lint script in `package.json`).

## Last completed work
- Converted `reference/hero-v4` into modular React 19 + TypeScript + standard CSS components (`SiteHeader`, `HeroSection`, `HeroBackground`, `MascotLayer`, `PrimaryCTA`, `EcosystemSection`, `AboutSection`, `SiteFooter`) using official assets from `/assets/hero-v4/`.
- Updated Ecosystem Introduction (`#worlds`) to include all **4 introductory areas**: `Green Play`, `Green Quest`, `Green Learn`, and `Green Connect`, clearly framed as conceptual introductions (not completed modules).
- Extracted reusable content (`src/data/landing.ts`), pure parallax math (`src/utils/parallax.ts`), and `useHeroParallax` hook; added 5 unit tests in `tests/br-t003.test.ts`.
- Verified desktop/mobile/small-mobile layout, Escape-to-close mobile nav with focus restoration, skip-link first-Tab focus, smooth CTA scroll to `#worlds`, WCAG AA secondary text contrast adjustments, and `prefers-reduced-motion` fallback.
- Clarified in `docs/TECHNICAL_ARCHITECTURE.md` that React 19 + TypeScript + Vite 7 + standard CSS is the active frontend baseline (superseding the earlier Next.js/Tailwind proposal).

## Next exact steps
1. Sync AI Studio changes with the canonical GitHub repository and verify the full diff (no overwrites).
2. Codex reviews `BR-T003` code quality, WCAG AA contrast/accessibility (including axe-core or screen reader check if available), and confirms `npm run typecheck` + `npm run build` + `tests/br-t003.test.ts` locally; optionally add ESLint (`lint` script) in a dedicated tooling step.
3. Once verified, mark `BR-T003` `DONE` in `planning/TASKS.md` and wait for owner signoff to start `BR-T004` (Game Catalog for Fact–Act and Ô ăn quan xanh).

## Potential blockers & unresolved risks
- `BR-T002` remains `BLOCKED` for commercial release: Brainie/Rootie and Canva-origin assets are authorized for internal development/prototype testing only; commercial licensing requires separate team verification.
- `BR-T001` approval covered `BR-T003` scope only; full PRD and selection of the single R0 playable game (`OQ-01`) + 5 verified content items (`BR-T005`) are still required before `BR-T006`.
- `package.json` does not yet include an ESLint `lint` script.
- Be Vietnam Pro is loaded via Google Fonts CDN (system fallback if completely offline).

**Important:** This is a live summary of latest handoff. Detailed historical notes are appended to `logs/AI_STUDIO_LOG.md` and `logs/CODEX_LOG.md`.


## Handoff — BR-T023 S1A WebGL2 tabletop sandbox (2026-11-20)

- **Source branch:** `codex/br-t023-3d-tabletop-slice-a`, stacked Draft PR #4 on PR #3 (asset intake). `main` unchanged; no deployment or merge.
- **Implemented:** a lazy-loaded `/?preview=oanquan3d` prototype, procedural 3D board with 12 visual pits and low-poly seeds, DOM pit controls, sandbox one-seed demonstration and reset, WebGL2 fallback, responsive stylesheet. No official rules, scores or online rooms.
- **Validation:** isolated strict TS compilation of renderer/model PASS; Node sandbox-state smoke PASS. React/Vite build, WebGL2 visual browser QA and integration E2E **NOT RUN / NOT VERIFIED** in this environment. Details and acceptance gates in `docs/BR_T023_S1A_HANDOFF.md`.
- **Next owner/agent:** Product Owner can review and merge PR #3 as internal intake after approval; Codex S1B should review Draft PR #4, install dependencies already in repo, run full tests and screenshot QA, correct issues, then prepare PR #4 for review (do not auto-merge).
- **Dependencies:** D1/rights before public deploy (`BR-T002`), `OQ-08` before game rules, and backend/privacy decisions before online mode. BR-T022 remains open for other Wave 1A assets.

## 2026-11-21 — BR-T026 · Claude Code → Product Owner

- **Trạng thái:** `IN_REVIEW` — PR #10 (`codex/br-t026-gameplay-a11y`) đã commit + push, **chưa merge**, chờ Product Owner duyệt.
- **Kiểm thử:** typecheck PASS · unit 40/40 PASS · build PASS · Playwright 1440/320/390+reduced-motion PASS · lint NOT RUN · thiết bị/screen reader thật NOT RUN.
- **Bước tiếp (chưa làm, cần duyệt):** PR3 — kiểm soát luật/nội dung chưa duyệt (engine rules, FAQ Brainie, sách luật, `?mode=legacy`, model Gemini chưa xác minh); sau đó mới tới PR2 deployment (`VITE_BASE`).

## 2026-11-21 — BR-T026 / BR-T027 đã merge · Claude Code → Product Owner

- **Trạng thái:** `DONE`. `main` = `45fb8d9` (PR #10 BR-T026, PR #12 BR-T027). PR #11 bị merge nhầm vào nhánh #10 nên đã tách lại (đưa nhánh #10 về `5c16970`, BR-T027 cherry-pick lên `main` thành #12).
- **Kiểm thử:** xem `planning/TASKS.md` (typecheck/build PASS, unit 41/41 và 42/42, Playwright 1440/320/390 PASS; lint NOT RUN). Smoke test trình duyệt trên Cloudflare Pages và GitHub Pages sau merge: **NOT RUN**.
- **Còn mở / cần Product Owner:**
  1. Nhóm giao luật gốc, 16 cặp thẻ VI/EN và 15 Hình phạt Xanh + quyền công bố (`BR-T005`) — chưa nhập gì.
  2. Quyết nhãn phân trang "Trang N", câu "thẻ vật lý" trong `games.ts`/`connectAbout.ts`, câu "Không lặp thẻ" chưa có nguồn.
  3. PR2 deployment (`VITE_BASE`, giữ Cloudflare + GitHub Pages), sửa canvas Three.js từ PR #7, i18n còn trộn tiếng Việt, tách three.js, tooling/CSP — chưa bắt đầu.
  4. Dọn nhánh remote đã dùng xong; ngắt kết nối Worker phụ `brainroot-2-0` nếu không dùng.

## 2026-11-22 — BR-T031 /about V4.3 · Claude Code → Product Owner / Codex

- **Trạng thái:** `IN_REVIEW`, `NOT COMMITTED`.
- **Nơi làm việc:** worktree `C:/Users/Windows/brainroot-worktrees/br-t031-about-v43`, nhánh `codex/br-t031-about-v43` (từ `c29ae77`). Index của worktree đang stage trạng thái BR-T030 làm nền; thay đổi BR-T031 là phần chưa stage/untracked. Checkout gốc (`codex/br-t030-quest-about-news`) giữ nguyên 18 thay đổi chưa commit. Sao lưu BR-T030: `C:/Users/Windows/brainroot-backups/br-t030-uncommitted-2026-11-22/`.
- **Kiểm thử:** typecheck PASS · unit 62/62 · build hai base PASS · Playwright Chromium 94/94 (1440/768/390/320). NOT RUN: lint, thiết bị/Safari thật, host thật, screen reader.
- **Bước tiếp (cần Product Owner):**
  1. Duyệt `/about` trên bản React (video + ảnh trước/sau).
  2. Cho phép commit BR-T030 trên `codex/br-t030-quest-about-news` (checkout gốc).
  3. Commit BR-T031 trong worktree lên trên commit BR-T030 và mở PR BR-T031 (xếp chồng sau PR BR-T030, hoặc gộp vào `main` sau khi BR-T030 merge).
  4. Sau merge: smoke test `/about` trên Cloudflare Pages và GitHub Pages thật.
- **Rủi ro:** sửa thêm About trong checkout gốc trước khi gộp sẽ xung đột với `AboutPage.tsx`/`about.ts` của BR-T031.
