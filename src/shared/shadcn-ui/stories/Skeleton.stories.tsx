import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '../ui';

type Story = StoryObj<typeof Skeleton>;

// https://ui.shadcn.com/docs/components/skeleton
const meta: Meta<typeof Skeleton> = {
  title: '@shadcn-ui/Skeleton',
  component: Skeleton,
  render: () => {
    return (
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    );
  },
};

export default meta;

export const Primary: Story = {};
