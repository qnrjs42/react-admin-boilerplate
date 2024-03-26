import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ITableDefaultItem } from '@typings';

import SortableTableDialog from '@components/SortableTableDialog';

type Story = StoryObj<typeof SortableTableDialog>;

const meta: Meta<typeof SortableTableDialog> = {
  title: '@components/SortableTableDialog',
  component: SortableTableDialog,
  render: args => {
    const [items, setItems] = useState<ITableDefaultItem[]>(() =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i.toString(),
        rank: i,
        title: `Title ${i}`,
      })),
    );

    const onSort = async (newItems: ITableDefaultItem[]): Promise<void> => {
      setItems(newItems);
    };

    return <SortableTableDialog {...args} items={items} onSort={onSort} />;
  },
};

export default meta;

export const Primary: Story = {
  args: {
    dialogTitle: '순위 변경하기',
  },
};
