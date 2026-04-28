import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import "tailwindcss/tailwind.css";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	const page = (
		<>
			<Component {...pageProps} />
			<Analytics />
		</>
	);
	return (
		<ThemeProvider>
			{Component.disableLayout ? page : <LayoutWrapper>{page}</LayoutWrapper>}
		</ThemeProvider>
	);
}

export default MyApp;
