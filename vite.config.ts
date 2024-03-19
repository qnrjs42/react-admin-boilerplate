/* eslint-disable @typescript-eslint/no-unused-vars */
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

import CustomVitePluginReactRemoveAttributes from './plugins/remove-attrs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    CustomVitePluginReactRemoveAttributes({
      attributes: ['data-test-id'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@widgets',
        replacement: path.resolve(__dirname, 'src/widgets'),
      },
      {
        find: '@features',
        replacement: path.resolve(__dirname, 'src/features'),
      },
      {
        find: '@entities',
        replacement: path.resolve(__dirname, 'src/entities'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/shared/hooks'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/shared/utils'),
      },
      {
        find: '@typings',
        replacement: path.resolve(__dirname, 'src/shared/typings'),
      },
      {
        find: '@stores',
        replacement: path.resolve(__dirname, 'src/shared/stores'),
      },
      {
        find: '@shadcn-ui',
        replacement: path.resolve(__dirname, 'src/shared/shadcn-ui'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/shared/constants/index.ts'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/shared/components/index.tsx'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/shared/styles'),
      },
      {
        find: '@theme',
        replacement: path.resolve(__dirname, 'src/shared/styles/theme.ts'),
      },
      {
        find: '@config',
        replacement: path.resolve(__dirname, './config/config.json'),
      },
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
