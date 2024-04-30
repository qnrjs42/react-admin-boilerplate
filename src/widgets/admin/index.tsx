import { type FC, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ContentWidget from '@widgets/content';
import HeaderWidget from '@widgets/header';
import MainWidget from '@widgets/main';
import RightWidget from '@widgets/right';
import SidebarWidget from '@widgets/sidebar';

import type { IMenuRoute } from '@typings/common';

import useMeStore from '@stores/me';

import { LIST_REGEXP } from '@src/shared/consts/regexp';

const AdminWidget: FC = () => {
  const location = useLocation();
  const params = useParams();

  const [currentRoute, setCurrentRoute] = useState<IMenuRoute | null>(null);

  const me = useMeStore(state => state.me);

  useEffect((): void => {
    if (location.pathname.includes('dashboard')) {
      setCurrentRoute({
        parentMenuName: '',
        menuName: '',
        path: '/admin/dashboard',
        order: 0,
        isShow: false,
      });
    } else {
      me?.routes?.forEach(routes => {
        routes.forEach(route => {
          const routePath = route.path.replace(LIST_REGEXP, ''); // /admin/manager/all-list/1 -> /admin/manager/all-list
          const locationPath = location.pathname.replace(LIST_REGEXP, ''); // /admin/manager/all-list/1 -> /admin/manager/all-list

          // 1. routePath === locationPath -> /admin/manager/all-list === /admin/manager/all-list
          // 2. `${routePath}/${params?.id}` === locationPath -> /admin/manager/e2a365bf-ce44-462f-91eb-707f66747490 === /admin/manager/e2a365bf-ce44-462f-91eb-707f66747490
          const isMatched =
            routePath === locationPath || `${routePath}/${params?.id}` === locationPath;

          if (route.order !== 0 && isMatched) {
            setCurrentRoute(route);
          }
        });
      });
    }
  }, [location, me?.routes, params?.id]);

  return (
    <div className='max-w[1920px] mx-auto flex'>
      <SidebarWidget currentRoute={currentRoute} nestedRoutes={me?.routes} />
      <RightWidget>
        <HeaderWidget />
        <div className='relative h-full'>
          <ContentWidget currentRoute={currentRoute} />
          <MainWidget />
        </div>
      </RightWidget>
    </div>
  );
};

export default AdminWidget;
