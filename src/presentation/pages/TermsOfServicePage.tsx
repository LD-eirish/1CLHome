import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function TermsOfServicePage() {
  return (
    <>
      <Header subtitle="Terms of Service" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Terms of Service' }]} />

      <main className="container">
        <section className="card content card">
          <h2>1CL Bot Terms of Service</h2>
          <p className="small"><strong>Effective date:</strong> May 28, 2026</p>

          <h3>Introduction</h3>
          <p>
            eirish’s Foxhole Assistant Discord bot ("the Bot") provides community management features including logistics tracking, member verification, event coordination, and role assignments for our Foxhole gaming coalition. These Terms of Service govern your use of the Bot within Discord servers.
          </p>

          <h3>Acceptance of Terms</h3>
          <p>
            By inviting the Bot to your server or interacting with it in any Discord server, you agree to comply with these Terms, Discord’s <a href="https://discord.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>, and all applicable laws. If you do not agree, do not use the Bot.
          </p>

          <h3>Permitted Use</h3>
          <p>You may use the Bot solely for:</p>
          <ul>
            <li>Managing community operations (logistics, events, applications)</li>
            <li>Participating in approved activities within authorized servers</li>
            <li>Lawful purposes that align with community guidelines</li>
          </ul>
          <p><strong>Prohibited actions include:</strong></p>
          <ul>
            <li>Exploiting Bot commands to disrupt operations or other servers</li>
            <li>Using the Bot to harvest, scrape, or misuse member data</li>
            <li>Impersonating staff or misrepresenting affiliation with the community</li>
            <li>Bypassing Bot security measures or rate limits</li>
            <li>Any activity violating Discord’s rules or the community’s code of conduct</li>
          </ul>

          <h3>Server Administrator Responsibilities</h3>
          <p>
            Server administrators who invite the Bot are responsible for:
          </p>
          <ul>
            <li>Configuring Bot permissions appropriately for their server’s needs</li>
            <li>Ensuring Bot commands are used in compliance with these Terms</li>
            <li>Understanding that Bot actions (e.g., role assignments, data logging) may affect server members</li>
          </ul>
          <p>
            1CL reserves the right to modify or revoke Bot access in any server to maintain community standards.
          </p>

          <h3>Content and Data</h3>
          <p>
            You retain ownership of content you submit through the Bot (e.g., logistics reports, applications). However, by using the Bot, you grant 1CL a license to store, process, and display this content solely for providing Bot services and maintaining community records.
          </p>
          <p>
            The Bot may access Discord message content, member roles, and server metadata <em>only</em> when explicitly invoked by commands or configured by server administrators.
          </p>

          <h3>Service Availability</h3>
          <p>
            The Bot is provided on an "as-is" and "as-available" basis. 1CL may modify, suspend, or discontinue Bot features at any time without notice. We do not guarantee uninterrupted service, and downtime may occur for maintenance or technical issues.
          </p>

          <h3>Termination</h3>
          <p>
            1CL may restrict or terminate access to the Bot for any user or server that violates these Terms, Discord’s rules, or community standards. Server administrators may remove the Bot from their server at any time.
          </p>

          <h3>Disclaimer of Warranties</h3>
          <p>
            The Bot is provided without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement. 1CL does not warrant that the Bot will meet your requirements or operate without error.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, 1CL shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Bot, including but not limited to loss of data, server disruptions, or community conflicts.
          </p>

          <h3>Changes to These Terms</h3>
          <p>
            1CL may update these Terms at any time. We will notify server administrators of material changes via Discord announcements. Continued use of the Bot after changes constitutes acceptance of the new Terms.
          </p>

          <h3>Contact</h3>
          <p>
            For questions about these Terms, please email <a href="mailto:eirishofficial@pm.me?subject=[1CL Bot ToS Inquiry]">eirishofficial@pm.me</a>. 
            Include your Discord username, server name (if applicable), and a detailed description of your inquiry. We aim to respond within 5 business days.
          </p>
        </section>
      </main>
    </>
  );
}

export default TermsOfServicePage;