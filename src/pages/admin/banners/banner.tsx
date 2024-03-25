import type { FC } from 'react';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { DetailWidget } from '@widgets/index';

import { useGetBanner, useModifyBannerForm } from '@features/banner/hooks';

import type { IBanner } from '@entities/banner';

import {
  SharedFormFieldRender,
  SharedImageFormFieldRender,
  SharedSwitchFormFieldRender,
} from '@components';

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
    <Form {...form}>
      <form>
        <div className='flex justify-end'>
          <Button type='button' onClick={onSubmit}>
            수정하기
          </Button>
        </div>
        <div className='space-y-6'>
          <FormField
            name='isShow'
            control={form.control}
            render={({ field }) => <SharedSwitchFormFieldRender label='배너 노출' field={field} />}
          />
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <SharedFormFieldRender label='배너명' type='text' field={field} isRequired />
            )}
          />
          <FormField
            name='url'
            control={form.control}
            render={({ field }) => (
              <SharedFormFieldRender label='URL' type='text' field={field} isRequired />
            )}
          />
          <FormField
            name='imageFiles'
            control={form.control}
            render={({ field }) => (
              <SharedImageFormFieldRender
                label='이미지 선택 (1장)'
                imgClassName='h-[400px] w-[300px]'
                field={field}
                files={files}
                setFiles={setFiles}
                isRequired
              />
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AdminBannerPage;
