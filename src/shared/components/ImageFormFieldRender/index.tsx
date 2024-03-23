import { DropzoneOptions, useDropzone } from 'react-dropzone';
import type { ControllerRenderProps } from 'react-hook-form';
import { FaRegImage } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import type { FileWithDropzone } from '@typings/common';

interface IProps<TName extends string> extends React.InputHTMLAttributes<HTMLInputElement> {
  files: FileWithDropzone[];
  field: ControllerRenderProps<any, TName>;
  label?: string;
  isRequired?: boolean;
  dropzoneOptions?: DropzoneOptions;
  imgClassName?: string;
  setFiles: React.Dispatch<React.SetStateAction<FileWithDropzone[]>>;
}
const SharedImageFormFieldRender = <TName extends string>({
  files,
  field,
  label,
  isRequired,
  dropzoneOptions = {
    maxFiles: 1,
    multiple: false,
  },
  imgClassName,
  setFiles,
}: IProps<TName>) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.png', '.jpeg'],
    },
    onDrop: acceptedFiles => {
      // zod validation
      field.onChange(dropzoneOptions.multiple ? [{ ...field }, ...acceptedFiles] : acceptedFiles);

      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      // current files
      setFiles(dropzoneOptions?.multiple ? prev => [...prev, ...newFiles] : newFiles);
    },
    ...dropzoneOptions,
  });

  const onRemoveFile = (fileIndex: number) => (): void => {
    setFiles(prev => prev.filter((_, i) => i !== fileIndex));
    acceptedFiles.splice(fileIndex, 1);
  };

  return (
    <FormItem>
      {label ? (
        <FormLabel>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <div
          {...getRootProps({
            className: 'bg-[#fafafa] rounded-md border border-dashed cursor-pointer px-3 py-9 mt-2',
          })}
        >
          <input {...getInputProps()} />
          <div className='flex flex-col items-center justify-center gap-1'>
            <FaRegImage color='rgb(156,163,175)' size={18} />
            <p className=' text-center text-sm text-gray-400'>
              이미지를 Drag & Drop 하거나 여기를 클릭하세요
            </p>
          </div>
        </div>
      </FormControl>
      <FormMessage />
      {files?.length > 0 ? (
        <div className='mt-4 flex items-center gap-3'>
          {files.map((file, fileIndex) => (
            <div key={file.name}>
              <div className='relative'>
                <div
                  className='absolute right-0 cursor-pointer bg-white p-1'
                  onClick={onRemoveFile(fileIndex)}
                >
                  <IoClose size={18} />
                </div>
                <img src={file.preview} alt={file.name} className={cn('h-24 w-24', imgClassName)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </FormItem>
  );
};

export default SharedImageFormFieldRender;
