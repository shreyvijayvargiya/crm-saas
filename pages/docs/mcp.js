import DocsArticlePage from "../../app/AgencySite/pages/DocsArticlePage";
import { MCP_DOCS_MARKDOWN } from "../../lib/agent/markdownPages";

export default function SaaSCRMMCPDocsPage() {
	return (
		<DocsArticlePage
			title="SaaSCRM MCP server – Model Context Protocol for the CRM copilot"
			description="Official SaaSCRM MCP documentation: how in-app AI tools map to a Model Context Protocol server for coding agents."
			path="/docs/mcp"
			keywords="SaaSCRM MCP, SaaSCRM Model Context Protocol, saascrm.site MCP server"
			markdown={MCP_DOCS_MARKDOWN}
		/>
	);
}

SaaSCRMMCPDocsPage.disableLayout = true;
