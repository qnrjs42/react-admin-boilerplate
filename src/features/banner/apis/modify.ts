import axios from 'axios';

import { apiUploadImage } from '@features/upload/apis';

import type { BannerFormDto } from '@entities/banner/types';

import type { FileWithDropzone } from '@typings/common';

interface IParams extends BannerFormDto {
  id?: string;
  imageFiles?: FileWithDropzone[];
}

const apiModifyBanner = async (data: IParams): Promise<string> => {
  if (!data?.id) throw new Error('id is required');

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

  await axios.patch(`/api/banner/modify/${data.id}`, requestData);

  return data.id;
};

export default apiModifyBanner;
