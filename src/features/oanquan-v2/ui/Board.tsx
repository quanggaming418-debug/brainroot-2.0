import { useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { isQuanPit, ownerOf, pitLabel, type PlayerId, type RingIndex } from '../engine';
import { THEMES, themeOfRing } from '../content/themes';
import { QuanToken, SeedToken, ThemeIcon } from './Icons';
import { FX } from './assets';

export type BoardLayout = 'landscape' | 'portrait';

export interface BoardMarks {
  /** Ô đang được chọn (bước chọn chiều). */
  readonly selected: number | null;
  /** Đường đi xem trước của nắm hạt đầu. */
  readonly path: readonly number[];
  /** Ô xuất phát của lần bốc hiện tại. */
  readonly origin: number | null;
  /** Ô đang nhận hạt / đang bị bốc. */
  readonly active: number | null;
  /** Ô quyết định dừng lượt (sau hạt cuối). */
  readonly stopAt: number | null;
  readonly target: number | null;
  readonly targetChip: string | null;
  readonly harvested: number | null;
  readonly shake: number | null;
  /** Ô Quan vừa nhận hạt (hiệu ứng riêng). */
  readonly quanPulse: number | null;
}

export const NO_MARKS: BoardMarks = {
  selected: null, path: [], origin: null, active: null, stopAt: null,
  target: null, targetChip: null, harvested: null, shake: null, quanPulse: null,
};

export interface BoardProps {
  readonly layout: BoardLayout;
  readonly pits: readonly number[];
  readonly quanOnBoard: readonly [boolean, boolean];
  readonly playerNames: Readonly<Record<PlayerId, string>>;
  readonly interactive: boolean;
  readonly legal: ReadonlySet<number>;
  readonly marks: BoardMarks;
  readonly onSelect: (ring: RingIndex) => void;
  readonly onRejected: (ring: RingIndex) => void;
}

/** Vị trí lưới theo ringIndex. Bố cục dọc = xoay 90° chiều kim đồng hồ, không phản chiếu. */
export function pitGridArea(ring: number, layout: BoardLayout): CSSProperties {
  if (layout === 'landscape') {
    if (ring === 0) return { gridColumn: '1', gridRow: '1 / 3' };
    if (ring === 6) return { gridColumn: '7', gridRow: '1 / 3' };
    if (ring <= 5) return { gridColumn: String(ring + 1), gridRow: '1' };
    return { gridColumn: String(13 - ring), gridRow: '2' };
  }
  if (ring === 0) return { gridRow: '1', gridColumn: '1 / 4' };
  if (ring === 6) return { gridRow: '7', gridColumn: '1 / 4' };
  if (ring <= 5) return { gridColumn: '3', gridRow: String(ring + 1) };
  return { gridColumn: '1', gridRow: String(13 - ring) };
}

// Vị trí token (tỉ lệ trong lòng ô) theo Handoff §4.2.
const POS_SQUARE: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.33, 0.44], [0.67, 0.56]],
  3: [[0.3, 0.34], [0.7, 0.34], [0.5, 0.68]],
  4: [[0.3, 0.32], [0.7, 0.32], [0.3, 0.68], [0.7, 0.68]],
  5: [[0.27, 0.28], [0.73, 0.28], [0.5, 0.5], [0.27, 0.72], [0.73, 0.72]],
  6: [[0.22, 0.3], [0.5, 0.3], [0.78, 0.3], [0.22, 0.68], [0.5, 0.68]],
};
const POS_WIDE: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.35, 0.5], [0.65, 0.5]],
  3: [[0.22, 0.5], [0.5, 0.5], [0.78, 0.5]],
  4: [[0.32, 0.3], [0.68, 0.3], [0.32, 0.72], [0.68, 0.72]],
  5: [[0.2, 0.3], [0.5, 0.3], [0.8, 0.3], [0.35, 0.72], [0.65, 0.72]],
  6: [[0.2, 0.3], [0.5, 0.3], [0.8, 0.3], [0.2, 0.72], [0.5, 0.72]],
};
const POS_ROW: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.38, 0.5], [0.62, 0.5]],
  3: [[0.26, 0.5], [0.5, 0.5], [0.74, 0.5]],
  4: [[0.17, 0.5], [0.39, 0.5], [0.61, 0.5], [0.83, 0.5]],
  5: [[0.1, 0.5], [0.3, 0.5], [0.5, 0.5], [0.7, 0.5], [0.9, 0.5]],
  6: [[0.1, 0.5], [0.3, 0.5], [0.5, 0.5], [0.7, 0.5], [0.9, 0.5]],
};

function Seeds({ count, table, className = 'oq2-seeds' }: { count: number; table: Record<number, [number, number][]>; className?: string }) {
  if (count <= 0) return null;
  const pos = table[count > 5 ? 6 : count];
  return (
    <span className={className} aria-hidden="true">
      {pos.map(([x, y], i) => (
        <svg
          key={i}
          className="oq2-seed"
          viewBox="-6 -6 12 12"
          style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: `translate(-50%, -50%) rotate(${((i * 37) % 13) - 6}deg)` }}
        >
          <SeedToken />
        </svg>
      ))}
    </span>
  );
}

export function Board(props: BoardProps) {
  const { layout, pits, quanOnBoard, playerNames, interactive, legal, marks } = props;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastInPath = marks.path.length ? marks.path[marks.path.length - 1] : null;
  const pathSet = new Set(marks.path);

  const onKeyDown = (ring: number, e: KeyboardEvent<HTMLButtonElement>) => {
    if (!interactive) return;
    const order = [...legal].sort((a, b) => a - b);
    if (!order.length) return;
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') delta = 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') delta = -1;
    if (!delta) return;
    e.preventDefault();
    const idx = order.indexOf(ring);
    const nextIdx = idx < 0 ? 0 : (idx + delta + order.length) % order.length;
    refs.current[order[nextIdx]]?.focus();
  };

  return (
    <div className="oq2-board" data-layout={layout}>
      {pits.map((count, ring) => {
        const r = ring as RingIndex;
        const theme = themeOfRing(r);
        const quan = isQuanPit(r);
        const owner = ownerOf(r);
        const isLegal = interactive && legal.has(r);
        const disabled = interactive && !isLegal;
        const quanHere = quan ? quanOnBoard[r === 0 ? 0 : 1] : false;
        const classes = ['oq2-pit', quan ? 'oq2-pit--quan' : 'oq2-pit--dan', `oq2-pit--ring${r}`];
        if (!quan) classes.push(ring % 2 === 0 ? 'oq2-rim-mint' : 'oq2-rim-peach');
        if (isLegal) classes.push('is-legal');
        if (disabled && !quan) classes.push('is-disabled');
        if (marks.selected === r) classes.push('is-selected');
        if (pathSet.has(r)) classes.push('is-path');
        if (marks.origin === r) classes.push('is-origin');
        if (marks.active === r) classes.push('is-active');
        if (marks.stopAt === r) classes.push('is-stop');
        if (marks.target === r) classes.push('is-target');
        if (marks.harvested === r) classes.push('is-harvested');
        if (marks.shake === r) classes.push('is-shake');
        if (marks.quanPulse === r) classes.push('is-quan-pulse');

        let label: string;
        if (quan) {
          const t = THEMES[theme];
          label = `Ô Quan ${t.fullName}: ${quanHere ? 'còn quân Quan' : 'quân Quan đã được thu hoạch'}, ${count} hạt Dân`;
        } else {
          label = `Ô ${pitLabel(r)} · ${THEMES[theme].name} · hàng của ${playerNames[owner as PlayerId]} · ${count} hạt`;
          if (interactive) label += isLegal ? ' · chọn được' : ' · không chọn được';
        }

        return (
          <button
            key={r}
            ref={(el) => { refs.current[r] = el; }}
            type="button"
            className={classes.join(' ')}
            style={pitGridArea(r, layout)}
            data-ring={r}
            aria-label={label}
            aria-disabled={disabled || !interactive ? true : undefined}
            aria-pressed={marks.selected === r ? true : undefined}
            tabIndex={interactive ? (isLegal ? 0 : -1) : -1}
            onClick={() => {
              if (!interactive) return;
              if (isLegal) props.onSelect(r);
              else props.onRejected(r);
            }}
            onKeyDown={(e) => onKeyDown(r, e)}
          >
            {quan ? (
              <>
                <span className="oq2-quan-label">
                  <ThemeIcon theme={theme} size={18} />
                  <span className="oq2-quan-name oq2-quan-name--full">{THEMES[theme].name}</span>
                  <span className="oq2-quan-name oq2-quan-name--short">{THEMES[theme].short}</span>
                </span>
                {quanHere ? (
                  <QuanToken theme={theme as 'climate' | 'biodiversity'} />
                ) : (
                  <span className="oq2-quan-gone">Quan đã thu hoạch</span>
                )}
                <span className="oq2-quan-seedbox" aria-hidden="true">
                  <Seeds count={count} table={POS_ROW} className="oq2-seeds oq2-seeds--row" />
                  {count > 5 ? <span className="oq2-more">+{count - 5}</span> : null}
                </span>
                <span className="oq2-quan-count">{quanHere ? `Quan + ${count} hạt` : `${count} hạt`}</span>
              </>
            ) : (
              <>
                <span className={`oq2-theme-chip oq2-theme--${theme}`} aria-hidden="true">
                  <ThemeIcon theme={theme} size={28} />
                </span>
                <span className={`oq2-badge${count === 0 ? ' is-zero' : ''}`} aria-hidden="true">{count}</span>
                <span className="oq2-pit-name" aria-hidden="true">{pitLabel(r)}</span>
                {count === 0 && marks.harvested !== r ? <span className="oq2-empty" aria-hidden="true">Trống</span> : null}
                <Seeds count={count} table={layout === 'portrait' ? POS_WIDE : POS_SQUARE} />
                {count > 5 ? <span className="oq2-more" aria-hidden="true">+{count - 5}</span> : null}
              </>
            )}
            {pathSet.has(r) ? <span className="oq2-ghost" aria-hidden="true" /> : null}
            {lastInPath === r ? <span className="oq2-chip oq2-chip--last" aria-hidden="true">Hạt cuối</span> : null}
            {marks.target === r ? <img className="oq2-fx-capture" src={FX.captureRing} alt="" aria-hidden="true" /> : null}
            {marks.target === r && marks.targetChip ? <span className="oq2-chip oq2-chip--target" aria-hidden="true">{marks.targetChip}</span> : null}
            {marks.harvested === r ? <span className="oq2-chip oq2-chip--harvested" aria-hidden="true">Đã thu hoạch</span> : null}
          </button>
        );
      })}
      <img className="oq2-board-leaf oq2-board-leaf--a" src={FX.leafCorner} alt="" aria-hidden="true" />
      <img className="oq2-board-leaf oq2-board-leaf--b" src={FX.leafCorner} alt="" aria-hidden="true" />
    </div>
  );
}
