import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: '1CL Overview', href: '#overview' },
  { label: 'Command and Control', href: '#command-and-control' },
  { label: 'Command and Control Setup', href: '#cnc-setup' },
  { label: 'How Command and Control Works', href: '#how-cnc-works' },
  { label: 'Purpose of Command and Control', href: '#purpose-of-cnc' },
];

export function CnCPage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="1CL - 1st Combined Legion"
      lead="How 1CL uses Command and Control to coordinate operations and maximize effectiveness."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: '1CL - 1st Combined Legion' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 2026"
    >
      <section className="wiki-section" id="command-and-control">
        <h2 className="wiki-section-heading">What is Command and Control?</h2>
        <p>
          The 1CL Command and Control system is a setup that is designed to maximize the effectiveness of voice chat and minimize the amount of overlapping speakers.
        </p>
      </section>
      <section className="wiki-section" id="cnc-setup">
        <h2 className="wiki-section-heading">Command and Control Setup</h2>
        <p>
          All squads will get into voice channels and in-game squads with their squad leader. 
        </p>
        <p>
          Squad leaders will all be in the same discord channel with the commander of the operation. Squad leaders should enable push to talk on discord. 
        </p>
      </section>
      <img
          src="/CnC.png"
          alt="Example of the Command and Control system"
          className="cnc-summary-image"
          loading="lazy"
        />
      <section className="wiki-section" id="how-cnc-works">
        <h2 className="wiki-section-heading">How Command and Control Works</h2>
        <p>
          Squad leaders use discord to communicate with the commander and other squad leaders. Squad leaders can use the mute voice chat feature to avoid missing critical information from the commander. 
        </p>
      </section>
      <section className="wiki-section" id="purpose-of-cnc">
        <h2 className="wiki-section-heading">Purpose of Command and Control</h2>
        <p>
          This system allows for far better communication and control between units and the operation commander. The scope of our operations is too much for one individual to be responsible for everything. This chain of command system has proven to greatly improve the success of our operations. It also provides an level of control that disorganized players cannot counter.
        </p>
      </section>
    </WikiArticleLayout>
  );
}
