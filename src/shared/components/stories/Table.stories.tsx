import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shadcn-ui/ui';

import useGetBannerList from '@features/banner/hooks/useGetList';

import { BANNER_LIST_TABLE_HEADERS } from '@entities/banner';

import { Table } from '..';

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: '@components/Table',
  component: Table,
  render: args => {
    const { data, isLoading } = useGetBannerList();

    return (
      <Table
        {...args}
        items={data?.items || []}
        isLoading={isLoading}
        onClickItem={undefined}
        renderItemProps={[
          {
            itemKey: 'isShow',
            children: item => (
              <Button variant='secondary' onClick={() => console.log(item)}>
                삭제
              </Button>
            ),
          },
          {
            itemKey: 'isDelete',
            children: item => (
              <Button variant='destructive' onClick={() => console.log(item)}>
                삭제
              </Button>
            ),
          },
        ]}
      />
    );
  },
};

export default meta;

export const Primary: Story = {
  args: {
    headers: BANNER_LIST_TABLE_HEADERS,
    items: [],
    showItems: ['imageUrl', 'title', 'url', 'isShow', 'isDelete'],
    imageItems: ['imageUrl'],
    externalLinkItems: ['url'],
  },
};
