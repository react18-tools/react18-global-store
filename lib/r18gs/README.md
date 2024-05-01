# React18GlobalStore

[![test](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/ec3140063acd8df82481/maintainability)](https://codeclimate.com/github/react18-tools/react18-global-store/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react18-global-store/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-global-store) [![Version](https://img.shields.io/npm/v/r18gs.svg?colorB=green)](https://www.npmjs.com/package/r18gs) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/r18gs.svg)](https://www.npmjs.com/package/r18gs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/r18gs) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Motivation

I've created outstanding libraries that harness React18 features using Zustand, which have performed remarkably well. However, when I tried to import from specific folders to enhance tree-shaking, the libraries encountered complications. Each import led to the creation of a separate Zustand store, causing an increase in package size.

To address this issue, I embarked on developing a lightweight, minimalistic store that facilitates shared state even when importing components from different files, thereby optimizing tree-shaking.

## Features

✅ Complete TypeScript Support

✅ Unleash the full capabilities of React18 Server components

✅ Compatible with all React18 build systems, tools, and frameworks

✅ Available in both CommonJS (CJS) and ECMAScript Modules (ESM)

✅ Documented with [Typedoc](https://react18-tools.github.io/react18-global-store) ([Docs](https://react18-tools.github.io/react18-global-store))

✅ Examples available for Next.js, Vite, and Remix

## Simple Global State Shared Across Multiple Components

Utilize this hook similar to the `useState` hook. However, ensure to provide a unique key, unique across the app, to identify and make this state accessible to all client components.

```tsx
const [state, setState] = useRGS<number>("counter", 1);
```

> For detailed instructions, refer to [Getting Started](./md-docs/1.getting-started.md)

## Using Plugins

Enhance the functionality of the store by leveraging either the `create` function, `withPlugins` function, or the `useRGSWithPlugins` hook from `r18gs/dist/with-plugins`, enabling features such as storing to local storage, among others.

```tsx
// store.ts
import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins"; /** You can create your own plugin or import third-party plugins */

export const useMyPersistentCounterStore = create<number>("persistent-counter", 0, [persist()]);
```

Now, you can utilize `useMyPersistentCounterStore` similarly to `useState` without specifying an initial value.

```tsx
const [persistedCount, setPersistedCount] = useMyPersistentCounterStore();
```

> For detailed instructions, see [Leveraging Plugins](./md-docs/2.leveraging-plugins.md)

## Contributing

See [contributing.md](/contributing.md)

### 🤩 Don't forget to star [this repo](https://github.com/mayank1513/react18-global-store)!

Interested in hands-on courses for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescript/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/ec3e74d795ed805a0fce67c0b64c3f08872e7945.svg "Repobeats analytics image")

## License

Licensed under the MPL 2.0 open source license.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
