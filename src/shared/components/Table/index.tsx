import { useCallback, useLayoutEffect, useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Skeleton } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import type { ITableItem, ITableDefaultItem } from '@typings';

import { useTableStore } from '@stores';

interface IProps<T> {
  headers: readonly string[];
  items: T[];
  showItems: string[];
  imageItems?: string[];
  externalLinkItems?: string[];
  selectedItems?: T[];
  appliedItems?: T[];
  imageItemProps?: {
    itemKey: string;
    className: string;
  }[];
  renderItemProps?: {
    itemKey: string;
    children: (item: T) => JSX.Element;
  }[];
  isLoading?: boolean;
  scrollRestorationKey?: string;
  onClickItem?: (item: T) => () => void;
}
const Table = <T extends ITableDefaultItem>({
  headers,
  items,
  showItems,
  imageItems = [],
  externalLinkItems = [],
  selectedItems = [],
  appliedItems = [],
  imageItemProps,
  renderItemProps,
  isLoading = false,
  scrollRestorationKey,
  onClickItem,
}: IProps<T>) => {
  const scrollTopRef = useRef<string>('');

  const { scrollData, setScrollData } = useTableStore();

  useLayoutEffect(() => {
    if (scrollRestorationKey) {
      // cache에 저장된 스크롤 위치를 가져옴
      const currentScrollTop = Number(scrollData?.[scrollRestorationKey] || 0);

      // 로딩이 종료된 상태일 때 스크롤 위치를 이동
      if (!isNaN(currentScrollTop) && !isLoading) {
        scrollTopRef.current = String(currentScrollTop);
        (document.querySelector('.table-parent') as HTMLElement).scrollTop = currentScrollTop;
      }
    }

    return (): void => {
      // 페이지 변경 직전에 현재 스크롤 위치를 cache에 저장
      if (scrollRestorationKey && !isLoading) {
        setScrollData({
          [scrollRestorationKey]: scrollTopRef.current,
        });
      }
    };
    // disable scrollData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, scrollRestorationKey, setScrollData]);

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

    if (imageItems?.includes(showItem)) {
      const imageItemProp = imageItemProps?.find(x => x.itemKey === showItem);
      return (
        <Td data-test-id='table-image-item' key={showItem}>
          <img
            src={String(item[showItem])}
            className={cn('m-auto h-14 w-14', imageItemProp?.className || '')}
            onError={onImageError}
          />
        </Td>
      );
    }

    if (externalLinkItems.includes(showItem)) {
      const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>): void => e.stopPropagation();

      return (
        <Td data-test-id='table-external-link-item' key={showItem}>
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
      return (
        <Td data-test-id='table-boolean-item' key={showItem}>
          {item[showItem] ? 'Y' : 'N'}
        </Td>
      );
    }

    if (typeof item[showItem] === 'number') {
      return (
        <Td data-test-id='table-number-item' key={showItem}>
          {item[showItem].toLocaleString('ko-KR')}
        </Td>
      );
    }

    return (
      <Td data-test-id='table-text-item' key={showItem}>
        {item[showItem]}
      </Td>
    );
  };

  return (
    <div
      className={cn(
        'table-parent relative',
        isLoading ? 'min-h-[300px]' : 'min-h-[300px] overflow-auto',
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
      <table className='w-full min-w-[450px] table-fixed overflow-auto rounded-sm border-[#f2f2f2] bg-white'>
        <thead className='sticky top-0 border-[#f2f2f2] font-semibold'>
          <tr className='  bg-[#fcfcfc] text-center '>
            {headers.map(header => (
              <th key={header} className='max-w-20 break-words px-4 py-4'>
                {header}
              </th>
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

const Td = (props: {
  'isStopPropagation'?: boolean;
  'data-test-id'?: string;
  'children': React.ReactNode;
}) => (
  <td
    data-test-id={props?.['data-test-id']}
    className='max-w-20 break-words px-4 py-3 text-sm'
    onClick={props.isStopPropagation ? e => e.stopPropagation() : undefined}
  >
    {props.children}
  </td>
);

export default Table;
