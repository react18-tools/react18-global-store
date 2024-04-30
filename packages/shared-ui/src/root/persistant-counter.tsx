"use client";

import { ChangeEvent, useCallback } from "react";
import { useMyPersistentCounterStore } from "../../hooks/use-persistant-counter";

/**
 * Persistant Counter
 *
 * @returns {JSX.Element}
 */
export default function PersistantCounter() {
	const [count, setCount] = useMyPersistentCounterStore();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCount(parseInt(e.target.value));
		},
		[setCount],
	);
	return (
		<div>
			<h2>Persistant Counter</h2>
			<p>Duplicate this tab to see state sharing between tabs in action</p>
			<input onChange={handleChange} type="number" value={count} />
		</div>
	);
}
