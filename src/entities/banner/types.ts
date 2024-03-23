import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { IList } from '@typings/common';

import { BannerFormDtoSchema } from './contracts';

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

export type BannerFormDto = z.infer<typeof BannerFormDtoSchema>;

export type UseBannerForm = UseFormReturn<BannerFormDto, any, undefined>;
export type BannerFormKeys = keyof Omit<BannerFormDto, 'imageFiles'>;
