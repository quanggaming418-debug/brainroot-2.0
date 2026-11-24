import { layoutViewportWidth } from '../../../utils/layoutViewport';
import { loadActiveDeck } from '../content/activeDeck';
import { useSound } from './audio';
import { useEffect, useRef, useState } from 'react';
import { isQuanPit, pitLabel, type PlayerId, type RingIndex } from '../engine';
import { themeOfRing } from '../content/themes';
import { useTr, type Key, type Tr } from './i18n';
import type { TimerMode } from './Challenge';
import type { BoardLayout } from './Board';

export interface Setup {
  readonly names: Record<PlayerId, string>;
  readonly first: PlayerId | 'random';
  readonly timer: TimerMode;
}

export function useLayout(): BoardLayout {
  const get = (): BoardLayout => {
    const w = layoutViewportWidth(window.innerWidth);
    const h = window.innerHeight;
    return w < 700 || (h > w * 1.05 && w < 1000) ? 'portrait' : 'landscape';
  };
  const [layout, setLayout] = useState<BoardLayout>(get);
  useEffect(() => {
    const on = () => setLayout(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return layout;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Tên ô theo ngôn ngữ hiện tại. */
export function pitName(t: Tr, ring: RingIndex): string {
  if (isQuanPit(ring)) return t('pit.quan', { theme: t.theme(themeOfRing(ring)) });
  return t('pit.dan', { theme: t.theme(themeOfRing(ring)), label: pitLabel(ring) });
}

/** Nhãn bộ thẻ theo chế độ (DEMO / nội bộ dev / 100 thẻ). */
export function deckText(t: Tr) {
  const src = loadActiveDeck().source;
  const k = src === 'full' ? 'Full' : src === 'internal' ? 'Internal' : 'Demo';
  return {
    chip: t(`deck.${k.toLowerCase()}` as Key),
    lower: t(`deck.${k.toLowerCase()}Lower` as Key),
    tag: t(`deck.tag${k}` as Key),
    note: t(`deck.note${k}` as Key),
  };
}

export function StatusChips() {
  const t = useTr();
  return (
    <span className="oq2-chips">
      <span className="oq2-status oq2-status--rules">{t('chip.rules')}</span>
      <span className="oq2-status">{deckText(t).chip}</span>
    </span>
  );
}

/** Hiển thị <b>…</b> trong chuỗi i18n tĩnh (không dùng innerHTML). */
export function Rich({ text }: { text: string }) {
  return <>{text.split(/(<b>.*?<\/b>)/g).map((part, i) => (part.startsWith('<b>') ? <strong key={i}>{part.slice(3, -4)}</strong> : part))}</>;
}

export function RulesDialog({ onClose }: { onClose: () => void }) {
  const t = useTr();
  const ref = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, []);
  return (
    <div className="oq2-modal" role="dialog" aria-modal="true" aria-labelledby="oq2-rules-title">
      <div className="oq2-modal__box">
        <h2 id="oq2-rules-title" tabIndex={-1} ref={ref}>{t('rules.title')}</h2>
        <p className="oq2-note">{t('rules.intro')}</p>
        <ul className="oq2-rules">
          {(['rules.r1', 'rules.r2', 'rules.r3', 'rules.r4', 'rules.r5', 'rules.r6', 'rules.r7', 'rules.r8', 'rules.r9', 'rules.r10', 'rules.r11'] as Key[]).map((k) => (
            <li key={k}><Rich text={t(k)} /></li>
          ))}
        </ul>
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={onClose}>{t('common.close')}</button>
      </div>
    </div>
  );
}

/** Nút bật/tắt âm thanh (lưu trên máy này). */
export function SoundToggle({ className = '' }: { className?: string }) {
  const t = useTr();
  const [on, setOn] = useSound();
  return (
    <button
      type="button"
      className={`oq2-btn oq2-btn--small oq2-snd${on ? ' is-on' : ''} ${className}`.trim()}
      aria-pressed={on}
      aria-label={on ? t('sound.onLabel') : t('sound.offLabel')}
      onClick={() => setOn(!on)}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
        {on ? <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></> : <path d="M17 9l5 6M22 9l-5 6" />}
      </svg>
      <span className="oq2-snd__txt">{on ? t('sound.on') : t('sound.off')}</span>
    </button>
  );
}

