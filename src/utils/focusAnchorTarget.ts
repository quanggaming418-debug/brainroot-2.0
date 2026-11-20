import type { MouseEvent } from 'react';

export function focusAnchorTarget(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return;
  }

  // Let the native anchor handle scrolling and browser history.
  const id = event.currentTarget.hash.slice(1);
  document.getElementById(id)?.focus({ preventScroll: true });
}
