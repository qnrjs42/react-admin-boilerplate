import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { cn } from '@shadcn-ui/utils';

import type { IMenuRoute } from '@typings/common';

interface IProps {
  route: IMenuRoute;
  currentRoute: IMenuRoute | null;
}
const SidebarWidgetChildMenu: FC<IProps> = ({ route, currentRoute }) => {
  return (
    <div
      className={cn(
        'ml-6 cursor-pointer py-2 pl-4',
        route.path === currentRoute?.path ? 'rounded-md bg-primary' : '',
      )}
    >
      <NavLink to={route.path} className='flex items-center gap-4'>
        <div
          className={cn(
            'h-2.5 w-2.5 rounded-full',
            route.path === currentRoute?.path ? 'bg-white' : 'bg-[--color-adb5bd]',
          )}
        />
        <h5
          className={cn(
            'text-base',
            route.path === currentRoute?.path ? 'text-white' : 'text-[--color-adb5bd]',
          )}
        >
          {route.menuName}
        </h5>
      </NavLink>
    </div>
  );
};

export default SidebarWidgetChildMenu;
