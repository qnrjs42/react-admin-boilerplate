import type { Meta, StoryObj } from '@storybook/react';

import { INPUT_TYPE_ATTRIBUTES } from '@src/shared/consts/common';

import { Input } from '../ui';

type Story = StoryObj<typeof Input>;

// https://ui.shadcn.com/docs/components/input
const meta: Meta<typeof Input> = {
  title: '@shadcn-ui/Input',
  component: Input,
  argTypes: {
    type: {
      options: INPUT_TYPE_ATTRIBUTES,
      control: { type: 'select' },
    },
  },
  render: args => <Input {...args} />,
};

export default meta;

export const Primary: Story = {
  args: {
    type: 'text',
    placeholder: '입력해주세요.',
  },
};

12346;
