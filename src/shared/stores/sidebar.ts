import { create } from 'zustand';

import { STORAGE_KEYS } from '@constants';

interface ISidebarStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (data: boolean | ((prev: boolean) => boolean)) => void;
}

const useSidebarStore = create<ISidebarStore>(set => ({
  // localstorage에서 sidebar의 상태를 가져옴
  isSidebarOpen: (localStorage.getItem(STORAGE_KEYS.SIDEBAR) || 'open') === 'open',
  setIsSidebarOpen: (data: boolean | ((prev: boolean) => boolean)) =>
    set(state => {
      const newIsSidebarOpen = typeof data === 'function' ? data(state.isSidebarOpen) : data;

      // localstorage에 sidebar의 상태를 저장
      if (newIsSidebarOpen) localStorage.setItem(STORAGE_KEYS.SIDEBAR, 'open');
      else localStorage.setItem(STORAGE_KEYS.SIDEBAR, 'close');

      return {
        isSidebarOpen: newIsSidebarOpen,
      };
    }),
}));

export default useSidebarStore;
