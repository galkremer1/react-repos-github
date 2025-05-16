import React from 'react';
import { getLanguageColor } from '../../utils/format';

interface LanguageBadgeProps {
  language: string | null;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
  if (!language) return null;
  
  const color = getLanguageColor(language);
  
  return (
    <div className="repo-card__language">
      <span 
        className="repo-card__language-color" 
        style={{ backgroundColor: color }} 
      />
      <span>{language}</span>
    </div>
  );
}; 