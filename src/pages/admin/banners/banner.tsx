import type { FC } from 'react';

import { DetailWidget } from '@widgets/index';

import { useGetBanner, useModifyBannerForm } from '@features/banner/hooks';
import { BannerForm } from '@features/banner/ui';

import type { IBanner } from '@entities/banner';

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

  return (
    <BannerForm
      form={form}
      files={files}
      setFiles={setFiles}
      submitProps={{
        label: '수정하기',
        onSubmit,
      }}
    />
  );
};

export default AdminBannerPage;
