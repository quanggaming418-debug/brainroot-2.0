# Brainroot 2.0 — GitHub/Ai Studio Ready Project

**Đây là repo starter cho Google AI Studio, chưa phải website hoàn chỉnh.** Đọc `docs/GITHUB_AI_STUDIO_IMPORT.md` trước khi import.

- `src/` là React + TypeScript khởi tạo (Task BR-T003 vẫn TODO).
- `reference/hero-v4/` lưu nguyên demo tĩnh Hero V4.
- `public/assets/hero-v4/` chứa các artwork cần tích hợp bằng React.
- `AGENTS.md`, `docs/`, `planning/`, `logs/` là tài liệu làm việc và nhật ký AI.

---

# Brainroot 2.0 — Product & AI Engineering Handbook

> **Bản đặc tả v0.2 | 20/11/2026 | Trạng thái: DRAFT — cần leader/product owner phê duyệt trước khi coi là cam kết**

**Mission (nguyên văn):** “DỰ ÁN NÂNG CAO NHẬN THỨC VÀ KẾT NỐI GIỚI TRẺ VỀ KỸ NĂNG XANH THÔNG QUA SẢN PHẨM GIÁO DỤC TƯƠNG TÁC.”  
**Slogan (nguyên văn):** “From Brainrot to Brainroot”.

Đây là **gói tài liệu**, không phải mã nguồn ứng dụng đã chạy. Copy toàn bộ file/folder vào root của repository Brainroot 2.0 mới, sau đó chỉnh các mục `TO CONFIRM` trước khi đưa yêu cầu làm code cho agent.

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
