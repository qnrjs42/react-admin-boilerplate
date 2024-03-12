import type { FC } from 'react';

import { IMenuRoute } from '@typings/common';

interface IProps {
  currentRoute: IMenuRoute | null;
}
const ContentWidget: FC<IProps> = ({ currentRoute }) => {
  return (
    <div className='h-40 w-full rounded-b-3xl bg-primary p-5'>
      <span className='text-lg text-white'>{currentRoute?.menuName}</span>
    </div>
  );
};

export default ContentWidget;
