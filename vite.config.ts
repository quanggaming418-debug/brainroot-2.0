import { rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * ADR-0006, điều kiện 3: khi cờ V2 tắt ở build production, cả cây module `oanquan-v2`
 * (mã, asset, dữ liệu) không được nằm trong đồ thị build. Việc để Rollup tự loại chunk là KHÔNG đủ
 * vì asset vẫn được phát ra. Plugin này thay module nhập của V2 bằng một stub rỗng khi cờ tắt.
 */
function oqv2Gate(enabled: boolean): Plugin {
  const STUB = '\0oqv2-disabled';
  return {
    name: 'brainroot-oqv2-gate',
    enforce: 'pre',
    resolveId(id) {
      if (!enabled && /features\/oanquan-v2\/ui\/OAnQuanV2Page/.test(id)) return STUB;
      return null;
    },
    load(id) {
      return id === STUB ? 'export default function OAnQuanV2Disabled() { return null; }' : null;
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
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const flag = env.VITE_ENABLE_OQV2;
  const enabled = flag === 'true' || (command === 'serve' && flag !== 'false');
  const base = process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH ?? (process.env.CF_PAGES === '1' ? '/' : '/brainroot-2.0/');
  return { base, plugins: [oqv2Gate(enabled), rootBaseCleanup(base), react()] };
});
