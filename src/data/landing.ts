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
    subtitle: 'Trò chơi giáo dục tương tác · Trọng tâm R0',
    description:
      'Khám phá Fact–Act với vòng chơi thử mẫu tương tác và Ô ăn quan xanh với bàn gỗ 3D thử nghiệm cùng 5 chủ đề kỹ năng xanh.',
    statusLabel: 'Đã mở · Có chơi thử mẫu',
    note: 'Mở công khai không cần đăng nhập; tách biệt dữ liệu mẫu nội bộ với bộ thẻ vật lý trả phí.',
    variant: 'play',
    ctaLabel: 'Vào khu vườn Green Play',
    ctaTo: '/games',
    emphasis: 'featured',
    imageSrc: publicUrl('/assets/home/garden/green-play.webp'),
    imageAlt:
      'Minh họa khu vực Green Play với bàn gỗ Ô ăn quan xanh và hai thẻ bài lá xanh trên gốc cây trong khu vườn',
  },
  {
    id: 'quest',
    title: 'Green Quest',
    subtitle: 'Thử thách và hành động xanh hằng ngày',
    description:
      'Bắt đầu từ một thử thách thực hành nhỏ gọn trong ngày tại trường học hoặc góc học tập và tự ghi lại dòng phản tư cá nhân.',
    statusLabel: 'Bản khởi đầu cục bộ',
    note: 'Tiến độ lưu cục bộ trên trình duyệt, không yêu cầu tài khoản hay vị trí.',
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
    subtitle: 'Khám phá kiến thức và 5 chủ đề kỹ năng xanh',
    description:
      'Đi qua 5 chủ đề môi trường cốt lõi với mục tiêu học tập rõ ràng, bối cảnh học đường gần gũi và câu hỏi gợi mở thói quen xanh.',
    statusLabel: 'Bản thảo khung · Chờ duyệt BR-T005',
    note: 'Hiển thị rõ trạng thái biên tập nội dung; đang chờ gắn nguồn tham khảo chính thức.',
    variant: 'learn',
    ctaLabel: 'Đọc 5 chủ đề kỹ năng xanh',
    ctaTo: '/learn',
    emphasis: 'standard',
    imageSrc: publicUrl('/assets/home/garden/green-learn.webp'),
    imageAlt:
      'Minh họa khu vực Green Learn với cuốn sổ tay mở vẽ chiếc lá xanh, dải đánh dấu trang và chồi non',
  },
  {
    id: 'connect',
    title: 'Green Connect',
    subtitle: 'Kết nối cộng đồng và hoạt động giáo dục',
    description:
      'Gợi ý cách học sinh, sinh viên, giáo viên và câu lạc bộ (ưu tiên thử nghiệm tại ULIS & Hà Nội) cùng mang Brainroot vào lớp học.',
    statusLabel: 'Hướng dẫn tham gia',
    note: 'Kênh liên hệ và lịch sự kiện chính thức đang chờ nhóm dự án công bố.',
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
    'Từ vòng lặp Fact → Act → Phản tư bạn có thể chơi thử ngay hôm nay, tới bàn gỗ 3D Ô ăn quan xanh kết hợp trò chơi dân gian với 5 chủ đề môi trường.',
  primaryCtaLabel: 'Mở toàn bộ thư viện Green Play',
  primaryCtaTo: '/games',
  items: [
    {
      id: 'fact-act',
      badge: 'Có vòng chơi thử mẫu nội bộ',
      title: 'Fact–Act',
      subtitle: 'Bộ thẻ giáo dục kỹ năng xanh theo vòng lặp Fact → Act → Phản tư',
      description:
        'Đọc một tình huống môi trường gần gũi, chọn hành động khả thi, nhận phản hồi và ghi nhanh dòng phản tư trong 3 phút.',
      primaryActionLabel: 'Chơi thử vòng mẫu ngay',
      primaryActionTo: '/games/fact-act/play',
      secondaryActionLabel: 'Xem chi tiết bộ thẻ',
      secondaryActionTo: '/games/fact-act',
      imageSrc: publicUrl('/assets/hero-v4/fact-act-deck.webp'),
      imageAlt: 'Bộ thẻ bài vật lý Fact–Act của Brainroot',
    },
    {
      id: 'o-an-quan-xanh',
      badge: 'Có bàn gỗ 3D thử nghiệm',
      title: 'Ô ăn quan xanh',
      subtitle: 'Trò chơi dân gian Việt Nam · 5 chủ đề môi trường · 3 cấp độ',
      description:
        'Khám phá mặt bàn gỗ 3D tương tác trực tiếp cùng hệ thống 5 chủ đề môi trường và 3 cấp độ học tập trong khi luật bản số đang chuẩn hóa.',
      primaryActionLabel: 'Khám phá bàn 3D & chủ đề',
      primaryActionTo: '/games/o-an-quan-xanh',
      secondaryActionLabel: 'Mở toàn màn hình sandbox 3D',
      secondaryActionTo: publicUrl('/?preview=oanquan3d'),
      imageSrc: publicUrl('/assets/green-play/vis-008-o-an-quan-concept.webp'),
      imageAlt: 'Minh họa định hướng nghệ thuật bàn gỗ Ô ăn quan xanh',
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
    summary: 'Hiểu rõ nguyên nhân và lựa chọn ưu tiên qua Fact–Act và 5 chủ đề của Green Learn.',
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
    summary: 'Chia sẻ cách làm hay với bạn bè, giáo viên và câu lạc bộ tại ULIS, Hà Nội và rộng hơn.',
  },
];

export const ABOUT_CONTENT = {
  id: 'about',
  overline: 'HÀNH TRÌNH BRAINROOT · FROM BRAINROT TO BRAINROOT',
  heading: 'Nuôi dưỡng kỹ năng xanh từ những bước nhỏ bền bỉ',
  mission:
    'Dự án nâng cao nhận thức và kết nối giới trẻ về kỹ năng xanh thông qua sản phẩm giáo dục tương tác.',
  body: 'Brainroot dành cho mọi người muốn học và thực hành kỹ năng xanh. Ở giai đoạn khởi đầu, nhóm ưu tiên thử nghiệm cùng học sinh, sinh viên, giáo viên và câu lạc bộ tại ULIS và Hà Nội.',
  ctaLabel: 'Đọc thêm về sứ mệnh & minh bạch dự án',
  ctaTo: '/about',
} as const;

export const FOOTER_CONTENT = {
  brandText: 'Brainroot 2.0 · From Brainrot to Brainroot',
  missionShort:
    'Dự án nâng cao nhận thức và kết nối giới trẻ về kỹ năng xanh thông qua sản phẩm giáo dục tương tác.',
  pilotNote:
    'Phục vụ cộng đồng rộng mở · Ưu tiên thử nghiệm ban đầu tại ULIS và Hà Nội · Không yêu cầu đăng nhập để khám phá.',
  transparencyNote:
    'Kênh liên hệ chính thức và nội dung mẫu công khai (BR-T005) đang trong quá trình hoàn thiện và kiểm duyệt.',
} as const;
