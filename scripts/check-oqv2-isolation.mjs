// BR-T040 — kiểm tra cô lập Ô ăn quan xanh V2 trong bản build production (ADR-0006, điều kiện 3).
// Hai chế độ tách biệt:
//   cờ TẮT : `node scripts/check-oqv2-isolation.mjs [dist]`            → không được có bất kỳ dấu vết V2 nào (mã, CSS, asset, chunk) và không có thẻ nội bộ.
//   DEMO   : `node scripts/check-oqv2-isolation.mjs [dist] --leak-only` → V2 được phép có mặt, nhưng không được rò rỉ dữ liệu nội bộ/thẻ thật/đáp án.
//   FULL   : `node scripts/check-oqv2-isolation.mjs [dist] --full`      → chỉ dùng khi đã được phép công bố: yêu cầu đủ 100 thẻ, không lộ tên tệp nguồn/đường dẫn nội bộ/PDF.
// Thoát mã 1 nếu vi phạm.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const full = process.argv.includes('--full');
const leakOnly = process.argv.includes('--leak-only') || full;
const dist = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'dist';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist);
const text = files.filter((f) => /\.(js|css|html|json|svg)$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n');
const bad = [];
if (!leakOnly && /oq2-|oqv2|oanquan-v2|OAnQuanV2Page/.test(text)) bad.push('chuỗi V2 trong mã/CSS');
if (/internal-data|cards\.internal|\.pdf/i.test(text)) bad.push('tham chiếu dữ liệu nội bộ / tên PDF');
if (!leakOnly) for (const f of files) if (/(brainie|rootie)_0\d_|garden_(desktop|mobile)_\d|OAnQuanV2/.test(f)) bad.push('asset/chunk V2: ' + f);
if (leakOnly && !full && !/Góc cây trong lớp/.test(text)) bad.push('bản DEMO không chứa thẻ DEMO (kỳ vọng thẻ DEMO)');
const cards = process.env.OQV2_DECK_FILE ?? 'internal-data/cards.internal.json';
if (existsSync(cards)) {
  const deck = JSON.parse(readFileSync(cards, 'utf8')).cards;
  const hits = deck.filter((c) => text.includes(c.title.slice(0, 28)) || text.includes(c.sampleAnswer.slice(0, 28))).length;
  if (full) { if (hits < 100) bad.push(`FULL: chỉ ${hits}/100 thẻ có trong dist`); }
  else if (hits) bad.push(`${hits} thẻ nội bộ xuất hiện trong dist`);
} else if (full) bad.push('FULL: không có tệp bộ thẻ để đối chiếu (đặt OQV2_DECK_FILE)');
if (full && /Góc cây trong lớp/.test(text) === false) { /* thẻ DEMO vẫn có thể có mặt hoặc không; không bắt buộc */ }
if (bad.length) { console.error('FAIL isolation:\n- ' + bad.join('\n- ')); process.exit(1); }
console.log(`OK: ${files.length} tệp trong ${dist}, ${full ? 'FULL: đủ 100 thẻ, không lộ tên tệp nguồn.' : leakOnly ? 'không rò rỉ dữ liệu nội bộ (V2 được phép).' : 'không có dấu vết V2 hay thẻ nội bộ.'}`);
