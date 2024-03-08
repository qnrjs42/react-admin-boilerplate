import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../ui';

type Story = StoryObj<typeof Button>;

// https://ui.shadcn.com/docs/components/button
const meta: Meta<typeof Button> = {
  title: '@shadcn-ui/Button',
  component: Button,
  render: args => <Button {...args}>hello</Button>,
};

export default meta;

export const Primary: Story = {};
