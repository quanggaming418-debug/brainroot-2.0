# Ô ĂN QUAN XANH — Tài liệu bàn giao G0.5 cho tab Code

23/11/2026 · Trạng thái: **G0.5 UX/UI PASS – APPROVED FOR HANDOFF** · Người nhận: phiên Claude Code làm việc trên repo `quanggaming418-debug/brainroot-2.0`.

## 0. Đọc trước

**Tài liệu này dùng để làm gì.** Mô tả đủ để dựng lại giao diện Ô ăn quan xanh bằng code: cấu trúc màn hình, thành phần, trạng thái tương tác, design token, asset, responsive và tiêu chí kiểm thử. Nguồn hình ảnh là canvas mockup G0.5; nguồn quy tắc UX là Brief v2.0.

**Chưa được làm (phải chờ lệnh riêng):**
- Viết game engine (G1). G1 chỉ bắt đầu khi nhóm Brainroot chốt **nhóm A** của Rules Matrix **V1.3** (20 mục, gồm R17).
- Merge, deploy, đổi route production, gỡ prototype 3D cũ.
- Dùng Token Art V2 làm art cuối. V2 là placeholder; **Token Art V3 chưa nghiệm thu**.

**Được làm khi có lệnh triển khai UI (G2):** dựng các thành phần ở §4–§6 trong thư mục riêng (`src/features/oanquan-v2/`, route/flag riêng), dùng dữ liệu giả cho trạng thái ván cho tới khi có engine.

**Tài liệu đi kèm (cùng gói):**
| File | Vai trò |
|---|---|
| `BRAINROOT_OANQUAN_UX_UI_BRIEF_V2_HANDOFF.md` | Quy tắc UX chính thức (bản 2.0). Khi tài liệu này và Brief khác nhau, **Brief thắng**, rồi báo lại. |
| `BRAINROOT_OANQUAN_RULES_DECISION_MATRIX_V1.3.md` | Câu hỏi luật cho nhóm. Không tự chọn luật. |
| `BRAINROOT_OANQUAN_G05_VISUAL_QA_REPORT.md` | Cách đã kiểm tra mockup, lỗi đã sửa, mục còn mở. |
| `oanquan-tokens.css` | Design token (§7). |
| `review_images/` | Ảnh render của 48 artboard (tham chiếu hình ảnh). |
| `mockup_reference_source/` | Mã Python sinh mockup. **Chỉ để tra số đo**, không port, không chép vào repo. |

**Cách dùng trong phiên Code:** chép thư mục gói này vào `docs/oanquan-v2/` của repo (trừ `mockup_reference_source/` và `review_images/` nếu không muốn đưa vào repo), rồi bảo phiên Code: "Đọc docs/oanquan-v2/BRAINROOT_OANQUAN_G05_HANDOFF.md". Theo `AGENTS.md` của repo: đọc `README.md`, `planning/PROJECT_STATE.md`, `planning/ROADMAP.md`, `planning/TASKS.md`, `logs/HANDOFF.md`, `docs/CONTENT_GUIDELINES.md`, `docs/GAME_SPEC.md` trước khi sửa; mỗi việc gắn một Task ID; làm trên branch riêng; **không commit/push/deploy khi Quang chưa nói rõ** (ghi `NOT COMMITTED`); chạy thật `typecheck`/`build`, không ghi PASS nếu không chạy. Việc đầu tiên được phép: ghi quyết định G0.5 vào `docs/DECISIONS.md` và thêm tài liệu này vào `docs/`, không đụng mã game.

**Canvas mockup:** "Brainroot · Ô ăn quan xanh · Mockup G0.5", phiên bản `1795393191-5099`, https://claude.ai/artifact/8N16ESsT2M7frej2hTnREg (riêng tư, chỉ chủ sở hữu xem được). Nhãn review nét đứt trên artboard (NỘI DUNG THẬT, PLACEHOLDER, DỮ LIỆU MẪU, BẢN SOẠN THỬ, LUẬT CHỜ NHÓM CHỐT) **không phải UI sản phẩm**.

---

## 1. Ràng buộc kiến trúc

1. **Ba lớp tách nhau:** Engine (luật thuần, không UI) → Content (dữ liệu thẻ, nhãn chủ đề) → UI (chỉ đọc trạng thái và phát hành động). UI không tự tính luật.
2. **ringIndex chuẩn 0–11 bất biến:** 0 = Quan A; 1–5 = Ô Dân hàng trên, trái → phải; 6 = Quan B; 7–11 = Ô Dân hàng dưới, phải → trái. Chiều kim đồng hồ = ringIndex tăng (mod 12). Mọi bố cục là **phép xoay**, không phản chiếu. Mobile = xoay 90° theo chiều kim đồng hồ: Quan A trên, Quan B dưới, cột phải 1→5 từ trên xuống, cột trái 11→7 từ trên xuống.
3. **Artwork không ảnh hưởng logic:** token, nhãn, chip, huy hiệu đều `pointer-events:none`; vùng chạm là **cả ô**, gắn ringIndex (`data-ring`). Kiểm chứng ở mockup: 25 điểm chạm/ô × 12 ô × 3 kích thước, 0 điểm lệch.
4. **Không chấm câu mở bằng máy hay AI.** Trọng tài luôn là người.
5. **Trạng thái ván chỉ đổi sau "Chốt kết quả".** Chọn Đạt/Chưa đạt chưa ghi gì vào ván. **Không có hoàn tác sau chốt** trong đặc tả hiện tại.
6. **Luật chưa chốt hiển thị trung thực:** mọi chỗ phụ thuộc luật mở dùng giá trị tạm có nhãn (Brief §10), cấu hình được, không mã hóa cứng.
7. **An toàn thay thế:** bản cũ (`?preview=oanquan3d`, prototype 3D) giữ nguyên cho tới khi Product Owner nghiệm thu bản mới (Brief §11.2).

---

## 2. Danh sách màn hình và luồng

| Màn | Mục đích | Artboard desktop / mobile / 360 | Ghi chú triển khai |
|---|---|---|---|
| S1 Bắt đầu | Giới thiệu, nút Chơi 2 người | `S1_desktop` / `S1_mobile` / `S1_mobile_360` | Bàn minh họa là trang trí: `inert` + `aria-hidden`; nút chính thấy ngay không cần cuộn |
| S2 Thiết lập | Tên, trọng tài, thời gian, ai đi trước | `S2_desktop` / `S2_mobile` / `S2_mobile_360` | Mobile: nội dung cuộn, nút "Bắt đầu ván" ghim đáy + vùng an toàn |
| S3 Chọn ô | Lượt nghỉ, chọn ô Dân hợp lệ | `Main` / `S3_mobile` / `S3_mobile_360` | Ô hợp lệ / không chọn được theo R25 (tạm: hàng dưới của người đang đi) |
| S4 Chọn chiều | Xem trước đường đi, chọn ↻/↺, Rải | `S4_desktop` / `S4_mobile` / `S4_mobile_360` | Xem trước **không** tiết lộ kết quả ăn |
| S5a Đang rải | Hạt bay từng viên, "Còn N hạt" | `S5a_desktop` / `S5a_mobile` / `S5a_mobile_360` | Nút "Bỏ qua hoạt ảnh"; reduced motion: nhảy thẳng, vẫn đếm |
| S5b Cơ hội ăn | Kết quả rải, rút thẻ | `S5b_desktop` / `S5b_mobile` / `S5b_mobile_360` | Nhãn "theo luật bản thử" khi R15/R16 chưa chốt |
| S6 Thẻ | Trả lời, đồng hồ, Xong | `S6_desktop` / `S6_mobile` / `S6_mobile_360` | Không hiện đáp án; bàn phía sau `inert` |
| S7 Trọng tài | 4 trạng thái (§5.2) | `S7_*`, `S7b_*`, `S7c_*`, `S7d_*` / `S7_mobile_360` | Bàn phía sau `inert` |
| S8 Đạt | Thu hoạch, bài học | `S8_desktop` / `S8_mobile` / `S8_mobile_360` | **Mobile không vẽ bàn**, dùng khung tóm tắt (§4.12) |
| S8b Chưa đạt | Giữ nguyên, đổi lượt | `S8b_desktop` / `S8b_mobile` / `S8b_mobile_360` | Như S8 |
| S9 Kết thúc | Đại sứ, điểm, biểu đồ, bài học | `S9_desktop` / `S9_mobile` / `S9_mobile_360` | Không ngôn ngữ thua/phạt |
| Hỗ trợ | Tạm dừng, luật tóm tắt, hết thẻ, 4 kết quả rải | `Support_desktop` (wireframe) | Lỗi/không khả dụng dùng `EmptyUnavailableState` có sẵn |

**Artboard tham chiếu khác:** `Ring_diagram` (ringIndex hai bố cục), `Visual_system` (màu, chữ, nút, trạng thái ô), `Card_variants` (4 biến thể thẻ), `Motion_board` (chuyển động), `State_*` (bảng 1/5/10/15 hạt và mọi trạng thái ô, trên nền gameplay và challenge).

**Luồng một lượt:** S3 chọn ô → S4 chọn chiều → S5a rải → S5b kết quả rải → (nếu cơ hội ăn) S6 thẻ → S7 trọng tài (a→b→c→d) → S8/S8b → lượt sau → … → S9.

**Vùng màn hình (gameplay):**
- Desktop 1280×800: header 0–72 (logo, Luật bản thử, Bộ thẻ chơi thử, Tạm dừng, Luật, Nhật ký) · 2 thanh người chơi y≈88 (rộng 520) · bàn tại (110, 186), 1060×335 · dock đáy (stepper 4 bước + thông điệp + hành động).
- Mobile 390×844: header 60 · 2 thanh người chơi y=62 (cao 52) · bàn dọc 366×548 ×0.94 tại y=120 · dock đáy trong vùng ngón cái.

---

## 3. Bố cục bàn cờ (số đo)

| Thông số | Desktop | Mobile (trước khi scale) |
|---|---|---|
| Kích thước bàn | 1060 × 335 | 366 × 548 |
| Lề trong bàn | 28 | 14 |
| Ô Dân | 124 × 124, bo 30 | 104 × 64, bo 18 |
| Khoảng cách ô | 14 | 8 |
| Ô Quan | 150 × 262 (bán nguyệt trái/phải) | 338 × 76 (bán nguyệt trên/dưới) |
| Bo bàn | 46 | 34 |
| Scale hiển thị | 1.0 | 0.94 ở 390; 0.87 ở 360 (S3); 0.80–0.88 ở S4/S5 360 |

Công thức vị trí ô: xem `mockup_reference_source/board.py`, hàm `_slot` / `slot`. Khung gỗ desktop dùng `board_frame.svg` (scale 1060/1164); mobile dựng CSS (gradient `--oq-board-wood-*`), vì khung SVG là hình ngang.

---

## 4. Thành phần

### 4.1 Board
- Props: `layout: 'landscape' | 'portrait'`, `pits: PitState[12]` (theo ringIndex), `interactive: boolean`.
- `isolation: isolate` để mọi phần tử bên trong không vượt lên panel/lớp phủ. Khi có lớp phủ (S6, S7): `inert` + `aria-hidden="true"`.
- Hai lá trang trí ở góc: `pointer-events:none`, `aria-hidden`.

### 4.2 DanPit (Ô Dân)
- Nút có `aria-label` đầy đủ, ví dụ "Ô Dân Nước: 4 hạt", `data-ring`.
- **Huy hiệu góc trên phải = tổng số hạt thật** (chữ DOM, kể cả 0; nền `--oq-badge-bg`, 0 hạt dùng `--oq-badge-bg-zero`). Icon chủ đề trong chip tròn ở góc trên trái.
- **Vẽ tối đa 5 token** trên mọi thiết bị. 1–5 hạt: vị trí cố định (5 = mặt xúc xắc). n > 5: 5 token xếp 3 + 2 và chip **`+k`** (k = n − 5) ở góc dưới phải. **Không dùng `×N`.**
- Vị trí token (tỉ lệ theo lòng ô), từ `board.py`:
  - Desktop: 1 `(.5,.5)` · 2 `(.33,.44)(.67,.56)` · 3 `(.30,.34)(.70,.34)(.50,.68)` · 4 `(.30,.32)(.70,.32)(.30,.68)(.70,.68)` · 5 `(.27,.28)(.73,.28)(.50,.50)(.27,.72)(.73,.72)` · tràn `(.22,.30)(.50,.30)(.78,.30)(.22,.68)(.50,.68)`.
  - Mobile: 1 `(.5,.5)` · 2 `(.35,.5)(.65,.5)` · 3 `(.22,.5)(.5,.5)(.78,.5)` · 4 `(.32,.30)(.68,.30)(.32,.72)(.68,.72)` · 5 `(.2,.30)(.5,.30)(.8,.30)(.35,.72)(.65,.72)` · tràn `(.2,.30)(.5,.30)(.8,.30)(.2,.72)(.5,.72)`.
- 0 hạt: chữ "Trống" (`--oq-text-empty`).

### 4.3 QuanPit (Ô Quan)
- Token Quan (vật phẩm riêng, **không phải linh vật**) ở giữa; nhãn chủ đề: desktop "Biến đổi khí hậu" / "Đa dạng sinh học", mobile "Khí hậu" / "Đa dạng" (một dòng, đặt ở dải phẳng tránh mép cong).
- `aria-label` dùng tên đầy đủ theo tài liệu nhóm: "Biến đổi khí hậu & Chuyển đổi sinh thái", "Bảo tồn đa dạng sinh học & Rừng nguyên sinh".
- Số hạt: nhãn chữ "Quan + N hạt"; hạt Dân trong ô Quan theo cùng quy tắc 5 + `+k`.
- Quan đã thu hoạch: khung nét đứt "Quan đã thu hoạch" thay cho token; hạt còn lại vẫn vẽ.

### 4.4 SeedToken / QuanToken
- Ảnh trang trí, `alt=""`, `aria-hidden`, `pointer-events:none`, `object-fit:contain`. Không tô lại màu theo trạng thái (trạng thái do CSS của ô).
- Cỡ: hạt desktop ô 34px (ảnh cao ~37px), mobile 22px trước scale; Quan desktop 106×100, mobile 64×60. Xoay nhẹ tối đa ±6° (token có mặt).

### 4.5 PlayerPlate
- Avatar chữ cái, tên, "ĐANG ĐI" (bỏ ở 360 vì không đủ chỗ; lượt đi vẫn thấy qua viền cam + dock), 5 lọ kho (số là chữ DOM), tổng điểm. Viền cam nhịp khi đang đi.

### 4.6 TurnDock + Stepper
- Stepper 4 bước: Chọn ô → Chọn chiều → Rải → Thẻ. Thông điệp `aria-live="polite"`. Mobile: ghim đáy, `bottom: calc(8px + env(safe-area-inset-bottom))`.

### 4.7 DirectionButtons (S4)
- Hai nút ↻ / ↺ vẽ theo hướng thật trên màn hình, không nhãn "trái/phải" cố định; cỡ chạm ≥56px; `aria-pressed`. Nút "Rải N hạt" và "Đổi ô".

### 4.8 PathPreview (S4, S5a)
- Đường nét đứt qua các ô sẽ nhận hạt; ô nhận hạt có **vòng ghost chứa hạt mờ** (không dùng ký hiệu "+"); nhãn "Hạt cuối". Mobile: chip "Hạt cuối", "Ăn N hạt · Cấp L" đặt ở làn trống giữa hai cột.

### 4.9 ChallengeCard (S6) và AnswerCard (S7)
- Mặt trước: nhãn cấp (màu + hình huy hiệu tròn/thoi/lục giác + chữ), vòng giờ, tiêu đề, Bối cảnh, ô hình minh họa (có thể không có), Thử thách. Biến thể: Cấp 1/2/3, có/không hình, A/B, đúng/sai, tiêu đề 2 dòng.
- Mặt đáp án: nền `--oq-answer-face`, "Đáp án · Cấp N", "Trọng tài duyệt khi", đáp án mẫu **nguyên văn** tài liệu nhóm.
- Ở 360: thẻ cuộn trong vùng riêng, nút Xong ghim đáy.

### 4.10 RefereePanel (S7) — xem §5.2
- Checklist ý chính: tick được, **chỉ để ghi lại**, không đếm "x/y", không gợi ý Đạt. Hai nút Đạt / Chưa đạt cùng cỡ, không nút nào mặc định.

### 4.11 ResultPanel (S8/S8b desktop)
- Bàn giữ nguyên (ô vừa xét: "Đã thu hoạch" hoặc rung nhẹ), khung kết quả dưới bàn: biểu tượng + tiêu đề, chip "Trọng tài [tên] chốt: …", "Điều nên nhớ", nút Tiếp tục. Không có nút hoàn tác.

### 4.12 ResultSummary (S8/S8b mobile 360–390) — mới ở bản bàn giao
- **Không vẽ bàn cờ.** Khung cuộn từ dưới thanh người chơi: tiêu đề kết quả + thẻ đã dùng → "Ô LIÊN QUAN" (icon chủ đề, tên ô, số hạt: Đạt "+N · Đã thu hoạch · còn 0", Chưa đạt "Giữ nguyên · N hạt") → thay đổi kho ("Kho Nước của Minh: 3 → 7" hoặc "Không có hạt nào vào kho ở lượt này") → chip trọng tài + ghi chú → "Điều nên nhớ" → nút Tiếp tục ghim đáy + vùng an toàn.
- Kho nhận hạt theo R26 (đang tạm: người đang đi) → giá trị lấy từ engine, không suy ra trong UI.

### 4.13 Thành phần phụ
LevelPill, Timer (5 giây cuối đổi nét, không nhấp nháy; chế độ không bấm giờ), Chip, Button (primary peach / forest / ghost / disabled), hộp thoại Tạm dừng / Rời ván / Luật tóm tắt / Hết thẻ (R19).

---

## 5. Trạng thái tương tác

### 5.1 Trạng thái ô
| Trạng thái | Hiển thị | ARIA / tương tác |
|---|---|---|
| Mặc định | Viền cam/mint xen kẽ, lòng ô lõm | |
| Hợp lệ | Viền `--oq-state-valid` nhịp 2.8s, ô nâng 3px | `cursor:pointer` |
| Không chọn được | **Giữ nguyên màu token**; viền trung tính `--oq-state-disabled-rim`, nét đứt bên trong, lòng ô `--oq-state-disabled-well`, không nâng; chạm hiện lý do ngắn | `aria-disabled="true"`, `cursor:not-allowed` |
| Đang chọn | Viền `--oq-state-selected` 4px, ô nâng 10px | `aria-pressed` hoặc `aria-current` |
| Focus bàn phím | Focus ring `--br-focus` ≥3px | Tab/mũi tên theo thứ tự vòng, Enter chọn |
| Xem trước (ghost) | Vòng nét đứt `--oq-state-ghost` chứa hạt mờ | trang trí |
| Hạt cuối | Chip "Hạt cuối" | |
| Ô trống (gap) | Viền nét đứt forest, chữ "Ô trống" | |
| Đích thu hoạch | Viền `--oq-state-target` + quầng `--oq-state-target-glow`, lòng ô vàng nhạt, chip "Ăn N hạt · Cấp L" (desktop phía trên, cách huy hiệu; mobile ở làn giữa) | |
| Đã thu hoạch | Viền `--oq-state-harvested`, chữ "Đã thu hoạch" | |
| Giữ nguyên sau Chưa đạt | Rung ngang 2 chu kỳ (tắt khi reduced motion) | |
| Quan còn / đã thu hoạch | §4.3 | |

### 5.2 Luồng Trọng tài (máy trạng thái UI)
```
           mở đáp án (sau Xong/hết giờ)
 [ẩn đáp án] ─────────────────────────▶ (a) CHƯA CHỌN
                                         │ chọn Đạt | Chưa đạt
                                         ▼
                                    (b) ĐÃ CHỌN – CHỜ XÁC NHẬN ◀─┐
                                         │ đổi lựa chọn ──────────┘
                                         │ Xem lại
                                         ▼
                                    (c) XEM LẠI TRƯỚC KHI CHỐT
                                         │ Sửa lựa chọn → (b)
                                         │ Chốt kết quả
                                         ▼
                                    (d) ĐÃ CHỐT  ──Tiếp tục──▶ S8 / S8b
```
- (b) có thể bấm "Chốt kết quả" thẳng (bỏ qua c) hoặc "Xem lại".
- **Chỉ ở (d) mới phát hành động vào engine** (`commitRefereeResult`). (a)–(c) là trạng thái UI cục bộ, không đổi trạng thái ván, không ghi nhật ký.
- (d) khóa: không còn nút đổi kết quả; **không hoàn tác**. "Xem lại" một lần do người trả lời đề nghị là đề xuất R22, chờ nhóm.
- `aria-live` thông báo khi vào (b) "Đã chọn: Đạt, chưa ghi vào ván" và (d) "Đã chốt: Đạt".
- Nhánh Chưa đạt giống hệt, chỉ đổi nút được chọn.

### 5.3 Ví dụ dữ liệu hiển thị (từ mockup)
- Trước nước đi (S3/S4): `[0,3,5,0,4,2,0,6,1,5,2,7]` theo ringIndex 0–11.
- Rải 5 hạt từ ô 9 chiều kim đồng hồ → 10, 11, 0, 1, 2; sau đó (S5b): `[1,4,6,0,4,2,0,6,1,0,3,8]`, ô 3 trống, ô 4 (Nước) có 4 hạt → thẻ Cấp 2 "Ma Trận Rửa Bát" (`nuoc-08`, 20 giây, câu mở).
- Đây là dữ liệu minh họa giao diện, **không phải kết quả của engine**; luật ăn (R15/R16) chưa chốt.

---

## 6. Responsive

| Khung | Quy tắc |
|---|---|
| Desktop ≥1024px (thiết kế ở 1280×800) | Bàn ngang; panel hai bên ở S6; thẻ giữa |
| Mobile dọc 360–430px (thiết kế 390×844, kiểm 360×740) | Bàn xoay 90°; dock/footer ghim đáy; nội dung dài cuộn trong vùng riêng; nút chính luôn thấy không cần cuộn |
| Vùng an toàn | Mọi thanh đáy cộng `env(safe-area-inset-bottom)`; đã thử với 34px |
| 360px | Bỏ "ĐANG ĐI" trên thanh người chơi; bàn S3 ×0.87, S4 ×0.80, S5a ×0.88, S5b ×0.85; S6/S7 thẻ cuộn, nút ghim đáy |
| S8/S8b mobile | Khung tóm tắt (§4.12), không bàn |
| Tablet, ngang trên điện thoại | **Chưa thiết kế.** Đề xuất: ≥768px ngang dùng bố cục desktop; cần Product Owner xác nhận |

Vùng chạm ≥44px (ô Dân mobile ~98×60 ở 390, ~90×56 ở 360).

---

## 7. Design tokens

File `oanquan-tokens.css`. Tóm tắt:
- **Base Brainroot:** ivory `#F8F3E9`, ink `#263B31`, muted `#465D49`, peach `#E79A7C`, sage `#A6C6B6`, forest `#2D563F`, focus `#174E42`.
- **6 token tương phản đã duyệt (23/11/2026):** `--oq-state-valid #D4620E`, `--oq-state-target #AC7A0C`, `--oq-state-ghost #E56522`, `--oq-state-pending #A9740F`, `--oq-choice-border #9C9273`, `--oq-theme-energy #C38611`.
- **Chữ đã sửa AA:** "Trống" `#5F6856`, "Đã thu hoạch" `#297247`, nền nhãn Nước có chữ trắng `#367BA5`.
- Cấp thẻ, 5 màu chủ đề + tint, khoảng cách 4/8/12/16/24/32/48/64, bo góc, bóng, thời lượng chuyển động, lớp z, vùng an toàn.
- **Mockup vẫn dùng màu cũ** ở 6 chỗ trên (không render lại theo quyết định nghiệm thu). Code dùng token mới; **đo lại tương phản khi dựng UI thật**.

---

## 8. Asset mapping

Đường dẫn đích đề xuất: `src/features/oanquan-v2/assets/…` (không đặt vào `public/` khi chưa xác nhận quyền).

| Vai trò | File nguồn | Định dạng / cỡ | ID trên canvas | Trạng thái |
|---|---|---|---|---|
| Hạt Dân | Token Replacement V2 `dan_seed_256.png` (+ bản 128 tự thu nhỏ) | WebP 201×256, 100×128 | `5db4d023…`, `6c8d57bc…` | **Placeholder (V2)** |
| Quan Khí hậu | V2 `quan_climate_512.png` / `_256` | WebP 512, 256 | `920a839a…`, `ab8d7422…` | **Placeholder (V2)** |
| Quan Đa dạng sinh học | V2 `quan_biodiversity_512.png` / `_256` | WebP 512, 256 | `104d07c8…`, `2a0bd731…` | **Placeholder (V2)** |
| Nền lobby / gameplay / challenge × desktop, mobile | Asset Kit V2 `backgrounds/*.webp` | WebP | `beceb2e1…`, `76e541d5…`, `9cf2c8ff…`, `e3759f39…`, `1a31f8a7…`, `d6dbb764…` | Dùng trong mockup |
| Khung bàn desktop | Kit V2 `components/board_frame.svg` | SVG inline | (inline) | Dùng trong mockup |
| 5 lọ kho | Kit V2 `components/jar_{green_space,energy,waste,water,consumption}.svg` | SVG | `598ce2ae…`, `85713081…`, `658488e1…`, `65aeecec…`, `4e597067…` | Dùng trong mockup |
| Trang trí thẻ | Kit V2 `card_ornaments.svg`, `textures/paper_texture.png` (12%) | SVG, PNG | `fa4c2a9c…`, `f80680a1…` | Dùng trong mockup |
| Brainie, Rootie | Bộ mascot Brainroot đã duyệt (đường dẫn trong repo cần xác nhận) | WebP | `a6a49db9…`, `37a2fb6a…` | Đã duyệt; chỉ trang trí, **không làm quân Quan** |
| Lá trang trí góc bàn | Bộ asset Brainroot cũ (đường dẫn repo cần xác nhận) | WebP | `3753b2a1…`, `0010cd6b…` | Trang trí |
| Icon (chủ đề, thao tác) | SVG nét vẽ trong mockup (`lib.py`, hàm `icon`) | SVG 24px, nét 2–3 | — | Có thể thay bằng bộ icon Brainroot nếu có |
| 100 hình minh họa thẻ | PDF của nhóm | — | — | **Chưa công khai**; dùng ô giữ chỗ |
| **Không dùng nữa** | `seed.svg`, `quan_climate.svg`, `quan_biodiversity.svg`, `quan_pair.svg` (Kit V2); Token Art V1 | — | — | Đã loại |

- Khi V3 được nghiệm thu: chỉ thay file hạt và 2 Quan theo đúng vai trò trên; không đổi layout, cỡ hiển thị theo §4.4.
- Mọi ảnh AI (Kit V2, Token V2, V3) phải khai trong `docs/ASSET_AUDIT.md` trước khi công khai (G2).
- Asset gốc nằm trong các gói zip đã gửi trước (Asset Kit V2, Token Replacement V2); ID canvas chỉ để đối chiếu, không dùng làm URL trong code.

---

## 9. Trợ năng
- Ô là nút có nhãn đầy đủ; thứ tự Tab theo vòng; focus ring ≥3px.
- `aria-live` cho rải, ăn, chọn/chốt kết quả, kết quả thẻ.
- Màu không là tín hiệu duy nhất: cấp có hình + chữ; trạng thái ô có nâng/chip/ARIA; kết quả có biểu tượng + chữ.
- `prefers-reduced-motion`: tắt nhịp, rung, bay; giữ thông báo từng bước. Nút "Bỏ qua hoạt ảnh".
- Lớp phủ: bàn phía sau `inert`.
- Chế độ không bấm giờ, +50% thời gian; âm thanh mặc định tắt.

---

## 10. Tiêu chí kiểm thử

**Đơn vị / logic hiển thị (không cần engine):**
1. Ánh xạ ringIndex → vị trí: desktop 1→5 x tăng, 7→11 x giảm; mobile 1→5 y tăng ở cột phải, 7→11 y giảm ở cột trái; không phản chiếu.
2. Số quân: n = 0, 1, 5, 6, 10, 15 → huy hiệu = n; token vẽ = min(n, 5); chip `+k` chỉ khi n > 5 với k = n − 5; không chuỗi `×` nào.
3. Trọng tài: (a)→(b)→(c)→(d) không gọi `commitRefereeResult` trước (d); gọi đúng một lần ở (d); ở (d) không có nút đổi/hoàn tác.
4. Không có văn bản ngưỡng ("x/y ý", "đủ ngưỡng", "Chưa đủ ý", "gợi ý Đạt") khi cấu hình R21 chưa có ngưỡng.

**Tương tác:**
5. Hit-test: chạm 25 điểm/ô → đúng `data-ring`; token, nhãn, chip không chặn chạm.
6. Ô không chọn được: không phát hành động; hiện lý do; token giữ màu (không `opacity`/`filter` trên ô).
7. Bàn phím: mũi tên đi qua ô hợp lệ theo thứ tự vòng, Enter chọn, Esc quay lại; lớp phủ bẫy focus.

**Responsive (Playwright hoặc tương đương):**
8. 1280×800, 390×844, 360×740, và 360×740 với vùng an toàn 34px: không chữ tràn ngoài khung, không chữ bị cắt, mọi nút trong khung và không bị che (`elementFromPoint` 3 điểm/nút), nút chính thấy không cần cuộn.
9. S8/S8b mobile không render bàn; desktop có bàn.

**Trợ năng:**
10. axe (hoặc tương đương) không lỗi nghiêm trọng; đo lại tương phản với token mới (chữ 4.5:1, chữ lớn 3:1, thành phần giao diện 3:1).
11. Reduced motion: không còn chuyển động lặp.

**Hình ảnh:**
12. So với `review_images/` cùng kích thước: bố cục, thứ tự, trạng thái khớp; khác biệt cho phép: 6 màu token mới, font render.

---

## 11. Phụ thuộc và việc còn mở

| Hạng mục | Chặn gì | Ai |
|---|---|---|
| Nhóm A của Rules Matrix V1.3 (20 mục, **gồm R17**) | G1 engine | Nhóm Brainroot |
| R17: nếu các loại hạt **khác giá trị** → đổi dữ liệu hạt, cách đếm (R24, R10, R2), kho, hiển thị điểm; phải chốt trước G1 | G1 | Nhóm Brainroot |
| R21 (ngưỡng Đạt), R22 (xem lại), R26 (kho nhận hạt), R25 (chọn ô) | Cấu hình UI liên quan | Nhóm Brainroot |
| Token Art V3 | Art cuối | Làm độc lập |
| Tablet / ngang | Chưa có thiết kế | Product Owner |
| `ASSET_AUDIT`, quyền hình minh họa thẻ | Công khai | G2 / nội dung |

**Bước tiếp theo đề xuất:** gửi Rules Matrix V1.3 cho nhóm Brainroot, ưu tiên nhóm A (đặc biệt R0, R2, R17, R24, R25, R26). Khi nhóm A chốt và có lệnh, mới bắt đầu G1.
