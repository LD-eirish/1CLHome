import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function CentralLegionInfoPage() {
  return (
    <>
      <Header subtitle="About the Central Group & 1CL Membership" />
      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Central Group Info' }]} />
      <main className="container central-legion-info">
        <section className="card info-card">
          <h2>What is the Central Group?</h2>
          <p className="info-subtitle">Federation of Regiments</p>
          <p>
            <strong>The Central Group of 1CL</strong> is a federation of regiments working together to maximize efficiency and impact in the war effort.
            A core goal of 1CL is to serve as a hub for public contribution, collaboration, and resources for the wider Colonial community, not just for our own group.
            Each regiment remains independent and free to leave at any time, but Central Group members benefit from deep cooperation, shared resources, and a strong, unified presence on the battlefield.
          </p>
        </section>

        <section className="card info-card">
          <h3>Benefits of Central Group Membership</h3>
          <ul className="benefits-list">
            <li>New players are offered a choice of member regiments when joining 1CL.</li>
            <li>Access to a large, shared pool of resources and equipment for all member regiments.</li>
            <li>Full support from the 1CL logistics team for group requests.</li>
            <li>Access to the 1CL manpower pool for operations hosted by any member group.</li>
            <li>Help shape the future of 1CL and group decisions.</li>
            <li>Request new tools and automations for the custom bot, implemented quickly.</li>
            <li>More benefits as the group evolves.</li>
          </ul>
        </section>

        <section className="card info-card">
          <h3>Requirements &amp; Expectations</h3>
          <ul className="benefits-list">
            <li>Maintain good communication with other 1CL commanders.</li>
            <li>Participate in shaping group decisions and 1CL operations.</li>
            <li>Engage in the shared logistics program for maximum efficiency.</li>
            <li>Use the 1CL verification process to ensure all members are Colonials.</li>
            <li>Adopt the shared tag program (e.g., <code>[A/1CL]</code>, <code>[1/1CL]</code>, <code>[2/1CL]</code>, <code>[3/1CL]</code>, <code>[9/1CL]</code>) for a unified presence.</li>
            <li>Coordinate logistics through the 1CL custom request and transport system.</li>
          </ul>
        </section>

        <section className="card info-card">
          <h3>How It Works</h3>
          <p>
            Central Group members collaborate on operations, logistics, and recruitment. Each regiment keeps its own identity and leadership, but benefits from the scale, support, and tools of the 1CL network.
            Our shared tag system maintains a unified presence on the battlefield, while the custom bot and logistics programs keep operations efficient and organized.
          </p>
        </section>
      </main>
    </>
  );
}
