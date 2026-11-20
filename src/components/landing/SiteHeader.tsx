import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { HERO_CONTENT, NAV_ITEMS, type NavItem } from '../../data/landing';
import { focusAnchorTarget } from '../../utils/focusAnchorTarget';

interface SiteHeaderProps {
  readonly items?: readonly NavItem[];
}

export function SiteHeader({ items = NAV_ITEMS }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  const handleNavClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    focusAnchorTarget(event);
    setMenuOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#top" aria-label={HERO_CONTENT.brandAriaLabel}>
        <span className="brand__symbol" aria-hidden="true">
          ✳
        </span>
        <span>
          brainroot<span className="brand__period">.</span>
        </span>
      </a>

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
        {items.map((item) => (
          <a
            key={item.href}
            className="main-nav__link"
            href={item.href}
            onClick={handleNavClick}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
