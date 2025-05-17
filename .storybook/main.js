const config = {
  stories: ["../src/**/*.stories.@(js|jsx)"], // Only include JS/JSX story files
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: false
  },
  // Disable docgen for the build process
  features: {
    storyStoreV7: true,
    buildStoriesJson: false
  },
  docs: {
    autodocs: false
  }
};

export default config;