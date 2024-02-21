import styles from "../root-layout.module.css";
import { Logo } from "../common/logo";
import Counter from "./counter";
import Display from "./display";

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
			</div>
		</div>
	);
}
