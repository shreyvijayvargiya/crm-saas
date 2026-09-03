import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { LLMS_TXT, buildLlmsFull } = require("../lib/agent/llmsTxt.js");
const { OPENAPI_YAML, OPENAPI_JSON } = require("../lib/agent/openapi.js");
const { MARKDOWN_PAGES, AGENTS_MARKDOWN } = require("../lib/agent/markdownPages.js");
const { markdownAlternatePath } = require("../lib/agent/site.js");
const {
	buildBlogRss,
	buildBlogIndexMarkdown,
	listBlogPosts,
	getBlogMarkdownBySlug,
} = require("../lib/agent/blogFeed.js");

const root = process.cwd();
const publicDir = path.join(root, "public");

function write(rel, contents) {
	const dest = path.join(publicDir, rel);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	const body = contents.endsWith("\n") ? contents : `${contents}\n`;
	fs.writeFileSync(dest, body, "utf8");
}

const written = new Set();

function writeTracked(rel, contents) {
	write(rel, contents);
	written.add(rel);
}

writeTracked("llms.txt", LLMS_TXT);
writeTracked("llms-full.txt", buildLlmsFull(MARKDOWN_PAGES));
writeTracked(".well-known/llms.txt", LLMS_TXT);
writeTracked("openapi.yaml", OPENAPI_YAML);
writeTracked("openapi.json", OPENAPI_JSON);
writeTracked("agents.md", AGENTS_MARKDOWN);
writeTracked("rss.xml", buildBlogRss());
writeTracked("blog.md", buildBlogIndexMarkdown());
for (const post of listBlogPosts()) {
	const markdown = getBlogMarkdownBySlug(post.slug);
	if (markdown) writeTracked(`blog/${post.slug}.md`, markdown);
}
writeTracked(
	".well-known/security.txt",
	`Contact: mailto:shreyvijayvargiya26@gmail.com
Expires: 2027-08-22T00:00:00.000Z
Preferred-Languages: en
Canonical: https://saascrm.site/.well-known/security.txt
Policy: https://saascrm.site/docs
`
);
writeTracked(
	"ai.txt",
	`# SaaSCRM

llms.txt: https://saascrm.site/llms.txt
docs: https://saascrm.site/docs
openapi: https://saascrm.site/openapi.yaml
`
);

for (const pagePath of Object.keys(MARKDOWN_PAGES)) {
	if (pagePath === "/index") continue;
	const alt = markdownAlternatePath(pagePath);
	const rel = alt.replace(/^\//, "");
	if (written.has(rel)) continue;
	writeTracked(rel, MARKDOWN_PAGES[pagePath]);
}

console.log(`Wrote ${written.size} agent files to public/`);
