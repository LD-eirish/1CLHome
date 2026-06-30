import { useEffect, useState } from 'react';
import { HighCommanderCard } from '../../components/HighCommanderCard';
import type { HighCommanders } from '../../../data/types/highCommander.types';
import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Role of High Commander', href: '#role' },
  { label: 'High Commanders List', href: '#high-commanders-list' },
];

export function HighCommandersArticlePage() {
  const [highCommanders, setHighCommanders] = useState<HighCommanders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHighCommanders = async () => {
      try {
        const resp = await fetch((await import('../../../infrastructure/utils/asset.utils')).assetPath('src/data/high-commanders.json'));
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
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="High Commanders of 1CL"
      lead="A historical record of current and former High Commanders of the 1st Combined Legion."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: 'High Commanders of 1CL' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 2026"
    >
      <section className="wiki-section" id="overview">
        <h2 className="wiki-section-heading">Overview</h2>
        <p>
          This article documents both former and current High Commanders of 1CL and preserves their terms for reference.
        </p>
      </section>

      <section className="wiki-section" id="role">
        <h2 className="wiki-section-heading">Role of the High Commander</h2>
        <p>
          The High Commander of 1CL serves as the official leader of the federal coalition and is responsible for strategic direction across all regiments as well as external diplomacy.
        </p>
        <p>
          The High Commander is supported by the Commander Council, which includes leaders of each member regiment, and is elected by 1CL members for a term of one full Foxhole war.
        </p>
      </section>

      <section className="wiki-section" id="high-commanders-list">
        <h2 className="wiki-section-heading">High Commanders List</h2>
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
    </WikiArticleLayout>
  );
}
