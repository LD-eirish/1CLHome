import { useEffect, useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

interface NewspaperArticle {
  id: string;
  title: string;
  imageSrc: string;
  uploadedAt: string;
}

function toTimestamp(dateLabel: string): number {
  const ts = Date.parse(dateLabel);
  return Number.isNaN(ts) ? 0 : ts;
}

export function NewspaperPage() {
  const [articles, setArticles] = useState<NewspaperArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<NewspaperArticle | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(assetPath('src/data/newspaper/newspaper.json'));
        if (!response.ok) {
          throw new Error('Failed to load newspaper archive data.');
        }

        const data = (await response.json()) as NewspaperArticle[];
        if (!Array.isArray(data)) {
          throw new TypeError('Invalid newspaper archive format.');
        }

        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load newspaper archive.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const sortedArticles = useMemo(
    () => [...articles].sort((a, b) => toTimestamp(b.uploadedAt) - toTimestamp(a.uploadedAt)),
    [articles]
  );

  const openArticle = (article: NewspaperArticle) => {
    setSelected(article);
    setZoom(1);
  };

  const closeArticle = () => {
    setSelected(null);
    setZoom(1);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1));
  const resetZoom = () => setZoom(1);

  return (
    <>
      <Header subtitle="1CL Newspaper Archive" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: '1CL Newspaper' }]} />

      <main className="container">
        <section className="card newspaper-upload-card no-export">
          <h2>1CL Newspaper</h2>
          <p className="lead">1CL sponsored news from the Charlie Shard frontlines.</p>
        </section>

        <section className="newspaper-board" aria-label="Newspaper article board">
          {loading && (
            <article className="newspaper-empty card">
              <h3>Loading Archive</h3>
              <p className="lead">Fetching newspaper issues...</p>
            </article>
          )}

          {!loading && error && (
            <article className="newspaper-empty card">
              <h3>Archive Unavailable</h3>
              <p className="lead">{error}</p>
            </article>
          )}

          {!loading && !error && !sortedArticles.length && (
            <article className="newspaper-empty card">
              <h3>Press Board Empty</h3>
              <p className="lead">Add entries to <code>newspaper.json</code> to publish articles.</p>
            </article>
          )}

          {!loading && !error && sortedArticles.map((article, index) => (
            <article key={article.id} className={`newspaper-clipping clip-${index % 4}`}>
              <button
                type="button"
                className="newspaper-image-btn"
                onClick={() => openArticle(article)}
                aria-label={`Open article ${article.title}`}
              >
                <img src={article.imageSrc} alt={article.title} className="newspaper-image" loading="lazy" />
              </button>

              <div className="newspaper-meta">
                <p className="newspaper-title">{article.title}</p>
                <p className="newspaper-date">{article.uploadedAt}</p>
              </div>

            </article>
          ))}
        </section>
      </main>

      {selected && (
        <div className="newspaper-lightbox" role="dialog" aria-modal="true" onClick={closeArticle}>
          <div className="newspaper-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="newspaper-lightbox-toolbar">
              <div className="newspaper-zoom-controls" role="group" aria-label="Zoom controls">
                <button type="button" className="newspaper-zoom-btn" onClick={zoomOut} aria-label="Zoom out">−</button>
                <button type="button" className="newspaper-zoom-btn" onClick={resetZoom} aria-label="Reset zoom">{Math.round(zoom * 100)}%</button>
                <button type="button" className="newspaper-zoom-btn" onClick={zoomIn} aria-label="Zoom in">+</button>
              </div>
              <button type="button" className="newspaper-lightbox-close" onClick={closeArticle} aria-label="Close article">
                Close
              </button>
            </div>
            <div className="newspaper-lightbox-image-wrap">
              <img
                src={selected.imageSrc}
                alt={selected.title}
                className="newspaper-lightbox-image"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            <p className="newspaper-lightbox-title">{selected.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
