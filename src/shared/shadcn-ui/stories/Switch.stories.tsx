import type { Meta, StoryObj } from '@storybook/react';

import { Label, Switch } from '../ui';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: '@shadcn-ui/Switch',
  component: Switch,
  render: () => (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  ),
};

export default meta;

export const Primary: Story = {};
