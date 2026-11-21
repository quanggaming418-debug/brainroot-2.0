import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import { getFactById } from '../../data/learnFacts';
import {
  createQuizRound,
  scoreRound,
  type QuizRoundItem,
} from './quizEngine';

const UI = {
  vi: {
    eyebrow: 'QUIZ NHANH',
    heading: 'Thử kiến thức: 5 câu ngẫu nhiên',
    note: 'Câu hỏi lấy từ các số liệu có nguồn ở trên. Phím 1–4 để chọn đáp án.',
    progress: (cur: number, total: number) => `Câu ${cur} / ${total}`,
    correct: 'Chính xác!',
    wrong: 'Chưa đúng.',
    correctAnswerIs: 'Đáp án đúng:',
    source: 'Nguồn',
    next: 'Câu tiếp',
    finish: 'Xem kết quả',
    resultHeading: 'Kết quả của bạn',
    score: (s: number, t: number) => `${s} / ${t} câu đúng`,
    again: 'Chơi lại với câu khác',
    groupAria: 'Các đáp án',
  },
  en: {
    eyebrow: 'QUICK QUIZ',
    heading: 'Test yourself: 5 random questions',
    note: 'Questions use the sourced facts above. Press 1–4 to choose an answer.',
    progress: (cur: number, total: number) => `Question ${cur} of ${total}`,
    correct: 'Correct!',
    wrong: 'Not quite.',
    correctAnswerIs: 'Correct answer:',
    source: 'Source',
    next: 'Next question',
    finish: 'See results',
    resultHeading: 'Your result',
    score: (s: number, t: number) => `${s} of ${t} correct`,
    again: 'Play again with new questions',
    groupAria: 'Answer options',
  },
} as const;

export function LearnQuiz({ locale }: { readonly locale: Locale }) {
  const ui = UI[locale];
  const [round, setRound] = useState<QuizRoundItem[]>(() => createQuizRound());
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const nextRef = useRef<HTMLButtonElement>(null);
  const againRef = useRef<HTMLButtonElement>(null);

  const finished = index >= round.length;
  const item = finished ? null : round[index];

  const choose = useCallback(
    (position: number) => {
      if (!item || picked !== null) return;
      setPicked(position);
      setResults((prev) => [...prev, item.choices[position].isCorrect]);
    },
    [item, picked],
  );

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus({ preventScroll: true });
  }, [picked]);

  useEffect(() => {
    if (finished) againRef.current?.focus({ preventScroll: true });
  }, [finished]);

  const goNext = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setRound(createQuizRound());
    setIndex(0);
    setPicked(null);
    setResults([]);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const n = Number(event.key);
    if (n >= 1 && n <= 4) {
      event.preventDefault();
      choose(n - 1);
    }
  };

  if (finished) {
    return (
      <section className="learn-quiz" aria-labelledby="learn-quiz-heading" data-testid="learn-quiz">
        <p className="gp-eyebrow">{ui.eyebrow}</p>
        <h2 className="learn-quiz__title" id="learn-quiz-heading">
          {ui.resultHeading}
        </h2>
        <p className="learn-quiz__score" role="status" data-testid="learn-quiz-score">
          {ui.score(scoreRound(results), round.length)}
        </p>
        <button
          ref={againRef}
          type="button"
          className="gp-button gp-button--primary"
          data-testid="learn-quiz-again"
          onClick={restart}
        >
          {ui.again}
        </button>
      </section>
    );
  }

  const q = item!.question;
  const fact = getFactById(q.factId);
  const answered = picked !== null;
  const wasCorrect = answered && item!.choices[picked].isCorrect;

  return (
    <section
      className="learn-quiz"
      aria-labelledby="learn-quiz-heading"
      data-testid="learn-quiz"
      onKeyDown={onKeyDown}
    >
      <p className="gp-eyebrow">{ui.eyebrow}</p>
      <h2 className="learn-quiz__title" id="learn-quiz-heading">
        {ui.heading}
      </h2>
      <p className="learn-quiz__note">{ui.note}</p>
      <p className="learn-quiz__progress">{ui.progress(index + 1, round.length)}</p>

      <p className="learn-quiz__question" lang={locale} data-testid="learn-quiz-question">
        {q.q[locale]}
      </p>

      <div className="learn-quiz__options" role="group" aria-label={ui.groupAria}>
        {item!.choices.map((choice, position) => {
          const state = !answered
            ? ''
            : choice.isCorrect
              ? ' is-correct'
              : position === picked
                ? ' is-wrong'
                : '';
          return (
            <button
              key={choice.originalIndex}
              type="button"
              className={`learn-quiz__option${state}`}
              data-testid={`learn-quiz-option-${position}`}
              data-correct={choice.isCorrect ? 'true' : 'false'}
              disabled={answered}
              onClick={() => choose(position)}
            >
              <span className="learn-quiz__key" aria-hidden="true">
                {position + 1}
              </span>
              <span lang={locale}>{q.options[locale][choice.originalIndex]}</span>
            </button>
          );
        })}
      </div>

      <div className="learn-quiz__feedback" role="status" aria-live="polite">
        {answered ? (
          <>
            <p className={`learn-quiz__verdict${wasCorrect ? ' is-correct' : ' is-wrong'}`}>
              {wasCorrect ? ui.correct : ui.wrong}{' '}
              {!wasCorrect ? (
                <span>
                  {ui.correctAnswerIs} <strong>{q.options[locale][q.answer]}</strong>
                </span>
              ) : null}
            </p>
            <p className="learn-quiz__explain">{q.explain[locale]}</p>
            {fact ? (
              <p className="learn-quiz__source">
                {ui.source}:{' '}
                <a href={fact.source.url} target="_blank" rel="noopener noreferrer">
                  {fact.source.name}
                  {fact.source.year ? ` (${fact.source.year})` : ''}
                </a>
              </p>
            ) : null}
          </>
        ) : null}
      </div>

      {answered ? (
        <button
          ref={nextRef}
          type="button"
          className="gp-button gp-button--forest"
          data-testid="learn-quiz-next"
          onClick={goNext}
        >
          {index + 1 >= round.length ? ui.finish : ui.next}
        </button>
      ) : null}
    </section>
  );
}
