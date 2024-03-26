import { AUTH_CERTIFY_MENU_CODES } from '@entities/auth/consts';
import type { IAuthority } from '@entities/auth/types';

import type { IMenuRoute } from '@typings';

export const filterAuthCertifyResponse = (
  response: Record<string, string>[],
  nestedRoutes: IMenuRoute[][],
) => {
  const filteredNestedRoutes: IMenuRoute[][] = nestedRoutes.map(routes => [routes[0]]);

  const filteredAuthority: IAuthority = {
    banner: {
      list: false,
      create: false,
      modify: false,
      delete: false,
    },
  };

  response.forEach((authority: Record<string, string>) => {
    switch (authority.menuCode) {
      // 배너 관리
      case AUTH_CERTIFY_MENU_CODES.BANNERS.LIST:
        filteredAuthority.banner.list = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][1]); // 배너 전체 리스트
        filteredNestedRoutes[0].push(nestedRoutes[0][2]); // 배너 상세
        break;
      case AUTH_CERTIFY_MENU_CODES.BANNERS.CREATE:
        filteredAuthority.banner.create = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][3]); // 배너 등록
        break;
      case AUTH_CERTIFY_MENU_CODES.BANNERS.MODIFY:
        filteredAuthority.banner.modify = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][4]); // 배너 수정
        break;
      case AUTH_CERTIFY_MENU_CODES.BANNERS.DELETE:
        filteredAuthority.banner.delete = true;
        break;
    }
  });

  return {
    filteredNestedRoutes: filteredNestedRoutes.filter(routes => routes.length > 1),
    filteredAuthority,
  };
};
