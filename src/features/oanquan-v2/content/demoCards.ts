import type { ChallengeLevel } from '../engine';
import type { Theme } from './themes';

/**
 * THẺ DEMO — do nhóm phát triển tự viết để chạy thử giao diện.
 * KHÔNG phải bộ 100 thẻ của nhóm Brainroot, không trích từ PDF, chưa qua duyệt nội dung.
 * Chỉ dùng trong trang preview dev; không được đưa vào bản build production.
 */
export interface DemoCard {
  readonly id: string;
  readonly theme: Theme;
  readonly level: ChallengeLevel;
  /** Thời gian trả lời (metadata của thẻ DEMO). */
  readonly timeSec: number;
  readonly title: string;
  readonly context: string;
  readonly challenge: string;
  /** "Trọng tài duyệt khi". */
  readonly refereeGuide: string;
  /** Các ý để Trọng tài ghi lại (không tự chấm). */
  readonly keyPoints: readonly string[];
  /** "Điều nên nhớ" (bản tóm tắt). */
  readonly remember: string;
}

const T1 = 20;
const T2 = 30;
const T3 = 45;

export const DEMO_CARDS: readonly DemoCard[] = [
  {
    id: 'DEMO-green-1', theme: 'green', level: 1, timeSec: T1,
    title: 'Góc cây trong lớp',
    context: 'Lớp bạn có vài chậu cây nhỏ đặt ở cửa sổ nhưng ít ai chăm.',
    challenge: 'Nêu 2 việc đơn giản cả lớp có thể làm để giữ cho góc cây xanh tốt.',
    refereeGuide: 'Nêu được 2 việc cụ thể, làm được ở lớp.',
    keyPoints: ['Phân công tưới cây theo lịch', 'Đặt cây nơi có ánh sáng phù hợp', 'Nhặt lá úa, giữ chậu sạch'],
    remember: 'Một góc xanh nhỏ cần người chăm đều đặn hơn là cần nhiều tiền.',
  },
  {
    id: 'DEMO-green-2', theme: 'green', level: 2, timeSec: T2,
    title: 'Sân trường nắng gắt',
    context: 'Sân trường gần như không có bóng mát, giờ ra chơi rất nóng.',
    challenge: 'Đề xuất một kế hoạch nhỏ để tăng mảng xanh cho sân trường và giải thích vì sao bạn chọn cách đó.',
    refereeGuide: 'Có đề xuất cụ thể và giải thích được lý do chọn.',
    keyPoints: ['Đề xuất cụ thể (trồng cây, giàn leo, bồn cây…)', 'Có lý do (bóng mát, dễ chăm, chi phí…)', 'Nghĩ tới việc chăm sóc lâu dài'],
    remember: 'Kế hoạch xanh tốt luôn tính cả việc ai sẽ chăm sóc sau khi trồng.',
  },
  {
    id: 'DEMO-energy-1', theme: 'energy', level: 1, timeSec: T1,
    title: 'Phòng học trống',
    context: 'Giờ ra chơi, phòng học không còn ai nhưng đèn và quạt vẫn bật.',
    challenge: 'Nêu 2 thói quen giúp lớp bớt lãng phí điện.',
    refereeGuide: 'Nêu được 2 thói quen hợp lý.',
    keyPoints: ['Tắt đèn, quạt khi ra khỏi phòng', 'Tận dụng ánh sáng tự nhiên', 'Cử người kiểm tra cuối buổi'],
    remember: 'Tắt thiết bị khi không dùng là thói quen nhỏ nhưng lặp lại mỗi ngày.',
  },
  {
    id: 'DEMO-energy-2', theme: 'energy', level: 2, timeSec: T2,
    title: 'Chọn quạt hay điều hòa',
    context: 'Trời oi bức, nhóm bạn tranh luận nên bật điều hòa hay dùng quạt khi học nhóm.',
    challenge: 'Bạn chọn cách nào? Giải thích lựa chọn của bạn dựa trên tình huống cụ thể.',
    refereeGuide: 'Có lựa chọn rõ ràng và lập luận phù hợp với tình huống.',
    keyPoints: ['Nêu rõ lựa chọn', 'Lý do gắn với tình huống (số người, thời gian, nhiệt độ)', 'Có cách dùng tiết kiệm hơn'],
    remember: 'Lựa chọn tiết kiệm năng lượng phụ thuộc vào hoàn cảnh, không có một đáp án cho mọi lúc.',
  },
  {
    id: 'DEMO-waste-1', theme: 'waste', level: 1, timeSec: T1,
    title: 'Sau buổi sinh hoạt',
    context: 'Buổi sinh hoạt câu lạc bộ kết thúc, trên bàn còn nhiều cốc nhựa và vỏ bánh.',
    challenge: 'Nêu 2 cách giảm lượng rác cho buổi sinh hoạt lần sau.',
    refereeGuide: 'Nêu được 2 cách cụ thể.',
    keyPoints: ['Mang bình nước cá nhân', 'Hạn chế đồ dùng một lần', 'Chuẩn bị thùng phân loại'],
    remember: 'Giảm rác hiệu quả nhất là chuẩn bị từ trước buổi gặp.',
  },
  {
    id: 'DEMO-waste-2', theme: 'waste', level: 2, timeSec: T2,
    title: 'Ba thùng rác ở hành lang',
    context: 'Trường đặt ba thùng phân loại nhưng rác vẫn bị bỏ lẫn lộn.',
    challenge: 'Theo bạn vì sao mọi người bỏ lẫn rác? Đề xuất một cách làm cho việc phân loại dễ hơn.',
    refereeGuide: 'Nêu được một nguyên nhân hợp lý và một đề xuất gắn với nguyên nhân đó.',
    keyPoints: ['Nguyên nhân (biển hướng dẫn khó hiểu, vội…)', 'Đề xuất gắn với nguyên nhân', 'Cách kiểm tra đề xuất có hiệu quả'],
    remember: 'Phân loại rác dễ hơn khi hướng dẫn rõ ràng ngay tại chỗ bỏ rác.',
  },
  {
    id: 'DEMO-water-1', theme: 'water', level: 1, timeSec: T1,
    title: 'Vòi nước lúc đánh răng',
    context: 'Bạn để vòi nước chảy suốt lúc đánh răng.',
    challenge: 'Nêu 2 việc bạn có thể làm để bớt lãng phí nước khi đánh răng.',
    refereeGuide: 'Nêu được 2 việc cụ thể, hợp lý.',
    keyPoints: ['Khóa vòi khi chải răng', 'Dùng cốc để súc miệng'],
    remember: 'Khóa vòi khi không dùng là thói quen nhỏ giúp bớt lãng phí nước.',
  },
  {
    id: 'DEMO-water-2', theme: 'water', level: 2, timeSec: T2,
    title: 'Vòi rỉ trong nhà vệ sinh',
    context: 'Một vòi nước ở nhà vệ sinh trường bị rỉ từng giọt nhiều ngày.',
    challenge: 'Bạn sẽ làm gì? Sắp xếp các bước theo thứ tự và giải thích ngắn.',
    refereeGuide: 'Có các bước hợp lý theo thứ tự và biết báo cho người phụ trách.',
    keyPoints: ['Báo cho người phụ trách', 'Tạm khóa van nếu được phép', 'Theo dõi đến khi được sửa'],
    remember: 'Báo hỏng sớm cho đúng người là bước quan trọng nhất.',
  },
  {
    id: 'DEMO-consume-1', theme: 'consume', level: 1, timeSec: T1,
    title: 'Đồ dùng học tập mới',
    context: 'Đầu năm học, bạn muốn mua bộ bút và vở mới dù đồ cũ vẫn dùng được.',
    challenge: 'Nêu 2 câu hỏi bạn nên tự hỏi trước khi mua.',
    refereeGuide: 'Nêu được 2 câu hỏi giúp cân nhắc nhu cầu thật.',
    keyPoints: ['Mình có thật sự cần không?', 'Đồ cũ còn dùng được không?', 'Có thể mượn hoặc dùng lại không?'],
    remember: 'Dừng lại một phút trước khi mua giúp tránh mua thứ không cần.',
  },
  {
    id: 'DEMO-consume-2', theme: 'consume', level: 2, timeSec: T2,
    title: 'Áo đồng phục sự kiện',
    context: 'Lớp định đặt áo riêng cho một sự kiện chỉ diễn ra một ngày.',
    challenge: 'Đề xuất một phương án khác ít lãng phí hơn và nói rõ ưu, nhược điểm.',
    refereeGuide: 'Có phương án thay thế và nêu được ít nhất một ưu điểm, một nhược điểm.',
    keyPoints: ['Phương án thay thế (dùng áo sẵn có, phụ kiện chung…)', 'Ưu điểm', 'Nhược điểm'],
    remember: 'So sánh phương án giúp lựa chọn tiêu dùng có trách nhiệm hơn.',
  },
  {
    id: 'DEMO-climate-3a', theme: 'climate', level: 3, timeSec: T3,
    title: 'Kế hoạch xanh cho cả lớp',
    context: 'Lớp bạn muốn có một cam kết chung để giảm tác động tới khí hậu trong một học kỳ.',
    challenge: 'Đề xuất một cam kết, cách đo xem cả lớp có làm được không, và cách giữ động lực.',
    refereeGuide: 'Có cam kết cụ thể, cách theo dõi và cách duy trì.',
    keyPoints: ['Cam kết cụ thể, đo được', 'Cách theo dõi tiến độ', 'Cách giữ động lực cho cả lớp'],
    remember: 'Một cam kết tốt là cam kết theo dõi được và cả nhóm cùng làm.',
  },
  {
    id: 'DEMO-climate-3b', theme: 'climate', level: 3, timeSec: T3,
    title: 'Đi học thế nào',
    context: 'Nhiều bạn được chở đi học bằng xe máy dù nhà gần trường.',
    challenge: 'Đề xuất một sáng kiến khuyến khích đi học bằng cách ít phát thải hơn; nêu một khó khăn và cách vượt qua.',
    refereeGuide: 'Có sáng kiến cụ thể, nêu được khó khăn thật và cách xử lý.',
    keyPoints: ['Sáng kiến cụ thể', 'Một khó khăn thực tế', 'Cách vượt qua khó khăn'],
    remember: 'Sáng kiến dễ thành công hơn khi đã tính trước khó khăn.',
  },
  {
    id: 'DEMO-bio-3a', theme: 'biodiversity', level: 3, timeSec: T3,
    title: 'Khu vườn cho côn trùng',
    context: 'Trường có một khoảng đất trống nhỏ cạnh hàng rào.',
    challenge: 'Đề xuất cách biến khoảng đất thành nơi thân thiện với ong, bướm và chim; ai sẽ chăm sóc?',
    refereeGuide: 'Có đề xuất cụ thể và phân công chăm sóc.',
    keyPoints: ['Đề xuất cụ thể (cây có hoa, nước, chỗ trú…)', 'Phân công chăm sóc', 'Cách giữ an toàn cho học sinh'],
    remember: 'Bảo vệ đa dạng sinh học có thể bắt đầu từ một khoảng đất nhỏ.',
  },
  {
    id: 'DEMO-bio-3b', theme: 'biodiversity', level: 3, timeSec: T3,
    title: 'Chuyến dã ngoại',
    context: 'Lớp sắp đi dã ngoại ở một khu rừng.',
    challenge: 'Đặt ra 3 quy tắc cho cả lớp để chuyến đi không làm hại cây cối và động vật, giải thích một quy tắc.',
    refereeGuide: 'Nêu 3 quy tắc hợp lý và giải thích được ít nhất một quy tắc.',
    keyPoints: ['Không bẻ cây, hái hoa', 'Mang rác về', 'Giữ yên lặng, không cho động vật ăn'],
    remember: 'Khi vào thiên nhiên, hãy để lại nơi đó như lúc mình đến.',
  },
];

/** Bộ rút thẻ DEMO: không lặp cho tới khi dùng hết một nhóm (chủ đề, cấp). */
export class DemoDeck {
  private used = new Set<string>();
  private readonly random: () => number;

  constructor(random: () => number) {
    this.random = random;
  }

  draw(theme: Theme, level: ChallengeLevel): DemoCard {
    let pool = DEMO_CARDS.filter((c) => c.theme === theme && c.level === level);
    if (pool.length === 0) pool = DEMO_CARDS.filter((c) => c.level === level);
    if (pool.length === 0) pool = [...DEMO_CARDS];
    let fresh = pool.filter((c) => !this.used.has(c.id));
    if (fresh.length === 0) {
      pool.forEach((c) => this.used.delete(c.id));
      fresh = pool;
    }
    const card = fresh[Math.floor(this.random() * fresh.length)];
    this.used.add(card.id);
    return card;
  }
}
