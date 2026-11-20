import { useEffect, useRef, useState } from 'react';
import {
  PITS,
  SANDBOX_RULESET,
  pitDisplayLabel,
  type OAnQuanRuleset,
} from './prototypeOnlyModel';
import { ThreeBoardRenderer, type ThreeBoardHopTransition } from './threeBoardRenderer';

interface OAnQuanTabletopExperienceProps {
  readonly mode?: 'embedded' | 'standalone';
  readonly ruleset?: OAnQuanRuleset;
}

export function OAnQuanTabletopExperience({
  mode = 'embedded',
  ruleset = SANDBOX_RULESET,
}: OAnQuanTabletopExperienceProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ThreeBoardRenderer | null>(null);
  const pitButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [counts, setCounts] = useState<readonly number[]>(ruleset.initialCounts);
  const [selected, setSelected] = useState<number>(1);
  const [hovered, setHovered] = useState<number>(-1);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [liveStatus, setLiveStatus] = useState<string>(
    'Bàn gỗ 3D đang ở chế độ thử nghiệm — chọn một ô và nhấn chuyển thử 1 hạt minh họa.',
  );

  // Track prefers-reduced-motion live
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Mount Three.js renderer cleanly inside isolated container
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let instance: ThreeBoardRenderer | null = null;
    try {
      instance = new ThreeBoardRenderer(
        mount,
        {
          counts: ruleset.initialCounts,
          selected: 1,
          hovered: -1,
          reducedMotion,
        },
        {
          onHoverPit: (pitIdx) => setHovered(pitIdx),
          onSelectPit: (pitIdx) => {
            setSelected(pitIdx);
            setLiveStatus(`Đã chọn ${PITS[pitIdx].label}.`);
          },
          onContextLost: () => {
            setFallbackReason(
              'Trình duyệt vừa tạm ngắt ngữ cảnh đồ họa WebGL. Bạn vẫn có thể điều khiển đầy đủ 12 ô bằng lưới nút bên dưới.',
            );
          },
          onContextRestored: () => {
            setFallbackReason(null);
            setLiveStatus('Đã khôi phục hiển thị bàn gỗ 3D.');
          },
        },
      );
      rendererRef.current = instance;
      setFallbackReason(null);
    } catch {
      setFallbackReason(
        'Thiết bị hiện không khởi tạo được WebGL 3D. Lưới 12 ô bên dưới vẫn hoạt động đầy đủ bằng chuột và bàn phím.',
      );
      return;
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            instance?.resize();
          })
        : null;
    observer?.observe(mount);

    return () => {
      observer?.disconnect();
      instance?.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleset]);

  // Sync reactive state into Three.js renderer on demand
  useEffect(() => {
    rendererRef.current?.updateState({
      counts,
      selected,
      hovered,
      reducedMotion,
    });
  }, [counts, selected, hovered, reducedMotion]);

  const handleMoveSeed = () => {
    const result = ruleset.applyAction(counts, selected);
    setCounts(result.counts);
    setLiveStatus(result.summary);

    if (result.moved) {
      const hop: ThreeBoardHopTransition = {
        fromPitIndex: result.fromPitIndex,
        toPitIndex: result.toPitIndex,
      };
      rendererRef.current?.updateState(
        {
          counts: result.counts,
          selected,
          hovered,
          reducedMotion,
        },
        hop,
      );
    }
  };

  const handleReset = () => {
    setCounts(ruleset.initialCounts);
    setSelected(1);
    setLiveStatus('Đã đặt lại số hạt minh họa ban đầu trên toàn bộ 12 ô.');
    rendererRef.current?.resetCamera();
  };

  const handlePitKeyDown = (index: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % PITS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + PITS.length) % PITS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = PITS.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setSelected(nextIndex);
      pitButtonRefs.current[nextIndex]?.focus();
      setLiveStatus(`Đang chọn ${PITS[nextIndex].label}.`);
    }
  };

  const selectedPit = PITS[selected];
  const selectedCount = counts[selected] ?? 0;
  const canMove = ruleset.canActOnPit(counts, selected);

  return (
    <div
      className={`oq-tabletop oq-tabletop--${mode}`}
      aria-label="Bàn gỗ Ô ăn quan xanh 3D tương tác"
    >
      <div className="oq-tabletop__notice-bar">
        <span className="oq-tabletop__badge">Bàn gỗ 3D thử nghiệm</span>
        <p className="oq-tabletop__notice-text">
          {ruleset.name}. Kéo nhẹ trên bàn để nghiêng góc nhìn hoặc bấm chọn từng ô.
        </p>
      </div>

      <div className="oq-tabletop__stage">
        {/* Keep the canvas attached so Three.js can receive context restoration. */}
        <div
          ref={mountRef}
          className="oq-tabletop__canvas-mount"
          data-testid="oanquan-three-mount"
          style={{ visibility: fallbackReason ? 'hidden' : undefined }}
        />
        {fallbackReason && (
          <div className="oq-tabletop__fallback" role="status">
            <p className="oq-tabletop__fallback-title">
              Chế độ lưới ô dễ tiếp cận (dự phòng WebGL)
            </p>
            <p className="oq-tabletop__fallback-body">{fallbackReason}</p>
          </div>
        )}
      </div>

      <div className="oq-tabletop__controls">
        <div className="oq-tabletop__selection">
          <div className="oq-tabletop__selection-copy">
            <p className="oq-tabletop__selection-label">Ô đang chọn</p>
            <p className="oq-tabletop__selection-value">
              {pitDisplayLabel(selectedPit, selectedCount)}
            </p>
          </div>

          <div className="oq-tabletop__buttons">
            <button
              type="button"
              className="gp-button gp-button--primary"
              onClick={handleMoveSeed}
              disabled={!canMove}
            >
              Chuyển thử 1 hạt minh họa
            </button>
            <button
              type="button"
              className="gp-button gp-button--secondary"
              onClick={handleReset}
            >
              Đặt lại bàn & góc nhìn
            </button>
          </div>
        </div>

        <p className="oq-tabletop__live-status" role="status" aria-live="polite">
          {liveStatus}
        </p>

        <div className="oq-tabletop__grid-wrap">
          <p className="oq-tabletop__grid-hint">
            Điều khiển bàn phím đầy đủ (dùng phím mũi tên Trái/Phải để chuyển qua 12 ô):
          </p>
          <div
            className="oq-tabletop__pit-grid"
            role="group"
            aria-label="Danh sách 12 ô trên bàn Ô ăn quan xanh"
          >
            {PITS.map((pit, index) => {
              const isSelected = index === selected;
              return (
                <button
                  key={pit.id}
                  ref={(el) => {
                    pitButtonRefs.current[index] = el;
                  }}
                  type="button"
                  className={`oq-pit-btn${pit.isQuan ? ' oq-pit-btn--quan' : ''}${
                    isSelected ? ' is-selected' : ''
                  }`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelected(index);
                    setLiveStatus(`Đã chọn ${pitDisplayLabel(pit, counts[index])}.`);
                  }}
                  onKeyDown={(event) => handlePitKeyDown(index, event)}
                >
                  <span className="oq-pit-btn__name">
                    {pit.isQuan
                      ? pit.id === 'quan-left'
                        ? 'Quan Trái'
                        : 'Quan Phải'
                      : pit.id.startsWith('top-')
                        ? `Trên ${pit.id.slice(4)}`
                        : `Dưới ${pit.id.slice(7)}`}
                  </span>
                  <span className="oq-pit-btn__count">{counts[index]} hạt</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
