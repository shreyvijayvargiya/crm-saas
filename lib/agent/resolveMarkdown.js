const { getMarkdownForPath, MARKDOWN_PAGES, AGENTS_MARKDOWN } = require("./markdownPages");
const { LLMS_TXT, buildLlmsFull } = require("./llmsTxt");
const { OPENAPI_YAML, OPENAPI_JSON } = require("./openapi");
const { MARKDOWN_CONTENT_TYPE } = require("./accept");
const { normalizeAgentPath } = require("./site");
const { buildBlogRss, getBlogMarkdownBySlug, buildBlogIndexMarkdown } = require("./blogFeed");

const LLMS_FULL_TXT = buildLlmsFull(MARKDOWN_PAGES);

const SPECIAL = {
	"/llms.txt": { body: LLMS_TXT, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/llms-full.txt": { body: LLMS_FULL_TXT, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/.well-known/llms.txt": { body: LLMS_TXT, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/agents.md": { body: AGENTS_MARKDOWN, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/openapi.yaml": { body: OPENAPI_YAML, contentType: "application/yaml; charset=utf-8", status: 200 },
	"/openapi.yml": { body: OPENAPI_YAML, contentType: "application/yaml; charset=utf-8", status: 200 },
	"/openapi.json": { body: OPENAPI_JSON, contentType: "application/json; charset=utf-8", status: 200 },
	"/rss.xml": { body: buildBlogRss(), contentType: "application/rss+xml; charset=utf-8", status: 200 },
};

function resolveAgentDocument(pathname) {
	const raw = String(pathname || "/").split("?")[0].split("#")[0] || "/";
	if (SPECIAL[raw]) {
		return { ...SPECIAL[raw], path: raw };
	}
	const path = normalizeAgentPath(raw);
	if (SPECIAL[path]) {
		return { ...SPECIAL[path], path };
	}
	if (path === "/blog") {
		return {
			status: 200,
			body: buildBlogIndexMarkdown(),
			contentType: MARKDOWN_CONTENT_TYPE,
			path,
		};
	}
	const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
	if (blogMatch) {
		const markdown = getBlogMarkdownBySlug(blogMatch[1]);
		if (markdown) {
			return {
				status: 200,
				body: markdown,
				contentType: MARKDOWN_CONTENT_TYPE,
				path,
			};
		}
	}
	const found = getMarkdownForPath(path);
	return {
		status: found.status,
		body: found.body,
		contentType: MARKDOWN_CONTENT_TYPE,
		path: found.path,
	};
}

module.exports = { resolveAgentDocument };
