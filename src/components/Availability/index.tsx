import { useEffect, useState } from "react";
import styles from "./Availability.module.css";
import { useBooking } from "@/context/BookingContext";

const getWeekDates = (startDate: Date) => {
	const weekDates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		weekDates.push(date.toISOString().split("T")[0]);
	}
	return weekDates;
};

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
	const [currentWeek, setCurrentWeek] = useState<number>(0);

	useEffect(() => {
		// Fetch bookings from an API or use mock data
		// Replace with actual API call or mock data
		const weekDates = getWeekDates(new Date());

		const mockBookings = [
			{ date: weekDates[0], time: "18:00" },
			{ date: weekDates[0], time: "18:15" },
			{ date: weekDates[1], time: "19:00" },
			{ date: weekDates[2], time: "20:00" },
			{ date: weekDates[2], time: "20:15" },
			{ date: weekDates[3], time: "18:30" },
			{ date: weekDates[3], time: "18:45" },
			{ date: weekDates[4], time: "19:30" },
			{ date: weekDates[4], time: "19:45" },
			{ date: weekDates[5], time: "20:30" },
			{ date: weekDates[5], time: "20:45" },
			{ date: weekDates[6], time: "21:00" },
			{ date: weekDates[6], time: "21:15" },
			{ date: weekDates[7], time: "21:30" },
			{ date: weekDates[7], time: "21:45" },
		];
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

	const handleNextWeek = () => {
		setCurrentWeek((prevWeek) => prevWeek + 1);
	};

	const handlePreviousWeek = () => {
		setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 0));
	};

	const startDate = new Date();
	startDate.setDate(startDate.getDate() + currentWeek * 7);
	const weekDates = getWeekDates(startDate);

	return (
		<div className={styles.availability}>
			<div className={styles.calendar}>
				{weekDates.map((date) => (
					<div key={date} className={styles.day}>
						<h3 className={selectedDate === date ? styles.selected : ""}>
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
			<div className={styles.pagination}>
				<button onClick={handlePreviousWeek} disabled={currentWeek === 0}>
					Previous Week
				</button>
				<button onClick={handleNextWeek} disabled={currentWeek >= 3}>
					Next Week
				</button>
			</div>
		</div>
	);
}
