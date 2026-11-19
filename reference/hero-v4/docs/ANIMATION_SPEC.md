# ANIMATION_SPEC — Brainroot Hero V4

| Element | Motion | Desktop | Mobile | Reduced Motion |
|---|---|---|---|---|
| Sky/distant | Parallax on scroll | 0.11 × small amplitude | no scroll move | static |
| Midground | Parallax on scroll | 0.28 × small amplitude | no scroll move | static |
| Foreground | Parallax on scroll | 0.52 × small amplitude | no scroll move | static |
| Brainie | Whole-character vertical bob/rotate | 4.8s loop, ≈9px | same | disabled |
| Rootie | Whole-character bob, offset phase | 4.8s loop | same | disabled |
| Floating leaves | Vertical/rotation drift | ≈6s loop | same | disabled |
| Primary CTA | Hover lift | ≈3px / 200ms | on press as native browser | disabled |

## Future true-layer plan
1. Generate a clean panoramic background plate free of foreground tree, floating leaves, greenhouse and waterfall overlays.
2. Extract or redraw each important object with full hidden contour where needed (tree, greenhouse, waterfall, plants); export with alpha and safe bleed.
3. Keep moving objects independent with stable pivot points, measure web size/performance; use responsive art direction separate from desktop.
4. Source interactive animation can be Rive (rigging) for mascot expressions; existing PNG-based mascot cannot animate eyes/arms independently.

## Handoff acceptance
- 1440×900 and 390×844 no clipping/overlap for hero copy and CTA.
- Header nav on desktop and accessible toggled menu on mobile.
- CTA reaches `#worlds`; `prefers-reduced-motion` disables animation.
- Zero broken asset URLs and zero JS console/page errors.
