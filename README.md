# React18GlobalStore

[![test](https://github.com/react18-tools/r18gs/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/r18gs/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/react18-tools/r18gs/maintainability) [![codecov](https://codecov.io/gh/react18-tools/r18gs/graph/badge.svg)](https://codecov.io/gh/react18-tools/r18gs) [![Version](https://img.shields.io/npm/v/r18gs.svg?colorB=green)](https://www.npmjs.com/package/r18gs) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/r18gs.svg)](https://www.npmjs.com/package/r18gs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/r18gs) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Motivation

I have built wonderful libraries utilizing React18 features using Zustand. They worked awesome. However, when I try importing from specific folder for better tree-shaking, the libraries fail. This is because, for each import a separate zustand store is created. This actually increases the package size also.

Thus, I decided to create a bare minimum, ultra-light store that creates shared state even while importing components from separate files for better treeshaking.

> Will be using this library soon to fix issues with `nextjs-themes`.

## Features

✅ Full TypeScript Support

✅ Unleash the full power of React18 Server components

✅ Works with all build systems/tools/frameworks for React18

✅ Doccumented with [Typedoc](https://react18-tools.github.io/r18gs) ([Docs](https://react18-tools.github.io/r18gs))

✅ Next.js, Vite and Remix examples

## Install

```bash
$ pnpm add r18gs
```

or

```bash
$ npm install r18gs
```

or

```bash
$ yarn add r18gs
```

## Step by Step Instructions and Checklist

- [ ] Set up `CodeCov`
  - [ ] Visit codecov and setup your repo
  - [ ] Create repository secrets for `CODECOV_TOKEN`
- [ ] Set up `CodeClimate`
  - [ ] Visit CodeClimate and setup your repo
  - [ ] Create repository secrets for `CC_TEST_REPORTER_ID`
  - [ ] add `*.test.*` to ignore patterns on the website
  - [ ] update code climate badge
- [ ] Add `NPM_AUTH_TOKEN` to repository secrets to automate publishing package
  - [ ] login to your `npm` account and create automation token
  - [ ] Create a new repository secrets `NPM_AUTH_TOKEN`
- [ ] Update description in `packages/r18gs/package.json`
- [ ] Update Repo Stats by visiting and setting up [repobeats](https://repobeats.axiom.co/)
- [ ] Create your library and update examples
- [ ] Update README
- [ ] Setup GitHub pages to deploy docs
  - [ ] Go to [repo settings](https://github.com/mayank1513/r18gs/settings/pages) -> pages (On left panel); Select deploy from a branch; Then Select `main` and `/docs`
- [ ] Push your changes/Create PR and see your library being automatically tested and published
- [ ] Optionally deploy your example(s) to Vercel.
- [ ] You are most welcome to star this template, contribute, and/or sponsor the `terbo-repo-template` project or my other open-source work

## What's inside?

### Utilities

This Turborepo template includes pre-configured tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- Plop based code generator for scaffolding new components
- Automatically rebrand this template to match your repo name

### Apps and Packages

This Turborepo includes the following packages/examples/lib:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `fork-me`: a React component library shared by both `Next.js` and `Vite` examples
- `eslint-config-custom`: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd r18gs
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd r18gs
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

### 🤩 Don't forger to start [this repo](https://github.com/mayank1513/r18gs)!

Want hands-on course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/2ef1a24385037998386148afe5a98ded6006f410.svg "Repobeats analytics image")

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
