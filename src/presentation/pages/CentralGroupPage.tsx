import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { RegimentRosterItem } from '../components/RegimentRosterItem';
import { RegimentModal } from '../components/RegimentModal';
import type { Regiment } from '../../data/types/regiment.types';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function CentralGroupPage() {
  const [regiments, setRegiments] = useState<Regiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegiment, setSelectedRegiment] = useState<Regiment | null>(null);

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
      <Header subtitle="Member Groups" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Member Groups' }]} />

      <main className="editorial-page central-group-page">
        <div className="editorial-page-shell">
          <section className="editorial-title-block">
            <p className="editorial-kicker">Member Groups</p>
            <h1 className="editorial-title">1CL Member Regiments</h1>
            <p className="editorial-lead">
              Regiments that opt into fuller integration: they participate in centralized HR/recruitment,
              contribute to shared logistics, and take on broader command responsibilities.
            </p>
            <hr className="editorial-divider" />
          </section>

          <section className="regiment-directory" aria-labelledby="regiment-directory-title">
            <div className="regiment-directory-header">
              <h3 id="regiment-directory-title">Regiment roster</h3>
              {!loading && !error && <p>{regiments.length} member regiments</p>}
            </div>
            <div className="regiment-roster" id="regiment-list">
            {loading && <div className="loading">Loading regiments...</div>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && regiments.map((regiment, index) => (
              <RegimentRosterItem
                key={regiment.abbreviation}
                regiment={regiment}
                index={index}
                onSelect={setSelectedRegiment}
              />
            ))}
            </div>
          </section>
        </div>
      </main>

      {selectedRegiment && (
        <RegimentModal 
          regiment={selectedRegiment} 
          onClose={() => setSelectedRegiment(null)} 
        />
      )}
    </>
  );
}
