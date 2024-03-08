import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import dayjsTimezone from 'dayjs/plugin/timezone';
import dayjsUtc from 'dayjs/plugin/utc';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from '@shadcn-ui/ui';

import utilQueryClient from '@utils/utilQueryClient.ts';

import App from './App.tsx';
import './globals.css';
import './index.css';

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);

dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

axios.defaults.baseURL = '';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') return;
  const { worker } = await import('./mocks/browser');

  // https://stackoverflow.com/questions/68024935/msw-logging-warnings-for-unhandled-supertest-requests
  // bypass 해줘야 불필요한 warning 안뜸
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={utilQueryClient()}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
