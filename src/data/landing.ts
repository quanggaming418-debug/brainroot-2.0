import { publicUrl } from '../utils/publicUrl';
export interface NavItem {
  readonly label: string;
  readonly href: `/${string}` | `#${string}`;
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
  readonly variant: EcosystemVariant;
  readonly ctaLabel: string;
  readonly ctaTo: string;
  readonly emphasis: 'featured' | 'standard';
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export interface LearningJourneyStage {
  readonly stepNumber: string;
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly summary: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Khám phá', href: '#worlds' },
  { label: 'Trò chơi', href: '/games' },
  { label: 'Thử thách', href: '/quest' },
  { label: 'Kiến thức', href: '/learn' },
  { label: 'Cộng đồng', href: '/connect' },
  { label: 'Về Brainroot', href: '/about' },
];

export const HERO_CONTENT = {
  skipLinkLabel: 'Bỏ qua và đến nội dung chính',
  skipLinkHref: '#main-content',
  brandAriaLabel: 'Brainroot — về trang chủ',
  heroAriaLabel: 'Chào mừng đến với thế giới Brainroot',
  slogan: 'From Brainrot to Brainroot',
  heading: 'Brainroot',
  statementLine1: 'Học điều xanh, chơi điều hay,',
  statementLine2: 'cùng nhau tạo thay đổi.',
  primaryCtaLabel: 'Khám phá thế giới Brainroot',
  primaryCtaHref: '#worlds',
  scrollHintLabel: 'Cuộn xuống khám phá',
  fallbackSceneSrc: publicUrl('/assets/hero-v4/hero-garden-v4.webp'),
} as const;

export const HERO_DEPTH_LAYERS: readonly DepthLayerConfig[] = [
  { id: 'sky', src: publicUrl('/assets/hero-v4/depth-01-sky.webp'), strength: 0.11 },
  { id: 'hills', src: publicUrl('/assets/hero-v4/depth-02-hills.webp'), strength: 0.28 },
  {
    id: 'foreground',
    src: publicUrl('/assets/hero-v4/depth-03-foreground.webp'),
    strength: 0.52,
  },
];

export const HERO_MASCOTS: readonly MascotAssetConfig[] = [
  {
    id: 'brainie',
    name: 'Brainie',
    src: publicUrl('/assets/hero-v4/brainie.webp'),
    className: 'mascot mascot--brainie',
  },
  {
    id: 'rootie',
    name: 'Rootie',
    src: publicUrl('/assets/hero-v4/rootie.webp'),
    className: 'mascot mascot--rootie',
  },
];

export const HERO_LEAVES: readonly LeafAssetConfig[] = [
  {
    id: 'leaf-sage',
    src: publicUrl('/assets/hero-v4/floating-leaf-sage.svg'),
    className: 'leaf leaf--one',
  },
  {
    id: 'leaf-peach',
    src: publicUrl('/assets/hero-v4/floating-leaf-peach.svg'),
    className: 'leaf leaf--two',
  },
];

export const ECOSYSTEM_SECTION = {
  id: 'worlds',
  overline: 'BỐN KHU VỰC CỦA THẾ GIỚI BRAINROOT',
  heading: 'Một khu vườn xanh, bốn lối bước vào hành trình bền vững.',
  summary:
    'Chơi để tò mò, thử thách để hành động, đọc để hiểu sâu và kết nối cộng đồng học đường để cùng tạo nên những thay đổi tích cực.',
} as const;

export const ECOSYSTEM_AREAS: readonly EcosystemArea[] = [
  {
    id: 'games',
    title: 'Green Play',
    subtitle: 'Trò chơi giáo dục kỹ năng xanh',
    description:
      'Trải nghiệm thử Brainroot - Truth or Dare và khám phá bàn gỗ 3D Brainroot - Ô ăn quan xanh.',
    statusLabel: 'Đã mở · Có bản trải nghiệm thử',
    note: 'Mở tự do không cần đăng nhập · Nội dung chính thức đang hoàn thiện.',
    variant: 'play',
    ctaLabel: 'Khám phá Green Play',
    ctaTo: '/games',
    emphasis: 'featured',
    imageSrc: publicUrl('/assets/home/garden/green-play.webp'),
    imageAlt:
      'Minh họa khu vực Green Play với bàn gỗ Brainroot - Ô ăn quan xanh và hai thẻ bài lá xanh trên gốc cây trong khu vườn',
  },
  {
    id: 'quest',
    title: 'Green Quest',
    subtitle: 'Thử thách xanh nhỏ gọn mỗi ngày',
    description:
      'Thực hành một hành động xanh tại trường học hoặc góc học tập và ghi nhanh dòng phản tư.',
    statusLabel: 'Đã mở · Lưu trên trình duyệt',
    note: 'Lưu ngay trên máy, không cần tài khoản hay vị trí.',
    variant: 'quest',
    ctaLabel: 'Mở thử thách khởi đầu',
    ctaTo: '/quest',
    emphasis: 'standard',
    imageSrc: publicUrl('/assets/home/garden/green-quest.webp'),
    imageAlt:
      'Minh họa khu vực Green Quest với bình nước cá nhân, bảng chỉ đường gỗ và chồi non trên bãi cỏ',
  },
  {
    id: 'learn',
    title: 'Green Learn',
    subtitle: '5 chủ đề kỹ năng xanh cốt lõi',
    description:
      'Tìm hiểu tiêu dùng bền vững, nước, năng lượng, rác thải và không gian xanh học đường.',
    statusLabel: 'Bản thảo khung · Đang kiểm duyệt',
    note: 'Nội dung và nguồn tham khảo chính thức đang được hoàn thiện.',
    variant: 'learn',
    ctaLabel: 'Xem 5 chủ đề kỹ năng xanh',
    ctaTo: '/learn',
    emphasis: 'standard',
    imageSrc: publicUrl('/assets/home/garden/green-learn.webp'),
    imageAlt:
      'Minh họa khu vực Green Learn với cuốn sổ tay mở vẽ chiếc lá xanh, dải đánh dấu trang và chồi non',
  },
  {
    id: 'connect',
    title: 'Green Connect',
    subtitle: 'Kết nối lớp học và cộng đồng trẻ',
    description:
      'Gợi ý hoạt động cho học sinh, sinh viên, giáo viên và câu lạc bộ, thí điểm tại ULIS & Hà Nội.',
    statusLabel: 'Hướng dẫn tham gia thử nghiệm',
    note: 'Kênh liên hệ và lịch sự kiện chính thức đang chờ công bố.',
    variant: 'connect',
    ctaLabel: 'Xem cách cùng tham gia',
    ctaTo: '/connect',
    emphasis: 'standard',
    imageSrc: publicUrl('/assets/home/garden/green-connect.webp'),
    imageAlt:
      'Minh họa khu vực Green Connect với ghế gỗ công viên, bảng tin cộng đồng treo cờ giấy và chậu cây xanh',
  },
];

export const FEATURED_GREEN_PLAY = {
  id: 'featured-play',
  overline: 'ĐIỂM NỔI BẬT TRONG GREEN PLAY',
  heading: 'Hai sản phẩm mở đường từ nhận thức tới hành động xanh',
  summary:
    'Khám phá bộ thẻ kỹ năng xanh Brainroot - Truth or Dare cùng bản trải nghiệm thử trên web, và bàn gỗ 3D Brainroot - Ô ăn quan xanh gắn liền 5 chủ đề môi trường.',
  primaryCtaLabel: 'Mở toàn bộ thư viện Green Play',
  primaryCtaTo: '/games',
  items: [
    {
      id: 'fact-act',
      badge: 'Có bản trải nghiệm thử trên web',
      title: 'Brainroot - Truth or Dare',
      subtitle: 'Bộ thẻ giáo dục kỹ năng xanh khơi gợi đối thoại và hành động đời thường',
      description:
        'Sản phẩm thẻ bài vật lý giúp học sinh, sinh viên và nhóm bạn trò chuyện cởi mở về lối sống xanh. Bạn có thể chơi thử 20 trong 63 thẻ ngay trên web; bộ đầy đủ có ở bản thẻ vật lý.',
      primaryActionLabel: 'Trải nghiệm thử ngay',
      primaryActionTo: '/games/fact-act/play',
      secondaryActionLabel: 'Xem giới thiệu sản phẩm',
      secondaryActionTo: '/games/fact-act',
      imageSrc: publicUrl('/assets/hero-v4/fact-act-deck.webp'),
      imageAlt: 'Bộ thẻ bài vật lý Brainroot - Truth or Dare',
    },
    {
      id: 'o-an-quan-xanh',
      badge: 'Có bàn gỗ 3D thử nghiệm',
      title: 'Brainroot - Ô ăn quan xanh',
      subtitle: 'Trò chơi dân gian Việt Nam · 5 chủ đề môi trường · 3 cấp độ',
      description:
        'Khám phá mặt bàn gỗ 3D tương tác trực tiếp cùng hệ thống 5 chủ đề môi trường và 3 cấp độ học tập trong khi luật bản số đang chuẩn hóa.',
      primaryActionLabel: 'Khám phá bàn 3D & chủ đề',
      primaryActionTo: '/games/o-an-quan-xanh',
      secondaryActionLabel: 'Mở toàn màn hình bàn gỗ 3D',
      secondaryActionTo: publicUrl('/?preview=oanquan3d'),
      imageSrc: publicUrl('/assets/green-play/vis-008-o-an-quan-concept.webp'),
      imageAlt: 'Minh họa định hướng nghệ thuật bàn gỗ Brainroot - Ô ăn quan xanh',
      disclosure: 'Minh họa định hướng nghệ thuật · Bản 3D tương tác ở chế độ thử nghiệm.',
    },
  ],
} as const;

export const LEARNING_JOURNEY_STAGES: readonly LearningJourneyStage[] = [
  {
    stepNumber: '01',
    id: 'seed',
    label: 'Hạt giống',
    title: 'Khơi gợi sự tò mò xanh',
    summary: 'Bắt đầu nhẹ nhàng bằng trò chơi và câu chuyện gần gũi thay vì lý thuyết nặng nề.',
  },
  {
    stepNumber: '02',
    id: 'sprout',
    label: 'Nảy mầm',
    title: 'Nhận diện vấn đề đời thường',
    summary: 'Quan sát thói quen tiêu dùng, nước, điện, rác thải và cây xanh ngay quanh trường học.',
  },
  {
    stepNumber: '03',
    id: 'understand',
    label: 'Hiểu biết',
    title: 'Nắm vững kiến thức nền',
    summary:
      'Tìm hiểu nguyên nhân và lựa chọn ưu tiên qua Green Learn, Brainroot - Truth or Dare và Brainroot - Ô ăn quan xanh.',
  },
  {
    stepNumber: '04',
    id: 'act',
    label: 'Hành động',
    title: 'Thực hành lựa chọn khả thi',
    summary: 'Chuyển nhận thức thành một thử thách nhỏ thực tế trong ngày qua Green Quest.',
  },
  {
    stepNumber: '05',
    id: 'connect',
    label: 'Kết nối',
    title: 'Lan tỏa cùng lớp học & cộng đồng',
    summary: 'Chia sẻ cách làm hay với bạn bè, lớp học và cộng đồng cùng hướng tới lối sống xanh.',
  },
];

export const ABOUT_CONTENT = {
  id: 'about',
  overline: 'CÂU CHUYỆN BRAINROOT · FROM BRAINROT TO BRAINROOT',
  heading: 'Nuôi dưỡng kỹ năng xanh từ những bước nhỏ bền bỉ',
  mission:
    'Đưa kỹ năng xanh đến gần giới trẻ bằng những trải nghiệm giáo dục tương tác, gần gũi và giàu tính kết nối.',
  body: 'Brainroot là không gian học tập tương tác dành cho người trẻ, lớp học và cộng đồng cùng khám phá kiến thức môi trường qua trò chơi, thử thách và những hành động nhỏ mỗi ngày.',
  ctaLabel: 'Đọc câu chuyện Brainroot',
  ctaTo: '/about',
} as const;

export const FOOTER_CONTENT = {
  brandText: 'From Brainrot to Brainroot',
  missionShort:
    'Khám phá kỹ năng xanh qua trò chơi, kiến thức và những hành động nhỏ trong cuộc sống hằng ngày.',
  copyrightText: '© 2026 Brainroot',
  bottomSlogan: 'Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi.',
} as const;
