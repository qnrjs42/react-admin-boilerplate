import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { apiDeleteBanner } from '@features/banner/apis';

import { BANNER_KEYS, type IBannerItem, type IBannerList } from '@entities/banner';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useDeleteBannerListItem = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteBanner } = useMutation({
    mutationKey: [BANNER_KEYS.DELETE],
    mutationFn: apiDeleteBanner,
    onSuccess: (item: IBannerItem) => {
      queryClient.setQueryData<IBannerList>([BANNER_KEYS.GET_LIST, params?.page], prev => {
        return prev
          ? {
              ...prev,
              items: prev.items.filter(prevItem => prevItem.id !== item.id),
            }
          : prev;
      });

      toast({
        title: `${item.title} 삭제되었습니다.`,
        duration: TOAST_DURATION.SUCCESS,
      });
    },
    onError: error => {
      toast({
        title: '삭제 처리에 실패했습니다.',
        description: utilAxiosError(error),
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onDelete = (item: IBannerItem) => (): void => {
    deleteBanner(item);
  };

  return onDelete;
};

export default useDeleteBannerListItem;
