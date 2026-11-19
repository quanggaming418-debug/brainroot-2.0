# WORK_LOG — V4 hero build

## 2026-11-20 / Hero V4 package
- Confirmed brand choices from dialogue: peach #E79A7C, sage #A6C6B6, headline #63894C, Be Vietnam Pro, Brainie/Rootie, single CTA.
- Generated new illustration background **without text or characters**.
- Processed background to flat optimized WebP + three lightly moving horizontal depth masks; copied verified original mascot cutouts from previous V3 pack; wrote SVG floating leaves.
- Built standalone `index.html` / `styles.css` / `main.js`; real DOM typography and navigation, game-ecosystem preview, mobile menu, reduced motion.
- Executed Chromium/Playwright screenshot tests at 1440×900, 390×844, 320×740, reduced motion; all assets decoded, no JS errors, no horizontal overflow, CTA anchor works.
- Limitation: external Google Font couldn't be fetched in offline browser tests; screenshot shows system fallback, HTML is configured to load Be Vietnam Pro online.
- Deliverables: full ZIP, screenshots, QA evidence, handoff/spec files.
- Next: owner review the actual design on a normal online browser; Codex/AI Studio integrate components; reconstruct object-level layers only if stronger motion desired.
