# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 (Triển khai `BR-T004` Green Play UI/UX — React Router + `/games`, `/games/fact-act`, `/games/o-an-quan-xanh`, `*` ở trạng thái `IN_REVIEW`, `NOT COMMITTED`.)
- **Phase:** M2 — `BR-T004` `IN_REVIEW` (triển khai cục bộ chờ Codex QA/review & PR); `BR-T022` `IN_PROGRESS` (D2 file PASS cho VIS-006/VIS-008, còn chờ duyệt D1 & các asset Wave 1A còn lại); `BR-T023` `IN_PROGRESS` (sandbox 3D tách biệt `/?preview=oanquan3d`, bảo toàn nguyên vẹn).
- **Current release:** R0 proposed (`BR-T003` `DONE`, `BR-T020` `DONE` PR #2, `BR-T021` `DONE`, `BR-T004` `IN_REVIEW`; tiếp theo: Codex review/merge `BR-T004` + hoàn tất PR #5 sandbox + `BR-T005` duyệt nội dung mẫu → `M3 BR-T006`).
- **Current active Task ID:** `BR-T004` `IN_REVIEW` (Google AI Studio → Codex review); `BR-T022` & `BR-T023` giữ nguyên `IN_PROGRESS`.
- **Last verified build:** `BR-T004` (2026-11-20): `npx --yes tsx --test tests/br-t003.test.ts tests/br-t004.test.ts tests/br-t023.test.ts` PASS (17/17), `npx vite build` PASS, Playwright Chromium 1440/1280/390/320 + zoom 200% + reduced-motion + hard reload + Back/Forward + Escape PASS (0 lỗi console/pageerror). `npm run typecheck` báo 0 lỗi ở mã `BR-T004` nhưng vẫn thoát mã 2 do 1 lỗi `TS6133` có sẵn tại `src/features/oanquan/prototypeOnlyModel.ts:24` (không chỉnh sửa để bảo toàn PR #5). `npm run lint`: `NOT RUN` (chưa có script `lint`).
- **Repository branch / base:** Workspace AI Studio không có `.git` (`NOT COMMITTED`); PR #3 & PR #4 đã merge theo xác nhận chủ dự án, PR #5 (QA sandbox 3D) giữ nguyên không ghi đè. Chưa có deploy.
- **Deployment URL:** NOT CREATED for Brainroot 2.0.
- **Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/` & `public/assets/green-play/`.

## Established context
- Rebuild website from zero; do **not** reuse old web code as project base.
- Established frontend stack: **React 19 + TypeScript + Vite 7 + React Router (`react-router-dom`) + modular standard CSS** (supersedes earlier Next.js/Tailwind proposal in `docs/TECHNICAL_ARCHITECTURE.md`).
- Brainroot mission/slogan fixed; signature colors `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#263B31`, `#63894C` with Be Vietnam Pro typography; original Brainie/Rootie/Fact–Act cutouts in `public/assets/hero-v4/` và VIS-006/VIS-008 trong `public/assets/green-play/` hiện dùng cho phát triển/prototype nội bộ (duyệt D1 cuối cùng & bản quyền thương mại vẫn mở theo `BR-T002` / `BR-T022`).
- Ecosystem comprises **4 introductory areas**: Green Play (đã có thư viện `/games` & trang chi tiết ở mức `IN_REVIEW`), Green Quest, Green Learn, Green Connect (vẫn ở mức giới thiệu khái niệm, chưa mở tính năng).
- Users include general public + school/college + teacher/CLB, first pilot ULIS/Hà Nội.
- Need public access + guest trial; only protect paid features at server level.
- Accessibility and environmental source provenance are core requirements.
- Workflow: Google AI Studio Build Mode (UI) + Codex (QA and implementation); GitHub repository is canonical source of truth; see `docs/AI_STUDIO_CODEX_WORKFLOW.md`.
- Six Canva-export SVGs from `brainroot.zip` inspected, with three mascot/pose assets and two card showcase assets. See `docs/ASSET_AUDIT.md`.

## Decisions still proposed, awaiting owner approval
- Exact P0 playable game (choose one) and full long-term PRD signoff (`BR-T001` only approved for BR-T003 scope; `BR-T004` được giao dựng UI/UX thư viện Green Play).
- Commercial licensing and final publication rights for Brainie/Rootie, Fact–Act deck, VIS-006/VIS-008 and Canva-origin assets (`BR-T002` remains `BLOCKED` for commercial release; D1 artwork cuối vẫn chờ chốt).
- Auth provider/DB, paid activation product packages, release scope, how many members and time budget.
- R2 improvement candidate: Green Arena Lite — NOT a claim of completed future work.

## Do NOT claim
- No completed playable game engine (`BR-T006`), no verified sample card content (`BR-T005`), and no public pilot in this rebuild.
- `BR-T004` đang ở trạng thái `IN_REVIEW` (cần Codex kiểm chứng độc lập trên nhánh Git và chốt `DONE`); chưa có SPA hosting deploy thực tế.
- No completed paid auth, realtime rooms, AQI feed, chatbot, e-commerce or full WCAG 2.2 AA certification.
- Existing Brainroot survey totals and old website functional descriptions are not independently verified from raw data.

## Immediate next action

1. Codex rà soát diff `BR-T004` trên nhánh riêng (kèm merge/rebase sau PR #5 để `npm run typecheck` sạch toàn repo), chạy kiểm thử độc lập (`typecheck`, `build`, unit 17/17, axe/Playwright) và mở PR review cho `BR-T004`.
2. Product Owner chốt duyệt D1 cuối cùng cho `VIS-006`/`VIS-008` và bản quyền phát hành (`BR-T002`); tiếp tục các asset Wave 1A còn lại (`BR-T022`).
3. Đội nội dung chạy song song `BR-T005` (duyệt >=5 thẻ mẫu Fact–Act kèm nguồn) và chốt `OQ-01`/`OQ-08` để mở khóa `BR-T006` (playable loop).
