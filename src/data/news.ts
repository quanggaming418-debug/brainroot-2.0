/**
 * Project news (BR-T030 revision). Source: BRAINROOT_ABOUT_NEWS_REVISION.md (team-provided info).
 *
 * GOVERNANCE:
 * - /about V3 no longer renders news at all (owner decision 2026-11-21); this file is kept as drafts for future use.
 * - Only `status: 'published'` items may ever be shown. Items without a confirmed date or approved photos stay `draft`.
 * - Photos with people need consent from everyone clearly visible; `images` stays empty until then.
 * - No unproven claims (no "100% conversion", no "expert council certified", no long-term targets, no revenue plans).
 * - Every item carries the label "Nhóm cung cấp" (team-provided).
 */

import type { Bilingual } from './about';

export interface NewsImage {
  readonly src: string;
  readonly alt: Bilingual;
}

export interface NewsItem {
  readonly id: string;
  readonly title: Bilingual;
  /** Human-readable date; undefined while unconfirmed. */
  readonly date?: Bilingual;
  readonly summary: Bilingual;
  readonly images: readonly NewsImage[];
  readonly source: Bilingual;
  readonly status: 'published' | 'draft';
}

const TEAM_PROVIDED: Bilingual = { vi: 'Nhóm cung cấp', en: 'Provided by the team' };

export const PROJECT_NEWS: readonly NewsItem[] = [
  {
    id: 'N-01',
    title: { vi: 'Thử nghiệm tại SETY Camp 2026', en: 'Trial at SETY Camp 2026' },
    // Date unconfirmed (the PDF shows 9/8/2026 in small print) — team to confirm; photos need consent.
    summary: {
      vi: 'Bộ bài Brainroot được mang đến trại hè SETY Camp 2026 để người chơi thật trải nghiệm.',
      en: 'The Brainroot deck was brought to the SETY Camp 2026 summer camp for real players to try.',
    },
    images: [],
    source: TEAM_PROVIDED,
    status: 'draft',
  },
  {
    id: 'N-02',
    title: {
      vi: 'Giới thiệu tại Ngày hội Sáng kiến thanh niên 2026',
      en: 'Presented at the Youth Initiatives Festival 2026',
    },
    // Date/location to be filled in by the team; photos need consent.
    summary: {
      vi: 'Brainroot giới thiệu bộ bài tại gian hàng của Ngày hội.',
      en: 'Brainroot presented the deck at its booth at the festival.',
    },
    images: [],
    source: TEAM_PROVIDED,
    status: 'draft',
  },
  {
    id: 'N-03',
    title: {
      vi: 'Brainroot tham dự ULIS Hackathon 2026 “Thắp lửa Khởi nghiệp Sáng tạo”',
      en: 'Brainroot joins ULIS Hackathon 2026 “Thắp lửa Khởi nghiệp Sáng tạo”',
    },
    date: { vi: 'Chung kết: 19–20/12/2026', en: 'Final: 19–20 Dec 2026' },
    summary: {
      vi: 'Brainroot tham dự Bảng B của ULIS Hackathon 2026. Chúng mình đang hoàn thiện website để nhiều bạn có thể chơi và học hơn.',
      en: 'Brainroot takes part in Track B of ULIS Hackathon 2026. We are polishing this website so more people can play and learn.',
    },
    images: [],
    source: TEAM_PROVIDED,
    status: 'draft',
  },
];

export const NEWS_HEADING: Bilingual = { vi: 'Tin dự án', en: 'Project news' };

export const NEWS_COMING_SOON: Bilingual = {
  vi: 'Sắp có thêm tin hoạt động.',
  en: 'More news coming soon.',
};

export function getPublishedNews(): readonly NewsItem[] {
  return PROJECT_NEWS.filter((n) => n.status === 'published');
}
