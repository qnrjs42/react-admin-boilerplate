import { z } from 'zod';

import type { IMenuRoute } from '@typings/common';

import { LoginFormDtoSchema } from './contracts';

export type LoginFormDto = z.infer<typeof LoginFormDtoSchema>;

export interface IMe {
  authorization: string;
  routes?: IMenuRoute[][];
  authority?: IAuthority;
}

export interface IAuthorityItem {
  list: boolean;
  create: boolean;
  modify: boolean;
  delete: boolean;
  ban?: boolean;
}
export interface IAuthority {
  banner: IAuthorityItem;
}
