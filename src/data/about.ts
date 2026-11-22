/**
 * About page V4.3 content (BR-T031). Design source approved by the project owner on 2026-11-22:
 * Claude Design prototype V4.3 + Brainroot_About_V4_Production_Asset_Kit.
 *
 * GOVERNANCE:
 * - The site is the project's official public website for everyone, NOT a competition report.
 *   Survey numbers, team list, roadmap and competition details live in docs/HACKATHON_DOSSIER.md only.
 * - No project-news block, no CTA block, no "coming soon" line, no contact button without a real channel.
 * - No card questions, Dare actions, game rules, numbers or achievements are shown here. The deck
 *   interaction only uses the two card artworks cropped from the official deck render
 *   (back design and an illustrated face without text), so nothing needs translating or approval.
 * - Only approved artwork is used (see docs/ASSET_AUDIT.md); mascots are not redrawn.
 */

export interface Bilingual {
  readonly vi: string;
  readonly en: string;
}

const A = '/assets/about-v4';

export const ABOUT_ASSETS = {
  heroDesktop: `${A}/about-journal-desktop.webp`,
  heroMobile: `${A}/about-journal-mobile.webp`,
  deck: '/assets/hero-v4/fact-act-deck.webp',
  brainie: '/assets/hero-v4/brainie.webp',
  feed: `${A}/brainrot-scroll-scene.webp`,
  reveal: `${A}/brainroot-reveal-scene.webp`,
  grain: `${A}/ivory-grain-overlay.webp`,
  tapePeach: `${A}/paper-tape-peach.svg`,
  tapeSage: `${A}/paper-tape-sage.svg`,
  journal: `${A}/open-journal.webp`,
  magnifier: `${A}/magnifying-glass.webp`,
  bottle: `${A}/reusable-bottle.webp`,
  tote: `${A}/canvas-tote.webp`,
  cardBack: `${A}/deck-card-back.webp`,
  cardFace: `${A}/deck-card-face.webp`,
  booksGlobe: `${A}/books-and-globe.webp`,
  learningTable: `${A}/learning-table.webp`,
  communityBoard: `${A}/community-board.webp`,
  communityGathering: `${A}/community-gathering.webp`,
} as const satisfies Record<string, `/${string}`>;

export const ABOUT_HERO = {
  journalNote: { vi: 'Nhật ký Brainroot — trang 01', en: 'Brainroot journal — page 01' } as Bilingual,
  /** The page eyebrow (CÂU CHUYỆN BRAINROOT / ABOUT BRAINROOT) is reused from siteCopy. */
  titleLines: {
    vi: ['Một cuộc chơi,', 'nhiều góc nhìn mới.'],
    en: ['One game,', 'many new perspectives.'],
  } as const,
  slogan: 'From Brainrot to Brainroot.',
  description: {
    vi: 'Brainroot đưa chuyện môi trường vào những ván bài và cuộc trò chuyện gần gũi — để mỗi người tự tìm cách bắt đầu của riêng mình.',
    en: 'Brainroot brings environmental topics into card games and everyday conversations — so everyone can find their own way to begin.',
  } as Bilingual,
  sceneAlt: {
    vi: 'Góc bàn nắng ấm với cuốn nhật ký mở, những tấm thẻ giấy và bộ thẻ Brainroot; Brainie đứng cạnh bộ thẻ.',
    en: 'A sunny desk corner with an open journal, paper cards and the Brainroot deck; Brainie stands beside the deck.',
  } as Bilingual,
} as const;

export interface StoryStepCopy {
  /** Full label: also the accessible name. */
  readonly label: Bilingual;
  /** Short visible label on phones (contained in the full label, so the accessible name still matches). */
  readonly short: Bilingual;
  readonly text: Bilingual;
  readonly alt: Bilingual;
}

export const ABOUT_STORY = {
  eyebrow: { vi: 'Từ Brainrot đến Brainroot', en: 'From Brainrot to Brainroot' } as Bilingual,
  heading: {
    vi: 'Giữa bao điều lướt qua mỗi ngày, có những điều đáng để giữ lại.',
    en: 'Among everything that scrolls past each day, some things are worth keeping.',
  } as Bilingual,
  stepsLabel: { vi: 'Các bước của câu chuyện', en: 'Story steps' } as Bilingual,
  stepPrefix: { vi: 'Bước', en: 'Step' } as Bilingual,
  steps: [
    {
      label: { vi: 'Lướt qua', en: 'Scroll past' },
      short: { vi: 'Lướt', en: 'Scroll' },
      text: { vi: 'Nội dung đến rồi đi.', en: 'Content comes and goes.' },
      alt: { vi: 'Những mẩu nội dung ngắn trôi lướt qua.', en: 'Short pieces of content drift past.' },
    },
    {
      label: { vi: 'Giữ lại', en: 'Keep' },
      short: { vi: 'Giữ', en: 'Keep' },
      text: { vi: 'Một điều khiến mình dừng lại.', en: 'Something makes you pause.' },
      alt: {
        vi: 'Một mẩu nội dung được giữ lại, viền màu đào.',
        en: 'One piece of content is kept, outlined in peach.',
      },
    },
    {
      label: { vi: 'Khám phá sâu', en: 'Explore deeper' },
      short: { vi: 'Khám phá', en: 'Explore' },
      text: { vi: 'Và muốn tìm hiểu kỹ hơn.', en: 'And you want to learn more.' },
      alt: {
        vi: 'Mẩu nội dung ấy trở thành một trang nhật ký mở; trang bên cạnh ghi lại điều đã giữ lại.',
        en: 'That piece becomes an open journal page; the facing page notes what was kept.',
      },
    },
  ] as readonly StoryStepCopy[],
  keptNote: { vi: 'Điều mình giữ lại', en: 'What I kept' } as Bilingual,
  pageNote: { vi: 'Khám phá sâu hơn', en: 'Exploring deeper' } as Bilingual,
} as const;

export interface LearningScene {
  readonly id: 'explore' | 'experience' | 'act';
  readonly title: Bilingual;
  readonly sentence: Bilingual;
}

export const ABOUT_LEARNING = {
  heading: { vi: 'Học qua trải nghiệm', en: 'Learning by experience' } as Bilingual,
  tablistLabel: { vi: 'Chọn hoạt động', en: 'Choose an activity' } as Bilingual,
  scenes: [
    {
      id: 'explore',
      title: { vi: 'Khám phá', en: 'Explore' },
      sentence: { vi: 'Tiếp cận kiến thức bằng sự tò mò.', en: 'Approach knowledge with curiosity.' },
    },
    {
      id: 'experience',
      title: { vi: 'Trải nghiệm', en: 'Experience' },
      sentence: { vi: 'Học qua trò chơi và tương tác.', en: 'Learn through play and interaction.' },
    },
    {
      id: 'act',
      title: { vi: 'Hành động', en: 'Act' },
      sentence: { vi: 'Thử những thay đổi nhỏ trong đời sống.', en: 'Try small changes in everyday life.' },
    },
  ] as readonly LearningScene[],
  alts: {
    journal: { vi: 'Sổ tay minh họa thực vật đang mở', en: 'An open botanical sketchbook' } as Bilingual,
    magnifier: { vi: 'Kính lúp đặt trên trang sổ', en: 'A magnifying glass resting on the page' } as Bilingual,
    bottle: { vi: 'Bình nước cá nhân dùng lại', en: 'A reusable water bottle' } as Bilingual,
    tote: { vi: 'Túi vải dùng lại', en: 'A reusable canvas tote' } as Bilingual,
  },
} as const;

/** UI labels for the deck interaction only — the cards themselves carry no text. */
export const ABOUT_DECK = {
  groupLabel: { vi: 'Bộ thẻ Brainroot — chọn một lá', en: 'Brainroot deck — pick a card' } as Bilingual,
  cardLabel: { vi: 'Lá bài', en: 'Card' } as Bilingual,
  hint: { vi: 'Chọn một lá', en: 'Pick a card' } as Bilingual,
  count: 5,
} as const;

export interface AudienceGroup {
  readonly id: 'solo' | 'group' | 'community';
  readonly kind: Bilingual;
  readonly title: Bilingual;
  readonly sentence: Bilingual;
  readonly sceneAlt: Bilingual;
}

export const ABOUT_AUDIENCE = {
  heading: { vi: 'Brainroot dành cho ai?', en: 'Who is Brainroot for?' } as Bilingual,
  groups: [
    {
      id: 'solo',
      kind: { vi: 'Cá nhân', en: 'On your own' },
      title: { vi: 'Bạn trẻ yêu khám phá', en: 'Curious young people' },
      sentence: { vi: 'Học thêm điều mới và bắt đầu những thói quen xanh.', en: 'Learn something new and start green habits.' },
      sceneAlt: {
        vi: 'Một góc học riêng: chồng sách, quả địa cầu và một lá bài Brainroot đang được xem.',
        en: 'A personal study corner: books, a globe and a Brainroot card being looked at.',
      },
    },
    {
      id: 'group',
      kind: { vi: 'Nhóm học tập', en: 'Study groups' },
      title: { vi: 'Lớp học & câu lạc bộ', en: 'Classes & clubs' },
      sentence: { vi: 'Cùng chơi, cùng thảo luận và thực hành.', en: 'Play together, discuss and practise.' },
      sceneAlt: {
        vi: 'Một bàn học chung, mỗi chỗ ngồi đã có một lá bài Brainroot được chia.',
        en: 'A shared study table with a Brainroot card dealt to every seat.',
      },
    },
    {
      id: 'community',
      kind: { vi: 'Cộng đồng', en: 'Communities' },
      title: { vi: 'Cộng đồng quan tâm môi trường', en: 'Environment-minded communities' },
      sentence: { vi: 'Chia sẻ ý tưởng và lan tỏa cảm hứng hành động.', en: 'Share ideas and spread the inspiration to act.' },
      sceneAlt: {
        vi: 'Bảng tin cộng đồng được ghim nhiều ghi chú, phía sau là không gian sinh hoạt chung ngoài trời.',
        en: 'A community notice board pinned with many notes, with an outdoor gathering space behind it.',
      },
    },
  ] as readonly AudienceGroup[],
} as const;
