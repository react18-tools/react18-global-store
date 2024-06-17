import { describe, test } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { create } from "../../src/with-plugins";
import { PersistOptions, persist } from "../../src/plugins";
import { ChangeEvent, useCallback } from "react";

const TESTID_INPUT = "in1";
const TESTID_DISPLAY = "d1";

const persistOptions: PersistOptions[] = [
	{},
	{ storage: "local" },
	{ storage: "session" },
	{ storage: "cookie" },
	{ sync: false },
];

describe("React18GlobalStore", () => {
	persistOptions.forEach((options, i) => {
		const COUNTER_RGS_KEY = `count-${i}`;
		const useMyRGS = create(COUNTER_RGS_KEY, 0, [persist(options)]);

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

		test(`check state update to multiple components: ${JSON.stringify(options)}`, async ({
			expect,
		}) => {
			render(<Component1 />);
			render(<Component2 />);
			/** Await and allow for the state to update from localStorate */
			await new Promise(resolve => setTimeout(resolve, 100));
			await act(() => fireEvent.input(screen.getByTestId(TESTID_INPUT), { target: { value: 5 } }));
			expect(screen.getByTestId(TESTID_DISPLAY).textContent).toBe("5");
			expect(
				JSON.parse(
					((options.storage ?? "local") === "local" ? localStorage : sessionStorage).getItem(
						COUNTER_RGS_KEY,
					) ?? "{}",
				).val,
			).toBe(5);
		});

		if (options.sync ?? true) {
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
		}
	});
});
