const test = require("node:test");
const assert = require("node:assert/strict");
const {
	HOME_MARKDOWN,
	HOME_NOSCRIPT_HTML,
	MARKDOWN_PAGES,
	getMarkdownForPath,
	extractTextContent,
} = require("./markdownPages");
const { NOT_FOUND_MARKDOWN } = require("./notFound");
const { resolveAgentDocument } = require("./resolveMarkdown");
const { OPENAPI_YAML } = require("./openapi");
const { LLMS_TXT } = require("./llmsTxt");

test("homepage markdown has an H1 and 500+ characters", () => {
	assert.match(HOME_MARKDOWN, /^# SaaSCRM/m);
	assert.ok(HOME_MARKDOWN.length >= 500);
});

test("homepage noscript HTML has 500+ characters of text", () => {
	const text = extractTextContent(HOME_NOSCRIPT_HTML);
	assert.ok(text.length >= 500, `expected 500+ chars, got ${text.length}`);
	assert.match(HOME_NOSCRIPT_HTML, /<h1[\s>]/i);
	assert.match(text, /SaaSCRM/);
});

test("known developer paths resolve to 200 markdown", () => {
	["/", "/docs", "/docs/api", "/docs/auth", "/docs/webhooks", "/docs/mcp", "/developers", "/saascrm", "/agents"].forEach(
		(path) => {
			const found = getMarkdownForPath(path);
			assert.equal(found.status, 200, path);
			assert.match(found.body, /SaaSCRM/);
		}
	);
});

test("unknown paths return 404 markdown with recovery links", () => {
	const found = getMarkdownForPath("/some-path-that-does-not-exist");
	assert.equal(found.status, 404);
	assert.equal(found.body, NOT_FOUND_MARKDOWN);
	assert.match(NOT_FOUND_MARKDOWN, /llms\.txt/);
	assert.match(NOT_FOUND_MARKDOWN, /sitemap/);
	assert.match(NOT_FOUND_MARKDOWN, /\/docs/);
});

test("markdown alternate .md paths normalize to the same document", () => {
	assert.equal(getMarkdownForPath("/docs/api.md").body, MARKDOWN_PAGES["/docs/api"]);
	assert.equal(getMarkdownForPath("/index.md").body, MARKDOWN_PAGES["/"]);
});

test("special machine-readable files resolve", () => {
	assert.equal(resolveAgentDocument("/llms.txt").status, 200);
	assert.equal(resolveAgentDocument("/llms.txt").body, LLMS_TXT);
	assert.equal(resolveAgentDocument("/openapi.yaml").status, 200);
	assert.equal(resolveAgentDocument("/openapi.yaml").body, OPENAPI_YAML);
	assert.equal(resolveAgentDocument("/openapi.json").status, 200);
	assert.match(resolveAgentDocument("/openapi.json").body, /"openapi": "3\./);
	assert.equal(resolveAgentDocument("/.well-known/llms.txt").status, 200);
	assert.equal(resolveAgentDocument("/agents.md").status, 200);
});

test("OpenAPI spec is named SaaSCRM and is OpenAPI 3", () => {
	assert.match(OPENAPI_YAML, /^openapi: 3\./);
	assert.match(OPENAPI_YAML, /title: SaaSCRM API/);
	assert.match(OPENAPI_YAML, /\/webhooks/);
	assert.match(OPENAPI_YAML, /X-API-Key/);
});
