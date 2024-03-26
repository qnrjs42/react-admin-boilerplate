import type { FC } from 'react';

import useAuthLogin from '@features/auth/hooks/useAuthLogin';
import LoginForm from '@features/auth/ui/Form';
import LoginMainImage from '@features/auth/ui/MainImage';

const LoginPage: FC = () => {
  const { form, onSubmit } = useAuthLogin();
  return (
    <div className='flex h-screen flex-row'>
      <LoginForm title='TITLE' form={form} onSubmit={onSubmit} />
      <LoginMainImage />
    </div>
  );
};

export default LoginPage;
