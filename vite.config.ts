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

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const flag = env.VITE_ENABLE_OQV2;
  const enabled = flag === 'true' || (command === 'serve' && flag !== 'false');
  return { base: '/brainroot-2.0/', plugins: [oqv2Gate(enabled), react()] };
});
