import DocsArticlePage from "../../app/AgencySite/pages/DocsArticlePage";
import { WEBHOOKS_DOCS_MARKDOWN } from "../../lib/agent/markdownPages";
import { markdownAwareGetServerSideProps } from "../../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/docs/webhooks");

export default function SaaSCRMWebhooksDocsPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM webhooks – events, payloads, and signatures"
			description="Official SaaSCRM webhook documentation: lead, customer, order, payment, and invoice events plus HMAC verification."
			path="/docs/webhooks"
			keywords="SaaSCRM webhooks, SaaSCRM events, saascrm.site webhooks"
			markdown={WEBHOOKS_DOCS_MARKDOWN}
		/>
	);
}

SaaSCRMWebhooksDocsPage.disableLayout = true;
