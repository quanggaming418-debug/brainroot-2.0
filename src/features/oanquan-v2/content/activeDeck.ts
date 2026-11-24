import deckModule from 'virtual:oqv2-deck';
import { DEMO_CARDS, type DemoCard } from './demoCards';
import { toGameCard, validateDeckFile } from './internalDeck';

/**
 * Chọn bộ thẻ theo chế độ phát hành (BR-T042; module ảo do scripts/oqv2-release.ts cấp lúc build):
 * - `dev`  : `npm run dev` — bộ nội bộ `internal-data/cards.internal.json` nếu có, không thì DEMO.
 * - `demo` : production, thẻ DEMO tự viết. KHÔNG có dữ liệu thẻ thật trong bundle.
 * - `full` : production, 100 thẻ gốc. Chỉ build được khi có OQV2_PUBLICATION_APPROVAL; thiếu dữ liệu → lỗi build, không fallback.
 * Dữ liệu ở `full` nằm trong mã gửi tới trình duyệt: người dùng truy xuất được.
 */
export type DeckSource = 'demo' | 'internal' | 'full';

export interface ActiveDeck {
  readonly cards: readonly DemoCard[];
  readonly source: DeckSource;
  readonly problems: readonly string[];
}

export function loadActiveDeck(): ActiveDeck {
  const { mode, deck } = deckModule;
  if (deck && (mode === 'dev' || mode === 'full')) {
    const problems = validateDeckFile(deck);
    if (problems.length === 0) return { cards: deck.cards.map(toGameCard), source: mode === 'full' ? 'full' : 'internal', problems };
    if (mode === 'full') throw new Error('Bộ thẻ FULL không hợp lệ: ' + problems.join('; '));
    return { cards: DEMO_CARDS, source: 'demo', problems };
  }
  if (mode === 'full') throw new Error('Chế độ FULL nhưng không có bộ thẻ (không fallback sang DEMO).');
  return { cards: DEMO_CARDS, source: 'demo', problems: [] };
}
