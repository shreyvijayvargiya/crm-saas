import { isExplicitlyUnacceptable, VARY_ACCEPT } from "../../../lib/agent/accept";
import { resolveAgentDocument } from "../../../lib/agent/resolveMarkdown";

function requestPath(req) {
	const slug = req.query.slug;
	if (!slug || (Array.isArray(slug) && slug.length === 0)) return "/";
	const parts = Array.isArray(slug) ? slug : [slug];
	return `/${parts.join("/")}`;
}

export default function handler(req, res) {
	if (req.method !== "GET" && req.method !== "HEAD") {
		res.setHeader("Allow", "GET, HEAD");
		res.status(405).end("Method Not Allowed");
		return;
	}

	res.setHeader("Vary", VARY_ACCEPT);

	if (isExplicitlyUnacceptable(req.headers.accept)) {
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.status(406).end("Not Acceptable\n\nAvailable: text/html, text/markdown\n");
		return;
	}

	const doc = resolveAgentDocument(requestPath(req));
	res.setHeader("Content-Type", doc.contentType);
	res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=86400");
	res.setHeader(
		"Link",
		`</llms.txt>; rel="describedby", <${doc.path === "/" ? "/index.md" : `${doc.path}.md`}>; rel="alternate"; type="text/markdown"`
	);
	res.status(doc.status);
	if (req.method === "HEAD") {
		res.end();
		return;
	}
	res.end(doc.body);
}
