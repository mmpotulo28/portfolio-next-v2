import React from "react";
import styles from "./footer.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalContext";

const Ticker = ({ messages }: { messages: string[] }) => {
	return (
		<div className={styles.ticker}>
			<div className={styles.tickerContainer}>
				{messages.map((message, index) => (
					<span key={index} className={styles.tickerItem}>
						{message}
					</span>
				))}
			</div>
		</div>
	);
};

const Footer = () => {
	const context = useGlobalContext();

	const messages = [
		"Exciting new project launched! Check out the details in the portfolio.",
		"Currently available for freelance work. Contact me for more information.",
		"New blog post: How to optimize your React applications for better performance.",
	];

	const toggleTheme = () => {
		if (context.theme == "dark") {
			context.setTheme("light");
		} else {
			context.setTheme("dark");
		}

		console.log(context.theme);
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<ul className={styles.footerItems}>
					<li>
						<button onClick={toggleTheme}>
							{context.theme == "dark" ? <FaMoon /> : <FaSun />}
						</button>
					</li>
					<li className="hideOnMobile">Manelisi Mpotulo</li>
					<li className="hideOnMobile">Cape Town | SA</li>
					<li>Copyright &copy; {new Date().getFullYear()}</li>
				</ul>
				<Ticker messages={messages} />
			</div>
		</footer>
	);
};

export default Footer;
