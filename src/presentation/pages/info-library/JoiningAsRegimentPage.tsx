import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'How It Works', href: '#how-it-works' },
];

export function JoiningAsRegimentPage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="Joining 1CL as a Regiment"
      lead="How regiments join the 1st Combined Legion, what membership provides, and what is expected from member groups."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: 'Joining 1CL as a Regiment' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 2026"
    >
      <section className="wiki-section" id="overview">
        <h2 className="wiki-section-heading">Overview</h2>
        <p>
          The Central Group of 1CL is a federation of regiments working together to maximize efficiency and impact in the war effort.
        </p>
        <p>
          A core goal of 1CL is to serve as a hub for public contribution, collaboration, and resources for the wider Colonial community, not just for our own group.
        </p>
        <p>
          Each regiment remains independent and free to leave at any time, but member regiments benefit from deep cooperation, shared resources, and a strong, unified battlefield presence.
        </p>
      </section>

      <section className="wiki-section" id="benefits">
        <h2 className="wiki-section-heading">Benefits of Membership</h2>
        <ul>
          <li>New players are offered a choice of member regiments when joining 1CL.</li>
          <li>Access to a large, shared pool of resources and equipment for all member regiments.</li>
          <li>Full support from the 1CL logistics team for group requests.</li>
          <li>Access to the 1CL manpower pool for operations hosted by any member group.</li>
          <li>Ability to shape the future of 1CL and major group decisions.</li>
          <li>Fast implementation of requested tools and automations for the custom bot.</li>
        </ul>
      </section>

      <section className="wiki-section" id="requirements">
        <h2 className="wiki-section-heading">Requirements and Expectations</h2>
        <ul>
          <li>Maintain active communication with other 1CL commanders.</li>
          <li>Participate in federation-level decision-making and operations.</li>
          <li>Engage with shared logistics workflows for maximum efficiency.</li>
          <li>Use the 1CL verification process to ensure all members are Colonials.</li>
          <li>Adopt shared tag patterns such as <code>[A/1CL]</code>, <code>[1/1CL]</code>, <code>[2/1CL]</code>, <code>[3/1CL]</code>, and <code>[9/1CL]</code>.</li>
          <li>Coordinate logistics via the 1CL request and transport system.</li>
        </ul>
      </section>

      <section className="wiki-section" id="how-it-works">
        <h2 className="wiki-section-heading">How It Works in Practice</h2>
        <p>
          Member regiments collaborate on operations, logistics, and recruitment. Each regiment keeps its identity and command structure while benefiting from the scale, support, and tooling of the larger 1CL network.
        </p>
        <p>
          Shared tags maintain a unified presence on the battlefield, while custom bot and logistics systems keep operations organized and efficient.
        </p>
      </section>
    </WikiArticleLayout>
  );
}
