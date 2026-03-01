import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navItems as defaultNavItems } from '../data';

const HIDE_NAV_PATHS = ['/micro', '/peripheral'];

export default function Header({ navItems: propNavItems, onTryOutClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const raw = propNavItems?.length ? propNavItems : defaultNavItems;
  const navItems = raw.filter((item) => !HIDE_NAV_PATHS.includes(item.path));

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`header ${menuOpen ? 'header-nav-open' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          Bay Area Evd Speed Skating
        </Link>
        <button
          type="button"
          className="header-hamburger"
          aria-label="打开菜单"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="header-hamburger-bar" />
          <span className="header-hamburger-bar" />
          <span className="header-hamburger-bar" />
        </button>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="nav-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          {onTryOutClick && (
            <button
              type="button"
              className="nav-link nav-link-cta"
              onClick={() => { closeMenu(); onTryOutClick?.(); }}
            >
              Try out
            </button>
          )}
        </nav>
      </div>
      <div
        className="nav-overlay"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <div className="nav-overlay-panel" onClick={(e) => e.stopPropagation()}>
          <nav className="nav nav-mobile">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="nav-link nav-link-mobile"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            {onTryOutClick && (
              <button
                type="button"
                className="nav-link nav-link-cta nav-link-mobile"
                onClick={() => { closeMenu(); onTryOutClick?.(); }}
              >
                Try out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
