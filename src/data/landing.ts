export interface NavItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface DepthLayerConfig {
  readonly id: string;
  readonly src: string;
  readonly strength: number;
}

export interface MascotAssetConfig {
  readonly id: 'brainie' | 'rootie';
  readonly name: string;
  readonly src: string;
  readonly className: string;
}

export interface LeafAssetConfig {
  readonly id: string;
  readonly src: string;
  readonly className: string;
}

export type EcosystemVariant = 'play' | 'quest' | 'learn' | 'connect';

export interface EcosystemArea {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly statusLabel: string;
  readonly note: string;
  readonly icon: string;
  readonly variant: EcosystemVariant;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Khám phá', href: '#worlds' },
  { label: 'Trò chơi', href: '#games' },
  { label: 'Thử thách', href: '#quest' },
  { label: 'Cộng đồng', href: '#connect' },
  { label: 'Về Brainroot', href: '#about' },
];

export const HERO_CONTENT = {
  skipLinkLabel: 'Bỏ qua và đến nội dung chính',
  skipLinkHref: '#worlds',
  brandAriaLabel: 'Brainroot — về đầu trang',
  heroAriaLabel: 'Chào mừng đến với thế giới Brainroot',
  slogan: 'From Brainrot to Brainroot',
  heading: 'Brainroot',
  statementLine1: 'Học điều xanh, chơi điều hay,',
  statementLine2: 'cùng nhau tạo thay đổi.',
  primaryCtaLabel: 'Khám phá thế giới Brainroot',
  primaryCtaHref: '#worlds',
  scrollHintLabel: 'Cuộn xuống khám phá',
  fallbackSceneSrc: '/assets/hero-v4/hero-garden-v4.webp',
} as const;

export const HERO_DEPTH_LAYERS: readonly DepthLayerConfig[] = [
  { id: 'sky', src: '/assets/hero-v4/depth-01-sky.webp', strength: 0.11 },
  { id: 'hills', src: '/assets/hero-v4/depth-02-hills.webp', strength: 0.28 },
  {
    id: 'foreground',
    src: '/assets/hero-v4/depth-03-foreground.webp',
    strength: 0.52,
  },
];

export const HERO_MASCOTS: readonly MascotAssetConfig[] = [
  {
    id: 'brainie',
    name: 'Brainie',
    src: '/assets/hero-v4/brainie.webp',
    className: 'mascot mascot--brainie',
  },
  {
    id: 'rootie',
    name: 'Rootie',
    src: '/assets/hero-v4/rootie.webp',
    className: 'mascot mascot--rootie',
  },
];

export const HERO_LEAVES: readonly LeafAssetConfig[] = [
  {
    id: 'leaf-sage',
    src: '/assets/hero-v4/floating-leaf-sage.svg',
    className: 'leaf leaf--one',
  },
  {
    id: 'leaf-peach',
    src: '/assets/hero-v4/floating-leaf-peach.svg',
    className: 'leaf leaf--two',
  },
];

export const ECOSYSTEM_SECTION = {
  id: 'worlds',
  overline: 'HỆ SINH THÁI BRAINROOT',
  heading: 'Một thế giới xanh, nhiều cách khám phá.',
  summary:
    'Chơi để tò mò, học để hiểu, thực hành mỗi ngày và kết nối cộng đồng để cùng tạo nên những thay đổi tích cực trong cuộc sống.',
} as const;

export const ECOSYSTEM_AREAS: readonly EcosystemArea[] = [
  {
    id: 'games',
    title: 'Green Play',
    subtitle: 'Trò chơi giáo dục tương tác',
    description:
      'Fact–Act và Ô ăn quan xanh là hai sản phẩm đầu tiên trong hành trình học kỹ năng xanh thông qua trò chơi trực quan.',
    statusLabel: 'Đang phát triển (R0)',
    note: 'Giới thiệu định hướng — danh mục và bản chơi thử sẽ triển khai ở bước tiếp theo',
    icon: '✦',
    variant: 'play',
  },
  {
    id: 'quest',
    title: 'Green Quest',
    subtitle: 'Thử thách và hành động xanh',
    description:
      'Từ một thử thách nhỏ đến những lựa chọn xanh thiết thực và phản tư tích cực trong đời sống thường ngày.',
    statusLabel: 'Định hướng lộ trình',
    note: 'Khu vực giới thiệu — chưa mở tương tác thử thách trong bản nền này',
    icon: '❀',
    variant: 'quest',
  },
  {
    id: 'learn',
    title: 'Green Learn',
    subtitle: 'Khám phá kiến thức và kỹ năng xanh',
    description:
      'Những câu chuyện, sự thật và kiến thức môi trường gần gũi, được kiểm chứng và trích dẫn từ các nguồn phù hợp.',
    statusLabel: 'Định hướng lộ trình',
    note: 'Khu vực giới thiệu — kho nội dung kiểm chứng sẽ được bổ sung theo giai đoạn',
    icon: '☘',
    variant: 'learn',
  },
  {
    id: 'connect',
    title: 'Green Connect',
    subtitle: 'Kết nối cộng đồng và hoạt động giáo dục',
    description:
      'Không gian kết nối học sinh, sinh viên, giáo viên và câu lạc bộ cùng tổ chức hoạt động học tập và lan tỏa kỹ năng xanh.',
    statusLabel: 'Định hướng lộ trình',
    note: 'Khu vực giới thiệu — không gian cộng đồng và lớp học sẽ phát triển ở giai đoạn sau',
    icon: '❂',
    variant: 'connect',
  },
];

export const ABOUT_CONTENT = {
  id: 'about',
  overline: 'VỀ BRAINROOT',
  heading: 'From Brainrot to Brainroot',
  mission:
    'Dự án nâng cao nhận thức và kết nối giới trẻ về kỹ năng xanh thông qua sản phẩm giáo dục tương tác.',
  body: 'Brainroot hướng tới mọi người học, ưu tiên thử nghiệm cùng học sinh, sinh viên, giáo viên và câu lạc bộ tại ULIS và Hà Nội. Phiên bản hiện tại là khung giao diện nền tảng Hero V4 (BR-T003); các chức năng trò chơi tương tác, danh mục sản phẩm và trải nghiệm học tập sẽ được xây dựng lần lượt theo lộ trình sản phẩm.',
} as const;

export const FOOTER_CONTENT = {
  text: 'Brainroot 2.0 · From Brainrot to Brainroot — Phiên bản nền tảng giao diện Hero V4 (BR-T003).',
} as const;
