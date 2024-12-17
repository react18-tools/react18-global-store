"use client";

import { BasicExample } from "./basic-example";
import styles from "./demo.module.scss";
import basicExampleCode from "./basic-example/basic-example.tsx?raw";
import counterCode from "./basic-example/counter.tsx?raw";
import { CodeDisplay } from "./code-display";

const code = [
  { filename: "basic-example.tsx", code: basicExampleCode },
  { filename: "counter.tsx", code: counterCode },
];

/** React live demo */
export function Demo() {
  return (
    <>
      <div className={styles.demo}>
        <h2 className={styles.preview}>A tiny yet powerful store for modern react libraries.</h2>
        <img src="https://img.shields.io/bundlephobia/minzip/r18gs" alt="NPM Bundle Size" />
      </div>
      <div className={styles.demo}>
        <BasicExample />
        <CodeDisplay code={code} />
      </div>
    </>
  );
}
