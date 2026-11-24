# Ô ĂN QUAN XANH — UX/UI Mockup Brief (2.5D, desktop + mobile)

**Phiên bản 2.0 · 23/11/2026 · BẢN BÀN GIAO CHÍNH THỨC G0.5** (G0.5 UX/UI PASS – APPROVED FOR HANDOFF).

| Trạng thái | Nội dung |
|---|---|
| Đã nghiệm thu | Bố cục 9 màn desktop/mobile, visual system, cách hiển thị số quân, trạng thái ô, luồng Trọng tài 4 trạng thái, responsive 360–390, 6 token tương phản (§7.1) |
| Placeholder | **Token Art V2** (hạt Dân, 2 quân Quan) chỉ là placeholder. **Token Art V3 chưa nghiệm thu**, làm độc lập |
| Chờ nhóm Brainroot | Quyết định luật theo Rules Matrix **V1.3** (nhóm A, gồm cả R17) trước G1 |
| Không thuộc tài liệu này | Game engine, route production, merge, deploy |

Tài liệu kỹ thuật đi kèm cho tab Code: `BRAINROOT_OANQUAN_G05_HANDOFF.md` và `oanquan-tokens.css`. Lịch sử thay đổi trong G0.5 nằm ở Phụ lục A.

## 1. Mục tiêu và ràng buộc

**Mục tiêu mockup:** để Product Owner duyệt *giao diện và luồng chơi* trước khi viết engine, mà không phải chờ nhóm chốt hết luật.
**Ràng buộc bất biến:**
1. Phong cách **2.5D minh họa phẳng** (lớp + bóng mềm + nghiêng nhẹ), bằng SVG/CSS. Không 3D thật, không WebGL.
2. Đồng bộ design system Brainroot (`docs/DESIGN_SYSTEM.md`, `src/styles/tokens.css`): ivory, peach, sage, ink; font `Be Vietnam Pro`; thang khoảng cách 4/8/12/16/24/32/48/64; màu không là tín hiệu duy nhất.
3. Bàn cờ theo docx: 2 Ô Quan bán nguyệt ở hai đầu, 10 Ô Dân vuông bo tròn; nền kem, viền cam và mint xen kẽ; mỗi ô có icon chủ đề.
4. Trọng tài là thành phần cốt lõi (Matrix, Phần 3).
5. Không hiển thị đáp án hay checklist trước khi người trả lời kết thúc.
6. Mọi chuyển động có ý nghĩa trạng thái và có bản tắt (`prefers-reduced-motion`, nút "Bỏ qua hoạt ảnh").
7. Không dùng artwork chưa xác nhận quyền (Mục 11). Mockup dùng ảnh thật chỉ từ thư viện mascot đã duyệt; hình minh họa của 100 thẻ dùng ô giữ chỗ "Hình minh họa" (có thể có/không).

## 2. Thứ tự ô chuẩn (canonical ring) — bảo toàn khi đổi bố cục

Mọi bố cục phải là **phép xoay** của cùng một vòng, không bao giờ là phép phản chiếu. Mỗi ô có `ringIndex` cố định 0–11; bố cục chỉ quyết định ô nằm ở đâu trên màn hình.

```
Vòng (chiều kim đồng hồ = tăng dần ringIndex):
  0 = Quan A
  1..5  = Ô Dân hàng trên, trái → phải          (Người chơi 2)
  6 = Quan B
  7..11 = Ô Dân hàng dưới, phải → trái           (Người chơi 1)
  quay lại 0
```

**Desktop (ngang):**
```
 ┌────┐  [ 1 ][ 2 ][ 3 ][ 4 ][ 5 ]  ┌────┐
 │ 0  │                              │ 6  │
 │Quan│  [11][10][ 9][ 8][ 7 ]      │Quan│
 └────┘                              └────┘
        ↻ chiều kim đồng hồ: trên đi sang phải, dưới đi sang trái
```
**Mobile (dọc, xoay 90° theo chiều kim đồng hồ):**
```
        ┌──────── 0 Quan A ────────┐
        [11]              [ 1 ]
        [10]              [ 2 ]
        [ 9]              [ 3 ]
        [ 8]              [ 4 ]
        [ 7]              [ 5 ]
        └──────── 6 Quan B ────────┘
   cột trái = Người chơi 1 (11→7, trên xuống)   cột phải = Người chơi 2 (1→5)
```
Kiểm tra: trên mobile, đi từ Quan A xuống cột phải (1→5), tới Quan B, rồi lên cột trái (7→11) và về Quan A, vẫn cùng chiều kim đồng hồ như desktop.

**Quy tắc cho mockup và dựng sau này:**
- Có một **trang "Sơ đồ thứ tự ô"** trong mockup, ghi `ringIndex` trên từng ô ở cả hai bố cục (lớp chú thích bật/tắt được).
- Cho phép xoay bàn 0° / 90° / 180° / 270°; **không có chế độ phản chiếu**.
- Nút chọn chiều ghi theo hình học trên màn hình (mũi tên cong ↻ hoặc ↺ vẽ theo hướng thực tế), không dán nhãn cố định "trái/phải".
- Gán chủ đề theo R1 (đang mở): mockup dùng thứ tự đề xuất 1→5 lặp, nhưng **mọi nhãn chủ đề là lớp thay được**, để đổi R1 không phải thiết kế lại.
- Hot-seat: **không tự xoay bàn theo lượt**; nhãn người chơi và viền sáng chỉ ra ai đang đi.

## 3. Ngôn ngữ thị giác

**Màu nền và chữ (tokens):** ivory `#F8F3E9`, paper `#FFFFFF`, ink `#263B31`, peach `#E79A7C`, sage `#A6C6B6`, forest `#2D563F`, focus ring `#174E42`, danger `#A82A35` (chỉ cho lỗi hệ thống).
**Token trạng thái đã duyệt (tương phản ≥3:1, §7.1):** viền ô hợp lệ `#D4620E`, viền ô đích thu hoạch `#AC7A0C`, vòng xem trước (ghost) `#E56522`, khung "chờ xác nhận" `#A9740F`, viền lựa chọn chưa chọn `#9C9273`, icon chủ đề Năng lượng `#C38611`. Chữ: "Trống" `#5F6856`, "Đã thu hoạch" `#297247`, nền nhãn thu hoạch Nước `#367BA5`.
**Màu cấp thẻ** (lấy từ PDF của nhóm, hex đo từ ảnh dựng; tương phản đã đạt AA, §7.1): Cấp 1 xanh lá `#2D7C4D`; Cấp 2 vàng `#F1B531`; Cấp 3 đỏ gạch `#B7422E`; mặt đáp án nền xanh rêu đậm `#1A4A38`. Mỗi cấp luôn có **nhãn chữ** ("Cấp 1 · Nhận biết" …) và **hình dạng huy hiệu** khác nhau (tròn, thoi, lục giác), không dựa vào màu.
**Kết quả đạt/chưa đạt:** dùng biểu tượng + chữ + chuyển động (nở/rung nhẹ), không chỉ xanh/đỏ. Chữ "Chưa đạt", không dùng "Sai".
**Mặt bàn:** gỗ kem phẳng, viền bo, bóng đổ mềm 1 lớp; sau bàn là lớp vườn mờ (lá, bụi cây) bằng hình minh họa phẳng, không chuyển động mặc định.
**Ô Dân:** vuông bo tròn 28px, viền xen kẽ cam/mint, lõm nhẹ (bóng trong), icon chủ đề ở góc trên trái, **huy hiệu góc trên phải luôn ghi tổng số hạt thật** (chữ DOM, số ≥13px, kể cả 0).
**Ô Quan:** bán nguyệt lớn, đặt **token Quan** (vật phẩm riêng, *không* phải linh vật; Brainie/Rootie chỉ xuất hiện như nhân vật trang trí ngoài bàn). Nhãn chủ đề: desktop "Biến đổi khí hậu" / "Đa dạng sinh học"; mobile rút gọn "Khí hậu" / "Đa dạng"; tên đầy đủ theo tài liệu nhóm ("Biến đổi khí hậu & Chuyển đổi sinh thái", "Bảo tồn đa dạng sinh học & Rừng nguyên sinh") nằm trong `aria-label`. Số hạt là nhãn chữ "Quan + N hạt".
**Hạt:** một loại hạt trung tính cho tới khi R17 được chốt (token V2 là placeholder, art cuối chờ V3). Mỗi ô **vẽ tối đa 5 token** trên mọi thiết bị; nếu nhiều hơn, hiện chip **`+k`** với k = số hạt không được vẽ. **Không dùng `×N`**.
**Thẻ:** tỷ lệ 5:7, bo góc lớn, viền theo cấp, vòng đếm giờ góc phải, nhãn cấp góc trái, tiêu đề lớn, mục Bối cảnh, khung hình minh họa, khung Thử thách. Mặt sau: nền xanh rêu đậm, nhãn "Đáp án · Cấp N", "Trọng tài duyệt khi", hộp nội dung. (Theo bố cục PDF của nhóm.)
**Chữ:** `Be Vietnam Pro`. Tiêu đề thẻ 24/30 (desktop), 22/28 (mobile); nội dung 16/24 tối thiểu; nhãn nhỏ ≥12px chỉ cho thông tin phụ, không cho thao tác.

## 4. Thành phần chung (kèm trạng thái)

| Thành phần | Trạng thái cần mockup |
|---|---|
| Ô Dân / Ô Quan | mặc định · chọn được (viền cam, nâng nhẹ) · **không chọn được: giữ nguyên màu token, chỉ đổi viền trung tính + nét đứt, nền ô xám nhạt, không nâng, `aria-disabled`, lý do khi chạm** · đang chọn · focus bàn phím · xem trước đường đi (ghost: hạt mờ trong vòng nét đứt, không dùng ký hiệu "+") · cơ hội ăn (viền vàng + chip "Ăn N hạt · Cấp L") · đã thu hoạch ("Đã thu hoạch") · giữ nguyên sau chưa đạt (rung nhẹ) · Quan còn / Quan đã thu hoạch |
| Hạt | tĩnh · đang bay · tối đa 5 token + chip `+k` (số hạt ẩn) |
| Thanh người chơi | đang đi · chờ · điểm kho (số + 5 lọ chủ đề) |
| Nút chiều rải | mặc định · hover · focus · đã chọn · vô hiệu |
| Thẻ | cấp 1/2/3 · có hình · không hình · mặt trước · mặt đáp án · loại `referee` / `auto` / `hybrid` |
| Đồng hồ vòng | chạy · 5 giây cuối (đổi nét, không nhấp nháy) · dừng · tắt giờ · +50% |
| Checklist trọng tài | chưa tick · đã tick. **Không có trạng thái "đủ ngưỡng / chưa đủ"** và không đếm "x/y ý" khi R21 chưa duyệt; checklist chỉ ghi lại ý đã nghe |
| Nút Đạt / Chưa đạt | chưa chọn · đã chọn (`aria-pressed`, chờ xác nhận, **chưa ghi vào ván**) · xem lại trước khi chốt · đã chốt (khóa). **Không có hoàn tác sau khi chốt** |
| Thanh gợi ý lượt | từng bước (Chọn ô → Chọn chiều → Rải → …) |
| Ngăn nhật ký | đóng · mở · rỗng |
| Hộp thoại | tạm dừng · rời ván · luật tóm tắt |

## 5. Các màn hình

Kích thước dựng: **Desktop 1280×800**, **Mobile 390×844**; kiểm tra thêm 360×740 cho cả S1–S9. Ở 360×740: nút chính và nút chấm luôn hiển thị không cần cuộn; nội dung dài cuộn trong vùng riêng; thanh nút đáy cộng thêm vùng an toàn `env(safe-area-inset-bottom)` (đã thử với 34px, cỡ thanh home của iPhone). Mỗi màn có chú thích tương tác và nội dung mẫu bằng tiếng Việt.

### S1 — Bắt đầu (trang giới thiệu trong site)
- **Mục đích:** nói đúng trò chơi là gì, trạng thái thật, và bắt đầu chơi.
- **Desktop:** cột trái: tiêu đề "Ô ăn quan xanh", 1 câu ("Rải quân, ăn quân, và chứng minh bạn biết cách giữ gìn tài nguyên."), nhãn trạng thái ("Luật bản thử · bộ thẻ chơi thử"), 3 nút: **Chơi 2 người** (chính), **Học cách chơi · 60 giây**, **Xem luật tóm tắt**. Cột phải: minh họa bàn cờ 2.5D nghiêng nhẹ + Brainie, Rootie. Dưới: 5 chủ đề (icon + tên), 3 cấp thẻ (huy hiệu).
- **Mobile:** minh họa trên, tiêu đề, nút chính full-width, nút phụ dạng liên kết.
- **Nhãn trạng thái trung thực:** tự đổi khi nhóm chốt luật (Mục 10).
- **Trợ năng:** tiêu đề h1, nút có tên đầy đủ, minh họa trang trí `aria-hidden`.

### S2 — Thiết lập ván
- Tên 2 người (tùy chọn, mặc định "Người chơi 1/2", không lưu lên máy chủ).
- **Trọng tài:** hai thẻ chọn: "Đối thủ chấm" (M1) / "Người thứ ba chấm" (M2, có ô nhập tên, tùy chọn).
- **Thời gian:** Chuẩn / +50% / Không bấm giờ (giải thích 1 dòng).
- **Ai đi trước:** "Ngẫu nhiên" / "Người chơi 1" / "Người chơi 2" (R23 còn mở).
- Tóm tắt luật đang dùng + nhãn "Luật bản thử" nếu chưa chốt. Nút **Bắt đầu ván**.
- Mobile: các nhóm xếp dọc, nút Bắt đầu dính đáy.

### S3 — Bàn chơi, chọn ô (trạng thái nghỉ)
- **Desktop:** header mỏng (logo, nút Tạm dừng, Luật, Nhật ký). Giữa: bàn cờ ngang. Hai bên bàn: **kho bảo tồn** của từng người (5 lọ theo chủ đề + tổng). Dưới bàn: **thanh gợi ý lượt** ("Lượt của [tên]: chọn một ô Dân có hạt").
- **Mobile:** thanh người chơi trên cùng (điểm + 5 chấm chủ đề nhỏ), bàn dọc ở giữa, thanh gợi ý và nút ở đáy trong vùng ngón cái.
- Ô hợp lệ có viền cam và nâng nhẹ; ô không chọn được giữ màu token, chỉ đổi viền/nền/trạng thái tương tác (§4), khi chạm hiện lý do ngắn ("Ô này không có hạt", "Đây là ô của đối thủ").
- Chạm ô → chuyển S4. Bàn phím: mũi tên để di chuyển giữa các ô hợp lệ theo thứ tự vòng, Enter chọn.
- Ngăn nhật ký (đóng mặc định): "Lượt 3: Người chơi 1 rải từ Ô Nước, ăn 4 hạt qua thẻ Cấp 2…".

### S4 — Chọn hướng rải
- Ô đã chọn nổi lên; **hai nút chiều ↻ / ↺** xuất hiện sát ô (desktop) hoặc ở đáy (mobile), cỡ chạm ≥56px.
- **Xem trước:** khi hover/focus mỗi nút, hiện đường đi mờ (ghost) tới ô cuối và chấm tròn ghi vị trí hạt cuối; **không** tiết lộ kết quả ăn (để người chơi tự tính).
- Nút **Rải** để xác nhận; **Đổi ô** để quay lại S3.
- Trạng thái: chưa chọn chiều (nút Rải vô hiệu), đã chọn.

### S5 — Đang rải và cơ hội ăn
- Hạt bay từng viên theo cung; bộ đếm "Còn 3 hạt trong tay" cạnh ô; nút **Bỏ qua hoạt ảnh**; reduced motion: hạt nhảy thẳng, vẫn đếm từng bước.
- Khi hết hạt: một trong các kết quả hiện bằng 1 dải thông báo rõ: **Tiếp tục bốc** / **Dừng** / **Cơ hội ăn** (viền nổi ô mục tiêu, nhãn chủ đề + "Thẻ cấp N") / **Đổi lượt**. (Lưu ý: tên nhãn ghi "theo luật bản thử" khi nhóm chưa chốt R15/R16.)
- Với "Cơ hội ăn": nút **Rút thẻ** (do đối thủ, theo R6).

### S6 — Thẻ thử thách (đang trả lời)
- **Desktop:** thẻ nổi giữa bàn (bàn mờ phía sau, vẫn thấy ô mục tiêu có viền nổi). Cột bên: ai trả lời, ai chấm, số giây.
- **Mobile:** bottom-sheet toàn màn hình; thẻ chiếm ~70% chiều cao; nút ở đáy.
- Nội dung thẻ: nhãn cấp + vòng giờ, tiêu đề, **Bối cảnh**, hình minh họa (có thể không), **Thử thách**.
- **Không hiện đáp án.** Nút **Xong** (người trả lời) hoặc tự dừng khi hết giờ; thẻ `auto`: hiện các lựa chọn bấm được thay cho nút Xong.
- Đồng hồ: 5 giây cuối đổi nét viền (không nhấp nháy); chế độ không bấm giờ hiện nhãn "Không bấm giờ".
- Biến thể cần mockup: Cấp 1 / 2 / 3; có hình / không hình; thẻ chọn A/B/C; thẻ đúng–sai; tiêu đề dài (2 dòng).
- Bàn phím: Space/Enter cho "Xong"; Tab đi tới các lựa chọn.

### S7 — Trọng tài chấm
- Trọng tài bấm **Mở đáp án mẫu** (chỉ khả dụng sau khi người trả lời bấm Xong hoặc hết giờ).
- Mặt đáp án: tiêu đề thẻ, "Trọng tài duyệt khi", **đáp án mẫu** (nguyên văn tài liệu), và **checklist ý chính** (mỗi ý một dòng, tick được) chỉ để ghi lại ý đã nghe. **Không** hiện dòng đếm "x/y ý" hay gợi ý Đạt theo ngưỡng khi R21 chưa duyệt; dòng hướng dẫn: "Checklist chỉ ghi lại ý đã nghe. Trọng tài tự quyết kết quả."
- Cho thẻ `hybrid`: dòng đầu "Lựa chọn đúng?" đã được tự chấm sẵn; các dòng còn lại do Trọng tài.
- Cho thẻ `auto`: bỏ checklist; hiện "Đáp án: B" và lý do ngắn (thông tin học).
- Nút: **Đạt** · **Chưa đạt** (hai nút ngang nhau về cỡ và độ nổi; không nút nào là "mặc định").
- **Bốn trạng thái**:
    1. **Chưa chọn kết quả** (S7): checklist + hai nút; dòng "Kết quả chỉ ghi vào ván khi bấm Chốt kết quả".
    2. **Đã chọn, chờ xác nhận** (S7b): nút được chọn đổi nền + nhãn "Đang chọn"; khung nét đứt "Đã chọn: Đạt · Chưa ghi vào ván" với **Xem lại** và **Chốt kết quả**. Bấm nút còn lại để đổi.
    3. **Xem lại trước khi chốt** (S7c): tóm tắt thẻ, người trả lời, ô, lựa chọn, các ý đã ghi lại (không đếm), hệ quả nếu chốt; nút **Sửa lựa chọn** và **Chốt kết quả**. Người trả lời có thể đề nghị xem lại một lần (R22).
    4. **Đã chốt** (S7d): kết quả khóa, "đã ghi vào ván", nút **Tiếp tục** sang S8.
- **Không tự ghi kết quả vào ván khi mới chọn Đạt/Chưa đạt.** **Không có hoàn tác sau khi chốt**; chỉ sửa trước khi chốt, trừ khi nhóm duyệt quy tắc khác.
- **Cả hai người cùng thấy màn này** (hot-seat); trong chế độ M2, nhãn "Trọng tài [tên]".
- Trạng thái: chưa tick · đã tick · đã chọn · đã chốt. Ở 360×740, khung chấm (checklist + hai nút) ghim ở đáy, mặt đáp án cuộn phía trên.

### S8 — Kết quả thẻ (thu hoạch / giữ nguyên)
- **Desktop:** giữ bố cục bàn cờ (ô vừa xét có trạng thái "Đã thu hoạch" hoặc rung nhẹ) + khung kết quả phía dưới.
- **Mobile 360–390px:** **không vẽ bàn cờ thu nhỏ**. Thay bằng khung tóm tắt cuộn được: tiêu đề kết quả, thẻ đã dùng; **Ô liên quan** (icon chủ đề, tên ô, số hạt: "+N, đã thu hoạch · còn 0" hoặc "giữ nguyên · N hạt"); thay đổi kho ("Kho Nước của Minh: 3 → 7" hoặc "không có hạt nào vào kho"); chip "Trọng tài [tên] chốt: …"; "Điều nên nhớ"; nút Tiếp tục ghim đáy (cộng vùng an toàn). Thanh người chơi vẫn hiện để thấy điểm mới.
- **Đạt:** ô vừa thu hoạch hiện "Đã thu hoạch"; hạt bay về lọ chủ đề tương ứng trong kho, số điểm cộng nhảy; chip "Trọng tài [tên] chốt: Đạt" (không kèm số ý); dòng **"Điều nên nhớ"** (1 câu tóm từ đáp án mẫu, ghi rõ là bản tóm tắt). Nút **Tiếp tục**.
- **Chưa đạt:** hạt rung nhẹ rồi nằm yên; dòng "Trọng tài chấm: Chưa đạt. Hạt vẫn ở ô này." + chip "Trọng tài [tên] chốt: Chưa đạt" + ghi chú "Kết quả do trọng tài quyết định; checklist chỉ ghi lại các ý đã nghe". Không hiện số ý đã tick hay ngưỡng. Nút **Tiếp tục** (đổi lượt).
- Ăn Quan: hoạt ảnh **token Quan** "về kho" (không dùng linh vật) (có phiên bản tối giản khi reduced motion).
- Trợ năng: `aria-live` đọc "Đạt: thu hoạch 5 hạt Nước" hoặc "Chưa đạt: hạt giữ nguyên".

### S9 — Kết thúc ván
- Tiêu đề **"Đại sứ Môi trường: [tên]"** (hoặc "Hòa — cả hai là Đại sứ", R13). Điểm hai bên, **biểu đồ 5 chủ đề** (cột hoặc 5 lọ có mức), số Quan thu hoạch.
- "3 bài học đáng nhớ" (từ thẻ đã gặp) và "Hành động thử ngay" (liên kết Quest, nếu có).
- Nút **Chơi lại** · **Về thư viện Green Play** · **Xem nhật ký ván**.
- Nhãn đúng sự thật: "Luật bản thử" / "Bộ thẻ chơi thử" nếu đang áp dụng.
- Không dùng ngôn ngữ "thua/phạt"; người thua thấy "Cảm ơn bạn đã cùng thu hoạch".

### Màn hỗ trợ (cần ít nhất wireframe)
- **Tạm dừng / Rời ván** (xác nhận mất ván).
- **Luật tóm tắt** (bảng 1 trang, nhãn nguồn: "Theo tài liệu nhóm" / "Đang chờ xác nhận").
- **Kho thẻ chơi thử đã hết** (R19): thông báo trung thực và nút xáo lại.
- **Lỗi/không khả dụng** (dùng `EmptyUnavailableState` đã có).
- **Tập sự 60 giây** (overlay chỉ dẫn trực tiếp trên bàn; có thể thiết kế ở giai đoạn sau).

## 6. Chuyển động (tóm tắt)
- Hạt rải: cung ngắn 180–240ms mỗi hạt, tuần tự; không quá 1 chuyển động nổi bật cùng lúc.
- Thẻ: lật ở trục dọc 400ms; reduced motion: hiện thẳng.
- Thu hoạch: hạt bay thành đoàn về lọ 600ms; chưa đạt: rung ngang 2 chu kỳ nhẹ.
- Nền vườn: tĩnh mặc định; chuyển động rất nhẹ chỉ khi bật và không bị `prefers-reduced-motion`.
- Không nhấp nháy, không tự cuộn, không rung màn hình.

## 7. Trợ năng
- Ô Dân là nút có `aria-label` đầy đủ ("Ô Nước, hàng của Người chơi 1, 5 hạt, hợp lệ").
- Vùng `aria-live` đọc từng bước (rải, ăn, kết quả).
- Điều khiển đầy đủ bằng bàn phím; thứ tự Tab theo vòng; focus ring `#174E42` ≥3px.
- Vùng chạm ≥44px; thao tác chính ở đáy mobile.
- Màu cấp + nhãn chữ + hình dạng; kết quả có biểu tượng + chữ.
- Tương phản AA cho mọi cặp chữ/nền; kết quả đo và token đề xuất ở §7.1.
- Lớp phủ (thẻ, khung trọng tài): bàn cờ phía sau ở trạng thái `inert` + `aria-hidden`.
- Chế độ không bấm giờ; +50% thời gian; âm thanh mặc định tắt.

### 7.1 Kết quả kiểm tra tương phản WCAG AA (23/11/2026)
Đo trên 48 artboard bằng màu thực khi dựng (chữ: 4.5:1, chữ lớn ≥24px hoặc ≥18.66px đậm: 3:1; thành phần giao diện và đồ họa mang thông tin: 3:1). 107 cặp chữ/nền khác nhau.

**Chữ: đạt (trích các cặp chính)**
| Cặp | Tỉ lệ | Dùng ở |
|---|---|---|
| ink `#263B31` / ivory `#F8F3E9` | 10.84 | chữ chính |
| muted `#465D49` / ivory `#F8F3E9` | 6.50 | chữ phụ |
| ink `#263B31` / peach `#E79A7C` | 5.31 | nút chính |
| trắng / forest `#2D563F` | 8.35 | nút forest, nút đã chọn |
| trắng / Cấp 1 `#2D7C4D` | 5.12 | nhãn Cấp 1 |
| ink / Cấp 2 `#F1B531` | 6.50 | nhãn Cấp 2, chip "Ăn N hạt" |
| trắng / Cấp 3 `#B7422E` | 5.48 | nhãn Cấp 3 |
| `#F8F3E9` · `#CFE3D6` · `#F1B531` · `#9FC4B0` / mặt đáp án `#1A4A38` | 9.13 · 7.50 · 5.48 · 5.29 | mặt đáp án |
| trắng / ink `#263B31` · trắng / `#6B7468` | 11.98 · 4.86 | huy hiệu số hạt (có hạt · 0 hạt) |
| `#8A2F12` / `#FFE3DA` | 6.91 | chip "Luật bản thử" |

**Chữ: không đạt, đã sửa trong mockup**
| Cặp cũ | Tỉ lệ | Token mới | Tỉ lệ mới | Dùng ở |
|---|---|---|---|---|
| `#7B866F` / lòng ô `#F1E4CB`–`#F7EEDD` | 3.05–3.33 | `#5F6856` | 4.64 | chữ "Trống" |
| `#2D7C4D` / lòng ô `#F1E4CB` | 4.07 | `#297247` | 4.65 | chữ "Đã thu hoạch" |
| trắng / `#3F8FC0` | 3.56 | nền `#367BA5` | 4.63 | nhãn "+4 Nước" (S8) |

**Chữ: được miễn hoặc báo nhầm**
| Cặp | Tỉ lệ | Lý do |
|---|---|---|
| `#5F6A5C` / `#E4DFD2` | 4.26 | nút "Vô hiệu": thành phần không hoạt động được miễn (WCAG 1.4.3) |
| `#D86E4B` / ivory | 3.04 | dấu chấm trong logo "Brainroot." (logotype được miễn); chữ "xanh" ở tiêu đề S1 là chữ lớn nên đạt 3:1 |
| chữ trên khay gỗ ở bảng trạng thái | — | công cụ lấy nhầm nền gradient của khay; nền thật là `#F5E7D0` (ink 9.83, nâu `#5A3E22` 8.02) |

**Thành phần giao diện (3:1): 6 token thay thế ĐÃ DUYỆT (23/11/2026).** Đưa vào design tokens khi triển khai UI thật và đo lại tương phản lúc đó. Artboard mockup giữ màu cũ (không render lại theo quyết định nghiệm thu).
| Thành phần | Cặp trong mockup | Tỉ lệ | Token đã duyệt | Tỉ lệ |
|---|---|---|---|---|
| Viền ô hợp lệ | `#F28A3E` / mặt bàn `#F5E7D0` | 2.03 | `#D4620E` | 3.10 (3.48 trên lòng ô) |
| Viền ô đích thu hoạch | `#F1B531` / `#F5E7D0` | 1.51 | `#AC7A0C` (giữ quầng sáng vàng) | 3.11 |
| Vòng ghost xem trước | `#E8793F` / lòng ô `#FBF5E8` | 2.67 | `#E56522` | 3.11 |
| Khung nét đứt "chờ xác nhận" (S7b) | `#C98A12` / `#FFF7E0` | 2.75 | `#A9740F` | 3.78 |
| Viền lựa chọn chưa chọn (S2) | `#B9B29C` / trắng | 2.12 | `#9C9273` | 3.10 |
| Icon chủ đề Năng lượng trên chip trắng | `#C98A12` / trắng | 2.95 | `#C38611` | 3.12 |
| *(ngoài 6 token)* Viền + nét đứt ô không chọn được | `#DCD3C2`, `#BDB19B` | 1.22, 1.75 | giữ nguyên (thành phần không hoạt động được miễn); phương án `#938161` chưa duyệt | 3.13 |

Ghi chú: mỗi trạng thái trên đều có tín hiệu thứ hai (ô nâng lên, chip chữ, con trỏ, `aria-pressed`/`aria-disabled`), nên màu viền không phải tín hiệu duy nhất. Các cặp chữ hoặc biểu tượng đặt trực tiếp lên ảnh nền: không có (mọi chữ đều nằm trên nền đặc hoặc gradient đã đo).

## 8. Nội dung mẫu và giọng điệu
- Giọng: ấm, ngắn, khuyến khích; không chê. Ví dụ: "Cơ hội ăn ở ô Nước! Thẻ Cấp 2." · "Trọng tài chấm: Chưa đạt. Hạt vẫn ở ô này." · "Điều nên nhớ: …". Không dùng câu ngầm chỉ ngưỡng ("Chưa đủ ý", "Đủ 2/3 ý") khi R21 chưa duyệt.
- Tên thẻ và nội dung thử thách dùng **nguyên văn** tài liệu nhóm (không viết lại). "Điều nên nhớ" và checklist là lớp biên tập, ghi chú "bản tóm tắt".
- UI hỗ trợ vi/en theo cơ chế i18n hiện có; **nội dung thẻ hiện chỉ có tiếng Việt** (cần nhóm quyết định hiển thị tiếng Anh).

## 9. Tài sản (assets) cho mockup

| Tài sản | Nguồn | Tình trạng quyền |
|---|---|---|
| Brainie, Rootie | thư viện mascot đã duyệt trong repo | dùng được |
| 100 hình minh họa thẻ | trích từ PDF nhóm | **chưa công khai**; mockup chỉ dùng ô giữ chỗ hoặc vài mẫu nội bộ |
| Hạt Dân, 2 token Quan | **Token Art V2 = placeholder** (ảnh AI). **Token Art V3 chưa nghiệm thu**, tạo và đánh giá độc lập; khi V3 được duyệt chỉ cần thay file theo asset mapping trong tài liệu handoff | cần khai báo AI trong `ASSET_AUDIT`; không công khai |
| Icon chủ đề, mặt bàn, lọ kho, nền | Asset Kit V2 (Phụ lục A.1) | cần khai báo AI trong `ASSET_AUDIT` |
| Lớp vườn nền | tái sử dụng khái niệm nền sinh thái đã dùng ở trang chủ | kiểm tra file nguồn |

## 10. Nhãn trạng thái động (trung thực với luật chưa chốt)
Mọi màn chứa luật hiển thị 1 trong 3 nhãn: **"Luật bản thử"** (còn mục nhóm A chưa chốt) · **"Luật đã được nhóm xác nhận"** (khi chốt hết nhóm A) · **"Bộ thẻ chơi thử"** (khi chưa phát hành đủ 100 thẻ). Mockup phải có biến thể của từng nhãn.

## 11. Ràng buộc dựng sau mockup

### 11.1 Thứ tự triển khai điều chỉnh
| Giai đoạn | Nội dung | Chạy khi nào |
|---|---|---|
| **G0** Chốt luật | Nhóm trả lời nhóm A của Matrix | Ngay |
| **G0.5** Mockup | Dựng mockup theo brief này | **Song song G0** |
| **G1** Engine | Engine thuần + test + mô phỏng | Sau khi nhóm A đã chốt và mockup được duyệt |
| **G2** Tích hợp | UI nối engine, thẻ, Trọng tài, trợ năng | Sau G1 PASS |
| **G3** Hoàn thiện | Hoạt ảnh, tập sự, trau chuốt, thiết bị thật | Sau G2 |
| Track nội dung (song song) | Duyệt thẻ, ý chính, quyền hình ảnh | Từ G0 |

### 11.2 Kiểm kê prototype cũ (chỉ đọc; không xóa gì)

| Thành phần | Kết luận tái sử dụng | Ghi chú |
|---|---|---|
| `prototypeOnlyModel.ts` | Không dùng lại | Tọa độ 3D; 4 hạt/ô, 1 hạt Quan sai so với tài liệu; chỉ giữ ý tưởng ranh giới `OAnQuanRuleset` làm tham chiếu |
| `boardRenderer.ts`, `threeBoardRenderer.ts`, `oanquan3d-prototype.css` | Không dùng lại | Renderer 3D/WebGL; gỡ sau nghiệm thu |
| `OAnQuanTabletopExperience.tsx` | Dùng **mẫu**: hook reduced-motion, vùng live, lưới nút ô điều khiển bàn phím, dùng i18n | Không dùng trực tiếp |
| `OAnQuan3DPrototype.tsx` + lazy route + `?preview=oanquan3d` trong `App.tsx` | Giữ nguyên | Còn được test tham chiếu |
| `OAnQuanXanhDetailPage.tsx` | Dùng lại làm trang giới thiệu (S1) | Cần sửa lời mô tả "bàn gỗ 3D" và kiểm tra các ví dụ định hướng không phải thẻ của nhóm |
| `oanquan-standalone.css` | Dùng lại mẫu khung nền ivory | |
| `O_AN_QUAN_DETAIL` (`games.ts`), `getOAnQuanDetailCopy` (i18n) | Dùng lại cấu trúc 5 chủ đề, 3 cấp, nhãn trạng thái | Cập nhật theo luật mới |
| `tokens.css`, `Breadcrumbs`, `ProductStatusLabel`, `EmptyUnavailableState` | Dùng lại | |
| `tests/br-t004`, `br-t023`, `r0-integration`, `pages.test` | Giữ nguyên | Đang tham chiếu mô hình/route cũ; chỉ đổi sau nghiệm thu |

**Quy tắc thay thế an toàn:** bản mới xây trong thư mục riêng (ví dụ `src/features/oanquan-v2/`) và route/flag riêng; **bản cũ và route `?preview=oanquan3d` giữ nguyên** cho đến khi Product Owner nghiệm thu bản thay thế. Điều kiện nghiệm thu để gỡ bản cũ: (1) engine test PASS, (2) chơi trọn ván trên desktop và mobile thật, (3) a11y cơ bản PASS, (4) nhóm A của Matrix chốt, (5) test cũ được cập nhật hoặc thay thế có phê duyệt.

### 11.3 MVP chơi thử và phát hành đầy đủ
- **MVP chơi thử:** chỉ dùng tập thẻ đã được reviewer duyệt (đề xuất tối thiểu 45 thẻ, 3/tổ hợp chủ đề × cấp). Giao diện thẻ phải chơi tốt không cần hình minh họa.
- **Phát hành đầy đủ 100 thẻ + thẻ Quan:** sau khi duyệt nội dung và xác nhận quyền hình ảnh.
- Không công khai hình minh họa hay nội dung chưa được xác nhận quyền sử dụng (không đưa vào `public/`, không đưa lên nhánh phát hành).

## 12. Tiêu chí nghiệm thu mockup — **ĐÃ ĐẠT 23/11/2026** (các mục dưới giữ làm tiêu chí kiểm thử khi dựng UI thật; xem thêm tài liệu handoff)
- [x] Cả 9 màn (S1–S9) có Desktop 1280×800 và Mobile 390×844; các màn nội dung dài (S3, S6, S7, S8, S8b) có kiểm tra 360×740.
- [x] Có trang "Sơ đồ thứ tự ô" thể hiện `ringIndex` ở cả hai bố cục; chiều kim đồng hồ nhất quán.
- [x] Thẻ có đủ Cấp 1/2/3, có/không hình, mặt trước/mặt đáp án, `auto`/`referee`/`hybrid`.
- [x] Luồng Trọng tài đủ: Xong → Mở đáp án → checklist → Đạt/Chưa đạt (chờ xác nhận) → Xem lại → Chốt (khóa). Không hoàn tác sau chốt.
- [x] Mọi trạng thái ô và thành phần ở Mục 4 có biến thể; có bảng kiểm tra trạng thái (1/5/10/15 hạt; hợp lệ, không chọn được, đang chọn, đích thu hoạch; Quan còn / đã thu hoạch) trên desktop/mobile × nền gameplay/challenge.
- [x] Số quân theo một quy tắc: huy hiệu = tổng, tối đa 5 token, `+k` = số hạt ẩn; không còn `×N` ở bất kỳ màn nào.
- [x] Không màn nào ngầm chỉ ngưỡng Đạt tự động khi R21 chưa duyệt.
- [x] Token, nhãn, chip không chặn vùng chạm; thứ tự ô đúng ringIndex trên mọi bố cục.
- [x] Ba nhãn trạng thái luật ở Mục 10 có biến thể.
- [x] Có phiên bản reduced motion (mô tả hoặc khung tĩnh) và chế độ không bấm giờ.
- [x] Dùng token Brainroot; ghi chú cặp màu cần kiểm AA.
- [x] Không có artwork chưa xác nhận quyền ngoài ô giữ chỗ hoặc mẫu nội bộ được gắn nhãn.
- [x] Mọi chữ hiển thị bằng tiếng Việt chuẩn, không chữ "Sai" kết án; không hứa tính năng chưa làm.

---

## Phụ lục A. Lịch sử thay đổi trong G0.5 (23/11/2026)

Phần này ghi lại các vòng chỉnh sửa; nội dung đã được gộp vào §1–§12 ở trên. Khi hai chỗ khác nhau, **§1–§12 là quy tắc hiện hành**.

### A.0 Dựng mockup lần đầu

**Mockup:** canvas "Brainroot · Ô ăn quan xanh · Mockup G0.5" (Design canvas, độc lập, không nối production). Có 27 artboard: S1–S9 desktop (1280×800) và mobile (390×844), S5a/S5b, S8/S8b, Màn hỗ trợ (wireframe), Sơ đồ ringIndex, Hệ thị giác, Biến thể thẻ, Chuyển động.

**Thay đổi so với Brief ban đầu**
| Mục | Thay đổi |
|---|---|
| S3 | Hàng của người chơi tạm là hàng dưới; chọn ô nào là câu hỏi mới **R25** trong Matrix V1.1. |
| S4 | Đúng Brief: xem trước chỉ hiện đường đi và hạt cuối, **không** tiết lộ kết quả ăn. Hai nút chiều nằm sát ô đã chọn (desktop) hoặc ở đáy (mobile). |
| S7 | Có hai nút Đạt / Chưa đạt cùng cỡ. Danh sách ý là **bản tóm tắt tạm** (R21). *(Bản 1.1: bỏ gợi ý "đủ ngưỡng" và mọi chữ "2/3"; xem §5 S7.)* |
| S8 | Hạt thu hoạch tạm về kho người vừa rải: câu hỏi mới **R26**. |
| Nhãn | Mỗi artboard có nhãn review bật/tắt (Tweaks ▸ showReview): nội dung thật, placeholder, dữ liệu mẫu, bản soạn thử, luật chờ nhóm chốt. |
| Ring | Bật Tweaks ▸ showRing để thấy ringIndex trên bàn; trang "Kiểm chứng ringIndex" nêu ba bất biến cần kiểm thử ở G1. |

**Chưa làm trong G0.5:** tập sự 60 giây, màn Lỗi/không khả dụng, nhãn "Luật đã được nhóm xác nhận" (chỉ có "Luật bản thử"), thẻ `hybrid`, kiểm tra tương phản bằng công cụ, prototype tương tác (các artboard là bản tĩnh; chuyển động chỉ là vòng lặp minh họa). *(Bản 1.1: đã có kiểm tra 360×740 cho S3, S6, S7, S8, S8b và Visual QA bằng render; xem Phụ lục A.3.)*

### A.1 Tích hợp Asset Kit V2
Gói `Brainroot_OAnQuanXanh_V2_Curated_AssetKit.zip` đã được đưa vào mockup:
| Hạng mục | Cách dùng trong mockup |
|---|---|
| Nền | Ảnh baked WebP: `lobby` cho S1, `gameplay` cho S2–S5, S8, S9, `challenge` cho S6, S7 và màn hỗ trợ; bản dọc cho mobile. Bỏ làm mờ toàn màn, chỉ dùng lớp phủ nhẹ. |
| Khung bàn | `board_frame.svg` làm lớp dưới của bàn desktop. Bàn mobile dựng bằng CSS cùng bảng màu (khung kit là hình ngang, xoay dọc sẽ méo). 12 ô, số hạt, viền trạng thái vẫn là phần tử riêng. |
| Hạt | *(Đã thay)* `seed.svg` bị loại; nay dùng token V2 làm placeholder (§9). Vẫn một loại trung tính (R17). |
| **Quan** | *(Đã thay)* SVG `quan_climate`, `quan_biodiversity`, `quan_pair` bị loại; nay dùng token Quan V2 làm placeholder. Quan vẫn tách khỏi Brainie/Rootie. |
| Lọ kho | 5 lọ `jar_*` trên thanh người chơi. Số điểm là chữ HTML. |
| Thẻ | `card_ornaments.svg` và `paper_texture.png` (độ mờ 12%) làm lớp trang trí, không chặn thao tác. |
Chưa dùng: `canopy`, `foreground`, `particles`, bộ cảnh SVG xếp lớp. Việc ghi nguồn vào `docs/ASSET_AUDIT.md` và rà quyền AI trước khi công khai thuộc G2.

### A.2 Quy tắc hiển thị số quân và trạng thái ô — phần A (đã nghiệm thu)
**Đã nghiệm thu (PASS) ngày 23/11/2026 và áp dụng cho mọi artboard.** Nội dung đã gộp vào §3, §4, §5; mục này giữ làm bảng tra nhanh.

**Số quân (một quy tắc cho mọi thiết bị)**
| Thành phần | Quy tắc |
|---|---|
| Huy hiệu góc ô Dân | Luôn ghi **tổng số hạt thật** (kể cả 0). Là chữ DOM, không nằm trong ảnh. |
| Số token vẽ | Tối đa **5** token mỗi ô, trên cả desktop và mobile. 1–5 hạt: xếp theo mẫu cố định (5 = mặt xúc xắc). |
| Chip `+k` | Chỉ xuất hiện khi n > 5, với k = n − 5 (số hạt **không được vẽ**). Khi đó 5 token xếp 3 + 2 để góc dưới phải trống cho chip. |
| Không dùng | `×N` lặp lại tổng số. |
| Ô Quan | Không có huy hiệu góc; số là nhãn chữ "Quan + N hạt" (hoặc "N hạt" khi Quan đã thu hoạch). Hạt Dân trong ô Quan theo cùng quy tắc 5 + `+k`. |

**Trạng thái ô**
| Trạng thái | Hiển thị |
|---|---|
| Hợp lệ (chọn được) | Viền cam nhịp nhẹ, ô nâng 3px, con trỏ `pointer`. |
| Không chọn được | Ô **không** giảm độ trong suốt, token giữ nguyên màu và độ bão hòa. Chỉ đổi: viền trung tính, nền ô xám nhạt, viền nét đứt bên trong, không nâng, con trỏ `not-allowed`, `aria-disabled="true"`. |
| Đang chọn | Viền xanh rừng đậm, ô nâng 10px. |
| Đích thu hoạch | Viền vàng phát sáng, nền ô vàng nhạt, chip "Ăn N hạt · Cấp L" phía trên. |
| Quan đã thu hoạch | Khung nét đứt "Quan đã thu hoạch" thay cho token; hạt còn lại vẫn vẽ. |

**Ô Quan trên mobile:** nhãn rút gọn "Khí hậu" / "Đa dạng" (một dòng), tên đầy đủ theo tài liệu nhóm nằm trong `aria-label` của ô. Nhãn đặt ở dải phẳng của ô, tránh mép cong; không che token, số hạt hay vùng chạm.

**Vùng chạm:** cả ô, theo ringIndex (`data-ring`). Token, huy hiệu, chip `+k`, nhãn đều `pointer-events:none`. Kiểm tra bằng `elementFromPoint` trên 25 điểm mỗi ô ở S3 desktop, mobile 390×844, mobile 360×740: 0 điểm lệch.

**S7 – Trọng tài:** bỏ thông điệp "Đủ 2/3 ý: gợi ý Đạt". Checklist chỉ để ghi lại các ý đã nghe, không tự tính kết quả; trọng tài tự quyết Đạt hay Chưa đạt. Ngưỡng Đạt (R21) chưa duyệt nên không hiển thị gợi ý nào. S8/S8b đã sửa theo cùng nguyên tắc (§5 S8).

**Token:** bộ V2 chỉ là token tạm trong mockup, không phải art cuối. Art cuối chờ bộ V3 (brief riêng), bàn giao sau quá trình tạo và đánh giá độc lập.

### A.3 Vòng hoàn thiện cuối G0.5
| Hạng mục | Kết quả |
|---|---|
| S6 desktop | Khung "Vai trò lượt này" và "Ô đang thử thách" có nền đặc và nằm trên lớp bàn; thẻ cách hai khung 42px; chip "Đáp án đang ẩn" và "Trọng tài (đối thủ)" không còn xuống dòng. |
| S7 | Bốn trạng thái: S7 (chưa chọn), S7b (đã chọn, chờ xác nhận), S7c (xem lại), S7d (đã chốt), desktop và mobile. Kết quả chỉ ghi vào ván khi chốt; không hoàn tác sau chốt. |
| S8 | Bỏ nút "Hoàn tác (5s)" ở desktop, mobile, 360. |
| Lớp phủ | Bàn cờ phía sau thẻ và khung trọng tài ở trạng thái `inert` + `aria-hidden`. |
| 360×740 | Thêm S1, S2, S4, S5a, S5b, S9 (đã có S3, S6, S7, S8, S8b). Thử thêm với vùng an toàn đáy 34px. |
| Tương phản | §7.1. Đã sửa 3 cặp chữ không đạt; 6 đề xuất token cho thành phần giao diện chờ duyệt. |
| Rules Matrix | Bản 1.2: sửa ghi chú R21 và mục 3.1, 3.5 cho đúng mockup; phương án luật giữ nguyên. |

### A.4 Chốt bàn giao (G0.5 UX/UI PASS – APPROVED FOR HANDOFF)
| Hạng mục | Kết quả |
|---|---|
| Token tương phản | 6 token thay thế ở §7.1 được duyệt, đưa vào design tokens; đo lại khi dựng UI thật. |
| S8/S8b mobile | Bỏ bàn cờ thu nhỏ ×0.56; thay bằng khung tóm tắt (ô liên quan, số hạt, kho, trọng tài, bài học). Desktop giữ bàn. |
| S7 | Giữ 4 trạng thái; trạng thái ván chỉ đổi sau Chốt kết quả; không hoàn tác sau chốt. |
| Token Art | V2 placeholder; V3 chưa nghiệm thu. |
| Rules Matrix | V1.3: R17 chuyển sang nhóm A. |
