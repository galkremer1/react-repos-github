import React from 'react';
import { ReactGithubRepoProps } from '../types';
import { useGithubRepo } from '../hooks/useGithubRepo';
import { RepoCard } from './RepoCard';
import { LoadingIndicator } from './common/LoadingIndicator';
import { ErrorMessage } from './common/ErrorMessage';

export const ReactGithubRepo: React.FC<ReactGithubRepoProps> = ({
  user,
  repo,
  usePreFetchedData = false,
  preFetchedData,
  onError,
  ...restProps
}) => {
  // Use pre-fetched data if provided, otherwise fetch from API
  const { repository, loading, error } = usePreFetchedData && preFetchedData
    ? { repository: preFetchedData, loading: false, error: null }
    : useGithubRepo({ user, repo });

  // Handle error with callback if provided
  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={`Failed to load repository: ${error.message}`} />;
  }

  if (!repository) {
    return <ErrorMessage message="Repository not found" />;
  }

  return (
    <RepoCard
      repository={repository}
      {...restProps}
    />
  );
}; 