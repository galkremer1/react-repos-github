import React from 'react';
import { formatNumber } from '../../utils/format';

interface StatBadgeProps {
  count: number;
  icon: React.ReactNode;
  label?: string;
}

export const StatBadge: React.FC<StatBadgeProps> = ({ count, icon, label }) => {
  return (
    <div className="repo-card__stat">
      <span className="repo-card__stat-icon">{icon}</span>
      <span>{formatNumber(count)}</span>
      {label && <span className="ml-1">{label}</span>}
    </div>
  );
}; 