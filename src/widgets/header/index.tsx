import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Separator } from '@shadcn-ui/ui';

const HeaderWidget: FC = () => {
  return (
    <>
      <div className='pointer-events-auto sticky left-0 top-0 z-[2] h-full w-60 translate-x-0 overflow-auto opacity-[1] drop-shadow-lg transition-all delay-300 ease-in-out'>
        <NavLink to='/admin/dashboard'>
          <h2 className='p-2.5 text-center text-3xl font-medium'>HEADER</h2>
        </NavLink>
        <Separator />
      </div>
    </>
  );
};

export default HeaderWidget;
