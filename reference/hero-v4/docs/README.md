# Brainroot Living Garden V4 — preview handoff

**Status:** UI/animation prototype, not a full product site. Built from the requested vivid but balanced Living Garden aesthetic. UI font is **Be Vietnam Pro** via Google Fonts CSS (online), with a system fallback when offline; no font binaries bundled.

## Run demo
- Open `index.html` in browser; for local preview, recommend `python -m http.server 8000` then visit `http://localhost:8000`.
- Header navigation works as anchors. Main CTA **“Khám phá thế giới Brainroot”** scrolls to the ecosystem section. Mobile nav toggle, reduced motion, two real mascots.
- No game backend/auth/AI chatbot implemented; cards below hero are explicitly informational only.

## Key design decisions
- Main palette peach `#E79A7C`, sage `#A6C6B6`, warm ivory `#F8F3E9`.
- Main headline green `#63894C` (between the previously too dark and too pale versions); supporting type darker for readability.
- One primary CTA in hero instead of **“Chơi ngay”** and **“Tìm hiểu dự án”**.
- Main headline Brainroot, slogan **From Brainrot to Brainroot**, subcopy **“Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi.”**
- Mascot art copied from the user-provided Brainroot asset pack (via prior verified V3 conversions); never generated replacements.
- Garden background is freshly generated without text, buttons or mascots; all UI is actual HTML text, not baked in a picture.

## Files
- `index.html`, `styles.css`, `main.js` — standalone responsive concept/demo.
- `assets/hero-garden-v4.webp` — static safe fallback (single flat illustration).
- `assets/depth-01...`, `depth-02...`, `depth-03...` — soft horizontal band layers for **subtle** parallax only.
- `assets/brainie.webp`, `rootie.webp` — original mascot cutouts; independent whole-character CSS animation.
- `assets/floating-leaf-*.svg` — independently moving decorative leaves.
- `assets/asset-manifest.json` — technical inventory and known limitations.
- `preview/` — screenshots captured by headless Chromium when available.

## Limitations
1. **These are depth-band reconstructions, not fully separated tree/greenhouse/waterfall illustration layers.** Strong independent motion requires regenerating individual objects plus clean plates / inpainting.
2. Brainie/Rootie are raster embedded in Canva SVG; whole-character floating works, but blinking/limb rigging requires new editable layers approved by the team.
3. Mobile shows static background depth but mascot and leaf animation remain unless reduced motion is requested; no excessive scroll-jacking.
4. Brand rights and source asset license must be cleared by the team before public commercial use.
5. Green ecosystem cards are preview-only content; actual product/game features not implemented.

## AI Studio + Codex handoff
- In AI Studio, upload the `assets/` directory with `index.html`, `styles.css`, `main.js`, plus brand references. Ask to **adapt the design into reusable Next.js/React components** without flattening typography/characters into a single generated image.
- Preserve one CTA, Be Vietnam Pro, mascot assets, the copy and verified color tokens; avoid adding unrequested buttons or fake features.
- Codex to verify build, responsive breakpoints, keyboard nav, reduced motion, content licenses and image sizes. Do not mark existing game/AI/paid features complete.
