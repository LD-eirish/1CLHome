import { HighCommanders } from '../../data/types/highCommander.types';
import type { Regiment } from '../../data/types/regiment.types';
import { assetPath } from '../../infrastructure/utils/asset.utils';
import { formatActivityTime } from '../../infrastructure/utils/path.utils';

interface HighCommanderCardProps {
  readonly highCommander: HighCommanders;
  readonly index: number;
  readonly onClick?: () => void;
  readonly hideDetails?: boolean;
}

export function HighCommanderCard({ highCommander, index, hideDetails = false }: Readonly<HighCommanderCardProps>) {
  const truncatedDescription = highCommander.description.length > 120 
    ? `${highCommander.description.substring(0, 120)}...` 
    : highCommander.description;

  return (
    <article 
      className={`high-commander-card`}
      style={{ animationDelay: `${index * 0.1}s`}}
    >
      <div className="high-commander-card-content">
        <div className="high-commander-header" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div className="regiment-logo-wrap" style={{width: 64, height: 64, flexShrink: 0}}>
          </div>
          <div className="high-commander-name-wrap" style={{flex: 1}}>
            <h4 className="high-commander-name" style={{margin: 0}}>{highCommander.name}</h4>
          </div>
          <div className="high-commander-regiment-wrap" style={{flex: 1}}>
            <h4 className="high-commander-name" style={{margin: 0}}>{highCommander.regiment}</h4>
          </div>
          <div className="high-commander-mandate-wrap" style={{flex: 1}}>
            <h4 className="high-commander-mandate" style={{margin: 0}}>{highCommander.mandate}</h4>
          </div>
          <div className="high-commander-desc-wrap" style={{flex: 1}}>
            <h4 className="high-commander-desc" style={{margin: 0}}>{truncatedDescription}</h4>
          </div>
        </div>
      </div>
    </article>
  );
}
