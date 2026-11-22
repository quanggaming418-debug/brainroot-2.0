import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DestinationIllustration } from '../components/garden/GardenPrimitives';
import {
  QUEST_BADGES,
  QUEST_CHALLENGES,
  QUEST_HASHTAG,
  type QuestTheme,
} from '../data/quests';
import {
  QUEST_NOTE_MAX,
  countDone,
  earnedBadges,
  loadBoard,
  nextBadge,
  saveBoard,
  setChallengeDone,
  setChallengeNote,
  type QuestBoardProgress,
} from '../features/quest/questBoard';
import { useI18n } from '../i18n/I18nContext';
import { getBreadcrumbsUiCopy } from '../i18n/siteCopy';

const THEMES: readonly ('all' | QuestTheme)[] = ['all', 'Play', 'Quest', 'Learn', 'Connect'];

const COPY = {
  vi: {
    eyebrow: 'GREEN QUEST · 12 THỬ THÁCH XANH',
    title: 'Chọn một thử thách xanh và bắt đầu hôm nay',
    summary: `Làm một mình hoặc cùng bạn bè. Tự đánh dấu khi hoàn thành, kèm ghi chú nếu muốn. Chia sẻ (tùy chọn) với ${QUEST_HASHTAG}.`,
    themeAll: 'Tất cả',
    themeNames: { Play: 'Chơi', Quest: 'Thử thách', Learn: 'Học', Connect: 'Kết nối' },
    filterAria: 'Lọc theo nhóm thử thách',
    progress: (n: number, t: number) => `Đã hoàn thành ${n} / ${t} thử thách`,
    nextBadge: (name: string, left: number) => `Còn ${left} thử thách nữa để nhận huy hiệu “${name}”.`,
    allBadges: 'Bạn đã nhận đủ các huy hiệu — cảm ơn bạn đã sống xanh cùng Brainroot!',
    badgesHeading: 'Huy hiệu',
    badgeAt: (n: number) => `Hoàn thành ${n}`,
    badgeEarned: 'Đã nhận',
    badgeNote: 'Tên huy hiệu là gợi ý, nhóm sẽ chốt tên và hình.',
    time: 'Thời gian',
    markDone: 'Đánh dấu hoàn thành',
    undo: 'Bỏ đánh dấu',
    done: 'Đã hoàn thành',
    noteLabel: 'Ghi chú của bạn (tùy chọn, chỉ lưu trên trình duyệt này)',
    safety:
      'Thử thách nào cũng không yêu cầu mua hàng, đến nơi nguy hiểm hay chụp người khác khi chưa xin phép. Ảnh hoặc ghi chú chỉ là tùy chọn.',
    honesty:
      'Tiến độ chỉ lưu cục bộ trên trình duyệt này, do bạn tự ghi nhận — không cần đăng nhập, ảnh hay vị trí.',
    reset: 'Xóa tiến độ trên trình duyệt này',
    nextPrompt: 'Muốn kết hợp với trò chơi hoặc đọc sâu hơn?',
    nextPlay: 'Chơi Brainroot - Truth or Dare →',
    nextLearn: 'Đọc Green Learn',
    announceDone: (id: string) => `Đã đánh dấu hoàn thành ${id}.`,
    announceUndo: (id: string) => `Đã bỏ đánh dấu ${id}.`,
  },
  en: {
    eyebrow: 'GREEN QUEST · 12 GREEN CHALLENGES',
    title: 'Pick a green challenge and start today',
    summary: `Do it alone or with friends. Mark it done yourself, with a note if you like. Sharing is optional with ${QUEST_HASHTAG}.`,
    themeAll: 'All',
    themeNames: { Play: 'Play', Quest: 'Quest', Learn: 'Learn', Connect: 'Connect' },
    filterAria: 'Filter challenges by group',
    progress: (n: number, t: number) => `${n} of ${t} challenges completed`,
    nextBadge: (name: string, left: number) => `${left} more to earn the “${name}” badge.`,
    allBadges: 'You earned every badge — thank you for living green with Brainroot!',
    badgesHeading: 'Badges',
    badgeAt: (n: number) => `Complete ${n}`,
    badgeEarned: 'Earned',
    badgeNote: 'Badge names are suggestions; the team will finalize names and artwork.',
    time: 'Time',
    markDone: 'Mark as done',
    undo: 'Undo',
    done: 'Completed',
    noteLabel: 'Your note (optional, stored only in this browser)',
    safety:
      'No challenge asks you to buy anything, go somewhere unsafe, or photograph others without permission. Photos and notes are optional.',
    honesty:
      'Progress is stored only in this browser and self-reported — no sign-in, photos or location needed.',
    reset: 'Clear progress in this browser',
    nextPrompt: 'Want to combine it with a game or read more?',
    nextPlay: 'Play Brainroot - Truth or Dare →',
    nextLearn: 'Read Green Learn',
    announceDone: (id: string) => `${id} marked as done.`,
    announceUndo: (id: string) => `${id} unmarked.`,
  },
} as const;

export function GreenQuestPage() {
  const { locale } = useI18n();
  const copy = COPY[locale];
  const crumbs = getBreadcrumbsUiCopy(locale);

  const [board, setBoard] = useState<QuestBoardProgress>(() =>
    loadBoard(typeof window !== 'undefined' ? window.localStorage : undefined),
  );
  const [theme, setTheme] = useState<'all' | QuestTheme>('all');
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    saveBoard(board, typeof window !== 'undefined' ? window.localStorage : undefined);
  }, [board]);

  const doneCount = countDone(board);
  const total = QUEST_CHALLENGES.length;
  const earned = earnedBadges(board);
  const upcoming = nextBadge(board);
  const visible = QUEST_CHALLENGES.filter((c) => theme === 'all' || c.theme === theme);

  const toggle = (id: string, done: boolean) => {
    setBoard((prev) => setChallengeDone(prev, id, done, new Date().toISOString()));
    setAnnounce(done ? copy.announceDone(id) : copy.announceUndo(id));
  };

  return (
    <div className="gp-page world-page world-page--quest">
      <div className="gp-breadcrumb-bar">
        <Breadcrumbs
          items={[
            { label: crumbs.homeLabel, to: '/' },
            { label: 'Green Quest' },
          ]}
        />
      </div>

      <section className="world-hero" aria-labelledby="quest-page-title">
        <div className="gp-container world-hero__grid">
          <div className="world-hero__copy">
            <p className="gp-eyebrow">{copy.eyebrow}</p>
            <h1 className="gp-detail-hero__title" id="quest-page-title">
              {copy.title}
            </h1>
            <p className="gp-detail-hero__overview">{copy.summary}</p>
          </div>
          <div className="world-hero__vignette">
            <DestinationIllustration variant="quest" />
          </div>
        </div>
      </section>

      <section className="gp-section gp-section--tinted" aria-labelledby="quest-board-heading">
        <div className="gp-container quest-container">
          <div className="quest-summary" data-testid="quest-summary">
            <h2 className="quest-summary__heading" id="quest-board-heading">
              {copy.progress(doneCount, total)}
            </h2>
            <progress className="quest-summary__bar" max={total} value={doneCount} aria-label={copy.progress(doneCount, total)} />
            <p className="quest-summary__next">
              {upcoming
                ? copy.nextBadge(upcoming.name[locale], upcoming.threshold - doneCount)
                : copy.allBadges}
            </p>

            <h3 className="quest-badges__heading">{copy.badgesHeading}</h3>
            <ul className="quest-badges">
              {QUEST_BADGES.map((badge) => {
                const got = earned.some((b) => b.id === badge.id);
                return (
                  <li
                    key={badge.id}
                    className={`quest-badge${got ? ' is-earned' : ''}`}
                    data-testid={`quest-badge-${badge.id}`}
                  >
                    <strong>{badge.name[locale]}</strong>
                    <span>{got ? copy.badgeEarned : copy.badgeAt(badge.threshold)}</span>
                  </li>
                );
              })}
            </ul>
            <p className="quest-summary__note">{copy.badgeNote}</p>
          </div>

          <div className="quest-filter" role="group" aria-label={copy.filterAria}>
            {THEMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`oq-pill-tab${theme === t ? ' is-active' : ''}`}
                aria-pressed={theme === t}
                onClick={() => setTheme(t)}
              >
                {t === 'all' ? copy.themeAll : copy.themeNames[t]}
              </button>
            ))}
          </div>

          <ul className="quest-list">
            {visible.map((c) => {
              const entry = board[c.id];
              const isDone = entry?.done === true;
              return (
                <li
                  key={c.id}
                  className={`quest-item${isDone ? ' is-done' : ''}`}
                  data-testid={`quest-item-${c.id}`}
                >
                  <div className="quest-item__top">
                    <span className="trial-topic-pill">{copy.themeNames[c.theme]}</span>
                    <span className="quest-item__id">{c.id}</span>
                  </div>
                  <h3 className="quest-item__title" lang={locale}>
                    {c.title[locale]}
                  </h3>
                  <p className="quest-item__time">
                    {copy.time}: {c.time[locale]}
                  </p>
                  {c.cta ? (
                    <Link className="gp-text-link" to={c.cta.to}>
                      {c.cta.label[locale]}
                    </Link>
                  ) : null}

                  <label className="trial-textarea-label" htmlFor={`quest-note-${c.id}`}>
                    {copy.noteLabel}
                  </label>
                  <textarea
                    id={`quest-note-${c.id}`}
                    className="trial-textarea"
                    rows={2}
                    maxLength={QUEST_NOTE_MAX}
                    value={entry?.note ?? ''}
                    onChange={(e) =>
                      setBoard((prev) =>
                        setChallengeNote(prev, c.id, e.target.value, new Date().toISOString()),
                      )
                    }
                  />

                  <button
                    type="button"
                    className={`gp-button ${isDone ? 'gp-button--secondary' : 'gp-button--forest'}`}
                    data-testid={`quest-toggle-${c.id}`}
                    aria-pressed={isDone}
                    onClick={() => toggle(c.id, !isDone)}
                  >
                    {isDone ? `✓ ${copy.done} · ${copy.undo}` : copy.markDone}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="quest-live-msg" role="status" aria-live="polite">
            {announce}
          </p>

          <aside className="quest-honesty-note" aria-label="Safety and storage">
            <p>
              <strong>{copy.safety}</strong>
            </p>
            <p>{copy.honesty}</p>
            {doneCount > 0 || Object.keys(board).length > 0 ? (
              <button
                type="button"
                className="gp-button gp-button--secondary"
                onClick={() => setBoard({})}
              >
                {copy.reset}
              </button>
            ) : null}
          </aside>

          <div className="world-next-strip">
            <p>{copy.nextPrompt}</p>
            <div className="world-next-strip__links">
              <Link className="gp-button gp-button--secondary" to="/games/fact-act/play">
                {copy.nextPlay}
              </Link>
              <Link className="gp-text-link" to="/learn">
                {copy.nextLearn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
