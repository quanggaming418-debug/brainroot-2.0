/**
 * ArtPack V3 (23/11/2026) — chỉ dùng cho bản xem trước dev-only.
 * Các file nằm trong `src/features/oanquan-v2/assets/` và chỉ được import từ cây V2,
 * nên không có mặt trong bản build production (xem ADR-0006, điều kiện 3).
 *
 * Linh vật: hai master `public/assets/hero-v4/{brainie,rootie}.webp` là nguồn nhận diện
 * chính thức (ArtPack V3 kèm đúng hai file này, khớp từng byte với file đã có trong repo).
 * Các pose khác là PNG tách nền từ bảng biểu cảm đã được Product Owner duyệt.
 */
import { publicUrl } from '../../../utils/publicUrl';
import type { Theme } from '../content/themes';

import boardBase from '../assets/board/board_base_no_pits.svg';
import gardenDesktop from '../assets/backgrounds/garden_desktop_1600x900.webp';
import gardenMobile from '../assets/backgrounds/garden_mobile_750x1334.webp';

import dropRing from '../assets/fx/drop_ring.svg';
import harvestSparkle from '../assets/fx/harvest_sparkle.svg';
import captureRing from '../assets/fx/valid_capture_ring.svg';
import victoryWreath from '../assets/fx/victory_wreath.svg';
import leafCorner from '../assets/fx/foreground_leaf_corner.svg';
import basket from '../assets/tokens/conservation_basket_empty.svg';
import card1 from '../assets/cards/level_1_recognition_blank.svg';
import card2 from '../assets/cards/level_2_decision_blank.svg';
import card3 from '../assets/cards/level_3_problem_solving_blank.svg';

import iconGreen from '../assets/topics/01_green_space.svg';
import iconEnergy from '../assets/topics/02_energy.svg';
import iconWaste from '../assets/topics/03_waste.svg';
import iconWater from '../assets/topics/04_water.svg';
import iconConsume from '../assets/topics/05_consume.svg';

import handReach from '../assets/hand/01_reach.png';
import handPick from '../assets/hand/02_pick_up.png';
import handCarry from '../assets/hand/03_carry.png';
import handDrop from '../assets/hand/04_drop.png';
import handRetract from '../assets/hand/05_retract.png';

import brainieHappy from '../assets/mascots/brainie_02_happy.png';
import brainieThinking from '../assets/mascots/brainie_03_thinking.png';
import brainieGuide from '../assets/mascots/brainie_04_guide.png';
import brainieCheer from '../assets/mascots/brainie_05_cheer.png';
import brainieWin from '../assets/mascots/brainie_06_win.png';
import rootieHappy from '../assets/mascots/rootie_02_happy.png';
import rootieThinking from '../assets/mascots/rootie_03_thinking.png';
import rootieGuide from '../assets/mascots/rootie_04_guide.png';
import rootieCheer from '../assets/mascots/rootie_05_cheer.png';
import rootieWin from '../assets/mascots/rootie_06_win.png';

export const BOARD_BASE = boardBase;
export const FX = {
  dropRing,
  harvestSparkle,
  captureRing,
  victoryWreath,
  leafCorner,
} as const;
export const BASKET = basket;
/** Khung thẻ trống theo cấp (nội dung vẫn là HTML). */
export const CARD_FRAME: Record<1 | 2 | 3, string> = { 1: card1, 2: card2, 3: card3 };
export const GARDEN_DESKTOP = gardenDesktop;
export const GARDEN_MOBILE = gardenMobile;

/** Icon 5 chủ đề Dân. Hai Ô Quan dùng linh vật, không dùng icon tròn này. */
export const TOPIC_ICON: Partial<Record<Theme, string>> = {
  green: iconGreen,
  energy: iconEnergy,
  waste: iconWaste,
  water: iconWater,
  consume: iconConsume,
};

export type HandPose = 'reach' | 'pick' | 'carry' | 'drop' | 'retract';
export const HAND: Record<HandPose, string> = {
  reach: handReach,
  pick: handPick,
  carry: handCarry,
  drop: handDrop,
  retract: handRetract,
};

export type MascotId = 'brainie' | 'rootie';
/** 'idle' lấy thẳng từ master gốc trong `public/`; các pose khác từ bảng đã duyệt. */
export type MascotPose = 'idle' | 'happy' | 'thinking' | 'guide' | 'cheer' | 'win';

const MASCOT_POSES: Record<MascotId, Record<MascotPose, string>> = {
  brainie: {
    idle: publicUrl('/assets/hero-v4/brainie.webp'),
    happy: brainieHappy,
    thinking: brainieThinking,
    guide: brainieGuide,
    cheer: brainieCheer,
    win: brainieWin,
  },
  rootie: {
    idle: publicUrl('/assets/hero-v4/rootie.webp'),
    happy: rootieHappy,
    thinking: rootieThinking,
    guide: rootieGuide,
    cheer: rootieCheer,
    win: rootieWin,
  },
};

export function mascotSrc(who: MascotId, pose: MascotPose): string {
  return MASCOT_POSES[who][pose];
}

/** Hai Ô Quan theo chủ đề: Biến đổi khí hậu ↔ Brainie, Đa dạng sinh học ↔ Rootie. */
export const QUAN_MASCOT: Record<'climate' | 'biodiversity', MascotId> = {
  climate: 'brainie',
  biodiversity: 'rootie',
};
