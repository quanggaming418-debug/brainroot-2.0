export const SITE_BASE_TITLE = 'Brainroot | From Brainrot to Brainroot';

export const ROUTE_TITLES: Readonly<Record<string, string>> = {
  '/': SITE_BASE_TITLE,
  '/games': 'Green Play — Thư viện trò chơi giáo dục | Brainroot',
  '/games/fact-act':
    'Brainroot - Truth or Dare — Trò chơi thẻ bài kỹ năng xanh | Brainroot',
  '/games/fact-act/play':
    'Trải nghiệm thử Brainroot - Truth or Dare — Green Play | Brainroot',
  '/games/o-an-quan-xanh':
    'Brainroot - Ô ăn quan xanh — Trò chơi dân gian & kỹ năng xanh | Brainroot',
  '/quest': 'Green Quest — Thử thách xanh khởi đầu | Brainroot',
  '/learn': 'Green Learn — 5 chủ đề kỹ năng xanh | Brainroot',
  '/connect': 'Green Connect — Kết nối cộng đồng giáo dục | Brainroot',
  '/about': 'Về Brainroot — From Brainrot to Brainroot',
  '/screenshots': 'Ảnh chụp giao diện | Brainroot',
};

export const NOT_FOUND_TITLE = 'Không tìm thấy trang | Brainroot';

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

export function getRouteDocumentTitle(pathname: string): string {
  const normalized = normalizePathname(pathname);
  return ROUTE_TITLES[normalized] ?? NOT_FOUND_TITLE;
}

export function isHomeRoute(pathname: string): boolean {
  return normalizePathname(pathname) === '/';
}

export function isGreenPlayRoute(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return normalized === '/games' || normalized.startsWith('/games/');
}

export function isNavItemActive(itemHref: string, pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  if (itemHref === '/games') {
    return isGreenPlayRoute(normalized);
  }
  if (itemHref.startsWith('/')) {
    return normalized === normalizePathname(itemHref);
  }
  return false;
}

export function extractHashId(hash: string): string | null {
  if (!hash || hash === '#') {
    return null;
  }
  const cleaned = hash.startsWith('#') ? hash.slice(1) : hash;
  return cleaned.length > 0 ? cleaned : null;
}

export type RouteFocusAction =
  | { readonly type: 'focus-hash'; readonly targetId: string }
  | { readonly type: 'focus-main-top' }
  | { readonly type: 'preserve-pop' };

export function resolveRouteFocusAction(params: {
  readonly hash: string;
  readonly navigationType: 'POP' | 'PUSH' | 'REPLACE';
  readonly isInitialMount: boolean;
}): RouteFocusAction {
  const hashId = extractHashId(params.hash);
  if (hashId) {
    return { type: 'focus-hash', targetId: hashId };
  }
  if (params.navigationType === 'POP' || params.isInitialMount) {
    return { type: 'preserve-pop' };
  }
  return { type: 'focus-main-top' };
}
