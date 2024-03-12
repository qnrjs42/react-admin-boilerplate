import { PiFlagBannerBold } from 'react-icons/pi';

import type { IMenuRoute } from '@typings/common';

export const ROUTE_PATHS = {
  LOGIN: '/login',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
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
      path: '/admin/banner/demo-list/1',
      menuName: '배너 데모 전체 리스트',
      order: 2,
      isShow: true,
    },
  ],
];
