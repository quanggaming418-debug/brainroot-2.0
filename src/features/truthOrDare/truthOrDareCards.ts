/**
 * Brainroot - Truth or Dare: 20 thẻ công khai đã được chủ dự án duyệt (2026-11-21, ADR-0005).
 * Nguyên văn VI/EN từ bộ thẻ gốc của nhóm — KHÔNG viết lại. Các thẻ còn lại (~43/63) không công khai.
 * `theme` là đề xuất, chờ nhóm xác nhận. `proof` chỉ khuyến khích ảnh/đăng bài (tùy chọn).
 */
import type { CardTheme, TruthOrDareCardPair } from './truthOrDareData';

interface RawCard {
  readonly id: string;
  readonly truth: { readonly theme: CardTheme; readonly vi: string; readonly en: string };
  readonly dare: {
    readonly theme: CardTheme;
    readonly vi: string;
    readonly en: string;
    readonly timerSec?: number;
    readonly proof?: boolean;
  };
}

const RAW_CARDS: readonly RawCard[] = [
  {
    id: "TD-01",
    truth: {
      theme: "consumption",
      vi: "Trong tủ đồ của bạn có bao nhiêu món mua về chỉ mặc đúng 1 lần (hoặc chưa mặc lần nào) rồi bỏ xó?",
      en: "How many items in your wardrobe have you bought and only worn once (or never worn at all) before being left gathering dust?",
    },
    dare: {
      theme: "green-space",
      timerSec: 30,
      vi: "Hãy diễn tả lại vẻ mặt đau đớn, quằn quại của một chiếc cây khi bị ai đó vô tình ngắt lá mà không được dùng lời nói (chỉ dùng hình thể) trong 30 giây!",
      en: "Depict the pained, writhing expression of a tree whose leaves are accidentally plucked, without using words (only body language), within 30 seconds!",
    },
  },
  {
    id: "TD-02",
    truth: {
      theme: "consumption",
      vi: "Lần gần đây nhất bạn mua một món đồ xanh/sản phẩm sinh thái chỉ vì... bao bì nó đẹp để chụp ảnh đăng Story là khi nào?",
      en: "When was the last time you bought a green/eco-friendly item just because... its packaging was pretty enough to take a picture for your Story?",
    },
    dare: {
      theme: "general",
      vi: "Chia sẻ với cả nhóm hành động vì môi trường chắc chắn bạn sẽ làm và bắt đầu thay đổi từ hôm nay.",
      en: "Share your environmental action that you'll definitely do to start making a change today with this group.",
    },
  },
  {
    id: "TD-03",
    truth: {
      theme: "water",
      vi: "Đã bao giờ bạn tắt vòi nước khi đang đánh răng chưa, hay toàn \"quên\" để nước chảy tò tò?",
      en: "Have you ever turned off the tap while brushing your teeth, or do you always \"forget\" and leave the water running?",
    },
    dare: {
      theme: "general",
      proof: true,
      vi: "Đăng một bài viết trên vòng bạn bè kể về một hành động bạn từng làm và cho đó là điều tốt cho môi trường.",
      en: "Post a message on your social media about an action you once did that you considered good for the environment.",
    },
  },
  {
    id: "TD-04",
    truth: {
      theme: "green-space",
      vi: "Điều gì khiến bạn cảm thấy bình yên nhất giữa thiên nhiên?",
      en: "What brings you the most peace in nature?",
    },
    dare: {
      theme: "energy",
      vi: "Hãy chạy quanh phòng và hô to: \"Hãy tắt điện khi không sử dụng!\" theo 3 cảm xúc khác nhau.",
      en: "Run around the room and shout, \"Turn off the lights when you're not using them!\" using three different emotions.",
    },
  },
  {
    id: "TD-05",
    truth: {
      theme: "general",
      vi: "Thói quen nào của bạn đáng tự hào nhất? Vì sao?",
      en: "What habit of yours are you most proud of? Why?",
    },
    dare: {
      theme: "energy",
      timerSec: 300,
      vi: "Tắt tất cả thiết bị điện không cần thiết trong vòng 5 phút.",
      en: "Turn off all unnecessary electrical devices for 5 minutes.",
    },
  },
  {
    id: "TD-06",
    truth: {
      theme: "general",
      vi: "Điều gì bạn muốn thay đổi ở bản thân trong năm nay?",
      en: "What changes would you like to make in yourself this year?",
    },
    dare: {
      theme: "waste",
      vi: "Kể tên 5 loại rác thải sinh hoạt và phân loại theo: rác hữu cơ, rác vô cơ và rác tái chế.",
      en: "Name five types of household waste and classify them as: organic waste, inorganic waste, and recyclable waste.",
    },
  },
  {
    id: "TD-07",
    truth: {
      theme: "general",
      vi: "Kể về một lần bạn học được điều quý giá từ một sai lầm.",
      en: "Tell me about a time you learned a valuable lesson from a mistake.",
    },
    dare: {
      theme: "green-space",
      vi: "Tưới nước vào cây/hoa gần bạn nhất.",
      en: "Water the plant closest to you.",
    },
  },
  {
    id: "TD-08",
    truth: {
      theme: "general",
      vi: "Khoảnh khắc nào gần đây khiến bạn biết ơn cuộc sống?",
      en: "What recent moment made you grateful for life?",
    },
    dare: {
      theme: "waste",
      vi: "Nhặt 3 mẩu rác gần bạn vứt đúng nơi quy định.",
      en: "Pick up 3 pieces of trash near you and dispose of them in the designated bin.",
    },
  },
  {
    id: "TD-09",
    truth: {
      theme: "general",
      vi: "Nếu hôm nay là một khởi đầu mới, bạn sẽ làm khác điều gì?",
      en: "If today were a new beginning, what would you do differently?",
    },
    dare: {
      theme: "waste",
      proof: true,
      vi: "Đổi chai nhựa dùng một lần thành bình nước cá nhân cho ngày mai, chụp ảnh làm minh chứng.",
      en: "Replace your disposable plastic bottles with personal water bottles for tomorrow, and take a photo as proof.",
    },
  },
  {
    id: "TD-10",
    truth: {
      theme: "general",
      vi: "Thói quen sống xanh nào bạn thấy dễ duy trì nhất?",
      en: "Which green living habits do you find easiest to maintain?",
    },
    dare: {
      theme: "consumption",
      vi: "Giới thiệu một sản phẩm thân thiện với môi trường mà bạn biết và thuyết phục ít nhất 01 người sử dụng nó.",
      en: "Introduce an eco-friendly product that you know and convince at least one person to use it.",
    },
  },
  {
    id: "TD-11",
    truth: {
      theme: "general",
      vi: "Theo bạn, điều gì khiến nhiều người ngại sống xanh?",
      en: "In your opinion, what makes many people hesitant to live sustainably?",
    },
    dare: {
      theme: "consumption",
      proof: true,
      vi: "Mang theo một món đồ có thể dùng nhiều lần trong lần ra ngoài tiếp theo. Nhớ chụp ảnh làm minh chứng nha!",
      en: "Bring along an item you can use multiple times on your next trip. Remember to take a picture as proof!",
    },
  },
  {
    id: "TD-12",
    truth: {
      theme: "green-space",
      vi: "Mùa nào khiến bạn cảm thấy gần gũi với thiên nhiên nhất? Vì sao?",
      en: "Which season makes you feel closest to nature? Why?",
    },
    dare: {
      theme: "waste",
      timerSec: 60,
      vi: "Sáng tạo một sản phẩm từ giấy vụn trong 1 phút.",
      en: "Create a product from scrap paper in 1 minute.",
    },
  },
  {
    id: "TD-13",
    truth: {
      theme: "general",
      vi: "Điều gì khiến bạn tiếc nuối khi nghĩ về môi trường hiện nay?",
      en: "What do you regret when you think about the current state of the environment?",
    },
    dare: {
      theme: "waste",
      vi: "Nêu ý tưởng biến một vật bỏ đi thành món đồ hữu ích.",
      en: "Present your ideas on how to transform a discarded item into something useful.",
    },
  },
  {
    id: "TD-14",
    truth: {
      theme: "green-space",
      vi: "Âm thanh thiên nhiên nào bạn thích nhất? Vì sao?",
      en: "What are your favorite nature sounds? Why?",
    },
    dare: {
      theme: "climate",
      timerSec: 60,
      vi: "Trong vòng 1 phút, nghĩ và kể một câu chuyện về Trái Đất vào năm 2050.",
      en: "In one minute, think of and tell a story about Earth in 2050.",
    },
  },
  {
    id: "TD-15",
    truth: {
      theme: "general",
      vi: "Kể về một hành động tử tế bạn từng nhận được.",
      en: "Tell me about an act of kindness you once received.",
    },
    dare: {
      theme: "waste",
      vi: "Lập danh sách 3 việc bạn sẽ làm để giảm thiểu rác thải tuần này.",
      en: "Make a list of 3 things you will do to reduce waste this week.",
    },
  },
  {
    id: "TD-16",
    truth: {
      theme: "consumption",
      vi: "Giới thiệu một sản phẩm thân thiện với môi trường mà bạn FOMO thành công.",
      en: "Introduce an eco-friendly product that you successfully FOMO about.",
    },
    dare: {
      theme: "waste",
      vi: "Chọn một ngày trong tuần thực hiện thử thách không dùng túi nilon.",
      en: "Choose one day of the week to take on the no-plastic-bag challenge.",
    },
  },
  {
    id: "TD-17",
    truth: {
      theme: "consumption",
      vi: "List ra 03 yếu tố phải cân nhắc trước khi quyết định \"chốt đơn\".",
      en: "List three factors to consider before deciding to finalize the purchase.",
    },
    dare: {
      theme: "consumption",
      vi: "Lấy một sản phẩm skincare (hoặc sản phẩm khác có sẵn). Kiểm tra nhanh bảng thành phần xem có chứa hạt vi nhựa (microplastics) hay hóa chất gây hại rạn san hô không và báo cáo.",
      en: "Take a skincare product (or any other product you have available). Quickly check the ingredient list for microplastics or chemicals that are harmful to coral reefs and report it.",
    },
  },
  {
    id: "TD-18",
    truth: {
      theme: "consumption",
      vi: "Kể về lần bạn từ bỏ một món đồ không thật sự cần.",
      en: "Tell me about a time you gave up an item you didn't really need.",
    },
    dare: {
      theme: "waste",
      vi: "Nhắm mắt lại. Để những người khác đặt vào tay bạn 3 món đồ bất kỳ đang có trên bàn/trong phòng. Bằng cách sờ, bạn phải đoán xem món đồ nào mất nhiều thời gian phân hủy nhất nếu bị vứt ra bãi rác.",
      en: "Close your eyes. Have others place three random items from the table/room into your hands. By touching the items, you guess which one would take the longest time to decompose if thrown into a landfill.",
    },
  },
  {
    id: "TD-19",
    truth: {
      theme: "consumption",
      vi: "Nếu chỉ giữ 10 món đồ lên hoang đảo, bạn sẽ chọn những gì?",
      en: "If you could only take 10 items to a deserted island, what would you choose?",
    },
    dare: {
      theme: "green-space",
      timerSec: 15,
      vi: "Không được phát ra tiếng động, hãy dùng ngôn ngữ cơ thể diễn tả lại quá trình một hạt mầm vươn lên thành một cây cổ thụ trong vòng 15 giây.",
      en: "Without making a sound, use body language to depict the process of a seed growing into a mature tree within 15 seconds.",
    },
  },
  {
    id: "TD-20",
    truth: {
      theme: "consumption",
      vi: "Món đồ nào bạn nghĩ nên được chia sẻ thay vì sở hữu riêng?",
      en: "What item do you think should be shared rather than owned exclusively?",
    },
    dare: {
      theme: "energy",
      vi: "Rác thải số cũng tiêu tốn năng lượng máy chủ. Hãy mở hòm thư email của bạn lên và hủy đăng ký (unsubscribe) ngay lập tức 3 bản tin quảng cáo mà bạn không bao giờ đọc.",
      en: "Digital waste also consumes server energy. Open your email inbox and immediately unsubscribe from those three promotional newsletters that you never read.",
    },
  },
];

export const APPROVED_PUBLIC_CARDS: readonly TruthOrDareCardPair[] = RAW_CARDS.map(
  (raw) => ({
    pairId: raw.id,
    cardNumber: raw.id.replace('TD-', ''),
    approvalStatus: 'approved_public',
    truthText: { vi: raw.truth.vi, en: raw.truth.en },
    truthTheme: raw.truth.theme,
    dareText: { vi: raw.dare.vi, en: raw.dare.en },
    dareTheme: raw.dare.theme,
    dareTimerSec: raw.dare.timerSec ?? null,
    dareProof: raw.dare.proof === true,
  }),
);
