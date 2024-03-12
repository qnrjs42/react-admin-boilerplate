import { Fragment, type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Separator } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import type { IMenuRoute } from '@typings/common';

import useSidebarStore from '@stores/sidebar';

import SidebarWidgetChildMenu from './child';
import SidebarInOut from './inout';
import SidebarWidgetParentMenu from './parent';

interface IProps {
  currentRoute?: IMenuRoute | null;
  nestedRoutes?: IMenuRoute[][];
}
const SidebarWidget: FC<IProps> = ({ currentRoute = null, nestedRoutes = [] }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const onToggleSidebar = (): void => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <div
        className={cn(
          'fixed left-0 top-0 z-[2] h-full w-60 overflow-auto bg-white drop-shadow-lg transition-all delay-300 ease-in-out',
          isSidebarOpen
            ? 'pointer-events-auto translate-x-0 opacity-[1]'
            : 'pointer-events-none -translate-x-60 opacity-0',
        )}
      >
        <NavLink to='/admin/dashboard'>
          <h2 className='p-2.5 text-center text-3xl font-medium'>TITLE</h2>
        </NavLink>
        <Separator className='mb-4' />
        {nestedRoutes.map((routes, routesIndex) => (
          <Fragment key={routes[routesIndex].path}>
            {routesIndex !== 0 ? <Separator className='mx-3 my-2 w-auto' /> : null}
            {routes.map((route, routeIndex) =>
              route?.isShow ? (
                <div className='px-3' key={`${route.path}_${route.menuName}`}>
                  {routeIndex === 0 ? (
                    <SidebarWidgetParentMenu route={route} currentRoute={currentRoute} />
                  ) : (
                    <SidebarWidgetChildMenu route={route} currentRoute={currentRoute} />
                  )}
                </div>
              ) : null,
            )}
          </Fragment>
        ))}
      </div>

      <SidebarInOut isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar} />
    </>
  );
};

export default SidebarWidget;
