interface ProductStatusLabelProps {
  readonly label: string;
  readonly tone?: 'peach' | 'sage' | 'neutral';
}

export function ProductStatusLabel({
  label,
  tone = 'sage',
}: ProductStatusLabelProps) {
  return (
    <p className={`status-label status-label--${tone}`}>
      <span className="status-label__marker" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}
