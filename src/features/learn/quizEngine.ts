import { QUIZ_QUESTIONS, type QuizQuestion } from '../../data/quiz';

export const QUIZ_ROUND_SIZE = 5;

export type RngFn = () => number;

export interface QuizChoice {
  /** Index into the question's original `options` array. */
  readonly originalIndex: number;
  readonly isCorrect: boolean;
}

export interface QuizRoundItem {
  readonly question: QuizQuestion;
  /** Options in the (shuffled) order shown to the player. */
  readonly choices: readonly QuizChoice[];
}

function shuffled<T>(items: readonly T[], rng: RngFn): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Pick `size` distinct random questions and shuffle each question's options. */
export function createQuizRound(
  rng: RngFn = Math.random,
  size: number = QUIZ_ROUND_SIZE,
  bank: readonly QuizQuestion[] = QUIZ_QUESTIONS,
): QuizRoundItem[] {
  return shuffled(bank, rng)
    .slice(0, Math.min(size, bank.length))
    .map((question) => ({
      question,
      choices: shuffled([0, 1, 2, 3], rng).map((originalIndex) => ({
        originalIndex,
        isCorrect: originalIndex === question.answer,
      })),
    }));
}

export function scoreRound(results: readonly boolean[]): number {
  return results.filter(Boolean).length;
}
