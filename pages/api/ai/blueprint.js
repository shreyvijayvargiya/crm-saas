import {
	generateCrmBlueprint,
	normalizeBlueprintInput,
} from "@/lib/ai/blueprint";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 3;
const requestBuckets = new Map();

function getClientId(req) {
	const forwarded = req.headers["x-forwarded-for"];
	const ip = Array.isArray(forwarded)
		? forwarded[0]
		: String(forwarded ?? "")
				.split(",")[0]
				.trim();
	return ip || req.socket?.remoteAddress || "unknown";
}

function takeRateLimit(clientId) {
	const now = Date.now();
	const current = requestBuckets.get(clientId);
	if (!current || now >= current.resetAt) {
		const next = { count: 1, resetAt: now + WINDOW_MS };
		requestBuckets.set(clientId, next);
		return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: next.resetAt };
	}
	if (current.count >= MAX_REQUESTS) {
		return { allowed: false, remaining: 0, resetAt: current.resetAt };
	}
	current.count += 1;
	return {
		allowed: true,
		remaining: MAX_REQUESTS - current.count,
		resetAt: current.resetAt,
	};
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "16kb",
		},
	},
	// Keep AI abort (lib/ai/blueprint.js) under this Vercel limit.
	maxDuration: 10,
};

export default async function handler(req, res) {
	res.setHeader("Cache-Control", "no-store");

	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ error: "Method not allowed" });
	}

	const limit = takeRateLimit(getClientId(req));
	res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
	res.setHeader("X-RateLimit-Remaining", String(limit.remaining));
	res.setHeader("X-RateLimit-Reset", String(Math.ceil(limit.resetAt / 1000)));

	if (!limit.allowed) {
		return res.status(429).json({
			error:
				"You have used the three free blueprints available this hour. Please try again later.",
		});
	}

	try {
		const input = normalizeBlueprintInput(req.body);
		if (!input.goal || input.goal.length < 12) {
			return res.status(400).json({
				error: "Describe what you want to build in at least 12 characters.",
			});
		}

		const blueprint = await generateCrmBlueprint(input);
		return res.status(200).json({ blueprint, remaining: limit.remaining });
	} catch {
		return res.status(500).json({
			error:
				"We could not generate the blueprint right now. Please try again.",
		});
	}
}
