export const DESKTOP_LAYOUT_WIDTH = 1280;

declare const __DESKTOP_ONLY__: boolean | undefined;
const desktopOnly = typeof __DESKTOP_ONLY__ === 'undefined' || __DESKTOP_ONLY__;

export function layoutViewportWidth(width: number): number {
  return desktopOnly ? Math.max(DESKTOP_LAYOUT_WIDTH, width) : width;
}

export function mobileMedia(query: string): string {
  return desktopOnly ? 'not all' : query;
}
