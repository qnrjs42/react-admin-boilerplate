import { http, HttpResponse } from 'msw';

type LoginEmailBody = {
  email: string;
  password: string;
};

export const authLoginEmail = http.post<never, LoginEmailBody>(
  '/api/auth/login/email',
  async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      data: {
        email: body?.email,
        authorization: 'Bearer token',
      },
    });
  },
);

export const authLogout = http.post<never>('/api/auth/logout', () => {
  return HttpResponse.json({});
});

export const authUser = http.get<never>('/api/auth/user', () => {
  return HttpResponse.json({
    data: {
      nickname: 'John Doe',
    },
  });
});

export const authMenu = http.get<never>('/api/user/menu', () => {
  return HttpResponse.json({
    data: [
      {
        menuCode: 'AUTH_BANNER_LIST',
        menuName: '배너 전체 리스트',
      },
      {
        menuCode: 'AUTH_BANNER_CREATE',
        menuName: '배너 등록',
      },
      {
        menuCode: 'AUTH_BANNER_MODIFY',
        menuName: '배너 수정',
      },
      {
        menuCode: 'AUTH_BANNER_DELETE',
        menuName: '배너 삭제',
      },
    ],
  });
});
