import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@shadcn-ui/ui/button';
import { Form, FormField } from '@shadcn-ui/ui/form';

import type { LoginFormDto } from '@entities/auth';

import { SharedFormFieldRender } from '@components';

interface IProps {
  title: string;
  form: UseFormReturn<LoginFormDto>;
  onSubmit: () => Promise<void>;
}
const LoginForm: FC<IProps> = ({ title, form, onSubmit }) => {
  return (
    <div className='flex flex-col flex-1 px-5 justify-center items-center'>
      <h1 className='text-3xl font-bold mb-4'>{title}</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className='space-y-4 w-full max-w-[436px]'>
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
