/**
 * Accept parsing for acceptmarkdown.com / RFC 9110 §12.5.1.
 * Do not substring-match. Rank by q-value, then specificity, then client order.
 */

const PRODUCES = ["text/html", "text/markdown"];
const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
const HTML_CONTENT_TYPE = "text/html; charset=utf-8";
const VARY_ACCEPT = "Accept, Accept-Encoding";

function parseAccept(header) {
	return String(header)
		.split(",")
		.map((raw) => {
			const parts = raw
				.trim()
				.split(";")
				.map((s) => s.trim());
			const type = (parts[0] || "").toLowerCase();
			let q = 1;
			for (const param of parts.slice(1)) {
				const [name, value] = param.split("=").map((s) => (s || "").trim());
				if (name === "q") {
					const parsed = Number(value);
					if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
				}
			}
			const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
			return { type, q, specificity };
		})
		.filter((entry) => entry.type);
}

function matches(entry, candidate) {
	if (entry.type === "*/*") return true;
	if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
	return entry.type === candidate;
}

function preferredType(header, produces = PRODUCES) {
	if (!header) return produces[0];
	const entries = parseAccept(header);
	if (entries.length === 0) return produces[0];

	let bestType = null;
	let bestQ = -1;
	let bestPosition = Infinity;

	for (const candidate of produces) {
		let matched = null;
		let matchedPosition = Infinity;
		for (let idx = 0; idx < entries.length; idx += 1) {
			const entry = entries[idx];
			if (!matches(entry, candidate)) continue;
			if (
				matched === null ||
				entry.specificity > matched.specificity ||
				(entry.specificity === matched.specificity && idx < matchedPosition)
			) {
				matched = entry;
				matchedPosition = idx;
			}
		}
		if (matched === null) continue;
		if (matched.q <= 0) continue;
		if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
			bestQ = matched.q;
			bestPosition = matchedPosition;
			bestType = candidate;
		}
	}

	return bestType;
}

function wantsMarkdown(header) {
	return preferredType(header) === "text/markdown";
}

function isExplicitlyUnacceptable(header) {
	return Boolean(header) && preferredType(header) === null;
}

function appendVaryAccept(headers) {
	const existing =
		typeof headers.get === "function" ? headers.get("Vary") : headers.Vary || headers.vary;
	if (!existing) {
		if (typeof headers.set === "function") headers.set("Vary", VARY_ACCEPT);
		else headers.Vary = VARY_ACCEPT;
		return;
	}
	const tokens = String(existing)
		.split(",")
		.map((s) => s.trim().toLowerCase());
	let next = existing;
	if (!tokens.includes("accept")) next = `${next}, Accept`;
	if (!tokens.includes("accept-encoding")) next = `${next}, Accept-Encoding`;
	if (typeof headers.set === "function") headers.set("Vary", next);
	else headers.Vary = next;
}

module.exports = {
	preferredType,
	wantsMarkdown,
	isExplicitlyUnacceptable,
	appendVaryAccept,
	MARKDOWN_CONTENT_TYPE,
	HTML_CONTENT_TYPE,
	VARY_ACCEPT,
	PRODUCED_TYPES: PRODUCES,
};
