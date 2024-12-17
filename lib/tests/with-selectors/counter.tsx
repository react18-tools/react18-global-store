import { useRef } from "react";
import { useStore } from "./store";

export function Counter() {
  const [{ count }, setState] = useStore("count");
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div>
      <h2>Counter With Selectors</h2>
      <p>Rerender is triggered by RGS only when count changes.</p>
      <p>Count: {count}</p>
      <button
        data-testid="increment-btn"
        onClick={() => setState(state => ({ ...state, count: count + 1 }))}>
        Increment
      </button>
      <button onClick={() => setState(state => ({ ...state, count: count - 1 }))}>Decrement</button>
      <p data-testid="counter1-display">Render Count: {renderCount.current}</p>
    </div>
  );
}
