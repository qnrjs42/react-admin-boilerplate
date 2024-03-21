import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ITableDefaultItem } from '@typings/common';

import { SortableTable } from '..';

type Story = StoryObj<typeof SortableTable>;

const meta: Meta<typeof SortableTable> = {
  title: '@components/SortableTable',
  component: SortableTable,
  render: args => {
    const [items] = useState<ITableDefaultItem[]>(() => {
      return Array.from({ length: 30 }, (_, index) => ({
        id: String(index),
        rank: index + 1,
        title: `title ${index + 1}`,
      }));
    });

    const [sortingItems, setSortingItems] = useState<ITableDefaultItem[]>(() => {
      return Array.from({ length: 30 }, (_, index) => ({
        id: String(index),
        rank: index + 1,
        title: `title ${index + 1}`,
      }));
    });

    return (
      <SortableTable
        {...args}
        defaultItems={items}
        items={sortingItems}
        setItems={setSortingItems}
      />
    );
  },
};

export default meta;

export const Primary: Story = {};
