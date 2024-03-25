import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { apiCreateBanner } from '@features/banner/apis';

import { BannerFormDtoSchema, BANNER_KEYS, type BannerFormDto } from '@entities/banner';

import useImageFiles from '@hooks/useImageFiles';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useCreateBannerForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { files, setFiles } = useImageFiles();

  const form = useForm<BannerFormDto>({
    resolver: zodResolver(BannerFormDtoSchema),
    defaultValues: {
      title: '',
      url: '',
      imageFiles: [],
      isShow: false,
    },
  });

  const { mutate: createBanner } = useMutation({
    mutationKey: [BANNER_KEYS.CREATE],
    mutationFn: apiCreateBanner,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [BANNER_KEYS.GET_LIST],
      }),
        toast({
          title: '배너 생성이 완료되었습니다.',
          duration: TOAST_DURATION.SUCCESS,
        });

      navigate(-1);
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: '배너 생성에 실패했습니다.',
        description: utilAxiosError(error),
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onSubmit = form.handleSubmit((data: BannerFormDto): void => {
    createBanner({
      imageFiles: files,
      ...data,
    });
  });

  return { form, files, setFiles, onSubmit };
};

export default useCreateBannerForm;
