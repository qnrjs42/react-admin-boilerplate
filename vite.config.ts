import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
        find: '@types',
        replacement: path.resolve(__dirname, 'src/shared/types'),
      },
      {
        find: '@shadcn-ui',
        replacement: path.resolve(__dirname, 'src/shared/shadcn-ui'),
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
