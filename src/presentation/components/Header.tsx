import { Link } from 'react-router-dom';
import { assetPath } from '../../infrastructure/utils/asset.utils';

interface HeaderProps {
  readonly subtitle?: string;
}

export function Header({ subtitle = 'Welcome — 1CL Hub & Library' }: Readonly<HeaderProps>) {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <Link to="hub" className="brand-link" aria-label="Return to Hub">
            <img src={assetPath('1CLLogo.png')} alt="1CL" className="brand-logo" />
          </Link>
          <div className="brand-text">
            <h1>1st Combined Legion</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <Link to="library" className="compact-nav-item">Library</Link>
          <Link to="/framework" className="compact-nav-item">Framework</Link>
          <Link to="/members" className="compact-nav-item">Members</Link>
        </div>
      </div>
    </header>
  );
}
