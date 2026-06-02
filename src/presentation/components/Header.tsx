import { Link } from 'react-router-dom';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { useState } from 'react';

interface HeaderProps {
  readonly subtitle?: string;
}

export function Header({ subtitle = 'Welcome — 1CL Hub' }: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <Link to="/hub" className="brand-link" aria-label="Return to Hub">
            <img src={assetPath('1CLLogo.png')} alt="1CL" className="brand-logo" />
          </Link>
          <div className="brand-text">
            <h1>1st Combined Legion</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
        </div>

        <button
          className={`header-burger ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="burger-box">
            <span className="burger-inner" />
          </span>
        </button>

        <nav id="main-navigation" className={`header-actions ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <Link to="/central-group" className="compact-nav-item" onClick={() => setMenuOpen(false)}>Member Groups</Link>
          <Link to="/central-group-info" className="compact-nav-item" onClick={() => setMenuOpen(false)}>Membership Info</Link>
          <Link to="/high-commanders" className="compact-nav-item" onClick={() => setMenuOpen(false)}>High Commanders</Link>
          <Link to="/newspaper" className="compact-nav-item" onClick={() => setMenuOpen(false)}>Newspaper</Link>
          <Link to="/bot-documentation" className="compact-nav-item" onClick={() => setMenuOpen(false)}>Bot Documentation</Link>
        </nav>
      </div>
    </header>
  );
}
