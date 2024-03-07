import type { LoginFormDto } from '@entities/auth';

import { utilTimeSleep } from '@utils/util';

const apiAuthLogin = async (data: LoginFormDto) => {
  console.log(data);
  // throw new Error('test');
  await utilTimeSleep(1);
};

export default apiAuthLogin;
