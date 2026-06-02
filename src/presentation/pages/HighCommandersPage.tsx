import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import type { HighCommanders } from '../../data/types/highCommander.types';
import { PageBreadcrumb } from '../components/PageBreadcrumb';
import { HighCommanderCard } from '../components/HighCommanderCard';

export function HighCommandersPage() {
  const [highCommanders, setHighCommanders] = useState<HighCommanders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHighCommanders = async () => {
      try {
        const resp = await fetch((await import('../../infrastructure/utils/asset.utils')).assetPath('src/data/high-commanders.json'));
        if (!resp.ok) throw new Error('Failed to load High Commanders');
        const data: HighCommanders[] = await resp.json();
        setHighCommanders(
          [...data].sort((left, right) => {
            return new Date(`${left.officeStart}T00:00:00`).getTime() - new Date(`${right.officeStart}T00:00:00`).getTime();
          })
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load High Commanders');
      } finally {
        setLoading(false);
      }
    };
    loadHighCommanders();
  }, []);

  return (
    <>
      <Header subtitle="Former and Current High Commanders of 1CL" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'High Commanders' }]} />

      <main className="container">
        <section className="hero card page-intro page-intro--split">
          <div className="page-intro-copy">
            <p className="page-intro-kicker">Former and Current High Commanders of 1CL</p>
            <h2 className="page-intro-title">High Commanders</h2>
            <p className="page-intro-lead">
              The High Commander of 1CL is the official Leader of the whole Federal Coalition, responsible for overall strategic direction across all regiments and outwards diplomacy. The High Commander is supported by the Commander Council, which includes the leaders of each regiment. The High Commander is elected by all 1CL Members for a term of one whole Foxhole war.
            </p>
          </div>
          <div className="page-intro-visual">
            <img src={assetPath('1CLLogo.png')} alt="1CL Logo" className="hero-logo" />
          </div>
        </section>

        <section className="card">
          <h3>High Commanders</h3>
          <div className="high-commander-list" id="hc-list">
            {loading && <div className="loading">Loading High Commanders...</div>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && highCommanders.map((highCommander, index) => (
              <HighCommanderCard 
                key={highCommander.name} 
                highCommander={highCommander}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
