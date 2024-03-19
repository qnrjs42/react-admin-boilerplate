import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { BANNER_KEYS, type IBannerItem, type IBannerList } from '@entities/banner';

import { TOAST_DURATION } from '@constants';

const useListDelete = () => {
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onDelete = (item: IBannerItem) => (): void => {
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
  };

  return onDelete;
};

export default useListDelete;
