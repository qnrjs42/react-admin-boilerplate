import type { Meta, StoryObj } from '@storybook/react';

import DetailPageLoading from '@components/DetailPageLoading';

type Story = StoryObj<typeof DetailPageLoading>;

const meta: Meta<typeof DetailPageLoading> = {
  title: '@components/DetailPageLoading',
  component: DetailPageLoading,
  render: args => <DetailPageLoading {...args} />,
};

export default meta;

export const Primary: Story = {};
