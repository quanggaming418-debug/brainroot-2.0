import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PLAYTEST_V0, applyAction, assertInvariants, computeScores, createGame, getLegalPits, previewSow,
  winner, type GameState, type PlayerId, type RingIndex, type RulesConfig, type EngineEvent,
} from '../src/features/oanquan-v2/engine';

const R = PLAYTEST_V0;

/** Dựng thế cờ tùy ý cho test; tổng hạt tính lại từ bàn + kho. */
function board(opts: {
  pits: number[];
  current?: PlayerId;
  quan?: [boolean, boolean];
  stores?: Record<PlayerId, { dan: number; quan: number }>;
  debt?: Record<PlayerId, number>;
}): GameState {
  const base = createGame({ rules: R, initialPlayer: opts.current ?? 'P1' });
  const stores = opts.stores ?? {
    P1: { dan: 0, quan: opts.quan && !opts.quan[0] ? 1 : 0 },
    P2: { dan: 0, quan: opts.quan && !opts.quan[1] ? 1 : 0 },
  };
  const state: GameState = {
    ...base,
    pits: opts.pits,
    quanOnBoard: opts.quan ?? [true, true],
    stores,
    debt: opts.debt ?? { P1: 0, P2: 0 },
    totalDan: opts.pits.reduce((a, b) => a + b, 0) + stores.P1.dan + stores.P2.dan,
  };
  assertInvariants(state);
  return state;
}
const sow = (s: GameState, pit: RingIndex, direction: 'cw' | 'ccw') => applyAction(s, { type: 'sow', pit, direction });
const verdict = (s: GameState, v: 'pass' | 'fail') => applyAction(s, { type: 'commitRefereeResult', verdict: v });
const ev = <T extends EngineEvent['type']>(events: readonly EngineEvent[], t: T) =>
  events.find((e) => e.type === t) as Extract<EngineEvent, { type: T }> | undefined;
//                 0  1  2  3  4  5  6  7  8  9 10 11
const ZERO = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

test('tạo ván: 50 hạt Dân, 5/Ô Dân, Ô Quan 0 hạt, 2 quân Quan, initialPlayer bắt buộc', () => {
  const g = createGame({ rules: R, initialPlayer: 'P2' });
  assert.deepEqual([...g.pits], [0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5]);
  assert.equal(g.totalDan, 50);
  assert.deepEqual([...g.quanOnBoard], [true, true]);
  assert.equal(g.current, 'P2');
  assert.equal(g.phase, 'awaitingSow');
  assert.throws(() => createGame({ rules: R } as never), /initialPlayer/);
  assert.throws(() => createGame({ rules: R, initialPlayer: 'X' as never }), /initialPlayer/);
});

test('RulesConfig tường minh: thiếu hoặc biến thể chưa hỗ trợ bị từ chối', () => {
  assert.throws(() => createGame({ rules: undefined as never, initialPlayer: 'P1' }));
  const bad = { ...R, sowing: { ...R.sowing, skipQuanPits: false } } as unknown as RulesConfig;
  assert.throws(() => createGame({ rules: bad, initialPlayer: 'P1' }), /skipQuanPits/);
  const official = { ...R, official: true } as unknown as RulesConfig;
  assert.throws(() => createGame({ rules: official, initialPlayer: 'P1' }), /official/);
  const noQuanValue = { ...R, scoring: { danSeedValue: 1 } } as unknown as RulesConfig;
  assert.throws(() => createGame({ rules: noQuanValue, initialPlayer: 'P1' }), /quanPieceValue/);
});

test('nước đi không hợp lệ: hàng đối thủ, Ô Quan, ô trống, sai pha', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  assert.deepEqual(getLegalPits(g), [7, 8, 9, 10, 11]);
  assert.throws(() => sow(g, 3, 'cw'), /hàng của mình/);
  assert.throws(() => sow(g, 0, 'cw'), /Ô Quan/);
  assert.throws(() => sow(g, 6, 'ccw'), /Ô Quan/);
  assert.throws(() => verdict(g, 'pass'), /Không có cơ hội ăn/);
  const empty = board({ pits: [0, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5] });
  assert.throws(() => sow(empty, 7, 'cw'), /không có hạt/);
  assert.throws(() => sow(g, 7, 'up' as never), /Chiều/);
});

test('rải bỏ qua Ô Quan theo cả hai chiều', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  // D1 (ring 11) chiều kim đồng hồ: bỏ Quan Trái (0) → T1..T5
  assert.deepEqual(previewSow(g, 11, 'cw'), [1, 2, 3, 4, 5]);
  // D5 (ring 7) ngược chiều: bỏ Quan Phải (6) → T5, T4, T3, T2, T1
  assert.deepEqual(previewSow(g, 7, 'ccw'), [5, 4, 3, 2, 1]);
  const { state, events } = sow(g, 11, 'cw');
  assert.equal(state.pits[0], 0);
  assert.equal(state.pits[6], 0);
  assert.deepEqual(ev(events, 'sowed')!.drops, [1, 2, 3, 4, 5]);
});

test('đi đủ vòng: ô xuất phát nhận hạt, Ô Quan không nhận', () => {
  const pits = ZERO(); pits[7] = 11; pits[1] = 1; pits[2] = 1; pits[3] = 1; pits[4] = 1; pits[5] = 1; pits[8] = 1;
  const s = board({ pits });
  const path = previewSow(s, 7, 'cw');
  assert.deepEqual(path, [8, 9, 10, 11, 1, 2, 3, 4, 5, 7, 8]);
  const { state } = sow(s, 7, 'cw');
  assert.equal(state.pits[7], 1, 'ô xuất phát nhận 1 hạt khi đi đủ vòng');
  assert.equal(state.pits[0] + state.pits[6], 0);
});

test('không rải tiếp: ô sau hạt cuối có hạt thì hết lượt, không ăn', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  const { state, events } = sow(g, 9, 'cw'); // 5 hạt: 10,11,(0),1,2,3 → hạt cuối T3; T4 có hạt
  assert.equal(ev(events, 'noCapture')!.reason, 'gapHasSeeds');
  assert.equal(state.current, 'P2');
  assert.equal(state.turn, 2);
  assert.equal(state.phase, 'awaitingSow');
});

test('ăn Ô Dân: ô trống rồi ô có 4 hạt → Cấp 2; Đạt mới thu hoạch, đổi lượt', () => {
  //            0  1  2  3  4  5  6  7  8  9 10 11
  const pits = [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1];
  const s = board({ pits, current: 'P1' });
  // D1 (11) có 1 hạt, chiều kim đồng hồ → bỏ Quan Trái, rơi T1; T2 trống; T3 trống → không ăn
  const r0 = sow(s, 11, 'cw');
  assert.equal(ev(r0.events, 'noCapture')!.reason, 'targetEmpty');
  // D2 (10) có 1 hạt cw → rơi D1 (11)? D1 đã có hạt → hết lượt
  const pits2 = [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1];
  const s2 = board({ pits: pits2, current: 'P1' });
  // D1 cw: hạt rơi T1; T2 trống; T3 có 4 hạt → cơ hội ăn Cấp 2
  const r = sow(s2, 11, 'cw');
  const cap = ev(r.events, 'captureOpportunity')!.capture;
  assert.deepEqual({ target: cap.target, danSeeds: cap.danSeeds, level: cap.level, hasQuan: cap.hasQuan, mover: cap.mover },
    { target: 3, danSeeds: 4, level: 2, hasQuan: false, mover: 'P1' });
  assert.equal(r.state.phase, 'awaitingVerdict');
  // Chưa chốt: kho và lượt không đổi
  assert.equal(r.state.stores.P1.dan, 0);
  assert.equal(r.state.current, 'P1');
  assert.throws(() => sow(r.state, 7, 'cw'), /Trọng tài/);
  const passed = verdict(r.state, 'pass');
  assert.equal(passed.state.stores.P1.dan, 4);
  assert.equal(passed.state.pits[3], 0);
  assert.equal(passed.state.current, 'P2');
});

test('Chưa đạt: giữ nguyên ô đích, đổi lượt', () => {
  const s = board({ pits: [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1], current: 'P1' });
  const r = sow(s, 11, 'cw');
  assert.equal(ev(r.events, 'captureOpportunity')!.capture.level, 1);
  const before = [...r.state.pits];
  const failed = verdict(r.state, 'fail');
  assert.deepEqual([...failed.state.pits], before);
  assert.equal(failed.state.stores.P1.dan, 0);
  assert.equal(failed.state.current, 'P2');
  assert.equal(ev(failed.events, 'refereeCommitted')!.harvestedDan, 0);
});

test('Cấp thẻ: 1–3 hạt Cấp 1, từ 4 hạt Cấp 2', () => {
  for (const [n, lvl] of [[1, 1], [3, 1], [4, 2], [9, 2]] as const) {
    const s = board({ pits: [0, 0, 0, n, 0, 0, 0, 0, 0, 0, 0, 1], current: 'P1' });
    assert.equal(ev(sow(s, 11, 'cw').events, 'captureOpportunity')!.capture.level, lvl, `${n} hạt`);
  }
});

test('ăn Ô Dân của chính mình được phép', () => {
  //                0  1  2  3  4  5  6  7  8  9 10 11
  const noGap = board({ pits: [0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0], current: 'P1' });
  // D4 (8) cw → rơi D3 (9); ô sau D2 (10) có hạt → hết lượt
  assert.equal(ev(sow(noGap, 8, 'cw').events, 'noCapture')!.reason, 'gapHasSeeds');
  // D5 (7) cw → rơi D4 (8); D3 (9) trống; D2 (10) của chính P1 có 3 hạt → được ăn
  const r = sow(board({ pits: [0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0], current: 'P1' }), 7, 'cw');
  const cap = ev(r.events, 'captureOpportunity')!.capture;
  assert.equal(cap.target, 10);
  assert.equal(verdict(r.state, 'pass').state.stores.P1.dan, 3);
});

test('ô ngay sau hạt cuối là Ô Quan → không có cơ hội ăn (không ăn qua Ô Quan)', () => {
  // P2 bốc T4 (4) 1 hạt cw → rơi T5 (5); ô sau là Quan Phải (6)
  const s = board({ pits: [0, 0, 0, 0, 1, 0, 0, 4, 4, 0, 0, 0], current: 'P2' });
  const r = sow(s, 4, 'cw');
  assert.equal(ev(r.events, 'noCapture')!.reason, 'gapIsQuan');
  assert.equal(r.state.current, 'P1');
});

test('ăn Ô Quan: Cấp 3, Đạt thì quân Quan về kho; ô Quan đã thu hoạch không ăn lại', () => {
  // P2 bốc T3 (3) 1 hạt ccw → rơi T2 (2); T1 trống; ô kế tiếp là Quan Trái còn quân
  const s = board({ pits: [0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 3, 3], current: 'P2' });
  const r = sow(s, 3, 'ccw');
  const cap = ev(r.events, 'captureOpportunity')!.capture;
  assert.deepEqual({ t: cap.target, l: cap.level, q: cap.hasQuan, d: cap.danSeeds }, { t: 0, l: 3, q: true, d: 0 });
  const done = verdict(r.state, 'pass');
  assert.equal(done.state.stores.P2.quan, 1);
  assert.equal(done.state.quanOnBoard[0], false);
  assert.equal(ev(done.events, 'refereeCommitted')!.harvestedQuan, 1);
  // Lặp lại thế đó với Quan Trái đã thu hoạch: không còn cơ hội ăn
  const again = board({ pits: [0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 3, 3], current: 'P2', quan: [false, true] });
  assert.equal(ev(sow(again, 3, 'ccw').events, 'noCapture')!.reason, 'targetEmpty');
});

test('Chưa đạt ở Ô Quan: quân Quan vẫn trên bàn', () => {
  const s = board({ pits: [0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 3, 3], current: 'P2' });
  const failed = verdict(sow(s, 3, 'ccw').state, 'fail');
  assert.deepEqual([...failed.state.quanOnBoard], [true, true]);
  assert.equal(failed.state.stores.P2.quan, 0);
});

test('hàng trống: lấy 5 hạt từ kho mình', () => {
  // P1 đi, sau đó tới P2 có hàng trống, kho P2 = 7
  const s = board({
    pits: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], current: 'P1',
    stores: { P1: { dan: 0, quan: 0 }, P2: { dan: 7, quan: 0 } },
  });
  const r = sow(s, 8, 'cw'); // rơi D3 (9); D2 (10) trống; D1 (11) trống → không ăn
  const rs = ev(r.events, 'restocked')!;
  assert.deepEqual({ p: rs.player, own: rs.fromOwnStore, b: rs.borrowed }, { p: 'P2', own: 5, b: 0 });
  assert.deepEqual([1, 2, 3, 4, 5].map((i) => r.state.pits[i]), [1, 1, 1, 1, 1]);
  assert.equal(r.state.stores.P2.dan, 2);
  assert.equal(r.state.current, 'P2');
});

test('hàng trống: thiếu thì mượn kho đối thủ, ghi nợ, tính nợ đúng một lần', () => {
  const s = board({
    pits: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], current: 'P1',
    stores: { P1: { dan: 10, quan: 0 }, P2: { dan: 2, quan: 0 } },
  });
  const r = sow(s, 8, 'cw');
  const rs = ev(r.events, 'restocked')!;
  assert.deepEqual({ own: rs.fromOwnStore, b: rs.borrowed }, { own: 2, b: 3 });
  assert.equal(r.state.stores.P2.dan, 0);
  assert.equal(r.state.stores.P1.dan, 7);
  assert.equal(r.state.debt.P2, 3);
  const sc = computeScores(r.state);
  assert.equal(sc.P1.total, 10, 'P1: 7 trong kho + 3 cho mượn');
  assert.equal(sc.P2.total, -3, 'P2: 0 trong kho − 3 nợ');
});

test('hàng trống, tổng hạt khả dụng < 5 → kết thúc sớm; Quan chưa ăn không tính cho ai', () => {
  const s = board({
    pits: [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0], current: 'P1',
    stores: { P1: { dan: 3, quan: 0 }, P2: { dan: 1, quan: 0 } },
  });
  const r = sow(s, 7, 'cw'); // rơi D4 (8) → 3 hạt; ô sau D3 trống; D2 trống → không ăn
  assert.equal(r.state.phase, 'gameOver');
  assert.equal(r.state.endReason, 'insufficientSeedsToRestock');
  const go = ev(r.events, 'gameOver')!;
  assert.deepEqual(go.sweptToOwner, { P1: 3, P2: 0 });
  assert.equal(go.scores.P1.total, 6);
  assert.equal(go.scores.P2.total, 1);
  assert.deepEqual([...r.state.quanOnBoard], [true, true]);
  assert.equal(winner(r.state), 'P1');
  assert.throws(() => sow(r.state, 7, 'cw'), /kết thúc/);
});

test('hết hai Quan → kết thúc, hạt còn trên hàng về chủ hàng, Quan 10 điểm, hòa được công nhận', () => {
  // Quan Trái đã thuộc P1; P2 sắp ăn Quan Phải
  //                0  1  2  3  4  5  6  7  8  9 10 11
  const s2 = board({
    pits: [0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0],
    current: 'P2', quan: [false, true],
    stores: { P1: { dan: 7, quan: 1 }, P2: { dan: 9, quan: 0 } },
  });
  // T3 (3) cw → rơi T4 (4); T5 trống; Quan Phải còn quân → cơ hội Cấp 3
  const r = sow(s2, 3, 'cw');
  assert.equal(ev(r.events, 'captureOpportunity')!.capture.target, 6);
  const done = verdict(r.state, 'pass');
  assert.equal(done.state.phase, 'gameOver');
  assert.equal(done.state.endReason, 'allQuanHarvested');
  const go = ev(done.events, 'gameOver')!;
  assert.deepEqual(go.sweptToOwner, { P1: 2, P2: 1 });
  // P1: 7 + 2 + 10 = 19; P2: 9 + 1 + 10 = 20
  assert.equal(go.scores.P1.total, 19);
  assert.equal(go.scores.P2.total, 20);
  assert.equal(winner(done.state), 'P2');
  // Hòa
  const tie = board({
    pits: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    current: 'P2', quan: [false, true],
    stores: { P1: { dan: 9, quan: 1 }, P2: { dan: 9, quan: 0 } },
  });
  const tieDone = verdict(sow(tie, 3, 'cw').state, 'pass');
  assert.equal(winner(tieDone.state), 'draw');
});

test('xác định: cùng chuỗi hành động cho cùng kết quả; không đổi state đầu vào', () => {
  const run = () => {
    let s = createGame({ rules: R, initialPlayer: 'P1' });
    const snap = JSON.stringify(s);
    const r = sow(s, 9, 'ccw');
    assert.equal(JSON.stringify(s), snap, 'state cũ không bị sửa');
    s = r.state;
    return JSON.stringify(s);
  };
  assert.equal(run(), run());
});

// --------------------------------------------------------------- mô phỏng

function rng(seed: number) {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0;
    return x / 0x100000000;
  };
}

test('mô phỏng 3.000 ván ngẫu nhiên: bất biến luôn giữ, điểm cuối bảo toàn', () => {
  const MAX_TURNS = 4000;
  let finished = 0, capped = 0, quanEnds = 0, restockEnds = 0, restocks = 0, borrows = 0, captures = 0;
  for (let g = 0; g < 3000; g++) {
    const rand = rng(g + 1);
    let s = createGame({ rules: R, initialPlayer: rand() < 0.5 ? 'P1' : 'P2' });
    let steps = 0;
    while (s.phase !== 'gameOver' && steps < MAX_TURNS) {
      steps++;
      let r;
      if (s.phase === 'awaitingSow') {
        const legal = getLegalPits(s);
        assert.ok(legal.length > 0, 'luôn có nước đi hợp lệ khi chờ rải');
        const pit = legal[Math.floor(rand() * legal.length)];
        r = sow(s, pit, rand() < 0.5 ? 'cw' : 'ccw');
        if (ev(r.events, 'captureOpportunity')) captures++;
      } else {
        r = verdict(s, rand() < 0.6 ? 'pass' : 'fail');
      }
      for (const e of r.events) {
        if (e.type === 'restocked') { restocks++; if (e.borrowed > 0) borrows++; }
      }
      s = r.state;
      assertInvariants(s);
    }
    if (s.phase === 'gameOver') {
      finished++;
      if (s.endReason === 'allQuanHarvested') quanEnds++; else restockEnds++;
      const sc = computeScores(s);
      const quanHarvested = s.stores.P1.quan + s.stores.P2.quan;
      assert.equal(sc.P1.total + sc.P2.total, 50 + 10 * quanHarvested, 'tổng điểm = 50 hạt + 10/Quan đã ăn');
      assert.equal(s.pits.slice(1, 6).concat(s.pits.slice(7)).reduce((a, b) => a + b, 0), 0, 'hàng đã dọn');
    } else {
      capped++;
    }
  }
  console.log(`[mô phỏng] xong ${finished}/3000 (hết Quan ${quanEnds}, thiếu hạt ${restockEnds}), chạm giới hạn ${capped}; cơ hội ăn ${captures}, đặt lại hàng ${restocks} (mượn ${borrows})`);
  assert.ok(restocks > 0 && borrows > 0, 'mô phỏng phải đi qua nhánh đặt lại hàng và mượn');
  assert.ok(quanEnds > 0, 'mô phỏng phải có ván kết thúc do hết Quan');
  // Kết thúc sớm do thiếu hạt được kiểm ở test riêng; với nước đi ngẫu nhiên hiếm khi xảy ra.
});
