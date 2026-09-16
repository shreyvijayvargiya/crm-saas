import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link
						rel="alternate"
						type="application/rss+xml"
						title="SaaSCRM Blog RSS"
						href="https://saascrm.site/rss.xml"
					/>
					<meta name="theme-color" content="#F4F4F0" />
					<meta name="directree-verify" content="directree-verify=bf0649aa800a168e93778c4fec37610f" />
					<meta name="msapplication-TileColor" content="#F4F4F0" />
					<meta name="application-name" content="SaaSCRM" />
					<meta name="apple-mobile-web-app-title" content="SaaSCRM" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
