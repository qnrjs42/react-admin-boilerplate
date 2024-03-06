import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import utilQueryClient from '@utils/utilQueryClient.ts';

import App from './App.tsx';
import './globals.css';
import './index.css';

axios.defaults.baseURL = '';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={utilQueryClient()}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
