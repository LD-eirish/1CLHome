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
          <Link to="/hub" className="brand-link" aria-label="Return to Hub">
            <img src={assetPath('1CLLogo.png')} alt="1CL" className="brand-logo" />
          </Link>
          <div className="brand-text">
            <h1>1st Combined Legion</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/framework" className="back-btn">Framework</Link>
          <Link to="/members" className="back-btn">Members</Link>
          <Link to="/central-group-info" className="back-btn">Central Group</Link>
          <Link to="/departments" className="back-btn">Departments</Link>
        </div>
      </div>
    </header>
  );
}
