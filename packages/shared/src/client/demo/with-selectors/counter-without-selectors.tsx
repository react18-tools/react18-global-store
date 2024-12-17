import { useRef } from "react";
import { useStore } from "./store";

export function CounterWithoutSelectors() {
  const [{ count }, setState] = useStore();
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div>
      <h1>Counter Without Selectors</h1>
      <h2>Rerender is triggered every time the state changes.</h2>
      <p>Count: {count}</p>
      <button onClick={() => setState(state => ({ ...state, count: count + 1 }))}>Increment</button>
      <button onClick={() => setState(state => ({ ...state, count: count - 1 }))}>Decrement</button>
      <p>Render Count: {renderCount.current}</p>
    </div>
  );
}
