/**
 * Green Learn — sourced facts (BR-T029). Source: BRAINROOT_LEARN_QUIZ_CONTENT.md (draft v1, looked up 2026-11-21).
 *
 * GOVERNANCE:
 * - Numbers are copied as supplied; never edit them or add figures that are not in the supplied file.
 * - `year` is null when the supplied file gives no year (do not guess).
 * - Held back (NOT in this file, NOT shown): the "9 m² green space per person" threshold and the
 *   "0.5 ha within 300 m" distance recommendation — no verified original WHO text yet.
 * - No Vietnam-specific facts yet for Water and Energy; the UI states this honestly.
 * - Content is AI-drafted from public sources and still needs team/lecturer review.
 */

export type LearnFactTopicId =
  | 'learn-consumption'
  | 'learn-water'
  | 'learn-energy'
  | 'learn-waste'
  | 'learn-green-spaces';

export interface LearnFactSource {
  readonly name: string;
  readonly url: string;
  readonly year: number | null;
}

export interface LearnFact {
  readonly id: string;
  readonly topicId: LearnFactTopicId;
  readonly vi: string;
  readonly en: string;
  readonly source: LearnFactSource;
  /** Extra scope note that must stay visible next to the number (e.g. "OECD, not Vietnam"). */
  readonly scopeNote?: { readonly vi: string; readonly en: string };
}

export const LEARN_FACTS: readonly LearnFact[] = [
  {
    id: 'F-RT-1',
    topicId: 'learn-waste',
    vi: 'Tại Việt Nam chỉ khoảng 33% trong 3,9 triệu tấn nhựa thông dụng thải ra mỗi năm được thu hồi và tái chế.',
    en: 'In Vietnam, only about 33% of the 3.9 million tonnes of common plastics disposed of each year is recovered and recycled.',
    source: {
      name: 'IFC / World Bank',
      url: 'https://www.ifc.org/en/pressroom/2021/managing-plastic-as-a-valuable-resource-will-help-address-marine-pollution-promote-a-circular-economy-in-vietnam-world-bank-group-report',
      year: 2021,
    },
  },
  {
    id: 'F-RT-2',
    topicId: 'learn-waste',
    vi: 'Ước tính 3,1 triệu tấn rác nhựa thải ra đất liền ở Việt Nam mỗi năm; nhựa chiếm 94% số món rác ở các điểm khảo sát bờ sông/bờ biển. Bao bì đồ ăn mang đi là nguồn rác nhựa nhiều nhất trong khảo sát.',
    en: 'An estimated 3.1 million tonnes of plastic waste are discarded on land in Vietnam each year; plastic made up 94% of litter items at surveyed riverbank/coastal sites. Takeaway food packaging was the largest source of plastic litter in the survey.',
    source: {
      name: 'World Bank',
      url: 'https://www.worldbank.org/en/country/vietnam/publication/towards-a-national-single-use-plastics-roadmap-in-vietnam-strategies-and-options-for-reducing-priority-single-use-plasti',
      year: 2022,
    },
  },
  {
    id: 'F-RT-3',
    topicId: 'learn-waste',
    vi: 'Trung bình một người Việt dùng khoảng 41,3 kg nhựa mỗi năm (tương đương khoảng 7.600 túi nilon).',
    en: 'An average person in Vietnam uses about 41.3 kg of plastic per year (roughly 7,600 plastic bags).',
    source: {
      name: 'World Bank blog',
      url: 'https://blogs.worldbank.org/en/eastasiapacific/stopping-flow-vietnams-plastics-ocean',
      year: null,
    },
  },
  {
    id: 'F-TD-1',
    topicId: 'learn-consumption',
    vi: 'Mỗi giây, lượng quần áo tương đương một xe rác bị đốt hoặc chôn lấp.',
    en: 'Every second, the equivalent of a garbage truck of clothing is burned or sent to landfill.',
    source: {
      name: 'UN News',
      url: 'https://news.un.org/en/story/2025/03/1161636',
      year: 2025,
    },
  },
  {
    id: 'F-TD-2',
    topicId: 'learn-consumption',
    vi: 'Ngành thời trang tạo ra tới 8% phát thải khí nhà kính toàn cầu.',
    en: 'The fashion industry produces up to 8% of global greenhouse gas emissions.',
    source: {
      name: 'UNEP',
      url: 'https://www.unep.org/en/news-and-stories/story/five-ways-reduce-waste-fashion-industry',
      year: null,
    },
  },
  {
    id: 'F-TD-3',
    topicId: 'learn-consumption',
    vi: 'Chỉ khoảng 1% sợi dùng cho quần áo mới đến từ vải tái chế.',
    en: 'Only about 1% of the fibre used for new clothing comes from recycled clothing.',
    source: {
      name: 'Textile Exchange, cited by UNEP',
      url: 'https://unep.org/news-and-stories/story/five-ways-reduce-waste-fashion-industry',
      year: null,
    },
  },
  {
    id: 'F-NL-1',
    topicId: 'learn-energy',
    vi: 'Thiết bị "tắt nhưng chưa rút điện" (điện chờ) chiếm tới 13% điện sinh hoạt ở một số nước OECD, trung bình khoảng 10% — tương đương một bóng đèn 60W bật liên tục trong mỗi hộ. Cải tiến thiết kế có thể giảm khoảng 75%.',
    en: 'Devices that are "switched off but not unplugged" (standby power) account for up to 13% of household electricity in some OECD countries, about 10% on average — equal to a 60W bulb left on continuously in every home. Design improvements could cut it by about 75%.',
    source: {
      name: 'IEA',
      url: 'https://www.iea.org/news/switched-off-but-not-unplugged',
      year: null,
    },
    scopeNote: {
      vi: 'Số liệu ở các nước OECD, không phải riêng Việt Nam.',
      en: 'Figures are for OECD countries, not Vietnam specifically.',
    },
  },
  {
    id: 'F-N-1',
    topicId: 'learn-water',
    vi: 'Năm 2024, 2,1 tỷ người (1/4 dân số thế giới) chưa có nước uống quản lý an toàn, trong đó 106 triệu người uống trực tiếp nước mặt chưa xử lý.',
    en: 'In 2024, 2.1 billion people (1 in 4 worldwide) still lacked safely managed drinking water, including 106 million who drank untreated surface water.',
    source: {
      name: 'WHO / UNICEF JMP',
      url: 'https://www.who.int/news/item/26-08-2025-1-in-4-people-globally-still-lack-access-to-safe-drinking-water---who--unicef',
      year: 2025,
    },
    scopeNote: {
      vi: 'Số liệu toàn cầu, không phải riêng Việt Nam.',
      en: 'Global figure, not Vietnam specifically.',
    },
  },
  {
    id: 'F-N-2',
    topicId: 'learn-water',
    vi: 'Từ 2015 đến 2024, 961 triệu người có thêm nước uống an toàn; độ phủ toàn cầu tăng từ 68% lên 74%.',
    en: 'Between 2015 and 2024, 961 million more people gained safe drinking water; global coverage rose from 68% to 74%.',
    source: {
      name: 'UNICEF Data (JMP report)',
      url: 'https://data.unicef.org/resources/jmp-report-2025/',
      year: 2025,
    },
    scopeNote: {
      vi: 'Số liệu toàn cầu, không phải riêng Việt Nam.',
      en: 'Global figure, not Vietnam specifically.',
    },
  },
];

export function getFactsForTopic(topicId: string): readonly LearnFact[] {
  return LEARN_FACTS.filter((f) => f.topicId === topicId);
}

export function getFactById(id: string): LearnFact | undefined {
  return LEARN_FACTS.find((f) => f.id === id);
}
