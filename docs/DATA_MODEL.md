# Logical Data Model — v0.1 (draft)

Không phải migration SQL đã sẵn sàng dùng. Các bảng được chia nhóm để tránh lập database lớn quá sớm.

## Content core (R0, ban đầu có thể là JSON checked-in)
| Entity | Main fields | Constraints |
|---|---|---|
| `topics` | id, slug, name_vi, name_en?, description, status | slug unique; published only if reviewed |
| `games` | id, slug, game_type, access_tier, release_state, rule_version | game_type controlled enum |
| `content_packs` | id, game_id, topic_id, title, language, review_status, license | review required before public |
| `questions` | id, pack_id, level, prompt, options?, rationale?, duration?, source_ids[], access_tier | no answer without review; duration optional |
| `sources` | id, title, url, publisher, checked_at, license? | provenance preserved |
| `articles` | id, slug, body, topic_ids, source_ids, status, published_at | draft excluded from public API |

## Identity / entitlement (R1/R3)
| Entity | Main fields | Important rules |
|---|---|---|
| `profiles` | user_id, nickname?, consent_flags | do not require full name or DOB for guest |
| `roles` | user_id, role, scope | least privilege |
| `entitlements` | user_id, pack_id, source, granted_at, expires_at? | server check per payload |
| `activation_codes` | id, token_hash, pack_id, remaining_uses, state | never store/send raw code to clients after issuance |
| `game_attempts` | user_id?, session_id, game_id, question_id, result, created_at | minimal behavioral data |
| `challenge_reflections` | attempt_id, reflection_text?, self_reported | not equivalent to externally verified action |

## Host rooms (R2 candidate)
| Entity | Main fields | Important rules |
|---|---|---|
| `rooms` | id, code_hash_or_random_code, host_id, pack_id, state, expires_at | join can be guest; expiry and uniqueness |
| `participants` | id, room_id, anonymous_label, consent_state | private responses by default |
| `room_responses` | room_id, participant_id, question_id, selection, submitted_at | idempotency, no leak between rooms |

## Environmental provenance (future)
`environmental_readings`: id, region, provider, station_or_model, standard, metric, value, unit, observed_at, retrieved_at, license_url, quality_flag, stale; optional coarse region only.

## Core invariants
1. `published` public content cannot include paid-only question or private answer key unless allowed by product owner.
2. Server checks `entitlement` on every restricted data request and media response; client UI alone never protects commercial material.
3. RLS/authorization policies tested for guest, student, buyer, host, editor, admin on **positive and negative paths**.
4. Minor/PII data retention and deletion rules must be approved before production registration.
5. Each educational question maps to verifiable source, reviewer status, topic and language. No synthetic research passed off as survey data.
