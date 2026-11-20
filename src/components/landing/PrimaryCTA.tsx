import { focusAnchorTarget } from '../../utils/focusAnchorTarget';

interface PrimaryCTAProps {
  readonly label: string;
  readonly href: `#${string}`;
}

export function PrimaryCTA({ label, href }: PrimaryCTAProps) {
  return (
    <a className="hero__cta" href={href} onClick={focusAnchorTarget}>
      <span>{label}</span>
      <span className="hero__cta-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
