import styles from "./bookings.module.css";
import Availability from "@/components/Availability";
import BookingForm from "@/components/BookingForm";
import { BookingProvider } from "@/context/BookingContext";

export default function Booking() {
	return (
		<BookingProvider>
			<div className={styles.page}>
				<div className={styles.container}>
					<BookingForm />
					<Availability />
				</div>
			</div>
		</BookingProvider>
	);
}
