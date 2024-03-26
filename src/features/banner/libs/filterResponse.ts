import type { IBanner, IBannerList } from '@entities/banner/types';

import { utilRemoteImageUrlToFiles } from '@utils/util';

export const filterBannerListResponse = (response: any): IBannerList => {
  const items = response.data.list.map((item: any) => ({
    id: item.idx,
    title: item?.title || '',
    rank: item?.rank || 0,
    url: item?.url || '',
    imageUrl: item?.imageUrl || '',
    isShow: item?.isShow || false,
    isDelete: false,
  }));

  return {
    page: response.data?.page || 1,
    total: response.data?.totalCount || items.length,
    items,
  };
};

export const filterBannerResponse = (response: any): IBanner => {
  return {
    id: response.data.idx,
    title: response.data?.title || '',
    rank: response.data?.rank || 0,
    imageUrl: response.data?.imageUrl || '',
    imageFiles: response?.data?.imageUrl ? utilRemoteImageUrlToFiles(response.data.imageUrl) : [],
    url: response.data?.url || '',
    isShow: response.data?.isShow || false,
  };
};
