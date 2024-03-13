import type { Meta, StoryObj } from '@storybook/react';

import useTableSearch from '@hooks/useTableSearch';

import type { SearchFormDto } from '@typings/common';

import { TableSearch } from '..';

type Story = StoryObj<typeof TableSearch>;

const meta: Meta<typeof TableSearch> = {
  title: '@components/TableSearch',
  component: TableSearch,
  render: args => {
    const onSearch = (data: SearchFormDto): void => {
      console.log(data);
    };

    const searchForm = useTableSearch({
      initialSearch: '제목',
      onSearch,
    });

    return <TableSearch {...args} {...searchForm} />;
  },
};

export default meta;

export const Primary: Story = {
  args: {},
};
