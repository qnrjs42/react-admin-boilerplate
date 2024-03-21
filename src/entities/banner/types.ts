import type { IList } from '@typings/common';

export interface IBanner {
  id: string;
  title: string;
  rank: number;
  url: string;
  imageUrl: string;
  isShow: boolean;
}

export interface IBannerItem extends IBanner {
  isDelete: boolean;
}

export interface IBannerList extends IList<IBannerItem> {}
