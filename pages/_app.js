import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../utils/ThemeCustomizerContext";
import { CrmDataProvider } from "../utils/CrmDataContext";
import { CrmVerticalProvider } from "../utils/CrmVerticalContext";
import { AIChatProvider } from "../utils/AIChatContext";
import "tailwindcss/tailwind.css";
import "../globals.css";

function MyApp({ Component, pageProps }) {
	const skipLayout = Component.disableLayout === true;

	return (
		<ThemeProvider>
			<ThemeCustomizerProvider>
				<CrmDataProvider>
				<CrmVerticalProvider>
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
				</CrmVerticalProvider>
				</CrmDataProvider>
			</ThemeCustomizerProvider>
		</ThemeProvider>
	);
}

export default MyApp;
