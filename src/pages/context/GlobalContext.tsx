import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import ImageModal from "../components/ImageModal";

interface GlobalContextProps {
	isImgModalOpen: boolean;
	imgModalData: { src: string; alt: string };
	theme: string;
	setTheme: (theme: string) => void;
	closeImageModal: () => void;
	openImageModal: (data: { src: string; alt: string }) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isImgModalOpen, setIsImgModalOpen] = useState(false);
	const [imgModalData, setImgModalData] = useState({ src: "", alt: "" });
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "dark";
			setTheme(preferredTheme);
		}
	}, []);

	const closeImageModal = () => {
		setIsImgModalOpen(false);
		setImgModalData({ src: "", alt: "" });
	};

	const openImageModal = (data: { src: string; alt: string }) => {
		setIsImgModalOpen(true);
		setImgModalData(data);
	};

	return (
		<GlobalContext.Provider
			value={{
				isImgModalOpen,
				imgModalData,
				theme,
				setTheme,
				closeImageModal,
				openImageModal,
			}}>
			{isImgModalOpen && <ImageModal />}
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

export { GlobalContext, GlobalProvider };
export default useGlobalContext;
