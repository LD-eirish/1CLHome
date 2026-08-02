import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { RegimentCard } from '../components/RegimentCard';
import { RegimentModal } from '../components/RegimentModal';
import type { Regiment } from '../../data/types/regiment.types';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function AssociateGroupPage() {
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
        setRegiments(data.filter(r => r.group === 'associate'));
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
      <Header subtitle="Independent coordination regiments" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Associate Group' }]} />

      <main className="editorial-page collection-page associate-group-page">
        <div className="editorial-page-shell">
          <section className="editorial-title-block">
            <p className="editorial-kicker">Independent Regiments</p>
            <h1 className="editorial-title">Associate Group (LAG)</h1>
            <p className="editorial-lead">
              Regiments that maintain greater independence: they coordinate on joint operations and strategic objectives
              but may decline centralized HR participation and retain lighter command duties.
            </p>
            <hr className="editorial-divider" />
          </section>

        <section className="regiment-directory">
          <h3>Associate Group Regiments</h3>
          <div className="regiment-grid associate-regiment-list" id="regiment-list">
            {loading && <div className="loading">Loading regiments...</div>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && regiments.map((regiment, index) => (
              <RegimentCard 
                key={regiment.abbreviation} 
                regiment={regiment} 
                index={index}
                onClick={() => setSelectedRegiment(regiment)}
                hideDetails={true}
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
