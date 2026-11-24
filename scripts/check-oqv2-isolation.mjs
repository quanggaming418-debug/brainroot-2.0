// BR-T040 — kiểm tra cô lập Ô ăn quan xanh V2 trong bản build production (ADR-0006, điều kiện 3).
// Dùng: `npm run build` (cờ tắt) rồi `node scripts/check-oqv2-isolation.mjs [dist]`. Thoát mã 1 nếu còn dấu vết V2.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist);
const text = files.filter((f) => /\.(js|css|html|json|svg)$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n');
const bad = [];
if (/oq2-|oqv2|oanquan-v2|OAnQuanV2Page/.test(text)) bad.push('chuỗi V2 trong mã/CSS');
if (/internal-data|cards\.internal/.test(text)) bad.push('tham chiếu dữ liệu nội bộ');
for (const f of files) if (/(brainie|rootie)_0\d_|garden_(desktop|mobile)_\d|OAnQuanV2/.test(f)) bad.push('asset/chunk V2: ' + f);
const cards = 'internal-data/cards.internal.json';
if (existsSync(cards)) {
  const deck = JSON.parse(readFileSync(cards, 'utf8')).cards;
  const hits = deck.filter((c) => text.includes(c.title.slice(0, 28)) || text.includes(c.sampleAnswer.slice(0, 28))).length;
  if (hits) bad.push(`${hits} thẻ nội bộ xuất hiện trong dist`);
}
if (bad.length) { console.error('FAIL isolation:\n- ' + bad.join('\n- ')); process.exit(1); }
console.log(`OK: ${files.length} tệp trong ${dist}, không có dấu vết V2 hay thẻ nội bộ.`);
