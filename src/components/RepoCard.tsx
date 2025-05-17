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
  showAvatar?: boolean;
  avatarUrl?: string;
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
  showAvatar = false,
  avatarUrl,
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

  const renderIcon = () => {
    // Always show avatar if showAvatar is true, regardless of avatarUrl
    if (showAvatar) {
      // If avatarUrl is provided, use it
      if (avatarUrl) {
        return <img src={avatarUrl} alt="User avatar" className="repo-card__avatar" />;
      }
      // If no avatarUrl but showAvatar is true, try to extract owner from full_name
      // and use GitHub's avatar API
      const ownerName = repository.full_name.split('/')[0];
      const githubAvatarUrl = `https://github.com/${ownerName}.png`;
      return <img src={githubAvatarUrl} alt="Repository owner" className="repo-card__avatar" />;
    }
    // Default to repo icon
    return <RepoIcon className="repo-card__icon" />;
  };

  // Determine if we're in minimal display mode
  // Check if description is hidden, as this is the main indicator of minimal mode
  const isMinimalMode = !showDescription;
  
  return (
    <div
      className={`repo-card ${isMinimalMode ? 'repo-card--minimal' : ''} ${cardClassName}`}
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
      {showStars && (
        <div className="repo-card__star-count">
          <StarIcon />
          <span>{repository.stargazers_count.toLocaleString()}</span>
        </div>
      )}
      
      <div className="repo-card__content">
        {renderIcon()}
        <div className="repo-card__body">
          <div className="repo-card__name-container">
            {showName ? (
              <h3 className="repo-card__name" title={repository.name}>
                {repository.name}
              </h3>
            ) : (
              <div className="repo-card__name-placeholder"></div>
            )}
          </div>
          
          {showDescription && (
            <div className="repo-card__description-container">
              {repository.description ? (
                <p className="repo-card__description" title={repository.description}>
                  {repository.description}
                </p>
              ) : (
                <div className="repo-card__description-placeholder"></div>
              )}
            </div>
          )}
          
          <div className={`repo-card__stats ${isMinimalMode ? 'repo-card__stats--minimal' : ''}`}>
            {showForks && (
              <StatBadge
                count={repository.forks_count}
                icon={<ForkIcon />}
              />
            )}
            
            {showLanguage && repository.language ? (
              <LanguageBadge language={repository.language} />
            ) : (
              <div className="repo-card__language-placeholder"></div>
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