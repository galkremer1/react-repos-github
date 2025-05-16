# React GitHub Repos

A React component library for displaying GitHub repositories with various customization options.

## Installation

```bash
npm install react-github-repos
# or
yarn add react-github-repos
```

## Features

- Display single or multiple GitHub repositories
- Configurable display options (stars, forks, language, etc.)
- Built-in sorting and filtering capabilities
- Responsive grid layout
- Pagination support
- Accessible UI components
- GitHub-like styling
- Rate limit handling
- Support for pre-fetched data

## Usage

### Display a Single Repository

```jsx
import { ReactGithubRepo } from 'react-github-repos';

function App() {
  return (
    <ReactGithubRepo 
      user="facebook" 
      repo="react" 
    />
  );
}
```

### Display Multiple Repositories

```jsx
import { ReactGithubRepos } from 'react-github-repos';

function App() {
  return (
    <ReactGithubRepos 
      user="facebook"
      enableSorting={true}
      enableFiltering={true}
      itemsPerPage={6}
    />
  );
}
```

## Storybook

The library includes a Storybook setup to help you explore and test the components interactively. To run Storybook locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/react-github-repos.git
cd react-github-repos

# Install dependencies
npm install

# Start Storybook
npm run storybook
```

This will launch Storybook at http://localhost:6006 where you can:
- View different component variations
- Adjust component props in real-time
- See documentation and examples

You can also view the deployed Storybook at: [https://galkremer1.github.io/react-github-repos](https://galkremer1.github.io/react-github-repos)

## Deployment

This project uses GitHub Actions to automatically deploy the Storybook documentation to GitHub Pages whenever changes are pushed to the main branch.

The workflow does the following:
- Builds the Storybook site
- Deploys it to the gh-pages branch
- Makes it available at [https://galkremer1.github.io/react-github-repos](https://galkremer1.github.io/react-github-repos)

To make changes to the deployment process, edit the workflow file at `.github/workflows/deploy.yml`.

## Components

### `<ReactGithubRepo />`

Displays a single GitHub repository.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `string` | (Required) | GitHub username |
| `repo` | `string` | (Required) | Repository name |
| `showName` | `boolean` | `true` | Show repository name |
| `showDescription` | `boolean` | `true` | Show repository description |
| `showStars` | `boolean` | `true` | Show star count |
| `showForks` | `boolean` | `true` | Show fork count |
| `showLanguage` | `boolean` | `true` | Show primary language |
| `showLastUpdated` | `boolean` | `true` | Show last updated time |
| `className` | `string` | `''` | Additional CSS class for the wrapper |
| `cardClassName` | `string` | `''` | Additional CSS class for the card |
| `onRepoClick` | `(repo) => void` | Opens GitHub page | Callback when repository is clicked |
| `onError` | `(error) => void` | - | Callback when an error occurs |
| `usePreFetchedData` | `boolean` | `false` | Use pre-fetched data instead of API |
| `preFetchedData` | `Repository` | - | Pre-fetched repository data |

### `<ReactGithubRepos />`

Displays multiple GitHub repositories in a grid layout.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `string` | (Required) | GitHub username |
| `repos` | `string[]` | - | Specific repositories to display |
| `excludedRepos` | `string[]` | - | Repositories to exclude |
| `showName` | `boolean` | `true` | Show repository names |
| `showDescription` | `boolean` | `true` | Show repository descriptions |
| `showStars` | `boolean` | `true` | Show star counts |
| `showForks` | `boolean` | `true` | Show fork counts |
| `showLanguage` | `boolean` | `true` | Show primary languages |
| `showLastUpdated` | `boolean` | `true` | Show last updated times |
| `className` | `string` | `''` | Additional CSS class for the wrapper |
| `cardClassName` | `string` | `''` | Additional CSS class for the cards |
| `enableSorting` | `boolean` | `true` | Enable sorting controls |
| `enableFiltering` | `boolean` | `true` | Enable filtering input |
| `sortBy` | `'stars' \| 'forks' \| 'updated'` | `'stars'` | Default sort field |
| `sortDirection` | `'asc' \| 'desc'` | `'desc'` | Default sort direction |
| `itemsPerPage` | `number` | `6` | Number of repos per page |
| `onRepoClick` | `(repo) => void` | Opens GitHub page | Callback when repository is clicked |
| `onError` | `(error) => void` | - | Callback when an error occurs |
| `usePreFetchedData` | `boolean` | `false` | Use pre-fetched data instead of API |
| `preFetchedData` | `Repository[]` | - | Pre-fetched repositories data |

## Advanced Usage

### Using Pre-fetched Data

```jsx
import { ReactGithubRepos } from 'react-github-repos';

function App() {
  const repoData = [
    {
      id: 10270250,
      name: "react",
      full_name: "facebook/react",
      html_url: "https://github.com/facebook/react",
      description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      stargazers_count: 180000,
      forks_count: 37000,
      language: "JavaScript",
      // ... other GitHub repository fields
    },
    // ... more repositories
  ];

  return (
    <ReactGithubRepos 
      user="facebook"
      usePreFetchedData={true}
      preFetchedData={repoData}
    />
  );
}
```

### Direct Hooks Access

The library also exports hooks for direct access to the GitHub data:

```jsx
import { useGithubRepo, useGithubRepos } from 'react-github-repos';

function CustomComponent() {
  const { repository, loading, error } = useGithubRepo({ 
    user: 'facebook', 
    repo: 'react' 
  });
  
  // Or for multiple repositories
  const { repositories, loading, error } = useGithubRepos({ 
    user: 'facebook',
    sortBy: 'stars',
    sortDirection: 'desc'
  });
  
  // ...custom rendering logic
}
```

## Type Definitions

The library includes comprehensive TypeScript definitions for all components and data structures.

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Internet Explorer is not supported

## License

MIT License 