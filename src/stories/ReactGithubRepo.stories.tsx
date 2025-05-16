import type { Meta, StoryObj } from '@storybook/react';
import { ReactGithubRepo } from '../components/ReactGithubRepo';
import '../styles.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'GitHub/ReactGithubRepo',
  component: ReactGithubRepo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    showName: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showStars: { control: 'boolean' },
    showForks: { control: 'boolean' },
    showLanguage: { control: 'boolean' },
    showLastUpdated: { control: 'boolean' },
  },
} satisfies Meta<typeof ReactGithubRepo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    user: 'facebook',
    repo: 'react',
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
  },
};

export const MinimalDisplay: Story = {
  args: {
    user: 'facebook',
    repo: 'react',
    showName: true,
    showDescription: false,
    showStars: true,
    showForks: false,
    showLanguage: false,
    showLastUpdated: false,
  },
};

export const TypeScriptRepo: Story = {
  args: {
    user: 'microsoft',
    repo: 'typescript',
    showName: true,
    showDescription: true,
    showStars: true,
    showForks: true,
    showLanguage: true,
    showLastUpdated: true,
  },
}; 