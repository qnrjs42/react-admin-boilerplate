import { create } from 'zustand';

import type { Nullable } from '@typings/common';

type ScrollType = Record<string, string>;

interface ITableStore {
  scrollData: Nullable<ScrollType>;
  setScrollData: (
    data: Nullable<ScrollType> | ((prev: Nullable<ScrollType>) => Nullable<ScrollType>),
  ) => void;
}

const useTableStore = create<ITableStore>(set => ({
  scrollData: null,
  setScrollData: (
    data: Nullable<ScrollType> | ((prev: Nullable<ScrollType>) => Nullable<ScrollType>),
  ) => set(state => ({ scrollData: typeof data === 'function' ? data(state.scrollData) : data })),
}));

export default useTableStore;
