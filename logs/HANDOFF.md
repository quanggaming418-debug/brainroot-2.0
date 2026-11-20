# HANDOFF — Current baton pass

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
