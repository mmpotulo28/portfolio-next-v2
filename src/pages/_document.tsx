import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Manelisi Mpotulo | Personal Website",
	description: "Welcome to my Portfolio, Interactive and Responsive Full Stack Web Developer",
	authors: [{ name: "Manelisi Mpotulo" }],
	keywords: "Manelisi Mpotulo, portfolio, web developer, software engineer",
	robots: "index, follow",
};

export default function Document() {
	return (
		<Html lang="en">
			<meta
				name="google-site-verification"
				content="7j_MuCkA4qssfr-tjGTpq6LY5pLQQY4pDVtb3b6u4UI"
			/>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
