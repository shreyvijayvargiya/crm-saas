import { generateCrmStarter } from "@/lib/ai/crmAst";
import { normalizeBlueprintInput } from "@/lib/ai/blueprint";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 2;
const buckets = new Map();

function getClientId(req) {
	const forwarded = req.headers["x-forwarded-for"];
	const ip = Array.isArray(forwarded)
		? forwarded[0]
		: String(forwarded || "")
				.split(",")[0]
				.trim();
	return ip || req.socket?.remoteAddress || "unknown";
}

function useQuota(clientId) {
	const now = Date.now();
	const bucket = buckets.get(clientId);
	if (!bucket || now >= bucket.resetAt) {
		const next = { count: 1, resetAt: now + WINDOW_MS };
		buckets.set(clientId, next);
		return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: next.resetAt };
	}
	if (bucket.count >= MAX_REQUESTS) {
		return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
	}
	bucket.count += 1;
	return {
		allowed: true,
		remaining: MAX_REQUESTS - bucket.count,
		resetAt: bucket.resetAt,
	};
}

export const config = {
	api: {
		bodyParser: { sizeLimit: "16kb" },
		responseLimit: "1mb",
	},
	maxDuration: 10,
};

export default async function handler(req, res) {
	res.setHeader("Cache-Control", "no-store");
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ error: "Method not allowed" });
	}

	const quota = useQuota(getClientId(req));
	res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
	res.setHeader("X-RateLimit-Remaining", String(quota.remaining));
	res.setHeader("X-RateLimit-Reset", String(Math.ceil(quota.resetAt / 1000)));
	if (!quota.allowed) {
		return res.status(429).json({
			error: "You have used both free CRM starter builds for this hour.",
		});
	}

	try {
		const input = normalizeBlueprintInput(req.body);
		if (!input.goal || input.goal.length < 12) {
			return res.status(400).json({
				error: "Generate a blueprint with a clear CRM goal first.",
			});
		}
		const starter = await generateCrmStarter(input);
		return res.status(200).json({
			...starter,
			remaining: quota.remaining,
		});
	} catch {
		return res.status(500).json({
			error: "We could not build the starter repository. Please try again.",
		});
	}
}
