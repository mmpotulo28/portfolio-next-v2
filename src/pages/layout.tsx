import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGlobalContext } from "@/context/GlobalContext";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { theme } = useGlobalContext();

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} ${theme} full-height`}>
			<Header />
			{/* <Sitemap /> */}
			<main>{children}</main>
			<Footer />
		</div>
	);
}
