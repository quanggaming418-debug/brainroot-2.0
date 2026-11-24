# Accessibility and Inclusive Learning Requirements

**Goal:** WCAG 2.2 AA target for key flows. This is a design target, NOT a claim of compliance.

## Web shell
- Keyboard navigation: Header/menu/CTA/form/game/result/modal all work without mouse; focus visible, no keyboard trap.
- Semantic headings, field labels, alt text for meaningful mascots/illustrations, decorative art hidden from screen reader.
- Text contrast tested on `#E79A7C`, `#A6C6B6` and gradient overlays; never only color-coding.
- Reduced-motion switches CSS/JS to non-motion alternative; user can pause autoplay where present.
- **Giới hạn Hero V4 (BR-T020):** Motion trang trí tự chạy song song với nội dung quá năm giây và không có cơ chế dừng, tạm dừng hoặc ẩn ngay trên trang. Theo quyết định sản phẩm, tab ẩn sẽ tạm dừng và `prefers-reduced-motion: reduce` sẽ tắt hiệu ứng; các biện pháp này không giải quyết [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) cho người dùng đang xem ở chế độ mặc định. Hero có giới hạn đã biết ở tiêu chí này; không tuyên bố đạt WCAG 2.2 AA.
- Screen readers should hear prompt/options/feedback in a sensible order; result changes announced politely without flooding.

## Inclusive game rules
- No question demands timed motor response by default; offer accessible/untimed mode for timed educational activities.
- Provide alternatives to physically moving, recording videos, speaking aloud, publicly sharing personal content.
- No reliance on audio alone, color alone or drag-and-drop alone.
- If QR is included on physical card, also have readable/tactile identifier or an alternative accessible index.
- Do not infer a user's disability or collect health data merely to adapt UI.

## Testing
- Automated: axe-core on home, game catalog, play/result, auth/room when built.
- Manual: keyboard-only, browser zoom including 200%, screen-reader basics with available tools, and reduced motion. Under the [Desktop-only decision](../AGENTS.md), small-screen QA is an access smoke. Record reflow limitations of the desktop layout when assessing WCAG.
- User testing: recruit participants with relevant access needs, obtain consent, record barriers anonymously. Blindfolded non-disabled participants are NOT a substitute.

## Acceptance gates
No release of a critical game flow with inaccessible Next/Submit buttons, focus traps, unreadable controls or mandatory animation that interferes with use.
