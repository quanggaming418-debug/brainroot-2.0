import { QUEST_BADGES, QUEST_CHALLENGES, type QuestBadge } from '../../data/quests';

/**
 * Local-only progress for the 12-challenge board (no login, no server, no personal data).
 * A challenge is either done (with an optional private note) or not.
 */
export interface QuestBoardEntry {
  readonly done: boolean;
  readonly note: string;
  readonly updatedAtIso: string | null;
}

export type QuestBoardProgress = Readonly<Record<string, QuestBoardEntry>>;

export const QUEST_BOARD_STORAGE_KEY = 'brainroot.questBoard.v1';
export const QUEST_NOTE_MAX = 280;

export function createEmptyBoard(): QuestBoardProgress {
  return {};
}

export function setChallengeDone(
  board: QuestBoardProgress,
  id: string,
  done: boolean,
  nowIso: string,
): QuestBoardProgress {
  if (!QUEST_CHALLENGES.some((c) => c.id === id)) return board;
  const prev = board[id];
  return { ...board, [id]: { done, note: prev?.note ?? '', updatedAtIso: nowIso } };
}

export function setChallengeNote(
  board: QuestBoardProgress,
  id: string,
  note: string,
  nowIso: string,
): QuestBoardProgress {
  if (!QUEST_CHALLENGES.some((c) => c.id === id)) return board;
  const prev = board[id];
  return {
    ...board,
    [id]: { done: prev?.done ?? false, note: note.slice(0, QUEST_NOTE_MAX), updatedAtIso: nowIso },
  };
}

export function countDone(board: QuestBoardProgress): number {
  return QUEST_CHALLENGES.filter((c) => board[c.id]?.done).length;
}

export function earnedBadges(board: QuestBoardProgress): readonly QuestBadge[] {
  const done = countDone(board);
  return QUEST_BADGES.filter((b) => done >= b.threshold);
}

export function nextBadge(board: QuestBoardProgress): QuestBadge | null {
  const done = countDone(board);
  return QUEST_BADGES.find((b) => done < b.threshold) ?? null;
}

export function loadBoard(storage?: Pick<Storage, 'getItem'>): QuestBoardProgress {
  if (!storage) return createEmptyBoard();
  try {
    const raw = storage.getItem(QUEST_BOARD_STORAGE_KEY);
    if (!raw) return createEmptyBoard();
    const parsed = JSON.parse(raw) as Record<string, Partial<QuestBoardEntry>>;
    const clean: Record<string, QuestBoardEntry> = {};
    for (const c of QUEST_CHALLENGES) {
      const e = parsed?.[c.id];
      if (!e || typeof e !== 'object') continue;
      clean[c.id] = {
        done: e.done === true,
        note: typeof e.note === 'string' ? e.note.slice(0, QUEST_NOTE_MAX) : '',
        updatedAtIso: typeof e.updatedAtIso === 'string' ? e.updatedAtIso : null,
      };
    }
    return clean;
  } catch {
    return createEmptyBoard();
  }
}

export function saveBoard(
  board: QuestBoardProgress,
  storage?: Pick<Storage, 'setItem' | 'removeItem'>,
): void {
  if (!storage) return;
  try {
    if (Object.keys(board).length === 0) {
      storage.removeItem(QUEST_BOARD_STORAGE_KEY);
      return;
    }
    storage.setItem(QUEST_BOARD_STORAGE_KEY, JSON.stringify(board));
  } catch {
    // Storage may be unavailable (private mode / quota): progress just stays in memory.
  }
}
