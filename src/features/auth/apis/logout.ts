import axios from 'axios';

const apiAuthLogout = async (): Promise<void> => {
  await axios.post('/api/auth/logout');

  delete axios.defaults.headers.common.authorization;
};

export default apiAuthLogout;
