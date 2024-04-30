import { describe, test } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { create } from "../src/with-plugins";
import { persist } from "../src/plugins/persist";
import { ChangeEvent, useCallback } from "react";

const COUNTER_RGS_KEY = "count";
const TESTID_INPUT = "in1";
const TESTID_DISPLAY = "d1";

const useMyRGS = create(COUNTER_RGS_KEY, 0, [persist({ storage: "cookie" })]);

function Component1() {
	const [count, setCount] = useMyRGS();
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
	const [count] = useMyRGS();
	return <h1 data-testid={TESTID_DISPLAY}>{count}</h1>;
}

describe("React18GlobalStore", () => {
	test("check state update to multiple components", async ({ expect }) => {
		render(<Component1 />);
		render(<Component2 />);
		/** Await and allow for the state to update from localStorate */
		await new Promise(resolve => setTimeout(resolve, 100));
		await act(() => fireEvent.input(screen.getByTestId(TESTID_INPUT), { target: { value: 5 } }));
		expect(screen.getByTestId(TESTID_DISPLAY).textContent).toBe("5");
		expect(JSON.parse(sessionStorage.getItem(COUNTER_RGS_KEY) ?? "{}").val).toBe(5);
	});

	test("storage event", async ({ expect }) => {
		render(<Component1 />);
		render(<Component2 />);
		/** Await and allow for the state to update from localStorate */
		await new Promise(resolve => setTimeout(resolve, 100));
		await act(() =>
			window.dispatchEvent(
				new StorageEvent("storage", {
					key: COUNTER_RGS_KEY,
					newValue: JSON.stringify({ val: 15 }),
				}),
			),
		);
		expect(screen.getByTestId(TESTID_DISPLAY).textContent).toBe("15");
	});
});
