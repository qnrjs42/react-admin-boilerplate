import { useCallback, useLayoutEffect, useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Skeleton } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import type { ITableItem } from '@typings/common';

import useTableStore from '@stores/table';

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
  renderItemProps?: {
    itemKey: string;
    children: (item: T) => JSX.Element;
  }[];
  isLoading?: boolean;
  scrollRestorationKey?: string;
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
  scrollRestorationKey,
  onClickItem,
}: IProps<T>) => {
  const scrollTopRef = useRef<string>('');
  const { scrollData, setScrollData } = useTableStore();

  useLayoutEffect(() => {
    if (scrollRestorationKey) {
      const currentScrollTop = Number(scrollData?.[scrollRestorationKey] || 0);

      // number 타이핑이 아닌 경우에는 NaN이 나오므로 isNaN으로 체크
      if (!isNaN(currentScrollTop) && items.length > 0) {
        scrollTopRef.current = String(currentScrollTop);
        (document.querySelector('.table-parent') as HTMLElement).scrollTop = currentScrollTop;
      }
    }

    return (): void => {
      // 페이지 변경 시 현재 스크롤 위치를 sessionStorage에 저장
      if (scrollRestorationKey && items.length > 0) {
        setScrollData({
          [scrollRestorationKey]: scrollTopRef.current,
        });
      }
    };
    // disable scrollData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, scrollRestorationKey, setScrollData]);

  const onScroll = useCallback((): void => {
    scrollTopRef.current = String(document.querySelector('.table-parent')?.scrollTop);
  }, []);

  const onImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
  }, []);

  const renderItem = (item: ITableItem, showItem: string): JSX.Element => {
    if (renderItemProps?.length ?? 0 > 0) {
      const renderItemProp = renderItemProps?.find(x => x.itemKey === showItem);
      if (renderItemProp)
        return (
          <Td key={showItem} isStopPropagation>
            {renderItemProp.children(item as unknown as T)}
          </Td>
        );
    }

    if (imageItems.includes(showItem)) {
      return (
        <Td key={showItem}>
          <img src={String(item[showItem])} className='m-auto h-14 w-14' onError={onImageError} />
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
    <div
      className={cn(
        'table-parent relative',
        isLoading
          ? 'min-h-[300px]'
          : 'h-[100vh] max-h-[calc(100svh-355px)] min-h-[300px] overflow-auto',
      )}
      onScroll={scrollRestorationKey ? onScroll : undefined}
    >
      {isLoading ? (
        <div className='absolute left-0 top-0 z-[2] h-full w-full space-y-2 overflow-hidden bg-white px-4'>
          <Skeleton className='mt-2 h-16' />
          {[1, 2, 3, 4, 5].map(v => (
            <Skeleton key={v} className='h-16' />
          ))}
        </div>
      ) : null}
      <table className='w-full min-w-[450px] table-fixed overflow-auto rounded-sm border border-[#f2f2f2] bg-white'>
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

const Td = ({
  isStopPropagation,
  children,
}: {
  isStopPropagation?: boolean;
  children: React.ReactNode;
}) => (
  <td
    className='max-w-20 break-words px-4 py-3 text-sm'
    onClick={isStopPropagation ? e => e.stopPropagation() : undefined}
  >
    {children}
  </td>
);

export default Table;
