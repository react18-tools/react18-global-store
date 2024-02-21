import styles from "./cards.module.css";
import { StarMeCard } from "./star-me-card";
import { Card } from "./card";

const cards = [
	{
		href: "https://react18-tools.github.io/r18gs/",
		title: "Docs",
		description: "Explore the official docs.",
	},
	{
		href: "https://github.com/react18-tools/r18gs",
		title: "More Examples",
		description: "Explore more examples on official GitHub Repo.",
	},
];

export function Cards() {
	return (
		<div className={styles.cards}>
			{cards.map(card => (
				<Card key={card.href} {...card} />
			))}
			<StarMeCard />
		</div>
	);
}
