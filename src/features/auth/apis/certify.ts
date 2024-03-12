import axios from 'axios';

import type { IMe } from '@entities/auth';

import apiAuthGetAuthorityList from './getAuthorityList';

interface IResponse {
  data: Record<string, string>[];
}

const apiAuthCertify = async (authorization: string): Promise<IMe> => {
  if (!authorization) throw new Error('authorization is empty');

  axios.defaults.headers.common.authorization = authorization;

  const response = await axios.get<IResponse>('/api/user/menu');

  const myAuth = await apiAuthGetAuthorityList(response.data.data);

  return {
    authorization,
    routes: myAuth.myNestedRoutes,
    authority: myAuth.myAuthority,
  };
};

export default apiAuthCertify;
