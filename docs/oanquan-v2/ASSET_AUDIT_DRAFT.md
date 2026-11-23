# Ô ăn quan xanh V2 — Asset Audit (BẢN NHÁP)

**23/11/2026 · BR-T033 · Trạng thái: DRAFT, chờ Product Owner / nhóm duyệt quyền.**
Bản nháp này **chưa** được gộp vào `docs/ASSET_AUDIT.md` chính. Không file nào dưới đây có trong repo, `public/` hay bundle production. Chỉ ghi nhận để duyệt trước G2.

## Quy tắc áp dụng

- Không đưa file nào vào `public/` hoặc `src/` khi dòng tương ứng chưa có **Quyết định = DUYỆT**. File import từ `src/` cũng bị Vite đưa vào `dist/` và được deploy.
- Mọi ảnh do AI tạo phải ghi rõ "AI-generated" ở trang công khai nếu chính sách nhóm/BTC yêu cầu (xem `docs/HACKATHON_COMPLIANCE.md`).
- Token Art V2 là **PLACEHOLDER**, không phải art cuối, kể cả khi được duyệt dùng nội bộ.
- Hash dưới đây là 16 ký tự đầu của SHA-256, lấy từ `MANIFEST_SHA256.txt` của `Brainroot_OAnQuan_Code_Starter_Pack.zip` (đã kiểm `sha256sum -c`: 129/129 OK). Kích thước lấy từ `ASSET_MANIFEST.json` của Asset Kit và đọc header PNG.

## 1. Token Replacement V2 (PLACEHOLDER, ảnh AI)

Nguồn: `artwork/PLACEHOLDER_tokenV2/Brainroot_OAnQuan_Token_Replacement_V2/production/`. README của gói ghi đây là bộ "Candidate 03 — storybook clay + wood" được chọn từ 5 ứng viên tạo bằng AI.

| File | SHA-256 (đầu) | Kích thước | Định dạng | Vai trò dự kiến | Nguồn gốc | Quyền | Quyết định |
|---|---|---|---|---|---|---|---|
| `dan_seed_256.png` | `6c8c4c365998e6ce` | 201×256, 57 KB | PNG | Hạt Dân | AI | Chưa xác minh | CHỜ |
| `dan_seed_512.png` | `aa03bd1adeeb941d` | 403×512, 212 KB | PNG | Hạt Dân (nguồn) | AI | Chưa xác minh | CHỜ |
| `dan_seed.png` | `f00be6672146780f` | 364×463, 185 KB | PNG | Bản gốc | AI | Chưa xác minh | CHỜ |
| `quan_climate_256.png` | `8ee212a96062ce5b` | 256×240, 100 KB | PNG | Quan "Biến đổi khí hậu" | AI | Chưa xác minh | CHỜ |
| `quan_climate_512.png` | `5901531f555c8828` | 512×481, 380 KB | PNG | Quan (nguồn) | AI | Chưa xác minh | CHỜ |
| `quan_climate.png` | `58020848c2ab1d76` | 771×724, 834 KB | PNG | Bản gốc | AI | Chưa xác minh | CHỜ |
| `quan_biodiversity_256.png` | `a2d4c62ccb5cca67` | 256×238, 101 KB | PNG | Quan "Đa dạng sinh học" | AI | Chưa xác minh | CHỜ |
| `quan_biodiversity_512.png` | `52dd0fbd61af6104` | 512×476, 379 KB | PNG | Quan (nguồn) | AI | Chưa xác minh | CHỜ |
| `quan_biodiversity.png` | `c942fd6acb5fd300` | 778×724, 844 KB | PNG | Bản gốc | AI | Chưa xác minh | CHỜ |
| `selected_token_sheet.png` | `83632c7ff02c0350` | 2172×724, 1,9 MB | PNG | Tờ tham chiếu | AI | Chưa xác minh | Không dùng trong sản phẩm |

Ghi chú kỹ thuật: Handoff §8 ghi các file này là WebP và có bản 128px; thực tế là PNG và không có bản 128px. Nếu được duyệt dùng tạm ở G2, cần chuyển sang WebP và tạo bản 128px (ghi hash mới). Visual QA §5.2: hạt Dân có mầm lá trùng icon Không gian xanh; Quan khí hậu có sét và giọt nước trùng icon Năng lượng, Nước. Hình quân Quan phụ thuộc thêm `OQ-14` (C-01).

## 2. Asset Kit V2 — nền (ảnh AI)

Nguồn: `artwork/assetkit/Brainroot_OAnQuanXanh_V2_AssetKit/production/backgrounds/`. `ASSET_SELECTION_REVIEW.md` của gói: nền là "AI-generated landscape artwork"; bản mobile là 1 ảnh dọc tạo bằng AI (4 ứng viên khác là ảnh cắt).

| File | SHA-256 (đầu) | Kích thước | Màn dùng (mockup) | Nguồn gốc | Quyền | Quyết định |
|---|---|---|---|---|---|---|
| `lobby_desktop.webp` | `81e13dcd28871704` | 1600×900, 186 KB | S1 | AI | Chưa xác minh | CHỜ |
| `lobby_mobile.webp` | `1027fce140827328` | 1080×1920, 173 KB | S1 | AI | Chưa xác minh | CHỜ |
| `gameplay_desktop.webp` | `f4b7d92fd21af7c3` | 1600×900, 120 KB | S2–S5, S8, S9 | AI (đã giảm bão hòa) | Chưa xác minh | CHỜ |
| `gameplay_mobile.webp` | `5143356619cba7af` | 1080×1920, 135 KB | như trên | AI | Chưa xác minh | CHỜ |
| `challenge_desktop.webp` | `b94f667e804ba944` | 1600×900, 78 KB | S6, S7, hỗ trợ | AI (đã làm dịu) | Chưa xác minh | CHỜ |
| `challenge_mobile.webp` | `7226b39ca06312bc` | 1080×1920, 81 KB | như trên | AI | Chưa xác minh | CHỜ |

## 3. Asset Kit V2 — SVG và texture (gói ghi là vẽ/sinh bằng mã, không phải ảnh AI)

`ASSET_SELECTION_REVIEW.md`: "custom source SVG written for this pack"; texture "programmatically generated". Vẫn cần nhóm xác nhận nguồn trước khi công khai.

| File | SHA-256 (đầu) | Byte | Vai trò | Quyết định |
|---|---|---:|---|---|
| `components/board_frame.svg` | `c66c65b921ffa5fc` | 1 283 | Khung bàn desktop | CHỜ |
| `components/jar_green_space.svg` | `3cca955d798e9c84` | 780 | Lọ kho (phụ thuộc `OQ-15`) | CHỜ |
| `components/jar_energy.svg` | `d43f66a626c14145` | 780 | như trên | CHỜ |
| `components/jar_waste.svg` | `7ccc241f068655ab` | 780 | như trên | CHỜ |
| `components/jar_water.svg` | `edc5eefcc7088d98` | 780 | như trên | CHỜ |
| `components/jar_consumption.svg` | `9c16135b35e24431` | 780 | như trên | CHỜ |
| `components/card_ornaments.svg` | `f916aab623892f1a` | 3 004 | Trang trí thẻ | CHỜ |
| `textures/paper_texture.png` | `c6cc6329bd77cef3` | 195 292 (512×512) | Vân giấy thẻ (độ mờ ~12%) | CHỜ |
| `components/resource_jars.svg` | `4155c411fed0928a` | 3 782 | Minh họa 5 lọ | Chưa dùng |
| `layers/{sky,far_hills,middle_garden,canopy,foreground,particles}.svg` | xem manifest gói | 1 215–30 897 | Cảnh xếp lớp (phương án B) | Chưa dùng |
| `components/seed.svg`, `quan_climate.svg`, `quan_biodiversity.svg`, `quan_pair.svg` | `392b5ad8…`, `c41a77a5…`, `bb14737e…`, `e7a70e09…` | — | — | **ĐÃ LOẠI** (Handoff §8), không dùng |

## 4. Tài nguyên của nhóm cần xác nhận cho V2 (không phải AI)

| Tài nguyên | Đường dẫn trong repo | Trạng thái hiện có | Việc cần làm |
|---|---|---|---|
| Brainie | `public/assets/hero-v4/brainie.webp` (SHA-256 `1a0fca92…`) | Internal dev approved; thương mại `BLOCKED` (`BR-T002`, EX-005) | Xác nhận đây là file mockup dùng; chỉ trang trí, không làm quân Quan trừ khi `OQ-14` chọn khác |
| Rootie | `public/assets/hero-v4/rootie.webp` (SHA-256 `dd0c2f7b…`) | Như trên (EX-006) | Như trên |
| Lá trang trí góc bàn | Không có WebP trong `public/`. Ứng viên: `public/assets/hero-v4/floating-leaf-{peach,sage}.svg` (EX-007/008) hoặc `brainroot-assets-v1/decor/leaf-0[1-6].webp` (thư mục chưa track) | Chưa chỉ định | Product Owner chọn file |
| 100 hình minh họa trong PDF thẻ | Không có trong repo | **Chưa công khai** (Matrix C3) | Nhóm xác nhận quyền; thẻ phải chơi được không cần hình |

## 5. Việc tiếp theo (không làm trong BR-T033)

1. Nhóm/Product Owner điền cột **Quyết định** (DUYỆT nội bộ / DUYỆT công khai / LOẠI) và ghi người duyệt, ngày.
2. Khi có dòng được duyệt: chuyển nội dung tương ứng vào `docs/ASSET_AUDIT.md`, ghi đúng nhãn AI.
3. Chỉ sau đó task G2 mới được chép file (đã chuyển đổi định dạng, ghi hash mới) vào repo.
