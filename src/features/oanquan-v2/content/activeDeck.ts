import { DEMO_CARDS, type DemoCard } from './demoCards';
import { toGameCard, validateDeckFile, type InternalDeckFile } from './internalDeck';

/**
 * Cơ chế nạp DEV-ONLY (BR-T038). Bộ thẻ nội bộ ở `internal-data/cards.internal.json` (gitignore).
 * Ngoài chế độ dev, `import.meta.env.DEV` là false → nhánh glob bị loại khỏi bundle và không có
 * nội dung thật nào đi vào `dist/`. Thiếu tệp hoặc tệp lỗi → dùng thẻ DEMO dự phòng.
 */
const files: Record<string, InternalDeckFile> = import.meta.env.DEV
  ? import.meta.glob<InternalDeckFile>('../../../../internal-data/cards.internal.json', { eager: true, import: 'default' })
  : {};

export interface ActiveDeck {
  readonly cards: readonly DemoCard[];
  readonly source: 'internal' | 'demo';
  readonly problems: readonly string[];
}

export function loadActiveDeck(): ActiveDeck {
  const raw = Object.values(files)[0];
  if (raw) {
    const problems = validateDeckFile(raw);
    if (problems.length === 0) return { cards: raw.cards.map(toGameCard), source: 'internal', problems };
    return { cards: DEMO_CARDS, source: 'demo', problems };
  }
  return { cards: DEMO_CARDS, source: 'demo', problems: [] };
}
