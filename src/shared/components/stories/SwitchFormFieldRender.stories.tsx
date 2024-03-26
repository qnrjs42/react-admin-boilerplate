import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Form, FormField } from '@shadcn-ui/ui';

import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

type Story = StoryObj<typeof SharedSwitchFormFieldRender>;

const meta: Meta<typeof SharedSwitchFormFieldRender> = {
  title: '@components/SharedSwitchFormFieldRender',
  component: SharedSwitchFormFieldRender,
  render: args => {
    const form = useForm();

    return (
      <Form {...form}>
        <form>
          <FormField
            name='isShow'
            control={form.control}
            render={({ field }) => <SharedSwitchFormFieldRender {...args} field={field} />}
          />
        </form>
      </Form>
    );
  },
};

export default meta;

export const Primary: Story = {
  args: {
    label: '배너 노출',
  },
};
