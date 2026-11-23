import type { CSSProperties } from 'react';
import { SeedToken } from './Icons';

/**
 * Bàn tay rải sỏi — SVG tự vẽ (original) theo phong cách Storybook Garden:
 * tay áo xanh sage, viền ấm, đổ bóng mềm. Hạt là phần tử riêng, không nằm trong sprite tay.
 * Gốc tọa độ: đầu ngón tay (điểm chạm ô) ở (50, 100) của viewBox 100×130.
 */
export type HandPose = 'pick' | 'carry' | 'drop' | 'retract';

interface PoseSpec {
  /** Độ xoay mỗi ngón (độ) và co ngón (scaleY). */
  readonly finger: readonly [number, number][];
  readonly thumb: readonly [number, number];
  readonly seeds: boolean;
  readonly lift: number;
}

const POSES: Record<HandPose, PoseSpec> = {
  // PICK_UP: các ngón chụm lại, ngón cái ép vào
  pick: { finger: [[9, 0.8], [3, 0.74], [-3, 0.74], [-9, 0.8]], thumb: [-34, 1], seeds: true, lift: 4 },
  // CARRY: lòng bàn tay khum, giữ hạt
  carry: { finger: [[3, 0.88], [1, 0.84], [-1, 0.84], [-3, 0.88]], thumb: [-20, 1], seeds: true, lift: 0 },
  // DROP: các ngón mở nhẹ, thả một hạt
  drop: { finger: [[-16, 1], [-6, 1.04], [6, 1.04], [16, 1]], thumb: [18, 1], seeds: true, lift: -2 },
  // RETRACT: duỗi thẳng, rút lên
  retract: { finger: [[-7, 1], [-2, 1.04], [2, 1.04], [7, 1]], thumb: [8, 1], seeds: false, lift: -10 },
};

const FINGERS = [
  { x: 36.5, w: 9, len: 38 },
  { x: 46, w: 9.5, len: 42 },
  { x: 55.5, w: 9.5, len: 41 },
  { x: 64.5, w: 8.5, len: 33 },
];

function finger(w: number, len: number) {
  const r = w / 2;
  return `M ${-r} 0 L ${-r} ${len - r} A ${r} ${r} 0 0 0 ${r} ${len - r} L ${r} 0 Z`;
}

export function HandSprite({ pose, ms }: { pose: HandPose; ms: number }) {
  const spec = POSES[pose];
  const tr = `transform ${ms}ms cubic-bezier(0.3, 0.7, 0.3, 1)`;
  return (
    <svg className={`oq2-handsvg oq2-handsvg--${pose}`} viewBox="0 -50 100 180" width="100" height="180" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="oq2-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8c9a8" />
          <stop offset="1" stopColor="#e9a27c" />
        </linearGradient>
        <linearGradient id="oq2-sleeve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86b39a" stopOpacity="0" />
          <stop offset="0.45" stopColor="#86b39a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#66967f" />
        </linearGradient>
      </defs>
      <g style={{ transform: `translateY(${spec.lift}px)`, transition: tr } as CSSProperties}>
        <ellipse className="oq2-handshadow" cx="50" cy="106" rx="26" ry="7" fill="rgba(80,55,25,0.28)" />
        {/* tay áo */}
        <path d="M 29 -50 L 71 -50 L 73 28 L 27 28 Z" fill="url(#oq2-sleeve)" />
        <path d="M 36 -30 L 42 -30 L 41 26 L 35 26 Z" fill="#fff" opacity="0.18" />
        <path d="M 26 24 Q 50 34 74 24 L 75 33 Q 50 43 25 33 Z" fill="#e79a7c" stroke="#c9775a" strokeWidth="1.2" />
        <g transform="translate(32 50)">
          <g style={{ transform: `rotate(${spec.thumb[0]}deg)`, transformOrigin: '0px 0px', transition: tr } as CSSProperties}>
            <path d={finger(10.5, 30)} fill="url(#oq2-skin)" stroke="#c98862" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M -1.5 4 L -1.5 21" stroke="#fde3cf" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
          </g>
        </g>
        {FINGERS.map((f, i) => (
          <g key={f.x} transform={`translate(${f.x} 54)`}>
            <g style={{ transform: `rotate(${spec.finger[i][0]}deg) scaleY(${spec.finger[i][1]})`, transformOrigin: '0px 0px', transition: tr } as CSSProperties}>
              <path d={finger(f.w, f.len)} fill="url(#oq2-skin)" stroke="#c98862" strokeWidth="1.4" strokeLinejoin="round" />
              <path d={`M -1.5 3 L -1.5 ${f.len - 9}`} stroke="#fde3cf" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
            </g>
          </g>
        ))}
        <path d="M 30 32 Q 28 54 38 62 L 63 62 Q 73 54 70 32 Q 50 27 30 32 Z" fill="url(#oq2-skin)" stroke="#c98862" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M 37 38 Q 50 34 63 38" stroke="#fde3cf" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
        {spec.seeds ? (
          <g className="oq2-handseeds">
            <g transform="translate(43 76) scale(2)"><SeedToken /></g>
            <g transform="translate(56 78) scale(2)"><SeedToken /></g>
            <g transform="translate(50 70) scale(2)"><SeedToken /></g>
          </g>
        ) : null}
      </g>
    </svg>
  );
}
