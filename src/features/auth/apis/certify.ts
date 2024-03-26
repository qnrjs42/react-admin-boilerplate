import axios from 'axios';

import type { IMe, IAuthority } from '@entities/auth/types';

import type { IMenuRoute } from '@typings';

import { NESTED_ROUTES } from '@constants';

interface IResponse {
  data: Record<string, string>[];
}

const apiAuthCertify = async (authorization: string): Promise<IMe> => {
  if (!authorization) throw new Error('authorization is empty');

  axios.defaults.headers.common.authorization = authorization;

  const response = await axios.get<IResponse>('/api/user/menu');

  const { filteredAuthority, filteredNestedRoutes } = getFilteredResponse(
    response.data.data,
    NESTED_ROUTES,
  );

  return {
    authorization,
    routes: filteredNestedRoutes,
    authority: filteredAuthority,
  };
};

export default apiAuthCertify;

const getFilteredResponse = (response: Record<string, string>[], nestedRoutes: IMenuRoute[][]) => {
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
      case 'AUTH_BANNER_LIST':
        filteredAuthority.banner.list = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][1]); // 배너 전체 리스트
        filteredNestedRoutes[0].push(nestedRoutes[0][2]); // 배너 상세
        break;
      case 'AUTH_BANNER_CREATE':
        filteredAuthority.banner.create = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][3]); // 배너 등록
        break;
      case 'AUTH_BANNER_MODIFY':
        filteredAuthority.banner.modify = true;
        filteredNestedRoutes[0].push(nestedRoutes[0][4]); // 배너 수정
        break;
      case 'AUTH_BANNER_DELETE':
        filteredAuthority.banner.delete = true;
        break;
    }
  });

  return {
    filteredNestedRoutes: filteredNestedRoutes.filter(routes => routes.length > 1),
    filteredAuthority,
  };
};
