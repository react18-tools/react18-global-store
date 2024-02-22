"use client";

import useRGS from "r18gs";
import { COUNTER } from "../constants/global-states";

export default function Display() {
	const [count] = useRGS<number>(COUNTER);
	return (
		<div>
			<h2>Client component 2</h2>
			<b>{count}</b>
		</div>
	);
}
