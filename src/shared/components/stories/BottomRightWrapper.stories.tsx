import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shadcn-ui/ui';

import { BottomRightWrapper, PageContainer } from '..';

type Story = StoryObj<typeof BottomRightWrapper>;

const meta: Meta<typeof BottomRightWrapper> = {
  title: '@components/BottomRightWrapper',
  component: BottomRightWrapper,
  render: args => (
    <PageContainer className='h-[500px]'>
      <BottomRightWrapper {...args} className='space-x-3'>
        <Button variant='outline'>순서 변경하기</Button>
        <Button>등록하기</Button>
      </BottomRightWrapper>
    </PageContainer>
  ),
};

export default meta;

export const Primary: Story = {};
