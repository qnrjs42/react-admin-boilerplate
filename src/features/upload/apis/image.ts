import axios from 'axios';

interface IResponse {
  data: {
    imageIdx: string;
  };
}

interface IParams {
  file: File;
  type: 'banner';
}
const apiUploadImage = async (params: IParams): Promise<string> => {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('type', params.type);

  const response = await axios.post<IResponse>('/api/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data.imageIdx;
};

export default apiUploadImage;
