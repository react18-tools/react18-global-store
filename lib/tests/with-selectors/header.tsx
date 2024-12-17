import { useRef } from "react";
import { useStore } from "./store";
import styles from "../demo.module.scss";

export function Header() {
  const [{ name }] = useStore("name");
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <header className={styles.header}>
      <h1>My name is {name}</h1>
      <small>
        <i>
          Updates only when <code>name</code> changes.{" "}
          <code data-testid="header-render-count">renderCount = {renderCount.current}</code>
        </i>
      </small>
    </header>
  );
}
