import React from "react";
import Head from "next/head";
import { NOT_FOUND_MARKDOWN } from "../lib/agent/notFound";
import { SITE_URL } from "../lib/agent/site";

export default function NotFoundPage() {
	return (
		<>
			<Head>
				<title>Page not found – SaaSCRM</title>
				<meta name="robots" content="noindex, follow" />
				<meta
					name="description"
					content="This SaaSCRM path does not exist. Use the sitemap, llms.txt, or developer docs to recover."
				/>
			</Head>
			<main
				style={{
					minHeight: "100vh",
					margin: 0,
					padding: "2.5rem 1.25rem 4rem",
					background: "#09090b",
					color: "#fafafa",
					fontFamily:
						'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				}}
			>
				<article style={{ maxWidth: "40rem", margin: "0 auto" }}>
					<p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", color: "#a1a1aa" }}>
						SaaSCRM
					</p>
					<h1 style={{ fontSize: "2rem", margin: "0.75rem 0 1rem" }}>
						SaaSCRM page not found
					</h1>
					<p style={{ lineHeight: 1.7, color: "#d4d4d8" }}>
						This path does not exist on SaaSCRM. Agents and humans should recover from
						the links below instead of treating this URL as a real product page.
					</p>
					<ul style={{ lineHeight: 1.8, paddingLeft: "1.2rem" }}>
						<li>
							<a href="/sitemap" style={{ color: "#c4b5fd" }}>
								SaaSCRM sitemap
							</a>
						</li>
						<li>
							<a href="/llms.txt" style={{ color: "#c4b5fd" }}>
								llms.txt
							</a>
						</li>
						<li>
							<a href="/docs" style={{ color: "#c4b5fd" }}>
								SaaSCRM developer docs
							</a>
						</li>
						<li>
							<a href="/" style={{ color: "#c4b5fd" }}>
								SaaSCRM home
							</a>
						</li>
						<li>
							<a href="/sitemap.xml" style={{ color: "#c4b5fd" }}>
								XML sitemap
							</a>
						</li>
					</ul>
					<pre
						style={{
							marginTop: "2rem",
							padding: "1rem 1.1rem",
							overflow: "auto",
							borderRadius: "0.75rem",
							background: "#18181b",
							color: "#e4e4e7",
							fontSize: "0.8125rem",
							lineHeight: 1.6,
							whiteSpace: "pre-wrap",
						}}
					>
						{NOT_FOUND_MARKDOWN}
					</pre>
					<p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#71717a" }}>
						{SITE_URL}
					</p>
				</article>
			</main>
		</>
	);
}

NotFoundPage.disableLayout = true;
