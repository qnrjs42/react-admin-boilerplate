import axios from 'axios';

import type { IBannerItem } from '@entities/banner';

const apiDeleteBanner = async (item: IBannerItem): Promise<IBannerItem> => {
  await axios.delete(`/api/banner/${item.id}`);

  return item;
};

export default apiDeleteBanner;
