# Ô ĂN QUAN XANH — Bảng quyết định luật (Rules Decision Matrix)

**Phiên bản 1.3 · 23/11/2026 · Gửi nhóm Brainroot để xác nhận**
Soạn cho Product Owner và nhóm Brainroot. Thay thế phiên bản 1.2. **Bản 1.3** chỉ đổi một điểm: **R17 chuyển từ nhóm C sang nhóm A** (phải chốt trước G1), vì nếu các loại hạt có giá trị khác nhau thì phần xử lý luật và cách tính điểm đổi theo. Xem "Thay đổi so với V1.2" ở cuối. Bản 1.2 **không đổi câu hỏi hay phương án luật nào**; chỉ sửa các ghi chú mô tả bản thiết kế cho đúng với mockup G0.5 hiện tại (R21, mục 3.1, 3.5). Xem "Thay đổi so với V1.1" ở cuối.

---

## Đọc trước (1 phút)

**Tài liệu này để làm gì.** Tài liệu luật của nhóm (file Word và 5 bộ thẻ PDF) chưa nói rõ một số chỗ khi chơi. Trước khi viết phần mềm xử lý luật, nhóm cần **trả lời những chỗ đó**. Mỗi mục dưới đây là một câu hỏi, có ô để tick đáp án.

**Điều tài liệu này không làm.** Không tự chọn luật thay nhóm. Ở các mục luật, chúng tôi chỉ ghi: tài liệu nhóm nói gì, có những lựa chọn nào, mỗi lựa chọn ảnh hưởng gì, và bản thiết kế hình ảnh đang tạm vẽ thế nào. Dòng **"Giá trị tạm trong bản thiết kế"** chỉ để bản vẽ có số liệu hiển thị, **không phải đề xuất** và không phải luật. Luật truyền thống của Ô ăn quan chỉ dùng để tham khảo, không phải nguồn luật, trừ chỗ tài liệu nhóm tự viện dẫn (xem R0).

**Cách trả lời nhanh.** Tick ☐ → ☑ ở mỗi mục, hoặc viết đáp án vào chỗ gạch dưới. Không cần biết lập trình. Mục nào chưa chắc thì tick "Chưa quyết, cần thảo luận". Nhóm chỉ cần trả lời **Nhóm A** trước khi làm phần xử lý luật.

**Ký hiệu nguồn.**
- **[Word]** = file `Brainroot - Ô ăn quan .docx`
- **[PDF]** = 5 bộ thẻ chủ đề
- **[Không có]** = tài liệu nhóm không nói gì về chuyện này

**Một số từ dùng trong tài liệu.**
- **Ô Dân**: ô thường (10 ô). **Ô Quan**: ô lớn ở hai đầu bàn (2 ô).
- **Kho bảo tồn**: nơi người chơi cất những hạt đã thu hoạch.
- **Trọng tài**: người nghe câu trả lời và quyết định Đạt hoặc Chưa đạt.
- **Bản thiết kế (G0.5)**: các màn hình vẽ sẵn để xem và góp ý, chưa phải trò chơi chạy được.
- **Phần xử lý luật (G1)**: phần mềm quyết định rải, ăn, tính điểm. Làm sau khi nhóm A được chốt.

## 0. Ba nhóm câu hỏi

| Nhóm | Ý nghĩa | Cần trả lời trước |
|---|---|---|
| **A — Chặn phần xử lý luật** | Đổi cách rải, ăn, tính điểm hoặc kết thúc ván. Thiếu thì không thể làm và kiểm thử đúng. | **G1** |
| **B — Chặn nội dung và luồng** | Đổi dữ liệu thẻ, màn hình cuối hoặc cách Trọng tài làm việc. | G2 (ghép vào website) |
| **C — Hoàn thiện** | Chỉ đổi hình thức, không đổi luật. | G3 |

Bản thiết kế hình ảnh (G0.5) đang được dựng **song song** với việc nhóm trả lời nhóm A, vì bố cục không phụ thuộc đáp án. Những chỗ trên bản vẽ phụ thuộc luật chưa chốt đều có nhãn "LUẬT CHỜ NHÓM CHỐT".

## 1. Bảng tổng hợp

| ID | Câu hỏi | Nhóm | Tài liệu nhóm hiện có | Giá trị tạm trong bản thiết kế (không phải đề xuất) |
|---|---|---|---|---|
| R0 | Chỗ nào tài liệu viện dẫn "luật truyền thống" thì lấy phiên bản nào? | A | Viện dẫn, không nêu phiên bản | Không dùng, bản vẽ không phụ thuộc |
| R1 | 10 Ô Dân xếp 5 chủ đề thế nào? | A | Chỉ liệt kê ô 1–5 | Thứ tự 1–5 lặp lại ở nửa bàn còn lại |
| R2 | Quân Quan bằng bao nhiêu hạt? | A | "5 hoặc 10 tùy thể lệ" | 10 (chỉ để hiển thị điểm mẫu) |
| R3 | Xếp hạt ban đầu thế nào? | A | 50 hạt, 10 ô Dân, 2 quân Quan; không nêu cách xếp | Không hiển thị thế cờ đầu ván |
| R4 | Ô Dân có từ 7 hạt trở lên dùng thẻ cấp mấy? | A | 1–3 hạt: Cấp 1; 4–6: Cấp 2; không nêu ≥7 | Không hiển thị |
| R5 | Ô có cả Quan và Dân dùng thẻ cấp mấy? | A | "Ô Quan dùng Cấp 3" | Không hiển thị |
| R6 | Ai rút thẻ, ai trả lời, ai chấm? | A | Hai chỗ trong Word nói khác nhau | Người rải trả lời, đối thủ chấm |
| R7 | Hết giờ thì sao? | A | Có thời gian từng thẻ; không nêu kết quả hết giờ; Cấp 2 lệch (Word 15s, PDF 20s) | Không hiển thị kết quả hết giờ; Cấp 2 = 20s |
| R8 | Ăn liên tiếp trong một lượt? | A | Không nêu | Một thẻ mỗi lượt (chỉ vì bản vẽ chỉ có một thẻ) |
| R9 | Hết hạt ở hàng của mình thì sao? | A | Không nêu | Không hiển thị |
| R10 | Hạt còn trên bàn khi kết thúc tính thế nào? | A | Chỉ nói "thu hoạch hết 2 Ô Quan" và "tổng Tài nguyên Xanh lớn nhất" | Điểm mẫu chỉ gồm hạt đã thu hoạch |
| R11 | Điều kiện ăn Ô Quan | A | Không nêu | Không hiển thị |
| R12 | Ván kéo dài mãi (bế tắc) thì sao? | A | Không nêu | Không hiển thị giới hạn lượt |
| R14 | Chiều rải chọn khi nào? | A | "Theo chiều kim đồng hồ hoặc ngược lại" | Chọn ở mỗi lượt |
| R15 | Hạt cuối rơi vào ô có hạt thì sao? | A | Chỉ dẫn "như luật truyền thống" | Dải thông báo ghi "theo luật bản thử" |
| R16 | Chi tiết điều kiện "cách 1 ô trống" | A | "cách 1 ô trống đến ô có hạt" | Ô trống liền sau hạt cuối + ô tiếp theo có hạt |
| R24 | Cách tính "Tài nguyên Xanh" | A | "tổng Tài nguyên Xanh lớn nhất" | Hạt = 1, Quan = giá trị R2 (điểm mẫu) |
| **R25 (mới)** | Người chơi được bắt đầu rải từ ô nào? (hàng nào của ai) | A | Không nêu | Hàng dưới của người đang đi |
| **R26 (mới)** | Hạt thu hoạch về kho của ai? | A | "về kho bảo tồn" (không nêu của ai) | Kho của người đang đi |
| R13 | Hòa điểm | B | Không nêu | Màn kết thúc có chỗ cho kết quả hòa |
| R18 | Bộ thẻ riêng cho 2 Ô Quan | B | Word có 1 ví dụ; PDF không có bộ thẻ Quan | Không hiển thị thẻ Quan |
| R19 | Rút thẻ, hết thẻ thì sao? | B | Không nêu | Có màn thông báo hết thẻ (khung rỗng) |
| R20 | Trọng tài: chế độ nào có trong bản chơi thử? | B | Thẻ có mặt "Dành cho Trọng tài" | Hai chế độ trên cùng một thiết bị |
| R21 | Câu mở: thế nào là "đạt"? | B | Đáp án mẫu + ví dụ ("VD:"), không có ngưỡng | Danh sách ý chỉ để ghi lại (bản tóm tắt tạm); **không có ngưỡng, không gợi ý Đạt**; trọng tài quyết |
| R22 | Không đồng ý với kết quả chấm thì sao? | B | Không nêu | Một lần "Xem lại", rồi chung cuộc |
| R17 | "5 loại quân Dân (5 yếu tố cốt lõi)" | **A** *(từ C, V1.3)* | Câu để trống | Một loại hạt trung tính (chưa phân loại theo chủ đề); hình hạt hiện tại là placeholder |
| R23 | Ai đi trước | C | Không nêu | Màn thiết lập có 3 lựa chọn |

*Ghi chú đánh số: R0–R24 giữ như V1. R25 và R26 là hai câu hỏi mới, được phát hiện khi dựng bản thiết kế (xem cuối tài liệu).*

---

## 2. Chi tiết từng câu hỏi

### R0 — Phiên bản luật truyền thống làm chuẩn (A)
- **Câu hỏi:** Word viết "như luật Ô ăn quan truyền thống" nhưng Ô ăn quan có nhiều cách chơi khác nhau theo vùng. Nhóm muốn lấy cách nào khi tài liệu nhóm chưa nói?
- **Tài liệu nhóm nói gì:** [Word] mục 4: "Rải quân … như luật ô ăn quan truyền thống." [Không có] tên hoặc nguồn của phiên bản đó.
- **Các lựa chọn:**
  - (a) Nhóm chỉ ra **một nguồn cụ thể** (sách, bài viết, luật nhóm đã dùng khi chơi thật).
  - (b) Nhóm **tự viết ra** một trang luật rải và ăn.
  - (c) **Không dùng** luật truyền thống: chỗ nào tài liệu nhóm chưa nói thì nhóm quyết từng mục ở bảng này (R8, R9, R11, R15, R16…).
- **Liên quan tới các mục khác:** R8, R9, R11, R15, R16 phụ thuộc vào câu trả lời này. Nếu chọn (a) hoặc (b), các mục đó sẽ lấy theo nguồn đã chọn, nhóm không phải trả lời lại từng mục. Nếu chọn (c), nhóm trả lời từng mục.
- **Nếu không chốt:** các mục trên không thể quyết, phần xử lý luật chưa làm được.
- ☐ (a) Nguồn: ____________________  ☐ (b) Nhóm tự viết, người phụ trách: ____________  ☐ (c) Quyết từng mục  ☐ Chưa quyết

### R1 — Xếp 5 chủ đề vào 10 Ô Dân (A)
- **Câu hỏi:** Mỗi chủ đề xuất hiện ở hai ô. Hai ô cùng chủ đề nằm ở đâu?
- **Tài liệu nhóm nói gì:** [Word] mục 1: "10 Ô Dân (chia thành 05 chủ đề chính)", sau đó chỉ liệt kê ô 1–5.
- **Các lựa chọn:**
  - (a) Thứ tự 1→5 **lặp lại** ở nửa bàn còn lại (Quan A, 1,2,3,4,5, Quan B, 1,2,3,4,5).
  - (b) Hai hàng đối diện **cùng thứ tự theo chiều ngang** (chủ đề giống nhau nằm đối mặt).
  - (c) Nhóm tự đặt.
- **Ảnh hưởng:** quyết định người chơi gặp chủ đề nào theo thứ tự nào khi rải, và ô nào đối diện ô nào.
- **Giá trị tạm trong bản thiết kế (không phải đề xuất):** kiểu (a), để các ô có nhãn chủ đề.
- ☐ (a) ☐ (b) ☐ (c): ____________________ ☐ Chưa quyết

### R2 — Giá trị một quân Quan (A)
- **Tài liệu nhóm nói gì:** [Word] mục 2: Quân Quan "có giá trị tương đương 5 hoặc 10 hạt tài nguyên tuỳ thể lệ tính điểm."
- **Các lựa chọn:** 5 hạt, hoặc 10 hạt.
- **Ảnh hưởng:** 10 làm Quan nặng hơn khi tính điểm cuối; 5 làm điểm chủ yếu đến từ các Ô Dân.
- **Giá trị tạm trong bản thiết kế:** 10 (chỉ để màn kết thúc có số mẫu).
- ☐ 5 ☐ 10 ☐ Chưa quyết

### R3 — Cách xếp hạt ban đầu (A)
- **Tài liệu nhóm nói gì:** [Word] "Quân Dân (50 hạt nhỏ)", "Quân Quan (2 khối lớn)". [Không có] cách xếp lên bàn.
- **Các lựa chọn:** (a) chia đều 50 hạt cho 10 Ô Dân (5 hạt mỗi ô), mỗi Ô Quan 1 quân Quan; (b) cách khác do nhóm quy định.
- **Ảnh hưởng:** quyết định thế cờ lúc bắt đầu.
- ☐ (a) ☐ (b): ____________________ ☐ Chưa quyết

### R4 — Thẻ cấp mấy khi ô Dân có từ 7 hạt trở lên (A)
- **Tài liệu nhóm nói gì:** [Word] mục 4: "1–3 hạt: Cấp 1; 4–6 hạt: Cấp 2; Ô Quan: Cấp 3", và có chỗ ghi "(hoặc theo quy định …)". Không nêu ô Dân có 7 hạt trở lên.
- **Các lựa chọn:** (a) Cấp 3; (b) Cấp 2; (c) cấp thẻ gắn cố định theo ô thay vì theo số hạt; (d) khác.
- **Ảnh hưởng:** (a) ô nhiều hạt gặp thẻ khó nhất; (b) ít chênh lệch độ khó; (c) bỏ mối liên hệ giữa số hạt và độ khó.
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________ ☐ Chưa quyết

### R5 — Thẻ cấp mấy khi ô có cả Quan và Dân (A)
- **Tài liệu nhóm nói gì:** [Word] "Ô Quan dùng Cấp 3."
- **Các lựa chọn:** (a) luôn Cấp 3; (b) tính theo số hạt Dân trong ô; (c) tính theo tổng giá trị.
- ☐ (a) ☐ (b) ☐ (c) ☐ Chưa quyết

### R6 — Ai rút thẻ, ai trả lời, ai chấm (A)
- **Câu hỏi:** Khi có cơ hội ăn, mỗi người làm gì?
- **Tài liệu nhóm nói gì:** [Word] mục 3: "người chơi … phải bốc thẻ"; mục 4: "đối thủ rút thẻ bài". Hai chỗ nói khác nhau. [PDF] mỗi thẻ có mặt "Dành cho Trọng tài".
- **Các lựa chọn:**
  - (a) Đối thủ rút thẻ và làm Trọng tài; người vừa rải trả lời.
  - (b) Người vừa rải tự rút và trả lời; đối thủ chấm.
  - (c) Một người thứ ba làm Trọng tài (xem R20).
  - (d) Khác.
- **Ảnh hưởng:** quyết định ai được xem đáp án và vào lúc nào, và việc của người còn lại.
- **Giá trị tạm trong bản thiết kế:** người vừa rải trả lời, đối thủ chấm (chỉ để màn thẻ có vai).
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________ ☐ Chưa quyết

### R7 — Hết giờ (A)
- **Tài liệu nhóm nói gì:** [PDF] mỗi thẻ có thời gian (15, 20 hoặc 30 giây; 4 thẻ 45 giây). [Word] ví dụ Cấp 2 ghi 15 giây, **lệch với PDF (20 giây)**. Không nêu kết quả khi hết giờ.
- **Các lựa chọn khi hết giờ:** (a) tính Chưa đạt; (b) Trọng tài quyết theo những gì đã nghe; (c) chỉ nhắc, cho nói tiếp.
- **Chỗ lệch thời gian Cấp 2:** ☐ theo PDF (20 giây) ☐ theo Word (15 giây)
- **Lưu ý:** bản thiết kế có hai chế độ trợ năng (+50% thời gian, không bấm giờ) để người cần thêm thời gian vẫn chơi được. Đây là tính năng trợ năng, nhóm có thể bỏ nếu không muốn.
- ☐ (a) ☐ (b) ☐ (c) ☐ Chưa quyết

### R8 — Ăn liên tiếp trong một lượt (A)  *(đã sửa so với V1)*
- **Câu hỏi:** Sau khi ăn xong một ô, nếu ô tiếp theo cũng đủ điều kiện ăn thì có được ăn tiếp trong cùng lượt không?
- **Tài liệu nhóm nói gì:** [Không có]. [Word] chỉ nêu điều kiện kích hoạt thẻ: "cách 1 ô trống đến ô có hạt".
- **Các lựa chọn:**
  - (a) **Được ăn tiếp**: mỗi lần ăn đều phải qua một thẻ; dừng khi một thẻ Chưa đạt.
  - (b) **Mỗi lượt chỉ ăn một lần.**
  - (c) **Theo nguồn luật chọn ở R0** (nếu nhóm chọn (a) hoặc (b) ở R0).
- **Ảnh hưởng:** (a) một lượt có thể có nhiều thẻ, ván nhịp độ hơn; (b) một lượt tối đa một thẻ, ván ngắn hơn.
- **Giá trị tạm trong bản thiết kế (không phải đề xuất):** một thẻ mỗi lượt, vì bản vẽ chỉ minh họa một thẻ.
- ☐ (a) ☐ (b) ☐ (c) ☐ Chưa quyết

### R9 — Hết hạt trên hàng của mình (A)
- **Tài liệu nhóm nói gì:** [Không có].
- **Các lựa chọn:** (a) theo nguồn luật ở R0; (b) người chơi mất lượt; (c) kết thúc ván; (d) cách khác do nhóm quy định (ví dụ lấy hạt từ kho để rải lại).
- **Ảnh hưởng:** nếu không có quy tắc, ván có thể bị kẹt.
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________ ☐ Chưa quyết

### R10 — Hạt còn trên bàn khi ván kết thúc (A)  *(đã sửa so với V1)*
- **Câu hỏi:** Khi cả hai Ô Quan đã được thu hoạch và ván kết thúc, những hạt Dân còn nằm trên bàn có được tính điểm không?
- **Tài liệu nhóm nói gì:** [Word] mục 4: "Khi cả 2 Ô Quan được thu hoạch hết, người có tổng số 'Tài nguyên Xanh' lớn nhất sẽ chiến thắng." Không nói gì về hạt còn lại.
- **Các lựa chọn:**
  - (a) Hạt còn trên bàn **về kho của người sở hữu hàng đó**.
  - (b) Hạt còn trên bàn **không được tính**; điểm chỉ gồm những gì đã thu hoạch qua thẻ.
  - (c) **Chia đôi** cho hai người.
- **Ảnh hưởng (đây là quyết định về cách chơi, không chỉ kỹ thuật):** (a) điểm một phần đến từ **vị trí hạt trên bàn**, nên giữ hạt ở hàng mình có giá trị; (b) điểm đến **hoàn toàn từ việc trả lời thẻ**, bám sát chữ "thu hoạch" của Word hơn; (c) ở giữa. Hai cách (a) và (b) tạo ra hai kiểu chiến thuật khác nhau.
- **Giá trị tạm trong bản thiết kế (không phải đề xuất):** điểm mẫu ở màn kết thúc chỉ gồm hạt đã thu hoạch, vì bản vẽ chưa thể hiện thế cờ cuối ván.
- ☐ (a) ☐ (b) ☐ (c) ☐ Chưa quyết

### R11 — Điều kiện ăn Ô Quan, "quan non" (A)
- **Tài liệu nhóm nói gì:** [Không có].
- **Các lựa chọn:** (a) Ô Quan ăn được theo cùng điều kiện "cách 1 ô trống" như Ô Dân; (b) chỉ ăn được khi ô có đủ số hạt Dân nhất định; (c) theo nguồn luật ở R0.
- ☐ (a) ☐ (b): số hạt ______ ☐ (c) ☐ Chưa quyết

### R12 — Ván bế tắc và giới hạn lượt (A)  *(đã bổ sung lưu ý)*
- **Câu hỏi:** Nếu các thẻ liên tục Chưa đạt thì hạt không rời bàn, không ai thu hoạch được Quan. Ván có kết thúc không, và khi nào?
- **Tài liệu nhóm nói gì:** [Không có]. [Word] chỉ nêu một điều kiện kết thúc: cả hai Ô Quan đã được thu hoạch.
- **Các lựa chọn:**
  - (a) Đặt **giới hạn số lượt** (mỗi bên tối đa ___ lượt), hết thì tính điểm hiện có.
  - (b) **Không giới hạn.**
  - (c) Giới hạn **thời gian thực** của cả ván.
  - (d) Cách khác.
- **Lưu ý:**
  1. Với (b), ván có thể không kết thúc và màn kết thúc không bao giờ xuất hiện.
  2. Với (a) và (c), nhóm cũng cần quyết **tính điểm thế nào khi chưa ai thu hoạch xong Quan** (liên quan R10 và R24).
  3. Số cụ thể là quyết định của nhóm. Ở bước làm phần xử lý luật có thể chạy thử mô phỏng nhiều ván để lấy số liệu tham khảo, nhưng số liệu chỉ để nhóm cân nhắc, không thay nhóm quyết.
- **Giá trị tạm trong bản thiết kế:** chưa hiển thị đồng hồ lượt hay giới hạn lượt.
- ☐ (a) số lượt: ____ ☐ (b) ☐ (c) thời gian: ____ ☐ (d): ____________ ☐ Chưa quyết

### R13 — Hòa điểm (B)
- **Tài liệu nhóm nói gì:** [Không có].
- **Các lựa chọn:** (a) Hòa, cả hai cùng nhận danh hiệu; (b) ai thu hoạch được nhiều Ô Quan hơn thắng; (c) ai trả lời Đạt nhiều thẻ Cấp 3 hơn thắng; (d) khác.
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________ ☐ Chưa quyết

### R14 — Chiều rải (A)
- **Tài liệu nhóm nói gì:** [Word] "theo chiều kim đồng hồ hoặc ngược lại".
- **Cần xác nhận:** chiều rải chọn **ở mỗi lượt** hay **chọn một lần đầu ván**? (Chữ "hoặc ngược lại" có thể hiểu theo cả hai.)
- ☐ Chọn ở mỗi lượt ☐ Chọn một lần đầu ván ☐ Khác: ____________

### R15 — Hạt cuối rơi vào ô đã có hạt (A)
- **Tài liệu nhóm nói gì:** [Không có]; chỉ dẫn "như luật truyền thống" (R0).
- **Tình huống:** hạt cuối rơi vào ô đã có hạt: bốc hết hạt ô đó rải tiếp, hay dừng? Nếu ô tiếp theo là Ô Quan thì sao?
- **Các lựa chọn:** (a) bốc tiếp; (b) dừng lượt; (c) theo nguồn ở R0. Nhóm cần ghi rõ cả trường hợp ô kế tiếp là Ô Quan.
- ☐ (a) ☐ (b) ☐ (c) Trường hợp Ô Quan: ____________ ☐ Chưa quyết

### R16 — Chi tiết điều kiện "cách 1 ô trống" (A)
- **Tài liệu nhóm nói gì:** [Word] "cách 1 ô trống đến ô có hạt".
- **Các tình huống cần nhóm xác nhận** (tính từ hạt cuối vừa rải):
  1. Ô liền sau trống **và** ô kế tiếp có hạt → có cơ hội ăn ô đó?
  2. Hai ô liền sau đều trống → dừng, không ăn?
  3. Ô liền sau **có** hạt → xử lý theo R15?
  4. Ô có hạt là Ô Quan → ăn được không (R11)?
- ☐ Xác nhận (1) ☐ Xác nhận (2) ☐ Xác nhận (3) ☐ Chỉnh: ____________________

### R17 — 5 loại quân Dân ("5 yếu tố cốt lõi") (A)  *(chuyển từ C sang A ở V1.3)*
- **Vì sao phải chốt trước G1:** câu trả lời quyết định phần xử lý luật có một hay nhiều loại hạt, mỗi hạt đáng bao nhiêu điểm, và kho bảo tồn đếm thế nào. Nếu chọn (b) (giá trị khác nhau), phải chốt luôn **giá trị từng loại** và cách đếm ở R24; R10 (hạt còn trên bàn) và R2 (giá trị Quan) cũng phải tính theo cùng thang. Nếu chọn (a) hoặc (c) (cùng giá trị 1), phần xử lý luật chỉ cần một giá trị; còn hình dáng 5 loại hạt có thể làm sau (G3).
- **Tài liệu nhóm nói gì:** [Word] "Chia thành các mô hình/viên gỗ nhỏ tương ứng 5 yếu tố cốt lõi:" rồi để trống; mô tả hạt là "mầm cây non và viên đất tròn trĩnh".
- **Các lựa chọn:** (a) 5 loại hạt tương ứng 5 chủ đề, chỉ khác hình, **cùng giá trị 1**; (b) các loại hạt **có giá trị khác nhau**; (c) chỉ một loại hạt; (d) khác.
- **Lưu ý:**
  1. Danh sách 5 yếu tố **chưa được ghi** trong Word, nhóm cần điền (ô dưới).
  2. Nếu chọn (b), luật tính điểm (R24) và cách hiển thị kho bảo tồn phải đổi theo, nên cần quyết **trước** khi chốt thiết kế hạt.
  3. Bản thiết kế hiện dùng **một loại hạt trung tính** (một hình duy nhất, chưa gắn chủ đề hay giá trị) để không đoán trước câu trả lời. Hình hạt và hai quân Quan hiện là **Token Art V2, chỉ là placeholder**; bộ V3 đang làm riêng, chưa nghiệm thu. Nếu nhóm chọn (a) hoặc (b), hình hạt sẽ được thiết kế cho 5 loại.
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________  5 yếu tố: ______________________

### R18 — Bộ thẻ cho 2 Ô Quan (B)  *(đã bổ sung lưu ý)*
- **Tài liệu nhóm nói gì:** [Word] có 1 thẻ ví dụ Cấp 3 chủ đề Khí hậu. [PDF] chỉ có bộ thẻ cho 5 chủ đề Dân, **không có bộ riêng cho Quan** (tên 2 Ô Quan: "Biến đổi khí hậu & Chuyển đổi sinh thái" và "Bảo tồn đa dạng sinh học & Rừng nguyên sinh").
- **Các lựa chọn:** (a) nhóm viết bộ thẻ riêng cho từng Ô Quan (số thẻ mỗi Quan: ____); (b) dùng chung 30 thẻ Cấp 3 của 5 chủ đề Dân; (c) khác.
- **Lưu ý:**
  1. Cho tới khi có câu trả lời, **tình huống ăn Ô Quan không có thẻ để hiển thị**, nên không thể chơi thử trọn vẹn cho tới cuối ván.
  2. Nếu cần chơi thử sớm, nhóm có thể chọn (b) tạm và ghi rõ là tạm. Đó vẫn là lựa chọn của nhóm.
- ☐ (a) ☐ (b) ☐ (b) tạm cho bản chơi thử, (a) sau ☐ (c): ____________ ☐ Chưa quyết

### R19 — Rút thẻ và hết thẻ (B)
- **Tài liệu nhóm nói gì:** [Không có].
- **Các lựa chọn:** (a) thẻ xáo theo (chủ đề, cấp), không lặp cho đến khi dùng hết rồi xáo lại; (b) rút ngẫu nhiên, có thể lặp; (c) khác.
- **Câu hỏi kèm theo:** khi hết thẻ ở một (chủ đề, cấp), có xáo lại thẻ cũ hay đổi cấp?
- ☐ (a) ☐ (b) ☐ (c): ____________ ☐ Chưa quyết

### R20 — Chế độ Trọng tài có trong bản chơi thử (B)
- Xem phần 3 bên dưới (mô tả M1–M4). Quyết định: bản chơi thử hỗ trợ chế độ nào?
- ☐ M1 ☐ M2 ☐ M3 ☐ M4 (tick các chế độ muốn có)

### R21 — Thế nào là "đạt" với câu hỏi mở (B)  *(đã bổ sung lưu ý)*
- **Tài liệu nhóm nói gì:** [PDF] đáp án trọng tài có những chỗ như "Nêu được 2 ý", "Nêu đủ 3 quy tắc", "Giải thích được …", kèm ví dụ ("VD:"). 83 trong 100 thẻ là câu hỏi mở.
- **Câu hỏi:** ví dụ trong đáp án là **đáp án duy nhất** hay chỉ là gợi ý? Cần mấy ý thì tính Đạt? Câu trả lời khác chữ nhưng cùng ý có được chấp nhận không?
- **Các lựa chọn:**
  - (a) Mỗi thẻ có **danh sách ý chính** và **số ý tối thiểu**; ý đúng nghĩa dù khác chữ vẫn được tính.
  - (b) **Trọng tài toàn quyền** quyết Đạt hoặc Chưa đạt; danh sách ý chỉ để tham khảo.
  - (c) Khác.
- **Lưu ý:**
  1. Phần mềm **không tự chấm câu mở** và không dùng AI để chấm. Chấm luôn do người.
  2. Các thẻ hiện **chưa có danh sách ý chính**; ai tách và ai duyệt là việc nội dung (xem phần 4, C4 và C5).
  3. Trong bản thiết kế (mockup G0.5, cập nhật 23/11/2026), danh sách ý (3 ý cho thẻ "Ma Trận Rửa Bát") là **bản tóm tắt tạm do chúng tôi soạn từ đáp án mẫu**, chỉ để trọng tài ghi lại các ý đã nghe. Mockup **không hiển thị ngưỡng nào** (không có "đủ 2/3 ý", không đếm "x/y ý", không gợi ý Đạt); trọng tài tự quyết Đạt hay Chưa đạt. Nếu nhóm chọn (a), giao diện sẽ cần thêm cách hiển thị ngưỡng theo quyết định của nhóm.
- ☐ (a) ☐ (b) ☐ (c): ____________ ☐ Chưa quyết

### R22 — Khi người chơi không đồng ý kết quả chấm (B)
- **Tài liệu nhóm nói gì:** [Không có].
- Xem phần 3.5 (quy trình thiết kế đề xuất để nhóm xác nhận hoặc chỉnh).
- ☐ Đồng ý quy trình ☐ Chỉnh: ____________________

### R23 — Ai đi trước (C)
- **Tài liệu nhóm nói gì:** [Không có].
- **Các lựa chọn:** (a) rút ngẫu nhiên; (b) người chơi tự chọn khi thiết lập; (c) khác.
- ☐ (a) ☐ (b) ☐ (c): ____________

### R24 — Cách đếm "Tài nguyên Xanh" (A)
- **Tài liệu nhóm nói gì:** [Word] "tổng số 'Tài nguyên Xanh' lớn nhất"; trả lời đúng thì "thu thập toàn bộ 'Tài nguyên' trong ô về kho bảo tồn".
- **Các lựa chọn:** (a) mỗi hạt = 1, mỗi quân Quan = giá trị ở R2, cộng dồn; (b) có thêm điểm theo cấp thẻ; (c) khác.
- ☐ (a) ☐ (b): ____________ ☐ (c): ____________ ☐ Chưa quyết

### R25 — Người chơi được bắt đầu rải từ ô nào? (A) — **mới**
- **Câu hỏi:** Mỗi người chỉ được chọn ô ở một hàng của mình, hay chọn ô Dân bất kỳ có hạt?
- **Tài liệu nhóm nói gì:** [Không có]. Bản thiết kế cần biết để tô sáng "ô chọn được" và hiện lý do khi chạm vào ô không chọn được.
- **Các lựa chọn:** (a) mỗi người một hàng (cần quy định hàng nào của ai); (b) bất kỳ ô Dân nào có hạt; (c) theo nguồn luật ở R0; (d) khác.
- **Giá trị tạm trong bản thiết kế (không phải đề xuất):** người đang đi chọn ô ở hàng dưới.
- ☐ (a) ☐ (b) ☐ (c) ☐ (d): ____________ ☐ Chưa quyết

### R26 — Hạt thu hoạch về kho của ai? (A) — **mới**
- **Câu hỏi:** Khi một ô được thu hoạch (trả lời Đạt), hạt vào kho của ai?
- **Tài liệu nhóm nói gì:** [Word] "về kho bảo tồn", không nói của ai. Vì [Word] mục 4 cũng nói đối thủ rút thẻ (R6), dễ hiểu theo hai cách khác nhau.
- **Các lựa chọn:** (a) vào kho của người vừa rải (người tạo cơ hội ăn); (b) vào kho của người trả lời thẻ; (c) khác.
- **Giá trị tạm trong bản thiết kế (không phải đề xuất):** kho của người đang đi (người vừa rải).
- ☐ (a) ☐ (b) ☐ (c): ____________ ☐ Chưa quyết

---

## 3. Cách Trọng tài làm việc trong ứng dụng

Phần này mô tả **cách ứng dụng hỗ trợ Trọng tài**, không phải luật chơi mới. Đây là **đề xuất thiết kế cần nhóm xác nhận hoặc chỉnh** (R20, R22). Lý do cần: 83 trong 100 thẻ là câu mở, mà ứng dụng **không tự chấm câu mở và không dùng AI chấm**. Trọng tài luôn là người; ứng dụng chỉ giúp bằng đáp án mẫu và danh sách ý chính.

### 3.1 M1 — Hai người dùng chung một thiết bị (đối thủ là Trọng tài)
1. Người rải thực hiện nước đi.
2. Ứng dụng báo: "Cơ hội ăn ở ô [chủ đề], thẻ cấp [N]".
3. Màn thẻ hiện **Bối cảnh, Thử thách và đồng hồ**. **Đáp án chưa hiện.**
4. Người trả lời nói bằng lời, rồi bấm **Xong** (hoặc hết giờ).
5. Trọng tài bấm **Mở đáp án mẫu**. Đáp án và danh sách ý hiện cho **cả hai cùng thấy**.
6. Trọng tài tick các ý đã nghe (chỉ để ghi lại), chọn **Đạt** hoặc **Chưa đạt**, xem lại, rồi bấm **Chốt kết quả**. Kết quả chỉ ghi vào ván khi chốt.
- **Vì sao không cần chuyển máy:** đáp án chỉ mở sau khi người trả lời đã nói xong.
- **Rủi ro:** đối thủ có thể có lợi khi chấm Chưa đạt. Giảm nhẹ bằng danh sách ý tick công khai từng ý, và bước xem lại ở 3.5.

### 3.2 M2 — Trọng tài độc lập (người thứ ba: giáo viên, bạn, chủ nhiệm CLB)
- Khi thiết lập chọn "Người thứ ba chấm", có thể nhập tên (không bắt buộc, không lưu).
- Dùng **cùng một thiết bị**. Quy trình như M1, nút Đạt / Chưa đạt ghi tên Trọng tài.
- Không có khóa kỹ thuật (không đăng nhập, không mã PIN): dựa vào sự tin cậy giữa những người chơi.
- **Trọng tài dùng thiết bị riêng (từ xa):** cần đồng bộ thời gian thực, **để phiên bản sau (V3)**, không có trong bản chơi thử.

### 3.3 M3 — Câu trắc nghiệm tự chấm
- **Đối tượng:** thẻ có đáp án duy nhất rõ ràng (chọn A/B/C, đúng/sai). Số liệu sơ bộ: khoảng 17 trong 100 thẻ trông như vậy, **cần xác nhận từng thẻ**. Một số thẻ vừa chọn vừa yêu cầu giải thích ("vì sao"), phần giải thích vẫn do Trọng tài.
- **Ba loại thẻ cần gắn vào dữ liệu:** `auto` (chọn đúng là đủ), `hybrid` (tự chấm phần chọn, Trọng tài đánh giá phần giải thích), `referee` (hoàn toàn do Trọng tài).
- **Câu hỏi cho nhóm:** có cho phép tự chấm không, hay thẻ trắc nghiệm vẫn do Trọng tài?
- ☐ Cho phép tự chấm ☐ Luôn do Trọng tài ☐ Khác: ____________

### 3.4 M4 — Chế độ lớp học (giáo viên làm Trọng tài, chiếu màn hình)
- Chỉ ghi nhận để lập kế hoạch sau (V3). Không thuộc bản chơi thử.

### 3.5 Khi người chơi không đồng ý kết quả (R22)
Tài liệu nhóm không có quy trình này. Chúng tôi đề xuất bản tối giản, **không thêm luật mới**:
1. Trọng tài tick các ý đã nghe và chọn Đạt hoặc Chưa đạt. Ứng dụng hiện lựa chọn đó; **chưa ghi vào ván** và **không hiện số ý đạt trên số ý yêu cầu** (R21 chưa có ngưỡng).
2. Người trả lời có nút **Xem lại** (một lần): cả hai cùng xem danh sách ý, Trọng tài có thể tick lại.
3. Trước khi chốt có màn **Xem lại**: trọng tài có thể sửa lựa chọn. Bấm **Chốt kết quả** thì là chung cuộc (không có bước thứ ba). **Đặc tả hiện tại không có hoàn tác sau khi chốt**; chỉ sửa được trước khi chốt, trừ khi nhóm duyệt quy tắc khác.
4. Sau khi chốt, cả hai cùng thấy danh sách ý, để cuộc nói chuyện tập trung vào "ý nào chưa đủ" thay vì "tôi bị chấm sai".
5. Với M2 và M4, Trọng tài quyết định cuối cùng.
- **Nhật ký ván:** lưu cục bộ trên thiết bị (đạt hoặc chưa đạt, có xem lại hay không) để xem lại sau ván. Không gửi lên máy chủ, không dữ liệu cá nhân.
- ☐ Đồng ý quy trình ☐ Chỉnh: ____________________

---

## 4. Nội dung và phát hành (tách bản chơi thử khỏi mục tiêu 100 thẻ)

| ID | Câu hỏi | Đề xuất thiết kế (cần nhóm xác nhận) |
|---|---|---|
| C1 | **Bản chơi thử** dùng những thẻ nào? | Chỉ thẻ đã được người duyệt. Tối thiểu 3 thẻ cho mỗi tổ hợp (chủ đề × cấp), tức 45 thẻ, để một ván không bị lặp thẻ |
| C2 | **Mục tiêu bản đầy đủ** | 100 thẻ + bộ thẻ Quan (R18), sau khi duyệt toàn bộ |
| C3 | **Quyền dùng 100 hình minh họa** trích từ PDF | **Chưa công khai** cho tới khi nhóm xác nhận quyền dùng (cùng trạng thái BR-T002). Thẻ phải chơi được **không cần hình**. Bản thiết kế dùng khung giữ chỗ và linh vật Brainie, Rootie đã duyệt |
| C4 | Ai duyệt số liệu và lời giải trong thẻ? | Nhóm chỉ định người duyệt; mỗi thẻ có trạng thái duyệt và nguồn tham khảo |
| C5 | Ai tách danh sách ý chính (R21)? | Làm trước cho 45 thẻ của bản chơi thử |
| C6 | Khi nào bỏ nhãn "Luật bản thử"? | Giữ nhãn cho tới khi toàn bộ nhóm A được chốt |
| C7 | Cách truy cập bộ thẻ | Chưa quyết trong lượt này |

**Mốc:** bản chơi thử chỉ cần C1, C3, C5 và nhóm A. Bộ 100 thẻ đầy đủ **không chặn** bản chơi thử.

---

## 5. Danh sách việc cần nhóm trả lời

- **Nhóm A (trước G1) — 20 mục:** R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R14, R15, R16, **R17**, R24, R25, R26.
- **Nhóm B (trước G2) — 6 mục:** R13, R18, R19, R20, R21, R22.
- **Nhóm C (trước G3) — 1 mục:** R23.

Nếu nhóm chọn (a) hoặc (b) ở R0, nhiều mục nhóm A (R8, R9, R11, R15, R16) sẽ được trả lời cùng lúc theo nguồn đã chọn.

---

## 6. Thay đổi so với V1

| Mục | Thay đổi |
|---|---|
| Toàn bộ | Viết lại bằng ngôn ngữ dễ hiểu; thêm phần "Đọc trước" và từ vựng; mỗi mục theo cùng một khung. Cột "Đề xuất" trong bảng tổng hợp đổi thành **"Giá trị tạm trong bản thiết kế (không phải đề xuất)"**. Ở mục luật không còn dòng "Đề xuất" chọn hộ nhóm. |
| R0 | V1 vừa đề xuất "(b) nhóm tự viết" vừa để nhiều mục khác "theo R0". Nay R0 chỉ là câu hỏi với ba lựa chọn trung lập; các mục phụ thuộc ghi rõ mối liên hệ. |
| R8 | V1: bảng tổng hợp ghi "cho phép ăn tiếp, dừng ở lần chưa đạt", phần chi tiết lại ghi "theo R0, nếu không thì chỉ một lần". Nay cả hai chỗ cùng ba lựa chọn (a)/(b)/(c), không ngả về phương án nào. |
| R10 | V1: bảng tổng hợp ghi "về kho bên sở hữu hàng", phần chi tiết lại nghiêng về "không tính". Nay cùng ba lựa chọn, nêu rõ đây là quyết định về cách chơi (điểm từ vị trí hạt hay từ thẻ). |
| R12 | Bổ sung lưu ý: ván có thể không kết thúc, quan hệ với R10 và R24, số liệu mô phỏng chỉ để tham khảo. |
| R17 | Bổ sung lưu ý: danh sách 5 yếu tố chưa có; nếu hạt khác giá trị thì R24 và kho phải đổi; bản vẽ dùng một loại hạt trung tính. |
| R18 | Bổ sung lưu ý: PDF không có thẻ Quan nên ăn Quan chưa có thẻ để hiển thị; lựa chọn "(b) tạm cho bản chơi thử" ghi rõ là lựa chọn của nhóm. |
| R21 | Bổ sung lưu ý: phần mềm không tự chấm câu mở; thẻ chưa có danh sách ý chính; danh sách ý và "2/3" trên bản vẽ là bản tóm tắt tạm của chúng tôi, không phải đề xuất. |
| R25, R26 | **Mới.** Phát hiện khi dựng bản thiết kế: "chọn ô nào" và "hạt thu hoạch về kho ai" chưa có trong tài liệu nhóm lẫn V1. |
| R1–R7, R9, R11, R13–R16, R19, R22–R24 | Bỏ các dòng "Đề xuất" chọn phương án; giữ nguyên nội dung câu hỏi và lựa chọn, làm rõ ảnh hưởng. |
| Phần 3, 4 | Giữ các mô hình Trọng tài M1–M4 và phần nội dung, ghi rõ đây là đề xuất thiết kế về cách ứng dụng hoạt động, không phải luật chơi. |

---

## 7. Thay đổi so với V1.1 (23/11/2026)

| Mục | Thay đổi |
|---|---|
| R21 (bảng tổng hợp, lưu ý 3) | Sửa mô tả bản thiết kế: mockup không còn hiển thị "đủ 2/3 ý" hay gợi ý Đạt. Ba phương án (a)/(b)/(c) **giữ nguyên** cho nhóm quyết định. |
| 3.1 bước 6 | Thêm bước Xem lại và Chốt kết quả; kết quả chỉ ghi vào ván khi chốt. |
| 3.5 (R22) | Bỏ "hiện số ý đạt trên số ý yêu cầu"; bỏ "Hoàn tác trong 5 giây" khỏi đặc tả hiện tại; chỉ sửa trước khi chốt. Ô lựa chọn ☐ Đồng ý / ☐ Chỉnh giữ nguyên. |

---

## 8. Thay đổi so với V1.2 (23/11/2026)

| Mục | Thay đổi |
|---|---|
| R17 | Chuyển từ nhóm C sang **nhóm A**: nếu nhóm chọn các loại hạt có giá trị khác nhau, phần xử lý luật và cách tính điểm (R24, R10, R2) phụ thuộc trực tiếp. Lựa chọn (a)–(d) giữ nguyên. Ghi rõ hình hạt hiện tại là Token Art V2 placeholder. |
| Phần 5 | Nhóm A: 20 mục; nhóm C: 1 mục (R23). |
