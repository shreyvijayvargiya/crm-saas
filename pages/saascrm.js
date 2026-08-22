import DocsArticlePage from "../app/AgencySite/pages/DocsArticlePage";
import { BRAND_MARKDOWN } from "../lib/agent/markdownPages";

export default function SaaSCRMBrandPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM – official Next.js AI CRM template at saascrm.site"
			description="SaaSCRM is the official product name for the Next.js AI CRM, admin dashboard, and CMS template at saascrm.site. Developer docs, OpenAPI, demo, and contact."
			path="/saascrm"
			keywords="SaaSCRM, SaaS CRM, saascrm.site, SaaSCRM template, Next.js CRM"
			markdown={BRAND_MARKDOWN}
		/>
	);
}

SaaSCRMBrandPage.disableLayout = true;
