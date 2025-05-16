import React from 'react';
import { Repository } from '../types';
import { LanguageBadge } from './common/LanguageBadge';
import { StatBadge } from './common/StatBadge';
import { formatRelativeTime } from '../utils/format';
import { StarIcon, ForkIcon, ClockIcon, RepoIcon } from './common/Icons';

interface RepoCardProps {
  repository: Repository;
  showName?: boolean;
  showDescription?: boolean;
  showStars?: boolean;
  showForks?: boolean;
  showLanguage?: boolean;
  showLastUpdated?: boolean;
  className?: string;
  cardClassName?: string;
  onRepoClick?: (repo: Repository) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repository,
  showName = true,
  showDescription = true,
  showStars = true,
  showForks = true,
  showLanguage = true,
  showLastUpdated = true,
  className = '',
  cardClassName = '',
  onRepoClick,
}) => {
  const handleRepoClick = () => {
    if (onRepoClick) {
      onRepoClick(repository);
    } else {
      window.open(repository.html_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`repo-card ${cardClassName}`}
      onClick={handleRepoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRepoClick();
        }
      }}
      aria-label={`Repository: ${repository.name}`}
    >
      <div className="repo-card__content">
        <RepoIcon className="repo-card__icon" />
        <div className="repo-card__body">
          {showName && (
            <h3 className="repo-card__name" title={repository.name}>
              {repository.name}
            </h3>
          )}
          
          {showDescription && repository.description && (
            <p className="repo-card__description" title={repository.description}>
              {repository.description}
            </p>
          )}
          
          <div className="repo-card__stats">
            {showStars && (
              <StatBadge
                count={repository.stargazers_count}
                icon={<StarIcon />}
              />
            )}
            
            {showForks && (
              <StatBadge
                count={repository.forks_count}
                icon={<ForkIcon />}
              />
            )}
            
            {showLanguage && repository.language && (
              <LanguageBadge language={repository.language} />
            )}
            
            {showLastUpdated && (
              <div className="repo-card__stat">
                <ClockIcon className="repo-card__stat-icon" />
                <span>{formatRelativeTime(repository.updated_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 