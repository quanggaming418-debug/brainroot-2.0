import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeParallaxOffset,
  getLayerTransform,
  PARALLAX_BASE_SCALE,
  shouldEnableParallax,
} from '../src/utils/parallax';
import {
  ABOUT_CONTENT,
  ECOSYSTEM_AREAS,
  ECOSYSTEM_SECTION,
  HERO_CONTENT,
  HERO_DEPTH_LAYERS,
  HERO_LEAVES,
  HERO_MASCOTS,
  NAV_ITEMS,
} from '../src/data/landing';

test('parallax eligibility respects mobile breakpoint and prefers-reduced-motion', () => {
  assert.equal(
    shouldEnableParallax({ viewportWidth: 1440, prefersReducedMotion: false }),
    true,
  );
  assert.equal(
    shouldEnableParallax({ viewportWidth: 721, prefersReducedMotion: false }),
    true,
  );
  assert.equal(
    shouldEnableParallax({ viewportWidth: 720, prefersReducedMotion: false }),
    false,
  );
  assert.equal(
    shouldEnableParallax({ viewportWidth: 390, prefersReducedMotion: false }),
    false,
  );
  assert.equal(
    shouldEnableParallax({ viewportWidth: 1440, prefersReducedMotion: true }),
    false,
  );
});

test('parallax displacement stays conservative (< 12px) and clamps negative/excessive scroll', () => {
  assert.equal(computeParallaxOffset(-50, 0.52), 0);
  assert.equal(computeParallaxOffset(0, 0.52), 0);

  const maxForegroundOffset = computeParallaxOffset(1200, 0.52);
  assert.ok(maxForegroundOffset > 0 && maxForegroundOffset < 12);

  const midOffset = computeParallaxOffset(200, 0.28);
  const skyOffset = computeParallaxOffset(200, 0.11);
  assert.ok(skyOffset < midOffset);

  const transform = getLayerTransform(200, 0.28);
  assert.equal(
    transform,
    `translate3d(0, ${midOffset}px, 0) scale(${PARALLAX_BASE_SCALE})`,
  );
});

test('ecosystem section contains all 4 required Brainroot introductory areas', () => {
  assert.equal(ECOSYSTEM_AREAS.length, 4);
  assert.deepEqual(
    ECOSYSTEM_AREAS.map((area) => area.title),
    ['Green Play', 'Green Quest', 'Green Learn', 'Green Connect'],
  );
});

test('all navigation links target valid routes or in-page section IDs', () => {
  const validTargets = new Set<string>([
    ECOSYSTEM_SECTION.id,
    ABOUT_CONTENT.id,
    ...ECOSYSTEM_AREAS.map((area) => area.id),
  ]);
  const validRoutes = new Set<string>([
    '/games',
    '/quest',
    '/learn',
    '/connect',
    '/about',
  ]);

  for (const item of NAV_ITEMS) {
    if (item.href.startsWith('/')) {
      assert.ok(
        validRoutes.has(item.href),
        `Unexpected navigation route: ${item.href}`,
      );
      continue;
    }

    assert.ok(item.href.startsWith('#'), `Expected anchor or route href, got ${item.href}`);
    const targetId = item.href.slice(1);
    assert.ok(validTargets.has(targetId), `Missing target section #${targetId}`);
  }
});

test('hero assets preserve official Brainie/Rootie and depth layer paths under /assets/hero-v4/', () => {
  assert.equal(HERO_CONTENT.primaryCtaHref, '#worlds');
  assert.equal(HERO_CONTENT.primaryCtaLabel, 'Khám phá thế giới Brainroot');
  assert.equal(HERO_CONTENT.slogan, 'From Brainrot to Brainroot');
  assert.equal(HERO_DEPTH_LAYERS.length, 3);
  assert.equal(HERO_MASCOTS.length, 2);
  assert.equal(HERO_LEAVES.length, 2);

  const allPaths = [
    HERO_CONTENT.fallbackSceneSrc,
    ...HERO_DEPTH_LAYERS.map((l) => l.src),
    ...HERO_MASCOTS.map((m) => m.src),
    ...HERO_LEAVES.map((l) => l.src),
  ];

  for (const assetPath of allPaths) {
    assert.ok(
      assetPath.startsWith('/assets/hero-v4/'),
      `Unexpected asset path: ${assetPath}`,
    );
  }
});
