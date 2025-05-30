import { http } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server with the defined handlers
export const server = setupServer(...handlers); 