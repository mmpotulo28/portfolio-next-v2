import Head from "next/head";
import styles from "./bookings.module.css";
import Availability from "@/components/Availability";
import BookingForm from "@/components/BookingForm";
import { BookingProvider } from "@/context/BookingContext";

export default function Booking() {
	return (
		<BookingProvider>
			<Head>
				<title>Booking - Manelisi Mpotulo</title>
				<meta
					name="description"
					content="Book a session with Manelisi Mpotulo. Check availability and fill out the booking form to schedule your appointment. Services include Web Development, Java and JavaScript tutoring, and IT support services."
				/>
				<meta
					name="keywords"
					content="booking, appointment, availability, Web Development, Java, JavaScript tutoring, IT support, Manelisi Mpotulo"
				/>
				<meta name="author" content="Manelisi Mpotulo" />
				<meta name="robots" content="index, follow" />
				<meta property="og:title" content="Booking - Manelisi Mpotulo" />
				<meta
					property="og:description"
					content="Book a session with Manelisi Mpotulo. Check availability and fill out the booking form to schedule your appointment. Services include Web Development, Java and JavaScript tutoring, and IT support services."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://manelisi.mpotulo.com/bookings" />
				<meta
					property="og:image"
					content="https://manelisi.mpotulo.com/images/booking-thumbnail.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Booking - Manelisi Mpotulo" />
				<meta
					name="twitter:description"
					content="Book a session with Manelisi Mpotulo. Check availability and fill out the booking form to schedule your appointment. Services include Web Development, Java and JavaScript tutoring, and IT support services."
				/>
				<meta
					name="twitter:image"
					content="https://manelisi.mpotulo.com/images/booking-thumbnail.jpg"
				/>
			</Head>
			<div className={styles.page}>
				<div className={styles.container}>
					<BookingForm />
					<Availability />
				</div>
			</div>
		</BookingProvider>
	);
}
