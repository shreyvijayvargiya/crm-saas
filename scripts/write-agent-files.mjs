import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { LLMS_TXT, LLMS_FULL_TXT } = require("../lib/agent/llmsTxt.js");
const { OPENAPI_YAML } = require("../lib/agent/openapi.js");
const { MARKDOWN_PAGES } = require("../lib/agent/markdownPages.js");
const { markdownAlternatePath } = require("../lib/agent/site.js");

const root = process.cwd();
const publicDir = path.join(root, "public");

function write(rel, contents) {
	const dest = path.join(publicDir, rel);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.writeFileSync(dest, contents.endsWith("\n") ? contents : `${contents}\n`, "utf8");
}

write("llms.txt", LLMS_TXT);
write("llms-full.txt", LLMS_FULL_TXT);
write("openapi.yaml", OPENAPI_YAML);

const written = new Set(["llms.txt", "llms-full.txt", "openapi.yaml"]);
for (const pagePath of Object.keys(MARKDOWN_PAGES)) {
	if (pagePath === "/index") continue;
	const alt = markdownAlternatePath(pagePath);
	const rel = alt.replace(/^\//, "");
	if (written.has(rel)) continue;
	write(rel, MARKDOWN_PAGES[pagePath]);
	written.add(rel);
}

console.log(`Wrote ${written.size} agent files to public/`);
