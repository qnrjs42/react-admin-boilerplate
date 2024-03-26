import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import type { BannerFormDto } from '@entities/banner';

import type { FileWithDropzone } from '@typings';

import {
  DeleteDialog,
  SharedFormFieldRender,
  SharedImageFormFieldRender,
  SharedSwitchFormFieldRender,
} from '@components';

interface IProps {
  bannerId?: string;
  form: UseFormReturn<BannerFormDto>;
  files: FileWithDropzone[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithDropzone[]>>;
  submitProps: {
    label: string;
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
  onDelete?: () => () => void;
}
const BannerForm: FC<IProps> = ({ bannerId, form, files, setFiles, submitProps, onDelete }) => {
  return (
    <Form {...form}>
      <form>
        <div className='flex justify-end gap-4'>
          {onDelete ? (
            <DeleteDialog
              item={{
                id: bannerId || '',
                title: form.getValues('title'),
                imageUrl: form.getValues('imageFiles')[0]?.preview,
              }}
              onDelete={onDelete}
            />
          ) : null}
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </div>
        <div className='space-y-6'>
          <FormField
            name='isShow'
            control={form.control}
            render={({ field }) => (
              <SharedSwitchFormFieldRender data-test-id='aaaaa' label='배너 노출' field={field} />
            )}
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

export default BannerForm;
