import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../ui';

type Story = StoryObj<typeof Label>;

// https://ui.shadcn.com/docs/components/label
const meta: Meta<typeof Label> = {
  title: '@shadcn-ui/Label',
  component: Label,
  render: args => {
    return <Label {...args}>Email</Label>;
  },
};

export default meta;

export const Primary: Story = {};
