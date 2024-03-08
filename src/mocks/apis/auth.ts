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
      email: body?.email,
      authorization: 'Bearer token',
    });
  },
);
