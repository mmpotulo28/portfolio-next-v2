import UnderDev from "./components/UnderDev";
import styles from "@/styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<UnderDev />
			</main>
		</div>
	);
}
