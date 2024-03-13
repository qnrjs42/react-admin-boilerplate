import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SearchFormDto } from '@typings/common';

import { SearchFormDtoSchema } from '../contracts/common';

interface IParams {
  initialSearch?: string;
  onSearch: (data: SearchFormDto) => void;
}
const useTableSearch = ({ initialSearch, onSearch }: IParams) => {
  const form = useForm<SearchFormDto>({
    resolver: zodResolver(SearchFormDtoSchema),
    defaultValues: {
      search: initialSearch || '',
    },
  });

  const onSubmit = form.handleSubmit((data: SearchFormDto): void => onSearch(data));

  return { form, onSubmit };
};

export default useTableSearch;
