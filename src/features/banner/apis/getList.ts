import axios from 'axios';

import { filterBannerListResponse } from '@features/banner/libs/filterResponse';

import type { IBannerList } from '@entities/banner/types';

import { utilTimeSleep } from '@utils/util';

interface IParams {
  page: string;
}
const apiGetBannerList = async ({ page }: IParams): Promise<IBannerList> => {
  const response = await axios.get(`/api/banner/list/${page}`);

  await utilTimeSleep(1);

  const data = filterBannerListResponse(response.data);

  return data;
};

export default apiGetBannerList;
