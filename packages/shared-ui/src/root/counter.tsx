"use client";

import useRGS from "r18gs";
import { COUNTER } from "../constants/global-states";
import { ChangeEvent, useCallback } from "react";

export default function Counter() {
	const [count, setCount] = useRGS(COUNTER, 0);
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCount(parseInt(e.target.value));
		},
		[setCount],
	);
	return (
		<div>
			<h2>Clinet component 1</h2>
			<input onChange={handleChange} type="number" value={count} />
		</div>
	);
}
