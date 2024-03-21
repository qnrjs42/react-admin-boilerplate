import { useState } from 'react';
import { GoGrabber } from 'react-icons/go';
import { VscGrabber } from 'react-icons/vsc';
import { ReactSortable, type ItemInterface, type Sortable } from 'react-sortablejs';

import { cn } from '@shadcn-ui/utils';

import type { ITableDefaultItem } from '@typings/common';

interface IProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  headerTitle?: string;
}
const SortableTable = <T extends ITableDefaultItem>({
  headerTitle = '제목',
  items,
  setItems,
}: IProps<T>) => {
  const [sortingItemIndex, setSortingItemIndex] = useState<number | null>(null);

  const onSortStart = (evt: Sortable.SortableEvent): void => {
    setSortingItemIndex(evt?.oldIndex !== undefined ? evt.oldIndex : null);
  };

  const onSortEnd = (): void => {
    setSortingItemIndex(null);
  };

  return (
    <div className='max-h-[320px] overflow-auto bg-white'>
      <div className='flex items-center border-b bg-[#fcfcfc] text-center'>
        <div className='px-4 py-4'>
          <VscGrabber size={20} />
        </div>
        <div className='w-1/4 px-4 py-4'>순위</div>
        <div className='w-full px-4 py-4'>{headerTitle}</div>
      </div>
      <ReactSortable
        list={items as ItemInterface[]}
        setList={setItems as React.Dispatch<React.SetStateAction<ItemInterface[]>>}
        onStart={onSortStart}
        onEnd={onSortEnd}
        delay={2}
        delayOnTouchOnly
      >
        {items?.map((item, itemIndex) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center border-b text-center',
              sortingItemIndex === itemIndex ? 'bg-teal-800 text-white' : 'cursor-grab',
            )}
          >
            <div className='px-4 py-4'>
              <GoGrabber size={20} />
            </div>
            <div className='w-1/4 px-4 py-4'>{item.rank}</div>
            <div className='w-full px-4 py-4'>{item.title}</div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default SortableTable;
