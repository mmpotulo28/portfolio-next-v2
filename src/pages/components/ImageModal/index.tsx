import React from "react";
import Image from "next/image";
import useGlobalContext from "../../context/GlobalContext";
import styles from "./page.module.css";
import { FaRegTimesCircle } from "react-icons/fa";

const ImageModal: React.FC = () => {
	const { isImgModalOpen, imgModalData, closeImageModal } = useGlobalContext();

	if (!isImgModalOpen) {
		return <></>;
	}

	return (
		<div className={styles.imageModal}>
			<button onClick={closeImageModal} className={styles.closeButton}>
				<FaRegTimesCircle />
			</button>
			<Image
				src={`/images/${imgModalData.src || "me.png"}`}
				alt="image"
				width={500}
				height={500}
			/>
			<h1>{imgModalData.alt}</h1>
		</div>
	);
};

export default ImageModal;
