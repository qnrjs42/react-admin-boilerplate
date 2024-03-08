import type { Meta, StoryObj } from '@storybook/react';

import { useToast } from '../hooks';
import { Button, Toast } from '../ui';

type Story = StoryObj<typeof Toast>;

// https://ui.shadcn.com/docs/components/toast
const meta: Meta<typeof Toast> = {
  title: '@shadcn-ui/Toast',
  component: Toast,
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        variant='outline'
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Add to calendar
      </Button>
    );
  },
};

export default meta;

export const Primary: Story = {};
