import type { FileWithDropzone } from '@typings';

export const utilTimeSleep = (sec: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

interface IPaginate {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
export const utilPaginate = (
  totalItems: number,
  currentPage = 1,
  pageSize = 30,
  maxPages = 9,
): IPaginate => {
  // https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
  // calculate total pages
  const totalPages: number = Math.ceil(totalItems / pageSize);
  let newCurrentPage = currentPage;

  // ensure current page isn't out of range
  if (newCurrentPage < 1) {
    newCurrentPage = 1;
  } else if (newCurrentPage > totalPages) {
    newCurrentPage = totalPages;
  }

  let startPage: number;
  let endPage: number;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (newCurrentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (newCurrentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = newCurrentPage - maxPagesBeforeCurrentPage;
      endPage = newCurrentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  const startIndex = (newCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i);

  // return object with all pager properties required by the view
  return {
    totalItems,
    currentPage: newCurrentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
};

export const utilRemoteImageUrlToFiles = (imageUrl: string): FileWithDropzone[] => {
  const file: FileWithDropzone = {
    ...new File([''], '', { type: 'file', lastModified: Date.now() }),
    preview: imageUrl,
    name: `${imageUrl}_${Date.now()}`,
    size: 0,
    type: 'image/jpg',
    isRemote: true,
  };

  return [file];
};
