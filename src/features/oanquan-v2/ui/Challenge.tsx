import { useEffect, useRef, useState } from 'react';
import type { DemoCard } from '../content/demoCards';
import { THEMES } from '../content/themes';
import { ThemeIcon } from './Icons';

export type TimerMode = 'standard' | 'extended' | 'untimed';
export type Verdict = 'pass' | 'fail';

const LEVEL_NAME: Record<number, string> = { 1: 'Nhận biết', 2: 'Ra quyết định', 3: 'Giải quyết vấn đề' };

export function LevelPill({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className={`oq2-level oq2-level--${level}`}>
      <span className="oq2-level__shape" aria-hidden="true" />
      Cấp {level} · {LEVEL_NAME[level]}
    </span>
  );
}

function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return ref;
}

/** S6 — thẻ thử thách (đáp án ẩn). */
export function ChallengeCard(props: {
  card: DemoCard;
  answerer: string;
  referee: string;
  timerMode: TimerMode;
  chainIndex?: number;
  onDone: (timedOut: boolean) => void;
}) {
  const { card, timerMode } = props;
  const total = timerMode === 'untimed' ? null : Math.round(card.timeSec * (timerMode === 'extended' ? 1.5 : 1));
  const [left, setLeft] = useState<number | null>(total);
  const titleRef = useFocusOnMount<HTMLHeadingElement>();
  const doneRef = useRef(false);
  const onDoneRef = useRef(props.onDone);
  onDoneRef.current = props.onDone;

  useEffect(() => {
    if (left === null) return;
    if (left <= 0) {
      if (!doneRef.current) { doneRef.current = true; onDoneRef.current(true); }
      return;
    }
    const t = window.setTimeout(() => setLeft((v) => (v === null ? v : v - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [left]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current(false);
  };

  return (
    <section className="oq2-sheet" role="dialog" aria-modal="true" aria-labelledby="oq2-card-title">
      <div className="oq2-card" data-level={card.level}>
        <div className="oq2-card__head">
          <LevelPill level={card.level} />
          <span className="oq2-demo-tag">THẺ DEMO</span>
          {props.chainIndex ? <span className="oq2-tag oq2-tag--chain">Ăn liên hoàn · thẻ thứ {props.chainIndex + 1}</span> : null}
          <span className={`oq2-timer${left !== null && left <= 5 ? ' is-urgent' : ''}`} role="timer" aria-live="off">
            {left === null ? 'Không bấm giờ' : `${left} giây`}
          </span>
        </div>
        <p className="oq2-card__theme"><ThemeIcon theme={card.theme} size={16} /> {THEMES[card.theme].name}</p>
        <h2 className="oq2-card__title" id="oq2-card-title" tabIndex={-1} ref={titleRef}>{card.title}</h2>
        <h3 className="oq2-card__label">Bối cảnh</h3>
        <p className="oq2-card__text">{card.context}</p>
        <div className="oq2-card__challenge">
          <h3 className="oq2-card__label">Thử thách</h3>
          <p className="oq2-card__text">{card.challenge}</p>
        </div>
        <p className="oq2-card__roles">
          Người trả lời: <strong>{props.answerer}</strong> · Trọng tài: <strong>{props.referee}</strong> · Đáp án đang ẩn
        </p>
      </div>
      <div className="oq2-sheet__actions">
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={finish}>Xong</button>
      </div>
    </section>
  );
}

type RefState = 'hidden' | 'a' | 'b' | 'c' | 'd';

/** S7 — Trọng tài: (a) chưa chọn → (b) đã chọn, chờ xác nhận → (c) xem lại → (d) đã chốt. */
export function RefereePanel(props: {
  card: DemoCard;
  answerer: string;
  referee: string;
  pitName: string;
  timedOut: boolean;
  onCommit: (verdict: Verdict) => void;
  onContinue: () => void;
}) {
  const [stage, setStage] = useState<RefState>('hidden');
  const [choice, setChoice] = useState<Verdict | null>(null);
  const [ticks, setTicks] = useState<boolean[]>(() => props.card.keyPoints.map(() => false));
  const [announce, setAnnounce] = useState('');
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { headRef.current?.focus(); }, [stage === 'hidden', stage === 'c', stage === 'd']);

  const choose = (v: Verdict) => {
    if (stage === 'd') return;
    setChoice(v);
    setStage('b');
    setAnnounce(`Đã chọn: ${v === 'pass' ? 'Đạt' : 'Chưa đạt'}, chưa ghi vào ván.`);
  };
  const commit = () => {
    if (!choice || stage === 'd') return;
    props.onCommit(choice);
    setStage('d');
    setAnnounce(`Đã chốt: ${choice === 'pass' ? 'Đạt' : 'Chưa đạt'}.`);
  };
  const vName = (v: Verdict | null) => (v === 'pass' ? 'Đạt' : v === 'fail' ? 'Chưa đạt' : '');
  const steps = ['Chọn kết quả', 'Xem lại', 'Đã chốt'];
  const stepIdx = stage === 'c' ? 1 : stage === 'd' ? 2 : 0;

  return (
    <section className="oq2-sheet oq2-sheet--referee" role="dialog" aria-modal="true" aria-labelledby="oq2-ref-title">
      {stage === 'hidden' ? (
        <div className="oq2-card oq2-card--plain">
          <h2 className="oq2-card__title" id="oq2-ref-title" tabIndex={-1} ref={headRef}>
            {props.timedOut ? 'Hết giờ' : `${props.answerer} đã trả lời xong`}
          </h2>
          <p className="oq2-card__text">
            {props.referee} (Trọng tài) mở đáp án mẫu. Cả hai người cùng xem. Kết quả chỉ ghi vào ván khi bấm “Chốt kết quả”.
          </p>
          <div className="oq2-sheet__actions">
            <button type="button" className="oq2-btn oq2-btn--forest" onClick={() => setStage('a')}>Mở đáp án mẫu</button>
          </div>
        </div>
      ) : (
        <div className="oq2-referee">
          <div className="oq2-answer">
            <p className="oq2-answer__eyebrow">ĐÁP ÁN · CẤP {props.card.level} · <span className="oq2-demo-tag oq2-demo-tag--dark">THẺ DEMO</span></p>
            <h3 className="oq2-answer__title">{props.card.title}</h3>
            <p className="oq2-answer__label">TRỌNG TÀI DUYỆT KHI</p>
            <p className="oq2-answer__text">{props.card.refereeGuide}</p>
          </div>
          <div className="oq2-judge">
            <ol className="oq2-stepper oq2-stepper--small" aria-label="Các bước chấm">
              {steps.map((s, i) => (
                <li key={s} className={i === stepIdx ? 'is-current' : i < stepIdx ? 'is-done' : ''} aria-current={i === stepIdx ? 'step' : undefined}>
                  <span>{i + 1}</span>{s}
                </li>
              ))}
            </ol>
            <h2 className="oq2-judge__title" id="oq2-ref-title" tabIndex={-1} ref={headRef}>
              {stage === 'c' ? 'Xem lại trước khi chốt' : stage === 'd' ? `Đã chốt: ${vName(choice)}` : `${props.referee} chấm câu trả lời của ${props.answerer}`}
            </h2>

            {stage === 'c' ? (
              <dl className="oq2-review">
                <div><dt>Thẻ</dt><dd>{props.card.title} · Cấp {props.card.level}</dd></div>
                <div><dt>Người trả lời</dt><dd>{props.answerer}</dd></div>
                <div><dt>Ô thử thách</dt><dd>{props.pitName}</dd></div>
                <div><dt>Lựa chọn</dt><dd>{vName(choice)}</dd></div>
                <div><dt>Ý đã ghi lại</dt><dd>{props.card.keyPoints.filter((_, i) => ticks[i]).join('; ') || 'Không ghi ý nào'}</dd></div>
                <div><dt>Nếu chốt</dt><dd>{choice === 'pass' ? `${props.answerer} thu hoạch ô ${props.pitName}.` : 'Hạt giữ nguyên ở ô, đổi lượt.'}</dd></div>
              </dl>
            ) : (
              <fieldset className="oq2-checklist" disabled={stage === 'd'}>
                <legend>Checklist chỉ ghi lại ý đã nghe. Trọng tài tự quyết kết quả.</legend>
                {props.card.keyPoints.map((k, i) => (
                  <label key={k} className="oq2-check">
                    <input type="checkbox" checked={ticks[i]} onChange={() => setTicks((t) => t.map((v, j) => (j === i ? !v : v)))} />
                    <span>{k}</span>
                  </label>
                ))}
              </fieldset>
            )}

            <div className="oq2-judge__actions">
            {stage === 'a' || stage === 'b' ? (
              <div className="oq2-verdicts">
                <button type="button" className={`oq2-btn oq2-verdict${choice === 'pass' ? ' is-chosen' : ''}`} aria-pressed={choice === 'pass'} onClick={() => choose('pass')}>
                  <span aria-hidden="true">✓</span> Đạt{choice === 'pass' ? <small>Đang chọn</small> : null}
                </button>
                <button type="button" className={`oq2-btn oq2-verdict${choice === 'fail' ? ' is-chosen' : ''}`} aria-pressed={choice === 'fail'} onClick={() => choose('fail')}>
                  <span aria-hidden="true">✕</span> Chưa đạt{choice === 'fail' ? <small>Đang chọn</small> : null}
                </button>
              </div>
            ) : null}

            {stage === 'a' ? <p className="oq2-note">Kết quả chỉ ghi vào ván khi bấm “Chốt kết quả”.</p> : null}

            {stage === 'b' ? (
              <div className="oq2-pending">
                <p><strong>Đã chọn: {vName(choice)}</strong><br />Chưa ghi vào ván. Có thể đổi lựa chọn.</p>
                <div className="oq2-pending__actions">
                  <button type="button" className="oq2-btn oq2-btn--ghost" onClick={() => setStage('c')}>Xem lại</button>
                  <button type="button" className="oq2-btn oq2-btn--forest" onClick={commit}>Chốt kết quả</button>
                </div>
              </div>
            ) : null}

            {stage === 'c' ? (
              <div className="oq2-pending__actions">
                <button type="button" className="oq2-btn oq2-btn--ghost" onClick={() => setStage('b')}>Sửa lựa chọn</button>
                <button type="button" className="oq2-btn oq2-btn--forest" onClick={commit}>Chốt kết quả</button>
              </div>
            ) : null}

            {stage === 'd' ? (
              <div className="oq2-locked">
                <p>Trọng tài {props.referee} đã chốt: <strong>{vName(choice)}</strong>. Đã ghi vào ván, không hoàn tác.</p>
                <button type="button" className="oq2-btn oq2-btn--primary" onClick={props.onContinue}>Tiếp tục</button>
              </div>
            ) : null}
            </div>
          </div>
        </div>
      )}
      <p className="oq2-sr" aria-live="polite">{announce}</p>
    </section>
  );
}
