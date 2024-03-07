import type { FC } from 'react';

import { useAuthLogin } from '@features/auth/hooks';
import { LoginForm, LoginMainImage } from '@features/auth/ui';

const LoginPage: FC = () => {
  const { form, onSubmit } = useAuthLogin();
  return (
    <div className='flex flex-row h-screen'>
      <LoginForm title='TITLE' form={form} onSubmit={onSubmit} />
      <LoginMainImage />
    </div>
  );
};

export default LoginPage;
