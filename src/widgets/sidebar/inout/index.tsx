import type { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { cn } from '@shadcn-ui/utils';

interface IProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}
const SidebarInOut: FC<IProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-5 z-[3] flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary transition-transform delay-300 ease-in-out',
        isSidebarOpen ? 'translate-x-56' : 'translate-x-0',
        isSidebarOpen ? 'rotate-0' : 'rotate-180',
      )}
      onClick={onToggleSidebar}
    >
      <FaArrowLeft color='white' />
    </div>
  );
};

export default SidebarInOut;
