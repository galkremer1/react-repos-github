import React, { useState, useMemo } from 'react';
import { ReactGithubReposProps, Repository, SortOption, SortDirection } from '../types';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { RepoCard } from './RepoCard';
import { LoadingIndicator } from './common/LoadingIndicator';
import { ErrorMessage } from './common/ErrorMessage';
import { Pagination } from './common/Pagination';
import { FilterSort } from './common/FilterSort';

export const ReactGithubRepos: React.FC<ReactGithubReposProps> = ({
  user,
  repos,
  excludedRepos,
  usePreFetchedData = false,
  preFetchedData,
  sortBy = 'stars',
  sortDirection = 'desc',
  enableSorting = true,
  enableFiltering = true,
  itemsPerPage = 6,
  onError,
  ...restProps
}) => {
  // States for filtering and pagination
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSortBy, setCurrentSortBy] = useState<SortOption>(sortBy);
  const [currentSortDirection, setCurrentSortDirection] = useState<SortDirection>(sortDirection);

  // Use pre-fetched data if provided, otherwise fetch from API
  const { repositories, loading, error } = usePreFetchedData && preFetchedData
    ? { repositories: preFetchedData, loading: false, error: null }
    : useGithubRepos({
        user,
        repos,
        excludedRepos,
        sortBy: currentSortBy,
        sortDirection: currentSortDirection,
      });

  // Handle error with callback if provided
  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Filter repositories based on search term
  const filteredRepositories = useMemo(() => {
    if (!repositories) return [];
    if (!filter) return repositories;

    const lowerCaseFilter = filter.toLowerCase();
    return repositories.filter(repo => {
      const nameMatch = repo.name.toLowerCase().includes(lowerCaseFilter);
      const descriptionMatch = repo.description ? repo.description.toLowerCase().includes(lowerCaseFilter) : false;
      const languageMatch = repo.language ? repo.language.toLowerCase().includes(lowerCaseFilter) : false;
      
      return nameMatch || descriptionMatch || languageMatch;
    });
  }, [repositories, filter]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredRepositories.length / itemsPerPage));
  
  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Get current page repositories
  const currentRepositories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRepositories.slice(startIndex, endIndex);
  }, [filteredRepositories, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Create a ref to access the repo grid container
    const repoGridContainer = document.querySelector('.repo-grid');
    // Scroll the container to the top instead of the window
    if (repoGridContainer) {
      repoGridContainer.scrollTop = 0;
    }
  };

  // Handle sort option change
  const handleSortChange = (option: SortOption) => {
    setCurrentSortBy(option);
  };

  // Handle sort direction change
  const handleDirectionChange = (direction: SortDirection) => {
    setCurrentSortDirection(direction);
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={`Failed to load repositories: ${error.message}`} />;
  }

  if (!repositories || repositories.length === 0) {
    return <ErrorMessage message="No repositories found" />;
  }

  return (
    <div className={`eact-repos-github ${!enableFiltering && !enableSorting ? 'eact-repos-github--no-controls' : ''} ${restProps.className || ''}`}>
      {(enableFiltering || enableSorting) && (
        <FilterSort
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
          onFilterChange={handleFilterChange}
          sortBy={currentSortBy}
          sortDirection={currentSortDirection}
          filter={filter}
          enableSorting={enableSorting}
          enableFiltering={enableFiltering}
        />
      )}
      
      <div className="repo-grid">
        {currentRepositories.map((repo) => (
          <RepoCard
            key={repo.id}
            repository={repo}
            showAvatar={restProps.showAvatar}
            avatarUrl={restProps.avatarUrl}
            showName={restProps.showName}
            showDescription={restProps.showDescription}
            showStars={restProps.showStars}
            showForks={restProps.showForks}
            showLanguage={restProps.showLanguage}
            showLastUpdated={restProps.showLastUpdated}
            className={restProps.className}
            cardClassName={restProps.cardClassName}
            onRepoClick={restProps.onRepoClick}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}; 