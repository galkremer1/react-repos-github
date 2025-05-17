import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ReactGithubRepos } from '../../components/ReactGithubRepos';
import { mockRepos } from '../mocks/mockData.js';
import * as useGithubReposModule from '../../hooks/useGithubRepos';

// Mock window.scrollTo to avoid JSDOM error
global.scrollTo = jest.fn();

// Mock the useGithubRepos hook
jest.mock('../../hooks/useGithubRepos', () => ({
  useGithubRepos: jest.fn()
}));

describe('ReactGithubRepos Component', () => {
  const mockErrorCallback = jest.fn();
  const mockedUseGithubRepos = useGithubReposModule.useGithubRepos as jest.Mock;

  beforeEach(() => {
    // Default mock implementation - success state
    mockedUseGithubRepos.mockImplementation(() => ({
      repositories: mockRepos,
      loading: false,
      error: null
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Override to show loading state
    mockedUseGithubRepos.mockImplementationOnce(() => ({
      repositories: [],
      loading: true,
      error: null
    }));

    render(<ReactGithubRepos user="facebook" />);
    
    // Look for loading indicator by data-testid
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders repository list after loading', async () => {
    render(<ReactGithubRepos user="facebook" />);
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Check all repositories are displayed
    expect(screen.getByText('react-native')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('uses pre-fetched data when provided', () => {
    render(
      <ReactGithubRepos 
        user="any-user" 
        usePreFetchedData={true}
        preFetchedData={mockRepos}
      />
    );
    
    // Check that loading is skipped and data is shown immediately
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('react-native')).toBeInTheDocument();
  });

  it('displays error message when API request fails', async () => {
    // Override to show error state
    mockedUseGithubRepos.mockImplementationOnce(() => ({
      repositories: [],
      loading: false,
      error: { message: 'API rate limit exceeded' }
    }));
    
    render(
      <ReactGithubRepos 
        user="facebook" 
        onError={mockErrorCallback}
      />
    );
    
    // Error is immediately available due to mock
    expect(screen.getByText(/Failed to load repositories/i)).toBeInTheDocument();
    
    // Check error callback was called
    expect(mockErrorCallback).toHaveBeenCalled();
  });

  it('displays "No repositories found" when API returns empty array', async () => {
    // Override to show empty results
    mockedUseGithubRepos.mockImplementationOnce(() => ({
      repositories: [],
      loading: false,
      error: null
    }));
    
    render(<ReactGithubRepos user="empty-user" />);
    
    // Empty message is immediately available due to mock
    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  it('filters repositories based on search input', async () => {
    render(
      <ReactGithubRepos 
        user="facebook" 
        enableFiltering={true}
      />
    );
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('react-native')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
    
    // Find the filter input and type into it
    const filterInput = screen.getByPlaceholderText('Filter repositories...');
    fireEvent.change(filterInput, { target: { value: 'native' } });
    
    // Check filtered results
    expect(screen.getByText('react-native')).toBeInTheDocument();
    expect(screen.queryByText('react')).not.toBeInTheDocument();
    expect(screen.queryByText('jest')).not.toBeInTheDocument();
  });

  it('sorts repositories when sort options are changed', async () => {
    render(
      <ReactGithubRepos 
        user="facebook" 
        enableSorting={true}
      />
    );
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Find the sort select and change it
    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'name' } });
    
    // Find the direction select and change it
    const directionSelect = screen.getByLabelText(/sort direction/i);
    fireEvent.change(directionSelect, { target: { value: 'asc' } });
    
    // Repository order should change, but all items should still be there
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('react-native')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('displays pagination when there are enough items', async () => {
    render(
      <ReactGithubRepos 
        user="facebook" 
        itemsPerPage={2}
      />
    );
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Check pagination is rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Only first 2 repositories are visible on first page
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('react-native')).toBeInTheDocument();
    expect(screen.queryByText('jest')).not.toBeInTheDocument();
    
    // Click page 2
    fireEvent.click(screen.getByText('2'));
    
    // Now only the 3rd repository should be visible
    expect(screen.queryByText('react')).not.toBeInTheDocument();
    expect(screen.queryByText('react-native')).not.toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('does not show filtering and sorting controls when disabled', async () => {
    render(
      <ReactGithubRepos 
        user="facebook" 
        enableFiltering={false}
        enableSorting={false}
      />
    );
    
    // Data is immediately available due to mock
    expect(screen.getByText('react')).toBeInTheDocument();
    
    // Search input and sort selects should not be rendered
    expect(screen.queryByPlaceholderText('Filter repositories...')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/sort by/i)).not.toBeInTheDocument();
  });
}); 