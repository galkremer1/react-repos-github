import { renderHook, waitFor } from '@testing-library/react';
import { useGithubRepo } from '../../hooks/useGithubRepo';
import { mockRepo } from '../mocks/mockData.js';
import axios from 'axios';

// Mock axios instead of the hook
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useGithubRepo Hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches repo data successfully', async () => {
    // Mock successful response
    mockedAxios.get.mockResolvedValueOnce({
      data: mockRepo,
      headers: {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4999',
        'x-ratelimit-reset': '1625097600'
      }
    });

    const { result } = renderHook(() => useGithubRepo({ user: 'facebook', repo: 'react' }));
    
    // Initially should be loading with empty repository
    expect(result.current.loading).toBe(true);
    expect(result.current.repository).toBeNull();
    expect(result.current.error).toBeNull();
    
    // Wait for data to be fetched
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check data is loaded correctly
    expect(result.current.repository).toEqual(mockRepo);
    expect(result.current.error).toBeNull();
    
    // Check rate limit info
    expect(result.current.rateLimit).toEqual({
      limit: 5000,
      remaining: 4999,
      reset: 1625097600
    });
    
    // Verify axios was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/repos/facebook/react');
  });

  it('handles API errors', async () => {
    // Mock API error
    const errorResponse = {
      response: {
        status: 403,
        data: { message: 'API rate limit exceeded' }
      }
    };
    mockedAxios.get.mockRejectedValueOnce(errorResponse);
    
    const { result } = renderHook(() => useGithubRepo({ user: 'facebook', repo: 'error-repo' }));
    
    // Wait for error state
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check error is handled correctly
    expect(result.current.repository).toBeNull();
    expect(result.current.error).not.toBeNull();
    
    // Verify axios was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/repos/facebook/error-repo');
  });

  it('handles 404 errors', async () => {
    // Mock not found response
    const errorResponse = {
      response: {
        status: 404,
        data: { message: 'Not Found' }
      }
    };
    mockedAxios.get.mockRejectedValueOnce(errorResponse);
    
    const { result } = renderHook(() => useGithubRepo({ user: 'facebook', repo: 'not-found' }));
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check 404 error is handled correctly
    expect(result.current.repository).toBeNull();
    expect(result.current.error).not.toBeNull();
    
    // Verify axios was called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/repos/facebook/not-found');
  });

  it('handles non-Error objects in catch block', async () => {
    // Mock a non-Error rejection
    mockedAxios.get.mockRejectedValueOnce('Not an Error object');
    
    const { result } = renderHook(() => useGithubRepo({ user: 'facebook', repo: 'react' }));
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check error is handled correctly
    expect(result.current.repository).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe('An unknown error occurred');
  });

  it('updates when props change', async () => {
    // First render
    mockedAxios.get.mockResolvedValueOnce({
      data: mockRepo,
      headers: {}
    });
    
    const { result, rerender } = renderHook(
      (props) => useGithubRepo(props), 
      { initialProps: { user: 'facebook', repo: 'react' } }
    );
    
    // Wait for first data load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Second render with different props
    mockedAxios.get.mockResolvedValueOnce({
      data: { ...mockRepo, name: 'react-native' },
      headers: {}
    });
    
    // Rerender with new props
    rerender({ user: 'facebook', repo: 'react-native' });
    
    // Should be loading again
    expect(result.current.loading).toBe(true);
    
    // Wait for second data load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.repository?.name).toBe('react-native');
    });
    
    // Verify axios was called twice with different URLs
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, 'https://api.github.com/repos/facebook/react');
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, 'https://api.github.com/repos/facebook/react-native');
  });
}); 