import { SITE_URL } from "../../../lib/agent/site";

const WARM_PATHS = [
	"/blog",
	"/blog/free-crm-and-top-crm-directory",
	"/blog/excel-to-crm-migration",
	"/blog/we-made-saascrm-agent-ready-llms-txt",
	"/sitemap",
];

function isAuthorized(req) {
	const secret = process.env.CRON_SECRET;
	if (secret) {
		return req.headers.authorization === `Bearer ${secret}`;
	}
	return req.headers["x-vercel-cron"] === "1";
}

async function warm(path) {
	const url = `${SITE_URL}${path}`;
	const res = await fetch(url, {
		headers: { "user-agent": "saascrm-cron/publish-blog" },
	});
	return { path, status: res.status };
}

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({ error: "Method not allowed" });
	}

	if (!isAuthorized(req)) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const results = [];
	for (const path of WARM_PATHS) {
		results.push(await warm(path));
		results.push(await warm(path));
	}

	return res.status(200).json({
		ok: true,
		at: new Date().toISOString(),
		results,
	});
}
