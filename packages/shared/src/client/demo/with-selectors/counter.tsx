import { useRef } from "react";
import { useStore } from "./store";

export function Counter() {
  const [{ count }, setState] = useStore("count");
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div>
      <h1>Counter With Selectors</h1>
      <h2>Rerender is triggered by RGS only when count changes.</h2>
      <p>Count: {count}</p>
      <button onClick={() => setState(state => ({ ...state, count: count + 1 }))}>Increment</button>
      <button onClick={() => setState(state => ({ ...state, count: count - 1 }))}>Decrement</button>
      <p>Render Count: {renderCount.current}</p>
    </div>
  );
}
