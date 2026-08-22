const test = require("node:test");
const assert = require("node:assert/strict");
const { preferredType, wantsMarkdown, isExplicitlyUnacceptable, VARY_ACCEPT } = require("./accept");

test("prefers text/markdown when it is the only type", () => {
	assert.equal(preferredType("text/markdown"), "text/markdown");
	assert.equal(wantsMarkdown("text/markdown"), true);
});

test("prefers text/markdown when it appears before text/html", () => {
	assert.equal(preferredType("text/markdown, text/html;q=0.8"), "text/markdown");
});

test("prefers text/html for typical browser Accept headers", () => {
	assert.equal(
		preferredType("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
		"text/html"
	);
	assert.equal(wantsMarkdown("text/html,application/xhtml+xml"), false);
});

test("does not treat text/html as markdown via substring matching", () => {
	assert.equal(preferredType("text/html"), "text/html");
});

test("honors q=0 rejection of html in favor of markdown", () => {
	assert.equal(preferredType("text/html;q=0, text/markdown"), "text/markdown");
});

test("returns null when every produced type is rejected", () => {
	assert.equal(preferredType("text/html;q=0, text/markdown;q=0"), null);
	assert.equal(isExplicitlyUnacceptable("application/pdf"), true);
});

test("defaults to html when Accept is missing", () => {
	assert.equal(preferredType(undefined), "text/html");
	assert.equal(preferredType(""), "text/html");
});

test("Vary token list includes Accept", () => {
	assert.match(VARY_ACCEPT, /Accept/);
	assert.match(VARY_ACCEPT, /Accept-Encoding/);
});
