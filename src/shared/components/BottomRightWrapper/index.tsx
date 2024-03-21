import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
  children: React.ReactNode;
}
const BottomRightWrapper: FC<IProps> = ({ className, children }) => {
  return <div className={cn('flex flex-1 items-end justify-end', className)}>{children}</div>;
};

export default BottomRightWrapper;
