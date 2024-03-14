import { useCallback, useEffect, useState } from 'react';

import { utilPaginate } from '@utils/util';

type PaginationType = {
  startPage: number;
  endPage: number;
  totalPages: number;
  pageArr: number[];
};

interface IParams {
  total: number;
  currentPage: number;
  pageSize?: number;
  maxEndPage?: number;
  onChangePage: (page: number) => void;
}
const usePagination = ({ total, currentPage, pageSize, maxEndPage, onChangePage }: IParams) => {
  const [paginationData, setPaginationData] = useState<PaginationType>({
    totalPages: 0,
    startPage: 1,
    endPage: 1,
    pageArr: [],
  });

  // 페이지 바뀌었을 때 현재 페이지를 myCurrentPage에 저장
  const [myCurrentPage, setMyCurrentPage] = useState<number>(currentPage);

  // 페이지 계산
  useEffect(() => {
    // if (maxEndPage && pageSize && total > maxEndPage * pageSize) {
    //   newListTotal = maxEndPage * pageSize;
    // }

    const { startPage, endPage, pages, totalPages } = utilPaginate(total, myCurrentPage, pageSize);

    setPaginationData({
      startPage,
      endPage,
      totalPages,
      pageArr: pages,
    });

    return (): void => {
      setPaginationData({
        totalPages: 0,
        startPage: 1,
        endPage: 1,
        pageArr: [],
      });
    };
  }, [myCurrentPage, total, maxEndPage, pageSize]);

  const onChangeFirstPage = useCallback((): void => {
    if (myCurrentPage > 1) {
      if (paginationData.startPage !== 1) {
        setMyCurrentPage(paginationData.startPage - 1);
        onChangePage(paginationData.startPage - 1);
      } else {
        if (myCurrentPage === 1) return;
        // startPage가 처음일 때 처음 고정
        setMyCurrentPage(1);
        onChangePage(1);
      }
    }
  }, [myCurrentPage, paginationData.startPage, onChangePage]);
  const onChangeLastPage = useCallback((): void => {
    if (myCurrentPage < paginationData.endPage) {
      if (paginationData.endPage !== paginationData.totalPages) {
        setMyCurrentPage(paginationData.endPage + 1);
        onChangePage(paginationData.endPage + 1);
      } else {
        if (myCurrentPage === paginationData.totalPages) return;
        // endPage가 마지막일 때 마지막 고정
        setMyCurrentPage(paginationData.endPage);
        onChangePage(paginationData.endPage);
      }
    }
  }, [myCurrentPage, paginationData.endPage, paginationData.totalPages, onChangePage]);

  const onMyChangePage = useCallback(
    (page: number) => (): void => {
      setMyCurrentPage(page);
      onChangePage(page);
    },
    [onChangePage],
  );

  // const onChangeAfterPage = useCallback(
  //   (page: number) => (): void => {
  //     if (myCurrentPage === paginationData.totalPages) {
  //       return;
  //     }

  //     setMyCurrentPage(page + 1);
  //     onChangePage(page + 1);
  //   },
  //   [myCurrentPage, paginationData.totalPages, onChangePage],
  // );

  // const onChangeBeforePage = useCallback(
  //   (page: number) => (): void => {
  //     if (page <= 1) {
  //       return;
  //     }

  //     setMyCurrentPage(page - 1);
  //     onChangePage(page - 1);
  //   },
  //   [onChangePage],
  // );

  return {
    paginationData,
    myCurrentPage,
    onChangeFirstPage,
    onChangeLastPage,
    onMyChangePage,
    // onChangeAfterPage,
    // onChangeBeforePage,
  };
};

export default usePagination;
