import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import apiGetBannerList from '@features/banner/apis/getList';

import { BANNER_KEYS } from '@entities/banner/consts';
import type { IBannerList } from '@entities/banner/types';

interface IReturn {
  data?: IBannerList;
  isLoading: boolean;
  isError: boolean;
}
const useGetBannerList = (): IReturn => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [BANNER_KEYS.GET_LIST, params?.page],
    queryFn: () => apiGetBannerList({ page: params?.page || '1' }),
  });

  return { data, isLoading, isError };
};

export default useGetBannerList;
