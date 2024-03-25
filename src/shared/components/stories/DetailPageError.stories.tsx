import type { Meta, StoryObj } from '@storybook/react';

import { DetailPageError } from '..';

type Story = StoryObj<typeof DetailPageError>;

const meta: Meta<typeof DetailPageError> = {
  title: '@components/DetailPageError',
  component: DetailPageError,
  render: args => <DetailPageError {...args} />,
};

export default meta;

export const Primary: Story = {};
