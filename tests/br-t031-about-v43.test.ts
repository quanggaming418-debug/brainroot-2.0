import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ABOUT_ASSETS,
  ABOUT_AUDIENCE,
  ABOUT_DECK,
  ABOUT_HERO,
  ABOUT_LEARNING,
  ABOUT_STORY,
  type Bilingual,
} from '../src/data/about';
import {
  FRAGMENTS,
  STEP_ANCHORS,
  computeStoryFrame,
  quantizeProgress,
  stepFromProgress,
  storyGeometry,
} from '../src/features/about/storyTimeline';

const DESKTOP = storyGeometry(686, 520);
const PHONE = storyGeometry(343, 360);

function collectBilingual(value: unknown, out: Bilingual[] = []): Bilingual[] {
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if (typeof o.vi === 'string' && typeof o.en === 'string') out.push(o as unknown as Bilingual);
    else for (const v of Object.values(o)) collectBilingual(v, out);
  }
  return out;
}

test('BR-T031 about V4.3: approved headline, slogan and story message are kept verbatim', () => {
  assert.deepEqual(ABOUT_HERO.titleLines.vi, ['Một cuộc chơi,', 'nhiều góc nhìn mới.']);
  assert.equal(ABOUT_HERO.slogan, 'From Brainrot to Brainroot.');
  assert.equal(ABOUT_STORY.heading.vi, 'Giữa bao điều lướt qua mỗi ngày, có những điều đáng để giữ lại.');
  assert.deepEqual(ABOUT_STORY.steps.map((s) => s.label.vi), ['Lướt qua', 'Giữ lại', 'Khám phá sâu']);
  assert.deepEqual(ABOUT_LEARNING.scenes.map((s) => s.id), ['explore', 'experience', 'act']);
  assert.deepEqual(ABOUT_AUDIENCE.groups.map((g) => g.id), ['solo', 'group', 'community']);
});

test('BR-T031 about V4.3: every UI string has Vietnamese and English text', () => {
  const all = collectBilingual({ ABOUT_HERO, ABOUT_STORY, ABOUT_LEARNING, ABOUT_DECK, ABOUT_AUDIENCE });
  assert.ok(all.length > 40, `expected many bilingual strings, got ${all.length}`);
  for (const b of all) {
    assert.ok(b.vi.trim().length > 0 && b.en.trim().length > 0, JSON.stringify(b));
    assert.notEqual(b.vi, b.en, `untranslated: ${JSON.stringify(b)}`);
  }
  assert.equal(ABOUT_HERO.titleLines.en.length, 2);
});

test('BR-T031 phone step labels are short and contained in the full accessible label', () => {
  for (const s of ABOUT_STORY.steps) {
    for (const lang of ['vi', 'en'] as const) {
      assert.ok(s.short[lang].length <= 8, `${s.short[lang]} too long`);
      assert.ok(s.label[lang].startsWith(s.short[lang]), `"${s.label[lang]}" must contain "${s.short[lang]}" (label in name)`);
    }
  }
});

test('BR-T031 no unapproved content: no card questions, rules, numbers, CTA or report data', () => {
  const json = JSON.stringify({ ABOUT_HERO, ABOUT_STORY, ABOUT_LEARNING, ABOUT_DECK, ABOUT_AUDIENCE });
  assert.doesNotMatch(json, /\?(?!")|\d+\s?%|n=\d|khảo sát|survey|giải thưởng|award|Truth:|Dare:|luật chơi|rules?:/i);
  // The deck only shows two artworks cropped from the official render; no card text is rendered.
  const learnSrc = fs.readFileSync('src/features/about/AboutLearning.tsx', 'utf8');
  assert.doesNotMatch(learnSrc, /truthOrDareCards|APPROVED_PUBLIC_CARDS|question/);
  // No CTA / news / contact block on the page.
  const page = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');
  assert.doesNotMatch(page, /<Link|gp-button|news|mailto|ABOUT_INVITE/);
});

test('BR-T031 assets: all exist under public/, only the needed kit files were copied', () => {
  for (const a of Object.values(ABOUT_ASSETS)) {
    assert.ok(fs.existsSync(path.join('public', a.replace(/^\/+/, ''))), `missing ${a}`);
  }
  const copied = fs.readdirSync('public/assets/about-v4').sort();
  const used = Object.values(ABOUT_ASSETS)
    .filter((a) => a.startsWith('/assets/about-v4/'))
    .map((a) => a.split('/').pop())
    .sort();
  assert.deepEqual(copied, used, 'no unused or internal kit files in public/assets/about-v4');
  assert.ok(!copied.some((f) => /\.(md|zip|pdf|json)$/i.test(f)));
});

test('BR-T031 story timeline: steps advance 1→2→3 and anchors land on their step', () => {
  let last = 1;
  for (let i = 0; i <= 1000; i++) {
    const s = stepFromProgress(i / 1000);
    assert.ok(s >= last, 'steps never go backwards while p increases');
    last = s;
  }
  for (const n of [1, 2, 3] as const) assert.equal(stepFromProgress(STEP_ANCHORS[n]), n);
});

test('BR-T031 story timeline: same progress → same frame (scrolling back replays the same frames)', () => {
  for (const g of [DESKTOP, PHONE]) {
    const forward = Array.from({ length: 101 }, (_, i) => JSON.stringify(computeStoryFrame(i / 100, g)));
    const backward = Array.from({ length: 101 }, (_, i) => JSON.stringify(computeStoryFrame((100 - i) / 100, g))).reverse();
    assert.deepEqual(forward, backward);
  }
});

test('BR-T031 story timeline: the kept card moves continuously (no jumps)', () => {
  const pos = (t: string) => (t.match(/-?[\d.]+/g) ?? []).slice(0, 2).map(Number);
  for (const g of [DESKTOP, PHONE]) {
    let prev = pos(computeStoryFrame(0, g).keep);
    let max = 0;
    for (let i = 1; i <= 2000; i++) {
      const cur = pos(computeStoryFrame(i / 2000, g).keep);
      max = Math.max(max, Math.hypot(cur[0] - prev[0], cur[1] - prev[1]));
      prev = cur;
    }
    // 2000 steps over the whole track: a smooth path never moves more than a few px per step
    assert.ok(max < 3, `max jump ${max.toFixed(2)}px`);
  }
});

test('BR-T031 story timeline: start and end states, fragments, reduced-motion stills', () => {
  const start = computeStoryFrame(0, DESKTOP);
  const end = computeStoryFrame(1, DESKTOP);
  assert.equal(start.fragments.length, FRAGMENTS.length);
  assert.equal(start.leafOpacity, '0');
  assert.equal(start.frameOpacity, '0.000');
  assert.equal(end.leaf, 'rotateY(0.0deg)');
  assert.equal(end.frameOpacity, '1.000');
  assert.equal(end.captionClip, 'inset(0 0.0% 0 0)');
  for (const f of end.fragments) assert.ok(Number(f.opacity) < 0.2, 'background fades behind the journal');
  const stills = new Set(Array.from({ length: 101 }, (_, i) => quantizeProgress(i / 100)));
  assert.equal(stills.size, 3);
  // The open journal fits inside the phone stage width (no cropping of the spread).
  assert.ok(PHONE.pw * 2 <= PHONE.width, 'spread fits the phone stage');
  assert.ok(PHONE.pw >= PHONE.width * 0.49, 'journal is as large as the stage allows');
});

test('BR-T031 React lifecycle: listeners and animation frames are cleaned up', () => {
  for (const file of ['AboutStory.tsx', 'AboutHero.tsx', 'AboutLearning.tsx']) {
    const src = fs.readFileSync(path.join('src/features/about', file), 'utf8');
    const adds = (src.match(/addEventListener\(/g) ?? []).length;
    const removes = (src.match(/removeEventListener\(/g) ?? []).length;
    assert.equal(adds, removes, `${file}: every addEventListener has a removeEventListener`);
    if (/requestAnimationFrame\(/.test(src)) assert.match(src, /cancelAnimationFrame\(/, `${file} cancels rAF`);
  }
  const story = fs.readFileSync('src/features/about/AboutStory.tsx', 'utf8');
  assert.match(story, /observer\?\.disconnect\(\)/);
  assert.doesNotMatch(story, /preventDefault|wheel|touchmove/, 'no scroll-jacking');
});

test('BR-T031 styles: scoped, reduced-motion aware, sticky not broken by overflow hidden', () => {
  const css = fs.readFileSync('src/styles/about-v43.css', 'utf8');
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').match(/[^{}]+(?=\{)/g) ?? [];
  for (const sel of rules) {
    const s = sel.trim();
    if (!s || s.startsWith('@') || /^(from|to|\d+%)/.test(s)) continue;
    assert.ok(s.split(',').every((part) => part.trim().startsWith('.about-v43')), `unscoped selector: ${s}`);
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.about-v43 \{[^}]*overflow-x: clip/);
  assert.doesNotMatch(css, /\.about-v43 \{[^}]*overflow(-x)?: hidden/);
  const styles = fs.readFileSync('src/styles.css', 'utf8');
  assert.match(styles, /about-v43\.css/);
  assert.doesNotMatch(styles, /about-v3\.css/);
});
