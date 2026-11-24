import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadFullDeck, resolveOqv2Mode } from '../scripts/oqv2-release.ts';
import { DAN_THEMES } from '../src/features/oanquan-v2/content/internalDeck.ts';

/** BR-T042 — chế độ OFF/DEMO/FULL: mặc định OFF, FULL cần quyền công bố, thiếu dữ liệu thì lỗi (không fallback DEMO). */
function syntheticDeck() {
  const cards: object[] = [];
  for (const theme of DAN_THEMES) {
    let no = 1;
    for (const [level, n, t] of [[1, 7, 15], [2, 7, 20], [3, 6, 30]] as const) {
      for (let i = 0; i < n; i++, no++) {
        cards.push({ id: `${theme}-${no}`, theme, no, level, levelName: 'x', title: 't', context: 'c', challenge: 'q', timeSec: t, sampleAnswer: 'a', source: { file: 'f', cardPage: 1, answerPage: 2 } });
      }
    }
  }
  return { schemaVersion: 1, count: 100, cards };
}

test('mode defaults to OFF in build; serve defaults to DEV', () => {
  assert.equal(resolveOqv2Mode({}, 'build'), 'off');
  assert.equal(resolveOqv2Mode({}, 'serve'), 'dev');
});

test('explicit modes and legacy flag', () => {
  assert.equal(resolveOqv2Mode({ VITE_OQV2_MODE: 'demo' }, 'build'), 'demo');
  assert.equal(resolveOqv2Mode({ VITE_OQV2_MODE: 'FULL' }, 'build'), 'full');
  assert.equal(resolveOqv2Mode({ VITE_ENABLE_OQV2: 'true' }, 'build'), 'demo', 'legacy true = DEMO, never FULL');
  assert.equal(resolveOqv2Mode({ VITE_ENABLE_OQV2: 'false' }, 'serve'), 'off');
  assert.equal(resolveOqv2Mode({ VITE_OQV2_MODE: 'off' }, 'serve'), 'off');
  assert.throws(() => resolveOqv2Mode({ VITE_OQV2_MODE: 'yes' }, 'build'), /không hợp lệ/);
});

test('FULL is refused without a publication approval reference', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oqv2-'));
  writeFileSync(join(dir, 'deck.json'), JSON.stringify(syntheticDeck()));
  assert.throws(() => loadFullDeck({ OQV2_DECK_FILE: join(dir, 'deck.json') }, dir), /thiếu OQV2_PUBLICATION_APPROVAL/);
  assert.throws(() => loadFullDeck({ OQV2_PUBLICATION_APPROVAL: '  ', OQV2_DECK_FILE: join(dir, 'deck.json') }, dir), /thiếu OQV2_PUBLICATION_APPROVAL/);
});

test('FULL fails loudly on missing or invalid data (no silent DEMO fallback)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oqv2-'));
  const env = { OQV2_PUBLICATION_APPROVAL: 'PO-TEST' };
  assert.throws(() => loadFullDeck({ ...env, OQV2_DECK_FILE: join(dir, 'missing.json') }, dir), /không tìm thấy bộ thẻ/);
  writeFileSync(join(dir, 'bad.json'), '{not json');
  assert.throws(() => loadFullDeck({ ...env, OQV2_DECK_FILE: join(dir, 'bad.json') }, dir), /không phải JSON/);
  const short = syntheticDeck(); short.cards.pop();
  writeFileSync(join(dir, 'short.json'), JSON.stringify(short));
  assert.throws(() => loadFullDeck({ ...env, OQV2_DECK_FILE: join(dir, 'short.json') }, dir), /bộ thẻ không hợp lệ/);
});

test('FULL succeeds only with approval + valid 100-card deck', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oqv2-'));
  writeFileSync(join(dir, 'ok.json'), JSON.stringify(syntheticDeck()));
  const deck = loadFullDeck({ OQV2_PUBLICATION_APPROVAL: 'PO-TEST', OQV2_DECK_FILE: join(dir, 'ok.json') }, dir);
  assert.equal(deck.cards.length, 100);
});
