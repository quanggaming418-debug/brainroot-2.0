/**
 * Green Quest Lite — Self-contained local-only R0 sustainability challenge.
 *
 * GOVERNANCE NOTICE:
 * - No login, no GPS/camera permissions, no PII, no server sync.
 * - Physical completion is explicitly self-reported by the learner.
 */

export type GreenQuestStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped';

export interface GreenQuestChallenge {
  readonly id: string;
  readonly topic: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly durationLabel: string;
  readonly steps: readonly string[];
  readonly reflectionPrompt: string;
  readonly honestyNote: string;
}

export interface GreenQuestProgress {
  readonly challengeId: string;
  readonly status: GreenQuestStatus;
  readonly reflectionNote: string;
  readonly updatedAtIso: string | null;
}

export const GREEN_QUEST_STORAGE_KEY = 'brainroot.greenQuest.v1';

export const GREEN_QUEST_LITE_CHALLENGE: GreenQuestChallenge = {
  id: 'quest-r0-refill-day',
  topic: 'Rác thải & Tiêu dùng bền vững',
  title: 'Một ngày học tập không thêm ly nhựa dùng một lần',
  subtitle: 'Thử thách khởi đầu nhỏ gọn, dễ thực hiện ngay tại trường học hoặc góc làm việc',
  summary:
    'Trong một ngày học hoặc sinh hoạt câu lạc bộ, hãy chủ động chuẩn bị bình nước cá nhân (hoặc ly tái sử dụng) và từ chối ít nhất một món đồ uống đóng ly nhựa dùng một lần.',
  durationLabel: '1 ngày · Tự thực hành',
  steps: [
    'Đặt sẵn bình nước cá nhân sạch cạnh cặp sách hoặc bàn làm việc trước khi ra khỏi nhà.',
    'Tìm trước điểm lấy nước uống sạch ở lớp, thư viện hoặc mang theo đủ nước cho buổi học.',
    'Nếu ghé quán nước cùng bạn bè, hỏi xem có thể đựng vào bình cá nhân hoặc dùng ly tại chỗ không.',
    'Cuối ngày, quay lại ghi ngắn một dòng phản tư về điều giúp bạn duy trì hoặc rào cản bạn gặp phải.',
  ],
  reflectionPrompt:
    'Hôm nay điều gì giúp bạn thực hiện thử thách này thuận lợi, hoặc có khó khăn nhỏ nào bạn muốn điều chỉnh cho lần sau?',
  honestyNote:
    'Tiến độ thử thách chỉ lưu cục bộ trên trình duyệt này và dựa trên việc bạn tự ghi nhận trải nghiệm thực tế — không yêu cầu đăng nhập, ảnh chụp hay vị trí.',
};

export function createInitialQuestProgress(
  challengeId = GREEN_QUEST_LITE_CHALLENGE.id,
): GreenQuestProgress {
  return {
    challengeId,
    status: 'not_started',
    reflectionNote: '',
    updatedAtIso: null,
  };
}

export function startGreenQuest(
  progress: GreenQuestProgress,
  nowIso: string,
): GreenQuestProgress {
  return {
    ...progress,
    status: 'in_progress',
    updatedAtIso: nowIso,
  };
}

export function completeGreenQuest(
  progress: GreenQuestProgress,
  reflectionNote: string,
  nowIso: string,
): GreenQuestProgress {
  return {
    ...progress,
    status: 'completed',
    reflectionNote: reflectionNote.trim(),
    updatedAtIso: nowIso,
  };
}

export function skipGreenQuest(
  progress: GreenQuestProgress,
  nowIso: string,
): GreenQuestProgress {
  return {
    ...progress,
    status: 'skipped',
    updatedAtIso: nowIso,
  };
}

export function resetGreenQuest(
  challengeId = GREEN_QUEST_LITE_CHALLENGE.id,
): GreenQuestProgress {
  return createInitialQuestProgress(challengeId);
}

export function loadQuestProgressFromStorage(
  storage?: Pick<Storage, 'getItem'>,
): GreenQuestProgress {
  const fallback = createInitialQuestProgress();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(GREEN_QUEST_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<GreenQuestProgress>;
    if (
      parsed.challengeId !== GREEN_QUEST_LITE_CHALLENGE.id ||
      (parsed.status !== 'not_started' &&
        parsed.status !== 'in_progress' &&
        parsed.status !== 'completed' &&
        parsed.status !== 'skipped')
    ) {
      return fallback;
    }
    return {
      challengeId: parsed.challengeId,
      status: parsed.status,
      reflectionNote: typeof parsed.reflectionNote === 'string' ? parsed.reflectionNote : '',
      updatedAtIso: typeof parsed.updatedAtIso === 'string' ? parsed.updatedAtIso : null,
    };
  } catch {
    return fallback;
  }
}

export function saveQuestProgressToStorage(
  progress: GreenQuestProgress,
  storage?: Pick<Storage, 'setItem' | 'removeItem'>,
): void {
  if (!storage) return;
  try {
    if (progress.status === 'not_started' && !progress.reflectionNote) {
      storage.removeItem(GREEN_QUEST_STORAGE_KEY);
      return;
    }
    storage.setItem(GREEN_QUEST_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota / private-mode restrictions safely.
  }
}
