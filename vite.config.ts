import { rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { loadDevDeck, loadFullDeck, resolveOqv2Mode, type Oqv2Env, type Oqv2Mode } from './scripts/oqv2-release.ts';

/**
 * ADR-0006, điều kiện 3: khi V2 ở chế độ OFF, cả cây module `oanquan-v2` (mã, asset, dữ liệu) không được nằm
 * trong đồ thị build; Rollup tự loại chunk là KHÔNG đủ vì asset vẫn được phát ra. Plugin thay module nhập của V2
 * bằng stub rỗng khi OFF. Plugin cũng cấp module ảo `virtual:oqv2-deck` (DEMO/DEV/FULL), xem scripts/oqv2-release.ts.
 */
function oqv2Gate(mode: Oqv2Mode, root: string, env: Oqv2Env): Plugin {
  const STUB = '\0oqv2-disabled';
  const DECK = '\0virtual:oqv2-deck';
  return {
    name: 'brainroot-oqv2-gate',
    enforce: 'pre',
    buildStart() {
      if (mode === 'full') {
        const deck = loadFullDeck(env, root);
        this.warn(`[oqv2] FULL: ${deck.cards.length} thẻ + đáp án sẽ được gửi tới trình duyệt và người dùng có thể truy xuất. Phải có quyền công bố bằng văn bản.`);
      }
    },
    resolveId(id) {
      if (id === 'virtual:oqv2-deck') return DECK;
      if (mode === 'off' && /features\/oanquan-v2\/ui\/OAnQuanV2Page/.test(id)) return STUB;
      return null;
    },
    load(id) {
      if (id === STUB) return 'export default function OAnQuanV2Disabled() { return null; }';
      if (id === DECK) {
        const raw = mode === 'full' ? loadFullDeck(env, root) : mode === 'dev' ? loadDevDeck(root) : null;
        // FULL: bỏ siêu dữ liệu nguồn (tên tệp PDF, số trang) khỏi bundle; chỉ giữ nội dung được phép công bố.
        const deck = raw && mode === 'full' ? { ...raw, cards: raw.cards.map(({ source: _source, ...card }) => card) } : raw;
        return `export default ${JSON.stringify({ mode, deck })};`;
      }
      return null;
    },
  };
}

/**
 * Cloudflare Pages (host chính) phục vụ ở gốc `/` và tự dùng fallback SPA khi KHÔNG có 404.html.
 * GitHub Pages (dự phòng) phục vụ dưới `/brainroot-2.0/` và cần public/404.html để khôi phục deep-link.
 * Cloudflare tự đặt CF_PAGES=1 khi build; có thể ép bằng VITE_BASE_PATH.
 */
function rootBaseCleanup(base: string): Plugin {
  let outDir = '';
  return {
    name: 'brainroot-root-base-cleanup',
    apply: 'build',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir); },
    closeBundle() {
      if (base === '/') rmSync(join(outDir, '404.html'), { force: true });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env } as Oqv2Env & Record<string, string | undefined>;
  const oqMode = resolveOqv2Mode(env, command);
  const base = env.VITE_BASE_PATH ?? (env.CF_PAGES === '1' ? '/' : '/brainroot-2.0/');
  return {
    base,
    define: { __OQV2_MODE__: JSON.stringify(oqMode) },
    plugins: [oqv2Gate(oqMode, process.cwd(), env), rootBaseCleanup(base), react()],
  };
});
