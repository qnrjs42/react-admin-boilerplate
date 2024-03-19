import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authMenu, authUser } from './apis/auth';
import { bannerList } from './apis/banner';

const authHandlers = [authLoginEmail, authLogout, authUser, authMenu];
const bannerHandlers = [bannerList];

export const handlers: RequestHandler[] = [...authHandlers, ...bannerHandlers];
