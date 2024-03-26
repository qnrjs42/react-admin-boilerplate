import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { apiGetBanner } from '@features/banner/apis';

import { BANNER_KEYS } from '@entities/banner/consts';
import type { IBanner } from '@entities/banner/types';

interface IReturn {
  banner?: IBanner;
  isLoading: boolean;
  isError: boolean;
}

const useGetBanner = (): IReturn => {
  const params = useParams();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [BANNER_KEYS.GET, params?.id],
    queryFn: () => apiGetBanner({ id: params?.id }),
  });

  return { banner: data, isLoading: isLoading || isFetching, isError };
};

export default useGetBanner;
