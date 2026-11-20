/** Prefix a project-relative path for both root and GitHub Pages builds. */
export function publicUrl(path: `/${string}`): string {
  const base = import.meta.env?.BASE_URL ?? '/';
  return base + path.slice(1);
}
