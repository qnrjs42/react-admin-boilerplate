import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { LoginFormDtoSchema, type LoginFormDto } from '@entities/auth';

import { SharedFormFieldRender } from '@components';

import { Button, Form, FormField } from '../ui';

type Story = StoryObj<typeof Form>;

// https://ui.shadcn.com/docs/components/form
const meta: Meta<typeof Form> = {
  title: '@shadcn-ui/Form',
  component: Form,
  render: args => {
    const form = useForm<LoginFormDto>({
      resolver: zodResolver(LoginFormDtoSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

    const onSubmit = form.handleSubmit((data: LoginFormDto): void => {
      console.log(data);
    });

    return (
      <Form {...args} {...form}>
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
          <Button className='w-36 text-base' type='submit'>
            로그인
          </Button>
        </form>
      </Form>
    );
  },
};

export default meta;

export const Primary: Story = {};
