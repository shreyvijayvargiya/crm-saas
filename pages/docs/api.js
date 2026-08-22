import DocsArticlePage from "../../app/AgencySite/pages/DocsArticlePage";
import { API_DOCS_MARKDOWN } from "../../lib/agent/markdownPages";

export default function SaaSCRMApiDocsPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM API docs – REST resources for the CRM template"
			description="Official SaaSCRM API documentation: leads, contacts, deals, invoices, tasks, and webhook subscriptions for the Next.js CRM template."
			path="/docs/api"
			keywords="SaaSCRM API, SaaSCRM REST, saascrm.site API docs, CRM API template"
			markdown={API_DOCS_MARKDOWN}
		/>
	);
}

SaaSCRMApiDocsPage.disableLayout = true;
