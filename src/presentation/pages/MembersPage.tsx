import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { useEffect } from 'react';

export function MembersPage() {
  useEffect(() => {
    const hexagonButton = document.getElementById('hexagon-button');
    const modeToggles = document.querySelectorAll('.mode-toggle');
    let togglesVisible = false;

    const handleHexagonClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      togglesVisible = !togglesVisible;

      modeToggles.forEach((toggle) => {
        const btn = toggle as HTMLElement;
        if (togglesVisible) {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        } else {
          btn.style.opacity = '0';
          btn.style.pointerEvents = 'none';
        }
      });
    };

    const handleSchmemilToggle = () => {
      const badge = document.querySelector('.divider-badge') as HTMLElement;
      const toggle = document.getElementById('Schmemil-toggle') as HTMLElement;
      const isActive = badge?.classList.contains('Schmemil-mode');
      
      if (isActive) {
        badge?.classList.remove('Schmemil-mode');
        if (toggle) toggle.style.background = 'rgba(40,20,60,0.9)';
      } else {
        badge?.classList.add('Schmemil-mode');
        if (toggle) toggle.style.background = 'rgba(80,40,120,0.95)';
      }
    };

    const handleGogToggle = () => {
      const toggle = document.getElementById('Gog-toggle') as HTMLElement;
      const isActive = document.body.classList.contains('Gog-mode');
      
      if (isActive) {
        document.body.classList.remove('Gog-mode');
        if (toggle) toggle.style.background = 'rgba(40,20,60,0.9)';
      } else {
        document.body.classList.add('Gog-mode');
        if (toggle) toggle.style.background = 'rgba(80,40,120,0.95)';
      }
    };

    const handleDerpToggle = () => {
      const toggle = document.getElementById('Derp-toggle') as HTMLElement;
      const isActive = document.body.classList.contains('Derp-mode');
      
      if (isActive) {
        document.body.classList.remove('Derp-mode');
        if (toggle) toggle.style.background = 'rgba(40,20,60,0.9)';
      } else {
        document.body.classList.add('Derp-mode');
        if (toggle) toggle.style.background = 'rgba(80,40,120,0.95)';
      }
    };

    hexagonButton?.addEventListener('click', handleHexagonClick);
    document.getElementById('Schmemil-toggle')?.addEventListener('click', handleSchmemilToggle);
    document.getElementById('Gog-toggle')?.addEventListener('click', handleGogToggle);
    document.getElementById('Derp-toggle')?.addEventListener('click', handleDerpToggle);

    return () => {
      hexagonButton?.removeEventListener('click', handleHexagonClick);
      document.getElementById('Schmemil-toggle')?.removeEventListener('click', handleSchmemilToggle);
      document.getElementById('Gog-toggle')?.removeEventListener('click', handleGogToggle);
      document.getElementById('Derp-toggle')?.removeEventListener('click', handleDerpToggle);
    };
  }, []);

  return (
    <>
      <Header subtitle="1CL Groups & Member Regiments" />
      
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/hub">Hub</Link></li>
          <li aria-current="page">Members</li>
        </ol>
      </nav>

      <button 
        id="Schmemil-toggle" 
        className="mode-toggle hidden" 
        style={{position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(40,20,60,0.9)', border: 'none', color: '#b0b0b0', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', zIndex: 1000, transition: 'all 0.3s', opacity: 0, pointerEvents: 'none'}} 
        title="Toggle Schmemil Mode"
      >
        Schmemil Mode
      </button>
      <button 
        id="Gog-toggle" 
        className="mode-toggle hidden" 
        style={{position: 'fixed', bottom: '60px', right: '20px', background: 'rgba(40,20,60,0.9)', border: 'none', color: '#b0b0b0', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', zIndex: 1000, transition: 'all 0.3s', opacity: 0, pointerEvents: 'none'}} 
        title="Toggle Gog Mode"
      >
        Gog Mode
      </button>
      <button 
        id="Derp-toggle" 
        className="mode-toggle hidden" 
        style={{position: 'fixed', bottom: '100px', right: '20px', background: 'rgba(40,20,60,0.9)', border: 'none', color: '#b0b0b0', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', zIndex: 1000, transition: 'all 0.3s', opacity: 0, pointerEvents: 'none'}} 
        title="Toggle Derp Mode"
      >
        Derp Mode
      </button>

      <div className="faction-selector">
        <Link to="/central-group" className="faction-panel faction-central">
          <div className="faction-overlay"></div>
          <div className="faction-content">
            <div className="faction-icon">
              <img src={assetPath('1CLLogo.png')} alt="1CL Logo" style={{width: '140px', height: 'auto', filter: 'drop-shadow(0 4px 12px rgba(201,168,79,0.6))'}} />
            </div>
            <h2 className="faction-title">Legion Central Group</h2>
            <p className="faction-description">
              Deeper integration regiments with centralized HR, shared logistics, and broader command responsibilities.
            </p>
          </div>
        </Link>

        <div className="faction-divider">
          <div className="divider-line"></div>
          <div className="divider-badge" id="hexagon-button" style={{cursor: 'pointer'}} title="Click to reveal mode toggles">
            <div className="hexagon">
              <div className="hexagon-inner">
                <span className="badge-text">1CL</span>
              </div>
            </div>
          </div>
        </div>

        <Link to="/associate-group" className="faction-panel faction-associate">
          <div className="faction-overlay"></div>
          <div className="faction-content">
              <div className="faction-icon">
                <img src={assetPath('1CLALogo.png')} alt="1CLA Logo" style={{width: '140px', height: 'auto', filter: 'drop-shadow(0 4px 12px rgba(85,116,163,0.6))'}} />
              </div>
            <h2 className="faction-title">Legion Associate Group</h2>
            <p className="faction-description">
              Independent regiments coordinating on operations while maintaining greater autonomy.
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
