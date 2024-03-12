import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

import useSidebarStore from '@stores/sidebar';

interface IProps {
  children: React.ReactNode;
}
const RightWidget: FC<IProps> = ({ children }) => {
  const isSidebarOpen = useSidebarStore<boolean>(state => state.isSidebarOpen);

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col gap-3  transition-all delay-300 ease-in-out',
        isSidebarOpen ? 'max-w-[calc(100%-200px)]' : 'max-w-full',
        isSidebarOpen ? 'ml-60' : 'ml-0',
      )}
    >
      {children}
    </div>
  );
};

export default RightWidget;
