import { z } from 'zod';

import type { FileWithDropzone, IList } from '@typings/common';

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
