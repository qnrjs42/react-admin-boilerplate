import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import apiDeleteBanner from '@features/banner/apis/delete';

import { BANNER_KEYS, BANNER_TOAST_MESSAGES } from '@entities/banner/consts';
import type { IBanner } from '@entities/banner/types';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useDeleteBanner = (banner?: IBanner) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteBanner } = useMutation({
    mutationKey: [BANNER_KEYS.DELETE],
    mutationFn: apiDeleteBanner,
    onSuccess: (bannerId: string) => {
      queryClient.invalidateQueries({
        queryKey: [BANNER_KEYS.GET_LIST],
      });
      queryClient.removeQueries({
        queryKey: [BANNER_KEYS.GET, bannerId],
      });

      toast({
        title: BANNER_TOAST_MESSAGES.DELETE_SUCCESS,
        duration: TOAST_DURATION.SUCCESS,
      });

      navigate(-1);
    },
    onError: error => {
      toast({
        title: BANNER_TOAST_MESSAGES.DELETE_ERROR,
        description: utilAxiosError(error),
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onDelete = () => (): void => {
    deleteBanner(banner?.id);
  };

  return onDelete;
};

export default useDeleteBanner;
