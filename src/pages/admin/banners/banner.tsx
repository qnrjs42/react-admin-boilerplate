import type { FC } from 'react';

import { DetailWidget } from '@widgets/index';

import useDeleteBanner from '@features/banner/hooks/useDelete';
import useGetBanner from '@features/banner/hooks/useGetBanner';
import useModifyBannerForm from '@features/banner/hooks/useModifyBannerForm';
import BannerForm from '@features/banner/ui/Form';

import type { IBanner } from '@entities/banner/types';

const AdminBannerPage: FC = () => {
  const { banner, isLoading, isError } = useGetBanner();

  return (
    <DetailWidget isLoading={isLoading} isError={isError}>
      <AdminBannerDetail banner={banner} />
    </DetailWidget>
  );
};

interface IProps {
  banner?: IBanner;
}
const AdminBannerDetail: FC<IProps> = ({ banner }) => {
  const { form, files, setFiles, onSubmit } = useModifyBannerForm(banner);
  const onDelete = useDeleteBanner(banner);

  return (
    <BannerForm
      bannerId={banner?.id}
      form={form}
      files={files}
      setFiles={setFiles}
      submitProps={{
        label: '수정',
        onSubmit,
      }}
      onDelete={onDelete}
    />
  );
};

export default AdminBannerPage;
