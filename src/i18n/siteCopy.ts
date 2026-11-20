import type { Locale } from './I18nContext';
import {
  ABOUT_CONTENT,
  ECOSYSTEM_AREAS,
  ECOSYSTEM_SECTION,
  FEATURED_GREEN_PLAY,
  FOOTER_CONTENT,
  HERO_CONTENT,
  LEARNING_JOURNEY_STAGES,
  NAV_ITEMS,
  type EcosystemArea,
  type LearningJourneyStage,
  type NavItem,
} from '../data/landing';
import {
  FACT_ACT_DETAIL,
  GREEN_PLAY_LIBRARY_INTRO,
  GREEN_PLAY_PRODUCTS,
  O_AN_QUAN_DETAIL,
  PHYGITAL_TRANSPARENCY,
  type GameProductSummary,
} from '../data/games';
import { GREEN_LEARN_INTRO, GREEN_LEARN_TOPICS, type LearnTopicCard } from '../data/learn';
import { ABOUT_PAGE_CONTENT, GREEN_CONNECT_CONTENT } from '../data/connectAbout';
import { GREEN_QUEST_LITE_CHALLENGE, type GreenQuestChallenge } from '../features/quest/greenQuestModel';
import { publicUrl } from '../utils/publicUrl';

export function getSiteMetaDescription(locale: Locale): string {
  if (locale === 'en') {
    return 'Brainroot — From Brainrot to Brainroot: an interactive educational ecosystem connecting young people with green skills through games, challenges, and everyday action.';
  }
  return 'Brainroot — From Brainrot to Brainroot: dự án nâng cao nhận thức và kết nối giới trẻ về kỹ năng xanh thông qua sản phẩm giáo dục tương tác.';
}

export function getNavItems(locale: Locale): readonly NavItem[] {
  if (locale === 'vi') return NAV_ITEMS;
  return [
    { label: 'Green Play', href: '/games' },
    { label: 'Green Quest', href: '/quest' },
    { label: 'Green Learn', href: '/learn' },
    { label: 'Green Connect', href: '/connect' },
    { label: 'About Brainroot', href: '/about' },
  ];
}

export function getHeaderCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      brandAria: 'Brainroot — Home',
      brandLogoAlt: 'Brainroot emblem',
      mainNavAria: 'Main navigation',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      languageSwitchAria: 'Switch language',
      skipToMain: 'Skip to main content',
    };
  }
  return {
    brandAria: 'Brainroot — Trang chủ',
    brandLogoAlt: 'Biểu trưng Brainroot',
    mainNavAria: 'Điều hướng chính',
    openMenu: 'Mở menu điều hướng',
    closeMenu: 'Đóng menu điều hướng',
    languageSwitchAria: 'Chuyển đổi ngôn ngữ',
    skipToMain: HERO_CONTENT.skipLinkLabel,
  };
}

export function getHeroCopy(locale: Locale) {
  if (locale === 'vi') return HERO_CONTENT;
  return {
    ...HERO_CONTENT,
    skipLinkLabel: 'Skip to main content',
    heroAriaLabel: 'Brainroot — From Brainrot to Brainroot',
    heading: 'Brainroot',
    statementLine1:
      'Raising awareness and connecting young people with green skills',
    statementLine2: 'through interactive educational experiences.',
    primaryCtaLabel: 'Explore the Ecosystem',
    scrollHintLabel: 'Explore below',
  };
}

export function getEcosystemSectionCopy(locale: Locale) {
  if (locale === 'vi') return ECOSYSTEM_SECTION;
  return {
    id: ECOSYSTEM_SECTION.id,
    overline: 'BRAINROOT ECOSYSTEM · 4 DESTINATIONS',
    heading: 'Four Garden Windows for Green Skills',
    summary:
      'Four interconnected pathways moving from play and hands-on action to knowledge and community connection.',
  };
}

export function getEcosystemAreas(locale: Locale): readonly EcosystemArea[] {
  if (locale === 'vi') return ECOSYSTEM_AREAS;
  return [
    {
      ...ECOSYSTEM_AREAS[0],
      statusLabel: 'Interactive Games',
      subtitle: 'Learn green, play smart',
      description:
        'Explore Brainroot - Truth or Dare and the 3D wooden tabletop for Brainroot - Ô ăn quan xanh.',
      note: 'Open web experience · No sign-in required',
      ctaLabel: 'Explore Green Play',
      imageAlt:
        'Illustrated Green Play garden window featuring Brainie and Rootie with educational cards and wooden tabletop pebbles',
    },
    {
      ...ECOSYSTEM_AREAS[1],
      statusLabel: 'Small Daily Actions',
      subtitle: 'Everyday sustainable habits',
      description:
        'Start a bite-sized habit right at school or home and record your own short reflection.',
      note: 'Saved locally in your browser',
      ctaLabel: 'Start a Challenge',
      imageAlt:
        'Illustrated Green Quest garden window showing a reusable bottle, compass, and green action checklist',
    },
    {
      ...ECOSYSTEM_AREAS[2],
      statusLabel: '5 Core Green Topics',
      subtitle: 'Clear, approachable green knowledge',
      description:
        'Browse 5 core environmental topics with practical campus contexts and reflection prompts.',
      note: '5 foundational topics · Easy to read',
      ctaLabel: 'Explore 5 Topics',
      imageAlt:
        'Illustrated Green Learn garden window with an open botanical field notebook and five environmental icons',
    },
    {
      ...ECOSYSTEM_AREAS[3],
      statusLabel: 'Classrooms & Clubs',
      subtitle: 'Connect young people & educators',
      description:
        'Practical ideas for bringing Brainroot into classrooms, student clubs, and community workshops.',
      note: 'For teachers, clubs & young people',
      ctaLabel: 'Join the Community',
      imageAlt:
        'Illustrated Green Connect garden window with a warm wooden bench and a sunlit community garden',
    },
  ];
}

export function getFeaturedGreenPlayCopy(locale: Locale) {
  if (locale === 'vi') return FEATURED_GREEN_PLAY;
  return {
    id: FEATURED_GREEN_PLAY.id,
    overline: 'GREEN PLAY · FEATURED EXPERIENCES',
    heading: 'Two interactive games opening your green skills journey',
    summary:
      'Experience the digital Brainroot - Truth or Dare deck right in your browser or test the 3D wooden tabletop for Brainroot - Ô ăn quan xanh.',
    primaryCtaLabel: 'Open Green Play Library',
    primaryCtaTo: '/games',
    items: [
      {
        ...FEATURED_GREEN_PLAY.items[0],
        badge: 'Interactive Digital Deck · Live Preview',
        subtitle:
          'Educational card game sparking open dialogue and real green habits',
        description:
          'Choose Brainie (Truth) or Rootie (Dare) before drawing from the shuffled deck, flip only your chosen face, and spin the mystery Green Penalty wheel if you skip.',
        primaryActionLabel: 'Play Brainroot - Truth or Dare',
        secondaryActionLabel: 'View Product Details',
        imageAlt:
          'Physical Brainroot - Truth or Dare card deck with warm environmental illustrations',
      },
      {
        ...FEATURED_GREEN_PLAY.items[1],
        badge: '3D Wooden Tabletop · Rules in Standardization',
        subtitle:
          'Traditional Vietnamese folk game paired with 5 environmental topics & 3 learning levels',
        description:
          'Interact directly with the 3D wooden board using mouse or keyboard and explore how 5 core green topics align with 3 learning levels.',
        disclosure:
          'Concept illustration — digital rules are currently being standardized.',
        primaryActionLabel: 'Explore 3D Board & 5 Topics',
        secondaryActionLabel: 'Open Fullscreen 3D Board',
        imageAlt:
          'Concept illustration of the Brainroot - Ô ăn quan xanh wooden board with natural pebbles',
      },
    ],
  };
}

export function getAboutSectionCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      ...ABOUT_CONTENT,
      connectLinkLabel: 'Xem cách lớp học & câu lạc bộ tham gia',
    };
  }
  return {
    id: ABOUT_CONTENT.id,
    overline: 'ABOUT BRAINROOT',
    heading: 'From Brainrot to Brainroot',
    mission:
      'RAISING AWARENESS AND CONNECTING YOUNG PEOPLE WITH GREEN SKILLS THROUGH INTERACTIVE EDUCATIONAL PRODUCTS.',
    body: 'Brainroot is an interactive environmental education ecosystem for young people, classrooms, and communities. Through games, structured knowledge, and everyday challenges, we make sustainable thinking lively, approachable, and easy to practice together.',
    ctaLabel: 'Read the Brainroot Story',
    ctaTo: '/about',
    connectLinkLabel: 'See how classrooms & clubs participate',
  };
}

export function getLearningJourneyStages(
  locale: Locale,
): readonly LearningJourneyStage[] {
  if (locale === 'vi') return LEARNING_JOURNEY_STAGES;
  return [
    {
      id: 'seed',
      stepNumber: '01',
      label: 'Seed',
      title: 'Spark curiosity through play',
      summary:
        'Start naturally with games and familiar everyday situations instead of dry lectures.',
    },
    {
      id: 'sprout',
      stepNumber: '02',
      label: 'Sprout',
      title: 'Notice environmental habits',
      summary:
        'Recognize how small choices around water, energy, waste, and consumption shape daily life.',
    },
    {
      id: 'understand',
      stepNumber: '03',
      label: 'Understand',
      title: 'Build clear green literacy',
      summary:
        'Connect hands-on experience with structured knowledge across 5 core environmental topics.',
    },
    {
      id: 'action',
      stepNumber: '04',
      label: 'Act',
      title: 'Practice achievable daily habits',
      summary:
        'Turn awareness into realistic actions at school, at home, or with student clubs.',
    },
    {
      id: 'connect',
      stepNumber: '05',
      label: 'Connect',
      title: 'Grow green skills as a community',
      summary:
        'Share perspectives, support friends, and sustain green habits together in classrooms and communities.',
    },
  ];
}

export function getJourneyUiCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      tablistAria: '5-step Brainroot green skills learning journey',
      stepPrefix: 'Step',
    };
  }
  return {
    tablistAria: '5 bước hành trình học kỹ năng xanh Brainroot',
    stepPrefix: 'Bước',
  };
}

export function getFooterCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      ...FOOTER_CONTENT,
      logoAlt: 'Biểu trưng Brainroot',
      ecosystemNavAria: 'Điều hướng hệ sinh thái Brainroot',
      ecosystemHeading: 'Hệ sinh thái',
      productsNavAria: 'Sản phẩm và dự án Brainroot',
      productsHeading: 'Sản phẩm & Dự án',
      homeLink: 'Trang chủ',
      aboutLink: 'Về Brainroot',
    };
  }
  return {
    brandText: 'From Brainrot to Brainroot',
    missionShort:
      'Discover green skills through games, knowledge, and small everyday actions.',
    copyrightText: '© 2026 Brainroot',
    bottomSlogan: 'Learn green, play smart, create change together.',
    logoAlt: 'Brainroot emblem',
    ecosystemNavAria: 'Brainroot ecosystem navigation',
    ecosystemHeading: 'Ecosystem',
    productsNavAria: 'Brainroot products and project',
    productsHeading: 'Products & Project',
    homeLink: 'Home',
    aboutLink: 'About Brainroot',
  };
}

export function getBreadcrumbsUiCopy(locale: Locale) {
  return locale === 'en'
    ? { ariaLabel: 'Page breadcrumbs', homeLabel: 'Home' }
    : { ariaLabel: 'Đường dẫn trang', homeLabel: 'Trang chủ' };
}

export function getGreenPlayLibraryCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      pavilionEyebrow: 'KHÁM PHÁ THƯ VIỆN',
      pavilionSubtitle: 'Học điều xanh, chơi điều hay',
      intro: GREEN_PLAY_LIBRARY_INTRO,
      products: GREEN_PLAY_PRODUCTS,
      phygital: PHYGITAL_TRANSPARENCY,
      returnNavAria: 'Điều hướng quay lại',
      returnPrompt:
        'Muốn xem toàn cảnh bốn khu vực của hệ sinh thái Brainroot?',
      returnHomeBtn: '← Quay về trang chủ',
      returnAboutLink: 'Tìm hiểu thêm về dự án Brainroot',
    };
  }
  const products: readonly GameProductSummary[] = [
    {
      ...GREEN_PLAY_PRODUCTS[0],
      subtitle:
        'Educational green-skills card deck sparking open dialogue and real action',
      statusLabel: 'Physical Card Deck · Interactive Digital Experience Live',
      description:
        'Brainroot - Truth or Dare brings our physical card deck to the web with a 2-face digital flip, official Brainie (Truth) & Rootie (Dare) turn mechanics, hardcover rulebook, and 15-slot mystery Green Penalty wheel.',
      ctaLabel: 'Play Interactive Experience',
      secondaryCtaLabel: 'View Product Overview',
      media: {
        ...GREEN_PLAY_PRODUCTS[0].media,
        alt: 'Physical Brainroot - Truth or Dare educational card deck with warm green illustrations',
      },
      specs: [
        {
          label: 'Format',
          value: 'Physical card deck & interactive 2-face web experience',
        },
        {
          label: 'Audience',
          value: 'Students, youth groups, teachers, and clubs',
        },
        {
          label: 'Status',
          value:
            'Open interactive shell · Approved VI/EN PDF card deck pending owner release',
        },
      ],
    },
    {
      ...GREEN_PLAY_PRODUCTS[1],
      subtitle:
        'Traditional Vietnamese folk game paired with 5 environmental topics and 3 learning levels',
      statusLabel: '3D Wooden Tabletop · Digital Rules in Standardization',
      description:
        'Inspired by the traditional Vietnamese game Ô ăn quan, Brainroot - Ô ăn quan xanh pairs an interactive 3D wooden board with learning scenarios across consumption, water, energy, waste, and green spaces.',
      ctaLabel: 'Explore 3D Board & 5 Topics',
      media: {
        ...GREEN_PLAY_PRODUCTS[1].media,
        alt: 'Concept illustration of Brainroot - Ô ăn quan xanh on a warm wooden board with natural pebbles',
        disclosureCaption:
          'Concept illustration — digital rules are currently being standardized.',
      },
      specs: [
        { label: 'Topics', value: '5 core environmental themes' },
        {
          label: 'Levels',
          value: 'Awareness · Decision-Making · Problem-Solving',
        },
        {
          label: 'Status',
          value:
            'Interactive 3D wooden board live; official digital rules are being standardized',
        },
      ],
    },
  ];

  return {
    pavilionEyebrow: 'EXPLORE THE LIBRARY',
    pavilionSubtitle: 'Learn green, play smart',
    intro: {
      eyebrow: 'EDUCATIONAL GAME LIBRARY',
      heading: 'Two flagship experiences launching your green skills journey',
      summary:
        'Each Green Play game is designed to combine hands-on play, open discussion, and practical green habits in classrooms and communities — open to explore without mandatory sign-in.',
    },
    products,
    phygital: {
      eyebrow: 'PHYGITAL APPROACH · PHYSICAL & DIGITAL',
      heading: 'From tactile tabletop play to transparent digital access',
      summary:
        'Brainroot does not replace the joy of holding real cards or gathering around a wooden board. Our web platform extends access for students, teachers, and clubs everywhere.',
      pillars: [
        {
          title: 'Open, barrier-free exploration',
          description:
            'Visitors can explore product overviews, play the interactive Brainroot - Truth or Dare experience, and test the 3D wooden Ô ăn quan xanh board right away.',
        },
        {
          title: 'Respecting the physical card deck',
          description:
            'Full physical deck card text is never published without explicit owner approval; verified sample cards slot in only upon authorization.',
        },
        {
          title: 'Clear, honest progress status',
          description:
            'Every component awaiting content approval or digital rule standardization is transparently labeled right where you experience it.',
        },
      ],
    },
    returnNavAria: 'Return navigation',
    returnPrompt: 'Want to see all four destinations in the Brainroot ecosystem?',
    returnHomeBtn: '← Back to Home',
    returnAboutLink: 'Learn more about Brainroot',
  };
}

export function getFactActDetailCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      ...FACT_ACT_DETAIL,
      deckImgAlt: 'Bộ thẻ bài vật lý Brainroot - Truth or Dare',
      deckCaption:
        'Hình ảnh bộ thẻ bài vật lý Brainroot - Truth or Dare gốc của nhóm dự án Brainroot.',
      backToLibrary: '← Thư viện Green Play',
      loopEyebrow: 'TRẢI NGHIỆM TRÊN WEB',
      compareEyebrow: 'SO SÁNH TRẢI NGHIỆM',
      noticeTag: 'MINH BẠCH NỘI DUNG',
    };
  }
  return {
    title: 'Brainroot - Truth or Dare',
    eyebrow: 'GREEN PLAY · EDUCATIONAL CARD DECK',
    statusLabel: 'Physical Card Deck · Interactive Web Experience Available',
    tagline:
      'Sparking open conversations about green living and everyday sustainable habits.',
    overview:
      'Brainroot - Truth or Dare is our interactive card game for classrooms, clubs, and friends. Experience the faithful digital version directly in your browser with deck shuffling, Brainie (Truth) & Rootie (Dare) selection before drawing, 2-face flip, hardcover rulebook, and the 15-slot mystery Green Penalty wheel.',
    trialCtaLabel: 'Open Interactive Web Experience',
    trialCtaTo: '/games/fact-act/play',
    backToLibrary: '← Green Play Library',
    deckImgAlt: 'Physical Brainroot - Truth or Dare card deck',
    deckCaption:
      'Original physical Brainroot - Truth or Dare deck created by the Brainroot team.',
    specs: [
      {
        label: 'Format',
        value: 'Physical card deck & faithful 2-face digital experience',
      },
      {
        label: 'Audience',
        value: 'Students, youth groups, educators, and campus clubs',
      },
      {
        label: 'Deck & Rulebook',
        value:
          'Interactive mechanics live · Official VI/EN PDF card text & penalties slot in upon owner release',
      },
      {
        label: 'Accessibility',
        value:
          'Open without login, full keyboard navigation, reduced-motion support, and VI/EN toggle',
      },
    ],
    loopEyebrow: 'HOW A TURN WORKS',
    learningLoopHeading: 'Faithful 3-step turn rhythm from the physical deck',
    learningLoopSummary:
      'The web experience preserves the authentic flow of Brainroot - Truth or Dare without inventing new modes or altering official rules.',
    learningSteps: [
      {
        stepNumber: '01',
        code: 'CHOOSE',
        title: 'Pick Truth (Brainie) or Dare (Rootie) first',
        summary:
          'After shuffling, choose your side before drawing. Official rule: you cannot choose Truth on two consecutive turns.',
      },
      {
        stepNumber: '02',
        code: 'DRAW & FLIP',
        title: 'Pull the top card & flip only your side',
        summary:
          'Pull the top card forward and flip cleanly to reveal only the face you picked—the other side stays hidden.',
      },
      {
        stepNumber: '03',
        code: 'DONE OR SKIP',
        title: 'Complete, or spin the 15-? Green Penalty wheel',
        summary:
          'Mark Done to continue without repeating cards, or Skip to spin the mystery 15-? wheel—with a gentle Stop option anytime.',
      },
    ],
    compareEyebrow: 'EXPERIENCE COMPARISON',
    comparisonHeading: 'Physical deck and digital web experience',
    comparisonSummary:
      'Both formats complement each other for classrooms and youth groups while maintaining clear content boundaries.',
    comparisonColumns: [
      {
        heading: 'Physical Brainroot - Truth or Dare Deck',
        badge: 'Original Product',
        points: [
          'Tactile tabletop play ideal for classrooms, workshops, and friend circles.',
          'Features the full physical card set and original artwork by the Brainroot team.',
          'Supports live facilitation by educators and student club leaders.',
        ],
      },
      {
        heading: 'Digital Brainroot - Truth or Dare Experience',
        badge: 'Interactive Web Build',
        points: [
          'Faithful 2-face card flip, consecutive-Truth lock, hardcover storybook rulebook, and 15-? mystery wheel.',
          'Zero invented questions or penalties—structured cleanly for approved VI/EN PDF sample cards upon owner release.',
          'Full VI/EN support, offline Brainie rules FAQ, keyboard access, and reduced-motion support.',
        ],
      },
    ],
    noticeTag: 'CONTENT TRANSPARENCY',
    unavailableNotice: {
      heading: 'Approved VI/EN sample deck release status',
      description:
        'You can explore the complete interactive Truth or Dare tabletop experience, hardcover rulebook, and offline Brainie FAQ right now. Verbatim VI/EN card prompts and Green Penalty copy will be populated directly from the official PDFs once approved for public release.',
      primaryActionLabel: 'Launch Truth or Dare',
      primaryActionTo: '/games/fact-act/play',
      secondaryActionLabel: 'Back to Green Play Library',
      secondaryActionTo: '/games',
    },
  };
}

export function getOAnQuanDetailCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      ...O_AN_QUAN_DETAIL,
      explorerEyebrow: 'KHÁM PHÁ NỘI DUNG GIÁO DỤC',
      explorerHeading: '5 chủ đề × 3 cấp độ học tập',
      explorerNote:
        'Chạm chọn chủ đề và cấp độ để xem định hướng tình huống học tập. Các ô trên bàn 3D chưa gán cố định theo chủ đề vì luật chơi chính thức đang được chuẩn hóa.',
      topicTabsAria: 'Chọn chủ đề môi trường',
      levelTabsAria: 'Chọn cấp độ năng lực',
      topicFocusLabel: 'Trọng tâm chủ đề:',
      levelGoalLabel: 'Mục tiêu cấp độ:',
      topicsEyebrow: 'NỘI DUNG GIÁO DỤC',
      levelsEyebrow: 'TIẾN TRÌNH KỸ NĂNG XANH',
      artEyebrow: 'ĐỊNH HƯỚNG NGHỆ THUẬT',
      artHeading:
        'Đối chiếu bản minh họa ý tưởng ban đầu và bản gỗ 3D hiện tại',
      artSummary:
        'Hình minh họa bên cạnh là bản định hướng thị giác ban đầu giúp nhóm xác định tông gỗ ấm, các viên sỏi tròn và ánh sáng khu vườn cho bàn 3D ở phía trên — không phải ảnh chụp của bản chơi chính thức.',
      artAlt:
        'Minh họa khái niệm bàn chơi Brainroot - Ô ăn quan xanh với mặt bàn gỗ ấm và các viên sỏi sinh thái',
      roadmapEyebrow: 'MINH BẠCH LỘ TRÌNH',
      noticeTag: 'TRẠNG THÁI LUẬT BẢN SỐ',
    };
  }

  return {
    title: 'Brainroot - Ô ăn quan xanh',
    eyebrow: 'GREEN PLAY · FOLK GAME & GREEN SKILLS',
    statusLabel: '3D Wooden Tabletop · Digital Rules in Standardization',
    tagline:
      'Connecting traditional Vietnamese folk gameplay with environmental problem-solving.',
    overview:
      'Brainroot - Ô ăn quan xanh pairs the familiar rhythm of traditional Ô ăn quan with green-skills learning. Right on this page, you can interact with the 3D wooden board and explore its 5 environmental topics and 3 learning levels.',
    disclosure:
      'Concept illustration — digital rules are currently being standardized.',
    specs: [
      { label: 'Educational Themes', value: '5 core environmental topics' },
      { label: 'Skill Progression', value: '3 learning levels' },
      {
        label: '3D Wooden Board',
        value: 'Interactive preview embedded (with full keyboard controls)',
      },
      {
        label: 'Official Digital Rules',
        value: 'Currently undergoing standardization',
      },
    ],
    explorerEyebrow: 'EXPLORE EDUCATIONAL CONTENT',
    explorerHeading: '5 Topics × 3 Learning Levels',
    explorerNote:
      'Select a topic and level to preview learning focus areas. Individual pits on the 3D board are not permanently mapped to topics while official digital rules are being standardized.',
    topicTabsAria: 'Choose an environmental topic',
    levelTabsAria: 'Choose a competency level',
    topicFocusLabel: 'Topic focus:',
    levelGoalLabel: 'Level objective:',
    topicsEyebrow: 'EDUCATIONAL THEMES',
    topicsHeading: '5 Core Environmental Topics',
    topicsSummary:
      'Learning scenarios in Brainroot - Ô ăn quan xanh revolve around 5 everyday environmental themes relevant to students and urban communities.',
    topics: [
      {
        id: 'sustainable-consumption',
        title: 'Sustainable Consumption',
        description:
          'Weigh real needs, product lifecycles, and responsible everyday purchasing habits.',
        exampleFocus:
          'Reusing textbooks, event supplies, and pausing before buying new items.',
      },
      {
        id: 'water',
        title: 'Water',
        description:
          'Value clean water sources, practice conservation, and protect local waterways.',
        exampleFocus:
          'Turning taps off promptly and reporting campus leaks early.',
      },
      {
        id: 'energy',
        title: 'Energy',
        description:
          'Use electricity efficiently and prevent unnecessary energy waste in daily routines.',
        exampleFocus:
          'Switching off lights, fans, and projectors in empty rooms and using natural daylight.',
      },
      {
        id: 'waste',
        title: 'Waste',
        description:
          'Prioritize reducing single-use plastics first, then reusing and sorting cleanly.',
        exampleFocus:
          'Bringing personal bottles and cutting waste before club events even begin.',
      },
      {
        id: 'green-spaces',
        title: 'Green Spaces',
        description:
          'Care for trees, urban biodiversity, and healthy shared natural environments.',
        exampleFocus:
          'Protecting campus greenery, study corners, and neighborhood plant beds.',
      },
    ],
    levelsEyebrow: 'GREEN SKILLS PROGRESSION',
    levelsHeading: '3 Learning Levels',
    levelsSummary:
      'Questions and scenarios scale gently from foundational recognition to collaborative problem-solving.',
    levels: [
      {
        levelNumber: 'Level 1',
        title: 'Awareness',
        focus:
          'Identify environmental phenomena, concepts, and impacts in familiar daily settings.',
        classroomPrompt:
          'Sample direction: Name the single-use item easiest to eliminate at a student club meeting.',
      },
      {
        levelNumber: 'Level 2',
        title: 'Decision-Making',
        focus:
          'Compare practical green options and pick actions suited to real constraints.',
        classroomPrompt:
          'Sample direction: Compare bringing reusable bottles versus collecting disposable cups afterward.',
      },
      {
        levelNumber: 'Level 3',
        title: 'Problem-Solving',
        focus:
          'Combine perspectives to design lasting green routines for a class, club, or community.',
        classroomPrompt:
          'Sample direction: Co-design an easy-to-keep classroom power-saving pact for a full semester.',
      },
    ],
    artEyebrow: 'ART DIRECTION',
    artHeading: 'Comparing the initial visual concept and live 3D wooden board',
    artSummary:
      'The illustration alongside represents the initial visual direction—warm wood grain, natural pebbles, and soft garden lighting—separate from the interactive 3D tabletop above.',
    artAlt:
      'Concept illustration of the Brainroot - Ô ăn quan xanh wooden board with smooth natural pebbles',
    roadmapEyebrow: 'TRANSPARENT ROADMAP',
    roadmapHeading: 'Future digital vision and current live experience',
    roadmapSummary:
      'Brainroot keeps a clear line between our long-term digital design and what is ready to try today.',
    roadmapColumns: [
      {
        heading: 'Future Digital Direction',
        badge: 'Development Roadmap',
        points: [
          'Apply the finalized official digital rules alongside curated 5-topic × 3-level scenarios.',
          'Support private room codes for classrooms, friend groups, and student clubs.',
          'Always maintain keyboard controls and an accessible pit grid alongside the 3D board.',
        ],
      },
      {
        heading: 'What Is Live Today',
        badge: 'Interactive 3D Tabletop',
        points: [
          'An interactive 3D wooden board embedded right on this page for single-seed movement testing.',
          'Official sowing, capturing, and scoring rules are not imposed yet; multiplayer rooms are not open yet.',
          'The concept illustration serves strictly as early art direction, clearly distinct from the 3D board.',
        ],
      },
    ],
    noticeTag: 'DIGITAL RULES STATUS',
    unavailableNotice: {
      heading:
        'Full competitive matches & multiplayer rooms for Brainroot - Ô ăn quan xanh are not open yet',
      description:
        'Official digital rules are being standardized to ensure educational depth and fair gameplay before release. Right now you can explore the 3D board above and browse all 5 topics × 3 levels.',
      primaryActionLabel: 'Back to Green Play Library',
      primaryActionTo: '/games',
      secondaryActionLabel: 'Play Brainroot - Truth or Dare',
      secondaryActionTo: '/games/fact-act/play',
    },
    sandboxNotice: {
      eyebrow: 'FULLSCREEN VIEW',
      heading: 'Open fullscreen 3D wooden board (preview only)',
      description:
        'Expand the Brainroot - Ô ăn quan xanh 3D wooden tabletop to inspect lighting, 12-pit geometry, and keyboard navigation while official digital rules are finalized.',
      linkLabel: 'Open Fullscreen 3D Board',
      href: publicUrl('/?preview=oanquan3d'),
    },
  };
}

export function getOAnQuanTabletopCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      ariaLabel: 'Interactive 3D wooden board for Brainroot - Ô ăn quan xanh',
      badge: 'Interactive 3D Board',
      noticePrefix: 'Single-seed preview mode.',
      noticeHint:
        'Drag gently to tilt the view or select any pit directly.',
      initialLiveStatus:
        '3D wooden board preview ready — select a pit and move 1 sample seed.',
      selectedPitPrefix: 'Selected',
      contextLostFallback:
        'Your browser paused WebGL graphics. You can still control all 12 pits using the accessible grid below.',
      contextRestored: '3D wooden board display restored.',
      webglInitFallback:
        'WebGL 3D could not initialize on this device. The 12-pit grid below remains fully interactive by mouse and keyboard.',
      fallbackTitle: 'Accessible pit grid mode (WebGL fallback)',
      selectionLabel: 'Selected pit',
      moveBtn: 'Move 1 sample seed',
      resetBtn: 'Reset board & view',
      resetStatus: 'Reset sample seed counts across all 12 pits.',
      gridHint:
        'Full keyboard control (use Left/Right arrow keys to navigate all 12 pits):',
      gridAria: 'List of 12 pits on the Brainroot - Ô ăn quan xanh board',
      quanLeft: 'Left Quan',
      quanRight: 'Right Quan',
      topRowPrefix: 'Top',
      bottomRowPrefix: 'Bottom',
      seedUnit: 'seeds',
      emptyPitNotice: 'has no seeds left to move.',
      movedSeedTemplate: (from: string, to: string) =>
        `Moved 1 sample seed from ${from} to ${to}.`,
      standaloneEyebrow: 'BRAINROOT · FULLSCREEN 3D TABLETOP',
      standaloneTitle:
        'Brainroot - Ô ăn quan xanh — Interactive 3D Wooden Tabletop',
      standaloneBack: '← Back to Brainroot - Ô ăn quan xanh',
      standaloneLibrary: 'Green Play Library',
      standaloneLoading: 'Initializing 3D tabletop preview...',
    };
  }
  return {
    ariaLabel: 'Bàn gỗ Brainroot - Ô ăn quan xanh 3D tương tác',
    badge: 'Bàn gỗ 3D thử nghiệm',
    noticePrefix: null,
    noticeHint:
      'Kéo nhẹ trên bàn để nghiêng góc nhìn hoặc bấm chọn từng ô.',
    initialLiveStatus:
      'Bàn gỗ 3D đang ở chế độ thử nghiệm — chọn một ô và nhấn chuyển thử 1 hạt minh họa.',
    selectedPitPrefix: 'Đã chọn',
    contextLostFallback:
      'Trình duyệt vừa tạm ngắt ngữ cảnh đồ họa WebGL. Bạn vẫn có thể điều khiển đầy đủ 12 ô bằng lưới nút bên dưới.',
    contextRestored: 'Đã khôi phục hiển thị bàn gỗ 3D.',
    webglInitFallback:
      'Thiết bị hiện không khởi tạo được WebGL 3D. Lưới 12 ô bên dưới vẫn hoạt động đầy đủ bằng chuột và bàn phím.',
    fallbackTitle: 'Chế độ lưới ô dễ tiếp cận (dự phòng WebGL)',
    selectionLabel: 'Ô đang chọn',
    moveBtn: 'Chuyển thử 1 hạt minh họa',
    resetBtn: 'Đặt lại bàn & góc nhìn',
    resetStatus: 'Đã đặt lại số hạt minh họa ban đầu trên toàn bộ 12 ô.',
    gridHint:
      'Điều khiển bàn phím đầy đủ (dùng phím mũi tên Trái/Phải để chuyển qua 12 ô):',
    gridAria: 'Danh sách 12 ô trên bàn Brainroot - Ô ăn quan xanh',
    quanLeft: 'Quan Trái',
    quanRight: 'Quan Phải',
    topRowPrefix: 'Trên',
    bottomRowPrefix: 'Dưới',
    seedUnit: 'hạt',
    emptyPitNotice: 'không còn hạt để chuyển thử.',
    movedSeedTemplate: (from: string, to: string) =>
      `Đã chuyển thử 1 hạt minh họa từ ${from} sang ${to}.`,
    standaloneEyebrow: 'BRAINROOT · BÀN GỖ 3D TOÀN MÀN HÌNH',
    standaloneTitle:
      'Brainroot - Ô ăn quan xanh — Mặt bàn gỗ 3D thử nghiệm',
    standaloneBack: '← Về trang Brainroot - Ô ăn quan xanh',
    standaloneLibrary: 'Thư viện Green Play',
    standaloneLoading: 'Đang khởi tạo bản thử nghiệm 3D...',
  };
}

export function getGreenQuestCopy(locale: Locale): {
  readonly eyebrow: string;
  readonly challenge: GreenQuestChallenge;
  readonly stepsHeading: string;
  readonly optionalSuffix: string;
  readonly reflectionPlaceholder: string;
  readonly startBtn: string;
  readonly completeBtn: string;
  readonly skipBtn: string;
  readonly resetBtn: string;
  readonly statusBadges: Record<
    'not_started' | 'in_progress' | 'completed' | 'skipped',
    string
  >;
  readonly messages: {
    readonly started: string;
    readonly completed: string;
    readonly skipped: string;
    readonly reset: string;
  };
  readonly completedBoxTitle: string;
  readonly completedBoxLead: string;
  readonly completedSavedPrefix: string;
  readonly completedEmptyHint: string;
  readonly honestyLabel: string;
  readonly honestyAria: string;
  readonly nextPrompt: string;
  readonly nextPlayLink: string;
  readonly nextLearnLink: string;
} {
  if (locale === 'vi') {
    return {
      eyebrow: 'GREEN QUEST · HÀNH ĐỘNG XANH KHỞI ĐẦU',
      challenge: GREEN_QUEST_LITE_CHALLENGE,
      stepsHeading: `Gợi ý 4 bước thực hành (${GREEN_QUEST_LITE_CHALLENGE.durationLabel})`,
      optionalSuffix: '(tùy chọn)',
      reflectionPlaceholder:
        'Ví dụ: Mang sẵn bình nước giúp mình không mua ly nhựa giờ nghỉ trưa...',
      startBtn: 'Bắt đầu thử thách hôm nay',
      completeBtn: 'Đánh dấu đã hoàn thành',
      skipBtn: 'Tạm bỏ qua',
      resetBtn: 'Đặt lại thử thách',
      statusBadges: {
        completed: 'Đã tự ghi nhận hoàn thành',
        in_progress: 'Đang thực hiện hôm nay',
        skipped: 'Đã tạm bỏ qua',
        not_started: 'Chưa bắt đầu',
      },
      messages: {
        started:
          'Bạn đã nhận thử thách xanh khởi đầu. Chúc bạn một ngày học tập xanh nhẹ nhàng!',
        completed: 'Đã ghi nhận hoàn thành thử thách trên trình duyệt này.',
        skipped:
          'Đã đánh dấu tạm bỏ qua thử thách — bạn có thể quay lại thực hiện bất kỳ lúc nào.',
        reset: 'Đã đặt lại trạng thái thử thách trên trình duyệt này.',
      },
      completedBoxTitle: 'Ghi nhận hoàn thành cục bộ',
      completedBoxLead:
        'Cảm ơn bạn đã thực hiện một lựa chọn xanh thiết thực.',
      completedSavedPrefix: 'Phản tư đã lưu:',
      completedEmptyHint: 'Bạn có thể bổ sung ghi chú phản tư bất kỳ lúc nào.',
      honestyLabel: 'Minh bạch:',
      honestyAria: 'Lưu ý về lưu trữ cục bộ',
      nextPrompt: 'Muốn kết hợp hành động với trò chơi hoặc đọc sâu hơn?',
      nextPlayLink: 'Trải nghiệm thử Brainroot - Truth or Dare →',
      nextLearnLink: 'Đọc 5 chủ đề trong Green Learn',
    };
  }

  const challenge: GreenQuestChallenge = {
    id: GREEN_QUEST_LITE_CHALLENGE.id,
    topic: 'Waste & Sustainable Consumption',
    title: 'One study day without adding a single-use plastic cup',
    subtitle:
      'A small, realistic starter habit you can try right on campus or at your desk',
    summary:
      'During one school day or club meetup, bring a personal bottle (or reusable cup) and decline at least one drink served in a single-use plastic cup.',
    durationLabel: '1 day · Self-paced',
    steps: [
      'Place a clean personal water bottle beside your bag or desk before heading out.',
      'Spot a clean drinking water refill station at school or pack enough water for your session.',
      'If grabbing a drink with friends, ask if they can fill your bottle or serve in a dine-in glass.',
      'At the end of the day, jot down one short reflection on what helped or what felt tricky.',
    ],
    reflectionPrompt:
      'What made this challenge easier today, or what small obstacle would you adjust next time?',
    honestyNote:
      'Progress is saved only locally in this browser based on your own self-check — no login, photo upload, or GPS location required.',
  };

  return {
    eyebrow: 'GREEN QUEST · STARTER GREEN ACTION',
    challenge,
    stepsHeading: `4 simple steps (${challenge.durationLabel})`,
    optionalSuffix: '(optional)',
    reflectionPlaceholder:
      'Example: Packing my water bottle ahead helped me skip a plastic cup at lunch...',
    startBtn: 'Start today’s challenge',
    completeBtn: 'Mark as completed',
    skipBtn: 'Skip for now',
    resetBtn: 'Reset challenge',
    statusBadges: {
      completed: 'Self-recorded as completed',
      in_progress: 'In progress today',
      skipped: 'Skipped for now',
      not_started: 'Not started yet',
    },
    messages: {
      started:
        'You accepted the starter green challenge. Have a mindful, green study day!',
      completed: 'Challenge completion saved locally in this browser.',
      skipped:
        'Marked as skipped for now — you can return to it anytime.',
      reset: 'Challenge status has been reset on this browser.',
    },
    completedBoxTitle: 'Locally recorded completion',
    completedBoxLead: 'Thank you for making a practical green choice today.',
    completedSavedPrefix: 'Saved reflection:',
    completedEmptyHint: 'You can add a reflection note anytime.',
    honestyLabel: 'Transparency:',
    honestyAria: 'Note about local storage',
    nextPrompt: 'Want to pair action with play or deeper reading?',
    nextPlayLink: 'Play Brainroot - Truth or Dare →',
    nextLearnLink: 'Read all 5 topics in Green Learn',
  };
}

export function getGreenLearnCopy(locale: Locale): {
  readonly intro: { readonly [K in keyof typeof GREEN_LEARN_INTRO]: string };
  readonly topics: readonly LearnTopicCard[];
  readonly viewingPrefix: string;
  readonly tabsAria: string;
  readonly draftPill: string;
  readonly objectiveLabel: string;
  readonly keyConceptHeading: string;
  readonly campusContextHeading: string;
  readonly starterHabitHeading: string;
  readonly reflectionHeading: string;
  readonly editorialLabel: string;
  readonly prevBtn: string;
  readonly nextBtn: string;
  readonly nextStripPrompt: string;
  readonly nextPlayBtn: string;
  readonly nextOAnQuanLink: string;
} {
  if (locale === 'vi') {
    return {
      intro: {
        eyebrow: String(GREEN_LEARN_INTRO.eyebrow),
        heading: String(GREEN_LEARN_INTRO.heading),
        summary: String(GREEN_LEARN_INTRO.summary),
        provenanceBannerTitle: String(GREEN_LEARN_INTRO.provenanceBannerTitle),
        provenanceBannerBody: String(GREEN_LEARN_INTRO.provenanceBannerBody),
      },
      topics: GREEN_LEARN_TOPICS,
      viewingPrefix: 'Đang xem',
      tabsAria: '5 chủ đề kỹ năng xanh',
      draftPill: 'Bản thảo khung · Chờ duyệt nguồn',
      objectiveLabel: 'Mục tiêu học tập',
      keyConceptHeading: 'Ý chính cần hiểu',
      campusContextHeading: 'Gần gũi trong học đường',
      starterHabitHeading: 'Thói quen nhỏ dễ bắt đầu',
      reflectionHeading: 'Câu hỏi gợi mở phản tư',
      editorialLabel: 'Trạng thái biên tập:',
      prevBtn: '← Chủ đề trước',
      nextBtn: 'Chủ đề tiếp theo →',
      nextStripPrompt:
        'Áp dụng ngay kiến thức vừa đọc vào trò chơi hoặc hành động nhỏ:',
      nextPlayBtn: 'Trải nghiệm thử Brainroot - Truth or Dare →',
      nextOAnQuanLink: 'Xem 5 chủ đề trong Brainroot - Ô ăn quan xanh',
    };
  }

  const topics: readonly LearnTopicCard[] = [
    {
      id: 'learn-consumption',
      topicTitle: 'Sustainable Consumption',
      shortTag: 'Topic 01',
      learningObjective:
        'Distinguish genuine daily needs from impulse, short-lived buying habits.',
      keyConcept:
        'Every item carries production, packaging, and transport footprints. Extending lifespan, repairing, or sharing existing goods often helps more than simply buying replacements.',
      campusContext:
        'In schools and clubs, sustainable consumption shows up in textbooks, stationery, and reusable event materials.',
      starterHabit:
        'Before buying something new for a term, check whether you can borrow, swap, or repurpose an item you already have.',
      reflectionQuestion:
        'When was the last time you chose not to buy something unnecessary, and how did that feel?',
      reviewStatus: 'draft_unapproved',
      provenanceNote:
        'Foundational editorial draft — official citations are under content review.',
    },
    {
      id: 'learn-water',
      topicTitle: 'Water',
      shortTag: 'Topic 02',
      learningObjective:
        'Spot everyday water waste points and practice mindful conservation.',
      keyConcept:
        'Clean tap water takes energy and treatment to reach us. Leaving faucets running while lathering soap or ignoring slow leaks adds up steadily over time.',
      campusContext:
        'In campus restrooms, dorms, and event prep areas, closing taps firmly and reporting leaks early protects shared water.',
      starterHabit:
        'Turn off the tap while soaping your hands and alert facility staff promptly if you notice a dripping valve.',
      reflectionQuestion:
        'Which daily routine uses the most water for you, and what gentle tweak could reduce waste?',
      reviewStatus: 'draft_unapproved',
      provenanceNote:
        'Foundational editorial draft — official citations are under content review.',
    },
    {
      id: 'learn-energy',
      topicTitle: 'Energy',
      shortTag: 'Topic 03',
      learningObjective:
        'Connect everyday electrical habits with cutting unnecessary energy load.',
      keyConcept:
        'Using energy wisely does not mean sacrificing comfort—it means avoiding lights, fans, AC, and projectors running in empty rooms.',
      campusContext:
        'Classrooms between periods, study rooms, and club spaces easily run idle equipment without shared habits.',
      starterHabit:
        'Make use of natural daylight and airflow when weather permits, and do a quick switch check when leaving last.',
      reflectionQuestion:
        'What simple agreement could your class or team adopt so everyone remembers to switch off power when leaving?',
      reviewStatus: 'draft_unapproved',
      provenanceNote:
        'Foundational editorial draft — official citations are under content review.',
    },
    {
      id: 'learn-waste',
      topicTitle: 'Waste',
      shortTag: 'Topic 04',
      learningObjective:
        'Prioritize waste reduction first, followed by reuse and clean sorting.',
      keyConcept:
        'Source sorting only works well when recyclables stay clean and dry—and reducing single-use packaging upfront is always simpler than sorting it later.',
      campusContext:
        'Club meetings, study breaks, and student events rapidly generate plastic cups, foam boxes, and spare handouts without upfront planning.',
      starterHabit:
        'Carry a personal bottle, empty liquids before recycling containers, and skip plastic bags for one or two small items.',
      reflectionQuestion:
        'Which type of waste piles up fastest around your study desk each week, and where could you cut it earlier?',
      reviewStatus: 'draft_unapproved',
      provenanceNote:
        'Foundational editorial draft — official citations are under content review.',
    },
    {
      id: 'learn-green-spaces',
      topicTitle: 'Green Spaces',
      shortTag: 'Topic 05',
      learningObjective:
        'Recognize how urban trees and natural corners support wellbeing and biodiversity.',
      keyConcept:
        'Green spaces on campus and in neighborhoods cool the air, offer mental calm, and sustain urban ecosystems close to everyday life.',
      campusContext:
        'For students in cities, keeping courtyard planters litter-free and caring for shared classroom greenery builds a real bond with nature.',
      starterHabit:
        'Pause for a few minutes to notice trees on campus, keep planter areas clean, and join a club plant-care session when possible.',
      reflectionQuestion:
        'Which green corner near your school or home makes you feel most refreshed, and how can your community help care for it?',
      reviewStatus: 'draft_unapproved',
      provenanceNote:
        'Foundational editorial draft — official citations are under content review.',
    },
  ];

  return {
    intro: {
      eyebrow: 'GREEN LEARN · STARTER KNOWLEDGE HUB',
      heading: 'Five green-skills topics woven into everyday life',
      summary:
        'Read each topic cleanly with clear learning goals, familiar campus contexts, and small starter habits — open for everyone without sign-in.',
      provenanceBannerTitle: 'Editorial content in review',
      provenanceBannerBody:
        'The starter knowledge cards below are initial educational drafts. The Brainroot editorial team will attach reviewed citations and expanded readings in upcoming releases.',
    },
    topics,
    viewingPrefix: 'Viewing',
    tabsAria: '5 green skills topics',
    draftPill: 'Draft Framework · Citations Pending',
    objectiveLabel: 'Learning objective',
    keyConceptHeading: 'Core idea',
    campusContextHeading: 'Everyday campus context',
    starterHabitHeading: 'Small habit to start',
    reflectionHeading: 'Reflection prompt',
    editorialLabel: 'Editorial status:',
    prevBtn: '← Previous topic',
    nextBtn: 'Next topic →',
    nextStripPrompt:
      'Put what you just read into play or a small daily action:',
    nextPlayBtn: 'Play Brainroot - Truth or Dare →',
    nextOAnQuanLink: 'View 5 topics in Brainroot - Ô ăn quan xanh',
  };
}

export function getGreenConnectCopy(locale: Locale) {
  if (locale === 'vi') {
    return {
      ...GREEN_CONNECT_CONTENT,
      pathwaysEyebrow: 'CÁCH CÙNG THAM GIA',
      pathwaysHeading:
        'Gợi ý đồng hành theo từng vai trò trong cộng đồng học tập',
      aboutBtn: 'Khám phá câu chuyện Brainroot →',
      gamesLink: 'Quay lại thư viện Green Play',
    };
  }

  return {
    eyebrow: 'GREEN CONNECT · LEARNING COMMUNITY',
    heading: 'Connecting classrooms, clubs, and young people for green skills',
    summary:
      'Green Connect brings together students, educators, and youth clubs who want to turn environmental awareness into lively discussions and practical shared habits.',
    pathwaysEyebrow: 'WAYS TO PARTICIPATE',
    pathwaysHeading: 'Practical starting points for every community role',
    pathways: [
      {
        id: 'pathway-students',
        audience: 'Students & Youth',
        title: 'Start with a small challenge and play with friends',
        description:
          'Play Brainroot - Truth or Dare, explore the 3D Ô ăn quan xanh board, or try a one-day refill challenge with your friend group.',
        howToStart: [
          'Open Green Play to try Brainroot - Truth or Dare right in your browser.',
          'Take on the starter plastic-free day challenge in Green Quest.',
          'Browse 5 environmental topics in Green Learn to spark club discussions.',
        ],
        suggestedRouteLabel: 'Start in Green Quest',
        suggestedRouteTo: '/quest',
      },
      {
        id: 'pathway-teachers',
        audience: 'Educators & Facilitators',
        title: 'Bring green scenarios into class warm-ups & workshops',
        description:
          'Pair Brainroot games with structured reflection prompts for 15-minute classroom activities or extracurricular sessions.',
        howToStart: [
          'Use the 5 topics × 3 learning levels on the Ô ăn quan xanh page to frame discussions.',
          'Run a quick Truth or Dare round using the digital card flip and hardcover rulebook.',
          'Follow up with a self-paced Green Quest habit for the week.',
        ],
        suggestedRouteLabel: 'Explore Green Play',
        suggestedRouteTo: '/games',
      },
      {
        id: 'pathway-clubs',
        audience: 'Clubs & Community Groups',
        title: 'Co-create green routines for campus events',
        description:
          'Use Brainroot topics to review cups, power, water, and materials before student meetups and community days.',
        howToStart: [
          'Pick one topic from Green Learn as your monthly club focus.',
          'Invite members to share honest reflections on what makes green habits easy or hard.',
          'Combine physical tabletop sessions with open web previews for new members.',
        ],
        suggestedRouteLabel: 'Read 5 Green Topics',
        suggestedRouteTo: '/learn',
      },
    ],
    contactTransparency: {
      eyebrow: 'COMMUNITY CONTACT',
      heading: 'Official outreach channels are being finalized',
      description:
        'Brainroot does not publish placeholder emails or unverified forms. Official partnership and school contact channels will be shared here as soon as the team confirms them.',
    },
    aboutBtn: 'Explore the Brainroot Story →',
    gamesLink: 'Back to Green Play Library',
  };
}

export function getAboutPageCopy(locale: Locale) {
  if (locale === 'vi') return ABOUT_PAGE_CONTENT;
  return {
    eyebrow: 'ABOUT BRAINROOT',
    heading: 'Bringing green skills into everyday life through playful education',
    missionLabel: 'OUR MISSION',
    missionText:
      'RAISING AWARENESS AND CONNECTING YOUNG PEOPLE WITH GREEN SKILLS THROUGH INTERACTIVE EDUCATIONAL PRODUCTS.',
    introBody:
      'From Brainrot to Brainroot starts from a simple belief: environmental education feels most meaningful when learners can play, talk openly, and act together. Brainroot weaves interactive games, accessible knowledge, and bite-sized challenges into one welcoming space.',
    audienceEyebrow: 'WHO IT IS FOR',
    audienceHeading: 'Who is Brainroot for?',
    audienceCards: [
      {
        title: 'Curious Explorers',
        description:
          'Young people who want to learn about sustainability in an approachable, lively way—starting from small choices in daily life.',
      },
      {
        title: 'Classrooms That Learn & Play',
        description:
          'Teachers and students looking for visual, interactive activities that turn green topics into genuine dialogue and shared practice.',
      },
      {
        title: 'Communities Growing Together',
        description:
          'Student clubs, youth groups, and neighbors building lasting green habits through collaboration and shared stories.',
      },
    ],
    startEyebrow: 'GET STARTED',
    startHeading: 'Begin your green journey with Brainroot',
    startDescription:
      'Choose the doorway that fits your mood today: jump into interactive play, try a small daily action, or read through five core green topics.',
    startActions: [
      { label: 'Explore Games', to: '/games', variant: 'primary' as const },
      { label: 'Green Challenge', to: '/quest', variant: 'secondary' as const },
      { label: 'Explore Green Skills', to: '/learn', variant: 'secondary' as const },
    ],
  };
}

export function getNotFoundCopy(locale: Locale) {
  if (locale === 'en') {
    return {
      eyebrow: '404 · PAGE NOT FOUND',
      heading: 'This path is not yet planted in the Brainroot garden',
      body: 'The link you visited may have moved or is not open yet. You can return to the homepage or explore the Green Play educational game library.',
      homeBtn: 'Back to Brainroot Home',
      gamesBtn: 'Explore Green Play',
    };
  }
  return {
    eyebrow: 'LỖI 404 · KHÔNG TÌM THẤY TRANG',
    heading: 'Lối đi này chưa có trong khu vườn Brainroot',
    body: 'Đường dẫn bạn truy cập có thể đã thay đổi hoặc chưa được mở. Bạn có thể quay lại trang chủ hoặc khám phá thư viện trò chơi giáo dục Green Play.',
    homeBtn: 'Về trang chủ Brainroot',
    gamesBtn: 'Khám phá Green Play',
  };
}
