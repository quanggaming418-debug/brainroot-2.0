import type { MouseEvent } from 'react';

interface PrimaryCTAProps {
  readonly label: string;
  readonly href: `#${string}`;
}

export function PrimaryCTA({ label, href }: PrimaryCTAProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (window.history.replaceState) {
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <a className="hero__cta" href={href} onClick={handleClick}>
      <span>{label}</span>
      <span className="hero__cta-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
