import type { RingIndex } from '../engine';

/**
 * Lớp nội dung (không phải luật). Gán chủ đề cho ô theo giá trị tạm của mockup G0.5:
 * T1→T5 = chủ đề 1→5, D5→D1 = chủ đề 1→5 (R1 chưa chốt — chỉ dùng cho bản chơi thử).
 */
export type DanTheme = 'green' | 'energy' | 'waste' | 'water' | 'consume';
export type QuanTheme = 'climate' | 'biodiversity';
export type Theme = DanTheme | QuanTheme;

export interface ThemeInfo {
  readonly id: Theme;
  readonly name: string;
  readonly short: string;
  readonly fullName: string;
}

export const THEMES: Readonly<Record<Theme, ThemeInfo>> = {
  green: { id: 'green', name: 'Không gian xanh', short: 'Xanh', fullName: 'Không gian xanh' },
  energy: { id: 'energy', name: 'Năng lượng', short: 'Năng lượng', fullName: 'Năng lượng' },
  waste: { id: 'waste', name: 'Rác thải', short: 'Rác thải', fullName: 'Rác thải' },
  water: { id: 'water', name: 'Nước', short: 'Nước', fullName: 'Nước' },
  consume: { id: 'consume', name: 'Tiêu dùng', short: 'Tiêu dùng', fullName: 'Tiêu dùng' },
  climate: {
    id: 'climate', name: 'Biến đổi khí hậu', short: 'Khí hậu',
    fullName: 'Biến đổi khí hậu & Chuyển đổi sinh thái',
  },
  biodiversity: {
    id: 'biodiversity', name: 'Đa dạng sinh học', short: 'Đa dạng',
    fullName: 'Bảo tồn đa dạng sinh học & Rừng nguyên sinh',
  },
};

const DAN_ORDER: readonly DanTheme[] = ['green', 'energy', 'waste', 'water', 'consume'];

export function themeOfRing(ring: RingIndex): Theme {
  if (ring === 0) return 'climate';
  if (ring === 6) return 'biodiversity';
  if (ring <= 5) return DAN_ORDER[ring - 1];
  return DAN_ORDER[ring - 7];
}
