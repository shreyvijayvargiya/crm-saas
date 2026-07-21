import React from "react";
import Head from "next/head";

const SITE_URL = "https://saascrm.site";

export const CRM_SOCIAL_IMAGES = [
	{
		path: "/screenshots-marketing-page/saas-crm-dashboard.png",
		alt: "SaaSCRM dashboard with sales, revenue, conversion, and recent leads",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-analytics.png",
		alt: "SaaSCRM analytics dashboard",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-reports.png",
		alt: "SaaSCRM reports dashboard",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-leads.png",
		alt: "SaaSCRM lead management page",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-sales.png",
		alt: "SaaSCRM sales management page",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-activity.png",
		alt: "SaaSCRM activity timeline",
	},
	{
		path: "/screenshots-marketing-page/saas-crm-scheduler.png",
		alt: "SaaSCRM content scheduler",
	},
];

export default function SiteSeo({
	title,
	description,
	path = "/",
	keywords,
	images = CRM_SOCIAL_IMAGES,
}) {
	const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
	const primaryImage = `${SITE_URL}${images[0].path}`;

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="robots" content="index, follow, max-image-preview:large" />
			<link rel="canonical" href={canonical} />

			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="SaaSCRM" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
			{images.map((image) => (
				<React.Fragment key={image.path}>
					<meta
						key={`image-${image.path}`}
						property="og:image"
						content={`${SITE_URL}${image.path}`}
					/>
					<meta
						key={`secure-${image.path}`}
						property="og:image:secure_url"
						content={`${SITE_URL}${image.path}`}
					/>
					<meta
						key={`alt-${image.path}`}
						property="og:image:alt"
						content={image.alt}
					/>
					<meta
						key={`width-${image.path}`}
						property="og:image:width"
						content="1919"
					/>
					<meta
						key={`height-${image.path}`}
						property="og:image:height"
						content="958"
					/>
					<meta
						key={`type-${image.path}`}
						property="og:image:type"
						content="image/png"
					/>
				</React.Fragment>
			))}

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={primaryImage} />
			<meta name="twitter:image:alt" content={images[0].alt} />
		</Head>
	);
}
