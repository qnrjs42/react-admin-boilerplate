import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import apiDeleteBanner from '@features/banner/apis/delete';

import { BANNER_KEYS, BANNER_TOAST_MESSAGES } from '@entities/banner/consts';
import type { IBannerItem, IBannerList } from '@entities/banner/types';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useDeleteBannerListItem = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteBanner } = useMutation({
    mutationKey: [BANNER_KEYS.DELETE],
    mutationFn: apiDeleteBanner,
    onSuccess: (bannerId: string) => {
      queryClient.setQueryData<IBannerList>([BANNER_KEYS.GET_LIST, params?.page], prev => {
        return prev
          ? {
              ...prev,
              items: prev.items.filter(prevItem => prevItem.id !== bannerId),
            }
          : prev;
      });

      toast({
        title: BANNER_TOAST_MESSAGES.DELETE_SUCCESS,
        duration: TOAST_DURATION.SUCCESS,
      });
    },
    onError: error => {
      toast({
        title: BANNER_TOAST_MESSAGES.DELETE_ERROR,
        description: utilAxiosError(error),
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onDelete = (item: IBannerItem) => (): void => {
    deleteBanner(item.id);
  };

  return onDelete;
};

export default useDeleteBannerListItem;
