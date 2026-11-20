import assert from 'node:assert/strict';
import test from 'node:test';
import { getPagesRestorePath } from '../src/utils/restorePagesLocation';

const origin = 'https://quanggaming418-debug.github.io';
const base = '/brainroot-2.0/';
const wrapped = (target: string) => new URL(
  base + '?' + new URLSearchParams({ __br_path: target }), origin,
);

test('Pages restores deep link with its original query and anchor', () => {
  const target = base + 'games/fact-act/play?topic=n%C6%B0%E1%BB%9Bc&step=1#main-content';
  assert.equal(getPagesRestorePath(wrapped(target), base), target);
});

test('Pages rejects cross-project paths and leaves ordinary preview URLs alone', () => {
  for (const target of ['//example.com/x', base + '../outside', base, base + '404.html']) {
    assert.equal(getPagesRestorePath(wrapped(target), base), null);
  }
  assert.equal(getPagesRestorePath(new URL(base + '?preview=oanquan3d', origin), base), null);
});
