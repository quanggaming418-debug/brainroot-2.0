export function getPagesRestorePath(current: URL, base: string): string | null {
  if (current.pathname !== base) return null;
  const value = current.searchParams.get('__br_path');
  if (!value?.startsWith(base)) return null;

  const target = new URL(value, current.origin);
  if (
    target.origin !== current.origin ||
    !target.pathname.startsWith(base) ||
    target.pathname === base ||
    target.pathname === base + '404.html'
  ) return null;

  return target.pathname + target.search + target.hash;
}
