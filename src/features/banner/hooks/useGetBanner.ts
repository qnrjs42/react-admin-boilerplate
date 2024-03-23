import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { apiGetBanner } from '@features/banner/apis';

import { BANNER_KEYS, UseBannerForm, bannerFormKeys, type IBanner } from '@entities/banner';

import { utilRemoteImageUrlToFiles } from '@utils/util';

import type { FileWithDropzone } from '@typings/common';

interface IReturn {
  banner?: IBanner;
  isLoading: boolean;
  isError: boolean;
}

interface IParams {
  form: UseBannerForm;
  setFiles: React.Dispatch<React.SetStateAction<FileWithDropzone[]>>;
}

const useGetBanner = ({ form, setFiles }: IParams): IReturn => {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [BANNER_KEYS.GET, params?.id],
    queryFn: async () => {
      const response = await apiGetBanner({ id: params?.id });

      bannerFormKeys.forEach(key => {
        form.setValue(key, response[key]);
      });
      const imageFiles = utilRemoteImageUrlToFiles(response.imageUrl);
      form.setValue('imageFiles', imageFiles);

      setFiles(imageFiles);

      return response;
    },
  });

  return { banner: data, isLoading, isError };
};

export default useGetBanner;
