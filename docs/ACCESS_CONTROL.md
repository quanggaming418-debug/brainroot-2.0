# Access Control & Security Policy — v0.1

## Permission matrix (proposed)
| Capability | Guest | Member | Buyer with entitlement | Host | Editor | Admin |
|---|---|---|---|---|---|---|
| View public landing/articles | Yes | Yes | Yes | Yes | Yes | Yes |
| Play public trial | Yes | Yes | Yes | Yes | Yes | Yes |
| Save progress | No | Yes | Yes | Yes | By assigned user role | Yes |
| Open content from paid pack | No | No | Only assigned pack | Only if licensed | By editorial permission | Audited |
| Join room with code | Yes, when enabled | Yes | Yes | Yes | Yes | Yes |
| Create / control room | No | No | No | Yes | Only if separately granted | Yes |
| Edit / publish content | No | No | No | No | Draft/review per role | Yes |
| Redeem activation code | Must sign in | Yes | Yes | Yes if owned | No by default | Admin support only |

## API enforcement
- All restricted resource access must be authorized on server, based on verified session + scoped entitlement.
- No service role credentials, secret activation lists or private answer keys in client bundle.
- Rate limit code redemption, auth attempts, room joins, AI questions. Do not reveal whether a sensitive code belongs to another person.
- Audit privileged actions; use random unpredictable activation tokens, hashed server-side.
- CSRF/session/cookie security per selected auth provider's current docs; HTTPS only in production.
- Private content can be photographed once delivered. No DRM guarantee; balance anti-abuse with user experience.
- Follow OWASP ASVS requirements appropriate to the actual deployment (not claim certification).

## Youth / school privacy
- Guest play possible; no default collection of real names, exact location, face photo or medical/disability data.
- Teacher room supports anonymous labels; any class reporting should default to aggregate.
- Consents, privacy notice, retention/deletion and parental safeguards require review before enabling long-term account collection for minors.

## Approval gates
Database migration, secret/env changes, OAuth provider, public deploy, payment and bulk import of real participant data require explicit owner review. Never copy research survey PII into dev data.
