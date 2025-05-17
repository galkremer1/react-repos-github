import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RepoCard } from '../components/RepoCard';
import '../styles.css';

// Mock repository data
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

const meta = {
  title: 'GitHub/RepoCard',
  component: RepoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Repository card component that displays GitHub repository information. Clicking on the card will open the repository in a new window.'
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
  },
} as Meta<typeof RepoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
  },
};


export const CustomStyling: Story = {
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    cardClassName: 'custom-card',
  },
};

export const WithAvatar: Story = {
  args: {
    repository: mockRepo as any,
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
    showAvatar: true,
    avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4', // Facebook's GitHub avatar
  },
}; 