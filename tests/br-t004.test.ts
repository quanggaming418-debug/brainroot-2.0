import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FACT_ACT_DETAIL,
  GREEN_PLAY_PRODUCTS,
  O_AN_QUAN_CONCEPT_DISCLOSURE,
  O_AN_QUAN_DETAIL,
} from '../src/data/games';
import { ECOSYSTEM_AREAS, NAV_ITEMS } from '../src/data/landing';
import {
  NOT_FOUND_TITLE,
  SITE_BASE_TITLE,
  extractHashId,
  getRouteDocumentTitle,
  isGreenPlayRoute,
  isHomeRoute,
  isNavItemActive,
  normalizePathname,
  resolveRouteFocusAction,
} from '../src/utils/routeNavigation';

test('route title resolution handles /, /games, product detail pages, trailing slashes, and 404', () => {
  assert.equal(getRouteDocumentTitle('/'), SITE_BASE_TITLE);
  assert.equal(
    getRouteDocumentTitle('/games'),
    'Green Play — Thư viện trò chơi giáo dục | Brainroot',
  );
  assert.equal(
    getRouteDocumentTitle('/games/'),
    'Green Play — Thư viện trò chơi giáo dục | Brainroot',
  );
  assert.equal(
    getRouteDocumentTitle('/games/fact-act'),
    'Brainroot - Truth or Dare — Trò chơi thẻ bài kỹ năng xanh | Brainroot',
  );
  assert.equal(
    getRouteDocumentTitle('/games/o-an-quan-xanh'),
    'Brainroot - Ô ăn quan xanh — Trò chơi dân gian & kỹ năng xanh | Brainroot',
  );
  assert.equal(getRouteDocumentTitle('/khong-ton-tai'), NOT_FOUND_TITLE);
});

test('route helpers normalize pathnames and detect active Green Play navigation accurately', () => {
  assert.equal(normalizePathname(''), '/');
  assert.equal(normalizePathname('/games///'), '/games');
  assert.equal(isHomeRoute('/'), true);
  assert.equal(isHomeRoute('/games'), false);

  assert.equal(isGreenPlayRoute('/games'), true);
  assert.equal(isGreenPlayRoute('/games/fact-act'), true);
  assert.equal(isGreenPlayRoute('/games/o-an-quan-xanh'), true);
  assert.equal(isGreenPlayRoute('/'), false);

  assert.equal(isNavItemActive('/games', '/games'), true);
  assert.equal(isNavItemActive('/games', '/games/fact-act'), true);
  assert.equal(isNavItemActive('/games', '/'), false);
  assert.equal(isNavItemActive('#about', '/'), false);
});

test('route focus action preserves POP Back/Forward, focuses #hash anchors, and focuses #main-content on PUSH', () => {
  assert.equal(extractHashId('#worlds'), 'worlds');
  assert.equal(extractHashId('#'), null);
  assert.equal(extractHashId(''), null);

  assert.deepEqual(
    resolveRouteFocusAction({
      hash: '#about',
      navigationType: 'PUSH',
      isInitialMount: false,
    }),
    { type: 'focus-hash', targetId: 'about' },
  );

  assert.deepEqual(
    resolveRouteFocusAction({
      hash: '',
      navigationType: 'PUSH',
      isInitialMount: false,
    }),
    { type: 'focus-main-top' },
  );

  assert.deepEqual(
    resolveRouteFocusAction({
      hash: '',
      navigationType: 'POP',
      isInitialMount: false,
    }),
    { type: 'preserve-pop' },
  );

  assert.deepEqual(
    resolveRouteFocusAction({
      hash: '',
      navigationType: 'PUSH',
      isInitialMount: true,
    }),
    { type: 'preserve-pop' },
  );
});

test('Green Play navigation and ecosystem entry point wire directly to /games', () => {
  const gamesNav = NAV_ITEMS.find((item) => item.label === 'Trò chơi');
  assert.ok(gamesNav);
  assert.equal(gamesNav.href, '/games');

  const greenPlayArea = ECOSYSTEM_AREAS.find((area) => area.id === 'games');
  assert.ok(greenPlayArea);
  assert.equal(greenPlayArea.ctaTo, '/games');
});

test('Green Play product catalog preserves approved asset paths and required VIS-008 disclosure', () => {
  assert.equal(GREEN_PLAY_PRODUCTS.length, 2);

  const factAct = GREEN_PLAY_PRODUCTS.find((p) => p.id === 'fact-act');
  const oAnQuan = GREEN_PLAY_PRODUCTS.find((p) => p.id === 'o-an-quan-xanh');

  assert.ok(factAct);
  assert.ok(oAnQuan);

  assert.equal(factAct.slug, '/games/fact-act');
  assert.equal(factAct.media.desktopSrc, '/assets/hero-v4/fact-act-deck.webp');

  assert.equal(oAnQuan.slug, '/games/o-an-quan-xanh');
  assert.equal(
    oAnQuan.media.desktopSrc,
    '/assets/green-play/vis-008-o-an-quan-concept.webp',
  );
  assert.equal(
    oAnQuan.media.mobileSrc,
    '/assets/green-play/vis-008-o-an-quan-concept-sm.webp',
  );
  assert.equal(
    oAnQuan.media.disclosureCaption,
    'Minh họa khái niệm — luật bản số đang chuẩn hóa.',
  );
  assert.equal(
    O_AN_QUAN_DETAIL.disclosure,
    O_AN_QUAN_CONCEPT_DISCLOSURE,
  );
});

test('Brainroot - Truth or Dare detail presents the 5-step rule honestly and links to web preview', () => {
  assert.equal(FACT_ACT_DETAIL.title, 'Brainroot - Truth or Dare');
  assert.deepEqual(
    FACT_ACT_DETAIL.learningSteps.map((s) => s.code),
    ['CHỌN NGƯỜI', 'TRUTH / DARE', 'BỐC & LÀM', 'GREEN PENALTY', 'CHƠI TIẾP'],
  );
  assert.equal(FACT_ACT_DETAIL.comparisonColumns.length, 2);
  assert.equal(FACT_ACT_DETAIL.trialCtaTo, '/games/fact-act/play');
  assert.equal(FACT_ACT_DETAIL.unavailableNotice.primaryActionTo, '/games/fact-act/play');
  assert.equal(FACT_ACT_DETAIL.unavailableNotice.secondaryActionTo, '/games');
});

test('Brainroot - O an quan xanh detail documents exact 5 topics, 3 levels, and clearly labeled fullscreen 3D link', () => {
  assert.equal(O_AN_QUAN_DETAIL.title, 'Brainroot - Ô ăn quan xanh');
  assert.deepEqual(
    O_AN_QUAN_DETAIL.topics.map((topic) => topic.title),
    [
      'Tiêu dùng bền vững',
      'Nước',
      'Năng lượng',
      'Rác thải',
      'Không gian xanh',
    ],
  );

  assert.deepEqual(
    O_AN_QUAN_DETAIL.levels.map((level) => level.title),
    ['Nhận biết', 'Ra quyết định', 'Giải quyết vấn đề'],
  );

  assert.equal(O_AN_QUAN_DETAIL.sandboxNotice.href, '/?preview=oanquan3d');
  assert.match(O_AN_QUAN_DETAIL.sandboxNotice.heading, /bàn gỗ 3D/i);
  assert.match(
    O_AN_QUAN_DETAIL.sandboxNotice.heading,
    /chưa phải bản chơi chính thức/i,
  );
});
