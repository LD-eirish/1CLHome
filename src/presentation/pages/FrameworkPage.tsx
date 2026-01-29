import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { FrameworkService } from '../../business/services/FrameworkService';
import { FrameworkRenderer } from '../components/FrameworkRenderer';
import { setupExportButton } from '../../infrastructure/utils/export.utils';
import { TableOfContents } from '../components/TableOfContents';

export function FrameworkPage() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFramework = async () => {
      try {
        const service = new FrameworkService();
        const success = await service.initialize();
        
        if (!success) {
          setError('Failed to load framework data.');
          return;
        }

        const framework = service.getFrameworkData();
        if (!framework) {
          setError('No framework data available.');
          return;
        }

        const sections: string[] = [];

        // Introduction
        if (framework.introduction) {
          sections.push(FrameworkRenderer.renderSection(framework.introduction));
        }

        // Membership & Structure
        if (framework.membership) {
          sections.push(FrameworkRenderer.renderComplexSection(framework.membership));
          const updates = service.getFrameworkUpdatesForSection('membership');
          sections.push(FrameworkRenderer.renderFrameworkUpdates(updates));
        }

        // Command Structure
        if (framework.governance) {
          sections.push(FrameworkRenderer.renderComplexSection(framework.governance));
          const updates = service.getFrameworkUpdatesForSection('governance');
          sections.push(FrameworkRenderer.renderFrameworkUpdates(updates));
        }

        // Officers
        if (framework.officers) {
          sections.push(FrameworkRenderer.renderListSection(framework.officers));
        }

        // Recruitment
        if (framework.recruitment) {
          sections.push(FrameworkRenderer.renderSection(framework.recruitment));
        }

        // Operations
        if (framework.operations) {
          sections.push(FrameworkRenderer.renderSection(framework.operations));
        }

        // Strategy
        if (framework.strategy) {
          sections.push(FrameworkRenderer.renderSection(framework.strategy));
        }

        // Communication
        if (framework.communication) {
          sections.push(FrameworkRenderer.renderSection(framework.communication));
        }

        // Amendments
        if (framework.amendments) {
          sections.push(FrameworkRenderer.renderSection(framework.amendments));
        }

        // Members
        if (framework.members) {
          sections.push(FrameworkRenderer.renderMembersSection(framework.members));
        }

        setContent(sections.join(''));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadFramework();
  }, []);

  useEffect(() => {
    // Setup export button handler after content is loaded
    if (loading || error || !content) return;
    return setupExportButton('exportFw', 'framework-content', '1CL-Framework.jpg');
  }, [loading, error, content]);

  return (
    <>
      <Header subtitle="Official command & operations framework" />
      
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
            <li><Link to="/hub">Hub</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li aria-current="page">Framework</li>
        </ol>
      </nav>

      <section className="hero card" style={{background: 'linear-gradient(135deg, rgba(201,168,79,0.08), rgba(201,168,79,0.02))'}}>
        <div className="hero-left">
          <h2 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Official Framework</h2>
          <p className="lead" style={{fontSize: '1.1rem', color: 'var(--text-secondary)'}}>
            Command structure, operational guidelines, and organization of the 1st Combined Legion.
          </p>
        </div>
        <div className="hero-right">
          <img src={assetPath('1CLLogo.png')} alt="1CL Logo" className="hero-logo" style={{opacity: 0.9}} />
        </div>
      </section>

      {!loading && !error && <TableOfContents contentId="framework-content" />}

      <main className="container" id="framework-content">
        {loading && <div className="loading">Loading framework...</div>}
        {error && <section className="card"><p className="error">{error}</p></section>}
        {!loading && !error && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </main>

      {!loading && !error && (
        <div className="container page-export" style={{textAlign: 'center', marginTop: '3rem', padding: '2rem 0'}}>
          <button id="exportFw" className="no-export export-btn" style={{fontSize: '0.95rem'}}>
            Download as Image
          </button>
        </div>
      )}
    </>
  );
}
