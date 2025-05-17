import { http, HttpResponse } from 'msw';

// Mock repository data
export const mockRepo = {
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

// Mock repositories list
export const mockRepos = [
  mockRepo,
  {
    ...mockRepo,
    id: 10270251,
    name: 'react-native',
    full_name: 'facebook/react-native',
    description: 'A framework for building native applications using React',
    language: 'JavaScript',
    stargazers_count: 105000,
    forks_count: 22000,
  },
  {
    ...mockRepo,
    id: 10270252,
    name: 'jest',
    full_name: 'facebook/jest',
    description: 'Delightful JavaScript Testing.',
    language: 'TypeScript',
    stargazers_count: 41000,
    forks_count: 6000,
  }
];

// MSW Handlers
export const handlers = [
  // Handle single repository request
  http.get('https://api.github.com/repos/:owner/:repo', ({ params }) => {
    const { owner, repo } = params;
    
    if (owner === 'facebook' && repo === 'react') {
      return HttpResponse.json(mockRepo, { status: 200 });
    }
    
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  }),
  
  // Handle user repositories request
  http.get('https://api.github.com/users/:username/repos', ({ params }) => {
    const { username } = params;
    
    if (username === 'facebook') {
      return HttpResponse.json(mockRepos, { status: 200 });
    }
    
    return HttpResponse.json({ message: 'User not found' }, { status: 404 });
  }),
]; 