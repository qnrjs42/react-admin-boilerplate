import { FaExternalLinkAlt } from 'react-icons/fa';

import { Skeleton } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import type { ITableItem } from '@typings/common';

interface IDefaultItem {
  id: string;
}

interface IProps<T> {
  headers: readonly string[];
  items: T[];
  showItems: string[];
  imageItems?: string[];
  externalLinkItems?: string[];
  selectedItems?: T[];
  appliedItems?: T[];
  isLoading?: boolean;
  renderItemProps?: {
    itemKey: string;
    children: (item: T) => JSX.Element;
  }[];
  onClickItem?: (item: T) => () => void;
}
const Table = <T extends IDefaultItem>({
  headers,
  items,
  showItems,
  imageItems = [],
  externalLinkItems = [],
  selectedItems = [],
  appliedItems = [],
  renderItemProps,
  isLoading = false,
  onClickItem,
}: IProps<T>) => {
  const renderItem = (item: ITableItem, showItem: string): JSX.Element => {
    if (renderItemProps?.length ?? 0 > 0) {
      const renderItemProp = renderItemProps?.find(x => x.itemKey === showItem);
      if (renderItemProp)
        return <Td key={showItem}>{renderItemProp.children(item as unknown as T)}</Td>;
    }

    if (imageItems.includes(showItem)) {
      return (
        <Td key={showItem}>
          <img src={String(item[showItem])} className='m-auto h-14 w-14' />
        </Td>
      );
    }

    if (externalLinkItems.includes(showItem)) {
      const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>): void => e.stopPropagation();

      return (
        <Td key={showItem}>
          <a
            href={String(item[showItem])}
            className='flex flex-wrap items-center justify-center gap-2 break-all text-teal-500'
            target='_blank'
            rel='noopener noreferrer'
            onClick={onClickLink}
          >
            {item[showItem]} <FaExternalLinkAlt className='min-w-3' />
          </a>
        </Td>
      );
    }

    if (typeof item[showItem] === 'boolean') {
      return <Td key={showItem}>{item[showItem] ? 'Y' : 'N'}</Td>;
    }

    if (typeof item[showItem] === 'number') {
      return <Td key={showItem}>{item[showItem].toLocaleString('ko-KR')}</Td>;
    }

    return <Td key={showItem}>{item[showItem]}</Td>;
  };

  return (
    <div className={cn('relative', isLoading ? 'min-h-[300px] ' : 'min-h-[auto]')}>
      {isLoading ? (
        <div className='absolute left-0 top-0 z-[2] h-full w-full space-y-2 overflow-hidden bg-white px-4'>
          <Skeleton className='mt-2 h-16' />
          {[1, 2, 3, 4, 5].map(v => (
            <Skeleton key={v} className='h-16' />
          ))}
        </div>
      ) : null}
      <table className='h-full w-full rounded-sm border border-[#f2f2f2] bg-white'>
        <thead className='border-b border-[#f2f2f2] font-semibold'>
          <tr className='text-center'>
            {headers.map(header => (
              <td key={header} className='max-w-20 break-words px-4 py-4'>
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, itemIndex) => (
            <tr
              key={(item as unknown as ITableItem)?.id.toString() || itemIndex.toString()}
              className={cn(
                'text-center',
                items.length - 1 !== itemIndex ? 'border-b' : '',
                onClickItem ? 'cursor-pointer' : 'cursor-auto',
                selectedItems.some(selectedItem => selectedItem.id === item.id)
                  ? 'bg-teal-800 text-white'
                  : 'text-zinc-600',
                appliedItems.some(appliedItem => appliedItem.id === item.id) ? 'opacity-30' : '',
              )}
              onClick={onClickItem?.(item)}
            >
              {showItems.map(showItem => renderItem(item as unknown as ITableItem, showItem))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className='max-w-20 break-words px-4 py-3 text-sm'>{children}</td>
);

export default Table;
