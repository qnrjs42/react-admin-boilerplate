import type { Preview } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import '../src/globals.css';
import '../src/index.css';
import { worker } from '../src/mocks/browser';
import { Toaster } from '../src/shared/shadcn-ui/ui';
import utilQueryClient from '../src/shared/utils/utilQueryClient';

worker.start({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  Story => (
    <QueryClientProvider client={utilQueryClient()}>
      <Story />
      <Toaster />
    </QueryClientProvider>
  ),
];

export default preview;
