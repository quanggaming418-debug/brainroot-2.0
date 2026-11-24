/**
 * Trang nhúng Ô ăn quan xanh V2 vào website chính (BR-T040).
 * CHỈ được nạp qua `import()` nằm trong nhánh cờ của App.tsx (ADR-0006, điều kiện 3);
 * không file nào ngoài nhánh đó được import module này.
 */
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/tokens.css';
import './oanquan-v2.css';
import { OAnQuanV2App } from './OAnQuanV2App';
import { useTr } from './i18n';

export default function OAnQuanV2Page() {
  const navigate = useNavigate();
  const t = useTr();
  const wrap = useRef<HTMLDivElement>(null);

  // Chiều cao header của website → game chiếm phần màn hình còn lại
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const bar = document.querySelector('.site-header-bar, header');
    const set = () => el.style.setProperty('--oqv2-host-h', `${Math.round(bar?.getBoundingClientRect().height ?? 0)}px`);
    set();
    window.addEventListener('resize', set);
    const ro = typeof ResizeObserver !== 'undefined' && bar ? new ResizeObserver(set) : null;
    if (bar) ro?.observe(bar);
    return () => { window.removeEventListener('resize', set); ro?.disconnect(); };
  }, []);

  const title = t('page.title');
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => { document.title = prev; };
  }, [title]);

  return (
    <div ref={wrap} className="oqv2-host" style={{ '--oqv2-host-h': '72px' } as CSSProperties}>
      <OAnQuanV2App embed={{ onHome: () => navigate('/') }} />
    </div>
  );
}
