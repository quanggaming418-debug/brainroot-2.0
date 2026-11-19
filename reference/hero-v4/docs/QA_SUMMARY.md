# Verified QA — Brainroot Hero V4

## Checks performed
- Headless Chromium **Playwright `page.set_content`** test of HTML/CSS/JS with images inlined as data URLs; file/http navigation is blocked in this execution environment, so these are browser-rendered screenshots of the same source code, not a deployed-host test.
- Desktop 1440×900: no overflow, no JS exception, all image elements decoded, primary CTA scrolls to `#worlds`.
- Mobile 390×844: no overflow, no JS exception, all image elements decoded, menu opens/closes and menu anchor scrolls.
- Small mobile 320×740: no overflow, text and assets load.
- Reduced motion: tested 1440×900 with `prefers-reduced-motion: reduce` enabled; CSS disables animations.
- Keyboard: first Tab reaches visible skip link.

## Known limitations / warnings
- **Be Vietnam Pro** CSS link targets Google Fonts. The restricted headless test rendered the configured **system fallback** because external font resources could not be fetched in the rendering environment; verify actual Be Vietnam Pro rendering in an online browser after import/deploy.
- This demo does **not** implement the Brainroot games. Green Play/Quest/Learn sections provide navigation and explanatory copy only.
- Layer reconstruction uses repeated pixels and soft band masks; heavy scroll/camera motion would introduce unnatural artifacts.
- No screen reader user study, full WCAG 2.2 audit, or external performance testing performed.
- Original mascot assets came from group files; confirm rights before commercial release.

## QA data
See `QA_REPORT.json` for viewport, image load, CTA rectangle and error data.
