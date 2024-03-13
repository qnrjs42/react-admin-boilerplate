import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { SearchFormDto } from '@typings/common';

import { SearchFormDtoSchema } from '@src/shared/contracts/common';

import { TableSearch } from '..';

type Story = StoryObj<typeof TableSearch>;

const meta: Meta<typeof TableSearch> = {
  title: '@components/TableSearch',
  component: TableSearch,
  render: args => {
    const form = useForm<SearchFormDto>({
      resolver: zodResolver(SearchFormDtoSchema),
      defaultValues: {
        search: new URLSearchParams(location.search).get('search') || '',
      },
    });

    const onSubmit = form.handleSubmit((data: SearchFormDto): void => {
      console.log(data);
    });

    return <TableSearch {...args} form={form} onSubmit={onSubmit} />;
  },
};

export default meta;

export const Primary: Story = {};
