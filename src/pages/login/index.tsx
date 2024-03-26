import type { FC } from 'react';

import useAuthLogin from '@features/auth/hooks/useAuthLogin';
import { LoginForm, LoginMainImage } from '@features/auth/ui';

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
