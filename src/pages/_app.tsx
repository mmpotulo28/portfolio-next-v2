import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { GlobalProvider } from "./context/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GlobalProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalProvider>
	);
}
