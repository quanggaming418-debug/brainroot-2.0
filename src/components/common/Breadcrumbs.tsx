import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { getBreadcrumbsUiCopy } from '../../i18n/siteCopy';

export interface BreadcrumbItem {
  readonly label: string;
  readonly to?: string;
}

interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { locale } = useI18n();
  const ui = getBreadcrumbsUiCopy(locale);

  return (
    <nav className="breadcrumbs" aria-label={ui.ariaLabel}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              ) : null}
              {!isLast && item.to ? (
                <Link className="breadcrumbs__link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs__current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
