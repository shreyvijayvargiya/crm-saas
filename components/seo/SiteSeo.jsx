import React from "react";
import Head from "next/head";

const SITE_URL = "https://componentry.site";

export const SOCIAL_IMAGES = [
	{
		path: "/screenshots-marketing-page/saas-crm-dashboard.png",
		alt: "Componentry UI motion preview",
	},
];

export default function SiteSeo({
	title,
	description,
	path = "/",
	keywords,
	images = SOCIAL_IMAGES,
	type = "website",
	jsonLd,
	noIndex = false,
}) {
	const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
	const primaryImage = `${SITE_URL}${images[0].path}`;
	const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			{keywords ? <meta name="keywords" content={keywords} /> : null}
			<meta
				name="robots"
				content={
					noIndex
						? "noindex, follow"
						: "index, follow, max-image-preview:large"
				}
			/>
			<link rel="canonical" href={canonical} />

			<meta property="og:type" content={type} />
			<meta property="og:site_name" content="Componentry" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
			{images.map((image) => (
				<React.Fragment key={image.path}>
					<meta property="og:image" content={`${SITE_URL}${image.path}`} />
					<meta
						property="og:image:secure_url"
						content={`${SITE_URL}${image.path}`}
					/>
					<meta property="og:image:alt" content={image.alt} />
				</React.Fragment>
			))}

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={primaryImage} />
			<meta name="twitter:image:alt" content={images[0].alt} />

			{schemas.map((schema, i) => (
				<script
					// eslint-disable-next-line react/no-danger
					key={`ld-${i}`}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			))}
		</Head>
	);
}
