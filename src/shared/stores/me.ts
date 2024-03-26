import { create } from 'zustand';

import type { IMe } from '@entities/auth/types';

import type { Nullable } from '@typings';

interface IMeStore {
  me: Nullable<IMe>;
  setMe: (data: Nullable<IMe> | ((prev: Nullable<IMe>) => Nullable<IMe>)) => void;
}

const useMeStore = create<IMeStore>(set => ({
  me: null,
  setMe: (data: Nullable<IMe> | ((prev: Nullable<IMe>) => Nullable<IMe>)) =>
    set(state => ({ me: typeof data === 'function' ? data(state.me) : data })),
}));

export default useMeStore;
