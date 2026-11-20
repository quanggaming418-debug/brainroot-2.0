/**
 * BR-T023 Slice A: presentation-only pit coordinates and reversible sandbox
 * manipulation. NOT official Ô ăn quan rules (OQ-08 is still open).
 */
export type PitDefinition = Readonly<{
  id: string;
  label: string;
  x: number;
  z: number;
  rx: number;
  rz: number;
  isQuan: boolean;
}>;

const smallXs = [-3.25, -1.62, 0, 1.62, 3.25];

export const PITS: readonly PitDefinition[] = [
  { id: 'quan-left', label: 'Ô quan bên trái', x: -4.55, z: 0, rx: 0.64, rz: 1.03, isQuan: true },
  ...smallXs.map((x, i) => ({
    id: `top-${i + 1}`, label: `Ô dân hàng trên số ${i + 1}`,
    x, z: -1.04, rx: 0.63, rz: 0.69, isQuan: false,
  })),
  { id: 'quan-right', label: 'Ô quan bên phải', x: 4.55, z: 0, rx: 0.64, rz: 1.03, isQuan: true },
  ...smallXs.map((_x, i) => ({
    id: `bottom-${5 - i}`, label: `Ô dân hàng dưới số ${5 - i}`,
    x: smallXs[4 - i], z: 1.04, rx: 0.63, rz: 0.69, isQuan: false,
  })),
];

export const INITIAL_SANDBOX_COUNTS: readonly number[] =
  PITS.map((pit) => (pit.isQuan ? 1 : 4));

export function sandboxMoveOneSeed(
  counts: readonly number[],
  pitIndex: number,
): readonly number[] {
  if (!Number.isInteger(pitIndex) || pitIndex < 0 || pitIndex >= PITS.length ||
      counts.length !== PITS.length || counts[pitIndex] <= 0) return counts;
  const next = [...counts];
  next[pitIndex] -= 1;
  next[(pitIndex + 1) % PITS.length] += 1;
  return next;
}

export function pitDisplayLabel(pit: PitDefinition, count: number) {
  return `${pit.label}: ${count} hạt minh họa`;
}

/**
 * Clean ruleset boundary so future approved digital rules (once OQ-08 is resolved)
 * can plug into the 3D tabletop without rewriting rendering or accessibility layers.
 */
export interface OAnQuanRulesetMoveResult {
  readonly counts: readonly number[];
  readonly fromPitIndex: number;
  readonly toPitIndex: number;
  readonly moved: boolean;
  readonly summary: string;
}

export interface OAnQuanRuleset {
  readonly id: string;
  readonly name: string;
  readonly isOfficialRuleset: boolean;
  readonly initialCounts: readonly number[];
  readonly canActOnPit: (counts: readonly number[], pitIndex: number) => boolean;
  readonly applyAction: (
    counts: readonly number[],
    pitIndex: number,
  ) => OAnQuanRulesetMoveResult;
}

export const SANDBOX_RULESET: OAnQuanRuleset = {
  id: 'internal-sandbox-demo',
  name: 'Chế độ thử nghiệm bàn 3D (chưa phải luật chính thức — OQ-08 đang mở)',
  isOfficialRuleset: false,
  initialCounts: INITIAL_SANDBOX_COUNTS,
  canActOnPit: (counts, pitIndex) =>
    Number.isInteger(pitIndex) &&
    pitIndex >= 0 &&
    pitIndex < PITS.length &&
    counts.length === PITS.length &&
    counts[pitIndex] > 0,
  applyAction: (counts, pitIndex) => {
    const nextCounts = sandboxMoveOneSeed(counts, pitIndex);
    const moved = nextCounts !== counts;
    const toPitIndex = moved ? (pitIndex + 1) % PITS.length : pitIndex;
    return {
      counts: nextCounts,
      fromPitIndex: pitIndex,
      toPitIndex,
      moved,
      summary: moved
        ? `Đã chuyển thử 1 hạt minh họa từ ${PITS[pitIndex].label} sang ${PITS[toPitIndex].label}.`
        : `${PITS[pitIndex]?.label ?? 'Ô đã chọn'} hiện chưa có hạt để chuyển thử.`,
    };
  },
};

