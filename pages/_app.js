import React from "react";
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
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default MyApp;
