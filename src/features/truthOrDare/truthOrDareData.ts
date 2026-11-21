import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';

/**
 * Brainroot - Truth or Dare V1 — Faithful Digital Data Contract & Assets
 *
 * GOVERNANCE BOUNDARIES (BR-T028, ADR-0005):
 * - Public deck = exactly the 20 cards the project owner approved on 2026-11-21
 *   (verbatim VI/EN in `truthOrDareCards.ts`). The other ~43 of the 63 physical
 *   cards stay private; never add them here.
 * - No invented questions/actions. Green Penalties are the 5 suggestions from the
 *   team's own rules (spread over the 15 wheel sectors).
 * - Rulebook text = the team's 5-step rule (owner-supplied). Zero API keys in frontend.
 */

export type CardSide = 'truth' | 'dare';

export interface LocalizedText {
  readonly vi: string;
  readonly en: string;
}

export interface TruthOrDareActionLabels {
  readonly play: string;
  readonly rules: string;
  readonly shuffle: string;
  readonly draw: string;
  readonly flip: string;
  readonly done: string;
  readonly skip: string;
  readonly spin: string;
  readonly next: string;
  readonly stop: string;
}

/** Exact minimal action labels specified for Brainroot - Truth or Dare. */
export const ACTION_LABELS: Readonly<Record<Locale, TruthOrDareActionLabels>> = {
  vi: {
    play: 'Chơi',
    rules: 'Luật',
    shuffle: 'Trộn',
    draw: 'Rút',
    flip: 'Lật',
    done: 'Xong',
    skip: 'Bỏ qua',
    spin: 'Quay',
    next: 'Chơi tiếp',
    stop: 'Dừng',
  },
  en: {
    play: 'Play',
    rules: 'Rules',
    shuffle: 'Shuffle',
    draw: 'Draw',
    flip: 'Flip',
    done: 'Done',
    skip: 'Skip',
    spin: 'Spin',
    next: 'Keep playing',
    stop: 'Stop',
  },
};

export type CardTheme =
  | 'consumption'
  | 'water'
  | 'energy'
  | 'waste'
  | 'green-space'
  | 'climate'
  | 'general';

export interface TruthOrDareCardPair {
  readonly pairId: string;
  readonly cardNumber: string;
  readonly approvalStatus: 'approved_public';
  readonly truthText: LocalizedText;
  readonly truthTheme: CardTheme;
  readonly dareText: LocalizedText;
  readonly dareTheme: CardTheme;
  /** Suggested countdown (seconds) for timed Dare cards; null when untimed. */
  readonly dareTimerSec: number | null;
  /** Dare suggests a photo/post as proof — optional, never required. */
  readonly dareProof: boolean;
}

export interface GreenPenaltySlot {
  readonly slotId: string;
  readonly sectorIndex: number; // 0..14 matching mystery_wheel_15_questionmarks.svg
  readonly slotNumber: string;
  readonly approvalStatus: 'approved';
  readonly text: LocalizedText;
}

export interface RulebookSpread {
  readonly id: string;
  readonly leftPageNumber: number;
  readonly rightPageNumber: number;
  readonly left: {
    readonly kicker: LocalizedText;
    readonly title: LocalizedText;
    readonly body: LocalizedText;
    readonly mascot: 'brainie' | 'rootie' | 'both' | 'wheel';
  };
  readonly right: {
    readonly kicker: LocalizedText;
    readonly title: LocalizedText;
    readonly points: ReadonlyArray<LocalizedText>;
    readonly footnote: LocalizedText;
  };
}

export interface OfflineFaqEntry {
  readonly id: string;
  readonly question: LocalizedText;
  readonly answer: LocalizedText;
  readonly keywords: Readonly<Record<Locale, readonly string[]>>;
}

/** All 19 verified Storybook 2.5D SVGs + official Brainie & Rootie mascots. */
export const TOD_ASSETS = {
  tabletopDesktop: publicUrl(
    '/assets/truth-or-dare/v1/experience/background/tabletop_desktop.svg',
  ),
  tabletopMobile: publicUrl(
    '/assets/truth-or-dare/v1/experience/background/tabletop_mobile.svg',
  ),
  upperVine: publicUrl(
    '/assets/truth-or-dare/v1/experience/layers/upper_vine.svg',
  ),
  bottomGrass: publicUrl(
    '/assets/truth-or-dare/v1/experience/layers/bottom_grass.svg',
  ),
  deckShadow: publicUrl(
    '/assets/truth-or-dare/v1/experience/cards/deck_shadow.svg',
  ),
  cardEdge: publicUrl(
    '/assets/truth-or-dare/v1/experience/cards/card_edge.svg',
  ),
  truthFaceBase: publicUrl(
    '/assets/truth-or-dare/v1/experience/cards/truth_face_base.svg',
  ),
  dareFaceBase: publicUrl(
    '/assets/truth-or-dare/v1/experience/cards/dare_face_base.svg',
  ),
  mysteryWheel: publicUrl(
    '/assets/truth-or-dare/v1/experience/wheel/mystery_wheel_15_questionmarks.svg',
  ),
  wheelPointer: publicUrl(
    '/assets/truth-or-dare/v1/experience/wheel/pointer.svg',
  ),
  bookCoverBlank: publicUrl(
    '/assets/truth-or-dare/v1/experience/rulebook/book_cover_blank.svg',
  ),
  bookPageBlank: publicUrl(
    '/assets/truth-or-dare/v1/experience/rulebook/book_page_blank.svg',
  ),
  washiTape: publicUrl(
    '/assets/truth-or-dare/v1/experience/stickers/washi_tape.svg',
  ),
  leafSprig: publicUrl(
    '/assets/truth-or-dare/v1/experience/stickers/leaf_sprig.svg',
  ),
  sparkles: publicUrl(
    '/assets/truth-or-dare/v1/experience/stickers/sparkles.svg',
  ),
  modalFrame: publicUrl(
    '/assets/truth-or-dare/v1/experience/ui/modal_frame.svg',
  ),
  roundIconBg: publicUrl(
    '/assets/truth-or-dare/v1/experience/ui/round_icon_bg.svg',
  ),
  chatPanelBorder: publicUrl(
    '/assets/truth-or-dare/v1/experience/chat/chat_panel_border.svg',
  ),
  typingDots: publicUrl(
    '/assets/truth-or-dare/v1/experience/chat/typing_dots.svg',
  ),
  brainieMascot: publicUrl('/assets/hero-v4/brainie.webp'),
  rootieMascot: publicUrl('/assets/hero-v4/rootie.webp'),
} as const;

/** The 20 owner-approved public cards (TD-01…TD-20). */
export { APPROVED_PUBLIC_CARDS as TRUTH_OR_DARE_DECK } from './truthOrDareCards';

/** Theme chip labels (themes are proposals pending team confirmation). */
export const THEME_LABELS: Readonly<Record<CardTheme, LocalizedText>> = {
  consumption: { vi: 'Tiêu dùng', en: 'Consumption' },
  water: { vi: 'Nước', en: 'Water' },
  energy: { vi: 'Năng lượng', en: 'Energy' },
  waste: { vi: 'Rác thải', en: 'Waste' },
  'green-space': { vi: 'Không gian xanh', en: 'Green space' },
  climate: { vi: 'Khí hậu', en: 'Climate' },
  general: { vi: 'Chung', en: 'General' },
};

/** The team's 5 suggested Green Penalties (rule step 4), verbatim from the owner-supplied rules. */
export const GREEN_PENALTY_SUGGESTIONS: readonly LocalizedText[] = [
  {
    vi: 'Tạo dáng như cái cây trong 15 giây.',
    en: 'Strike a pose like a tree for 15 seconds.',
  },
  {
    vi: 'Uống một cốc nước và hô "Sống xanh!".',
    en: 'Drink a glass of water and shout "Live green!".',
  },
  {
    vi: 'Bốc thêm 1 lá Dare.',
    en: 'Draw one extra Dare card.',
  },
  {
    vi: 'Đóng góp 2.000–5.000đ vào "Quỹ Xanh" hoặc từ thiện.',
    en: 'Contribute 2,000–5,000 VND to the "Green Fund" or a charity.',
  },
  {
    vi: 'Dọn dẹp khu vực chơi sau khi kết thúc.',
    en: 'Tidy up the play area after the game ends.',
  },
];

/**
 * 15 wheel sectors matching `mystery_wheel_15_questionmarks.svg`; each sector carries one of the
 * 5 suggested Green Penalties (sector i → suggestion i mod 5).
 */
export const GREEN_PENALTY_SLOTS: readonly GreenPenaltySlot[] = Array.from(
  { length: 15 },
  (_, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return {
      slotId: `GP-${num}`,
      sectorIndex: idx,
      slotNumber: num,
      approvalStatus: 'approved',
      text: GREEN_PENALTY_SUGGESTIONS[idx % GREEN_PENALTY_SUGGESTIONS.length],
    } as const;
  },
);

const SPREAD_FOOTNOTE: LocalizedText = {
  vi: 'Bản chơi thử web · 20/63 thẻ.',
  en: 'Web preview · 20 of 63 cards.',
};

/** Hardcover rulebook: the team's official 5-step rule (owner-supplied, VI/EN). */
export const RULEBOOK_SPREADS: readonly RulebookSpread[] = [
  {
    id: 'spread-1',
    leftPageNumber: 1,
    rightPageNumber: 2,
    left: {
      kicker: { vi: 'CHÀO MỪNG', en: 'WELCOME' },
      title: {
        vi: 'Rút thẻ bài, rót kiến thức',
        en: 'Draw a card, pour in knowledge',
      },
      body: {
        vi: 'Brainroot - Truth or Dare là bộ thẻ hai mặt: mặt Truth (Brainie) là một câu hỏi, mặt Dare (Rootie) là một thử thách. Bộ vật lý đầy đủ có 63 thẻ; bản chơi thử trên web có 20 thẻ.',
        en: 'Brainroot - Truth or Dare is a two-sided deck: the Truth side (Brainie) holds a question, the Dare side (Rootie) holds a challenge. The full physical deck has 63 cards; this web preview has 20.',
      },
      mascot: 'both',
    },
    right: {
      kicker: { vi: 'CHUẨN BỊ', en: 'GET READY' },
      title: {
        vi: 'Ngồi thành vòng tròn',
        en: 'Sit in a circle',
      },
      points: [
        {
          vi: 'Mọi người ngồi thành vòng tròn, đặt bộ bài ở giữa.',
          en: 'Everyone sits in a circle with the deck in the middle.',
        },
        {
          vi: 'Chơi để biết thêm điều thú vị về môi trường và thử một hành động xanh nhỏ.',
          en: 'Play to learn something new about the environment and try a small green action.',
        },
        {
          vi: 'Cùng bạn bè học hỏi, cười vui. Không cần đăng nhập.',
          en: 'Learn and laugh together with friends. No sign-in needed.',
        },
      ],
      footnote: SPREAD_FOOTNOTE,
    },
  },
  {
    id: 'spread-2',
    leftPageNumber: 3,
    rightPageNumber: 4,
    left: {
      kicker: { vi: 'BƯỚC 1', en: 'STEP 1' },
      title: {
        vi: 'Chọn người chơi',
        en: 'Choose the player',
      },
      body: {
        vi: 'Cả nhóm tự chọn người chơi lượt này: quay chai, Random Wheel, oẳn tù tì, bốc thăm… cách nào cũng được.',
        en: 'The group picks who plays this turn: spin a bottle, a random wheel, rock-paper-scissors, draw lots… any way you like.',
      },
      mascot: 'wheel',
    },
    right: {
      kicker: { vi: 'BƯỚC 2', en: 'STEP 2' },
      title: {
        vi: 'Chọn Truth hoặc Dare trước khi bốc',
        en: 'Pick Truth or Dare before drawing',
      },
      points: [
        {
          vi: 'Truth (Brainie): trả lời một câu hỏi.',
          en: 'Truth (Brainie): answer a question.',
        },
        {
          vi: 'Dare (Rootie): thực hiện một thử thách.',
          en: 'Dare (Rootie): carry out a challenge.',
        },
        {
          vi: 'Không được chọn Truth hai lượt liên tiếp.',
          en: 'You may not pick Truth two turns in a row.',
        },
      ],
      footnote: SPREAD_FOOTNOTE,
    },
  },
  {
    id: 'spread-3',
    leftPageNumber: 5,
    rightPageNumber: 6,
    left: {
      kicker: { vi: 'BƯỚC 3', en: 'STEP 3' },
      title: {
        vi: 'Bốc bài & thực hiện',
        en: 'Draw & do it',
      },
      body: {
        vi: 'Bốc 1 lá và làm theo mặt đã chọn. Chạm vào bộ bài để rút và lật: chỉ mặt bạn đã chọn được mở, mặt còn lại luôn được giữ kín. Thử thách có giờ sẽ có đồng hồ đếm.',
        en: 'Draw 1 card and follow the side you chose. Tap the deck to draw and flip: only your chosen side opens, the other stays hidden. Timed challenges come with a countdown.',
      },
      mascot: 'rootie',
    },
    right: {
      kicker: { vi: 'BƯỚC 4', en: 'STEP 4' },
      title: {
        vi: 'Không làm được? Nhận Green Penalty',
        en: "Can't do it? Take a Green Penalty",
      },
      points: [
        {
          vi: 'Nhấn Bỏ qua để nhận một Green Penalty ngẫu nhiên.',
          en: 'Press Skip to receive a random Green Penalty.',
        },
        {
          vi: 'Gợi ý: tạo dáng như cái cây 15 giây · uống một cốc nước và hô "Sống xanh!" · bốc thêm 1 lá Dare.',
          en: 'Ideas: strike a tree pose for 15 seconds · drink a glass of water and shout "Live green!" · draw 1 extra Dare card.',
        },
        {
          vi: 'Hoặc: đóng góp 2.000–5.000đ vào "Quỹ Xanh" · dọn dẹp khu vực chơi sau khi kết thúc.',
          en: 'Or: give 2,000–5,000 VND to the "Green Fund" · tidy up the play area afterwards.',
        },
      ],
      footnote: SPREAD_FOOTNOTE,
    },
  },
  {
    id: 'spread-4',
    leftPageNumber: 7,
    rightPageNumber: 8,
    left: {
      kicker: { vi: 'BƯỚC 5', en: 'STEP 5' },
      title: {
        vi: 'Chơi tiếp',
        en: 'Keep playing',
      },
      body: {
        vi: 'Chơi tiếp đến hết bài hoặc khi cả nhóm muốn dừng. Thẻ không lặp lại trong cùng một phiên; bạn có thể nhấn Dừng bất cứ lúc nào.',
        en: 'Keep going until the deck runs out or the whole group wants to stop. Cards never repeat within a session; you can press Stop at any time.',
      },
      mascot: 'brainie',
    },
    right: {
      kicker: { vi: 'ĐIỀU KHIỂN', en: 'CONTROLS' },
      title: {
        vi: 'Dùng bàn phím cũng được',
        en: 'Keyboard friendly',
      },
      points: [
        {
          vi: 'Phím mũi tên Trái/Phải để lật trang sách luật, phím Esc để đóng.',
          en: 'Use the Left/Right arrow keys to turn pages and Esc to close the book.',
        },
        {
          vi: 'Chế độ giảm chuyển động của thiết bị được tôn trọng.',
          en: 'Your device reduced-motion setting is respected.',
        },
        {
          vi: 'Thẻ có gợi ý chụp ảnh/đăng bài chỉ là tùy chọn, không bắt buộc đăng công khai.',
          en: 'Photo/post suggestions on cards are optional, never a requirement to share publicly.',
        },
      ],
      footnote: SPREAD_FOOTNOTE,
    },
  },
];

/**
 * Offline FAQ entries for the floating Brainie helper.
 * Explains the team's rules; never invents card text or extra rules.
 */
export const OFFLINE_FAQ_ENTRIES: readonly OfflineFaqEntry[] = [
  {
    id: 'faq-how-to-play',
    question: {
      vi: 'Bắt đầu một lượt chơi như thế nào?',
      en: 'How does a turn work?',
    },
    answer: {
      vi: 'Cả nhóm chọn người chơi, người đó chọn Truth (Brainie) hoặc Dare (Rootie) trước khi bốc, rồi chạm vào bộ bài để rút và lật: chỉ mặt đã chọn được mở. Làm xong thì nhấn Xong.',
      en: 'The group picks the player, who chooses Truth (Brainie) or Dare (Rootie) before drawing, then taps the deck to draw and flip: only the chosen side opens. Press Done when finished.',
    },
    keywords: {
      vi: ['bat dau', 'cach choi', 'luot choi', 'tron bai', 'rut bai', 'lat bai', 'luat'],
      en: ['start', 'play', 'turn', 'shuffle', 'draw', 'flip', 'how to', 'rules'],
    },
  },
  {
    id: 'faq-consecutive-truth',
    question: {
      vi: 'Vì sao không chọn được Truth hai lần liên tiếp?',
      en: 'Why can’t I pick Truth twice in a row?',
    },
    answer: {
      vi: 'Luật của Brainroot - Truth or Dare: không được chọn Truth hai lượt liên tiếp. Sau một lượt Dare cùng Rootie, nút Truth sẽ mở lại.',
      en: 'It is a rule of Brainroot - Truth or Dare: you may not pick Truth on two consecutive turns. After one Dare turn with Rootie, Truth unlocks again.',
    },
    keywords: {
      vi: ['truth', 'lien tiep', 'khoa', 'hai lan', 'brainie'],
      en: ['truth', 'consecutive', 'locked', 'twice', 'row', 'brainie'],
    },
  },
  {
    id: 'faq-skip-penalty',
    question: {
      vi: 'Không làm được thì sao? Green Penalty là gì?',
      en: 'What if I can’t do it? What is a Green Penalty?',
    },
    answer: {
      vi: 'Nhấn Bỏ qua để nhận một Green Penalty, ví dụ: tạo dáng như cái cây 15 giây, uống một cốc nước và hô "Sống xanh!", bốc thêm 1 lá Dare, đóng góp 2.000–5.000đ vào "Quỹ Xanh", hoặc dọn dẹp khu vực chơi sau khi kết thúc.',
      en: 'Press Skip to take a Green Penalty, for example: strike a tree pose for 15 seconds, drink a glass of water and shout "Live green!", draw 1 extra Dare card, give 2,000–5,000 VND to the "Green Fund", or tidy up the play area afterwards.',
    },
    keywords: {
      vi: ['bo qua', 'vong quay', 'hinh phat', 'phat', 'green penalty', 'khong lam duoc', 'quay'],
      en: ['skip', 'wheel', 'penalty', 'green penalty', 'spin', 'cannot'],
    },
  },
  {
    id: 'faq-stop-anytime',
    question: {
      vi: 'Có thể dừng chơi giữa chừng không?',
      en: 'Can I stop partway?',
    },
    answer: {
      vi: 'Có. Chơi tiếp đến hết bài hoặc khi cả nhóm muốn dừng — bạn có thể nhấn Dừng ở bất kỳ bước nào để quay về màn hình đầu.',
      en: 'Yes. Play until the deck runs out or the group wants to stop — press Stop at any step to return to the start screen.',
    },
    keywords: {
      vi: ['dung', 'thoat', 'ket thuc', 'het bai'],
      en: ['stop', 'exit', 'leave', 'cancel', 'end'],
    },
  },
  {
    id: 'faq-20-cards',
    question: {
      vi: 'Vì sao bản web chỉ có 20 thẻ?',
      en: 'Why does the web version have only 20 cards?',
    },
    answer: {
      vi: 'Bản chơi thử trên web gồm 20 trong 63 thẻ của bộ gốc. Bộ đầy đủ có ở bản thẻ vật lý.',
      en: 'The web preview includes 20 of the 63 cards in the original deck. The full deck is available as the physical card set.',
    },
    keywords: {
      vi: ['20', '63', 'bao nhieu the', 'bo the', 'la bai', 'noi dung'],
      en: ['20', '63', 'how many', 'cards', 'deck', 'content'],
    },
  },
];

function normalizeFaqQuery(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsWholePhrase(haystack: string, phrase: string): boolean {
  const padded = ` ${haystack} `;
  return padded.includes(` ${phrase} `);
}

export interface BrainieFaqReply {
  readonly matched: boolean;
  readonly faqId: string | null;
  readonly text: string;
}

/**
 * Pure deterministic Offline FAQ resolver.
 * Never invents rules, never reveals unapproved paid deck content,
 * and explicitly states uncertainty when a query is outside verified rules.
 */
export function answerBrainieFaq(
  query: string,
  locale: Locale,
): BrainieFaqReply {
  const normalized = normalizeFaqQuery(query);
  if (!normalized) {
    return {
      matched: false,
      faqId: null,
      text:
        locale === 'en'
          ? 'Please pick a suggested rule question below or ask about Brainroot - Truth or Dare rules.'
          : 'Bạn hãy chọn một câu hỏi gợi ý bên dưới hoặc hỏi về luật chơi Brainroot - Truth or Dare nhé.',
    };
  }

  let bestEntry: OfflineFaqEntry | null = null;
  let bestScore = 0;

  for (const entry of OFFLINE_FAQ_ENTRIES) {
    const qNorm = normalizeFaqQuery(entry.question[locale]);
    if (normalized === qNorm) {
      return {
        matched: true,
        faqId: entry.id,
        text: entry.answer[locale],
      };
    }

    let score = 0;
    for (const kw of entry.keywords[locale]) {
      if (containsWholePhrase(normalized, kw)) {
        score += kw.includes(' ') ? 3 : 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 2) {
    return {
      matched: true,
      faqId: bestEntry.id,
      text: bestEntry.answer[locale],
    };
  }

  return {
    matched: false,
    faqId: null,
    text:
      locale === 'en'
        ? 'I am not sure about that — in Offline FAQ mode I can only explain how this Brainroot - Truth or Dare preview works (starting a turn, the no-two-Truths-in-a-row rule, drawing and flipping, Green Penalties, and stopping). Please check the Rules book for more.'
        : 'Mình chưa có thông tin cho câu hỏi này. Ở chế độ Hỏi đáp ngoại tuyến, Brainie chỉ giải thích luật chơi Brainroot - Truth or Dare (cách bắt đầu, không chọn Truth liên tiếp, rút và lật thẻ, Green Penalty và cách Dừng). Bạn xem thêm trong sách Luật nhé.',
  };
}

/**
 * Documented architecture specification for future server-side Gemini proxy
 * (NEVER instantiated directly on static GitHub Pages; zero API keys in browser).
 */
export const FUTURE_GEMINI_PROXY_ARCHITECTURE = {
  deploymentMode: 'offline_faq_static_pages' as const,
  futureServerEndpoint: '/api/brainie-rules-helper',
  // Intentionally unverified: confirm an available model id, API quota and cost before any build.
  recommendedModel: 'unverified — confirm model, quota and cost first',
  securityControls: [
    'Store GEMINI_API_KEY strictly in server environment variables; never bundle into Vite client.',
    'Ground responses exclusively on team-approved public rulebook markdown & FAQ JSON.',
    'Never load unapproved or private physical deck card files into the prompt context.',
    'Enforce per-IP sliding-window rate limit (e.g. 12 requests/min, 60/day) and strict maxOutputTokens cap (<= 220 tokens).',
    'Enforce daily budget ceiling and graceful fallback to this Offline FAQ module on 429/5xx.',
  ],
  strictSystemPromptDraft:
    'You are Brainie, the rules guide for Brainroot - Truth or Dare. Answer ONLY from the team-approved rulebook context provided. Never invent card questions, dare actions, penalties, or extra game modes. If a question is outside the verified rules, politely state that you do not know and point the player to the hardcover Rulebook.',
} as const;

export function getTruthOrDareUiCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      breadcrumbHome: 'Home',
      experienceAria: 'Brainroot - Truth or Dare interactive tabletop',
      brandSubtitle: 'Web preview · 20 of 63 cards',
      arrivalHeading: 'Brainroot - Truth or Dare',
      arrivalNote: 'Draw a card, pour in knowledge — 20 of 63 cards in this web preview.',
      rulesIconTitle: 'Open hardcover rulebook',
      langIconTitle: 'Switch language VI / EN',
      shufflingStatus: 'Shuffling the deck on the tabletop...',
      chooseHeading: 'Choose your side before drawing',
      truthLabel: 'Truth',
      dareLabel: 'Dare',
      truthMascotName: 'Brainie',
      dareMascotName: 'Rootie',
      truthLockedHint: 'Cannot pick Truth twice in a row — choose Dare with Rootie this turn.',
      readyToPullHint: 'Tap the deck to draw and flip your card.',
      pullingStatus: 'Drawing your card...',
      readyToFlipHint: 'Flipping your chosen face...',
      deckBackTitle: 'Brainroot',
      deckBackTag: 'Truth or Dare',
      remainingCardsLabel: (left: number, total: number) => `${left}/${total} left`,
      cardFaceHeading: (side: CardSide) =>
        side === 'truth' ? 'TRUTH · BRAINIE' : 'DARE · ROOTIE',
      themeChipLabel: (theme: string) => `Theme: ${theme}`,
      proofHint: 'Optional: a photo or post is welcome, never required to share publicly.',
      timerLabel: (sec: number) => `${sec}s timer`,
      timerStart: 'Start timer',
      timerPause: 'Pause',
      timerReset: 'Reset',
      timerDone: "Time's up!",
      timerRegion: 'Challenge countdown',
      cardHiddenFaceNote: 'Unchosen side stays sealed.',
      sessionDoneTitle: 'All cards in this session have been drawn',
      sessionDoneBody: 'Shuffle a fresh session anytime or return to the tabletop.',
      wheelModalTitle: 'Green Penalty',
      wheelModalSub: "Couldn't do it? Spin for a Green Penalty — it is revealed once the wheel stops.",
      wheelSpinningNote: 'Spinning the 15-? wheel...',
      wheelResultHeading: (_slotNumber: string) => 'Your Green Penalty',
      wheelSafeExitLabel: 'Exit without penalty',
      rulebookTitle: 'Hardcover Rulebook',
      rulebookOpenHint: 'Open Book',
      rulebookPrevPage: 'Previous',
      rulebookNextPage: 'Next',
      rulebookClose: 'Close rulebook',
      rulebookDraftNotice:
        'The web preview has 20 of the 63 cards; the full deck is the physical set.',
      rulebookPageLabel: (n: number) => `Page ${n}`,
      rulebookSpreadLabel: (l: number, r: number, total: number) =>
        `Pages ${l}–${r} / ${total}`,
      rulebookMobilePageLabel: (cur: number, total: number) =>
        `Page ${cur} / ${total}`,
      botButtonAria: 'Open Brainie Offline Rules FAQ',
      botTitle: 'Brainie Rules Guide',
      botOfflineBadge: 'Offline FAQ',
      botIntro:
        'Hi! I am Brainie in Offline FAQ mode. Ask me how to play Brainroot - Truth or Dare.',
      botInputPlaceholder: 'Ask a rule question...',
      botSendLabel: 'Ask',
      botCloseAria: 'Close Brainie FAQ',
      legacyRollbackNote: 'Legacy 3-step preview preserved',
    };
  }

  return {
    breadcrumbHome: 'Trang chủ',
    experienceAria: 'Bàn chơi tương tác Brainroot - Truth or Dare',
    brandSubtitle: 'Bản chơi thử · 20/63 thẻ',
    arrivalHeading: 'Brainroot - Truth or Dare',
    arrivalNote: 'Rút thẻ bài, rót kiến thức — bản chơi thử 20/63 thẻ.',
    rulesIconTitle: 'Mở sách luật bìa cứng',
    langIconTitle: 'Chuyển ngôn ngữ VI / EN',
    shufflingStatus: 'Đang trộn bộ thẻ trên mặt bàn...',
    chooseHeading: 'Chọn mặt trước khi rút bài',
    truthLabel: 'Truth',
    dareLabel: 'Dare',
    truthMascotName: 'Brainie',
    dareMascotName: 'Rootie',
    truthLockedHint: 'Không chọn Truth hai lượt liên tiếp — lượt này hãy chọn Dare cùng Rootie.',
    readyToPullHint: 'Chạm vào bộ bài để rút và lật thẻ.',
    pullingStatus: 'Đang rút thẻ...',
    readyToFlipHint: 'Đang lật mặt bạn đã chọn...',
    deckBackTitle: 'Brainroot',
    deckBackTag: 'Truth or Dare',
    remainingCardsLabel: (left: number, total: number) => `Còn ${left}/${total} thẻ`,
    cardFaceHeading: (side: CardSide) =>
      side === 'truth' ? 'TRUTH · BRAINIE' : 'DARE · ROOTIE',
    themeChipLabel: (theme: string) => `Chủ đề: ${theme}`,
    proofHint: 'Tùy chọn: chụp ảnh hoặc đăng bài đều được, không bắt buộc đăng công khai.',
    timerLabel: (sec: number) => `Đồng hồ ${sec} giây`,
    timerStart: 'Bắt đầu đếm giờ',
    timerPause: 'Tạm dừng',
    timerReset: 'Đặt lại',
    timerDone: 'Hết giờ!',
    timerRegion: 'Đồng hồ thử thách',
    cardHiddenFaceNote: 'Mặt không chọn được giữ kín.',
    sessionDoneTitle: 'Bạn đã rút hết các thẻ trong phiên này',
    sessionDoneBody: 'Bạn có thể trộn lại phiên mới hoặc dừng nhẹ nhàng bất kỳ lúc nào.',
    wheelModalTitle: 'Green Penalty',
    wheelModalSub: 'Không làm được? Quay để nhận một Green Penalty — kết quả mở sau khi vòng quay dừng.',
    wheelSpinningNote: 'Đang quay vòng 15 dấu ?...',
    wheelResultHeading: (_slotNumber: string) => 'Green Penalty của bạn',
    wheelSafeExitLabel: 'Thoát không phạt',
    rulebookTitle: 'Sách luật bìa cứng',
    rulebookOpenHint: 'Mở sách luật',
    rulebookPrevPage: 'Trang trước',
    rulebookNextPage: 'Trang sau',
    rulebookClose: 'Đóng sách luật',
    rulebookDraftNotice:
      'Bản chơi thử web có 20/63 thẻ; bộ đầy đủ là bản thẻ vật lý.',
    rulebookPageLabel: (n: number) => `Trang ${n}`,
    rulebookSpreadLabel: (l: number, r: number, total: number) =>
      `Trang ${l}–${r} / ${total}`,
    rulebookMobilePageLabel: (cur: number, total: number) =>
      `Trang ${cur} / ${total}`,
    botButtonAria: 'Mở Brainie Hỏi đáp luật chơi ngoại tuyến',
    botTitle: 'Brainie Hỏi đáp Luật',
    botOfflineBadge: 'FAQ Ngoại tuyến',
    botIntro:
      'Chào bạn! Mình là Brainie ở chế độ FAQ ngoại tuyến. Hỏi mình cách chơi Brainroot - Truth or Dare nhé.',
    botInputPlaceholder: 'Hỏi về luật chơi...',
    botSendLabel: 'Hỏi',
    botCloseAria: 'Đóng hộp thoại Brainie',
    legacyRollbackNote: 'Bản chơi thử cũ được giữ dự phòng',
  };
}
