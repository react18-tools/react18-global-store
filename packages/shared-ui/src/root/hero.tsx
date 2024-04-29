import styles from "../root-layout.module.css";
import { Logo } from "../common/logo";
import Counter from "./counter";
import Display from "./display";
import PersistantCounter from "./persistant-counter";

export function Hero() {
	return (
		<div className={styles.center}>
			<div>
				<h1>
					Share global client state with <Logo />
				</h1>
				<p>
					Unleash the power of React Server Components! No wrapper required.
					<br /> Supports tree shakable libraries.
				</p>
				<br />
				<br />
				<br />
				<p>Sharing state between client components without any wrapper or provider.</p>
				<div className={styles.center}>
					<Counter />
					<Display />
				</div>
				<div className={styles.center}>
					<Counter />
					<Display />
				</div>
				<p>Persistant counter - Also synced with multiple tabs</p>
				<div className={styles.center}>
					<PersistantCounter />
				</div>
			</div>
		</div>
	);
}
