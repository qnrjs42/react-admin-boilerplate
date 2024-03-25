import { http, HttpResponse } from 'msw';

const banners = Array.from({ length: 30 }).map((_, idx) => ({
  idx: `auahsdkjasnbd${idx + 1}`,
  title: `배너${idx + 1}`,
  rank: idx + 1,
  imageUrl: 'https://via.placeholder.com/300',
  url: 'https://www.naver.com',
  isShow: idx % 2 === 0,
}));

type BannerParams = {
  id: string;
};

export const bannerList = http.get<never>('/api/banner/list/:page', () => {
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

export const deleteBanner = http.delete<BannerParams>('/api/banner/:id', async req => {
  const { id } = req.params;

  const foundIndex = banners.findIndex(b => b.idx === id);
  if (foundIndex !== -1) banners.splice(foundIndex, 1);

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

const banner: any = {
  data: {
    // idx: req.params.id,
    title: '배너1',
    rank: 1,
    imageUrl: 'https://via.placeholder.com/300',
    url: 'https://www.naver.com',
    isShow: true,
  },
};

type DetailBannerBody = {
  id: string;
  title: string;
  rank: number;
  imageUrl: string;
  url: string;
  isShow: boolean;
};
export const detailBanner = http.get<BannerParams, DetailBannerBody>('/api/banner/:id', req => {
  banner.data.idx = req.params.id;

  return HttpResponse.json(banner);
});

export const modifyBanner = http.patch<never>('/api/banner/modify/:id', async ({ request }) => {
  const modifyBanner: any = await request.json();
  banner.data = {
    ...banner.data,
    ...modifyBanner,
  };

  const foundIndex = banners.findIndex(b => b.idx === banner.data.idx);

  if (foundIndex !== -1) {
    banners[foundIndex] = banner.data;
  }

  return HttpResponse.json({
    data: {
      ok: true,
    },
  });
});

export const createBanner = http.post<never>('/api/banner/create', async ({ request }) => {
  const createBanner: any = await request.json();

  banners.push({
    ...createBanner,
    idx: `auahsdkjasnbd${banners.length + 1}`,
    imageUrl: 'https://via.placeholder.com/300',
  });

  return HttpResponse.json({
    data: {
      ok: true,
    },
  });
});
