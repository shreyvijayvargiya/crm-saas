const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { LLMS_TXT } = require("./llmsTxt");

function parseLlmsTxt(text) {
	const lines = String(text).replace(/^\uFEFF/, "").split(/\r?\n/);
	assert.match(lines[0], /^# .+/);
	const h2s = lines.filter((line) => line.startsWith("## "));
	const links = [...text.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)(?::\s*(.*))?$/gm)];
	return { title: lines[0].slice(2).trim(), h2s, links };
}

test("llms.txt follows llmstxt.org v2 section order", () => {
	const parsed = parseLlmsTxt(LLMS_TXT);
	assert.equal(parsed.title, "SaaSCRM");
	assert.match(LLMS_TXT, /^# SaaSCRM\n\n>/);
	assert.ok(parsed.h2s.length >= 2);
	assert.ok(
		parsed.links.length >= 8,
		`expected file-list links, got ${parsed.links.length}`
	);
	parsed.links.forEach(([, , url]) => {
		assert.match(url, /^https:\/\//);
	});
	assert.match(LLMS_TXT, /SaaSCRM API docs/);
	assert.match(LLMS_TXT, /openapi\.yaml/);
	assert.match(LLMS_TXT, /SaaSCRM auth docs/);
	assert.match(LLMS_TXT, /SaaSCRM webhooks/);
	assert.match(LLMS_TXT, /SaaSCRM MCP/);
	assert.match(LLMS_TXT, /SaaSCRM agent instructions/);
	assert.match(LLMS_TXT, /openapi\.json/);
	assert.match(LLMS_TXT, /saascrm\.md/);
	assert.match(LLMS_TXT, /agency-crm/);
	assert.match(LLMS_TXT, /rss\.xml/);
});

test("public/llms.txt matches the generated spec file", () => {
	const onDisk = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
	assert.equal(onDisk.trim(), LLMS_TXT.trim());
});
