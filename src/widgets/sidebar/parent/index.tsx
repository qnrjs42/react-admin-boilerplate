import type { FC } from 'react';

import { cn } from '@shadcn-ui/utils';

import type { IMenuRoute } from '@typings/common';

interface IProps {
  route: IMenuRoute;
  currentRoute: IMenuRoute | null;
}
const SidebarWidgetParentMenu: FC<IProps> = ({ route, currentRoute }) => {
  return (
    <div
      className={cn(
        'mb-2 flex items-center gap-4 px-5 py-2',
        route.parentMenuName === currentRoute?.parentMenuName ? 'rounded-md bg-primary' : '',
      )}
    >
      {route.icon?.({ isActive: route.parentMenuName === currentRoute?.parentMenuName })}
      <h5
        className={cn(
          'text-base font-semibold',
          route.parentMenuName === currentRoute?.parentMenuName
            ? 'text-white'
            : 'text-[--color-adb5bd]',
        )}
      >
        {route.menuName}
      </h5>
    </div>
  );
};

export default SidebarWidgetParentMenu;
