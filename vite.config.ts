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

export default defineConfig(({ command, mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env } as Oqv2Env & Record<string, string | undefined>;
  const oqMode = resolveOqv2Mode(env, command);
  // Cloudflare Pages (host chính) phục vụ ở gốc `/` (Cloudflare tự đặt CF_PAGES=1); GitHub Pages (dự phòng) dưới `/brainroot-2.0/`.
  // KHÔNG xóa dist/404.html ở đây: lệnh build của dashboard Cloudflare đã tự xóa nó (`rm dist/404.html`); xóa trước sẽ làm lệnh đó thất bại.
  const base = env.VITE_BASE_PATH ?? (env.CF_PAGES === '1' ? '/' : '/brainroot-2.0/');
  return {
    base,
    define: { __OQV2_MODE__: JSON.stringify(oqMode) },
    plugins: [oqv2Gate(oqMode, process.cwd(), env), react()],
  };
});
