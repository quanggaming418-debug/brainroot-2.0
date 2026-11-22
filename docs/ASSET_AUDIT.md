# Brainroot Brand Asset Audit — 2026-11-20

**Source:** User-provided `brainroot.zip` (6 SVG files). **Status:** technical assessment only; licensing/brand approval is TO CONFIRM.

| File | Display dimensions in SVG | Technical finding | Recommended use |
|---|---:|---|---|
| `brainroot_slide1.svg` | 1920×1080 | Canva-style slide composite; 16 embedded PNG images, paths and clipping; ~7.46 MB source | Reference for colors/branding only, not website hero asset |
| `linh-vat-1.svg` | 383×397 | Brainie orange; contains two embedded PNGs (mask + RGB), not editable limb paths; ~0.63 MB | Re-export clean transparent WebP/PNG for static UI; use as whole-character bob/float animation |
| `linh-vat-2.svg` | 521×521 | Rootie green; embedded PNGs, ~0.45 MB | Same as above |
| `linh-vat.svg` | 471×432 | Alternate Brainie orange with different facial pose; embedded PNGs, ~1.45 MB | Secondary mascot pose; do not mix style without approval |
| `the-bai(1).svg` | 706×529 | Photo/render of multiple cards; embedded PNGs, ~0.61 MB | Marketing hero/card deck showcase |
| `the-bai.svg` | 684×562 | Photo/render of fan of cards; embedded PNGs, ~1.08 MB | Product listing/hero |

## Key technical conclusions
- Although file extension is `.svg`, mascot and card exports are predominantly **raster images embedded inside SVG**, not character parts separately editable as vector paths. Scaling beyond actual image resolution can blur. Do not promise frame-by-frame rigging or blinking with these files alone.
- Mascots have usable alpha/masked backgrounds when rendered with a proper SVG renderer (Inkscape check); some basic SVG renderers can incorrectly show a black background in the masks. Verify assets in target browsers; prefer optimized transparent exports for static use.
- For full character animation (blinking, mouth, hand, leaves moving independently): ask designers for editable component layers or redesign an animation-ready rig **with team approval**. Character motion as a whole (floating, rotating, entrance) is possible now using CSS transforms.
- Export/optimize web images; keep original SVGs in private source assets, use approved derivatives with appropriate rights. Verify original Canva ingredient/source and license for any stock content, Pro content, AI-generated elements, and logos/trademarks.
- Do not use photos of multiple card faces as the data layer for a playable digital deck: need front/back assets per card plus structured text and content licensing. Photo/render is suitable for product showcase only.
- `brainroot_slide1.svg` includes some C2PA/AI-generated media metadata for individual embedded elements. **This does not establish that the project owns or has exclusive rights to all component media**; verify Canva source/artist rights with the team.
- User-uploaded brand art should not be sent to third-party image-generation services until the team confirms rights and permission. AI output editing is optional, **not required** to build a polished site.

## Khai báo nội dung Learn + Quiz (BR-T029, 2026-11-21)
- `src/data/learnFacts.ts` và `src/data/quiz.ts` do AI soạn **bản nháp** từ nguồn công khai; mỗi fact ghi tên nguồn + URL (+ năm nếu có). Số liệu giữ nguyên như file nội dung nhóm cung cấp, chưa được nhóm/giảng viên duyệt.
- Giữ ẩn: ngưỡng "9 m² cây xanh/người" và "0,5 ha trong 300 m" (chưa xác nhận bản gốc WHO). Chưa có fact riêng Việt Nam cho Nước và Năng lượng.

## /about V3 — asset đã dùng (BR-T030, 2026-11-21)
Chỉ dùng asset có sẵn trong repo, không tạo mới: `hero-v4/{hero-garden-v4,depth-01-sky,depth-02-hills,depth-03-foreground}.webp`, `hero-v4/{brainie,rootie}.webp`, `home/garden/{green-learn,green-play,green-quest,green-connect}.webp`. Đường mòn và sóng đồi là path SVG trang trí viết bằng mã (không phải artwork AI).

## /about V4.3 — asset đã dùng (BR-T031, 2026-11-22)
- Chép **đúng 15 file cần dùng** từ `brainroot-assets/Brainroot_About_V4_Production_Asset_Kit/` vào `public/assets/about-v4/` (không chép ZIP, tài liệu, preview hay file không dùng): `01_hero/about-journal-{desktop,mobile}.webp`, `02_story/{brainrot-scroll-scene,brainroot-reveal-scene}.webp`, `05_props/{open-journal,magnifying-glass,reusable-bottle,canvas-tote,books-and-globe,learning-table,community-board,community-gathering}.webp`, `06_backgrounds/ivory-grain-overlay.webp`, `08_ui/paper-tape-{peach,sage}.svg`. Test `br-t031` khẳng định thư mục chỉ chứa file được tham chiếu.
- **2 ảnh phái sinh:** `deck-card-back.webp` và `deck-card-face.webp` (file 248×448 px) là phần **cắt + nắn phối cảnh** hai lá nằm trên cùng của `09_original_reference/official-deck-reference.webp` (giống `public/assets/hero-v4/fact-act-deck.webp`). Không vẽ lại, không thêm chữ. Mặt sau là thiết kế "Brain root" có Brainie/Rootie gốc; mặt trước là tranh phong cảnh không có chữ. Độ phân giải gốc: ảnh render 650×613 px, mỗi lá chỉ chiếm khoảng 124×225 px, được phóng 2× (Lanczos/bicubic) lên 248×448 px nên hơi mềm; hiển thị tối đa ~146 px rộng (lá được chọn, desktop). Quyền sử dụng: artwork thuộc bộ thẻ của nhóm, mới được duyệt cho phát triển/prototype nội bộ; **chưa xác nhận quyền phát hành công khai/thương mại** (`BR-T002` còn `BLOCKED`).
- Dùng lại từ repo: `hero-v4/fact-act-deck.webp`, `hero-v4/brainie.webp`. Không dùng ảnh Trang chủ.
- Ghi chú trên bảng tin, viền đào, gân trang sổ là CSS; không phải artwork AI.
