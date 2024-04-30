import { describe, test } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { create, withPlugins } from "../src/with-plugins";
import { persist } from "../src/plugins/persist";
import { ChangeEvent, useCallback } from "react";

const COUNTER_RGS_KEY = "counter";
const TESTID_INPUT = "in1";
const TESTID_DISPLAY = "d1";

const COUNTER2_RGS_KEY = "counter-2";
const TESTID_INPUT2 = "in2";
const TESTID_DISPLAY2 = "d2";

const useMyRGS = create(COUNTER_RGS_KEY, 0, [persist({ storage: "cookie" })]);

const useMyRGS2 = withPlugins<number>([persist()]);

function Component1() {
	const [count, setCount] = useMyRGS();
	const [count2, setCount2] = useMyRGS2(COUNTER2_RGS_KEY, 0);
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCount(parseInt(e.target.value));
		},
		[setCount],
	);
	const handleChange2 = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCount2(parseInt(e.target.value));
		},
		[setCount2],
	);
	return (
		<div>
			<input data-testid={TESTID_INPUT} onChange={handleChange} type="number" value={count} />
			<input data-testid={TESTID_INPUT2} onChange={handleChange2} type="number" value={count2} />
		</div>
	);
}

function Component2() {
	const [count] = useMyRGS();
	const [count2] = useMyRGS2(COUNTER2_RGS_KEY, 10, true);
	return (
		<>
			<h1 data-testid={TESTID_DISPLAY}>{count}</h1>
			<h1 data-testid={TESTID_DISPLAY2}>{count2}</h1>
		</>
	);
}

describe("React18GlobalStore", () => {
	test("check state update to multiple components", async ({ expect }) => {
		render(<Component2 />);
		render(<Component1 />);
		/** Await and allow for the state to update from localStorate */
		await new Promise(resolve => setTimeout(resolve, 100));
		await act(() => fireEvent.input(screen.getByTestId(TESTID_INPUT), { target: { value: 5 } }));
		expect(screen.getByTestId(TESTID_DISPLAY).textContent).toBe("5");
		expect(JSON.parse(sessionStorage.getItem(COUNTER_RGS_KEY) ?? "{}").val).toBe(5);
	});

	test("check state update to multiple components for withPlugins", async ({ expect }) => {
		render(<Component2 />);
		render(<Component1 />);
		/** Await and allow for the state to update from localStorate */
		await new Promise(resolve => setTimeout(resolve, 100));
		await act(() => fireEvent.input(screen.getByTestId(TESTID_INPUT2), { target: { value: 5 } }));
		expect(screen.getByTestId(TESTID_DISPLAY2).textContent).toBe("5");
		expect(JSON.parse(localStorage.getItem(COUNTER2_RGS_KEY) ?? "{}").val).toBe(5);
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
