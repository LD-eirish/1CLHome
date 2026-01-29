import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { FrameworkService } from '../../business/services/FrameworkService';
import type { ResolutionListItem } from '../../data/types/resolution.types';

export function LibraryPage() {
  const [resolutions, setResolutions] = useState<ResolutionListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedDoc = searchParams.get('doc');

  useEffect(() => {
    const loadResolutions = async () => {
      const service = new FrameworkService();
      await service.initialize();
      const list = service.getResolutionsList();
      setResolutions(list);
    };
    loadResolutions();
  }, []);

  const filteredResolutions = resolutions.filter(res =>
    res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header subtitle="1st Combined Legion Library" />
      
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="hub">Hub</Link></li>
          <li aria-current="page">Library</li>
        </ol>
      </nav>

      <div className="container">
        <section className="card" style={{marginTop: '1rem', marginBottom: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: '250px'}}>
              <h2 style={{marginBottom: '0.5rem', color: 'var(--gold)'}}>Document Library</h2>
              <p className="lead" style={{marginBottom: '1rem'}}>
                Browse all official 1CL documents.
              </p>
              <div style={{display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--muted)'}}>
                <div>
                  <strong style={{color: 'var(--gold)', fontSize: '1.5rem', display: 'block'}}>{resolutions.length}</strong>
                  <span>Total Documents</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="top-panel">
        <div className="top-inner container">
          <div className="left">
            <div className="search-controls">
              <input
                id="res-search"
                type="search"
                placeholder="Search documents..."
                aria-label="Search documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  id="clear-search"
                  className="clear-search-btn"
                  aria-label="Clear search"
                  title="Clear search"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
            <button
              id="toggle-resolutions"
              className="toggle-btn"
              aria-expanded={isExpanded}
              aria-controls="res-list"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="toggle-text">
                Documents (<span id="res-count">{resolutions.length}</span>)
              </span>
              <span className="toggle-icon" aria-hidden="true">
                {isExpanded ? '▼' : '▶'}
              </span>
            </button>
            {isExpanded && (
              <nav aria-label="Documents list">
                <ul id="res-list" className="res-nav-top">
                  {filteredResolutions.map((res) => (
                    <li key={res.id}>
                      <Link
                        to={`/resolution/${res.id}`}
                        className={selectedDoc === res.id ? 'active' : ''}
                        aria-current={selectedDoc === res.id ? 'page' : undefined}
                        title={res.summary}
                      >
                        {res.id}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      <main className="container main-area">
        <section className="viewer card">
            <div style={{padding: '3rem 2rem', textAlign: 'center'}}>
              <h3 style={{color: 'var(--muted)', marginBottom: '1rem'}}>No Document Selected</h3>
              <p className="lead" style={{color: 'var(--muted)', marginBottom: '2rem'}}>
                Select a document from the list above to view details
              </p>
            </div>
        </section>
      </main>
    </>
  );
}
