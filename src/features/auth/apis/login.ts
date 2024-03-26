import { apiAuthCertify } from '.';
import axios from 'axios';

import type { LoginFormDto, IMe } from '@entities/auth/types';

interface IResponse {
  data: {
    authorization: string;
  };
}

const apiAuthLogin = async (data: LoginFormDto): Promise<IMe> => {
  const response = await axios.post<IResponse>('/api/auth/login/email', data);

  const result = await apiAuthCertify(response.data.data.authorization);

  return result;
};

export default apiAuthLogin;
