import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';

// https://11001.tistory.com/221
const utilQueryClient = (config?: QueryClientConfig) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 15, // 15분, before cacheTime
        staleTime: 1000 * 60 * 10, // 10분
        notifyOnChangeProps: 'all',
        refetchOnWindowFocus: false,
        retry: 2, // 2번 재시도, 총 요청 3번
        ...config?.defaultOptions?.queries,
      },
    },
    ...config,
  });
export default utilQueryClient;
