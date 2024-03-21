import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authMenu, authUser } from './apis/auth';
import { bannerList, deleteBanner, rankBanner, showBanner } from './apis/banner';

const authHandlers = [authLoginEmail, authLogout, authUser, authMenu];
const bannerHandlers = [bannerList, showBanner, deleteBanner, rankBanner];

export const handlers: RequestHandler[] = [...authHandlers, ...bannerHandlers];
