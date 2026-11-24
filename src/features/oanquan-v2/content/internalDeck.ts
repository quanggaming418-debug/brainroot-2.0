import type { ChallengeLevel } from '../engine';
import type { DemoCard } from './demoCards';
import type { DanTheme, Theme } from './themes';

/**
 * BR-T038 — Bộ thẻ giáo dục gốc (CHỈ dùng nội bộ để phát triển/kiểm thử, chưa được công bố).
 *
 * Schema + bộ chuyển đổi + bộ rút thẻ, KHÔNG chứa nội dung thật.
 * Nội dung thật nằm ở `internal-data/cards.internal.json` (đã gitignore) và chỉ được nạp bởi
 * `content/activeDeck.ts` trong chế độ dev (`import.meta.env.DEV`).
 */
export interface InternalCardRecord {
  readonly id: string;
  readonly theme: DanTheme;
  /** Số thẻ trong bộ 20 thẻ của chủ đề (01–20). */
  readonly no: number;
  readonly level: ChallengeLevel;
  readonly levelName: string;
  readonly title: string;
  /** Bối cảnh. */
  readonly context: string;
  /** Thử thách. */
  readonly challenge: string;
  /** Thời gian riêng của thẻ (giây), theo thẻ gốc. */
  readonly timeSec: number;
  /** Nội dung mặt đáp án "Trọng tài duyệt khi" (đáp án mẫu / tiêu chí), giữ nguyên bản gốc. */
  readonly sampleAnswer: string;
  /** Chỉ có ở bản nội bộ/dev; bị loại khỏi bundle FULL (không lộ tên tệp nguồn). */
  readonly source?: { readonly file: string; readonly cardPage: number; readonly answerPage: number };
}

export interface InternalDeckFile {
  readonly schemaVersion: 1;
  readonly count: number;
  readonly cards: readonly InternalCardRecord[];
}

export const DAN_THEMES: readonly DanTheme[] = ['green', 'energy', 'waste', 'water', 'consume'];
const PER_THEME: Readonly<Record<ChallengeLevel, number>> = { 1: 7, 2: 7, 3: 6 };

/**
 * ÁNH XẠ TẠM — hai Ô Quan chưa có bộ thẻ riêng trong tài liệu gốc (BR-T038):
 * rút thẻ Cấp 3 liên quan của bộ gốc. Không tạo thẻ mới. Chờ nhóm chốt bộ thẻ Quan chính thức.
 */
export const QUAN_THEME_SOURCES: Readonly<Record<'climate' | 'biodiversity', readonly DanTheme[]>> = {
  climate: ['energy', 'consume'],
  biodiversity: ['green', 'water', 'waste'],
};

/** Kiểm tra cấu trúc cơ bản; trả về danh sách lỗi (rỗng = hợp lệ). */
export function validateDeckFile(file: unknown): string[] {
  const errs: string[] = [];
  const f = file as Partial<InternalDeckFile> | null;
  if (!f || f.schemaVersion !== 1 || !Array.isArray(f.cards)) return ['schema: sai định dạng tệp'];
  const ids = new Set<string>();
  const counts = new Map<string, number>();
  for (const c of f.cards) {
    if (!c || typeof c.id !== 'string') { errs.push('thẻ thiếu id'); continue; }
    if (ids.has(c.id)) errs.push(`trùng id ${c.id}`);
    ids.add(c.id);
    if (!DAN_THEMES.includes(c.theme)) errs.push(`${c.id}: chủ đề lạ`);
    if (![1, 2, 3].includes(c.level)) errs.push(`${c.id}: cấp lạ`);
    if (!(c.timeSec > 0)) errs.push(`${c.id}: thiếu thời gian`);
    for (const k of ['title', 'context', 'challenge', 'sampleAnswer'] as const) {
      if (typeof c[k] !== 'string' || !c[k]) errs.push(`${c.id}: thiếu ${k}`);
    }
    const key = `${c.theme}/${c.level}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (f.cards.length !== 100) errs.push(`số thẻ ${f.cards.length} ≠ 100`);
  for (const t of DAN_THEMES) {
    for (const lv of [1, 2, 3] as const) {
      const n = counts.get(`${t}/${lv}`) ?? 0;
      if (n !== PER_THEME[lv]) errs.push(`${t} cấp ${lv}: ${n} thẻ ≠ ${PER_THEME[lv]}`);
    }
  }
  return errs;
}

const NEEDS_EXPLANATION = /giải thích|tại sao|vì sao/i;

/**
 * Trắc nghiệm tự chấm CHỈ khi nguồn hỗ trợ: phương án A/B/(C) nằm trong phần Thử thách,
 * đáp án gốc bắt đầu bằng "Chọn X", và thử thách không yêu cầu giải thích. Còn lại là câu hỏi mở.
 */
export function parseChoice(c: Pick<InternalCardRecord, 'challenge' | 'sampleAnswer'>):
  { options: string[]; correct: number } | null {
  const ans = /^Chọn ([A-D])\b/.exec(c.sampleAnswer);
  if (!ans || NEEDS_EXPLANATION.test(c.challenge)) return null;
  const marks: { letter: string; at: number; end: number }[] = [];
  const re = /(?:^|[\s(:;/])([A-D])\.\s+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(c.challenge))) {
    if (m[1] === 'ABCD'[marks.length]) marks.push({ letter: m[1], at: m.index, end: re.lastIndex });
  }
  if (marks.length < 2) return null;
  const options = marks.map((mk, i) => {
    let t = c.challenge.slice(mk.end, i + 1 < marks.length ? marks[i + 1].at : undefined);
    if (i + 1 === marks.length) {
      const stop = t.search(/\)|\.\s|$/);
      t = t.slice(0, stop);
    }
    return t.replace(/[\s;/)]+$/g, '').replace(/\.$/, '').trim();
  });
  const correct = 'ABCD'.indexOf(ans[1]);
  if (correct < 0 || correct >= options.length || options.some((o) => !o)) return null;
  return { options, correct };
}

/** Chuyển bản ghi nội bộ sang thẻ chơi (không đổi chữ nào của nội dung gốc). */
export function toGameCard(c: InternalCardRecord): DemoCard {
  const choice = parseChoice(c);
  return {
    id: c.id,
    kind: choice ? 'choice' : 'open',
    options: choice?.options,
    correct: choice?.correct,
    explain: choice ? c.sampleAnswer : undefined,
    theme: c.theme,
    level: c.level,
    timeSec: c.timeSec,
    title: c.title,
    context: c.context,
    challenge: c.challenge,
    refereeGuide: c.sampleAnswer,
    keyPoints: [],
    remember: '',
    internal: true,
    sampleAnswer: c.sampleAnswer,
    sourceRef: c.source ? `${c.source.file} · tr.${c.source.cardPage}/${c.source.answerPage}` : undefined,
  };
}

/** Bộ rút thẻ: theo chủ đề của ô bị ăn + cấp; không lặp trong một nhóm cho tới khi hết. */
export class CardDeck {
  private readonly used = new Set<string>();
  constructor(private readonly random: () => number, private readonly cards: readonly DemoCard[]) {}

  pool(theme: Theme, level: ChallengeLevel): DemoCard[] {
    const internal = this.cards.some((c) => c.internal);
    if (internal && (theme === 'climate' || theme === 'biodiversity')) {
      const src = QUAN_THEME_SOURCES[theme];
      return this.cards.filter((c) => c.level === 3 && src.includes(c.theme as DanTheme));
    }
    const exact = this.cards.filter((c) => c.theme === theme && c.level === level);
    if (exact.length) return exact;
    const byLevel = this.cards.filter((c) => c.level === level);
    return byLevel.length ? byLevel : [...this.cards];
  }

  draw(theme: Theme, level: ChallengeLevel): DemoCard {
    const pool = this.pool(theme, level);
    let fresh = pool.filter((c) => !this.used.has(c.id));
    if (fresh.length === 0) {
      pool.forEach((c) => this.used.delete(c.id));
      fresh = pool;
    }
    const card = fresh[Math.floor(this.random() * fresh.length)];
    this.used.add(card.id);
    return card;
  }
}
