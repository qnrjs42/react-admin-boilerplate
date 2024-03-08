import type { RequestHandler } from 'msw';

import { authLoginEmail } from './apis/auth';

export const handlers: RequestHandler[] = [authLoginEmail];
