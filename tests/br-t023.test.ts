import assert from 'node:assert/strict';
import test from 'node:test';
import { PITS, INITIAL_SANDBOX_COUNTS, sandboxMoveOneSeed, pitDisplayLabel } from '../src/features/oanquan/prototypeOnlyModel';

test('proposed visual board has two end pits and ten small pits', () => {
  assert.equal(PITS.length, 12);
  assert.equal(PITS.filter((p) => p.isQuan).length, 2);
  assert.equal(new Set(PITS.map((p) => p.id)).size, 12);
});

test('sandbox initial state is complete and immutable', () => {
  assert.equal(INITIAL_SANDBOX_COUNTS.length, 12);
  assert.ok(INITIAL_SANDBOX_COUNTS.every((count) => count >= 0));
  assert.equal(INITIAL_SANDBOX_COUNTS.reduce((a, b) => a + b, 0), 42);
});

test('sandbox move transfers exactly one pebble to the next pit', () => {
  const before = [...INITIAL_SANDBOX_COUNTS];
  const after = sandboxMoveOneSeed(before, 1);
  assert.equal(before[1], 4);
  assert.equal(after[1], 3);
  assert.equal(after[2], 5);
  assert.equal(after.reduce((a, b) => a + b, 0), 42);
  assert.notEqual(after, before);
});

test('sandbox rejects invalid selections and empty pits without changing state', () => {
  assert.equal(sandboxMoveOneSeed(INITIAL_SANDBOX_COUNTS, -1), INITIAL_SANDBOX_COUNTS);
  assert.equal(sandboxMoveOneSeed(INITIAL_SANDBOX_COUNTS, 12), INITIAL_SANDBOX_COUNTS);
  const empty = INITIAL_SANDBOX_COUNTS.map((n, i) => i === 0 ? 0 : n);
  assert.equal(sandboxMoveOneSeed(empty, 0), empty);
});

test('accessible pit label shows explicit sandbox count', () => {
  assert.match(pitDisplayLabel(PITS[0], 1), /Ô quan bên trái: 1 hạt minh họa/);
});
