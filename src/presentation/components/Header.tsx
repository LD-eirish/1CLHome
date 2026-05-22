import { Link } from 'react-router-dom';
import { assetPath } from '../../infrastructure/utils/asset.utils';

interface HeaderProps {
  readonly subtitle?: string;
}

export function Header({ subtitle = 'Welcome — 1CL Hub' }: Readonly<HeaderProps>) {
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
        <nav className="header-actions" aria-label="Main navigation">
          <Link to="/central-group" className="compact-nav-item">Members</Link>
          <Link to="/central-group-info" className="compact-nav-item">Central Group</Link>
          <Link to="/newspaper" className="compact-nav-item">Newspaper</Link>
          <Link to="/bot-documentation" className="compact-nav-item">Bot Documentation</Link>
        </nav>
      </div>
    </header>
  );
}
