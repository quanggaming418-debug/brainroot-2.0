import test from 'node:test';
import assert from 'node:assert/strict';
import {
  APPROVED_PUBLIC_CARDS,
  FACT_ACT_TRIAL_DISCLOSURE,
  INTERNAL_DEMO_FIXTURES,
  advanceFactToAction,
  advanceFeedbackToReflection,
  createInitialFactActState,
  getCurrentFactActCard,
  restartFactActTrial,
  selectFactActChoice,
  skipFactActReflection,
  startFactActTrial,
  submitFactActReflection,
  updateReflectionDraft,
} from '../src/features/factAct/factActModel';
import {
  GREEN_QUEST_LITE_CHALLENGE,
  completeGreenQuest,
  createInitialQuestProgress,
  resetGreenQuest,
  skipGreenQuest,
  startGreenQuest,
} from '../src/features/quest/greenQuestModel';
import { GREEN_LEARN_INTRO, GREEN_LEARN_TOPICS } from '../src/data/learn';
import { ABOUT_PAGE_CONTENT, GREEN_CONNECT_CONTENT } from '../src/data/connectAbout';
import {
  ABOUT_CONTENT,
  ECOSYSTEM_AREAS,
  FEATURED_GREEN_PLAY,
  FOOTER_CONTENT,
  LEARNING_JOURNEY_STAGES,
} from '../src/data/landing';
import {
  FACT_ACT_DETAIL,
  GREEN_PLAY_PRODUCTS,
  O_AN_QUAN_DETAIL,
  PHYGITAL_TRANSPARENCY,
} from '../src/data/games';
import { SANDBOX_RULESET } from '../src/features/oanquan/prototypeOnlyModel';
import {
  NOT_FOUND_TITLE,
  getRouteDocumentTitle,
  isNavItemActive,
} from '../src/utils/routeNavigation';

test('Fact-Act separates approved public deck (empty pending BR-T005) from internal demo fixtures', () => {
  assert.equal(APPROVED_PUBLIC_CARDS.length, 0);
  assert.ok(INTERNAL_DEMO_FIXTURES.length >= 3);

  for (const card of INTERNAL_DEMO_FIXTURES) {
    assert.equal(card.reviewStatus, 'internal_demo_fixture');
    assert.equal(card.publicTrialAllowed, false);
    assert.ok(card.choices.length >= 2);
    // Ensure zero fabricated external URLs
    assert.equal(/https?:\/\//i.test(card.prompt), false);
    assert.equal(/https?:\/\//i.test(card.sourceNote), false);
  }
});

test('Fact-Act finite state machine transitions cleanly through full loop and replay', () => {
  let state = createInitialFactActState();
  assert.equal(state.step, 'idle');
  assert.equal(state.deckMode, 'internal_demo_fixture');

  state = startFactActTrial(state);
  assert.equal(state.step, 'fact');
  assert.equal(state.currentIndex, 0);

  for (let i = 0; i < state.cards.length; i += 1) {
    const card = getCurrentFactActCard(state);
    assert.ok(card);
    assert.equal(state.step, 'fact');

    state = advanceFactToAction(state);
    assert.equal(state.step, 'action');

    state = selectFactActChoice(state, card.choices[0].id);
    assert.equal(state.step, 'feedback');
    assert.equal(state.selectedChoiceId, card.choices[0].id);

    state = advanceFeedbackToReflection(state);
    assert.equal(state.step, 'reflection');

    if (i === 0) {
      state = updateReflectionDraft(state, 'Mang bình nước cá nhân từ nhà.');
      state = submitFactActReflection(state);
    } else {
      state = skipFactActReflection(state);
    }
  }

  assert.equal(state.step, 'complete');
  assert.equal(state.completedRecords.length, INTERNAL_DEMO_FIXTURES.length);
  assert.equal(state.completedRecords[0].reflectionSkipped, false);
  assert.equal(state.completedRecords[0].reflectionNote, 'Mang bình nước cá nhân từ nhà.');
  assert.equal(state.completedRecords[1].reflectionSkipped, true);

  const replayed = restartFactActTrial(state);
  assert.equal(replayed.step, 'fact');
  assert.equal(replayed.currentIndex, 0);
  assert.equal(replayed.completedRecords.length, 0);
});

test('Green Quest Lite handles start, complete, skip, and reset cleanly', () => {
  const initial = createInitialQuestProgress();
  assert.equal(initial.status, 'not_started');
  assert.equal(initial.challengeId, GREEN_QUEST_LITE_CHALLENGE.id);

  const started = startGreenQuest(initial, '2026-11-20T09:00:00Z');
  assert.equal(started.status, 'in_progress');

  const completed = completeGreenQuest(
    started,
    '  Đã dùng bình cá nhân cả ngày học.  ',
    '2026-11-20T17:00:00Z',
  );
  assert.equal(completed.status, 'completed');
  assert.equal(completed.reflectionNote, 'Đã dùng bình cá nhân cả ngày học.');

  const skipped = skipGreenQuest(started, '2026-11-20T18:00:00Z');
  assert.equal(skipped.status, 'skipped');

  const reset = resetGreenQuest();
  assert.equal(reset.status, 'not_started');
  assert.equal(reset.reflectionNote, '');
});

test('Green Learn Lite covers all 5 verified topics with honest draft provenance and zero fabricated URLs', () => {
  assert.deepEqual(
    GREEN_LEARN_TOPICS.map((t) => t.topicTitle),
    [
      'Tiêu dùng bền vững',
      'Nước',
      'Năng lượng',
      'Rác thải',
      'Không gian xanh',
    ],
  );
  for (const topic of GREEN_LEARN_TOPICS) {
    assert.equal(topic.reviewStatus, 'draft_unapproved');
    assert.equal(/https?:\/\//i.test(topic.keyConcept), false);
    assert.equal(/https?:\/\//i.test(topic.provenanceNote), false);
  }
});

test('Connect and About pages contain zero fabricated emails or social URLs', () => {
  const combined = JSON.stringify({ GREEN_CONNECT_CONTENT, ABOUT_PAGE_CONTENT });
  assert.equal(/@[a-z0-9.-]+\.[a-z]{2,}/i.test(combined), false);
  assert.equal(/https?:\/\//i.test(combined), false);
});

test('O An Quan SANDBOX_RULESET clearly flags non-official status and preserves total seed conservation', () => {
  assert.equal(SANDBOX_RULESET.isOfficialRuleset, false);
  const startTotal = SANDBOX_RULESET.initialCounts.reduce((a, b) => a + b, 0);
  const res = SANDBOX_RULESET.applyAction(SANDBOX_RULESET.initialCounts, 1);
  assert.equal(res.moved, true);
  assert.equal(res.fromPitIndex, 1);
  assert.equal(res.toPitIndex, 2);
  assert.equal(
    res.counts.reduce((a, b) => a + b, 0),
    startTotal,
  );
});

test('All 10 unified R0 routes resolve accurate Vietnamese titles and active nav states', () => {
  assert.match(
    getRouteDocumentTitle('/games/fact-act/play'),
    /Brainroot - Truth or Dare/,
  );
  assert.match(getRouteDocumentTitle('/quest'), /Green Quest/);
  assert.match(getRouteDocumentTitle('/learn'), /Green Learn/);
  assert.match(getRouteDocumentTitle('/connect'), /Green Connect/);
  assert.match(getRouteDocumentTitle('/about'), /Về Brainroot/);
  assert.equal(getRouteDocumentTitle('/unknown-page'), NOT_FOUND_TITLE);

  assert.equal(isNavItemActive('/games', '/games/fact-act/play'), true);
  assert.equal(isNavItemActive('/quest', '/quest'), true);
  assert.equal(isNavItemActive('/learn', '/learn'), true);
  assert.equal(isNavItemActive('/connect', '/connect'), true);
  assert.equal(isNavItemActive('/about', '/about'), true);
  assert.equal(isNavItemActive('/quest', '/learn'), false);
});

test('Public copy exports contain zero internal task IDs, Brainroot 2.0, or internal jargon', () => {
  const skippedKeys = new Set([
    'id',
    'slug',
    'ctaTo',
    'secondaryCtaTo',
    'primaryActionTo',
    'secondaryActionTo',
    'trialCtaTo',
    'suggestedRouteTo',
    'href',
    'imageSrc',
    'desktopSrc',
    'mobileSrc',
    'sourceId',
    'reviewStatus',
    'variant',
    'statusTone',
    'mediaLayout',
    'emphasis',
  ]);

  const collected: string[] = [];
  const walk = (value: unknown, key?: string) => {
    if (key && skippedKeys.has(key)) return;
    if (typeof value === 'string') {
      collected.push(value);
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }
    if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        walk(v, k);
      }
    }
  };

  walk({
    ECOSYSTEM_AREAS,
    FEATURED_GREEN_PLAY,
    LEARNING_JOURNEY_STAGES,
    ABOUT_CONTENT,
    FOOTER_CONTENT,
    GREEN_PLAY_PRODUCTS,
    PHYGITAL_TRANSPARENCY,
    FACT_ACT_DETAIL,
    O_AN_QUAN_DETAIL,
    GREEN_LEARN_INTRO,
    GREEN_LEARN_TOPICS,
    GREEN_CONNECT_CONTENT,
    ABOUT_PAGE_CONTENT,
    FACT_ACT_TRIAL_DISCLOSURE,
  });
  collected.push(SANDBOX_RULESET.name);
  for (const card of INTERNAL_DEMO_FIXTURES) {
    collected.push(card.factHeading, card.prompt, card.actionPrompt, card.sourceNote, card.reflectionPrompt);
  }

  const publicStrings = collected.join('\n');

  const forbiddenPatterns = [
    /Brainroot 2\.0/i,
    /\bBR-T\d+\b/i,
    /\bOQ-\d+\b/i,
    /\bVIS-\d+\b/i,
    /\bR0\b/,
    /\bR1\b/,
    /\bLite\b/,
    /\bsandbox\b/i,
    /Fact[–-]Act/i,
    /mẫu nội bộ/i,
    /minh họa nội bộ/i,
    /khung nội bộ/i,
  ];

  for (const pattern of forbiddenPatterns) {
    assert.equal(
      pattern.test(publicStrings),
      false,
      `Found forbidden internal term matching ${pattern} in public copy`,
    );
  }
});

test('Footer and About page present public brand story without dev progress notices', () => {
  assert.equal(FOOTER_CONTENT.brandText, 'From Brainrot to Brainroot');
  assert.equal(
    FOOTER_CONTENT.missionShort,
    'Khám phá kỹ năng xanh qua trò chơi, kiến thức và những hành động nhỏ trong cuộc sống hằng ngày.',
  );
  assert.equal(FOOTER_CONTENT.copyrightText, '© 2026 Brainroot');
  assert.equal(
    FOOTER_CONTENT.bottomSlogan,
    'Học điều xanh, chơi điều hay, cùng nhau tạo thay đổi.',
  );

  assert.equal(ABOUT_PAGE_CONTENT.audienceHeading, 'Brainroot dành cho ai?');
  assert.deepEqual(
    ABOUT_PAGE_CONTENT.audienceCards.map((c) => c.title),
    [
      'Người yêu khám phá',
      'Lớp học cùng học, cùng chơi',
      'Cộng đồng cùng lan tỏa',
    ],
  );
  assert.equal(
    ABOUT_PAGE_CONTENT.startHeading,
    'Bắt đầu hành trình xanh cùng Brainroot',
  );
  assert.deepEqual(
    ABOUT_PAGE_CONTENT.startActions.map((a) => ({ label: a.label, to: a.to })),
    [
      { label: 'Khám phá trò chơi', to: '/games' },
      { label: 'Thử thách xanh', to: '/quest' },
      { label: 'Tìm hiểu kỹ năng xanh', to: '/learn' },
    ],
  );

  const brandTexts = JSON.stringify({
    FOOTER_CONTENT,
    ABOUT_CONTENT,
    ABOUT_PAGE_CONTENT,
  });
  const prohibitedBrandPhrases = [
    /Bối cảnh triển khai và đối tượng phục vụ/i,
    /Minh bạch trạng thái hoàn thiện/i,
    /Ưu tiên thử nghiệm tại ULIS/i,
    /Thí điểm ban đầu tại ULIS/i,
    /Không cần đăng nhập/i,
    /đang chờ công bố/i,
    /đang hoàn thiện/i,
    /đang kiểm duyệt/i,
    /đang chuẩn hóa/i,
    /bản quyền/i,
  ];
  for (const phrase of prohibitedBrandPhrases) {
    assert.equal(
      phrase.test(brandTexts),
      false,
      `Found prohibited project-progress phrase ${phrase} in brand/footer/about copy`,
    );
  }
});
