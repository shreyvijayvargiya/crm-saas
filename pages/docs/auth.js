import DocsArticlePage from "../../app/AgencySite/pages/DocsArticlePage";
import { AUTH_DOCS_MARKDOWN } from "../../lib/agent/markdownPages";
import { markdownAwareGetServerSideProps } from "../../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/docs/auth");

export default function SaaSCRMAuthDocsPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM auth docs – login, API keys, and identity providers"
			description="Official SaaSCRM authentication docs: demo login screens, API keys, and how to wire Clerk, Auth.js, Supabase, or Firebase."
			path="/docs/auth"
			keywords="SaaSCRM auth, SaaSCRM login, SaaSCRM API keys, saascrm.site authentication"
			markdown={AUTH_DOCS_MARKDOWN}
		/>
	);
}

SaaSCRMAuthDocsPage.disableLayout = true;
