# Truth or Dare V1 — Bàn giao asset trang trí

Đợt intake này chuẩn bị 19 SVG trong `public/assets/truth-or-dare/v1/experience/` cho Google AI Studio. Bộ này có nền bàn, lớp cây, khung thẻ trống, trang sách trống, bánh xe dấu hỏi, khung chat và họa tiết. Nó chưa được gắn vào giao diện.

Khi được giao bước tích hợp, dùng `publicUrl('/assets/truth-or-dare/v1/experience/background/tabletop_desktop.svg')`. Vite tự thêm base `/brainroot-2.0/`. Giữ thư mục con để có thể đối chiếu với gói scaffold. Tái sử dụng mascot đã có trong repo nếu phù hợp với phạm vi được duyệt.

**Điểm bắt đầu cho AI Studio** (tóm tắt từ README và prompt của kit): Đọc quy tắc repo, xem giao diện hiện tại và dùng các SVG như lớp trang trí riêng. Chỉ bắt đầu thiết kế hoặc tích hợp khi được giao riêng. Giữ nội dung có ý nghĩa trong DOM và kiểm tra bàn phím, mobile, reduced motion khi tích hợp.

**Ranh giới dữ liệu:** Bản đặc tả đầy đủ, prompt gốc, ảnh và chữ thẻ nguồn, trang rulebook gốc, ảnh nhóm, mascot cần review và bản nháp nội dung nằm trong staging cục bộ ngoài repo. Chỉ dùng tập con được Product Owner duyệt rõ quyền và phạm vi. Bộ khung này không chứa thẻ chơi, luật chính thức, kết quả hình phạt hay dữ liệu trả phí.
