import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { apiShowBanner } from '@features/banner/apis';

import { BANNER_KEYS, type IBannerItem, type IBannerList } from '@entities/banner';

import { TOAST_DURATION } from '@constants';

const useToggleShowBannerListItem = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: showBanner } = useMutation({
    mutationKey: [BANNER_KEYS.SHOW],
    mutationFn: apiShowBanner,
    onSuccess: (item: IBannerItem) => {
      queryClient.setQueryData<IBannerList>([BANNER_KEYS.GET_LIST, params?.page], prev => {
        return prev
          ? {
              ...prev,
              items: prev.items.map(prevItem => {
                const isShow = prevItem.id === item.id ? !prevItem.isShow : prevItem.isShow;

                return {
                  ...prevItem,
                  isShow,
                };
              }),
            }
          : prev;
      });

      toast({
        title: `${item.isShow ? '노출 중지' : '노출'} 처리되었습니다.`,
        duration: TOAST_DURATION.SUCCESS,
      });
    },
  });

  const onToggleShow = (item: IBannerItem) => (): void => {
    showBanner(item);
  };

  return onToggleShow;
};

export default useToggleShowBannerListItem;
