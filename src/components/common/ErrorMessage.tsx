import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message" role="alert">
      <strong>Error: </strong>
      <span>{message}</span>
    </div>
  );
}; 