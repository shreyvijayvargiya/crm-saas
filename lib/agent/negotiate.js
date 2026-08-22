const { wantsMarkdown, isExplicitlyUnacceptable, VARY_ACCEPT, MARKDOWN_CONTENT_TYPE } = require("./accept");
const { resolveAgentDocument } = require("./resolveMarkdown");
const { markdownAlternatePath } = require("./site");

function markdownAwareGetServerSideProps(pathname) {
	return async function getServerSideProps({ req, res }) {
		res.setHeader("Vary", VARY_ACCEPT);
		res.setHeader(
			"Link",
			`</llms.txt>; rel="describedby", <${markdownAlternatePath(pathname)}>; rel="alternate"; type="text/markdown"`
		);

		const accept = req.headers.accept;
		if (isExplicitlyUnacceptable(accept)) {
			res.statusCode = 406;
			res.setHeader("Content-Type", "text/plain; charset=utf-8");
			res.end("Not Acceptable\n\nAvailable: text/html, text/markdown\n");
			return { props: {} };
		}

		if (wantsMarkdown(accept)) {
			const doc = resolveAgentDocument(pathname);
			res.statusCode = doc.status;
			res.setHeader("Content-Type", doc.contentType || MARKDOWN_CONTENT_TYPE);
			res.end(doc.body);
			return { props: {} };
		}

		return { props: {} };
	};
}

module.exports = { markdownAwareGetServerSideProps };
