import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../ui';

type Story = StoryObj<typeof Badge>;

// https://ui.shadcn.com/docs/components/badge
const meta: Meta<typeof Badge> = {
  title: '@shadcn-ui/Badge',
  component: Badge,
  render: args => <Badge {...args}>hello</Badge>,
};

export default meta;

export const Primary: Story = {};
