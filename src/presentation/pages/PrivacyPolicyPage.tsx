import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function PrivacyPolicyPage() {
  return (
    <>
      <Header subtitle="Privacy Policy" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Privacy Policy' }]} />

      <main className="container">
        <section className="card content card">
          <h2>1CL Bot Privacy Policy</h2>
          <p className="small"><strong>Effective date:</strong> May 28, 2026</p>

          <h3>Introduction</h3>
          <p>
            This Privacy Policy explains how eirish's Foxhole Assistant Discord bot ("the Bot") collects, uses, and protects data to support our Foxhole gaming community. By using the Bot in any server, you consent to the data practices described below.
          </p>

          <h3>Information We Collect</h3>
          <p><strong>To provide community features, the Bot collects:</strong></p>
          <ul>
            <li><strong>Discord Identifiers:</strong> User IDs, server IDs, channel IDs, role IDs, and message IDs (required for command processing and role management)</li>
            <li><strong>Bot Specific Data:</strong>
              <ul>
                <li>Logistics data for tracking requests</li>
                <li>Member application and verification submissions</li>
                <li>Event sign-ups, attendance records, and participation history</li>
                <li>Medal nominations, award records, and award history</li>
                <li>Server-specific configuration and permission settings</li>
              </ul>
            </li>
          </ul>
          <p>
            The Bot <em>does not</em> collect or store Discord messages, voice data, or personal information outside of what is explicitly submitted through Bot commands or configured features.
          </p>
          <p>
            Any data is stored securely and used solely for providing Bot functionality, maintaining community records, and improving the Bot’s performance. The Bot Specific Data is inaccesible to the Bot developers and Bot Owners.
          </p>
          <p>
            This ensures that no operation specific information is leaked outside of your Community.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use collected data solely to:
          </p>
          <ul>
            <li>Process logistics data, manage applications, creating and scheduling events, and maintain verification systems</li>
            <li>Store historical data for operations, member achievements, and logistics records</li>
          </ul>

          <h3>Data Sharing and Disclosure</h3>
          <p>
            <strong>We do not sell, trade, or rent your data to third parties.</strong> Your communities' data is stored securely and is only accessible to authorized Bot commands. We do not have access to your communities' data, and we do not share it with any external parties.
          </p>

          <h3>Data Retention</h3>
          <p>
            Data is retained only as long as necessary. Member records, logistics data, and bot history are retained until the removal of the bot from your server
          </p>

          <h3>Security Measures</h3>
          <p>
            We implement the following safeguards to protect your data:
          </p>
          <ul>
            <li>All data is stored in encrypted databases with restricted access</li>
            <li>Sensitive operations (e.g., role assignments) require explicit server administrator permissions or configured manager roles permission</li>
          </ul>

          <h3>Your Rights and Choices</h3>
          <p>
            You may review or update your submitted data (e.g., applications, logistics requests) by contacting your server administrators or using Bot commands where available.
          </p>
          <p>
            To stop data collection, remove the Bot from your server or refrain from using Bot commands.
          </p>

          <h3>Children’s Privacy</h3>
          <p>
            In accordance with Discord’s requirements, the Bot is not intended for use by children under 13. If we become aware that a child under 13 has provided data, we will take steps to delete such information.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes via Discord announcements. Continued use of the Bot after changes constitutes acceptance of the updated Policy.
          </p>

          <h3>Contact</h3>
          <p>
            For privacy-related questions or data removal requests, email <a href="mailto:eirishofficial@pm.me?subject=[1CL Bot Privacy Inquiry]&body=Discord Username:%0A%0AServer Name (if applicable):%0A%0ARequest Description:%0A">eirishofficial@pm.me</a>.
          </p>
          <p className="small">
            Include your Discord username (e.g., @username), the relevant server name, and a clear description of your request. We will respond within 5 business days.
          </p>
        </section>
      </main>
    </>
  );
}

export default PrivacyPolicyPage;