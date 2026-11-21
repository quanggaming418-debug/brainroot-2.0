import type { Locale } from '../../i18n/I18nContext';
import { publicUrl } from '../../utils/publicUrl';

/**
 * Brainroot - Truth or Dare V1 — Faithful Digital Data Contract & Assets
 *
 * GOVERNANCE BOUNDARIES:
 * - Zero invented Truth questions, Dare actions, translated card copy,
 *   verbatim PDF pp.66–67 rulebook passages, or draft Green Penalties.
 * - Card deck (16 sample slots) and 15 Green Penalty slots are typed drop-in
 *   contracts awaiting owner approval & official VI/EN PDF import.
 * - RULE GATE (BR-T027): rulebook, FAQ and mechanics text describe how THIS PREVIEW
 *   works. None of it is the team's approved official rulebook until the team
 *   supplies and confirms the source. Zero API keys in frontend.
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
    next: 'Rút tiếp',
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
    next: 'Next',
    stop: 'Stop',
  },
};

export interface TruthOrDareCardPair {
  readonly pairId: string;
  readonly cardNumber: string;
  readonly approvalStatus: 'awaiting_owner_pdf_import' | 'approved_from_pdf';
  readonly truthText: LocalizedText | null;
  readonly dareText: LocalizedText | null;
}

export interface GreenPenaltySlot {
  readonly slotId: string;
  readonly sectorIndex: number; // 0..14 matching mystery_wheel_15_questionmarks.svg
  readonly slotNumber: string;
  readonly approvalStatus: 'awaiting_owner_approval' | 'approved';
  readonly text: LocalizedText | null;
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

/**
 * 16 stable pair IDs matching the selected sample kit size.
 * `truthText` and `dareText` remain `null` until verbatim approved VI/EN PDF copy
 * is imported by the team with owner authorization.
 */
export const TRUTH_OR_DARE_DECK_SLOTS: readonly TruthOrDareCardPair[] =
  Array.from({ length: 16 }, (_, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return {
      pairId: `TD-${num}`,
      cardNumber: num,
      approvalStatus: 'awaiting_owner_pdf_import',
      truthText: null,
      dareText: null,
    } as const;
  });

/**
 * 15 mystery wheel slots matching the 15 `?` sectors in `mystery_wheel_15_questionmarks.svg`.
 * Penalty copy remains `null` until approved by the project owner.
 */
export const GREEN_PENALTY_SLOTS: readonly GreenPenaltySlot[] = Array.from(
  { length: 15 },
  (_, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return {
      slotId: `GP-${num}`,
      sectorIndex: idx,
      slotNumber: num,
      approvalStatus: 'awaiting_owner_approval',
      text: null,
    } as const;
  },
);

/** Hardcover Storybook Rulebook spreads describing the PREVIEW's mechanics (pending team approval; not the official rulebook). */
export const RULEBOOK_SPREADS: readonly RulebookSpread[] = [
  {
    id: 'spread-1',
    leftPageNumber: 1,
    rightPageNumber: 2,
    left: {
      kicker: { vi: 'CHÀO MỪNG', en: 'WELCOME' },
      title: {
        vi: 'Gặp gỡ Brainie & Rootie',
        en: 'Meet Brainie & Rootie',
      },
      body: {
        vi: 'Brainroot - Truth or Dare là phiên bản số của bộ thẻ bài vật lý của nhóm. Mỗi lá bài có hai mặt tách biệt: Brainie đại diện cho Truth, Rootie đại diện cho Dare.',
        en: 'Brainroot - Truth or Dare is the digital edition of our team’s physical card deck. Every card holds two distinct sides: Brainie represents Truth, and Rootie represents Dare.',
      },
      mascot: 'both',
    },
    right: {
      kicker: { vi: 'BẮT ĐẦU VÁN CHƠI', en: 'STARTING A SESSION' },
      title: {
        vi: 'Trộn bộ thẻ & vào lượt ngay',
        en: 'Shuffle the deck & begin',
      },
      points: [
        {
          vi: 'Nhấn Chơi để trộn bộ thẻ ngay trên mặt bàn.',
          en: 'Press Play to shuffle the deck immediately on the tabletop.',
        },
        {
          vi: 'Bộ thẻ không lặp lại trong cùng một phiên chơi.',
          en: 'Cards never repeat within the same session.',
        },
        {
          vi: 'Không cần đăng nhập, không tính điểm hay lưu lịch sử cá nhân.',
          en: 'No account needed, no points, and no personal history stored.',
        },
      ],
      footnote: {
        vi: 'Bản thử · nội dung chờ nhóm duyệt.',
        en: 'Preview · content pending team approval.',
      },
    },
  },
  {
    id: 'spread-2',
    leftPageNumber: 3,
    rightPageNumber: 4,
    left: {
      kicker: { vi: 'CHỌN MẶT TRƯỚC KHI RÚT', en: 'CHOOSE BEFORE DRAWING' },
      title: {
        vi: 'Brainie (Truth) hay Rootie (Dare)?',
        en: 'Brainie (Truth) or Rootie (Dare)?',
      },
      body: {
        vi: 'Sau khi trộn bài và trước khi rút lá trên cùng, người chơi chọn Truth cùng Brainie hoặc Dare cùng Rootie.',
        en: 'After shuffling and before drawing the top card, choose Truth with Brainie or Dare with Rootie.',
      },
      mascot: 'brainie',
    },
    right: {
      kicker: { vi: 'CÁCH CHƠI TRONG BẢN THỬ', en: 'HOW THIS PREVIEW WORKS' },
      title: {
        vi: 'Không chọn Truth hai lượt liên tiếp',
        en: 'No two consecutive Truth turns',
      },
      points: [
        {
          vi: 'Bạn phải chọn Truth hoặc Dare trước khi rút bài.',
          en: 'You must pick Truth or Dare before pulling a card.',
        },
        {
          vi: 'Nếu lượt trước vừa chọn Truth, lượt kế tiếp bạn cần chọn Dare cùng Rootie.',
          en: 'If your previous turn was Truth, your next turn must be Dare with Rootie.',
        },
        {
          vi: 'Sau khi hoàn thành một lượt Dare, lựa chọn Truth sẽ mở lại tự nhiên.',
          en: 'After a Dare turn, Truth unlocks naturally again.',
        },
      ],
      footnote: {
        vi: 'Bản thử · nội dung chờ nhóm duyệt.',
        en: 'Preview · content pending team approval.',
      },
    },
  },
  {
    id: 'spread-3',
    leftPageNumber: 5,
    rightPageNumber: 6,
    left: {
      kicker: { vi: 'RÚT & LẬT HAI MẶT', en: 'PULL & TWO-FACE FLIP' },
      title: {
        vi: 'Chỉ mở đúng mặt bạn đã chọn',
        en: 'Reveal only your chosen face',
      },
      body: {
        vi: 'Kéo lá bài trên cùng ra giữa bàn và nhấn Lật. Lá bài chỉ hiển thị duy nhất mặt bạn đã chọn — mặt còn lại luôn được giữ kín.',
        en: 'Pull the top card to the center and press Flip. Only the side you selected is revealed—the unchosen side stays hidden.',
      },
      mascot: 'rootie',
    },
    right: {
      kicker: { vi: 'NHỊP LƯỢT CHƠI', en: 'TURN FLOW' },
      title: {
        vi: 'Hoàn thành hoặc Bỏ qua',
        en: 'Complete or Skip',
      },
      points: [
        {
          vi: 'Nhấn Xong khi bạn đã chia sẻ câu trả lời hoặc thực hiện thử thách.',
          en: 'Press Done once you have shared your answer or completed the action.',
        },
        {
          vi: 'Nhấn Bỏ qua nếu muốn chuyển sang Vòng quay Hình phạt Xanh 15 ô bí ẩn.',
          en: 'Press Skip to open the 15-? mystery Green Penalty wheel.',
        },
        {
          vi: 'Bạn có thể nhấn Dừng bất cứ lúc nào để kết thúc nhẹ nhàng.',
          en: 'You may press Stop at any time to end the session comfortably.',
        },
      ],
      footnote: {
        vi: 'Bản thử · nội dung chờ nhóm duyệt.',
        en: 'Preview · content pending team approval.',
      },
    },
  },
  {
    id: 'spread-4',
    leftPageNumber: 7,
    rightPageNumber: 8,
    left: {
      kicker: { vi: 'VÒNG QUAY BÍ ẨN', en: 'MYSTERY WHEEL' },
      title: {
        vi: '15 ô dấu hỏi & kết quả sau khi quay',
        en: '15 question marks revealed after spin',
      },
      body: {
        vi: 'Khi chọn Bỏ qua, vòng quay 15 ô chỉ hiển thị dấu ?. Ô hình phạt xanh chỉ mở ra sau khi vòng quay dừng hẳn, và luôn có nút Dừng không ép buộc.',
        en: 'When you Skip, the 15-sector wheel displays only ? marks. The landed Green Penalty slot appears only after the spin stops, with a non-punitive Stop option always available.',
      },
      mascot: 'wheel',
    },
    right: {
      kicker: { vi: 'BẢN QUYỀN & NỘI DUNG', en: 'CONTENT TRANSPARENCY' },
      title: {
        vi: 'Nội dung chính thức đang chờ duyệt',
        en: 'Official content is pending approval',
      },
      points: [
        {
          vi: 'Hệ thống không tự bịa câu hỏi Truth, thử thách Dare hay nội dung Hình phạt Xanh.',
          en: 'No Truth prompts, Dare actions, or Green Penalties are fabricated in code.',
        },
        {
          vi: 'Nguyên văn câu thẻ VI/EN, trang luật gốc và 15 hình phạt xanh sẽ được nạp trực tiếp khi nhóm duyệt công khai.',
          en: 'Verbatim VI/EN cards, official rulebook text, and the 15 Green Penalties drop straight in once released.',
        },
        {
          vi: 'Dùng phím mũi tên Trái/Phải để lật trang sách luật, phím Esc để đóng.',
          en: 'Use Left/Right arrow keys to turn pages and Esc to close the book.',
        },
      ],
      footnote: {
        vi: 'Bản thử · nội dung chờ nhóm duyệt.',
        en: 'Preview · content pending team approval.',
      },
    },
  },
];

/**
 * Offline FAQ entries for the floating Brainie helper.
 * Describes how this PREVIEW works (rules pending team approval) — never fabricates card text.
 */
export const OFFLINE_FAQ_ENTRIES: readonly OfflineFaqEntry[] = [
  {
    id: 'faq-how-to-play',
    question: {
      vi: 'Bắt đầu một lượt chơi như thế nào?',
      en: 'How does a turn work?',
    },
    answer: {
      vi: 'Nhấn Chơi để trộn bộ thẻ ngay trên bàn. Sau đó chọn Brainie (Truth) hoặc Rootie (Dare) trước khi rút lá trên cùng, rồi nhấn Lật để xem đúng mặt bạn đã chọn.',
      en: 'Press Play to shuffle the deck immediately. Choose Brainie (Truth) or Rootie (Dare) before pulling the top card, then press Flip to reveal only your chosen side.',
    },
    keywords: {
      vi: ['bat dau', 'cach choi', 'luot choi', 'tron bai', 'rut bai', 'lat bai'],
      en: ['start', 'play', 'turn', 'shuffle', 'draw', 'flip', 'how to'],
    },
  },
  {
    id: 'faq-consecutive-truth',
    question: {
      vi: 'Vì sao không chọn được Truth hai lần liên tiếp?',
      en: 'Why can’t I pick Truth twice in a row?',
    },
    answer: {
      vi: 'Trong bản thử hiện tại, người chơi không chọn Truth ở hai lượt liên tiếp (quy tắc này đang chờ nhóm đối chiếu với luật chính thức). Sau một lượt Dare cùng Rootie, nút Truth sẽ mở lại bình thường.',
      en: 'In this preview you cannot choose Truth on two consecutive turns (this rule is pending the team’s confirmation against the official rules). After one Dare turn with Rootie, Truth unlocks again.',
    },
    keywords: {
      vi: ['truth', 'lien tiep', 'khoa', 'hai lan', 'brainie'],
      en: ['truth', 'consecutive', 'locked', 'twice', 'row', 'brainie'],
    },
  },
  {
    id: 'faq-skip-wheel',
    question: {
      vi: 'Bỏ qua và vòng quay 15 dấu ? hoạt động ra sao?',
      en: 'How do Skip and the 15-? wheel work?',
    },
    answer: {
      vi: 'Khi bạn nhấn Bỏ qua trên lá bài đã lật, vòng quay bí ẩn gồm 15 ô dấu ? sẽ hiện ra. Nội dung ô chỉ mở sau khi vòng quay dừng lại. Nếu muốn, bạn luôn có thể nhấn Dừng để thoát mà không bị phạt.',
      en: 'Pressing Skip on a flipped card opens the 15-? mystery wheel. The landed slot is revealed only after the wheel stops spinning. You can always press Stop to exit without penalty.',
    },
    keywords: {
      vi: ['bo qua', 'vong quay', 'hinh phat', 'phat', 'dau hoi', 'quay'],
      en: ['skip', 'wheel', 'penalty', 'spin', 'question mark'],
    },
  },
  {
    id: 'faq-stop-anytime',
    question: {
      vi: 'Có thể dừng chơi mà không cần quay phạt không?',
      en: 'Can I stop without taking a penalty?',
    },
    answer: {
      vi: 'Có. Brainroot luôn tôn trọng sự thoải mái của người chơi — bạn có thể nhấn Dừng ở bất kỳ bước nào, kể cả khi vòng quay đang mở, để quay về màn hình bàn chơi mà không có hình phạt nào.',
      en: 'Yes. Brainroot always respects player comfort—you can press Stop at any point, including inside the wheel dialog, to exit cleanly with zero penalty.',
    },
    keywords: {
      vi: ['dung', 'thoat', 'khong phat', 'ket thuc'],
      en: ['stop', 'exit', 'leave', 'cancel', 'without penalty'],
    },
  },
  {
    id: 'faq-card-slots',
    question: {
      vi: 'Vì sao lá bài đang hiển thị khung chờ nội dung gốc?',
      en: 'Why do cards show placeholder slots right now?',
    },
    answer: {
      vi: 'Để giữ đúng nguyên văn bộ thẻ vật lý VI/EN và tránh tự bịa câu hỏi hay hình phạt, hệ thống đang hiển thị cấu trúc 16 cặp thẻ và 15 ô vòng quay chờ nạp trực tiếp từ tệp gốc sau khi nhóm duyệt phát hành.',
      en: 'To stay faithful to the original VI/EN physical deck without inventing prompts or penalties, the 16 card pairs and 15 wheel slots are structured for direct import once approved for public release.',
    },
    keywords: {
      vi: ['noi dung', 'khung cho', 'bo the', 'la bai', 'pdf'],
      en: ['slots', 'cards', 'deck', 'pdf', 'content', 'missing'],
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
        ? 'I am not sure about that — in Offline FAQ mode I can only explain how this Brainroot - Truth or Dare preview works (starting a turn, consecutive-Truth lock, 2-face flip, 15-? Skip wheel, and stopping safely). Official rules are pending team approval.'
        : 'Mình chưa có thông tin cho câu hỏi này. Ở chế độ Hỏi đáp ngoại tuyến, Brainie chỉ giải thích cách vận hành của bản thử Brainroot - Truth or Dare (cách bắt đầu, không chọn Truth liên tiếp, lật 2 mặt, vòng quay 15 dấu ? khi Bỏ qua và cách Dừng an toàn). Luật chính thức đang chờ nhóm duyệt.',
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
      brandSubtitle: 'Digital Card Tabletop (Preview)',
      arrivalHeading: 'Brainroot - Truth or Dare',
      arrivalNote: 'Pick Brainie or Rootie before drawing — flip only your chosen side.',
      rulesIconTitle: 'Open hardcover rulebook',
      langIconTitle: 'Switch language VI / EN',
      shufflingStatus: 'Shuffling the deck on the tabletop...',
      chooseHeading: 'Choose your side before drawing',
      truthLabel: 'Truth',
      dareLabel: 'Dare',
      truthMascotName: 'Brainie',
      dareMascotName: 'Rootie',
      truthLockedHint: 'Cannot pick Truth twice in a row — choose Dare with Rootie this turn.',
      readyToPullHint: 'Tap the top card or press Draw to pull it forward.',
      pullingStatus: 'Pulling the top card forward...',
      readyToFlipHint: 'Card drawn. Press Flip to reveal only your chosen face.',
      deckBackTitle: 'Brainroot',
      deckBackTag: 'Truth or Dare',
      remainingCardsLabel: (left: number, total: number) => `${left}/${total} left`,
      cardFaceHeading: (side: CardSide) =>
        side === 'truth' ? 'TRUTH · BRAINIE' : 'DARE · ROOTIE',
      cardSlotTitle: (pairId: string) => `Card ${pairId}`,
      cardSlotBody: (side: CardSide) =>
        side === 'truth'
          ? 'Official Truth prompt slot — verbatim VI/EN text from the team deck slots directly here upon release.'
          : 'Official Dare action slot — verbatim VI/EN text from the team deck slots directly here upon release.',
      cardHiddenFaceNote: 'Unchosen side stays sealed.',
      sessionDoneTitle: 'All cards in this session have been drawn',
      sessionDoneBody: 'Shuffle a fresh session anytime or return to the tabletop.',
      wheelModalTitle: 'Mystery Green Penalty Wheel',
      wheelModalSub: '15 hidden ? slots — your slot reveals only after the wheel stops.',
      wheelSpinningNote: 'Spinning the 15-? wheel...',
      wheelResultHeading: (slotNumber: string) => `Landed on Mystery Slot #${slotNumber}`,
      wheelResultSlotBody:
        'Green Penalty text approved by the Brainroot team will appear in this slot once released.',
      wheelSafeExitLabel: 'Exit without penalty',
      rulebookTitle: 'Hardcover Rulebook',
      rulebookOpenHint: 'Open Book',
      rulebookPrevPage: 'Previous',
      rulebookNextPage: 'Next',
      rulebookClose: 'Close rulebook',
      rulebookDraftNotice:
        'Preview — describes how this digital version currently works. Official rules are pending team approval.',
      rulebookPageLabel: (n: number) => `Page ${n}`,
      rulebookSpreadLabel: (l: number, r: number, total: number) =>
        `Pages ${l}–${r} / ${total}`,
      rulebookMobilePageLabel: (cur: number, total: number) =>
        `Page ${cur} / ${total}`,
      botButtonAria: 'Open Brainie Offline Rules FAQ',
      botTitle: 'Brainie Rules Guide',
      botOfflineBadge: 'Offline FAQ',
      botIntro:
        'Hi! I am Brainie in Offline FAQ mode. Ask me how this Brainroot - Truth or Dare preview works (official rules are pending team approval).',
      botInputPlaceholder: 'Ask a rule question...',
      botSendLabel: 'Ask',
      botCloseAria: 'Close Brainie FAQ',
      legacyRollbackNote: 'Legacy 3-step preview preserved',
    };
  }

  return {
    breadcrumbHome: 'Trang chủ',
    experienceAria: 'Bàn chơi tương tác Brainroot - Truth or Dare',
    brandSubtitle: 'Bàn thẻ số (bản thử)',
    arrivalHeading: 'Brainroot - Truth or Dare',
    arrivalNote: 'Chọn Brainie hoặc Rootie trước khi rút — chỉ lật đúng mặt đã chọn.',
    rulesIconTitle: 'Mở sách luật bìa cứng',
    langIconTitle: 'Chuyển ngôn ngữ VI / EN',
    shufflingStatus: 'Đang trộn bộ thẻ trên mặt bàn...',
    chooseHeading: 'Chọn mặt trước khi rút bài',
    truthLabel: 'Truth',
    dareLabel: 'Dare',
    truthMascotName: 'Brainie',
    dareMascotName: 'Rootie',
    truthLockedHint: 'Không chọn Truth hai lượt liên tiếp — lượt này hãy chọn Dare cùng Rootie.',
    readyToPullHint: 'Chạm lá bài trên cùng hoặc nhấn Rút để kéo bài ra giữa bàn.',
    pullingStatus: 'Đang kéo lá bài trên cùng ra giữa bàn...',
    readyToFlipHint: 'Đã rút lá bài. Nhấn Lật để mở duy nhất mặt bạn đã chọn.',
    deckBackTitle: 'Brainroot',
    deckBackTag: 'Truth or Dare',
    remainingCardsLabel: (left: number, total: number) => `Còn ${left}/${total} thẻ`,
    cardFaceHeading: (side: CardSide) =>
      side === 'truth' ? 'TRUTH · BRAINIE' : 'DARE · ROOTIE',
    cardSlotTitle: (pairId: string) => `Thẻ ${pairId}`,
    cardSlotBody: (side: CardSide) =>
      side === 'truth'
        ? 'Khung nội dung Truth chính thức — nguyên văn câu hỏi VI/EN từ bộ thẻ gốc sẽ nạp trực tiếp tại đây khi được duyệt công khai.'
        : 'Khung nội dung Dare chính thức — nguyên văn thử thách VI/EN từ bộ thẻ gốc sẽ nạp trực tiếp tại đây khi được duyệt công khai.',
    cardHiddenFaceNote: 'Mặt không chọn được giữ kín.',
    sessionDoneTitle: 'Bạn đã rút hết các thẻ trong phiên này',
    sessionDoneBody: 'Bạn có thể trộn lại phiên mới hoặc dừng nhẹ nhàng bất kỳ lúc nào.',
    wheelModalTitle: 'Vòng quay Hình phạt Xanh bí ẩn',
    wheelModalSub: '15 ô dấu ? bí ẩn — kết quả chỉ mở sau khi vòng quay dừng hẳn.',
    wheelSpinningNote: 'Đang quay vòng 15 dấu ?...',
    wheelResultHeading: (slotNumber: string) => `Dừng tại ô bí ẩn số #${slotNumber}`,
    wheelResultSlotBody:
      'Nội dung Hình phạt Xanh do nhóm Brainroot duyệt sẽ xuất hiện tại ô này khi được công bố.',
    wheelSafeExitLabel: 'Thoát không phạt',
    rulebookTitle: 'Sách luật bìa cứng',
    rulebookOpenHint: 'Mở sách luật',
    rulebookPrevPage: 'Trang trước',
    rulebookNextPage: 'Trang sau',
    rulebookClose: 'Đóng sách luật',
    rulebookDraftNotice:
      'Bản thử — mô tả cách bản số hiện vận hành. Luật chính thức đang chờ nhóm duyệt.',
    rulebookPageLabel: (n: number) => `Trang ${n}`,
    rulebookSpreadLabel: (l: number, r: number, total: number) =>
      `Trang ${l}–${r} / ${total}`,
    rulebookMobilePageLabel: (cur: number, total: number) =>
      `Trang ${cur} / ${total}`,
    botButtonAria: 'Mở Brainie Hỏi đáp luật chơi ngoại tuyến',
    botTitle: 'Brainie Hỏi đáp Luật',
    botOfflineBadge: 'FAQ Ngoại tuyến',
    botIntro:
      'Chào bạn! Mình là Brainie ở chế độ FAQ ngoại tuyến. Mình giải thích cách vận hành của bản thử Brainroot - Truth or Dare (luật chính thức đang chờ nhóm duyệt).',
    botInputPlaceholder: 'Hỏi về luật chơi...',
    botSendLabel: 'Hỏi',
    botCloseAria: 'Đóng hộp thoại Brainie',
    legacyRollbackNote: 'Bản chơi thử cũ được giữ dự phòng',
  };
}
