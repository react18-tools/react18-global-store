import { useRGS } from "../../src";

interface MyStore {
  count: number;
  name: string;
  user: {
    name: string;
    age: number;
  };
}

export const useStore = (...selectors: (keyof MyStore)[]) =>
  useRGS<MyStore>(
    "my-store-with-selectors",
    {
      count: 0,
      name: "John",
      user: {
        name: "John",
        age: 30,
      },
    },
    ...selectors,
  );
