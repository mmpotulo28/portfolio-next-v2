import UnderDev from "@/components/UnderDev";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<UnderDev />
				<Link href="/bookings">
					<span>Book a Service</span>
				</Link>
			</main>
		</div>
	);
}
