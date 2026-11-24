import { defineConfig, loadEnv, type Plugin, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { DESKTOP_LAYOUT_WIDTH } from './src/utils/layoutViewport.ts';
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

function desktopViewport(): Plugin {
  return {
    name: 'brainroot-desktop-viewport',
    transformIndexHtml(html) {
      const viewport = html.replace(
        /(<meta name="viewport" content=")width=device-width, initial-scale=1(?:\.0)?/,
        `$1width=${DESKTOP_LAYOUT_WIDTH}`,
      );
      return {
        html: viewport,
        tags: [{
          tag: 'style',
          children: `@media (width < ${DESKTOP_LAYOUT_WIDTH}px) { html { min-width: ${DESKTOP_LAYOUT_WIDTH}px; } }`,
          injectTo: 'head',
        }],
      };
    },
  };
}

export default defineConfig(({ command, mode }): UserConfig => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env } as Oqv2Env & Record<string, string | undefined>;
  const oqMode = resolveOqv2Mode(env, command);
  const desktopOnly = env.VITE_LAYOUT_MODE !== 'responsive';
  // Cloudflare Pages (host chính) phục vụ ở gốc `/` (Cloudflare tự đặt CF_PAGES=1); GitHub Pages (dự phòng) dưới `/brainroot-2.0/`.
  // KHÔNG xóa dist/404.html ở đây: lệnh build của dashboard Cloudflare đã tự xóa nó (`rm dist/404.html`); xóa trước sẽ làm lệnh đó thất bại.
  const base = env.VITE_BASE_PATH ?? (env.CF_PAGES === '1' ? '/' : '/brainroot-2.0/');
  return {
    base,
    define: {
      __OQV2_MODE__: JSON.stringify(oqMode),
      __DESKTOP_ONLY__: desktopOnly,
    },
    css: desktopOnly ? {
      postcss: {
        plugins: [{
          postcssPlugin: 'brainroot-desktop-breakpoints',
          AtRule: {
            media(rule) {
              // Keep the responsive styles in source for the responsive build.
              const maxWidths = [...rule.params.matchAll(/\(\s*max-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/gi)];
              const narrowLayout = maxWidths.some(([, width]) => Number(width) < DESKTOP_LAYOUT_WIDTH);
              const compactLandscape = /\(max-height:\s*520px\)\s+and\s+\(orientation:\s*landscape\)/i.test(rule.params);
              if (narrowLayout || compactLandscape) rule.remove();
            },
          },
        }],
      },
    } : undefined,
    plugins: [oqv2Gate(oqMode, process.cwd(), env), react(), desktopOnly && desktopViewport()],
  };
});
