import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from '../ui';

type Story = StoryObj<typeof Separator>;

// https://ui.shadcn.com/docs/components/separator
const meta: Meta<typeof Separator> = {
  title: '@shadcn-ui/Separator',
  component: Separator,
  render: args => {
    return <Separator {...args} />;
  },
};

export default meta;

export const Primary: Story = {};
