"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./under-dev.module.css";

const UnderDev = () => {
	const estimatedDueDate = useMemo(() => {
		if (typeof window !== "undefined") return new Date("2025-02-28T00:00:00");
	}, []);

	function getTimeRemaining(endDate: Date | undefined) {
		// if no date
		if (!endDate) {
			return {
				total: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		}

		const total = endDate.getTime() - new Date().getTime();
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));
		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(estimatedDueDate));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(getTimeRemaining(estimatedDueDate));
		}, 1000);

		return () => clearInterval(interval);
	}, [estimatedDueDate]);

	return (
		<div className={styles.underDev}>
			<h1>Website in Developments</h1>
			<p>Please check back later for updates. Thank you for your patience.</p>

			<div className={styles.countdown}>
				<h2>Estimated Time Until Launch</h2>

				<div className={styles.clock}>
					<p>
						<span>{timeRemaining.days}</span> days
					</p>
					<p>
						<span>{timeRemaining.hours}</span> hours
					</p>
					<p>
						<span>{timeRemaining.minutes}</span> minutes
					</p>
					<p>
						<span>{timeRemaining.seconds}</span> seconds
					</p>
				</div>
			</div>
		</div>
	);
};

export default UnderDev;
