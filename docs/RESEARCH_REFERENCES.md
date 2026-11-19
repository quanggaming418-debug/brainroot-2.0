# Reference Inventory — Official Documentation and GitHub Research

**Last reviewed:** 20/11/2026. Links are research/implementation references, not endorsement, license approval or instructions to copy designs. Check latest versions and project licenses before reuse.

## A. Project-specific primary sources (user-provided)
1. ULIS Kế hoạch số 1968/KH-ĐHNN (03/11/2026), section III–VI: tables, timeline, baseline, competition scoring.
2. Slide tập huấn ULIS Hackathon (18/11/2026), pages 2–10: problem-first, prototype, evidence, 24h, integrity.
3. Brainroot ULIS 16-slide deck, pages 1–4, 10–15: mission, mascot, Fact–Act, prototype, future ecosystem. Statements about impact and revenue require evidence.
4. `[TLKNST] - Brainroot` ZIP: `Brainroot - Design thinking_.docx` (200 survey responses stated, no raw data in ZIP), Fact–Act VN/EN, Ô ăn quan xanh 5 PDFs + question Word, design images, Demo website docx. Website cũ is reference only.
5. Four user-provided animated website reference videos. **Use only stylistic learning** (editorial typography, environmental storytelling, playful illustrations, depth), not copied art/code/layout.

## B. Coding-agent memory and process
| Reference | Link | What to borrow conceptually |
|---|---|---|
| AGENTS.md open convention | https://github.com/agentsmd/agents.md | Short repo-wide guidance for coding agents |
| Google AI Studio Build Mode | https://ai.google.dev/gemini-api/docs/aistudio-build-mode | Generate apps, import/export, GitHub 2-way sync; confirm repo state with diffs and tests |
| Antigravity Rules (legacy reference) | https://antigravity.google/docs/rules/ | `.agents/rules` is inherited optional guidance; **do not assume AI Studio auto-loads it** |
| OpenAI Codex iterative workflows | https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex | `AGENTS.md`, plans, build logs, evidence/approval gates; templates are optional patterns |
| Codex Exec Plans | https://developers.openai.com/cookbook/articles/codex_exec_plans | A durable plan for multistep tasks |
| GitHub Spec Kit | https://github.com/github/spec-kit | Spec → plan → tasks → implementation separation |
| MADR | https://github.com/adr/madr | Brief architecture decision records and consequences |
| Conventional Commits | https://www.conventionalcommits.org/en/v1.0.0/ | Consistent `feat:`, `fix:`, `docs:` commit history |
| Keep a Changelog | https://keepachangelog.com/en/1.1.0/ | Human-facing release changes, distinct from internal agent logs |

## C. Engineering and content
| Reference | Link | Scope / caution |
|---|---|---|
| Next.js | https://nextjs.org/docs | Confirm current version before scaffolding |
| Supabase Next.js auth example | https://github.com/supabase/supabase/tree/master/examples/user-management/nextjs-user-management | Patterns for auth, NOT proof security configuration is correct |
| Supabase RLS | https://supabase.com/docs/guides/database/postgres/row-level-security | Enforce server-side authorization + deny by default |
| Playwright | https://github.com/microsoft/playwright | E2E, screenshot/mobile responsive smoke |
| Axe Core | https://github.com/dequelabs/axe-core | Automated accessibility checks, insufficient on its own |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Usability and accessibility acceptance rules |
| OWASP ASVS | https://asvs.owasp.org/ | Security control verification for web apps |
| Motion | https://github.com/motiondivision/motion | React animation; respect reduced motion/license |
| shadcn/ui | https://github.com/shadcn-ui/ui | UI implementation references, customize design to Brainroot; check license |
| OpenAQ API | https://github.com/openaq/openaq-api | Air quality measurements: unit, station, timestamp, coverage; verify API/license |
| Open-Meteo air quality docs | https://open-meteo.com/en/docs/air-quality-api | Forecast/model data (different from measurement), license/business use check |
| UNESCO ESD Roadmap | https://www.unesco.org/en/articles/education-sustainable-development-roadmap | Youth, community action, education for sustainable development |

## D. New references for brand assets and animation
| Reference | Link | Scope |
|---|---|---|
| Canva Content License | https://www.canva.com/policies/content-license-agreement/ | Commercial use, stock/Pro content, education-only and trademark restrictions |
| Canva Licensing Explained | https://www.canva.com/licensing-explained/ | Standalone content and logo/trademark cautions |
| MDN SVG Guides | https://developer.mozilla.org/en-US/docs/Web/SVG/Guides | Embedded raster vs vector, SVG structure and animation |
| MDN Animation Performance | https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate | GPU compositing, transform, reduced motion and performance |
| Google AI Studio Build | https://ai.google.dev/gemini-api/docs/aistudio-build-mode | Build, sync GitHub, export ZIP, full-stack runtime and secrets |

## E. What NOT to do with references
- Không sao chép nguyên các templates, UI/brand, câu hỏi game của nguồn ngoài nếu không đủ quyền.
- Không đưa API key hoặc token từ GitHub gist vào code.
- Không biến nghiên cứu tổng quát thành số liệu khẳng định Brainroot đã đạt.
- Không tự nhận “WCAG certified”, “UNESCO certified” hay “AQI realtime” khi chưa xác minh.
