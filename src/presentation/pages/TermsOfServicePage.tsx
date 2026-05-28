import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function TermsOfServicePage() {
  return (
    <>
      <Header subtitle="Terms of Service" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Terms of Service' }]} />

      <main className="container">
        <section className="card content card">
          <h2>Terms of Service</h2>
          <p className="small"><strong>Effective date:</strong> May 28, 2026</p>

          <h3>Acceptance</h3>
          <p>By using the bot, you agree to these terms and to follow Discord’s rules and applicable laws.</p>

          <h3>Use of the Bot</h3>
          <ul>
            <li>Use the bot only for lawful purposes</li>
            <li>Do not attempt to break, bypass, or overload the bot</li>
            <li>Do not use the bot to harass, spam, impersonate, or abuse others</li>
            <li>Do not exploit bugs, permissions, or data access beyond what you are allowed to use</li>
          </ul>

          <h3>Server Administration</h3>
          <p>
            Server administrators are responsible for how the bot is configured in their servers. Some bot actions may create, modify, or delete data based on administrator commands. Administrators are responsible for permissions they grant to bot roles and channels.
          </p>

          <h3>Content and Data</h3>
          <p>
            You are responsible for the content you submit through the bot. The bot may store and process server data to provide its features. We may remove or refuse to process content that violates these terms or Discord’s rules.
          </p>

          <h3>Availability</h3>
          <p>
            The bot is provided on an as-is and as-available basis. Features may change, break, or be removed at any time. We do not guarantee uninterrupted service.
          </p>

          <h3>Termination</h3>
          <p>We may restrict or stop access to the bot if needed to protect users, servers, or the service. Server administrators may remove the bot from their server at any time.</p>

          <h3>Disclaimer</h3>
          <p>To the maximum extent allowed by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

          <h3>Liability</h3>
          <p>To the maximum extent allowed by law, we are not liable for indirect, incidental, special, or consequential damages arising from use of the bot.</p>

          <h3>Changes</h3>
          <p>We may update these terms at any time. Continued use of the bot after changes means you accept the updated terms.</p>

          <h3>Contact</h3>
          <p>For questions about these terms, contact eirishofficial@pm.me </p>
        </section>
      </main>
    </>
  );
}

export default TermsOfServicePage;
