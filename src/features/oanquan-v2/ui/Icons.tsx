import type { Theme } from '../content/themes';
import { QUAN_MASCOT, TOPIC_ICON, mascotSrc, type MascotId, type MascotPose } from './assets';

/**
 * Hình trong bàn cờ — ArtPack V3.
 * Icon 5 chủ đề Dân và hạt Dân là SVG của gói; hai Ô Quan dùng linh vật gốc.
 */

/** Icon chủ đề: 5 chủ đề Dân dùng huy hiệu tròn V3; hai chủ đề Quan dùng linh vật. */
export function ThemeIcon({ theme, size = 18 }: { theme: Theme; size?: number }) {
  const icon = TOPIC_ICON[theme];
  if (icon) {
    return <img src={icon} alt="" width={size} height={size} className="oq2-topic-icon" aria-hidden="true" />;
  }
  const who = QUAN_MASCOT[theme as 'climate' | 'biodiversity'];
  return <img src={mascotSrc(who, 'idle')} alt="" width={size} height={size} className="oq2-topic-icon oq2-topic-icon--mascot" aria-hidden="true" />;
}

/** Hạt Dân (viên đất + mầm) — `tokens/seed_dan_earth_sprout.svg` vẽ lại inline, gốc ở tâm. */
export function SeedToken() {
  return (
    <g transform="scale(0.1875) translate(-32 -32)">
      <ellipse cx="32" cy="47" rx="21" ry="6" fill="#644624" opacity=".15" />
      <path d="M18 43 C8 27 15 10 30 11 C47 9 54 26 46 40 C40 50 26 53 18 43Z" fill="#A96D3E" stroke="#75492D" strokeWidth="2.4" />
      <path d="M20 21 C29 14 36 15 40 19" fill="none" stroke="#E6B779" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M32 16 Q34 9 37 7" stroke="#557D3F" strokeWidth="2.7" fill="none" />
      <path d="M36 10 Q47 2 50 11 Q44 17 36 10Z" fill="#7DA958" stroke="#507744" strokeWidth="1.2" />
    </g>
  );
}

/** Linh vật ở các khoảnh khắc hướng dẫn, kết quả, chiến thắng. */
export function Mascot({ who, pose, size, className = '' }: {
  who: MascotId; pose: MascotPose; size: number; className?: string;
}) {
  return (
    <img
      src={mascotSrc(who, pose)}
      alt=""
      aria-hidden="true"
      className={`oq2-mascot-img ${className}`.trim()}
      style={{ height: size }}
    />
  );
}

/**
 * Quân Quan: bệ gỗ (`tokens/quan_mascot_mount_empty.svg`) với linh vật của chủ đề đứng trên.
 * Word của nhóm mô tả quân Quan là "mô hình hai linh vật"; G0.5 lại vẽ vật phẩm riêng.
 * Bản dev này theo ArtPack V3 (bệ + linh vật); quyết định cuối thuộc OQ-14.
 */
export function QuanToken({ theme }: { theme: 'climate' | 'biodiversity' }) {
  const who = QUAN_MASCOT[theme];
  return (
    <span className="oq2-quan-token" aria-hidden="true">
      <svg viewBox="0 0 144 144" className="oq2-quan-mount">
        <ellipse cx="72" cy="128" rx="53" ry="9" fill="#4D3A1F" opacity=".19" />
        <circle cx="72" cy="71" r="60" fill="#976941" stroke="#805832" strokeWidth="5" />
        <circle cx="72" cy="66" r="55" fill="#E1B675" stroke="#FBE3B2" strokeWidth="9" />
        <circle cx="72" cy="63" r="45" fill="#F7E6C3" stroke="#B98755" strokeWidth="3" />
      </svg>
      <img src={mascotSrc(who, 'idle')} alt="" className="oq2-quan-mascot" />
    </span>
  );
}
