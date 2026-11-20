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
      title: 'Khám phá, chơi thử và thực hành thói quen xanh',
      description:
        'Tự do trải nghiệm vòng lặp Fact → Act → Phản tư, thử thách xanh nhỏ mỗi ngày và đọc 5 chủ đề kỹ năng xanh mà không cần đăng ký tài khoản.',
      howToStart: [
        'Thử một vòng mẫu nội bộ của Fact–Act để làm quen cách nối kiến thức với hành động.',
        'Thực hiện thử thách 1 ngày trong Green Quest Lite và tự ghi nhận phản tư cá nhân.',
        'Rủ nhóm bạn trong lớp thảo luận lại một tình huống từ 5 chủ đề của Green Learn.',
      ],
      suggestedRouteLabel: 'Chơi thử vòng mẫu Fact–Act',
      suggestedRouteTo: '/games/fact-act/play',
    },
    {
      id: 'teachers',
      audience: 'Giáo viên & Điều phối viên',
      title: 'Gợi ý lồng ghép vào giờ sinh hoạt hoặc ngoại khóa',
      description:
        'Sử dụng cấu trúc Fact → Act → Phản tư và khung 5 chủ đề môi trường làm chất liệu mở đầu cuộc trò chuyện kéo dài 10–15 phút trong lớp.',
      howToStart: [
        'Mở trang giới thiệu Fact–Act hoặc Green Learn trực tiếp trên máy chiếu lớp học.',
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
        'Dự án hướng tới các buổi trải nghiệm trực tiếp bộ thẻ vật lý Fact–Act và góp ý hoàn thiện luật chơi bản số Ô ăn quan xanh cùng sinh viên và câu lạc bộ.',
      howToStart: [
        'Khám phá thư viện Green Play và xem trước bàn gỗ 3D Ô ăn quan xanh ở chế độ sandbox.',
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
  eyebrow: 'VỀ DỰ ÁN BRAINROOT 2.0',
  heading: 'From Brainrot to Brainroot',
  missionLabel: 'Sứ mệnh cốt lõi',
  missionText:
    'Dự án nâng cao nhận thức và kết nối giới trẻ về kỹ năng xanh thông qua sản phẩm giáo dục tương tác.',
  introBody:
    'Brainroot không phải là một cổng game giải trí thuần túy. Đây là không gian giáo dục tương tác nơi trò chơi, kiến thức gần gũi và hành động nhỏ hằng ngày bổ trợ cho nhau để biến sự tò mò thành thói quen xanh bền vững.',
  pilotHeading: 'Bối cảnh triển khai và đối tượng phục vụ',
  pilotCards: [
    {
      title: 'Mở công khai cho mọi người',
      description:
        'Bất kỳ ai quan tâm đến kỹ năng xanh — học sinh, sinh viên, giáo viên hay phụ huynh — đều có thể khám phá nội dung công khai trên website mà không bị ép đăng nhập.',
    },
    {
      title: 'Ưu tiên thử nghiệm tại ULIS & Hà Nội',
      description:
        'Giai đoạn thử nghiệm ban đầu tập trung lắng nghe phản hồi từ cộng đồng sinh viên, giảng viên và câu lạc bộ tại Trường Đại học Ngoại ngữ (ULIS) và khu vực Hà Nội.',
    },
    {
      title: 'Kết nối vật lý & trải nghiệm số (Phygital)',
      description:
        'Trải nghiệm trực tuyến bổ trợ cho bộ thẻ vật lý Fact–Act và định hướng bàn chơi Ô ăn quan xanh, luôn tôn trọng giá trị sản phẩm gốc và không công khai nội dung bộ thẻ trả phí.',
    },
  ],
  transparencyHeading: 'Minh bạch trạng thái hiện tại của nền tảng R0',
  transparencyItems: [
    {
      label: 'Nội dung mẫu & học liệu (BR-T005)',
      status: 'Đang chờ đội nội dung duyệt phát hành công khai',
      detail:
        'Vòng chơi thử Fact–Act và 5 thẻ kiến thức Green Learn hiện dùng dữ liệu mẫu nội bộ/bản thảo khung được gắn nhãn rõ ràng, không dùng số liệu hay nguồn chưa xác minh.',
    },
    {
      label: 'Luật chơi bản số Ô ăn quan xanh (OQ-08)',
      status: 'Đang chuẩn hóa',
      detail:
        'Trang Ô ăn quan xanh cung cấp bàn gỗ 3D tương tác ở chế độ sandbox kỹ thuật và khung 5 chủ đề × 3 cấp độ; chưa áp đặt luật thi đấu hay phòng chơi trực tuyến.',
    },
    {
      label: 'Tài sản hình ảnh & bản quyền thương mại (BR-T002)',
      status: 'Dùng cho phát triển và thử nghiệm nội bộ',
      detail:
        'Các nhân vật Brainie, Rootie và minh họa gốc của nhóm được giữ nguyên bản cho giai đoạn phát triển nội bộ; quyền phát hành thương mại tiếp tục được xác minh riêng.',
    },
    {
      label: 'Kênh liên hệ & cộng đồng chính thức',
      status: 'Chưa công bố trên bản web này',
      detail:
        'Chưa hiển thị email, mạng xã hội hoặc đơn vị đối tác cho đến khi nhóm dự án xác nhận thông tin chính thức.',
    },
  ],
} as const;
