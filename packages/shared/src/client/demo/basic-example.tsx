import { CounterController, CounterDisplay } from "./counter";
import styles from "./demo.module.scss";

export function BasicExample() {
  return (
    <div className={styles.preview}>
      <h2>
        Basic Example: <small>Synced counters</small>
      </h2>
      <p>All components below share the same state without any wrapper.</p>
      <div className={styles.flex}>
        <div className={styles.center}>
          <h2>Counter Controller 1</h2>
          <CounterController />
        </div>
        <div className={styles.center}>
          <h2>Counter Display 1</h2>
          <CounterDisplay />
        </div>
      </div>
      <br />
      <div className={styles.flex}>
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
