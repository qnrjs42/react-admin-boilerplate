import { z } from 'zod';

import { SearchFormDtoSchema } from '@contracts';

type Nullable<T> = T | null;

interface IMenuRoute {
  parentMenuName: string;
  path: string;
  menuName: string;
  order: number;
  icon?: ({ isActive }: { isActive: boolean }) => JSX.Element;
  isShow?: boolean;
}

type TableItemType = string | number | boolean;

type ITableItem = Record<string, TableItemType>;

interface IList<T> {
  page: number;
  total: number;
  items: T[];
}

interface ITableDefaultItem {
  id: string;
  rank?: number;
  title?: string;
}

type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;

type FileWithDropzone = File & { preview: string; isRemote?: boolean };

export type {
  IMenuRoute,
  ITableItem,
  IList,
  ITableDefaultItem,
  SearchFormDto,
  FileWithDropzone,
  Nullable,
};
