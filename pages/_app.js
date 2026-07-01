import React from "react";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../modules/Layout";
import { ThemeProvider } from "../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../utils/ThemeCustomizerContext";
import { AuthProvider, ProRouteGuard } from "../utils/AuthProvider";
import "tailwindcss/tailwind.css";
import "../globals.css";

function MyApp({ Component, pageProps }) {
	const skipLayout = Component.disableLayout === true;

	return (
		<ThemeProvider>
			<ThemeCustomizerProvider>
				<AuthProvider>
					{skipLayout ? (
						<>
							<Component {...pageProps} />
							<Analytics />
						</>
					) : (
						<LayoutWrapper>
							<ProRouteGuard>
								<Component {...pageProps} />
							</ProRouteGuard>
							<Analytics />
						</LayoutWrapper>
					)}
				</AuthProvider>
			</ThemeCustomizerProvider>
		</ThemeProvider>
	);
}

export default MyApp;
