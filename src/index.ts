import './styles.css';

// Export main components
export { ReactGithubRepo } from './components/ReactGithubRepo';
export { ReactGithubRepos } from './components/ReactGithubRepos';
export { RepoCard } from './components/RepoCard';

// Export types
export type {
  Repository,
  BaseRepoProps,
  ReactGithubRepoProps,
  ReactGithubReposProps,
  SortOption,
  SortDirection,
} from './types';

// Export hooks for advanced usage
export { useGithubRepo } from './hooks/useGithubRepo';
export { useGithubRepos } from './hooks/useGithubRepos';

// Export utilities
export {
  formatRelativeTime,
  formatNumber,
  getLanguageColor,
} from './utils/format'; 