import React from "react";
import Head from "next/head";

export const SITE_URL = "https://saascrm.site";

export function absoluteImageUrl(path) {
	if (!path) {
		return `${SITE_URL}/screenshots-marketing-page/saas-crm-dashboard.png`;
	}
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function imageMimeType(path) {
	if (/\.jpe?g(\?|$)/i.test(path)) return "image/jpeg";
	if (/\.webp(\?|$)/i.test(path)) return "image/webp";
	if (/\.gif(\?|$)/i.test(path)) return "image/gif";
	return "image/png";
}

/** OG / Twitter image for /templates (drop file in public/). */
export const TEMPLATES_PAGE_OG_IMAGE = {
	path: "/templates-page.png",
	alt: "SaaSCRM free CRM templates – Next.js dashboards for startups and freelancers",
};

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
	type = "website",
	jsonLd,
	noIndex = false,
	article,
}) {
	const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
	const primaryImage = absoluteImageUrl(images[0].path);
	const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
	const articleTags = Array.isArray(article?.tags) ? article.tags : [];

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
			<meta property="og:site_name" content="SaaSCRM" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
			{images.map((image) => {
				const src = absoluteImageUrl(image.path);
				return (
					<React.Fragment key={image.path}>
						<meta property="og:image" content={src} />
						<meta property="og:image:secure_url" content={src} />
						<meta property="og:image:alt" content={image.alt} />
						<meta property="og:image:width" content="1919" />
						<meta property="og:image:height" content="958" />
						<meta property="og:image:type" content={imageMimeType(image.path)} />
					</React.Fragment>
				);
			})}
			{type === "article" && article?.publishedTime ? (
				<meta property="article:published_time" content={article.publishedTime} />
			) : null}
			{type === "article" && article?.author ? (
				<meta property="article:author" content={article.author} />
			) : null}
			{articleTags.map((tag) => (
				<meta key={tag} property="article:tag" content={tag} />
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
