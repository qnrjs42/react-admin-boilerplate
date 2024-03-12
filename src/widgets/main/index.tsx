import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainWidget: FC = () => {
  return (
    <div className='absolute left-0 top-14 w-full p-5'>
      <Outlet />
    </div>
  );
};

export default MainWidget;
