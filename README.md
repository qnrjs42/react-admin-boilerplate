## React Admin Boilerplate

[react-ts + vite + swc](https://github.com/vitejs/vite-plugin-react-swc) + [tailwindcss + shadcn-ui](https://ui.shadcn.com/docs/installation/vite) + [react-query](https://tanstack.com/query/latest/docs/framework/react/overview) + [zustand](https://github.com/pmndrs/zustand) + [msw](https://mswjs.io) + [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev) + [storybook](https://storybook.js.org) + [cypress](https://www.cypress.io)

## Installation & Run

```shell
pnpm install

pnpm dev
```

## storybook

```shell
pnpm storybook
```

## cypress

```shell
pnpm cypress
```

- msw와 호환되지 않음

## VSCode Extensions

1. Tailwind CSS IntelliSense -> https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
2. ESLint -> https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
3. Prettier -> https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## FSD 폴더 구조

- https://www.youtube.com/watch?v=64Fx5Y1gEOA
- https://emewjin.github.io/feature-sliced-design/?utm_source=substack&utm_medium=email
- https://github.com/yurisldk/realworld-react-fsd/tree/881a4d35faf092d5739d00ef0365e9fe730274f6

<br />

- App.tsx
- main.tsx
- pages/
- widgets/
- features/
  - apis/
  - hooks/
  - ui/
- entities/
  - contracts.ts
  - keys.ts
  - types.ts
- shared/
  - components/
  - constants/
  - contracts/
  - hooks/
  - shadcn-ui/
  - stores/
  - typings/
  - utils/

### FSD 규칙

1. pages -> widgets -> features -> entities -> shared 순으로 의존성을 갖습니다.
   즉, features는 entities를 참조할 수 있지만, entities는 features를 참조할 수 없습니다.
2. features 레이어의 각 slices의 segments는 apis, hooks, ui로 나눕니다.
3. entities 레이어의 각 slices의 segments는 contracts, keys, types로 나눕니다.
