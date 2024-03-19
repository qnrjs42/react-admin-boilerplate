import type { IList } from '@typings/common';

export interface IBannerItem {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isShow: boolean;
  isDelete: boolean;
}

export interface IBannerList extends IList<IBannerItem> {}

export interface IBanner {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  isShow: boolean;
}
