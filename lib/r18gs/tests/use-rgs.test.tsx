import { describe, test } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import useRGS from "../src";
import { ChangeEvent, useCallback } from "react";

function Component1() {
	const [count, setCount] = useRGS<number>("count", 0);
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCount(parseInt(e.target.value));
		},
		[setCount],
	);
	return (
		<div>
			<input data-testid="input" onChange={handleChange} type="number" value={count} />
		</div>
	);
}

function Component2() {
	const [count] = useRGS<number>("count");
	return <h1 data-testid="display">{count}</h1>;
}

describe("React18GlobalStore", () => {
	test("check state update to multiple components", async ({ expect }) => {
		render(<Component1 />);
		render(<Component2 />);
		await act(() => fireEvent.input(screen.getByTestId("input"), { target: { value: 5 } }));
		expect(screen.getByTestId("display").textContent).toBe("5");
	});
});
