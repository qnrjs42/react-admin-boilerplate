import type { FC } from 'react';

import { useCreateBannerForm } from '@features/banner/hooks';
import { BannerForm } from '@features/banner/ui';

import { PageContainer } from '@components';

const AdminBannerCreatePage: FC = () => {
  const { form, files, setFiles, onSubmit } = useCreateBannerForm();

  return (
    <PageContainer>
      <BannerForm
        form={form}
        files={files}
        setFiles={setFiles}
        submitProps={{
          label: '등록',
          onSubmit,
        }}
      />
    </PageContainer>
  );
};

export default AdminBannerCreatePage;
