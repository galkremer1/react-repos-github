import { useState, useEffect } from 'react';
import axios from 'axios';
import { Repository, SortOption, SortDirection } from '../types';

interface UseGithubReposProps {
  user: string;
  repos?: string[];
  excludedRepos?: string[];
  sortBy?: SortOption;
  sortDirection?: SortDirection;
}

interface UseGithubReposResult {
  repositories: Repository[];
  loading: boolean;
  error: Error | null;
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  } | null;
}

export const useGithubRepos = ({
  user,
  repos,
  excludedRepos,
  sortBy = 'stars',
  sortDirection = 'desc',
}: UseGithubReposProps): UseGithubReposResult => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [rateLimit, setRateLimit] = useState<{
    limit: number;
    remaining: number;
    reset: number;
  } | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        // If specific repos are provided, fetch them individually
        if (repos && repos.length > 0) {
          const repoPromises = repos.map(repo => 
            axios.get<Repository>(`https://api.github.com/repos/${user}/${repo}`)
          );
          
          const results = await Promise.all(repoPromises);
          const fetchedRepos = results.map(result => result.data);
          
          // Get rate limit info from the last request
          if (results.length > 0) {
            const lastResponse = results[results.length - 1];
            setRateLimit({
              limit: parseInt(lastResponse.headers['x-ratelimit-limit'] || '0'),
              remaining: parseInt(lastResponse.headers['x-ratelimit-remaining'] || '0'),
              reset: parseInt(lastResponse.headers['x-ratelimit-reset'] || '0'),
            });
          }
          
          setRepositories(fetchedRepos);
        } else {
          // Fetch all repositories for the user
          const response = await axios.get<Repository[]>(
            `https://api.github.com/users/${user}/repos?per_page=100`
          );
          
          // Set rate limit info
          setRateLimit({
            limit: parseInt(response.headers['x-ratelimit-limit'] || '0'),
            remaining: parseInt(response.headers['x-ratelimit-remaining'] || '0'),
            reset: parseInt(response.headers['x-ratelimit-reset'] || '0'),
          });
          
          let fetchedRepos = response.data;
          
          // Filter out excluded repos if provided
          if (excludedRepos && excludedRepos.length > 0) {
            fetchedRepos = fetchedRepos.filter(
              repo => !excludedRepos.includes(repo.name)
            );
          }
          
          setRepositories(fetchedRepos);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [user, repos ? repos.join(',') : '', excludedRepos ? excludedRepos.join(',') : '']);

  // Sort repositories based on sortBy and sortDirection
  useEffect(() => {
    if (repositories.length > 0) {
      const sortedRepos = [...repositories].sort((a, b) => {
        let valueA: string | number;
        let valueB: string | number;

        switch (sortBy) {
          case 'stars':
            valueA = a.stargazers_count;
            valueB = b.stargazers_count;
            break;
          case 'forks':
            valueA = a.forks_count;
            valueB = b.forks_count;
            break;
          case 'updated':
            valueA = new Date(a.updated_at).getTime();
            valueB = new Date(b.updated_at).getTime();
            break;
          default:
            valueA = a.stargazers_count;
            valueB = b.stargazers_count;
        }

        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });

      setRepositories(sortedRepos);
    }
  }, [sortBy, sortDirection, repositories.length]);

  return { repositories, loading, error, rateLimit };
}; 