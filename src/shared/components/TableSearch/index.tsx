import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Badge, Button, Form, FormControl, FormField, FormItem, Input } from '@shadcn-ui/ui';

import type { SearchFormDto } from '@typings/common';

interface IProps {
  total?: number;
  form: UseFormReturn<SearchFormDto>;
  onSubmit: () => Promise<void>;
}
const TableSearch: FC<IProps> = ({ total, form, onSubmit }) => {
  return (
    <Form {...form}>
      <div className='flex items-center gap-3'>
        {total !== undefined ? (
          <Badge variant='secondary' className='min-w-fit'>
            총 {total}건
          </Badge>
        ) : null}
        <form className='flex w-full justify-between gap-4' onSubmit={onSubmit}>
          <FormField
            name='search'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex w-full justify-end'>
                <FormControl>
                  <Input
                    type='text'
                    className='max-w-80'
                    placeholder='검색어를 입력하세요.'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>검색</Button>
        </form>
      </div>
    </Form>
  );
};

export default TableSearch;
