const { wantsMarkdown, isExplicitlyUnacceptable, VARY_ACCEPT, MARKDOWN_CONTENT_TYPE } = require("./accept");
const { resolveAgentDocument } = require("./resolveMarkdown");
const { markdownAlternatePath } = require("./site");

function applyAgentHeaders(res, pathname) {
	res.setHeader("Vary", VARY_ACCEPT);
	res.setHeader(
		"Link",
		`</llms.txt>; rel="describedby", <${markdownAlternatePath(pathname)}>; rel="alternate"; type="text/markdown"`
	);
}

function markdownAwareGetServerSideProps(pathname, options = {}) {
	return async function getServerSideProps(ctx) {
		const { req, res, params } = ctx;
		const resolvedPath =
			pathname ||
			`/${[]
				.concat(params?.slug || [])
				.filter(Boolean)
				.join("/")}` ||
			"/";

		applyAgentHeaders(res, resolvedPath);

		const accept = req.headers.accept;
		if (isExplicitlyUnacceptable(accept)) {
			res.statusCode = 406;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Not Acceptable\n\nAvailable: text/html, text/markdown\n");
			return { props: {} };
		}

		if (wantsMarkdown(accept)) {
			const doc = resolveAgentDocument(resolvedPath);
			res.statusCode = options.forceStatus || doc.status;
			res.setHeader("Content-Type", doc.contentType || MARKDOWN_CONTENT_TYPE);
			res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=86400");
			res.end(doc.body);
			return { props: {} };
		}

		if (options.forceStatus) {
			res.statusCode = options.forceStatus;
		}
		return { props: options.props || {} };
	};
}

module.exports = { markdownAwareGetServerSideProps, applyAgentHeaders };
