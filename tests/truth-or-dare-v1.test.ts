import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ACTION_LABELS,
  FUTURE_GEMINI_PROXY_ARCHITECTURE,
  GREEN_PENALTY_SLOTS,
  OFFLINE_FAQ_ENTRIES,
  RULEBOOK_SPREADS,
  TOD_ASSETS,
  GREEN_PENALTY_SUGGESTIONS,
  THEME_LABELS,
  TRUTH_OR_DARE_DECK,
  answerBrainieFaq,
  getTruthOrDareUiCopy,
} from '../src/features/truthOrDare/truthOrDareData';
import {
  advanceAfterWheel,
  canChooseTruth,
  chooseSideBeforeDraw,
  completeCurrentTurn,
  createInitialTruthOrDareState,
  finishPenaltyWheelSpin,
  finishPullCard,
  finishShuffle,
  flipSelectedCard,
  getActiveCard,
  getRevealedPenaltySlot,
  reshuffleRemainingDeck,
  skipToPenaltyWheel,
  spinPenaltyWheel,
  startAndShuffleSession,
  startPullCard,
  stopTruthOrDareSession,
} from '../src/features/truthOrDare/truthOrDareEngine';
import {
  LOCALE_STORAGE_KEY,
  persistLocale,
  resolveInitialLocale,
} from '../src/i18n/I18nContext';
import {
  getAboutPageCopy,
  getFooterCopy,
  getHeaderCopy,
  getHeroCopy,
  getSiteMetaDescription,
} from '../src/i18n/siteCopy';
import { FACT_ACT_DETAIL, GREEN_PLAY_PRODUCTS } from '../src/data/games';
import { getFactActDetailCopy } from '../src/i18n/siteCopy';
import { getRouteDocumentTitle } from '../src/utils/routeNavigation';

const FIXED_RNG = () => 0.42;

test('strict minimal VI and EN action labels match exact specification', () => {
  assert.deepEqual(ACTION_LABELS.vi, {
    play: 'Chơi',
    rules: 'Luật',
    shuffle: 'Trộn',
    draw: 'Rút',
    flip: 'Lật',
    done: 'Xong',
    skip: 'Bỏ qua',
    spin: 'Quay',
    next: 'Chơi tiếp',
    stop: 'Dừng',
  });
  assert.deepEqual(ACTION_LABELS.en, {
    play: 'Play',
    rules: 'Rules',
    shuffle: 'Shuffle',
    draw: 'Draw',
    flip: 'Flip',
    done: 'Done',
    skip: 'Skip',
    spin: 'Spin',
    next: 'Keep playing',
    stop: 'Stop',
  });
});

test('BR-T028 data contract: exactly the 20 owner-approved public cards (verbatim VI/EN) and 15 wheel sectors', () => {
  assert.equal(TRUTH_OR_DARE_DECK.length, 20);
  const pairIds = TRUTH_OR_DARE_DECK.map((c) => c.pairId);
  assert.deepEqual(
    pairIds,
    Array.from({ length: 20 }, (_, i) => `TD-${String(i + 1).padStart(2, '0')}`),
  );
  for (const card of TRUTH_OR_DARE_DECK) {
    assert.equal(card.approvalStatus, 'approved_public');
    for (const text of [card.truthText, card.dareText]) {
      assert.ok(text.vi.trim().length > 10, `${card.pairId} vi text`);
      assert.ok(text.en.trim().length > 10, `${card.pairId} en text`);
    }
    assert.ok(card.truthTheme in THEME_LABELS);
    assert.ok(card.dareTheme in THEME_LABELS);
  }

  // Verbatim spot checks (text must never be rewritten)
  const byId = new Map(TRUTH_OR_DARE_DECK.map((c) => [c.pairId, c]));
  assert.equal(byId.get('TD-04')?.truthText.vi, 'Điều gì khiến bạn cảm thấy bình yên nhất giữa thiên nhiên?');
  assert.equal(byId.get('TD-07')?.dareText.en, 'Water the plant closest to you.');
  assert.equal(byId.get('TD-20')?.truthText.en, 'What item do you think should be shared rather than owned exclusively?');

  // Timers and optional-proof flags exactly as supplied
  const timers = Object.fromEntries(
    TRUTH_OR_DARE_DECK.filter((c) => c.dareTimerSec !== null).map((c) => [c.pairId, c.dareTimerSec]),
  );
  assert.deepEqual(timers, { 'TD-01': 30, 'TD-05': 300, 'TD-12': 60, 'TD-14': 60, 'TD-19': 15 });
  assert.deepEqual(
    TRUTH_OR_DARE_DECK.filter((c) => c.dareProof).map((c) => c.pairId),
    ['TD-03', 'TD-09', 'TD-11'],
  );

  // No placeholder copy left, and no private-card topics leaked into the public deck
  const deckJson = JSON.stringify(TRUTH_OR_DARE_DECK);
  assert.doesNotMatch(deckJson, /Khung nội dung|sẽ nạp|placeholder/i);
  assert.doesNotMatch(deckJson, /crush|người yêu cũ|dìm hàng|ex-/i);

  assert.equal(GREEN_PENALTY_SLOTS.length, 15);
  assert.equal(GREEN_PENALTY_SUGGESTIONS.length, 5);
  for (let i = 0; i < 15; i += 1) {
    assert.equal(GREEN_PENALTY_SLOTS[i].sectorIndex, i);
    assert.equal(GREEN_PENALTY_SLOTS[i].approvalStatus, 'approved');
    assert.equal(GREEN_PENALTY_SLOTS[i].text, GREEN_PENALTY_SUGGESTIONS[i % 5]);
  }
  assert.equal(new Set(GREEN_PENALTY_SLOTS.map((s) => s.text.vi)).size, 5);

  assert.equal(RULEBOOK_SPREADS.length, 4);
  assert.equal(OFFLINE_FAQ_ENTRIES.length >= 4, true);
  assert.match(FUTURE_GEMINI_PROXY_ARCHITECTURE.recommendedModel, /unverified/);
});

test('all 19 Truth or Dare SVGs and official mascots exist in public/', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const assetUrls = Object.values(TOD_ASSETS);
  assert.equal(assetUrls.length, 21); // 19 SVGs + brainie.webp + rootie.webp

  for (const url of assetUrls) {
    const cleanRel = url.replace(/^\/+/, '');
    const fullPath = path.join(publicDir, cleanRel);
    assert.equal(
      fs.existsSync(fullPath),
      true,
      `Missing expected public asset: ${cleanRel}`,
    );
  }
});

test('engine enforces Arrival -> immediate Shuffle -> Choose before draw -> Pull -> 2-face Flip -> Done', () => {
  let state = createInitialTruthOrDareState();
  assert.equal(state.phase, 'arrival');
  assert.equal(state.remainingIds.length, 20);

  // Scene A -> B: Pressing Play shuffles immediately
  state = startAndShuffleSession(state, FIXED_RNG);
  assert.equal(state.phase, 'shuffling');
  assert.equal(state.shuffleCount, 1);

  // Scene B -> C: Choosing side before pulling
  state = finishShuffle(state);
  assert.equal(state.phase, 'choosing');
  assert.equal(canChooseTruth(state), true);

  // Cannot pull before choosing
  assert.equal(startPullCard(state).phase, 'choosing');

  // Choose Truth (Brainie)
  state = chooseSideBeforeDraw(state, 'truth');
  assert.equal(state.phase, 'ready_to_pull');
  assert.equal(state.selectedSide, 'truth');
  assert.equal(state.drawnIds.length, 1);
  assert.equal(state.remainingIds.length, 19);
  assert.ok(getActiveCard(state));

  // Pull -> Ready to Flip -> Flipped
  state = startPullCard(state);
  assert.equal(state.phase, 'pulling');
  state = finishPullCard(state);
  assert.equal(state.phase, 'ready_to_flip');
  state = flipSelectedCard(state);
  assert.equal(state.phase, 'flipped');
  assert.equal(state.selectedSide, 'truth');

  // Done -> returns to choosing with Truth LOCKED
  state = completeCurrentTurn(state);
  assert.equal(state.phase, 'choosing');
  assert.equal(state.lastChoice, 'truth');
  assert.equal(canChooseTruth(state), false);
});

test('engine strictly blocks consecutive Truth turns and unlocks Truth after a Dare turn', () => {
  let state = finishShuffle(startAndShuffleSession(createInitialTruthOrDareState(), FIXED_RNG));

  // Turn 1: Truth
  state = chooseSideBeforeDraw(state, 'truth');
  state = flipSelectedCard(finishPullCard(startPullCard(state)));
  state = completeCurrentTurn(state);
  assert.equal(canChooseTruth(state), false);

  // Attempt Turn 2: Truth MUST be rejected without mutating deck
  const rejected = chooseSideBeforeDraw(state, 'truth');
  assert.equal(rejected, state);
  assert.equal(rejected.drawnIds.length, 1);

  // Turn 2: Dare MUST succeed
  state = chooseSideBeforeDraw(state, 'dare');
  assert.equal(state.phase, 'ready_to_pull');
  assert.equal(state.selectedSide, 'dare');
  state = flipSelectedCard(finishPullCard(startPullCard(state)));
  state = completeCurrentTurn(state);

  // Turn 3: Truth is unlocked again
  assert.equal(state.lastChoice, 'dare');
  assert.equal(canChooseTruth(state), true);
  state = chooseSideBeforeDraw(state, 'truth');
  assert.equal(state.selectedSide, 'truth');
});

test('non-repeating deck exhausts all 20 unique cards before reaching session_done', () => {
  let state = finishShuffle(startAndShuffleSession(createInitialTruthOrDareState(), FIXED_RNG));

  for (let turn = 0; turn < 20; turn += 1) {
    const side = canChooseTruth(state) ? 'truth' : 'dare';
    state = chooseSideBeforeDraw(state, side);
    state = flipSelectedCard(finishPullCard(startPullCard(state)));
    state = completeCurrentTurn(state);
  }

  assert.equal(state.phase, 'session_done');
  assert.equal(state.remainingIds.length, 0);
  assert.equal(state.drawnIds.length, 20);
  assert.equal(new Set(state.drawnIds).size, 20);
});

test('skip opens 15-? mystery wheel, hides result while spinning, lands accurately under top pointer, and supports non-punitive stop', () => {
  let state = finishShuffle(startAndShuffleSession(createInitialTruthOrDareState(), FIXED_RNG));
  state = chooseSideBeforeDraw(state, 'dare');
  state = flipSelectedCard(finishPullCard(startPullCard(state)));

  // Skip -> wheel_ready
  state = skipToPenaltyWheel(state);
  assert.equal(state.phase, 'wheel_ready');
  assert.equal(state.wheelRevealed, false);
  assert.equal(getRevealedPenaltySlot(state), null);

  // Spin -> targets sector floor(0.42 * 15) = 6; angle aligns sector 6 center (6*24+12 = 156°) under top pointer (mod = 204°)
  state = spinPenaltyWheel(state, FIXED_RNG);
  assert.equal(state.phase, 'wheel_spinning');
  assert.equal(state.wheelTargetSectorIndex, 6);
  assert.equal(state.wheelRevealed, false);
  assert.equal(getRevealedPenaltySlot(state), null);
  assert.equal(((state.wheelRotationDeg % 360) + 360) % 360, (360 - (6 * 24 + 12)) % 360);

  // Finish spin -> reveals landed slot #07
  state = finishPenaltyWheelSpin(state);
  assert.equal(state.phase, 'wheel_result');
  assert.equal(state.wheelRevealed, true);
  const revealed = getRevealedPenaltySlot(state);
  assert.ok(revealed);
  assert.equal(revealed.slotId, 'GP-07');
  assert.equal(revealed.text.vi, 'Uống một cốc nước và hô "Sống xanh!".');

  // Advance after wheel returns to choosing
  state = advanceAfterWheel(state);
  assert.equal(state.phase, 'choosing');
  assert.equal(state.wheelRevealed, false);

  // Mid-session reshuffle keeps drawn history
  const drawnCountBefore = state.drawnIds.length;
  state = finishShuffle(reshuffleRemainingDeck(state, FIXED_RNG));
  assert.equal(state.drawnIds.length, drawnCountBefore);

  // Non-punitive stop resets cleanly to arrival
  state = stopTruthOrDareSession(state);
  assert.equal(state.phase, 'arrival');
  assert.equal(state.drawnIds.length, 0);
});

test('Brainie Offline FAQ answers verified rules in VI/EN and refuses unknown questions honestly', () => {
  const viConsecutive = answerBrainieFaq('Vì sao không chọn Truth hai lần liên tiếp?', 'vi');
  assert.equal(viConsecutive.matched, true);
  assert.equal(viConsecutive.faqId, 'faq-consecutive-truth');

  const enWheel = answerBrainieFaq('How does the skip wheel work?', 'en');
  assert.equal(enWheel.matched, true);
  assert.equal(enWheel.faqId, 'faq-skip-penalty');

  const unknownVi = answerBrainieFaq('Thủ đô của Pháp là gì?', 'vi');
  assert.equal(unknownVi.matched, false);
  assert.match(unknownVi.text, /chưa có thông tin|ngoại tuyến/i);

  const unknownEn = answerBrainieFaq('What is the weather in Tokyo?', 'en');
  assert.equal(unknownEn.matched, false);
  assert.match(unknownEn.text, /not sure|offline faq/i);
});

test('no API keys or secrets exist anywhere inside src/features/truthOrDare', () => {
  const dir = path.resolve(process.cwd(), 'src/features/truthOrDare');
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    assert.doesNotMatch(content, /AIza[0-9A-Za-z_-]{20,}/);
    assert.doesNotMatch(content, /VITE_GEMINI_API_KEY/);
  }
});

test('global VI/EN i18n helpers persist locale, translate titles, and stay free of internal jargon', () => {
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
  };

  assert.equal(resolveInitialLocale(mockStorage), 'vi');
  persistLocale('en', mockStorage);
  assert.equal(store.get(LOCALE_STORAGE_KEY), 'en');
  assert.equal(resolveInitialLocale(mockStorage), 'en');

  assert.match(getRouteDocumentTitle('/', 'en'), /Brainroot/);
  assert.match(getRouteDocumentTitle('/games/fact-act/play', 'en'), /Truth or Dare/);
  assert.notEqual(getSiteMetaDescription('vi'), getSiteMetaDescription('en'));

  const combinedPublicCopy = JSON.stringify({
    headerEn: getHeaderCopy('en'),
    heroEn: getHeroCopy('en'),
    footerEn: getFooterCopy('en'),
    aboutEn: getAboutPageCopy('en'),
    todVi: getTruthOrDareUiCopy('vi'),
    todEn: getTruthOrDareUiCopy('en'),
  });

  const forbidden = [/Brainroot 2\.0/i, /\bBR-T\d+\b/, /\bOQ-\d+\b/, /\bVIS-\d+\b/, /\bFact–Act\b/];
  for (const pattern of forbidden) {
    assert.doesNotMatch(combinedPublicCopy, pattern);
  }
});

test('BR-T026: reshuffling mid-turn returns the drawn card to the deck instead of consuming it', () => {
  let state = createInitialTruthOrDareState();
  state = finishShuffle(startAndShuffleSession(state, FIXED_RNG));
  const total = state.remainingIds.length;
  state = chooseSideBeforeDraw(state, 'dare');
  const cardId = state.currentCardId;
  assert.ok(cardId);
  assert.equal(state.remainingIds.length, total - 1);

  state = reshuffleRemainingDeck(state, FIXED_RNG);
  assert.equal(state.currentCardId, null);
  assert.equal(state.remainingIds.length, total);
  assert.ok(state.remainingIds.includes(cardId as string));
  assert.ok(!state.drawnIds.includes(cardId as string));
  assert.equal(new Set(state.remainingIds).size, total);
});

test('BR-T026: reshuffling while holding the LAST card returns only that card, never resets the 20-card deck', () => {
  let state = finishShuffle(startAndShuffleSession(createInitialTruthOrDareState(), FIXED_RNG));
  const total = state.remainingIds.length;
  // Play through until exactly one card is left, then pick it.
  for (let i = 0; i < total - 1; i += 1) {
    state = chooseSideBeforeDraw(state, 'dare');
    state = flipSelectedCard(finishPullCard(startPullCard(state)));
    state = finishShuffle({ ...completeCurrentTurn(state), phase: 'shuffling' });
  }
  assert.equal(state.remainingIds.length, 1);
  state = chooseSideBeforeDraw(state, 'dare');
  const lastId = state.currentCardId;
  assert.ok(lastId);
  assert.equal(state.remainingIds.length, 0);
  const drawnBefore = state.drawnIds.length;

  state = reshuffleRemainingDeck(state, FIXED_RNG);
  assert.deepEqual(state.remainingIds, [lastId]);
  assert.equal(state.drawnIds.length, drawnBefore - 1);
  assert.ok(!state.drawnIds.includes(lastId as string));
  assert.equal(state.currentCardId, null);
  assert.equal(state.phase, 'shuffling');
  // Nothing outside the single returned card came back into the deck.
  assert.equal(state.remainingIds.length + state.drawnIds.length, total);
});

test('BR-T028 rules: rulebook carries the 5-step official rule and no leftover "pending approval" copy', () => {
  const allCopy = JSON.stringify({
    spreads: RULEBOOK_SPREADS,
    faq: OFFLINE_FAQ_ENTRIES,
    vi: getTruthOrDareUiCopy('vi'),
    en: getTruthOrDareUiCopy('en'),
    refusalVi: answerBrainieFaq('xyz không liên quan 123', 'vi').text,
    refusalEn: answerBrainieFaq('xyz unrelated 123', 'en').text,
  });
  assert.doesNotMatch(allCopy, /chờ nhóm duyệt|pending team|awaiting|Khung nội dung/i);

  const spreadsText = JSON.stringify(RULEBOOK_SPREADS);
  for (const needle of ['BƯỚC 1', 'BƯỚC 2', 'BƯỚC 3', 'BƯỚC 4', 'BƯỚC 5', 'Green Penalty', 'Không được chọn Truth hai lượt liên tiếp']) {
    assert.ok(spreadsText.includes(needle), `rulebook missing: ${needle}`);
  }
  for (const spread of RULEBOOK_SPREADS) {
    for (const locale of ['vi', 'en'] as const) {
      const note = spread.right.footnote[locale];
      assert.match(note, /20\/63|20 of 63/);
      assert.doesNotMatch(note, /Trang \d|Pages? \d/i, 'no fabricated PDF page citations');
    }
  }
  for (const locale of ['vi', 'en'] as const) {
    assert.ok(getTruthOrDareUiCopy(locale).rulebookDraftNotice.length > 10);
  }
  const refusal = answerBrainieFaq('xyz không liên quan 123', 'vi');
  assert.equal(refusal.matched, false);
  assert.match(refusal.text, /Mình chưa có thông tin/);
});

test('BR-T028 content consistency: Truth or Dare pages no longer describe the old 3-situation trial', () => {
  const factAct = GREEN_PLAY_PRODUCTS.find((p) => p.id === 'fact-act');
  const copy = JSON.stringify({
    product: factAct,
    detail: FACT_ACT_DETAIL,
    en: getFactActDetailCopy('en'),
  });
  assert.doesNotMatch(copy, /3 tình huống|Tình huống → Hành động → Phản tư|tình huống ngắn|tình huống học đường|short-scenario|chờ nhóm duyệt/i);
  assert.match(copy, /20 trong 63|20 of the 63|20 of 63/);
});
