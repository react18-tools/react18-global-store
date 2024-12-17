# React18GlobalStore <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![Test](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react18-global-store/actions/workflows/test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/ec3140063acd8df82481/maintainability)](https://codeclimate.com/github/react18-tools/react18-global-store/maintainability)
[![Code Coverage](https://codecov.io/gh/react18-tools/react18-global-store/graph/badge.svg)](https://codecov.io/gh/react18-tools/react18-global-store)
[![Version](https://img.shields.io/npm/v/r18gs.svg?colorB=green)](https://www.npmjs.com/package/r18gs)
[![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/r18gs.svg)](https://www.npmjs.com/package/r18gs)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/r18gs)
[![Gitpod Ready](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

> 🌐 **Live Demo with Code**: [https://r18gs.vercel.app/](https://r18gs.vercel.app/)

## Motivation

While developing libraries utilizing React 18 features with Zustand, I encountered issues with tree-shaking when importing from specific folders. This caused the creation of multiple Zustand stores, resulting in bugs and unnecessary JavaScript code execution.

To address this, I created a lightweight, minimalistic store designed for shared states that optimizes tree-shaking and supports component imports from separate files.

## Features

✅ **Full TypeScript Support**  
✅ **Unlock the Full Power of React18 Server Components**  
✅ **Compatible with All React18 Build Systems and Frameworks**  
✅ **Comprehensive Documentation with [Typedoc](https://react18-tools.github.io/react18-global-store)**  
✅ **Examples for Next.js, Vite, and Remix**  
✅ **Seamlessly Works with Selectors**

## Simple Global State Across Components

Use the `useRGS` hook just like `useState`, but with a unique key to make the state accessible across components.

```tsx
const [state, setState] = useRGS<number>("counter", 1);
```

Or initialize using a function:

```tsx
const [state, setState] = useRGS<number>("counter", () => 1);
```

> 🔗 **Getting Started**: [Guide](./md-docs/1.getting-started.md)

## What's New?

🚀 **Now Supports Selectors for Complex Stores**  
Explore more at [https://r18gs.vercel.app/](https://r18gs.vercel.app/).

## Using Plugins

Extend the store's functionality with the `create` function, `withPlugins` function, or the `useRGSWithPlugins` hook. Features like persistence to local storage can be easily integrated.

```tsx
// store.ts
import { create } from "r18gs/dist/with-plugins";
import { persist } from "r18gs/dist/plugins"; // Use third-party or custom plugins

export const useMyPersistentCounterStore = create<number>("persistent-counter", 0, [persist()]);
```

Use it just like `useState` without needing an initial value:

```tsx
const [persistedCount, setPersistedCount] = useMyPersistentCounterStore();
```

> 🔗 **Learn More**: [Leveraging Plugins](./md-docs/2.leveraging-plugins.md)

## Contributing

Contributions are welcome! See [contributing.md](/contributing.md).

### 🌟 Don't Forget to Star [this repository](https://github.com/mayank1513/react18-global-store)!

### Hands-On Learning Resources

- [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript)
- [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescript/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/ec3e74d795ed805a0fce67c0b64c3f08872e7945.svg "Repobeats Analytics")

## License

This library is licensed under the **MPL-2.0** open-source license.

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Support our work by [sponsoring](https://github.com/sponsors/mayank1513) or enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses).

---

<p align="center" style="text-align:center">Made with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
