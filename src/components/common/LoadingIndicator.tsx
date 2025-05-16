import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium' }) => {
  const sizeClass = {
    small: { width: '16px', height: '16px' },
    medium: { width: '24px', height: '24px' },
    large: { width: '32px', height: '32px' }
  }[size];
  
  return (
    <div className="loading-indicator">
      <div className="loading-spinner" style={sizeClass}></div>
    </div>
  );
}; 