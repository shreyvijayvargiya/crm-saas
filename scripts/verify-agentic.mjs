#!/usr/bin/env node
/**
 * Verify public agent-facing endpoints. Usage:
 *   BASE_URL=http://localhost:3002 node scripts/verify-agentic.mjs
 */

const BASE = (process.env.BASE_URL || "http://localhost:3002").replace(/\/$/, "");

async function fetchText(path, headers = {}) {
	const res = await fetch(`${BASE}${path}`, { headers, redirect: "manual" });
	const text = await res.text();
	return { res, text };
}

function header(res, name) {
	return res.headers.get(name) || "";
}

function fail(message) {
	console.error(`FAIL  ${message}`);
	process.exitCode = 1;
}

function pass(message) {
	console.log(`ok    ${message}`);
}

async function main() {
	const home = await fetchText("/");
	if (home.res.status !== 200) fail(`GET / status ${home.res.status}`);
	else pass("GET / → 200");
	if (!/<h1[\s>]/i.test(home.text)) fail("GET / missing <h1>");
	else pass("GET / includes <h1>");
	const homeText = home.text
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	if (homeText.length < 500) fail(`GET / text length ${homeText.length}`);
	else pass(`GET / text length ${homeText.length}`);
	if (!/SaaSCRM/.test(home.text)) fail("GET / missing SaaSCRM");
	else pass("GET / mentions SaaSCRM");

	const missing = await fetchText("/some-path-that-does-not-exist");
	if (missing.res.status !== 404) fail(`missing path status ${missing.res.status}`);
	else pass("nonexistent path → 404");
	if (!/llms\.txt/.test(missing.text) || !/sitemap/.test(missing.text)) {
		fail("404 body missing recovery links");
	} else pass("404 body has sitemap + llms.txt");

	const md = await fetchText("/", { Accept: "text/markdown" });
	const mdType = header(md.res, "content-type");
	const vary = header(md.res, "vary");
	if (md.res.status !== 200) fail(`Accept markdown / status ${md.res.status}`);
	else pass("Accept: text/markdown / → 200");
	if (!/text\/markdown/i.test(mdType)) fail(`markdown Content-Type ${mdType}`);
	else pass(`Content-Type ${mdType}`);
	if (!/accept/i.test(vary)) fail(`Vary missing Accept (${vary || "none"})`);
	else pass(`Vary: ${vary}`);
	if (!md.text.startsWith("# SaaSCRM")) fail("markdown body missing H1");
	else pass("markdown body starts with # SaaSCRM");

	const llms = await fetchText("/llms.txt");
	if (llms.res.status !== 200) fail(`/llms.txt status ${llms.res.status}`);
	else pass("/llms.txt → 200");
	if (!llms.text.startsWith("# SaaSCRM")) fail("llms.txt missing H1");
	else pass("llms.txt starts with # SaaSCRM");

	const spec = await fetchText("/openapi.yaml");
	if (spec.res.status !== 200) fail(`/openapi.yaml status ${spec.res.status}`);
	else pass("/openapi.yaml → 200");
	if (!spec.text.startsWith("openapi: 3.")) fail("openapi.yaml not OpenAPI 3");
	else pass("openapi.yaml is OpenAPI 3");

	const docs = await fetchText("/docs");
	if (docs.res.status !== 200) fail(`/docs status ${docs.res.status}`);
	else pass("/docs → 200");
	if (!/SaaSCRM developer resources/i.test(docs.text)) fail("/docs missing product heading");
	else pass("/docs includes SaaSCRM developer resources");

	const apiMd = await fetchText("/docs/api.md");
	if (apiMd.res.status !== 200) fail(`/docs/api.md status ${apiMd.res.status}`);
	else pass("/docs/api.md → 200");

	if (process.exitCode) {
		console.error(`\nAgentic verification failed against ${BASE}`);
		process.exit(1);
	}
	console.log(`\nAgentic verification passed against ${BASE}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
