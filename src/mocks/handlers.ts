import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authMenu, authUser } from './apis/auth';
import { bannerList, showBanner } from './apis/banner';

const authHandlers = [authLoginEmail, authLogout, authUser, authMenu];
const bannerHandlers = [bannerList, showBanner];

export const handlers: RequestHandler[] = [...authHandlers, ...bannerHandlers];
