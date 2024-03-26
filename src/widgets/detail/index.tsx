import type { PropsWithChildren } from 'react';

import DetailPageError from '@components/DetailPageError';
import DetailPageLoading from '@components/DetailPageLoading';
import PageContainer from '@components/PageContainer';

interface IProps {
  isLoading: boolean;
  isError: boolean;
}
const DetailWidget = ({ isLoading, isError, children }: PropsWithChildren<IProps>) => {
  if (isLoading) return <DetailPageLoading />;
  if (isError) return <DetailPageError />;

  return <PageContainer className='h-full'>{children}</PageContainer>;
};

export default DetailWidget;
