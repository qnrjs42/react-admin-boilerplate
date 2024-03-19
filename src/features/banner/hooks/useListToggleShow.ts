import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { BANNER_KEYS, type IBannerItem, type IBannerList } from '@entities/banner';

import { TOAST_DURATION } from '@constants';

const useBannerListToggleShow = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onToggleShow = (item: IBannerItem) => (): void => {
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
  };

  return onToggleShow;
};

export default useBannerListToggleShow;
