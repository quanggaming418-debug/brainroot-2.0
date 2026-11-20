# Brainroot 2.0

Repo chứa trang giới thiệu Brainroot bằng React và TypeScript. Xem `planning/PROJECT_STATE.md` để biết trạng thái hiện tại và `docs/GITHUB_AI_STUDIO_IMPORT.md` nếu làm việc với Google AI Studio.

- `src/` chứa Hero V4 và phần giới thiệu bốn khu vực của hệ sinh thái.
- `reference/hero-v4/` lưu nguyên demo tĩnh Hero V4.
- `public/assets/hero-v4/` chứa artwork dùng trong Hero.
- `AGENTS.md`, `docs/`, `planning/`, `logs/` là tài liệu làm việc và nhật ký AI.

## Chạy trên máy

```sh
npm ci
npm run dev
```

Kiểm tra bằng `npm run typecheck`, `npm run build` và `npx --yes tsx --test tests/br-t003.test.ts`.

---

# Brainroot 2.0 — Product & AI Engineering Handbook

> **Bản đặc tả v0.2 | 20/11/2026 | Trạng thái: DRAFT — cần leader/product owner phê duyệt trước khi coi là cam kết**

**Mission (nguyên văn):** “DỰ ÁN NÂNG CAO NHẬN THỨC VÀ KẾT NỐI GIỚI TRẺ VỀ KỸ NĂNG XANH THÔNG QUA SẢN PHẨM GIÁO DỤC TƯƠNG TÁC.”  
**Slogan (nguyên văn):** “From Brainrot to Brainroot”.

Tài liệu dưới đây ghi lại định hướng sản phẩm và quy trình làm việc. Xác nhận các mục `TO CONFIRM` với product owner trước khi triển khai phần liên quan.

## Bắt đầu theo đúng thứ tự
1. Người phụ trách sản phẩm đọc `docs/PRD.md` và `planning/OPEN_QUESTIONS.md`; chấp thuận/chỉnh những quyết định đang ở trạng thái *proposed*.
2. Chốt luồng người dùng bằng `docs/USER_FLOWS.md`, scope bằng `planning/ROADMAP.md`, acceptance criteria bằng `planning/TASKS.md`.
3. Tạo repository GitHub làm **source of truth**. AI Studio Build Mode có thể import/push/pull GitHub; Codex làm việc trên cùng repo ở branch riêng. Xác minh sync qua commit/diff, tránh ghi đè.
4. Bắt đầu với `prompts/AI_STUDIO_START.md` (UI) hoặc `prompts/CODEX_START.md` (logic/review). Gửi cho AI Studio tóm tắt PRD/brand/assets và yêu cầu nó đọc các file đã import; **không mặc định AI Studio tự nhận file hướng dẫn**. Mỗi lần chỉ giao một Task ID.
5. Kết thúc mỗi task: chạy kiểm thử → cập nhật TASKS/PROJECT_STATE → append log riêng → cập nhật HANDOFF nếu chuyển agent.

## Các tài liệu mới sau khi đổi workflow
- `docs/AI_STUDIO_CODEX_WORKFLOW.md`: quy trình AI Studio Build Mode ↔ GitHub ↔ Codex.
- `docs/ASSET_AUDIT.md`: kiểm toán 6 SVG xuất từ Canva và giới hạn animation.
- `prompts/AI_STUDIO_START.md`: prompt khởi động UI cho Google AI Studio.
- `logs/AI_STUDIO_LOG.md`: nhật ký riêng của AI Studio.

## Nguồn sự thật (single source of truth)
| Vấn đề | File chuẩn |
|---|---|
| Mục tiêu, chức năng, tiêu chí nghiệm thu | `docs/PRD.md` |
| User journeys và trạng thái lỗi | `docs/USER_FLOWS.md` |
| UI/motion/brand | `docs/DESIGN_SYSTEM.md` |
| Phạm vi theo giai đoạn | `planning/ROADMAP.md` |
| Task thực hiện | `planning/TASKS.md` |
| Trạng thái dự án hiện tại | `planning/PROJECT_STATE.md` |
| Trạng thái sản phẩm trước/sau Hackathon | `docs/HACKATHON_COMPLIANCE.md` + Git commits/evidence |
| Lịch sử công việc agent | `logs/AI_STUDIO_LOG.md`, `logs/CODEX_LOG.md` |
| Bàn giao agent tiếp theo | `logs/HANDOFF.md` |
| Quyết định kiến trúc | `docs/decisions/*.md` |

**Quan trọng:** log là ghi chép, không thay thế kiểm thử, commit Git hoặc xác nhận của người phụ trách. Hai agent không được tự đánh dấu `DONE` khi chưa có bằng chứng.

## Nguồn dữ liệu đầu vào
- Hồ sơ Brainroot 16 trang (người dùng cung cấp).
- Gói `[TLKNST] - Brainroot` (Design Thinking, Fact–Act VN/EN, 5 bộ Ô ăn quan xanh, ảnh sản phẩm, link website cũ).
- Kế hoạch số **1968/KH-ĐHNN ngày 03/11/2026** và slide tập huấn **18/11/2026** của ULIS.
- Yêu cầu mới của nhóm và reference video do product owner cung cấp; website cũ **KHÔNG** làm nền mã nguồn của dự án mới.

Các số liệu khảo sát chưa có dữ liệu thô trong gói; không công bố như kết quả kiểm chứng độc lập. Tham khảo `docs/RESEARCH_REFERENCES.md`.
