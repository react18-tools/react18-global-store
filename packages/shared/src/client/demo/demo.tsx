"use client";

import { CounterController, CounterDisplay } from "./counter";
import styles from "./demo.module.scss";
import { Editor } from "react-live";

const code = `import { useRGS } from "r18gs";

const MY_KEY = "counter";

export const CounterController = () => {
  const [counter, setCounter] = useRGS(MY_KEY, 0);
  return (
    <input
      type="number"
      value={counter}
      onChange={e =>
        setCounter(Number(e.target.value))
      }
    />
  );
};

export const CounterDisplay = () => {
  const [counter] = useRGS(MY_KEY, 0);
  return <div>{counter}</div>;
};`;

/** React live demo */
export function Demo() {
  return (
    <div className={styles.demo}>
      <Editor className={styles.code} code={code} language="tsx" />
      <div className={styles.preview}>
        <p>All components below share the same state without any wrapper.</p>
        <p>
          <img src="https://img.shields.io/bundlephobia/minzip/r18gs" alt="NPM Bundle Size" />
        </p>
        <div className={styles.center}>
          <h2>Counter Controller 1</h2>
          <CounterController />
        </div>
        <div className={styles.center}>
          <h2>Counter Display 1</h2>
          <CounterDisplay />
        </div>
        <br />
        <div className={styles.center}>
          <h2>Counter Controller 2</h2>
          <CounterController />
        </div>
        <div className={styles.center}>
          <h2>Counter Display 2</h2>
          <CounterDisplay />
        </div>
      </div>
    </div>
  );
}
