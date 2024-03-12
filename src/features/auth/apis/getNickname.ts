import axios from 'axios';

interface IResponse {
  data: {
    nickname: string;
  };
}
const apiAuthGetNickname = async (): Promise<string> => {
  const response = await axios.get<IResponse>('/api/auth/user');

  return response.data.data.nickname;
};

export default apiAuthGetNickname;
