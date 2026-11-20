import { Link } from 'react-router-dom';

interface EmptyUnavailableStateProps {
  readonly heading: string;
  readonly description: string;
  readonly statusTag?: string;
  readonly primaryActionLabel: string;
  readonly primaryActionTo: string;
  readonly secondaryActionLabel?: string;
  readonly secondaryActionTo?: string;
}

export function EmptyUnavailableState({
  heading,
  description,
  statusTag = 'TRẠNG THÁI CHƠI THỬ',
  primaryActionLabel,
  primaryActionTo,
  secondaryActionLabel,
  secondaryActionTo,
}: EmptyUnavailableStateProps) {
  return (
    <section
      className="unavailable-panel"
      aria-labelledby="unavailable-panel-heading"
    >
      <div className="unavailable-panel__content">
        <p className="unavailable-panel__eyebrow">{statusTag}</p>
        <h2
          className="unavailable-panel__heading"
          id="unavailable-panel-heading"
        >
          {heading}
        </h2>
        <p className="unavailable-panel__description">{description}</p>
      </div>
      <div className="unavailable-panel__actions">
        <Link className="gp-button gp-button--primary" to={primaryActionTo}>
          {primaryActionLabel}
        </Link>
        {secondaryActionLabel && secondaryActionTo ? (
          <Link className="gp-button gp-button--secondary" to={secondaryActionTo}>
            {secondaryActionLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
