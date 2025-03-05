import { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextProps {
	selectedDate: string;
	setSelectedDate: (date: string) => void;
	startTime: string;
	setStartTime: (time: string) => void;
	endTime: string;
	setEndTime: (time: string) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");

	return (
		<BookingContext.Provider
			value={{ selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime }}>
			{children}
		</BookingContext.Provider>
	);
};

export const useBooking = () => {
	const context = useContext(BookingContext);
	if (!context) {
		throw new Error("useBooking must be used within a BookingProvider");
	}
	return context;
};
