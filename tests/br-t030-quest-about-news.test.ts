/* eslint-disable no-control-regex -- regex kiểm tra ký tự điều khiển là chủ ý */
import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_BADGES, QUEST_CHALLENGES, QUEST_HASHTAG } from '../src/data/quests';
import {
  QUEST_BOARD_STORAGE_KEY,
  QUEST_NOTE_MAX,
  countDone,
  createEmptyBoard,
  earnedBadges,
  loadBoard,
  nextBadge,
  saveBoard,
  setChallengeDone,
  setChallengeNote,
} from '../src/features/quest/questBoard';
import fs from 'node:fs';
import path from 'node:path';
import * as aboutData from '../src/data/about';
import { PROJECT_NEWS, getPublishedNews } from '../src/data/news';

const NOW = '2026-11-21T00:00:00.000Z';

test('BR-T030 quest data: 12 challenges, no purchases/CO2 claims, hashtag kept', () => {
  assert.equal(QUEST_CHALLENGES.length, 12);
  assert.deepEqual(
    QUEST_CHALLENGES.map((c) => c.id),
    Array.from({ length: 12 }, (_, i) => `Q-${String(i + 1).padStart(2, '0')}`),
  );
  for (const c of QUEST_CHALLENGES) {
    assert.ok(['Play', 'Quest', 'Learn', 'Connect'].includes(c.theme));
    assert.ok(c.title.vi.length > 10 && c.title.en.length > 10);
    assert.ok(c.time.vi.length > 0 && c.time.en.length > 0);
  }
  const all = JSON.stringify(QUEST_CHALLENGES);
  assert.doesNotMatch(all, /CO₂|CO2|kg|mua |buy /i, 'no unsourced savings figures or purchases');
  assert.equal(QUEST_HASHTAG, '#songxanhcungBrainroot');
  assert.match(QUEST_CHALLENGES[11].title.vi, /#songxanhcungBrainroot/);
  assert.deepEqual(
    QUEST_BADGES.map((b) => [b.threshold, b.name.vi]),
    [[3, 'Mầm xanh'], [6, 'Rễ bén'], [12, 'Cây Brainroot']],
  );
});

test('BR-T030 quest board: done/undo, notes, badges at 3/6/12 and local persistence', () => {
  let board = createEmptyBoard();
  assert.equal(countDone(board), 0);
  assert.equal(nextBadge(board)?.id, 'seed');

  for (const c of QUEST_CHALLENGES.slice(0, 3)) board = setChallengeDone(board, c.id, true, NOW);
  assert.equal(countDone(board), 3);
  assert.deepEqual(earnedBadges(board).map((b) => b.id), ['seed']);
  board = setChallengeDone(board, 'Q-03', false, NOW);
  assert.equal(earnedBadges(board).length, 0);

  for (const c of QUEST_CHALLENGES) board = setChallengeDone(board, c.id, true, NOW);
  assert.deepEqual(earnedBadges(board).map((b) => b.id), ['seed', 'root', 'tree']);
  assert.equal(nextBadge(board), null);

  // Unknown ids are ignored; notes are capped
  assert.equal(setChallengeDone(board, 'Q-99', true, NOW), board);
  const noted = setChallengeNote(board, 'Q-01', 'x'.repeat(QUEST_NOTE_MAX + 50), NOW);
  assert.equal(noted['Q-01'].note.length, QUEST_NOTE_MAX);
  assert.equal(noted['Q-01'].done, true);

  const store = new Map<string, string>();
  const mock = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  saveBoard(noted, mock);
  assert.ok(store.has(QUEST_BOARD_STORAGE_KEY));
  assert.deepEqual(loadBoard(mock), noted);
  saveBoard(createEmptyBoard(), mock);
  assert.equal(store.has(QUEST_BOARD_STORAGE_KEY), false);

  // Corrupt storage falls back safely
  store.set(QUEST_BOARD_STORAGE_KEY, '{not json');
  assert.deepEqual(loadBoard(mock), {});
});

// The V3 layout checks (hero tagline, trail scenes, invite CTA, footnote) were retired when /about moved to the
// owner-approved V4.3 design (BR-T031, see tests/br-t031-about-v43.test.ts). The governance rules still hold.
test('BR-T030 about governance: no report-style content on /about (layout now V4.3)', () => {
  const aboutJson = JSON.stringify(aboutData);
  const pageSource = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

  // Removed: survey, team, roadmap, news, NGO/ESG, coming soon, contact, old blocks
  assert.doesNotMatch(aboutJson, /n=200|97%|khảo sát|survey|Phan Minh Huyền|Giai đoạn|Sắp có|coming soon|Tin dự án|Liên hệ/i);
  // Acronyms as whole words only ("ngoài trời" is ordinary Vietnamese, not "NGO").
  assert.doesNotMatch(aboutJson, /(NGO|ESG|CSR)/);
  assert.doesNotMatch(pageSource, /news|Tin dự án|NEWS|ABOUT_CONTACT|mailto/);
  for (const removed of ['ABOUT_SURVEY', 'ABOUT_TEAM', 'ABOUT_ROADMAP', 'ABOUT_PRODUCTS', 'ABOUT_WHAT_IS', 'ABOUT_TRANSPARENCY']) {
    assert.equal(removed in aboutData, false, removed);
  }
  for (const a of Object.values(aboutData.ABOUT_ASSETS)) {
    assert.ok(fs.existsSync(path.join('public', a.replace(/^\/+/, ''))), `missing asset ${a}`);
  }

  // The dossier keeps the moved data with the mandatory disclosure
  const dossier = fs.readFileSync('docs/HACKATHON_DOSSIER.md', 'utf8');
  assert.match(dossier, /n=200.*chưa phải nghiên cứu độc lập/);
  assert.match(dossier, /Phan Minh Huyền/);
});

test('BR-T030 news data: kept as drafts only, never rendered on /about', () => {
  assert.deepEqual(getPublishedNews(), []);
  assert.deepEqual(PROJECT_NEWS.map((n) => n.id), ['N-01', 'N-02', 'N-03']);
  for (const n of PROJECT_NEWS) {
    assert.equal(n.status, 'draft');
    assert.equal(n.source.vi, 'Nhóm cung cấp');
    assert.deepEqual(n.images, []);
  }
  assert.doesNotMatch(JSON.stringify(PROJECT_NEWS), /100%|hội đồng chuyên gia|70%|doanh thu|toolkit|22–27/i);
});
