/**
 * RulesConfig — mọi luật engine đọc đều nằm ở đây, truyền tường minh vào createGame().
 * Engine không có giá trị luật mặc định ngầm. Biến thể chưa được cài đặt sẽ bị từ chối
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
    /** Bỏ qua hai Ô Quan khi rải (không thả, không bốc). */
    readonly skipQuanPits: true;
    /** Đi đủ vòng thì ô xuất phát cũng nhận hạt. */
    readonly originReceivesOnLap: true;
    /** Không bốc rải tiếp trong cùng lượt. */
    readonly relaySowing: false;
  };
  readonly capture: {
    /** Ô ngay sau hạt cuối (trên vòng 12 ô, có Ô Quan) phải là Ô Dân trống. */
    readonly gap: 'emptyDanPitOnly';
    /** Số cơ hội ăn tối đa mỗi lượt. */
    readonly maxPerTurn: 1;
    /** Được ăn Ô Dân ở bất kỳ hàng nào. */
    readonly targetRows: 'any';
    /** Số hạt Dân tối thiểu trong Ô Quan để được ăn Ô Quan (0 = không có ngưỡng). */
    readonly quanMinDanSeeds: number;
  };
  readonly challenge: {
    /** Ô Dân có 1..danLevel1MaxSeeds hạt → Cấp 1; nhiều hơn → danLevelAbove. */
    readonly danLevel1MaxSeeds: number;
    readonly danLevelAbove: 2;
    readonly quanLevel: 3;
  };
  readonly emptyRow: {
    /** Số hạt đặt lại vào mỗi Ô Dân của hàng trống. */
    readonly restockSeedsPerPit: number;
    readonly borrowFromOpponent: true;
    readonly endGameIfInsufficient: true;
  };
  readonly endGame: {
    readonly whenAllQuanHarvested: true;
    readonly remainingRowSeedsToRowOwner: true;
    readonly unharvestedQuanScoresNobody: true;
    readonly tie: 'draw';
  };
}

/**
 * PLAYTEST V0 — cấu hình thử nghiệm do Product Owner phê duyệt ngày 23/11/2026
 * để dựng bản chơi thử. KHÔNG phải luật chính thức của dự án (Rules Matrix V1.3 vẫn mở).
 */
export const PLAYTEST_V0: RulesConfig = {
  id: 'PLAYTEST_V0',
  label: 'Luật bản thử PLAYTEST V0',
  official: false,
  setup: { danSeedsPerDanPit: 5, danSeedsPerQuanPit: 0 },
  scoring: { danSeedValue: 1, quanPieceValue: 10 },
  move: { selectablePits: 'ownRowWithSeeds', direction: 'choosePerTurn' },
  sowing: { skipQuanPits: true, originReceivesOnLap: true, relaySowing: false },
  capture: { gap: 'emptyDanPitOnly', maxPerTurn: 1, targetRows: 'any', quanMinDanSeeds: 0 },
  challenge: { danLevel1MaxSeeds: 3, danLevelAbove: 2, quanLevel: 3 },
  emptyRow: { restockSeedsPerPit: 1, borrowFromOpponent: true, endGameIfInsufficient: true },
  endGame: {
    whenAllQuanHarvested: true,
    remainingRowSeedsToRowOwner: true,
    unharvestedQuanScoresNobody: true,
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
  if (rules.official !== false) fail('engine G1 chỉ chạy cấu hình thử nghiệm (official: false)');
  if (!isNonNegInt(rules.setup?.danSeedsPerDanPit) || rules.setup.danSeedsPerDanPit < 1) fail('setup.danSeedsPerDanPit');
  if (rules.setup.danSeedsPerQuanPit !== 0) fail('setup.danSeedsPerQuanPit khác 0 chưa được hỗ trợ');
  if (!isNonNegInt(rules.scoring?.danSeedValue)) fail('scoring.danSeedValue');
  if (!isNonNegInt(rules.scoring?.quanPieceValue)) fail('scoring.quanPieceValue');
  if (rules.move?.selectablePits !== 'ownRowWithSeeds') fail('move.selectablePits chưa được hỗ trợ');
  if (rules.move?.direction !== 'choosePerTurn') fail('move.direction chưa được hỗ trợ');
  if (rules.sowing?.skipQuanPits !== true) fail('sowing.skipQuanPits=false chưa được hỗ trợ');
  if (rules.sowing?.originReceivesOnLap !== true) fail('sowing.originReceivesOnLap=false chưa được hỗ trợ');
  if (rules.sowing?.relaySowing !== false) fail('sowing.relaySowing=true chưa được hỗ trợ');
  if (rules.capture?.gap !== 'emptyDanPitOnly') fail('capture.gap chưa được hỗ trợ');
  if (rules.capture?.maxPerTurn !== 1) fail('capture.maxPerTurn khác 1 chưa được hỗ trợ');
  if (rules.capture?.targetRows !== 'any') fail('capture.targetRows chưa được hỗ trợ');
  if (rules.capture?.quanMinDanSeeds !== 0) fail('capture.quanMinDanSeeds khác 0 chưa được hỗ trợ');
  if (!isNonNegInt(rules.challenge?.danLevel1MaxSeeds) || rules.challenge.danLevel1MaxSeeds < 1) fail('challenge.danLevel1MaxSeeds');
  if (rules.challenge?.danLevelAbove !== 2 || rules.challenge?.quanLevel !== 3) fail('challenge levels');
  if (!isNonNegInt(rules.emptyRow?.restockSeedsPerPit) || rules.emptyRow.restockSeedsPerPit < 1) fail('emptyRow.restockSeedsPerPit');
  if (rules.emptyRow?.borrowFromOpponent !== true || rules.emptyRow?.endGameIfInsufficient !== true) fail('emptyRow chưa được hỗ trợ');
  const e = rules.endGame;
  if (!e || e.whenAllQuanHarvested !== true || e.remainingRowSeedsToRowOwner !== true || e.unharvestedQuanScoresNobody !== true || e.tie !== 'draw') {
    fail('endGame chưa được hỗ trợ');
  }
}
