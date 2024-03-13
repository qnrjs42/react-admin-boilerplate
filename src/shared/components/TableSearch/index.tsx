import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormControl, FormField, FormItem, Input } from '@shadcn-ui/ui';

import type { SearchFormDto } from '@typings/common';

interface IProps {
  form: UseFormReturn<SearchFormDto>;
  onSubmit: () => Promise<void>;
}
const TableSearch: FC<IProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form className='flex w-full justify-end gap-4' onSubmit={onSubmit}>
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
    </Form>
  );
};

export default TableSearch;
