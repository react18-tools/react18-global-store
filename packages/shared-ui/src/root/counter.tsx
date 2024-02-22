"use client";

import useRGS from "r18gs";
import { COUNTER } from "../constants/global-states";

export default function Counter() {
	const [count, setCount] = useRGS(COUNTER, 0);
	return (
		<div>
			<h2>Clinet component 1</h2>
			<input
				onChange={e => {
					setCount(parseInt(e.target.value.trim()));
				}}
				type="number"
				value={count}
			/>
		</div>
	);
}
