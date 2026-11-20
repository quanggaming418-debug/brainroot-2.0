import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HERO_CONTENT, NAV_ITEMS, type NavItem } from '../../data/landing';
import { focusAnchorTarget } from '../../utils/focusAnchorTarget';
import { isHomeRoute, isNavItemActive } from '../../utils/routeNavigation';

interface SiteHeaderProps {
  readonly items?: readonly NavItem[];
  readonly variant?: 'overlay-hero' | 'solid-ivory';
}

export function SiteHeader({
  items = NAV_ITEMS,
  variant = 'overlay-hero',
}: SiteHeaderProps) {
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

  const headerContent = (
    <header
      className={`site-header${variant === 'solid-ivory' ? ' site-header--solid' : ''}`}
      ref={headerRef}
    >
      {onHome ? (
        <a
          className="brand"
          href="#top"
          aria-label={HERO_CONTENT.brandAriaLabel}
        >
          <span className="brand__symbol" aria-hidden="true">
            ✳
          </span>
          <span>
            brainroot<span className="brand__period">.</span>
          </span>
        </a>
      ) : (
        <Link
          className="brand"
          to="/"
          aria-label={HERO_CONTENT.brandAriaLabel}
          onClick={handleRouteClick}
        >
          <span className="brand__symbol" aria-hidden="true">
            ✳
          </span>
          <span>
            brainroot<span className="brand__period">.</span>
          </span>
        </Link>
      )}

      <button
        ref={toggleRef}
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
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
        aria-label="Điều hướng chính"
      >
        {items.map((item) => {
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
      </nav>
    </header>
  );

  if (variant === 'solid-ivory') {
    return <div className="site-header-bar">{headerContent}</div>;
  }

  return headerContent;
}
