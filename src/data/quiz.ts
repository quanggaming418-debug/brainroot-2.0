/**
 * Green Learn — Quiz bank (BR-T029). 12 questions from BRAINROOT_LEARN_QUIZ_CONTENT.md (draft v1).
 * `answer` is the index of the correct option in `options`; the UI shuffles positions on display.
 * Every question points to a fact in learnFacts.ts via `factId` (source shown after answering).
 * Explanations only restate the sourced fact — no extra figures.
 */

import type { LearnFactTopicId } from './learnFacts';

export type QuizTopic = 'waste' | 'consumption' | 'energy' | 'water' | 'action';

export interface QuizQuestion {
  readonly id: string;
  readonly topic: QuizTopic;
  readonly factId: string;
  readonly topicId: LearnFactTopicId;
  readonly q: { readonly vi: string; readonly en: string };
  readonly options: {
    readonly vi: readonly [string, string, string, string];
    readonly en: readonly [string, string, string, string];
  };
  readonly answer: 0 | 1 | 2 | 3;
  readonly explain: { readonly vi: string; readonly en: string };
}

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 'Q-01',
    topic: 'waste',
    factId: 'F-RT-1',
    topicId: 'learn-waste',
    q: {
      vi: 'Ở Việt Nam, khoảng bao nhiêu % trong 3,9 triệu tấn nhựa thông dụng thải ra mỗi năm được thu hồi và tái chế?',
      en: 'In Vietnam, roughly what share of the 3.9 million tonnes of common plastics disposed each year is recovered and recycled?',
    },
    options: { vi: ['5%', '33%', '60%', '90%'], en: ['5%', '33%', '60%', '90%'] },
    answer: 1,
    explain: { vi: 'Chỉ khoảng một phần ba (33%).', en: 'Only about one third (33%).' },
  },
  {
    id: 'Q-02',
    topic: 'waste',
    factId: 'F-RT-2',
    topicId: 'learn-waste',
    q: {
      vi: 'Theo khảo sát của World Bank ở bờ sông/bờ biển Việt Nam, nhựa chiếm bao nhiêu % số món rác?',
      en: 'In World Bank surveys of Vietnamese riverbanks and coasts, what share of litter items was plastic?',
    },
    options: { vi: ['24%', '54%', '74%', '94%'], en: ['24%', '54%', '74%', '94%'] },
    answer: 3,
    explain: { vi: 'Nhựa chiếm 94% số món rác ở các điểm khảo sát.', en: 'Plastic made up 94% of litter items at the surveyed sites.' },
  },
  {
    id: 'Q-03',
    topic: 'waste',
    factId: 'F-RT-3',
    topicId: 'learn-waste',
    q: {
      vi: 'Một người Việt dùng trung bình khoảng bao nhiêu kg nhựa mỗi năm?',
      en: 'About how many kg of plastic does an average person in Vietnam consume per year?',
    },
    options: { vi: ['4,1 kg', '41,3 kg', '413 kg', '1.000 kg'], en: ['4.1 kg', '41.3 kg', '413 kg', '1,000 kg'] },
    answer: 1,
    explain: { vi: 'Khoảng 41,3 kg mỗi năm, tương đương khoảng 7.600 túi nilon.', en: 'About 41.3 kg a year, roughly 7,600 plastic bags.' },
  },
  {
    id: 'Q-04',
    topic: 'consumption',
    factId: 'F-TD-1',
    topicId: 'learn-consumption',
    q: {
      vi: 'Theo UN, cứ mỗi giây, lượng quần áo tương đương cái gì bị đốt hoặc chôn lấp?',
      en: 'According to the UN, every second the equivalent of what is burned or landfilled in clothing?',
    },
    options: {
      vi: ['Một chiếc áo', 'Một thùng giặt', 'Một xe rác', 'Một container tàu'],
      en: ['One shirt', 'One laundry basket', 'One garbage truck', 'One shipping container'],
    },
    answer: 2,
    explain: { vi: 'Tương đương một xe rác quần áo mỗi giây.', en: 'The equivalent of a garbage truck of clothing every second.' },
  },
  {
    id: 'Q-05',
    topic: 'consumption',
    factId: 'F-TD-2',
    topicId: 'learn-consumption',
    q: {
      vi: 'Ngành thời trang chiếm tới khoảng bao nhiêu % phát thải khí nhà kính toàn cầu?',
      en: 'Up to roughly what percentage of global greenhouse gas emissions comes from fashion?',
    },
    options: { vi: ['0,8%', '8%', '28%', '48%'], en: ['0.8%', '8%', '28%', '48%'] },
    answer: 1,
    explain: { vi: 'Ngành thời trang tạo ra tới 8% phát thải khí nhà kính toàn cầu.', en: 'Fashion produces up to 8% of global greenhouse gas emissions.' },
  },
  {
    id: 'Q-06',
    topic: 'consumption',
    factId: 'F-TD-3',
    topicId: 'learn-consumption',
    q: {
      vi: 'Khoảng bao nhiêu % sợi dùng cho quần áo mới đến từ vải tái chế?',
      en: 'About what share of fibres for new clothing comes from recycled textiles?',
    },
    options: { vi: ['1%', '21%', '51%', '81%'], en: ['1%', '21%', '51%', '81%'] },
    answer: 0,
    explain: { vi: 'Chỉ khoảng 1% — mặc lâu hơn, sửa và đổi đồ cũ là lựa chọn tốt.', en: 'Only about 1% — wearing clothes longer, repairing and swapping help.' },
  },
  {
    id: 'Q-07',
    topic: 'energy',
    factId: 'F-NL-1',
    topicId: 'learn-energy',
    q: {
      vi: '"Điện chờ" của thiết bị tắt nhưng chưa rút phích chiếm trung bình khoảng bao nhiêu điện sinh hoạt ở các nước OECD?',
      en: 'Standby power is roughly what share of household electricity in OECD countries?',
    },
    options: { vi: ['~1%', '~10%', '~40%', '~70%'], en: ['~1%', '~10%', '~40%', '~70%'] },
    answer: 1,
    explain: { vi: 'Trung bình khoảng 10%, tương đương một bóng 60W bật liên tục trong mỗi hộ (số liệu OECD).', en: 'About 10% on average, equal to a 60W bulb on continuously in every home (OECD data).' },
  },
  {
    id: 'Q-08',
    topic: 'energy',
    factId: 'F-NL-1',
    topicId: 'learn-energy',
    q: {
      vi: 'Cải tiến thiết kế có thể giảm điện chờ trung bình khoảng bao nhiêu?',
      en: 'Design improvements can cut standby power by about how much?',
    },
    options: { vi: ['5%', '25%', '75%', '100%'], en: ['5%', '25%', '75%', '100%'] },
    answer: 2,
    explain: { vi: 'Khoảng 75% (số liệu IEA).', en: 'About 75% (IEA data).' },
  },
  {
    id: 'Q-09',
    topic: 'water',
    factId: 'F-N-1',
    topicId: 'learn-water',
    q: {
      vi: 'Năm 2024, bao nhiêu người trên thế giới chưa có nước uống quản lý an toàn?',
      en: 'In 2024, how many people worldwide lacked safely managed drinking water?',
    },
    options: {
      vi: ['21 triệu', '210 triệu', '2,1 tỷ', '7,1 tỷ'],
      en: ['21 million', '210 million', '2.1 billion', '7.1 billion'],
    },
    answer: 2,
    explain: { vi: '2,1 tỷ người, tức khoảng 1/4 dân số thế giới.', en: '2.1 billion people, about 1 in 4 worldwide.' },
  },
  {
    id: 'Q-10',
    topic: 'water',
    factId: 'F-N-2',
    topicId: 'learn-water',
    q: {
      vi: 'Độ phủ nước uống an toàn toàn cầu tăng từ bao nhiêu lên bao nhiêu giữa 2015 và 2024?',
      en: 'Global safely managed drinking-water coverage rose from what to what between 2015 and 2024?',
    },
    options: { vi: ['38%→44%', '68%→74%', '48%→58%', '88%→94%'], en: ['38%→44%', '68%→74%', '48%→58%', '88%→94%'] },
    answer: 1,
    explain: { vi: 'Từ 68% lên 74%, với 961 triệu người có thêm nước uống an toàn.', en: 'From 68% to 74%, with 961 million more people gaining safe drinking water.' },
  },
  {
    id: 'Q-11',
    topic: 'action',
    factId: 'F-RT-2',
    topicId: 'learn-waste',
    q: {
      vi: 'Việc nào giúp giảm rác nhựa nhiều nhất khi đặt đồ ăn mang đi?',
      en: 'What cuts the most plastic waste when ordering takeaway?',
    },
    options: {
      vi: ['Xin thêm ống hút', 'Từ chối muỗng/ống hút nhựa, mang hộp riêng', 'Gói từng món riêng', 'Vứt chung một túi'],
      en: ['Ask for extra straws', 'Refuse plastic cutlery/straws and bring your own container', 'Wrap each item separately', 'Throw everything in one bag'],
    },
    answer: 1,
    explain: { vi: 'Bao bì đồ ăn mang đi là nguồn rác nhựa nhiều nhất trong khảo sát của World Bank.', en: 'Takeaway packaging was the largest source of plastic litter in the World Bank survey.' },
  },
  {
    id: 'Q-12',
    topic: 'action',
    factId: 'F-NL-1',
    topicId: 'learn-energy',
    q: {
      vi: '"Tắt nhưng chưa rút điện" nghĩa là gì?',
      en: 'What does "switched off but not unplugged" mean?',
    },
    options: {
      vi: ['Thiết bị hỏng', 'Thiết bị vẫn tiêu thụ điện ở chế độ chờ', 'Thiết bị tự sạc pin', 'Thiết bị đang tái chế'],
      en: ['The device is broken', 'The device still draws power in standby', 'The device charges its own battery', 'The device is recycling'],
    },
    answer: 1,
    explain: { vi: 'Thiết bị vẫn tiêu thụ điện ở chế độ chờ — rút sạc hoặc dùng ổ cắm có công tắc.', en: 'The device still draws standby power — unplug chargers or use a switched socket.' },
  },
];
