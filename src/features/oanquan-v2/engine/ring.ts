/**
 * Vòng ô chuẩn (G0.5, bất biến):
 *   0 = Quan Trái (Quan A) · 1..5 = Ô Dân hàng trên T1..T5 (trái → phải, Người chơi 2)
 *   6 = Quan Phải (Quan B) · 7..11 = Ô Dân hàng dưới D5..D1 (phải → trái, Người chơi 1)
 * Chiều kim đồng hồ = ringIndex tăng (mod 12).
 */
export type RingIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type PlayerId = 'P1' | 'P2';
export type Direction = 'cw' | 'ccw';

export const RING_SIZE = 12;
export const QUAN_PITS: readonly RingIndex[] = [0, 6];
export const ROW_P1: readonly RingIndex[] = [7, 8, 9, 10, 11];
export const ROW_P2: readonly RingIndex[] = [1, 2, 3, 4, 5];

export function isQuanPit(ring: number): boolean {
  return ring === 0 || ring === 6;
}

export function step(ring: number, dir: Direction): RingIndex {
  const d = dir === 'cw' ? 1 : -1;
  return (((ring + d) % RING_SIZE) + RING_SIZE) % RING_SIZE as RingIndex;
}

export function rowOf(player: PlayerId): readonly RingIndex[] {
  return player === 'P1' ? ROW_P1 : ROW_P2;
}

/** Người sở hữu hàng chứa ô; null với Ô Quan. */
export function ownerOf(ring: number): PlayerId | null {
  if (ring >= 1 && ring <= 5) return 'P2';
  if (ring >= 7 && ring <= 11) return 'P1';
  return null;
}

export function other(player: PlayerId): PlayerId {
  return player === 'P1' ? 'P2' : 'P1';
}

/** Chỉ số Quan trong mảng quanOnBoard: 0 → ring 0, 1 → ring 6. */
export function quanSlot(ring: number): 0 | 1 {
  return ring === 0 ? 0 : 1;
}

/** Tên ô hiển thị: Quan Trái/Phải, T1..T5, D1..D5. */
export function pitLabel(ring: number): string {
  if (ring === 0) return 'Quan Trái';
  if (ring === 6) return 'Quan Phải';
  if (ring >= 1 && ring <= 5) return `T${ring}`;
  return `D${12 - ring}`;
}
