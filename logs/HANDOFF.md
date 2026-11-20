# HANDOFF — Current baton pass

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
