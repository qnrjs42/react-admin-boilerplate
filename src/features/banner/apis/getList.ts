import axios from 'axios';

import { filterBannerList, type IBannerList } from '@entities/banner';

import { utilTimeSleep } from '@utils/util';

interface IParams {
  page: string;
}
const apiGetBannerList = async ({ page }: IParams): Promise<IBannerList> => {
  const response = await axios.get(`/api/banner/list/${page}`);

  await utilTimeSleep(1);

  const data = filterBannerList(response.data);

  return data;
};

export default apiGetBannerList;
