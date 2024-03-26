import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import apiCreateBanner from '@features/banner/apis/create';

import { BANNER_KEYS, BANNER_TOAST_MESSAGES } from '@entities/banner/consts';
import { BannerFormDtoSchema } from '@entities/banner/contracts';
import type { BannerFormDto } from '@entities/banner/types';

import { useImageFiles } from '@hooks';

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
          title: BANNER_TOAST_MESSAGES.CREATE_SUCCESS,
          duration: TOAST_DURATION.SUCCESS,
        });

      navigate(-1);
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: BANNER_TOAST_MESSAGES.CREATE_ERROR,
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
