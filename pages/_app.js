import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../utils/ThemeCustomizerContext";
import { CrmDataProvider } from "../utils/CrmDataContext";
import { AIChatProvider } from "../utils/AIChatContext";
import "tailwindcss/tailwind.css";
import "../globals.css";

function MyApp({ Component, pageProps }) {
	const skipLayout = Component.disableLayout === true;

	return (
		<ThemeProvider>
			<ThemeCustomizerProvider>
				<CrmDataProvider>
				<AIChatProvider>
				{skipLayout ? (
					<>
						<Component {...pageProps} />
						<Analytics />
					</>
				) : (
					<LayoutWrapper>
						<Component {...pageProps} />
						<Analytics />
					</LayoutWrapper>
				)}
				</AIChatProvider>
				</CrmDataProvider>
			</ThemeCustomizerProvider>
		</ThemeProvider>
	);
}

export default MyApp;
