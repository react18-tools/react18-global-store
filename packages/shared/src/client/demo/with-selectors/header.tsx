import { useRef } from "react";
import { useStore } from "./store";

export function Header() {
  const [{ name }] = useStore("name");
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <header>
      <h1>My name is {name}</h1>
      <small>
        <i>
          Updates only when <code>name</code> changes.{" "}
          <code>renderCount = {renderCount.current}</code>
        </i>
      </small>
    </header>
  );
}
