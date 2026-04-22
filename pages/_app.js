import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import "tailwindcss/tailwind.css";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<LayoutWrapper>
				<Component {...pageProps} />
				<Analytics />
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default MyApp;
