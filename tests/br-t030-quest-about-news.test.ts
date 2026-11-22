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

test('BR-T030 about V3: 5 story blocks, existing assets only, no report-style content', () => {
  const aboutJson = JSON.stringify(aboutData);
  const pageSource = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

  // Hero copy
  assert.equal(aboutData.ABOUT_HERO.title.vi, 'Chơi để hiểu. Hiểu để hành động.');
  assert.equal(aboutData.ABOUT_HERO.title.en, 'Play to understand. Understand to act.');
  assert.equal(aboutData.ABOUT_HERO.slogan, 'From Brainrot to Brainroot.');

  // Journey: 3 scenes, audience: exactly 3 groups
  assert.deepEqual(aboutData.ABOUT_JOURNEY.scenes.map((s) => s.id), ['explore', 'experience', 'act']);
  assert.equal(aboutData.ABOUT_AUDIENCE.groups.length, 3);
  assert.equal(aboutData.ABOUT_INVITE.primary.to, '/games');
  assert.equal(aboutData.ABOUT_INVITE.secondary.to, '/quest');

  // Removed: survey, team, roadmap, news, NGO/ESG, coming soon, contact, old blocks
  assert.doesNotMatch(aboutJson, /n=200|97%|khảo sát|survey|Phan Minh Huyền|Giai đoạn|NGO|ESG|CSR|Sắp có|coming soon|Tin dự án|Liên hệ/i);
  assert.doesNotMatch(pageSource, /news|Tin dự án|NEWS|ABOUT_CONTACT|mailto/);
  for (const removed of ['ABOUT_SURVEY', 'ABOUT_TEAM', 'ABOUT_ROADMAP', 'ABOUT_PRODUCTS', 'ABOUT_WHAT_IS', 'ABOUT_TRANSPARENCY']) {
    assert.equal(removed in aboutData, false, removed);
  }
  assert.match(aboutData.ABOUT_FOOTNOTE.vi, /Nội dung Learn lấy từ nguồn công khai/);
  assert.match(aboutData.ABOUT_FOOTNOTE.en, /Learn content comes from public sources/);

  // Every asset exists already in public/ (nothing new generated)
  const assets = [
    ...Object.values(aboutData.ABOUT_ASSETS),
    ...aboutData.ABOUT_JOURNEY.scenes.map((s) => s.image),
    ...aboutData.ABOUT_AUDIENCE.groups.map((g) => g.image),
  ];
  for (const a of assets) {
    assert.ok(fs.existsSync(path.join('public', a.replace(/^\/+/, ''))), `missing asset ${a}`);
  }
  // Alt text on all page images
  for (const scene of aboutData.ABOUT_JOURNEY.scenes) assert.ok(scene.alt.vi && scene.alt.en);
  for (const g of aboutData.ABOUT_AUDIENCE.groups) assert.ok(g.alt.vi && g.alt.en);

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
