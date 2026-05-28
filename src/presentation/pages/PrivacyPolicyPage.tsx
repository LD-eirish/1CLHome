import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function PrivacyPolicyPage() {
  return (
    <>
      <Header subtitle="Privacy Policy" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Privacy Policy' }]} />

      <main className="container">
        <section className="card content card">
          <h2>Privacy Policy</h2>
          <p className="small"><strong>Effective date:</strong> May 28, 2026</p>

          <h3>Information We Collect</h3>
          <ul>
            <li>Discord user IDs, server IDs, channel IDs, thread IDs, and role IDs</li>
            <li>Command usage, interaction metadata, and moderation/admin action logs</li>
            <li>Content you submit through bot commands, forms, or configured workflows</li>
            <li>Logistics, application, event, and verification data stored by the bot for its features</li>
          </ul>

          <h3>How We Use Information</h3>
          <p className="lead">
            Run bot features and respond to commands; store scores, history, settings, and moderation state; prevent abuse, troubleshoot issues, and improve reliability; enforce server-specific configuration and admin actions.
          </p>

          <h3>How We Share Information</h3>
          <ul>
            <li>We do not sell personal data</li>
            <li>We do not share data</li>
            <li>Discord and its infrastructure providers may process data as part of normal platform operation</li>
          </ul>

          <h3>Data Retention</h3>
          <ul>
            <li>Data is kept while needed for bot functionality and server history</li>
            <li>Server administrators may request deletion of bot data tied to their server, subject to what the bot can safely remove</li>
            <li>Some logs may remain temporarily in backups or audit records</li>
          </ul>

          <h3>Security</h3>
          <p>
            We use reasonable technical and organizational safeguards to protect stored data.
          </p>

          <h3>Your Choices</h3>
          <p>
            If you use the bot in a server, your data may be stored as part of that server’s bot usage. Server administrators control most bot configuration and can manage many stored records through bot commands. If you want data removed, contact a server administrator or the bot maintainer.
          </p>

          <h3>Children’s Privacy</h3>
          <p>The bot is not intended for children under the age of 13, as required by Discord.</p>

          <h3>Changes to This Policy</h3>
          <p>We may update this policy from time to time. Continued use of the bot after changes means you accept the updated policy.</p>

          <h3>Contact</h3>
          <p>For privacy questions, contact eirishofficial@pm.me </p>
        </section>
      </main>
    </>
  );
}

export default PrivacyPolicyPage;
