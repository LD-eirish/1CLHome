import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: '1CL Overview', href: '#overview' },
  { label: 'What is 1CL?', href: '#what-is-1cl' },
];

export function WhatIs1CLPage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="1CL - 1st Combined Legion"
      lead="A regiment of regiments focused on recruiting, training, and coordinating specialized sub-regiments across global time zones."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: '1CL - 1st Combined Legion' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 2026"
    >
      <section className="wiki-section" id="overview">
        <h2 className="wiki-section-heading">1CL Overview</h2>
        <p>
          <strong>1CL - 1st Combined Legion</strong>
          <br />
        </p>
        <ul>
          <li>
            <strong>Allegiance:</strong> Colonial Loyalist{' '}
            <img src="https://cdn.discordapp.com/emojis/322855833148850198.webp?size=44" alt="Colonial emblem" width={18} height={18} loading="lazy" />
          </li>
          <li>
            <strong>Time zones:</strong> Global
          </li>
          <li>
            <strong>Languages:</strong> English
          </li>
        </ul>
      </section>

      <section className="wiki-section" id="what-is-1cl">
        <h2 className="wiki-section-heading">What is 1CL?</h2>
        <p>
          The 1st Combined Legion (1CL) is best understood as a federation-type coalition of regiments: one united command framework built from multiple distinct groups. Rather than being a single monolithic regiment, 1CL is a structured alliance where each member regiment keeps its own identity, traditions, and internal leadership while contributing to a shared legion-wide mission.
        </p>
        <p>
          At the center of that model is coordination. 1CL aligns planning, communication, and operational priorities so regiments can act together at scale without losing what makes each one unique. This creates a practical balance: autonomy at the regiment level, unity at the coalition level.
        </p>
        <p>
          Structurally, 1CL includes a Central Group of core regiments and an Associate Group of partner regiments. The Central Group forms the backbone of day-to-day operational capacity, while the Associate Group broadens reach and enables cross-regiment collaboration for major operations, events, and campaigns. Together, they form a resilient network that can adapt to different war conditions and playstyles.
        </p>
        <p>
          In practice, this means 1CL is not only about fighting together, but also about building a sustainable coalition culture. Members can specialize in ground combat, artillery, armor, naval support, logistics, or command roles, then integrate into larger multi-regimental efforts through shared doctrine and coordination standards.
        </p>
        <p>
          Our focus is on expanding, training, and recruiting sub-regiments that can plug directly into 1CL&apos;s command structure. The goal is long-term strength through cooperation: helping regiments grow, helping players find their place, and ensuring the legion can deliver organized, large-scale impact across the entire war.
        </p>
      </section>
    </WikiArticleLayout>
  );
}
