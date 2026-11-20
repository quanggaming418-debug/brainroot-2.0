# CODEX_LOG — Append-only

- **Started:** 2026-11-20
- **Status:** NO AGENT IMPLEMENTATION ENTRIES YET
- **Policy:** Mỗi task/session append một block theo `templates/WORK_LOG_TEMPLATE.md`. Ghi những file đã sửa, lệnh kiểm thử và kết quả thực; không ghi ý định như đã hoàn thành.

---

<!-- Append NEW sessions below. Do not edit or delete old sessions. -->

## Session: 2026-11-20 08:37+07:00 — Codex — BR-T003

- **Task & goal:** Sửa các phát hiện từ review độc lập trong phạm vi owner đã duyệt, ứng với BR-FR-001 và BR-FR-006.
- **Status before → after:** `IN_REVIEW` → `DONE` theo tiêu chí nghiệm thu cục bộ. Bản sửa chờ duyệt commit riêng.
- **Read context:** `AGENTS.md`, README, PROJECT_STATE, ROADMAP, TASKS, HANDOFF, AI Studio log, PRD, DESIGN_SYSTEM, ACCESSIBILITY, USER_FLOWS, quy tắc UI và mã Hero V4.
- **Files changed:** `src/App.tsx`; `AboutSection.tsx`, `EcosystemSection.tsx`, `PrimaryCTA.tsx`, `SiteHeader.tsx` trong `src/components/landing/`; `src/utils/focusAnchorTarget.ts`; `src/data/landing.ts`; `src/styles/landing.css`, `src/styles/tokens.css`; `package-lock.json`; README, TASKS, PROJECT_STATE, CODEX_LOG và HANDOFF.
- **User-visible behavior changed:** Mascot/lá chạy một lượt tối đa 4,8 giây. Tùy chọn giảm chuyển động vẫn tắt animation, parallax và cuộn mượt. CTA/menu chuyển focus đến nội dung đích, Escape trả về nút menu và skip link dẫn tới main. Dùng màu riêng cho chữ tiêu đề để đạt tương phản trên nền Hero. Copy công khai nêu rõ các trải nghiệm chưa mở.
- **Tests actually executed:**
  - `npm install`: PASS, tạo lockfile cho dependency hiện có. `npm ci`: PASS, hash lockfile giữ nguyên sau khi dừng Vite và chạy lại (lần đầu Windows khóa `esbuild.exe`).
  - `npm run typecheck`: PASS, exit 0. `npm run build`: PASS, exit 0, Vite 7.3.8, 41 modules.
  - `npx --yes tsx --test tests/br-t003.test.ts`: PASS, 5/5. `npm audit`: PASS, 0 lỗ hổng được báo cáo.
  - `npm run preview -- --host 127.0.0.1 --port 4174 --strictPort` và `node verify-final.cjs` (script tạm, có `BRAINROOT_QA_URL=http://127.0.0.1:4174/`): PASS, Chromium 153.0.8010.12 ở 1440×900, 390×844, 320×740. Desktop và hai mobile không tràn ngang. Mỗi viewport tải 8/8 ảnh (tính cả ảnh nền dự phòng) và Chromium dùng Be Vietnam Pro cho chữ tiếng Việt. 0 lỗi console, 0 request thất bại.
  - Trên cả ba viewport: PASS cho Tab → skip → main → CTA → `#worlds`, focus đích, cuộn và Back; 4 phần tử chuyển động đều dừng; reduced motion cho 0 animation, 3 transform `none` và cuộn tức thời. Trên hai mobile: PASS cho 5/5 đích menu, Escape và focus. Parallax desktop ba lớp lệch dưới 12 px: PASS.
  - `node visual.cjs` và `node zoom.cjs` (script tạm): PASS, đối chiếu ảnh sau giải mã và cây accessibility, xác nhận vùng đích có tên và được focus; zoom Chromium 200% không tràn ngang, CTA dùng được bằng bàn phím.
  - Tương phản chữ: PASS sau sửa, 40 mẫu mỗi viewport gồm CTA hover và menu mở trên mobile. Giá trị tối thiểu 4,69:1 cho chữ thường và 3,59:1 cho chữ lớn (ghi xuống 2 chữ số thập phân). Đo màu chữ CSS trên mẫu pixel nền thực tại vị trí nét chữ. Axe: 0 vi phạm tự động, yêu cầu đối chiếu thủ công phần nền ảnh đã được đo riêng.
  - `npm run lint`: NOT RUN (không có script). Screen reader thật, Safari iOS và Chrome Android trên thiết bị thật: NOT RUN.
  - Dữ liệu trình duyệt của phiên: thư mục tạm `%TEMP%/brainroot-qa-68dc4280-fb9b-45c3-88f7-c981fd1b6561` có `browser-results.jsonl`, `contrast-*.json` và ảnh Hero. Playwright Core điều khiển Chromium có sẵn, axe-core quét accessibility, pngjs đọc pixel ảnh. Các công cụ chỉ cài trong thư mục tạm.
- **Acceptance criteria:** PASS cho React/TS và shell modular, brand + Be Vietnam Pro, một CTA chính, artwork Brainie/Rootie và ba lớp cảnh, bốn khu vực Ecosystem, responsive, bàn phím và focus, reduced motion, tương phản chữ đã đo, typecheck/build/unit. Kiểm tra tự động và cây accessibility chỉ là bằng chứng trong phạm vi phiên kiểm thử.
- **Bugs / tradeoffs / risk:** Không còn P0/P1 trong phạm vi BR-T003 đã xác minh. Kiểm tra thêm thiết bị thật và screen reader là P2. Quyền xuất bản artwork xử lý theo BR-T002.
- **Git commit SHA:** Nhánh `codex/br-t003-remediation`, HEAD nền `275f5ed4d64811c079540135ef42abc4d447b634`. Bản sửa **NOT COMMITTED**.
- **What remains / next task:** Owner xem diff và duyệt commit khi sẵn sàng. BR-T004 chờ giao riêng.
- **Owner approval required:** Có cho commit, push, merge hoặc deploy theo phạm vi được cấp.
