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
  ...smallXs.slice().reverse().map((x, i) => ({
    id: `bottom-${5 - i}`, label: `Ô dân hàng dưới số ${5 - i}`,
    x, z: 1.04, rx: 0.63, rz: 0.69, isQuan: false,
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
