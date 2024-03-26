import { PiFlagBannerBold } from 'react-icons/pi';

import type { IMenuRoute } from '@typings/common';

export const ROUTE_PATHS = {
  LOGIN: '/login',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    BANNERS: {
      ALL_LIST: '/admin/banner/all-list/1',
      BANNER: '/admin/banner',
      CREATE: '/admin/banner/create',
    },
  },
} as const;

export const NESTED_ROUTES: IMenuRoute[][] = [
  [
    {
      parentMenuName: 'BANNER',
      path: '/admin/banner/all-list/1',
      menuName: '배너 관리',
      order: 0,
      icon: ({ isActive }) => <PiFlagBannerBold color={isActive ? 'white' : 'adb5bd'} />,
      isShow: true,
    },
    {
      parentMenuName: 'BANNER',
      path: '/admin/banner/all-list/1',
      menuName: '배너 전체 리스트',
      order: 1,
      isShow: true,
    },
    {
      parentMenuName: 'BANNER',
      path: '/admin/banner',
      menuName: '배너 상세',
      order: 1,
    },
    {
      parentMenuName: 'BANNER',
      path: '/admin/banner/create',
      menuName: '배너 등록',
      order: 1,
    },
  ],
];
