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
}

export interface OAnQuanLevel {
  readonly levelNumber: string;
  readonly title: string;
  readonly focus: string;
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
    title: 'Fact–Act',
    subtitle: 'Bộ thẻ bài giáo dục kỹ năng xanh theo vòng lặp Fact → Act → Phản tư',
    statusLabel: 'Sản phẩm thẻ vật lý · Bản chơi thử số đang chuẩn bị',
    statusTone: 'peach',
    description:
      'Bắt đầu từ những câu chuyện môi trường gần gũi, Fact–Act giúp người chơi nhận diện sự thật có cơ sở, cân nhắc hành động khả thi và cùng nhau phản tư để hình thành thói quen xanh.',
    ctaLabel: 'Xem chi tiết Fact–Act',
    mediaLayout: 'media-left',
    media: {
      desktopSrc: '/assets/hero-v4/fact-act-deck.webp',
      width: 1024,
      height: 1024,
      alt: 'Bộ thẻ bài vật lý Fact–Act của Brainroot với thiết kế minh họa môi trường tông màu ấm và xanh lá',
      variant: 'product-cutout',
    },
    specs: [
      { label: 'Hình thức', value: 'Bộ thẻ vật lý gốc & bản chơi thử số sắp mở' },
      { label: 'Trọng tâm', value: 'Nhận thức, hành động xanh và phản tư' },
      { label: 'Truy cập', value: 'Khám phá công khai, không bắt buộc đăng nhập' },
    ],
  },
  {
    id: 'o-an-quan-xanh',
    slug: '/games/o-an-quan-xanh',
    title: 'Ô ăn quan xanh',
    subtitle: 'Trò chơi dân gian Việt Nam kết hợp 5 chủ đề môi trường và 3 cấp độ học tập',
    statusLabel: 'Đang chuẩn hóa luật bản số',
    statusTone: 'sage',
    description:
      'Lấy cảm hứng từ trò chơi dân gian Ô ăn quan quen thuộc, Ô ăn quan xanh chuyển hóa nước đi chiến thuật thành các tình huống học tập về tiêu dùng, nước, năng lượng, rác thải và không gian xanh.',
    ctaLabel: 'Khám phá Ô ăn quan xanh',
    mediaLayout: 'media-right',
    media: {
      desktopSrc: '/assets/green-play/vis-008-o-an-quan-concept.webp',
      mobileSrc: '/assets/green-play/vis-008-o-an-quan-concept-sm.webp',
      width: 1080,
      height: 720,
      alt: 'Minh họa khái niệm bàn chơi Ô ăn quan xanh trên mặt bàn gỗ ấm cùng các viên sỏi và yếu tố thiên nhiên',
      variant: 'concept-illustration',
      disclosureCaption: O_AN_QUAN_CONCEPT_DISCLOSURE,
    },
    specs: [
      { label: 'Chủ đề', value: '5 chủ đề môi trường cốt lõi' },
      { label: 'Cấp độ', value: 'Nhận biết · Ra quyết định · Giải quyết vấn đề' },
      { label: 'Hiện trạng', value: 'Luật bản số đang chuẩn hóa; có sandbox 3D kỹ thuật nội bộ' },
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
        'Khách truy cập có thể xem giới thiệu sản phẩm, cấu trúc giáo dục và định hướng chơi thử mà không phải tạo tài khoản.',
    },
    {
      title: 'Tôn trọng giá trị bộ thẻ vật lý',
      description:
        'Các bản chơi thử số tương lai chỉ sử dụng bộ thẻ mẫu đã duyệt, không công khai toàn bộ nội dung bộ thẻ vật lý trả phí.',
    },
    {
      title: 'Minh bạch tiến độ thực tế',
      description:
        'Những phần luật chơi hoặc bản chơi thử chưa hoàn tất kiểm duyệt đều được ghi rõ trạng thái thay vì tạo nút chơi giả.',
    },
  ],
} as const;

export const FACT_ACT_DETAIL = {
  title: 'Fact–Act',
  eyebrow: 'GREEN PLAY · BỘ THẺ GIÁO DỤC',
  statusLabel: 'Sản phẩm thẻ vật lý · Bản chơi thử số đang chuẩn bị',
  tagline: 'Từ hiểu đúng vấn đề môi trường đến lựa chọn hành động xanh có ý thức.',
  overview:
    'Fact–Act là sản phẩm giáo dục tương tác của Brainroot giúp người trẻ tiếp cận kỹ năng xanh một cách nhẹ nhàng và chủ động. Thay vì ghi nhớ kiến thức một chiều, người chơi đi qua chu trình Fact → Act → Phản tư để liên kết kiến thức với đời sống hằng ngày.',
  specs: [
    { label: 'Định dạng hiện có', value: 'Bộ thẻ vật lý gốc của nhóm dự án' },
    { label: 'Mô hình học tập', value: 'Fact (Sự thật) → Act (Hành động) → Phản tư' },
    { label: 'Đối tượng phù hợp', value: 'Học sinh, sinh viên, giáo viên và câu lạc bộ' },
    { label: 'Bản chơi thử trực tuyến', value: 'Đang chuẩn bị thẻ mẫu công khai, chưa mở chơi thử' },
  ] as readonly GameSpecItem[],
  learningLoopHeading: 'Cách trải nghiệm Fact → Act → Phản tư vận hành',
  learningLoopSummary:
    'Mỗi lượt tương tác được thiết kế ngắn gọn để có thể áp dụng linh hoạt trong giờ học, sinh hoạt câu lạc bộ hoặc nhóm bạn nhỏ.',
  learningSteps: [
    {
      stepNumber: '01',
      code: 'FACT',
      title: 'Nhận diện sự thật xanh',
      summary:
        'Tiếp cận một thông tin hoặc bối cảnh môi trường gần gũi đã được nhóm biên tập rà soát nguồn tham khảo rõ ràng.',
    },
    {
      stepNumber: '02',
      code: 'ACT',
      title: 'Chọn hành động khả thi',
      summary:
        'Cùng thảo luận các hướng ứng xử thực tế phù hợp với hoàn cảnh cá nhân, lớp học hoặc cộng đồng xung quanh.',
    },
    {
      stepNumber: '03',
      code: 'REFLECTION',
      title: 'Phản tư & kết nối thói quen',
      summary:
        'Nhìn lại vì sao hành động đó có ý nghĩa, những rào cản khi áp dụng và cách duy trì thay đổi nhỏ nhưng bền bỉ.',
    },
  ] as readonly LearningLoopStep[],
  comparisonHeading: 'Bộ thẻ vật lý gốc và định hướng bản chơi thử số',
  comparisonSummary:
    'Hai phiên bản bổ trợ cho nhau về trải nghiệm học tập, đồng thời giữ ranh giới minh bạch về phạm vi nội dung.',
  comparisonColumns: [
    {
      heading: 'Bộ thẻ vật lý gốc',
      badge: 'Sản phẩm hiện hữu',
      points: [
        'Trải nghiệm cầm nắm trực tiếp, phù hợp cho lớp học, workshop và nhóm bạn ngồi cùng nhau.',
        'Sở hữu trọn vẹn hệ thống thẻ bài và thiết kế minh họa gốc của nhóm Brainroot.',
        'Hỗ trợ hoạt động dẫn dắt trực tiếp bởi giáo viên hoặc điều phối viên câu lạc bộ.',
      ],
    },
    {
      heading: 'Bản chơi thử số tương lai',
      badge: 'Đang chuẩn bị',
      points: [
        'Mở công khai một bộ thẻ mẫu đã duyệt để người mới làm quen với cấu trúc Fact → Act → Phản tư.',
        'Không yêu cầu đăng nhập cho lượt chơi thử mẫu và không công khai nội dung bộ thẻ trả phí.',
        'Thiết kế hỗ trợ bàn phím đầy đủ, chế độ giảm chuyển động và đọc văn bản rõ ràng.',
      ],
    },
  ] as readonly ComparisonColumn[],
  unavailableNotice: {
    heading: 'Bản chơi thử trực tuyến Fact–Act chưa mở',
    description:
      'Nhóm dự án đang hoàn thiện bộ thẻ mẫu công khai đã kiểm duyệt nội dung và trải nghiệm lật thẻ dễ tiếp cận trước khi mở chơi thử trên web. Hiện tại bạn có thể tìm hiểu mô hình học tập ở trang này hoặc khám phá thêm Ô ăn quan xanh.',
    primaryActionLabel: 'Quay lại thư viện Green Play',
    primaryActionTo: '/games',
    secondaryActionLabel: 'Xem Ô ăn quan xanh',
    secondaryActionTo: '/games/o-an-quan-xanh',
  },
} as const;

export const O_AN_QUAN_DETAIL = {
  title: 'Ô ăn quan xanh',
  eyebrow: 'GREEN PLAY · TRÒ CHƠI DÂN GIAN & KỸ NĂNG XANH',
  statusLabel: 'Đang chuẩn hóa luật bản số',
  tagline: 'Gắn kết trò chơi dân gian Việt Nam với tư duy giải quyết vấn đề môi trường.',
  overview:
    'Ô ăn quan xanh kết hợp nhịp chơi gần gũi của trò chơi dân gian Ô ăn quan với nội dung giáo dục kỹ năng xanh. Người chơi rèn luyện khả năng quan sát, cân nhắc lựa chọn và phối hợp giải quyết tình huống xoay quanh 5 chủ đề môi trường thiết thực.',
  disclosure: O_AN_QUAN_CONCEPT_DISCLOSURE,
  specs: [
    { label: 'Chủ đề giáo dục', value: '5 chủ đề môi trường' },
    { label: 'Tiến trình năng lực', value: '3 cấp độ học tập' },
    { label: 'Bản số đầy đủ', value: 'Đang chuẩn hóa luật chơi và ngân hàng câu hỏi' },
    { label: 'Sandbox nội bộ', value: 'Có bản thử nghiệm kỹ thuật dựng bàn 3D riêng biệt' },
  ] as readonly GameSpecItem[],
  topicsHeading: '5 chủ đề môi trường trọng tâm',
  topicsSummary:
    'Các tình huống học tập của Ô ăn quan xanh xoay quanh 5 nhóm chủ đề môi trường gần gũi với đời sống học sinh, sinh viên và cộng đồng đô thị.',
  topics: [
    {
      id: 'sustainable-consumption',
      title: 'Tiêu dùng bền vững',
      description:
        'Cân nhắc nhu cầu thực sự, vòng đời sản phẩm và thói quen mua sắm có trách nhiệm.',
    },
    {
      id: 'water',
      title: 'Nước',
      description:
        'Nhận thức giá trị nguồn nước sạch, sử dụng tiết kiệm và bảo vệ môi trường nước quanh ta.',
    },
    {
      id: 'energy',
      title: 'Năng lượng',
      description:
        'Hiểu cách sử dụng điện năng hiệu quả và giảm lãng phí năng lượng trong sinh hoạt hằng ngày.',
    },
    {
      id: 'waste',
      title: 'Rác thải',
      description:
        'Thực hành giảm thiểu, tái sử dụng, phân loại rác đúng cách và hạn chế nhựa dùng một lần.',
    },
    {
      id: 'green-spaces',
      title: 'Không gian xanh',
      description:
        'Gìn giữ cây xanh, đa dạng sinh học đô thị và nuôi dưỡng môi trường sống trong lành.',
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
    },
    {
      levelNumber: 'Cấp độ 2',
      title: 'Ra quyết định',
      focus: 'So sánh các phương án ứng xử xanh và chọn lựa phù hợp với điều kiện thực tế.',
    },
    {
      levelNumber: 'Cấp độ 3',
      title: 'Giải quyết vấn đề',
      focus: 'Kết hợp nhiều góc nhìn để đề xuất cách xử lý bền vững cho lớp học, câu lạc bộ hoặc cộng đồng.',
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
        'Bàn chơi 3D ấm áp lấy cảm hứng từ bàn gỗ Ô ăn quan, ưu tiên sự rõ ràng và tốc độ tải nhẹ.',
        'Phòng chơi riêng trực tuyến theo mã phòng dành cho lớp học, nhóm bạn và câu lạc bộ.',
        'Luôn có chế độ điều khiển bàn phím và giao diện rõ ràng song song, không phụ thuộc duy nhất vào tương tác 3D.',
      ],
    },
    {
      heading: 'Hiện trạng hiện tại',
      badge: 'Đang chuẩn hóa',
      points: [
        'Luật chơi bản số chi tiết và bộ tình huống cho 5 chủ đề đang trong giai đoạn chuẩn hóa cùng đội ngũ nội dung.',
        'Chưa mở phòng chơi trực tuyến hay ván chơi hoàn chỉnh cho công chúng.',
        'Chỉ có một bản thử nghiệm kỹ thuật 3D tách riêng (sandbox nội bộ) phục vụ kiểm tra hiển thị mặt bàn.',
      ],
    },
  ] as readonly ComparisonColumn[],
  unavailableNotice: {
    heading: 'Ván chơi trực tuyến Ô ăn quan xanh chưa mở',
    description:
      'Luật chơi bản số đang được chuẩn hóa để bảo đảm tính giáo dục và sự công bằng trước khi phát hành. Hiện chưa có nút chơi chính thức; bạn có thể theo dõi cấu trúc 5 chủ đề và 3 cấp độ trên trang này.',
    primaryActionLabel: 'Quay lại thư viện Green Play',
    primaryActionTo: '/games',
    secondaryActionLabel: 'Xem Fact–Act',
    secondaryActionTo: '/games/fact-act',
  },
  sandboxNotice: {
    eyebrow: 'THỬ NGHIỆM KỸ THUẬT NỘI BỘ',
    heading: 'Xem trước Sandbox 3D mặt bàn (chưa phải bản chơi chính thức)',
    description:
      'Dành cho kiểm thử nội bộ về bố cục bàn gỗ và tương tác kỹ thuật. Sandbox này chưa bao gồm luật chơi bản số hoàn chỉnh, hệ thống câu hỏi 5 chủ đề hay phòng chơi trực tuyến.',
    linkLabel: 'Mở Sandbox kỹ thuật 3D',
    href: '/?preview=oanquan3d',
  },
} as const;
