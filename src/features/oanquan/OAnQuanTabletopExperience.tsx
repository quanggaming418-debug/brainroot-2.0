import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import { getOAnQuanTabletopCopy } from '../../i18n/siteCopy';
import {
  INITIAL_SANDBOX_COUNTS,
  PITS,
  SANDBOX_RULESET,
  pitDisplayLabel,
  type OAnQuanRuleset,
} from './prototypeOnlyModel';
import { ThreeBoardRenderer, type ThreeBoardHopTransition } from './threeBoardRenderer';

type PitMeta = (typeof PITS)[number];

interface OAnQuanTabletopExperienceProps {
  readonly mode?: 'embedded' | 'standalone';
  readonly ruleset?: OAnQuanRuleset;
}

export function OAnQuanTabletopExperience({
  mode = 'embedded',
  ruleset = SANDBOX_RULESET,
}: OAnQuanTabletopExperienceProps) {
  const { locale } = useI18n();
  const copy = getOAnQuanTabletopCopy(locale);

  const formatPitShortName = (pit: PitMeta): string => {
    if (pit.isQuan) {
      return pit.id === 'quan-left' ? copy.quanLeft : copy.quanRight;
    }
    return pit.id.startsWith('top-')
      ? `${copy.topRowPrefix} ${pit.id.slice(4)}`
      : `${copy.bottomRowPrefix} ${pit.id.slice(7)}`;
  };

  const formatPitDisplay = (pit: PitMeta, count: number): string => {
    if (locale === 'vi') return pitDisplayLabel(pit, count);
    return `${formatPitShortName(pit)} (${count} ${copy.seedUnit})`;
  };

  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ThreeBoardRenderer | null>(null);
  const pitButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const copyRef = useRef(copy);
  copyRef.current = copy;

  const [counts, setCounts] = useState<readonly number[]>(ruleset.initialCounts);
  const [selected, setSelected] = useState<number>(1);
  const [hovered, setHovered] = useState<number>(-1);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [liveStatus, setLiveStatus] = useState<string>(copy.initialLiveStatus);

  useEffect(() => {
    setLiveStatus(copy.initialLiveStatus);
  }, [locale, copy.initialLiveStatus]);

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
            const c = copyRef.current;
            const pit = PITS[pitIdx];
            const name = pit.isQuan
              ? pit.id === 'quan-left'
                ? c.quanLeft
                : c.quanRight
              : pit.id.startsWith('top-')
                ? `${c.topRowPrefix} ${pit.id.slice(4)}`
                : `${c.bottomRowPrefix} ${pit.id.slice(7)}`;
            setLiveStatus(`${c.selectedPitPrefix} ${name}.`);
          },
          onContextLost: () => {
            setFallbackReason(copyRef.current.contextLostFallback);
          },
          onContextRestored: () => {
            setFallbackReason(null);
            setLiveStatus(copyRef.current.contextRestored);
          },
        },
      );
      rendererRef.current = instance;
      setFallbackReason(null);
    } catch {
      setFallbackReason(copyRef.current.webglInitFallback);
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

    if (result.moved) {
      const fromName = formatPitShortName(PITS[result.fromPitIndex]);
      const toName = formatPitShortName(PITS[result.toPitIndex]);
      setLiveStatus(
        locale === 'vi'
          ? result.summary
          : copy.movedSeedTemplate(fromName, toName),
      );

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
    } else {
      setLiveStatus(
        locale === 'vi'
          ? result.summary
          : `${formatPitShortName(PITS[selected])} ${copy.emptyPitNotice}`,
      );
    }
  };

  const handleReset = () => {
    setCounts(INITIAL_SANDBOX_COUNTS);
    setSelected(1);
    setLiveStatus(copy.resetStatus);
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
      setLiveStatus(`${copy.selectedPitPrefix} ${formatPitShortName(PITS[nextIndex])}.`);
    }
  };

  const selectedPit = PITS[selected];
  const selectedCount = counts[selected] ?? 0;
  const canMove = ruleset.canActOnPit(counts, selected);

  return (
    <div
      className={`oq-tabletop oq-tabletop--${mode}`}
      aria-label={copy.ariaLabel}
    >
      <div className="oq-tabletop__notice-bar">
        <span className="oq-tabletop__badge">{copy.badge}</span>
        <p className="oq-tabletop__notice-text">
          {copy.noticePrefix ?? `${ruleset.name}.`} {copy.noticeHint}
        </p>
      </div>

      <div className="oq-tabletop__stage">
        {fallbackReason ? (
          <div className="oq-tabletop__fallback" role="status">
            <p className="oq-tabletop__fallback-title">{copy.fallbackTitle}</p>
            <p className="oq-tabletop__fallback-body">{fallbackReason}</p>
          </div>
        ) : (
          <div
            ref={mountRef}
            className="oq-tabletop__canvas-mount"
            data-testid="oanquan-three-mount"
          />
        )}
      </div>

      <div className="oq-tabletop__controls">
        <div className="oq-tabletop__selection">
          <div className="oq-tabletop__selection-copy">
            <p className="oq-tabletop__selection-label">{copy.selectionLabel}</p>
            <p className="oq-tabletop__selection-value">
              {formatPitDisplay(selectedPit, selectedCount)}
            </p>
          </div>

          <div className="oq-tabletop__buttons">
            <button
              type="button"
              className="gp-button gp-button--primary"
              onClick={handleMoveSeed}
              disabled={!canMove}
            >
              {copy.moveBtn}
            </button>
            <button
              type="button"
              className="gp-button gp-button--secondary"
              onClick={handleReset}
            >
              {copy.resetBtn}
            </button>
          </div>
        </div>

        <p className="oq-tabletop__live-status" role="status" aria-live="polite">
          {liveStatus}
        </p>

        <div className="oq-tabletop__grid-wrap">
          <p className="oq-tabletop__grid-hint">{copy.gridHint}</p>
          <div
            className="oq-tabletop__pit-grid"
            role="group"
            aria-label={copy.gridAria}
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
                    setLiveStatus(
                      `${copy.selectedPitPrefix} ${formatPitDisplay(pit, counts[index])}.`,
                    );
                  }}
                  onKeyDown={(event) => handlePitKeyDown(index, event)}
                >
                  <span className="oq-pit-btn__name">
                    {formatPitShortName(pit)}
                  </span>
                  <span className="oq-pit-btn__count">
                    {counts[index]} {copy.seedUnit}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
