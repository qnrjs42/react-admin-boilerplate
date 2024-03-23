import { http, HttpResponse } from 'msw';

export const uploadImage = http.post<never>('/api/image/upload', () => {
  return HttpResponse.json({
    data: {
      imageIdx: '1234',
    },
  });
});
