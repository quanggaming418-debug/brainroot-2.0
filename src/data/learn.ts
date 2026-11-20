/**
 * Green Learn Lite — Structured 5-topic public knowledge explorer.
 *
 * GOVERNANCE NOTICE:
 * - Covers the 5 verified Brainroot environmental topics.
 * - Explicitly labeled `draft_unapproved` until team content review & reference
 *   attachment (BR-T005) completes.
 * - Contains zero fabricated statistics, percentages, survey numbers, or external URLs.
 */

export type LearnReviewStatus = 'approved' | 'draft_unapproved';

export interface LearnTopicCard {
  readonly id: string;
  readonly topicTitle: string;
  readonly shortTag: string;
  readonly learningObjective: string;
  readonly keyConcept: string;
  readonly campusContext: string;
  readonly starterHabit: string;
  readonly reflectionQuestion: string;
  readonly reviewStatus: LearnReviewStatus;
  readonly provenanceNote: string;
}

export const GREEN_LEARN_INTRO = {
  eyebrow: 'GREEN LEARN · KHO KIẾN THỨC KHỞI ĐẦU',
  heading: 'Năm chủ đề kỹ năng xanh gắn với đời sống hằng ngày',
  summary:
    'Đọc nhanh từng chủ đề với mục tiêu học tập rõ ràng, bối cảnh gần gũi trong học đường và gợi ý thực hành nhỏ — mở công khai cho mọi người không cần đăng nhập.',
  provenanceBannerTitle: 'Nội dung đang trong quá trình biên tập',
  provenanceBannerBody:
    'Các thẻ kiến thức khung dưới đây là bản thảo tham khảo ban đầu. Đội ngũ nội dung Brainroot sẽ bổ sung tài liệu trích dẫn đã kiểm duyệt và bài đọc mở rộng ở giai đoạn kế tiếp.',
} as const;

export const GREEN_LEARN_TOPICS: readonly LearnTopicCard[] = [
  {
    id: 'learn-consumption',
    topicTitle: 'Tiêu dùng bền vững',
    shortTag: 'Chủ đề 01',
    learningObjective:
      'Phân biệt giữa nhu cầu sử dụng thực tế và thói quen mua sắm theo xu hướng ngắn hạn.',
    keyConcept:
      'Mỗi món đồ đều đi kèm tài nguyên sản xuất, đóng gói và vận chuyển. Kéo dài thời gian sử dụng, sửa chữa hoặc chia sẻ lại đồ còn tốt thường tạo tác động tích cực rõ hơn việc chỉ thay thế bằng sản phẩm mới.',
    campusContext:
      'Tại trường học và câu lạc bộ, tiêu dùng bền vững thể hiện rõ qua cách sử dụng giáo trình, đồ dùng văn phòng phẩm và vật phẩm tổ chức sự kiện.',
    starterHabit:
      'Trước khi mua một món đồ mới cho kỳ học, kiểm tra nhanh xem mình có thể mượn, trao đổi hoặc tận dụng lại vật dụng sẵn có hay không.',
    reflectionQuestion:
      'Lần gần nhất bạn quyết định không mua một món đồ không cần thiết là khi nào, và bạn thấy điều đó mang lại lợi ích gì?',
    reviewStatus: 'draft_unapproved',
    provenanceNote:
      'Bản thảo khung giáo dục — nguồn tham khảo chính thức đang được đội ngũ nội dung kiểm duyệt.',
  },
  {
    id: 'learn-water',
    topicTitle: 'Nước',
    shortTag: 'Chủ đề 02',
    learningObjective:
      'Nhận biết các điểm dễ thất thoát nước trong sinh hoạt hằng ngày và cách sử dụng tiết kiệm, có trách nhiệm.',
    keyConcept:
      'Nguồn nước sạch cần năng lượng và quy trình xử lý để đến được vòi nước. Việc để nước chảy thừa khi rửa tay, rửa đồ hay bỏ qua vòi rò rỉ tích lũy thành sự lãng phí đáng kể theo thời gian.',
    campusContext:
      'Ở khu vệ sinh trường học, ký túc xá hoặc khu vực chuẩn bị sự kiện, thao tác khóa chặt vòi và báo sớm khi phát hiện rò rỉ giúp bảo vệ nguồn nước chung.',
    starterHabit:
      'Khóa vòi nước trong lúc xoa xà phòng và nhắn kịp thời cho bộ phận quản lý cơ sở vật chất nếu thấy vòi nước bị rỉ.',
    reflectionQuestion:
      'Trong sinh hoạt mỗi ngày của bạn, hoạt động nào sử dụng nước nhiều nhất và có thể điều chỉnh nhẹ nhàng ở bước nào?',
    reviewStatus: 'draft_unapproved',
    provenanceNote:
      'Bản thảo khung giáo dục — nguồn tham khảo chính thức đang được đội ngũ nội dung kiểm duyệt.',
  },
  {
    id: 'learn-energy',
    topicTitle: 'Năng lượng',
    shortTag: 'Chủ đề 03',
    learningObjective:
      'Hiểu mối liên hệ giữa thói quen dùng thiết bị điện hằng ngày với việc giảm lãng phí năng lượng.',
    keyConcept:
      'Sử dụng năng lượng hiệu quả không đồng nghĩa với việc cắt giảm sự tiện nghi cần thiết, mà là tránh để đèn, quạt, điều hòa và thiết bị trình chiếu hoạt động khi không có người dùng.',
    campusContext:
      'Phòng học chuyển ca, thư viện nhóm và phòng sinh hoạt câu lạc bộ là những không gian dễ phát sinh thiết bị bật không tải nếu thiếu sự phối hợp.',
    starterHabit:
      'Tận dụng ánh sáng và thông gió tự nhiên khi điều kiện thời tiết phù hợp, đồng thời kiểm tra công tắc khi là người rời phòng sau cùng.',
    reflectionQuestion:
      'Lớp học hoặc không gian làm việc của bạn có thể đặt một quy ước nhỏ nào để mọi người cùng nhớ tắt điện khi rời phòng?',
    reviewStatus: 'draft_unapproved',
    provenanceNote:
      'Bản thảo khung giáo dục — nguồn tham khảo chính thức đang được đội ngũ nội dung kiểm duyệt.',
  },
  {
    id: 'learn-waste',
    topicTitle: 'Rác thải',
    shortTag: 'Chủ đề 04',
    learningObjective:
      'Áp dụng thứ tự ưu tiên giảm phát sinh trước, sau đó mới tái sử dụng và phân loại đúng cách.',
    keyConcept:
      'Phân loại rác tại nguồn chỉ phát huy hiệu quả khi vật liệu không bị lẫn bẩn và đi kèm thói quen giảm đồ dùng một lần ngay từ đầu. Ít rác phát sinh hơn luôn dễ xử lý hơn.',
    campusContext:
      'Các buổi họp câu lạc bộ, giờ giải lao và sự kiện sinh viên thường phát sinh nhanh ly nhựa, hộp xốp và giấy in thừa nếu không chuẩn bị phương án thay thế.',
    starterHabit:
      'Mang bình nước cá nhân, đổ hết chất lỏng còn thừa trước khi bỏ vỏ chai vào ngăn tái chế và từ chối túi nilon khi chỉ mua một vài món nhỏ.',
    reflectionQuestion:
      'Loại rác nào xuất hiện nhiều nhất quanh bàn học của bạn trong một tuần, và bạn có thể giảm bớt từ khâu nào?',
    reviewStatus: 'draft_unapproved',
    provenanceNote:
      'Bản thảo khung giáo dục — nguồn tham khảo chính thức đang được đội ngũ nội dung kiểm duyệt.',
  },
  {
    id: 'learn-green-spaces',
    topicTitle: 'Không gian xanh',
    shortTag: 'Chủ đề 05',
    learningObjective:
      'Nhận diện vai trò của cây xanh và môi trường sinh thái đô thị đối với sức khỏe tinh thần và cộng đồng.',
    keyConcept:
      'Không gian xanh trong khuôn viên trường và khu dân cư giúp giảm cảm giác oi bức, tạo nơi nghỉ ngơi tinh thần và nuôi dưỡng hệ sinh vật đô thị gần gũi quanh con người.',
    campusContext:
      'Với học sinh và sinh viên đô thị, việc giữ gìn bồn cây sân trường, không xả rác vào gốc cây và cùng chăm sóc góc xanh lớp học là bước kết nối thực tế với thiên nhiên.',
    starterHabit:
      'Dành vài phút quan sát cây xanh trong khuôn viên trường hoặc khu phố, giữ vệ sinh khu vực trồng cây và tham gia hoạt động chăm sóc cây của câu lạc bộ khi có dịp.',
    reflectionQuestion:
      'Góc cây xanh nào quanh nơi bạn học tập khiến bạn cảm thấy dễ chịu nhất, và cộng đồng có thể cùng giữ gìn nơi đó ra sao?',
    reviewStatus: 'draft_unapproved',
    provenanceNote:
      'Bản thảo khung giáo dục — nguồn tham khảo chính thức đang được đội ngũ nội dung kiểm duyệt.',
  },
];
