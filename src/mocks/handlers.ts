import type { RequestHandler } from 'msw';

import { authLoginEmail, authLogout, authMenu, authUser } from './apis/auth';
import {
  bannerList,
  createBanner,
  deleteBanner,
  detailBanner,
  modifyBanner,
  rankBanner,
  showBanner,
} from './apis/banner';
import { uploadImage } from './apis/upload';

const authHandlers = [authLoginEmail, authLogout, authUser, authMenu];
const bannerHandlers = [
  bannerList,
  showBanner,
  deleteBanner,
  rankBanner,
  detailBanner,
  modifyBanner,
  createBanner,
];
const uploadHandlers = [uploadImage];

export const handlers: RequestHandler[] = [...authHandlers, ...bannerHandlers, ...uploadHandlers];
