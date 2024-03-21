import type { Meta, StoryObj } from '@storybook/react';

import { DeleteDialog } from '..';

type Story = StoryObj<typeof DeleteDialog>;

const meta: Meta<typeof DeleteDialog> = {
  title: '@components/DeleteDialog',
  component: DeleteDialog,
  render: args => <DeleteDialog {...args} />,
};

export default meta;

export const Primary: Story = {
  args: {
    item: {
      id: '1',
      imageUrl: 'https://via.placeholder.com/150',
      title: 'Title',
    },
    onDelete: () => () => {},
  },
};
