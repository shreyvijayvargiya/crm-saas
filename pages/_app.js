import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../utils/ThemeCustomizerContext";
import { AuthProvider } from "../utils/AuthContext";
import { CrmDataProvider } from "../utils/CrmDataContext";
import { CrmVerticalProvider } from "../utils/CrmVerticalContext";
import { ProjectProvider } from "../utils/ProjectContext";
import { AIChatProvider } from "../utils/AIChatContext";
import "tailwindcss/tailwind.css";
import "../globals.css";

function MyApp({ Component, pageProps }) {
	const skipLayout = Component.disableLayout === true;

	return (
		<ThemeProvider>
			<ThemeCustomizerProvider>
				<AuthProvider>
				<CrmDataProvider>
				<CrmVerticalProvider>
				<ProjectProvider>
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
				</ProjectProvider>
				</CrmVerticalProvider>
				</CrmDataProvider>
				</AuthProvider>
			</ThemeCustomizerProvider>
		</ThemeProvider>
	);
}

export default MyApp;
