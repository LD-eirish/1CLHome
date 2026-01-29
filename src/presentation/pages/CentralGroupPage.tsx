import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { RegimentCard } from '../components/RegimentCard';
import type { Regiment } from '../../data/types/regiment.types';

export function CentralGroupPage() {
  const [regiments, setRegiments] = useState<Regiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRegiments = async () => {
      try {
        const resp = await fetch((await import('../../infrastructure/utils/asset.utils')).assetPath('src/data/regiments.json'));
        if (!resp.ok) throw new Error('Failed to load regiments');
        const data: Regiment[] = await resp.json();
        setRegiments(data.filter(r => r.group === 'central'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load regiments');
      } finally {
        setLoading(false);
      }
    };
    loadRegiments();
  }, []);

  return (
    <>
      <Header subtitle="Partial integration regiments" />
      
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/hub">Hub</Link></li>
          <li><Link to="/members">Members</Link></li>
          <li aria-current="page">Central Group</li>
        </ol>
      </nav>

      <div className="page-actions">
        <Link to="/members" className="back-btn" aria-label="Back to Members">← Back to Members</Link>
      </div>

      <main className="container">
        <section className="hero card" style={{background: 'linear-gradient(135deg, rgba(201,168,79,0.05), rgba(201,168,79,0.02))'}}>
          <div className="hero-left">
            <h2>Legion Central Group (LCG)</h2>
            <p className="lead">
              Regiments that opt into fuller integration: they participate in centralized HR/recruitment, 
              contribute to shared logistics, and take on broader command responsibilities.
            </p>
          </div>
          <div className="hero-right">
            <img src={assetPath('1CLLogo.png')} alt="1CL Logo" className="hero-logo" style={{opacity: 0.8}} />
          </div>
        </section>

        <section className="card">
          <h3>Central Group Regiments</h3>
          <div className="regiment-grid" id="regiment-list">
            {loading && <div className="loading">Loading regiments...</div>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && regiments.map((regiment, index) => (
              <RegimentCard key={regiment.abbreviation} regiment={regiment} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
