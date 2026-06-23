import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../utils/ThemeCustomizerContext";
import "tailwindcss/tailwind.css";
import "../globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<ThemeCustomizerProvider>
				<LayoutWrapper>
					<Component {...pageProps} />
					<Analytics />
				</LayoutWrapper>
			</ThemeCustomizerProvider>
		</ThemeProvider>
	);
}

export default MyApp;
