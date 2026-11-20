import { publicUrl } from '../../utils/publicUrl';
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../data/landing';
import { useI18n } from '../../i18n/I18nContext';
import { getHeaderCopy, getNavItems } from '../../i18n/siteCopy';
import { focusAnchorTarget } from '../../utils/focusAnchorTarget';
import { isHomeRoute, isNavItemActive } from '../../utils/routeNavigation';

interface SiteHeaderProps {
  readonly items?: readonly NavItem[];
  readonly variant?: 'overlay-hero' | 'solid-ivory';
}

export function SiteHeader({
  items,
  variant = 'overlay-hero',
}: SiteHeaderProps) {
  const { locale, setLocale } = useI18n();
  const resolvedItems = items ?? getNavItems(locale);
  const headerCopy = getHeaderCopy(locale);

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const onHome = isHomeRoute(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && headerRef.current && !headerRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSamePageAnchorClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    focusAnchorTarget(event);
    setMenuOpen(false);
  };

  const handleRouteClick = () => {
    setMenuOpen(false);
  };

  const langSwitch = (
    <div
      className="lang-switch"
      role="group"
      aria-label={headerCopy.languageSwitchAria}
      data-testid="global-lang-switch"
    >
      <button
        type="button"
        className={`lang-switch__btn${locale === 'vi' ? ' is-active' : ''}`}
        aria-pressed={locale === 'vi'}
        onClick={() => setLocale('vi')}
      >
        VI
      </button>
      <button
        type="button"
        className={`lang-switch__btn${locale === 'en' ? ' is-active' : ''}`}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );

  const headerContent = (
    <header
      className={`site-header${variant === 'solid-ivory' ? ' site-header--solid' : ''}`}
      ref={headerRef}
    >
      {onHome ? (
        <a
          className="brand"
          href="#top"
          aria-label={headerCopy.brandAria}
        >
          <img
            src={publicUrl('/assets/aistudio/brainie_1a0fca92.webp')}
            alt={headerCopy.brandLogoAlt}
            className="brand__mascot-img"
          />
          <span>
            brainroot<span className="brand__period">.</span>
          </span>
        </a>
      ) : (
        <Link
          className="brand"
          to="/"
          aria-label={headerCopy.brandAria}
          onClick={handleRouteClick}
        >
          <img
            src={publicUrl('/assets/aistudio/brainie_1a0fca92.webp')}
            alt={headerCopy.brandLogoAlt}
            className="brand__mascot-img"
          />
          <span>
            brainroot<span className="brand__period">.</span>
          </span>
        </Link>
      )}

      <div className="site-header__actions">
        <div className="site-header__lang-mobile">{langSwitch}</div>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? headerCopy.closeMenu : headerCopy.openMenu}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={handleToggle}
        >
          <span className="nav-toggle__bar" aria-hidden="true" />
          <span className="nav-toggle__bar" aria-hidden="true" />
          <span className="nav-toggle__bar" aria-hidden="true" />
        </button>

        <nav
          className={`main-nav${menuOpen ? ' is-open' : ''}`}
          id="main-nav"
          aria-label={headerCopy.mainNavAria}
        >
          {resolvedItems.map((item) => {
            const isRouteLink = item.href.startsWith('/');
            const active = isNavItemActive(item.href, location.pathname);
            const linkClassName = `main-nav__link${active ? ' main-nav__link--active' : ''}`;

            if (isRouteLink) {
              return (
                <Link
                  key={item.href}
                  className={linkClassName}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={handleRouteClick}
                >
                  {item.label}
                </Link>
              );
            }

            if (onHome) {
              return (
                <a
                  key={item.href}
                  className={linkClassName}
                  href={item.href}
                  onClick={handleSamePageAnchorClick}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                className={linkClassName}
                to={`/${item.href}`}
                onClick={handleRouteClick}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="main-nav__lang-desktop">{langSwitch}</div>
        </nav>
      </div>
    </header>
  );

  if (variant === 'solid-ivory') {
    return <div className="site-header-bar">{headerContent}</div>;
  }

  return headerContent;
}
