import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { FrameworkService } from '../../business/services/FrameworkService';
import { ResolutionRenderer } from '../components/ResolutionRenderer';
import { setupExportButton } from '../../infrastructure/utils/export.utils';

export function ResolutionViewPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResolution = async () => {
      if (!id) {
        setError('No resolution ID provided');
        setLoading(false);
        return;
      }

      try {
        const service = new FrameworkService();
        await service.initialize();
        const resolution = service.getResolutionById(id);
        
        if (!resolution) {
          setError(`Resolution ${id} not found`);
          return;
        }

        const html = ResolutionRenderer.renderResolution(resolution);
        setContent(html);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resolution');
      } finally {
        setLoading(false);
      }
    };

    loadResolution();
  }, [id]);

  useEffect(() => {
    // Setup export button handler after content is loaded
    if (!loading && !error && content && id) {
      return setupExportButton('exportMain', 'resolution-content', `resolution-${id}.jpg`);
    }
  }, [loading, error, content, id]);

  return (
    <>
      <Header subtitle="Resolution View" />
      
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/hub">Hub</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li aria-current="page">Resolution {id}</li>
        </ol>
      </nav>

      <div className="page-actions">
        <Link to="/library" className="back-btn" aria-label="Back to Library">← Back to Library</Link>
      </div>

      <main className="container" id="resolution-content">
        {loading && <div className="loading">Loading resolution...</div>}
        {error && (
          <section className="card">
            <p className="error">{error}</p>
            <Link to="/library">Return to Library</Link>
          </section>
        )}
        {!loading && !error && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </main>
    </>
  );
}
