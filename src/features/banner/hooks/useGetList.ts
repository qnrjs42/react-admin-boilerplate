import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { BANNER_KEYS, type IBannerList } from '@entities/banner';

import apiGetBannerList from '../apis/getList';

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