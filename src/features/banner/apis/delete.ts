import axios from 'axios';

const apiDeleteBanner = async (bannerId?: string): Promise<string> => {
  if (!bannerId) throw new Error('존재하지 않는 배너입니다.');

  await axios.delete(`/api/banner/${bannerId}`);

  return bannerId;
};

export default apiDeleteBanner;
