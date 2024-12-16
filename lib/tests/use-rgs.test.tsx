import { describe, test } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRGS } from "../src";
import { ChangeEvent, useCallback } from "react";
import { beforeEach } from "node:test";

const COUNT_RGS_KEY = "count";
const TESTID_INPUT = "in1";
const TESTID_DISPLAY = "d1";

function Component1() {
  const [count, setCount] = useRGS<number>(COUNT_RGS_KEY, 0);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCount(parseInt(e.target.value));
    },
    [setCount],
  );
  return (
    <div>
      <input data-testid={TESTID_INPUT} onChange={handleChange} type="number" value={count} />
    </div>
  );
}

function Component2() {
  const [count] = useRGS<number>(COUNT_RGS_KEY);
  return <h1 data-testid={TESTID_DISPLAY}>{count}</h1>;
}

function Component3() {
  const [count] = useRGS<number>(COUNT_RGS_KEY + 1, () => 5);
  return <div data-testid="t3">{count}</div>;
}

describe("React18GlobalStore", () => {
  beforeEach(() => {
    cleanup();
    // reset RGS store
    globalThis.rgs = {};
  });
  test("check state update to multiple components", async ({ expect }) => {
    render(<Component1 />);
    render(<Component2 />);
    render(<Component3 />);
    await act(() => fireEvent.input(screen.getByTestId(TESTID_INPUT), { target: { value: 5 } }));
    expect(screen.getByTestId(TESTID_DISPLAY).textContent).toBe("5");
    // test function initialization
    expect(screen.getByTestId("t3").textContent).toBe("5");
  });
});
