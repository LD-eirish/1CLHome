import type { HighCommanders } from '../../data/types/highCommander.types';

interface HighCommanderCardProps {
  readonly highCommander: HighCommanders;
  readonly index: number;
}

export function HighCommanderCard({ highCommander, index }: Readonly<HighCommanderCardProps>) {
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const startDate = new Date(`${highCommander.officeStart}T00:00:00`);
  const endDate = highCommander.officeEnd ? new Date(`${highCommander.officeEnd}T00:00:00`) : null;
  const formattedStart = dateFormatter.format(startDate);
  const formattedEnd = endDate ? dateFormatter.format(endDate) : 'Present';
  const viceHighCommander = highCommander.viceHighCommander ?? 'None';
  const viceRegiment = highCommander.viceRegiment ?? 'None';
  const showViceRegiment = viceHighCommander !== 'None';

  return (
    <article
      className="high-commander-card high-commander-card--political"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="high-commander-card-content">
        <div className="high-commander-timeline-body">
          <h4 className="high-commander-name">{highCommander.name}</h4>
          <dl className="high-commander-meta-list">
            <div className="high-commander-meta-row">
              <dt>Regiment</dt>
              <dd>{highCommander.regiment}</dd>
            </div>
            <div className="high-commander-meta-row">
              <dt>Office period</dt>
              <dd>{formattedStart} to {formattedEnd}</dd>
            </div>
            <div className="high-commander-meta-row">
              <dt>War</dt>
              <dd>{highCommander.war ?? '—'}</dd>
            </div>
            <div className="high-commander-meta-row">
              <dt>Vice</dt>
              <dd>
                <span className="high-commander-vice-name">{viceHighCommander}</span>
                {showViceRegiment && <span className="high-commander-vice-regiment">Regiment: {viceRegiment}</span>}
              </dd>
            </div>
          </dl>
          <div className="high-commander-statement">
            <span className="high-commander-statement-label">Profile</span>
            <p className="high-commander-desc">{highCommander.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
