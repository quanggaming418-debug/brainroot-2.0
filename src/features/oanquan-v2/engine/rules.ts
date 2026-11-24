/**
 * RulesConfig — mọi luật engine đọc đều nằm ở đây, truyền tường minh vào createGame().
 * Engine không có giá trị luật mặc định ngầm. Biến thể chưa được cài đặt bị từ chối
 * (validateRules) thay vì âm thầm chạy theo một luật khác.
 */
export interface RulesConfig {
  readonly id: string;
  readonly label: string;
  /** Luôn false cho tới khi có luật chính thức của dự án. */
  readonly official: false;
  readonly setup: {
    readonly danSeedsPerDanPit: number;
    readonly danSeedsPerQuanPit: number;
  };
  readonly scoring: {
    readonly danSeedValue: number;
    readonly quanPieceValue: number;
  };
  readonly move: {
    /** Chỉ chọn Ô Dân có hạt thuộc hàng người đang đi. */
    readonly selectablePits: 'ownRowWithSeeds';
    /** Chọn chiều rải ở mỗi lượt. */
    readonly direction: 'choosePerTurn';
  };
  readonly sowing: {
    /** Rải đủ 12 vị trí: Ô Quan nhận một hạt Dân khi rải đi qua. */
    readonly quanPits: 'receiveSeeds';
    /** Ô Dân ngay sau hạt cuối có hạt → bốc hết và rải tiếp cùng chiều (lặp được). */
    readonly relay: 'nextDanPitWithSeeds';
    /** Không bao giờ bốc Ô Quan để rải. */
    readonly pickFromQuanPits: false;
    /** Chốt an toàn: số hạt thả tối đa trong một lượt, vượt quá thì dừng lượt (không ăn). */
    readonly maxDropsPerTurn: number;
  };
  readonly stop: {
    /** Ô ngay sau hạt cuối là Ô Quan còn quân hoặc còn hạt → hết lượt. */
    readonly occupiedQuanAfterLast: 'endTurn';
    /** Hai ô trống liên tiếp → hết lượt, không ăn. */
    readonly twoEmpty: 'endTurn';
  };
  readonly capture: {
    /** Ô trống (Ô Dân trống hoặc Ô Quan trống hẳn) rồi tới ô có quân → cơ hội ăn. */
    readonly pattern: 'emptyThenOccupied';
    /** Sau khi ăn, nếu lại gặp ô trống rồi ô có quân → cơ hội ăn tiếp (ăn liên hoàn). */
    readonly chain: true;
    /** Được ăn ô ở bất kỳ hàng nào. */
    readonly targetRows: 'any';
    /** Số hạt Dân tối thiểu trong Ô còn quân Quan để được ăn (0 = luật Cơ bản, không có ngưỡng). */
    readonly quanMinDanSeeds: number;
  };
  readonly challenge: {
    /** Ô Dân có 1..danLevel1MaxSeeds hạt → Cấp 1; nhiều hơn → danLevelAbove. */
    readonly danLevel1MaxSeeds: number;
    readonly danLevelAbove: 2;
    readonly quanLevel: 3;
  };
  readonly referee: {
    /** Đạt → thu hoạch và xét tiếp chuỗi; Chưa đạt → giữ ô, kết thúc chuỗi và lượt. */
    readonly passContinuesChain: true;
    readonly failEndsTurn: true;
  };
  readonly emptyRow: {
    readonly restockSeedsPerPit: number;
    readonly borrowFromOpponent: true;
    readonly endGameIfInsufficient: true;
  };
  readonly endGame: {
    /** Kết thúc khi cả hai quân Quan đã được thu hoạch. */
    readonly whenAllQuanHarvested: true;
    readonly remainingRowSeedsToRowOwner: true;
    readonly unharvestedQuanScoresNobody: true;
    /** Hạt Dân còn trong hai Ô Quan lúc kết thúc không tính cho ai. */
    readonly danLeftInQuanPits: 'scoresNobody';
    readonly tie: 'draw';
  };
}

/**
 * PLAYTEST V1 — Product Owner duyệt ngày 23/11/2026 (BR-T035), thay PLAYTEST V0.
 * Rải và ăn theo bộ luật Cơ bản truyền thống (rải qua Ô Quan, rải tiếp, ăn liên hoàn);
 * giữ cơ chế thẻ + Trọng tài của Brainroot và các luật V0 còn lại (bù hàng bằng mượn, điểm, kết thúc).
 * KHÔNG phải luật chính thức của dự án.
 */
export const PLAYTEST_V1: RulesConfig = {
  id: 'PLAYTEST_V1',
  label: 'Luật bản thử PLAYTEST V1',
  official: false,
  setup: { danSeedsPerDanPit: 5, danSeedsPerQuanPit: 0 },
  scoring: { danSeedValue: 1, quanPieceValue: 10 },
  move: { selectablePits: 'ownRowWithSeeds', direction: 'choosePerTurn' },
  sowing: { quanPits: 'receiveSeeds', relay: 'nextDanPitWithSeeds', pickFromQuanPits: false, maxDropsPerTurn: 600 },
  stop: { occupiedQuanAfterLast: 'endTurn', twoEmpty: 'endTurn' },
  capture: { pattern: 'emptyThenOccupied', chain: true, targetRows: 'any', quanMinDanSeeds: 0 },
  challenge: { danLevel1MaxSeeds: 3, danLevelAbove: 2, quanLevel: 3 },
  referee: { passContinuesChain: true, failEndsTurn: true },
  emptyRow: { restockSeedsPerPit: 1, borrowFromOpponent: true, endGameIfInsufficient: true },
  endGame: {
    whenAllQuanHarvested: true,
    remainingRowSeedsToRowOwner: true,
    unharvestedQuanScoresNobody: true,
    danLeftInQuanPits: 'scoresNobody',
    tie: 'draw',
  },
};

function isNonNegInt(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0;
}

/** Ném lỗi nếu cấu hình thiếu trường hoặc dùng biến thể engine chưa hỗ trợ. */
export function validateRules(rules: RulesConfig): void {
  const fail = (msg: string): never => {
    throw new Error(`RulesConfig không hợp lệ: ${msg}`);
  };
  if (!rules || typeof rules !== 'object') fail('thiếu cấu hình');
  if (!rules.id) fail('thiếu id');
  if (rules.official !== false) fail('engine chỉ chạy cấu hình thử nghiệm (official: false)');
  if (!isNonNegInt(rules.setup?.danSeedsPerDanPit) || rules.setup.danSeedsPerDanPit < 1) fail('setup.danSeedsPerDanPit');
  if (rules.setup.danSeedsPerQuanPit !== 0) fail('setup.danSeedsPerQuanPit khác 0 chưa được hỗ trợ');
  if (!isNonNegInt(rules.scoring?.danSeedValue)) fail('scoring.danSeedValue');
  if (!isNonNegInt(rules.scoring?.quanPieceValue)) fail('scoring.quanPieceValue');
  if (rules.move?.selectablePits !== 'ownRowWithSeeds') fail('move.selectablePits chưa được hỗ trợ');
  if (rules.move?.direction !== 'choosePerTurn') fail('move.direction chưa được hỗ trợ');
  const s = rules.sowing;
  if (s?.quanPits !== 'receiveSeeds') fail('sowing.quanPits chưa được hỗ trợ');
  if (s?.relay !== 'nextDanPitWithSeeds') fail('sowing.relay chưa được hỗ trợ');
  if (s?.pickFromQuanPits !== false) fail('sowing.pickFromQuanPits=true chưa được hỗ trợ');
  if (!isNonNegInt(s?.maxDropsPerTurn) || s.maxDropsPerTurn < 12) fail('sowing.maxDropsPerTurn');
  if (rules.stop?.occupiedQuanAfterLast !== 'endTurn' || rules.stop?.twoEmpty !== 'endTurn') fail('stop chưa được hỗ trợ');
  const c = rules.capture;
  if (c?.pattern !== 'emptyThenOccupied') fail('capture.pattern chưa được hỗ trợ');
  if (c?.chain !== true) fail('capture.chain=false chưa được hỗ trợ');
  if (c?.targetRows !== 'any') fail('capture.targetRows chưa được hỗ trợ');
  if (c?.quanMinDanSeeds !== 0) fail('capture.quanMinDanSeeds khác 0 (Quan Già) chưa được hỗ trợ');
  if (!isNonNegInt(rules.challenge?.danLevel1MaxSeeds) || rules.challenge.danLevel1MaxSeeds < 1) fail('challenge.danLevel1MaxSeeds');
  if (rules.challenge?.danLevelAbove !== 2 || rules.challenge?.quanLevel !== 3) fail('challenge levels');
  if (rules.referee?.passContinuesChain !== true || rules.referee?.failEndsTurn !== true) fail('referee chưa được hỗ trợ');
  if (!isNonNegInt(rules.emptyRow?.restockSeedsPerPit) || rules.emptyRow.restockSeedsPerPit < 1) fail('emptyRow.restockSeedsPerPit');
  if (rules.emptyRow?.borrowFromOpponent !== true || rules.emptyRow?.endGameIfInsufficient !== true) fail('emptyRow chưa được hỗ trợ');
  const e = rules.endGame;
  if (!e || e.whenAllQuanHarvested !== true || e.remainingRowSeedsToRowOwner !== true ||
      e.unharvestedQuanScoresNobody !== true || e.danLeftInQuanPits !== 'scoresNobody' || e.tie !== 'draw') {
    fail('endGame chưa được hỗ trợ');
  }
}
