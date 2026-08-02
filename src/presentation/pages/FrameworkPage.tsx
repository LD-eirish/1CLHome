import { useEffect, useState } from 'react';
import { FrameworkService } from '../../business/services/FrameworkService';
import { FrameworkRenderer } from '../components/FrameworkRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { EditorialPageLayout } from '../components/EditorialPageLayout';

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

        // Insert section dividers between sections
        setContent(sections.join('<hr class="section-divider" />'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadFramework();
  }, []);

  return (
    <EditorialPageLayout
      subtitle="Official command & operations framework"
      kicker="Governance"
      title="Official Framework"
      lead="Command structure, operational guidelines, and organization of the 1st Combined Legion."
      breadcrumbs={[{ label: 'Hub', to: '/hub' }, { label: 'Framework' }]}
      className="framework-editorial-page"
    >
      {!loading && !error && <TableOfContents contentId="framework-content" />}
      <div id="framework-content">
        {loading && <div className="loading">Loading framework...</div>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>

      {!loading && !error && (
        <div className="page-export" style={{textAlign: 'center', marginTop: '3rem', padding: '2rem 0'}}>
          <button id="exportFw" className="no-export export-btn" style={{fontSize: '0.95rem'}}>
            Download as Image
          </button>
        </div>
      )}
    </EditorialPageLayout>
  );
}
