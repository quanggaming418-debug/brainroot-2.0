# Editorial & Environmental Knowledge Policy

## Educational content lifecycle
`draft → evidence_review → approved → published → archived`
- Every factual item needs `source_title`, URL/identifier, publisher, retrieved_at/reviewed_at, version/region, and responsible reviewer.
- `reflective` prompts may be open-ended and should not falsely claim single scientific correct answer.
- Laws, local waste separation, official environmental indexes, AQI standards and local policies require dated sources and geographical scope.
- For contentious/conditional environmental claims (reusable cup vs disposable, bio-plastic, transport emissions), add conditions and avoid absolute language without LCA evidence.
- Never portray research **targets** (e.g. 70% awareness, 50% sustained action) as observed outcomes.

## Prior audit issues from Brainroot dataset
- Source file `Brainroot - Design thinking_.docx` reports **200** survey responses but raw responses were not included; various summarized percentages should be validated before public use.
- Ô ăn quan xanh contains prompts with strong claims about life-cycle impact; they need scientific review before being pushed live.
- The materials have photos of pilot events; ensure consent/right-to-use before publishing faces.
- Fact–Act includes social sharing and physical-action tasks; provide opt-out and safe alternatives.

## Content schema draft
```yaml
id: oanquan-consumption-001
game: o-an-quan-xanh
topic: tieu-dung
level: 1
language: vi
prompt: "[nội dung sau khi biên tập]"
options: []
answer_type: decision
explanation: "[có điều kiện và căn cứ]"
sources: []
review_status: draft
access_tier: trial
accessibility_alternative: "[nếu cần]"
```
Tất cả bracket placeholders là **đang thiếu**, không được hiển thị như dữ liệu thực.

## Responsible use of facts and statistics
- Đo sự thay đổi kiến thức/ý định/hành động **tự báo cáo** riêng; không dùng từ “tác động đã được chứng minh” khi chưa có phép đo độc lập.
- Không phát tán thông tin y tế/không khí nguy hiểm vượt quá khả năng của nguồn; AQI educational widget là thông tin, không thay thế hướng dẫn cơ quan chuyên môn.
- Với bài báo bên ngoài, chỉ dùng mô tả và link/citation phù hợp, không sao chép toàn văn khi không có quyền.
