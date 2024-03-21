import { http, HttpResponse } from 'msw';

export const bannerList = http.get<never>('/api/banner/list/:page', ({ request }) => {
  const banners = Array.from({ length: 30 }).map((_, idx) => ({
    idx: `auahsdkjasnbd${idx + 1 + Number(request.headers.get('page'))}`,
    title: `배너${idx + 1}`,
    rank: idx + 1,
    imageUrl: 'https://via.placeholder.com/300',
    url: 'https://www.naver.com',
    isShow: idx % 2 === 0,
  }));

  return HttpResponse.json({
    data: {
      page: 1,
      pageSize: 30,
      totalCount: banners.length,
      list: banners,
    },
  });
});

export const showBanner = http.patch<never>('/api/banner/show/:id', () => {
  return HttpResponse.json({
    data: {
      ok: true,
    },
  });
});

export const rankBanner = http.patch<never>('/api/banner/rank', () => {
  return HttpResponse.json({
    data: {
      ok: true,
    },
  });
});
