import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTr, type Key } from '../src/features/oanquan-v2/ui/i18n.ts';

/** BR-T042 — VI/EN của giao diện Ô ăn quan V2: cùng bộ khóa, cùng tham số, EN không rỗng, đổi ngôn ngữ không cần dựng lại state. */
const vi = makeTr('vi');
const en = makeTr('en');

function placeholders(s: string) { return [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(','); }

test('every key exists in both languages with the same placeholders', async () => {
  // Đọc từ điển qua tr(): dùng chuỗi mẫu để lấy chuỗi gốc
  const src = (await import('node:fs')).readFileSync(new URL('../src/features/oanquan-v2/ui/i18n.ts', import.meta.url), 'utf8');
  const keys = [...new Set([...src.matchAll(/'([a-z0-9.]+)': '/g)].map((m) => m[1]))] as Key[];
  assert.ok(keys.length > 120, 'dictionary found');
  for (const k of keys) {
    const a = vi(k), b = en(k);
    assert.notEqual(a, k, `vi missing ${k}`);
    assert.notEqual(b, k, `en missing ${k}`);
    assert.equal(placeholders(a), placeholders(b), `placeholder mismatch in ${k}`);
  }
});

test('translator interpolates and resolves theme names per locale', () => {
  assert.equal(vi('msg.turn', { name: 'An' }), 'Đến lượt An.');
  assert.equal(en('msg.turn', { name: 'An' }), 'It is An’s turn.');
  assert.equal(vi.theme('water'), 'Nước');
  assert.equal(en.theme('water'), 'Water');
  assert.equal(en.theme('climate', 'short'), 'Climate');
});

test('lazy messages re-render in the new language without touching state', () => {
  const msg = (t: ReturnType<typeof makeTr>) => t('log.pass', { name: 'An', n: 4, pit: 'D2' });
  assert.match(msg(vi), /Đạt/);
  assert.match(msg(en), /Passed/);
});
