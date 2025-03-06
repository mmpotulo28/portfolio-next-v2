import { useState, useEffect, useCallback } from "react";
import styles from "./BookingForm.module.css";
import { useBooking } from "@/context/BookingContext";
import { timesOfDay, mockBookings } from "../Availability";

const services = [
	{ id: 1, name: "General Consultation", rate: "R30/hr" },
	{ id: 2, name: "Java Tutoring", rate: "R250/hr" },
	{ id: 8, name: "JavaScript Tutoring", rate: "R250/hr" },
	{ id: 3, name: "IT Consultations", rate: "R60/hr" },
	{ id: 4, name: "Software Installation", rate: "R50/hr" },
	{ id: 5, name: "Device Troubleshooting", rate: "R70/hr" },
	{ id: 6, name: "Network Setup", rate: "R80/hr" },
	{ id: 7, name: "Other", rate: "N/A" },
];

const BookingForm = () => {
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

	const isTimeBooked = useCallback(
		(time: string) => {
			const dateBookings = bookings.filter((booking) => booking.date === selectedDate);
			return dateBookings.some((booking) => booking.time === time);
		},
		[bookings, selectedDate],
	);

	const isTimeRangeBooked = useCallback(
		(start: string, end: string) => {
			const startIndex = timesOfDay.indexOf(start);
			const endIndex = timesOfDay.indexOf(end);

			// split the	array of timesOfDay into a subarray from startIndex to endIndex
			const timeRange = timesOfDay.slice(startIndex, endIndex + 1);
			return timeRange.some((time) => isTimeBooked(time));
		},
		[isTimeBooked],
	);

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

	useEffect(() => {
		if (startTime && endTime) {
			const startIndex = timesOfDay.indexOf(startTime);
			const endIndex = timesOfDay.indexOf(endTime);
			for (let i = startIndex; i <= endIndex; i++) {
				if (isTimeBooked(timesOfDay[i])) {
					if (i === startIndex) {
						setStartTime("");
					} else {
						setEndTime("");
					}
					break;
				}
			}
		}
	}, [startTime, endTime, isTimeBooked, setStartTime, setEndTime]);

	useEffect(() => {
		if (startTime && endTime) {
			if (isTimeRangeBooked(startTime, endTime)) {
				alert(
					"The selected time range overlaps with an existing booking. Please choose a different time range.",
				);
				setStartTime("");
				setEndTime("");
			}
		}
	}, [startTime, endTime, isTimeBooked, setStartTime, setEndTime, isTimeRangeBooked]);

	const isTimeInRange = (time: string) => {
		if (!startTime || !endTime) return false;
		const startIndex = timesOfDay.indexOf(startTime);
		const endIndex = timesOfDay.indexOf(endTime);
		const timeIndex = timesOfDay.indexOf(time);
		return timeIndex >= startIndex && timeIndex <= endIndex;
	};

	function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setSelectedService(e.target.value);
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	}

	function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSelectedDate(e.target.value);
	}

	function handleStartTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setStartTime(e.target.value);
	}

	function handleEndTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setEndTime(e.target.value);
	}

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isTimeRangeBooked(startTime, endTime)) {
			alert(
				"The selected time range overlaps with an existing booking. Please choose a different time range.",
			);
			return;
		}
		// Handle form submission
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
									<option key={`Service-${service.id}`} value={service.name}>
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
								disabled={!selectedDate}
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
								disabled={!startTime}
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
};

export default BookingForm;
