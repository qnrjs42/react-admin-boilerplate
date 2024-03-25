import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { apiGetBanner } from '@features/banner/apis';

import { BANNER_KEYS, type IBanner } from '@entities/banner';

interface IReturn {
  banner?: IBanner;
  isLoading: boolean;
  isError: boolean;
}

const useGetBanner = (): IReturn => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [BANNER_KEYS.GET, params?.id],
    queryFn: () => apiGetBanner({ id: params?.id }),
  });

  return { banner: data, isLoading, isError };
};

export default useGetBanner;
