import { useEffect, useMemo, useRef } from "react";
import styles from "./footer.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalContext";

const messages = [
	"Exciting new project launched! Check out the details in the portfolio.",
	"Currently available for freelance work. Contact me for more information.",
	"New blog post: How to optimize your React applications for better performance.",
];

const Ticker = ({ messages }: { messages: string[] }) => {
	const tickerRef = useRef<HTMLDivElement>(null);
	const scrollSpeed = useMemo(() => 1, []);
	const scrollRate = useMemo(() => 10, []);

	useEffect(() => {
		const ticker = tickerRef.current;
		if (ticker) {
			const handleScroll = () => {
				ticker.scrollLeft += scrollSpeed;
				if (ticker.scrollLeft >= ticker.scrollWidth - ticker.clientWidth) {
					ticker.scrollLeft = 0;
				}
			};
			const intervalId = setInterval(handleScroll, scrollRate);
			return () => clearInterval(intervalId);
		}
		return undefined;
	}, [scrollRate, scrollSpeed]);

	return (
		<div className={styles.ticker} ref={tickerRef}>
			<div className={styles.tickerContainer}>
				{messages.map((message) => (
					<span key={message} className={styles.tickerItem}>
						{message}
					</span>
				))}
			</div>
		</div>
	);
};

const Footer = () => {
	const { theme, setTheme } = useGlobalContext();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<ul className={styles.footerItems}>
					<li>
						<button onClick={toggleTheme} aria-label="Toggle theme">
							{theme === "dark" ? <FaMoon /> : <FaSun />}
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
