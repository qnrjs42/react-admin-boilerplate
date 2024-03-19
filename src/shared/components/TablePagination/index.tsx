import type { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@shadcn-ui/ui';

import usePagination from '@hooks/usePagination';

interface IProps {
  total: number;
  currentPage: number;
  pageSize?: number;
  onChangePage: (page: number) => void;
}
const TablePagination: FC<IProps> = props => {
  const maxEndPage =
    props.total > (props?.pageSize || 30)
      ? Math.ceil(props.total / (props.currentPage * (props?.pageSize || 30)))
      : 1;

  const { paginationData, myCurrentPage, onChangeFirstPage, onChangeLastPage, onMyChangePage } =
    usePagination({ ...props, maxEndPage });

  const isPrev = paginationData.startPage !== 1;
  const isNext = paginationData.endPage !== paginationData.totalPages;

  if (paginationData.totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {isPrev ? (
          <>
            <PaginationItem>
              <PaginationPrevious
                className='cursor-pointer select-none'
                onClick={onChangeFirstPage}
              />
            </PaginationItem>
            <PaginationItem className='flex items-center'>
              <PaginationLink className='cursor-pointer select-none' onClick={onMyChangePage(1)}>
                1
              </PaginationLink>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : null}
        {paginationData.pageArr.map(page => (
          <PaginationItem key={`page_${page}`}>
            <PaginationLink
              className='cursor-pointer select-none'
              isActive={myCurrentPage === page}
              onClick={onMyChangePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {isNext ? (
          <>
            <PaginationItem className='flex items-center'>
              <PaginationEllipsis />
              <PaginationLink
                className='cursor-pointer select-none'
                onClick={onMyChangePage(paginationData.totalPages)}
              >
                {paginationData.totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className='cursor-pointer select-none' onClick={onChangeLastPage} />
            </PaginationItem>
          </>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
