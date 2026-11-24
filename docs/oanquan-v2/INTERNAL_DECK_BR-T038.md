# BR-T038 — Bộ thẻ giáo dục gốc (chỉ nội bộ)

> Tài liệu này **không chứa nội dung thẻ hay đáp án**. Bộ 100 thẻ chỉ được dùng để phát triển/kiểm thử nội bộ, **chưa được công bố công khai** (Product Owner, 24/11).

## Lưu trữ và nạp dữ liệu
- Dữ liệu thật: `internal-data/cards.internal.json` — thư mục đã `gitignore`, không nằm trong `public/`, không commit PDF/nội dung/đáp án.
- Nạp dev-only: `src/features/oanquan-v2/content/activeDeck.ts` dùng `import.meta.glob` chỉ khi `import.meta.env.DEV`. Build production không chứa chuỗi nào của bộ thẻ (đã quét `dist/`).
- Dự phòng: thiếu tệp hoặc tệp không qua `validateDeckFile` → dùng `DEMO_CARDS`. Repo chạy được không cần bộ nội bộ.
- Máy khác không có `internal-data/` sẽ chơi bằng thẻ DEMO.

## Schema (`content/internalDeck.ts`)
`InternalDeckFile { schemaVersion: 1, count, cards[] }`, mỗi thẻ: `id` (`<chủ đề>-<số thẻ 01–20>`), `theme`, `no`, `level` (1–3), `levelName`, `title`, `context` (Bối cảnh), `challenge` (Thử thách), `timeSec`, `sampleAnswer` (mặt đáp án "Tiêu chí đánh giá" (nhãn UI; dữ liệu nguồn giữ "Trọng tài duyệt khi"), nguyên văn), `source { file, cardPage, answerPage }`.

Kiểm tra cấu trúc: đúng 100 thẻ, id duy nhất, mỗi chủ đề 7 Cấp 1 + 7 Cấp 2 + 6 Cấp 3, có thời gian và đủ trường văn bản.

## Quy tắc chơi
- Rút thẻ theo chủ đề của ô bị ăn + cấp; không lặp trong nhóm cho tới khi hết nhóm.
- Thời gian: lấy từ `timeSec` của từng thẻ (15/20/30, bốn thẻ Cấp 3 là 45s), không dùng mặc định theo cấp.
- Trắc nghiệm tự chấm **chỉ khi** phần Thử thách có phương án A/B(/C), đáp án gốc bắt đầu bằng "Chọn X" và thử thách không yêu cầu giải thích. Hiện có 6 thẻ. Mọi thẻ còn lại (kể cả thẻ có phương án nhưng bắt giải thích, hoặc phương án nằm ở Bối cảnh) là câu hỏi mở: đối phương bấm Đạt/Chưa đạt, đáp án mẫu mở nội tuyến.
- Không có luồng Trọng tài nhiều bước (giữ luồng rút gọn BR-T036).

## Ánh xạ Ô Quan (TẠM — `OQ-17`)
Tài liệu gốc chỉ có 5 chủ đề, không có bộ thẻ riêng cho hai Ô Quan. Tạm rút thẻ **Cấp 3** có sẵn:
| Ô Quan | Nguồn thẻ Cấp 3 | Số thẻ |
|---|---|---|
| Biến đổi khí hậu | Năng lượng + Tiêu dùng | 12 |
| Đa dạng sinh học | Không gian xanh + Nước + Rác thải | 18 |

Không tạo thẻ mới. Cần nhóm Brainroot chốt bộ thẻ Quan chính thức.

## Chưa làm / hạn chế
- Chưa có phê duyệt công bố công khai (`OQ-18`).
- Trích xuất dùng PyMuPDF; script nằm ngoài repo (scratchpad), không chứa nội dung thẻ.
- Chưa thử trên thiết bị thật; lint NOT RUN.
