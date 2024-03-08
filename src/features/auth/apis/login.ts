import axios from 'axios';

import type { LoginFormDto } from '@entities/auth';

const apiAuthLogin = async (data: LoginFormDto): Promise<void> => {
  await axios.post('/api/auth/login/email', data);
};

export default apiAuthLogin;
