const { setupServer } = require('msw/node');
const { handlers } = require('./handlers');

// Setup MSW server with the defined handlers
export const server = setupServer(...handlers);

