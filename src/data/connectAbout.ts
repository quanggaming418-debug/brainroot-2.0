/**
 * Verified project information for Green Connect (/connect) and About (/about).
 *
 * GOVERNANCE NOTICE:
 * - Only verified repository facts are included.
 * - No fabricated emails, phone numbers, social accounts, partner logos,
 *   team member names, or unverified impact metrics.
 */

export interface ParticipationPathway {
  readonly id: string;
  readonly audience: string;
  readonly title: string;
  readonly description: string;
  readonly howToStart: readonly string[];
  readonly suggestedRouteLabel: string;
  readonly suggestedRouteTo: string;
}

export const GREEN_CONNECT_CONTENT = {
  eyebrow: 'GREEN CONNECT · KẾT NỐI CỘNG ĐỒNG GIÁO DỤC',
  heading: 'Cùng đưa kỹ năng xanh vào lớp học, câu lạc bộ và đời sống thường ngày',
  summary:
    'Brainroot là sản phẩm giáo dục tương tác mở công khai cho mọi người. Trong giai đoạn thử nghiệm ban đầu, dự án ưu tiên đồng hành cùng học sinh, sinh viên, giáo viên và các câu lạc bộ tại ULIS và Hà Nội.',
  pathways: [
    {
      id: 'students',
      audience: 'Học sinh & Sinh viên',
      title: 'Khám phá, trải nghiệm thử và thực hành thói quen xanh',
      description:
        'Tự do trải nghiệm bản chơi thử tình huống xanh, thực hành thử thách nhỏ mỗi ngày và đọc 5 chủ đề kỹ năng xanh mà không cần đăng ký tài khoản.',
      howToStart: [
        'Mở bản trải nghiệm thử Brainroot - Truth or Dare để làm quen cách nối kiến thức với hành động đời thường.',
        'Thực hiện thử thách 1 ngày trong Green Quest và tự ghi nhận dòng phản tư cá nhân.',
        'Rủ nhóm bạn trong lớp cùng thảo luận một tình huống từ 5 chủ đề của Green Learn.',
      ],
      suggestedRouteLabel: 'Trải nghiệm thử Brainroot - Truth or Dare',
      suggestedRouteTo: '/games/fact-act/play',
    },
    {
      id: 'teachers',
      audience: 'Giáo viên & Điều phối viên',
      title: 'Gợi ý lồng ghép vào giờ sinh hoạt hoặc ngoại khóa',
      description:
        'Sử dụng khung 5 chủ đề môi trường và các tình huống gần gũi làm chất liệu mở đầu cuộc trò chuyện kéo dài 10–15 phút trong lớp.',
      howToStart: [
        'Mở trang giới thiệu Brainroot - Truth or Dare hoặc Green Learn trực tiếp trên máy chiếu lớp học.',
        'Chọn một tình huống gần với bối cảnh trường học để học sinh thảo luận nhóm nhỏ.',
        'Khuyến khích học sinh nêu rào cản thực tế thay vì chỉ tìm một đáp án lý thuyết.',
      ],
      suggestedRouteLabel: 'Xem 5 chủ đề Green Learn',
      suggestedRouteTo: '/learn',
    },
    {
      id: 'clubs',
      audience: 'Câu lạc bộ & Cộng đồng ULIS / Hà Nội',
      title: 'Phối hợp thử nghiệm sản phẩm giáo dục trực tiếp',
      description:
        'Dự án hướng tới các buổi trải nghiệm trực tiếp bộ thẻ vật lý Brainroot - Truth or Dare và góp ý hoàn thiện luật chơi bản số Brainroot - Ô ăn quan xanh cùng sinh viên và câu lạc bộ.',
      howToStart: [
        'Khám phá thư viện Green Play và trải nghiệm bàn gỗ 3D Brainroot - Ô ăn quan xanh ở chế độ thử nghiệm.',
        'Ghi chú lại góp ý về độ rõ ràng, trải nghiệm trên di động và tình huống học đường phù hợp.',
        'Theo dõi thông báo khi nhóm Brainroot công bố kênh liên hệ và lịch thử nghiệm chính thức.',
      ],
      suggestedRouteLabel: 'Khám phá thư viện Green Play',
      suggestedRouteTo: '/games',
    },
  ] as readonly ParticipationPathway[],
  contactTransparency: {
    eyebrow: 'MINH BẠCH KÊNH LIÊN HỆ & SỰ KIỆN',
    heading: 'Kênh liên hệ chính thức đang chờ nhóm dự án công bố',
    description:
      'Để tránh hiển thị thông tin chưa xác thực, website hiện chưa niêm yết địa chỉ email, trang mạng xã hội, biểu mẫu đăng ký trực tuyến hay lịch sự kiện cộng đồng. Các kênh liên hệ chính thức và đơn vị đồng hành sẽ chỉ được cập nhật sau khi nhóm Brainroot xác nhận công khai.',
  },
} as const;

export const ABOUT_PAGE_CONTENT = {
  eyebrow: 'CÂU CHUYỆN BRAINROOT',
  heading: 'From Brainrot to Brainroot',
  missionLabel: 'SỨ MỆNH CỦA CHÚNG TÔI',
  missionText:
    'Đưa kỹ năng xanh đến gần giới trẻ bằng những trải nghiệm giáo dục tương tác, gần gũi và giàu tính kết nối.',
  introBody:
    'Brainroot là không gian học tập tương tác, nơi kiến thức môi trường được kết nối với trò chơi, thử thách và những hành động gần gũi trong cuộc sống. Chúng tôi mong muốn mỗi người có thể bắt đầu hành trình sống xanh từ sự tò mò, niềm vui khám phá và những thay đổi nhỏ mỗi ngày.',
  audienceEyebrow: 'ĐỒNG HÀNH CÙNG BẠN',
  audienceHeading: 'Brainroot dành cho ai?',
  audienceCards: [
    {
      title: 'Người yêu khám phá',
      description:
        'Dù mới bắt đầu tìm hiểu hay đã quan tâm đến môi trường, bạn đều có thể khám phá kiến thức xanh qua các trò chơi và hoạt động gần gũi.',
    },
    {
      title: 'Lớp học cùng học, cùng chơi',
      description:
        'Học sinh, sinh viên và giáo viên có thể tham khảo những tình huống, trò chơi và chủ đề môi trường để cùng trao đổi, học hỏi.',
    },
    {
      title: 'Cộng đồng cùng lan tỏa',
      description:
        'Các nhóm bạn, câu lạc bộ và cộng đồng có thể tìm thấy những ý tưởng hoạt động giúp kết nối mọi người quanh lối sống xanh.',
    },
  ],
  startEyebrow: 'BẮT ĐẦU HÀNH TRÌNH',
  startHeading: 'Bắt đầu hành trình xanh cùng Brainroot',
  startDescription:
    'Mỗi hành trình đều bắt đầu từ một bước nhỏ. Bạn có thể chọn một trò chơi, khám phá kiến thức môi trường hoặc thử thực hiện một hành động xanh ngay hôm nay.',
  startActions: [
    {
      label: 'Khám phá trò chơi',
      to: '/games',
      variant: 'primary',
    },
    {
      label: 'Thử thách xanh',
      to: '/quest',
      variant: 'secondary',
    },
    {
      label: 'Tìm hiểu kỹ năng xanh',
      to: '/learn',
      variant: 'secondary',
    },
  ],
} as const;
