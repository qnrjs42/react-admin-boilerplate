import type { IBannerList } from './types';

export const BANNER_LIST_TABLE_HEADERS = [
  '배너 사진',
  '배너명',
  '배너 링크',
  '노출 중지',
  '삭제',
] as const;

export const filterBannerList = (response: any): IBannerList => {
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
