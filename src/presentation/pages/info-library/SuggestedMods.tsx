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
  readonly modLinkDetail?: ModLinkDetail;
}

interface ModSection {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly mods: ModEntry[];
  readonly modLinkDetail?: ModLinkDetail;
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
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://ashdeuzofr.itch.io/foxhole-clean-icons-essential',
            label: 'Clear Icons Essential mod',
        },
        details: [
          'With Clean Icons Essential, instantly recognize your weapons, ammo, vehicles, and resources in Foxhole — for faster decisions and smoother gameplay. We recommend you to install the full version of the mod, which colors all icons including map icons.',
        ],
      },
      {
        name: 'Knight\'s Map Mod of Science',
        author: 'Knight of Science',
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://knight-of-science.itch.io/improved-map-mod-kos-edit',
            label: 'Knight\'s Map Mod of Science',
        },
        details: [
          'Foxhole map mod with better terrain and road colors, topography, etc. We recommend the full version of the mod.',
        ],
      },
      {
        name: 'High Visibility Railway Switch',
        author: 'FudgelFox',
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://fudgelfox.itch.io/foxhole-high-visibility-railway-switch',
            label: 'High Visibility Railway Switch mod',
        },
        details: [
          'Designed to aid players in reducing eye strain at determining which direction the railway semaphore (switch) is pointed, from both the front and rear sides, at greater distances and zoom levels.',
        ],
      },
      {
        name: 'Better Container Colours',
        author: 'Dantello',
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://danetello.itch.io/foxhole-better-container-colours',
            label: 'Better Container Colours mod',
        },
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
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://skaj999.itch.io/super-uber-fantastical-foxhole-sound-mod',
            label: 'skaj\'s super uber-fantastical Foxhole sound mod',
        },
        details: [
          'This is an truly amazing sound mod for Foxhole. It completely overhauls nearly every sound in the game with new and improved counterparts, including guns, vehicles, and other various foley sounds (such as reloading).',
        ],
      },
      {
        name: 'Better Compass',
        author: 'KOCMOHABT',
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://kocmodecaht.itch.io/foxhole-better-compass',
            label: 'Better Compass mod',
        },
        details: [
          'Changes the user interface of the compass by adding adjacent sides of the world, azimuth, and hourly direction.',
        ],
      },
      {
        name: 'Alternative Squad Leader & Officer icons',
        author: 'KoV',
        modLinkDetail: {
            kind: 'link',
            prefix: 'Download the mod from here: ',
            href: 'https://dkov.itch.io/foxhole-alternative-squad-leaderofficer-icon',
            label: 'Alternative Squad Leader & Officer icons mod',
            },
        details: [
          'This is pretty fast and simple to mod, so if you have simple requests (logos already made or with very few adjustments), contact me (discord) for custom versions.',
        ],
      },
      {
        name: 'Foxhole Vehicles Overhaul',
        author: 'WolfgangIX',
        modLinkDetail: {
          kind: 'link',
          prefix: 'Download the mod from here: ',
          href: 'https://www.nexusmods.com/foxhole/mods/10',
          label: 'Foxhole Vehicles Overhaul mod',
        },
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
      <section className="wiki-section" id="how-to-install-mods">
        <h2 className="wiki-section-heading">How to install mods in Foxhole</h2>
        <p>
          To install mods in Foxhole, you typically need to download the mod files from a trusted source and place them in the appropriate directory within your Foxhole installation folder. The exact location of your game files differs based on your operating system and where you installed the game. 
        </p>
        <p>
          On Windows, the default installation path is usually: <code>[YOUR DRIVE]:\Program Files (x86)\Steam\steamapps\common\Foxhole</code>
        </p>
        <p>
          From your Foxhole installation folder, you will need to go to the <code>War\Content\Paks</code> directory.
        </p>
        <p>
          In the <code>Paks</code> directory, you will need to extract the downloaded mod files. It will typically be a <code>.pak</code> file that you will be placed in this directory.
        </p>
        <p>
          After placing the mod files in the correct directory, you will need to restart the game for the changes to take effect.
        </p>
        <p>
          Below you will find an example image of how your <code>Paks</code> directory should look after installing mods. The <code>.pak</code> files for the mods should be present alongside the <code>War-WindowsNoEditor.pak</code> file.
        </p>
        <img id="paks-directory-example"
          src="/paksexampledirectory.png"
          alt="Example of the Paks directory after installing mods"
          className="mod-preview-image"
          loading="lazy"
        />
      </section>

      {MOD_SECTIONS.map((section) => (
        <section className="wiki-section" id={section.id} key={section.id}>
          <h2 className="wiki-section-heading">{section.title}</h2>
          {section.mods.map((mod) => (
            <details className="mod-entry" key={mod.name}>
              <summary className="mod-summary">
                <span className="mod-name">
                  {mod.name}
                  {mod.author && <span className="mod-author"> by {mod.author}</span>}
                </span>
              </summary>
              <div className="mod-details">
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
                {mod.modPreviewImage && (
                    <img
                      src={mod.modPreviewImage}
                      alt={`${mod.name} preview`}
                      className="mod-preview-image"
                      loading="lazy"
                    />
                  )}
                  {mod.modLinkDetail && (
                    <span className="mod-link-detail">
                      {mod.modLinkDetail.prefix}
                      <a href={mod.modLinkDetail.href} target="_blank" rel="noreferrer">
                        {mod.modLinkDetail.label}
                      </a>
                      {mod.modLinkDetail.suffix}
                    </span>
                  )}
              </div>
            </details>
          ))}
        </section>
      ))}
    </WikiArticleLayout>
  );
}