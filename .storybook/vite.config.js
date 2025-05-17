module.exports = {
  // Use esbuild for TypeScript
  esbuild: {
    // Add JSX and TSX to the loaders
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
  },
}; 