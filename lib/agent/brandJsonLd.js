const { SITE_URL, BRAND_NAME, BRAND_TAGLINE, CONTACT } = require("./site");

const BRAND_JSON_LD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: BRAND_NAME,
			alternateName: ["SaaS CRM", "SaaSCRM Template", "SaaS CRM Template"],
			url: SITE_URL,
			email: CONTACT.email,
			sameAs: [
				CONTACT.x,
				CONTACT.linkedin,
				"https://github.com/shreyvijayvargiya/crm-saas",
				"https://buildsaas.dev",
				"https://www.producthunt.com/products/crm-for-businesses",
			].filter(Boolean),
			logo: `${SITE_URL}/favicon.svg`,
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
