/**
 * Chế độ Ô ăn quan xanh V2 (ADR-0006): off | demo | full | dev. Vite thay bằng hằng số lúc build
 * (scripts/oqv2-release.ts). `off` = V2 không có trong dist/. Xem docs/RELEASE_PLAYBOOK.md.
 */
declare const __OQV2_MODE__: 'off' | 'demo' | 'full' | 'dev' | undefined;
export const OQV2_MODE: 'off' | 'demo' | 'full' | 'dev' = typeof __OQV2_MODE__ === 'undefined' ? 'off' : __OQV2_MODE__;
export const OQV2_ENABLED: boolean = OQV2_MODE !== 'off';
