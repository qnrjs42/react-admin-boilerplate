import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@shadcn-ui/ui';

import {
  useGetBannerList,
  useDeleteBannerListItem,
  useToggleShowBannerListItem,
  useChangeRankBannerList,
} from '@features/banner/hooks';

import { BANNER_LIST_TABLE_HEADERS } from '@entities/banner/consts';
import { IBannerItem } from '@entities/banner/types';

import { useChangePage, useTableSearch } from '@hooks';

import { ROUTE_PATHS } from '@constants';

import {
  BottomRightWrapper,
  DeleteDialog,
  PageContainer,
  SortableTableDialog,
  Table,
  TablePagination,
  TableSearch,
} from '@components';

const AdminBannerListPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useGetBannerList();
  const searchForm = useTableSearch(ROUTE_PATHS.ADMIN.BANNERS.ALL_LIST);
  const paginationData = useChangePage({
    routePath: ROUTE_PATHS.ADMIN.BANNERS.ALL_LIST,
    total: data?.total,
  });

  const onDelete = useDeleteBannerListItem();
  const onToggleShow = useToggleShowBannerListItem();
  const onSort = useChangeRankBannerList();

  const onClickItem = (item: IBannerItem) => (): void => {
    navigate(`${ROUTE_PATHS.ADMIN.BANNERS.BANNER}/${item.id}`);
  };

  const onClickCreate = (): void => {
    navigate(ROUTE_PATHS.ADMIN.BANNERS.CREATE);
  };

  return (
    <PageContainer className='h-[calc(100svh-150px)] min-h-[511px] space-y-4'>
      <TableSearch {...searchForm} total={paginationData.total} />
      <Table
        headers={BANNER_LIST_TABLE_HEADERS}
        items={data?.items || []}
        showItems={['imageUrl', 'title', 'url', 'isShow', 'isDelete']}
        imageItems={['imageUrl']}
        externalLinkItems={['url']}
        imageItemProps={[
          {
            itemKey: 'imageUrl',
            className: 'w-full h-full aspect-square',
          },
        ]}
        renderItemProps={[
          {
            itemKey: 'isShow',
            children: item => (
              <Button
                data-test-id='table-toggle-show-button'
                variant='secondary'
                onClick={onToggleShow(item)}
              >
                {item.isShow ? '노출' : '중지'}
              </Button>
            ),
          },
          {
            itemKey: 'isDelete',
            children: item => (
              <DeleteDialog
                open-button-data-test-id='table-delete-button'
                delete-button-data-test-id='delete-button'
                item={item}
                onDelete={onDelete}
              />
            ),
          },
        ]}
        isLoading={isLoading}
        scrollRestorationKey={location.pathname}
        onClickItem={onClickItem}
      />
      <TablePagination {...paginationData} />
      <BottomRightWrapper className='space-x-4'>
        <SortableTableDialog
          open-button-data-test-id='open-sortable-table-button'
          sort-button-data-test-id='sortable-table-sort-button'
          dialogTitle='배너 순위 변경하기'
          items={data?.items || []}
          onSort={onSort}
        />
        <Button data-test-id='create-banner-button' onClick={onClickCreate}>
          등록하기
        </Button>
      </BottomRightWrapper>
    </PageContainer>
  );
};

export default AdminBannerListPage;
