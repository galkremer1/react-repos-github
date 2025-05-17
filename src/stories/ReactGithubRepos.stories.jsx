import { ReactGithubRepos } from '../components/ReactGithubRepos';
import '../styles.css';

const meta = {
  title: 'GitHub/ReactGithubRepos',
  component: ReactGithubRepos,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Component that displays a grid of GitHub repositories. Clicking on a repository card will open the repository in a new window.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    showName: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showStars: { control: 'boolean' },
    showForks: { control: 'boolean' },
    showLanguage: { control: 'boolean' },
    showLastUpdated: { control: 'boolean' },
    showAvatar: { control: 'boolean' },
    enableSorting: { control: 'boolean' },
    enableFiltering: { control: 'boolean' },
    itemsPerPage: { control: { type: 'range', min: 3, max: 12, step: 3 }},
    sortBy: { 
      control: { type: 'select' }, 
      options: ['stars', 'forks', 'updated']
    },
    sortDirection: { 
      control: { type: 'select' }, 
      options: ['asc', 'desc']
    },
  },
};

export default meta;

export const Default = {
  args: {
    user: 'facebook',
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    enableSorting: true,
    enableFiltering: true,
    itemsPerPage: 6,
    sortBy: 'stars',
    sortDirection: 'desc',
  },
};

export const SpecificRepos = {
  args: {
    user: 'facebook',
    repos: ['react', 'react-native', 'jest', 'flux', 'create-react-app', 'relay'],
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    enableSorting: true,
    enableFiltering: true,
    itemsPerPage: 6,
  },
};

export const MinimalWithFewerItems = {
  args: {
    user: 'facebook',
    showName: true,
    showDescription: false,
    showStars: true,
    showForks: false,
    showLanguage: true,
    showLastUpdated: false,
    enableSorting: false,
    enableFiltering: false,
    itemsPerPage: 3,
  },
};

export const WithAvatars = {
  args: {
    user: 'facebook',
    repos: ['react', 'react-native', 'jest', 'flux', 'create-react-app', 'relay'],
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    showAvatar: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4', // Facebook's GitHub avatar
    enableSorting: true,
    enableFiltering: true,
    itemsPerPage: 6,
  },
}; 