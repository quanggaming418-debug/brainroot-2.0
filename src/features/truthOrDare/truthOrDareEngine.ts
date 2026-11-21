import {
  GREEN_PENALTY_SLOTS,
  TRUTH_OR_DARE_DECK,
  type CardSide,
  type GreenPenaltySlot,
  type TruthOrDareCardPair,
} from './truthOrDareData';

export type TruthOrDarePhase =
  | 'arrival'
  | 'shuffling'
  | 'choosing'
  | 'ready_to_pull'
  | 'pulling'
  | 'ready_to_flip'
  | 'flipped'
  | 'wheel_ready'
  | 'wheel_spinning'
  | 'wheel_result'
  | 'session_done';

export interface TruthOrDareState {
  readonly phase: TruthOrDarePhase;
  readonly deck: readonly TruthOrDareCardPair[];
  readonly remainingIds: readonly string[];
  readonly drawnIds: readonly string[];
  readonly currentCardId: string | null;
  readonly selectedSide: CardSide | null;
  readonly lastChoice: CardSide | null;
  readonly wheelRotationDeg: number;
  readonly wheelTargetSectorIndex: number | null;
  readonly wheelRevealed: boolean;
  readonly shuffleCount: number;
}

export type RngFn = () => number;

export function shuffleIds(
  ids: readonly string[],
  rng: RngFn = Math.random,
): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

export function createInitialTruthOrDareState(
  deck: readonly TruthOrDareCardPair[] = TRUTH_OR_DARE_DECK,
): TruthOrDareState {
  return {
    phase: 'arrival',
    deck,
    remainingIds: deck.map((c) => c.pairId),
    drawnIds: [],
    currentCardId: null,
    selectedSide: null,
    lastChoice: null,
    wheelRotationDeg: 0,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
    shuffleCount: 0,
  };
}

/** Preview rule (pending team approval): player cannot pick Truth on two consecutive turns. */
export function canChooseTruth(state: TruthOrDareState): boolean {
  return state.lastChoice !== 'truth';
}

export function getActiveCard(
  state: TruthOrDareState,
): TruthOrDareCardPair | null {
  if (!state.currentCardId) return null;
  return state.deck.find((c) => c.pairId === state.currentCardId) ?? null;
}

export function getRevealedPenaltySlot(
  state: TruthOrDareState,
): GreenPenaltySlot | null {
  if (!state.wheelRevealed || state.wheelTargetSectorIndex === null) {
    return null;
  }
  return GREEN_PENALTY_SLOTS[state.wheelTargetSectorIndex] ?? null;
}

/**
 * Scene A -> Scene B: Pressing Play (Chơi) immediately shuffles a fresh non-repeating session deck.
 */
export function startAndShuffleSession(
  state: TruthOrDareState,
  rng: RngFn = Math.random,
): TruthOrDareState {
  const shuffled = shuffleIds(
    state.deck.map((c) => c.pairId),
    rng,
  );
  return {
    ...state,
    phase: 'shuffling',
    remainingIds: shuffled,
    drawnIds: [],
    currentCardId: null,
    selectedSide: null,
    lastChoice: null,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
    shuffleCount: state.shuffleCount + 1,
  };
}

/** Re-shuffle remaining cards mid-session without resetting drawn history. */
export function reshuffleRemainingDeck(
  state: TruthOrDareState,
  rng: RngFn = Math.random,
): TruthOrDareState {
  // Only restart the whole deck when nothing is left AND no card is in hand;
  // holding the last card must just return that card to the deck.
  if (state.remainingIds.length === 0 && state.currentCardId === null) {
    return startAndShuffleSession(state, rng);
  }
  // A card already drawn for the current turn but not yet completed goes back
  // into the deck, so re-shuffling mid-turn never silently consumes it.
  const returnedIds =
    state.currentCardId !== null
      ? [...state.remainingIds, state.currentCardId]
      : state.remainingIds;
  return {
    ...state,
    phase: 'shuffling',
    remainingIds: shuffleIds(returnedIds, rng),
    drawnIds:
      state.currentCardId !== null
        ? state.drawnIds.filter((id) => id !== state.currentCardId)
        : state.drawnIds,
    currentCardId: null,
    selectedSide: null,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
    shuffleCount: state.shuffleCount + 1,
  };
}

/** Scene B -> Scene C: Shuffle settles, player must pick Truth or Dare before drawing. */
export function finishShuffle(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'shuffling') return state;
  return {
    ...state,
    phase: state.remainingIds.length > 0 ? 'choosing' : 'session_done',
  };
}

/**
 * Scene C -> Scene D (ready_to_pull):
 * Player chooses Truth (Brainie) or Dare (Rootie) BEFORE pulling.
 * Strictly rejects consecutive Truth turns.
 */
export function chooseSideBeforeDraw(
  state: TruthOrDareState,
  side: CardSide,
): TruthOrDareState {
  if (state.phase !== 'choosing') return state;
  if (side === 'truth' && !canChooseTruth(state)) {
    return state;
  }
  if (state.remainingIds.length === 0) {
    return { ...state, phase: 'session_done' };
  }

  const [nextCardId, ...restIds] = state.remainingIds;
  return {
    ...state,
    phase: 'ready_to_pull',
    remainingIds: restIds,
    drawnIds: [...state.drawnIds, nextCardId],
    currentCardId: nextCardId,
    selectedSide: side,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
  };
}

/** Scene D: Pull top card from deck toward center stage. */
export function startPullCard(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'ready_to_pull') return state;
  return {
    ...state,
    phase: 'pulling',
  };
}

export function finishPullCard(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'pulling') return state;
  return {
    ...state,
    phase: 'ready_to_flip',
  };
}

/** Scene E: Digital 2-face flip revealing ONLY the selected face. */
export function flipSelectedCard(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'ready_to_flip' && state.phase !== 'ready_to_pull') {
    return state;
  }
  return {
    ...state,
    phase: 'flipped',
  };
}

/** Scene F -> Scene G: Mark turn Done (Xong) and advance cleanly. */
export function completeCurrentTurn(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'flipped' || !state.selectedSide) return state;
  const nextLastChoice = state.selectedSide;
  const hasMore = state.remainingIds.length > 0;
  return {
    ...state,
    phase: hasMore ? 'choosing' : 'session_done',
    currentCardId: null,
    selectedSide: null,
    lastChoice: nextLastChoice,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
  };
}

/** Scene F: Skip card -> opens 15-? mystery Green Penalty wheel. */
export function skipToPenaltyWheel(state: TruthOrDareState): TruthOrDareState {
  if (state.phase !== 'flipped') return state;
  return {
    ...state,
    phase: 'wheel_ready',
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
  };
}

/**
 * Spin the 15-? mystery wheel.
 * Geometry of `mystery_wheel_15_questionmarks.svg`:
 * - 15 equal 24° sectors starting clockwise from 12 o'clock (0°).
 * - Sector i center sits at `i * 24 + 12` degrees clockwise from top.
 * - Rotating the wheel clockwise so `(finalDeg % 360) === (360 - (i * 24 + 12)) % 360`
 *   lands sector i squarely beneath the top pointer.
 * Result remains hidden (`wheelRevealed: false`) until `finishPenaltyWheelSpin`.
 */
export function spinPenaltyWheel(
  state: TruthOrDareState,
  rng: RngFn = Math.random,
): TruthOrDareState {
  if (state.phase !== 'wheel_ready') return state;

  const sectorCount = GREEN_PENALTY_SLOTS.length; // 15
  const sectorSpan = 360 / sectorCount; // 24°
  const targetIndex = Math.min(
    sectorCount - 1,
    Math.max(0, Math.floor(rng() * sectorCount)),
  );
  const sectorCenterDeg = targetIndex * sectorSpan + sectorSpan / 2;
  const desiredMod = (360 - sectorCenterDeg) % 360;

  const currentMod = ((state.wheelRotationDeg % 360) + 360) % 360;
  const deltaToTarget = (desiredMod - currentMod + 360) % 360;
  const fullSpins = 5 * 360; // Smooth 5 full rotations

  return {
    ...state,
    phase: 'wheel_spinning',
    wheelRotationDeg: state.wheelRotationDeg + fullSpins + deltaToTarget,
    wheelTargetSectorIndex: targetIndex,
    wheelRevealed: false,
  };
}

/** Reveal the landed Green Penalty slot ONLY after the spin completes. */
export function finishPenaltyWheelSpin(
  state: TruthOrDareState,
): TruthOrDareState {
  if (state.phase !== 'wheel_spinning') return state;
  return {
    ...state,
    phase: 'wheel_result',
    wheelRevealed: true,
  };
}

/** Advance to next turn after viewing penalty result OR exiting without penalty. */
export function advanceAfterWheel(state: TruthOrDareState): TruthOrDareState {
  if (
    state.phase !== 'wheel_ready' &&
    state.phase !== 'wheel_spinning' &&
    state.phase !== 'wheel_result'
  ) {
    return state;
  }
  const nextLastChoice = state.selectedSide ?? state.lastChoice;
  const hasMore = state.remainingIds.length > 0;
  return {
    ...state,
    phase: hasMore ? 'choosing' : 'session_done',
    currentCardId: null,
    selectedSide: null,
    lastChoice: nextLastChoice,
    wheelTargetSectorIndex: null,
    wheelRevealed: false,
  };
}

/** Non-punitive Stop (Dừng) available from any active phase back to Arrival. */
export function stopTruthOrDareSession(
  state: TruthOrDareState,
): TruthOrDareState {
  return createInitialTruthOrDareState(state.deck);
}
