import { WikiArticleLayout } from '../../components/WikiArticleLayout';

interface ModLinkDetail {
  readonly kind: 'link';
  readonly prefix: string;
  readonly label: string;
  readonly href: string;
  readonly suffix?: string;
}

type ModDetail = string | ModLinkDetail;

interface ModEntry {
  readonly name: string;
  readonly details: ModDetail[];
  readonly author?: string;
  readonly modPreviewImage?: string;
}

interface ModSection {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly introLinkDetail?: ModLinkDetail;
  readonly mods: ModEntry[];
}

const NAV_ITEMS = [
  { label: 'Must-Have Mods', href: '#must-have-mods' },
  { label: 'Suggested Mods', href: '#suggested-mods' },
];

const MOD_SECTIONS: ModSection[] = [
  {
    id: 'must-have-mods',
    title: 'Must-Have Mods',
    intro: 'Mods that we recommend for the best experience for casual Foxhole players.',
    mods: [
      {
        name: 'Clear Icons Essential',
        author: 'AshdeuzoFR',
        details: [
          'With Clean Icons Essential, instantly recognize your weapons, ammo, vehicles, and resources in Foxhole — for faster decisions and smoother gameplay.',
        ],
      },
      {
        name: 'Knight\'s Map Mod of Science',
        author: 'Knight of Science',
        details: [
          'Foxhole map mod with better terrain and road colors, topography, etc.',
        ],
      },
      {
        name: 'High Visibility Railway Switch',
        author: 'FudgelFox',
        details: [
          'Designed to aid players in reducing eye strain at determining which direction the railway semaphore (switch) is pointed, from both the front and rear sides, at greater distances and zoom levels.',
        ],
      },
      {
        name: 'Better Container Colours',
        author: 'Dantello',
        details: [
          'This foxhole mod improves the clarity between all container colours(meaning it improves the resource and shipping container colours as well!).',
        ],
      },
    ],
  },
  {
    id: 'suggested-mods',
    title: 'Suggested Mods',
    intro:
      'These mods are recommended for enhancing your gameplay experience in Foxhole.',
    mods: [
      {
        name: 'skaj\'s super uber-fantastical Foxhole sound mod',
        author: 'skaj',
        details: [
          'This is a sound mod for the MMO Foxhole. It completely overhauls nearly every sound in the game with new and improved counterparts, including guns, vehicles, and other various foley sounds (such as reloading).',
        ],
      },
      {
        name: 'Better Compass',
        author: 'KOCMOHABT',
        details: [
          'Changes the user interface of the compass by adding adjacent sides of the world, azimuth, and hourly direction.',
        ],
      },
      {
        name: 'Alternative Squad Leader & Officer icons',
        author: 'KoV',
        details: [
          'This is pretty fast and simple to mod, so if you have simple requests (logos already made or with very few adjustments), contact me (discord) for custom versions.',
        ],
      },
      {
        name: 'Foxhole Vehicles Overhaul',
        author: 'WolfgangIX',
        details: [
          'This mods focus on adding details on Foxhole vanilla vehicles, making them more realistic and immersive.',
        ],
      },
    ],
  },
];

export function SuggestedModsPage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="Suggested Mods"
      lead="A curated list of recommended mods to enhance your Foxhole gameplay experience."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: 'Suggested Mods' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="June 2026"
    >
      <section className="wiki-section" id="suggested-mods-overview">
        <h2 className="wiki-section-heading">Suggested Mods Overview</h2>
        <p>
          The mods listed below are recommended for enhancing your gameplay experience in Foxhole. They provide various improvements, from visual enhancements to sound overhauls, and can help make your time in the game more enjoyable and immersive.
        </p>
        <p>
          Please note that while these mods are suggested, they are not officially endorsed by the game developers. Always ensure that you download mods from trusted sources and follow any installation instructions provided by the mod creators.
        </p>
      </section>

      {MOD_SECTIONS.map((section) => (
        <section className="wiki-section" id={section.id} key={section.id}>
          <h2 className="wiki-section-heading">{section.title}</h2>
          {section.introLinkDetail ? (
            <p className="medal-category-intro">
              {section.introLinkDetail.prefix}
              <a href={section.introLinkDetail.href} target="_blank" rel="noreferrer">{section.introLinkDetail.label}</a>
              {section.introLinkDetail.suffix ?? ''}
            </p>
          ) : (
            <p className="medal-category-intro">{section.intro}</p>
          )}

          {section.mods.map((mod) => (
            <details className="medal-entry" key={mod.name}>
              <summary className="medal-summary role-summary">
                <span className="medal-name role-name">
                  {mod.name}
                  {mod.author && <span className="medal-author"> by {mod.author}</span>}
                  {mod.modPreviewImage && (
                    <img
                      src={mod.modPreviewImage}
                      alt={`${mod.name} preview`}
                      className="mod-preview-image"
                      loading="lazy"
                    />
                  )}
                  {mod.details.length > 0 && <span className="medal-details-indicator"> (click for details)</span>}
                </span>
              </summary>
              <div className="medal-details">
                {mod.details.map((detail, index) => (
                  typeof detail === 'string' ? (
                    <p key={`${mod.name}-${index}`}>{detail}</p>
                  ) : (
                    <p key={`${mod.name}-${detail.label}-${index}`}>
                      {detail.prefix}
                      <a href={detail.href} target="_blank" rel="noreferrer">{detail.label}</a>
                      {detail.suffix}
                    </p>
                  )
                ))}
              </div>
            </details>
          ))}
        </section>
      ))}
    </WikiArticleLayout>
  );
}