import axios from 'axios';

import type { IBannerItem } from '@entities/banner';

const apiShowBanner = async (item: IBannerItem): Promise<IBannerItem> => {
  await axios.patch(`/api/banner/show/${item.id}`);

  return item;
};

export default apiShowBanner;
