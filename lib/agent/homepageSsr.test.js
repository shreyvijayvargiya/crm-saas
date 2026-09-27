const test = require("node:test");
const assert = require("node:assert/strict");
const { wantsMarkdown, isExplicitlyUnacceptable, VARY_ACCEPT } = require("./accept");
const { getMarkdownForPath } = require("./markdownPages");
const { HOME_NOSCRIPT_HTML, extractTextContent } = require("./markdownPages");

test("homepage SSR negotiation chooses markdown and keeps Vary", () => {
	assert.equal(wantsMarkdown("text/markdown"), true);
	assert.equal(isExplicitlyUnacceptable("text/markdown"), false);
	assert.match(VARY_ACCEPT, /Accept/);
	const doc = getMarkdownForPath("/");
	assert.equal(doc.status, 200);
	assert.match(doc.body, /^# SaaSCRM/);
	assert.ok(doc.body.length >= 500);
});

test("homepage HTML fallback still has crawler text", () => {
	assert.match(HOME_NOSCRIPT_HTML, /<h1[\s>]/i);
	assert.match(HOME_NOSCRIPT_HTML, /SaaSCRM/);
	assert.ok(extractTextContent(HOME_NOSCRIPT_HTML).length >= 500);
});

test("homepage React source keeps a visible H1 for SSR crawlers", () => {
	const fs = require("node:fs");
	const path = require("node:path");
	const homePath = path.join(process.cwd(), "app/AgencySite/pages/HomePage.jsx");
	const heroPath = path.join(process.cwd(), "app/AgencySite/components/HeroCrmIntro.jsx");
	const homeSource = fs.readFileSync(homePath, "utf8");
	const heroSource = fs.readFileSync(heroPath, "utf8");
	assert.match(heroSource, /<h1[\s>]/);
	assert.doesNotMatch(homeSource, /<h1[\s>]/);
});
