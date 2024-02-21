import styles from "./cards.module.css";

export function ExamplesCard() {
	return (
		<a
			className={styles.card}
			href="https://github.com/mayank1513/r18gs"
			rel="noopener noreferrer"
			target="_blank">
			<h2>
				More Examples <span>-&gt;</span>
			</h2>
			<p>Explore more examples on official GitHub Repo.</p>
		</a>
	);
}
