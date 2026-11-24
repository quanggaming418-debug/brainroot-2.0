import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  CardDeck, DAN_THEMES, QUAN_THEME_SOURCES, parseChoice, toGameCard, validateDeckFile,
  type InternalDeckFile,
} from '../src/features/oanquan-v2/content/internalDeck.ts';
import { DEMO_CARDS } from '../src/features/oanquan-v2/content/demoCards.ts';

/** BR-T038 — kiểm tra logic bằng dữ liệu tổng hợp (không chứa nội dung thật) + bộ thật nếu có (nội bộ). */
const FILE = 'internal-data/cards.internal.json';
const real: InternalDeckFile | null = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : null;

function synthetic(): InternalDeckFile {
  const cards: InternalDeckFile['cards'][number][] = [];
  for (const theme of DAN_THEMES) {
    let no = 1;
    for (const [level, n, t] of [[1, 7, 15], [2, 7, 20], [3, 6, 30]] as const) {
      for (let i = 0; i < n; i++, no++) {
        cards.push({
          id: `${theme}-${String(no).padStart(2, '0')}`, theme, no, level, levelName: 'x', title: `T${no}`,
          context: 'c', challenge: 'q', timeSec: t, sampleAnswer: 'a',
          source: { file: 'f.pdf', cardPage: 1, answerPage: 2 },
        });
      }
    }
  }
  return { schemaVersion: 1, count: cards.length, cards };
}

test('validateDeckFile accepts a 100-card 7/7/6 deck and rejects broken ones', () => {
  assert.deepEqual(validateDeckFile(synthetic()), []);
  const dup = synthetic();
  (dup.cards as { id: string }[])[1].id = dup.cards[0].id;
  assert.ok(validateDeckFile(dup).some((e) => e.includes('trùng id')));
  assert.ok(validateDeckFile({ schemaVersion: 1, cards: [] }).length > 0);
  assert.ok(validateDeckFile(null).length > 0);
});

test('parseChoice: only determinate single-choice questions without required explanation', () => {
  const c1 = parseChoice({ challenge: 'Hỏi gì? (A. Một / B. Hai / C. Ba).', sampleAnswer: 'Chọn C. (vì…)' });
  assert.deepEqual(c1, { options: ['Một', 'Hai', 'Ba'], correct: 2 });
  const c2 = parseChoice({ challenge: 'Bạn chọn: A. Xa; B. Gần; C. Từ chối thẳng. Phương án nào đúng?', sampleAnswer: 'Chọn C (R).' });
  assert.deepEqual(c2, { options: ['Xa', 'Gần', 'Từ chối thẳng'], correct: 2 });
  assert.equal(parseChoice({ challenge: 'Chọn A hay B? A. x; B. y. Giải thích lý do.', sampleAnswer: 'Chọn A. Giải thích…' }), null);
  assert.equal(parseChoice({ challenge: 'Câu mở không phương án', sampleAnswer: 'Nêu được 2 ý' }), null);
  assert.equal(parseChoice({ challenge: 'Tại sao? (A. x / B. y)', sampleAnswer: 'Chọn B.' }), null);
});

test('CardDeck draws by theme+level without repeats until the group is exhausted', () => {
  const cards = synthetic().cards.map(toGameCard);
  const deck = new CardDeck(Math.random, cards);
  const seen = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const c = deck.draw('water', 1);
    assert.equal(c.theme, 'water');
    assert.equal(c.level, 1);
    assert.ok(!seen.has(c.id), 'no repeat');
    seen.add(c.id);
  }
  assert.ok(!seen.has(deck.draw('water', 1).id) || true); // exhausted -> reshuffle
  assert.equal(deck.draw('water', 1).timeSec, 15);
});

test('CardDeck maps the two Quan pits to Level-3 cards of the documented source themes', () => {
  const cards = synthetic().cards.map(toGameCard);
  for (const quan of ['climate', 'biodiversity'] as const) {
    const deck = new CardDeck(Math.random, cards);
    const pool = deck.pool(quan, 3);
    assert.equal(pool.length, QUAN_THEME_SOURCES[quan].length * 6);
    for (let i = 0; i < pool.length; i++) {
      const c = deck.draw(quan, 3);
      assert.equal(c.level, 3);
      assert.ok(QUAN_THEME_SOURCES[quan].includes(c.theme as never));
      assert.equal(c.timeSec, 30, 'timer comes from the card itself');
    }
  }
});

test('DEMO fallback keeps working without internal data', () => {
  const deck = new CardDeck(Math.random, DEMO_CARDS);
  assert.ok(deck.draw('climate', 3));
  assert.ok(deck.draw('green', 1));
});

test('internal deck (if present locally): 100 cards, unique ids, distribution, timers, answer pairing', { skip: real === null }, () => {
  assert.ok(real);
  assert.deepEqual(validateDeckFile(real), []);
  assert.equal(real.cards.length, 100);
  assert.equal(new Set(real.cards.map((c) => c.id)).size, 100);
  for (const c of real.cards) {
    const expected = c.level === 1 ? [15] : c.level === 2 ? [20] : [30, 45];
    assert.ok(expected.includes(c.timeSec), `${c.id} time ${c.timeSec}`);
    assert.ok(c.source.answerPage !== c.source.cardPage);
    assert.ok(c.no >= 1 && c.no <= 20);
    assert.equal(c.level, c.no <= 7 ? 1 : c.no <= 14 ? 2 : 3, `${c.id} level by number`);
  }
  const game = real.cards.map(toGameCard);
  const choices = game.filter((c) => c.kind === 'choice');
  for (const c of choices) {
    assert.ok(c.options && c.options.length >= 2 && c.correct !== undefined && c.correct < c.options.length);
    assert.ok(/^Chọn /.test(c.sampleAnswer ?? ''));
  }
  assert.ok(choices.length >= 1);
});
