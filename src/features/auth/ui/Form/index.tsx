import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import type { LoginFormDto } from '@entities/auth';

import { SharedFormFieldRender } from '@components';

interface IProps {
  title: string;
  form: UseFormReturn<LoginFormDto>;
  onSubmit: () => Promise<void>;
}
const LoginForm: FC<IProps> = ({ title, form, onSubmit }) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-5'>
      <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className='w-full max-w-[436px] space-y-4'>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <SharedFormFieldRender label='이메일' type='email' field={field} />
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <SharedFormFieldRender label='비밀번호' type='password' field={field} />
            )}
          />
          <div className='h-1' />
          <div className='text-center'>
            <Button className='w-36 text-base' type='submit'>
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
