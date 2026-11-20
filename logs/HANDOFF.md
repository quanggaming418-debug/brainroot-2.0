# HANDOFF — Current baton pass

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
