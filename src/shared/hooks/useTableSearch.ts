import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import type { SearchFormDto } from '@typings/common';

import { SearchFormDtoSchema } from '../contracts/common';

const useTableSearch = (routeName: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (data: SearchFormDto): void => {
    if (data.search === '') {
      navigate(routeName);
      return;
    }

    const searchParams = new URLSearchParams({
      search: data.search,
    });

    navigate(`${routeName}?${searchParams.toString()}`);
  };

  const form = useForm<SearchFormDto>({
    resolver: zodResolver(SearchFormDtoSchema),
    defaultValues: {
      search: new URLSearchParams(location.search).get('search') || '',
    },
  });

  const onSubmit = form.handleSubmit((data: SearchFormDto): void => onSearch(data));

  return { form, onSubmit };
};

export default useTableSearch;
