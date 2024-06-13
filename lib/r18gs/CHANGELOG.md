# r18gs

## 1.1.0

### Minor Changes

- Support initializer function. Now you can initialize the RGStore by supplying a function in place of constant.

## 1.0.2

### Patch Changes

- Refactor to reduce minzip size

## 1.0.1

### Patch Changes

- Fix SSR build

## 1.0.0

### Major Changes

- Removed `serverValue` field as it should always be same as `value`. For more details please check out documentation of useSyncExternalStore hook provided by react.

### Minor Changes

- Added persist plugin to create state that is persisted and synced between browser contexts.
- Added `useRGSWithPlugins` hook to support extending the store functionality with plugins.

### Patch Changes

- Refactored to reduce bundle size and improve stability and reduce likelyhood of bugs.

## 0.2.0

### Minor Changes

- 81b9d3f: Make the library extensible with plugins

### Patch Changes

- Add Persist and Sync plugin

## 0.1.4

### Patch Changes

- Fix ESM builds

## 0.1.3

### Patch Changes

- Quick Fix the build setup and fix library issues.

## 0.1.2

### Patch Changes

- Improve minification

## 0.1.1

### Patch Changes

- Refactor without changing the exposed APIs. Some libraries using internal APIs may face temporary issues.

## 0.1.0

### Minor Changes

- Remove client side hooks. Now this store works well with server components as well. Though, server side use is tricky and not recommended yet.

## 0.0.5

### Patch Changes

- Fix Typescript error

## 0.0.4

### Patch Changes

- Fix getServerSnapshot errors on some projects.

## 0.0.3

### Patch Changes

- Fix exports; improve examples; Update README

## 0.0.2

### Patch Changes

- Export SetStateAction and SetterArgTypes for better documentation and ease of use for other TS projects.

## 0.0.1

### Patch Changes

- Fix publish setup
