import axios from 'axios';

import { filterAuthCertifyResponse } from '@features/auth/libs/filterResponse';

import type { IMe } from '@entities/auth/types';

import { NESTED_ROUTES } from '@src/shared/consts/routes';

interface IResponse {
  data: Record<string, string>[];
}

const apiAuthCertify = async (authorization: string): Promise<IMe> => {
  if (!authorization) throw new Error('authorization is empty');

  axios.defaults.headers.common.authorization = authorization;

  const response = await axios.get<IResponse>('/api/user/menu');

  const { filteredAuthority, filteredNestedRoutes } = filterAuthCertifyResponse(
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
