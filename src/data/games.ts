import { publicUrl } from '../utils/publicUrl';
export interface GameSpecItem {
  readonly label: string;
  readonly value: string;
}

export interface GameProductSummary {
  readonly id: 'fact-act' | 'o-an-quan-xanh';
  readonly slug: '/games/fact-act' | '/games/o-an-quan-xanh';
  readonly title: string;
  readonly subtitle: string;
  readonly statusLabel: string;
  readonly statusTone: 'peach' | 'sage';
  readonly description: string;
  readonly ctaLabel: string;
  readonly secondaryCtaLabel?: string;
  readonly secondaryCtaTo?: string;
  readonly mediaLayout: 'media-left' | 'media-right';
  readonly media: {
    readonly desktopSrc: string;
    readonly mobileSrc?: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly variant: 'product-cutout' | 'concept-illustration';
    readonly disclosureCaption?: string;
  };
  readonly specs: readonly GameSpecItem[];
}

export interface LearningLoopStep {
  readonly stepNumber: string;
  readonly code: string;
  readonly title: string;
  readonly summary: string;
}

export interface ComparisonColumn {
  readonly heading: string;
  readonly badge: string;
  readonly points: readonly string[];
}

export interface OAnQuanTopic {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly exampleFocus: string;
}

export interface OAnQuanLevel {
  readonly levelNumber: string;
  readonly title: string;
  readonly focus: string;
  readonly classroomPrompt: string;
}

export const O_AN_QUAN_CONCEPT_DISCLOSURE =
  'Minh họa khái niệm — luật bản số đang chuẩn hóa.' as const;

export const GREEN_PLAY_LIBRARY_INTRO = {
  eyebrow: 'THƯ VIỆN TRÒ CHƠI GIÁO DỤC',
  heading: 'Hai sản phẩm mở đầu cho hành trình kỹ năng xanh',
  summary:
    'Mỗi trò chơi trong Green Play được thiết kế để người học vừa tương tác trực quan, vừa thảo luận và thực hành kỹ năng xanh trong đời sống học đường và cộng đồng — mở công khai để khám phá không cần đăng nhập.',
} as const;

export const GREEN_PLAY_PRODUCTS: readonly GameProductSummary[] = [
  {
    id: 'fact-act',
    slug: '/games/fact-act',
    title: 'Brainroot - Truth or Dare',
    subtitle: 'Bộ thẻ giáo dục kỹ năng xanh khơi gợi đối thoại cởi mở và hành động thực tế',
    statusLabel: 'Bộ thẻ vật lý · Đã mở bản trải nghiệm thử trên web',
    statusTone: 'peach',
    description:
      'Brainroot - Truth or Dare là bộ thẻ bài giáo dục của Brainroot giúp học sinh, sinh viên và nhóm bạn trẻ khám phá kỹ năng xanh qua các cuộc trò chuyện gần gũi. Thể lệ và bộ thẻ chính thức đang được đội ngũ hoàn thiện; bạn có thể trải nghiệm trước bản chơi thử tình huống ngắn trên web.',
    ctaLabel: 'Trải nghiệm thử trên web',
    secondaryCtaLabel: 'Xem giới thiệu sản phẩm',
    secondaryCtaTo: '/games/fact-act',
    mediaLayout: 'media-left',
    media: {
      desktopSrc: publicUrl('/assets/hero-v4/fact-act-deck.webp'),
      width: 1024,
      height: 1024,
      alt: 'Bộ thẻ bài vật lý Brainroot - Truth or Dare với thiết kế minh họa môi trường tông màu ấm và xanh lá',
      variant: 'product-cutout',
    },
    specs: [
      { label: 'Hình thức', value: 'Bộ thẻ bài vật lý & bản trải nghiệm thử trên web' },
      { label: 'Đối tượng', value: 'Học sinh, sinh viên, giáo viên và nhóm câu lạc bộ' },
      {
        label: 'Hiện trạng',
        value: 'Mở chơi thử tự do không cần đăng nhập · Thể lệ và bộ thẻ công khai đang hoàn thiện',
      },
    ],
  },
  {
    id: 'o-an-quan-xanh',
    slug: '/games/o-an-quan-xanh',
    title: 'Brainroot - Ô ăn quan xanh',
    subtitle: 'Trò chơi dân gian Việt Nam kết hợp 5 chủ đề môi trường và 3 cấp độ học tập',
    statusLabel: 'Bàn gỗ 3D thử nghiệm · Luật bản số đang chuẩn hóa',
    statusTone: 'sage',
    description:
      'Lấy cảm hứng từ trò chơi dân gian Ô ăn quan quen thuộc, Brainroot - Ô ăn quan xanh kết hợp mặt bàn gỗ 3D tương tác với các tình huống học tập về tiêu dùng, nước, năng lượng, rác thải và không gian xanh.',
    ctaLabel: 'Khám phá bàn 3D & 5 chủ đề',
    mediaLayout: 'media-right',
    media: {
      desktopSrc: publicUrl('/assets/green-play/vis-008-o-an-quan-concept.webp'),
      mobileSrc: publicUrl('/assets/green-play/vis-008-o-an-quan-concept-sm.webp'),
      width: 1080,
      height: 720,
      alt: 'Minh họa khái niệm bàn chơi Brainroot - Ô ăn quan xanh trên mặt bàn gỗ ấm cùng các viên sỏi và yếu tố thiên nhiên',
      variant: 'concept-illustration',
      disclosureCaption: O_AN_QUAN_CONCEPT_DISCLOSURE,
    },
    specs: [
      { label: 'Chủ đề', value: '5 chủ đề môi trường cốt lõi' },
      { label: 'Cấp độ', value: 'Nhận biết · Ra quyết định · Giải quyết vấn đề' },
      {
        label: 'Hiện trạng',
        value: 'Đã tích hợp bàn gỗ 3D thử nghiệm; luật chơi bản số đang được chuẩn hóa',
      },
    ],
  },
];

export const PHYGITAL_TRANSPARENCY = {
  eyebrow: 'TRIẾT LÝ PHYGITAL · VẬT LÝ & SỐ',
  heading: 'Từ bàn chơi trực tiếp đến trải nghiệm số minh bạch',
  summary:
    'Brainroot không thay thế niềm vui cầm thẻ hay ngồi quanh bàn chơi cùng bạn bè. Nền tảng số mở rộng cơ hội tiếp cận cho học sinh, sinh viên, giáo viên và câu lạc bộ tại ULIS, Hà Nội và cộng đồng rộng hơn.',
  pillars: [
    {
      title: 'Khám phá công khai không rào cản',
      description:
        'Khách truy cập có thể xem giới thiệu sản phẩm, trải nghiệm thử Brainroot - Truth or Dare và thử bàn gỗ 3D Brainroot - Ô ăn quan xanh mà không phải tạo tài khoản.',
    },
    {
      title: 'Tôn trọng giá trị bộ thẻ vật lý',
      description:
        'Bản chơi thử số sử dụng tình huống mẫu tách biệt, không công khai nội dung của bộ thẻ vật lý gốc.',
    },
    {
      title: 'Minh bạch tiến độ hoàn thiện',
      description:
        'Mọi phần đang được đội ngũ biên tập nội dung kiểm duyệt hoặc chuẩn hóa luật chơi đều được ghi rõ trạng thái ngay tại nơi trải nghiệm.',
    },
  ],
} as const;

export const FACT_ACT_DETAIL = {
  title: 'Brainroot - Truth or Dare',
  eyebrow: 'GREEN PLAY · BỘ THẺ GIÁO DỤC',
  statusLabel: 'Bộ thẻ vật lý · Bản trải nghiệm thử trên web đang mở',
  tagline: 'Khơi gợi cuộc trò chuyện cởi mở về lối sống xanh và thói quen bền vững hằng ngày.',
  overview:
    'Brainroot - Truth or Dare là bộ thẻ giáo dục tương tác giúp người trẻ tiếp cận kỹ năng xanh một cách nhẹ nhàng và chủ động cùng lớp học, câu lạc bộ hoặc nhóm bạn. Trong khi đội ngũ Brainroot hoàn thiện thể lệ chính thức và phiên bản thẻ số hai mặt, bạn có thể thử trước bản trải nghiệm tình huống ngắn ngay trên trình duyệt.',
  trialCtaLabel: 'Mở bản trải nghiệm thử trên web',
  trialCtaTo: '/games/fact-act/play',
  specs: [
    { label: 'Định dạng', value: 'Bộ thẻ bài vật lý gốc & trải nghiệm thử trên web' },
    { label: 'Đối tượng phù hợp', value: 'Học sinh, sinh viên, giáo viên và câu lạc bộ' },
    {
      label: 'Thể lệ & bộ thẻ số',
      value: 'Thể lệ chính thức và phiên bản thẻ số hai mặt đang được đội ngũ hoàn thiện',
    },
    {
      label: 'Trải nghiệm hiện tại',
      value: 'Bản chơi thử tình huống ngắn mở tự do, không cần đăng nhập và không lộ thẻ vật lý',
    },
  ] as readonly GameSpecItem[],
  learningLoopHeading: 'Định hướng học tập trong bản chơi thử hiện tại',
  learningLoopSummary:
    'Bản chơi thử trên web hiện minh họa trước quy trình 3 bước tình huống học đường để bạn làm quen với chủ đề xanh. Thể lệ chơi chính thức của Brainroot - Truth or Dare sẽ được cập nhật ngay khi đội ngũ hoàn tất xác nhận.',
  learningSteps: [
    {
      stepNumber: '01',
      code: 'TÌNH HUỐNG',
      title: 'Đọc bối cảnh gần gũi',
      summary:
        'Khởi đầu từ một tình huống môi trường quen thuộc trong lớp học, câu lạc bộ hoặc sinh hoạt hằng ngày.',
    },
    {
      stepNumber: '02',
      code: 'HÀNH ĐỘNG',
      title: 'Cân nhắc lựa chọn khả thi',
      summary:
        'Cùng thảo luận các hướng ứng xử thực tế phù hợp với hoàn cảnh cá nhân, lớp học hoặc cộng đồng xung quanh.',
    },
    {
      stepNumber: '03',
      code: 'PHẢN TƯ',
      title: 'Nhìn lại và kết nối thói quen',
      summary:
        'Chia sẻ góc nhìn cá nhân, rào cản khi áp dụng và cách duy trì những thay đổi nhỏ nhưng bền bỉ.',
    },
  ] as readonly LearningLoopStep[],
  comparisonHeading: 'Bộ thẻ vật lý và bản chơi thử trên web',
  comparisonSummary:
    'Hai hình thức bổ trợ cho nhau trong hoạt động giáo dục, đồng thời giữ ranh giới minh bạch về phạm vi nội dung.',
  comparisonColumns: [
    {
      heading: 'Bộ thẻ vật lý Brainroot - Truth or Dare',
      badge: 'Sản phẩm hiện hữu',
      points: [
        'Trải nghiệm cầm nắm trực tiếp, phù hợp cho lớp học, workshop và nhóm bạn ngồi cùng nhau.',
        'Sở hữu trọn vẹn hệ thống thẻ bài và thiết kế minh họa gốc của nhóm Brainroot.',
        'Hỗ trợ hoạt động dẫn dắt trực tiếp bởi giáo viên hoặc điều phối viên câu lạc bộ.',
      ],
    },
    {
      heading: 'Bản trải nghiệm thử trên web hiện tại',
      badge: 'Đang hoàn thiện thể lệ chính thức',
      points: [
        'Mở tự do trên trình duyệt không cần đăng nhập với 3 tình huống học đường minh họa để làm quen chủ đề kỹ năng xanh.',
        'Tách biệt hoàn toàn với nội dung bộ thẻ vật lý gốc; thể lệ và bộ thẻ số công khai chính thức sẽ cập nhật sau khi hoàn tất biên tập.',
        'Hỗ trợ điều hướng bàn phím đầy đủ, chế độ giảm chuyển động và đọc văn bản rõ ràng.',
      ],
    },
  ] as readonly ComparisonColumn[],
  unavailableNotice: {
    heading: 'Cập nhật về bộ thẻ công khai Brainroot - Truth or Dare',
    description:
      'Bạn có thể mở bản trải nghiệm thử trên web ngay bây giờ để làm quen với các tình huống học đường về kỹ năng xanh. Bộ thẻ mẫu công khai có nguồn tham khảo và thể lệ chơi chính thức cho phiên bản web đang được đội ngũ Brainroot hoàn thiện và kiểm duyệt.',
    primaryActionLabel: 'Mở bản trải nghiệm thử',
    primaryActionTo: '/games/fact-act/play',
    secondaryActionLabel: 'Quay lại thư viện Green Play',
    secondaryActionTo: '/games',
  },
} as const;

export const O_AN_QUAN_DETAIL = {
  title: 'Brainroot - Ô ăn quan xanh',
  eyebrow: 'GREEN PLAY · TRÒ CHƠI DÂN GIAN & KỸ NĂNG XANH',
  statusLabel: 'Bàn gỗ 3D thử nghiệm · Luật bản số đang chuẩn hóa',
  tagline: 'Gắn kết trò chơi dân gian Việt Nam với tư duy giải quyết vấn đề môi trường.',
  overview:
    'Brainroot - Ô ăn quan xanh kết hợp nhịp chơi gần gũi của trò chơi dân gian Ô ăn quan với nội dung giáo dục kỹ năng xanh. Ngay trên trang này, bạn có thể tương tác trực tiếp với bàn gỗ 3D thử nghiệm và khám phá 5 chủ đề môi trường cùng 3 cấp độ học tập.',
  disclosure: O_AN_QUAN_CONCEPT_DISCLOSURE,
  specs: [
    { label: 'Chủ đề giáo dục', value: '5 chủ đề môi trường' },
    { label: 'Tiến trình năng lực', value: '3 cấp độ học tập' },
    { label: 'Bàn gỗ 3D', value: 'Đã tích hợp chế độ thử nghiệm trực tiếp (có điều khiển bàn phím)' },
    { label: 'Luật chơi chính thức', value: 'Luật bản số và bộ tình huống đang được chuẩn hóa' },
  ] as readonly GameSpecItem[],
  topicsHeading: '5 chủ đề môi trường trọng tâm',
  topicsSummary:
    'Các tình huống học tập của Brainroot - Ô ăn quan xanh xoay quanh 5 nhóm chủ đề môi trường gần gũi với đời sống học sinh, sinh viên và cộng đồng đô thị. Lưu ý: các ô trên bàn 3D hiện chưa gán cố định từng chủ đề trong khi luật chơi chính thức đang được chuẩn hóa.',
  topics: [
    {
      id: 'sustainable-consumption',
      title: 'Tiêu dùng bền vững',
      description:
        'Cân nhắc nhu cầu thực sự, vòng đời sản phẩm và thói quen mua sắm có trách nhiệm.',
      exampleFocus: 'Tái sử dụng giáo trình, đồ dùng sự kiện và cân nhắc trước khi mua mới.',
    },
    {
      id: 'water',
      title: 'Nước',
      description:
        'Nhận thức giá trị nguồn nước sạch, sử dụng tiết kiệm và bảo vệ môi trường nước quanh ta.',
      exampleFocus: 'Khóa vòi nước đúng lúc và phát hiện sớm điểm rò rỉ trong khuôn viên học tập.',
    },
    {
      id: 'energy',
      title: 'Năng lượng',
      description:
        'Hiểu cách sử dụng điện năng hiệu quả và giảm lãng phí năng lượng trong sinh hoạt hằng ngày.',
      exampleFocus: 'Tắt đèn, quạt, máy chiếu khi phòng học trống và tận dụng ánh sáng tự nhiên.',
    },
    {
      id: 'waste',
      title: 'Rác thải',
      description:
        'Thực hành giảm thiểu, tái sử dụng, phân loại rác đúng cách và hạn chế nhựa dùng một lần.',
      exampleFocus: 'Ưu tiên bình cá nhân và giảm rác ngay từ khâu chuẩn bị buổi sinh hoạt.',
    },
    {
      id: 'green-spaces',
      title: 'Không gian xanh',
      description:
        'Gìn giữ cây xanh, đa dạng sinh học đô thị và nuôi dưỡng môi trường sống trong lành.',
      exampleFocus: 'Chăm sóc và giữ vệ sinh mảng xanh sân trường, góc học tập và khu dân cư.',
    },
  ] as readonly OAnQuanTopic[],
  levelsHeading: '3 cấp độ học tập',
  levelsSummary:
    'Cấu trúc câu hỏi và tình huống được phân tầng để người học đi từ hiểu biết nền tảng đến tư duy hành động tập thể.',
  levels: [
    {
      levelNumber: 'Cấp độ 1',
      title: 'Nhận biết',
      focus: 'Nhận diện đúng hiện tượng, khái niệm và tác động môi trường trong bối cảnh gần gũi.',
      classroomPrompt: 'Ví dụ định hướng: Gọi tên loại rác dễ giảm nhất trong một buổi họp câu lạc bộ.',
    },
    {
      levelNumber: 'Cấp độ 2',
      title: 'Ra quyết định',
      focus: 'So sánh các phương án ứng xử xanh và chọn lựa phù hợp với điều kiện thực tế.',
      classroomPrompt: 'Ví dụ định hướng: So sánh phương án mang bình cá nhân với phương án thu gom ly nhựa.',
    },
    {
      levelNumber: 'Cấp độ 3',
      title: 'Giải quyết vấn đề',
      focus: 'Kết hợp nhiều góc nhìn để đề xuất cách xử lý bền vững cho lớp học, câu lạc bộ hoặc cộng đồng.',
      classroomPrompt: 'Ví dụ định hướng: Thiết kế quy ước tiết kiệm điện nước dễ duy trì cho cả lớp trong một học kỳ.',
    },
  ] as readonly OAnQuanLevel[],
  roadmapHeading: 'Định hướng bản số tương lai và hiện trạng hiện tại',
  roadmapSummary:
    'Brainroot tách bạch rõ ràng giữa tầm nhìn thiết kế dài hạn và phần đã sẵn sàng hôm nay để người dùng và giáo viên nắm đúng thực tế.',
  roadmapColumns: [
    {
      heading: 'Định hướng bản số tương lai',
      badge: 'Lộ trình phát triển',
      points: [
        'Áp dụng bộ luật chơi bản số chính thức sau khi hoàn tất chuẩn hóa cùng hệ thống tình huống 5 chủ đề × 3 cấp độ.',
        'Phòng chơi riêng trực tuyến theo mã phòng dành cho lớp học, nhóm bạn và câu lạc bộ.',
        'Luôn duy trì điều khiển bàn phím và lưới ô dễ tiếp cận song song với mặt bàn 3D.',
      ],
    },
    {
      heading: 'Hiện trạng hiện tại',
      badge: 'Đã có bàn gỗ 3D thử nghiệm',
      points: [
        'Bàn gỗ 3D tương tác đã được tích hợp ngay trên trang này ở chế độ thử nghiệm chuyển hạt đơn lẻ.',
        'Chưa áp đặt luật rải quân, ăn quan hay tính điểm chính thức; chưa mở phòng chơi nhiều người trực tuyến.',
        'Hình minh họa khái niệm chỉ đóng vai trò định hướng nghệ thuật ban đầu, tách biệt với bản 3D đang chạy.',
      ],
    },
  ] as readonly ComparisonColumn[],
  unavailableNotice: {
    heading: 'Ván chơi thi đấu & phòng trực tuyến Brainroot - Ô ăn quan xanh chưa mở',
    description:
      'Luật chơi bản số chính thức đang được chuẩn hóa để bảo đảm tính giáo dục và sự công bằng trước khi phát hành. Hiện bạn có thể thử thao tác chọn ô, di chuyển hạt trên bàn gỗ 3D ở phía trên và đọc 5 chủ đề × 3 cấp độ.',
    primaryActionLabel: 'Quay lại thư viện Green Play',
    primaryActionTo: '/games',
    secondaryActionLabel: 'Trải nghiệm thử Brainroot - Truth or Dare',
    secondaryActionTo: '/games/fact-act/play',
  },
  sandboxNotice: {
    eyebrow: 'CHẾ ĐỘ TOÀN MÀN HÌNH',
    heading: 'Mở bàn gỗ 3D toàn màn hình (chưa phải bản chơi chính thức)',
    description:
      'Mở rộng không gian bàn gỗ 3D của Brainroot - Ô ăn quan xanh để quan sát chi tiết ánh sáng, bố cục 12 ô và điều khiển bằng bàn phím. Chế độ này chỉ phục vụ trải nghiệm thử trong lúc luật chơi chính thức đang chuẩn hóa.',
    linkLabel: 'Mở bàn gỗ 3D toàn màn hình',
    href: publicUrl('/?preview=oanquan3d'),
  },
} as const;
