import { z } from 'zod';

import { SearchFormDtoSchema } from '../contracts/common';

export type Nullable<T> = T | null;

export interface IMenuRoute {
  parentMenuName: string;
  path: string;
  menuName: string;
  order: number;
  icon?: ({ isActive }: { isActive: boolean }) => JSX.Element;
  isShow?: boolean;
}

export type TableItemType = string | number | boolean;

export type ITableItem = Record<string, TableItemType>;

export interface IList<T> {
  page: number;
  total: number;
  items: T[];
}

export interface ITableDefaultItem {
  id: string;
  rank?: number;
  title?: string;
}

export type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;
