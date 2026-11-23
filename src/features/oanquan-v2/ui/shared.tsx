import { useEffect, useRef, useState } from 'react';
import { isQuanPit, pitLabel, type PlayerId, type RingIndex } from '../engine';
import { THEMES, themeOfRing } from '../content/themes';
import type { TimerMode } from './Challenge';
import type { BoardLayout } from './Board';

export interface Setup {
  readonly names: Record<PlayerId, string>;
  readonly first: PlayerId | 'random';
  readonly timer: TimerMode;
}

export function useLayout(): BoardLayout {
  const get = (): BoardLayout => {
    const w = window.innerWidth;
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

export function pitName(ring: RingIndex): string {
  if (isQuanPit(ring)) return `Ô Quan ${THEMES[themeOfRing(ring)].name}`;
  return `Ô ${THEMES[themeOfRing(ring)].name} (${pitLabel(ring)})`;
}

export function StatusChips() {
  return (
    <span className="oq2-chips">
      <span className="oq2-status oq2-status--rules">Luật bản thử · PLAYTEST V1</span>
      <span className="oq2-status">Thẻ DEMO</span>
    </span>
  );
}

export function RulesDialog({ onClose }: { onClose: () => void }) {
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
        <h2 id="oq2-rules-title" tabIndex={-1} ref={ref}>Luật bản thử (PLAYTEST V1)</h2>
        <p className="oq2-note">Cấu hình thử nghiệm do Product Owner duyệt để chơi thử: rải và ăn theo luật Cơ bản truyền thống, kèm thẻ thử thách của Brainroot. Chưa phải luật chính thức của dự án.</p>
        <ul className="oq2-rules">
          <li>Mỗi Ô Dân có 5 hạt; hai Ô Quan mỗi ô có 1 quân Quan (10 điểm).</li>
          <li>Đến lượt: chọn một Ô Dân có hạt ở hàng của mình, chọn chiều rải.</li>
          <li>Bốc hết hạt, rải mỗi ô một hạt, <strong>kể cả Ô Quan</strong> (quân Quan nằm yên).</li>
          <li><strong>Rải tiếp:</strong> ô ngay sau hạt cuối là Ô Dân có hạt thì bốc hết ô đó, rải tiếp cùng chiều.</li>
          <li><strong>Dừng:</strong> ô ngay sau hạt cuối là Ô Quan còn quân hoặc còn hạt, hoặc gặp hai ô trống liên tiếp.</li>
          <li><strong>Cơ hội ăn:</strong> ô ngay sau hạt cuối trống và ô kế tiếp có quân (kể cả Ô Quan). Sau mỗi lần ăn, nếu lại gặp ô trống rồi ô có quân thì được ăn tiếp (ăn liên hoàn).</li>
          <li>Mỗi lần ăn cần trả lời một thẻ: Ô Dân 1–3 hạt Cấp 1; từ 4 hạt Cấp 2; Ô Quan Cấp 3. Người rải trả lời, đối thủ làm Trọng tài.</li>
          <li>Trọng tài chốt <strong>Đạt</strong>: thu hoạch ô đó và xét tiếp chuỗi. <strong>Chưa đạt</strong>: ô giữ nguyên, hết lượt. Phần đã chốt không hoàn tác.</li>
          <li>Hàng mình trống: lấy 5 hạt từ kho mình (thiếu thì mượn đối thủ, ghi nợ). Cả hai kho không đủ 5 hạt: ván kết thúc.</li>
          <li>Ván kết thúc khi hai quân Quan đã được thu hoạch. Hạt còn trên hàng ai thì về người đó; hạt còn trong Ô Quan và Quan chưa ăn không tính cho ai.</li>
          <li>Điểm = số hạt + 10 điểm mỗi quân Quan, trừ hạt đã mượn. Bằng điểm là hòa.</li>
        </ul>
        <button type="button" className="oq2-btn oq2-btn--primary" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
