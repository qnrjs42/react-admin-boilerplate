import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
  children: React.ReactNode;
}
const PageContainer: FC<IProps> = ({ className, children }) => {
  return <div className={cn('flex flex-col rounded-lg bg-white p-6', className)}>{children}</div>;
};

export default PageContainer;
