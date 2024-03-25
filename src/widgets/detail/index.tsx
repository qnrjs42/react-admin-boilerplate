import type { FC } from 'react';

import { DetailPageError, DetailPageLoading, PageContainer } from '@components';

interface IProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}
const DetailWidget: FC<IProps> = ({ isLoading, isError, children }) => {
  if (isLoading) return <DetailPageLoading />;
  if (isError) return <DetailPageError />;

  return <PageContainer className='h-full'>{children}</PageContainer>;
};

export default DetailWidget;
