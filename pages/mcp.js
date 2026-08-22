import DocsArticlePage from "../app/AgencySite/pages/DocsArticlePage";
import { MCP_DOCS_MARKDOWN } from "../lib/agent/markdownPages";
import { markdownAwareGetServerSideProps } from "../lib/agent/negotiate";

export const getServerSideProps = markdownAwareGetServerSideProps("/mcp");

export default function SaaSCRMMCPPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM MCP server – Model Context Protocol for the CRM copilot"
			description="Official SaaSCRM MCP documentation: how in-app AI tools map to a Model Context Protocol server for coding agents."
			path="/mcp"
			keywords="SaaSCRM MCP, SaaSCRM Model Context Protocol, saascrm.site MCP server"
			markdown={MCP_DOCS_MARKDOWN}
		/>
	);
}

SaaSCRMMCPPage.disableLayout = true;
