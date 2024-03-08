import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Form, FormField } from '@shadcn-ui/ui';

import { INPUT_TYPE_ATTRIBUTES } from '@constants';

import { SharedFormFieldRender } from '..';

type Story = StoryObj<typeof SharedFormFieldRender>;

const meta: Meta<typeof SharedFormFieldRender> = {
  title: '@components/SharedFormFieldRender',
  component: SharedFormFieldRender,
  argTypes: {
    field: {
      control: {
        type: null,
      },
    },
    type: {
      options: INPUT_TYPE_ATTRIBUTES,
      control: { type: 'select' },
    },
  },
  render: args => {
    const form = useForm();

    return (
      <Form {...form}>
        <form>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => <SharedFormFieldRender {...args} field={field} />}
          />
        </form>
      </Form>
    );
  },
};

export default meta;

export const Primary: Story = {
  args: {
    label: 'Email',
    type: 'email',
  },
};
