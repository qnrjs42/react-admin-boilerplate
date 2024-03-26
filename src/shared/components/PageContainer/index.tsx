import type { PropsWithChildren } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
}
const PageContainer = ({ className, children }: PropsWithChildren<IProps>) => {
  return <div className={cn('flex flex-col rounded-lg bg-white p-6', className)}>{children}</div>;
};

export default PageContainer;
