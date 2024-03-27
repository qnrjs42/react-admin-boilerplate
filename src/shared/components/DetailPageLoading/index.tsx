import { type FC, useEffect, useState } from 'react';

import { Skeleton } from '@shadcn-ui/ui';

import PageContainer from '@components/PageContainer';

const DetailPageLoading: FC = () => {
  const [isShowSkeleton, setIsShowSkeleton] = useState<boolean>(false);

  useEffect(() => {
    const showTimer: NodeJS.Timeout = setTimeout(() => {
      setIsShowSkeleton(true);
    }, 1500);

    return (): void => {
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <PageContainer className='space-y-6'>
      {isShowSkeleton ? (
        <>
          <Skeleton className='h-[125px] rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[85%]' />
            <Skeleton className='h-4 w-[85%]' />
            <Skeleton className='h-4 w-[85%]' />
          </div>
        </>
      ) : (
        <div className='h-[200px]' />
      )}
    </PageContainer>
  );
};

export default DetailPageLoading;
