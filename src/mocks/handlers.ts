import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authMenu, authUser } from './apis/auth';

export const handlers: RequestHandler[] = [authLoginEmail, authLogout, authUser, authMenu];
