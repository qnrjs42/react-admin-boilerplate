import axios from 'axios';

import { filterBanner } from '@entities/banner/contracts';
import type { IBanner } from '@entities/banner/types';

interface IParams {
  id?: string;
}
const apiGetBanner = async (params: IParams): Promise<IBanner> => {
  if (!params?.id) throw new Error('id is required');

  const response = await axios.get(`/api/banner/${params.id}`);

  return filterBanner(response.data);
};

export default apiGetBanner;
