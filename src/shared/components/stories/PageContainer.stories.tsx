import type { Meta, StoryObj } from '@storybook/react';

import PageContainer from '@components/PageContainer';

type Story = StoryObj<typeof PageContainer>;

const meta: Meta<typeof PageContainer> = {
  title: '@components/PageContainer',
  component: PageContainer,
  argTypes: {},
  render: args => (
    <PageContainer {...args}>
      <span>Hello</span>
    </PageContainer>
  ),
};

export default meta;

export const Primary: Story = {};
