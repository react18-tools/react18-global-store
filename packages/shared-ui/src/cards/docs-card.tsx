import styles from "./cards.module.css";

export function DocsCard() {
	return (
		<a
			className={styles.card}
			href="https://mayank1513.github.io/r18gs/"
			rel="noopener noreferrer"
			target="_blank">
			<h2>
				Docs <span>-&gt;</span>
			</h2>
			<p>Explore the official docs.</p>
		</a>
	);
}
