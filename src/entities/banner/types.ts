import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { FileWithDropzone, IList } from '@typings';

import { BannerFormDtoSchema } from './contracts';

export interface IBanner {
  id: string;
  title: string;
  rank: number;
  url: string;
  imageUrl: string;
  imageFiles: FileWithDropzone[];
  isShow: boolean;
}

export interface IBannerItem extends Omit<IBanner, 'imageFiles'> {
  isDelete: boolean;
}

export interface IBannerList extends IList<IBannerItem> {}

export type BannerFormDto = z.infer<typeof BannerFormDtoSchema>;

export type UseBannerForm = UseFormReturn<BannerFormDto, any, undefined>;
export type BannerFormKeys = keyof Omit<BannerFormDto, 'imageFiles'>;
