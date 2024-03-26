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
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/shared/utils'),
      },
      {
        find: '@shadcn-ui',
        replacement: path.resolve(__dirname, 'src/shared/shadcn-ui'),
      },
      {
        find: '@stores',
        replacement: path.resolve(__dirname, 'src/shared/stores/index.ts'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/shared/hooks'),
      },
      {
        find: '@typings',
        replacement: path.resolve(__dirname, 'src/shared/typings/index.ts'),
      },
      {
        find: '@consts',
        replacement: path.resolve(__dirname, 'src/shared/consts'),
      },
      {
        find: '@contracts',
        replacement: path.resolve(__dirname, 'src/shared/contracts'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/shared/components'),
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
