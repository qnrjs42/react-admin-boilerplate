## React Admin Boilerplate

[![Static Badge](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Static Badge](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Static Badge](https://img.shields.io/badge/swc-FCB075?style=for-the-badge&logo=swc&logoColor=white)](https://github.com/vitejs/vite-plugin-react-swc)
[![Static Badge](https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Static Badge](https://img.shields.io/badge/shadcn--ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white)](https://ui.shadcn.com/docs/installation/vite)
[![Static Badge](https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest/docs/framework/react/overview)
[![Static Badge](https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)](https://github.com/pmndrs/zustand)
[![Static Badge](https://img.shields.io/badge/msw-FF6A33?style=for-the-badge&logo=msw&logoColor=white)](https://mswjs.io)
[![Static Badge](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)](https://react-hook-form.com)
[![Static Badge](https://img.shields.io/badge/zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![Static Badge](https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org)
[![Static Badge](https://img.shields.io/badge/cypress-007780?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io)

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
