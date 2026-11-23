import type { Theme } from '../content/themes';

/** Icon chủ đề và token tự vẽ (SVG placeholder, không phải art cuối). */
export function ThemeIcon({ theme, size = 18 }: { theme: Theme; size?: number }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true, focusable: false,
  };
  switch (theme) {
    case 'green':
      return (<svg {...common}><path d="M12 21v-8" /><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" /><path d="M12 15c0-3-2-6-7-6 0 3 2 6 7 6z" /></svg>);
    case 'energy':
      return (<svg {...common}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>);
    case 'waste':
      return (<svg {...common}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v6M14 11v6" /></svg>);
    case 'water':
      return (<svg {...common}><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /></svg>);
    case 'consume':
      return (<svg {...common}><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>);
    case 'climate':
      return (<svg {...common}><circle cx="9" cy="9" r="3.5" /><path d="M9 2v2M2 9h2M4 4l1.4 1.4" /><path d="M8 19h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5 1.5A3 3 0 0 0 8 19z" /></svg>);
    case 'biodiversity':
      return (<svg {...common}><path d="M12 22v-6" /><path d="M12 16c-5 0-8-3-8-7 3 0 5 1 6 3 0-4 1-7 2-9 1 2 2 5 2 9 1-2 3-3 6-3 0 4-3 7-8 7z" /></svg>);
    default:
      return null;
  }
}

/** Hạt Dân placeholder: viên đất tròn có mầm. */
export function SeedToken() {
  return (
    <g>
      <ellipse cx="0" cy="1.6" rx="4.6" ry="3.9" fill="#9a5b34" />
      <ellipse cx="-1.2" cy="0.4" rx="1.6" ry="1" fill="#c98a5c" opacity="0.8" />
      <path d="M0 -2.2c0-1.6 1-2.6 2.6-2.8-.1 1.6-1.1 2.6-2.6 2.8z" fill="#5e9a4b" />
    </g>
  );
}

/** Quân Quan placeholder: huy hiệu tròn theo chủ đề Quan. */
export function QuanToken({ theme }: { theme: 'climate' | 'biodiversity' }) {
  const fill = theme === 'climate' ? '#3f8fc0' : '#2d7c4d';
  return (
    <svg viewBox="0 0 48 48" className="oq2-quan-token" aria-hidden="true" focusable="false">
      <circle cx="24" cy="26" r="19" fill="#7a4a2a" />
      <circle cx="24" cy="23" r="19" fill="#f2d4a7" stroke="#ac8157" strokeWidth="2" />
      <circle cx="24" cy="23" r="13" fill={fill} />
      <g transform="translate(14 13) scale(0.85)" color="#ffffff">
        <ThemeIcon theme={theme} size={24} />
      </g>
    </svg>
  );
}
