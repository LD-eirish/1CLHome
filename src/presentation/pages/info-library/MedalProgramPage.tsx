import { WikiArticleLayout } from '../../components/WikiArticleLayout';

interface MedalEntry {
  readonly name: string;
  readonly prestige: string;
  readonly description: string;
  readonly earnedBy: string;
  readonly issuedBy: string;
  readonly special: string;
}

interface MedalCategory {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly medals: MedalEntry[];
}

const NAV_ITEMS = [
  { label: 'Medal Overview', href: '#medal-overview' },
  { label: 'How Medals Are Earned', href: '#how-medals-are-earned' },
  { label: 'Non-Combat Courage Medals', href: '#non-combat-courage-medals' },
  { label: 'Combat Medals', href: '#combat-medals' },
  { label: 'Air Medals', href: '#air-medals' },
  { label: 'Naval Medals', href: '#naval-medals' },
  { label: 'Partisan Medals', href: '#partisan-medals' },
  { label: 'Facilityman Medals', href: '#facilityman-medals' },
  { label: 'Logistics Medals', href: '#logistics-medals' },
  { label: 'Leadership and Service Medals', href: '#leadership-and-service-medals' },
  { label: 'Social and Morale Medals', href: '#social-and-morale-medals' },
  { label: 'Allied Medals', href: '#allied-medals' },
  { label: 'Medal Prestige Tiers', href: '#medal-prestige-tiers' },
];

const CATEGORIES: MedalCategory[] = [
  {
    id: 'non-combat-courage-medals',
    title: 'Non-Combat Courage Medals',
    intro:
      'For the leaders, inspirers, and unsung heroes who uphold the spirit of 1CL through dedication, morale, and service.',
    medals: [
      {
        name: 'Aegis of the Legion',
        prestige: '5 stars',
        description:
          'The highest honour of the 1st Combined Legion, awarded for extraordinary heroism or leadership in support of 1CL. Reserved for actions that bolster the unbreakable spirit of the Legion.',
        earnedBy:
          'Nomination for exceptional service that materially altered the course of a war, with unanimous Commander Council approval before High Commander review.',
        issuedBy: 'High Commander',
        special:
          'At most one per war, and only when deemed worthy. It marks a living symbol of 1CL\'s unbreakable will.',
      },
      {
        name: 'Colonial Cross of Valour',
        prestige: '4 stars',
        description:
          'Awarded for extraordinary deeds in service of 1CL, demonstrating exceptional dedication and support for the Legion.',
        earnedBy:
          'Nomination for a major act or sustained contribution that significantly strengthens the Legion.',
        issuedBy: 'Commander Council',
        special:
          'Represents formal recognition that the recipient made the Legion stronger through outstanding service.',
      },
      {
        name: 'Standard of the Legion',
        prestige: '3 stars',
        description:
          'Awarded to a single standout officer who carried the Legion through an entire war, sustaining leadership, organisation, and morale from the first push to the final stockpile.',
        earnedBy: 'Nomination; only one officer may receive it per war.',
        issuedBy: 'Commander Council',
        special:
          'Recognizes war-long command resilience, organization under pressure, and sustained morale leadership.',
      },
      {
        name: 'Undying Flame',
        prestige: '3 stars',
        description:
          'Awarded for keeping the fighting spirit of 1CL alive through a losing or defeat-condition war, rallying members when the war is already lost.',
        earnedBy:
          'Nomination during or after a loss for visible, meaningful morale leadership and refusal to surrender to despair.',
        issuedBy: 'Commander Council',
        special:
          'A somber and rare honor for defiance when circumstances are darkest.',
      },
    ],
  },
  {
    id: 'combat-medals',
    title: 'Combat Medals',
    intro:
      'For front-line warriors whose bravery, initiative, and tactical action directly shape battle outcomes against Warden forces.',
    medals: [
      {
        name: 'Golden Star of the Colonial Legion',
        prestige: '4 stars',
        description:
          'The highest regular combat award of 1CL. Awarded for exceptional initiative and acts of valour in the face of the enemy, demonstrating courage and leadership that inspire the entire Legion.',
        earnedBy:
          'Nomination for top-tier individual combat heroism; reviewed by the High Commander. Maximum two per war.',
        issuedBy: 'High Commander',
        special: 'The pinnacle of the Star Ladder for truly legendary combat performance.',
      },
      {
        name: 'Silver Star of the Colonial Legion',
        prestige: '3 stars',
        description:
          'Awarded for gallantry in action against the Wardens, recognising soldiers who distinguish themselves through initiative and acts of bravery for the Legion.',
        earnedBy: 'Nomination for notable individual gallantry and decisive combat action.',
        issuedBy: 'Commander Council',
        special: 'Mid-tier Star Ladder distinction for sustained and visible combat excellence.',
      },
      {
        name: 'Bronze Star of the Colonial Legion',
        prestige: '2 stars',
        description:
          'Awarded for heroic acts of initiative in combat operations against the enemy, including both direct action and critical logistics roles.',
        earnedBy: 'Nomination for a heroic combat act or pivotal logistics contribution.',
        issuedBy: 'Commander Council',
        special: 'Entry point for recognized combat excellence and battlefield reliability.',
      },
      {
        name: 'Iron Bastion Medal',
        prestige: '2 stars',
        description:
          'Awarded for an exceptional defensive stand against a heavy Warden assault. This recognises the quality of the fight, not the result, and can be given even if the position is eventually lost.',
        earnedBy:
          'Nomination for holding, or fiercely contesting, a key position under heavy assault.',
        issuedBy: 'Commander Council',
        special: 'Can be awarded even if the position is eventually lost.',
      },
      {
        name: 'Spearhead Medal',
        prestige: '2 stars',
        description:
          'Awarded for leading the offensive action that breaks a fortified Warden line and opens the way for the Legion. Unlike the Star medals, which reward individual valour, the Spearhead recognises the breakthrough itself and the leadership behind it.',
        earnedBy: 'Nomination for driving or leading a breakthrough with strategic offensive impact.',
        issuedBy: 'Commander Council',
        special: 'Team-impact combat honor centered on breakthrough leadership.',
      },
    ],
  },
  {
    id: 'air-medals',
    title: 'Air Medals',
    intro:
      'For pilots and air crews whose skill, precision, and courage secure Colonial dominance in the skies.',
    medals: [
      {
        name: 'Flying Fury Cross',
        prestige: '4 stars',
        description:
          'Awarded to confirmed flying aces: pilots who shoot down at least five enemy aircraft without losing their own and win every dogfight. They are the greatest fighter pilots 1CL has to offer.',
        earnedBy: 'Five or more confirmed air-to-air kills, zero losses, with verified video evidence. Scouts excluded except scout-on-scout kills.',
        issuedBy: 'Commander Council',
        special: 'Elite pilot status with strict verification requirements.',
      },
      {
        name: 'Wings of the Legion',
        prestige: '2 stars',
        description:
          'Awarded to a combat pilot for their first confirmed air-to-air kills in defence of 1CL.',
        earnedBy:
          'One or more confirmed kills with video evidence. Scouts excluded except scout-on-scout kills.',
        issuedBy: 'Commander Council',
        special: 'First-blood combat aviation distinction and entry to aerial progression.',
      },
      {
        name: 'Skyhammer Medal',
        prestige: '3 stars',
        description:
          'Awarded for sustained, effective bombing runs against Warden positions, clearing the way for the Legion.',
        earnedBy: 'Nomination for sustained bombing impact; awarded to responsible pilot and bombardier crew.',
        issuedBy: 'Commander Council',
        special: 'Recognizes aerial team coordination and precision strike contribution.',
      },
    ],
  },
  {
    id: 'naval-medals',
    title: 'Naval Medals',
    intro:
      'For naval and amphibious warriors whose operations secure sea control, sustain logistics, and shape maritime battle outcomes.',
    medals: [
      {
        name: 'Maritime Storm Cross',
        prestige: '3 stars',
        description:
          'Awarded for extraordinary heroism in naval or amphibious operations, recognising those who brave the waters to strike at the enemy and secure victory.',
        earnedBy: 'Nomination for standout naval/amphibious impact operation.',
        issuedBy: 'Commander Council',
        special: 'Covers high-impact waterborne combat and amphibious excellence.',
      },
      {
        name: 'Silent Depths Cross',
        prestige: '2 stars',
        description:
          'Awarded for an exceptional submarine engagement, hunting Warden shipping and striking unseen beneath the waves.',
        earnedBy: 'Nomination for notable submarine action with meaningful war impact.',
        issuedBy: 'Commander Council',
        special: 'Recognizes elite undersea warfare execution.',
      },
      {
        name: 'Anchor of the Legion',
        prestige: '2 stars',
        description:
          'Awarded for outstanding naval logistics, running supplies across contested waters to sustain the front.',
        earnedBy: 'Nomination for sustained or high-risk naval logistics operations.',
        issuedBy: 'Commander Council',
        special: 'Honors maritime sustainment as a strategic lifeline.',
      },
    ],
  },
  {
    id: 'partisan-medals',
    title: 'Partisan Medals',
    intro:
      'For high-risk behind-the-lines operations, covert disruption, and audacious enemy asset seizures.',
    medals: [
      {
        name: "Purple Partisan's Cloak",
        prestige: '3 stars',
        description:
          'Awarded for daring operations behind enemy lines: sabotage, raiding, and disruption deep in Warden territory.',
        earnedBy: 'Nomination for confirmed operation with measurable strategic effect.',
        issuedBy: 'Commander Council',
        special: 'High-risk distinction for deep operations behind enemy lines.',
      },
      {
        name: 'Colonial Shadow Cross',
        prestige: '2 stars',
        description:
          'Awarded for exceptional reconnaissance and intelligence work, scouting Warden movements and positions unseen.',
        earnedBy: 'Nomination for actionable intel with direct operational/strategic influence.',
        issuedBy: 'Commander Council',
        special: 'Honors the eyes and ears behind precision decision-making.',
      },
    ],
  },
  {
    id: 'facilityman-medals',
    title: 'Facilityman Medals',
    intro:
      'For builders and engineers who fortify fronts, sustain infrastructure, and keep the Legion\'s production engine alive.',
    medals: [
      {
        name: 'Architect of the Legion',
        prestige: '3 stars',
        description:
          'Awarded for building and maintaining significant fortifications and bunker networks over a sustained period, creating the defences that hold our ground.',
        earnedBy: 'Nomination for sustained defensive construction plus upkeep impact.',
        issuedBy: 'Commander Council',
        special: 'Recognizes those who shape battlefields into durable Colonial strongholds.',
      },
      {
        name: 'Colonial Workshop Medal',
        prestige: '3 stars',
        description:
          'Awarded for building and running the facilities that keep the Legion\'s production and logistics flowing.',
        earnedBy: 'Nomination for sustained facility development and industrial support.',
        issuedBy: 'Commander Council',
        special: 'Honors industrial backbone contributions behind frontline success.',
      },
    ],
  },
  {
    id: 'logistics-medals',
    title: 'Logistics Medals',
    intro:
      'For logistics specialists who keep stockpiles full, routes active, and frontline units supplied under pressure.',
    medals: [
      {
        name: 'Colonial Logistics Cross',
        prestige: '3 stars',
        description:
          'Awarded for meritorious service maintaining stockpiles, ensuring our men are equipped and sustained during combat. Usually awarded at the end of a war.',
        earnedBy: 'Nomination for sustained stockpile and supply-chain reliability across a war.',
        issuedBy: 'Commander Council',
        special: 'A commitment-based honor often awarded near war end for sustained excellence.',
      },
      {
        name: "Colonial Hauler's Cross",
        prestige: '3 stars',
        description:
          'Awarded for outstanding achievement in transport requests, including the delivery of critical supplies.',
        earnedBy: 'Nomination for sustained or critical transport work with strategic effect.',
        issuedBy: 'Commander Council',
        special: 'Recognizes route reliability and pressure-tested delivery performance.',
      },
    ],
  },
  {
    id: 'leadership-and-service-medals',
    title: 'Leadership and Service Medals',
    intro:
      'For long-term contributors who strengthen Legion foundations, continuity, and growth across wars.',
    medals: [
      {
        name: 'Pillar of the Legion',
        prestige: '2 stars',
        description:
          'Awarded for long and loyal service, recognising members whose dedication has become part of the foundation of 1CL.',
        earnedBy: 'Reach Prestige 5 through verified war participation progression (+1 per verified war).',
        issuedBy: 'Commander Council',
        special: 'Recognizes sustained legacy-level commitment over multiple conflicts.',
      },
      {
        name: 'Rally Banner of the Legion',
        prestige: '3 stars',
        description:
          'Awarded for outstanding recruitment, bringing in new members of our glorious Legion.',
        earnedBy: 'Recruit 15 or more new members in a single war, verified by Commander Council.',
        issuedBy: 'Commander Council',
        special: 'Honors high-impact force growth and community expansion leadership.',
      },
    ],
  },
  {
    id: 'social-and-morale-medals',
    title: 'Social and Morale Medals',
    intro:
      'For members who sustain culture, communications, morale, and social cohesion in and out of combat cycles.',
    medals: [
      {
        name: 'Soul of the Legion',
        prestige: '3 stars',
        description:
          'Awarded to the member who keeps the regiment\'s community and culture thriving, on and off the battlefield.',
        earnedBy: 'Nomination for long-term morale and cultural leadership contributions.',
        issuedBy: 'Commander Council',
        special: 'Recognizes those who keep Legion identity and spirit strong under pressure.',
      },
      {
        name: 'Voice of the Legion',
        prestige: '2 stars',
        description:
          'Awarded for outstanding communications and content: posters, propaganda, guides, and media that carry the Legion\'s identity.',
        earnedBy: 'Nomination for notable communication, propaganda, or media contribution.',
        issuedBy: 'Commander Council',
        special: 'Honors creators who amplify Legion message and operational clarity.',
      },
    ],
  },
  {
    id: 'allied-medals',
    title: 'Allied Medals',
    intro:
      'For allied Colonial units and members whose external support materially strengthens 1CL operations and outcomes.',
    medals: [
      {
        name: 'Order of the Allied Star',
        prestige: '3 stars',
        description:
          'Awarded for exceptionally meritorious acts in support of 1CL. Bestowed upon allied Colonials whose contributions have strengthened our cause.',
        earnedBy: 'Nomination for significant allied contribution to combined operations or support.',
        issuedBy: 'Commander Council',
        special: 'Recognizes alliance-level brotherhood in arms and shared operational success.',
      },
    ],
  },
];

export function MedalProgramPage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="1st Combined Legion Medal Overview"
      lead=""
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: '1CL Medal Overview' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 26, 2026"
    >
      <section className="wiki-section" id="medal-overview">
        <h2 className="wiki-section-heading">Medal Overview</h2>
        <p>
          The 1st Combined Legion Medal is the official system of honor for 1CL Members who have proven themselves to be great members of our Community. These medals are formal recognitions of courage, leadership, and service.
        </p>
        <p>
          Each medal records a story: frontline valor, command endurance, logistics consistency, engineering excellence, reconnaissance precision, or community leadership that pushed us forward.
        </p>
      </section>

      <section className="wiki-section" id="how-medals-are-earned">
        <h2 className="wiki-section-heading">How Medals Are Earned</h2>
        <ol>
          <li>
            <strong>Nomination:</strong> Any 1CL member may nominate a fellow member.
          </li>
          <li>
            <strong>Review:</strong> Nominations are reviewed by Commander Council using evidence, witness context, and measurable impact.
          </li>
          <li>
            <strong>Award:</strong> Commander Council or High Commander grants final approval depending on medal tier.
          </li>
          <li>
            <strong>Verification:</strong> Medals tied to objective feats (air kills, theft operations, and similar) require clip/video proof.
          </li>
        </ol>
      </section>

      {CATEGORIES.map((category) => (
        <section className="wiki-section" id={category.id} key={category.id}>
          <h2 className="wiki-section-heading">{category.title}</h2>
          <p className="medal-category-intro">{category.intro}</p>

          {category.medals.map((medal) => (
            <details className="medal-entry" key={medal.name}>
              <summary className="medal-summary">
                <span className="medal-name">{medal.name}</span>
                <span className="medal-prestige">Prestige: {medal.prestige}</span>
              </summary>
              <div className="medal-details">
                <p>
                  <strong>Description:</strong> {medal.description}
                </p>
                <p>
                  <strong>Earned By:</strong> {medal.earnedBy}
                </p>
                <p>
                  <strong>Issued By:</strong> {medal.issuedBy}
                </p>
                <p>
                  <strong>What Makes It Special:</strong> {medal.special}
                </p>
              </div>
            </details>
          ))}
        </section>
      ))}

      <section className="wiki-section" id="medal-prestige-tiers">
        <h2 className="wiki-section-heading">Medal Prestige Tiers</h2>
        <table className="wiki-table">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Stars</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Legendary</strong></td>
              <td>5 stars</td>
              <td>Rarest honors for exceptional, war-defining achievements.</td>
            </tr>
            <tr>
              <td><strong>Elite</strong></td>
              <td>4 stars</td>
              <td>High-impact feats of command, combat, or specialist excellence.</td>
            </tr>
            <tr>
              <td><strong>Distinguished</strong></td>
              <td>3 stars</td>
              <td>Notable contributions with clear operational or organizational impact.</td>
            </tr>
            <tr>
              <td><strong>Meritorious</strong></td>
              <td>2 stars</td>
              <td>Reliable and valuable service that strengthens Legion consistency.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </WikiArticleLayout>
  );
}
