import type { ReactNode } from 'react';
import type { EcosystemVariant, LearningJourneyStage } from '../../data/landing';

/**
 * Shared visual primitives anchoring the entire Brainroot 2.0 site
 * to ONE LIVING WORLD derived from Hero V4's sunlit garden palette:
 * Peach #E79A7C · Sage #A6C6B6 · Headline Green #63894C · Ivory #F8F3E9 · Forest #263B31
 */

interface GardenSectionProps {
  readonly id?: string;
  readonly className?: string;
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
  readonly children: ReactNode;
}

export function GardenSection({
  id,
  className = '',
  ariaLabelledBy,
  ariaLabel,
  children,
}: GardenSectionProps) {
  return (
    <section
      id={id}
      tabIndex={id ? -1 : undefined}
      className={`garden-section ${className}`.trim()}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

interface BotanicalDividerProps {
  readonly topFill?: string;
  readonly bottomFill?: string;
  readonly accentFill?: string;
  readonly flip?: boolean;
  readonly className?: string;
}

export function BotanicalDivider({
  topFill = 'transparent',
  bottomFill = '#F8F3E9',
  accentFill = '#DDE8D8',
  flip = false,
  className = '',
}: BotanicalDividerProps) {
  return (
    <div
      className={`botanical-divider${flip ? ' botanical-divider--flip' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg
        className="botanical-divider__svg"
        viewBox="0 0 1440 92"
        preserveAspectRatio="none"
        focusable="false"
      >
        <rect width="1440" height="92" fill={topFill} />
        <path
          d="M0,48 C210,12 430,78 720,42 C1020,6 1230,66 1440,32 L1440,92 L0,92 Z"
          fill={accentFill}
          opacity="0.72"
        />
        <path
          d="M0,62 C260,26 520,86 810,50 C1080,18 1280,68 1440,46 L1440,92 L0,92 Z"
          fill={bottomFill}
        />
      </svg>
    </div>
  );
}

/**
 * H02 — Seamless Hero-to-Garden Transition Band.
 * Bridges Hero V4's warm meadow foreground into the sunlit warm-ivory
 * Four Worlds garden using layered botanical contours, stepping stones
 * aligned on the 50% visual axis, and matching upper-left sunlight.
 */
export function GardenTransitionBand() {
  return (
    <div className="garden-transition" aria-hidden="true">
      <div className="garden-transition__meadow">
        <svg
          className="garden-transition__contour"
          viewBox="0 0 1440 168"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id="gt-sun-wash" x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0%" stopColor="#F5D7B8" stopOpacity="0.65" />
              <stop offset="52%" stopColor="#E6EADB" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#CFE0D1" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="gt-ivory-blend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFF0E4" />
              <stop offset="100%" stopColor="#F8F3E9" />
            </linearGradient>
          </defs>
          {/* Back meadow hill echoing Hero V4 foreground */}
          <path
            d="M0,56 C240,14 480,74 720,46 C960,18 1210,72 1440,34 L1440,168 L0,168 Z"
            fill="#B7CFAF"
            opacity="0.62"
          />
          {/* Sunlit mid meadow ridge */}
          <path
            d="M0,84 C290,46 510,98 760,68 C1040,36 1240,86 1440,56 L1440,168 L0,168 Z"
            fill="url(#gt-sun-wash)"
          />
          {/* Foreground warm ivory garden path entry */}
          <path
            d="M0,118 C270,84 520,126 740,104 C990,80 1230,118 1440,94 L1440,168 L0,168 Z"
            fill="url(#gt-ivory-blend)"
          />
          {/* 3 stepping stones along the center axis guiding the eye into H03 */}
          <ellipse cx="716" cy="96" rx="34" ry="11" fill="#FBF5E8" stroke="#C9BFA9" strokeWidth="1.5" />
          <ellipse cx="732" cy="124" rx="44" ry="14" fill="#FCF7EC" stroke="#CFC4AE" strokeWidth="1.5" />
          <ellipse cx="712" cy="153" rx="52" ry="14" fill="#F6E9D7" stroke="#D3C4AE" strokeWidth="1.5" />
          {/* Left botanical leaf sprig */}
          <g transform="translate(88, 72) rotate(-14)" opacity="0.82">
            <path d="M0,44 C8,22 24,8 48,4 C38,24 24,38 0,44 Z" fill="#89AE7E" />
            <path d="M12,48 C28,34 48,30 70,34 C54,48 34,54 12,48 Z" fill="#A6C6B6" />
          </g>
          {/* Right warm peach blossom & sage sprig */}
          <g transform="translate(1284, 68) rotate(12)" opacity="0.82">
            <path d="M68,46 C54,24 38,10 14,6 C24,26 40,40 68,46 Z" fill="#89AE7E" />
            <path d="M56,50 C40,36 20,32 -2,36 C14,50 34,56 56,50 Z" fill="#E79A7C" opacity="0.72" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * H03 — Cohesive Illustrated Botanical Vignettes for all 4 Brainroot Worlds.
 * Shares Hero V4's exact palette, organic contours, and warm upper-left sunlight
 * so none of the 4 destinations appear as flat Unicode-icon boxes.
 */
interface DestinationIllustrationProps {
  readonly variant: EcosystemVariant;
}

export function DestinationIllustration({
  variant,
}: DestinationIllustrationProps) {
  if (variant === 'play') {
    return (
      <svg
        className="world-vignette"
        viewBox="0 0 220 132"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="vig-play-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE7D4" />
            <stop offset="100%" stopColor="#F2C8AE" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="220" height="132" rx="22" fill="url(#vig-play-sky)" />
        {/* Warm sunlit halo */}
        <circle cx="48" cy="34" r="24" fill="#FFF7E6" opacity="0.85" />
        {/* Greenhouse garden arch */}
        <path
          d="M28,112 L28,64 C28,38 52,22 82,22 C112,22 136,38 136,64 L136,112 Z"
          fill="#FFF9EE"
          stroke="#759668"
          strokeWidth="2.5"
        />
        <path d="M82,22 L82,112 M44,68 L120,68" stroke="#A6C6B6" strokeWidth="2" />
        {/* Rolling sage meadow floor */}
        <path
          d="M0,98 C55,82 145,112 220,90 L220,132 L0,132 Z"
          fill="#99BC9B"
        />
        {/* Fact-Act illustrated cards leaning on wooden tabletop */}
        <g transform="translate(114, 42) rotate(-8)">
          <rect x="0" y="0" width="44" height="58" rx="8" fill="#FFFBF2" stroke="#D17B5C" strokeWidth="2.2" />
          <circle cx="22" cy="22" r="10" fill="#E79A7C" opacity="0.85" />
          <path d="M12,41 L32,41 M15,48 L29,48" stroke="#263B31" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g transform="translate(144, 34) rotate(7)">
          <rect x="0" y="0" width="44" height="58" rx="8" fill="#F3F8F1" stroke="#63894C" strokeWidth="2.2" />
          <path d="M22,14 C29,18 30,28 22,33 C14,28 15,18 22,14 Z" fill="#63894C" />
          <path d="M12,42 L32,42 M16,49 L28,49" stroke="#263B31" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        {/* Wooden O An Quan pebbles in foreground */}
        <ellipse cx="78" cy="108" rx="46" ry="12" fill="#C99464" stroke="#8F6039" strokeWidth="2" />
        <circle cx="62" cy="107" r="4.5" fill="#F8F3E9" />
        <circle cx="74" cy="109" r="5" fill="#E79A7C" />
        <circle cx="88" cy="106" r="4.5" fill="#63894C" />
        <circle cx="99" cy="109" r="4" fill="#F5D399" />
      </svg>
    );
  }

  if (variant === 'quest') {
    return (
      <svg
        className="world-vignette"
        viewBox="0 0 220 132"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="vig-quest-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EFF7EC" />
            <stop offset="100%" stopColor="#CBE0D2" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="220" height="132" rx="22" fill="url(#vig-quest-sky)" />
        <circle cx="42" cy="30" r="20" fill="#FFF8E8" opacity="0.9" />
        <path
          d="M0,96 C62,78 134,108 220,84 L220,132 L0,132 Z"
          fill="#8BB08A"
        />
        {/* Reusable bottle & sprout checklist */}
        <g transform="translate(46, 30)">
          <rect x="10" y="14" width="32" height="62" rx="12" fill="#FFFBF2" stroke="#2D563F" strokeWidth="2.2" />
          <rect x="17" y="4" width="18" height="11" rx="4" fill="#E79A7C" stroke="#2D563F" strokeWidth="2" />
          <path d="M26,35 C33,40 33,50 26,55 C19,50 19,40 26,35 Z" fill="#63894C" />
        </g>
        {/* Trail compass badge */}
        <g transform="translate(116, 26)">
          <circle cx="38" cy="38" r="30" fill="#FFF9EE" stroke="#63894C" strokeWidth="2.4" />
          <circle cx="38" cy="38" r="22" fill="none" stroke="#A6C6B6" strokeWidth="1.6" strokeDasharray="4 4" />
          <path d="M38,20 L45,38 L38,56 L31,38 Z" fill="#E79A7C" />
          <path d="M38,20 L45,38 L31,38 Z" fill="#63894C" />
          <circle cx="38" cy="38" r="3.5" fill="#263B31" />
        </g>
        {/* Sprout on meadow */}
        <path d="M104,106 L104,88" stroke="#2D563F" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M104,92 C92,88 88,78 96,75 C103,74 105,83 104,92 Z" fill="#63894C" />
        <path d="M104,94 C115,89 120,80 112,77 C106,76 104,85 104,94 Z" fill="#89AE7E" />
      </svg>
    );
  }

  if (variant === 'learn') {
    return (
      <svg
        className="world-vignette"
        viewBox="0 0 220 132"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="vig-learn-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7E6" />
            <stop offset="100%" stopColor="#F5E5C8" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="220" height="132" rx="22" fill="url(#vig-learn-sky)" />
        <circle cx="176" cy="28" r="20" fill="#FFFDF6" opacity="0.85" />
        <path
          d="M0,102 C74,88 152,110 220,92 L220,132 L0,132 Z"
          fill="#B6CEB5"
        />
        {/* Open botanical field notebook */}
        <g transform="translate(36, 30)">
          <path
            d="M8,16 C34,6 60,8 74,18 L74,78 C58,68 34,66 8,76 Z"
            fill="#FFFDF8"
            stroke="#5F7E57"
            strokeWidth="2.2"
          />
          <path
            d="M140,16 C114,6 88,8 74,18 L74,78 C90,68 114,66 140,76 Z"
            fill="#FFF9EE"
            stroke="#5F7E57"
            strokeWidth="2.2"
          />
          {/* Pressed leaf sketch on left page */}
          <path d="M40,26 C52,32 52,50 40,58 C28,50 28,32 40,26 Z" fill="#A6C6B6" />
          <path d="M40,29 L40,58" stroke="#2D563F" strokeWidth="1.8" />
          {/* Editorial lines on right page */}
          <path d="M88,30 L126,28 M88,42 L124,40 M88,54 L116,52" stroke="#7A8F7C" strokeWidth="2.2" strokeLinecap="round" />
          {/* Peach bookmark ribbon */}
          <path d="M108,12 L108,32 L114,27 L120,32 L120,12 Z" fill="#E79A7C" />
        </g>
      </svg>
    );
  }

  // connect
  return (
    <svg
      className="world-vignette"
      viewBox="0 0 220 132"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="vig-connect-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5F3E2" />
          <stop offset="100%" stopColor="#DAE3CA" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="220" height="132" rx="22" fill="url(#vig-connect-sky)" />
      {/* Garden bunting */}
      <path d="M18,28 Q110,54 202,28" fill="none" stroke="#6F8F64" strokeWidth="2" />
      <polygon points="52,35 64,37 57,49" fill="#E79A7C" />
      <polygon points="90,41 102,42 96,54" fill="#63894C" />
      <polygon points="128,41 140,40 134,53" fill="#E79A7C" />
      <polygon points="166,35 178,33 173,46" fill="#A6C6B6" />
      {/* Meadow */}
      <path
        d="M0,98 C66,84 148,108 220,88 L220,132 L0,132 Z"
        fill="#9BB892"
      />
      {/* Warm wooden community garden bench */}
      <g transform="translate(52, 62)">
        <rect x="6" y="4" width="104" height="12" rx="4" fill="#D5A072" stroke="#7E5231" strokeWidth="2" />
        <rect x="6" y="20" width="104" height="10" rx="4" fill="#DFB086" stroke="#7E5231" strokeWidth="2" />
        <rect x="16" y="30" width="8" height="22" rx="2" fill="#7E5231" />
        <rect x="92" y="30" width="8" height="22" rx="2" fill="#7E5231" />
        {/* Potted plant beside bench */}
        <path d="M122,36 L138,36 L135,52 L125,52 Z" fill="#E79A7C" stroke="#7E5231" strokeWidth="1.8" />
        <path d="M130,36 C122,28 122,20 128,18 C132,20 132,28 130,36 Z" fill="#63894C" />
        <path d="M130,36 C138,27 140,20 134,18 C130,21 130,28 130,36 Z" fill="#84AA77" />
      </g>
    </svg>
  );
}

/**
 * H05 / VIS-010 — 5-Stage Botanical Learning Journey Graphic
 * Interactive stage selector + clear sunlit sapling-to-tree visual progression.
 */
interface GrowthJourneyGraphicProps {
  readonly stages: readonly LearningJourneyStage[];
  readonly activeIndex: number;
  readonly onSelectStage: (index: number) => void;
}

export function GrowthJourneyGraphic({
  stages,
  activeIndex,
  onSelectStage,
}: GrowthJourneyGraphicProps) {
  const activeStage = stages[activeIndex] ?? stages[0];

  return (
    <div className="journey-graphic">
      <div className="journey-graphic__canvas" aria-hidden="true">
        <svg
          className="journey-graphic__svg"
          viewBox="0 0 460 240"
          focusable="false"
        >
          <defs>
            <linearGradient id="jg-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDF6E8" />
              <stop offset="100%" stopColor="#E6EFE2" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="460" height="240" rx="24" fill="url(#jg-bg)" />
          {/* Warm sunlight arc */}
          <circle cx="76" cy="54" r="34" fill="#FCE2C6" opacity="0.72" />
          {/* Rolling soil & meadow */}
          <path
            d="M0,188 C115,166 230,202 345,176 C395,166 430,174 460,180 L460,240 L0,240 Z"
            fill="#A6C6B6"
            opacity="0.58"
          />
          <path
            d="M0,202 C140,184 290,210 460,190 L460,240 L0,240 Z"
            fill="#88AF81"
          />

          {/* Stage 1: Seed */}
          <g
            className={`jg-node${activeIndex >= 0 ? ' is-lit' : ''}`}
            transform="translate(54, 178)"
          >
            <ellipse cx="0" cy="14" rx="14" ry="8" fill="#8C5F3C" opacity="0.35" />
            <path
              d="M0,-2 C9,4 9,15 0,18 C-9,15 -9,4 0,-2 Z"
              fill={activeIndex === 0 ? '#E79A7C' : '#B97B57'}
              stroke="#263B31"
              strokeWidth="1.6"
            />
          </g>

          {/* Stage 2: Sprout */}
          <g
            className={`jg-node${activeIndex >= 1 ? ' is-lit' : ''}`}
            transform="translate(136, 152)"
          >
            <path d="M0,38 L0,10" stroke="#3D6B44" strokeWidth="3" strokeLinecap="round" />
            <path d="M0,16 C-16,12 -18,-2 -6,-4 C2,-3 3,8 0,16 Z" fill="#77A366" />
            <path d="M0,19 C16,14 19,2 8,0 C1,1 0,10 0,19 Z" fill="#9BC08E" />
          </g>

          {/* Stage 3: Understanding (leafy stem + blossom) */}
          <g
            className={`jg-node${activeIndex >= 2 ? ' is-lit' : ''}`}
            transform="translate(226, 114)"
          >
            <path d="M0,78 L0,16" stroke="#36613D" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M0,48 C-22,42 -24,24 -10,22 C0,24 2,38 0,48 Z" fill="#63894C" />
            <path d="M0,36 C22,30 25,14 11,11 C1,13 0,26 0,36 Z" fill="#87AE76" />
            <circle cx="0" cy="12" r="9" fill="#E79A7C" stroke="#FFF8EE" strokeWidth="2" />
          </g>

          {/* Stage 4: Action (strong sapling canopy) */}
          <g
            className={`jg-node${activeIndex >= 3 ? ' is-lit' : ''}`}
            transform="translate(316, 86)"
          >
            <path d="M0,106 L0,36" stroke="#6E4E33" strokeWidth="5" strokeLinecap="round" />
            <circle cx="-18" cy="40" r="20" fill="#7EA670" />
            <circle cx="18" cy="42" r="19" fill="#96BA8A" />
            <circle cx="0" cy="24" r="24" fill="#63894C" />
            <circle cx="12" cy="26" r="5" fill="#F2B89B" />
            <circle cx="-10" cy="36" r="4.5" fill="#FFF7E6" />
          </g>

          {/* Stage 5: Connect (full thriving canopy + roots/community sparkles) */}
          <g
            className={`jg-node${activeIndex >= 4 ? ' is-lit' : ''}`}
            transform="translate(402, 58)"
          >
            <path d="M0,134 L0,46" stroke="#6E4E33" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M0,84 L-16,66 M0,74 L16,58" stroke="#6E4E33" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-22" cy="54" r="24" fill="#81A873" />
            <circle cx="22" cy="54" r="23" fill="#9AC091" />
            <circle cx="0" cy="30" r="30" fill="#63894C" />
            <circle cx="-12" cy="32" r="6" fill="#E79A7C" />
            <circle cx="15" cy="40" r="5.5" fill="#F8D2B8" />
            <circle cx="3" cy="16" r="5" fill="#FFF8E8" />
          </g>

          {/* Active marker halo beneath current stage */}
          <circle
            cx={[54, 136, 226, 316, 402][activeIndex] ?? 54}
            cy="214"
            r="8"
            fill="#E79A7C"
            stroke="#FFFBF2"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      <div
        className="journey-graphic__tabs"
        role="tablist"
        aria-label="5 bước hành trình học kỹ năng xanh Brainroot"
      >
        {stages.map((stage, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`journey-step-btn${isSelected ? ' is-active' : ''}`}
              onClick={() => onSelectStage(index)}
            >
              <span className="journey-step-btn__num">{stage.stepNumber}</span>
              <span className="journey-step-btn__label">{stage.label}</span>
            </button>
          );
        })}
      </div>

      <div className="journey-graphic__detail" role="tabpanel" aria-live="polite">
        <p className="journey-graphic__detail-eyebrow">
          Bước {activeStage.stepNumber} · {activeStage.label}
        </p>
        <h3 className="journey-graphic__detail-title">{activeStage.title}</h3>
        <p className="journey-graphic__detail-summary">{activeStage.summary}</p>
      </div>
    </div>
  );
}

interface LearningProgressProps {
  readonly current: number;
  readonly total: number;
  readonly label: string;
}

export function LearningProgress({
  current,
  total,
  label,
}: LearningProgressProps) {
  const safeTotal = Math.max(1, total);
  const clamped = Math.min(safeTotal, Math.max(0, current));
  const percent = Math.round((clamped / safeTotal) * 100);

  return (
    <div className="learning-progress">
      <div className="learning-progress__meta">
        <span className="learning-progress__label">{label}</span>
        <span className="learning-progress__count">
          {clamped}/{safeTotal}
        </span>
      </div>
      <div
        className="learning-progress__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label={label}
      >
        <div
          className="learning-progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
