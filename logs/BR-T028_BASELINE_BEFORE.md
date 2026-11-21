# BR-T028 — Mốc "TRƯỚC" (Bảng B: so sánh trước/sau)

- **Ghi lúc:** 2026-11-21, trước khi sửa code. `git status`: sạch.
- **Commit nền:** `0379bee41b80726eb8e1a47a10ef5661478f0368` (nhánh `codex/docs-br-t026-t027-done`, gồm PR #10, #12 đã merge vào `main`). Nhánh làm việc mới: `codex/br-t028-tod-20-cards`.

## Chức năng `/games/fact-act/play` tại mốc này
- 16 thẻ giữ chỗ `TD-01…TD-16`; `truthText`/`dareText` = `null`; lật thẻ chỉ hiện "Khung nội dung … sẽ nạp trực tiếp".
- Luồng lượt: Chơi → trộn tự động → chọn Truth/Dare → Rút → Lật → Xong / Bỏ qua (4–5 chạm).
- Luật "không chọn Truth hai lượt liên tiếp" và "thẻ không lặp trong phiên": đã chạy (unit test).
- "Bỏ qua" → vòng quay 15 ô `?`; ô kết quả hiện khung chờ (chưa có chữ hình phạt).
- Chưa có đồng hồ cho thử thách có giờ.
- Sách luật 4 trang trải: mô tả cách bản thử vận hành, mỗi trang có dòng "Bản thử · nội dung chờ nhóm duyệt".
- Trang `/games/fact-act` và thư viện `/games` vẫn mô tả "bản chơi thử tình huống ngắn / 3 tình huống / Tình huống–Hành động–Phản tư" (VI), mâu thuẫn bản chơi.
- Bàn chơi có nút ngôn ngữ riêng (VI/EN) trùng với công tắc ở header.
- Kiểm thử nền: `npx tsx --test tests/*.test.ts` 42/42 (theo `planning/TASKS.md`, BR-T027).

---
## Mốc "SAU" (cùng task, nhánh `codex/br-t028-tod-20-cards`, NOT COMMITTED)
- 20 thẻ thật `TD-01…TD-20` VI/EN nguyên văn; chip chủ đề; đếm "Còn N/20 thẻ" khớp; không lặp, hết bài → màn kết thúc (đã chơi hết 20 thẻ trên trình duyệt ở 375px và desktop).
- Đồng hồ cho 5 dare có giờ (TD-01 30s, TD-05 300s, TD-12 60s, TD-14 60s, TD-19 15s); gợi ý ảnh tùy chọn cho TD-03/09/11.
- Rút + lật gộp một chạm: Chơi → chọn Truth/Dare → chạm bộ bài → Xong/Bỏ qua (3 chạm/lượt, trước đây 4–5).
- Bỏ qua → vòng quay Green Penalty, 15 ô gắn 5 hình phạt thật (mỗi hình phạt 3 ô), nút "Chơi tiếp".
- Sách luật = luật 5 bước; hết dòng "chờ nhóm duyệt"; còn một dòng ghi chú "20/63 thẻ".
- `/games/fact-act`, `/games`, trang chủ: không còn "3 tình huống / Tình huống–Hành động–Phản tư".
- Mobile 375px: breadcrumb một dòng (rút gọn còn 3 mục cuối), chỉ còn một nút VI/EN (ở header), nút Brainie nhỏ hơn và chừa chỗ cuối trang.
- Kiểm thử: `npm run typecheck` PASS; `npx tsx --test tests/*.test.ts` 43/43 PASS; `npm run build` PASS; lint NOT RUN (không có script).
