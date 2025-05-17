import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ReactGithubRepo } from '../../components/ReactGithubRepo';
import { mockRepo } from '../mocks/mockData.js';
import * as useGithubRepoModule from '../../hooks/useGithubRepo';

// Mock the useGithubRepo hook
jest.mock('../../hooks/useGithubRepo', () => ({
  useGithubRepo: jest.fn()
}));

describe('ReactGithubRepo Component', () => {
  const mockErrorCallback = jest.fn();
  const mockedUseGithubRepo = useGithubRepoModule.useGithubRepo as jest.Mock;

  beforeEach(() => {
    // Default mock implementation - success state
    mockedUseGithubRepo.mockImplementation(() => ({
      repository: mockRepo,
      loading: false,
      error: null
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Override to show loading state
    mockedUseGithubRepo.mockImplementationOnce(() => ({
      repository: null,
      loading: true,
      error: null
    }));

    render(<ReactGithubRepo user="facebook" repo="react" />);
    
    // Look for loading indicator by class instead of role
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders repository information after loading', async () => {
    render(<ReactGithubRepo user="facebook" repo="react" />);
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Check elements
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('uses pre-fetched data when provided', () => {
    render(
      <ReactGithubRepo 
        user="any-user" 
        repo="any-repo" 
        usePreFetchedData={true}
        preFetchedData={mockRepo}
      />
    );
    
    // Check that loading is skipped and data is shown immediately
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
  });

  it('displays error message when API request fails', async () => {
    // Override to show error state
    mockedUseGithubRepo.mockImplementationOnce(() => ({
      repository: null,
      loading: false,
      error: { message: 'API rate limit exceeded' }
    }));
    
    render(
      <ReactGithubRepo 
        user="facebook" 
        repo="react" 
        onError={mockErrorCallback}
      />
    );
    
    // Error is immediately available due to mock
    expect(screen.getByText(/Failed to load repository/i)).toBeInTheDocument();
    
    // Check error callback was called
    expect(mockErrorCallback).toHaveBeenCalled();
  });

  it('displays "Repository not found" for 404 responses', async () => {
    // Override to show 404 error
    mockedUseGithubRepo.mockImplementationOnce(() => ({
      repository: null,
      loading: false,
      error: { message: 'Repository not found' }
    }));
    
    render(<ReactGithubRepo user="facebook" repo="nonexistent" />);
    
    // Error is immediately available due to mock - look for partial text
    expect(screen.getByText(/Repository not found/i)).toBeInTheDocument();
  });

  it('passes display props to RepoCard', async () => {
    render(
      <ReactGithubRepo 
        user="facebook" 
        repo="react"
        showDescription={false}
        showStars={false}
      />
    );
    
    // Verify props were passed correctly
    expect(screen.queryByText(mockRepo.description)).not.toBeInTheDocument();
    expect(screen.queryByText('203K')).not.toBeInTheDocument();
  });
}); 