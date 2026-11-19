# Google AI Studio + Codex Handoff — Brainroot Hero V4

## Required rules
1. Preserve `index.html` heading, single CTA, slogan, copy, art direction and colors; **font is Be Vietnam Pro** (Google Fonts online).
2. Reuse original `assets/brainie.webp` and `assets/rootie.webp`, rather than generating substitute mascots.
3. Background hero scene is generated without UI; DOM text/navigation/buttons are real HTML, making the UX editable and screen-reader accessible.
4. Do not replace background with a single image containing baked typography; do not flatten mascot into garden.
5. The 3 horizontal depth bands are an approximation, **not isolated objects**. Parallax travel should remain minimal (under roughly 12px).

## Recommended import procedure
- Create new app in Google AI Studio Build Mode, upload folder or import via connected GitHub repository.
- Instruct agent to use `index.html`, `styles.css`, `main.js`, `assets/*` as **visual prototype**, then refactor to `HeroScene`, `Mascot`, `SiteHeader`, `DiscoverySection` React components.
- If converting to Next.js, keep asset paths under `/public/assets/*`, move CSS to CSS modules or globals, and preserve real semantic anchors.
- Ask Codex to run responsive and accessibility checks, verify that the Google Font downloads in the public deployment, optimize the assets further, check licensing, and build the first **actual playable** experience in a separate task.

## Candidate prompt
```
Use the attached Brainroot Hero V4 package as the **approved visual baseline**. Implement it as composable React/Next.js components, maintaining the rich-but-uncluttered illustrated garden, exact original mascot cutouts, Be Vietnam Pro typography, headline green #63894C, peach CTA #E79A7C, sage #A6C6B6, and exactly one hero primary CTA labelled “Khám phá thế giới Brainroot” that scrolls to the ecosystem section. Keep the original Vietnamese copy and slogan From Brainrot to Brainroot. Do not redesign the mascots, do not insert a second hero CTA, do not bake text into images and do not claim any unimplemented games work. Keep subtle parallax, keyboard focus, responsive menu and reduced-motion fallback. Only implement Hero and the discovery anchor section in this task; do not add auth, AI chat, payments or new game modes. Afterwards enumerate changed files, tests actually run, any errors, remaining tasks; update project TASKS and agent log only if repository write access is available.
```

## Task handoff status
- **Asset/art direction:** V4 approved concept direction; newly generated background and original mascots integrated.
- **Demo implementation:** CSS/HTML/JS working in browser-rendered QA.
- **Next task:** Integrate components into app scaffold; obtain user/leader design signoff on actual Be Vietnam Pro rendering.
- **Not done:** full content/game platform, auth, commercial entitlement, realistic 3D, true independent layer reconstruction.
