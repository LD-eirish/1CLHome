import { Link } from 'react-router-dom';
import '../styles/components.css';
import '../styles/documentation.css';
import { BotDocsLayout } from '../components/BotDocsLayout';

const CURRENT_BOT_VERSION = 'v0.9.1';
const DOCS_LAST_UPDATED = 'June 17, 2026';

const FEATURE_LINKS = [
  {
    title: 'Event Feature',
    path: '/bot-documentation/event-feature',
    summary: 'Event V2 creation, draft review, live publication, signups, reminders, sync, and closure.',
    status: 'Documented',
  },
  {
    title: 'War Counter Feature',
    path: '/bot-documentation/war-feature',
    summary: 'The war counter is an internal requirement for tracking statistics, such as request history, stockpiles, etc.',
    status: 'Doc in progress',
  },
];

export default function BotDocumentationPage() {
  return (
    <BotDocsLayout
      subtitle="eirish's Foxhole Assistant - Documentation"
      title="eirish's Foxhole Assistant"
      lead="eirish's Foxhole Assistant is a Discord bot for the Foxhole communities. It handles logistics requests, events, awards, role workflows, moderation tools, and smaller operational workflows."
      breadcrumbs={[{ label: 'Hub', to: '/hub' }, { label: 'Bot Documentation' }]}
      navItems={[
        { label: 'Overview', href: '#overview' },
        { label: 'Event Feature Docs', href: '/bot-documentation/event-feature' },
      ]}
      versionNote={`Current release ${CURRENT_BOT_VERSION} | Docs last updated ${DOCS_LAST_UPDATED}`}
    >
      <section className="docs-section" id="overview">
        <h2>Overview</h2>
        <p>
          This page is the documentation entry point. Detailed systems are split into dedicated pages so each feature reads like a reference document instead of one long mixed page. The Bot currently support many other features, such as Logistics Requests, Awards, Role Workflows, Moderation Tools, and Stockpile Management. These features are not yet documented, but will be in the future as soon as they have been updated to Version 2.0.
        </p>
      </section>

      <section className="docs-section" id="feature-index">
        <h2>Feature Index</h2>
        <table className="docs-table docs-javadoc-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Status</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_LINKS.map((feature) => (
              <tr key={feature.title}>
                <td>{feature.path.startsWith('/') ? <Link to={feature.path}>{feature.title}</Link> : <a href={feature.path}>{feature.title}</a>}</td>
                <td>{feature.status}</td>
                <td>{feature.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </BotDocsLayout>
  );
}