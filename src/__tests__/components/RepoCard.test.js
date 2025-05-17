const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { RepoCard } = require('../../components/RepoCard');

// Local mock repository data
const mockRepo = {
  id: 10270250,
  name: 'react',
  full_name: 'facebook/react',
  html_url: 'https://github.com/facebook/react',
  description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  fork: false,
  url: 'https://api.github.com/repos/facebook/react',
  created_at: '2013-05-24T16:15:54Z',
  updated_at: '2023-06-15T10:47:32Z',
  pushed_at: '2023-06-15T09:36:27Z',
  stargazers_count: 203000,
  watchers_count: 203000,
  language: 'JavaScript',
  forks_count: 42000,
  archived: false,
  disabled: false,
  open_issues_count: 1200,
  license: {
    key: 'mit',
    name: 'MIT License',
    url: 'https://api.github.com/licenses/mit'
  },
  topics: ['javascript', 'reactjs', 'frontend'],
  visibility: 'public'
};

describe('RepoCard Component', () => {
  const mockRepoClick = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all information', () => {
    render(<RepoCard repository={mockRepo} />);
    
    // Check that all elements are rendered
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('203,000')).toBeInTheDocument(); // Star count
  });

  it('renders with minimal display when showDescription is false', () => {
    render(
      <RepoCard 
        repository={mockRepo} 
        showDescription={false}
        showForks={false}
        showLanguage={false}
      />
    );
    
    // Checking name is present but description is not
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.queryByText(mockRepo.description)).not.toBeInTheDocument();
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
  });

  it('displays avatar when showAvatar is true', () => {
    render(<RepoCard repository={mockRepo} showAvatar={true} />);
    
    // Check avatar is rendered with correct source
    const avatar = screen.getByAltText('Repository owner');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://github.com/facebook.png');
  });

  it('calls onRepoClick when clicked', () => {
    render(<RepoCard repository={mockRepo} onRepoClick={mockRepoClick} />);
    
    // Click the card
    fireEvent.click(screen.getByRole('button', { name: /Repository: react/i }));
    
    // Assert callback was called with correct repository
    expect(mockRepoClick).toHaveBeenCalledTimes(1);
    expect(mockRepoClick).toHaveBeenCalledWith(mockRepo);
  });

  it('opens repository URL in new tab when clicked without onRepoClick', () => {
    // Mock window.open
    const mockOpen = jest.fn();
    window.open = mockOpen;
    
    render(<RepoCard repository={mockRepo} />);
    
    // Click the card
    fireEvent.click(screen.getByRole('button', { name: /Repository: react/i }));
    
    // Assert window.open was called correctly
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(
      mockRepo.html_url,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('applies custom class names', () => {
    render(
      <RepoCard 
        repository={mockRepo} 
        className="custom-class"
        cardClassName="custom-card-class"
      />
    );
    
    // Check that custom classes are applied
    const card = screen.getByRole('button', { name: /Repository: react/i });
    expect(card).toHaveClass('custom-card-class');
  });
}); 