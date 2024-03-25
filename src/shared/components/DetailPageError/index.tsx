import { AlertCircle } from 'lucide-react';
import type { FC } from 'react';

import { Alert, AlertTitle, AlertDescription } from '@shadcn-ui/ui';

import { PageContainer } from '@components';

const DetailPageError: FC = () => {
  return (
    <PageContainer className='space-y-6'>
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>오류가 발생했습니다!</AlertTitle>
        <AlertDescription>
          {' '}
          새로고침 후에도 같은 오류가 발생한다면 관리자에게 문의해주세요.
        </AlertDescription>
      </Alert>
    </PageContainer>
  );
};

export default DetailPageError;
