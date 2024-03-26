import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import apiChangeRankBannerList from '@features/banner/apis/changeRankList';

import { BANNER_KEYS } from '@entities/banner/consts';
import { IBannerItem, IBannerList } from '@entities/banner/types';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useChangeRankBannerList = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: changeRankBannerList } = useMutation({
    mutationKey: [BANNER_KEYS.CHANGE_RANK_LIST],
    mutationFn: apiChangeRankBannerList,
    onSuccess: (sortedItems: IBannerItem[]) => {
      queryClient.setQueryData<IBannerList>([BANNER_KEYS.GET_LIST, params?.page], prev =>
        prev
          ? {
              ...prev,
              items: sortedItems,
            }
          : prev,
      );

      toast({
        title: '배너 리스트 순위가 변경되었습니다.',
        duration: TOAST_DURATION.SUCCESS,
      });
    },
    onError: error => {
      toast({
        title: '배너 리스트 순위 변경에 실패했습니다.',
        description: utilAxiosError(error),
        variant: 'destructive',
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onSort = async (items: IBannerItem[]): Promise<void> => {
    await changeRankBannerList(items);
  };

  return onSort;
};

export default useChangeRankBannerList;
