# Ô ĂN QUAN XANH — Báo cáo Visual QA cuối G0.5

23/11/2026 · Canvas "Brainroot · Ô ăn quan xanh · Mockup G0.5", phiên bản `1795392022-b6a4` · Trạng thái: **G0.5 UX/UI PASS – APPROVED FOR HANDOFF** (23/11/2026). Chưa bắt đầu G1; G1 phụ thuộc nhóm A của Rules Matrix V1.3.

> **Bản 2 (vòng hoàn thiện cuối):** xem §7 trước. §1–§6 là kết quả vòng đồng bộ trước; các mục mở cũ đã được cập nhật trạng thái ở §7.3.

## 1. Kết luận

Quy tắc phần A (đã nghiệm thu PASS) đã áp dụng cho cả 27 artboard gốc. Có thêm 9 artboard kiểm tra: 5 màn ở 360×740 và 4 bảng trạng thái. Kiểm tra tự động và kiểm tra bằng mắt trên 36 artboard không còn lỗi chặn. Còn 9 mục mở ở §5; không mục nào chặn nghiệm thu mockup, nhưng mục 1–3 cần quyết định của nhóm.

Không chạm game engine, route production, repo; không merge, không deploy. Token Art V2 vẫn là placeholder; không tự vẽ V3.

## 2. Cách kiểm tra

- **Render:** mỗi artboard được dựng bằng Chrome (headless) từ chính file đã xuất bản, đúng kích thước artboard, với asset thật (nền, khung, lọ kho, token V2, linh vật, lá trang trí). Ảnh review có bật nhãn review; kiểm tra tự động chạy với nhãn review tắt (giao diện thật).
- **Tự động, trên từng artboard:**
  1. Chữ tràn ra ngoài khung artboard.
  2. Chữ bị cắt trong khung có `overflow` ẩn.
  3. Nút, nhãn checklist và ô bàn cờ bị phần tử khác che: thử chạm 3 điểm trên mỗi phần tử bằng `elementFromPoint`.
  4. Thứ tự ô: tâm 12 ô phải theo đúng ringIndex (desktop: 1→5 trái sang phải, 7→11 phải sang trái; mobile: xoay 90°, 1→5 trên xuống ở cột phải, 7→11 dưới lên ở cột trái).
  5. Hai khối chữ cùng hiển thị chồng lên nhau.
- **Bằng mắt:** xem toàn bộ 36 ảnh, phóng to các vùng bị cờ.
- **Kiểm tra nội dung:** tìm trong mã xuất `×N`, "x/3 ý", "Chưa đủ ý", "gợi ý Đạt", "đủ ngưỡng", nhãn "Sinh học".

## 3. Kết quả theo yêu cầu

| # | Yêu cầu | Kết quả |
|---|---|---|
| 1 | Số quân: huy hiệu = tổng, tối đa 5 token, `+k` = số hạt ẩn, không `×N` | Đạt trên 36/36 artboard. Không còn `×N` trong mã xuất. Ô Quan dùng cùng quy tắc (5 + `+k`) và nhãn "Quan + N hạt". |
| 2 | Trạng thái ô mới, giữ màu token khi không chọn được | Đạt. Không còn `opacity`/`saturate` trên ô; chỉ đổi viền, nền, nét đứt, con trỏ, `aria-disabled`. |
| 3 | Đồng bộ S4, S5, S6, S7, S8, S8b, màn liên quan | Đạt. S4 ghost dùng hạt mờ (bỏ "+1" trùng nghĩa với `+k`); S5b/S8b chip "Ăn N hạt" không đè huy hiệu; S8 ô vừa ăn hiện "Đã thu hoạch". |
| 4 | S8/S8b bỏ ám chỉ ngưỡng Đạt tự động | Đạt. Bỏ "Đã tick 2/3 ý", "Đã đối chiếu 1/3 ý · cần đủ ngưỡng", "Chưa đủ ý". Thay bằng "Trọng tài Lan chốt: Đạt/Chưa đạt" và ghi chú "Kết quả do trọng tài quyết định; checklist chỉ ghi lại các ý đã nghe". |
| 5 | Mobile: nhãn Quan "Đa dạng", tên đầy đủ trong accessible label | Đạt. `aria-label` dùng tên theo tài liệu nhóm cho cả hai Quan: "Biến đổi khí hậu & Chuyển đổi sinh thái", "Bảo tồn đa dạng sinh học & Rừng nguyên sinh". |
| 6 | S7 tại 360×740: checklist và hai nút luôn truy cập được | Đạt. Khung chấm ghim ở đáy (checklist cuộn trong khung, hai nút cố định); mặt đáp án cuộn riêng phía trên. 3/3 điểm chạm trúng trên mọi ô checklist và cả hai nút. |
| 7 | Brief không còn quy tắc trái nhau ở §3, §4, §5, §12 | Đạt. Brief lên bản 1.1; các quy tắc cũ được sửa thẳng và đánh dấu *(thay ở bản 1.1)*; sửa thêm §8, §9, §13, §13.1, §13.2 cho khớp. |
| 8 | Visual QA desktop, mobile, 360×740 | Đạt, xem §4–§5. Thứ tự ô đúng trên mọi artboard có bàn cờ. 360×740 kiểm tra S3, S6, S7, S8, S8b. |
| 9 | Bộ ảnh review + báo cáo | Bộ `G05_review` (36 ảnh + 3 ảnh tổng quan) và báo cáo này. |

## 4. Lỗi đã sửa trong đợt này

| Màn | Lỗi | Cách sửa |
|---|---|---|
| Mọi màn có bàn | Quy tắc số quân và trạng thái ô cũ (`×N`, ô mờ) | Bật quy tắc phần A toàn cục |
| S4 (desktop, mobile) | Ghost "+1" trùng ký hiệu với chip `+k`, trên mobile chồng lên chip | Ghost = hạt mờ trong vòng nét đứt, không có dấu "+" |
| S5b, S8b, Hệ thị giác, bảng trạng thái | Chip "Ăn N hạt · Cấp L" đè huy hiệu số ở góc ô | Desktop: chip đặt cao hơn; mobile: chip và "Hạt cuối" nằm ở làn trống giữa hai cột |
| S5b mobile | "Hạt cuối" đè lên ô bên dưới | Như trên |
| S8 (desktop, mobile) | Ô đã ăn vẫn mang chip "Ăn 0 hạt · Cấp 2" | Trạng thái mới "Đã thu hoạch" (viền xanh + chữ) |
| S8 desktop | Nhãn "+4 Nước" đè chip "Bộ thẻ chơi thử" ở header; hạt bay vào vùng điểm số thay vì lọ Nước | Dời nhãn xuống dưới thanh người chơi; đích bay về lọ Nước |
| S8 mobile | "ĐANG ĐI" bị ngắt dòng khi điểm có 2 chữ số | Không cho ngắt dòng trên thanh người chơi |
| S6, S7 desktop | Chip `+k` của bàn phía sau hiện xuyên qua thẻ và khung trọng tài | Bàn cờ có lớp xếp chồng riêng (`isolation`), phần tử trên bàn không vượt lên lớp phủ |
| S5a desktop | Nhãn "Còn 2 hạt trong tay" đè nhãn Quan "Biến đổi khí hậu" | Dời lên khoảng trống giữa thanh người chơi và bàn |
| S5a mobile | Nhãn "Còn 2 hạt" che ô Quan A; hạt bay che nhãn "Quan + 1 hạt" | Nhãn vào làn giữa, không nhận chạm; hạt bay ở vị trí sau nhãn |
| Mọi màn có bàn | Lá trang trí ở góc bàn có thể nhận chạm | `pointer-events:none` |
| S1 (desktop, mobile) | Bàn minh họa và linh vật nhận chạm, ô bàn minh họa có nhãn trợ năng như bàn thật | Bàn minh họa `inert` + `aria-hidden`; linh vật không nhận chạm |
| S8b (desktop, mobile) | Câu "Chưa đủ ý" và checklist kèm số ý ngầm chỉ ngưỡng | Xem §3 mục 4 |
| Hệ thị giác | Nhãn "Mờ (không chọn được)", "Hạt xem trước +1", "Token Art V1" | "Không chọn được", "Hạt xem trước (sẽ rơi vào)", "Token V2 · tạm" |

## 5. Còn mở

1. **Matrix V1.1 – R21 chưa khớp mockup.** Cột đề xuất của R21 vẫn ghi "Danh sách 3 ý, gợi ý khi đủ 2/3", và đoạn ghi chú nói mockup có con số "đủ 2/3 ý". Mockup và Brief đã bỏ con số này. Tôi không sửa Matrix vì đây là tài liệu đã duyệt; cần nhóm quyết định giữ hay bỏ đề xuất "gợi ý khi đủ 2/3".
2. **Token Art V2 vẫn là placeholder.** Hạt Dân có mặt cười và mầm lá trùng icon Không gian xanh; Quan khí hậu có sét và giọt nước trùng icon Năng lượng, Nước. Chờ bộ V3 (brief riêng). Cần khai nguồn AI trong `ASSET_AUDIT` ở G2.
3. **Bàn phía sau lớp phủ (S6, S7).** Khi thẻ hoặc khung trọng tài mở, ô bàn cờ phía sau vẫn có nhãn trợ năng. Kiểm tra tự động báo "bị che"; đây là đúng thiết kế, nhưng khi dựng (G2) cần đặt bàn ở trạng thái `inert` trong lúc lớp phủ mở.
4. **360×740 mới kiểm 5 màn** (S3, S6, S7, S8, S8b). S1, S2, S4, S5a, S5b, S9 chưa có bản 360. Ở 360 bỏ chữ "ĐANG ĐI" trên thanh người chơi; lượt đi thể hiện bằng viền cam và dòng "Lượt của …" ở dock.
5. **Tương phản AA chưa đo bằng công cụ:** vàng Cấp 2 `#F1B531` với chữ ink, chip "Ăn N hạt" trên viền vàng, chữ xám trên ô không chọn được.
6. **S6 desktop:** mép thẻ chồng nhẹ lên mép phải khung "Vai trò lượt này" (chip "Đáp án đang ẩn" bị che một phần). Có từ bản trước, chưa sửa.
7. **S8 desktop là khung tĩnh của hoạt ảnh:** hạt đang bay đi qua gần vùng điểm số của Minh trước khi vào lọ Nước. Không che chữ hoàn toàn, nhưng nên kiểm lại khi làm hoạt ảnh thật (G3).
8. **Bảng trạng thái mobile cao 960px** để đủ chỗ; không phải màn thiết bị thật. Ô vẫn đúng tỉ lệ bàn mobile.
9. **Ảnh review là render cục bộ từ file artboard**, chưa chụp trực tiếp trên canvas (trình duyệt tích hợp chưa đăng nhập claude.ai). Hai cảnh báo "chồng chữ" còn lại (S2 desktop, ghi chú ở bảng trạng thái desktop) là chữ inline nằm trên hai dòng liền nhau, đã xem bằng mắt: không chồng thật.

## 6. Thay đổi trong UX/UI Mockup Brief (bản 1.1)

| Mục | Thay đổi |
|---|---|
| §3 | Ô Dân: huy hiệu góc = tổng hạt. Ô Quan: token Quan, không phải linh vật; nhãn rút gọn mobile; tên đầy đủ trong `aria-label`. Hạt: một loại trung tính, tối đa 5 token + `+k`, bỏ `×N`. |
| §4 | Trạng thái "không chọn được" mới; ghost không dùng "+"; thêm "Đã thu hoạch", Quan còn/đã thu hoạch; checklist bỏ "đủ ngưỡng / chưa đủ". |
| §5 | 360×740 cho màn nội dung dài; S3 bỏ "ô mờ"; S7 bỏ dòng "Đã đủ 2/2 ý", khung chấm ghim đáy ở 360; S8/S8b dùng "Trọng tài chốt", bỏ "Chưa đủ ý"; Ăn Quan dùng token Quan. |
| §8, §9 | Câu mẫu bỏ "Chưa đủ ý"; bảng tài sản ghi token V2 là placeholder, V3 chờ. |
| §12 | Thêm tiêu chí: 360×740, bảng trạng thái, một quy tắc số quân, không ngầm chỉ ngưỡng, vùng chạm và thứ tự ô. |
| §13, §13.1, §13.2 | Đánh dấu các quyết định cũ đã thay; §13.2 ghi đã nghiệm thu và áp dụng toàn bộ. |

---

## 7. Vòng hoàn thiện cuối (APPROVED WITH MINOR CHANGES → bàn giao)

### 7.1 Kết quả theo yêu cầu
| # | Yêu cầu | Kết quả |
|---|---|---|
| 1 | S6 desktop: thẻ không che panel vai trò | Đạt. Hai khung bên có nền đặc, nằm trên lớp bàn; thẻ cách 42px; chip "Đáp án đang ẩn" và nhãn "Trọng tài (đối thủ)" không xuống dòng. Không thay bố cục. |
| 2 | S7 bốn trạng thái; không tự ghi kết quả khi mới chọn; bỏ hoàn tác sau chốt | Đạt. S7 (chưa chọn), S7b (đã chọn Đạt, chờ xác nhận, "chưa ghi vào ván"), S7c (xem lại, "Sửa lựa chọn" / "Chốt kết quả"), S7d (đã chốt, khóa, "Tiếp tục"); desktop + mobile. Bỏ nút "Hoàn tác" ở S8 (desktop, mobile, 360) và mọi câu "hoàn tác 5 giây". Nhánh Chưa đạt dùng cùng 4 trạng thái (chỉ đổi nút được chọn); mockup minh họa nhánh Đạt. |
| 3 | R21 trong Rules Matrix khớp mockup | Đạt. Tạo **Matrix V1.2** (V1.1 giữ nguyên để đối chiếu): sửa bảng tổng hợp R21, lưu ý 3 của R21, mục 3.1 bước 6, mục 3.5 (bỏ "số ý đạt / số ý yêu cầu", bỏ hoàn tác 5 giây). Ba phương án (a)/(b)/(c) của R21 và ô lựa chọn của R22 giữ nguyên. |
| 4 | Tương phản WCAG AA | Đo 107 cặp chữ/nền trên 48 artboard bằng màu thực khi dựng + 11 cặp thành phần giao diện. **Chữ:** 3 cặp không đạt đã sửa ("Trống", "Đã thu hoạch", nhãn "+4 Nước"); 3 cặp còn lại được miễn hoặc báo nhầm. **Thành phần giao diện:** 6 cặp dưới 3:1, đã có token đề xuất, **chưa áp dụng** để không đổi visual đã duyệt. Bảng đầy đủ: Brief §7.1. |
| 5 | 360×740 cho các màn còn thiếu | Đạt. Thêm S1, S2, S4, S5a, S5b, S9 → đủ S1–S9 (11 artboard 360). Nút chính luôn thấy không cần cuộn; nội dung dài cuộn trong vùng riêng; thanh đáy cộng `env(safe-area-inset-bottom)`. Chạy lại kiểm tra với vùng an toàn giả lập 34px: không chữ tràn, không nút bị che hay ra ngoài màn. |
| 6 | Giữ Token Art V2 placeholder | Giữ nguyên. Không vẽ lại quân Dân/Quan. |
| 7 | Cập nhật Brief, QA Report, xuất màn đã chỉnh | Brief **bản 1.2** (§4, §5, §7, §7.1, §12, §13.3); báo cáo này; bộ ảnh `G05_final_review`. |

### 7.2 Lỗi sửa thêm khi kiểm tra
| Màn | Lỗi | Cách sửa |
|---|---|---|
| S6, S7 (mọi trạng thái) | Bàn cờ phía sau lớp phủ vẫn có thể nhận focus/được đọc | Bàn ở trạng thái `inert` + `aria-hidden` khi có lớp phủ |
| S7 mobile (a, b) | Nhãn review tràn ra mép phải | Nhãn review đặt nổi trên góc khung |
| S7c, S7d mobile | Thanh người chơi lộ giữa dải thẻ và khung xem lại; nhãn "Ô" cụt | Bỏ bàn và thanh người chơi phía sau; nhãn "Ô thử thách" |
| S7b mobile | Nút "Chốt kết quả" rơi xuống dòng riêng; bàn lộ giữa thẻ và khung | Hai nút cùng hàng, đều cỡ; thu khoảng hở |
| S3, S6, S7, S8, S8b ở 360 | Khi có thanh home (34px), nút đáy nằm trong vùng an toàn | Neo khung đáy theo vùng an toàn; thu nhỏ bàn ở S3 (×0.87) và S8/S8b (×0.56) để không chồng khung |

### 7.3 Trạng thái các mục mở từ vòng trước
| Mục cũ | Trạng thái |
|---|---|
| 1. Matrix R21 chưa khớp mockup | **Đã xử lý** (Matrix V1.2). Quyết định R21/R22 vẫn của nhóm. |
| 2. Token Art V2 là placeholder | **Còn mở**, chờ V3 (xử lý độc lập). |
| 3. Bàn sau lớp phủ | **Đã xử lý** trong mockup (`inert`). |
| 4. 360×740 thiếu màn | **Đã xử lý** (S1–S9). |
| 5. Tương phản chưa đo | **Đã đo**; chữ đã sửa; 6 token giao diện chờ duyệt. |
| 6. S6 desktop chồng lớp | **Đã xử lý**. |
| 7. S8 khung tĩnh hoạt ảnh | **Còn mở**, kiểm lại khi làm hoạt ảnh (G3). |
| 8. Bảng trạng thái mobile cao 960px | Giữ nguyên (bảng kiểm tra, không phải màn thiết bị). |
| 9. Ảnh là render cục bộ | **Còn mở**: chưa chụp trực tiếp trên canvas. |

### 7.4 Còn mở khi bàn giao G0.5
1. **6 token giao diện chưa đạt 3:1** (viền ô hợp lệ, viền ô đích, vòng ghost, khung "chờ xác nhận", viền lựa chọn S2, icon Năng lượng): cần Product Owner duyệt trước khi áp dụng ở G2. Mỗi trạng thái đều có tín hiệu thứ hai (nâng ô, chip chữ, thuộc tính ARIA).
2. **Quyết định luật của nhóm:** R21 (ngưỡng Đạt), R22 (quy trình xem lại), R26 (kho nhận hạt), R25 (chọn ô), R17 (loại hạt) cùng nhóm A của Matrix. G1 chưa bắt đầu được khi nhóm A chưa chốt.
3. **Token Art V3**, khai `ASSET_AUDIT` cho mọi ảnh AI (G2).
4. **S8/S8b ở 360**: bàn thu nhỏ ×0.56 để nhường chỗ khung kết quả; đủ để thấy ô vừa thu hoạch nhưng hạt khá nhỏ. Có thể cân nhắc ẩn bàn ở màn kết quả trên thiết bị nhỏ.
5. **Ảnh review** là render từ file artboard; nên mở canvas để đối chiếu lần cuối.
6. Hai cảnh báo "chồng chữ" còn lại (S2 desktop, S2 360, ghi chú ở bảng trạng thái desktop) là chữ inline nằm trên hai dòng liền nhau; đã xem bằng mắt, không chồng thật.

---

## 8. Chốt bàn giao (sau nghiệm thu PASS)
| Hạng mục | Kết quả |
|---|---|
| 6 token tương phản | Được duyệt; đưa vào `oanquan-tokens.css`. Artboard không render lại; đo lại khi dựng UI thật. |
| S8/S8b mobile 360–390 | Bỏ bàn cờ thu nhỏ; thay bằng khung tóm tắt (ô liên quan, số hạt thu hoạch / giữ nguyên, kho, trọng tài, bài học). Kiểm tra lại 4 artboard (390, 360): không chữ tràn, không nút bị che, nút Tiếp tục ghim đáy. Desktop giữ bàn. |
| S7 | Giữ 4 trạng thái; ván chỉ đổi sau Chốt; không hoàn tác. |
| Rules Matrix | V1.3: R17 chuyển nhóm C → A (chốt trước G1). |
| Brief | Bản 2.0 bàn giao chính thức; Token V2 placeholder, V3 chưa nghiệm thu. |
| Handoff | `BRAINROOT_OANQUAN_G05_HANDOFF.md` + `oanquan-tokens.css`. |
