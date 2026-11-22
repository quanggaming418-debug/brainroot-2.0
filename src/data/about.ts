/**
 * About page V3 content (BR-T030). Source: BRAINROOT_ABOUT_V3_DESIGN_SPEC.md (approved by the project owner 2026-11-21).
 *
 * GOVERNANCE:
 * - The site is the project's official public website for everyone, NOT a competition report.
 *   Survey numbers, team list, roadmap and competition details live in docs/HACKATHON_DOSSIER.md only.
 * - No project-news block, no "coming soon" line, no NGO/ESG audience, no contact button without a real channel.
 * - Only existing artwork is used (see docs/ASSET_AUDIT.md); nothing new is generated.
 */

export interface Bilingual {
  readonly vi: string;
  readonly en: string;
}

export const ABOUT_HERO = {
  /** The existing page eyebrow (CÂU CHUYỆN BRAINROOT / ABOUT BRAINROOT) is reused from siteCopy. */
  title: { vi: 'Chơi để hiểu. Hiểu để hành động.', en: 'Play to understand. Understand to act.' } as Bilingual,
  slogan: 'From Brainrot to Brainroot.',
  description: {
    vi: 'Brainroot đưa kỹ năng xanh đến gần giới trẻ bằng trò chơi, kiến thức và những thử thách nhỏ mỗi ngày.',
    en: 'Brainroot brings green skills closer to young people through games, knowledge and small daily challenges.',
  } as Bilingual,
  sceneAlt: {
    vi: 'Khu vườn Brainroot nhiều lớp đồi và cây xanh, Brainie và Rootie ló ra hai bên',
    en: 'The layered Brainroot garden with hills and plants, with Brainie and Rootie peeking in from both sides',
  } as Bilingual,
} as const;

export const ABOUT_CONTRAST = {
  /** H2 is rendered as: Từ [Brain]rot đến [Brain]root — highlighted parts are fixed words. */
  headingLead: { vi: 'Từ', en: 'From' } as Bilingual,
  headingTo: { vi: 'đến', en: 'to' } as Bilingual,
  body: {
    vi: 'Brainrot gợi đến thói quen cuốn theo những nội dung ngắn trên mạng. Brainroot là cách chúng mình hình dung một hướng đi khác: biến sự tò mò thành cơ hội học hỏi, suy nghĩ sâu hơn và bắt đầu những hành động có ý nghĩa với môi trường.',
    en: 'Brainrot hints at the habit of being swept along by short online content. Brainroot is how we imagine another path: turning curiosity into a chance to learn, think more deeply, and start actions that matter for the environment.',
  } as Bilingual,
  nameLine: {
    vi: 'Brain (tư duy, tri thức) + Root (rễ cây) – gieo rễ cho tri thức.',
    en: 'Brain (thinking, knowledge) + Root (a plant’s root) – planting roots for knowledge.',
  } as Bilingual,
  before: { vi: 'Lướt qua', en: 'Scrolling past' } as Bilingual,
  after: { vi: 'Khám phá sâu hơn', en: 'Exploring deeper' } as Bilingual,
  figureAlt: {
    before: {
      vi: 'Bầu trời nhạt, trống trải, tượng trưng cho việc lướt qua nội dung',
      en: 'A pale, empty sky standing for scrolling past content',
    } as Bilingual,
    after: {
      vi: 'Khu vườn đầy màu sắc với đồi, cây và hoa, tượng trưng cho việc khám phá sâu hơn',
      en: 'A colourful garden with hills, plants and flowers standing for exploring deeper',
    } as Bilingual,
  },
} as const;

export interface JourneyScene {
  readonly id: 'explore' | 'experience' | 'act';
  readonly title: Bilingual;
  readonly sentence: Bilingual;
  readonly image: `/${string}`;
  readonly alt: Bilingual;
}

export const ABOUT_JOURNEY = {
  heading: { vi: 'Học qua trải nghiệm', en: 'Learning by experience' } as Bilingual,
  scenes: [
    {
      id: 'explore',
      title: { vi: 'Khám phá', en: 'Explore' },
      sentence: {
        vi: 'Tiếp cận kiến thức bằng sự tò mò.',
        en: 'Approach knowledge with curiosity.',
      },
      image: '/assets/home/garden/green-learn.webp',
      alt: {
        vi: 'Cuốn sổ tay khu vườn mở ra với các biểu tượng môi trường',
        en: 'An open garden notebook with environmental icons',
      },
    },
    {
      id: 'experience',
      title: { vi: 'Trải nghiệm', en: 'Experience' },
      sentence: {
        vi: 'Học qua trò chơi và tương tác.',
        en: 'Learn through play and interaction.',
      },
      image: '/assets/home/garden/green-play.webp',
      alt: {
        vi: 'Bàn gỗ và thẻ bài lá xanh trên gốc cây trong khu vườn',
        en: 'A wooden board and leaf-green cards on a tree stump in the garden',
      },
    },
    {
      id: 'act',
      title: { vi: 'Hành động', en: 'Act' },
      sentence: {
        vi: 'Thử những thay đổi nhỏ trong đời sống.',
        en: 'Try small changes in everyday life.',
      },
      image: '/assets/home/garden/green-quest.webp',
      alt: {
        vi: 'Bình nước cá nhân, bảng chỉ đường gỗ và chồi non trên bãi cỏ',
        en: 'A reusable bottle, a wooden signpost and a sprout on the grass',
      },
    },
  ] as readonly JourneyScene[],
  mascotLine: {
    vi: 'Mascot đồng hành: Brainie giữ thẻ Truth (sự thật), Rootie giữ thẻ Dare (thử thách).',
    en: 'Our mascots: Brainie holds the Truth cards (facts), Rootie holds the Dare cards (challenges).',
  } as Bilingual,
} as const;

export interface AudienceGroup {
  readonly id: 'curious' | 'class' | 'community';
  readonly title: Bilingual;
  readonly sentence: Bilingual;
  /** Existing garden illustration, shown as a small round crop. */
  readonly image: `/${string}`;
  readonly alt: Bilingual;
}

export const ABOUT_AUDIENCE = {
  heading: { vi: 'Brainroot dành cho ai?', en: 'Who is Brainroot for?' } as Bilingual,
  groups: [
    {
      id: 'curious',
      title: { vi: 'Bạn trẻ yêu khám phá', en: 'Curious young people' },
      sentence: {
        vi: 'Học thêm điều mới và bắt đầu những thói quen xanh.',
        en: 'Learn something new and start green habits.',
      },
      image: '/assets/home/garden/green-learn.webp',
      alt: { vi: 'Minh họa góc học tập xanh', en: 'Illustration of a green learning corner' },
    },
    {
      id: 'class',
      title: { vi: 'Lớp học & câu lạc bộ', en: 'Classes & clubs' },
      sentence: {
        vi: 'Cùng chơi, cùng thảo luận và thực hành.',
        en: 'Play together, discuss and practise.',
      },
      image: '/assets/home/garden/green-play.webp',
      alt: { vi: 'Minh họa bàn chơi chung', en: 'Illustration of a shared play table' },
    },
    {
      id: 'community',
      title: { vi: 'Cộng đồng quan tâm môi trường', en: 'Environment-minded communities' },
      sentence: {
        vi: 'Chia sẻ ý tưởng và lan tỏa cảm hứng hành động.',
        en: 'Share ideas and spread the inspiration to act.',
      },
      image: '/assets/home/garden/green-connect.webp',
      alt: { vi: 'Minh họa khu vườn kết nối cộng đồng', en: 'Illustration of a community connection garden' },
    },
  ] as readonly AudienceGroup[],
} as const;

export const ABOUT_INVITE = {
  heading: { vi: 'Hành trình xanh bắt đầu từ một điều nhỏ.', en: 'A green journey starts with one small thing.' } as Bilingual,
  description: {
    vi: 'Chọn một trò chơi, khám phá kiến thức hoặc thử một hành động xanh cùng Brainroot.',
    en: 'Pick a game, explore some knowledge, or try a green action with Brainroot.',
  } as Bilingual,
  primary: { label: { vi: 'Khám phá Brainroot', en: 'Explore Brainroot' } as Bilingual, to: '/games' },
  secondary: { label: { vi: 'Thử thách xanh', en: 'Green challenges' } as Bilingual, to: '/quest' },
  sceneAlt: {
    vi: 'Brainie và Rootie đứng trên thảm cỏ của khu vườn',
    en: 'Brainie and Rootie standing on the garden grass',
  } as Bilingual,
} as const;

export const ABOUT_FOOTNOTE: Bilingual = {
  vi: 'Nội dung Learn lấy từ nguồn công khai có đường dẫn. Hình và mascot do nhóm sở hữu; phần nào dùng AI được ghi rõ.',
  en: 'Learn content comes from public sources with links. Artwork and mascots are owned by the team; any use of AI is stated clearly.',
};

/** Assets used by /about (all pre-existing; checked by tests). */
export const ABOUT_ASSETS = {
  sky: '/assets/hero-v4/depth-01-sky.webp',
  hills: '/assets/hero-v4/depth-02-hills.webp',
  foreground: '/assets/hero-v4/depth-03-foreground.webp',
  garden: '/assets/hero-v4/hero-garden-v4.webp',
  brainie: '/assets/hero-v4/brainie.webp',
  rootie: '/assets/hero-v4/rootie.webp',
} as const;
