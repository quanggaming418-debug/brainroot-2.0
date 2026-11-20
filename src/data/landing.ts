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
  skipLinkHref: '#main-content',
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
    statusLabel: 'Đang phát triển',
    note: 'Bản chơi thử trực tuyến chưa mở.',
    icon: '✦',
    variant: 'play',
  },
  {
    id: 'quest',
    title: 'Green Quest',
    subtitle: 'Thử thách và hành động xanh',
    description:
      'Từ một thử thách nhỏ đến những lựa chọn xanh thiết thực và phản tư tích cực trong đời sống thường ngày.',
    statusLabel: 'Đang phát triển',
    note: 'Các thử thách chưa mở.',
    icon: '❀',
    variant: 'quest',
  },
  {
    id: 'learn',
    title: 'Green Learn',
    subtitle: 'Khám phá kiến thức và kỹ năng xanh',
    description:
      'Tìm hiểu về môi trường qua những câu chuyện gần gũi và kiến thức có nguồn tham khảo.',
    statusLabel: 'Đang phát triển',
    note: 'Kho kiến thức chưa mở.',
    icon: '☘',
    variant: 'learn',
  },
  {
    id: 'connect',
    title: 'Green Connect',
    subtitle: 'Kết nối cộng đồng và hoạt động giáo dục',
    description:
      'Không gian kết nối học sinh, sinh viên, giáo viên và câu lạc bộ cùng tổ chức hoạt động học tập và lan tỏa kỹ năng xanh.',
    statusLabel: 'Đang phát triển',
    note: 'Không gian cộng đồng chưa mở.',
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
  body: 'Brainroot dành cho mọi người muốn học kỹ năng xanh. Dự án ưu tiên thử nghiệm cùng học sinh, sinh viên, giáo viên và câu lạc bộ tại ULIS và Hà Nội.',
} as const;

export const FOOTER_CONTENT = {
  text: 'Brainroot 2.0 · From Brainrot to Brainroot',
} as const;
