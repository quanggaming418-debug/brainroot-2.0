// Build production FULL (100 thẻ gốc) từ bộ dữ liệu CỤC BỘ — chỉ chạy khi Product Owner đã cho phép công bố bằng văn bản (OQ-19).
//
//   PowerShell:
//     $env:OQV2_PUBLICATION_APPROVAL = "<mã văn bản cho phép>"
//     npm run build:full                      # Cloudflare Pages (base "/")
//     npm run build:full -- --host=github     # GitHub Pages (base "/brainroot-2.0/")
//     npm run build:full -- --deck=D:\duong\dan\cards.internal.json
//
// Kết quả nằm ở dist-full/ (đã gitignore). Không đẩy PDF/dữ liệu nội bộ lên Git: bộ thẻ chỉ được đọc lúc build trên máy này.
// Dữ liệu FULL nằm trong mã gửi tới trình duyệt nên người dùng truy xuất được.
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const arg = (name, fallback) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=') ?? fallback;
const host = arg('host', 'cloudflare');
const deck = arg('deck', process.env.OQV2_DECK_FILE ?? 'internal-data/cards.internal.json');
const outDir = 'dist-full';

if (!process.env.OQV2_PUBLICATION_APPROVAL?.trim()) {
  console.error('[build-full] Thiếu OQV2_PUBLICATION_APPROVAL. Chỉ đặt biến này khi đã có văn bản cho phép công bố 100 thẻ (OQ-19). Dừng.');
  process.exit(1);
}
if (host !== 'cloudflare' && host !== 'github') {
  console.error('[build-full] --host phải là cloudflare hoặc github.');
  process.exit(1);
}

const env = {
  ...process.env,
  VITE_OQV2_MODE: 'full',
  OQV2_DECK_FILE: deck,
  ...(host === 'cloudflare' ? { CF_PAGES: '1' } : {}),
};
const run = (cmd, args, e = env) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env: e, shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

console.log(`[build-full] host=${host} deck=${deck} → ${outDir}/`);
run('npx', ['tsc', '--noEmit']);
run('npx', ['vite', 'build', '--outDir', outDir, '--emptyOutDir']);
// Cloudflare Pages chỉ dùng fallback SPA khi KHÔNG có 404.html (lệnh build của dashboard Git cũng xóa nó).
if (host === 'cloudflare') rmSync(`${outDir}/404.html`, { force: true });
run('node', ['scripts/check-oqv2-isolation.mjs', outDir, '--full']);
console.log(`[build-full] Xong. Triển khai thư mục ${outDir}/ (xem docs/RELEASE_PLAYBOOK.md §6). Không commit thư mục này.`);
