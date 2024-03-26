import axios from 'axios';

import { apiUploadImage } from '@features/upload/apis';

import type { BannerFormDto } from '@entities/banner/types';

import type { FileWithDropzone } from '@typings/common';

interface IParams extends BannerFormDto {
  imageFiles?: FileWithDropzone[];
}

const apiCreateBanner = async (data: IParams): Promise<void> => {
  const requestData: {
    title: string;
    url: string;
    isShow: boolean;
    fileIdx?: string;
  } = {
    title: data.title,
    url: data.url,
    isShow: data.isShow,
  };

  // 업로드했던 이미지가 아닌 경우
  if (data?.imageFiles && data?.imageFiles?.length > 0 && !data?.imageFiles[0]?.isRemote) {
    // apiUploadImage 호출
    requestData.fileIdx = await apiUploadImage({
      file: data.imageFiles[0],
      type: 'banner',
    });
  }

  await axios.post(`/api/banner/create`, requestData);
};

export default apiCreateBanner;
