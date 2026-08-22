const { SITE_URL, BRAND_NAME, BRAND_TAGLINE, CONTACT } = require("./site");

const BRAND_JSON_LD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: BRAND_NAME,
			legalName: "SaaSCRM",
			alternateName: ["SaaS CRM", "SaaSCRM Template", "SaaS CRM Template", "saascrm.site"],
			url: SITE_URL,
			email: CONTACT.email,
			description: BRAND_TAGLINE,
			sameAs: [
				CONTACT.x,
				CONTACT.linkedin,
				"https://github.com/shreyvijayvargiya/crm-saas",
				"https://buildsaas.dev",
				"https://www.producthunt.com/products/crm-for-businesses",
				"https://findly.tools/saascrm",
				"https://startupbase.io/products/saascrm",
			].filter(Boolean),
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/saascrm-logo.png`,
			},
			brand: { "@type": "Brand", name: BRAND_NAME },
			founder: {
				"@type": "Person",
				name: "Shrey Vijayvargiya",
				url: CONTACT.linkedin,
				email: CONTACT.email,
			},
			parentOrganization: {
				"@type": "Organization",
				name: "Buildsaas.dev",
				url: "https://buildsaas.dev",
			},
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			name: BRAND_NAME,
			alternateName: ["SaaS CRM", "saascrm.site"],
			url: SITE_URL,
			description: BRAND_TAGLINE,
			publisher: { "@id": `${SITE_URL}/#organization` },
			inLanguage: "en-US",
			potentialAction: {
				"@type": "SearchAction",
				target: `${SITE_URL}/sitemap?q={search_term_string}`,
				"query-input": "required name=search_term_string",
			},
		},
		{
			"@type": "SoftwareApplication",
			"@id": `${SITE_URL}/#software`,
			name: BRAND_NAME,
			applicationCategory: "BusinessApplication",
			operatingSystem: "Web",
			url: SITE_URL,
			description: BRAND_TAGLINE,
			offers: {
				"@type": "Offer",
				price: "49",
				priceCurrency: "USD",
				url: `${SITE_URL}/pricing`,
			},
			author: { "@id": `${SITE_URL}/#organization` },
		},
	],
};

module.exports = { BRAND_JSON_LD };
