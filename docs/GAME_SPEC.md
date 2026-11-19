# Game Design Contract

## Shared educational format
Mỗi game có mục tiêu học tập, chủ đề, thời lượng dự kiến, luật, trạng thái bắt đầu/chơi/kết thúc, phản hồi và nguồn khoa học. Mục tiêu là giáo dục kỹ năng xanh, không biến thành quiz chỉ tính điểm tốc độ.

## Fact–Act (đã có thiết kế vật lý)
- Sản phẩm gốc: bộ thẻ Việt/Anh, cơ chế tự khám phá fact và thực hiện act/thử thách; học bằng tương tác nhóm.
- Bản số hóa: ở R0 chỉ cần **demo một phần nội dung đã có quyền sử dụng** với thẻ rút và phản hồi.
- Không mặc định toàn bộ thẻ digital free, tránh triệt tiêu giá trị sản phẩm vật lý.
- Thử thách về chia sẻ lên mạng xã hội/đi ra ngoài/vận động phải có skip/alternative (không trừ điểm vì nhu cầu tiếp cận).
- Không đưa ra kết luận môi trường chung chung mà thiếu căn cứ.

## Ô ăn quan xanh (đã có kho câu hỏi, cần chuẩn hóa luật thực thi)
- Kho nội dung nhóm cung cấp: 5 chủ đề `tiêu dùng bền vững`, `nước`, `năng lượng`, `rác thải`, `không gian xanh`; 3 mức: **nhận biết**, **ra quyết định**, **giải quyết vấn đề**. Tài liệu mô tả 100 thẻ; kiểm tra lại con số sau import thực tế.
- **TO CONFIRM:** cách đi quân/ăn quan, ánh xạ 2 Ô Quan + 10 Ô Dân vào chủ đề, cách chấm, điều kiện thắng, luật thời gian và luật chơi nhóm.
- Không tự suy diễn từ luật Ô ăn quan truyền thống thành luật được nhóm duyệt. Trước khi có xác nhận: trang mô tả + bộ câu hỏi trích mẫu an toàn; không ghi gameplay hoàn chỉnh.
- Câu hỏi giáo dục phải được reviewer duyệt, vì một số lời giải draft có thể tuyệt đối hóa tác động môi trường.

## Green Arena (R2 hackathon candidate, không build trước nếu chọn làm phần thi)
- Mục tiêu: giáo viên/CLB tạo phiên chơi 3–5 câu, người tham gia join bằng mã, chọn phương án, host xem đáp án tổng hợp rồi thảo luận.
- Không sao chép scoreboard/brand/assets của Kahoot; ưu tiên `Think → Choose → Discuss → Act`, cho phép **non-timed mode** và bàn phím.
- Content lấy từ kho câu hỏi được duyệt, phân tách công cụ tổ chức và gameplay.
- Host có control start/pause/close; không công bố full participant personal response public.

## Game future candidates (roadmap, NOT MVP)
- Green Word Quest: giải thuật ngữ môi trường + nguồn & giải thích, lấy cảm hứng thể loại đoán chữ, không sao chép Wordle.
- Eco Discovery Map: đoán vấn đề môi trường qua địa điểm/sông/hồ Hà Nội, cần dữ liệu địa lý đúng và cấp quyền sử dụng bản đồ; không sao chép Worldle.

## Universal game states
`draft | ready | locked | in_progress | completed | expired | unavailable`
- `locked` không đưa payload paid tới browser.
- `unavailable` có UI giải thích trung thực.
- Mỗi score/grade có rubric rõ; fact thảo luận không bị máy chấm đúng/sai khi không có đáp án duy nhất.
- Cho phép skip nhiệm vụ và chọn phương án thay thế, đặc biệt khi có hạn chế vận động/thị giác/thính giác.
