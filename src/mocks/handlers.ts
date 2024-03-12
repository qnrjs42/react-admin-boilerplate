import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authUser } from './apis/auth';

export const handlers: RequestHandler[] = [authLoginEmail, authLogout, authUser];
