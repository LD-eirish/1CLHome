import { memo } from 'react';
import type { Regiment } from '../../data/types/regiment.types';
import { formatActivityTime } from '../../infrastructure/utils/path.utils';

interface RegimentRosterItemProps {
  readonly regiment: Regiment;
  readonly index: number;
  readonly onSelect: (regiment: Regiment) => void;
}

function RegimentRosterItemComponent({ regiment, index, onSelect }: Readonly<RegimentRosterItemProps>) {
  const isInactive = Boolean(regiment.inactive);
  const tags = regiment.tags?.filter((tag) => tag.trim() !== '') ?? [];

  return (
    <button
      type="button"
      className={`regiment-roster-item${isInactive ? ' regiment-roster-item--inactive' : ''}`}
      onClick={() => onSelect(regiment)}
      disabled={isInactive}
      aria-label={isInactive ? `${regiment.name}, inactive` : `View details for ${regiment.name}`}
    >
      <span className="regiment-roster-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="regiment-roster-copy">
        <span className="regiment-roster-heading">
          <span className="regiment-roster-name">{regiment.name}</span>
          <span className="regiment-roster-abbreviation">{regiment.abbreviation}</span>
          {isInactive && <span className="regiment-roster-status">Inactive</span>}
        </span>
        <span className="regiment-roster-meta">
          <span>Led by {regiment.leader ?? 'TBD'}</span>
          {regiment.activityTime && <span>Peak {formatActivityTime(regiment.activityTime, false)}</span>}
        </span>
        {tags.length > 0 && (
          <span className="regiment-roster-tags">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </span>
        )}
      </span>
    </button>
  );
}

export const RegimentRosterItem = memo(RegimentRosterItemComponent);
