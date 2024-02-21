"use client";

import useRGS from "r18gs";

export default function Display() {
	const [count] = useRGS<number>("count");
	return (
		<div>
			<h2>Client component 2</h2>
			<b>{count}</b>
		</div>
	);
}
