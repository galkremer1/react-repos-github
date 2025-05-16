import { useState, useEffect } from 'react';
import axios from 'axios';
import { Repository } from '../types';

interface UseGithubRepoProps {
  user: string;
  repo: string;
}

interface UseGithubRepoResult {
  repository: Repository | null;
  loading: boolean;
  error: Error | null;
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  } | null;
}

export const useGithubRepo = ({
  user,
  repo,
}: UseGithubRepoProps): UseGithubRepoResult => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [rateLimit, setRateLimit] = useState<{
    limit: number;
    remaining: number;
    reset: number;
  } | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Repository>(
          `https://api.github.com/repos/${user}/${repo}`
        );
        
        setRepository(response.data);
        
        // Set rate limit info
        setRateLimit({
          limit: parseInt(response.headers['x-ratelimit-limit'] || '0'),
          remaining: parseInt(response.headers['x-ratelimit-remaining'] || '0'),
          reset: parseInt(response.headers['x-ratelimit-reset'] || '0'),
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [user, repo]);

  return { repository, loading, error, rateLimit };
}; 