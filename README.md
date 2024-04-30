# React18GlobalStore

[![test](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/ec3140063acd8df82481/maintainability)](https://codeclimate.com/github/react18-tools/react18-global-store/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react18-global-store/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-global-store) [![Version](https://img.shields.io/npm/v/r18gs.svg?colorB=green)](https://www.npmjs.com/package/r18gs) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/r18gs.svg)](https://www.npmjs.com/package/r18gs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/r18gs) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Motivation

I have built wonderful libraries utilizing React18 features using Zustand. They worked awesome. However, when I try importing from specific folder for better tree-shaking, the libraries fail. This is because, for each import a separate zustand store is created. This actually increases the package size also.

Thus, I decided to create a bare minimum, ultra-light store that creates shared state even while importing components from separate files for better treeshaking.

## Features

✅ Full TypeScript Support

✅ Unleash the full power of React18 Server components

✅ Works with all build systems/tools/frameworks for React18

✅ Doccumented with [Typedoc](https://react18-tools.github.io/react18-global-store) ([Docs](https://react18-tools.github.io/react18-global-store))

✅ Next.js, Vite and Remix examples

## Simple global state shared across multiple components

Utilize this hook similarly to the `useState` hook. However, ensure to pass a unique key, unique across the app, to identify and make this state accessible to all client components.

```tsx
const [state, setState] = useRGS<number>("counter", 1);
```

> For detailed instructions see [Getting Started](./md-docs/getting-started.md)

## Using Plugins

You can enhance the functionality of the store by utilizing either the `create` function or the `useRGSWithPlugins` hook from `r18gs/dist/with-plugins`, enabling features such as storing to local storage, among others.

```tsx
// store.ts
import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins"; /** You can create your own plugin or import third party plugin */

export const useMyPersistentCounterStore = create<number>("persistent-counter", 0, [persist()]);
```

Now you can use `useMyPersistentCounterStore` similar to `useState` without any initial value.

## Contributing

See [contributing.md](/contributing.md)

### 🤩 Don't forger to star [this repo](https://github.com/mayank1513/react18-global-store)!

Want hands-on course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/ec3e74d795ed805a0fce67c0b64c3f08872e7945.svg "Repobeats analytics image")

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
