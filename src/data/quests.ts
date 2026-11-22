/**
 * Green Quest — 12 challenges (BR-T030). Source: BRAINROOT_QUEST_ABOUT_NEWS_CONTENT.md (draft, needs team review).
 *
 * GOVERNANCE:
 * - Titles/durations copied from the supplied file; no extra figures (no CO₂ / food-saving numbers: no source).
 * - No challenge asks for a purchase, a dangerous place, or photographing people without permission.
 * - Proof (photo/note) is optional and never collected: progress stays in this browser (localStorage).
 * - Badge names are the file's suggestions ("team names them"); mark as proposed until the team confirms.
 */

export type QuestTheme = 'Play' | 'Quest' | 'Learn' | 'Connect';

export interface QuestChallenge {
  readonly id: string;
  readonly theme: QuestTheme;
  readonly title: { readonly vi: string; readonly en: string };
  readonly time: { readonly vi: string; readonly en: string };
  /** Optional in-site link that helps do the challenge. */
  readonly cta?: {
    readonly to: string;
    readonly label: { readonly vi: string; readonly en: string };
  };
}

export const QUEST_HASHTAG = '#songxanhcungBrainroot';

export const QUEST_CHALLENGES: readonly QuestChallenge[] = [
  {
    id: 'Q-01',
    theme: 'Quest',
    title: {
      vi: '24 giờ không dùng ống hút/muỗng nhựa dùng một lần',
      en: '24 hours without single-use plastic straws or spoons',
    },
    time: { vi: '1 ngày', en: '1 day' },
  },
  {
    id: 'Q-02',
    theme: 'Quest',
    title: {
      vi: 'Mang bình nước/cốc riêng đi học 3 ngày liên tiếp',
      en: 'Bring your own bottle or cup to school 3 days in a row',
    },
    time: { vi: '3 ngày', en: '3 days' },
  },
  {
    id: 'Q-03',
    theme: 'Quest',
    title: {
      vi: '"Bữa tối đủ ăn": lên kế hoạch để không bỏ thừa đồ ăn một bữa',
      en: '"Just-enough dinner": plan one meal so no food is left over',
    },
    time: { vi: '1 bữa', en: '1 meal' },
  },
  {
    id: 'Q-04',
    theme: 'Learn',
    title: {
      vi: 'Tìm 1 món đồ trong nhà có thể sửa thay vì vứt, rồi sửa/nhờ người sửa',
      en: 'Find 1 item at home that can be repaired instead of thrown away, then fix it or ask someone to',
    },
    time: { vi: '30 phút', en: '30 minutes' },
  },
  {
    id: 'Q-05',
    theme: 'Learn',
    title: {
      vi: 'Trả lời bộ Quiz và đạt ít nhất 4/5 câu',
      en: 'Take the Quiz and get at least 4 out of 5 right',
    },
    time: { vi: '5 phút', en: '5 minutes' },
    cta: { to: '/learn', label: { vi: 'Mở Quiz ở Green Learn', en: 'Open the Quiz in Green Learn' } },
  },
  {
    id: 'Q-06',
    theme: 'Quest',
    title: {
      vi: 'Rút sạc/phích thiết bị không dùng trong phòng bạn, đếm xem rút được mấy cái',
      en: 'Unplug unused chargers/devices in your room and count how many you unplugged',
    },
    time: { vi: '10 phút', en: '10 minutes' },
  },
  {
    id: 'Q-07',
    theme: 'Play',
    title: {
      vi: 'Rủ 2 người bạn chơi 1 ván Truth or Dare Brainroot và thực hiện 1 Green Penalty',
      en: 'Invite 2 friends to play a round of Brainroot Truth or Dare and take 1 Green Penalty',
    },
    time: { vi: '20 phút', en: '20 minutes' },
    cta: {
      to: '/games/fact-act/play',
      label: { vi: 'Chơi Truth or Dare', en: 'Play Truth or Dare' },
    },
  },
  {
    id: 'Q-08',
    theme: 'Quest',
    title: {
      vi: 'Tách rác thành 2 nhóm (tái chế / còn lại) trong 3 ngày',
      en: 'Sort your waste into 2 groups (recyclable / other) for 3 days',
    },
    time: { vi: '3 ngày', en: '3 days' },
  },
  {
    id: 'Q-09',
    theme: 'Connect',
    title: {
      vi: 'Rủ lớp/CLB trao đổi đồ cũ (swap) 1 buổi, ghi lại số món được trao tay',
      en: 'Organize a class/club swap session for used items and note how many items changed hands',
    },
    time: { vi: '1 buổi', en: '1 session' },
  },
  {
    id: 'Q-10',
    theme: 'Quest',
    title: {
      vi: 'Đi bộ/xe đạp/xe buýt cho 1 quãng đường bạn thường đi xe máy',
      en: 'Walk, cycle or take the bus for one trip you usually make by motorbike',
    },
    time: { vi: '1 lần', en: '1 trip' },
  },
  {
    id: 'Q-11',
    theme: 'Learn',
    title: {
      vi: 'Chọn 1 fact trong Learn, giải thích lại bằng lời của bạn cho 1 người khác',
      en: 'Pick 1 fact in Learn and explain it in your own words to someone else',
    },
    time: { vi: '5 phút', en: '5 minutes' },
    cta: { to: '/learn', label: { vi: 'Đọc Green Learn', en: 'Read Green Learn' } },
  },
  {
    id: 'Q-12',
    theme: 'Connect',
    title: {
      vi: `Đăng ảnh/ghi chú thử thách của bạn kèm ${QUEST_HASHTAG} (tùy chọn)`,
      en: `Share a photo/note of your challenge with ${QUEST_HASHTAG} (optional)`,
    },
    time: { vi: '5 phút', en: '5 minutes' },
  },
];

export interface QuestBadge {
  readonly id: 'seed' | 'root' | 'tree';
  readonly threshold: 3 | 6 | 12;
  /** Proposed names from the supplied file; the team decides the final names. */
  readonly name: { readonly vi: string; readonly en: string };
}

export const QUEST_BADGES: readonly QuestBadge[] = [
  { id: 'seed', threshold: 3, name: { vi: 'Mầm xanh', en: 'Green Sprout' } },
  { id: 'root', threshold: 6, name: { vi: 'Rễ bén', en: 'Taking Root' } },
  { id: 'tree', threshold: 12, name: { vi: 'Cây Brainroot', en: 'Brainroot Tree' } },
];
