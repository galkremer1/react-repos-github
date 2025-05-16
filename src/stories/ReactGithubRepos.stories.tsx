import type { Meta, StoryObj } from '@storybook/react';
import { ReactGithubRepos } from '../components/ReactGithubRepos';
import '../styles.css';

const meta = {
  title: 'GitHub/ReactGithubRepos',
  component: ReactGithubRepos,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showName: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showStars: { control: 'boolean' },
    showForks: { control: 'boolean' },
    showLanguage: { control: 'boolean' },
    showLastUpdated: { control: 'boolean' },
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
} satisfies Meta<typeof ReactGithubRepos>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const SpecificRepos: Story = {
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

export const MinimalWithFewerItems: Story = {
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