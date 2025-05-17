// Import jest-dom matchers
require('@testing-library/jest-dom');

// Mock window.scrollTo to avoid JSDOM errors in tests
window.scrollTo = jest.fn();

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {},
  };
}; 