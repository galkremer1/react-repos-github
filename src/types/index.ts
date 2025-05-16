// Repository data types
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  topics: string[];
  visibility: string;
}

// Base repository component props
export interface BaseRepoProps {
  // Display options
  showName?: boolean;
  showDescription?: boolean;
  showStars?: boolean;
  showForks?: boolean;
  showLanguage?: boolean;
  showLastUpdated?: boolean;
  showAvatar?: boolean;
  avatarUrl?: string;
  
  // Styling options
  className?: string;
  cardClassName?: string;
  
  // Callback function
  onRepoClick?: (repo: Repository) => void;
  onError?: (error: Error) => void;
}

// Single repository component props
export interface ReactGithubRepoProps extends BaseRepoProps {
  user: string;
  repo: string;
  usePreFetchedData?: boolean;
  preFetchedData?: Repository;
}

// Multiple repositories component props
export interface ReactGithubReposProps extends BaseRepoProps {
  user: string;
  repos?: string[];
  excludedRepos?: string[];
  
  // Interactivity options
  enableSorting?: boolean;
  enableFiltering?: boolean;
  sortBy?: 'stars' | 'forks' | 'updated';
  sortDirection?: 'asc' | 'desc';
  
  // Pagination options
  itemsPerPage?: number;
  
  // Data fetching options
  usePreFetchedData?: boolean;
  preFetchedData?: Repository[];
}

// Sorting options
export type SortOption = 'stars' | 'forks' | 'updated';
export type SortDirection = 'asc' | 'desc'; 