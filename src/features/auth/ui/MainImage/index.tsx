import type { FC } from 'react';

import UtilLocalImage from '@utils/utilImage';

const LoginMainImage: FC = () => {
  return (
    <div className='flex-1 max-md:hidden'>
      <img src={UtilLocalImage.IMAGES.LOGIN.MAIN} className='w-full h-full object-cover' />
    </div>
  );
};

export default LoginMainImage;
