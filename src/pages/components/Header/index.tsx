import React, { useState } from "react";
import {
	FaFacebook,
	FaTwitter,
	FaLinkedin,
	FaEnvelopeOpen,
	FaPhone,
	FaAddressBook,
	FaBell,
	FaHome,
	FaProjectDiagram,
	FaTools,
	FaUser,
	FaPhoneSquare,
	FaGithub,
	FaYoutube,
	FaBars,
	FaTimesCircle,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "@/pages/context/GlobalContext";
import styles from "./header.module.css";

const Header = () => {
	const { openImageModal } = useGlobalContext();
	const [hideNav, setHideNav] = useState<boolean>(true);

	if (typeof window !== "undefined") {
	}

	const openModal = (data: { src: string; alt: string }) => {
		openImageModal(data);
	};

	return (
		<header className={styles.header}>
			<div className={styles.topNav}>
				<div className={styles.contacts}>
					<div className={styles.contact}>
						<FaEnvelopeOpen /> <span> mpotulom28@gmail.com</span>
					</div>
					<div className={styles.contact}>
						<FaPhone /> <span> +123456789</span>
					</div>
					<div className={styles.contact}>
						<FaPhoneSquare /> <span> +987654321</span>
					</div>
				</div>

				<div className={styles.socials}>
					<FaFacebook />
					<FaTwitter />
					<FaLinkedin />
					<FaGithub />
					<FaYoutube />
				</div>
			</div>

			<div className={styles.mainNav}>
				<button
					onBlur={() => setHideNav(true)}
					onFocus={() => setHideNav(!hideNav)}
					className={styles.toggleNav}>
					{hideNav ? <FaBars /> : <FaTimesCircle />}
				</button>
				<div className={styles.navItems + " " + (hideNav && styles.hide)}>
					<Link href="#home">
						<FaHome /> <span>Home</span>
					</Link>
					<Link href="#about">
						<FaUser /> <span>About Me</span>
					</Link>
					<Link href="#skills">
						<FaTools /> <span>Skills</span>
					</Link>
					<Link href="#projects">
						<FaProjectDiagram />
						<span> Projects</span>
					</Link>
					<Link href="#contacts">
						<FaAddressBook />
						<span>Contacts </span>
					</Link>
					<Link href="#updates">
						<FaBell />
						<span>Updates</span>
					</Link>
				</div>

				<div className={styles.navLogo}>
					<h3>Mr Mpotulo</h3>
					<Image
						src="/images/me.png"
						alt="Manelisi-Mpotulo-Logo"
						width={50}
						height={50}
						onClick={() =>
							openModal({
								src: "me.png",
								alt: "Manelisi Mpotulo",
							})
						}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
