"use client";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}></h1>
      <p>Main page</p>
      <div className={styles.cards}></div>
    </main>
  );
}
