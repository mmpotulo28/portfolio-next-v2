import { useState, useEffect } from "react";
import styles from "./BookingForm.module.css";
import { useBooking } from "@/context/BookingContext";

const services = [
	{ id: 1, name: "Service 1", rate: "$50" },
	{ id: 2, name: "Service 2", rate: "$75" },
	{ id: 3, name: "Service 3", rate: "$100" },
];

const timesOfDay = [
	"18:00",
	"18:15",
	"18:30",
	"18:45",
	"19:00",
	"19:15",
	"19:30",
	"19:45",
	"20:00",
	"20:15",
	"20:30",
	"20:45",
	"21:00",
	"21:15",
	"21:30",
	"21:45",
];

const mockBookings = [
	{ date: "2023-10-01", time: "18:00" },
	{ date: "2023-10-01", time: "18:15" },
	{ date: "2023-10-02", time: "19:00" },
	{ date: "2023-10-03", time: "20:00" },
	{ date: "2023-10-03", time: "20:15" },
	{ date: "2023-10-04", time: "18:30" },
	{ date: "2023-10-04", time: "18:45" },
	{ date: "2023-10-05", time: "19:30" },
	{ date: "2023-10-05", time: "19:45" },
	{ date: "2023-10-06", time: "20:30" },
	{ date: "2023-10-06", time: "20:45" },
	{ date: "2023-10-07", time: "21:00" },
	{ date: "2023-10-07", time: "21:15" },
	{ date: "2023-10-08", time: "21:30" },
	{ date: "2023-10-08", time: "21:45" },
];

export default function BookingForm() {
	const { selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime } =
		useBooking();
	const [selectedService, setSelectedService] = useState("");
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [endTimeOptions, setEndTimeOptions] = useState<string[]>(timesOfDay);
	const [bookings, setBookings] = useState<{ date: string; time: string }[]>([]);

	useEffect(() => {
		// Fetch bookings from an API or use mock data
		setBookings(mockBookings);
	}, []);

	useEffect(() => {
		if (startTime) {
			const startIndex = timesOfDay.indexOf(startTime);
			const maxEndIndex = Math.min(startIndex + 8, timesOfDay.length);
			setEndTimeOptions(timesOfDay.slice(startIndex + 1, maxEndIndex + 1));
		} else {
			setEndTimeOptions(timesOfDay);
		}
	}, [startTime]);

	const isTimeInRange = (time: string) => {
		if (!startTime || !endTime) return false;
		const startIndex = timesOfDay.indexOf(startTime);
		const endIndex = timesOfDay.indexOf(endTime);
		const timeIndex = timesOfDay.indexOf(time);
		return timeIndex >= startIndex && timeIndex <= endIndex;
	};

	const isTimeBooked = (time: string) => {
		return bookings.some((booking) => booking.date === selectedDate && booking.time === time);
	};

	const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedService(e.target.value);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedDate(e.target.value);
	};

	const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStartTime(e.target.value);
	};

	const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEndTime(e.target.value);
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission
		console.log("Service:", selectedService);
		console.log("User Info:", userInfo);
		console.log("Date:", selectedDate);
		console.log("Start Time:", startTime);
		console.log("End Time:", endTime);
		setSubmitted(true);
	};

	return (
		<div className={styles.page}>
			<h1>Book a Service</h1>
			<div className={styles.container}>
				{submitted ? (
					<div className={styles.confirmation}>
						<h2>Thank you for your booking!</h2>
						<p>We will contact you soon.</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className={styles.form}>
						<label>
							Select a service:
							<select value={selectedService} onChange={handleServiceChange}>
								<option value="">Select...</option>
								{services.map((service) => (
									<option key={service.id} value={service.name}>
										{service.name} - {service.rate}
									</option>
								))}
							</select>
						</label>
						<label>
							Name:
							<input
								type="text"
								name="name"
								value={userInfo.name}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Email:
							<input
								type="email"
								name="email"
								value={userInfo.email}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Phone:
							<input
								type="tel"
								name="phone"
								value={userInfo.phone}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Date:
							<input
								type="date"
								name="date"
								value={selectedDate}
								onChange={handleDateChange}
								required
							/>
						</label>
						<label>
							Start Time:
							<select
								name="startTime"
								value={startTime}
								onChange={handleStartTimeChange}
								required>
								<option value="">Select...</option>
								{timesOfDay
									.filter((time) => !isTimeBooked(time))
									.map((time) => (
										<option key={time} value={time}>
											{time}
										</option>
									))}
							</select>
						</label>
						<label>
							End Time:
							<select
								name="endTime"
								value={endTime}
								onChange={handleEndTimeChange}
								required>
								<option value="">Select...</option>
								{endTimeOptions
									.filter((time) => !isTimeBooked(time))
									.map((time) => (
										<option
											key={time}
											value={time}
											className={isTimeInRange(time) ? styles.highlight : ""}>
											{time}
										</option>
									))}
							</select>
						</label>
						<button type="submit">Submit</button>
					</form>
				)}
			</div>
		</div>
	);
}
