import { Link } from 'react-router-dom';
import { navItems as defaultNavItems } from '../data';

const HIDE_NAV_PATHS = ['/micro', '/peripheral'];

export default function Header({ navItems: propNavItems, onTryOutClick }) {
  const raw = propNavItems?.length ? propNavItems : defaultNavItems;
  const navItems = raw.filter((item) => !HIDE_NAV_PATHS.includes(item.path));

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Bay area Evd Speed Skating
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          {onTryOutClick && (
            <button
              type="button"
              className="nav-link nav-link-cta"
              onClick={onTryOutClick}
            >
              Try out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
