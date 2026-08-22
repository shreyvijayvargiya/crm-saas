import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { LLMS_TXT, buildLlmsFull } = require("../lib/agent/llmsTxt.js");
const { OPENAPI_YAML, OPENAPI_JSON } = require("../lib/agent/openapi.js");
const { MARKDOWN_PAGES, AGENTS_MARKDOWN } = require("../lib/agent/markdownPages.js");
const { markdownAlternatePath } = require("../lib/agent/site.js");

const root = process.cwd();
const publicDir = path.join(root, "public");

function write(rel, contents) {
	const dest = path.join(publicDir, rel);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	const body = contents.endsWith("\n") ? contents : `${contents}\n`;
	fs.writeFileSync(dest, body, "utf8");
}

write("llms.txt", LLMS_TXT);
write("llms-full.txt", buildLlmsFull(MARKDOWN_PAGES));
write(".well-known/llms.txt", LLMS_TXT);
write("openapi.yaml", OPENAPI_YAML);
write("openapi.json", OPENAPI_JSON);
write("agents.md", AGENTS_MARKDOWN);
write(
	".well-known/security.txt",
	`Contact: mailto:shreyvijayvargiya26@gmail.com
Expires: 2027-08-22T00:00:00.000Z
Preferred-Languages: en
Canonical: https://saascrm.site/.well-known/security.txt
Policy: https://saascrm.site/docs
`
);
write(
	"ai.txt",
	`# SaaSCRM

llms.txt: https://saascrm.site/llms.txt
docs: https://saascrm.site/docs
openapi: https://saascrm.site/openapi.yaml
`
);

const written = new Set([
	"llms.txt",
	"llms-full.txt",
	".well-known/llms.txt",
	"openapi.yaml",
	"openapi.json",
	"agents.md",
	".well-known/security.txt",
	"ai.txt",
]);
for (const pagePath of Object.keys(MARKDOWN_PAGES)) {
	if (pagePath === "/index") continue;
	const alt = markdownAlternatePath(pagePath);
	const rel = alt.replace(/^\//, "");
	if (written.has(rel)) continue;
	write(rel, MARKDOWN_PAGES[pagePath]);
	written.add(rel);
}

console.log(`Wrote ${written.size} agent files to public/`);
