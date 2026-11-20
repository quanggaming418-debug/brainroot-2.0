# PROJECT_STATE — Read before every agent run

- **Updated:** 2026-11-20 — BR-T008 R0 Stabilization & Demo Readiness.
- **Phase:** R0 Integrated MVP (`IN_REVIEW` chờ Codex QA/PR và đồng bộ PR #5); `BR-T005` vẫn `BLOCKED` (chờ đội nội dung duyệt thẻ mẫu công khai + nguồn tham khảo); `BR-T002` vẫn `BLOCKED` cho phát hành thương mại; `OQ-01..OQ-13` vẫn `OPEN`.
- **Current release:** R0 Integrated Candidate (`BR-T003` `DONE`, `BR-T020` `DONE` PR #2, `BR-T021` `DONE`, `BR-T004`/`BR-T006`/`BR-T007`/`BR-T011` ở trạng thái `IN_REVIEW` chờ Codex review & duyệt nội dung `BR-T005`).
- **Current active Task ID:** BR-T008 IN_REVIEW sau xác minh live và sửa focus/fallback trên nhánh riêng.
- **Last verified build:** Typecheck/build PASS, unit 26/26. Xem CODEX_LOG cho kết quả browser live và bản PR.
- **Repository branch / base:** Live main f61c844 (PR #6 đã merge). Bản ổn định ở codex/r0-stabilization; giữ renderer Three.js và chuyển phần sửa phù hợp từ PR #5.
- **Deployment URL:** [GitHub Pages](https://quanggaming418-debug.github.io/brainroot-2.0/) đang trả HTTP 200, [deploy main thành công](https://github.com/quanggaming418-debug/brainroot-2.0/actions/runs/44693785652). Bản PR ổn định chưa deploy.
- **Hero reference:** `reference/hero-v4/`; **asset copies:** `public/assets/hero-v4/` & `public/assets/green-play/`.

## Established context
- Rebuild website from zero; do **not** reuse old web code as project base.
- Established frontend stack: **React 19 + TypeScript + Vite 7 + React Router (`react-router-dom`) + Three.js (`three`) + modular standard CSS** (không cài Tailwind CSS).
- Brainroot mission/slogan fixed; signature colors `#E79A7C`, `#A6C6B6`, `#F8F3E9`, `#263B31`, `#63894C` with Be Vietnam Pro typography; original Brainie/Rootie/Fact–Act cutouts in `public/assets/hero-v4/` và VIS-006/VIS-008 trong `public/assets/green-play/` hiện dùng cho phát triển/prototype nội bộ (`BR-T002` / D1 vẫn mở cho phát hành thương mại).
- Unified 10-route R0 experience: `/`, `/games`, `/games/fact-act`, `/games/fact-act/play`, `/games/o-an-quan-xanh`, `/quest`, `/learn`, `/connect`, `/about`, `*` (plus preserved `/?preview=oanquan3d`).
- Users include general public + school/college + teacher/CLB, first pilot ULIS/Hà Nội; 100% public guest exploration without mandatory login.
- Strict educational truthfulness: `APPROVED_PUBLIC_CARDS = []` pending `BR-T005`; internal demo fixtures (`Fact–Act`) and draft reference cards (`Green Learn`) are explicitly labeled and separated; zero fabricated citations, URLs, stats, emails, or official Ô ăn quan rules (`OQ-08` remains `OPEN`).

## Decisions still proposed, awaiting owner approval
- Full long-term PRD & official R0 game choice (`BR-T001` / `OQ-01`).
- Commercial licensing and final publication rights for Brainie/Rootie, Fact–Act deck, VIS-006/VIS-008 (`BR-T002` remains `BLOCKED` for commercial release).
- Content approval (`BR-T005`): >=5 verified Fact–Act public sample cards + verified sources for Green Learn 5 topics + official Ô ăn quan xanh digital rules (`OQ-08`) + official contact channels for `/connect` & `/about`.

## Do NOT claim
- No team-approved public Fact–Act sample cards (`BR-T005` vẫn `BLOCKED`), no official Ô ăn quan xanh rules (`OQ-08` vẫn `OPEN`), and chưa xác nhận pilot; Pages hiện chạy bản demo R0.
- No completed paid auth, realtime multiplayer rooms, AQI feed, chatbot, e-commerce, or full WCAG 2.2 AA certification.

## Immediate next action

1. Review PR BR-T008 và kiểm lại Pages sau merge. Giữ luật Ô ăn quan xanh ở OQ-08.
2. Đội nội dung bàn giao Fact–Act theo `planning/FACT_ACT_CONTENT_INTAKE.md` (BR-T005). Chốt OQ-01/OQ-03, nguồn Green Learn và quyền phát hành BR-T002 riêng.
