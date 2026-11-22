/**
 * /about V4.3 — "Lướt qua → Giữ lại → Khám phá sâu" timeline (BR-T031).
 *
 * Every visual value is a pure function of scroll progress p ∈ [0, 1] and the stage size,
 * so scrolling back plays exactly the same frames in reverse and nothing can jump.
 * The React component only measures, calls computeStoryFrame() inside requestAnimationFrame
 * and writes the returned strings to the DOM.
 */

export type StoryStep = 1 | 2 | 3;

/** Scroll anchors the step buttons jump to (fraction of the sticky track). */
export const STEP_ANCHORS: Readonly<Record<StoryStep, number>> = { 1: 0.1, 2: 0.48, 3: 0.97 };

/** Background fragments: x/y as fractions of the stage, depth layer z (0 far → 2 near), tilt, crop of the feed art. */
export interface FragmentSeed {
  readonly bx: number;
  readonly by: number;
  readonly z: 0 | 1 | 2;
  readonly r: number;
  readonly crop: string;
}

export const FRAGMENTS: readonly FragmentSeed[] = [
  { bx: 0.16, by: 0.3, z: 0, r: -8, crop: '8% 20%' },
  { bx: 0.82, by: 0.12, z: 0, r: 7, crop: '70% 15%' },
  { bx: 0.52, by: 0.62, z: 0, r: -5, crop: '40% 30%' },
  { bx: 0.24, by: 0.86, z: 1, r: 9, crop: '88% 55%' },
  { bx: 0.78, by: 0.56, z: 1, r: -11, crop: '25% 75%' },
  { bx: 0.46, by: 0.18, z: 1, r: 5, crop: '60% 80%' },
  { bx: 0.14, by: 0.58, z: 2, r: -6, crop: '92% 85%' },
  { bx: 0.86, by: 0.92, z: 2, r: 10, crop: '35% 40%' },
];

/** The fragment that gets kept rises from the lower middle; it never wraps before it is caught. */
const TARGET = { bx: 0.5, by: 0.92, r: -6, v: 0.62 };
const LAYER_SCALE = [0.78, 1, 1.16] as const;
const LAYER_SPEED = [0.35, 0.55, 0.8] as const;
/** Far layers are dimmer so the kept fragment reads first (desktop contrast tweak). */
const LAYER_OPACITY = [0.38, 0.66, 0.92] as const;
const PERSPECTIVE = 1200;

export interface StoryGeometry {
  readonly width: number;
  readonly height: number;
  readonly narrow: boolean;
  /** journal page width / height */
  readonly pw: number;
  readonly ph: number;
  /** paper margin, image box size */
  readonly m: number;
  readonly iw: number;
  readonly ih: number;
  /** background fragment width */
  readonly fw: number;
}

export function storyGeometry(width: number, height: number): StoryGeometry {
  const narrow = width < 520;
  // Mobile: the open journal spans nearly the whole stage width (bigger spread, less empty stage).
  const pw = Math.min(width * (narrow ? 0.495 : 0.44), 330);
  const m = pw * 0.065;
  const iw = pw - 2 * m;
  const ih = (iw * 2) / 3;
  const ph = m * 1.6 + ih + pw * 0.2;
  const fw = width * (narrow ? 0.3 : 0.22);
  return { width, height, narrow, pw, ph, m, iw, ih, fw };
}

export const clamp = (v: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, v));
const seg = (p: number, a: number, b: number): number => clamp((p - a) / (b - a));
const ease = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const f1 = (n: number): string => n.toFixed(1);

export function stepFromProgress(p: number): StoryStep {
  return p < 0.3 ? 1 : p < 0.62 ? 2 : 3;
}

/** Reduced motion: three still frames instead of a scrubbed transition. */
export function quantizeProgress(p: number): number {
  const step = stepFromProgress(p);
  return step === 1 ? STEP_ANCHORS[1] : step === 2 ? 0.5 : 1;
}

export interface FragmentFrame {
  readonly transform: string;
  readonly opacity: string;
}

export interface StoryFrame {
  readonly step: StoryStep;
  readonly fragments: readonly FragmentFrame[];
  readonly keep: string;
  readonly frame: string;
  readonly frameOpacity: string;
  readonly revealClip: string;
  readonly outlineClip: string;
  readonly outlineOpacity: string;
  readonly leaf: string;
  readonly leafOpacity: string;
  readonly tapeOpacity: string;
  readonly tapeLeft: string;
  readonly tapeRight: string;
  readonly captionClip: string;
  readonly glowOpacity: string;
}

/** Vertical drift with wrap-around; the wrap happens inside the stage's faded top/bottom edge. */
function feedY(by: number, speed: number, p: number, h: number, height: number): number {
  const span = height + h * 2;
  return ((((by * height - p * speed * height + h) % span) + span) % span) - h;
}

export function computeStoryFrame(p: number, g: StoryGeometry): StoryFrame {
  const { width: W, height: H, pw, ph, m, iw, ih, fw, narrow } = g;
  const b = ease(seg(p, 0.26, 0.55)); // catch: one fragment comes forward
  const c = ease(seg(p, 0.55, 0.86)); // it becomes a journal page
  const w = ease(seg(p, 0.6, 0.84)); // colour spreads inside the page
  const L = ease(seg(p, 0.62, 0.9)); // the facing page swings open
  const d = seg(p, 0.82, 0.96); // tape + handwriting

  const fragments = FRAGMENTS.map((f): FragmentFrame => {
    const s = LAYER_SCALE[f.z];
    const h = fw * 0.6667 * s;
    const x = f.bx * W + Math.sign(f.bx - 0.5) * 80 * b;
    const y = feedY(f.by, LAYER_SPEED[f.z], p, h, H);
    // Pushing the feed back is a 2D projection of a translateZ under a 1200px perspective:
    // same look, but no 3D compositing on eight moving layers (much cheaper without a GPU).
    const k = PERSPECTIVE / (PERSPECTIVE + 240 * b + 220 * c);
    const px2 = W / 2 + (x - W / 2) * k;
    const py2 = H / 2 + (y - H / 2) * k;
    return {
      transform: `translate(${f1(px2 - fw / 2)}px, ${f1(py2 - fw / 3)}px) rotate(${f.r}deg) scale(${(s * k).toFixed(4)})`,
      opacity: (LAYER_OPACITY[f.z] * (1 - 0.68 * b) * (1 - 0.6 * c)).toFixed(3),
    };
  });

  const s0 = fw / iw;
  const s1 = Math.min(narrow ? 1.18 : 1.12, (W * (narrow ? 0.7 : 0.46)) / iw);
  const fx = TARGET.bx * W;
  const fy = TARGET.by * H - p * TARGET.v * H;
  const px = lerp(lerp(fx, W / 2, b), W / 2 + pw / 2, c);
  const py = lerp(lerp(fy, H / 2, b), H / 2, c);
  const sc = lerp(lerp(s0, s1, b), 1, c);
  const rot = lerp(lerp(TARGET.r, -3, b), -1.2, c);
  const imgDy = m + ih / 2 - ph / 2; // image centre relative to page centre
  const anchor = lerp(imgDy, 0, c); // follow the image first, the whole page at the end

  return {
    step: stepFromProgress(p),
    fragments,
    keep: `translate3d(${f1(px - pw / 2)}px, ${f1(py - ph / 2 - anchor * sc)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`,
    frame: `translate(${(m * (1 - c)).toFixed(2)}px, ${(m * (1 - c)).toFixed(2)}px) scale(${lerp(iw / pw, 1, c).toFixed(4)}, ${lerp(ih / ph, 1, c).toFixed(4)})`,
    frameOpacity: clamp(c * 4).toFixed(3),
    revealClip: `circle(${f1(w * 80)}% at 50% 58%)`,
    outlineClip: `inset(0 ${f1((1 - b) * 100)}% 0 0 round 12px)`,
    outlineOpacity: (b > 0 ? 1 - c : 0).toFixed(3),
    leaf: `rotateY(${f1(180 * (1 - L))}deg)`,
    leafOpacity: L > 0.001 ? '1' : '0',
    tapeOpacity: d.toFixed(3),
    tapeLeft: `translateY(${f1(-12 * (1 - d))}px) rotate(-12deg)`,
    tapeRight: `translateY(${f1(-12 * (1 - d))}px) rotate(10deg)`,
    captionClip: `inset(0 ${f1((1 - d) * 100)}% 0 0)`,
    glowOpacity: (0.2 + 0.7 * c).toFixed(3),
  };
}
