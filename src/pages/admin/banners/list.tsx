import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@shadcn-ui/ui';

import useGetBannerList from '@features/banner/hooks/useGetList';
import useListDelete from '@features/banner/hooks/useListDelete';
import useListToggleShow from '@features/banner/hooks/useListToggleShow';

import { BANNER_LIST_TABLE_HEADERS, IBannerItem } from '@entities/banner';

import useChangePage from '@hooks/useChangePage';
import useTableSearch from '@hooks/useTableSearch';

import { ROUTE_PATHS } from '@constants';

import { DeleteDialog, PageContainer, Table, TablePagination, TableSearch } from '@components';

const AdminBannerListPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useGetBannerList();
  const searchForm = useTableSearch(ROUTE_PATHS.ADMIN.BANNERS.ALL_LIST);
  const paginationData = useChangePage({
    routePath: ROUTE_PATHS.ADMIN.BANNERS.ALL_LIST,
    total: data?.total,
  });

  const onDelete = useListDelete();
  const onToggleShow = useListToggleShow();

  const onClickItem = (item: IBannerItem) => (): void => {
    navigate(`${ROUTE_PATHS.ADMIN.BANNERS.BANNER}/${item.id}`);
  };

  const onClickCreate = (): void => {
    navigate(ROUTE_PATHS.ADMIN.BANNERS.CREATE);
  };

  return (
    <PageContainer className='flex h-[calc(100svh-150px)] min-h-[511px] flex-col space-y-4'>
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
                item={item}
                open-button-data-test-id='table-delete-button'
                delete-button-data-test-id='delete-button'
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
      <div className='flex flex-1 items-end justify-end'>
        <Button onClick={onClickCreate}>등록하기</Button>
      </div>
    </PageContainer>
  );
};

export default AdminBannerListPage;
