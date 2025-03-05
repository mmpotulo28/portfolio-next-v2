import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Availability.module.css";
import { useBooking } from "@/context/BookingContext";

const getWeekDates = () => {
	const today = new Date();
	const weekDates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		weekDates.push(date.toISOString().split("T")[0]);
	}
	return weekDates;
};

const weekDates = getWeekDates();

const mockBookings = [
	{ date: weekDates[0], time: "18:00" },
	{ date: weekDates[0], time: "18:15" },
	{ date: weekDates[1], time: "19:00" },
	{ date: weekDates[2], time: "20:00" },
	{ date: weekDates[2], time: "20:15" },
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

export default function Availability() {
	const { selectedDate, startTime, endTime } = useBooking();
	const [bookings, setBookings] = useState<{ date: string; time: string }[]>([]);

	useEffect(() => {
		// Fetch bookings from an API or use mock data
		setBookings(mockBookings);
	}, []);

	const getBookingsForDay = (date: string) => {
		return bookings.filter((booking) => booking.date === date);
	};

	const isTimeBooked = (date: string, time: string) => {
		return getBookingsForDay(date).some((booking) => booking.time === time);
	};

	const isTimeInRange = (date: string, time: string) => {
		if (selectedDate !== date || !startTime || !endTime) return false;
		const startIndex = timesOfDay.indexOf(startTime);
		const endIndex = timesOfDay.indexOf(endTime);
		const timeIndex = timesOfDay.indexOf(time);
		return timeIndex >= startIndex && timeIndex <= endIndex;
	};

	return (
		<div className={styles.availability}>
			<div className={styles.calendar}>
				{weekDates.map((date) => (
					<div key={date} className={styles.day}>
						<h3>
							{new Date(date).toLocaleDateString("en-US", {
								weekday: "short",
								month: "short",
								day: "numeric",
							})}
						</h3>
						<ul>
							{timesOfDay.map((time) => (
								<li
									key={time}
									className={
										isTimeBooked(date, time)
											? styles.booked
											: isTimeInRange(date, time)
											? styles.selected
											: styles.free
									}>
									{time}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
