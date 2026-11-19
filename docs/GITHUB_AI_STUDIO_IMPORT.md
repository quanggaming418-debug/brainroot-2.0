# Import từ GitHub vào Google AI Studio — Brainroot 2.0

**Gói này đã gộp 2 ZIP gốc thành một GitHub-ready repository**, gồm:
- `docs/`, `planning/`, `logs/`, `AGENTS.md`: Product Requirements & Agent Workflow.
- `reference/hero-v4/`: **demo nguyên bản** HTML/CSS/JS, bao gồm `assets/`, `docs/`, `preview/`; đường dẫn tương đối vẫn đúng.
- `public/assets/hero-v4/`: bản sao các asset để React sử dụng qua `/assets/hero-v4/...`.
- `src/`, `package.json`, `index.html`: khung React + TypeScript + Vite **chưa chuyển Hero**; phục vụ nhận diện dự án khi import.

## Đưa lên GitHub
1. Tạo **private repository** `brainroot-2.0` (nên private cho dữ liệu, artwork và định hướng thương mại chưa công bố).
2. Dùng **GitHub Desktop (khuyến nghị)** hoặc `git init`, commit/push **nội dung bên trong folder `brainroot-2.0-github-ready`**, không push ZIP nguyên khối.
3. Kiểm tra GitHub root có `package.json`, `AGENTS.md`, `docs/`, `planning/`, `reference/`, `public/`, `src/`.
4. Quyền GitHub của Google AI Studio phải được cấp đúng repo private mới.

## Import vào AI Studio Build Mode
- Mở https://aistudio.google.com/apps → Build mode → Add files (+) → Import from GitHub → chọn `brainroot-2.0`.
- Nếu app trước đó chưa có repo thì ưu tiên **import vào app Build mới** để tránh ghi đè source; AI Studio hiện hỗ trợ GitHub 2-way sync theo docs chính thức.
- Trong prompt yêu cầu đọc `AGENTS.md`, `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/USER_FLOWS.md`, `planning/TASKS.md`, `reference/hero-v4/docs/AI_STUDIO_HANDOFF.md`.
- Task đầu tiên BR-T003: chuyển `reference/hero-v4/index.html`, `styles.css`, `main.js` thành React, sử dụng ảnh sẵn có ở `public/assets/hero-v4` — **không sinh mới mascot, không bỏ lớp ảnh**.
- Luôn xác minh commit/diff trước push/pull; không force push hoặc deploy production.

## Bảo mật và sự thật kỹ thuật
- Không upload token thật, API keys, thông tin người tham gia khảo sát, bộ thẻ trả phí chưa được duyệt.
- Repo này mới là **scaffold**, không tuyên bố đã hoàn thành Hero React hoặc game.
- Gói Hero là **visual baseline**, chưa phải các đối tượng 3D và chưa phải mã nguồn React.
- `Be Vietnam Pro` hiện tải qua Google Fonts khi có kết nối mạng; không lưu font binary.

## Docs tham khảo
- https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
