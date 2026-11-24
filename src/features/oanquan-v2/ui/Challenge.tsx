import { useEffect, useRef, useState } from 'react';
import type { DemoCard } from '../content/demoCards';
import { THEMES } from '../content/themes';
import { Mascot, ThemeIcon } from './Icons';
import { CARD_FRAME, type MascotId } from './assets';

export type TimerMode = 'standard' | 'extended' | 'untimed';
export type Verdict = 'pass' | 'fail';

const LEVEL_NAME: Record<number, string> = { 1: 'Nhận biết', 2: 'Ra quyết định', 3: 'Giải quyết vấn đề' };
const LETTERS = ['A', 'B', 'C', 'D'];

export function LevelPill({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className={`oq2-level oq2-level--${level}`}>
      <span className="oq2-level__shape" aria-hidden="true" />
      Cấp {level} · {LEVEL_NAME[level]}
    </span>
  );
}

/**
 * Một thẻ thử thách duy nhất (không có modal lồng, không có bước xác nhận):
 * - Trắc nghiệm: chọn đáp án → hệ thống tự chấm.
 * - Câu hỏi mở: đối phương bấm Đạt / Chưa đạt ngay trên thẻ; đáp án mẫu mở nội tuyến (tùy chọn).
 * Kết quả được báo đúng một lần qua onResolve sau một phản hồi ngắn.
 */
export function ChallengeCard(props: {
  card: DemoCard;
  answerer: string;
  opponent: string;
  timerMode: TimerMode;
  chainIndex: number;
  mascot: MascotId;
  /** Thời gian phản hồi ngắn trước khi đóng thẻ (ms). */
  feedbackMs: number;
  onResolve: (verdict: Verdict) => void;
}) {
  const { card, timerMode } = props;
  const total = timerMode === 'untimed' ? null : Math.round(card.timeSec * (timerMode === 'extended' ? 1.5 : 1));
  const [left, setLeft] = useState<number | null>(total);
  const [picked, setPicked] = useState<number | null>(null);
  const [graded, setGraded] = useState<Verdict | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lockRef = useRef(false);
  const resolveRef = useRef(props.onResolve);
  resolveRef.current = props.onResolve;
  const feedbackRef = useRef(props.feedbackMs);
  feedbackRef.current = props.feedbackMs;
  const isChoice = card.kind === 'choice';

  useEffect(() => { titleRef.current?.focus(); }, []);

  /** Ghi nhận kết quả đúng một lần; mọi nguồn (nhấp đúp, hết giờ, phím) đều đi qua đây. */
  const resolve = (v: Verdict, choice: number | null = null) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setPicked(choice);
    setGraded(v);
    window.setTimeout(() => resolveRef.current(v), feedbackRef.current);
  };

  useEffect(() => {
    if (left === null || lockRef.current) return;
    if (left <= 0) {
      setTimedOut(true);
      if (isChoice) resolve('fail');
      return;
    }
    const t = window.setTimeout(() => setLeft((v) => (v === null ? v : v - 1)), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  useEffect(() => {
    if (!isChoice) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= (card.options?.length ?? 0)) resolve(n - 1 === card.correct ? 'pass' : 'fail', n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isChoice, card]);

  const done = graded !== null;
  const timeUp = timedOut && left !== null && left <= 0;

  return (
    <section className="oq2-sheet" role="dialog" aria-modal="true" aria-labelledby="oq2-card-title">
      <div
        className={`oq2-card oq2-card--q${done ? (graded === 'pass' ? ' is-pass' : ' is-fail') : ''}`}
        data-level={card.level}
        data-kind={card.kind}
        data-internal={card.internal ? 'true' : undefined}
        style={{ '--oq2-cardframe': `url(${CARD_FRAME[card.level]})` } as React.CSSProperties}
      >
        <div className="oq2-card__head">
          <LevelPill level={card.level} />
          <span className="oq2-demo-tag">{card.internal ? 'THẺ NỘI BỘ · DEV' : 'THẺ DEMO'}</span>
          {props.chainIndex ? <span className="oq2-tag oq2-tag--chain">Ăn liên hoàn · thẻ thứ {props.chainIndex + 1}</span> : null}
          <span className={`oq2-timer${left !== null && left <= 5 && !done ? ' is-urgent' : ''}`} role="timer" aria-live="off">
            {left === null ? 'Không bấm giờ' : timeUp ? 'Hết giờ' : `${left} giây`}
          </span>
        </div>
        <p className="oq2-card__theme"><ThemeIcon theme={card.theme} size={18} /> {THEMES[card.theme].name} · {props.answerer} trả lời</p>
        <span className="oq2-card__mascot"><Mascot who={props.mascot} pose={done ? (graded === 'pass' ? 'cheer' : 'thinking') : 'guide'} size={92} /></span>
        <h2 className="oq2-card__title" id="oq2-card-title" tabIndex={-1} ref={titleRef}>{card.title}</h2>
        <p className="oq2-card__text">{card.context}</p>
        <div className="oq2-card__challenge">
          <h3 className="oq2-card__label">Thử thách</h3>
          <p className="oq2-card__text">{card.challenge}</p>
        </div>

        {isChoice ? (
          <div className="oq2-options-q" role="group" aria-label="Chọn một đáp án">
            {card.options?.map((o, i) => {
              const state = !done ? '' : i === card.correct ? ' is-right' : i === picked ? ' is-wrong' : ' is-dim';
              return (
                <button
                  key={o}
                  type="button"
                  className={`oq2-btn oq2-choice${state}`}
                  disabled={done}
                  onClick={() => resolve(i === card.correct ? 'pass' : 'fail', i)}
                >
                  <b aria-hidden="true">{LETTERS[i]}</b>
                  <span>{o}</span>
                  {done && i === card.correct ? <i aria-hidden="true">✓</i> : null}
                  {done && i === picked && i !== card.correct ? <i aria-hidden="true">✕</i> : null}
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <div className="oq2-guide">
              <button type="button" className="oq2-btn oq2-btn--small oq2-btn--ghost" aria-expanded={showGuide} onClick={() => setShowGuide((v) => !v)}>
                {showGuide ? 'Ẩn đáp án mẫu' : 'Xem đáp án mẫu'}
              </button>
              {showGuide ? (
                <div className="oq2-guide__body">
                  <p><b>{card.internal ? 'Tiêu chí đánh giá:' : 'Đáp án mẫu:'}</b> {card.refereeGuide}</p>
                  {card.keyPoints.length ? <ul>{card.keyPoints.map((k) => <li key={k}>{k}</li>)}</ul> : null}
                  <p className="oq2-note">Tiêu chí tham khảo, {props.opponent} tự quyết.</p>
                </div>
              ) : null}
            </div>
            <div className="oq2-verdicts" role="group" aria-label={`${props.opponent} đánh giá câu trả lời`}>
              <button type="button" className={`oq2-btn oq2-verdict${graded === 'pass' ? ' is-chosen' : ''}`} disabled={done} onClick={() => resolve('pass')}>
                <span aria-hidden="true">✓</span> Đạt
              </button>
              <button type="button" className={`oq2-btn oq2-verdict oq2-verdict--fail${graded === 'fail' ? ' is-chosen' : ''}`} disabled={done} onClick={() => resolve('fail')}>
                <span aria-hidden="true">✕</span> Chưa đạt
              </button>
            </div>
            <p className="oq2-card__roles">{props.opponent} đánh giá câu trả lời của {props.answerer}.</p>
          </>
        )}

        {done ? (
          <p className={`oq2-feedback ${graded === 'pass' ? 'is-pass' : 'is-fail'}`} role="status">
            <strong>
              {isChoice
                ? graded === 'pass' ? 'Chính xác!' : timeUp ? 'Hết giờ.' : 'Chưa đúng.'
                : graded === 'pass' ? 'Đạt!' : 'Chưa đạt.'}
            </strong>{' '}
            {isChoice ? card.explain : card.internal ? null : card.remember}
          </p>
        ) : null}
      </div>
    </section>
  );
}
