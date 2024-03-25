import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@shadcn-ui/hooks';

import { apiModifyBanner } from '@features/banner/apis';

import { type BannerFormDto, BannerFormDtoSchema, BANNER_KEYS, IBanner } from '@entities/banner';

import useImageFiles from '@hooks/useImageFiles';

import { utilAxiosError } from '@utils/utilAxios';

import { TOAST_DURATION } from '@constants';

const useModifyBannerForm = (banner?: IBanner) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { files, setFiles } = useImageFiles(banner?.imageFiles || []);

  const form = useForm<BannerFormDto>({
    resolver: zodResolver(BannerFormDtoSchema),
    defaultValues: {
      title: banner?.title || '',
      url: banner?.url || '',
      imageFiles: banner?.imageFiles || [],
      isShow: banner?.isShow || false,
    },
  });

  const { mutate: modifyBanner } = useMutation({
    mutationKey: [BANNER_KEYS.MODIFY],
    mutationFn: apiModifyBanner,
    onSuccess: async (bannerId: string) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [BANNER_KEYS.GET_LIST],
        }),
        queryClient.invalidateQueries({
          queryKey: [BANNER_KEYS.GET, bannerId],
          stale: false, // https://tanstack.com/query/v5/docs/framework/react/guides/filters#query-filters
        }),
      ]);

      toast({
        title: '배너 수정이 완료되었습니다.',
        duration: TOAST_DURATION.SUCCESS,
      });

      navigate(-1);
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: '배너 수정에 실패했습니다.',
        description: utilAxiosError(error),
        duration: TOAST_DURATION.ERROR,
      });
    },
  });

  const onSubmit = form.handleSubmit((data: BannerFormDto): void => {
    modifyBanner({
      id: banner?.id,
      imageFiles: files,
      ...data,
    });
  });

  return { form, files, setFiles, onSubmit };
};

export default useModifyBannerForm;
