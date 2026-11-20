/**
 * Fact–Act Digital Trial Engine — Pure Data Schema & Finite State Machine.
 *
 * GOVERNANCE NOTICE (BR-T005 / OQ-01 / OQ-03):
 * - No team-approved public sample deck file exists in the repository yet.
 * - Therefore APPROVED_PUBLIC_CARDS is intentionally empty, and the interactive
 *   trial runs on explicitly separated INTERNAL_DEMO_FIXTURES marked
 *   `reviewStatus: 'internal_demo_fixture'` and `publicTrialAllowed: false`.
 * - No paid physical card deck content is exposed.
 * - No scientific statistics, percentages, survey numbers, or external URLs are fabricated.
 */

export type FactActReviewStatus =
  | 'approved'
  | 'internal_demo_fixture'
  | 'draft_unapproved';

export type FactActTopic =
  | 'Tiêu dùng bền vững'
  | 'Nước'
  | 'Năng lượng'
  | 'Rác thải'
  | 'Không gian xanh';

export interface FactActChoice {
  readonly id: string;
  readonly label: string;
  readonly outcomeTitle: string;
  readonly feedback: string;
  readonly isRecommended: boolean;
}

export interface FactActCard {
  readonly id: string;
  readonly topic: FactActTopic;
  readonly kind: 'fact-act-pair';
  readonly factHeading: string;
  readonly prompt: string;
  readonly actionPrompt: string;
  readonly choices: readonly FactActChoice[];
  readonly sourceId: string;
  readonly sourceNote: string;
  readonly reflectionPrompt: string;
  readonly reflectionSuggestions: readonly string[];
  readonly reviewStatus: FactActReviewStatus;
  readonly publicTrialAllowed: boolean;
}

export type FactActStep =
  | 'idle'
  | 'fact'
  | 'action'
  | 'feedback'
  | 'reflection'
  | 'complete';

export interface CompletedFactActRecord {
  readonly cardId: string;
  readonly topic: FactActTopic;
  readonly selectedChoiceId: string;
  readonly selectedChoiceLabel: string;
  readonly isRecommended: boolean;
  readonly reflectionNote: string;
  readonly reflectionSkipped: boolean;
}

export interface FactActTrialState {
  readonly step: FactActStep;
  readonly deckMode: 'approved' | 'internal_demo_fixture';
  readonly cards: readonly FactActCard[];
  readonly currentIndex: number;
  readonly selectedChoiceId: string | null;
  readonly reflectionDraft: string;
  readonly completedRecords: readonly CompletedFactActRecord[];
}

export const FACT_ACT_TRIAL_DISCLOSURE = {
  badge: 'Dữ liệu mẫu thử nghiệm nội bộ · Chờ duyệt BR-T005',
  heading: 'Chế độ thử nghiệm vòng lặp Fact → Act → Phản tư',
  summary:
    'Bộ thẻ mẫu công khai chính thức (BR-T005) đang chờ nhóm nội dung Brainroot duyệt và gắn nguồn tham khảo. Các tình huống dưới đây là dữ liệu minh họa nội bộ tách biệt hoàn toàn với bộ thẻ vật lý trả phí, dùng để kiểm chứng trải nghiệm tương tác.',
  noPaidContentNote:
    'Không chứa nội dung từ bộ thẻ vật lý trả phí và không sử dụng số liệu hay đường dẫn bên ngoài chưa kiểm duyệt.',
} as const;

/**
 * Approved public sample cards — empty until BR-T005 delivers verified content.
 */
export const APPROVED_PUBLIC_CARDS: readonly FactActCard[] = [];

/**
 * Internal demonstration fixtures — explicitly isolated from approved public content.
 * Zero invented statistics, percentages, citations, or external URLs.
 */
export const INTERNAL_DEMO_FIXTURES: readonly FactActCard[] = [
  {
    id: 'demo-fa-01-waste',
    topic: 'Rác thải',
    kind: 'fact-act-pair',
    factHeading: 'Nhựa dùng một lần trong giờ nghỉ giữa tiết',
    prompt:
      'Tình huống minh họa nội bộ: Trong một buổi sinh hoạt câu lạc bộ sinh viên, mỗi đồ uống mang đi thường đi kèm ly nhựa, nắp, ống hút và túi nilon chỉ dùng trong thời gian ngắn rồi bỏ đi, làm tăng nhanh lượng rác khó tái chế tại khu học tập.',
    actionPrompt:
      'Nếu bạn là thành viên chuẩn bị cho buổi sinh hoạt tuần tới, hành động nào vừa khả thi vừa giảm phát sinh rác ngay từ đầu?',
    choices: [
      {
        id: 'demo-fa-01-a',
        label: 'Nhắc mọi người mang bình cá nhân và chuẩn bị một bình nước chung có thể châm thêm.',
        outcomeTitle: 'Giảm rác ngay từ nguồn',
        feedback:
          'Lựa chọn này cắt giảm trực tiếp nhu cầu dùng ly và túi dùng một lần thay vì chỉ xử lý rác sau khi buổi sinh hoạt kết thúc. Khi có phương án thay thế sẵn sàng, người tham gia dễ hưởng ứng hơn.',
        isRecommended: true,
      },
      {
        id: 'demo-fa-01-b',
        label: 'Vẫn mua đồ uống đóng ly nhựa sẵn nhưng đặt thêm một thùng rác lớn ở cuối phòng.',
        outcomeTitle: 'Thu gom gọn nhưng chưa giảm phát sinh',
        feedback:
          'Thu gom rác đúng chỗ giúp không gian sạch hơn, nhưng lượng nhựa dùng một lần thải ra vẫn giữ nguyên. Trong thực hành xanh, ưu tiên giảm phát sinh trước khi thu gom và xử lý.',
        isRecommended: false,
      },
      {
        id: 'demo-fa-01-c',
        label: 'Cấm toàn bộ đồ uống trong phòng mà không báo trước hay gợi ý giải pháp thay thế.',
        outcomeTitle: 'Dễ gây khó chịu và khó duy trì',
        feedback:
          'Quy định đột ngột thiếu chuẩn bị có thể khiến người tham gia ngại hưởng ứng ở các buổi sau. Kỹ năng xanh bền vững cần sự đồng thuận và hướng dẫn cụ thể.',
        isRecommended: false,
      },
    ],
    sourceId: 'INTERNAL-DEMO-FIXTURE-PENDING-BR-T005',
    sourceNote:
      'Tình huống mẫu nội bộ dùng để kiểm thử luồng Fact → Act → Phản tư; chưa phải thẻ đã duyệt phát hành công khai.',
    reflectionPrompt:
      'Điều gì thường khiến bạn hoặc nhóm bạn ngại mang theo bình nước cá nhân, và một cách nhắc nhỏ nhẹ nào có thể giúp thói quen này dễ hơn?',
    reflectionSuggestions: [
      'Để sẵn bình nước cạnh cặp sách từ tối hôm trước',
      'Gửi lời nhắc ngắn kèm địa điểm lấy nước uống miễn phí',
    ],
    reviewStatus: 'internal_demo_fixture',
    publicTrialAllowed: false,
  },
  {
    id: 'demo-fa-02-energy',
    topic: 'Năng lượng',
    kind: 'fact-act-pair',
    factHeading: 'Thiết bị điện vẫn chạy trong phòng học trống',
    prompt:
      'Tình huống minh họa nội bộ: Sau khi kết thúc tiết học cuối buổi sáng, quạt trần, đèn và máy chiếu ở phòng học thường bị quên tắt trong lúc chờ ca học tiếp theo, gây lãng phí điện năng không cần thiết.',
    actionPrompt:
      'Bạn đề xuất cách phối hợp nào để lớp học duy trì thói quen tắt thiết bị điện khi rời phòng?',
    choices: [
      {
        id: 'demo-fa-02-a',
        label: 'Phân công luân phiên hai bạn ra sau cùng kiểm tra nhanh công tắc đèn, quạt và máy chiếu trước khi khép cửa.',
        outcomeTitle: 'Thói quen tập thể rõ ràng',
        feedback:
          'Khi trách nhiệm được chia đều theo nhóm nhỏ và gắn với thao tác đóng cửa quen thuộc, lớp học dễ duy trì thói quen tiết kiệm điện mà không tạo áp lực cho riêng ai.',
        isRecommended: true,
      },
      {
        id: 'demo-fa-02-b',
        label: 'Chờ nhân viên quản lý tòa nhà đi kiểm tra vào cuối ngày.',
        outcomeTitle: 'Thiết bị vẫn tiêu thụ điện suốt nhiều giờ trống',
        feedback:
          'Phụ thuộc hoàn toàn vào bộ phận vận hành khiến thiết bị chạy không tải trong thời gian dài giữa các ca học và bỏ lỡ cơ hội rèn ý thức chủ động của người học.',
        isRecommended: false,
      },
      {
        id: 'demo-fa-02-c',
        label: 'Chỉ tắt đèn ở hàng ghế mình ngồi, giữ nguyên máy chiếu và các dãy còn lại.',
        outcomeTitle: 'Mới giảm được một phần nhỏ',
        feedback:
          'Tắt một phần là tín hiệu tốt, nhưng máy chiếu và thiết bị chung ở trạng thái chờ vẫn tiêu tốn điện và giảm tuổi thọ bóng đèn nếu không được tắt đúng cách.',
        isRecommended: false,
      },
    ],
    sourceId: 'INTERNAL-DEMO-FIXTURE-PENDING-BR-T005',
    sourceNote:
      'Tình huống mẫu nội bộ dùng để kiểm thử luồng Fact → Act → Phản tư; chưa phải thẻ đã duyệt phát hành công khai.',
    reflectionPrompt:
      'Ở lớp học hoặc góc học tập hiện tại, thiết bị nào hay bị bỏ quên bật lâu nhất khi không dùng đến?',
    reflectionSuggestions: [
      'Quạt và đèn ở cuối phòng học khi tan ca',
      'Bộ sạc hoặc màn hình máy tính để chế độ chờ quá lâu',
    ],
    reviewStatus: 'internal_demo_fixture',
    publicTrialAllowed: false,
  },
  {
    id: 'demo-fa-03-consumption',
    topic: 'Tiêu dùng bền vững',
    kind: 'fact-act-pair',
    factHeading: 'Mua mới hay dùng lại học cụ đầu kỳ học',
    prompt:
      'Tình huống minh họa nội bộ: Mỗi đầu học kỳ, nhiều học sinh và sinh viên có thói quen mua mới hoàn toàn giáo trình, sổ ghi chép và vật dụng sự kiện dù nhiều tài liệu vẫn còn dùng tốt từ khóa trước.',
    actionPrompt:
      'Cách nào giúp cộng đồng lớp hoặc câu lạc bộ kéo dài vòng đời học cụ một cách thiết thực?',
    choices: [
      {
        id: 'demo-fa-03-a',
        label: 'Tổ chức một góc trao đổi hoặc mượn giáo trình cũ và kiểm kê đồ dùng còn sử dụng được trước khi mua mới.',
        outcomeTitle: 'Kéo dài vòng đời đồ dùng và tiết kiệm chi phí',
        feedback:
          'Kiểm kê trước khi mua và trao đổi giữa các khóa giúp giảm tiêu thụ tài nguyên mới, giảm rác giấy/nhựa sau kỳ học, đồng thời tăng sự gắn kết giữa sinh viên các khóa.',
        isRecommended: true,
      },
      {
        id: 'demo-fa-03-b',
        label: 'Mua mới toàn bộ theo bộ đồng màu cho đẹp mắt, đồ cũ cất vào kho không dùng.',
        outcomeTitle: 'Lãng phí tài nguyên còn giá trị sử dụng',
        feedback:
          'Đồ dùng còn tốt nhưng bị bỏ quên trong kho vẫn tạo ra nhu cầu sản xuất và đóng gói mới. Tiêu dùng bền vững bắt đầu từ việc hỏi xem mình có thực sự cần mua mới hay không.',
        isRecommended: false,
      },
      {
        id: 'demo-fa-03-c',
        label: 'In mới thật nhiều tờ rơi giấy cho mỗi buổi giới thiệu dù người tham gia có thể đọc bản ngắn gọn chung.',
        outcomeTitle: 'Phát sinh nhiều giấy thải sau một lần đọc',
        feedback:
          'Tài liệu in dư thừa thường bị bỏ lại ngay sau sự kiện. Dùng bảng thông tin tái sử dụng hoặc chia sẻ bản số gọn nhẹ giúp tránh lãng phí giấy in.',
        isRecommended: false,
      },
    ],
    sourceId: 'INTERNAL-DEMO-FIXTURE-PENDING-BR-T005',
    sourceNote:
      'Tình huống mẫu nội bộ dùng để kiểm thử luồng Fact → Act → Phản tư; chưa phải thẻ đã duyệt phát hành công khai.',
    reflectionPrompt:
      'Có món đồ học tập hoặc sinh hoạt nào bạn đang dùng lại từ người khác hoặc giữ bền nhiều năm mà bạn thấy rất đáng chia sẻ không?',
    reflectionSuggestions: [
      'Trao đổi giáo trình và tài liệu giữa các khóa học',
      'Dùng lại bảng tên, dây đeo và vật dụng trang trí sự kiện',
    ],
    reviewStatus: 'internal_demo_fixture',
    publicTrialAllowed: false,
  },
];

export function resolveActiveFactActDeck(): {
  readonly deckMode: 'approved' | 'internal_demo_fixture';
  readonly cards: readonly FactActCard[];
} {
  const approvedPublic = APPROVED_PUBLIC_CARDS.filter(
    (card) => card.reviewStatus === 'approved' && card.publicTrialAllowed,
  );
  if (approvedPublic.length > 0) {
    return {
      deckMode: 'approved',
      cards: approvedPublic,
    };
  }
  return {
    deckMode: 'internal_demo_fixture',
    cards: INTERNAL_DEMO_FIXTURES,
  };
}

export function createInitialFactActState(
  cardsOverride?: readonly FactActCard[],
  modeOverride?: 'approved' | 'internal_demo_fixture',
): FactActTrialState {
  const resolved = cardsOverride
    ? {
        deckMode: modeOverride ?? 'internal_demo_fixture',
        cards: cardsOverride,
      }
    : resolveActiveFactActDeck();

  return {
    step: 'idle',
    deckMode: resolved.deckMode,
    cards: resolved.cards,
    currentIndex: 0,
    selectedChoiceId: null,
    reflectionDraft: '',
    completedRecords: [],
  };
}

export function getCurrentFactActCard(
  state: FactActTrialState,
): FactActCard | null {
  return state.cards[state.currentIndex] ?? null;
}

export function getSelectedFactActChoice(
  state: FactActTrialState,
): FactActChoice | null {
  const card = getCurrentFactActCard(state);
  if (!card || !state.selectedChoiceId) return null;
  return card.choices.find((choice) => choice.id === state.selectedChoiceId) ?? null;
}

export function startFactActTrial(state: FactActTrialState): FactActTrialState {
  if (state.cards.length === 0) return state;
  return {
    ...state,
    step: 'fact',
    currentIndex: 0,
    selectedChoiceId: null,
    reflectionDraft: '',
    completedRecords: [],
  };
}

export function advanceFactToAction(state: FactActTrialState): FactActTrialState {
  if (state.step !== 'fact') return state;
  return {
    ...state,
    step: 'action',
    selectedChoiceId: null,
  };
}

export function selectFactActChoice(
  state: FactActTrialState,
  choiceId: string,
): FactActTrialState {
  if (state.step !== 'action') return state;
  const card = getCurrentFactActCard(state);
  if (!card) return state;
  const validChoice = card.choices.some((choice) => choice.id === choiceId);
  if (!validChoice) return state;

  return {
    ...state,
    step: 'feedback',
    selectedChoiceId: choiceId,
  };
}

export function advanceFeedbackToReflection(
  state: FactActTrialState,
): FactActTrialState {
  if (state.step !== 'feedback' || !state.selectedChoiceId) return state;
  return {
    ...state,
    step: 'reflection',
  };
}

export function updateReflectionDraft(
  state: FactActTrialState,
  draft: string,
): FactActTrialState {
  if (state.step !== 'reflection') return state;
  return {
    ...state,
    reflectionDraft: draft,
  };
}

function finalizeCurrentCard(
  state: FactActTrialState,
  reflectionSkipped: boolean,
): FactActTrialState {
  if (state.step !== 'reflection') return state;
  const card = getCurrentFactActCard(state);
  const choice = getSelectedFactActChoice(state);
  if (!card || !choice) return state;

  const trimmedNote = reflectionSkipped ? '' : state.reflectionDraft.trim();
  const nextRecord: CompletedFactActRecord = {
    cardId: card.id,
    topic: card.topic,
    selectedChoiceId: choice.id,
    selectedChoiceLabel: choice.label,
    isRecommended: choice.isRecommended,
    reflectionNote: trimmedNote,
    reflectionSkipped: reflectionSkipped || trimmedNote.length === 0,
  };

  const nextRecords = [...state.completedRecords, nextRecord];
  const hasMoreCards = state.currentIndex + 1 < state.cards.length;

  if (hasMoreCards) {
    return {
      ...state,
      step: 'fact',
      currentIndex: state.currentIndex + 1,
      selectedChoiceId: null,
      reflectionDraft: '',
      completedRecords: nextRecords,
    };
  }

  return {
    ...state,
    step: 'complete',
    selectedChoiceId: null,
    reflectionDraft: '',
    completedRecords: nextRecords,
  };
}

export function submitFactActReflection(
  state: FactActTrialState,
): FactActTrialState {
  return finalizeCurrentCard(state, false);
}

export function skipFactActReflection(
  state: FactActTrialState,
): FactActTrialState {
  return finalizeCurrentCard(state, true);
}

export function restartFactActTrial(state: FactActTrialState): FactActTrialState {
  return startFactActTrial(state);
}
