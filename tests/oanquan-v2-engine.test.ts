import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PLAYTEST_V1, applyAction, assertInvariants, computeScores, createGame, getLegalPits, previewSow,
  winner, type EngineEvent, type GameState, type PlayerId, type RingIndex, type RulesConfig,
} from '../src/features/oanquan-v2/engine';

const R = PLAYTEST_V1;

/** Dựng thế cờ tùy ý; tổng hạt tính lại từ bàn + kho. quan[i]=false nghĩa là quân Quan đó đã vào kho. */
function board(opts: {
  pits: number[];
  current?: PlayerId;
  quan?: [boolean, boolean];
  stores?: Record<PlayerId, { dan: number; quan: number }>;
  debt?: Record<PlayerId, number>;
  rules?: RulesConfig;
}): GameState {
  const base = createGame({ rules: opts.rules ?? R, initialPlayer: opts.current ?? 'P1' });
  const quan = opts.quan ?? [true, true];
  const stores = opts.stores ?? {
    P1: { dan: 0, quan: quan[0] ? 0 : 1 },
    P2: { dan: 0, quan: quan[1] ? 0 : 1 },
  };
  const state: GameState = {
    ...base,
    pits: opts.pits,
    quanOnBoard: quan,
    stores,
    debt: opts.debt ?? { P1: 0, P2: 0 },
    totalDan: opts.pits.reduce((a, b) => a + b, 0) + stores.P1.dan + stores.P2.dan,
  };
  assertInvariants(state);
  return state;
}
const sow = (s: GameState, pit: RingIndex, direction: 'cw' | 'ccw') => applyAction(s, { type: 'sow', pit, direction });
const verdict = (s: GameState, v: 'pass' | 'fail') => applyAction(s, { type: 'commitRefereeResult', verdict: v });
const evs = <T extends EngineEvent['type']>(events: readonly EngineEvent[], t: T) =>
  events.filter((e) => e.type === t) as Extract<EngineEvent, { type: T }>[];
const ev = <T extends EngineEvent['type']>(events: readonly EngineEvent[], t: T) => evs(events, t)[0];

test('tạo ván: 50 hạt Dân, 5/Ô Dân, Ô Quan 0 hạt, 2 quân Quan, initialPlayer bắt buộc', () => {
  const g = createGame({ rules: R, initialPlayer: 'P2' });
  assert.deepEqual([...g.pits], [0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5]);
  assert.equal(g.totalDan, 50);
  assert.deepEqual([...g.quanOnBoard], [true, true]);
  assert.equal(g.current, 'P2');
  assert.throws(() => createGame({ rules: R } as never), /initialPlayer/);
});

test('RulesConfig tường minh: biến thể chưa hỗ trợ bị từ chối', () => {
  assert.throws(() => createGame({ rules: undefined as never, initialPlayer: 'P1' }));
  const variants: [string, unknown][] = [
    ['quanMinDanSeeds', { ...R, capture: { ...R.capture, quanMinDanSeeds: 5 } }],
    ['chain', { ...R, capture: { ...R.capture, chain: false } }],
    ['pickFromQuanPits', { ...R, sowing: { ...R.sowing, pickFromQuanPits: true } }],
    ['official', { ...R, official: true }],
    ['quanPieceValue', { ...R, scoring: { danSeedValue: 1 } }],
  ];
  for (const [msg, rules] of variants) {
    assert.throws(() => createGame({ rules: rules as RulesConfig, initialPlayer: 'P1' }), new RegExp(msg));
  }
});

test('nước đi không hợp lệ: hàng đối thủ, Ô Quan, ô trống, sai pha', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  assert.deepEqual(getLegalPits(g), [7, 8, 9, 10, 11]);
  assert.throws(() => sow(g, 3, 'cw'), /hàng của mình/);
  assert.throws(() => sow(g, 0, 'cw'), /Ô Quan/);
  assert.throws(() => verdict(g, 'pass'), /Không có cơ hội ăn/);
  assert.throws(() => sow(board({ pits: [0, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5] }), 7, 'cw'), /không có hạt/);
});

test('rải qua Ô Quan: thả 1 hạt vào Ô Quan, quân Quan nằm yên; rải tiếp; ăn Ô Quan ngay nước đầu', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  assert.deepEqual(previewSow(g, 11, 'cw'), [0, 1, 2, 3, 4], 'xem trước có cả Ô Quan, không tính rải tiếp');
  const { state, events } = sow(g, 11, 'cw');
  const seq = events.map((e) => (e.type === 'pickup' ? `P${e.ring}:${e.count}` : e.type === 'drop' ? `d${e.ring}` : e.type));
  assert.deepEqual(seq, [
    'P11:5', 'd0', 'd1', 'd2', 'd3', 'd4', // nắm đầu: qua Quan Trái
    'P5:5', 'd6', 'd7', 'd8', 'd9', 'd10', // rải tiếp từ T5, qua Quan Phải
    'sowEnded', 'captureOpportunity',
  ]);
  assert.equal(evs(events, 'drop').filter((d) => d.intoQuanPit).length, 2);
  assert.deepEqual([...state.pits], [1, 6, 6, 6, 6, 0, 1, 6, 6, 6, 6, 0]);
  assert.deepEqual([...state.quanOnBoard], [true, true], 'quân Quan không bị bốc');
  const end = ev(events, 'sowEnded');
  assert.deepEqual({ last: end.last, next: end.next, reason: end.reason, relays: end.relays, drops: end.drops }, { last: 10, next: 11, reason: 'capture', relays: 1, drops: 10 });
  const cap = ev(events, 'captureOpportunity').capture;
  assert.deepEqual({ t: cap.target, d: cap.danSeeds, q: cap.hasQuan, l: cap.level, c: cap.chainIndex }, { t: 0, d: 1, q: true, l: 3, c: 0 });
});

test('rải tiếp nhiều lần và đi đủ vòng (ô xuất phát nhận lại hạt)', () => {
  //            0  1  2  3  4  5  6  7  8  9 10 11
  const pits = [0, 0, 0, 2, 2, 2, 0, 1, 0, 1, 0, 1];
  // D5 (7) cw: d8; ô 9 có hạt → bốc rải d10; ô 11 có hạt → bốc rải d0 (Ô Quan Trái); ô 1 trống; ô 2 trống → dừng
  const r = sow(board({ pits, current: 'P1' }), 7, 'cw');
  assert.equal(ev(r.events, 'sowEnded').relays, 2);
  assert.equal(ev(r.events, 'sowEnded').reason, 'twoEmpty');
  assert.deepEqual(evs(r.events, 'pickup').map((p) => p.ring), [7, 9, 11]);
  assert.deepEqual(evs(r.events, 'drop').map((d) => d.ring), [8, 10, 0]);
  assert.deepEqual([...r.state.pits], [1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 1, 0]);
  // Thêm 3 hạt ở T1: sau khi thả vào Quan Trái, T1 có hạt → rải tiếp lần nữa
  const more = sow(board({ pits: [0, 3, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1], current: 'P1' }), 7, 'cw');
  assert.deepEqual(evs(more.events, 'pickup').map((p) => p.ring).slice(0, 4), [7, 9, 11, 1]);
  // Đi đủ vòng: 12 hạt từ D5 → ô xuất phát nhận 1 hạt
  const lap = board({ pits: [0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0], current: 'P1' });
  const path = previewSow(lap, 7, 'cw');
  assert.equal(path.length, 12);
  assert.equal(path[11], 7, 'hạt thứ 12 rơi lại vào ô xuất phát');
  assert.deepEqual(path.filter((p) => p === 0 || p === 6).length, 2, 'đi qua cả hai Ô Quan');
});

test('dừng khi ô sau hạt cuối là Ô Quan còn quân, hoặc Ô Quan đã mất quân nhưng còn hạt (không bốc Ô Quan)', () => {
  // T4 (4) 1 hạt cw → rơi T5; ô sau là Quan Phải còn quân
  const a = sow(board({ pits: [0, 0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3], current: 'P2' }), 4, 'cw');
  assert.equal(ev(a.events, 'sowEnded').reason, 'occupiedQuan');
  assert.equal(a.state.current, 'P1');
  assert.equal(evs(a.events, 'pickup').length, 1, 'không bốc Ô Quan');
  // Quan Phải đã mất quân nhưng còn 2 hạt Dân → vẫn dừng
  const b = sow(board({ pits: [0, 0, 0, 0, 1, 0, 2, 3, 3, 3, 3, 3], current: 'P2', quan: [true, false] }), 4, 'cw');
  assert.equal(ev(b.events, 'sowEnded').reason, 'occupiedQuan');
  assert.equal(b.state.pits[6], 2);
});

test('hai ô trống liên tiếp → hết lượt, không ăn', () => {
  const r = sow(board({ pits: [0, 1, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3], current: 'P2' }), 1, 'cw');
  assert.equal(ev(r.events, 'sowEnded').reason, 'twoEmpty');
  assert.equal(ev(r.events, 'captureOpportunity'), undefined);
  assert.equal(r.state.current, 'P1');
});

test('ăn Ô Dân: Cấp theo số hạt; chưa Chốt thì kho, lượt, bàn không đổi; Đạt mới thu hoạch', () => {
  for (const [n, lvl] of [[1, 1], [3, 1], [4, 2], [9, 2]] as const) {
    const r = sow(board({ pits: [0, 1, 0, 0, n, 1, 0, 3, 3, 3, 3, 3], current: 'P2' }), 1, 'cw');
    assert.equal(ev(r.events, 'captureOpportunity').capture.level, lvl, `${n} hạt`);
  }
  const r = sow(board({ pits: [0, 1, 0, 0, 4, 1, 0, 3, 3, 3, 3, 3], current: 'P2' }), 1, 'cw');
  assert.equal(r.state.phase, 'awaitingVerdict');
  assert.equal(r.state.stores.P2.dan, 0);
  assert.equal(r.state.current, 'P2');
  assert.equal(r.state.pits[4], 4);
  assert.throws(() => sow(r.state, 7, 'cw'), /Trọng tài/);
  const done = verdict(r.state, 'pass');
  assert.equal(done.state.stores.P2.dan, 4);
  assert.equal(done.state.pits[4], 0);
  assert.equal(ev(done.events, 'chainEnded').reason, 'gapNotEmpty'); // ô 5 có hạt
  assert.equal(done.state.current, 'P1');
});

test('Chưa đạt: giữ nguyên ô đích, kết thúc chuỗi, đổi lượt', () => {
  const r = sow(board({ pits: [0, 1, 0, 0, 4, 0, 0, 3, 3, 3, 3, 3], current: 'P2' }), 1, 'cw');
  const before = [...r.state.pits];
  const f = verdict(r.state, 'fail');
  assert.deepEqual([...f.state.pits], before);
  assert.equal(f.state.stores.P2.dan, 0);
  assert.equal(ev(f.events, 'chainEnded').reason, 'refereeFail');
  assert.equal(f.state.current, 'P1');
});

test('ăn liên hoàn: Đạt rồi xét tiếp; Chưa đạt ở lần sau giữ phần đã Chốt', () => {
  //                 0  1  2  3  4  5  6  7  8  9 10 11
  const start = () => board({ pits: [0, 1, 0, 0, 4, 0, 0, 3, 3, 3, 3, 3], current: 'P2' });
  // T1 cw → rơi T2; T3 trống; T4 4 hạt → ăn; T5 trống; Quan Phải còn quân → ăn tiếp
  const r1 = sow(start(), 1, 'cw');
  const r2 = verdict(r1.state, 'pass');
  const cap2 = ev(r2.events, 'captureOpportunity').capture;
  assert.deepEqual({ t: cap2.target, c: cap2.chainIndex, l: cap2.level, q: cap2.hasQuan }, { t: 6, c: 1, l: 3, q: true });
  assert.equal(r2.state.stores.P2.dan, 4, 'phần ăn đầu đã ghi');
  assert.equal(r2.state.current, 'P2', 'vẫn lượt của người đang ăn');
  // Đạt lần hai → Quan về kho; sau Quan Phải là D5 có hạt → chuỗi dừng
  const r3 = verdict(r2.state, 'pass');
  assert.equal(r3.state.stores.P2.quan, 1);
  assert.equal(r3.state.quanOnBoard[1], false);
  assert.equal(ev(r3.events, 'chainEnded').reason, 'gapNotEmpty');
  // Chưa đạt ở lần hai → giữ 4 hạt đã ăn, Quan Phải giữ nguyên
  const f = verdict(r2.state, 'fail');
  assert.equal(f.state.stores.P2.dan, 4);
  assert.equal(f.state.quanOnBoard[1], true);
  assert.equal(f.state.current, 'P1');
});

test('chuỗi dừng khi gặp hai ô trống sau ô vừa ăn', () => {
  const r = sow(board({ pits: [0, 1, 0, 0, 4, 0, 0, 3, 3, 3, 3, 3], current: 'P2', quan: [true, false] }), 1, 'cw');
  const done = verdict(r.state, 'pass');
  assert.equal(ev(done.events, 'chainEnded').reason, 'twoEmpty');
});

test('Ô Quan đã mất quân: vẫn nhận hạt khi rải, trống hẳn thì làm ô cách, còn hạt thì ăn được (Cấp 3)', () => {
  // T2 (2) 1 hạt ccw → rơi T1; Quan Trái trống hẳn → làm ô cách; D1 (11) có 3 hạt → ăn
  const gapQuan = sow(board({ pits: [0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3], current: 'P2', quan: [false, true] }), 2, 'ccw');
  const c = ev(gapQuan.events, 'captureOpportunity').capture;
  assert.deepEqual({ t: c.target, l: c.level }, { t: 11, l: 1 });
  // T3 (3) 1 hạt cw → rơi T4; T5 trống; Quan Phải (đã mất quân) có 3 hạt → ăn 3 hạt, không có quân Quan
  const s = sow(board({ pits: [0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3], current: 'P2', quan: [true, false] }), 3, 'cw');
  const c2 = ev(s.events, 'captureOpportunity').capture;
  assert.deepEqual({ t: c2.target, d: c2.danSeeds, q: c2.hasQuan, l: c2.level }, { t: 6, d: 3, q: false, l: 3 });
  const done = verdict(s.state, 'pass');
  assert.equal(ev(done.events, 'refereeCommitted').harvestedDan, 3);
  assert.equal(ev(done.events, 'refereeCommitted').harvestedQuan, 0);
  // Rải đi qua Ô Quan đã mất quân: vẫn thả hạt vào đó
  const pass = sow(board({ pits: [0, 0, 0, 0, 2, 0, 0, 3, 3, 3, 3, 3], current: 'P2', quan: [true, false] }), 4, 'cw');
  const drops = evs(pass.events, 'drop');
  assert.deepEqual(drops.slice(0, 2).map((d) => [d.ring, d.intoQuanPit]), [[5, false], [6, true]]);
  assert.equal(evs(pass.events, 'pickup')[1]?.ring, 7, 'sau khi qua Quan, D5 có hạt → rải tiếp');
});

test('hàng trống: lấy 5 hạt từ kho mình; thiếu thì mượn, ghi nợ, tính nợ đúng một lần', () => {
  const pits = [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0];
  // D4 (8) cw → rơi D3; D2, D1 trống → hết lượt; tới P2 hàng trống
  const own = sow(board({ pits, current: 'P1', stores: { P1: { dan: 0, quan: 0 }, P2: { dan: 7, quan: 0 } } }), 8, 'cw');
  assert.deepEqual({ ...ev(own.events, 'restocked') }, { type: 'restocked', player: 'P2', fromOwnStore: 5, borrowed: 0 });
  assert.deepEqual([1, 2, 3, 4, 5].map((i) => own.state.pits[i]), [1, 1, 1, 1, 1]);
  const borrow = sow(board({ pits, current: 'P1', stores: { P1: { dan: 10, quan: 0 }, P2: { dan: 2, quan: 0 } } }), 8, 'cw');
  const rs = ev(borrow.events, 'restocked');
  assert.deepEqual({ own: rs.fromOwnStore, b: rs.borrowed }, { own: 2, b: 3 });
  assert.equal(borrow.state.debt.P2, 3);
  const sc = computeScores(borrow.state);
  assert.equal(sc.P1.total, 10);
  assert.equal(sc.P2.total, -3);
});

test('hàng trống, tổng hạt khả dụng < 5 → kết thúc sớm; Quan chưa ăn không tính cho ai', () => {
  const r = sow(board({
    pits: [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0], current: 'P1',
    stores: { P1: { dan: 3, quan: 0 }, P2: { dan: 1, quan: 0 } },
  }), 7, 'cw');
  assert.equal(r.state.endReason, 'insufficientSeedsToRestock');
  const go = ev(r.events, 'gameOver');
  assert.deepEqual(go.sweptToOwner, { P1: 3, P2: 0 });
  assert.equal(go.scores.P1.total, 6);
  assert.equal(go.scores.P2.total, 1);
  assert.equal(winner(r.state), 'P1');
});

test('hết hai quân Quan → kết thúc; hạt còn trong Ô Quan không tính cho ai; hòa được công nhận', () => {
  //                 0  1  2  3  4  5  6  7  8  9 10 11
  const s = board({
    pits: [2, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0], current: 'P2', quan: [false, true],
    stores: { P1: { dan: 5, quan: 1 }, P2: { dan: 9, quan: 0 } },
  });
  const done = verdict(sow(s, 3, 'cw').state, 'pass');
  assert.equal(done.state.phase, 'gameOver');
  assert.equal(done.state.endReason, 'allQuanHarvested');
  const go = ev(done.events, 'gameOver');
  assert.deepEqual(go.sweptToOwner, { P1: 2, P2: 1 });
  assert.equal(go.danLeftInQuanPits, 2);
  assert.equal(go.scores.P1.total, 17);
  assert.equal(go.scores.P2.total, 20);
  const tie = board({
    pits: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], current: 'P2', quan: [false, true],
    stores: { P1: { dan: 9, quan: 1 }, P2: { dan: 9, quan: 0 } },
  });
  assert.equal(winner(verdict(sow(tie, 3, 'cw').state, 'pass').state), 'draw');
});

test('xác định, không sửa state đầu vào', () => {
  const g = createGame({ rules: R, initialPlayer: 'P1' });
  const snap = JSON.stringify(g);
  const a = JSON.stringify(sow(g, 9, 'ccw'));
  assert.equal(JSON.stringify(g), snap);
  assert.equal(a, JSON.stringify(sow(g, 9, 'ccw')));
});

// --------------------------------------------------------------- mô phỏng

function rng(seed: number) {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0;
    return x / 0x100000000;
  };
}

function simulate(rules: RulesConfig, games: number, seed0: number, passRate: number) {
  const stats = { finished: 0, capped: 0, quanEnds: 0, restockEnds: 0, relays: 0, quanDrops: 0, chains: 0, dropLimits: 0, restocks: 0, borrows: 0, maxRelaysInTurn: 0 };
  for (let g = 0; g < games; g++) {
    const rand = rng(g + seed0);
    let s = createGame({ rules, initialPlayer: rand() < 0.5 ? 'P1' : 'P2' });
    let steps = 0;
    while (s.phase !== 'gameOver' && steps < 4000) {
      steps++;
      let r;
      if (s.phase === 'awaitingSow') {
        const legal = getLegalPits(s);
        assert.ok(legal.length > 0);
        r = sow(s, legal[Math.floor(rand() * legal.length)], rand() < 0.5 ? 'cw' : 'ccw');
      } else {
        r = verdict(s, rand() < passRate ? 'pass' : 'fail');
      }
      for (const e of r.events) {
        if (e.type === 'pickup' && e.relay) stats.relays++;
        if (e.type === 'drop' && e.intoQuanPit) stats.quanDrops++;
        if (e.type === 'captureOpportunity' && e.capture.chainIndex > 0) stats.chains++;
        if (e.type === 'sowEnded') { if (e.reason === 'dropLimit') stats.dropLimits++; stats.maxRelaysInTurn = Math.max(stats.maxRelaysInTurn, e.relays); }
        if (e.type === 'restocked') { stats.restocks++; if (e.borrowed) stats.borrows++; }
      }
      s = r.state;
      assertInvariants(s);
    }
    if (s.phase === 'gameOver') {
      stats.finished++;
      if (s.endReason === 'allQuanHarvested') stats.quanEnds++; else stats.restockEnds++;
      const sc = computeScores(s);
      const harvestedQuan = s.stores.P1.quan + s.stores.P2.quan;
      const leftInQuan = s.pits[0] + s.pits[6];
      assert.equal(sc.P1.total + sc.P2.total, 50 - leftInQuan + 10 * harvestedQuan, 'tổng điểm = hạt đã tính + 10/Quan');
    } else stats.capped++;
  }
  return stats;
}

test('mô phỏng 3.000 ván ngẫu nhiên: bất biến luôn giữ, rải tiếp / rải qua Quan / ăn liên hoàn đều xảy ra', () => {
  const st = simulate(R, 3000, 1, 0.6);
  console.log('[mô phỏng V1]', JSON.stringify(st));
  assert.equal(st.capped, 0, 'mọi ván đều kết thúc');
  assert.ok(st.relays > 0 && st.quanDrops > 0 && st.chains > 0, 'đi qua các nhánh mới');
  assert.ok(st.restocks > 0);
});

test('chốt an toàn số hạt thả mỗi lượt luôn dừng vòng rải', () => {
  const tight: RulesConfig = { ...R, sowing: { ...R.sowing, maxDropsPerTurn: 12 } };
  const st = simulate(tight, 300, 7, 0.6);
  assert.ok(st.dropLimits > 0, 'có lượt chạm chốt an toàn');
  assert.equal(st.capped, 0);
});

// --------------------------------------------------------------- phát lại hoạt ảnh

test('phát lại khung hình từ sự kiện luôn khớp trạng thái engine (500 ván)', async () => {
  const { buildFrames, applyFrame, snapshotOf } = await import('../src/features/oanquan-v2/ui/playback');
  for (let g = 0; g < 500; g++) {
    const rand = rng(g + 9000);
    let s = createGame({ rules: R, initialPlayer: g % 2 ? 'P1' : 'P2' });
    let steps = 0;
    while (s.phase !== 'gameOver' && steps++ < 4000) {
      const r = s.phase === 'awaitingSow'
        ? sow(s, getLegalPits(s)[Math.floor(rand() * getLegalPits(s).length)], rand() < 0.5 ? 'cw' : 'ccw')
        : verdict(s, rand() < 0.6 ? 'pass' : 'fail');
      let snap = snapshotOf(s);
      for (const f of buildFrames(r.events)) snap = applyFrame(snap, f);
      const want = snapshotOf(r.state);
      assert.deepEqual([...snap.pits], [...want.pits], `ván ${g} bước ${steps}: bàn`);
      assert.deepEqual([...snap.quan], [...want.quan]);
      assert.deepEqual(snap.stores, want.stores);
      assert.deepEqual(snap.debt, want.debt);
      assert.equal(snap.current, want.current);
      s = r.state;
    }
  }
});
