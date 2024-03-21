import axios from 'axios';

import type { IBannerItem } from '@entities/banner';

const apiChangeRankBannerList = async (items: IBannerItem[]): Promise<IBannerItem[]> => {
  await axios.patch(`/api/banner/rank`, {
    idx: items.map(item => item.id),
  });

  return items;
};

export default apiChangeRankBannerList;
