import { Link } from 'react-router-dom';
import { navItems as defaultNavItems } from '../data';

export default function Header({ navItems: propNavItems }) {
  const navItems = propNavItems?.length ? propNavItems : defaultNavItems;

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
        </nav>
      </div>
    </header>
  );
}
