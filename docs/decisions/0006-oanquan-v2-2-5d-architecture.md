# ADR-0006: Ô ăn quan xanh chuyển từ bàn 3D (Three.js) sang bản 2.5D (SVG/CSS) tách Engine – Content – UI

- **Status:** ACCEPTED (Product Owner chấp thuận ngày 23/11/2026 khi nghiệm thu BR-T033, kèm các điều kiện ở mục "Điều kiện chấp thuận"; đề xuất trong BR-T033)
- **Liên quan:** `BR-T023` (prototype 3D), `BR-T032` (audit), `OQ-08`, `OQ-14…OQ-16`, BR-FR-003, BR-FR-006
- **Tài liệu:** `docs/oanquan-v2/BR-T032_TECHNICAL_READINESS_REPORT.md` §4, `docs/oanquan-v2/BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md` §1, §11

## Bối cảnh

- Prototype hiện có (`src/features/oanquan/`, `/?preview=oanquan3d`, nhúng trong `/games/o-an-quan-xanh`) là bàn gỗ 3D bằng Three.js, chỉ chuyển thử từng hạt, không có luật (`OQ-08` còn mở).
- Product Owner đã nghiệm thu UX/UI G0.5 (23/11/2026) theo hướng **2.5D minh họa phẳng bằng SVG/CSS**, "không 3D thật, không WebGL" (Brief §1).
- Trang `/games/o-an-quan-xanh` import tĩnh `three` qua `OAnQuanTabletopExperience`; bundle chính khi build là ~1,03 MB (BR-T032 §1.2).
- Brief và Handoff yêu cầu ba lớp tách nhau: Engine (luật thuần) → Content (thẻ, chủ đề) → UI (chỉ đọc trạng thái, phát hành động).

## Quyết định

1. Bản Ô ăn quan xanh dùng để chơi được xây mới ở `src/features/oanquan-v2/`, **2.5D bằng SVG/CSS/DOM**, không phụ thuộc `three`, lazy-load.
2. Ba lớp:
   - `engine/`: TypeScript thuần, không React/DOM/asset/nội dung; xác định (deterministic) với RNG có seed tiêm vào; mọi luật nhóm A qua `RulesConfig` có tham chiếu quyết định cho từng trường; không giá trị mặc định ngầm (`initialPlayer` bắt buộc).
   - `content/`: schema thẻ, chủ đề; chỉ chứa thẻ đã duyệt công khai.
   - `ui/`: React; không tự tính luật; trạng thái Trọng tài (a)–(c) là state UI, chỉ (d) "Chốt kết quả" gửi hành động vào engine.
3. `ringIndex` 0–11 là chuẩn duy nhất; bố cục chỉ là phép xoay (0° ngang, 90° dọc), không phản chiếu; vị trí ô tính bằng hình học, không `transform: scale` toàn bàn.
4. Route V2 chỉ đăng ký khi build dev hoặc bật biến `VITE_ENABLE_OQV2` (để bản production không chứa mã/asset/thẻ chưa duyệt). Đường dẫn cụ thể chốt ở task G2. Xem điều kiện 3 và 4 bên dưới.
5. **Giữ nguyên** prototype 3D, `/games/o-an-quan-xanh`, `/?preview=oanquan3d` và các test hiện có cho tới khi Product Owner nghiệm thu bản thay thế theo 5 điều kiện Brief §11.2 (engine test PASS; chơi trọn ván desktop + mobile thật; a11y cơ bản PASS; nhóm A chốt; test cũ được cập nhật có phê duyệt).

## Điều kiện chấp thuận (Product Owner, 23/11/2026)

1. **Thứ tự giai đoạn:** G2 (tích hợp UI với engine) chỉ bắt đầu sau khi G1 engine PASS.
2. **Prototype UI độc lập:** được phép nghiên cứu trước G1, nhưng mỗi prototype cần **Task ID riêng và phê duyệt riêng** của Product Owner; không được coi là G2, không nối vào route production.
3. **Feature flag phải loại bỏ khỏi production bundle**, không chỉ ẩn route: mọi module, asset và dữ liệu (thẻ, nội dung, artwork) chưa được phép công khai không được có mặt trong `dist/` khi build production. Ẩn link hoặc chặn route ở runtime **không đủ**. Cách làm dự kiến: chỉ tham chiếu `oanquan-v2` qua `import()` nằm trong nhánh điều kiện mà Vite thay bằng hằng số lúc build (`import.meta.env.DEV`, `import.meta.env.VITE_ENABLE_OQV2`), để Rollup loại bỏ cả chunk; không import tĩnh module, asset hay dữ liệu V2 từ bất kỳ file nào nằm ngoài nhánh đó.
4. **Kiểm chứng ở G2:** mỗi task G2 phải chạy `npm run build` ở chế độ production (cờ tắt) và kiểm tra file trong `dist/` (tên chunk, tên asset, chuỗi đặc trưng của thẻ/nội dung V2) để chứng minh không còn mã, asset, dữ liệu chưa được phép; ghi lệnh và kết quả vào log.
5. **Không có luật chơi mặc định:** khi nhóm chưa chốt, engine và UI không được chứa quy tắc gameplay mặc định hay giá trị luật ngầm. Mọi trường luật trong `RulesConfig` phải gắn với một quyết định đã ghi; trường chưa có quyết định thì không có giá trị và engine không chạy với trường đó. Giá trị tạm của mockup G0.5 không phải luật.

## Không thuộc ADR này

- Luật chơi (Rules Matrix V1.3, `OQ-08`, `OQ-14…OQ-16`): nhóm Brainroot quyết.
- Artwork cuối (Token V3), quyền asset AI, quyền công bố thẻ.
- Thời điểm bắt đầu G1: chỉ sau khi nhóm A, C-02, C-03 được chốt và Product Owner cho phép.

## Hệ quả

- Tích cực: không WebGL cho luồng chơi chính; dễ kiểm thử engine bằng `node:test`; dễ đạt yêu cầu bàn phím, reduced motion, vùng chạm; đổi luật chỉ đổi `RulesConfig`.
- Chi phí: tạm thời có hai bản Ô ăn quan trong mã nguồn cho tới khi gỡ bản 3D; cần task riêng để lazy-load hoặc gỡ `three` khỏi bundle chính (không thuộc ADR này).
- Rủi ro: nếu cờ build chỉ ẩn route mà không loại bỏ module, asset/thẻ chưa duyệt vẫn bị deploy cùng `main` (`main` tự deploy GitHub Pages). Điều kiện 3 và 4 xử lý rủi ro này.

## Phương án đã cân nhắc

- **Giữ 3D và thêm luật vào `OAnQuanRuleset`:** trái với Brief G0.5 đã nghiệm thu (2.5D, không WebGL); renderer 3D khó đạt các trạng thái ô, `inert`, vùng chạm theo mockup.
- **Sửa trực tiếp trang `/games/o-an-quan-xanh`:** vi phạm yêu cầu giữ route production cho tới khi nghiệm thu.
