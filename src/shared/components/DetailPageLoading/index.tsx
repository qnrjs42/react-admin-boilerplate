import type { FC } from 'react';

import { Skeleton } from '@shadcn-ui/ui';

import PageContainer from '@components/PageContainer';

const DetailPageLoading: FC = () => {
  return (
    <PageContainer className='space-y-6'>
      <Skeleton className='h-[125px] rounded-lg' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[85%]' />
        <Skeleton className='h-4 w-[85%]' />
        <Skeleton className='h-4 w-[85%]' />
      </div>
    </PageContainer>
  );
};

export default DetailPageLoading;
