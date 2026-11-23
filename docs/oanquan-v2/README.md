# docs/oanquan-v2 — Ô ăn quan xanh V2 (2.5D)

Thư mục tài liệu cho bản Ô ăn quan xanh V2. **Chỉ chứa tài liệu.** Không có mã, ảnh, thẻ hay ZIP gốc.

**Trạng thái (23/11/2026):** UX/UI G0.5 đã được Product Owner nghiệm thu. **G1 (engine) chưa được phép bắt đầu**: còn chờ nhóm Brainroot chốt 20 mục nhóm A của Rules Matrix V1.3, cùng C-02 và C-03 (xem Phụ lục). Token Art V2 chỉ là **placeholder**; Token Art V3 chưa nghiệm thu.

## Thứ tự đọc

1. `BR-T032_TECHNICAL_READINESS_REPORT.md`: audit kỹ thuật, kiến trúc đề xuất, kế hoạch G1 → G3, checklist trước G1.
2. `BRAINROOT_OANQUAN_G05_HANDOFF.md`: đặc tả dựng UI (màn hình, thành phần, trạng thái, số đo, tiêu chí kiểm thử).
3. `BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md`: quy tắc UX chính thức (bản 2.0). Khi khác Handoff, **Brief thắng**.
4. `BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md` và `RULES_MATRIX_V1.3_ADDENDUM_C01-C03.md`: câu hỏi luật gửi nhóm. Không tự chọn luật.
5. `BRAINROOT_OANQUAN_G05_VISUAL_QA_REPORT.md`: cách kiểm tra mockup, lỗi đã sửa, mục còn mở.
6. `oanquan-tokens.css`: design token bàn giao. **Chỉ để tham chiếu, không được import.** Biến `--br-*` trong file không tồn tại ở repo; khi dựng UI dùng `src/styles/tokens.css` (`--color-*`, `--space-*`) và chỉ thêm `--oq-*`.
7. `ASSET_AUDIT_DRAFT.md`: bản nháp kiểm kê asset AI chờ duyệt quyền.

Quyết định kiến trúc liên quan: `docs/decisions/0006-oanquan-v2-2-5d-architecture.md` (**ACCEPTED** 23/11/2026, kèm 5 điều kiện: G2 sau G1 PASS; prototype UI cần task riêng; feature flag phải loại module/asset/dữ liệu khỏi production bundle; kiểm `dist/` ở G2; không luật mặc định).

## Nguồn và kiểm chứng

Năm file `BRAINROOT_OANQUAN_*.md` và `oanquan-tokens.css` là **bản sao nguyên văn** từ `Brainroot_OAnQuan_Code_Starter_Pack.zip` (thư mục `handoff/`), không chỉnh sửa. SHA-256 (16 ký tự đầu) khớp với `MANIFEST_SHA256.txt` của gói tại thời điểm chép:

| File | SHA-256 (đầu) | Byte |
|---|---|---:|
| `BRAINROOT_OANQUAN_G05_HANDOFF.md` | `371270a1212313f6` | 25 168 |
| `BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md` | `b615f8807ceddc44` | 39 485 |
| `BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md` | `47f17fba4b3f0b79` | 37 673 |
| `BRAINROOT_OANQUAN_G05_VISUAL_QA_REPORT.md` | `0a9f6213228102a7` | 16 426 |
| `oanquan-tokens.css` | `a730f3786af9ecdf` | 5 633 |

Lưu ý xuống dòng: file gốc dùng CRLF. Repo có `.gitattributes` `* text=auto`, nên Git lưu nội dung với LF; SHA-256 ở trên chỉ khớp với bản checkout dùng CRLF (ví dụ Windows với `core.autocrlf=true`). Nội dung chữ không đổi.

Ghi chú đã biết về các bản sao (không sửa trong file gốc):
- Matrix gọi file luật là `Brainroot - Ô ăn quan .docx`; tên thật là `Brainroot - Ô ăn quan xanh .docx`.
- QA report tham chiếu canvas phiên bản `1795392022-b6a4`; Handoff tham chiếu `1795393191-5099`.
- Handoff §8 ghi Token V2 là WebP; file thật là PNG (xem `ASSET_AUDIT_DRAFT.md`).
- Link canvas trong Handoff là artifact riêng tư, chỉ chủ sở hữu mở được.
- Handoff và QA report có dẫn tên một thẻ mẫu ("Ma Trận Rửa Bát", `nuoc-08`) và tên người chơi mẫu. Không có nội dung câu hỏi/đáp án đầy đủ.

## Cố ý KHÔNG đưa vào repo

| Không đưa | Lý do |
|---|---|
| 48 ảnh render `review_images/` | Chứa Token V2 (AI), nền AI chưa khai báo, và chữ trên thẻ/đáp án của nhóm |
| `mockup_reference_source/*.py` | Handoff quy định chỉ để tra số đo, không port, không chép vào repo |
| Asset Kit V2, Token Replacement V2 | Ảnh AI chưa khai `ASSET_AUDIT`, chưa duyệt quyền; Token V2 là placeholder |
| Word luật gốc, 5 PDF thẻ, 2 DOCX bối cảnh | Tài liệu nội bộ của nhóm, chưa xác nhận quyền công bố (xem `00_SOURCE_NOTES.md` của gói) |
| ZIP gốc | Như trên |

Những file này lưu ngoài repo, ở nơi Product Owner quản lý. Không đặt chúng vào `public/` hay `src/`: mọi file import từ `src/` cũng bị Vite đưa vào `dist/` và được deploy khi `main` được push.
