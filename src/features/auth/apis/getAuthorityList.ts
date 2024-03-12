import type { IAuthority } from '@entities/auth';

import type { IMenuRoute } from '@typings/common';

import { NESTED_ROUTES } from '@constants';

type ReturnTypes = {
  myNestedRoutes: IMenuRoute[][];
  myAuthority: IAuthority;
};

const apiAuthGetAuthorityList = async (
  responseAuthorities: Record<string, string>[],
): Promise<ReturnTypes> => {
  return filterResponse(responseAuthorities, NESTED_ROUTES);
};

const filterResponse = (response: Record<string, string>[], nestedRoutes: IMenuRoute[][]) => {
  const myNestedRoutes: IMenuRoute[][] = nestedRoutes.map(routes => {
    return [routes[0]];
  });
  const myAuthority: IAuthority = {
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
      case 'AUTH_BANNER_LIST':
        myAuthority.banner.list = true;
        myNestedRoutes[0].push(nestedRoutes[0][1]); // 배너 전체 리스트
        myNestedRoutes[0].push(nestedRoutes[0][2]); // 배너 상세
        break;
      case 'AUTH_BANNER_CREATE':
        myAuthority.banner.create = true;
        myNestedRoutes[0].push(nestedRoutes[0][3]); // 배너 등록
        break;
      case 'AUTH_BANNER_MODIFY':
        myAuthority.banner.modify = true;
        myNestedRoutes[0].push(nestedRoutes[0][4]); // 배너 수정
        break;
      case 'AUTH_BANNER_DELETE':
        myAuthority.banner.delete = true;
        break;
    }
  });

  return {
    myNestedRoutes: myNestedRoutes.filter(routes => routes.length > 1),
    myAuthority,
  };
};

export default apiAuthGetAuthorityList;
