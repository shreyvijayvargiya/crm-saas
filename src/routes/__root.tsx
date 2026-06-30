import React from "react";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import LayoutWrapper from "../../modules/Layout";
import { ThemeProvider } from "../../utils/ThemeContext";
import { ThemeCustomizerProvider } from "../../utils/ThemeCustomizerContext";
import { NotFoundPage } from "../components/NotFoundPage";
import "../../globals.css";

function RootDocument({ children }) {
	return (
		<html lang="en">
			<head>
				{import.meta.env.DEV ? (
					<>
						<link rel="preload" href="/app.css" as="style" />
						<link rel="stylesheet" href="/app.css" />
					</>
				) : null}
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootComponent() {
	const matches = useMatches();
	const skipLayout = matches.some(
		(match) => match.staticData?.skipLayout === true
	);

	return (
		<RootDocument>
			<ThemeProvider>
				<ThemeCustomizerProvider>
					{skipLayout ? (
						<Outlet />
					) : (
						<LayoutWrapper>
							<Outlet />
						</LayoutWrapper>
					)}
				</ThemeCustomizerProvider>
			</ThemeProvider>
		</RootDocument>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "CRM SaaS" },
		],
		links: [
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});
