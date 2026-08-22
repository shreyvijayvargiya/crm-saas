const { getMarkdownForPath } = require("./markdownPages");
const { LLMS_FULL_TXT, LLMS_TXT } = require("./llmsTxt");
const { OPENAPI_YAML } = require("./openapi");
const { MARKDOWN_CONTENT_TYPE } = require("./accept");
const { normalizeAgentPath } = require("./site");

const SPECIAL = {
	"/llms.txt": { body: LLMS_TXT, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/llms-full.txt": { body: LLMS_FULL_TXT, contentType: MARKDOWN_CONTENT_TYPE, status: 200 },
	"/openapi.yaml": { body: OPENAPI_YAML, contentType: "application/yaml; charset=utf-8", status: 200 },
	"/openapi.yml": { body: OPENAPI_YAML, contentType: "application/yaml; charset=utf-8", status: 200 },
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
	const found = getMarkdownForPath(path);
	return {
		status: found.status,
		body: found.body,
		contentType: MARKDOWN_CONTENT_TYPE,
		path: found.path,
	};
}

module.exports = { resolveAgentDocument };
