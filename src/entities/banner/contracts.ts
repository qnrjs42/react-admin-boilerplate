import { z } from 'zod';

import { utilRemoteImageUrlToFiles } from '@utils/util';

import type { IBanner, IBannerList } from './types';

export const BANNER_LIST_TABLE_HEADERS = [
  '배너 사진',
  '배너명',
  '배너 링크',
  '노출 중지',
  '삭제',
] as const;

export const BANNER_TOAST_MESSAGES = {
  DELETE_SUCCESS: '배너가 정상적으로 삭제되었습니다.',
  DELETE_ERROR: '배너 삭제 처리에 실패했습니다.',
  MODIFY_SUCCESS: '배너가 정상적으로 수정되었습니다.',
  MODIFY_ERROR: '배너 수정 처리에 실패했습니다.',
  CREATE_SUCCESS: '배너가 정상적으로 등록되었습니다.',
  CREATE_ERROR: '배너 등록 처리에 실패했습니다.',
} as const;

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

export const filterBanner = (response: any): IBanner => {
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

export const BannerFormDtoSchema = z.object({
  title: z
    .string()
    .min(1, { message: '최소 1글자 이상 입력해주세요.' })
    .max(50, { message: '최대 50글자 이하로 입력해주세요.' }),
  url: z.string().url({ message: '유효한 URL을 입력해주세요.' }),
  imageFiles: z
    .any()
    .refine(files => files?.[0], '이미지를 선택해주세요.')
    .refine(
      files => files?.[0]?.size <= 1024 * 1024 * 10,
      `최대 10MB 이하의 이미지만 업로드 가능해요.`,
    )
    .refine(
      files => ['image/jpg', 'image/png', 'image/jpeg'].includes(files?.[0]?.type),
      '.jpg, .jpeg, .png 형식의 이미지만 업로드 가능해요.',
    ),
  isShow: z.boolean().optional().default(false),
});
